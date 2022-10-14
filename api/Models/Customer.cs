using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public enum CustomerTypesEnum
    {
        PERSONAL,
        WALK_IN,
        FLEET,
        INSURANCE,
        OTHER
    }

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


        [Required]
        [ForeignKey("CustomerType")]
        public CustomerTypesEnum CustomerTypeId { get; set; }

        // Casting enum to string might need to be in the set method too unsure

        [Column(TypeName = "nvarchar(100)")]
        public string? Company { get; set; }
        
        public override void AssignTo(Customer other)
        {
            FirstName = other.FirstName;
            LastName = other.LastName;
            CustomerTypeId = other.CustomerTypeId;
            Company = other.Company;
        }

        public bool IsEqual(Customer other)
        {
            return CustomerId == other.CustomerId;
        }
    }
}
