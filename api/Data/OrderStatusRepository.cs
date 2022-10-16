using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Data
{
    public class OrderStatusRepository : Repository<OrderStatus>
    {
        public OrderStatusRepository(DbContext context) : base(context)
        {

        }
    }
}
