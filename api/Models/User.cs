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
        [Column(TypeName = "nvarchar(100)")]
        public string FirstName { get; set; } = "";

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string LastName { get; set; } = "";

        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string MiddleName { get; set; } = "";

        [Required]
        public UserType Type { get; set; } = UserType.EMPLOYEE;

        [Required]
        [PasswordPropertyText]
        public string? Password { get; set; }
    }
}
