using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AQ.Kelloggs.BAL;
using AQ.Kelloggs.Models.Snapshot;
using AQ.Kelloggs.Models;
using Newtonsoft.Json;
using System.Collections;

namespace AQ.Kelloggs.UI.Controllers
{
    public class SnapshotController : BaseController
    {
        readonly SnapshotBAL balObj = new SnapshotBAL();
        readonly LeftPanelBAL leftPanelObj = new LeftPanelBAL();
        readonly object objLocker = new object();
        string ThreadCounter = "0";
        readonly List<SnapshotResponse> lstSnapshotData = new List<SnapshotResponse>();
        //Sytsem.Data.DataSet 
        // GET: Snapshot
        public ActionResult Snapshot()
        {
            return View();
        }
        //public JsonResult GetSnapShotDataWidget(Request SnapshotRequestData)
        //{
        //    JsonResult jsonResult = null;
        //    if (SnapshotRequestData != null)
        //    {
        //        leftPanelObj.SubmitStickySelections(new StickyRequest
        //        {
        //            UserId = Session["Username"].ToString(),
        //            ModuleId = (int)Constants.UserGuideType.snapshot,
        //            FilterData = SnapshotRequestData.SelectedItems
        //        });

        //        System.Threading.Tasks.Parallel.For(1, (int)Constants.MagicNumbers.eleven, new System.Threading.Tasks.ParallelOptions { MaxDegreeOfParallelism = 3 }, i =>
        //          {
        //              Request tmp = SnapshotRequestData.copyobject();
        //              tmp.WidgetId = i;
        //              SnapshotResponse snapData = balObj.GetSnapshotData(tmp, this.HttpContext);
        //              lstSnapshotData.Add(snapData);
        //          });
        //        jsonResult = Json(lstSnapshotData, JsonRequestBehavior.AllowGet);
        //        jsonResult.MaxJsonLength = Int32.MaxValue;
        //    }
        //    return jsonResult;
        //}

        public JsonResult GetSnapShotDataWidget(Request SnapshotRequestData)
        {
            JsonResult jsonResult = null;
            if (SnapshotRequestData != null)
            {
                if (SnapshotRequestData.SelectedModuleId != "6")
                {
                    leftPanelObj.SubmitStickySelections(new StickyRequest
                    {
                        UserId = Session["Username"].ToString(),
                        ModuleId = (int)Constants.UserGuideType.snapshot,
                        FilterData = SnapshotRequestData.SelectedItems
                    });
                }

                for (int i = 1; i <= (int)Constants.MagicNumbers.ten; i++)
                {
                    Request tmp = SnapshotRequestData.copyobject();
                    tmp.WidgetId = i;
                    System.Threading.Thread th = new System.Threading.Thread(GetSnapshotData);
                    th.Start(tmp);
                    lock (objLocker)
                    {
                        ThreadCounter = (int.Parse(ThreadCounter, Constants.Culture) + 1).ToString(Constants.Culture);
                    }
                }
                while (int.Parse(ThreadCounter, Constants.Culture) > 0)
                {
                    System.Threading.Thread.Sleep((int)Constants.MagicNumbers.ten * (int)Constants.MagicNumbers.thousand);//10,000 ms
                }
                jsonResult = Json(lstSnapshotData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = Int32.MaxValue;
            }
            return jsonResult;
        }


        public void GetSnapshotData(object objSnapshotRequestData)
        {
            Request SnapshotRequestData = (Request)objSnapshotRequestData;
            if (SnapshotRequestData != null)
            {
                try
                {
                    SnapshotResponse SnapshotData = balObj.GetSnapshotData(SnapshotRequestData, this.HttpContext);

                    lock (SnapshotData)
                    {
                        lstSnapshotData.Add(SnapshotData);
                    }

                }
                catch (Exception ex)
                {
                    var prms = new object[]{
                        SnapshotRequestData.TimePeriod ,
                        SnapshotRequestData.Market,
                        SnapshotRequestData.Occasion,
                        SnapshotRequestData.AdlFilters,
                        SnapshotRequestData.Significance,
                        SnapshotRequestData.WidgetId,
                        SnapshotRequestData.SelectionSummary,
                        ex.Message
                    };
                    AQ.Logger.TrackEvent(ex.Message + " Selection:" + string.Join(",", ((IEnumerable)prms).Cast<object>()
                                 .Select(x => x.ToString())
                                 .ToArray()));

                }
                finally
                {
                    ThreadCounter = (int.Parse(ThreadCounter, Constants.Culture) - 1).ToString(Constants.Culture);
                }
            }
        }

        public JsonResult GetSnapshotDataDashboard(Request SnapshotRequestData)
        {

            JsonResult jsonResult = null;
            SnapshotResponse SnapshotData = null;
            try
            {
                SnapshotData = balObj.GetSnapshotData(SnapshotRequestData, this.HttpContext);
                jsonResult = Json(SnapshotData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = Int32.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                if (SnapshotRequestData != null)
                {
                    var prms = new object[]{
                        SnapshotRequestData.TimePeriod ,
                        SnapshotRequestData.Market,
                        SnapshotRequestData.Occasion,
                        SnapshotRequestData.AdlFilters,
                        SnapshotRequestData.Significance,
                        SnapshotRequestData.WidgetId,
                        SnapshotRequestData.SelectionSummary,
                    };
                    AQ.Logger.TrackEvent(ex.Message + " Selection:" + string.Join(",", ((IEnumerable)prms).Cast<object>()
                                     .Select(x => x.ToString())
                                     .ToArray()));
                }
                return Json(SnapshotData, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        [ValidateInput(true)]
        public JsonResult SaveImage(CommonExportsRequest request)
        {
            HttpContextBase context = this.HttpContext;
            var response = SnapshotBAL.ExportPpt.GetPptExportsDetails(request, context);

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [ValidateInput(true)]
        public string SnapshotExportToPpt(CommonExportsRequest request)
        {
            try
            {
                return SnapshotBAL.ExportPpt.GetPptDetails(request);
            }
            catch (Exception ex) when (ex is MethodAccessException)
            {
                AQ.Logger.TrackEvent(ex.Message);
                return "";
            }
        }

        [HttpPost]
        [ValidateInput(true)]
        public string SnapshotExportToExcel(string request, string response)
        {
            var requestData = JsonConvert.DeserializeObject<Request>(HttpUtility.UrlDecode(request));
            var responseData = new SnapshotResponse { DataList = JsonConvert.DeserializeObject<List<ResponseData>>(HttpUtility.UrlDecode(response)) };
            try
            {
                return SnapshotBAL.ExportExcel.GetExcelDetails(requestData, responseData, this.HttpContext);
            }
            catch (Exception ex) when (ex is MemberAccessException)
            {
                AQ.Logger.TrackEvent(ex.Message);
                return "";
            }
        }
    }
}
