using System.Collections;
using System.Runtime.InteropServices;
using Xunit;

namespace test
{
    public class CustomerControllerTest
    {
        private CustomerController controller;
        private static int itr = 0;

        public CustomerControllerTest()
        {
            AutoworksDBContext ctx = CreateNewContext();
            controller = new CustomerController(ctx);
        }

        public class Generator : IEnumerable<object[]>
        {
            public IEnumerator<object[]> GetEnumerator()
            {
                yield return new object[]
                {
                    new Customer()
                    {
                        CustomerId = 999,
                        FirstName = "Bob",
                        LastName = "Doe",
                        Company = "XYZ",
                        CustomerTypeId = CustomerTypesEnum.WALK_IN
                    },
                    new Customer()
                    {
                        CustomerId = 999,
                        FirstName = "Jack",
                        LastName = "Black",
                        Company = "XYZ",
                        CustomerTypeId = CustomerTypesEnum.WALK_IN
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
            controller = new CustomerController(context);
            return context;
        }

        [Theory]
        [ClassData(typeof(Generator))]
        public async void CustomerCRUDComplete(Customer first, Customer second)
        {
            CreateNewContext();

            Customer c = first;
            Customer u = second;

            controller.Create(c);
            Customer? beforeDelete = await controller.GetById(c.CustomerId);
           
            controller.Update(c.CustomerId, u);
            Customer? afterUpdate = await controller.GetById(c.CustomerId);

            await controller.Delete(c.CustomerId);
            Customer? afterDelete = await controller.GetById(c.CustomerId);

            Assert.NotNull(beforeDelete);
            Assert.NotNull(afterUpdate);

            if (beforeDelete == null || afterUpdate == null)
                return;

            Assert.True(beforeDelete.CustomerId == c.CustomerId);
            Assert.True(beforeDelete.FirstName == c.FirstName);
            Assert.True(beforeDelete.LastName == c.LastName);
            Assert.True(beforeDelete.Company == c.Company);
            Assert.True(beforeDelete.CustomerTypeId == c.CustomerTypeId);

            Assert.True(afterUpdate.CustomerId == c.CustomerId);
            Assert.True(afterUpdate.FirstName == u.FirstName);
            Assert.True(afterUpdate.LastName == u.LastName);
            Assert.True(afterUpdate.Company == u.Company);
            Assert.True(afterUpdate.CustomerTypeId == u.CustomerTypeId);

            Assert.Null(afterDelete);
        }

        [Fact]
        public async void MultipleCustomers()
        {
            AutoworksDBContext context = CreateNewContext();
            for (int i = 0; i < 1000; ++i)
            {
                controller.Create(new Customer()
                {
                    CustomerId = i + 1,
                    FirstName = "Hello ",
                    LastName = i.ToString(),
                    Company = "XYZ",
                    CustomerTypeId = CustomerTypesEnum.FLEET
                });
            }

            context.SaveChanges();
            var result = controller.GetAll();

            Assert.IsAssignableFrom<IEnumerable<CustomerDetailView>>(result);
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