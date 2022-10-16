using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public abstract class GenericItemController<T, View> : Controller where T : IDBEntity<T>
    {
        protected readonly IRepository<T> repository;

        public GenericItemController(IRepository<T> repository)
        {
            this.repository = repository;
        }

        [HttpGet("all")]
        public abstract IEnumerable<View> GetAll();

        [HttpGet("id")]
        public virtual async Task<T?> GetById(int id)
        {
            return await repository.Get(id);
        }

        [HttpGet("filter")]
        public abstract IEnumerable<View> GetByPredicate(Predicate<T> predicate);

        [HttpPost("create")]
        public virtual T Create(T other)
        {
            repository.Create(other);

            return other;
        }

        [HttpPatch("update")]
        public virtual bool Update(int id, T entity)
        {
            T? toModify = GetById(id).Result;
            if (toModify == null)
                return false;

            repository.Update(toModify);
            toModify.AssignTo(entity);

            repository.Save();
            return true;
        }

        [HttpDelete("delete")]
        public virtual async Task<bool> Delete(int id)
        {
            T? toRemove = await GetById(id);
            if (toRemove == null)
                return false;

            repository.Remove(toRemove);
            return true;
        }
    }
}
