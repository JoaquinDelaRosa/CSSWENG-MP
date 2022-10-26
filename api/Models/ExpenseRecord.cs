using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class ExpenseRecord : IDBEntity<ExpenseRecord>
    {

        [Key]
        public int Id { get; set; }
        public DateTime DateRecorded { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string Description { get; set; } = "";

        public float Amount { get; set; }

        [Required]
        public int OrderId { get; set; }
        public override void AssignTo(ExpenseRecord other)
        {
            DateRecorded = other.DateRecorded;
            Description = other.Description;
            Amount = other.Amount;
        }
    }
}
