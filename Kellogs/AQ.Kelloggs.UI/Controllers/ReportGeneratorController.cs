﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AQ.Kelloggs.BAL;
using AQ.Kelloggs.Models;

namespace AQ.Kelloggs.UI.Controllers
{
    public class ReportGeneratorController : BaseController
    {

        readonly ReportGeneratorBAL repBAL = new ReportGeneratorBAL();
        // GET: ReportGenerator
        public ActionResult ReportGenerator()
        {
            return View();
        }

        [HttpPost]
        [ValidateInput(true)]
        public string DownloadReport(string request, string origTimeList)
        {
            try
            {
                var requestData = Newtonsoft.Json.JsonConvert.DeserializeObject<ReportRequest>(HttpUtility.UrlDecode(request));
                var TimeData = Newtonsoft.Json.JsonConvert.DeserializeObject<IList<TimePeriod>>(HttpUtility.UrlDecode(origTimeList));
                var response = AttributeList;
                
                Logger.TrackEvent("ReportType", requestData.ReportId);
                return repBAL.GetPptDetails(requestData, response, TimeData);
            }
            catch (Exception ex) when (ex is MethodAccessException)
            {
                AQ.Logger.TrackEvent(ex.Message);
                return "";
            }
        }

        public IList<OccasionAttribute> AttributeList
        {
            get
            {
                JsonResult jsonResult;
                try
                {
                    var response = repBAL.GetAttributeList;
                    jsonResult = Json(response, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    HttpContext.Cache["OccasionAttributeList"] = jsonResult;

                    return response;
                }
                catch (Exception ex)
                {
                    AQLogger.Logger.GetInstance().Error(ex.Message);
                    throw;
                }
            }
        }
    }
}
