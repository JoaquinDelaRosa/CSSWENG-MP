using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    // Defines an interface for the Database that will be used to access the different tables on the localDB instance.
  
    public class AutoworksDBContext:DbContext
    {
       public AutoworksDBContext(DbContextOptions<AutoworksDBContext> options) : base(options)
        {

        }

        public DbSet<User>? Users { get; set; }
        public DbSet<Customer>? Customers { get; set; }
        public DbSet<CustomerType>? CustomerType { get; set; }
        public DbSet<OrderStatus>? OrderStatuses { get; set; }

        public DbSet<Invoice>?Invoices { get; set; }
        public DbSet<Order>? Orders { get; set; }

        public DbSet<Vehicle>? Vehicles { get; set; }
    }
}
