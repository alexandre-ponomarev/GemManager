﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GemManager.Repositories
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();

        T GetById(Guid id);

        void Save(T document);

        void Save(IEnumerable<T> document);

        void Delete(Guid id);
    }
}
