using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{


    public class Order : IDBEntity<Order>
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        public OrderStatusEnum Status { get; set; } = OrderStatusEnum.UNPAID;

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

        public override void AssignTo(Order other)
        {
            Status = other.Status;
            TimeIn = other.TimeIn;
            TimeOut = other.TimeOut;
            CustomerId = other.CustomerId;
            VehicleId = other.VehicleId;
            InvoiceId = other.InvoiceId;
            EstimateNumber = other.EstimateNumber;
            ScopeOfWork = other.ScopeOfWork;
            Expenses = other.Expenses;
        }
    }
}
