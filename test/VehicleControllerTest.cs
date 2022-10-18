using System.Collections;
using System.Runtime.InteropServices;
using Xunit;

namespace test
{
    public class VehicleControllerTest
    {
        private VehicleController controller;
        private static int itr = 0;

        public VehicleControllerTest()
        {
            AutoworksDBContext ctx = CreateNewContext();
            controller = new VehicleController(ctx);
        }

        public class Generator : IEnumerable<object[]>
        {
            public IEnumerator<object[]> GetEnumerator()
            {
                yield return new object[]
                {
                    new Vehicle()
                    {
                        VehicleId = 100,
                        LicensePlate = "ABC123",
                        Manufacturer = "Dell",
                        Model = "Lenovo",
                        YearManufactured = 2002
                    },
                     new Vehicle()
                    {
                        VehicleId = 100,
                        LicensePlate = "ABC123",
                        Manufacturer = "Forza",
                        Model = "Horizon",
                        YearManufactured = 2002
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
            controller = new VehicleController(context);
            return context;
        }

        [Theory]
        [ClassData(typeof(Generator))]
        public async void CRUDComplete(Vehicle first, Vehicle second)
        {
            CreateNewContext();

            controller.Create(first);
            Vehicle? afterCreate = await controller.GetById(first.VehicleId);
           
            controller.Update(first.VehicleId, second);
            Vehicle? afterUpdate = await controller.GetById(first.VehicleId);

            await controller.Delete(first.VehicleId);
            Vehicle? afterDelete = await controller.GetById(first.VehicleId);

            Assert.NotNull(afterCreate);
            Assert.NotNull(afterUpdate);

            if (afterCreate == null || afterUpdate == null)
                return;

            Assert.True(afterCreate.VehicleId == first.VehicleId);
            Assert.True(afterCreate.Model == first.Model);
            Assert.True(afterCreate.LicensePlate == first.LicensePlate);
            Assert.True(afterCreate.Manufacturer == first.Manufacturer);
            Assert.True(afterCreate.YearManufactured == first.YearManufactured);

            Assert.True(afterUpdate.VehicleId == first.VehicleId);
            Assert.True(afterUpdate.Model == second.Model);
            Assert.True(afterUpdate.LicensePlate == second.LicensePlate);
            Assert.True(afterUpdate.Manufacturer == second.Manufacturer);
            Assert.True(afterUpdate.YearManufactured == second.YearManufactured);

            Assert.Null(afterDelete);
        }

        [Fact]
        public async void GetDoesNotExist()
        {
            CreateNewContext();
            Vehicle? vehicle = await controller.GetById(10245102);
            Assert.Null(vehicle);

            controller.Update(-1, new Vehicle());
            await controller.Delete(-1000);
        }


        [Fact]
        public async void GetAll()
        {
            AutoworksDBContext context = CreateNewContext();
            for (int i = 0; i < 1000; ++i)
            {
                controller.Create(new Vehicle()
                {
                    VehicleId = i + 1
                });
            }

            context.SaveChanges();
            var result = controller.GetAll();

            Assert.IsAssignableFrom<IEnumerable<VehicleDetailView>>(result);
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