using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Invoice
    {
        [Key]
        public int InvoiceId { get; set; }

        [Required]
        public float Amount { get; set; }
        [Required]
        public float DeductibleDue { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? AgentFirstName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? AgentLastName { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string? AgentMiddleName { get; set; }
    }
}
