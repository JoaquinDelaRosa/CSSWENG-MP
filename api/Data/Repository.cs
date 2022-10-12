using Microsoft.EntityFrameworkCore;

using api.Models;
using System.Linq.Expressions;
using Microsoft.AspNetCore.Mvc;

namespace api.Data
{
    public abstract class Repository<T> : IRepository<T> where T : class 
    {
        protected readonly DbContext dbContext;
        protected DbSet<T>  dbSet;

        public Repository(DbContext _context)
        {
            dbContext = _context ?? throw new ArgumentNullException(nameof(dbContext));
            dbSet = dbContext.Set<T>();
        }

        public async Task<T?> Get<Key>(Key id)
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
