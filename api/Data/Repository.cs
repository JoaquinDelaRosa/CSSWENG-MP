using Microsoft.EntityFrameworkCore;

using api.Models;
using System.Linq.Expressions;

namespace api.Data
{
    public abstract class Repository<T> : IRepository<T> where T : class 
    {
        protected readonly DbContext dbContext;
        private DbSet<T>  dbSet;

        public Repository(DbContext _context)
        {
            dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            dbSet = dbContext.Set<T>();
        }

        public async Task<T?> Get(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public IEnumerable<T> GetAll()
        {
            return dbSet.ToList<T>();
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return dbSet.Where(predicate);
        }

        public async void Create(T obj)
        {
            await dbSet.AddAsync(obj);
        }

        public async void Create(IEnumerable<T> objects)
        {
            await dbSet.AddRangeAsync(objects);
        }

        public void Remove(T obj)
        {
            dbSet.Remove(obj);
        }
        public void Remove(IEnumerable<T> obj)
        {
            dbSet.RemoveRange(obj);
        }
    }
}
