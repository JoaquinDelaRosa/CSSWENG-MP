namespace api.Models.Queries
{
    public class ExpenseRecordQuery : IModelQuery<ExpenseRecord>
    {
        private static int DEFAULT_ORDER_ID = -1;
        public int OrderId { get; set; } = DEFAULT_ORDER_ID;

        public override bool IsSatisfied(ExpenseRecord x)
        {
            return (OrderId == DEFAULT_ORDER_ID) ? true : x.OrderId == OrderId;
        }
    }
}
