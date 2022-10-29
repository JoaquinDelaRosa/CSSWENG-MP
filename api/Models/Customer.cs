using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{

    public class Customer : IDBEntity<Customer>
    {
        [Key]
        public int CustomerId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? FirstName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? LastName { get; set; }



        [Column(TypeName = "nvarchar(100)")]
        public string? MobileNumber { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [EmailAddress]
        public string? Email { get; set; }

        public override void AssignTo(Customer other)
        {
            FirstName = other.FirstName;
            LastName = other.LastName;
            MobileNumber = other.MobileNumber;
            Email = other.Email;
        }

        public bool IsEqual(Customer other)
        {
            return CustomerId == other.CustomerId;
        }
    }
}
