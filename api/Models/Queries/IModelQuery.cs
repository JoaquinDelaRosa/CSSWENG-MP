namespace api.Models.Queries
{
    public abstract class IModelQuery<T> where T : class
    {
        public abstract bool IsSatisfied(T x);
    }
}
