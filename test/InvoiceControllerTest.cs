using System.Collections;
using System.Runtime.InteropServices;
using Xunit;

namespace test
{
    public class InvoiceControllerTest
    {
        private InvoiceController controller;
        private static int itr = 0;

        public InvoiceControllerTest()
        {
            AutoworksDBContext ctx = CreateNewContext();
            controller = new InvoiceController(ctx);
        }

        public class Generator : IEnumerable<object[]>
        {
            public IEnumerator<object[]> GetEnumerator()
            {
                yield return new object[]
                {
                    new Invoice()
                    {
                        InvoiceId = 404,
                        AgentFirstName = "Adam",
                        AgentLastName = "Smith",
                        Amount = 9999,
                        DeductibleDue = 100
                    },
                     new Invoice()
                    {
                        AgentFirstName = "Adam",
                        AgentLastName = "Smith",
                        Amount = 370421.12f,
                        DeductibleDue = 123.456f
                    }
                };
            }

            IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
        }

        public AutoworksDBContext CreateNewContext()
        {
            var options = new DbContextOptionsBuilder<AutoworksDBContext>()
                .UseInMemoryDatabase(databaseName: nameof(InvoiceControllerTest) + itr.ToString())
                .Options;

            ++itr;
            AutoworksDBContext context = new AutoworksDBContext(options);
            controller = new InvoiceController(context);
            return context;
        }

        [Theory]
        [ClassData(typeof(Generator))]
        public async void CRUDComplete(Invoice first, Invoice second)
        {
            CreateNewContext();

            await controller.Create(first);
            Invoice? afterCreate = await controller.GetById(first.InvoiceId);
           
            await controller.Update(first.InvoiceId, second);
            Invoice? afterUpdate = await controller.GetById(first.InvoiceId);

            await controller.Delete(first.InvoiceId);
            Invoice? afterDelete = await controller.GetById(first.InvoiceId);

            Assert.NotNull(afterCreate);
            Assert.NotNull(afterUpdate);

            if (afterCreate == null || afterUpdate == null)
                return;

            Assert.True(afterCreate.InvoiceId == first.InvoiceId);
            Assert.True(afterCreate.AgentFirstName == first.AgentFirstName);
            Assert.True(afterCreate.AgentLastName == first.AgentLastName);
            Assert.True(afterCreate.DeductibleDue == first.DeductibleDue);
            Assert.True(afterCreate.Amount == first.Amount);

            Assert.True(afterUpdate.InvoiceId == first.InvoiceId);
            Assert.True(afterUpdate.AgentFirstName == second.AgentFirstName);
            Assert.True(afterUpdate.AgentLastName == second.AgentLastName);
            Assert.True(afterUpdate.DeductibleDue == second.DeductibleDue);
            Assert.True(afterUpdate.Amount == second.Amount);

            Assert.Null(afterDelete);
        }

        [Fact]
        public async void GetDoesNotExist()
        {
            CreateNewContext();
            Invoice? invoice = await controller.GetById(10245102);
            Assert.Null(invoice);

            await controller.Update(-1, new Invoice());
            await controller.Delete(-1000);
        }

        [Fact]
        public async void GetAll()
        {
            AutoworksDBContext context = CreateNewContext();
            for (int i = 0; i < 1000; ++i)
            {
                await controller.Create(new Invoice()
                {
                    InvoiceId = i + 1,
                    AgentFirstName = "Sample",
                    AgentLastName = "Text"
                });
            }

            context.SaveChanges();
            var result = await controller.GetAll();

            Assert.IsAssignableFrom<IEnumerable<InvoiceDetailView>>(result);
            Assert.True(result.Count() == 1000);
            
            for (int i = 0; i < 1000; ++i)
            {
                await controller.Delete(i + 1);
            }

            result = await controller.GetAll();
            Assert.True(result.Count() == 0);
        }
    }
}