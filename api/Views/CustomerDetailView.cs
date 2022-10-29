using api.Models;

namespace api.Views
{
    public class CustomerDetailView
    {
        public CustomerDetailView(Customer customer)
        {
            Id = customer.CustomerId;
            Name = customer.FirstName + " " + customer.LastName;
            MobileNumber = (customer.MobileNumber == null) ? "XXX-XXX-XXXX" : customer.MobileNumber ;
            Email = (customer.Email == null) ? "" : customer.Email;
            
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
    }
}
