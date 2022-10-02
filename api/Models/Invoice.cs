using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public class Invoice
    {
        [Key]
        public int Id { get; set; }
        
        public float Amount { get; set; }
        public float DeductibleDue { get; set; }
        public PersonName AgentName { get; set; }
    }
}
