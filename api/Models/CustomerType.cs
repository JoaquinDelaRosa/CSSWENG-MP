using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class CustomerType : IDBEntity<CustomerType>
    {
        [Key]
        public int CustomerTypeId { get; set; }
        [Required]
        public string Name { get; set; } = "";

        public override void AssignTo(CustomerType other)
        {
            CustomerTypeId = other.CustomerTypeId;
            Name = other.Name;
        }
    }
}
