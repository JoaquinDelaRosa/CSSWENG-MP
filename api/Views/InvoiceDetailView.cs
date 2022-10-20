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

            if (invoice.AgentFirstName != null)
                AgentFirstName = invoice.AgentFirstName;
            if (invoice.AgentLastName != null)
                AgentLastName = invoice.AgentLastName;
            
        }

        public int InvoiceId { get; set; }
        public float Amount { get; set; }
        public float DeductibleDue { get; set; }
        public string AgentFirstName { get; set; } = "";
        public string AgentLastName { get; set; } = "";

    }
}
