using Microsoft.EntityFrameworkCore;

using api.Models;
using System.Linq.Expressions;

namespace api.Data
{
    public abstract class Repository<T> : IRepository<T> where T : IDBEntity<T>
    {
        protected readonly DbContext dbContext;
        protected DbSet<T> dbSet;

        public Repository(DbContext _context)
        {
            dbContext = _context ?? throw new ArgumentNullException(nameof(dbContext));
            dbSet = dbContext.Set<T>();
        }

        public async Task<T?> Get<Key>(Key id)
        {
            T? result =  await dbSet.FindAsync(id);
            return result;
        }

        public IEnumerable<T> GetAll()
        {
            return dbSet.ToList<T>();
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return dbSet.Where(predicate);
        }

        public IEnumerable<T> Filter(Predicate<T> predicate)
        {
            return dbSet.Where(x => predicate(x));
        }

        public async void Create(T obj)
        {
            await dbSet.AddAsync(obj);
            dbContext.SaveChanges();
        }

        public async void Create(IEnumerable<T> objects)
        {
            await dbSet.AddRangeAsync(objects);
            await dbContext.SaveChangesAsync();
        }

        public void Update(T obj)
        {
            dbSet.Attach(obj);
            dbContext.Entry(obj).State = EntityState.Modified;
        }

        public void Remove(T obj)
        {
            if (obj == null)
                return;

            dbSet.Remove(obj);
            dbContext.SaveChanges();
        }
        public void Remove(IEnumerable<T> obj)
        {
            dbSet.RemoveRange(obj);
        }

        public void Save()
        {
            dbContext.SaveChanges();
        }
    }
}
