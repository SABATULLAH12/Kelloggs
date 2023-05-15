using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AQ.Kelloggs.BAL;
using AQ.Kelloggs.Models;
using AQ.Kelloggs.Models.PerformanceDashboard;
using Newtonsoft.Json;
using System.Collections;

namespace AQ.Kelloggs.UI.Controllers
{
    public class PerformanceDashboardController : BaseController
    {
        readonly LeftPanelBAL leftPanelObj = new LeftPanelBAL();
        // GET: PerformanceDashboard
        public ActionResult PerformanceDashboard()

        {
            return View();
        }

        public JsonResult GetPDashboardData(PDRequest PDRequestData)
        {

            JsonResult jsonResult = null;
            PDResponse PDData = null;
            if (PDRequestData != null)
            {
                try
                {

                    PDData = PerformanceDashboardBAL.GetPDashboardData(PDRequestData, this.HttpContext);
                    if (PDRequestData.SelectedModuleId != "6")
                    {
                        leftPanelObj.SubmitStickySelections(new StickyRequest
                        {
                            UserId = Session["Username"].ToString(),
                            ModuleId = (int)Constants.UserGuideType.performanceDashboard,
                            FilterData = PDRequestData.SelectedItems
                        });
                    }

                    jsonResult = Json(PDData, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = Int32.MaxValue;
                    Session[" PerformanceDashboardData"] = JsonConvert.SerializeObject(PDData.DataList);

                    return jsonResult;

                }
                catch (Exception ex)
                {

                    var prms = new object[]{
                                PDRequestData.TimePeriod,
                                PDRequestData.Market,
                                PDRequestData.Category,
                                ex.Message
                            };
                    AQ.Logger.TrackEvent(ex.Message + " Selection:" + string.Join(",", ((IEnumerable)prms).Cast<object>()
                                 .Select(x => x.ToString())
                                 .ToArray()));
                    return Json(PDData, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(PDData, JsonRequestBehavior.AllowGet);
        }

        public string ExportPD(string request, string response, string type)
        {
            var requestData = JsonConvert.DeserializeObject<PDRequest>(HttpUtility.UrlDecode(request));
            var responseData = new PDResponse { DataList = JsonConvert.DeserializeObject<List<PDResponseData>>(HttpUtility.UrlDecode(response)) };
            string file = string.Empty;
            switch (type)
            {
                case "excel":
                    {
                        file = PerformanceDashboardBAL.ExportToExcel.PDExcelExport(requestData, responseData, this.HttpContext);
                        break;
                    }
                case "ppt":
                    {
                        file = PerformanceDashboardBAL.ExportToPpt.PDPptExport(requestData, responseData, this.HttpContext);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            return file;
        }
    }
}
