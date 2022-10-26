using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Data
{
    public class CustomerRepository : Repository<Customer>
    {
        public CustomerRepository(DbContext context) : base(context)
        {

        }

        public override IEnumerable<Customer> Find<CustomerQuery>(CustomerQuery query)
        {
           return dbSet.Where(query.IsSatisfied).ToList<Customer>();
        }
    }
}
