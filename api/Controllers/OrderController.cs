using api.Data;
using api.Models;
using api.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class OrderController : GenericItemController<Order, Order>
    {
        public OrderController(AutoworksDBContext ctx) : base(new OrderRepository(ctx))
        {

        }
        
        public override IEnumerable<Order> GetAll()
        {
            List<Order> view = new List<Order>();

            foreach (Order order in repository.GetAll())
            {
                view.Add(order);
            }

            return view;
        }

        public override IEnumerable<Order> GetByPredicate(Predicate<Order> predicate)
        {
            IEnumerable<Order> filtered = GetAll();

            return filtered;
        }
    }
}
