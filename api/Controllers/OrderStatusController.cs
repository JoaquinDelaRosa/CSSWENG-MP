using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class OrderStatusController : GenericItemController<OrderStatus, OrderStatus>
    {
        private readonly OrderStatusRepository orderStatusRepository;
        public OrderStatusController(AutoworksDBContext ctx) : base(new OrderStatusRepository(ctx))
        {
            this.orderStatusRepository = new OrderStatusRepository(ctx);
        }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override Task<IEnumerable<OrderStatus>> GetAll()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            List<OrderStatus> view = new List<OrderStatus>();

            foreach (OrderStatus type in orderStatusRepository.GetAll())
            {
                view.Add(type);
            }

            return view;
        }
        public async override Task<OrderStatus?> Get(int id)
        {
            return await GetRaw(id);
        }

        public async override Task<IEnumerable<OrderStatus>> GetByPredicate(Predicate<OrderStatus> predicate)
        {
            IEnumerable<OrderStatus> filtered = await GetAll();

            return filtered;
        }
    }
}
