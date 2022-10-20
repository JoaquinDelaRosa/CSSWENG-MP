using Microsoft.EntityFrameworkCore;
using api.Controllers.Crypto;


namespace api.Models.Seeds
{
    // Seeds the Vehicle table with Data. Used for ease of development and testing.
    public static class VehicelDbSeed
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AutoworksDBContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<AutoworksDBContext>>()))
            {
                if (context == null || context.Vehicles == null)
                {
                    throw new ArgumentNullException("Null Context for Seed");
                }

                if (context.Vehicles.Any())
                {
                    return;
                }

                context.Vehicles.AddRange(
                    new Vehicle()
                    {
                        Manufacturer = "Honda",
                        Model = "Civic",
                        LicensePlate = "AAA111",
                        YearManufactured = 2012
                    },
                    new Vehicle()
                    {
                        Manufacturer = "Mitsubishi Motors",
                        Model = "Everest",
                        LicensePlate = "AAA222",
                        YearManufactured = 2015
                    }
               ) ;

                context.SaveChanges();
            }
        }

    }
}
