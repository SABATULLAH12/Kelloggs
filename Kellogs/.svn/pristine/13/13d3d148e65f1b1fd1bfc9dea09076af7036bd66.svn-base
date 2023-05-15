using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace AQ.Kelloggs.UI
{
    public class MvcApplication : System.Web.HttpApplication
    {
        enum HttpErrorCodes
        {
            four = 404, five = 500
        }
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exception = Server.GetLastError();
            Response.Clear();

            if (exception != null)
            {
                AQLogger.Logger.GetInstance().Error(exception.Message);
            }

            HttpException httpException = exception as HttpException;
            if (httpException != null)
            {
                RouteData routeData = new RouteData();
                routeData.Values.Add("controller", "Error");
                switch (httpException.GetHttpCode())
                {
                    case (int)HttpErrorCodes.four:
                        // page not found
                        routeData.Values.Add("action", "HttpError404");
                        break;
                    case (int)HttpErrorCodes.five:
                        // server error
                        routeData.Values.Add("action", "HttpError500");
                        break;
                    default:
                        routeData.Values.Add("action", "Index");
                        break;
                }
                routeData.Values.Add("error", exception.Message);
                // clear error on server
                Server.ClearError();

                Response.RedirectToRoute(routeData.Values);

            }
        }
    }
}
