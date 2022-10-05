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

    public class Customer
    {
        [Key]
        public ulong CustomerId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? FirstName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? LastName { get; set; }


        [Column(TypeName = "nvarchar(100)")]
        public string? MiddleName { get; set; }

        [Required]
        [ForeignKey("CustomerType")]
        public CustomerTypesEnum CustomerTypeId { get; set; }

        // Casting enum to string might need to be in the set method too unsure

        [Column(TypeName = "nvarchar(100)")]
        public string? Company { get; set; }


        


    }
}
