using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Data
{
    public class CustomerTypeRepository : Repository<CustomerType>
    {
        public CustomerTypeRepository(DbContext context) : base(context)
        {

        }
    }
}
