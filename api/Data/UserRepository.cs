using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(DbContext context) : base(context)
        {
            
        }

        public User? GetByUsername(string Username)
        {
            return dbSet.Where(x => x.Username == Username).First<User>();
        }
    }
}
