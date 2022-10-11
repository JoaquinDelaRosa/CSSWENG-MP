using api.Models;

namespace api.Views
{
    public class UserDetailView
    {
        public UserDetailView(User user)
        {
            Username = user?.Username;
        }

        public string? Username { get; set; }

       
    }
}
