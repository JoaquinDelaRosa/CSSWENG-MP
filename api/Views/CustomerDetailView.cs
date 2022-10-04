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

        private string TypeToString(int type)
        {
            switch (type)
            {
                case 0: return "Personal";
                case 1: return "Walk in";
                case 2: return "Fleet";
                case 3: return "Insurance";
                case 4: return "Other";
            }

            return "";
        }
    }
}
