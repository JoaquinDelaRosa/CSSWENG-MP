using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    public class IndexController : Controller
    {
        [HttpGet("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("/favicon.ico")]
        public IActionResult GetIcon()
        {
            return View();
        }
    }
}
