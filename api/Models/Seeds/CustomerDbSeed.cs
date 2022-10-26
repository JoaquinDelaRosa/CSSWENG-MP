using Microsoft.EntityFrameworkCore;

namespace api.Models.Seeds
{
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
                    },
                    new Customer()
                    {
                        FirstName = "Jack",
                        LastName = "Black",
                    },
                    new Customer()
                    {
                        FirstName = "Shire",
                        LastName = "Kaku",
                    },
                    new Customer()
                    {
                        FirstName = "Kaz",
                        LastName = "Dokutah",
                    }
               );

                context.SaveChanges();
            }
        }

    }
}
