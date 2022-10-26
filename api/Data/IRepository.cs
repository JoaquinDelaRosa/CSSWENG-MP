using api.Models;
using api.Models.Queries;

namespace api.Data
{
    public interface IRepository<T> where T : IDBEntity<T>
    {
        public Task<T?> Get<Key>(Key id);
        IEnumerable<T> GetAll();

        public IEnumerable<T> Find<Query>(Query query) where Query : IModelQuery<T>;

        public void Create(T obj);

        public void Create(IEnumerable<T> objects);

        public void Update(T obj);

        public void Remove(T obj);
        public void Remove(IEnumerable<T> obj);

        public void Save();
    }
}
