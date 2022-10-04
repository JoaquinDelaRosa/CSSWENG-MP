using api.Models;

namespace api.Views
{
    public class CustomerDetailView
    {
        public CustomerDetailView(Customer customer)
        {
            Name = customer.FirstName + " " + 
                (customer.MiddleName == null ? ""  :customer.MiddleName + " ") + 
                customer.LastName;

            Type = TypeToString(customer.CustomerTypeId);
            Company = (customer.Company == null ? "" : customer.Company);
        }

        public string Name { get; set; }
        public string Type { get; set; }
        public string Company { get; set; }

        private string TypeToString(CustomerTypes type)
        {
            switch (type)
            {
                case CustomerTypes.PERSONAL: return "Personal";
                case CustomerTypes.WALK_IN: return "Walk in";
                case CustomerTypes.FLEET: return "Fleet";
                case CustomerTypes.INSURANCE: return "Insurance";
                case CustomerTypes.OTHER: return "Other";
            }

            return "";
        }
    }
}
