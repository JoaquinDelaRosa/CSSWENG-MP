using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public PersonName Name { get; set; }

        [Required]
        public UserType Type { get; set; } = UserType.EMPLOYEE;

        [Required]
        [PasswordPropertyText]
        public string? Password { get; set; }
    }
}
