using System.Web.Mvc;
using System.Configuration;
using models = AQ.Kelloggs.Models;
namespace AQ.Kelloggs.UI.Controllers
{
    public class ErrorController : Controller
    {
        readonly bool isMaintainence = ConfigurationManager.AppSettings["IsMaintainence"].ToString(models.Constants.Culture) == "true";
        // GET: Error
        public ActionResult Index(string error)
        {
            ViewBag.Message = error;
            return View();
        }

        public ActionResult HttpError404(string error)
        {
            ViewBag.Message = error;
            ViewBag.Title = "Page Not Found";
            return View();
        }

        public ActionResult HttpError500(string error)
        {
            ViewBag.Message = error;
            ViewBag.Title = "Internal Server Error. Please contact administrator";
            return View();
        }

        public ActionResult AccessDenied()
        {
            return View();
        }

        public ActionResult NoAccess()
        {
            return View();
        }
        public ActionResult Maintainence()
        {
            if ((Session["Email"] != null && 
                ConfigurationManager.AppSettings["AdminList"].ToUpper(models.Constants.Culture).Contains(Session["Email"].ToString().ToUpper(Models.Constants.Culture))) || !isMaintainence)
            {
                return RedirectToAction("Home", "Home");
            }
            return View();
        }
    }
}

