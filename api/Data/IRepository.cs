using api.Models;
using api.Models.Queries;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public interface IRepository<T> where T : IDBEntity<T>
    {
        public Task<T?> Get<Key>(Key id);
        IEnumerable<T> GetAll();

        public IEnumerable<T> Find<Query>(Query query) where Query : IModelQuery<T>;

        public IEnumerable<T> Sort<Tkey>(Func<T, Tkey> criterion, bool isAscending = false, int from = 0, int limit = int.MaxValue);

        public void Create(T obj);

        public void Create(IEnumerable<T> objects);

        public void Update(T obj);

        public void Remove(T obj);
        public void Remove(IEnumerable<T> obj);

        public void Save();
    }
}
