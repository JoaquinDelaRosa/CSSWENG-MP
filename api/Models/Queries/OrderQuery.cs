namespace api.Models.Queries
{
    public class OrderQuery : IModelQuery<Order>
    {
        public OrderStatusEnum? Status { get; set; } = null;
        public CustomerTypesEnum? CustomerType { get; set; } = null;

        public override bool IsSatisfied(Order x)
        {
            return (Status == null) ? true : x.Status == Status &&
                (CustomerType == null) ? true : x.CustomerTypeId == CustomerType;
        }
    }
}
