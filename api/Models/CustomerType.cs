using System.ComponentModel.DataAnnotations;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace api.Models
{
    public class CustomerType
    {
        [Key]
        public CustomerTypesEnum CustomerTypeId { get; set; }
        [Required]
        public string? Name { get; set; }

        public static bool operator ==(Customer x, Customer y)
        {
            return x.CustomerId == y.CustomerId;
        }

        public static bool operator !=(Customer x, Customer y)
        {
            return x.CustomerId != y.CustomerId;
        }

        public void AssignTo(Customer other)
        {
            FirstName = other.FirstName;
            LastName = other.LastName;
            MiddleName = other.MiddleName;
            CustomerTypeId = other.CustomerTypeId;
            Company = other.Company;
        }
    }
}
