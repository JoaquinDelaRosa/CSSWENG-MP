namespace api.Models
{
    // This defines an interface that is implemented by the DB entities
    // It implements the Curiously Recurring Template Pattern to allow for other classes to apply IDBentity as a constraint while keeping
    // it generic.
    // Intentionally abstract class because DBSet<T> constrains T to a class which isn't possible if it is an interface.
    public abstract class IDBEntity<T> where T : class
    {
        public abstract void AssignTo(T other);
    }
}
