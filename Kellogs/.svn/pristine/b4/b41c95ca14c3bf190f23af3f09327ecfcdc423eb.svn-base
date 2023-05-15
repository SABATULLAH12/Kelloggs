using AQ.Kelloggs.BAL;
using AQ.Kelloggs.Models;
using AQ.Kelloggs.Models.AdvancedAnalytics;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AQ.Kelloggs.UI.Controllers
{
    public class AdvancedAnalyticsController : BaseController
    {
        readonly AdvancedAnalyticsBAL balObj = new AdvancedAnalyticsBAL();
        readonly LeftPanelBAL leftPanelObj = new LeftPanelBAL();

        // GET: OSP
        public ActionResult Osp()
        {
            return View();
        }

        public ActionResult CorrespondenceMap()
        {
            return View();
        }

        #region OSP
        public JsonResult GetOspData(OspRequest OSPRequestData)
        {

            JsonResult jsonResult = null;
            OspResponse OSPData = null;
            if (OSPRequestData != null)
            {
                try
                {

                    OSPData = balObj.GetOspData(OSPRequestData, this.HttpContext);
                    leftPanelObj.SubmitStickySelections(new StickyRequest
                    {
                        UserId = Session["Username"].ToString(),
                        ModuleId = (int)Constants.UserGuideType.swimlanes,
                        FilterData = OSPRequestData.SelectedItems
                    });

                    jsonResult = Json(OSPData, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = Int32.MaxValue;
                    Session["AdvancedAnalyticsData"] = JsonConvert.SerializeObject(OSPData.DataList);

                    return jsonResult;

                }
                catch (Exception ex)
                {

                    var prms = new object[]{
                                OSPRequestData.TimePeriod,
                                OSPRequestData.Market,
                                OSPRequestData.OppurtunityFor,
                                OSPRequestData.FilterIDs,
                                OSPRequestData.AdditionalFilter,
                                OSPRequestData.Benchmark,
                                OSPRequestData.RespType,
                                ex.Message
                            };
                    AQ.Logger.TrackEvent(ex.Message + " Selection:" + string.Join(",", ((IEnumerable)prms).Cast<object>()
                                 .Select(x => x.ToString())
                                 .ToArray()));
                    return Json(OSPData, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(OSPData, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOspCellData(OspRequest OSPRequestData)
        {

            JsonResult jsonResult = null;
            OspInnerResponse OSPData = null;
            try
            {

                OSPData = balObj.GetOspCellData(OSPRequestData, this.HttpContext);

                jsonResult = Json(OSPData, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = Int32.MaxValue;
                Session["AdvancedAnalyticsInnerData"] = JsonConvert.SerializeObject(OSPData.DataList);

                return jsonResult;

            }
            catch (Exception ex)
            {
                if (OSPRequestData != null)
                {
                    var prms = new object[]{
                OSPRequestData.TimePeriod,
                OSPRequestData.Market,
                OSPRequestData.OppurtunityFor,
                OSPRequestData.AdditionalFilter,
                OSPRequestData.Benchmark,
                OSPRequestData.RespType,
                OSPRequestData.RowAttributeId,
                OSPRequestData.ColumnAttributeId,
                ex.Message

            };
                    AQ.Logger.TrackEvent(ex.Message + " Selection:" + string.Join(",", ((IEnumerable)prms).Cast<object>()
                                 .Select(x => x.ToString())
                                 .ToArray()));
                }
                return Json(OSPData, JsonRequestBehavior.AllowGet);
            }
        }

        public string GetOspExportPpt(string request, string response, string marketName, string opportunityFor, string summary)
        {
            try
            {
                var responseData = new OspResponse { DataList = JsonConvert.DeserializeObject<List<OspResponseData>>(HttpUtility.UrlDecode(response)) };
                var resquestData = JsonConvert.DeserializeObject<OspRequest>(HttpUtility.UrlDecode(request));
                return balObj.GetPptDetails(resquestData, responseData, marketName, opportunityFor, summary);
            }
            catch (Exception ex) when (ex is MethodAccessException)
            {
                AQ.Logger.TrackEvent(ex.Message);
                return "";
            }
        }

        public string GetOspExportExcel(string requestType, string response, string requestData)
        {
            string file = string.Empty;
            string innerResponseData = "";
            var responseData = new OspResponse { DataList = JsonConvert.DeserializeObject<List<OspResponseData>>(HttpUtility.UrlDecode(response)) };
            var request = JsonConvert.DeserializeObject<OspRequest>(HttpUtility.UrlDecode(requestData));
            if (requestType == "OSPRequest")
            {
                file = balObj.AdvancedAnalyticsExcelExportOsp(request, responseData, this.HttpContext);
            }
            else
            {
                innerResponseData = Session["AdvancedAnalyticsInnerData"].ToString();
                var innerResponse = new OspInnerResponse { DataList = JsonConvert.DeserializeObject<List<OspInnerResponseData>>((innerResponseData)) };
                file = balObj.AdvancedAnalyticsExcelExportOspInner(request, responseData, innerResponse, this.HttpContext);
            }
            return file;
        }

        #endregion

        #region CM
        public JsonResult GetCMData(CMRequest CMRequestData)
        {

            JsonResult jsonResult = null;
            CMResponse CMData = null;
            if (CMRequestData != null)
            {
                try
                {

                    CMData = balObj.GetCMData(CMRequestData, this.HttpContext);
                    leftPanelObj.SubmitStickySelections(new StickyRequest
                    {
                        UserId = Session["Username"].ToString(),
                        ModuleId = (int)Constants.UserGuideType.correspondencemaps,
                        FilterData = CMRequestData.SelectedItems
                    });
                    jsonResult = Json(CMData, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = Int32.MaxValue;
                    Session["CMData"] = JsonConvert.SerializeObject(CMData.DataList);

                    return jsonResult;

                }
                catch (Exception ex)
                {
                    var prms = new object[]
                        {
                            CMRequestData.TimePeriod,
                            CMRequestData.Market,
                            CMRequestData.Dimension1,
                            CMRequestData.Dimension2,
                            CMRequestData.AdditionalFilter,
                            ex.Message
                        };

                    AQ.Logger.TrackEvent(ex.Message + " Selection:" + string.Join(",", ((IEnumerable)prms).Cast<object>()
                                 .Select(x => x.ToString())
                                 .ToArray()));
                    return Json(CMData, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(CMData, JsonRequestBehavior.AllowGet);
        }

        public string GetCMExportPpt(string response, string dimension1, string dimension2, string[] dim1List, string[] dim2List, string selectionSummary)
        {
            try
            {
                var responseData = new CMPptResponse { DataList = JsonConvert.DeserializeObject<List<CMPptResponseData>>(HttpUtility.UrlDecode(response)) };
                return AdvancedAnalyticsBAL.GetCMPptDetails(responseData, dimension1, dimension2, dim1List, dim2List, selectionSummary);
            }
            catch (Exception ex) when (ex is MethodAccessException)
            {
                AQ.Logger.TrackEvent(ex.Message);
                return "";
            }
        }

        #endregion
    }
}
