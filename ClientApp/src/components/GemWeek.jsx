﻿import React from 'react'; 
import { authHeader, handleResponse } from '../_helpers';
import { getNow, getTimeToDisplay } from '../_helpers/week-helper';
import { authenticationService } from '../_services/authentication.service';
import { Role } from '../_helpers/role'; 

export class GemWeek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [], 
            loading: true
        }
    }

    componentDidMount() {
        this.populateMessages();
    }

    renderMessages() {
        var content;
        var week = this.props.match.params.week; 

        var i;
        var list = [];
        var messages = this.state.messages; 
        for (i = 0; i < messages.length; i++) {
            if (messages[i].week == week) {
                let card = <div key={messages[i].id} className="card" style={{ marginTop: 2 + 'em' }} >
                               <div className="card-header">
                                    {messages[i].title}
                               </div>

                               <div className="card-body">
                                    <b>{messages[i].body}</b>
                               </div>
                           </div>

                list.push(card); 
            }
        }

        if (getNow() > getTimeToDisplay(week) || authenticationService.currentUserValue.role == Role.Admin)
             content = list;
        console.log(getTimeToDisplay(week).format('MMMM Do YYYY, h:mm:ss a'));
        return content; 
    }

    render() {
        const messages = this.renderMessages(); 
        const content = this.state.loading ? <h6><em>Loading Gems for the Week...</em></h6> : messages;

        return (
            <>
                <h3><em>Week {this.props.match.params.week} Report</em></h3>
                {content}
            </>
        );
    }

    async populateMessages() {
        const response = await fetch('api/message/', {
            method: 'GET',
            headers: {
                ...{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        });

        const data = await response.json();

        this.setState({
            messages: data,
            loading: false
        });
    }
}