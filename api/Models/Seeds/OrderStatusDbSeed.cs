using Microsoft.EntityFrameworkCore;

namespace api.Models.Seeds
{
    public static class OrderStatusDbSeed
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AutoworksDBContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<AutoworksDBContext>>()))
            {
                if (context == null || context.OrderStatuses == null)
                {
                    throw new ArgumentNullException("Null Context for Seed");
                }

                if (context.OrderStatuses.Any())
                {
                    return;
                }

                context.OrderStatuses.AddRange(
                    new OrderStatus(){
                        Id = OrderStatusEnum.PAID,
                        Name = "Paid"
                    },
                    new OrderStatus()
                    {
                        Id = OrderStatusEnum.UNPAID,
                        Name = "Unpaid"
                    },
                    new OrderStatus()
                    {
                        Id = OrderStatusEnum.OK,
                        Name = "OK"
                    },
                    new OrderStatus()
                    {
                        Id = OrderStatusEnum.WITH_BALANCE,
                        Name = "With Balance"
                    },
                    new OrderStatus()
                    {
                        Id = OrderStatusEnum.FOR_LOA_OR_INVOICE,
                        Name = "For LOA or Invoice"
                    }
               );

                context.SaveChanges();
            }
        }

    }
}
