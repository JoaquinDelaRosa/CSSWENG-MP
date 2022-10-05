using Microsoft.EntityFrameworkCore;

namespace api.Models
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

                context.Customers.AddRange(
                    new Customer
                    {
                        CustomerId = 1,
                        LastName = "CAM",
                        MiddleName = null,
                        FirstName = "RON",
                        CustomerTypeId = CustomerTypesEnum.PERSONAL,
                        Company = null         
                    },
                    new Customer
                    {
                        CustomerId = 2,
                        LastName = "ARQUILLO",
                        MiddleName = null,
                        FirstName = "GERRY",
                        CustomerTypeId = CustomerTypesEnum.WALK_IN,
                        Company = null
                    },
                    new Customer
                    {
                        CustomerId = 3,
                        LastName = "BULAND",
                        MiddleName = null,
                        FirstName = "JOANA",
                        CustomerTypeId = CustomerTypesEnum.INSURANCE,
                        Company = null
                    }
               );

                context.SaveChanges();
            }
        }
            
    }
}
