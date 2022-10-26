using api.Data;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize]
    public abstract class GenericItemController<T, View> : Controller where T : IDBEntity<T>
    {
        protected readonly IRepository<T> repository;

        public GenericItemController(IRepository<T> repository)
        {
            this.repository = repository;
        }

        [HttpGet("all")]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public virtual async Task<IEnumerable<View>> GetAll()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            return new List<View>();
        }

        [HttpGet("id")]
        public virtual async Task<T?> GetRaw(int id)
        {
            return await repository.Get(id);
        }

        [HttpGet("view")]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public virtual async Task<View?> Get(int id)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            return default(View);
        }

        [HttpPost("create")]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public virtual async Task<T?> Create(T other)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            repository.Create(other);

            return other;
        }

        [HttpPatch("update")]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public virtual async Task<bool> Update(int id, T entity)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            T? toModify = GetRaw(id).Result;
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
            T? toRemove = await GetRaw(id);
            if (toRemove == null)
                return false;

            repository.Remove(toRemove);
            return true;
        }
    }
}
