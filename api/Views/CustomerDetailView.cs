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

        private string TypeToString(CustomerTypesEnum type)
        {
            switch (type)
            {
                case CustomerTypesEnum.PERSONAL: return "Personal";
                case CustomerTypesEnum.WALK_IN: return "Walk in";
                case CustomerTypesEnum.FLEET: return "Fleet";
                case CustomerTypesEnum.INSURANCE: return "Insurance";
                case CustomerTypesEnum.OTHER: return "Other";
            }

            return "";
        }
    }
}
