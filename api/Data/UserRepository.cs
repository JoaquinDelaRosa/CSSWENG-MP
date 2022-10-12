
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using System.Runtime.CompilerServices;
using System.Collections;
using System.Security.Cryptography.X509Certificates;

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
