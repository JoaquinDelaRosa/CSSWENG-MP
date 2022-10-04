using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public enum CustomerTypes
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

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? MiddleName { get; set; }

        [Required]
        [ForeignKey("CustomerType")]
        public CustomerTypes CustomerTypeId { get; set; }

        // Casting enum to string might need to be in the set method too unsure

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? Company { get; set; }


        


    }
}
