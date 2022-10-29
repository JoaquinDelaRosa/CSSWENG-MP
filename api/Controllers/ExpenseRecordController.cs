using api.Data;
using api.Models;
using api.Models.Queries;
using api.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class ExpenseRecordController : GenericItemController<ExpenseRecord, ExpenseRecordDetailView>
    {
        public ExpenseRecordController(AutoworksDBContext ctx) : base(new ExpenseRecordRepository(ctx))
        {

        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override Task<IEnumerable<ExpenseRecordDetailView>> GetAll()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<ExpenseRecordDetailView> view = new List<ExpenseRecordDetailView>();

            foreach (ExpenseRecord expense in repository.GetAll())
            {
                view.Add(new ExpenseRecordDetailView(expense));
            }

            return view;
        }

        public async override Task<ExpenseRecordDetailView?> Get(int id)
        {
            ExpenseRecord? e = await GetRaw(id);
            if (e == null)
                return null;

            return new ExpenseRecordDetailView(e);
        }

        [HttpPost("filter")]
        [AllowAnonymous]
#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async Task<IEnumerable<ExpenseRecordDetailView>> Find(ExpenseRecordQuery query)
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<ExpenseRecordDetailView> view = new List<ExpenseRecordDetailView>();

            foreach (ExpenseRecord customer in repository.Find(query))
            {
                view.Add(new ExpenseRecordDetailView(customer));
            }

            return view;
        }
    }
}
