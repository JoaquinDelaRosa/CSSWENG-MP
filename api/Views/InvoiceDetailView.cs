using api.Models;

namespace api.Views
{
    public class InvoiceDetailView
    {
        public InvoiceDetailView(Invoice invoice)
        {
            InvoiceId = invoice.InvoiceId;
            Amount = invoice.Amount;
            DeductibleDue = invoice.DeductibleDue;

            AgentFirstName = (invoice.AgentFirstName == null) ? "" : invoice.AgentFirstName;
            AgentLastName = (invoice.AgentLastName == null) ? "" : invoice.AgentLastName;

            DatePaid = invoice.DatePaid;
            AgentCommission = invoice.AgentCommission;

        }

        public int InvoiceId { get; set; }
        public float Amount { get; set; }
        public float DeductibleDue { get; set; }
        public string AgentFirstName { get; set; } = "";
        public string AgentLastName { get; set; } = "";
        public DateTime DatePaid { get; set; }
        public float AgentCommission { get; set; }

    }
}
