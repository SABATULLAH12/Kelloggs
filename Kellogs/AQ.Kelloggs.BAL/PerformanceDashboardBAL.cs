using AQ.Kelloggs.DAL;
using AQ.Kelloggs.Models;
using AQ.Kelloggs.Models.AdvancedAnalytics;
using AQ.Kelloggs.Models.PerformanceDashboard;
using Aspose.Slides;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static AQ.Kelloggs.Models.Constants;
using static System.MidpointRounding;

namespace AQ.Kelloggs.BAL
{
    public static class PerformanceDashboardBAL
    {

        readonly static CommonDAL dalObj = new CommonDAL();
        public static PDResponse GetPDashboardData(PDRequest PDRequestData, HttpContextBase context)
        {
            PDResponse response = new PDResponse();
            if (PDRequestData != null)
            {
                object[] parameters = {
                PDRequestData.TimePeriod,
                PDRequestData.Market,
                PDRequestData.Category
            };

                DataSet dataset = dalObj.GetPDashboardData(parameters);

                response.DataList = (from rows in dataset.Tables[0].AsEnumerable()
                                     select new PDResponseData
                                     {

                                         Occasion = Convert.ToString(rows[DBParameters.Occasion], Constants.Culture),
                                         StrategicPosture = Convert.ToString(rows[DBParameters.StrategicPosture], Constants.Culture),
                                         TimePeriod = Convert.ToString(rows[DBParameters.TimePeriod], Constants.Culture),
                                         Metric = Convert.ToString(rows[DBParameters.Metric], Constants.Culture),
                                         Value = rows[DBParameters.Values] == DBNull.Value ? null : (double?)rows[DBParameters.Values],
                                         StrategicColor = rows[DBParameters.StrategicColor] == DBNull.Value ? null : (int?)rows[DBParameters.StrategicColor],
                                         USampleSize = rows[DBParameters.USample] == DBNull.Value ? null : (int?)rows[DBParameters.USample],
                                         WSampleSize = rows[DBParameters.WSample] == DBNull.Value ? null : (double?)rows[DBParameters.WSample],
                                         UNumerator = rows[DBParameters.UNumerator] == DBNull.Value ? null : (int?)rows[DBParameters.UNumerator],
                                         WNumerator = rows[DBParameters.WNumerator] == DBNull.Value ? null : (double?)rows[DBParameters.WNumerator],
                                         TimeperiodOrder = Convert.ToInt32(rows[DBParameters.TimeperiodOrder], Constants.Culture),
                                         MetricOrder = Convert.ToInt32(rows[DBParameters.MetricOrder], Constants.Culture),
                                         OccasionOrder = Convert.ToInt32(rows[DBParameters.OccasionOrder], Constants.Culture),
                                         UNumeratorTotal = 0,
                                         USampleSizeTotal = 0
                                     }).ToList();
                UpdatingTotalSampleSize(response.DataList);
            }
            return response;
        }

        private static void UpdatingTotalSampleSize(IEnumerable<PDResponseData> response)
        {
            var rows = response.Where(x => x.Occasion.ToUpper(Culture) == "ALL OCCASIONS").ToList();
            foreach (var item in response)
            {
                var record = rows.Where(x => x.TimePeriod == item.TimePeriod && x.Metric == item.Metric).ToList()[0];
                item.UNumeratorTotal = record.UNumerator;
                item.USampleSizeTotal = record.USampleSize;
            }
        }
        public static class ExportToPpt
        {
            public static string PDPptExport(PDRequest request, PDResponse response, HttpContextBase context)
            {
                string pptName = "";
                var responseData = response.DataList.Where(e => !e.Metric.Contains("CL")).ToList();
                string filepath = context.Server.MapPath(Templates.PDPpt);
                Aspose.Slides.License license = new Aspose.Slides.License();
                license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));
                Aspose.Slides.IPresentation pres = new Aspose.Slides.Presentation(filepath);

                if (request != null)
                {
                    using (pres)
                    {
                        ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "Country")).TextFrame.Text = "COUNTRY : " + request.Market;
                        ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "Category")).TextFrame.Text = "CATEGORY : " + request.Category;
                        ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "TimePeriod")).TextFrame.Text = "TIME PERIOD : " + request.TimePeriod;
                        ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "Date")).TextFrame.Text = "DATE : " + System.DateTime.Today.ToShortDateString();
                        string[] timeHeader = responseData.OrderBy(x => x.TimeperiodOrder).Select(x => x.TimePeriod).Distinct().ToArray();
                        string[] slideList = new[] { "1,2,3", "4,5,6", "7,8,9", "10,11,12" };
                        int[] slideNos = slideList[timeHeader.Length - (int)MagicNumbers.two].Split(',').Select(x => Convert.ToInt32(x, Culture)).ToArray();
                        for (int i = (int)MagicNumbers.twelve; i > 0; i--)
                        {
                            if (!slideNos.Contains(i))
                            {
                                pres.Slides.RemoveAt(i);
                            }
                        }

                        string[] OccasionList = responseData.OrderBy(x => x.OccasionOrder).Select(x => x.Occasion).Distinct().ToArray();
                        for (int i = 1; i < (int)MagicNumbers.four; i++)
                        {
                            IBaseSlide slide = pres.Slides[i];
                            ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "SelectionSummary")).TextFrame.Text = "Selection Summary : " + request.SelectionSummary;
                            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "DataTable");
                            int row = 1;
                            for (int j = 0; j < OccasionList.Length; j++)
                            {
                                var OccData = responseData.Where(x => x.Occasion == OccasionList[j]);
                                table[1, row].TextFrame.Text = OccasionList[j].ToUpper(Culture);
                                table[(int)MagicNumbers.two, row].TextFrame.Text = OccData.ToList()[0].StrategicPosture;
                                ExportToPpt.BindDataTable(i, row, timeHeader, OccData, table, j, slide);
                                row++;
                            }
                        }
                        pptName = SaveFile(pres, "Occasion_Performance_Dashboard");//ppt name
                    }
                }
                return pptName;
            }
            public static void BindDataTable(int slideNo, int row, string[] timeHeader, IEnumerable<PDResponseData> OccData, ITable table, int OccId, IBaseSlide slide)
            {
                switch (slideNo)
                {
                    case 1:
                        BindSlide1(row, timeHeader, OccData, table, OccId, slide);
                        break;
                    case (int)MagicNumbers.two:
                    case (int)MagicNumbers.three:
                        BindSlide23(row, OccData, table, OccId, slide, slideNo);
                        break;
                    default:
                        return;
                }
            }
            private static void BindSlide1(int row, string[] timeHeader, IEnumerable<PDResponseData> OccData, ITable table, int OccId, IBaseSlide slide)
            {
                ITable HeaderTable = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "TimePeriodHeaderTable");
                int column = (int)MagicNumbers.three;
                for (int k = 0; k < timeHeader.Length; k++)
                {
                    HeaderTable[k, 0].TextFrame.Text = timeHeader[k].ToUpper(Culture);
                    string[] MetricList = OccData.Where(x => x.TimePeriod == timeHeader[k]).OrderBy(x => x.MetricOrder).Select(x => x.Metric).Distinct().ToArray();
                    for (int p = 0; p < MetricList.Length; p++)
                    {
                        if (OccId == 0)
                        {
                            table[column, row - 1].TextFrame.Text = MetricList[p].Contains(Target) && timeHeader[k].ToUpper(Culture) == KOccasion ? MetricList[p] + " (pts change)" : MetricList[p];
                        }
                        var dataList = OccData.Where(x => x.TimePeriod == timeHeader[k]);
                        var record = dataList.FirstOrDefault(x => x.Metric == MetricList[p]);
                        column = BindCellValue(record, column, row, table, (k == timeHeader.Length - 1 && p == MetricList.Length - 1 && MetricList[p].Contains(Target)), 1, false);

                    }
                }
            }
            private static void BindSlide23(int row, IEnumerable<PDResponseData> OccData, ITable table, int OccId, IBaseSlide slide, int slideNo)
            {
                ITable HeaderTable = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "TimePeriodHeaderTable");
                int column = (int)MagicNumbers.three;
                var MetricList1 = OccData.Where(e => e.Metric.ToUpper(Culture) == KOccasion && e.TimePeriod.ToUpper(Culture) != KOccasion);
                var MetricList2 = OccData.Where(e => e.TimePeriod.ToUpper(Culture) == KOccasion && e.Metric.ToUpper(Culture).Contains(Benchmark)).ToList();
                var MetricList = MetricList2.Concat(MetricList1.OrderBy(x => x.TimeperiodOrder)).ToList();
                for (int x = 0; x <= 1; x++)
                {
                    for (int y = 0; y < MetricList.Count; y++)
                    {
                        if (OccId == 0)
                        {
                            HeaderTable[y, 0].TextFrame.Text = HeaderTable[y + MetricList.Count, 0].TextFrame.Text = y == 0 ? MetricList[y].Metric : MetricList[y].TimePeriod;
                        }
                        PDResponseData record = MetricList[y];
                        column = BindCellValue(record, column, row, table, false, slideNo, x == 0);
                    }
                }
            }
            private static int BindCellValue(PDResponseData recordList, int column, int row, ITable table, bool sigFlag, int slideNo, bool wFlag)
            {
                var record = recordList;
                var obj = slideNo == 1 ? CommonExports.GetCellValue(record, sigFlag) : CommonExports.GetSampleValue(record, slideNo, wFlag);
                table[column, row].TextFrame.Text = obj[Constants.Value];
                table[column, row].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[column, row].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[Constants.ColorClass]);
                if (slideNo == 1)
                {
                    table[column, row].BorderLeft.FillFormat.FillType = FillType.Solid;
                    table[column, row].BorderLeft.FillFormat.SolidFillColor.Color = System.Drawing.ColorTranslator.FromHtml(obj[Constants.BorderColor]);
                    table[column, row].FillFormat.FillType = FillType.Solid;
                    table[column, row].FillFormat.SolidFillColor.Color = System.Drawing.ColorTranslator.FromHtml(obj[Constants.BackColor]);
                    if (table[column, 0].TextFrame.Text.Contains("(pts change)") && record.TimePeriod.ToUpper(Culture) == KOccasion)
                    {
                        var text = table[column, row].TextFrame.Text.Replace("%", "");
                        string diffVal = CommonExports.GetPtChangeValue(text, table[3, row].TextFrame.Text.Replace("%", ""), "ppt").ToString();
                        string diff = diffVal.Replace("(", "").Replace(")", "").Replace("%", "");
                        table[column, row].TextFrame.Text = CommonExports.GetAddDiffValue(table[(int)MagicNumbers.three, row].TextFrame.Text.Replace("%", ""), diff, Plus,"ppt");
                        table[column, row].TextFrame.Text += diffVal;
                    }
                    ModifyValueBasedOnFormula(record, table, row, column);
                }
                return column + 1;
            }

            private static void ModifyValueBasedOnFormula(PDResponseData record, ITable table, int row, int column)
            {
                if (record.MetricOrder != 1)
                {
                    var resultValue = "";
                    var parentValue = table[column - 1, row].TextFrame.Text.Replace("%", "");
                    if (record.MetricOrder == (int)MagicNumbers.two && record.TimePeriod.ToUpper(Culture) != KOccasion)
                    {
                        var firstColValue = table[3, row].TextFrame.Text.Replace("%", "");
                        resultValue = CommonExports.GetAddDiffValue(parentValue, firstColValue, Minus, "ppt");
                    }
                    else if (record.MetricOrder == (int)MagicNumbers.three && record.Metric.Contains(Target))
                    {
                        var targetValue = table[4, row].TextFrame.Text.Split(' ')[0].Replace("%", "");
                        parentValue = table[column - (int)MagicNumbers.two, row].TextFrame.Text.Replace("%", "");
                        resultValue = CommonExports.GetAddDiffValue(parentValue, targetValue, Minus, "ppt");
                    }
                    else
                    {
                        resultValue = table[column, row].TextFrame.Text;
                    }
                    if (record.Metric.StartsWith("vs") && resultValue != " - ")
                    {
                        resultValue = Math.Round(Convert.ToDouble(resultValue.Replace("%", ""), Culture) / (int)MagicNumbers.hundred, 1, AwayFromZero) + "%";
                    }
                    table[column, row].TextFrame.Text = resultValue;
                    if (resultValue == " - ")
                    {
                        table[column, row].BorderLeft.FillFormat.SolidFillColor.Color = System.Drawing.ColorTranslator.FromHtml(White);
                        table[column, row].FillFormat.SolidFillColor.Color = System.Drawing.ColorTranslator.FromHtml(White);
                    }
                }

            }

            private static string SaveFile(Aspose.Slides.IPresentation pres, string dashboardName)
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

        }
        public static class ExportToExcel
        {
            public static string PDExcelExport(PDRequest request, PDResponse response, HttpContextBase context)
            {
                var responseData = response.DataList;
                string filepath = context.Server.MapPath(Templates.PDExcel);
                var dirName = HttpContext.Current.Session.SessionID;
                var strpath = TempFilePath + dirName + "/Occasion_Performance_Dashboard" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Constants.Culture) + ".xlsx";
                if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
                {
                    Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
                }
                Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));

                string destFile = context.Server.MapPath(strpath);
                var file = new FileInfo(destFile);
                File.Copy(filepath, destFile, true);
                if (request != null)
                {
                    using (ExcelPackage p = new ExcelPackage(file))
                    {
                        string[] timeHeader = responseData.OrderBy(x => x.TimeperiodOrder).Select(x => x.TimePeriod).Distinct().ToArray();
                        string[] OccasionList = responseData.OrderBy(x => x.OccasionOrder).Select(x => x.Occasion).Distinct().ToArray();
                        for (int sheet = 1; sheet <= (int)MagicNumbers.three; sheet++)
                        {
                            ExcelWorksheet ws = p.Workbook.Worksheets[sheet];
                            ws.Cells[(int)MagicNumbers.six, (int)MagicNumbers.four].Value = request.TimePeriod;
                            ws.Cells[(int)MagicNumbers.seven, (int)MagicNumbers.four].Value = request.Market;
                            ws.Cells[(int)MagicNumbers.eight, (int)MagicNumbers.four].Value = request.Category;
                            int row = 19;
                            for (int j = 0; j < OccasionList.Length; j++)
                            {
                                var OccData = responseData.Where(x => x.Occasion == OccasionList[j]);
                                ws.Cells[row, (int)MagicNumbers.two].Value = OccasionList[j].ToUpper(Culture);
                                ws.Cells[row, (int)MagicNumbers.three].Value = OccData.ToList()[0].StrategicPosture;
                                ExportToExcel.BindDataTable(sheet, row, timeHeader, OccData, ws, j);
                                row++;
                            }
                            ws.IgnoredError.Range = ws.Dimension.Address;
                            ws.IgnoredError.NumberStoredAsText = true;
                            p.Workbook.Calculate();
                            p.Save();
                        }
                    }
                }
                return strpath;
            }
            public static void BindDataTable(int sheet, int row, string[] timeHeader, IEnumerable<PDResponseData> OccData, ExcelWorksheet ws, int OccId)
            {
                if (sheet == (int)MagicNumbers.three)
                {
                    ws.Cells[row + (int)MagicNumbers.twenty, (int)MagicNumbers.two].Value = OccData.ToList()[0].Occasion.ToUpper(Culture);
                    ws.Cells[row + (int)MagicNumbers.twenty, (int)MagicNumbers.three].Value = OccData.ToList()[0].StrategicPosture;
                }
                switch (sheet)
                {
                    case 1:
                    case (int)MagicNumbers.two:
                        BindSheet12(row, timeHeader, OccData, ws, OccId, sheet);
                        break;
                    case (int)MagicNumbers.three:
                        BindSheet3(row, OccData, ws, OccId, 0, "K.Share of Category");
                        BindSheet3(row + (int)MagicNumbers.twenty, OccData, ws, OccId, 1, "Category Share");
                        break;
                    default:
                        return;
                }
            }
            private static void BindSheet12(int row, string[] timeHeader, IEnumerable<PDResponseData> OccData, ExcelWorksheet ws, int OccId, int sheet)
            {
                int column = (int)MagicNumbers.four;
                for (int k = 0; k < timeHeader.Length; k++)
                {
                    string[] MetricList = OccData.Where(x => x.TimePeriod == timeHeader[k]).OrderBy(x => x.MetricOrder).Select(x => x.Metric).Distinct().ToArray();
                    if (sheet == 1)
                    {
                        MetricList = OccData.Where(x => x.TimePeriod == timeHeader[k] && !x.Metric.Contains("CL")).OrderBy(x => x.MetricOrder).Select(x => x.Metric).Distinct().ToArray();
                    }
                    if (OccId == 0)
                    {
                        ws.Cells[row - (int)MagicNumbers.three, column].Value = timeHeader[k].ToUpper(Culture);
                        ws.Cells[row - (int)MagicNumbers.three, column, row, column + MetricList.Length - 1].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    }
                    for (int p = 0; p < MetricList.Length; p++)
                    {
                        if (OccId == 0)
                        {
                            ws.Cells[row - (int)MagicNumbers.two, column].Value = MetricList[p];
                            ws.Cells[row - (int)MagicNumbers.one, column].Value = MetricList[p];
                            ws.Cells[row - 1, column].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            ws.Cells[row - (int)MagicNumbers.two, column].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                        }
                        var dataList = OccData.Where(x => x.TimePeriod == timeHeader[k]);
                        var record = dataList.FirstOrDefault(x => x.Metric == MetricList[p]);
                        column = BindCellValue(record, column, row, ws, (k == timeHeader.Length - 1 && p == MetricList.Length - 1 && MetricList[p].Contains(Target)), sheet, false);

                    }
                }
            }
            private static void BindSheet3(int row, IEnumerable<PDResponseData> OccData, ExcelWorksheet ws, int OccId, int p, string cellText)
            {
                int column = (int)MagicNumbers.four;
                var MetricList1 = OccData.Where(e => e.Metric.ToUpper(Culture) == KOccasion && e.TimePeriod.ToUpper(Culture) != KOccasion);
                var MetricList2 = OccData.Where(e => e.TimePeriod.ToUpper(Culture) == KOccasion && e.Metric.ToUpper(Culture).Contains(Benchmark) && !e.Metric.Contains("CL")).ToList();
                var MetricList = MetricList2.Concat(MetricList1.OrderBy(x => x.TimeperiodOrder)).ToList();
                for (int x = 0; x <= 1; x++)
                {
                    string addText = " (Weighted)";
                    if (x == 1)
                    {
                        addText = " (Unweighted)";
                    }
                    for (int y = 0; y < MetricList.Count; y++)
                    {
                        if (OccId == 0)
                        {
                            ws.Cells[row - (int)MagicNumbers.one, column].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            ws.Cells[row - (int)MagicNumbers.two, column].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            ws.Cells[row - (int)MagicNumbers.three, column].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                            ws.Cells[row - (int)MagicNumbers.two, column].Value = cellText + addText;
                            ws.Cells[row - (int)MagicNumbers.three, column].Value = y == 0 ? MetricList[y].Metric : MetricList[y].TimePeriod;
                        }
                        PDResponseData record = MetricList[y];
                        column = BindCellValue(record, column, row, ws, false, (int)MagicNumbers.four - p, x == 0);
                    }
                }
            }
            private static int BindCellValue(PDResponseData recordList, int column, int row, ExcelWorksheet ws, bool sigFlag, int sheet, bool wFlag)
            {
                var record = recordList;
                var obj = sheet == 1 || sheet == (int)MagicNumbers.two ? CommonExports.GetCellValue(record, sigFlag) : CommonExports.GetSampleValue(record, sheet, wFlag);
                ws.Cells[row, column].Value = ReplaceLSWithBlank(obj[Constants.Value]);
                ws.Cells[row, column].Style.Font.Color.SetColor(Color.FromName(obj[Constants.ColorClass]));
                ws.Cells[row, column].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                if (sheet == 1 || sheet == (int)MagicNumbers.two)
                {
                    if (!record.Metric.Contains("CL") && !sigFlag)
                    {
                        ws.Cells[row, column].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        ws.Cells[row, column].Style.Fill.BackgroundColor.SetColor(System.Drawing.ColorTranslator.FromHtml(obj[Constants.BackColor].Replace("#99", "#")));
                    }
                    if (ws.Cells[(int)MagicNumbers.seventeen, column + 1].Value != null &&
                        ws.Cells[(int)MagicNumbers.seventeen, column + 1].Value.ToString().Contains("(pts change)") && record.TimePeriod.ToUpper(Culture) == KOccasion)
                    {
                        var text = ws.Cells[row, column].Value.ToString().Replace("%", "");
                        ws.Cells[row, column + 1].Value = CommonExports.GetPtChangeValue(text, ws.Cells[row, (int)MagicNumbers.four].Value.ToString().Replace("%", ""), "");
                        BindFormula(sheet, ws.Cells[row, column], "IFERROR(" + ws.Cells[row, column - (int)MagicNumbers.three].Address + " + " + ws.Cells[row, column + 1].Address + ",\"-\" )");
                        column++;
                    }
                    SetFormula(record, row, column, sheet, ws);//setting formula
                    ModifyValueBasedOnFormula(record, ws, row, column, sheet);
                }
                ModifyTextAsNumber(ws, row, column);
                return column + 1;
            }

            private static void ModifyTextAsNumber(ExcelWorksheet ws, int row, int column)
            {
                if (ws.Name == "Sample Size")
                {
                    ws.Cells[row, column].Style.Numberformat.Format = "###0";
                    ws.Cells[row, column].Value = Convert.ToDouble(ws.Cells[row, column].Value.ToString().Replace("%", ""), Culture);
                }
                else
                {
                    var newcolumn = column;
                    if (ws.Cells[(int)MagicNumbers.seventeen, column].Value.ToString().Contains("pts change"))
                    {
                        newcolumn = newcolumn - 1;
                    }
                    if (ws.Cells[row, newcolumn].Value != null && ws.Cells[row, newcolumn].Value.ToString().Length > 0 &&
                  !(new[] { "#NUM!", "NA", "LS", " - ", "" }).Contains(ws.Cells[row, newcolumn].Value.ToString()))
                    {
                        double newVal = Convert.ToDouble(ws.Cells[row, newcolumn].Value.ToString().Replace("%", ""), Culture) / (int)MagicNumbers.hundred;
                        var tempName = ws.Cells[(int)MagicNumbers.seventeen, column].Value;
                        if (ws.Name == "Business Driven PerformanceDB" && tempName != null && 
                            ((tempName.ToString().Contains("Benchmark") && tempName.ToString().Contains("vs")) || tempName.ToString().EndsWith("Target")))
                        {
                            newVal = newVal * (int)MagicNumbers.hundred;
                        }
                        ws.Cells[row, newcolumn].Value = newVal;
                        ws.Cells[row, newcolumn].Style.Numberformat.Format = "###0.0%";
                    }
                    if (ws.Cells[(int)MagicNumbers.seventeen, column].Value.ToString().Contains("pts change") && 
                        ws.Cells[row, column].Value != null && ws.Cells[row, column].Value.ToString().Length > 0 &&
                        !(new[] { "#NUM!", "NA", "LS", " - ", "-" }).Contains(ws.Cells[row, column].Value.ToString()))
                    {
                        ws.Cells[row, column].Value = Convert.ToDouble(ws.Cells[row, column].Value.ToString().Replace("%", ""), Culture) / (int)MagicNumbers.hundred;
                        ws.Cells[row, column].Style.Numberformat.Format = "###0.0%";
                    }
                }
            }

            private static void ModifyValueBasedOnFormula(PDResponseData record, ExcelWorksheet ws, int row, int column, int sheet)
            {
                if (record.MetricOrder != 1 && sheet == 1 && record.MetricOrder != (int)MagicNumbers.four)
                {
                    var resultValue = "";
                    var parentValue = ws.Cells[row, column - 1].Value.ToString().Replace("%", "");
                    if (record.MetricOrder == (int)MagicNumbers.two && record.TimePeriod.ToUpper(Culture) != KOccasion)
                    {
                        var firstColValue = ws.Cells[row, 4].Value.ToString().Replace("%", "");
                        resultValue = CommonExports.GetAddDiffValue(parentValue, firstColValue, Minus, "");
                    }
                    else if (record.MetricOrder == (int)MagicNumbers.three && record.Metric.Contains(Target))
                    {
                        var targetValue = ws.Cells[row, 5].Value.ToString().Replace("%", "");
                        parentValue = ws.Cells[row, column - (int)MagicNumbers.two].Value.ToString().Replace("%", "");
                        resultValue = CommonExports.GetAddDiffValue(parentValue, targetValue, Minus, "excel");
                    }
                    else
                    {
                        resultValue = ws.Cells[row, column].Value.ToString();
                    }
                    ws.Cells[row, column].Value = resultValue;
                    if (resultValue == " - ")
                    {
                        ws.Cells[row, column].Style.Fill.BackgroundColor.SetColor(System.Drawing.ColorTranslator.FromHtml(White));
                    }
                }
            }

            private static void SetFormula(PDResponseData record, int row, int column, int sheet, ExcelWorksheet ws)
            {
                var formula = "";
                if (sheet == (int)MagicNumbers.two)
                {
                    if (record.Metric.Contains("CL"))
                    {
                        double zvalue = record.Metric.Contains("90%") ? 1.65 : 1.28;
                        formula = "IFERROR(IF(C" + row + " = \"Deprioritize\", \" - \", (" + zvalue + " * ((D" + row + " * (1 -D" + row + ") ";
                        formula += "/ 'Sample Size'!D" + (row + (int)MagicNumbers.twenty) + ")^ (1 / 2)))),\" - \")";
                    }
                    else if (record.MetricOrder == (int)MagicNumbers.two && record.TimePeriod.ToUpper(Culture) != KOccasion)
                    {
                        formula = "IFERROR(" + ws.Cells[row, column - 1].Address + " - D" + row + ",\" - \")";
                    }
                    else if (record.MetricOrder == (int)MagicNumbers.three && record.Metric.Contains(Target))
                    {
                        formula = "IFERROR(" + ws.Cells[row, column - (int)MagicNumbers.two].Address + " - G" + row + ",\" - \")";
                    }
                    else
                    {
                        formula = "";
                    }
                }
                else
                {
                    if (record.MetricOrder == (int)MagicNumbers.four)
                    {
                        ws.Cells[row, column - 1].Value = CommonExports.GetAddDiffValue(ws.Cells[row, column].Value.ToString().Replace("%", ""),
                            ws.Cells[row, column - (int)MagicNumbers.two].Value.ToString().Replace("%", ""), Plus, "excel");
                    }
                }
                if (formula != "")
                {
                    BindFormula(sheet, ws.Cells[row, column], formula);
                    ws.Calculate();
                    RemoveCellColor(record, row, column, ws);
                }
            }

            private static void RemoveCellColor(PDResponseData record, int row, int column, ExcelWorksheet ws)
            {
                if (record.MetricOrder != 1 && record.TimePeriod != KOccasion && !record.Metric.Contains(Target))
                {
                    var value = CommonExports.GetAddDiffValue(ws.Cells[row, column - 1].Value.ToString().Replace("%", ""),
                            ws.Cells[row, (int)MagicNumbers.four].Value.ToString().Replace("%", ""), Minus, "excel");
                    if (value == " - ")
                    {
                        ws.Cells[row, column].Style.Fill.BackgroundColor.SetColor(System.Drawing.ColorTranslator.FromHtml(White));
                    }
                }
            }

            private static void BindFormula(int sheet, ExcelRangeBase excelRange, string formula)
            {
                if (sheet == (int)MagicNumbers.two)
                {
                    excelRange.Formula = formula;
                }
            }
            private static string ReplaceLSWithBlank(string val)
            {//function to make cell value blank when sample < 30 i.e. when value is LS 
                if (val == "LS")
                {
                    return "";
                }
                return val;
            }
        }
        public static class CommonExports
        {
            public static IDictionary<string, string> GetSampleValue(PDResponseData rowObj, int slideNo, bool flag)
            {//function to get sample value for cell
                IDictionary<string, string> obj = new Dictionary<string, string>();
                obj.Add(Constants.Value, "NA");
                obj.Add(Constants.ColorClass, Constants.Black);

                double? compVal = flag ? rowObj.WNumerator : rowObj.UNumerator;
                if (slideNo == (int)MagicNumbers.three)
                {
                    compVal = flag ? rowObj.WSampleSize : rowObj.USampleSize;
                }
                if (compVal != null)
                {
                    double Value = compVal ?? 0;
                    obj[Constants.Value] = Math.Round(Value, 0, AwayFromZero).ToString("0", Culture);
                    obj[Constants.ColorClass] = (rowObj.UNumeratorTotal ?? 0) <= LowSample ? "Gray" : Constants.Black;
                }
                return obj;
            }
            public static IDictionary<string, string> GetCellValue(PDResponseData rowObj, bool sigFlag)
            {//function to get value for cell
                IDictionary<string, string> obj = new Dictionary<string, string>();
                obj.Add(Constants.Value, " - ");
                obj.Add(Constants.ColorClass, Constants.Black);
                obj.Add(Constants.BackColor, Constants.White);
                obj.Add(Constants.BorderColor, Constants.White);
                if (rowObj.Value != null)
                {
                    double Value = rowObj.Value ?? 0;
                    obj[Constants.Value] = rowObj.UNumeratorTotal == null ? " - " : "LS";
                    if ((rowObj.UNumeratorTotal != null && rowObj.UNumeratorTotal >= InsufficientSample) || rowObj.MetricOrder != 1)
                    {
                        obj[Constants.Value] = Math.Round(Value * (int)MagicNumbers.hundred, 1, AwayFromZero).ToString("0.0", Culture) + "%";
                        obj[Constants.ColorClass] = (rowObj.UNumeratorTotal >= InsufficientSample && rowObj.UNumeratorTotal <= LowSample) ? "Gray" : Constants.Black;
                    }
                }
                obj = CheckDeprioritize(obj, rowObj);
                obj = sigFlag ? GetSigColor(obj, rowObj.Value) : GetStrategicColor(obj, rowObj.StrategicColor);
                return obj;
            }
            private static IDictionary<string, string> GetSigColor(IDictionary<string, string> obj, double? value)
            {//function to get significance color
                if (obj[Constants.Value] != "NA" && obj[Constants.Value] != "LS" && obj[Constants.Value] != " - " && obj[Constants.ColorClass] != "Gray")
                {
                    if (value > 0)
                    {
                        obj[Constants.ColorClass] = "Green";
                    }
                    else if (value < 0)
                    {
                        obj[Constants.ColorClass] = "Red";
                    }
                    else
                    {
                        obj[Constants.ColorClass] = Constants.Black;
                    }
                }
                return obj;
            }
            private static IDictionary<string, string> GetStrategicColor(IDictionary<string, string> obj, int? strategicColor)
            {//function to get strategic color for border and cell
                string[] list = new[] { "NA", "LS", " - " };
                if (!list.Contains(obj[Constants.Value]))
                {
                    string backColor;
                    switch (strategicColor)
                    {
                        case (int)MagicNumbers.two:
                            backColor = "#70AD47";
                            break;
                        case 1:
                            backColor = "#A9D18E";
                            break;
                        case 0:
                        case null:
                            backColor = Constants.White;
                            break;
                        case -1:
                            backColor = "#FFC925";
                            break;
                        case -(int)MagicNumbers.two:
                            backColor = "#FF0000";
                            break;
                        default:
                            backColor = Constants.TransparentColor;
                            break;
                    }
                    obj[Constants.BackColor] = backColor.Replace("#", "#99");
                    obj[Constants.BorderColor] = backColor;
                }
                return obj;
            }
            private static IDictionary<string, string> CheckDeprioritize(IDictionary<string, string> obj, PDResponseData record)
            {//function to make value as - if strategic posture is deprioritize and set value in accordance to 1st column 
                var metricList = new[] { (int)MagicNumbers.two, (int)MagicNumbers.three, (int)MagicNumbers.four };
                if (record.OccasionOrder != 0 && metricList.Contains(record.MetricOrder))
                {
                    obj[Constants.ColorClass] = Constants.Black;
                    if (record.StrategicPosture.ToUpper(Culture) == "DEPRIORITIZE")
                    {
                        obj[Constants.Value] = " - ";
                    }
                }
                return obj;
            }

            public static object GetPtChangeValue(string text, string compText, string exportType)
            {//function to get (pts change value)
                var val = exportType == "ppt" ? "" : " - ";
                string[] list = new[] { "NA", "LS", " - ", "" };
                if (!list.Contains(text) && !list.Contains(compText))
                {
                    var diff = Convert.ToDouble(text, Culture) - (Convert.ToDouble(compText, Culture) * (exportType == "ppt" ? 1 : 100));
                    val = Math.Round(diff, 1, AwayFromZero).ToString("0.0", Culture) + "%";
                    if (exportType == "ppt")
                    {
                        val = " (" + val + ")";
                    }
                }
                return val;
            }
            public static string GetAddDiffValue(string parentValue, string firstColValue, string operation, string exporttype)
            {
                var val = " - ";
                string[] list = new[] { "NA", "LS", " - ", "" };
                if (!list.Contains(parentValue) && !list.Contains(firstColValue))
                {
                    var opVal = operation == Minus ? Math.Round(Convert.ToDouble(parentValue, Culture) * 100, 1, AwayFromZero) -
                        Math.Round(Convert.ToDouble(firstColValue, Culture) * 100, 1, AwayFromZero) :
                        Math.Round(Convert.ToDouble(parentValue, Culture), 1, AwayFromZero) + Math.Round(Convert.ToDouble(firstColValue, Culture) * (exporttype == "ppt" ? 1 : 100), 1, AwayFromZero);

                    val = Math.Round(opVal, 1, AwayFromZero).ToString("0.0", Culture) + "%";
                }
                return val;
            }
        }
    }
}
