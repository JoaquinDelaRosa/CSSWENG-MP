using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    // Defines a model for a Invoice entity in the database and sets up the generated Invoice table.
    public class Invoice : IDBEntity<Invoice>
    {
        [Key]
        public int InvoiceId { get; set; }

        [Required]
        public float Amount { get; set; }
        [Required]
        public float DeductibleDue { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? AgentFirstName { get; set; } = "";

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? AgentLastName { get; set; } = "";

        public override void AssignTo(Invoice other)
        {
            Amount = other.Amount;
            AgentFirstName = other.AgentFirstName; 
            AgentLastName = other.AgentLastName;
            DeductibleDue = other.DeductibleDue;
        }
    }
}
