using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Data
{
    public class CustomerRepository : Repository<Customer>
    {
        public CustomerRepository(DbContext context) : base(context)
        {

        }

        public List<Customer> GetByCustomerName(string customerName)
        {
           return dbSet.Where(x => (x.FirstName+" "+x.LastName).Contains(customerName)).ToList<Customer>();
        }
    }
}
