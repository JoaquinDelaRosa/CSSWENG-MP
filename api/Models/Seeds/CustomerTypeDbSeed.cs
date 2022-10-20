using Microsoft.EntityFrameworkCore;

namespace api.Models.Seeds
{
    // Seeds the CustomerType table with Data. This seeds the table as an enum table.
    public static class CustomerTypeDbSeed
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AutoworksDBContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<AutoworksDBContext>>()))
            {
                if (context == null || context.CustomerType == null)
                {
                    throw new ArgumentNullException("Null Context for Seed");
                }

                if (context.CustomerType.Any())
                {
                    return;
                }

                context.CustomerType.AddRange(
                    new CustomerType
                    {
                        Id = CustomerTypesEnum.PERSONAL,
                        Name = "PERSONAL"
                    },
                    new CustomerType
                    {
                        Id = CustomerTypesEnum.WALK_IN,
                        Name = "WALK IN"
                    },
                    new CustomerType
                    {
                        Id = CustomerTypesEnum.FLEET,
                        Name = "FLEET"
                    },
                    new CustomerType
                    {
                        Id = CustomerTypesEnum.INSURANCE,
                        Name = "INSURANCE"
                    },
                    new CustomerType
                    {
                        Id = CustomerTypesEnum.OTHER,
                        Name = "OTHER"
                    }
               );

                context.SaveChanges();
            }
        }

    }
}
