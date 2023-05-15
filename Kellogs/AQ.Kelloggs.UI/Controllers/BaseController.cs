using System.Web.Mvc;
using System.Web.Security;
using AQLogger;

namespace AQ.Kelloggs.UI.Controllers
{
    public class BaseController : Controller
    {

        protected override void OnAuthorization(AuthorizationContext filterContext)

        {
            if (filterContext != null)
            {
                if (filterContext.HttpContext.Session["username"] == null)
                {                    
                    filterContext.Result = new RedirectResult("/Common");
                }
                //check if the user is authenticated and not Admin
                else if (filterContext.HttpContext.Session != null &&
                    User.Identity.IsAuthenticated &&
                    filterContext.HttpContext.Session["username"] != null &&
                    Session["Roles"].ToString() != "Admin")
                {
                    if (System.Web.HttpContext.Current.Request.Params["moduleid"] != null)
                    {
                        //check whehter the user has the access to the module.
                        if (!Session["Modules"].ToString().Contains(System.Web.HttpContext.Current.Request.Params["moduleid"]))
                        {
                            filterContext.Result = new RedirectResult("/Error/AccessDenied");
                        }
                    }
                }
                else
                {
                    //Left Blank Intentionally
                }

                //Usage History
                if (filterContext.Controller.ValueProvider != null)
                    Logger.TrackEvent(filterContext.Controller.ValueProvider.GetValue("controller").RawValue.ToString(), filterContext.Controller.ValueProvider.GetValue("action").RawValue.ToString());
            }
            base.OnAuthorization(filterContext);
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            AQLogger.Logger.GetInstance().Error(filterContext.Exception);
            base.OnException(filterContext);
        }

    }
}
