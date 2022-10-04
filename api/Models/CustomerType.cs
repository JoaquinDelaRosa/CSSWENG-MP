using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class CustomerType
    {
        [Key]
        public CustomerTypesEnum CustomerTypeId { get; set; }
        [Required]
        public string? Name { get; set; }
    }
}
