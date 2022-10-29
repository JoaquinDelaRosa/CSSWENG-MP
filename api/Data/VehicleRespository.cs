using Microsoft.EntityFrameworkCore;

using api.Models;
using api.Models.Queries;

namespace api.Data
{
    public class VehicleRepository : Repository<Vehicle>
    {
        public VehicleRepository(DbContext context) : base(context)
        {

        }

        public override IEnumerable<Vehicle> Find<VehicleQuery>(VehicleQuery query) 
        {
            return dbSet.Where(query.IsSatisfied).ToList<Vehicle>();
        }
    }
}
