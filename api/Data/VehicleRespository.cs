using Microsoft.EntityFrameworkCore;

using api.Models;

namespace api.Data
{
    public class VehicleRepository : Repository<Vehicle>
    {
        public VehicleRepository(DbContext context) : base(context)
        {

        }

        public List<Vehicle> GetByVehicleDetails(Vehicle.Query query)
        {
            return dbSet.Where(x => 
                ((x.LicensePlate == "")? true : x.LicensePlate == query.LiscensePlate) &&
                ((x.Manufacturer == "")? true : x.Manufacturer == query.Manufacturer) &&
                ((x.Model == "")? true : x.Model == query.Model) &&
                ((x.YearManufactured == -1)? true : x.YearManufactured == query.YearManufactured)
                ).ToList<Vehicle>();
        }
    }
}
