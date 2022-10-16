using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Data
{
    public class VehicleRepository : Repository<Vehicle>
    {
        public VehicleRepository(DbContext context) : base(context)
        {

        }
    }
}
