using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Data
{
    public class CustomerRepository : Repository<Customer>
    {
        public CustomerRepository(DbContext context) : base(context)
        {

        }
    }
}
