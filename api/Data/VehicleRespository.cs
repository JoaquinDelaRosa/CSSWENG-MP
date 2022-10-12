
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using api.Models;
using System.Runtime.CompilerServices;
using System.Collections;

namespace api.Data
{
    public class VehicleRepository : Repository<Vehicle>
    {
        public VehicleRepository(DbContext context) : base(context)
        {

        }
    }
}
