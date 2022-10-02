using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{

    public enum CustomerType
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
        public ulong Id { get; set; }

        [Required]
        public PersonName Name { get; set; }
        [Required]
        public CustomerType Type { get; set; } = CustomerType.PERSONAL;

        public string? Company { get; set; }

    }
}
