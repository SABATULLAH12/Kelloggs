using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using AQ.Kelloggs.BAL;
using AQ.Kelloggs.Models;

namespace AQ.Kelloggs.UI.Controllers
{
    public class DashboardController : BaseController
    {
        readonly DashboardBAL balObj = new DashboardBAL();
        // GET: Dashboard
        public ActionResult Dashboard()
        {
            return View();
        }       
        public JsonResult AddToDashboard(CommonRequestDashboard request)
        {
            HttpContextBase context = this.HttpContext;
            var response = balObj.AddToDashboard(request, context);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateDashboard(CommonRequestDashboard request)
        {
            HttpContextBase context = this.HttpContext;
            var response = balObj.UpdateDashboard(request, context);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteDashboard(CommonRequestDashboard request)
        {
            HttpContextBase context = this.HttpContext;
            var response = balObj.DeleteDashboard(request, context);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveAsDashboard(CommonRequestDashboard request)
        {
            HttpContextBase context = this.HttpContext;
            var response = balObj.SaveAsDashboard(request, context);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ShareDashboard(CommonRequestDashboard request)
        {
            HttpContextBase context = this.HttpContext;
            var response = balObj.ShareDashboard(request, context);
            return Json(response, JsonRequestBehavior.AllowGet);
        }        
        public string DashboardExportToPpt(IList<CommonRequestDashboard> request)
        {
            try
            {
                return DashboardBAL.GetPptDetails(request);
            }
            catch (Exception ex)
            {
                AQ.Logger.TrackEvent(ex.Message);
                return "";
            }
        }
    }
}
