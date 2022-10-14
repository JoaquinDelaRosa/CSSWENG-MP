
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using api.Models;
using System.Runtime.CompilerServices;
using System.Collections;

namespace api.Data
{
    public class CustomerTypeRepository : Repository<CustomerType>
    {
        public CustomerTypeRepository(DbContext context) : base(context)
        {

        }
    }
}
