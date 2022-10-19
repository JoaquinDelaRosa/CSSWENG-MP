using api.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading;

namespace api.Views
{
    public class OrderDetailView
    {
        public OrderDetailView(Order order, Customer? customer, Vehicle? vehicle, Invoice? invoice)
        {
            Status = order.Status;
            TimeIn = order.TimeIn;
            TimeOut = order.TimeOut;

            customer = (customer == null) ? new Customer() : customer;
            vehicle = (vehicle == null) ? new Vehicle() : vehicle;
            invoice = (invoice == null) ? new Invoice() : invoice;

            CustomerDetails = new CustomerDetailView(customer);
            VehicleDetails = new VehicleDetailView(vehicle);
            InvoiceDetails = new InvoiceDetailView(invoice);

            EstimateNumber = order.EstimateNumber;
            ScopeOfWork = order.ScopeOfWork;
            Expenses = order.Expenses;

        }
        public int OrderId { get; set; }
        public OrderStatusEnum Status { get; set; }
        public DateTime TimeIn { get; set; }
        public DateTime TimeOut { get; set; }

        public CustomerDetailView CustomerDetails { get; set; }
        public VehicleDetailView VehicleDetails { get; set; }
        public InvoiceDetailView InvoiceDetails { get; set; }

        public string? EstimateNumber { get; set; }
        public string? ScopeOfWork { get; set; }
        public float Expenses { get; set; }

    }
}
