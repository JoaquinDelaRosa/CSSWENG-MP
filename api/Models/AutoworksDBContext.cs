using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class AutoworksDBContext:DbContext
    {
       public AutoworksDBContext(DbContextOptions<AutoworksDBContext> options) : base(options)
        {

        }

        public DbSet<User> ?Users { get; set; }
        public DbSet<Customer> ?Customers { get; set; }
        public DbSet<CustomerType>? CustomerType { get; set; }
        public DbSet<Invoice> ?Invoices { get; set; }
        public DbSet<Record> ?Record { get; set; }

        public DbSet<Vehicle> ?Vehicles { get; set; }
    }
}
