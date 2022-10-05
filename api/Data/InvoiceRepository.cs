
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using api.Models;
using System.Runtime.CompilerServices;
using System.Collections;

namespace api.Data
{
    public class InvoiceRepository : Repository<Vehicle>
    {
        public InvoiceRepository(DbContext context) : base(context)
        {

        }
    }
}
