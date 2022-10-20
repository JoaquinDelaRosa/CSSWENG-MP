using Microsoft.EntityFrameworkCore;

namespace api.Models.Seeds
{
    // Seeds the Customer table with Data. Used for ease of development and testing.
    public static class CustomeDbSeed
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
                    new Customer()
                    {
                        FirstName = "John",
                        LastName = "Doe",
                        Company = "International Company",
                        CustomerTypeId = CustomerTypesEnum.PERSONAL
                    },
                    new Customer()
                    {
                        FirstName = "Jack",
                        LastName = "Black",
                        Company = "Acting Company",
                        CustomerTypeId = CustomerTypesEnum.FLEET
                    },
                    new Customer()
                    {
                        FirstName = "Shire",
                        LastName = "Kaku",
                        Company = "Blend Inc.",
                        CustomerTypeId = CustomerTypesEnum.WALK_IN
                    },
                    new Customer()
                    {
                        FirstName = "Kaz",
                        LastName = "Dokutah",
                        Company = "Rhodes Pharmaceutical Company",
                        CustomerTypeId = CustomerTypesEnum.INSURANCE
                    }
               );

                context.SaveChanges();
            }
        }

    }
}
