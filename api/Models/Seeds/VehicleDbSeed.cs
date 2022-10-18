using Microsoft.EntityFrameworkCore;
using api.Controllers.Crypto;


namespace api.Models.Seeds
{
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
                        Manufacturer = "Lenovo",
                        Model = "Dell",
                        LicensePlate = "LNVDLL1",
                        YearManufactured = 1960
                    },
                    new Vehicle()
                    {
                        Manufacturer = "Pear",
                        Model = "WePhone",
                        LicensePlate = "K1W1314",
                        YearManufactured = 2015
                    }
               ) ;

                context.SaveChanges();
            }
        }

    }
}
