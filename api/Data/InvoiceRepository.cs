using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Data
{
    public class InvoiceRepository : Repository<Invoice>
    {
        public InvoiceRepository(DbContext context) : base(context)
        {

        }
    }
}
