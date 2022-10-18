using System.Collections;
using System.Runtime.InteropServices;
using Xunit;

namespace test
{
    public class OrderControllerTest
    {
        private OrderController controller;
        private static int itr = 0;

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
                        CustomerId = 1,
                        VehicleId = 1,
                        InvoiceId = 1,

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
                        CustomerId = 1,
                        VehicleId = 1,
                        InvoiceId = 1,

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
                .UseInMemoryDatabase(databaseName: "Test" + itr.ToString())
                .Options;

            ++itr;
            AutoworksDBContext context = new AutoworksDBContext(options);
            controller = new OrderController(context);
            return context;
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
            Order? invoice = await controller.GetById(10245102);
            Assert.Null(invoice);

            controller.Update(-1, new Order());
            await controller.Delete(-1000);
        }

        [Fact]
        public async void GetAll()
        {
            AutoworksDBContext context = CreateNewContext();
            for (int i = 0; i < 1000; ++i)
            {
                controller.Create(new Order()
                {

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