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
                ((query.LicensePlate == "")? true : x.LicensePlate.Contains(query.LicensePlate)) &&
                ((query.Manufacturer == "")? true : x.Manufacturer.Contains(query.Manufacturer)) &&
                ((query.Model == "")? true : x.Model.Contains(query.Model)) &&
                ((query.YearManufactured == -1)? true : x.YearManufactured == query.YearManufactured)
            ).ToList<Vehicle>();
        }
    }
}
