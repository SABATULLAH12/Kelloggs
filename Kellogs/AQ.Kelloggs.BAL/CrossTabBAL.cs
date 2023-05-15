﻿using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using crosstab = AQ.Kelloggs.Models.CrossTab;
using System.Web;
using AQ.Kelloggs.DAL;
using System.IO;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Drawing;
using System.Configuration;
using Newtonsoft.Json;
using Aspose.Slides;
using Aspose.Slides.Charts;
using AQ.Kelloggs.Models;
using static AQ.Kelloggs.Models.Constants;

namespace AQ.Kelloggs.BAL
{
    public class CrossTabBAL
    {
        #region Get Crosstab Data
        public enum TraceLevel
        {

            Error = 1,
            Warning = 2,
            Info = 3,
            Verbose = 4
        }
        readonly CommonDAL dalObj = new CommonDAL();
        private const int mergeColumns = (int)Constants.MagicNumbers.six;
        private const int autoFitColumnMinWidth = 20;
        private const int autoFitColumnMaxWidth = 20;

        public crosstab.Response GetCrossTabData(Request CrossTabRequestData, HttpContextBase context)
        {
            crosstab.Response response = new crosstab.Response();

            CrossTabRequestData = CrossTabRequestData ?? new Request();

            object[] parameters = {
                CrossTabRequestData.Columns,
                CrossTabRequestData.Rows,
                CrossTabRequestData.RowNesting ,
                CrossTabRequestData.TimePeriod ,
                CrossTabRequestData.Market,
                CrossTabRequestData.AdlFilters,
                CrossTabRequestData.Significance ,
                CrossTabRequestData.RespType
            };

            DataSet dataset = new DataSet();
            try
            {
                dataset = dalObj.GetCrossTabData(parameters);
            }
            catch(Exception ex)
            {
                ;
            }
            //DataSet dataset = dalObj.GetCrossTabData(parameters);

            //updating sample size column
            var distinctColumnMetric = (from row in dataset.Tables[0].AsEnumerable()
                                        select row.Field<string>("ColumnMetricName")).Distinct();
            UpdatingSampleSizeColumn(distinctColumnMetric, dataset.Tables[0]);

            response.DataList = (from rows in dataset.Tables[0].AsEnumerable()
                                 select new crosstab.ResponseData
                                 {
                                     ColumnMetricName = Convert.ToString(rows[DBParameters.ColumnMetricName], Constants.Culture),
                                     RowMetricName = Convert.ToString(rows[DBParameters.RowMetricName], Constants.Culture),
                                     NestingMetricName = Convert.ToString(rows[DBParameters.NestingMetricName], Constants.Culture),
                                     Percentage = rows[DBParameters.Percentage] == DBNull.Value ? null : (double?)rows[DBParameters.Percentage],
                                     WNumerator = rows[DBParameters.WNumerator] == DBNull.Value ? null : (double?)rows[DBParameters.WNumerator],
                                     UNumerator = rows[DBParameters.UNumerator] == DBNull.Value ? null : (int?)rows[DBParameters.UNumerator],
                                     WSampleSize = rows[DBParameters.WSampleSize] == DBNull.Value ? null : (double?)rows[DBParameters.WSampleSize],
                                     USampleSize = rows[DBParameters.USampleSize] == DBNull.Value ? null : (int?)rows[DBParameters.USampleSize],
                                     Significance = rows[DBParameters.Significance] == DBNull.Value ? null : (int?)rows[DBParameters.Significance],
                                     Change = rows[DBParameters.Changes] == DBNull.Value ? null : (double?)rows[DBParameters.Changes]
                                 }).ToList();
            return response;
        }

        private static void UpdatingSampleSizeColumn(IEnumerable<string> distinctColumnMetric, System.Data.DataTable dataTable)
        {
            foreach (var column in distinctColumnMetric)
            {
                var rows = dataTable.AsEnumerable().Where(x => x.Field<string>("ColumnMetricName") == column).ToList();
                var wSampleSize = (from row in rows.AsEnumerable()
                                   where (row[DBParameters.NestingMetricName]==DBNull.Value)
                                   select row.Field<double?>("WSampleSize")).AsEnumerable().Distinct().Max();
                var uSampleSize = (from row in rows.AsEnumerable()
                                   where (row[DBParameters.NestingMetricName] == DBNull.Value)
                                   select row.Field<int?>("USampleSize")).AsEnumerable().Distinct().Max();
                foreach (var row in rows)
                {
                    if (uSampleSize != null)
                    {
                        row[(int)Constants.MagicNumbers.four] = uSampleSize;
                    }
                    if (wSampleSize != null)
                    {
                        row[(int)Constants.MagicNumbers.five] = wSampleSize;
                    }
                }
            }
        }

        #endregion

        #region Export to Excel
        public static double MeasureTextHeight(string text, ExcelFont font, double width)
        {
            const int ExcelMaxHeight = 409;
            if (string.IsNullOrEmpty(text))
            {
                return 0.0;
            }
            var bitmap = new Bitmap(1, 1);
            var graphics = Graphics.FromImage(bitmap);

            var pixelWidth = Convert.ToInt32(width * 7.5);  //7.5 pixels per excel column width
            var drawingFont = new Font("Arial", (int)Constants.MagicNumbers.seven);
            if (font != null)
            {
                drawingFont = new Font(font.Name, font.Size);
            }
            var size = graphics.MeasureString(text, drawingFont, pixelWidth);

            //72 DPI and 96 points per inch.  Excel height in points with max of 409 per Excel requirements.
            return Math.Min(Convert.ToDouble(size.Height), ExcelMaxHeight);
        }
        public string CrosstabExcelExport(Request request, crosstab.Response response, HttpContextBase context)
        {
            if (response == null)
            {
                response = new crosstab.Response();
            }
            if (request == null)
            {
                request = new Request();
            }

            string filepath = context.Server.MapPath("~/Templates/Crosstab_Export_Template.xlsx");
            var dirName = HttpContext.Current.Session.SessionID;
            var strpath = TempFilePath + dirName + "/Crosstab_Table_Export" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Constants.Culture) + ".xlsx";

            if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
            {
                Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
            }
            Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));

            var benchmarkEnabled = request.Significance;

            string destFile = context.Server.MapPath(strpath);
            const ExcelBorderStyle borderStyle = ExcelBorderStyle.Thin;
            const bool isWrapText = true;
            const bool isMerge = true;
            string row = "";
            string column = "";
            string pt = request.PercentageType;

            var file = new FileInfo(destFile);
            File.Copy(filepath, destFile, true);

            if (request != null)
            {
                using (ExcelPackage p = new ExcelPackage(file))
                {
                    //Both the sheets similar logic
                    for (int sheet = 1; sheet <= (int)Constants.MagicNumbers.two; sheet++)
                    {
                        ExcelWorksheet ws1 = p.Workbook.Worksheets[sheet];
                        int selsumstartRow = (int)Constants.MagicNumbers.six;
                        const int colIndx = (int)Constants.MagicNumbers.four;
                        const int startRow = 21;     
                        const int rowStart = 19;
                        const int ptr = 18;



                        //Selection Summary
                        var summary = request.SelectionSummary.Replace("||", "|").Split('|');

                        // Add PercentageType
                        ws1.Cells[ptr, colIndx, ptr, colIndx + mergeColumns].Merge = isMerge;
                        string val = pt;
                        ws1.Cells[ptr, colIndx].Value = val.Trim();
                        ws1.Cells[ptr, colIndx].Style.WrapText = isWrapText;

                        foreach (var item in summary)
                        {
                            while (selsumstartRow <= rowStart)
                            {
                                if (ws1.Cells[selsumstartRow, colIndx - (int)Constants.MagicNumbers.two].Value.ToString().ToLower(Constants.Culture).Trim() ==
                                    item.Split(':')[0].ToLower(Constants.Culture).Trim())
                                {
                                    var items = item.Split(':');
                                    ws1.Cells[selsumstartRow, colIndx, selsumstartRow, colIndx + mergeColumns].Merge = isMerge;

                                    string value = item.Replace(items[0] + ":", "");

                                    switch (items[1].ToLower(Constants.Culture).Trim())
                                    {
                                        case "survey category/item/brand":
                                        case "custom category/item/brand":
                                            if ((new[] { "COLUMN", "ROW", "ROW NESTING" }).Contains(items[0].ToUpper(Culture).Trim()))
                                            {
                                                value = value.Replace(items[1].Trim().Split(' ')[1] + ": ", "").Trim();
                                            }
                                            break;
                                        default:
                                            {
                                                break;
                                            }
                                    }

                                    ws1.Cells[selsumstartRow, colIndx].Value = value.Trim();
                                    if (selsumstartRow == (int)Constants.MagicNumbers.six)
                                    {
                                        column = value;
                                    }
                                    if (selsumstartRow == (int)Constants.MagicNumbers.seven)
                                    {
                                        row = value;
                                    }

                                    ws1.Cells[selsumstartRow, colIndx].Style.WrapText = isWrapText;

                                    var width = ws1.Column(colIndx).Width;
                                    ws1.Row(selsumstartRow).Height = MeasureTextHeight(ws1.Cells[selsumstartRow, colIndx].Value.ToString(),
                                        ws1.Cells[selsumstartRow, colIndx].Style.Font, width * (int)Constants.MagicNumbers.seven);

                                    selsumstartRow++;
                                    break;
                                }
                                else
                                {
                                    //check for the match, if no match then stop
                                    selsumstartRow++;
                                }
                            }

                            selsumstartRow = (int)Constants.MagicNumbers.six;
                        }

                        ws1.Cells[(int)Constants.MagicNumbers.twentyone, (int)Constants.MagicNumbers.two].Value = row + " X " + column;
                        //Get the column names
                        var columns = response.DataList.GroupBy(x => x.ColumnMetricName).AsEnumerable().Select(x => x.First()).ToList();

                        //Get the row names
                        List<crosstab.ResponseData> rowNames = new List<crosstab.ResponseData>();
                        if (sheet == (int)Constants.MagicNumbers.two)
                        {
                            rowNames.Add(new crosstab.ResponseData { RowMetricName = "Base", NestingMetricName = "" });
                        }
                        rowNames.AddRange(response.DataList.GroupBy(x => new { x.RowMetricName, x.NestingMetricName })
                            .Select(x => new crosstab.ResponseData { RowMetricName = x.Key.RowMetricName, NestingMetricName = x.Key.NestingMetricName }).ToList());

                        var ccolIndx = colIndx;
                        //For both Column% and Change PP headers 
                        for (int i = 0; i < (int)Constants.MagicNumbers.two; i++)
                        {
                            foreach (var item in columns)
                            {
                                var cstartRow = startRow;
                                ws1.Cells[cstartRow, ccolIndx].Value = item.ColumnMetricName;
                                ws1.Cells[cstartRow, ccolIndx].Style.WrapText = isWrapText;
                                ws1.Cells[cstartRow, ccolIndx].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                ws1.Cells[cstartRow, ccolIndx].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                                ws1.Cells[cstartRow, ccolIndx].Style.Border.BorderAround(borderStyle);
                                cstartRow++;
                                if (sheet == 1)
                                {
                                    ws1.Cells[cstartRow, ccolIndx].Value = i == 0 ? "Column%" : "Change PP";
                                    ws1.Cells[cstartRow, ccolIndx].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                    ws1.Cells[cstartRow, ccolIndx].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                                    ws1.Cells[cstartRow, ccolIndx].AutoFitColumns(autoFitColumnMinWidth, autoFitColumnMaxWidth);
                                }
                                else
                                {
                                    ws1.Cells[cstartRow, ccolIndx].Value = i == 0 ? "Sample Size (Weighted)" : "Sample Size (Unweighted)";
                                    ws1.Cells[cstartRow, ccolIndx].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                    ws1.Cells[cstartRow, ccolIndx].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                                    ws1.Cells[cstartRow, ccolIndx].AutoFitColumns(autoFitColumnMinWidth, autoFitColumnMaxWidth);
                                }

                                ws1.Cells[cstartRow, ccolIndx].Style.Border.BorderAround(borderStyle);

                                ws1.Cells[cstartRow, ccolIndx].Style.WrapText = isWrapText;
                                ccolIndx++;
                            }
                        }
                        var rstartRow = startRow + (int)Constants.MagicNumbers.two;

                        //For Row Labels
                        foreach (var rowitem in rowNames)
                        {
                            if (sheet == 1 && rowitem.NestingMetricName.EndsWith(" Base", StringComparison.CurrentCulture))
                            {
                                continue;
                            }
                            var rowName = rowitem.NestingMetricName.Equals(string.Empty, StringComparison.CurrentCulture) ? rowitem.RowMetricName : rowitem.NestingMetricName;
                            ws1.Cells[rstartRow, colIndx - (int)Constants.MagicNumbers.two].Value = rowName;
                            ws1.Cells[rstartRow, colIndx - (int)Constants.MagicNumbers.two, rstartRow, colIndx - 1].Merge = true;
                            ws1.Cells[rstartRow, colIndx - (int)Constants.MagicNumbers.two, rstartRow, colIndx - 1].Style.Border.BorderAround(borderStyle);
                            ws1.Cells[rstartRow, colIndx - (int)Constants.MagicNumbers.two].Style.WrapText = isWrapText;

                            ws1.Cells[rstartRow, colIndx - (int)Constants.MagicNumbers.two].Style.Indent =
                                (rowitem.NestingMetricName.Equals(string.Empty, StringComparison.CurrentCulture) ||
                                rowitem.NestingMetricName.EndsWith(" Base", StringComparison.CurrentCulture) ? 0 : (int)Constants.MagicNumbers.five);
                            var cstartCol = colIndx;
                            for (int i = 0; i < (int)Constants.MagicNumbers.two; i++)
                            {
                                foreach (var colitem in columns)
                                {
                                    crosstab.ResponseData rowObj;
                                    if (sheet == 1)
                                    {
                                        rowObj = response.DataList.FirstOrDefault(x => x.ColumnMetricName.Equals(colitem.ColumnMetricName.ToString(Constants.Culture), StringComparison.CurrentCulture)
                                        && x.RowMetricName.Equals(rowitem.RowMetricName, StringComparison.CurrentCulture)
                                        && x.NestingMetricName.Equals(rowitem.NestingMetricName, StringComparison.CurrentCulture));
                                        if (rowObj.ColumnMetricName.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION" ||
                                            rowObj.RowMetricName.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION" || rowObj.NestingMetricName.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION")
                                        {
                                            ws1.Cells[rstartRow, cstartCol].Style.Numberformat.Format = "###0.00";
                                            rowObj.Percentage = rowObj.Percentage * (int)MagicNumbers.hundred;
                                        }
                                        else
                                        {
                                            ws1.Cells[rstartRow, cstartCol].Style.Numberformat.Format = i == 1 ? "###0.00" : "##0.00%";
                                        }
                                        var value = ((rowObj.USampleSize > InsufficientSample) ? (rowObj.Percentage / 100) : null);
                                        var benchmark = (benchmarkEnabled == "" ? null : rowObj.Change);
                                        ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(Color.Black);
                                        ws1.Cells[rstartRow, cstartCol].Value = (i == 1 ? benchmark : value);
                                        if (i != 1)
                                        {
                                            ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(GetColor(rowObj, false));
                                        }
                                        ws1.Cells[rstartRow, cstartCol].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                        ws1.Cells[rstartRow, cstartCol].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                                    }
                                    else
                                    {
                                        if (rstartRow == (startRow + (int)Constants.MagicNumbers.two))
                                        {
                                            rowObj = response.DataList.FirstOrDefault(x => x.ColumnMetricName.Equals(colitem.ColumnMetricName.ToString(Constants.Culture)
                                                , StringComparison.CurrentCulture));
                                            ws1.Cells[rstartRow, cstartCol].Value = i == 0 ? rowObj.WSampleSize : rowObj.USampleSize;
                                            var color = Convert.ToInt32(ws1.Cells[rstartRow, cstartCol].Value, Culture) < LowSample ? Color.Gray : Color.Black;
                                            ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(color);

                                        }
                                        else
                                        {
                                            rowObj = response.DataList.FirstOrDefault(x => x.ColumnMetricName.Equals
                                            (colitem.ColumnMetricName.ToString(Constants.Culture), StringComparison.CurrentCulture)
                                            && x.RowMetricName.Equals(rowitem.RowMetricName, StringComparison.CurrentCulture)
                                            && x.NestingMetricName.Equals(rowitem.NestingMetricName, StringComparison.CurrentCulture));
                                            ws1.Cells[rstartRow, cstartCol].Value = i == 0 ? rowObj.WNumerator : rowObj.UNumerator;
                                            ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(GetColor(rowObj, true));
                                        }
                                        ws1.Cells[rstartRow, cstartCol].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                                        ws1.Cells[rstartRow, cstartCol].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                                        ws1.Cells[rstartRow, cstartCol].Style.Numberformat.Format = "###0";
                                    }
                                    ws1.Cells[rstartRow, cstartCol].Style.Border.BorderAround(borderStyle);
                                    ws1.Cells[rstartRow, cstartCol].Style.WrapText = isWrapText;


                                    cstartCol++;
                                }
                            }
                            rstartRow++;
                        }

                        p.Save();
                    }
                }
            }
            return strpath;
        }

        private static Color GetColor(crosstab.ResponseData rowObj, bool isSample)
        {
            var significance = rowObj.Significance ?? 0;
            Color color = Color.Black;
            if (rowObj.USampleSize < LowSample)

            { color = Color.Gray; }
            else
            {
                if (!isSample)
                {
                    if (significance < 0)
                    { color = Color.Red; }
                    if (significance > 0)
                    { color = Color.Green; }
                }
            }

            return color;
        }

        #endregion

        #region Chart 
        public IList<crosstab.ChartData> GetChartData(crosstab.Response data, bool showTotal)
        {
            List<crosstab.ChartData> _data = new List<crosstab.ChartData>();

            var columns = data.DataList.GroupBy(x => x.ColumnMetricName).AsEnumerable().Select(x => x.First()).ToList();

            columns = showTotal ? columns : columns.Where(x => x.ColumnMetricName.Trim().ToLower(Constants.Culture) != "total").ToList();

            foreach (var column in columns)
            {
                var rows = data.DataList.Where(x => x.ColumnMetricName == column.ColumnMetricName).ToList();

                var chartdata = new crosstab.ChartData { category = column.ColumnMetricName, data = new List<crosstab.ChartCategoryData>() };

                foreach (var row in rows)
                {
                    var chartcatdata = new crosstab.ChartCategoryData
                    {
                        x = row.RowMetricName,
                        y = row.Percentage,
                        c = row.Change,
                        s = row.Significance,
                        ss = row.USampleSize,
                        color = GetColor(row, false).ToString()
                    };
                    chartdata.data.Add(chartcatdata);
                }

                _data.Add(chartdata);
            }

            return _data;

        }
        public string CrosstabPptExport(Request request, crosstab.Response response, HttpContextBase context)
        {
            if (response == null)
            {
                response = new crosstab.Response();
            }
            if (request == null)
            {
                request = new Request();
            }

            string filepath = context.Server.MapPath("~/Templates/Chart_ExportPPT_Template.pptx");
            var dirName = HttpContext.Current.Session.SessionID;
            var strpath = TempFilePath + dirName + "/Crosstab_Chart_Export" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Constants.Culture) + ".pptx";

            if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
            {
                Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
            }
            Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));

            //Set License
            Aspose.Slides.License license = new Aspose.Slides.License();
            license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));

            string destFile = context.Server.MapPath(strpath);

            File.Copy(filepath, destFile, true);

            IList<crosstab.ChartData> chartData = GetChartData(response, true);
            PrepareStackChart(destFile, chartData, request.SelectionSummary, request.PercentageType);

            //If time period then trend chart else remove the trend slide
            if (request.SelectionSummary.Replace("||", "|").Split('|')[0].Split(':')[1].Trim().ToLower(new System.Globalization.CultureInfo("en-US")) == "time period")
            {
                chartData = GetChartData(response, false);
                PrepareTrendChart(destFile, chartData, request.SelectionSummary, request.PercentageType);
            }
            else
            {
                using (Presentation pres = new Presentation(destFile))
                {
                    pres.Slides.LastOrDefault().Remove();
                    pres.Save(destFile, Aspose.Slides.Export.SaveFormat.Pptx);
                }
            }

            return strpath;
        }

        private static void PrepareStackChart(string destFile, IList<crosstab.ChartData> _chart_data, string summary, string PercentageType)
        {
            using (Presentation pres = new Presentation(destFile))
            {
                ISlide editableSlide = pres.Slides.FirstOrDefault();

                //Set date in first slide
                ((IAutoShape)editableSlide.Shapes.FirstOrDefault(x => x.Name == "Date")).TextFrame.Text = DateTime.Now.ToString("dd-MM-yyyy", Constants.Culture);

                //Set summary
                editableSlide = pres.Slides[1];
                var notesSlide = editableSlide.NotesSlideManager.AddNotesSlide();
                notesSlide.NotesTextFrame.Text = "Selection Summary : " + summary;

                var selSummaryArray = summary.Replace("||", "|").Split('|');
                //Set Title
                ((IAutoShape)editableSlide.Shapes.FirstOrDefault(x => x.Name == "Title 4")).TextFrame.Text = selSummaryArray[1].Split(':')[1] + "Across" + selSummaryArray[0].Split(':')[1];
                //UpdateFooter
                UpdateFooter(editableSlide, PercentageType);
                //Edit Chart
                BindStackSlide(editableSlide, _chart_data, "Chart 72");
                pres.Save(destFile, Aspose.Slides.Export.SaveFormat.Pptx);
            }
        }

        private static void PrepareTrendChart(string destFile, IList<crosstab.ChartData> _chart_data, string summary, string PercentageType)
        {
            using (Presentation pres = new Presentation(destFile))
            {

                ISlide editableSlide;
                //Set summary
                editableSlide = pres.Slides[(int)Constants.MagicNumbers.two];
                var notesSlide = editableSlide.NotesSlideManager.AddNotesSlide();
                notesSlide.NotesTextFrame.Text = "Selection Summary : " + summary;

                var selSummaryArray = summary.Replace("||", "|").Split('|');
                //Set Title
                ((IAutoShape)editableSlide.Shapes.FirstOrDefault(x => x.Name == "Title 4")).TextFrame.Text = selSummaryArray[1].Split(':')[1] + "Across" + selSummaryArray[0].Split(':')[1];
                //UpdateFooter
                UpdateFooter(editableSlide, PercentageType);
                //Edit Chart
                BindTrendSlide(editableSlide, _chart_data, "Chart 8");
                pres.Save(destFile, Aspose.Slides.Export.SaveFormat.Pptx);
            }
        }
        public static void UpdateFooter(IBaseSlide editableSlide, string PercentageType)
        {
            GroupShape group = ((GroupShape)(editableSlide.Shapes.FirstOrDefault(x => x.Name == "Footer")));
            IAutoShape shape = (IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "PercentageType");
            shape.TextFrame.Text = PercentageType;
        }
        public static void BindStackSlide(IBaseSlide slide, IList<crosstab.ChartData> _chart_data, string element)
        {
            int i = 0;
            int j = 0;
            const int overlapValue = 100;
            //Edit Chart
            IChart _chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == element);
            if (_chart != null)
            {
                //Clear series
                _chart.ChartData.Series.Clear();

                //Clear Categories
                _chart.ChartData.Categories.Clear();

                const int defaultWorksheetIndex = 0;
                IChartDataWorkbook fact = _chart.ChartData.ChartDataWorkbook;
                fact.Clear(0);
                i = 0;
                //Add Series
                foreach (var series in _chart_data.FirstOrDefault().data)
                {
                    _chart.ChartData.Series.Add(fact.GetCell(defaultWorksheetIndex, 0, 1 + i, series.x), _chart.Type);
                    i++;
                }
                i = 0;
                //Add Categories
                foreach (var category in _chart_data)
                {
                    _chart.ChartData.Categories.Add(fact.GetCell(defaultWorksheetIndex, 1 + i, 0, category.category));
                    i++;
                }
                i = 0;

                List<double> lstData = new List<double>();
                //Add DataPoints                    
                foreach (var series in _chart.ChartData.Series)
                {
                    j = 0;
                    series.ParentSeriesGroup.Overlap = overlapValue;
                    series.Format.Fill.FillType = FillType.Solid;

                    series.Format.Fill.SolidFillColor.Color = ColorTranslator.FromHtml(Constants.ChartColors[i]);


                    foreach (var category in _chart.ChartData.Categories)
                    {
                        var cell = fact.GetCell(defaultWorksheetIndex, 1 + j, 1 + i, _chart_data[j].data[i].ss > InsufficientSample ? (_chart_data[j].data[i].y / 100) : 0);
                        lstData.Add(_chart_data[j].data.Sum(x => x.y.GetValueOrDefault()));
                        cell.PresetNumberFormat = Constants.CellNumberFormat;



                        series.DataPoints.AddDataPointForBarSeries(cell);
                        series.Labels.DefaultDataLabelFormat.ShowValue = true;
                        series.NumberFormatOfValues = "##0%";

                        //Added font height for individual labels.
                        var color = _chart_data[j].data[i].color.Split('[')[1].Split(']')[0];
                        series.Labels[j].TextFormat.PortionFormat.FontHeight = Constants.ChartFontHeight;
                        if (_chart_data[j].data[i].ss < Constants.InsufficientSample && CheckEntireColumn(_chart_data[j].data))
                        {
                            series.Labels[j].AddTextFrameForOverriding(Constants.ChartLSLabel);
                        }
                        else if (_chart_data[j].data[i].ss == null && CheckEntireColumn(_chart_data[j].data))
                        {
                            series.Labels[j].AddTextFrameForOverriding(Constants.ChartNALabel);
                        }
                        else if (_chart_data[j].data[i].ss < Constants.InsufficientSample || _chart_data[j].data[i].ss == null)
                        {
                            series.Labels[j].AddTextFrameForOverriding("");
                        }
                        else
                        {
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = string.Format(Constants.Culture, "{0:0%}", cell.Value);
                            if (_chart_data[j].category.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION" || _chart_data[j].data[i].x.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION")
                            {
                                var shape = series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0];
                                shape.Text = string.Format(Culture, "{0:0}", (Convert.ToDouble(cell.Value, Culture) * (int)MagicNumbers.hundred));
                            }

                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(color);
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FontHeight = Constants.ChartFontHeight;

                            if (_chart_data[j].data[i].c != null)
                            {
                                series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                                series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].Text =
                                    " (" + string.Format(Constants.Culture, "{0:0.0}", _chart_data[j].data[i].c) + ')';
                                series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                                series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                                series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FontHeight = Constants.ChartFontHeight;
                            }

                        }
                        series.Labels[j].TextFormat.PortionFormat.FillFormat.FillType = FillType.Solid;
                        //The condition sends the colour black if the value of colour received is Empty.
                        series.Labels[j].TextFormat.PortionFormat.FillFormat.SolidFillColor.Color = color == "Empty" ? Color.Black : Color.FromName(color);

                        j++;
                    }
                    i++;
                }
                lstData.Sort();
                _chart.Axes.VerticalAxis.IsAutomaticMaxValue = true;
            }
        }
        public static void BindTrendSlide(IBaseSlide slide, IList<crosstab.ChartData> _chart_data, string element)
        {
            int i = 0;
            int j = 0;

            //Edit Chart
            IChart _chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == element);
            if (_chart != null)
            {
                //Clear series
                _chart.ChartData.Series.Clear();

                _chart.ChartData.Categories.Clear();

                const int defaultWorksheetIndex = 0;
                IChartDataWorkbook fact = _chart.ChartData.ChartDataWorkbook;
                fact.Clear(0);
                i = 0;
                //Add Series
                foreach (var series in _chart_data.FirstOrDefault().data)
                {
                    _chart.ChartData.Series.Add(fact.GetCell(defaultWorksheetIndex, 1 + i, 0, series.x), _chart.Type);
                    i++;
                }
                i = 0;
                //Add Categories
                foreach (var category in _chart_data)
                {
                    _chart.ChartData.Categories.Add(fact.GetCell(defaultWorksheetIndex, 0, 1 + i, category.category));
                    i++;
                }
                i = 0;
                //Add DataPoints
                foreach (var series in _chart.ChartData.Series)
                {
                    j = 0;
                    series.Format.Line.FillFormat.FillType = FillType.Solid;

                    series.Format.Line.FillFormat.SolidFillColor.Color = System.Drawing.ColorTranslator.FromHtml(Constants.ChartColors[i]);
                    foreach (var category in _chart.ChartData.Categories)
                    {
                        var value = (_chart_data[j].data[i].ss > InsufficientSample ? (_chart_data[j].data[i].y / 100) : null);
                        var cell = fact.GetCell(defaultWorksheetIndex, 1 + j, 1 + i, value);
                        cell.PresetNumberFormat = Constants.CellNumberFormat;

                        series.DataPoints.AddDataPointForLineSeries(cell);
                        series.Labels.DefaultDataLabelFormat.ShowValue = true;
                        series.NumberFormatOfValues = "##0%";

                        var color = _chart_data[j].data[i].color.Split('[')[1].Split(']')[0];

                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = string.Format(Constants.Culture, "{0:0%}", cell.Value);
                        if (_chart_data[j].category.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION" || _chart_data[j].data[i].x.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION")
                        {
                            var shape = series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0];
                            shape.Text = string.Format(Culture, "{0:0}", (Convert.ToDouble(cell.Value, Culture) * (int)MagicNumbers.hundred));
                        }
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(color);
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FontHeight = Constants.ChartFontHeight;

                        if (_chart_data[j].data[i].c != null)
                        {
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].Text =
                                " (" + string.Format(Constants.Culture, "{0:0.0}", _chart_data[j].data[i].c) + ')';
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                            series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FontHeight = Constants.ChartFontHeight;
                        }
                        j++;
                    }
                    i++;
                }
                double? _minAxisValue = 0;
                foreach (var item in _chart_data)
                {
                    double? tempMin = item.data.Select(x => x.y).Min().GetValueOrDefault();
                    if (_minAxisValue > tempMin)
                    {
                        _minAxisValue = tempMin;
                    }
                }
                if (_minAxisValue < 0 && _minAxisValue!= null)
                {
                    _minAxisValue = Math.Floor((_minAxisValue ?? 0) / (int)Constants.MagicNumbers.ten - 1) * (int)Constants.MagicNumbers.ten;
                }
                //Change the Axis Min Value
                _chart.Axes.VerticalAxis.IsAutomaticMinValue = false;
                _chart.Axes.VerticalAxis.MinValue = (int)_minAxisValue;
                _chart.Axes.VerticalAxis.CrossType = CrossesType.Custom;
                _chart.Axes.VerticalAxis.CrossAt = (int)_minAxisValue;
            }

        }
        private static bool CheckEntireColumn(IList<crosstab.ChartCategoryData> _chart_data)
        {
            List<int> sampleSizeList = new List<int> { };
            for (int i = 0; i < _chart_data.Count; i++)
            {
                sampleSizeList.Add(Convert.ToInt32(_chart_data[i].ss, Culture));
            }
            if (sampleSizeList.Any(x => x > InsufficientSample))
            {
                return false;
            }
            return true;
        }
        #endregion
    }
}
