using Microsoft.EntityFrameworkCore;
using api.Controllers.Crypto;


namespace api.Models.Seeds
{
    public static class InvoiceDbSeed
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AutoworksDBContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<AutoworksDBContext>>()))
            {
                if (context == null || context.Invoices == null)
                {
                    throw new ArgumentNullException("Null Context for Seed");
                }

                if (context.Invoices.Any())
                {
                    return;
                }

                context.Invoices.AddRange(
                    new Invoice()
                    {
                        AgentFirstName = "Adam",
                        AgentLastName = "Smith",
                        Amount = 1000,
                        DeductibleDue = 20,
                    },
                    new Invoice()
                    {
                        AgentFirstName = "Musk",
                        AgentLastName = "Elon",
                        Amount = 1000,
                        DeductibleDue = 31416
                    }
               ) ;

                context.SaveChanges();
            }
        }

    }
}
