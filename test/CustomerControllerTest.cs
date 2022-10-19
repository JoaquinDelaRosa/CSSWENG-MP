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
                .UseInMemoryDatabase(databaseName: nameof(CustomerControllerTest) + itr.ToString())
                .Options;

            ++itr;
            AutoworksDBContext context = new AutoworksDBContext(options);
            controller = new CustomerController(context);
            return context;
        }

        [Theory]
        [ClassData(typeof(Generator))]
        public async void CRUDComplete(Customer first, Customer second)
        {
            CreateNewContext();

            await controller.Create(first);
            Customer? afterCreate = await controller.GetById(first.CustomerId);
           
            await controller.Update(first.CustomerId, second);
            Customer? afterUpdate = await controller.GetById(first.CustomerId);

            await controller.Delete(first.CustomerId);
            Customer? afterDelete = await controller.GetById(first.CustomerId);

            Assert.NotNull(afterCreate);
            Assert.NotNull(afterUpdate);

            if (afterCreate == null || afterUpdate == null)
                return;

            Assert.True(afterCreate.CustomerId == first.CustomerId);
            Assert.True(afterCreate.FirstName == first.FirstName);
            Assert.True(afterCreate.LastName == first.LastName);
            Assert.True(afterCreate.Company == first.Company);
            Assert.True(afterCreate.CustomerTypeId == first.CustomerTypeId);

            Assert.True(afterUpdate.CustomerId == first.CustomerId);
            Assert.True(afterUpdate.FirstName == second.FirstName);
            Assert.True(afterUpdate.LastName == second.LastName);
            Assert.True(afterUpdate.Company == second.Company);
            Assert.True(afterUpdate.CustomerTypeId == second.CustomerTypeId);

            Assert.Null(afterDelete);
        }

        [Fact]
        public async void GetDoesNotExist()
        {
            CreateNewContext();
            Customer? customer = await controller.GetById(10245102);
            Assert.Null(customer);

            await controller.Update(-1, new Customer());
            await controller.Delete(-1000);
        }

        [Fact]
        public async void GetAll()
        {
            AutoworksDBContext context = CreateNewContext();
            for (int i = 0; i < 1000; ++i)
            {
                await controller.Create(new Customer()
                {
                    CustomerId = i + 1,
                    FirstName = "Hello ",
                    LastName = i.ToString(),
                    Company = "XYZ",
                    CustomerTypeId = CustomerTypesEnum.FLEET
                });
            }

            context.SaveChanges();
            var result = await controller.GetAll();

            Assert.IsAssignableFrom<IEnumerable<CustomerDetailView>>(result);
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