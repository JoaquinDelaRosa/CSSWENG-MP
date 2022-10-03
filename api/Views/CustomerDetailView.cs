using api.Models;

namespace api.Views
{
    public class CustomerDetailView
    {
        public CustomerDetailView(Customer customer)
        {
            Name = customer.Name.FirstName + " " + 
                (customer.Name.MiddleName == null ? ""  :customer.Name.MiddleName + " ") + 
                customer.Name.LastName;

            Type = TypeToString(customer.Type);
            Company = (customer.Company == null ? "" : customer.Company);
        }

        public string Name { get; set; }
        public string Type { get; set; }
        public string Company { get; set; }

        private string TypeToString(CustomerType type)
        {
            switch (type)
            {
                case CustomerType.PERSONAL: return "Personal";
                case CustomerType.WALK_IN: return "Walk in";
                case CustomerType.FLEET: return "Fleet";
                case CustomerType.INSURANCE: return "Insurance";
                case CustomerType.OTHER: return "Other";
            }

            return "";
        }
    }
}
