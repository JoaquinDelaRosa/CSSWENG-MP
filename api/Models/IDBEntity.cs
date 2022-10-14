namespace api.Models
{
    // Intentionally abstract class because DBSet<T> constrains T to a class
    public abstract class IDBEntity<T> where T : class
    {
        public abstract void AssignTo(T other);
    }
}
