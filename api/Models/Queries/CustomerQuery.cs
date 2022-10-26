namespace api.Models.Queries
{
    public class CustomerQuery : IModelQuery<Customer>
    {
        public string Name { get; set; } = "";

        public override bool IsSatisfied(Customer x)
        {
            return (x.FirstName + " " + x.LastName).Contains(Name);
        }
    }
}
