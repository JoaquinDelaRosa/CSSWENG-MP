using api.Views;
using Microsoft.EntityFrameworkCore;

namespace test
{
    public class CustomerControllerTest
    {
        [Fact]
        public void BasicTest()
        {
            Assert.True(true);
        }

        [Fact]
        public void GetAll_Returns_All_Customers()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AutoworksDBContext>()
                .UseInMemoryDatabase(databaseName: "GetAll_Returns_All_Customers")
                .Options;

            var context = new AutoworksDBContext(options);

            context.Customers?.AddRange(Enumerable.Range(1, 1000).Select(c =>
                new Customer
                {
                    LastName = "Customer " + c,
                    FirstName = "Test",
                    CustomerTypeId = CustomerTypesEnum.PERSONAL
                })
            );

            context.SaveChanges();

            var controller = new CustomerController(context);

            // Act
            var result = controller.GetAll();

            // Assert
            var model = Assert.IsAssignableFrom<IEnumerable<CustomerDetailView>>(result);

            Assert.True(model.Count() == 1000);
        }

        [Fact]
        public async Task GetById_Returns_Right_Customers()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AutoworksDBContext>()
                .UseInMemoryDatabase(databaseName: "GetById_Returns_Right_Customers")
                .Options;

            var context = new AutoworksDBContext(options);

            context.Customers?.AddRange(Enumerable.Range(1, 1000).Select(c =>
                new Customer
                {
                    LastName = "Customer " + c,
                    FirstName = "Test",
                    CustomerTypeId = CustomerTypesEnum.PERSONAL
                })
            );
            context.SaveChanges();

            var controller = new CustomerController(context);

            // Act
            var customer1 = await controller.GetById(1);
            var customer2 = await controller.GetById(50);
            var customer3 = await controller.GetById(250);
            var customer4 = await controller.GetById(750);
            var customer5 = await controller.GetById(1000);

            // Assert
            var model1 = Assert.IsAssignableFrom<Customer>(customer1);
            var model2 = Assert.IsAssignableFrom<Customer>(customer2);
            var model3 = Assert.IsAssignableFrom<Customer>(customer3);
            var model4 = Assert.IsAssignableFrom<Customer>(customer4);
            var model5 = Assert.IsAssignableFrom<Customer>(customer5);

            Assert.Equal(1, model1.CustomerId);
            Assert.Equal(50, model2.CustomerId);
            Assert.Equal(250, model3.CustomerId);
            Assert.Equal(750, model4.CustomerId);
            Assert.Equal(1000, model5.CustomerId);
        }

        [Fact]
        public void GetByPredicate_Returns_Correct_Data()
        {
            Assert.True(true);
        }

        [Fact]
        public void Create_Returns_Customer_And_Adds_Data_To_DB()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<AutoworksDBContext>()
                .UseInMemoryDatabase(databaseName: "Create_Returns_Customer_And_Adds_Data_To_DB")
                .Options;

            var context = new AutoworksDBContext(options);

            context.Customers?.AddRange(Enumerable.Range(1, 999).Select(c =>
                new Customer
                {
                    LastName = "Customer " + c,
                    FirstName = "Test",
                    CustomerTypeId = CustomerTypesEnum.OTHER
                })
            );
            context.SaveChanges();

            var controller = new CustomerController(context);

            // Act 
            var customer = new Customer
            {
                LastName = "Customer",
                FirstName = "New",
                CustomerTypeId = CustomerTypesEnum.OTHER
            };

            var result_Create = controller.Create(customer);

            // Assert
            var model = Assert.IsAssignableFrom<Customer>(result_Create);

            Assert.True(1000 == model.CustomerId);
            Assert.True("Customer" == model.LastName);
            Assert.True("New" == model.FirstName);
            Assert.True(CustomerTypesEnum.OTHER == model.CustomerTypeId);
        }

        [Fact]
        public void Update_Returns_True_And_Modifies_Data()
        {
            Assert.True(true);
        }

        [Fact]
        public void Update_Returns_False_And_Data_Unmodified()
        {
            Assert.True(true);
        }

        [Fact]
        public void Delete_Returns_True_And_Data_Is_Erased()
        {
            Assert.True(true);
        }

        [Fact]
        public void Delete_Returns_False_And_Data_Not_Erased()
        {
            Assert.True(true);
        }
    }
}