using System;
using System.Data;
using System.Linq;
using AQ.Kelloggs.Models;
using System.Web;
using AQ.Kelloggs.DAL;
using System.IO;
using System.Drawing;
using Aspose.Slides;
using AQ.Kelloggs.Models.Snapshot;
using System.Configuration;
using OfficeOpenXml.Style;
using OfficeOpenXml;
using System.Collections.Generic;
using static AQ.Kelloggs.Models.Constants;

namespace AQ.Kelloggs.BAL
{
    public class SnapshotBAL
    {
        readonly CommonDAL dalObj = new CommonDAL();

        #region get snapshot data
        public SnapshotResponse GetSnapshotData(Request SnapshotRequestData, HttpContextBase context)
        {
            SnapshotResponse response = new SnapshotResponse();
            if (SnapshotRequestData != null)
            {
                object[] parameters = {
                SnapshotRequestData.TimePeriod,
                SnapshotRequestData.Market,
                SnapshotRequestData.Occasion,
                SnapshotRequestData.AdlFilters,
                SnapshotRequestData.Significance,
                SnapshotRequestData.WidgetId
            };

                DataSet dataset = dalObj.GetSnapshotData(parameters);

                response.DataList = (from rows in dataset.Tables[0].AsEnumerable()
                                     select new ResponseData
                                     {
                                         WidgetNumber = Convert.ToInt32(rows[DBParameters.WidgetNumber], Culture),
                                         ProfileOrder = Convert.ToInt32(rows[DBParameters.ProfileOrder], Culture),
                                         Attribute = Convert.ToString(rows[DBParameters.Attribute], Culture),
                                         USampleSize = rows[DBParameters.USampleSize] == DBNull.Value ? null : (int?)rows[DBParameters.USampleSize],
                                         USampleSizeTotal = rows[DBParameters.USampleSizeTotal] == DBNull.Value ? null : (int?)rows[DBParameters.USampleSizeTotal],
                                         USampleSizeHome = rows[DBParameters.USampleSizeHome] == DBNull.Value ? null : (int?)rows[DBParameters.USampleSizeHome],
                                         WSampleSize = rows[DBParameters.WSampleSize] == DBNull.Value ? null : (double?)rows[DBParameters.WSampleSize],
                                         WSampleSizeTotal = rows[DBParameters.WSampleSizeTotal] == DBNull.Value ? null : (double?)rows[DBParameters.WSampleSizeTotal],
                                         WSampleSizeHome = rows[DBParameters.WSampleSizeHome] == DBNull.Value ? null : (double?)rows[DBParameters.WSampleSizeHome],
                                         UNumerator = rows[DBParameters.UNumerator] == DBNull.Value ? null : (int?)rows[DBParameters.UNumerator],
                                         UNumeratorTotal = rows[DBParameters.UNumeratorTotal] == DBNull.Value ? null : (int?)rows[DBParameters.UNumeratorTotal],
                                         UNumeratorHome = rows[DBParameters.UNumeratorHome] == DBNull.Value ? null : (int?)rows[DBParameters.UNumeratorHome],
                                         WNumerator = rows[DBParameters.WNumerator] == DBNull.Value ? null : (double?)rows[DBParameters.WNumerator],
                                         WNumeratorTotal = rows[DBParameters.WNumeratorTotal] == DBNull.Value ? null : (double?)rows[DBParameters.WNumeratorTotal],
                                         WNumeratorHome = rows[DBParameters.WNumeratorHome] == DBNull.Value ? null : (double?)rows[DBParameters.WNumeratorHome],
                                         Volume = rows[DBParameters.Volumes] == DBNull.Value ? null : (double?)rows[DBParameters.Volumes],
                                         DiffVol = rows[DBParameters.DiffVol] == DBNull.Value ? null : (double?)rows[DBParameters.DiffVol],
                                         VolumeHome = rows[DBParameters.VolumeHome] == DBNull.Value ? null : (double?)rows[DBParameters.VolumeHome],
                                         DiffVolHome = rows[DBParameters.DiffVolHome] == DBNull.Value ? null : (double?)rows[DBParameters.DiffVolHome],
                                         VolumeTotal = rows[DBParameters.VolumeTotal] == DBNull.Value ? null : (double?)rows[DBParameters.VolumeTotal],
                                         DiffVolTotal = rows[DBParameters.DiffVolTotal] == DBNull.Value ? null : (double?)rows[DBParameters.DiffVolTotal],
                                         Significance = rows[DBParameters.Significance] == DBNull.Value ? null : (int?)rows[DBParameters.Significance]
                                     }).ToList();
            }
            return response;
        }
        #endregion
        public static class ExportPpt
        {
            public static CommonExportsResponse GetPptExportsDetails(CommonExportsRequest request, HttpContextBase context)
            {
                var response = new CommonExportsResponse();
                if (request != null && context != null)
                {
                    request.Base64String = request.Base64String.Replace('-', '+');
                    request.Base64String = request.Base64String.Replace('_', '/');
                    byte[] bytes = Convert.FromBase64String(request.Base64String);
                    Image image;
                    try
                    {
                        using (MemoryStream ms = new MemoryStream(bytes))
                        {
                            using (image = Image.FromStream(ms))
                            {
                                if (File.Exists(context.Server.MapPath("../SnapshotImages/" + request.ImageName + ".png")))
                                {
                                    File.Delete(context.Server.MapPath("../SnapshotImages/" + request.ImageName + ".png"));
                                }
                                image.Save(context.Server.MapPath("../SnapshotImages/" + request.ImageName + ".png"), System.Drawing.Imaging.ImageFormat.Png);
                                response.ResponseMessage = request.ImageName + ".png";
                            }
                        }
                        response.ResponseCode = (int)MagicNumbers.one;
                    }
                    catch (Exception ex) when (ex is FileNotFoundException)
                    {
                        response.ResponseMessage = ex.Message;
                        response.ResponseCode = 0;
                    }
                }
                return response;
            }

            public static string GetPptDetails(CommonExportsRequest request)
            {
                string pptName = "";
                try
                {
                    var context = HttpContext.Current;
                    var _tempPPT = "";
                    _tempPPT = context.Server.MapPath(Templates.SnapshotPpt);
                    Aspose.Slides.IPresentation pres = new Aspose.Slides.Presentation(_tempPPT);

                    if (request != null)
                    {
                        ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "Date")).TextFrame.Text = System.DateTime.Today.ToShortDateString();
                        //replace image
                        var b64Img = Convert.FromBase64String(request.theImage.Split(';')[0]);
                        Image img;
                        using (MemoryStream ms = new MemoryStream(b64Img))
                        {
                            img = Image.FromStream(ms);
                            PictureFrame bg_Pic = (PictureFrame)pres.Slides[(int)MagicNumbers.one].Shapes.FirstOrDefault(x => x.Name == "Picture 8");
                            if (bg_Pic != null)
                            {
                                bg_Pic.PictureFormat.Picture.Image.ReplaceImage(img);
                            }
                        }

                        b64Img = Convert.FromBase64String(request.theImage.Split(';')[(int)MagicNumbers.one]);
                        using (MemoryStream ms = new MemoryStream(b64Img))
                        {
                            img = Image.FromStream(ms);
                            PictureFrame bg_Pic = (PictureFrame)pres.Slides[(int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == "Picture 18");
                            if (bg_Pic != null)
                            {
                                bg_Pic.PictureFormat.Picture.Image.ReplaceImage(img);
                            }
                        }

                    ((IAutoShape)pres.Slides[(int)MagicNumbers.one].Shapes.FirstOrDefault(x => x.Name == "Occasion")).TextFrame.Text = request.Occasion;
                        ((IAutoShape)pres.Slides[(int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == "Occasion")).TextFrame.Text = request.Occasion;

                        ((IAutoShape)pres.Slides[(int)MagicNumbers.one].Shapes.FirstOrDefault(x => x.Name == "SelectionSummary")).TextFrame.Text = request.SelectionSummary;
                        ((IAutoShape)pres.Slides[(int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == "SelectionSummary")).TextFrame.Text = request.SelectionSummary;
                    }
                    pptName = SaveFile(pres, request);//ppt name

                }
                catch (Exception ex) when (ex is NullReferenceException || ex is InvalidCastException)
                {
                    AQLogger.Logger.GetInstance().Error(ex.Message);
                }
                return pptName;
            }

            public static string SaveFile(Aspose.Slides.IPresentation pres, CommonExportsRequest request)
            {
                var dirName = HttpContext.Current.Session.SessionID;
                var context = HttpContext.Current;
                //Set License
                Aspose.Slides.License license = new Aspose.Slides.License();
                license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));
                string destFile = "";
                var fileName = "-OccasionProfile-" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Culture) + ".pptx";
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
                    AQLogger.Logger.GetInstance().Error(ex);
                    throw;
                }
                return TempFilePath + dirName + "/PPT" + fileName;
            }
        }
        public static class ExportExcel
        {

            public static double MeasureTextHeight(string text, ExcelFont font, double width)
            {
                const int ExcelMaxHeight = 409;
                if (string.IsNullOrEmpty(text))
                {
                    return 0.0;
                }
                var bitmap = new Bitmap((int)MagicNumbers.one, (int)MagicNumbers.one);
                var graphics = Graphics.FromImage(bitmap);

                var pixelWidth = Convert.ToInt32(width * 7.5);  //7.5 pixels per excel column width
                var drawingFont = new Font("Arial", (int)MagicNumbers.seven);
                if (font != null)
                {
                    drawingFont = new Font(font.Name, font.Size);
                }
                var size = graphics.MeasureString(text, drawingFont, pixelWidth);

                //72 DPI and 96 points per inch.  Excel height in points with max of 409 per Excel requirements.
                return Math.Min(Convert.ToDouble(size.Height), ExcelMaxHeight);
            }
            public static string GetExcelDetails(Request request, SnapshotResponse response, HttpContextBase context)
            {
                var responseData = response != null ? response.DataList.ToList() : null;
                const int mergeColumns = 6;
                string filepath = null;

                var dirName = HttpContext.Current.Session.SessionID;
                var strpath = TempFilePath + dirName + "/Occasion_Profile_Excel_Export_" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Culture) + ".xlsx";
                if (context != null)
                {
                    filepath = context.Server.MapPath(Templates.SnapshotExcel);
                    if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
                    {
                        Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
                    }
                    Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));

                    string destFile = context.Server.MapPath(strpath);
                    const bool isWrapText = true;
                    const bool isMerge = true;

                    var file = new FileInfo(destFile);
                    File.Copy(filepath, destFile, true);

                    if (request != null)
                    {
                        using (ExcelPackage p = new ExcelPackage(file))
                        {
                            //Both the sheets similar logic
                            for (int sheet = (int)MagicNumbers.one; sheet <= responseData.Select(x => x.WidgetNumber).Distinct().ToList().Count; sheet++)
                            {
                                ExcelWorksheet ws1 = p.Workbook.Worksheets[sheet];
                                int selsumstartRow = 6;
                                const int colIndx = (int)MagicNumbers.four;
                                const int rowStart = 16;

                                //Ignore error for Number as Text issue in Excel
                                ws1.IgnoredError.Range = ws1.Dimension.Address;
                              //  ws1.IgnoredError.NumberStoredAsText = true;

                                //Selection Summary
                                var summary = request.SelectionSummary.Replace("||", "|").Split('|');

                                #region bind summary
                                foreach (var item in summary)
                                {
                                    while (selsumstartRow < rowStart)
                                    {
                                        if (ws1.Cells[selsumstartRow, colIndx - (int)MagicNumbers.two].Value.ToString().ToLower(Culture).Trim() ==
                                            item.Split(':')[0].ToLower(Culture).Trim())
                                        {
                                            var items = item.Split(':');
                                            ws1.Cells[selsumstartRow, colIndx, selsumstartRow, colIndx + mergeColumns].Merge = isMerge;

                                            string value = item.Replace(items[0] + ":", "");

                                            ws1.Cells[selsumstartRow, colIndx].Value = value.Trim();

                                            ws1.Cells[selsumstartRow, colIndx].Style.WrapText = isWrapText;

                                            var width = ws1.Column(colIndx).Width;
                                            ws1.Row(selsumstartRow).Height = Math.Max(ws1.Row(selsumstartRow).Height,
                                                MeasureTextHeight(ws1.Cells[selsumstartRow, colIndx].Value + "...",
                                                ws1.Cells[selsumstartRow, colIndx].Style.Font, width * (int)MagicNumbers.seven));

                                            selsumstartRow++;
                                            break;
                                        }
                                        else
                                        {
                                            //check for the match, if no match then stop
                                            selsumstartRow++;
                                        }
                                    }
                                    selsumstartRow = (int)MagicNumbers.six;
                                }
                                #endregion

                                int initialRow = 14;
                                int endRow = 14;
                                int endColumn = 0;

                                string[] OccNew = summary.ToList()[(int)MagicNumbers.two].Split(':');
                                string Occasion = OccNew.Length > 2 ? OccNew[(int)MagicNumbers.two] : OccNew[(int)MagicNumbers.one];
                                string selectedMarket = summary.ToList()[(int)MagicNumbers.one];

                                var sheetData = responseData.Where(x => x.WidgetNumber == sheet).ToList();
                                var distinctProfileOrder = sheetData.Select(x => x.ProfileOrder).Distinct();
                                Dictionary<string, string> obj;
                                int[] sortProfileOrder = { 9, 10, 14, 16, 18 };

                                #region bind values and change pp and sample size
                                for (int i = 0; i <= (int)MagicNumbers.one; i++)
                                {
                                    foreach (var order in distinctProfileOrder)
                                    {
                                        var profileData = sheetData.Where(x => x.ProfileOrder == order).ToList();
                                        if (sortProfileOrder.Contains(order))
                                        {
                                            profileData = profileData.OrderByDescending(x => x.Volume).ToList();
                                        }
                                        var localColumn = endColumn + (int)MagicNumbers.four;
                                        var localRow = initialRow;
                                        foreach (var datapoint in profileData)
                                        {
                                            if (sheet == (int)MagicNumbers.one)
                                            {
                                                localRow = initialRow;
                                                ws1.Cells[localRow, localColumn].Value = datapoint.Attribute;
                                                ws1.Cells[localRow, localColumn + profileData.Count].Value = datapoint.Attribute;
                                                localRow = localRow + (int)MagicNumbers.two;
                                                if (i == 0)
                                                {
                                                    obj = ReturnCellValue(datapoint, 0, null);

                                                    if (obj[Value] != "")
                                                    {
                                                        ws1.Cells[localRow, localColumn].Value = Double.Parse(obj[Value]) / 100;
                                                        ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[ColorClass]));
                                                        if (obj[Change] != "")
                                                        {
                                                            ws1.Cells[localRow, localColumn + profileData.Count].Value = Double.Parse(obj[Change]);
                                                            ws1.Cells[localRow, localColumn + profileData.Count].Style.Font.Color.SetColor(Color.Black);
                                                        }
                                                      
                                                    }
                                                  
                                                }
                                                else //sample size
                                                {
                                                    obj = ReturnSampleValue(datapoint, 0);
                                                    ws1.Cells[localRow, localColumn].Value = Int32.Parse(obj[Weighted]);
                                                    ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[WColorClass]));
                                                    ws1.Cells[localRow, localColumn + profileData.Count].Value = Int32.Parse(obj[Unweighted]);
                                                    ws1.Cells[localRow, localColumn + profileData.Count].Style.Font.Color.SetColor(Color.FromName(obj[UColorClass]));
                                                    obj = ReturnSampleValue(datapoint, (int)MagicNumbers.one);
                                                    ws1.Cells[localRow + (int)MagicNumbers.one, localColumn].Value = Int32.Parse(obj[Weighted]);
                                                    ws1.Cells[localRow + (int)MagicNumbers.one, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[WColorClass]));
                                                    ws1.Cells[localRow + (int)MagicNumbers.one, localColumn + profileData.Count].Value = Int32.Parse(obj[Unweighted]);
                                                    ws1.Cells[localRow + (int)MagicNumbers.one, localColumn + profileData.Count]
                                                        .Style.Font.Color.SetColor(Color.FromName(obj[UColorClass]));
                                                    localRow++;
                                                }
                                                localRow++;
                                                if (i == 0)
                                                {
                                                    obj = ReturnCellValue(datapoint, (int)MagicNumbers.two, null);
                                                    if (obj[Value] != "")
                                                    {
                                                        ws1.Cells[localRow, localColumn].Value = Double.Parse(obj[Value]) / 100;
                                                        ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[ColorClass]));

                                                        if (obj[Change] != "")
                                                        {
                                                            ws1.Cells[localRow, localColumn + profileData.Count].Value = Double.Parse(obj[Change]);
                                                            ws1.Cells[localRow, localColumn + profileData.Count].Style.Font.Color.SetColor(Color.Black);
                                                        }
                                                      
                                                    }
                                                 
                                                }
                                                else //sample size
                                                {
                                                    obj = ReturnSampleValue(datapoint, (int)MagicNumbers.two);
                                                    ws1.Cells[localRow, localColumn].Value =  Int32.Parse(obj[Weighted]);
                                                    ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[WColorClass]));
                                                    ws1.Cells[localRow, localColumn + profileData.Count].Value = Int32.Parse(obj[Unweighted]);
                                                    ws1.Cells[localRow, localColumn + profileData.Count].Style.Font.Color.SetColor(Color.FromName(obj[UColorClass]));
                                                    obj = ReturnSampleValue(datapoint, (int)MagicNumbers.three);
                                                    ws1.Cells[localRow + (int)MagicNumbers.one, localColumn].Value = Int32.Parse(obj[Weighted]);
                                                    ws1.Cells[localRow + (int)MagicNumbers.one, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[WColorClass]));
                                                    ws1.Cells[localRow + (int)MagicNumbers.one, localColumn + profileData.Count].Value = Int32.Parse(obj[Unweighted]);
                                                    ws1.Cells[localRow + (int)MagicNumbers.one, localColumn + profileData.Count]
                                                        .Style.Font.Color.SetColor(Color.FromName(obj[UColorClass]));
                                                }
                                                localColumn++;
                                                endColumn = localColumn + profileData.Count;
                                            }
                                            else
                                            {
                                                if (!(i == (int)MagicNumbers.one && order == (int)MagicNumbers.four))
                                                {
                                                    if (localRow == initialRow)
                                                    {
                                                        if (Array.Exists(Snapshotsheets, ele => ele.Equals(sheet)) ||
                                                            (sheet == (int)MagicNumbers.seven && order == (int)MagicNumbers.nine))
                                                        {
                                                            ws1.Cells[localRow, localColumn].Value = "Total";
                                                            localColumn++;
                                                        }
                                                        ws1.Cells[localRow, localColumn].Value = Occasion;
                                                        localColumn++;
                                                        if (Array.Exists(Snapshotsheets, ele => ele.Equals(sheet)) ||
                                                            (sheet == (int)MagicNumbers.seven && order == (int)MagicNumbers.nine))
                                                        {
                                                            ws1.Cells[localRow, localColumn].Value = "Total";
                                                            localColumn++;
                                                        }
                                                        if (!(sheet == (int)MagicNumbers.two && order == (int)MagicNumbers.four))//no change for average hh income
                                                        {
                                                            ws1.Cells[localRow, localColumn].Value = Occasion;
                                                        }
                                                        localRow = localRow + (int)MagicNumbers.two;
                                                    }
                                                    localColumn = endColumn + (int)MagicNumbers.four;
                                                    int index = 0;
                                                    if (i == (int)MagicNumbers.one && datapoint.Attribute == profileData[0].Attribute)//sample size
                                                    {
                                                        index = 0;
                                                        if (Array.Exists(Snapshotsheets, ele => ele.Equals(sheet)) ||
                                                            (sheet == (int)MagicNumbers.seven && order == (int)MagicNumbers.nine))
                                                        {
                                                            obj = ReturnSampleValue(datapoint, (int)MagicNumbers.four);
                                                            ws1.Cells[localRow, localColumn].Value = Int32.Parse(obj[Weighted]);
                                                            ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[WColorClass]));
                                                            ws1.Cells[localRow, localColumn + (int)MagicNumbers.two].Value = Int32.Parse(obj[Unweighted]);
                                                            ws1.Cells[localRow, localColumn + (int)MagicNumbers.two].Style.Font.Color.SetColor(Color.FromName(obj[UColorClass]));
                                                            localColumn++;
                                                            index++;
                                                        }
                                                        obj = ReturnSampleValue(datapoint, (int)MagicNumbers.zero);
                                                        ws1.Cells[localRow, localColumn].Value = Int32.Parse(obj[Weighted]);
                                                        ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[WColorClass]));
                                                        ws1.Cells[localRow, localColumn + (int)MagicNumbers.one + index].Value = Int32.Parse(obj[Unweighted]);
                                                        ws1.Cells[localRow, localColumn + (int)MagicNumbers.one + index].Style.Font.Color.SetColor(Color.FromName(obj[UColorClass]));
                                                        localRow++;
                                                        localColumn = localColumn - index;
                                                    }
                                                    if (!ws1.Cells[localRow, localColumn - (int)MagicNumbers.two, localRow, localColumn - (int)MagicNumbers.one].Merge)
                                                    {
                                                        ws1.Cells[localRow, localColumn - (int)MagicNumbers.two, localRow, localColumn - (int)MagicNumbers.one].Merge = true;
                                                    }
                                                    ws1.Cells[localRow, localColumn - (int)MagicNumbers.two, localRow, localColumn - (int)MagicNumbers.one].Style.WrapText = true;
                                                    ws1.Cells[localRow, localColumn - (int)MagicNumbers.two, localRow, localColumn - (int)MagicNumbers.one].Value = datapoint.Attribute;
                                                    var width = ws1.Column(localColumn - (int)MagicNumbers.two).Width + ws1.Column(localColumn - (int)MagicNumbers.one).Width;
                                                    ws1.Row(localRow).Height = Math.Max(ws1.Row(localRow).Height,
                                                        MeasureTextHeight(datapoint.Attribute + "...", ws1.Cells[localRow, localColumn - (int)MagicNumbers.two].Style.Font, width));
                                                    ws1.Cells[localRow, localColumn - (int)MagicNumbers.two, localRow, localColumn - (int)MagicNumbers.one].Style.HorizontalAlignment =
                                                        ExcelHorizontalAlignment.Left;
                                                    ws1.Cells[localRow, localColumn - (int)MagicNumbers.two, localRow, localColumn - (int)MagicNumbers.one].Style.VerticalAlignment =
                                                        ExcelVerticalAlignment.Center;

                                                    if (Array.Exists(Snapshotsheets, ele => ele.Equals(sheet)) ||
                                                        (sheet == (int)MagicNumbers.seven && order == (int)MagicNumbers.nine))
                                                    {
                                                        if (i == 0)
                                                        {
                                                            obj = ReturnCellValue(datapoint, (int)MagicNumbers.one, null);

                                                            if (obj[Value] != "")
                                                            {
                                                                ws1.Cells[localRow, localColumn].Value = Double.Parse(obj[Value]) / 100;
                                                                ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[ColorClass]));
                                                            }
                                                          
                                                        }
                                                        else
                                                        {
                                                            obj = ReturnSampleValue(datapoint, (int)MagicNumbers.five);
                                                            ws1.Cells[localRow, localColumn].Value = Int32.Parse(obj[Weighted]);
                                                            ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[WColorClass]));
                                                        }
                                                        localColumn++;
                                                    }

                                                    if (i == 0)
                                                    {
                                                        obj = ReturnCellValue(datapoint, 0, selectedMarket.Trim());

                                                        if (obj[Value] != "")
                                                        {

                                                            if (datapoint.Attribute.ToUpper(Culture) != "AVERAGE HH INCOME" && datapoint.Attribute.ToUpper(Culture) != "AVERAGE ITEMS PER OCCASION")
                                                                ws1.Cells[localRow, localColumn].Value = Double.Parse(obj[Value]) / 100;
                                                            else if(datapoint.Attribute.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION")
                                                            {
                                                                ws1.Cells[localRow, localColumn].Value = Double.Parse(obj[Value]);
                                                            }
                                                            else
                                                            {
                                                                ws1.Cells[localRow, localColumn].Value =obj[Value];
                                                            }

                                                            ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor
                                                                (datapoint.Attribute.ToUpper(Culture) != "AVERAGE HH INCOME" ? Color.FromName(obj["colorClass"]) : Color.Black);
                                                        }
                                                      
                                                    }
                                                    else
                                                    {
                                                        obj = ReturnSampleValue(datapoint, (int)MagicNumbers.one);
                                                        ws1.Cells[localRow, localColumn].Value = Int32.Parse(obj[Weighted]);
                                                        ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[WColorClass]));
                                                    }
                                                    localColumn++;
                                                    if (Array.Exists(Snapshotsheets, ele => ele.Equals(sheet)) ||
                                                        (sheet == (int)MagicNumbers.seven && order == (int)MagicNumbers.nine))
                                                    {
                                                        if (i == 0)
                                                        {
                                                            obj = ReturnCellValue(datapoint, (int)MagicNumbers.one, null);
                                                            if (obj[Change] != "")
                                                            {
                                                                ws1.Cells[localRow, localColumn].Value = Double.Parse(obj[Change]);
                                                                ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.Black);
                                                            }
                                                        
                                                        }
                                                        else
                                                        {
                                                            obj = ReturnSampleValue(datapoint, (int)MagicNumbers.five);
                                                            ws1.Cells[localRow, localColumn].Value = Int32.Parse(obj[Unweighted]);
                                                            ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[UColorClass]));
                                                        }
                                                        localColumn++;
                                                    }
                                                    if (!(sheet == (int)MagicNumbers.two && order == (int)MagicNumbers.four))//no change for average hh income
                                                    {
                                                        if (i == 0)
                                                        {
                                                            obj = ReturnCellValue(datapoint, (int)MagicNumbers.zero, null);
                                                            if (obj[Change] != "")
                                                            {
                                                                ws1.Cells[localRow, localColumn].Value = Double.Parse(obj[Change]);
                                                                ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.Black);
                                                            }
                                                          
                                                        }
                                                        else
                                                        {
                                                            obj = ReturnSampleValue(datapoint, (int)MagicNumbers.one);
                                                            ws1.Cells[localRow, localColumn].Value = Int32.Parse(obj[Unweighted]);
                                                            ws1.Cells[localRow, localColumn].Style.Font.Color.SetColor(Color.FromName(obj[UColorClass]));
                                                        }
                                                    }
                                                    if (datapoint.Attribute != profileData[profileData.Count - (int)MagicNumbers.one].Attribute)
                                                    {
                                                        localRow++;
                                                    }
                                                    if (datapoint.Attribute == profileData[profileData.Count - (int)MagicNumbers.one].Attribute && sheet ==
                                                        (int)MagicNumbers.four && profileData.Count < (int)MagicNumbers.three)
                                                    {
                                                        ws1.DeleteRow(localRow + (int)MagicNumbers.one);
                                                        if (profileData.Count < (int)MagicNumbers.two)
                                                        {
                                                            ws1.DeleteRow(localRow + (int)MagicNumbers.one);
                                                        }
                                                    }
                                                    if (datapoint.Attribute == profileData[profileData.Count - (int)MagicNumbers.one].Attribute && sheet ==
                                                        (int)MagicNumbers.ten && profileData.Count < (int)MagicNumbers.eight)
                                                    {
                                                        int count = 8;
                                                        while (profileData.Count <= count)
                                                        {
                                                            ws1.DeleteRow(localRow + (int)MagicNumbers.one);
                                                            count--;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        endColumn = Math.Max(localColumn, endColumn);
                                        endRow = Math.Max(endRow, localRow);
                                    }
                                    endColumn = 0;
                                    initialRow = endRow + (int)MagicNumbers.four;
                                }
                                #endregion


                                p.Save();
                            }

                            string selected_Market = request.SelectionSummary.Replace("||", "|").Split('|').ToList()[(int)MagicNumbers.one];
                            if ((selected_Market.Split(':').ToList().Count == (int)MagicNumbers.two && selected_Market.Contains("North America")) ||
                                (selected_Market.Split(',').Length > 1 && selected_Market.Contains("Canada")))
                            {

                                p.Workbook.Worksheets.Delete(p.Workbook.Worksheets[(int)MagicNumbers.ten]);
                                p.Workbook.Worksheets.Delete(p.Workbook.Worksheets[(int)MagicNumbers.eight]);
                                p.Workbook.Worksheets.Delete(p.Workbook.Worksheets[(int)MagicNumbers.four]);

                            }
                            p.Save();
                        }

                    }
                }
                return strpath;
            }

            public static Dictionary<string, string> ReturnCellValue(ResponseData rowObj, int flag, string selectedMarket)
            {
                //note flag 0 for volume, 1 for  volume total and 2 for volume home
                Dictionary<string, string> obj = new Dictionary<string, string>();
                obj.Add(Value, "");
                obj.Add(Change, "");
                obj.Add(ColorClass, Black);
                if (rowObj != null)
                {
                    if (rowObj.Volume != null && flag == 0)
                    {//sample size check for volume
                        double Volume = rowObj.Volume ?? 0;
                        if (rowObj.USampleSize == null)
                        {
                            obj[Value] = "";//"NA"
                        }
                        else if (rowObj.USampleSize < InsufficientSample)
                        {
                            obj[Value] = "";//"LS"
                        }
                        else
                        {
                            obj[ColorClass] = (rowObj.USampleSize >= InsufficientSample && rowObj.USampleSize <= LowSample) ? "Gray" : obj[ColorClass];

                            if (rowObj.Attribute.ToUpper(Culture) == "AVERAGE HH INCOME")
                            {
                                obj[Value] = GetCurrencySymbol(selectedMarket) == "" ? "Not Applicable" :
                                    GetCurrencySymbol(selectedMarket) + Math.Round(Volume, (int)MagicNumbers.two).ToString("0.00", Culture) + "K";
                            }
                            else if (rowObj.Attribute.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION")
                            {
                                obj[Value] = Math.Round(Volume, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                            }
                            else
                            {
                                obj[Value] = Math.Round(Volume, 0, MidpointRounding.AwayFromZero).ToString(Culture);
                            }
                        }
                    }
                    else if (rowObj.VolumeTotal != null && flag == (int)MagicNumbers.one)
                    {//sample size check for total volume
                        double VolumeTotal = rowObj.VolumeTotal ?? 0;
                        if (rowObj.USampleSizeTotal == null)
                        {
                            obj[Value] = "";//"NA"
                        }
                        else if (rowObj.USampleSizeTotal < InsufficientSample)
                        {
                            obj[Value] = "";//"LS"
                        }
                        else
                        {
                            obj[ColorClass] = (rowObj.USampleSizeTotal >= InsufficientSample && rowObj.USampleSizeTotal <= LowSample) ? "Gray" : obj[ColorClass];

                            obj[Value] = Math.Round(VolumeTotal, 0, MidpointRounding.AwayFromZero).ToString(Culture);
                        }
                    }
                    else if (rowObj.VolumeHome != null && flag == (int)MagicNumbers.two)
                    {//sample size check for at home volume
                        double VolumeHome = rowObj.VolumeHome ?? 0;
                        if (rowObj.USampleSizeHome == null)
                        {
                            obj[Value] = "";//"NA"
                        }
                        else if (rowObj.USampleSizeHome < InsufficientSample)
                        {
                            obj[Value] = "";//"LS"
                        }
                        else
                        {
                            obj[ColorClass] = (rowObj.USampleSizeHome >= InsufficientSample && rowObj.USampleSizeHome <= LowSample) ? "Gray" : obj[ColorClass];

                            obj[Value] = Math.Round(VolumeHome, 0, MidpointRounding.AwayFromZero).ToString(Culture);
                        }
                    }
                    else
                    {
                        obj[Value] = "";
                    }

                    if (/*obj[Value] != "NA" && obj[Value] != "LS"*/obj[Value] != "" && rowObj.Significance != null && obj[ColorClass] != "Gray" && flag != 1)
                    {
                        if (rowObj.Significance > 0)
                        {
                            obj[ColorClass] = "Green";
                        }
                        else if (rowObj.Significance < 0)
                        {
                            obj[ColorClass] = "Red";
                        }
                        else
                        {
                            obj[ColorClass] = Black;
                        }
                    }

                    if (/*obj[Value] != "NA" && obj[Value] != "LS"*/ obj[Value] != "" && rowObj.DiffVol != null && flag == 0)
                    {
                        double DiffVol = rowObj.DiffVol ?? 0;
                        var change = Math.Round(DiffVol, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                        obj[Change] =change;
                    }
                    else if (obj[Value] != "" && rowObj.DiffVolTotal != null && flag == (int)MagicNumbers.one)
                    {
                        double DiffVolTotal = rowObj.DiffVolTotal ?? 0;
                        var change = Math.Round(DiffVolTotal, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                        obj[Change] =change;
                    }
                    else if (obj[Value] != "" && rowObj.DiffVolHome != null && flag == (int)MagicNumbers.two)
                    {
                        double DiffVolHome = rowObj.DiffVolHome ?? 0;
                        var change = Math.Round(DiffVolHome, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                        obj[Change] = change;
                    }
                    else
                    {
                        obj[Change] = "";
                    }
                }
                return obj;
            }

            public static string GetCurrencySymbol(string selectedMarket)
            {
                string symbol = "$";
                if (selectedMarket != null)
                {
                    if (selectedMarket.Split(':').ToList().Count == (int)MagicNumbers.two || selectedMarket.Split(',').ToList().Count > 1)
                    {
                        symbol = "";
                    }
                    else if (selectedMarket.Contains("Brazil"))
                    {
                        symbol = "R$";
                    }
                    else if (selectedMarket.Contains("France"))
                    {
                        symbol = "€";
                    }
                    else if (selectedMarket.Contains("UK"))
                    {
                        symbol = "£";
                    }
                    else
                    {
                        symbol = "$";
                    }
                }
                return symbol;
            }

            public static Dictionary<string, string> ReturnSampleValue(ResponseData rowObj, int flag)
            {
                //note flag 0 for volume, 1 for  volume total and 2 for volume home
                Dictionary<string, string> obj = new Dictionary<string, string>();
                obj.Add(Weighted, "");
                obj.Add(WColorClass, Black);
                obj.Add(Unweighted, "");
                obj.Add(UColorClass, Black);
                if (rowObj != null)
                {
                    double? uSample = null;
                    double? wSample = null;
                    switch (flag)
                    {
                        case 0://sample size base
                            uSample = rowObj.USampleSize;
                            wSample = rowObj.WSampleSize;
                            break;
                        case (int)MagicNumbers.one://numerator 
                            uSample = rowObj.UNumerator;
                            wSample = rowObj.WNumerator;
                            break;
                        case (int)MagicNumbers.two://sample size @ home
                            uSample = rowObj.USampleSizeHome;
                            wSample = rowObj.WSampleSizeHome;
                            break;
                        case (int)MagicNumbers.three://numerator @ home
                            uSample = rowObj.UNumeratorHome;
                            wSample = rowObj.WNumeratorHome;
                            break;
                        case (int)MagicNumbers.four: //sample size @ total
                            uSample = rowObj.USampleSizeTotal;
                            wSample = rowObj.WSampleSizeTotal;
                            break;
                        case (int)MagicNumbers.five://numerator @ total
                            uSample = rowObj.UNumeratorTotal;
                            wSample = rowObj.WNumeratorTotal;
                            break;
                        default:
                            obj[Weighted] = "";
                            break;
                    }
                    if (uSample != null)
                    {
                        double USampleSize = uSample ?? 0;
                        obj[UColorClass] = USampleSize <= LowSample ? "Gray" : Black;
                        obj[Unweighted] = Math.Round(USampleSize, 0, MidpointRounding.AwayFromZero).ToString(Culture);
                    }
                    if (wSample != null)
                    {
                        int[] indexes = new[] { 1, 3, 5 };
                        double WSampleSize = wSample ?? 0;
                        double samp = indexes.Contains(flag) ? uSample ?? 0 : WSampleSize;
                        obj[WColorClass] = samp <= LowSample ? "Gray" : Black;
                        obj[Weighted] = Math.Round(WSampleSize, 0, MidpointRounding.AwayFromZero).ToString(Culture);
                    }

                }

                return obj;
            }
        }
    }
}
