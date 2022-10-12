using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace api.Models
{
    public enum UserType
    {
        ADMIN,
        EMPLOYEE
    }

    public class User
    {
        [Key]
        public ulong Id { get; set; }

        [Required]
        public string? Username { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string FirstName { get; set; } = "";

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string LastName { get; set; } = "";


        [Required]
        public UserType Type { get; set; } = UserType.EMPLOYEE;


        [Required]
        [PasswordPropertyText]
        public string? Password { get; set; }

        public void AssignTo(User other)
        {
            Username = other.Username;
            FirstName = other.FirstName;
            LastName = other.LastName;
            Password = other.Password;
            Type = other.Type;
        }

        
    }
}
