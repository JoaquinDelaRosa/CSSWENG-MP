
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using api.Models;
using System.Runtime.CompilerServices;
using System.Collections;

namespace api.Data
{
    public class OrderStatusRepository : Repository<OrderStatus>
    {
        public OrderStatusRepository(DbContext context) : base(context)
        {

        }
    }
}
