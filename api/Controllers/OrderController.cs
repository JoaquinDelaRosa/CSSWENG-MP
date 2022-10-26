using api.Data;
using api.Models;
using api.Views;
using MessagePack.Formatters;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class OrderController : GenericItemController<Order, OrderDetailView>
    {
        private readonly CustomerController customerController;
        private readonly VehicleController vehicleController;
        private readonly InvoiceController invoiceController;
        private readonly ExpenseRecordController expenseRecordController;

        public OrderController(AutoworksDBContext ctx) : base(new OrderRepository(ctx))
        {
            customerController = new CustomerController(ctx);
            vehicleController = new VehicleController(ctx);
            invoiceController = new InvoiceController(ctx);
            expenseRecordController = new ExpenseRecordController(ctx);
        }
        
        public async override Task<IEnumerable<OrderDetailView>> GetAll()
        {
            List<OrderDetailView> view = new List<OrderDetailView>();

            foreach (Order order in repository.GetAll())
            {
                view.Add(await GetView(order));
            }

            return view;
        }

        private async Task<OrderDetailView> GetView(Order order)
        {
            Customer? customer = await customerController.GetRaw(order.CustomerId);
            Vehicle? vehicle = await vehicleController.GetRaw(order.VehicleId);
            Invoice? invoice = await invoiceController.GetRaw(order.InvoiceId);

            return new OrderDetailView(order, customer, vehicle, invoice);
        }

        public async override Task<OrderDetailView?> Get(int id)
        {
            Order? order = await GetRaw(id);
            if (order == null)
                return null;

            return await GetView(order);
        }

        public async override Task<IEnumerable<OrderDetailView>> GetByPredicate(Predicate<Order> predicate)
        {
            IEnumerable<OrderDetailView> filtered = await GetAll();

            return filtered;
        }


        [ApiExplorerSettings(IgnoreApi =true)]
        public async Task<bool> HasValidFK(Order order)
        {
            if (await customerController.GetRaw(order.CustomerId) == null)
                return false;

            if (await vehicleController.GetRaw(order.VehicleId) == null)
                return false;

            if (await invoiceController.GetRaw(order.InvoiceId) == null)
                return false;

            return true;
        }
        public async override Task<Order?> Create(Order other)
        {
            if (! await HasValidFK(other))
            {
                return null;
            }
            return await base.Create(other);
        }

        public async override Task<bool> Update(int id, Order entity)
        {
            if (!await HasValidFK(entity))
            {
                return false;
            }

            return await base.Update(id, entity);
        }
    }
}
