using AQ.Kelloggs.Models;
using System.Web;
using AQ.Kelloggs.DAL;
using System.Text;
using System;
using System.Drawing;
using System.IO;
using Aspose.Slides;
using System.Linq;
using System.Collections.Generic;
using static AQ.Kelloggs.Models.Constants;
using System.Data;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading;
using System.Windows.Forms;
using System.Drawing.Imaging;
using Newtonsoft.Json;
using AQ.Kelloggs.Models.Snapshot;
using Aspose.Slides.Charts;
using crosstab = AQ.Kelloggs.Models.CrossTab;
using AQ.Kelloggs.Models.PerformanceDashboard;

namespace AQ.Kelloggs.BAL
{
    public class DashboardBAL
    {

        #region Dashboard
        readonly CommonDAL dalObj = new CommonDAL();
        string imgFilePath;
        readonly bool sendMail = Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["SendEmail"].ToString(Culture), Culture);
        readonly SmtpMail mailer = new SmtpMail();
        const string value = "Value";
        const string notApplicable = "Not Applicable";

        public CommonExportsResponse AddToDashboard(CommonRequestDashboard request, HttpContextBase context)
        {
            var response = new CommonExportsResponse();
            if (request != null && context != null)
            {
                request.Image = request.Image.Replace('-', '+');
                request.Image = request.Image.Replace('_', '/');
                byte[] bytes = Encoding.UTF32.GetBytes(request.Image);
                object[] parameters = {
                request.UserID,
                request.DashBoardTypeId,
                request.DashBoardID,
                request.DashboardName,
                request.WidgetName,
                request.WidgetType,
                request.WidgetID,
                request.SelectionSummary,
                request.RequestObj,
                bytes,
                request.ResponseData,
                request.SelectionObj,
                request.Flag
                };
                dalObj.AddToDashboard(parameters);
            }
            response.ResponseCode = (int)Constants.MagicNumbers.one;
            return response;
        }

        public CommonExportsResponse UpdateDashboard(CommonRequestDashboard request, HttpContextBase context)
        {
            var response = new CommonExportsResponse();
            if (request != null && context != null)
            {
                byte[] bytes = null;
                if (request.Image != null)
                {
                    request.Image = request.Image.Replace('-', '+');
                    request.Image = request.Image.Replace('_', '/');
                    bytes = Encoding.UTF32.GetBytes(request.Image);
                }
                object[] parameters = {
                request.UserID,
                request.DashBoardTypeId,
                request.DashBoardID,
                request.DashboardName,
                request.WidgetID,
                request.SelectionSummary,
                request.RequestObj,
                bytes,
                request.ResponseData,
                request.SelectionObj,
                request.Flag
                };
                dalObj.UpdateDashboard(parameters);
            }
            response.ResponseCode = (int)Constants.MagicNumbers.one;
            return response;
        }
        public CommonExportsResponse DeleteDashboard(CommonRequestDashboard request, HttpContextBase context)
        {
            var response = new CommonExportsResponse();
            if (request != null && context != null)
            {
                object[] parameters = {
                request.UserID,
                request.DashBoardTypeId,
                request.DashBoardID,
                request.SelectionSummary,//storing list of widgets to be deleted in this variable in this case
                request.Flag
                };
                dalObj.DeleteDashboard(parameters);
            }
            response.ResponseCode = (int)Constants.MagicNumbers.one;
            return response;
        }

        public CommonExportsResponse SaveAsDashboard(CommonRequestDashboard request, HttpContextBase context)
        {
            var response = new CommonExportsResponse();
            if (request != null && context != null)
            {
                object[] parameters = {
                request.UserID,
                request.DashBoardID,
                request.DashboardName
                };
                dalObj.SaveAsDashboard(parameters);
            }
            response.ResponseCode = (int)Constants.MagicNumbers.one;
            return response;
        }

        public CommonExportsResponse ShareDashboard(CommonRequestDashboard request, HttpContextBase context)
        {
            try
            {
                var response = new CommonExportsResponse();
                imgFilePath = context.Server.MapPath(TempFilePath + DateTime.Now.ToString("dd-MM-yyyy-hhmmss", Constants.Culture) + context.Session["UserId"] + ".jpg");
                if (request != null)
                {
                    object[] parameters = {
                request.UserID,
                request.SelectionSummary,//list of comma separated dashboards ids,
                request.RequestObj,//list of comma separated user or group ids
                request.Flag
                };
                    dalObj.ShareDashboard(parameters);

                    if (sendMail)
                    {
                        DataSet dataset = dalObj.ShareDashboardGetEmailIds(parameters);

                        string pathToHTMLFile = HttpContext.Current.Server.MapPath("~/Templates/Email/DashboardShare.html");

                        string savedFile = TempFilePath + DateTime.Now.ToString("dd-MM-yyyy-hhmmss", Constants.Culture) + context.Session["UserId"] + ".html";

                        string htmlString = File.ReadAllText(pathToHTMLFile);

                        htmlString = htmlString.Replace("$$UserName", dataset.Tables[1].Rows[0][(int)MagicNumbers.two].ToString());
                        htmlString = htmlString.Replace("$$list", string.Join(string.Empty, dataset.Tables[(int)MagicNumbers.two].AsEnumerable().Select(x => x.Field<string>(0)).ToArray()));
                        htmlString = htmlString.Replace("$$UserEmail", dataset.Tables[1].Rows[0][1].ToString());
                        htmlString = htmlString.Replace("$$url", System.Configuration.ConfigurationManager.AppSettings["ida:RedirectUri"].ToString(Culture));

                        GetImages(ref htmlString, "\\Content\\Images\\Kelloggs_Mailer_Elements\\Kelloggs_mailer_01.jpg", "$$images01");

                        var emails = dataset.Tables[0].Rows[0][0].ToString().Split(',');
                        mailer.MailObj.Cc = emails[0];

                        mailer.MailObj.To = string.Join(",", emails.Where((val, idx) => idx != 0).ToArray());
                        mailer.MailObj.To = mailer.MailObj.To.Substring(0, mailer.MailObj.To.Length - 1);
                        mailer.MailObj.Subject = System.Configuration.ConfigurationManager.AppSettings["DashboardShareSubject"].ToString(Constants.Culture);

                        File.WriteAllText(context.Server.MapPath(savedFile), htmlString);
                        mailer.MailObj.Body = htmlString;
                        mailer.SendMail();

                    }
                }
                response.ResponseCode = (int)Constants.MagicNumbers.one;
                return response;
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }
        /// <summary>
        /// Convert the images to base64
        /// </summary>
        /// <param name="htmlString"></param>
        private static void GetImages(ref string htmlString, string path, string replace)
        {
            try
            {
                using (Image image = Image.FromFile(AppContext.BaseDirectory + path))
                {
                    using (MemoryStream m = new MemoryStream())
                    {
                        image.Save(m, image.RawFormat);
                        byte[] imageBytes = m.ToArray();

                        // Convert byte[] to Base64 String
                        string base64String = Convert.ToBase64String(imageBytes);

                        htmlString = htmlString.Replace(replace, "data:image/jpg;base64," + base64String);

                    }
                }
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }

        public AlternateView Mail_Body()
        {
            try
            {
                AlternateView AV = AlternateView.CreateAlternateViewFromString(@"<html><body><img src='cid:Background'></body></html>", null, MediaTypeNames.Text.Html);

                LinkedResource Img = new LinkedResource(imgFilePath);
                Img.ContentId = "Background";
                AV.LinkedResources.Add(Img);

                return AV;
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }

        #region export to ppt      

        public static string GetPptDetails(IList<CommonRequestDashboard> request)
        {
            string pptName = "";
            try
            {
                var context = HttpContext.Current;
                var _tempPPT = "";
                _tempPPT = context.Server.MapPath(Templates.DashboardPpt);
                Aspose.Slides.License license = new Aspose.Slides.License();
                license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));
                Aspose.Slides.IPresentation pres = new Aspose.Slides.Presentation(_tempPPT);

                if (request != null)
                {
                    ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "Date")).TextFrame.Text = "Date: " + request[0].CreatedDate;
                    ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "CreatedBy")).TextFrame.Text = "Created By: " + request[0].CreatedBy;
                    ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "DashboardName")).TextFrame.Text = request[0].DashboardName.ToUpper(Culture);
                    //replace image
                    for (int i = 1; i <= request.ToList().Count; i++)
                    {
                        if (request[i - 1].WidgetID == (int)MagicNumbers.thirteen)
                        {
                            var pdData = JsonConvert.DeserializeObject<List<PDResponseData>>(HttpUtility.UrlDecode(request[i - 1].ResponseData));
                            string[] timeHeader = pdData.OrderBy(x => x.TimeperiodOrder).Select(x => x.TimePeriod).Distinct().ToArray();
                            pres.Slides.AddClone(pres.Slides[(int)MagicNumbers.eleven + timeHeader.Length]);
                        }
                        else
                        {
                            pres.Slides.AddClone(pres.Slides[Convert.ToInt32(request[i - 1].WidgetID, Culture)]);
                        }
                        ((IAutoShape)pres.Slides[i + (int)MagicNumbers.sixteen].Shapes.FirstOrDefault(x => x.Name == "PageNumber")).TextFrame.Text = (i + 1).ToString(Culture);
                        if (request[i - 1].WidgetID != (int)MagicNumbers.eleven && request[i - 1].WidgetID != (int)MagicNumbers.twelve)
                        {
                            ((IAutoShape)pres.Slides[i + (int)MagicNumbers.sixteen].Shapes.FirstOrDefault(x => x.Name == "SelectionSummary")).TextFrame.Text = request[i - 1].SelectionSummary;
                        }
                        else
                        {
                            pres.Slides[i + (int)MagicNumbers.sixteen].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Text = "";
                            pres.Slides[i + (int)MagicNumbers.sixteen].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions[0].Text = "Selection Summary : ";
                            pres.Slides[i + (int)MagicNumbers.sixteen].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.True;
                            if (pres.Slides[i + (int)MagicNumbers.sixteen].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions.Count < (int)MagicNumbers.two)
                            {
                                pres.Slides[i + (int)MagicNumbers.sixteen].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions.Add(new Portion());
                            }
                            pres.Slides[i + (int)MagicNumbers.sixteen].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions[1].Text = request[i - 1].SelectionSummary;
                        }
                        ((IAutoShape)pres.Slides[i + (int)MagicNumbers.sixteen].Shapes.FirstOrDefault(x => x.Name == "WidgetName")).TextFrame.Text = request[i - 1].WidgetName.ToUpper(Culture);
                        BindSlide(pres.Slides[i + (int)MagicNumbers.sixteen], request[i - 1], Convert.ToInt32(request[i - 1].WidgetID, Culture));
                    }
                    for (int i = 1; i <= (int)MagicNumbers.sixteen; i++)
                    {
                        pres.Slides.RemoveAt(1);
                    }
                    pptName = SaveFile(pres, request[0].DashboardName);//ppt name
                }


            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
            return pptName;
        }


        private static void BindSlide(Aspose.Slides.IBaseSlide slide, CommonRequestDashboard request, int i)
        {
            SnapshotResponse widgetData = new SnapshotResponse();
            List<crosstab.ChartData> crossData = new List<crosstab.ChartData>();
            List<PDResponseData> pdData = new List<PDResponseData>();
            bool conditionForNotAvailable = false;
            if (i <= (int)MagicNumbers.ten)
            {
                widgetData = new SnapshotResponse { DataList = JsonConvert.DeserializeObject<List<ResponseData>>(HttpUtility.UrlDecode(request.ResponseData)) };
                string selected_Market = request.SelectionSummary.Replace("||", "|").Split('|').ToList()[(int)MagicNumbers.one];
                conditionForNotAvailable = (selected_Market.Split(':').ToList().Count == (int)MagicNumbers.two && selected_Market.Contains("North America")) ||
                                    (selected_Market.Split(',').Length > 1 && selected_Market.Contains("Canada"));
            }
            else if (i <= (int)MagicNumbers.twelve)
            {
                crossData = JsonConvert.DeserializeObject<List<crosstab.ChartData>>(HttpUtility.UrlDecode(request.ResponseData));
                var requestData = JsonConvert.DeserializeObject<Request>(HttpUtility.UrlDecode(request.RequestObj));
                //UpdateFooter
                CrossTabBAL.UpdateFooter(slide, requestData.PercentageType);
            }
            else
            {
                pdData = JsonConvert.DeserializeObject<List<PDResponseData>>(HttpUtility.UrlDecode(request.ResponseData));
                pdData = pdData.Where(e => !e.Metric.Contains("CL")).ToList();
            }
            switch (i)
            {
                case 1:
                    BindE_O_FSlide(slide, widgetData.DataList);
                    break;
                case (int)MagicNumbers.two:
                    BindWhoSlide(slide, widgetData.DataList);
                    break;
                case (int)MagicNumbers.three:
                    BindWhoWithSlide(slide, widgetData.DataList);
                    break;
                case (int)MagicNumbers.four:
                    BindWhenSlide(slide, widgetData.DataList, conditionForNotAvailable);
                    break;
                case (int)MagicNumbers.five:
                    BindWhereSlide(slide, widgetData.DataList);
                    break;
                case (int)MagicNumbers.seven:
                    BindWhatSlide(slide, widgetData.DataList);
                    break;
                case (int)MagicNumbers.nine:
                    BindPurchaseSlide(slide, widgetData.DataList);
                    break;
                case (int)MagicNumbers.six:
                case (int)MagicNumbers.eight:
                case (int)MagicNumbers.ten:
                    ITable table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "TotalOccasionTable"));
                    IChart chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "TotalOccasionChart");
                    BindThisOccasionTotalChart(table, chart, request.WidgetType.ToUpper(Culture), widgetData.DataList, conditionForNotAvailable, slide);
                    break;
                case (int)MagicNumbers.eleven:
                    CrossTabBAL.BindTrendSlide(slide, crossData, "TrendChart");
                    break;
                case (int)MagicNumbers.twelve:
                    CrossTabBAL.BindStackSlide(slide, crossData, "StackChart");
                    break;
                case (int)MagicNumbers.thirteen:
                    BindPDSlide(slide, pdData);
                    break;
                default:
                    return;
            }
        }

        private static void BindPDSlide(IBaseSlide slide, List<PDResponseData> pdData)
        {
            string[] timeHeader = pdData.OrderBy(x => x.TimeperiodOrder).Select(x => x.TimePeriod).Distinct().ToArray();
            string[] OccasionList = pdData.OrderBy(x => x.OccasionOrder).Select(x => x.Occasion).Distinct().ToArray();
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "DataTable");
            int row = 1;
            for (int j = 0; j < OccasionList.Length; j++)
            {
                var OccData = pdData.Where(x => x.Occasion == OccasionList[j]);
                table[1, row].TextFrame.Text = OccasionList[j].ToUpper(Culture);
                table[(int)MagicNumbers.two, row].TextFrame.Text = OccData.ToList()[0].StrategicPosture;
                PerformanceDashboardBAL.ExportToPpt.BindDataTable(1, row, timeHeader, OccData, table, j, slide);
                row++;
            }
        }

        private static void BindE_O_FSlide(IBaseSlide slide, IEnumerable<ResponseData> widgetData)
        {
            var chartData = widgetData.ToList();
            IChart chart;
            IAutoShape shape;
            for (int i = 0; i < chartData.Count; i++)
            {
                chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "Chart" + (i + 1));
                var obj = FormatCell(chartData[i], 0);
                var obj1 = FormatHomeCell(chartData[i], 0);
                chart.ChartData.Series[0].DataPoints[0].Value.Data = obj[Constants.Value] == "LS" ? 0 : chartData[i].Volume / (int)MagicNumbers.hundred;
                chart.ChartData.Series[0].DataPoints[1].Value.Data = chartData[i].Volume != null && obj[Constants.Value] != "LS" ? 1 - (chartData[i].Volume / (int)MagicNumbers.hundred) : 1;
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs.Clear();
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = obj[Constants.Value];
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.fourteen;
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].Text = obj[Constants.Change] == "" ? "" : "\n(" + obj[Constants.Change] + ")";
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.twelve;
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                chart.ChartData.Series[0].Labels[0].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == Title + (i + 1))).TextFrame.Text = chartData[i].Attribute;
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == value + (i + 1)));
                BindValueChange(shape, obj1, 0, (int)MagicNumbers.twelve);
            }
        }

        private static void BindWhenSlide(IBaseSlide slide, IEnumerable<ResponseData> widgetData, bool selected_Market)
        {
            var chartData = widgetData.ToList();
            IChart chart;
            IAutoShape shape;
            if (selected_Market)
            {
                chartData = new List<ResponseData>();
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailable")).Hidden = false;
            }
            else
            {
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailable")).Hidden = true;
                for (int i = 0; i < chartData.Count; i++)
                {
                    chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "Chart" + (i + 1));
                    var obj = FormatCell(chartData[i], 0);
                    chart.ChartData.Series[0].DataPoints[0].Value.Data = obj[Constants.Value] == "LS" ? 0 : chartData[i].Volume / (int)MagicNumbers.hundred;
                    chart.ChartData.Series[0].DataPoints[1].Value.Data = chartData[i].Volume != null && obj[Constants.Value] != "LS" ? 1 - (chartData[i].Volume / (int)MagicNumbers.hundred) : 1;
                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == Title + (i + 1))).TextFrame.Text = chartData[i].Attribute;
                    shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == value + (i + 1)));
                    BindValueChange(shape, obj, 0, null);
                }
            }
            int n = 3;
            while (chartData.Count < n && n > 0)
            {
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Value" + n)).TextFrame.Text = "";
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Title" + n)).TextFrame.Text = "";
                ((IChart)slide.Shapes.FirstOrDefault(x => x.Name == "Chart" + n)).Hidden = true;
                ((PictureFrame)slide.Shapes.FirstOrDefault(x => x.Name == "Picture" + n)).Hidden = true;
                if (n != (int)MagicNumbers.three)
                {
                    ((PictureFrame)slide.Shapes.FirstOrDefault(x => x.Name == "Picture0" + n)).Hidden = true;
                }
                n--;
            }
        }

        private static void BindPurchaseSlide(IBaseSlide slide, IEnumerable<ResponseData> widgetData)
        {
            List<ResponseData> chartData;
            IAutoShape shape;
            IChart chart;
            string[] element = { "Purchaser", "Channel" };
            for (int j = 0; j < (int)MagicNumbers.two; j++)
            {
                chartData = widgetData.Where(x => x.ProfileOrder == (int)MagicNumbers.fifteen + j).OrderByDescending(x => x.Volume).ToList();
                chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == element[j] + "Chart");
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == element[j] + value));
                for (int i = 0; i < chartData.Count; i++)
                {
                    var obj = FormatCell(chartData[i], 0);
                    var paraIndex = j == 0 ? i : 0;
                    var appendText = j == 0 ? "" : (i + 1).ToString(Culture);
                    chart.ChartData.Series[0].DataPoints[i].Value.Data = obj[Constants.Value] == "LS" ? 0 : chartData[i].Volume / (int)MagicNumbers.hundred;
                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == element[j] + Title + appendText)).TextFrame.Paragraphs[paraIndex].Portions[0].Text = chartData[i].Attribute;
                    BindValueChange(shape, obj, i, null);
                }
            }
            chartData = widgetData.Where(x => x.ProfileOrder == (int)MagicNumbers.seventeen).OrderByDescending(x => x.Volume).ToList();
            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "PackageTypeChart");
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                chart.ChartData.Series[0].DataPoints[i].Value.Data = obj[Constants.Value] == "LS" ? 0 : chartData[i].Volume / (int)MagicNumbers.hundred;
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "PackageTypeValue" + (i + 1)));
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "PackageTypeTitle" + (i + 1))).TextFrame.Text = chartData[i].Attribute;
                BindValueChange(shape, obj, 0, null);
            }
        }

        private static void BindWhatSlide(IBaseSlide slide, IEnumerable<ResponseData> widgetData)
        {
            var chartData = widgetData.Where(x => x.ProfileOrder == (int)MagicNumbers.nine).OrderByDescending(x => x.Volume).Take(5).ToList();
            string[] element = new[] { "Rectangle 31", "Rectangle 32", "Rectangle 33", "Rectangle 34", "Rectangle 35" };
            IChart chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "SquareChart");
            IAutoShape shape;
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                var objTotal = FormatTotalCell(chartData[i], 0);
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == element[i])).TextFrame.Text = chartData[i].Attribute;

                chart.ChartData.Series[0].DataPoints[i].Value.Data = (obj[Value] == "LS" ? 0 : chartData[i].Volume / (int)MagicNumbers.hundred) ?? 0;
                chart.ChartData.Series[1].DataPoints[i].Value.Data = chartData[i].Volume != null && obj[Value] != "LS" ? 1 - (chartData[i].Volume / (int)MagicNumbers.hundred) : 1;

                for (int k = 0; k < (int)MagicNumbers.two; k++)
                {
                    var objTemp = k == 0 ? obj : objTotal;
                    shape = (IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Cell" + k + (i + 1));
                    BindValueChange(shape, objTemp, 0, null);
                }
            }
            chartData = widgetData.Where(x => x.ProfileOrder == (int)MagicNumbers.ten).OrderByDescending(x => x.Volume).Take((int)MagicNumbers.five).ToList();
            element = new[] { "Rectangle 49", "Rectangle 50", "Rectangle 51", "Rectangle 52", "Rectangle 53" };
            chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "ColumnChartBrands");
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == element[i]));
                shape.TextFrame.Text = chartData[i].Attribute;

                chart.ChartData.Series[0].DataPoints[i].Value.Data = (obj[Value] == "LS" ? 0 : chartData[i].Volume / (int)MagicNumbers.hundred) ?? 0;
                chart.ChartData.Series[1].DataPoints[i].Value.Data = chartData[i].Volume != null && obj[Value] != "LS" ? 1 - (chartData[i].Volume / (int)MagicNumbers.hundred) : 1;

                shape = (IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Rectangle 11" + (i + 1));
                BindValueChange(shape, obj, 0, null);
            }

            chartData = widgetData.Where(x => x.ProfileOrder == (int)MagicNumbers.thirteen).ToList();
            chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "ConsumptionChart");
            shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "ConsumptionValue"));
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                chart.ChartData.Series[0].DataPoints[i].Value.Data = obj[Value] == "LS" ? 0 : chartData[i].Volume / (int)MagicNumbers.hundred;
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "ConsumptionTitle")).TextFrame.Paragraphs[i].Portions[0].Text = chartData[i].Attribute;
                BindValueChange(shape, obj, i, null);
            }
            chart.ChartData.Series[0].DataPoints[chartData.Count].Value.Data = chart.ChartData.Series[0].DataPoints[0].Value.Data;
            chart.ChartData.Series[0].DataPoints[chartData.Count + 1].Value.Data = chart.ChartData.Series[0].DataPoints[1].Value.Data;

            element = new[] { "Kelloggs Share", "Average Items per Occasion" };
            for (int i = 0; i < element.Length; i++)
            {
                chartData = widgetData.Where(x => x.ProfileOrder == (int)MagicNumbers.twelve - i).ToList();
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == element[i]));
                var obj1 = FormatCell(chartData[0], 0);
                BindValueChange(shape, obj1, 0, (int)MagicNumbers.nine);
            }
        }

        private static void BindThisOccasionTotalChart(ITable table, IChart chart, string widgetName, IEnumerable<ResponseData> widgetData, bool selected_Market, IBaseSlide slide)
        {
            var chartData = widgetData.ToList();
            if (widgetName != "WHY")
            {
                HideShowElement(table, chart, slide, widgetData, selected_Market);
                if (selected_Market)
                {
                    return;
                }
                chartData = chartData.OrderByDescending(x => x.Volume).ToList();
            }
            for (int i = 0; i < chartData.Count; i++)
            {
                var record = chartData[i];
                var obj = FormatCell(record, 0);
                var objTotal = FormatTotalCell(record, 0);

                chart.ChartData.Series[0].DataPoints[i].Value.Data = (obj[Constants.Value] == "LS" ? 0 : record.Volume / (int)MagicNumbers.hundred) ?? 0;
                chart.ChartData.Series[1].DataPoints[i].Value.Data = (objTotal[Constants.Value] == "LS" ? 0 : record.VolumeTotal / (int)MagicNumbers.hundred) ?? 0;

                for (int k = 0; k < (int)MagicNumbers.two; k++)
                {
                    var objTemp = k == 0 ? obj : objTotal;
                    table[0, i].TextFrame.Text = record.Attribute;
                    BindCellValue(table, objTemp, (int)MagicNumbers.two + k, i, 0, (int)MagicNumbers.sixteen);
                }
            }
        }

        private static void HideShowElement(ITable table, IChart chart, IBaseSlide slide, IEnumerable<ResponseData> widgetData, bool value)
        {
            table.Hidden = value;
            chart.Hidden = value;
            ((IPictureFrame)slide.Shapes.FirstOrDefault(x => x.Name == "Shadow1")).Hidden = value;
            ((IPictureFrame)slide.Shapes.FirstOrDefault(x => x.Name == "Shadow2")).Hidden = value;
            ((IPictureFrame)slide.Shapes.FirstOrDefault(x => x.Name == "Shadow3")).Hidden = value;
            ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailable")).Hidden = !value;
            if (!value)
            {
                int n = table.Rows.Count - 1;
                while (n + 1 > widgetData.ToList().Count)
                {
                    table[0, n].TextFrame.Text = "";
                    chart.ChartData.Series[0].DataPoints[n].Value.Data = 0;
                    chart.ChartData.Series[1].DataPoints[n].Value.Data = 0;
                    table[(int)MagicNumbers.two, n].TextFrame.Text = "";
                    table[(int)MagicNumbers.three, n].TextFrame.Text = "";
                    n--;
                }
            }
        }

        private static void BindWhereSlide(IBaseSlide slide, IEnumerable<ResponseData> widgetData)
        {
            Aspose.Slides.Charts.IChart chart;
            var chartData = widgetData.ToList();
            ITable table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "WhereTable"));
            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "ColumnChart");
            for (int i = 0; i < chart.ChartData.Categories.Count; i++)
            {
                string catName = chart.ChartData.Categories[i].Value.ToString();
                if (chartData.FirstOrDefault(x => x.Attribute.ToUpper(Culture) == catName.ToUpper(Culture)) != null)
                {
                    var record = chartData.Where(x => x.Attribute.ToUpper(Culture) == catName.ToUpper(Culture)).ToList()[0];
                    var obj = FormatCell(record, 0);
                    chart.ChartData.Series[0].DataPoints[i].Value.Data = (obj[Constants.Value] == "LS" ? 0 : record.Volume) ?? 0;
                    table[0, i].TextFrame.Paragraphs[0].Portions[0].Text = catName;
                    table[1, i].TextFrame.Paragraphs[0].Portions[0].Text = obj[Constants.Value];
                    table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[Constants.ColorClass]);
                    table[1, i].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                    table[1, i].TextFrame.Paragraphs[0].Portions[1].Text = obj[Constants.Change] != "" ? "(" + obj[Constants.Change] + ")" : "";
                    table[1, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.sixteen;
                    table[1, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[1, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                    table[1, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontBold = NullableBool.False;
                }
            }
        }

        private static void BindWhoWithSlide(IBaseSlide slide, IEnumerable<ResponseData> widgetData)
        {
            Aspose.Slides.Charts.IChart chart;
            IAutoShape shape;
            var chartData = widgetData.ToList();
            for (int i = 0; i < chartData.Count; i++)
            {
                chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "WhoWithChart" + (i + 1));
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "WhoWithTitle" + (i + 1))).TextFrame.Text = chartData[i].Attribute;
                var obj = FormatCell(chartData[i], 0);
                var volume = chartData[i].Volume / (int)MagicNumbers.hundred;
                chart.ChartData.Series[0].DataPoints[0].Value.Data = (obj[Constants.Value] == "LS" ? 0 : volume) ?? 0;
                chart.ChartData.Series[1].DataPoints[0].Value.Data = volume != null && obj[Constants.Value] != "LS" ? 1 - volume : 1;

                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "WhoWithValue" + (i + 1)));
                BindValueChange(shape, obj, 0, (int)MagicNumbers.sixteen);
            }
        }

        private static void BindWhoSlide(Aspose.Slides.IBaseSlide slide, IEnumerable<ResponseData> widgetData)
        {
            GroupShape group;
            IChart chart;
            IAutoShape shape;
            ITable table;
            var chartData = widgetData.Where(x => x.ProfileOrder == (int)MagicNumbers.two).ToList();
            string[] element = new[] { "Group 9", "Group 7" };
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                group = ((Aspose.Slides.GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == element[i])));
                chart = (Aspose.Slides.Charts.IChart)group.Shapes.FirstOrDefault(x => x.Name == "TriangleChart");
                ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == Title)).TextFrame.Text = chartData[i].Attribute;
                chart.ChartData.Series[0].DataPoints[0].Value.Data = (obj[Value] == "LS" ? 0 : chartData[i].Volume / (int)MagicNumbers.hundred) ?? 0;
                chart.ChartData.Series[1].DataPoints[0].Value.Data = chartData[i].Volume != null && obj[Value] != "LS" ? 1 - (chartData[i].Volume / (int)MagicNumbers.hundred) : 1;

                shape = ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == value));
                BindValueChange(shape, obj, 0, null);
            }
            chartData = widgetData.Where(x => x.ProfileOrder == (int)MagicNumbers.three).ToList();
            table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "GenerationTable"));
            chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "StackChart");
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                chart.ChartData.Series[i].DataPoints[0].Value.Data = (obj[Value] == "LS" ? 0 : chartData[i].Volume / (int)MagicNumbers.hundred) ?? 0;
                BindCellValue(table, obj, 1, i, 0, null);
            }
            chartData = widgetData.Where(x => x.ProfileOrder == (int)MagicNumbers.four).ToList();
            var obj1 = FormatCell(chartData[0], 0);
            shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "HHIncome"));
            shape.TextFrame.Paragraphs[0].Portions[0].Text = obj1[Value];
            shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
        }

        private static void BindCellValue(ITable table, IDictionary<string, string> obj, int columnIndex, int rowIndex, int paraIndex, int? changeSize)
        {
            table[columnIndex, rowIndex].TextFrame.Paragraphs[paraIndex].Portions[0].Text = obj[Value];
            table[columnIndex, rowIndex].TextFrame.Paragraphs[paraIndex].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[columnIndex, rowIndex].TextFrame.Paragraphs[paraIndex].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
            if (table[columnIndex, rowIndex].TextFrame.Paragraphs[paraIndex].Portions.Count < (int)MagicNumbers.two)
            {
                table[columnIndex, rowIndex].TextFrame.Paragraphs[paraIndex].Portions.Add(new Portion());
            }
            table[columnIndex, rowIndex].TextFrame.Paragraphs[paraIndex].Portions[1].Text = obj[Change] != "" ? "(" + obj[Change] + ")" : "";
            if (changeSize != null)
            {
                table[columnIndex, rowIndex].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = changeSize ?? (int)MagicNumbers.nine;
            }
            table[columnIndex, rowIndex].TextFrame.Paragraphs[paraIndex].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[columnIndex, rowIndex].TextFrame.Paragraphs[paraIndex].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
            table[columnIndex, rowIndex].TextFrame.Paragraphs[paraIndex].Portions[1].PortionFormat.FontBold = NullableBool.False;
        }

        private static void BindValueChange(IAutoShape shape, IDictionary<string, string> obj, int paraIndex, int? ChangeSize)
        {
            shape.TextFrame.Paragraphs[paraIndex].Portions[0].Text = obj[Value];
            shape.TextFrame.Paragraphs[paraIndex].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            shape.TextFrame.Paragraphs[paraIndex].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
            if (shape.TextFrame.Paragraphs[paraIndex].Portions.Count < (int)MagicNumbers.two)
            {
                shape.TextFrame.Paragraphs[paraIndex].Portions.Add(new Portion());
            }
            shape.TextFrame.Paragraphs[paraIndex].Portions[1].Text = obj[Change] != "" && obj[Value] != notApplicable ? " (" + obj[Change] + ")" : "";
            if (ChangeSize != null)
            {
                shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = ChangeSize ?? (int)MagicNumbers.nine;
            }
            shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
            shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
        }

        private static Dictionary<string, string> FormatCell(ResponseData rowObj, int precision)
        {
            Dictionary<string, string> obj = new Dictionary<string, string>();
            obj.Add(Constants.Value, "NA");
            obj.Add(Constants.Change, "");
            obj.Add(Constants.ColorClass, Constants.Black);

            if (rowObj.Volume != null)
            {//sample size check for volume
                double Volume = rowObj.Volume ?? 0;
                if (rowObj.UNumerator == null)
                {
                    obj[Constants.Value] = "NA";
                }
                else if (rowObj.UNumerator < InsufficientSample)
                {
                    obj[Constants.Value] = "LS";
                }
                else
                {

                    if (rowObj.Attribute != null && rowObj.Attribute.ToUpper(Constants.Culture) == "AVERAGE HH INCOME")
                    {
                        obj[Constants.Value] = ReportGeneratorBAL.CurrencySymbol == "" ? notApplicable :
                                ReportGeneratorBAL.CurrencySymbol + Math.Round(Volume, (int)Constants.MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Constants.Culture) + "K";
                    }
                    else if (rowObj.Attribute != null &&
                        (rowObj.Attribute.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION" || rowObj.Attribute.ToUpper(Culture) == "AVERAGE HH SIZE"))
                    {
                        obj[Constants.Value] = Math.Round(Volume, (int)Constants.MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Constants.Culture);
                    }
                    else
                    {
                        obj[Constants.Value] = (precision == 1 ? Math.Round(Volume, precision, MidpointRounding.AwayFromZero).ToString("0.0", Culture) :
                            Math.Round(Volume, precision, MidpointRounding.AwayFromZero).ToString(Culture)) + "%";
                    }

                    if (obj[Constants.Value] != notApplicable)
                    {
                        obj[Constants.ColorClass] = (rowObj.UNumerator >= InsufficientSample && rowObj.UNumerator <= LowSample) ? "Gray" : obj[Constants.ColorClass];
                    }
                }
            }
            if (obj[Constants.Value] != "NA" && obj[Constants.Value] != "LS" && rowObj.Significance != null && obj[Constants.ColorClass] != "Gray")
            {
                if (rowObj.Significance > 0)
                {
                    obj[Constants.ColorClass] = "Green";
                }
                else if (rowObj.Significance < 0)
                {
                    obj[Constants.ColorClass] = "Red";
                }
                else
                {
                    obj[Constants.ColorClass] = Constants.Black;
                }
            }
            if (obj[Constants.Value] != "NA" && obj[Constants.Value] != "LS" && rowObj.DiffVol != null && rowObj.DiffVol != 0)
            {
                double DiffVol = rowObj.DiffVol ?? 0;
                obj[Constants.Change] = Math.Round(DiffVol, (int)Constants.MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Constants.Culture);
                obj[Constants.Change] = DiffVol >= 0 ? '+' + obj[Constants.Change] : obj[Constants.Change];
            }
            if (rowObj.Attribute != null && rowObj.Attribute.ToUpper(Constants.Culture) == "AVERAGE HH INCOME" && ReportGeneratorBAL.CurrencySymbol == "")
            {
                obj[Constants.Value] = notApplicable;
                obj[Constants.ColorClass] = Constants.Black;
            }
            return obj;
        }

        private static Dictionary<string, string> FormatTotalCell(ResponseData rowObj, int precision)
        {
            Dictionary<string, string> obj = new Dictionary<string, string>();
            obj.Add(Constants.Value, "NA");
            obj.Add(Change, "");
            obj.Add(ColorClass, Black);

            if (rowObj.VolumeTotal != null)
            {//sample size check for volume
                double Volume = rowObj.VolumeTotal ?? 0;
                if (rowObj.UNumeratorTotal == null)
                {
                    obj[Constants.Value] = "NA";
                }
                else if (rowObj.UNumeratorTotal < InsufficientSample)
                {
                    obj[Constants.Value] = "LS";
                }
                else
                {
                    if ((rowObj.UNumeratorTotal >= InsufficientSample && rowObj.UNumeratorTotal <= LowSample))
                    {
                        obj[ColorClass] = "Gray";
                    }

                    obj[Constants.Value] = (precision == 1 ? Math.Round(Volume, precision, MidpointRounding.AwayFromZero).ToString("0.0", Culture) :
                        Math.Round(Volume, precision, MidpointRounding.AwayFromZero).ToString(Culture)) + "%";
                }
            }
            if (obj[Constants.Value] != "NA" && obj[Constants.Value] != "LS" && rowObj.DiffVolTotal != null && rowObj.DiffVolTotal != 0)
            {
                double DiffVol = rowObj.DiffVolTotal ?? 0;
                var change = Math.Round(DiffVol, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                obj[Change] = DiffVol >= 0 ? '+' + change : change;
            }
            return obj;
        }

        private static Dictionary<string, string> FormatHomeCell(ResponseData rowObj, int precision)
        {
            Dictionary<string, string> obj = new Dictionary<string, string>();
            obj.Add(Constants.Value, "NA");
            obj.Add(Change, "");
            obj.Add(ColorClass, Black);

            if (rowObj.VolumeHome != null)
            {//sample size check for volume
                double Volume = rowObj.VolumeHome ?? 0;
                if (rowObj.UNumeratorHome == null)
                {
                    obj[Constants.Value] = "NA";
                }
                else if (rowObj.UNumeratorHome < InsufficientSample)
                {
                    obj[Constants.Value] = "LS";
                }
                else
                {
                    if ((rowObj.UNumeratorHome >= InsufficientSample && rowObj.UNumeratorHome <= LowSample))
                    {
                        obj[ColorClass] = "Gray";
                    }

                    obj[Constants.Value] = (precision == 1 ? Math.Round(Volume, precision, MidpointRounding.AwayFromZero).ToString("0.0", Culture) :
                        Math.Round(Volume, precision, MidpointRounding.AwayFromZero).ToString(Culture)) + "%";
                }
            }
            if (obj[Constants.Value] != "NA" && obj[Constants.Value] != "LS" && rowObj.Significance != null && obj[Constants.ColorClass] != "Gray")
            {
                if (rowObj.Significance > 0)
                {
                    obj[Constants.ColorClass] = "Green";
                }
                else if (rowObj.Significance < 0)
                {
                    obj[Constants.ColorClass] = "Red";
                }
                else
                {
                    obj[Constants.ColorClass] = Constants.Black;
                }
            }
            if (obj[Constants.Value] != "NA" && obj[Constants.Value] != "LS" && rowObj.DiffVolHome != null && rowObj.DiffVolHome != 0)
            {
                double DiffVol = rowObj.DiffVolHome ?? 0;
                var change = Math.Round(DiffVol, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                obj[Change] = DiffVol >= 0 ? '+' + change : change;
            }
            return obj;
        }

        #region Save PPT File Before Download
        public static string SaveFile(Aspose.Slides.IPresentation pres, string dashboardName)
        {
            var dirName = HttpContext.Current.Session.SessionID;
            var context = HttpContext.Current;
            //Set License
            Aspose.Slides.License license = new Aspose.Slides.License();
            license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));
            string destFile = "";
            var fileName = "-" + dashboardName + "-" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Constants.Culture) + ".pptx";
            /*create the directory with session name*/
            if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
            {
                Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
            }
            Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));
            destFile = context.Server.MapPath(TempFilePath + dirName + "/PPT" + fileName);

            try
            {
                pres.Save(destFile, Aspose.Slides.Export.SaveFormat.Pptx);
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
            return TempFilePath + dirName + "/PPT" + fileName;
        }
        #endregion
        #endregion
        #endregion
    }
}
