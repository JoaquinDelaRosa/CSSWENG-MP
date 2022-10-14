using Microsoft.EntityFrameworkCore;

namespace api.Models.Seeds
{
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
                        CustomerTypeId = CustomerTypesEnum.PERSONAL,
                        Name = "PERSONAL"
                    },
                    new CustomerType
                    {
                        CustomerTypeId = CustomerTypesEnum.WALK_IN,
                        Name = "WALK IN"
                    },
                    new CustomerType
                    {
                        CustomerTypeId = CustomerTypesEnum.FLEET,
                        Name = "FLEET"
                    },
                    new CustomerType
                    {
                        CustomerTypeId = CustomerTypesEnum.INSURANCE,
                        Name = "INSURANCE"
                    },
                    new CustomerType
                    {
                        CustomerTypeId = CustomerTypesEnum.OTHER,
                        Name = "OTHER"
                    }
               );

                context.SaveChanges();
            }
        }

    }
}
