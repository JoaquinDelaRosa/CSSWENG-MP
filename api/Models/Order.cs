using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    public enum OrderStatus
    {
        PAID,
        UNPAID,
        OK, 
        PENDING,
        WITH_BALANCE,
        QUOTE_OR_CHECK,
        FOR_LOA_OR_INVOICE
    }

    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        public OrderStatus Status { get; set; } = OrderStatus.UNPAID;

        [Required]
        public DateTime TimeIn { get; set; }
        public DateTime TimeOut { get; set; }

        [Required]
        [ForeignKey("Customer")]
        public ulong CustomerId { get; set; }
        [Required]
        [ForeignKey("Vehicle")]
        public int VehicleId { get; set; }
        [ForeignKey("Invoice")]
        public int InvoiceId { get; set; }
        
        public string? EstimateNumber { get; set; }
        public string? ScopeOfWork { get; set; }
        public float Expenses { get; set; }

    }
}
