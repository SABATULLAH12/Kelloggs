/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2013 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

using System;
using System.Collections.Generic;
using System.Web.Mvc;
using AQ.Kelloggs.BAL;
using AQ.Kelloggs.Models.CrossTab;
using AQ.Kelloggs.Models;
using Newtonsoft.Json;
using System.Web;
using System.Web.Script.Serialization;

namespace AQ.Kelloggs.UI.Controllers
{
    public class CrossTabController : BaseController
    {
        // GET: Crosstab
        readonly CrossTabBAL balObj = new CrossTabBAL();
        readonly LeftPanelBAL leftPanelObj = new LeftPanelBAL();
        public ActionResult Crosstab()
        {
            return View();
        }

        public ContentResult GetCrossTabData(Request CrossTabRequestData)
        {
            ContentResult jsonResult = null;
            Response CrossTabData = null;

            if (CrossTabRequestData != null)
            {

                try
                {

                    CrossTabData = balObj.GetCrossTabData(CrossTabRequestData, this.HttpContext);
                    if (CrossTabRequestData.SelectedModuleId != "6")
                    {
                        leftPanelObj.SubmitStickySelections(new StickyRequest
                        {
                            UserId = Session["Username"].ToString(),
                            ModuleId = (int)Constants.UserGuideType.crosstab,
                            FilterData = CrossTabRequestData.SelectedItems
                        });
                    }
                    jsonResult = SerializeJson(CrossTabData);
                    Session["crosstabData"] = SerializeJsonDatalist(CrossTabData.DataList).Content;


                    return jsonResult;

                }
                catch (Exception ex)
                {
                    var prms = new object[]{

                CrossTabRequestData.Columns,
                CrossTabRequestData.Rows,
                CrossTabRequestData.RowNesting ,
                CrossTabRequestData.TimePeriod ,
                CrossTabRequestData.Market,
                CrossTabRequestData.AdlFilters,
                CrossTabRequestData.Significance ,
                CrossTabRequestData.RespType ,
                CrossTabRequestData.SelectionSummary
            };
                    AQ.Logger.TrackEvent(prms.ToString());
                    Logger.TrackEvent(ex.Message);
                }
            }
            return SerializeJson(CrossTabData);
        }

        private static ContentResult SerializeJson(Response data)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            var resultData = data;
            ContentResult result = new ContentResult();
            result.Content = serializer.Serialize(resultData);
            result.ContentType = "application/json";
            return result;
        }
        private static ContentResult SerializeJsonDatalist(IList<ResponseData> data)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;
            var resultData = data;
            ContentResult result = new ContentResult();
            result.Content = serializer.Serialize(resultData);
            result.ContentType = "application/json";
            return result;
        }
        public JsonResult GetChartData(bool showTotal, string responseData)
        {
            var resp = new Response { DataList = JsonConvert.DeserializeObject<List<ResponseData>>(HttpUtility.UrlDecode(responseData)) };
            var chartData = balObj.GetChartData(resp, showTotal);
            return Json(chartData, JsonRequestBehavior.AllowGet);
        }

        public string CrosstabExport(string exportType, string requestData)
        {
            string responseData = Session["crosstabData"].ToString();
            var request = JsonConvert.DeserializeObject<Request>(HttpUtility.UrlDecode(requestData));
            var response = new Response { DataList = JsonConvert.DeserializeObject<List<ResponseData>>((responseData)) };
            string file = string.Empty;
            switch (exportType)
            {
                case "excel":
                    {
                        file = balObj.CrosstabExcelExport(request, response, this.HttpContext);
                        break;
                    }
                case "ppt":
                    {
                        file = balObj.CrosstabPptExport(request, response, this.HttpContext);
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
