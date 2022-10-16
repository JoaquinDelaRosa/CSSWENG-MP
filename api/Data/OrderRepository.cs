using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Data
{
    public class OrderRepository : Repository<Order>
    {
        public OrderRepository(DbContext context) : base(context)
        {

        }
    }
}
