using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{

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
        public int CustomerTypeId { get; set; }

        // Casting enum to string might need to be in the set method too unsure

        public enum CustomerTypes
        {
            PERSONAL = 0,
            WALK_IN = 1,
            FLEET = 2,
            INSURANCE = 3,
            OTHER = 4
        }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? Company { get; set; }


        


    }
}
