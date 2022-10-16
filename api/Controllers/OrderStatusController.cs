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

        public override IEnumerable<OrderStatus> GetAll()
        {
            List<OrderStatus> view = new List<OrderStatus>();

            foreach (OrderStatus type in orderStatusRepository.GetAll())
            {
                view.Add(type);
            }

            return view;
        }

        [HttpGet("filter")]
        public override IEnumerable<OrderStatus> GetByPredicate(Predicate<OrderStatus> predicate)
        {
            IEnumerable<OrderStatus> filtered = GetAll();

            return filtered;
        }
    }
}
