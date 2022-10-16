using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class InvoiceController : GenericItemController<Invoice, Invoice>
    {
        public InvoiceController(AutoworksDBContext ctx) : base(new InvoiceRepository(ctx))
        {

        }
        
        public override IEnumerable<Invoice> GetAll()
        {
            List<Invoice> view = new List<Invoice>();

            foreach (Invoice invoice in repository.GetAll())
            {
                view.Add(invoice);
            }

            return view;
        }

        public override IEnumerable<Invoice> GetByPredicate(Predicate<Invoice> predicate)
        {
            IEnumerable<Invoice> filtered = GetAll();

            return filtered;
        }
    }
}
