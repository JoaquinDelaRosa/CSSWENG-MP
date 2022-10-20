using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    // Defines a model for a CustomerType entity in the database and sets up the generated CustoemrType table.
    public enum CustomerTypesEnum
    {
        PERSONAL,
        WALK_IN,
        FLEET,
        INSURANCE,
        OTHER
    }

    public class CustomerType : IDBEntity<CustomerType>
    {
        [Key]
        public CustomerTypesEnum Id { get; set; }
        [Required]
        public string Name { get; set; } = "";

        public override void AssignTo(CustomerType other)
        {
            Id = other.Id;
            Name = other.Name;
        }
    }
}
