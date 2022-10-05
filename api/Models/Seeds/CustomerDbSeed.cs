using Microsoft.EntityFrameworkCore;

namespace api.Models.Seeds
{
    public static class CustomerDbSeed
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AutoworksDBContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<AutoworksDBContext>>()))
            {
                if (context == null || context.Customers == null)
                {
                    throw new ArgumentNullException("Null Context for Seed");
                }

                if (context.Customers.Any())
                {
                    return;
                }

                context.Customers.AddRange(
                    new Customer
                    {
                        LastName = "CAM",
                        FirstName = "RON",
                        CustomerTypeId = CustomerTypesEnum.PERSONAL,
                    },
                    new Customer
                    {
                        LastName = "ARQUILLO",
                        FirstName = "GERRY",
                        CustomerTypeId = CustomerTypesEnum.WALK_IN,
                    },
                    new Customer
                    {
                        LastName = "BULAND",
                        FirstName = "JOANA",
                        CustomerTypeId = CustomerTypesEnum.INSURANCE,
                    }
               );

                context.SaveChanges();
            }
        }

    }
}
