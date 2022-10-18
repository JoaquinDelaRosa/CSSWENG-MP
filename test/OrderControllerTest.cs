using api.Models;
using System.Collections;
using System.Runtime.InteropServices;
using Xunit;

namespace test
{
    public class OrderControllerTest
    {
        private OrderController controller;
        private static int itr = 0;

        private const int TEST_CUSTOMER_ID = 100;
        private const int TEST_VEHICLE_ID = 200;
        private const int TEST_INVOICE_ID = 300;

        private const int TEST_NONEXISTENT_CUSTOMER_ID = 404;
        private const int TEST_NONEXISTENT_VEHICLE_ID = 505;
        private const int TEST_NONEXISTENT_INVOICE_ID = 606;

        public OrderControllerTest()
        {
            AutoworksDBContext ctx = CreateNewContext();
            controller = new OrderController(ctx);
        }

        public class Generator : IEnumerable<object[]>
        {
            public IEnumerator<object[]> GetEnumerator()
            {
                yield return new object[]
                {
                    new Order()
                    {
                        OrderId = 1000,
                        Status = OrderStatusEnum.UNPAID,
                        TimeIn = DateTime.Now,
                        CustomerId = TEST_CUSTOMER_ID,
                        VehicleId = TEST_VEHICLE_ID,
                        InvoiceId = TEST_INVOICE_ID,

                        EstimateNumber = "Hello",
                        ScopeOfWork = "To do stuff",
                        Expenses = 100
                    },
                    new Order()
                    {
                        OrderId = 1000,
                        Status = OrderStatusEnum.PAID,
                        TimeOut = DateTime.Now,
                        TimeIn = DateTime.Now,
                        CustomerId = TEST_CUSTOMER_ID,
                        VehicleId = TEST_VEHICLE_ID,
                        InvoiceId = TEST_INVOICE_ID,

                        EstimateNumber = "Hello",
                        ScopeOfWork = "To do stuff",
                        Expenses = 100
                    }
                };
            }

            IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
        }

        public AutoworksDBContext CreateNewContext()
        {
            var options = new DbContextOptionsBuilder<AutoworksDBContext>()
                .UseInMemoryDatabase(databaseName: nameof(OrderControllerTest) + itr.ToString())
                .Options;

            ++itr;
            AutoworksDBContext context = new AutoworksDBContext(options);
            controller = new OrderController(context);
            MakeOrderRelatedEntities(context);
            return context;
        }

        private void MakeOrderRelatedEntities(AutoworksDBContext context)
        {
            CustomerController customerController = new CustomerController(context);
            VehicleController vehicleController = new VehicleController(context);
            InvoiceController invoiceController = new InvoiceController(context);

            customerController.Create(new Customer() { 
                CustomerId = TEST_CUSTOMER_ID,
                FirstName = "Test", LastName = "User"
            });
            vehicleController.Create(new Vehicle() { 
                VehicleId = TEST_VEHICLE_ID
            });
            invoiceController.Create(new Invoice() { 
                InvoiceId = TEST_INVOICE_ID,
                AgentFirstName = "Test", AgentLastName = "Agent"
            });
        }

        [Theory]
        [ClassData(typeof(Generator))]
        public async void CRUDComplete(Order first, Order second)
        {
            CreateNewContext();

            controller.Create(first);

            Order? afterCreate = await controller.GetById(first.OrderId);
           
            controller.Update(first.OrderId, second);
            Order? afterUpdate = await controller.GetById(first.OrderId);

            await controller.Delete(first.OrderId);
            Order? afterDelete = await controller.GetById(first.OrderId);

            Assert.NotNull(afterCreate);
            Assert.NotNull(afterUpdate);

            if (afterCreate == null || afterUpdate == null)
                return;

            Assert.True(afterCreate.OrderId == first.OrderId);
            Assert.True(afterCreate.Status == first.Status);
            Assert.True(afterCreate.TimeIn == first.TimeIn);
            Assert.True(afterCreate.TimeOut == first.TimeOut);
            Assert.True(afterCreate.CustomerId == first.CustomerId);
            Assert.True(afterCreate.VehicleId == first.VehicleId);
            Assert.True(afterCreate.InvoiceId == first.InvoiceId);
            Assert.True(afterCreate.EstimateNumber == first.EstimateNumber);
            Assert.True(afterCreate.ScopeOfWork == first.ScopeOfWork);
            Assert.True(afterCreate.Expenses == first.Expenses);

            Assert.True(afterUpdate.OrderId == first.OrderId);
            Assert.True(afterUpdate.Status == second.Status);
            Assert.True(afterUpdate.TimeIn == second.TimeIn);
            Assert.True(afterUpdate.TimeOut == second.TimeOut);
            Assert.True(afterUpdate.CustomerId == second.CustomerId);
            Assert.True(afterUpdate.VehicleId == second.VehicleId);
            Assert.True(afterUpdate.InvoiceId == second.InvoiceId);
            Assert.True(afterUpdate.EstimateNumber == second.EstimateNumber);
            Assert.True(afterUpdate.ScopeOfWork == second.ScopeOfWork);
            Assert.True(afterUpdate.Expenses == second.Expenses);

            Assert.Null(afterDelete);
        }

        [Fact]
        public async void GetDoesNotExist()
        {
            CreateNewContext();
            Order? order = await controller.GetById(10245102);
            Assert.Null(order);

            controller.Update(-1, new Order());
            await controller.Delete(-1000);
        }
        [Fact]
        public async  void AddDoesNotExist()
        {
            AutoworksDBContext context = CreateNewContext();
            const int id = -1;

            Order o = new Order()
            {
                OrderId = id,
                CustomerId = TEST_NONEXISTENT_CUSTOMER_ID,
                InvoiceId = TEST_NONEXISTENT_INVOICE_ID,
                VehicleId = TEST_NONEXISTENT_VEHICLE_ID
            };

            Assert.False(await controller.HasValidFK(o));

            Order? order = await controller.GetById(id);
            Assert.Null(order);
        }

        [Fact]
        public async void GetAll()
        {
            AutoworksDBContext context = CreateNewContext();
            for (int i = 0; i < 1000; ++i)
            {
                controller.Create(new Order()
                {
                    OrderId = i + 1,
                    CustomerId = TEST_CUSTOMER_ID,
                    VehicleId = TEST_VEHICLE_ID,
                    InvoiceId = TEST_INVOICE_ID
                });
            }

            context.SaveChanges();
            var result = controller.GetAll();

            Assert.IsAssignableFrom<IEnumerable<Order>>(result);
            Assert.True(result.Count() == 1000);
            
            for (int i = 0; i < 1000; ++i)
            {
                await controller.Delete(i + 1);
            }

            result = controller.GetAll();
            Assert.True(result.Count() == 0);
        }
    }
}