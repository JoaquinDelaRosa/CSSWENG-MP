using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    [Authorize(Roles = "ADMIN")]
    public class ExpenseRecordController : GenericItemController<ExpenseRecord, ExpenseRecord>
    {
        public ExpenseRecordController(AutoworksDBContext ctx) : base(new ExpenseRecordRepository(ctx))
        {

        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override Task<IEnumerable<ExpenseRecord>> GetAll()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<ExpenseRecord> view = new List<ExpenseRecord>();

            foreach (ExpenseRecord expense in repository.GetAll())
            {
                view.Add(expense);
            }

            return view;
        }

        public async override Task<ExpenseRecord?> Get(int id)
        {
            ExpenseRecord? e = await GetRaw(id);
            if (e == null)
                return null;

            return e;
        }

        [HttpGet("filter")]
        public async Task<IEnumerable<ExpenseRecord>> GetByPredicate(Predicate<ExpenseRecord> predicate)
        {
            IEnumerable<ExpenseRecord> filtered = await GetAll();

            return filtered;
        }
    }
}
