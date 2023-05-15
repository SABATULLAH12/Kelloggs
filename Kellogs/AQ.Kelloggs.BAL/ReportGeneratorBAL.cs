﻿using AQ.Kelloggs.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static AQ.Kelloggs.Models.Constants;
using Aspose.Slides;
using System.IO;
using AQ.Kelloggs.Models;
using System.Drawing;
using Aspose.Slides.Charts;
using System.Text.RegularExpressions;

namespace AQ.Kelloggs.BAL
{
    public class ReportGeneratorBAL
    {

        readonly ReportGeneratorDAL dalObj = new ReportGeneratorDAL();
        static string selectedMarket = "";
        static bool isRegionSelected;
        const string table6 = "Table 6";
        const string sampleNA = "NA [NA]";
        const string title4 = "Title 4";
        const string Value = "Value";
        const string ChannelSort = "ChannelSort";
        const string Total = "TOTAL";
        static string TimeperiodType = "";
        static int year = -1;
        static string TimeperiodValue = "";
        static string TimeperiodAppendValue = "";
        static bool changeHeadingDollar = true;
        static int SlideCounter = 0;


        public IList<OccasionAttribute> GetAttributeList
        {
            get
            {

                var response = new ReportGeneratorResponse();
                DataSet dSet = dalObj.GetAttributeList();
                /*Time Period */
                response.OcassionAttributes = (from rows in dSet.Tables[0].AsEnumerable()
                                               select new OccasionAttribute
                                               {
                                                   AttributeID = Convert.ToInt32(rows[DBParameters.AttributeId], Culture),
                                                   Attribute = Convert.ToString(rows[DBParameters.Attribute], Culture)

                                               }).ToList();

                return response.OcassionAttributes;
            }
        }

        public IList<OccasionAttribute> GetCategoryList(string timeperiodId, string marketId, string reportId)
        {
            var response = new ReportGeneratorResponse();
            object[] parameters = {
               marketId,
               //timeperiodId
               reportId == "6" ? 1: 0
            };
            DataSet dSet = dalObj.GetCategoryList(parameters);
            response.OcassionAttributes = (from rows in dSet.Tables[0].AsEnumerable()
                                           select new OccasionAttribute
                                           {
                                               AttributeID = Convert.ToInt32(rows[DBParameters.CategoryId], Culture),
                                               Attribute = Convert.ToString(rows[DBParameters.Category], Culture)

                                           }).ToList();

            return response.OcassionAttributes;
        }

        public DataSet GetReportCommonSlides(string timeperiodId, string marketId, string addtnl)
        {
            object[] parameters = {
               marketId,
               timeperiodId,
               addtnl
            };
            DataSet ds = dalObj.GetReportCommonSlides(parameters);
            return ds;
        }


        public DataSet GetTrendData(string marketId, string timeperiodId, string addtnl, string reportId, string yoyId, int spNum)
        {
            object[] parameters = {
               marketId,
               timeperiodId,
               yoyId,
               addtnl
            };

            DataSet ds = dalObj.GetTrendReport(parameters, spNum);
            return ds;
        }

        public DataSet GetBrData(ReportRequest request)
        {
            object[] parameters = {
                request.MarketId,
                request.TimeperiodId,
                request.Benchmark,
                request.PrevBenchmark,
                request.Category,
                request.Manufacturer,
                request.Brand,
                request.KelloggCategory
                };
            object[] parameters47 = {
                request.MarketId,
                request.TimeperiodId,
                request.Benchmark,
                request.PrevBenchmark,
                request.Category.Split('|')[0],
                request.Brand.Split('|')[0],
                //request.Manufacturer.Split('|')[0]
                };
            object[] parameters53 = {
                request.MarketId,
                request.TimeperiodId,
                request.Benchmark,
                request.PrevBenchmark,
                request.Category.Split('|')[0],
                request.Brand.Split('|')[0],
                request.Manufacturer.Split('|')[0]
                };
            DataSet ds = new DataSet();
            DataSet ds47 = new DataSet();
            DataSet ds67 = new DataSet();
            Parallel.For(0, (int)MagicNumbers.seven, i =>
            {
                if (i == 0)
                {
                    ds47.Merge(dalObj.GetBusinessReportData(parameters47, 47));
                }
                else if (i == 1)
                {
                    ds47.Merge(dalObj.GetBusinessReportData(parameters47, 50));
                }
                else if (i == 2)
                {
                    ds47.Merge(dalObj.GetBusinessReportData(parameters, 56));
                }
                else if (i == 3)
                {
                    ds47.Merge(dalObj.GetBusinessReportData(parameters53, 53));
                }
                else if (i == 4)
                {
                    ds47.Merge(dalObj.GetBusinessReportData(parameters53, 59));
                }
                else if (i == 5)
                {
                    ds47.Merge(dalObj.GetBusinessReportData(parameters, 67));
                }
                else
                {
                    ds = dalObj.GetBusinessReportData(parameters, 1);
                }
            });
            ds.Tables[1].Merge(ds47.Tables[0]);
            return ds;
        }

        public DataSet GetOccasionSlides(string timeperiodId, string marketId, string occasionId, string benchmark, string reportId, string addtnl)
        {
            object[] parameters = {
               marketId,
               timeperiodId,
               occasionId,
               benchmark,
               addtnl
        };
            DataSet ds = dalObj.GetReport(parameters, reportId);
            return ds;
        }

        public static string GetBenchMarkID(string benchmark)
        {
            string benchValue = "";
            switch (benchmark)
            {
                case "1":
                    benchValue = "Previous Period";
                    break;
                case "2":
                    benchValue = "Previous Year";
                    break;
                default:
                    benchValue = "";
                    break;
            }
            return benchValue;
        }

        public DataSet GetCategorySlides(string timeperiodId, string marketId, string benchmark, string reportId, string addtnl)
        {
            object[] parameters = {
               marketId,
               timeperiodId,
               (reportId == "6" ? "1" : "0"),
               benchmark,
               addtnl
            };
            DataSet ds = dalObj.GetReport(parameters, reportId);
            return ds;
        }

        public DataSet GetKidsChannelSlides(string timeperiodId, string marketId, string benchmark, string reportId, string addtnl)
        {
            object[] parameters = {
               marketId,
               timeperiodId,
               benchmark,
               addtnl
            };
            if (reportId == "3" || reportId == "7")
            {
                parameters = new object[]{
                    marketId,
                    timeperiodId,
                    benchmark,
                    addtnl,
                    reportId == "7" ? 1 :0
                };
            }
            DataSet ds = dalObj.GetReport(parameters, reportId);
            return ds;
        }

        private static string GetTemplatePptName(string reportId)
        {
            var _tempPPT = "";
            string name = "";
            if (reportId == "1")
            {
                _tempPPT = Templates.ReportGeneratorOccasion;
                name = "Occasion_Profiles";
            }
            else if (reportId == "2")
            {
                _tempPPT = Templates.ReportGeneratorCategory;
                name = "Category_Occasion_Profiles";
            }
            else if (reportId == "3")
            {
                _tempPPT = Templates.ReportGeneratorChannelRetailer;
                name = "Channel_Retailer_Occasion_Profiles";
            }
            else if (reportId == "4")
            {
                _tempPPT = Templates.ReportGeneratorOBPPC;
                name = "OBPPC_Summaries";
            }
            else if (reportId == "5")
            {
                _tempPPT = Templates.ReportGeneratorKids;
                name = "Kids_Occasion_Profiles";
            }
            else if (reportId == "6")
            {
                _tempPPT = Templates.ReportGeneratorCustomCategory;
                name = "Custom_Category_Occasion_Profiles";
            }
            else if (reportId == "7")
            {
                _tempPPT = Templates.ReportGeneratorChannelRetailerNets;
                name = "Custom_Channel_Retailer_Occasion_Profiles";
            }
            else if (reportId == "8")
            {
                _tempPPT = Templates.ReportGeneratorTrendReport1;
                name = "Occasion_Trend_Report";
            }
            else if (reportId == "10")
            {
                _tempPPT = Templates.ReportGeneratorBussiness;
                name = "BusinessReviewReport";
            }
            //else if (reportId == "10")
            //{
            //    _tempPPT = Templates.ReportGeneratorDummy;
            //    name = "Dummytemplate";
            //}




            else
            {
                _tempPPT = Templates.ReportGeneratorTrendReport2;
                name = "Trend_Report_v2";
            }
            return _tempPPT + "#" + name;
        }

        public string GetPptDetails(ReportRequest request, IList<OccasionAttribute> data, IList<TimePeriod> origTimeList)
        {
            string timeperiodId = request.TimeperiodId;
            string marketId = request.MarketId;
            string reportId = request.ReportId;
            string timeperiodName = request.TimeperiodName;
            string marketName = request.MarketName;
            string benchmark = request.Benchmark == "" ? null : request.Benchmark;
            string pptName = "";
            string addtnl = request.AdditionalFilter ?? "";
            string addtnlName = request.FilterName ?? "";
            string yoyName = request.YearOverYearName;
            string yoyId = request.YearOverYearId;
            string prevYoYName = "";
            GetMarketName(marketName);
            GetTemplatePptName(reportId);



            string[] marketList = selectedMarket.Split(',');
            try
            {
                var context = HttpContext.Current;
                var temp = GetTemplatePptName(reportId);
                var _tempPPT = context.Server.MapPath(temp.Split('#')[0]);
                string name = temp.Split('#')[1];

                Aspose.Slides.License license = new Aspose.Slides.License();
                license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));
                Aspose.Slides.IPresentation pres = new Aspose.Slides.Presentation(_tempPPT);

                using (pres)
                {
                    if (reportId == "8")
                    {
                        var initialSlide = 0;
                        DataSet quarterData = GetTrendData(marketId, timeperiodId, addtnl, "8", null, 1);
                        DataSet yearData = GetTrendData(marketId, null, addtnl, "8", yoyId, 1);
                        var timeList = timeperiodName.Substring(timeperiodName.IndexOf(": ") + 2).Split(',');
                        var timeListLen = timeList.Length;
                        //timeList[0] = timeList[0].Replace("COVID Quarter: ", "").Replace("Quarter: ", "");
                        var yoyList = yoyName.Split(',');
                        List<int> removeSlideList = new List<int>();
                        for (int i = 0; i < yoyList.Length; i++)
                        {
                            var t = yoyList[i].TrimStart().Split(' ');
                            string rVal = t.Length > 1 ? t[1] : t[0];
                            string replaceVal = t.Length > 2 && yoyList[i].Contains("YTD") ? t[2] : rVal;
                            var n = (Convert.ToInt32(replaceVal, Culture) - 1).ToString(Culture);
                            var tempList = origTimeList.Where(x => x.DisplayName.Contains(yoyList[i].Replace(replaceVal, n).Split('(')[0]) && x.DisplayName.Contains("COVID")).ToList();
                            prevYoYName = string.Concat(prevYoYName, (yoyList[i].Contains("COVID") && tempList.Count > 0 ? tempList[0].DisplayName : yoyList[i].Replace(replaceVal, n)));
                            prevYoYName = i != yoyList.Length - 1 ? prevYoYName + "," : string.Join(",", prevYoYName.Split(',').Distinct());

                        }
                        #region binding slide 1
                        ISlide slide = pres.Slides[initialSlide];
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Countries")).TextFrame.Text = "Countries : " + selectedMarket;
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "QoQ")).TextFrame.Text = timeperiodName.Replace("Quarter: ", "");
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "YOY")).TextFrame.Text = yoyName;
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Date")).TextFrame.Text = "Date : " + System.DateTime.Today.ToShortDateString();
                        initialSlide = initialSlide + (int)MagicNumbers.twelve;

                        #endregion

                        #region binding slide 13
                        slide = pres.Slides[initialSlide];
                        ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 20");
                        float tblWidth = table.Width;
                        int c = 8;
                        while (c > timeListLen)
                        {
                            table.Columns.RemoveAt(timeListLen + 1, false);
                            c--;
                        }
                        double colWidth = (tblWidth - table.Columns[0].Width) / timeListLen;
                        for (int j = 1; j <= timeListLen; j++)
                        {
                            table.Columns[j].Width = colWidth;
                            table[j, 1].TextFrame.Text = timeList[j - 1].TrimStart();
                        }
                        table.MergeCells(table[0, 0], table[timeListLen, 0], false);
                        var dataTable = (from Row in quarterData.Tables[0].AsEnumerable() select Row).ToList();

                        for (int i = 1; i <= timeListLen; i++)
                        {
                            var dataRow = dataTable.Where(x => x.Field<string>("ColumnMetricName") == timeList[i - 1].Trim());
                            if (dataRow.Count() > 0)
                            {
                                var res = dataRow.Select(x => x.Field<int?>("Respondents")).ToList()[0];
                                var occ = dataRow.Select(x => x.Field<int?>("Occasions")).ToList()[0];
                                if (res == null && occ == null)
                                {
                                    table[i, 2].TextFrame.Text = "NA";
                                    table[i, 3].TextFrame.Text = "NA";
                                }
                                else
                                {
                                    table[i, 2].TextFrame.Text = res.ToString();
                                    table[i, 3].TextFrame.Text = occ.ToString();
                                }
                            }
                            else
                            {
                                table[i, 2].TextFrame.Text = "NA";
                                table[i, 3].TextFrame.Text = "NA";
                            }
                            table[i, 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.ten;
                            table[i, 3].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.ten;
                            table[i, 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                            table[i, 3].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");


                        }

                        #endregion

                        #region binding occasion sizing
                        #region binding slide 15
                        initialSlide = 14;
                        slide = pres.Slides[initialSlide];
                        table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 26");
                        ISlide slide1 = pres.Slides[20];
                        ITable table1 = (ITable)slide1.Shapes.FirstOrDefault(x => x.Name == "Table 20");
                        ITable table2 = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 33");
                        ITable table3 = (ITable)slide1.Shapes.FirstOrDefault(x => x.Name == "Table 35");

                        tblWidth = table.Width;
                        dataTable = (from Row in quarterData.Tables[0].AsEnumerable() select Row).ToList();
                        // var occasionList = dataTable.Select(x => x.Field<string>("RowMetricName")).Distinct().ToList();
                        string[] occasionList = {"Total"
,"Early Morning Bite"
,"Breakfast For One"
,"Family Breakfast"
,"Breakfast at Work/School"
,"Mid Morning Snack"
,"Lunch"
,"Lunch Alternative"
,"Afternoon Snack"
,"After Work/School Bite"
,"Dinner"
,"Dinner Alternative"
,"Evening Me"
,"Evening We"
,"Bedtime/Late Night Snack"
 };
                        c = 8;
                        while (c > timeListLen)
                        {
                            table.Columns.RemoveAt(timeListLen + 1, false);
                            table1.Rows.RemoveAt(timeListLen, false);
                            table2.Columns.RemoveAt(timeListLen + 1, false);
                            c--;
                        }

                        colWidth = (tblWidth - table.Columns[0].Width) / timeListLen;
                        for (int j = 1; j <= timeListLen; j++)
                        {
                            table.Columns[j].Width = colWidth;
                            table[j, 1].TextFrame.Text = timeList[j - 1].TrimStart();
                            table1[0, j - 1].TextFrame.Text = timeList[j - 1].TrimStart();
                            if (j != 1)
                                table3[0, j - 2].TextFrame.Text = timeList[j - 1].TrimStart();
                        }
                        table.MergeCells(table[1, 0], table[timeListLen, 0], false);

                        for (int i = 0; i < 15; i++)
                        {

                            //  table[0, i + 2].TextFrame.Text = occasionList[i];
                            IEnumerable<DataRow> dataRow = null;
                            if (dataTable.Count > 0)
                                dataRow = dataTable.Where(x => x.Field<string>("RowMetricName") == occasionList[i]);
                            for (int k = 1; k <= timeListLen; k++)
                            {

                                if (dataRow != null)
                                {
                                    var obj = FormatTrendData(dataRow.Where(x => x.Field<string>("ColumnMetricName") == timeList[k - 1].Trim()).ToList()[0], false);
                                    table[k, i + 2].TextFrame.Text = obj[Value];
                                    table[k, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                    table[k, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);

                                    if (i != 0)
                                    {
                                        table1[i, k - 1].TextFrame.Text = obj[Value];

                                    }
                                }
                                else
                                {
                                    table[k, i + 2].TextFrame.Text = "NA";
                                    if (i != 0)
                                    {
                                        table1[i, k - 1].TextFrame.Text = "NA";
                                    }

                                }


                                table[k, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                table[k, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                if (i != 0)
                                {
                                    table1[i, k - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                    table1[i, k - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                }

                            }
                        }

                        if (selectedMarket.Contains("Canada") || selectedMarket.Contains("North America"))
                        {
                            slide.Shapes.Remove(table2);
                        }
                        else
                        {
                            var totalRow = dataTable.Where(x => x.Field<string>("RowMetricName") == "Total");
                            for (int k = 1; k <= timeListLen; k++)
                            {
                                table2[k, 0].TextFrame.Text = timeList[k - 1];
                                if (totalRow.Count() > 0)
                                {
                                    var avg = totalRow.Where(x => x.Field<string>("ColumnMetricName") == timeList[k - 1].TrimStart()).Select(x => x.Field<double?>("AvgOccasionsPerson")).ToList()[0];
                                    if (avg == null)
                                    {
                                        table2[k, 1].TextFrame.Text = "NA";
                                    }
                                    else
                                    {
                                        var val = totalRow.Where(x => x.Field<string>("ColumnMetricName") == timeList[k - 1].TrimStart()).Select(x => x.Field<double>("AvgOccasionsPerson")).ToList()[0] / 365;
                                        table2[k, 1].TextFrame.Text = Math.Round(val, (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture);
                                    }
                                }
                                else
                                {
                                    table2[k, 1].TextFrame.Text = "NA";
                                }

                                table2[k, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                table2[k, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                            }
                        }

                        initialSlide++;
                        #endregion

                        #region binding slide 16

                        if (selectedMarket.Contains("Canada") || selectedMarket.Contains("North America"))
                        {
                            removeSlideList.Add(initialSlide);
                        }
                        else
                        {
                            slide = pres.Slides[initialSlide];
                            table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 26");
                            table = RemoveExtraColumn(table, timeList);
                            if (timeListLen > 1)
                            {
                                table[timeListLen + 1, 0].TextFrame.Text = "Occasions Gained / Lost";
                                table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.ten;
                                table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.True;
                                table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                            }

                            BindQuarterSlide(table, quarterData, 0, timeList, initialSlide, true);
                        }

                        initialSlide = initialSlide + 1;
                        #endregion

                        #region binding slide 17
                        slide = pres.Slides[initialSlide];
                        table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 26");
                        slide1 = pres.Slides[22];
                        table1 = (ITable)slide1.Shapes.FirstOrDefault(x => x.Name == "Table 20");

                        table[1, 1].TextFrame.Text = yoyName;
                        table[3, 1].TextFrame.Text = yoyName;

                        if (selectedMarket.Contains("Canada") || selectedMarket.Contains("North America"))
                        {
                            table.Columns.RemoveAt(3, false);
                            table.Columns.RemoveAt(3, false);
                        }
                        dataTable = (from Row in yearData.Tables[0].AsEnumerable() select Row).ToList();

                        for (int i = 0; i < 15; i++)
                        {
                            // table[0, i + 2].TextFrame.Text = occasionList[i];

                            if (dataTable.Count > 0)
                            {
                                var dataRow = dataTable.Where(x => x.Field<string>("RowMetricName") == occasionList[i]);
                                var obj = FormatTrendData(dataRow.ToList()[0], false);
                                table[1, i + 2].TextFrame.Text = obj[Value];

                                if (i != 0)
                                {
                                    table1[i, 0].TextFrame.Text = obj[Value];
                                    var occChange = dataRow.Select(x => x.Field<double?>("OccasionChange")).ToList()[0];
                                    if (occChange == null)
                                    {
                                        table[2, i + 2].TextFrame.Text = "";
                                    }
                                    else
                                    {
                                        table[2, i + 2].TextFrame.Text = Math.Round(dataRow.Select(x => x.Field<double>("OccasionChange")).ToList()[0],
                                                                                                (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture);
                                    }
                                    table[2, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                    table[2, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                }


                                if (!(selectedMarket.Contains("Canada") || selectedMarket.Contains("North America")))
                                {
                                    var obj1 = FormatTrendData(dataRow.ToList()[0], true);
                                    table[3, i + 2].TextFrame.Text = obj1[Value];
                                    table[4, i + 2].TextFrame.Text = obj[Change];
                                    table[4, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                    table[4, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                    table[3, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                    table[3, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                }
                            }
                            else
                            {
                                table[1, i + 2].TextFrame.Text = "NA";
                                table[3, i + 2].TextFrame.Text = "NA";
                                if (i != 0)
                                {
                                    table1[i, 0].TextFrame.Text = "NA";
                                }
                                table[3, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                table[3, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                            }

                            table[1, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                            table[1, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                        }
                        table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 38");
                        if (selectedMarket.Contains("Canada") || selectedMarket.Contains("North America"))
                        {
                            slide.Shapes.Remove(table);
                        }
                        else
                        {
                            table[1, 0].TextFrame.Text = prevYoYName;
                            table[2, 0].TextFrame.Text = yoyName;

                            var totalRow = dataTable.Where(x => x.Field<string>("RowMetricName") == "Total");
                            var obj2 = totalRow.Count() == 0 ? GetDefaultObject() : FormatTrendData(totalRow.ToList()[0], true);

                            var currVal = obj2[Value] == "LS" || obj2[Value] == "NA" ? obj2[Value] : Math.Round(Convert.ToDouble(obj2[Value]) / 365, 2,
                                                     MidpointRounding.AwayFromZero).ToString("0.00", Culture);
                            var chgVal = obj2[Change] != "" ? Math.Round(Convert.ToDouble(obj2[Change]) / 365, 2, MidpointRounding.AwayFromZero).ToString("0.00", Culture) : "";
                            var prevVal = chgVal != "" ? Math.Round(Convert.ToDouble(currVal) - Convert.ToDouble(chgVal), 2, MidpointRounding.AwayFromZero) : 0;
                            table[1, 1].TextFrame.Text = prevVal == 0 ? "" : prevVal.ToString("0.00", Culture);
                            table[2, 1].TextFrame.Text = currVal + ((chgVal != "") ? " | " + chgVal : "");

                            table[1, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                            table[2, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                            table[1, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                            table[2, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                        }

                        #endregion

                        #region binding slide 18,19,20,22,24,25

                        int[] slideNum = { 17, 18, 19, 21, 23, 24 };
                        //   string[] firstHeader = { "Average # of Items", "Kellogg Share of Occasions", "@Home Consumption" };
                        string[] secondHeader = { "Items Gains/Lost", " Share Gains/Lost", "Gains/Lost" };
                        int q = 1, y = 1;
                        for (int i = 0; i < slideNum.Length; i++)
                        {
                            slide = pres.Slides[slideNum[i]];
                            table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 26");

                            if (i % 2 == 0)//Quarter over Quarter slide
                            {
                                table = RemoveExtraColumn(table, timeList);
                                //    table[1, 0].TextFrame.Text = firstHeader[i];
                                if (timeListLen > 1)
                                {
                                    table[timeListLen + 1, 0].TextFrame.Text = secondHeader[q - 1];
                                    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.True;


                                }

                                BindQuarterSlide(table, quarterData, q, timeList, slideNum[i], false);
                                q++;
                            }
                            else // Year over year slide
                            {
                                //   table[1, 0].TextFrame.Text = firstHeader[i];
                                table[1, 1].TextFrame.Text = yoyName;
                                BindYearSlide(table, yearData, y, timeList, slideNum[i], false);
                                y++;
                            }
                        }

                        #endregion

                        #region binding slide 21,23

                        #region binding quarter chart
                        initialSlide = 20;
                        slide = pres.Slides[initialSlide];
                        Aspose.Slides.Charts.IChart chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "Chart 30");
                        IChartDataWorkbook fact = chart.ChartData.ChartDataWorkbook;
                        Aspose.Slides.Charts.IChartSeries series = chart.ChartData.Series[0];
                        c = 7;
                        while (c > timeListLen - 1)
                        {
                            table3.Rows.RemoveAt(timeListLen - 1, false);
                            c--;
                        }

                        c = 8;
                        while (c > timeListLen)
                        {
                            chart.ChartData.Series.RemoveAt(timeListLen);
                            c--;
                        }
                        dataTable = (from Row in quarterData.Tables[2].AsEnumerable() select Row).ToList();

                        for (int i = 0; i < timeListLen; i++)
                        {
                            var dataRow = dataTable.Where(x => x.Field<string>("ColumnMetricName") == timeList[i].TrimStart());
                            series = chart.ChartData.Series[i];
                            series.Labels.DefaultDataLabelFormat.ShowValue = true;
                            series.NumberFormatOfValues = "##0%";
                            fact.GetCell(0, 0, i + 1, timeList[i]);
                            for (int k = 0; k < 15; k++)
                            {
                                if (dataRow.Count() > 0)
                                {
                                    var temprecord = dataRow.Where(x => x.Field<string>("RowMetricName") == occasionList[k]).ToList();
                                    var obj = FormatTrendData(temprecord[0], false);

                                    DataRow record = temprecord[0];

                                    series.DataPoints[k].Value.Data = obj[Value] == "LS" || obj[Value] == "NA" ? 0 : record.Field<double>("OccasionShare");
                                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = obj[Value] == "LS" || obj[Value] == "NA" ? "" : Math.Round(record.Field<double>("OccasionShare") * 100, 1, MidpointRounding.AwayFromZero) + "%";

                                    if (i != 0 && k != 0)
                                    {
                                        table3[k, i - 1].TextFrame.Text = obj[Change];
                                        table3[k, i - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                                        table3[k, i - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                    }
                                }
                                else
                                {
                                    series.DataPoints[k].Value.Data = 0;
                                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = "";
                                }


                            }

                        }

                        initialSlide += 2;
                        #endregion

                        #region binding year chart
                        slide = pres.Slides[initialSlide];
                        table1 = (ITable)slide1.Shapes.FirstOrDefault(x => x.Name == "Table 20");
                        table3 = (ITable)slide1.Shapes.FirstOrDefault(x => x.Name == "Table 18");
                        chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "Chart 14");
                        fact = chart.ChartData.ChartDataWorkbook;
                        Aspose.Slides.Charts.IChartSeries series1 = chart.ChartData.Series[1];

                        table1[0, 0].TextFrame.Text = yoyName;

                        dataTable = (from Row in yearData.Tables[2].AsEnumerable() select Row).ToList();
                        series = chart.ChartData.Series[0];
                        series.Labels.DefaultDataLabelFormat.ShowValue = true;
                        series.NumberFormatOfValues = "##0%";
                        fact.GetCell(0, 0, 1, prevYoYName);
                        series1 = chart.ChartData.Series[1];
                        series1.Labels.DefaultDataLabelFormat.ShowValue = true;
                        series1.NumberFormatOfValues = "##0%";
                        fact.GetCell(0, 0, 2, yoyName);
                        double perValue = 0;
                        for (int k = 0; k < 15; k++)
                        {
                            if (dataTable.Count > 0)
                            {
                                var temprecord = dataTable.Where(x => x.Field<string>("RowMetricName") == occasionList[k]).ToList();
                                var obj = FormatTrendData(temprecord[0], false);

                                DataRow record = temprecord[0];


                                if (obj[Value] != "LS" && obj[Value] != "NA")
                                {
                                    perValue = Math.Round(record.Field<double>("OccasionShare") * (int)MagicNumbers.hundred, 2, MidpointRounding.AwayFromZero);
                                }
                                double chg = 0;
                                if (obj[Change] != "")
                                    chg = Convert.ToDouble(obj[Change]);
                                series.DataPoints[k].Value.Data = obj[Value] == "LS" || obj[Value] == "NA" ? 0 : (perValue - chg) / 100;
                                series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                                series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                                series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = obj[Value] == "LS" || obj[Value] == "NA" ? "" :
                                                                                                                                Math.Round((perValue - chg), 2, MidpointRounding.AwayFromZero) + "%";

                                series1.DataPoints[k].Value.Data = obj[Value] == "LS" || obj[Value] == "NA" ? 0 : perValue / 100;
                                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = obj[Value] == "LS" || obj[Value] == "NA" ? "" :
                                                                                                                                Math.Round(perValue, 2, MidpointRounding.AwayFromZero) + "%";
                                table3[k + 1, 0].TextFrame.Text = obj[Change];
                                table3[k + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                table3[k + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                            }
                            else
                            {
                                series.DataPoints[k].Value.Data = 0;
                                series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                                series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                                series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = "";
                                series1.DataPoints[k].Value.Data = 0;
                                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = "";
                                table3[k + 1, 0].TextFrame.Text = "";
                            }

                        }

                        #endregion
                        #endregion

                        #region binding slide 26-39
                        quarterData = GetTrendData(marketId, timeperiodId, addtnl, "8", null, 2);
                        yearData = GetTrendData(marketId, null, addtnl, "8", yoyId, 2);

                        var quarterdataTable = (from Row in quarterData.Tables[0].AsEnumerable() select Row).ToList();
                        var yeardataTable = (from Row in yearData.Tables[0].AsEnumerable() select Row).ToList();

                        // var groupHeader = quarterdataTable.Select(x => x.Field<string>("SlideName")).Distinct().ToList();
                        string[] groupHeader ={ "Daypart & Consumption Type", "Category Consumption", "Product Attributes", "Detailed Product Attributes"
                                                                                        , "Shopper Mission & Packaging Type", "5W Behavioral Changes", "Demographic Changes" };
                        initialSlide = 25;


                        for (int i = 0; i < groupHeader.Count(); i++)
                        {

                            slide = pres.Slides[initialSlide];
                            while (((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Title 3")).TextFrame.Paragraphs[0].Text != groupHeader[i] ||
                                        (((marketList.Length > 1 && selectedMarket.Contains("Canada")) || selectedMarket.Contains("North America")) &&
                                        new string[] { "Product Attributes", "Detailed Product Attributes" }.Contains(groupHeader[i])))
                            {
                                removeSlideList.Add(initialSlide);
                                initialSlide++;
                                slide = pres.Slides[initialSlide];
                                if (new string[] { "Product Attributes", "Detailed Product Attributes" }.Contains(groupHeader[i]))
                                {
                                    removeSlideList.Add(initialSlide);
                                    initialSlide++;
                                    slide = pres.Slides[initialSlide];
                                    i++;
                                }
                            }
                            var groupQData = quarterdataTable.Where(x => x.Field<string>("SlideName") == groupHeader[i]).ToList();
                            var groupYData = yeardataTable.Where(x => x.Field<string>("SlideName") == groupHeader[i]).ToList();
                            table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 26");
                            var group = groupQData.Select(x => x.Field<string>("GroupName")).Distinct().ToList();
                            int rowIndex = 1;
                            int inc = 0;
                            int colIndex = 0;
                            int headIndex = 0;

                            if (new string[] { "5W Behavioral Changes", "Demographic Changes" }.Contains(groupHeader[i]))
                            {
                                colIndex = 1;
                                headIndex = 1;
                            }
                            else if (i == 0)
                            {
                                rowIndex = 2;
                            }
                            if (initialSlide == 25)
                            {
                                table = RemoveExtraColumn(table, timeList);
                                if (timeListLen > 1)
                                {
                                    table[timeListLen + 1, 0].TextFrame.Text = "Gains/Lost";
                                    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.True;
                                    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                }
                            }
                            else if (initialSlide % 2 != 0)
                            {
                                tblWidth = table.Width;
                                c = 8;
                                while (c > timeListLen)
                                {
                                    table.Columns.RemoveAt(timeListLen + 1 + colIndex, false);
                                    c--;
                                }
                                colWidth = (tblWidth - table.Columns[0].Width) / timeListLen;
                                for (int j = 1; j <= timeListLen; j++)
                                {
                                    table.Columns[j + colIndex].Width = colWidth;
                                    table[j + colIndex, 0].TextFrame.Text = timeList[j - 1].TrimStart();
                                }
                            }

                            #region binding quarter data

                            if (group.Count == 0)
                            {
                                if (groupHeader[i] == "Shopper Mission & Packaging Type")
                                {
                                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "NA")).Hidden = true;
                                }
                                //for(int k = 0; k < 9; k++)
                                //{
                                //    for(int m = 0; m <= timeListLen; m++)
                                //    {
                                //        table[m + colIndex, k + rowIndex].TextFrame.Text = "";
                                //    }
                                //}
                            }

                            for (int j = 0; j < group.Count; j++)
                            {
                                var d = groupQData.Where(x => x.Field<string>("GroupName") == group[j]).ToList();
                                var rows = d.Select(x => x.Field<string>("RowMetricName")).Distinct().ToList();
                                if(j==0 && (new string[] { "Shopper Mission & Packaging Type" }.Contains(groupHeader[i])))
                                {
                                    if (rows.Count > 9)
                                    {
                                        int noOfRowsToAdd = rows.Count - 9;
                                        for(int ind = 1; ind <= noOfRowsToAdd; ind++)
                                        {
                                            table.Rows.InsertClone(9+ind, table.Rows[9], false);
                                        }
                                    }
                                }
                                rowIndex += inc;
                                if (j > 0 && (new string[] { "Daypart & Consumption Type", "Shopper Mission & Packaging Type" }.Contains(groupHeader[i])))
                                    rowIndex++;
                                inc = rows.Count;
                                if (((marketList.Length > 1 && selectedMarket.Contains("Canada") || selectedMarket.Contains("North America"))) && group[j] == "Shopper Mission")
                                {
                                    inc = 9;
                                    continue;
                                }
                                else if (group[j] == "Shopper Mission")
                                {
                                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "NA")).Hidden = true;
                                }
                                
                                for (int l = 0; l < rows.Count; l++)
                                {
                                    if (table.Rows.Count - 1 < rows.Count)
                                    {
                                        table.Rows.AddClone(table.Rows[rowIndex], false);
                                    }

                                    table[headIndex, l + rowIndex].TextFrame.Text = rows[l];
                                    table[headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.ten;
                                    table[headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                    var dataRow = d.Where(x => x.Field<string>("RowMetricName") == rows[l]).ToList();
                                    for (int m = 1; m <= timeListLen; m++)
                                    {
                                        var obj = FormatTrendData(dataRow.Where(x => x.Field<string>("ColumnMetricName") == timeList[m - 1].Trim()).ToList()[0], false);
                                        table[m + colIndex, l + rowIndex].TextFrame.Text = obj[Value];

                                        if (initialSlide == 25 && timeListLen > 1)
                                        {
                                            table[m - 1 + timeListLen + colIndex, l + rowIndex].TextFrame.Text = obj[Change];
                                            table[m - 1 + timeListLen + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                            table[m - 1 + timeListLen + colIndex, l + rowIndex].TextFrame.Paragraphs[0].ParagraphFormat.Alignment = TextAlignment.Center;
                                            table[m - 1 + timeListLen + colIndex, l + rowIndex].TextAnchorType = TextAnchorType.Center;
                                            table[m - 1 + timeListLen + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");


                                        }
                                        table[m + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                        table[m + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                        table[m + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                                        table[m + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                    }


                                }
                                if (group[j] == "Shopper Mission" && rows.Count < 9)
                                {
                                    int ind = (rows.Count + rowIndex);
                                    while (ind <= 9)
                                    {
                                        table.Rows.RemoveAt(rows.Count + rowIndex, false);
                                        ind++;
                                    }

                                }

                            }
                            initialSlide++;
                            #endregion

                            #region binding year data
                            rowIndex = 1;
                            inc = 0;
                            if (groupHeader[i] == "Daypart & Consumption Type")
                            {
                                rowIndex = 2;
                            }
                            slide = pres.Slides[initialSlide];
                            table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 26");

                            table[1 + colIndex, rowIndex - 1].TextFrame.Text = yoyName;
                            group = groupYData.Select(x => x.Field<string>("GroupName")).Distinct().ToList();
                            if (group.Count == 0)
                            {
                                if (groupHeader[i] == "Shopper Mission & Packaging Type")
                                {
                                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "NA")).Hidden = true;
                                }
                            }
                            for (int j = 0; j < group.Count; j++)
                            {
                                var d = groupYData.Where(x => x.Field<string>("GroupName") == group[j]).ToList();
                                var rows = d.Select(x => x.Field<string>("RowMetricName")).Distinct().ToList();
                                rowIndex += inc;
                                if (j == 0 && (new string[] { "Shopper Mission & Packaging Type" }.Contains(groupHeader[i])))
                                {
                                    if (rows.Count > 9)
                                    {
                                        int noOfRowsToAdd = rows.Count - 9;
                                        for (int ind = 1; ind <= noOfRowsToAdd; ind++)
                                        {
                                            table.Rows.InsertClone(9 + ind, table.Rows[9], false);
                                        }
                                    }
                                }
                                if (j > 0 && (new string[] { "Daypart & Consumption Type", "Shopper Mission & Packaging Type" }.Contains(groupHeader[i])))
                                {
                                    rowIndex++;
                                }
                                inc = rows.Count;
                                if (((marketList.Length > 1 && selectedMarket.Contains("Canada") || selectedMarket.Contains("North America"))) && group[j] == "Shopper Mission")
                                {
                                    inc = 9;
                                    continue;
                                }
                                else if (group[j] == "Shopper Mission")
                                {
                                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "NA")).Hidden = true;
                                }
                                for (int l = 0; l < rows.Count; l++)
                                {
                                    if (table.Rows.Count - 1 < rows.Count)
                                    {
                                        table.Rows.AddClone(table.Rows[rowIndex], false);
                                    }
                                    table[headIndex, l + rowIndex].TextFrame.Text = rows[l];
                                    table[headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.ten;
                                    table[headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                    var obj = FormatTrendData(d.Where(x => x.Field<string>("RowMetricName") == rows[l]).ToList()[0], false);
                                    table[1 + colIndex, l + rowIndex].TextFrame.Text = obj[Value];
                                    table[2 + colIndex, l + rowIndex].TextFrame.Text = obj[Change];
                                    table[1 + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                    table[2 + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                    table[1 + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                    table[2 + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                    table[1 + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                    table[1 + colIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);

                                }
                                if (group[j] == "Shopper Mission" && rows.Count < 9)
                                {
                                    int ind = (rows.Count + rowIndex);
                                    while (ind <= 9)
                                    {
                                        table.Rows.RemoveAt(rows.Count + rowIndex, false);
                                        ind++;
                                    }

                                }

                            }
                            initialSlide++;
                            #endregion
                        }




                        #endregion
                        #endregion
                        #region binding category slides

                        initialSlide = 42;
                        DataSet categoryQData = GetTrendData(marketId, timeperiodId, addtnl, "8", null, 3);
                        DataSet categoryYData = GetTrendData(marketId, null, addtnl, "8", yoyId, 3);

                        quarterdataTable = (from Row in categoryQData.Tables[0].AsEnumerable() select Row).ToList();
                        yeardataTable = (from Row in categoryYData.Tables[0].AsEnumerable() select Row).ToList();
                        var categoryNames = (from Row in categoryQData.Tables[1].AsEnumerable() select Row).ToList();
                        var categoryList = categoryNames.Select(x => x.Field<string>("SlideName")).Distinct().ToList();

                        var itemNames = (from Row in categoryQData.Tables[2].AsEnumerable() select Row).ToList();

                        for (int i = 0; i < categoryList.Count; i++)
                        {
                            var catQData = quarterdataTable.Where(x => x.Field<string>("SlideName") == categoryList[i]).ToList();
                            var catYData = yeardataTable.Where(x => x.Field<string>("SlideName") == categoryList[i]).ToList();
                            var itemList = itemNames.Where(x => x.Field<string>("SlideName") == categoryList[i]).Select(x => x.Field<string>("Definition for comparison")).Distinct().ToList();// catQData.Select(x => x.Field<string>("RowMetricName")).Distinct().ToList();
                            var catList = categoryNames.Where(x => x.Field<string>("SlideName").ToUpper(Culture) == categoryList[i].ToUpper(Culture)).Select(x => x.Field<string>("CategoryDerivations")).ToList()[0];
                            if (i < categoryList.Count)
                            {
                                int f = 0;
                                while (f < itemList.Count)
                                {
                                    pres.Slides.InsertClone(initialSlide + f, pres.Slides[(int)MagicNumbers.forty]);
                                    pres.Slides.InsertClone(initialSlide + 1 + f, pres.Slides[(int)MagicNumbers.fortyone]);
                                    f += 2;
                                }

                            }

                            for (int j = 0; j < itemList.Count; j += 2)
                            {
                                #region binding category quarter
                                slide = pres.Slides[initialSlide];
                                table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 26");
                                ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "CategoryName")).TextFrame.Paragraphs[0].Portions[0].Text = categoryList[i];
                                ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "CategoryName")).TextFrame.Paragraphs[1].Portions[0].Text = "Share of Occasion";
                                ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "Rectangle 14")).TextFrame.Text = catList;
                                ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "Rectangle 14")).TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.False;

                                tblWidth = table.Width;
                                c = 8;
                                while (c > timeListLen)
                                {
                                    table.Columns.RemoveAt(timeListLen + 1, false);
                                    table.Columns.RemoveAt(2 * timeListLen + 1, false);
                                    c--;
                                }
                                table.MergeCells(table[1, 0], table[timeListLen, 0], false);

                                if (j + 1 < itemList.Count)
                                {
                                    table.MergeCells(table[timeListLen + 1, 0], table[2 * timeListLen, 0], false);

                                }
                                else
                                {
                                    while (c > 0)
                                    {
                                        table.Columns.RemoveAt(timeListLen + 1, false);
                                        c--;
                                    }
                                }

                                colWidth = (tblWidth - table.Columns[0].Width) / (2 * timeListLen);

                                for (int t = 1; t <= timeListLen; t++)
                                {
                                    table.Columns[t].Width = colWidth;
                                    table[t, 1].TextFrame.Text = timeList[t - 1];
                                    if (j + 1 < itemList.Count)
                                    {
                                        table.Columns[timeListLen + t].Width = colWidth;
                                        table[timeListLen + t, 1].TextFrame.Text = timeList[t - 1];
                                    }
                                }
                                table[1, 0].TextFrame.Text = itemList[j] + " Share of Occasion";
                                table[1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                                table[1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                List<DataRow> itemData2 = null;
                                if (j + 1 < itemList.Count)
                                {
                                    table[timeListLen + 1, 0].TextFrame.Text = itemList[j + 1] + " Share of Occasion";
                                    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                                    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.True;
                                    itemData2 = catQData.Where(x => x.Field<string>("RowMetricName") == itemList[j + 1]).ToList();
                                }

                                var itemData1 = catQData.Where(x => x.Field<string>("RowMetricName") == itemList[j]).ToList();


                                for (int k = 0; k < 15; k++)
                                {
                                    List<DataRow> occData2 = null;
                                    List<DataRow> occData1 = null;
                                    if (itemData1.Count > 0)
                                        occData1 = itemData1.Where(x => x.Field<string>("Occasion") == occasionList[k]).ToList();

                                    if (itemData2 != null && itemData2.Count > 0)
                                    {
                                        occData2 = itemData2.Where(x => x.Field<string>("Occasion") == occasionList[k]).ToList();
                                    }
                                    for (int t = 1; t <= timeListLen; t++)
                                    {
                                        if (occData1 != null)
                                        {
                                            var obj = FormatTrendData(occData1.Where(x => x.Field<string>("ColumnMetricName") == timeList[t - 1].TrimStart()).ToList()[0], false);
                                            table[t, k + 2].TextFrame.Text = obj[Value];
                                            table[t, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                            table[t, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);

                                        }
                                        else
                                        {
                                            table[t, k + 2].TextFrame.Text = "NA";
                                        }

                                        table[t, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                        table[t, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                        if (occData2 != null)
                                        {
                                            var obj1 = FormatTrendData(occData2.Where(x => x.Field<string>("ColumnMetricName") == timeList[t - 1].TrimStart()).ToList()[0], false);
                                            table[t + timeListLen, k + 2].TextFrame.Text = obj1[Value];
                                            table[t + timeListLen, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                            table[t + timeListLen, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                            table[t + timeListLen, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj1[ColorClass]);
                                            table[t + timeListLen, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                        }
                                        else if (j + 1 < itemList.Count)
                                        {
                                            table[t + timeListLen, k + 2].TextFrame.Text = "NA";
                                            table[t + timeListLen, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                            table[t + timeListLen, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                        }

                                    }
                                }

                                initialSlide++;
                                #endregion

                                #region binding category year
                                slide = pres.Slides[initialSlide];
                                table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 26");
                                table[1, 1].TextFrame.Text = yoyName;
                                table[3, 1].TextFrame.Text = yoyName;
                                itemData1 = catYData.Where(x => x.Field<string>("RowMetricName") == itemList[j]).ToList();

                                ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "CategoryName")).TextFrame.Paragraphs[0].Portions[0].Text = categoryList[i];
                                ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "CategoryName")).TextFrame.Paragraphs[1].Portions[0].Text = "Share of Occasion";
                                ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "Rectangle 14")).TextFrame.Text = catList;
                                ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "Rectangle 14")).TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.False;

                                table[1, 0].TextFrame.Text = itemList[j] + " Share of Occasion";
                                table[1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                                table[1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                if (j + 1 < itemList.Count)
                                {
                                    itemData2 = catYData.Where(x => x.Field<string>("RowMetricName") == itemList[j + 1]).ToList();
                                    table.MergeCells(table[3, 0], table[4, 0], false);
                                    table[3, 0].TextFrame.Text = itemList[j + 1] + " Share of Occasion";
                                    table[3, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                                    table[3, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                }
                                else
                                {
                                    table.Columns.RemoveAt(3, false);
                                    table.Columns.RemoveAt(3, false);
                                }




                                for (int k = 0; k < 15; k++)
                                {
                                    DataRow occData1 = null;
                                    if (itemData1.Count > 0)
                                        occData1 = itemData1.Where(x => x.Field<string>("Occasion") == occasionList[k]).ToList()[0];

                                    DataRow occData2 = null;
                                    if (itemData2 != null && itemData2.Count > 0)
                                    {
                                        occData2 = itemData2.Where(x => x.Field<string>("Occasion") == occasionList[k]).ToList()[0];

                                    }

                                    if (occData1 != null)
                                    {
                                        var obj = FormatTrendData(occData1, false);
                                        table[1, k + 2].TextFrame.Text = obj[Value];
                                        table[2, k + 2].TextFrame.Text = obj[Change];
                                        table[1, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                        table[1, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                                        table[2, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                        table[2, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                    }
                                    else
                                    {
                                        table[1, k + 2].TextFrame.Text = "NA";
                                    }
                                    table[1, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;


                                    table[1, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");



                                    if (occData2 != null)
                                    {
                                        var obj1 = FormatTrendData(occData2, false);
                                        table[3, k + 2].TextFrame.Text = obj1[Value];
                                        table[4, k + 2].TextFrame.Text = obj1[Change];
                                        table[3, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                        table[4, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                        table[3, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                        table[3, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj1[ColorClass]);
                                        table[3, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                        table[4, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                    }
                                    else if (j + 1 < itemList.Count)
                                    {
                                        table[3, k + 2].TextFrame.Text = "NA";
                                        table[3, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                        table[3, k + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                    }

                                }

                                initialSlide++;
                                #endregion

                            }

                        }
                        pres.Slides.RemoveAt((int)MagicNumbers.forty);
                        pres.Slides.RemoveAt((int)MagicNumbers.forty);

                        #endregion

                        #region binding occasion slides
                        int slideNumber = initialSlide - 1;
                        initialSlide = slideNumber + (int)MagicNumbers.thirteen;
                        quarterData = GetTrendData(marketId, timeperiodId, addtnl, "8", null, 2);
                        yearData = GetTrendData(marketId, null, addtnl, "8", yoyId, 2);

                        quarterdataTable = (from Row in quarterData.Tables[1].AsEnumerable() select Row).ToList();
                        yeardataTable = (from Row in yearData.Tables[1].AsEnumerable() select Row).ToList();
                        var occTable = (from Row in yearData.Tables[2].AsEnumerable() select Row).ToList();
                        var occTypes = occTable.Select(x => x.Field<string>("OccasionType")).Distinct().ToList();
                        // var slideList = quarterdataTable.Select(x => x.Field<string>("SlideName")).Distinct().ToList();
                        string[] slideList ={  "Category Consumption", "Product Attributes", "Detailed Product Attributes"
                                                                                        , "Shopper Mission & Packaging Type", "5Ws", "Demographics" };
                        #region Quarter over Quarter
                        int v = 0;
                        while (v < occTypes.Count)
                        {
                            int t = 0;
                            while (t < (int)MagicNumbers.thirteen)
                            {
                                pres.Slides.InsertClone(initialSlide, pres.Slides[slideNumber + t]);
                                t++;
                                initialSlide++;
                            }
                            v++;
                        }
                        initialSlide = slideNumber + (int)MagicNumbers.thirteen;

                        for (int i = 0; i < occTypes.Count; i++)
                        {

                            ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "Title 1")).TextFrame.Text = occTypes[i];
                            initialSlide++;
                            var occList = occTable.Where(x => x.Field<string>("OccasionType") == occTypes[i]).Select(x => x.Field<string>("Occasion")).ToList();
                            //if (slideList.Count == 0)
                            //{
                            //    int t;
                            //    if (occList.Count % 2 == 0)
                            //        t = occList.Count / 2;
                            //    else
                            //        t = (occList.Count / 2) + 1;

                            //    initialSlide += (6 * t);
                            //}
                            for (int j = 0; j < slideList.Count(); j++)
                            {
                                int flag = 0;
                                for (int k = 0; k < occList.Count; k += 2)
                                {
                                    slide = pres.Slides[initialSlide];
                                    while (((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Title 3")).TextFrame.Paragraphs[0].Text != slideList[j] ||
                                              (((marketList.Length > 1 && selectedMarket.Contains("Canada")) || selectedMarket.Contains("North America")) &&
                                        new string[] { "Product Attributes", "Detailed Product Attributes" }.Contains(slideList[j])))
                                    {
                                        removeSlideList.Add(initialSlide);
                                        initialSlide++;
                                        slide = pres.Slides[initialSlide];
                                        if (new string[] { "Product Attributes", "Detailed Product Attributes" }.Contains(slideList[j]))
                                        {
                                            j++;
                                        }
                                    }
                                    ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "TextBox 20")).TextFrame.Text = occTypes[i];
                                    table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 26");
                                    tblWidth = table.Width;
                                    c = 8;
                                    int headIndex = 0;
                                    if (new[] { "5Ws", "Demographics" }.Contains(slideList[j]))
                                    {
                                        headIndex = 1;
                                    }
                                    while (c > timeListLen)
                                    {
                                        table.Columns.RemoveAt(timeListLen + 1 + headIndex, false);
                                        table.Columns.RemoveAt(2 * timeListLen + 1 + headIndex, false);
                                        c--;
                                    }
                                    table.MergeCells(table[1 + headIndex, 0], table[timeListLen + headIndex, 0], false);

                                    if (k == 2 && occList.Count == (int)MagicNumbers.three)
                                    {
                                        while (c > 0)
                                        {
                                            table.Columns.RemoveAt(timeListLen + 1 + headIndex, false);
                                            c--;
                                        }
                                    }
                                    else
                                    {
                                        table.MergeCells(table[timeListLen + 1 + headIndex, 0], table[2 * timeListLen + headIndex, 0], false);
                                    }

                                    colWidth = (tblWidth - table.Columns[0].Width) / (2 * timeListLen + headIndex);

                                    for (int t = 1; t <= timeListLen; t++)
                                    {
                                        table.Columns[t + headIndex].Width = colWidth;
                                        table[t + headIndex, 1].TextFrame.Text = timeList[t - 1];
                                        if (table.Columns.Count > timeListLen + 1 + headIndex)
                                        {
                                            table.Columns[timeListLen + t + headIndex].Width = colWidth;
                                            table[timeListLen + t + headIndex, 1].TextFrame.Text = timeList[t - 1];
                                        }
                                    }
                                    table[1 + headIndex, 0].TextFrame.Text = occList[k];
                                    table[1 + headIndex, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.fourteen;
                                    table[1 + headIndex, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                    if (k == 2 && occList.Count == (int)MagicNumbers.three)
                                    {
                                        flag = 1;
                                    }
                                    else
                                    {
                                        table[timeListLen + 1 + headIndex, 0].TextFrame.Text = occList[k + 1];
                                        table[timeListLen + 1 + headIndex, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.fourteen;
                                        table[timeListLen + 1 + headIndex, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                        table[timeListLen + 1 + headIndex, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = ColorTranslator.FromHtml("#DB1348");
                                        table[timeListLen + 1 + headIndex, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.True;
                                        table[timeListLen + 1 + headIndex, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                    }
                                    var groupQData = quarterdataTable.Where(x => x.Field<string>("SlideName") == slideList[j]).ToList();
                                    var group = groupQData.Select(x => x.Field<string>("GroupName")).Distinct().ToList();
                                    int rowIndex = 2;
                                    int inc = 0;

                                    if (group.Count == 0)
                                    {
                                        if (slideList[j] == "Shopper Mission & Packaging Type")
                                        {
                                            ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "NA")).Hidden = true;


                                        }


                                    }

                                    for (int g = 0; g < group.Count; g++)
                                    {
                                        var d = groupQData.Where(x => x.Field<string>("GroupName") == group[g]).ToList();
                                        var rows = d.Select(x => x.Field<string>("RowMetricName")).Distinct().ToList();
                                        rowIndex += inc;
                                        if (g == 0 && slideList[j] == "Shopper Mission & Packaging Type")
                                        {
                                            if (rows.Count > 9)
                                            {
                                                int noOfRowsToAdd = rows.Count - 9;
                                                for (int ind = 1; ind <= noOfRowsToAdd; ind++)
                                                {
                                                    table.Rows.InsertClone(10 + ind, table.Rows[9], false);
                                                }
                                            }
                                        }
                                        if (g > 0 && slideList[j] == "Shopper Mission & Packaging Type")
                                            rowIndex++;
                                        inc = rows.Count;
                                        if (((marketList.Length > 1 && selectedMarket.Contains("Canada") || selectedMarket.Contains("North America"))) && group[g] == "Shopper Mission")
                                        {
                                            inc = 9;
                                            continue;
                                        }
                                        else if (group[g] == "Shopper Mission")
                                        {
                                            ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "NA")).Hidden = true;
                                        }
                                        for (int l = 0; l < rows.Count; l++)
                                        {
                                            if (table.Rows.Count - 2 < rows.Count)
                                            {
                                                table.Rows.AddClone(table.Rows[rowIndex], false);
                                            }

                                            table[headIndex, l + rowIndex].TextFrame.Text = rows[l];
                                            table[headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.ten;
                                            table[headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                            var row = d.Where(x => (x.Field<string>("RowMetricName") == rows[l])).ToList();
                                            for (int m = 1; m <= timeListLen; m++)
                                            {
                                                var obj = FormatTrendData(row.Where(x => (x.Field<string>("ColumnMetricName") == timeList[m - 1].TrimStart()) && (x.Field<string>("Occasion") == occList[k].Trim())).ToList()[0], false);
                                                table[m + headIndex, l + rowIndex].TextFrame.Text = obj[Value];
                                                table[m + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                                table[m + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                                table[m + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                                                table[m + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                                if (flag == 0)
                                                {
                                                    var obj1 = FormatTrendData(row.Where(x => (x.Field<string>("ColumnMetricName") == timeList[m - 1].TrimStart()) && (x.Field<string>("Occasion") == occList[k + 1].Trim())).ToList()[0], false);
                                                    table[m + headIndex + timeListLen, l + rowIndex].TextFrame.Text = obj1[Value];
                                                    table[m + headIndex + timeListLen, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                                    table[m + headIndex + timeListLen, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                                    table[m + headIndex + timeListLen, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj1[ColorClass]);
                                                    table[m + headIndex + timeListLen, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                                }

                                            }
                                        }
                                        if (group[g] == "Shopper Mission" && rows.Count < 9)
                                        {
                                            int ind = (rows.Count + rowIndex);
                                            while (ind <= 10)
                                            {
                                                table.Rows.RemoveAt(rows.Count + rowIndex, false);
                                                ind++;
                                            }

                                        }
                                    }
                                    initialSlide++;


                                }
                            }

                        }

                        int s = 0;
                        removeSlideList = removeSlideList.Select(x => (x < slideNumber ? x : x - 13)).ToList();
                        while (s < (int)MagicNumbers.thirteen)
                        {
                            pres.Slides.RemoveAt(slideNumber);
                            s++;
                            initialSlide--;
                        }
                        #endregion

                        #region Year over Year
                        initialSlide++;
                        // slideNumber = 118;

                        for (int i = 0; i < occTypes.Count; i++)
                        {
                            //if (i < occTypes.Count)
                            //{
                            //    int t = 0;
                            //    while (t < (int)MagicNumbers.thirteen)
                            //    {
                            //        pres.Slides.AddClone(pres.Slides[slideNumber + t]);
                            //        t++;
                            //    }

                            //}
                            ((IAutoShape)pres.Slides[initialSlide].Shapes.FirstOrDefault(x => x.Name == "Title 1")).TextFrame.Text = occTypes[i];
                            initialSlide++;
                            var occList = occTable.Where(x => x.Field<string>("OccasionType") == occTypes[i]).Select(x => x.Field<string>("Occasion")).ToList();
                            //if (slideList.Count == 0)
                            //{
                            //    int t;
                            //    if (occList.Count % 2 == 0)
                            //        t = occList.Count / 2;
                            //    else
                            //        t = (occList.Count / 2) + 1;

                            //    initialSlide += (6 * t);
                            //}
                            for (int j = 0; j < slideList.Count(); j++)
                            {
                                int flag = 0;
                                for (int k = 0; k < occList.Count; k += 2)
                                {
                                    slide = pres.Slides[initialSlide];
                                    while (((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Title 3")).TextFrame.Paragraphs[0].Text != slideList[j] ||
                                                (((marketList.Length > 1 && selectedMarket.Contains("Canada")) || selectedMarket.Contains("North America")) &&
                                        new string[] { "Product Attributes", "Detailed Product Attributes" }.Contains(slideList[j])))
                                    {
                                        removeSlideList.Add(initialSlide);
                                        initialSlide++;
                                        slide = pres.Slides[initialSlide];
                                        if (new string[] { "Product Attributes", "Detailed Product Attributes" }.Contains(slideList[j]))
                                        {
                                            j++;
                                        }
                                    }
                                    table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 5");

                                    //table[1, 0].TextFrame.Text = occList[k];
                                    //table[1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;

                                    //if (k == 2 && occList.Count == (int)MagicNumbers.three)
                                    //{
                                    //    flag = 1;
                                    //}
                                    //else
                                    //{
                                    //    table[timeListLen + 1, 0].TextFrame.Text = occList[k + 1];
                                    //    table[timeListLen + 1, 0].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                                    //}
                                    var groupQData = yeardataTable.Where(x => x.Field<string>("SlideName") == slideList[j]).ToList();
                                    var group = groupQData.Select(x => x.Field<string>("GroupName")).Distinct().ToList();
                                    int rowIndex = 2;
                                    int inc = 0;
                                    int headIndex = 0;
                                    if (new[] { "5Ws", "Demographics" }.Contains(slideList[j]))
                                    {
                                        headIndex = 1;
                                    }
                                    table[headIndex + 1, 1].TextFrame.Text = yoyName;
                                    if (k == 2 && occList.Count == (int)MagicNumbers.three)
                                    {
                                        flag = 1;
                                    }
                                    else
                                    {
                                        table[headIndex + 3, 1].TextFrame.Text = yoyName;
                                    }
                                    if (group.Count == 0)
                                    {
                                        if (slideList[j] == "Shopper Mission & Packaging Type")
                                        {
                                            ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "NA")).Hidden = true;
                                        }
                                    }
                                    for (int g = 0; g < group.Count; g++)
                                    {
                                        var d = groupQData.Where(x => x.Field<string>("GroupName") == group[g]).ToList();
                                        var rows = d.Select(x => x.Field<string>("RowMetricName")).Distinct().ToList();
                                        rowIndex += inc;
                                        if (g == 0 && slideList[j] == "Shopper Mission & Packaging Type")
                                        {
                                            if (rows.Count > 9)
                                            {
                                                int noOfRowsToAdd = rows.Count - 9;
                                                for (int ind = 1; ind <= noOfRowsToAdd; ind++)
                                                {
                                                    table.Rows.InsertClone(10 + ind, table.Rows[9], false);
                                                }
                                            }
                                        }
                                        if (g > 0 && slideList[j] == "Shopper Mission & Packaging Type")
                                            rowIndex++;
                                        inc = rows.Count;
                                        if (((marketList.Length > 1 && selectedMarket.Contains("Canada") || selectedMarket.Contains("North America"))) && group[g] == "Shopper Mission")
                                        {
                                            inc = 9;

                                            continue;
                                        }
                                        else if (group[g] == "Shopper Mission")
                                        {
                                            ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "NA")).Hidden = true;
                                        }
                                        for (int l = 0; l < rows.Count; l++)
                                        {
                                            if (table.Rows.Count - 2 < rows.Count)
                                            {
                                                table.Rows.AddClone(table.Rows[rowIndex], false);
                                            }

                                            table[headIndex, l + rowIndex].TextFrame.Text = rows[l];
                                            table[headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.ten;
                                            table[headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                                            var row = d.Where(x => (x.Field<string>("RowMetricName") == rows[l])).ToList();

                                            var obj = FormatTrendData(row.Where(x => x.Field<string>("Occasion") == occList[k].Trim()).ToList()[0], false);
                                            table[1 + headIndex, l + rowIndex].TextFrame.Text = obj[Value];
                                            table[1 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                            table[1 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                            table[2 + headIndex, l + rowIndex].TextFrame.Text = obj[Change];
                                            table[2 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                            table[2 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                            table[1 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                            table[1 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);

                                            if (flag == 0)
                                            {
                                                var obj1 = FormatTrendData(row.Where(x => x.Field<string>("Occasion") == occList[k + 1].Trim()).ToList()[0], false);
                                                table[3 + headIndex, l + rowIndex].TextFrame.Text = obj1[Value];
                                                table[3 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                                table[3 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                                table[4 + headIndex, l + rowIndex].TextFrame.Text = obj1[Change];
                                                table[4 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                                                table[4 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                                                table[3 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                                table[3 + headIndex, l + rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj1[ColorClass]);
                                            }


                                        }
                                        if (group[g] == "Shopper Mission" && rows.Count < 9)
                                        {
                                            int ind = (rows.Count + rowIndex);
                                            while (ind <= 10)
                                            {
                                                table.Rows.RemoveAt(rows.Count + rowIndex, false);
                                                ind++;
                                            }

                                        }
                                    }
                                    initialSlide++;


                                }
                            }

                        }

                        //s = 0;
                        //while (s < (int)MagicNumbers.thirteen)
                        //{
                        //    pres.Slides.RemoveAt(slideNumber);
                        //    s++;
                        //}
                        #endregion

                        #endregion

                        #region remove slides
                        removeSlideList = removeSlideList.OrderByDescending(i => i).ToList();
                        for (int p = 0; p < removeSlideList.Count; p++)
                        {
                            pres.Slides[removeSlideList[p]].Remove();
                        }
                        #endregion

                        #region add additional filters in all slides
                        for (int ind = 0; ind < pres.Slides.Count; ind++)
                        {
                            slide = pres.Slides[ind];
                            var addtnlText = addtnlName == "" ? " " : " * ";
                            if (ind == (int)MagicNumbers.zero)
                            {
                                addtnlText = addtnlName;
                            }
                            var filterShape = slide.Shapes.Where(x => x.Name.Contains("Filter")).ToList();
                            for (int k = 0; k < filterShape.Count; k++)
                            {
                                ((IAutoShape)filterShape[k]).TextFrame.Text = Regex.Replace(((IAutoShape)filterShape[k]).TextFrame.Text, "<Additional Filter>", addtnlText);
                            }

                            slide.NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[1].Text = addtnlName;
                            if (addtnlName == "")
                            {
                                slide.NotesSlideManager.NotesSlide.NotesTextFrame.Text = addtnlName;
                            }

                        }
                        #endregion

                    }
                    else if (reportId == "10") // bussiness review report
                    {
                        string CategoryName = request.RetailSalesName.Split('|').Length==0?"":request.RetailSalesName.Split('|')[0].Substring(request.RetailSalesName.Split('|')[0].IndexOf(':') + 2);
                        string KCategoryName = "Kellogg's(" + CategoryName + ")";
                        string ManufactureName = request.RetailSalesName.Split('|').Length<=1?"": request.RetailSalesName.Split('|')[1].Substring(request.RetailSalesName.Split('|')[1].IndexOf(':') + 2);
                        var brandlist = request.RetailSalesName.Split('|').Where(x => x.Contains("Brand")).ToList();

                        string BrandName = brandlist.Count > 0 ? brandlist[0].Substring(brandlist[0].IndexOf(':') + 2) : "";
                        double CategoryRetailValue = Convert.ToDouble(request.Category.Split('|')[1], Culture);
                        double KCategoryRetailValue = Convert.ToDouble(request.KelloggCategory.Split('|')[0], Culture);
                        double ManufacturerRetailValue = request.Manufacturer.Split('|').Length > 1 ? Convert.ToDouble(request.Manufacturer.Split('|')[1], Culture) : 0;
                        //double BrandRetailValue = request.Brand.Split('|').Length > 1 ? Convert.ToDouble(request.Brand.Split('|')[1], Culture) : 0; //comment for Single retailer value
                        string BrandRetailValue = request.Brand.Split('|').Length > 1 ? request.Brand.Split('|')[1] : "0"; //uncomment
                        string TimeperiodName = request.TimeperiodName;
                        string TimeType = TimeperiodName.Split(':')[0].Trim().ToUpper();
                        string[] TimeperiodList = TimeperiodName.Split(':')[1].Split(',');
                        int yr = -1;
                        string timeValue = "";
                        bool isItem = false;
                        isItem = request.Brand.IndexOf(":") > 0 ? (request.Brand.Substring(0, request.Brand.IndexOf(":")).Trim().ToUpper() == "ITEM" ? true : false) : false;
                        string covidAppendValue = "";
                        if (TimeType == "COVID QUARTER")
                        {
                            int ind = TimeperiodList[TimeperiodList.Length - 1].Trim().IndexOf('(');
                            covidAppendValue = " " + TimeperiodList[TimeperiodList.Length - 1].Substring(ind);
                        }
                        if (TimeperiodList.Length != 0)
                        {
                            for(int i = 0; i< TimeperiodList.Length; i++)
                            {
                                string tmValue = TimeperiodList[i].Trim();
                                if (i == 0)
                                {
                                    if(TimeType == "COVID QUARTER")
                                    {
                                        yr = Convert.ToInt32(tmValue.Split(' ')[tmValue.Split(' ').Length - 2]);
                                    }
                                    else
                                    {
                                        yr = Convert.ToInt32(tmValue.Split(' ')[tmValue.Split(' ').Length - 1]);
                                    }

                                }
                                /*if(TimeType != "ANNUAL")
                                {
                                    tmValue = tmValue.Substring(0, tmValue.Length - 4);
                                }*/
                                if (TimeType == "QUARTER" || TimeType == "ROLLING 4 QUARTER")
                                {
                                    tmValue = tmValue.Substring(0, tmValue.Length - 4);
                                }
                                else if (TimeType == "COVID QUARTER")
                                {
                                    tmValue = tmValue.Substring(0, 2);
                                    if(timeValue.IndexOf(tmValue) != -1)
                                    {
                                        continue;
                                    }
                                }
                                timeValue += (i == 0 ? "" : ",") + tmValue.Trim();
                            }
                        }

                        ReportGeneratorBAL.TimeperiodType = TimeType;
                        ReportGeneratorBAL.year = yr;
                        ReportGeneratorBAL.TimeperiodValue = timeValue;
                        ReportGeneratorBAL.TimeperiodAppendValue = TimeType == "COVID QUARTER" ? covidAppendValue : "";

                        DataSet brData = GetBrData(request);

                        #region changing heading of Brand Slide if item is selected
                        if (isItem)
                        {
                            int[] slideNumbersToUpdate = { 72, 73, 74, 75, 76, 77, 78, 79, 80, 81 };
                            for(int i = 0; i < slideNumbersToUpdate.Length; i++)
                            {
                                int slideNo = slideNumbersToUpdate[i];
                                ISlide slid = pres.Slides[slideNo - 1];
                                string titleText = ((IAutoShape)slid.Shapes.FirstOrDefault(x => x.Name == "Title")).TextFrame.Text;
                                titleText = titleText.Replace("Brand ", "Item ").Replace("BRAND ", "ITEM ");
                                ((IAutoShape)slid.Shapes.FirstOrDefault(x => x.Name == "Title")).TextFrame.Text = titleText;
                                if (slideNo == 75 || slideNo==76)
                                {
                                    string footerText = ((IAutoShape)((IGroupShape)slid.Shapes.FirstOrDefault(x => x.Name == "Group 5")).Shapes.FirstOrDefault(x => x.Name == "TextBox 87")).TextFrame.Text;
                                    footerText = footerText.Replace("Brand ", "Item ").Replace("BRAND ", "ITEM ");
                                    ((IAutoShape)((IGroupShape)slid.Shapes.FirstOrDefault(x => x.Name == "Group 5")).Shapes.FirstOrDefault(x => x.Name == "TextBox 87")).TextFrame.Text = footerText;
                                }
                                else if(slideNo == 77)
                                {
                                    string footerText = ((IAutoShape)((IGroupShape)slid.Shapes.FirstOrDefault(x => x.Name == "Group 3")).Shapes.FirstOrDefault(x => x.Name == "Rectangle 25")).TextFrame.Text;
                                    footerText = footerText.Replace("Brand ", "Item ").Replace("BRAND ", "ITEM ");
                                    ((IAutoShape)((IGroupShape)slid.Shapes.FirstOrDefault(x => x.Name == "Group 3")).Shapes.FirstOrDefault(x => x.Name == "Rectangle 25")).TextFrame.Text = footerText;
                                }
                                else if (slideNo == 81)
                                {
                                    string footerText = ((IAutoShape)((IGroupShape)slid.Shapes.FirstOrDefault(x => x.Name == "Group 22")).Shapes.FirstOrDefault(x => x.Name == "TextBox 23")).TextFrame.Text;
                                    footerText = footerText.Replace("Brand ", "Item ").Replace("BRAND ", "ITEM ");
                                    ((IAutoShape)((IGroupShape)slid.Shapes.FirstOrDefault(x => x.Name == "Group 22")).Shapes.FirstOrDefault(x => x.Name == "TextBox 23")).TextFrame.Text = footerText;

                                    string yaxisText = ((IAutoShape)(slid.Shapes.FirstOrDefault(x => x.Name == "TextBox 78"))).TextFrame.Text;
                                    yaxisText = yaxisText.Replace("Brand ", "Item ").Replace("BRAND ", "ITEM ");
                                    ((IAutoShape)(slid.Shapes.FirstOrDefault(x => x.Name == "TextBox 78"))).TextFrame.Text = yaxisText;

                                    string xaxisText = ((IAutoShape)(slid.Shapes.FirstOrDefault(x => x.Name == "TextBox 76"))).TextFrame.Text;
                                    xaxisText = xaxisText.Replace("Brand ", "Item ").Replace("BRAND ", "ITEM ");
                                    ((IAutoShape)(slid.Shapes.FirstOrDefault(x => x.Name == "TextBox 76"))).TextFrame.Text = xaxisText;
                                }
                            }
                        }
                        #endregion

                        #region binding slide 1
                        ISlide slide = pres.Slides[0];
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Countries")).TextFrame.Text = "Countries : " + selectedMarket;
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Time Period")).TextFrame.Text = "Time Period : " + timeperiodName;
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Date")).TextFrame.Text = "Date : " + System.DateTime.Today.ToShortDateString();
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Category")).TextFrame.Text = request.RetailSalesName;
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Retail")).TextFrame.Text = request.RetailSalesValue;
                        #endregion

                        #region slide 8
                        ISlide sld = pres.Slides[(int)MagicNumbers.seven];
                        ITable table = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table");
                        for (int i = 0; i < brData.Tables[0].Rows.Count; i++)
                        {
                            DataRow row = brData.Tables[0].Rows[i];
                            table[i + 1, 1].TextFrame.Text = row["Timeperiod"].ToString();
                            table[i + 1, (int)MagicNumbers.two].TextFrame.Text = row["Respondents"].ToString();
                            table[i + 1, 3].TextFrame.Text = row["Occasions"].ToString();
                            table[i + 1, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                            table[i + 1, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                            table[i + 1, (int)MagicNumbers.two].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                            table[i + 1, (int)MagicNumbers.two].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                            table[i + 1, 3].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                            table[i + 1, 3].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                        }
                        #endregion

                        DataSet tempBrdata;
                        // the number of datatables 
                        int[] dsnumber = { 10, 11 };
                        int n = dsnumber.Length;

                        System.Data.DataTable[] dtArray = new System.Data.DataTable[n];
                        for (int i = 0; i < n; i++)
                        {
                            tempBrdata = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + dsnumber[i] + "'";
                            dtArray[i] = (tempBrdata.Tables[1].DefaultView).ToTable();
                        }


                        #region slide 10 and 11
                        var DistinctRows = dtArray[0].AsEnumerable()
                              .Select(s => new
                              {
                                  RowMetric = s.Field<string>("RowMetric"),    // 15 records
                              })
                         .Distinct().ToList();

                        int initialSlide = 9;
                        sld = pres.Slides[initialSlide];  // fifth slide
                        ISlide sld1 = pres.Slides[initialSlide + 1]; // sixth slide
                        IChart chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                        IChart chart2 = (IChart)sld1.Shapes.FirstOrDefault(x => x.Name == "Chart1"); // sixth chart
                        ITable table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                        ITable table2 = (ITable)sld1.Shapes.FirstOrDefault(x => x.Name == "Table1"); // sixth slide table
                        IChartDataWorkbook fact1 = chart1.ChartData.ChartDataWorkbook;
                        IChartDataWorkbook fact2 = chart2.ChartData.ChartDataWorkbook;


                        for (int i = 0; i < DistinctRows.Count; i++)
                        {
                            var list = dtArray[0].AsEnumerable().Where(s => s.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)).ToList();
                            var obj = ReturnCellValue(list, "");
                            BindSlide11TableBusinessReview(obj, list, table1, i);
                            BindSlide11ChartBusinessReview(obj, chart1, i, fact1, 10);

                            list = dtArray[1].AsEnumerable().Where(s => s.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)).ToList();
                            obj = ReturnCellValue(list, "");
                            BindSlide11TableBusinessReview(obj, list, table2, i);
                            BindSlide11ChartBusinessReview(obj, chart2, i, fact2, 11);
                        }

                        #endregion

                        #region slide 12 and similar slides

                        int[] slideNumbers = { 12, 49, 50, 51, 52, 53, 56, 57, 59, 60, 63, 70, 73, 74 };
                        System.Data.DataTable[] slideData = new System.Data.DataTable[slideNumbers.Length];
                        List<DataRow> chartCategoryData = new List<DataRow>();
                        List<DataRow> chartKCategoryData = new List<DataRow>();
                        List<DataRow> chartBrandData = new List<DataRow>();
                        for (int s = 0; s < slideNumbers.Length; s++)
                        {
                            tempBrdata = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s] + "'";
                            slideData[s] = (tempBrdata.Tables[1].DefaultView).ToTable();
                            initialSlide = slideNumbers[s] - 1;
                            sld = pres.Slides[initialSlide];
                            UpdateTitle(sld, slideNumbers[s], CategoryName, BrandName, KCategoryName, ManufactureName);
                            if (slideData[s].Rows.Count > 0)
                            {
                                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                                if (chart1 != null)
                                {
                                    fact1 = chart1.ChartData.ChartDataWorkbook;
                                }
                                DistinctRows = slideData[s].AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();

                                if ((new[] {  59, 60, 73, 74 }).Contains(slideNumbers[s]))
                                {
                                    DistinctRows = slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupId") == 0 && x.Field<int>("GroupSort") == 1 &&
                                    x.Field<string>("ColumnMetric").ToUpper(Culture) == "TOTAL").OrderByDescending(x => x.Field<double?>("Volume"))
                                        .Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().Take((int)MagicNumbers.ten).ToList();
                                }

                                else if ((new[] { 49 }).Contains(slideNumbers[s]))
                                {
                                    DistinctRows = slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupId") == 0 && x.Field<int>("GroupSort") == 1 &&
                                    x.Field<string>("ColumnMetric").ToUpper(Culture) == "TOTAL").OrderByDescending(x => x.Field<double?>("Volume"))
                                        .Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();

                                }
                                var DistinctColumns = slideData[s].AsEnumerable().Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();
                                var append = ((new[] { 49, 59, 73 }).Contains(slideNumbers[s]) ? "%" : "");
                                int row = 0;
                                if (slideNumbers[s] == 49)
                                {
                                    chartCategoryData = chartCategoryData.Concat(slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupSort") == 2)).ToList();
                                }
                                else if (slideNumbers[s] == 59)
                                {
                                    chartKCategoryData = chartKCategoryData.Concat(slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupSort") == 2)).ToList();
                                }
                                else if (slideNumbers[s] == 73)
                                {
                                    chartBrandData = chartBrandData.Concat(slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupSort") == 2)).ToList();
                                }
                                if(slideNumbers[s]==73 || slideNumbers[s] == 74)
                                {
                                    if (DistinctRows.Count < 10)
                                    {
                                        for(int i = DistinctRows.Count; i < 10; i++)
                                        {
                                            table1[0, i + 1].TextFrame.Text = "";
                                            for (int j = 0; j < DistinctColumns.Count; j++)
                                            {
                                                table1[j + 1, i + 1].TextFrame.Text = "";
                                            }
                                        }
                                    }
                                }
                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    if ((new[] { 56, 57 }).Contains(slideNumbers[s]))
                                    {
                                        if (DistinctRows[i].RowMetric.ToUpper(Culture).Contains("SHARE"))
                                        {
                                            append = "%";
                                        }
                                        else if (DistinctRows[i].RowMetric.ToUpper(Culture).Contains("DOL"))
                                        {
                                            append = "$";
                                        }
                                        else
                                        {
                                            append = "";
                                        }
                                    }
                                    for (int j = 0; j < DistinctColumns.Count; j++)
                                    {
                                        var list = slideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)
                                            && x.Field<string>("ColumnMetric").Equals(DistinctColumns[j].ColumnMetric)).Distinct().ToList();
                                        var obj = ReturnCellValue(list, append);
                                        BindTable12BusinessReview(obj, table1, row + i + 1, j + 1, DistinctRows[i].RowMetric, 12, append);
                                        if (chart1 != null && (new[] { 49, 50, 51, 52 }).Contains(slideNumbers[s]) && i == 0)
                                        {
                                            list = chartCategoryData.Where(x => x.Field<string>("ColumnMetric").Equals(DistinctColumns[j].ColumnMetric)).ToList();
                                            obj = ReturnCellValue(list, "");
                                            BindSlide11ChartBusinessReview(obj, chart1, j, fact1, slideNumbers[s]);
                                        }
                                        if (chart1 != null && (new[] { 59, 60 }).Contains(slideNumbers[s]) && i == 0)
                                        {
                                            list = chartKCategoryData.Where(x => x.Field<string>("ColumnMetric").Equals(DistinctColumns[j].ColumnMetric)).ToList();
                                            obj = ReturnCellValue(list, "");
                                            BindSlide11ChartBusinessReview(obj, chart1, j, fact1, slideNumbers[s]);
                                        }
                                        if (chart1 != null && (new[] { 73, 74 }).Contains(slideNumbers[s]) && i == 0 && chartBrandData.Count == 45)
                                        {
                                            list = chartBrandData.Where(x => x.Field<string>("ColumnMetric").Equals(DistinctColumns[j].ColumnMetric)).ToList();
                                            obj = ReturnCellValue(list, "");
                                            BindSlide11ChartBusinessReview(obj, chart1, j, fact1, slideNumbers[s]);
                                        }
                                    }
                                    if ((new[] { 53, 63, 70 }).Contains(slideNumbers[s]) && DistinctRows[i].RowMetric.ToUpper(Culture) == "AWAY FROM HOME")
                                    {
                                        append = "%";
                                        row++;
                                    }
                                    else if ((new[] { 79 }).Contains(slideNumbers[s]) && DistinctRows[i].RowMetric.ToUpper(Culture) == "ADULTS")
                                    {
                                        append = "%";
                                        row++;
                                    }
                                }
                            }
                        }
                        #endregion

                        #region slide 13 and similar slides
                        slideNumbers = new int[] { 13, 21, 22, 23, 24, 25, 26, 27, 28, 29, 34, 35, 36, 37, 41, 42, 43, 44, 48, 62, 69 };
                        slideData = new System.Data.DataTable[slideNumbers.Length];
                        for (int s = 0; s < slideNumbers.Length; s++)
                        {
                            tempBrdata = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s] + "'";
                            slideData[s] = (tempBrdata.Tables[1].DefaultView).ToTable();
                            initialSlide = slideNumbers[s] - 1;
                            sld = pres.Slides[initialSlide];
                            UpdateTitle(sld, slideNumbers[s], CategoryName, BrandName, KCategoryName, ManufactureName);
                            if (slideData[s].Rows.Count > 0)
                            {
                                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                                chart2 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart2");
                                fact1 = chart1.ChartData.ChartDataWorkbook;
                                fact2 = chart2.ChartData.ChartDataWorkbook;
                                if ((new[] { 48, 62, 69 }).Contains(slideNumbers[s]))
                                {
                                    DistinctRows = slideData[s].AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();
                                }
                                else
                                {
                                    DistinctRows = slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupId") == 0).
                                 OrderByDescending(x => x.Field<double?>("Volume")).Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();
                                }
                                string append = (new[] { 24, 25 }).Contains(slideNumbers[s]) ? "%" : "";
                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    var list = slideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)).ToList();
                                    var obj = ReturnCellValue(list, append);
                                    BindSlide13TableBusinessReview(obj, list, table1, i, append);
                                    chart1.ChartData.Categories[i].Value = DistinctRows[i].RowMetric;
                                    chart2.ChartData.Categories[i].Value = DistinctRows[i].RowMetric;
                                    BindSlide13ChartBusinessReview(obj, chart1, i, fact1, "ChangeY%", 0, 13, new string[] { });
                                    BindSlide13ChartBusinessReview(obj, chart2, i, fact2, "Change2Y%", 0, 13, new string[] { });
                                }

                            }

                        }
                        #endregion

                        #region slide 14 and similar slides
                        slideNumbers = new int[] { 14, 19, 32, 40, 54, 55, 64, 65 };
                        slideData = new System.Data.DataTable[slideNumbers.Length];
                        for (int s = 0; s < slideNumbers.Length; s++)
                        {
                            tempBrdata = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s] + "'";
                            slideData[s] = (tempBrdata.Tables[1].DefaultView).ToTable();
                            if ((new[] { 55, 65 }).Contains(slideNumbers[s]))
                            {
                                slideData[s] = slideData[s - 1];
                            }
                            initialSlide = slideNumbers[s] - 1;
                            sld = pres.Slides[initialSlide];
                            UpdateTitle(sld, slideNumbers[s], CategoryName, BrandName, KCategoryName, ManufactureName);
                            if (slideData[s].Rows.Count > 0)
                            {
                                double RetailValue = 0.0;
                                if ((new[] { 54, 55 }).Contains(slideNumbers[s]))
                                {
                                    RetailValue = CategoryRetailValue;
                                }
                                else if ((new[] { 64, 65 }).Contains(slideNumbers[s]))
                                {
                                    RetailValue = KCategoryRetailValue;
                                }
                                //else
                                //{
                                //    RetailValue = BrandRetailValue;
                                //}
                                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                                var textbox = (IAutoShape)sld.Shapes.FirstOrDefault(x => x.Name == "TextBox1");
                                fact1 = chart1.ChartData.ChartDataWorkbook;
                                var chartData = (new[] { 54, 55 }).Contains(slideNumbers[s]) ? chartCategoryData : chartKCategoryData;
                                //if (slideNumbers[s] == 81)
                                //{
                                //    chartData = chartBrandData;
                                //}
                                var obj1 = ReturnCellValue(chartData.Where(x => x.Field<int>("GroupId") == 0 && x.Field<string>("ColumnMetric") == "Total").ToList(), "%");
                                if (textbox != null)
                                {
                                    textbox.TextFrame.Paragraphs[1].Text = obj1[Value] + (obj1[Value] != "NA" ? "% " : " ");
                                }

                                if ((new[] { 54, 64 }).Contains(slideNumbers[s]))
                                {
                                    DistinctRows = chartData.Where(x => x.Field<int>("GroupId") == 0 && x.Field<string>("ColumnMetric") != "Total")
                                        .OrderByDescending(x => x.Field<double?>("Volume")).Select(x => new { RowMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();
                                }
                                else
                                {
                                    DistinctRows = slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupId") == 0)
                                   .OrderByDescending(x => x.Field<double?>("Volume")).Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();
                                }
                                var series = chart1.ChartData.Series;
                                string[] colorList = new string[series[0].DataPoints.Count];
                                for (int j = 0; j < series[0].DataPoints.Count; j++)
                                {
                                    colorList[j] = series[0].DataPoints[j].Format.Fill.SolidFillColor.Color.ToArgb().ToString(Culture);
                                }
                                chart1.ChartData.Categories.Clear();
                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    var list = slideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)).ToList();
                                    var obj = ReturnCellValue(list, "%");
                                    obj1 = ReturnCellValue(chartData.Where(x => x.Field<string>("ColumnMetric") == DistinctRows[i].RowMetric).ToList(), "%");
                                    if (!(new[] { 55, 65 }).Contains(slideNumbers[s]))
                                    {
                                        if ((new[] { 54, 64 }).Contains(slideNumbers[s]))
                                        {
                                            BindSlide14TableBusinessReview(obj1, DistinctRows[i].RowMetric, table1, i + 1);
                                        }
                                        else
                                        {
                                            BindSlide14TableBusinessReview(obj, DistinctRows[i].RowMetric, table1, i + 1);
                                        }
                                    }
                                    obj = UpdateObj(list[0].Field<int>("SlideNumber"), obj, obj1, RetailValue);
                                    if ((new[] { 54, 55, 64, 65 }).Contains(slideNumbers[s]))
                                    {
                                        chart1.ChartData.Categories.Add(fact1.GetCell(0, i + 1, 5, DistinctRows[i].RowMetric));
                                        BindSlide13ChartBusinessReview(obj, chart1, i, fact1, "Value", 0, 14, colorList);
                                    }
                                    else if (i != 0)
                                    {
                                        chart1.ChartData.Categories.Add(fact1.GetCell(0, i, 5, DistinctRows[i].RowMetric));
                                        BindSlide13ChartBusinessReview(obj, chart1, i - 1, fact1, "Value", 0, 14, colorList);
                                    }
                                }
                            }
                        }
                        #endregion

                        #region slide 16 and similar slides

                        slideNumbers = new int[] { 16 };
                        slideData = new System.Data.DataTable[slideNumbers.Length];
                        for (int s = 0; s < slideNumbers.Length; s++)
                        {
                            tempBrdata = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s] + "'";
                            slideData[s] = (tempBrdata.Tables[2].DefaultView).ToTable();

                            if (slideData[s].Rows.Count > 0)
                            {
                                initialSlide = slideNumbers[s] - 1;
                                sld = pres.Slides[initialSlide];
                                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                                fact1 = chart1.ChartData.ChartDataWorkbook;

                                DistinctRows = slideData[s].AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }
                                 ).Distinct().ToList();

                                var DistinctColumns = slideData[s].AsEnumerable().Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();
                                int chartInd = 0;
                                int tableInd = 0;
                                int flag = 0;
                                for(int i = 0; i < DistinctColumns.Count; i++)
                                {
                                    table1[i + 2, 0].TextFrame.Text = DistinctColumns[i].ColumnMetric;
                                }

                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    for (int j = 0; j < DistinctColumns.Count; j++)
                                    {
                                        var list = slideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)
                                            && x.Field<string>("ColumnMetric").Equals(DistinctColumns[j].ColumnMetric)).ToList();
                                        var obj = ReturnCellValue(list, "");

                                        if (list[0].Field<int>("GroupSort") != 1)
                                        {
                                            obj = ReturnCellValue(list, "%");
                                            BindTable12BusinessReview(obj, table1, tableInd + 1, j + 2, DistinctRows[i].RowMetric, 16, "%");
                                            flag = 0;
                                        }
                                        else
                                        {
                                            if (chart1.ChartData.Categories.Count < j + 1)
                                            {
                                                chart1.ChartData.Categories.Add(fact1.GetCell(0, j + 1, 0, DistinctColumns[j].ColumnMetric));
                                            }
                                            else
                                            {
                                                chart1.ChartData.Categories[j].Value = DistinctColumns[j].ColumnMetric;
                                            }
                                            BindSlide13ChartBusinessReview(obj, chart1, j, fact1, "Value", chartInd, 16, new string[] { });
                                            flag = 1;
                                        }
                                    }
                                    if (flag == 1)
                                    {
                                        chartInd++;
                                    }
                                    else
                                    {
                                        tableInd++;
                                    }
                                }

                                int c = 13;
                                while (c > DistinctColumns.Count + 1)
                                {
                                    table1.Columns.RemoveAt(c, false);
                                    c--;
                                }

                            }


                        }
                        #endregion

                        #region slide 17 and similar slides

                        slideNumbers = new int[] { 17, 30, 38 };

                        slideData = new System.Data.DataTable[slideNumbers.Length];
                        var newSlideData = new System.Data.DataTable[slideNumbers.Length];
                        DataSet newTempBrData = new DataSet();
                        for (int s = 0; s < slideNumbers.Length; s++)
                        {
                            tempBrdata = brData.Copy();
                            newTempBrData = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s] + "'";
                            newTempBrData.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s]*-1 + "'";
                            newSlideData[s]= (newTempBrData.Tables[1].DefaultView).ToTable().Rows.Count!=0?(newTempBrData.Tables[1].DefaultView).ToTable().AsEnumerable().OrderBy(r=>r.Field<int>("GroupSort")).ThenBy(r => r.Field<int>("GroupId")).CopyToDataTable(): (newTempBrData.Tables[1].DefaultView).ToTable();
                            slideData[s] = (tempBrdata.Tables[1].DefaultView).ToTable();

                            if (slideData[s].Rows.Count > 0)
                            {
                                initialSlide = slideNumbers[s] - 1;
                                sld = pres.Slides[initialSlide];
                                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                                table2 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table2");
                                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                                fact1 = chart1.ChartData.ChartDataWorkbook;

                                DistinctRows = slideData[s].AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }
                                 ).Distinct().ToList();

                                int append = 1;
                                int row = 0;
                                int exe = 1;
                                string app = "%";
                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    var list = slideData[s].AsEnumerable().OrderBy(r => r.Field<string>("ColumnMetric")).Where(x => x.Field<string>("RowMetric").
                                    Equals(DistinctRows[i].RowMetric)).ToList();
                                    var obj = ReturnCellValue(list, app);
                                    if (list[0].Field<int>("GroupSort") < 5)
                                    {
                                        obj = ReturnCellValue(list, "");
                                        BindSlide13TableBusinessReview(obj, list, table1, i + append, "");
                                        if (DistinctRows[i].RowMetric.ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION")
                                        {
                                            append = 2;
                                        }
                                    }
                                    else if (list[0].Field<int>("GroupSort") > 5 && list[0].Field<int>("GroupSort") < 8)
                                    {
                                        BindSlide13TableBusinessReview(obj, list, table2, row + exe, app);
                                        if (DistinctRows[i].RowMetric.ToUpper(Culture) == "PURCHASED: QSR")
                                        {
                                            exe = 2;
                                            app = " ";
                                        }
                                        row++;
                                    }
                                    else
                                    {
                                        BindSlide17ChartBusinessReview(obj, chart1, list, fact1);
                                    }
                                }

                            }
                            ReportGeneratorBAL.changeHeadingDollar = false;
                            if (newSlideData[s].Rows.Count > 0)
                            {
                                initialSlide = slideNumbers[s] - 1;
                                sld = pres.Slides[initialSlide];
                                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                                table2 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table2");
                                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                                fact1 = chart1.ChartData.ChartDataWorkbook;

                                DistinctRows = newSlideData[s].AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }
                                 ).Distinct().ToList();

                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    var list = newSlideData[s].AsEnumerable().OrderBy(r => r.Field<string>("ColumnMetric")).Where(x => x.Field<string>("RowMetric").
                                    Equals(DistinctRows[i].RowMetric)).ToList();
                                    var obj = ReturnCellValue(list, "");

                                    obj["Value"] = "$ " + obj["Value"];
                                    obj["ValueY"] = "$ " + obj["ValueY"];
                                    obj["Value2Y"] = "$ " + obj["Value2Y"];
                                    obj["ChangeY"] = "$ " + obj["ChangeY"];
                                    obj["Change2Y"] = "$ " + obj["Change2Y"];
                                    BindSlide13TableBusinessReview(obj, list, table1, i , "");
                                }

                            }
                            ReportGeneratorBAL.changeHeadingDollar = true;
                        }

                        #endregion

                        #region slide 18 and similar slides
                        slideNumbers = new int[] { 18, 31, 39 };
                        slideData = new System.Data.DataTable[slideNumbers.Length];
                        newSlideData = new System.Data.DataTable[slideNumbers.Length];
                        newTempBrData = new DataSet();
                        for (int s = 0; s < slideNumbers.Length; s++)
                        {
                            tempBrdata = brData.Copy();
                            newTempBrData = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s] + "'";
                            newTempBrData.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s] * -1 + "'";
                            newSlideData[s] = (newTempBrData.Tables[1].DefaultView).ToTable().Rows.Count != 0 ? (newTempBrData.Tables[1].DefaultView).ToTable().AsEnumerable().OrderBy(r => r.Field<int>("GroupSort")).ThenBy(r => r.Field<int>("GroupId")).CopyToDataTable() : (newTempBrData.Tables[1].DefaultView).ToTable();
                            slideData[s] = (tempBrdata.Tables[1].DefaultView).ToTable();

                            if (slideData[s].Rows.Count > 0)
                            {
                                initialSlide = slideNumbers[s] - 1;
                                sld = pres.Slides[initialSlide];
                                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                                table2 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table2");
                                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                                fact1 = chart1.ChartData.ChartDataWorkbook;

                                DistinctRows = slideData[s].AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }
                                 ).Distinct().ToList();

                                int append = 1;
                                int row = 1;
                                int chartInd = 0;
                                DistinctRows = slideData[s].AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();
                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    var list = slideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)).ToList();
                                    if (list[0].Field<int>("GroupSort") == 8)
                                    {
                                        list = slideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric) && x.Field<int>("GroupSort") == 8).ToList();
                                        var obj = ReturnCellValue(list, "");
                                        BindSlide18ChartBusinessReview(obj, chart1, chartInd, fact1);
                                        chartInd++;
                                    }
                                    else
                                    {
                                        var DistinctColumns = slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupSort") == 8).Select(x => new { ColumnMetric = x.Field<string>("RowMetric") }).Distinct().ToList();
                                        for (int j = 0; j < DistinctColumns.Count; j++)
                                        {
                                            list = slideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)
                                            && x.Field<string>("ColumnMetric").Equals(DistinctColumns[j].ColumnMetric)).ToList();
                                            var obj = ReturnCellValue(list, "");
                                            if(!(obj["ChangeY"] == "" && obj["Change2Y"] == ""))
                                            {
                                                if(obj["ChangeY"] == "")
                                                {
                                                    obj["ChangeY"] = " ";
                                                }
                                                if (obj["Change2Y"] == "")
                                                {
                                                    obj["Change2Y"] = " ";
                                                }
                                            }
                                            if (list[0].Field<int>("GroupSort") < 5)
                                            {
                                                BindTable12BusinessReview(obj, table1, i + 2, j + 1, DistinctRows[i].RowMetric, 18, " ");
                                            }
                                            else if (list[0].Field<int>("GroupSort") > 5 && list[0].Field<int>("GroupSort") < 8)
                                            {
                                                BindTable12BusinessReview(obj, table2, row + append, j + 1, DistinctRows[i].RowMetric, 18, " ");
                                            }
                                        }
                                    }
                                    if (list[0].Field<int>("GroupSort") > 5 && list[0].Field<int>("GroupSort") < 8)
                                    {
                                        row++;
                                    }
                                    if (DistinctRows[i].RowMetric.ToUpper(Culture) == "PURCHASED: QSR")
                                    {
                                        append = 2;
                                    }
                                }
                            }
                            ReportGeneratorBAL.changeHeadingDollar = false;
                            if (newSlideData[s].Rows.Count > 0)
                            {
                                initialSlide = slideNumbers[s] - 1;
                                sld = pres.Slides[initialSlide];
                                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                                table2 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table2");
                                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                                fact1 = chart1.ChartData.ChartDataWorkbook;

                                DistinctRows = newSlideData[s].AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }
                                 ).Distinct().ToList();

                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    var list = newSlideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)).ToList();
                                    var DistinctColumns = newSlideData[s].AsEnumerable().Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();
                                    for (int j = 0; j < DistinctColumns.Count; j++)
                                    {
                                        list = newSlideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)
                                        && x.Field<string>("ColumnMetric").Equals(DistinctColumns[j].ColumnMetric)).ToList();
                                        var obj = ReturnCellValue(list, "");
                                        obj["ChangeY"] = "$ " + obj["ChangeY"];
                                        obj["Change2Y"] = "$ " + obj["Change2Y"];
                                        BindTable12BusinessReview(obj, table1, i + 1, j + 1, DistinctRows[i].RowMetric, 18, " ");
                                    }
                                }

                            }
                            ReportGeneratorBAL.changeHeadingDollar = true;
                        }
                        #endregion

                        #region slide 46 and similar slides 

                        slideNumbers = new int[] { 46, 61, 68 };
                        slideData = new System.Data.DataTable[slideNumbers.Length];
                        for (int s = 0; s < slideNumbers.Length; s++)
                        {
                            tempBrdata = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s] + "'";
                            slideData[s] = (tempBrdata.Tables[1].DefaultView).ToTable();
                            initialSlide = slideNumbers[s] - 1;
                            sld = pres.Slides[initialSlide];
                            UpdateTitle(sld, slideNumbers[s], CategoryName, BrandName, KCategoryName, ManufactureName);
                            if (slideData[s].Rows.Count > 0)
                            {
                                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                                fact1 = chart1.ChartData.ChartDataWorkbook;

                                DistinctRows = slideData[s].AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }
                                 ).Distinct().ToList();


                                var DistinctColumns = slideData[s].AsEnumerable().Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().OrderBy(r => r.ColumnMetric).ToList();
                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    var list = slideData[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)).ToList();
                                    var obj = ReturnCellValue(list, "");

                                    BindSlide13ChartBusinessReview(obj, chart1, i, fact1, "Value", 0, 46, new string[] { });

                                }

                            }


                        }


                        #endregion

                        #region slide 47 and similar slides
                        slideNumbers = new int[] { 47 };
                        slideData = new System.Data.DataTable[slideNumbers.Length];
                        for (int s = 0; s < slideNumbers.Length; s++)
                        {
                            tempBrdata = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbers[s] + "'";
                            slideData[s] = (tempBrdata.Tables[1].DefaultView).ToTable();
                            initialSlide = slideNumbers[s] - 1;
                            sld = pres.Slides[initialSlide];
                            UpdateTitle(sld, slideNumbers[s], CategoryName, BrandName, KCategoryName, ManufactureName);
                            if (slideData[s].Rows.Count > 0)
                            {
                                #region who eats
                                BindWhoEatsSlide47(sld, slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupSort") == 1).ToList());
                                #endregion

                                #region when
                                BindWhenSlide47(sld, slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupSort") == 2).ToList());
                                #endregion

                                #region activity
                                BindActivitySlide47(sld, slideData[s].AsEnumerable().Where(x => x.Field<int>("GroupSort") == 8).ToList());
                                #endregion

                                #region motivations
                                BindP_MSlide47(sld, slideData[s].AsEnumerable().Where(x => (new[] { 3, 4 }).Contains(x.Field<int>("GroupSort"))).ToList());
                                #endregion

                                #region where
                                BindWhereSlide47(sld, slideData[s].AsEnumerable().Where(x => (new[] { 5, 6, 7 }).Contains(x.Field<int>("GroupSort"))).ToList());
                                #endregion
                            }
                        }
                        #endregion

                        #region slide 75

                        var Slidedata = new int[] { 75, 76, 77, 78, 79, 80, 81 };
                        System.Data.DataTable[] slideDataNew = new System.Data.DataTable[Slidedata.Length];

                        int addedSlidecount = 0;

                        var slideStartIndex = SlideDetails.Slide75Details;
                        tempBrdata = brData.Copy();
                        tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + Slidedata[2] + "'";
                        slideDataNew[0] = (tempBrdata.Tables[1].DefaultView).ToTable();


                        var   brands = (from DataRow rows in slideDataNew[0].Rows
                                      where rows["BrandName"] != DBNull.Value

                                      select (string)rows["BrandName"]).Distinct().ToList();




                        for  (int i = 1; i < brands.Count; i++)
                        {

                            pres.Slides.InsertClone(slideStartIndex + 7 * i, pres.Slides[slideStartIndex]);
                            pres.Slides.InsertClone(slideStartIndex + 7 * i + 1, pres.Slides[slideStartIndex + 1]);
                            pres.Slides.InsertClone((slideStartIndex + 7 * i + 2), pres.Slides[slideStartIndex + 2]);
                            pres.Slides.InsertClone((slideStartIndex + 7 * i + 3), pres.Slides[slideStartIndex + 3]);
                            pres.Slides.InsertClone((slideStartIndex + 7 * i + 4), pres.Slides[slideStartIndex + 4]);
                            pres.Slides.InsertClone((slideStartIndex + 7 * i + 5), pres.Slides[slideStartIndex + 5]);
                            pres.Slides.InsertClone((slideStartIndex + 7 * i + 6), pres.Slides[slideStartIndex + 6]);
                        }

                        for (int j = 0; j < Slidedata.Length; j++)
                        {
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + Slidedata[j] + "'";
                            slideDataNew[j] = (tempBrdata.Tables[1].DefaultView).ToTable();

                            for (int i = 0; i < brands.Count; i++)
                            {
                                if (j == 0)
                                {
                                    if (slideDataNew[j].Rows.Count > 0 && slideDataNew[j].AsEnumerable().Where(x => x.Field<string>("ColumnMetric") == brands[i]).Count()!=0)
                                    {
                                        slideDataNew[j] = slideDataNew[j].AsEnumerable().Where(x=> x.Field<string>("ColumnMetric") == brands[i]).CopyToDataTable();
                                        if(slideDataNew[j].Rows.Count >0)
                                        {
                                            Bind75Slide(pres.Slides[slideStartIndex + 7 * i], CategoryName, brands[i], KCategoryName, slideDataNew[j], slideStartIndex + 7 * i + 1, ManufactureName);
                                        }
                                        slideDataNew[j] = (tempBrdata.Tables[1].DefaultView).ToTable();
                                    }
                                }
                                if (j == 1)
                                {
                                    if (slideDataNew[j].Rows.Count > 0 && slideDataNew[j].AsEnumerable().Where(x => x.Field<string>("ColumnMetric") == brands[i]).Count() != 0)
                                    {
                                        slideDataNew[j] = slideDataNew[j].AsEnumerable().Where(x => x.Field<string>("ColumnMetric") == brands[i]).CopyToDataTable();
                                        if(slideDataNew[j].Rows.Count > 0)
                                        {
                                            Bind76Slide(pres.Slides[slideStartIndex + 7 * i + 1], CategoryName, brands[i], KCategoryName, slideDataNew[j], slideStartIndex + 7 * i + 2,  ManufactureName);
                                        }
                                        slideDataNew[j] = (tempBrdata.Tables[1].DefaultView).ToTable();
                                    }
                                }
                                if (j == 2)
                                {
                                    Bind77Slide(pres.Slides[slideStartIndex + 7 * i + 2], CategoryName, brands[i], KCategoryName, slideDataNew[j], chart1, fact1, slideStartIndex + 7 * i + 3,  ManufactureName);
                                }
                                if (j == 3)
                                {
                                    Bind78Slide(pres.Slides[slideStartIndex + 7 * i + 3], CategoryName, brands[i], KCategoryName, slideDataNew[j], table1, chart1,
                                    fact1, chart2, fact2, slideStartIndex + 7 * i + 4,  ManufactureName);
                                }
                                if (j == 4)
                                {


                                    Bind79Slide(pres.Slides[slideStartIndex + 7 * i + 4], CategoryName, brands[i], KCategoryName, slideDataNew[j], table1, slideStartIndex + 7 * i + 5,  ManufactureName);


                                }
                                if (j == 5)
                                {
                                    slideDataNew[j] = slideDataNew[j].AsEnumerable().Where(x => x.Field<string>("Brand") == brands[i]).CopyToDataTable();
                                    if (slideDataNew[j].Rows.Count > 0)
                                    {
                                        Bind80Slide(pres.Slides[slideStartIndex + 7 * i + 5], CategoryName, brands[i], KCategoryName, slideDataNew[j], table1, table2, slideStartIndex + 7 * i + 6, ManufactureName,isItem);
                                    }
                                    slideDataNew[j] = (tempBrdata.Tables[1].DefaultView).ToTable();
                                }
                                if (j == 6)
                                {
                                    //Bind81Slide(pres.Slides[slideStartIndex + 7 * i + 6], CategoryName, brands[i], KCategoryName, slideDataNew[j],
                                    //table1, chart1, fact1, chartBrandData, BrandRetailValue, slideStartIndex + 7 * i + 7);

                                    Bind81Slide(pres.Slides[slideStartIndex + 7 * i + 6], CategoryName, brands[i], KCategoryName, slideDataNew[j], table1, chart1, fact1, chartBrandData, Convert.ToDouble(BrandRetailValue.Split(',')[i]), slideStartIndex + 7 * i + 7, ManufactureName);

                                }

                            }
                        }
                        #endregion

                        #region slide 67,71
                        int[] slideNumbersNew = { 67, 71 };
                        System.Data.DataTable[] slideDataTable = new System.Data.DataTable[slideNumbersNew.Length];
                        for (int s = 0; s < slideNumbersNew.Length; s++)
                        {
                            tempBrdata = brData.Copy();
                            tempBrdata.Tables[1].DefaultView.RowFilter = "SlideNumber = '" + slideNumbersNew[s] + "'";
                            slideDataTable[s] = (tempBrdata.Tables[1].DefaultView).ToTable();
                            initialSlide = slideNumbersNew[s] - 1;
                            sld = pres.Slides[initialSlide];
                            //UpdateTitle(sld, slideNumbers[s], CategoryName, BrandName, KCategoryName, ManufactureName);
                            if (slideDataTable[s].Rows.Count > 0)
                            {
                                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");

                                ITable tableBot = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table2");


                                //double? totalShare = slideDataTable[s].AsEnumerable().Where(x => x.Field<string>("ColumnMetric").ToUpper(Culture) == "TOTAL SHARE" && x.Field<string>("RowMetric") == "" && x.Field<int>("GroupId") == 0).Select(x => x.Field<double>("Volume")).FirstOrDefault();

                                double? totalShare = slideDataTable[s].AsEnumerable().Where(x => x.Field<string>("ColumnMetric").ToUpper(Culture) == "TOTAL SHARE" &&  x.Field<int>("GroupId") == 0).Select(x => x.Field<double>("Volume")).FirstOrDefault();
                                string TotalSharePer = Math.Round(totalShare ?? 0, 1, MidpointRounding.AwayFromZero).ToString("0.0", Culture);

                                string UniversalShare = CategoryRetailValue == 0 ? "0.0" : CategoryRetailValue.ToString();

                                string catShare = slideNumbersNew[s] == 67 ? (KCategoryRetailValue == 0 ? "0.0" : KCategoryRetailValue.ToString()) : (ManufacturerRetailValue == 0 ? "0.0" : ManufacturerRetailValue.ToString());

                                DistinctRows = slideDataTable[s].AsEnumerable().Where(x => !(new[] { "TOTAL"}).Contains(x.Field<string>("RowMetric").ToUpper(Culture)) ).Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();


                                var DistinctColumns = slideDataTable[s].AsEnumerable().Where(x => x.Field<string>("ColumnMetric").ToUpper(Culture) != "TOTAL SHARE").Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();

                                var manufactureRows = slideDataTable[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").ToUpper(Culture)== "TOTAL").Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();

                                var manufactureColumns = slideDataTable[s].AsEnumerable().Where(x => !(new[] { "TOTAL SHARE", "TOTAL DISTRIBUTION","CATEGORY DISTRIBUTION","MANUFACTURER DISTRIBUTION" }).Contains(x.Field<string>("ColumnMetric").ToUpper(Culture))).Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();

                                table1[0, 0].TextFrame.Text = table1[0, 0].TextFrame.Text.Replace("_share_", TotalSharePer);
                                tableBot[15, 0].TextFrame.Text = tableBot[15, 0].TextFrame.Text.Replace("_catShare_", catShare);
                                tableBot[15, 0].TextFrame.Text = tableBot[15, 0].TextFrame.Text.Replace("_totShare_", UniversalShare);

                                int row = 0;

                                for (int i = 0; i < DistinctRows.Count; i++)
                                {
                                    var append = "%";
                                    for (int j = 0; j < DistinctColumns.Count; j++)
                                    {
                                        var isChange = false;
                                        bool isDollar = true;
                                        bool isColor = true;
                                        if((new[] { "TOTAL DISTRIBUTION", "CATEGORY DISTRIBUTION", "MANUFACTURER DISTRIBUTION" }).Contains(DistinctColumns[j].ColumnMetric.ToString().ToUpper(Culture)))
                                        {
                                            isDollar = false;
                                            isColor = false;
                                        }
                                        var list = slideDataTable[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric)
                                            && x.Field<string>("ColumnMetric").Equals(DistinctColumns[j].ColumnMetric)).Distinct().ToList();
                                        var obj = ReturnCellValue(list, append);
                                        BindTable67BusinessReview(obj, table1, row + i + 1, j + 1, DistinctRows[i].RowMetric, slideNumbersNew[s], true, isDollar, isColor,isChange);

                                    }

                                }

                                for (int i = 0; i < manufactureRows.Count; i++)
                                {
                                    var append = "%";
                                    for (int j = 0; j < manufactureColumns.Count; j++)
                                    {
                                        var isChange = true;
                                        bool isDollar = false;
                                        bool isColor = false;

                                        var list = slideDataTable[s].AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(manufactureRows[i].RowMetric)
                                            && x.Field<string>("ColumnMetric").Equals(manufactureColumns[j].ColumnMetric)).Distinct().ToList();
                                        var obj = ReturnCellValue(list, append);
                                        BindTable67BusinessReview(obj, tableBot, i , j + 1, manufactureRows[i].RowMetric, slideNumbersNew[s], false, isDollar, isColor, isChange);

                                    }

                                }
                            }
                        }
                        #endregion


                    }
                    else
                    {
                        DataSet commonData = GetReportCommonSlides(timeperiodId, marketId, addtnl);

                        #region binding common slides

                        #region binding slide 1
                        ISlide slide = pres.Slides[0];
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Benchmark")).TextFrame.Text = "Benchmark : " + GetBenchMarkID(benchmark);
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Countries")).TextFrame.Text = "Countries : " + selectedMarket;
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Time Period")).TextFrame.Text = "Time Period : " + timeperiodName;
                        ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Date")).TextFrame.Text = "Date : " + System.DateTime.Today.ToShortDateString();
                        #endregion

                        #region binding slide 12
                        //slide = pres.Slides[(int)MagicNumbers.eleven];
                        //DataRow row = commonData.Tables[0].Rows[0];
                        //((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "TextBox 3")).TextFrame.Text = row["Eating Occasions"].ToString();
                        //((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "TextBox 4")).TextFrame.Text = row["Consumers"].ToString();
                        //((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "TextBox 5")).TextFrame.Text = row["Countries"].ToString();
                        #endregion

                        #region binding slide 13
                        slide = pres.Slides[(int)MagicNumbers.twelve];
                        DataRow row = commonData.Tables[1].Rows[0];
                        ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 29");
                        table[1, 1].TextFrame.Text = row["Consumption Occasions"].ToString();
                        table[1, (int)MagicNumbers.two].TextFrame.Text = row["Respondents"].ToString();
                        IAutoShape timeshape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "TextBox 4"));
                        timeshape.TextFrame.Text = timeshape.TextFrame.Text.Replace("<>", timeperiodName);
                        #endregion

                        #region binding slide 15
                        slide = pres.Slides[(int)MagicNumbers.fourteen];
                        Aspose.Slides.Charts.IChart chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "Chart 6");
                        IChartDataWorkbook fact = chart.ChartData.ChartDataWorkbook;
                        Aspose.Slides.Charts.IChartSeries series = chart.ChartData.Series[0];
                        series.Labels.DefaultDataLabelFormat.ShowValue = true;
                        series.NumberFormatOfValues = "##0%";

                        string[] colorList = new string[series.DataPoints.Count];
                        for (int i = 0; i < series.DataPoints.Count; i++)
                        {
                            colorList[i] = series.DataPoints[i].Format.Fill.SolidFillColor.Color.ToArgb().ToString(Culture);
                        }
                        series.DataPoints.Clear();
                        System.Data.DataTable dtable = commonData.Tables[2];
                        var results = (from Row in dtable.AsEnumerable()
                                       where Row.Field<string>(RespType) == "Adults,Teens & Kids"
                                       select Row).ToList();
                        var index = results.Count / 2;
                        var record1 = results.Where(x => x.Field<int>(DBParameters.ProfileOrder) == 1).ToList()[0];
                        var shape1 = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "TextBox 3"));
                        shape1.TextFrame.Text = "n=" + record1.Field<int>("USampleSize") + " [" + Convert.ToInt32(record1.Field<double>("WSampleSize")) + "]";
                        var value = 0;
                        var unote = new System.Text.StringBuilder();
                        var wnote = new System.Text.StringBuilder();
                        wnote.Append("[");
                        for (int i = 0; i < index; i++)
                        {
                            var volume = results[i].Field<double?>(Volume);

                            series.DataPoints.AddDataPointForDoughnutSeries(fact.GetCell(0, 1 + i, 1, (volume != null ? Convert.ToDouble(results[i].Field<double>(Volume),
                                Culture) / (int)MagicNumbers.two : 0)));
                            value = volume != null ? Convert.ToInt32(results[i].Field<double>(Volume) * (int)MagicNumbers.hundred, Culture) : 0;
                            series.Labels[i].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                            series.Labels[i].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                            series.Labels[i].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = value + "%";
                            series.Labels[i].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                            series.Labels[i].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.White;
                            series.Labels[i].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eighteen;
                            series.Labels[i].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.True;
                            series.DataPoints[i].Format.Fill.FillType = FillType.Solid;
                            series.DataPoints[i].Format.Fill.SolidFillColor.Color = Color.FromArgb(Convert.ToInt32(colorList[i], Culture));
                            ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Occasion " + (i + 1))).TextFrame.Text = "";

                            //make i== 0 if total sample needs to be shown
                            unote.Append(i == -1 ? results[i].Field<int>(DBParameters.USampleSize).ToString(Culture) : "");
                            wnote.Append(i == -1 ? Convert.ToInt32(results[i].Field<double>(DBParameters.WSampleSize), Culture).ToString(Culture) : "");

                            GroupShape group = ((GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == "Group " + (i + 1))));
                            IChart chart_1 = (IChart)group.Shapes.FirstOrDefault(x => x.Name == "Chart " + (i + 1));
                            IChartDataWorkbook fact_1 = chart_1.ChartData.ChartDataWorkbook;
                            IChartSeries series_1 = chart_1.ChartData.Series[0];
                            IChartSeries series_2 = chart_1.ChartData.Series[1];
                            var totalVolume = results[i + index].Field<double?>(Volume);
                            IAutoShape shape = ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == Value + " " + (i + 1)));
                            shape.TextFrame.Text = totalVolume != null ? Convert.ToInt32(totalVolume * (int)MagicNumbers.hundred, Culture) + "%" : "0%";
                            series_1.DataPoints[0].Value.Data = totalVolume != null ? Convert.ToDouble(totalVolume, Culture) : 0;
                            if (series_2.DataPoints.Count > 0)
                            {
                                series_2.DataPoints[0].Value.Data = totalVolume != null ? (1 - Convert.ToDouble(totalVolume, Culture)) : 1;
                            }
                            else
                            {
                                series_2.DataPoints.AddDataPointForBarSeries(fact_1.GetCell(0, 1 + i, 1, (totalVolume != null ? (1 - Convert.ToDouble(totalVolume, Culture)) : 1)));
                            }
                            unote.Append((i != 0 ? " " : "") + results[i + index].Field<int>(DBParameters.USampleSize));
                            wnote.Append((i != 0 ? " " : "") + Convert.ToInt32(results[i + index].Field<double>(DBParameters.WSampleSize), Culture));

                        }
                        series.DataPoints.AddDataPointForDoughnutSeries(fact.GetCell(0, 1 + index, 1, 0.5));
                        series.DataPoints[index].Format.Fill.FillType = FillType.NoFill;
                        series.DataPoints[index].Format.Line.FillFormat.FillType = FillType.NoFill;
                        series.Labels[index].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                        series.Labels[index].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                        series.Labels[index].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = "vikash";
                        series.Labels[index].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.NoFill;
                        wnote.Append("]");
                        slide.NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[1].Text = unote.ToString();
                        slide.NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[(int)MagicNumbers.two].Text = wnote.ToString();
                        #endregion

                        #region binding slide 16
                        slide = pres.Slides[(int)MagicNumbers.fifteen];
                        GroupShape group_1 = ((GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == "Group 4")));
                        GroupShape group_2 = ((GroupShape)(group_1.Shapes.FirstOrDefault(x => x.Name == "Group 1")));
                        chart = (IChart)group_2.Shapes.FirstOrDefault(x => x.Name == "Chart 33");
                        fact = chart.ChartData.ChartDataWorkbook;
                        var inner = 0;
                        var outer = 0;
                        dtable = commonData.Tables[(int)MagicNumbers.two];
                        results = (from Row in dtable.AsEnumerable()
                                   where Row.Field<int>(DBParameters.ProfileOrder) == 1
                                   select Row).ToList();
                        foreach (var seriesItem in chart.ChartData.Series)
                        {
                            inner = 0;
                            foreach (var category in chart.ChartData.Categories)
                            {

                                var catName = "";
                                switch (category.Value.ToString().ToUpper(Culture))
                                {
                                    case "TOTAL POPULATION OF ADULTS, TEENS AND KIDS":
                                        catName = "ADULTS,TEENS & KIDS";
                                        break;
                                    case "ADULTS AGE 18-70":
                                        catName = "ADULT";
                                        break;
                                    case "TEENS AGE 13-17":
                                        catName = "TEEN";
                                        break;
                                    case "KIDS AGE 4-12":
                                        catName = "PARENT OF CHILD";
                                        break;
                                    default:
                                        catName = "";
                                        break;
                                }
                                var attriName = seriesItem.Name.ToString().ToUpper(Culture);
                                var record = results.Where(x => x.Field<string>(RespType).ToUpper(Culture) == catName &&
                                x.Field<string>("ATTRIBUTE").ToUpper(Culture) == attriName).ToList()[0];
                                if (outer == 0 && inner < (int)MagicNumbers.four)
                                {
                                    ((IAutoShape)group_2.Shapes.FirstOrDefault(x => x.Name == "Sample" + (inner + 1))).TextFrame.Text = "n = " + (record.Field<int?>(DBParameters.USampleSize) != null ?
                                        record.Field<int>(DBParameters.USampleSize) + " [" + Math.Round(record.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]" : "0[0]");
                                }
                                var cell = fact.GetCell(0, 1 + inner, 1 + outer, 0);
                                cell.PresetNumberFormat = CellNumberFormat;

                                seriesItem.DataPoints[inner].Value.Data = record.Field<double?>(Volume) != null ? record.Field<double>(Volume) : 0;
                                cell = record.Field<double?>(Volume) != null ? fact.GetCell(0, 1 + inner, 1 + outer, record.Field<double>(Volume)) : fact.GetCell(0, 1 + inner, 1 + outer, 0);

                                seriesItem.Labels.DefaultDataLabelFormat.ShowValue = true;
                                seriesItem.NumberFormatOfValues = "##0%";

                                seriesItem.Labels[inner].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                                seriesItem.Labels[inner].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                                seriesItem.Labels[inner].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text =
                                    Math.Round((Convert.ToDouble(cell.Value, Culture) * (int)MagicNumbers.hundred), 0, MidpointRounding.AwayFromZero) + "%";
                                seriesItem.Labels[inner].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                seriesItem.Labels[inner].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.White;
                                seriesItem.Labels[inner].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FontHeight = ChartFontHeight;

                                inner++;
                            }
                            outer++;
                        }

                        string[] chartList = new[] { "Chart 57", "Chart 58", "Chart 59", "Chart 60" };
                        string[] seriesList = new[] { "ADULTS,TEENS & KIDS", "ADULT", "TEEN", "PARENT OF CHILD" };
                        string[] occasionList = data.Select(x => x.Attribute).ToArray();
                        dtable = commonData.Tables[(int)MagicNumbers.two];
                        table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 47");
                        for (int k = 0; k < chartList.ToList().Count; k++)
                        {
                            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == chartList[k]);
                            chart.ChartData.ChartDataWorkbook.Clear(0);
                            fact = chart.ChartData.ChartDataWorkbook;
                            inner = 0;
                            outer = k;
                            results = (from Row in dtable.AsEnumerable()
                                       where Row.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.two &&
                                       Row.Field<string>(RespType).ToUpper(Culture) == seriesList[k]
                                       select Row).ToList();
                            inner = 0;
                            unote = new System.Text.StringBuilder();
                            wnote = new System.Text.StringBuilder();
                            wnote.Append("[");
                            foreach (var catItem in occasionList)
                            {
                                var attriName = catItem;
                                var record = results.Where(x => x.Field<string>(RespType).ToUpper(Culture) == seriesList[k].ToUpper(Culture)
                                && x.Field<string>("ATTRIBUTE").ToUpper(Culture) == attriName.ToUpper(Culture)).ToList()[0];
                                chart.ChartData.Series[0].DataPoints[inner].Value.Data = record.Field<double?>(Volume) != null ? record.Field<double>(Volume) : 0;
                                chart.ChartData.Series[1].DataPoints[inner].Value.Data = record.Field<double?>(Volume) != null ? (1 - record.Field<double>(Volume)) : 1;
                                var cell = fact.GetCell(0, 1 + inner, 1 + outer, record.Field<double?>(Volume) ?? 0);
                                chart.ChartData.Series[0].Labels.DefaultDataLabelFormat.ShowValue = false;
                                chart.ChartData.Series[1].Labels.DefaultDataLabelFormat.ShowValue = false;
                                table[outer + (int)MagicNumbers.two, inner + 1].TextFrame.Text = Math.Round((double)cell.Value * (int)MagicNumbers.hundred, 0, MidpointRounding.AwayFromZero) + "%";

                                unote.Append((inner != 0 ? " " : "") + record.Field<int>(DBParameters.USampleSize));
                                wnote.Append((inner != 0 ? " " : "") + Convert.ToInt32(record.Field<double>(DBParameters.WSampleSize), Culture));
                                inner++;
                            }

                            wnote.Append("]");
                            slide.NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[outer + (int)MagicNumbers.two * (outer + 1)].Text = unote.ToString();
                            slide.NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[outer + (int)MagicNumbers.two * (outer + 1) + 1].Text = wnote.ToString();
                        }
                        #endregion

                        #endregion

                        #region binding report specific slides
                        var initialslide = 17;
                        if (reportId == "1")//Occasion report
                        {
                            initialslide = (int)MagicNumbers.twenty;
                            results = (from Row in dtable.AsEnumerable()
                                       where Row.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.one && Row.Field<string>(RespType) == "Adults,Teens & Kids"
                                       select Row).ToList();
                            IChart chart1 = (IChart)pres.Slides[(int)MagicNumbers.nineteen].Shapes.FirstOrDefault(x => x.Name == "ColumnChart1");
                            series = chart1.ChartData.Series[0];
                            colorList = new string[chart1.ChartData.Categories.Count];
                            for (int i = 0; i < chart1.ChartData.Categories.Count; i++)
                            {
                                colorList[i] = series.DataPoints[i].Format.Fill.SolidFillColor.Color.ToArgb().ToString(Culture);
                            }
                            for (int i = 0; i < data.ToList().Count; i++)
                            {
                                if (i < data.ToList().Count)
                                {
                                    pres.Slides.InsertClone(initialslide, pres.Slides[(int)MagicNumbers.seventeen]);
                                    pres.Slides.InsertClone(initialslide + 1, pres.Slides[(int)MagicNumbers.eighteen]);
                                    pres.Slides.InsertClone(initialslide + (int)MagicNumbers.two, pres.Slides[(int)MagicNumbers.nineteen]);
                                }
                                var OccasionSizeBox = ((IAutoShape)pres.Slides[initialslide].Shapes.FirstOrDefault(x => x.Name == "OccasionSize")).TextFrame.Paragraphs[0].Portions[0];
                                var OccasionRecord = results.Where(x => x.Field<string>("ATTRIBUTE").ToUpper(Culture) == data[i].Attribute.ToUpper(Culture)).ToList()[0];
                                var occasionSize = OccasionRecord.Field<double>(Volume).ToString("0%", Culture);
                                DataSet occasionData = GetOccasionSlides(timeperiodId, marketId, data[i].AttributeID.ToString(Culture), benchmark, reportId, addtnl);
                                #region start slide
                                ((IAutoShape)pres.Slides[initialslide].Shapes.FirstOrDefault(x => x.Name == title4)).TextFrame.Text = data[i].Attribute.ToUpper(Culture);
                                OccasionSizeBox.Text = occasionSize.Replace("%", string.Empty);
                                initialslide = BindOccasionSlide1(pres, occasionData.Tables[0], initialslide);
                                #endregion

                                #region start slide + 1
                                ((IAutoShape)pres.Slides[initialslide].Shapes.FirstOrDefault(x => x.Name == title4)).TextFrame.Text = data[i].Attribute.ToUpper(Culture);
                                OccasionSizeBox = ((IAutoShape)pres.Slides[initialslide].Shapes.FirstOrDefault(x => x.Name == "OccasionSize")).TextFrame.Paragraphs[0].Portions[0];
                                OccasionSizeBox.Text = occasionSize.Replace("%", string.Empty);
                                initialslide = BindOccasionSlide2(pres, occasionData.Tables[1], initialslide);
                                #endregion

                                #region start slide + 2
                                ((IAutoShape)pres.Slides[initialslide].Shapes.FirstOrDefault(x => x.Name == title4)).TextFrame.Text = data[i].Attribute.ToUpper(Culture);
                                OccasionSizeBox = ((IAutoShape)pres.Slides[initialslide].Shapes.FirstOrDefault(x => x.Name == "OccasionSize")).TextFrame.Paragraphs[0].Portions[0];
                                OccasionSizeBox.Text = occasionSize.Replace("%", string.Empty);
                                initialslide = BindOccasionSlide3(pres, occasionData.Tables[(int)MagicNumbers.two], data[i].Attribute.ToUpper(Culture), initialslide, colorList);
                                #endregion
                            }
                            pres.Slides.RemoveAt((int)MagicNumbers.seventeen);
                            pres.Slides.RemoveAt((int)MagicNumbers.seventeen);
                            pres.Slides.RemoveAt((int)MagicNumbers.seventeen);
                        }
                        else if (reportId == "2" || reportId == "6")//Category Report
                        {
                            initialslide = (int)MagicNumbers.nineteen;
                            //IList<OccasionAttribute> categoryListData = GetCategoryList(timeperiodId, marketId, reportId);
                            DataSet categoryData = GetCategorySlides(timeperiodId, marketId, benchmark, reportId, addtnl);
                            string[] categoryListData = categoryData.Tables[0].AsEnumerable().Select(x => x.Field<String>("CategoryName")).Distinct().ToArray();
                            for (int i = 0; i < categoryListData.ToList().Count; i++)
                            {
                                System.Data.DataTable catTable0 = categoryData.Tables[0].AsEnumerable()
                                                .Where(x => x.Field<String>("CategoryName") == categoryListData[i]).CopyToDataTable();
                                System.Data.DataTable catTable1 = categoryData.Tables[1].AsEnumerable()
                                                .Where(x => x.Field<String>("CategoryName") == categoryListData[i]).CopyToDataTable();
                                System.Data.DataTable catTable2 = categoryData.Tables[2].AsEnumerable()
                                                .Where(x => x.Field<String>("CategoryName") == categoryListData[i]).CopyToDataTable();
                                if (i < categoryListData.ToList().Count)
                                {
                                    pres.Slides.InsertClone(initialslide, pres.Slides[(int)MagicNumbers.seventeen]);
                                    pres.Slides.InsertClone(initialslide + 1, pres.Slides[(int)MagicNumbers.eighteen]);
                                }
                                #region start slide
                            ((IAutoShape)pres.Slides[initialslide].Shapes.FirstOrDefault(x => x.Name == title4)).TextFrame.Paragraphs[0].Portions[0].Text =
                                categoryListData[i].ToUpper(Culture);
                                initialslide = BindCategorySlide1(pres, catTable0, catTable1, categoryListData[i], initialslide);
                                #endregion

                                #region start slide + 1
                                ((IAutoShape)pres.Slides[initialslide].Shapes.FirstOrDefault(x => x.Name == title4)).TextFrame.Paragraphs[0].Portions[0].Text =
                                    categoryListData[i].ToUpper(Culture);
                                initialslide = BindCategorySlide2(pres, catTable2, initialslide, occasionList);

                                #endregion
                            }
                            pres.Slides.RemoveAt((int)MagicNumbers.seventeen);
                            pres.Slides.RemoveAt((int)MagicNumbers.seventeen);
                        }
                        else if (reportId == "3" || reportId == "7")//Channel Report
                        {
                            DataSet ChannelData = GetKidsChannelSlides(timeperiodId, marketId, benchmark, reportId, addtnl);

                            #region channel binding
                            #region start slide
                            initialslide = BindChannelRetailerSlide(pres, ChannelData.Tables[0], ChannelData.Tables[1], initialslide, "00", false);
                            #endregion

                            #region start slide + 1
                            initialslide = BindChannelRetailerSlide(pres, ChannelData.Tables[0], ChannelData.Tables[(int)MagicNumbers.two], initialslide, "10", false);
                            #endregion

                            #region start slide + 1
                            initialslide = BindChannelRetailerSlide(pres, ChannelData.Tables[0], ChannelData.Tables[(int)MagicNumbers.three], initialslide, "20", false);
                            #endregion

                            var dataTable = (from Row in ChannelData.Tables[0].AsEnumerable()
                                             where Row.Field<string>(Header).ToUpper(Culture) == "CHANNEL SIZE"
                                             select Row).ToList();
                            var columnOrder = dataTable.Select(x => x.Field<string>(DBParameters.Attribute).ToUpper(Culture)).ToArray();
                            initialslide = BindChannelRetailerSlide2(pres, ChannelData.Tables[(int)MagicNumbers.four], columnOrder, initialslide, "30", false);
                            #endregion

                            #region retailer binding
                            dataTable = (from Row in ChannelData.Tables[(int)MagicNumbers.five].AsEnumerable()
                                         where Row.Field<string>(Header).ToUpper(Culture) == "RETAIL SIZE"
                                         select Row).ToList();

                            var channelList = dataTable.Select(x => x.Field<int>(ChannelSort)).Distinct().ToArray();
                            initialslide = initialslide + (int)MagicNumbers.five;
                            for (int i = 0; i < channelList.ToList().Count; i++)
                            {
                                if (i < channelList.ToList().Count)
                                {
                                    int ind = (int)MagicNumbers.twenty;
                                    pres.Slides.InsertClone(initialslide, pres.Slides[++ind]);
                                    pres.Slides.InsertClone(initialslide + 1, pres.Slides[++ind]);
                                    pres.Slides.InsertClone(initialslide + (int)MagicNumbers.two, pres.Slides[++ind]);
                                    pres.Slides.InsertClone(initialslide + (int)MagicNumbers.three, pres.Slides[++ind]);
                                    pres.Slides.InsertClone(initialslide + (int)MagicNumbers.four, pres.Slides[++ind]);
                                }
                                ((IAutoShape)pres.Slides[initialslide].Shapes.FirstOrDefault(x => x.Name == "Title 1")).TextFrame.Text =
                                    dataTable.Where(x => x.Field<int>(ChannelSort) == channelList[i]).Select(x => x.Field<string>("ChannelName")).Distinct().ToList()[0].ToUpper(Culture);
                                initialslide++;
                                #region start slide
                                initialslide = BindChannelRetailerSlide(pres, ChannelData.Tables[(int)MagicNumbers.five],
                                    ChannelData.Tables[(int)MagicNumbers.six], initialslide, "0" + channelList[i], true);
                                #endregion

                                #region start slide + 1
                                initialslide = BindChannelRetailerSlide(pres, ChannelData.Tables[(int)MagicNumbers.five],
                                    ChannelData.Tables[(int)MagicNumbers.seven], initialslide, "1" + channelList[i], true);
                                #endregion

                                #region start slide + 1
                                initialslide = BindChannelRetailerSlide(pres, ChannelData.Tables[(int)MagicNumbers.five],
                                    ChannelData.Tables[(int)MagicNumbers.eight], initialslide, "2" + channelList[i], true);
                                #endregion

                                columnOrder = dataTable.Where(x => x.Field<int>(ChannelSort) == channelList[i]).Select(x => x.Field<string>(DBParameters.Attribute).ToUpper(Culture)).ToArray();
                                initialslide = BindChannelRetailerSlide2(pres, ChannelData.Tables[(int)MagicNumbers.nine], columnOrder, initialslide, "3" + channelList[i], true);
                            }
                            pres.Slides.RemoveAt((int)MagicNumbers.twentyone);
                            pres.Slides.RemoveAt((int)MagicNumbers.twentyone);
                            pres.Slides.RemoveAt((int)MagicNumbers.twentyone);
                            pres.Slides.RemoveAt((int)MagicNumbers.twentyone);
                            pres.Slides.RemoveAt((int)MagicNumbers.twentyone);
                            #endregion

                        }
                        else if (reportId == "4")//OBPPC Report
                        {
                            var initialRow = 1;
                            int[] slideChangeIndex = new[] { 2, 4, 5, 7, 9, 11, 13 };
                            for (int i = 0; i < data.ToList().Count; i++)
                            {
                                DataSet obppcData = GetOccasionSlides(timeperiodId, marketId, data[i].AttributeID.ToString(Culture), benchmark, reportId, addtnl);
                                if (slideChangeIndex.Contains(i))
                                {
                                    initialRow = 1;
                                    initialslide++;
                                }
                                #region start slide
                                initialRow = BindObppcRow(pres, obppcData.Tables[0], initialslide, initialRow, i);
                                #endregion
                            }
                        }
                        else//Kids Report
                        {
                            DataSet KidsData = GetKidsChannelSlides(timeperiodId, marketId, benchmark, reportId, addtnl);

                            #region start slide
                            initialslide = BindKidsSlide1(pres, KidsData.Tables[0], KidsData.Tables[1], initialslide);
                            #endregion

                            #region start slide + 1
                            BindKidsSlide2(pres, KidsData.Tables[(int)MagicNumbers.two], initialslide);
                            #endregion
                        }
                        #endregion

                        #region add additional filters in all slides
                        AddingAdditionalFilter(addtnlName, pres);
                        #endregion
                    }
                }

                pptName = SaveFile(pres, name);

            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
            return pptName;
        }

        private static Dictionary<string, string> ReturnCellValue(IEnumerable<DataRow> list, string append)
        {
            Dictionary<string, string> obj = new Dictionary<string, string>();
            obj.Add("Value", "NA");
            obj.Add("ValueY", "NA");
            obj.Add("Value2Y", "NA");
            obj.Add("ChangeY", "");
            obj.Add("Change2Y", "");
            obj.Add("ColorY", Black);
            obj.Add("Color2Y", Black);
            obj.Add("ChangeY%", "NA");
            obj.Add("Change2Y%", "NA");
            obj.Add("Dollar Sales", "NA");
            obj.Add("Dollar SalesY", "NA");
            obj.Add("Dollar Sales2Y", "NA");
            obj.Add("ColorBG", "NA");
            obj.Add("ColorBGY", "NA");
            obj.Add("ColorBG2Y", "NA");


            for (int i = 0; i < (int)MagicNumbers.three; i++)
            {
                string appendText = i > 0 ? "Y" : "";
                if (i > 1)
                {
                    appendText = "2Y";
                }
                var group = list.Where(x => x.Field<int>("GroupId") == i).ToList();
                if (group.Count > 0)
                {
                    double? volume = group[0].Field<double?>("Volume");
                    if (volume != null)
                    {
                        if (append == "$" || append == "%")
                        {
                            obj["Value" + appendText] = Math.Round(volume ?? 0, 1, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                        }
                        else
                        {
                            obj["Value" + appendText] = Math.Round(volume ?? 0, 1, MidpointRounding.AwayFromZero).ToString("0.0", Culture);//AOPC with decimal
                            //obj["Value" + appendText] = Math.Round(volume ?? 0, 0, MidpointRounding.AwayFromZero).ToString(Culture);//AOPC without decimal
                        }
                    }

                    double? change = group[0].Field<double?>("Change");
                    if (change != null)
                    {
                        obj["Change" + appendText] = Math.Round(change ?? 0, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                        if (change < 0)
                        {
                            obj["Color" + appendText] = "Red";
                        }
                        obj["Change" + appendText + "%"] = Math.Round(GetChartValue(obj[Value + appendText]) == 0 ? 0 : ((GetChartValue(obj["Change" + appendText]) ?? 0) / (GetChartValue(obj[Value + appendText]) ?? 1)), 4, MidpointRounding.AwayFromZero).ToString("0.0000", Culture);
                    }
                    double? dollarSales = group[0].Table.Columns.Contains("DollarSales") ? group[0].Field<double?>("DollarSales") : null;
                    if (dollarSales != null)
                    {
                        obj["Dollar Sales" + appendText] = "$"+Math.Round(dollarSales ?? 0, 1, MidpointRounding.AwayFromZero).ToString("0.0", Culture)+"M";
                    }
                    string colorBG = group[0].Table.Columns.Contains("ColorCode") ? group[0].Field<string>("ColorCode"):null;
                    if(colorBG!="" && colorBG!=null && colorBG.Length != 0)
                    {
                        obj["ColorBG" + appendText] = group[0].Field<string>("ColorCode");
                    }

                }
            }
            return obj;
        }

        private static void BindSlide11TableBusinessReview(IDictionary<string, string> obj, IEnumerable<DataRow> list, ITable table, int i)
        {
            if (i == 0)
            {
                var label = list.Select(x => x.Field<string>("ColumnMetric")).ToList();
                table[i, 1].TextFrame.Text = label.Count > 0 ? label[0] : "NA";
                table[i, 2].TextFrame.Text = label.Count > 1 ? label[1] : "NA";
                table[i, 3].TextFrame.Text = label.Count > 2 ? label[2] : "NA";
            }
            table[i + 1, 1].TextFrame.Text = obj[Value];
            table[i + 1, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[i + 1, 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");

            table[i + 1, 2].TextFrame.Text = obj["ValueY"];
            table[i + 1, 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[i + 1, 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");
            table[i + 1, 4].TextFrame.Text = obj["ChangeY"];
            table[i + 1, 4].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[i + 1, 4].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                    Color.FromName(obj["ColorY"]);

            table[i + 1, 3].TextFrame.Text = obj["Value2Y"];
            table[i + 1, 3].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[i + 1, 3].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");
            table[i + 1, 5].TextFrame.Text = obj["Change2Y"];
            table[i + 1, 5].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[i + 1, 5].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                    Color.FromName(obj["Color2Y"]);
        }

        private static void BindSlide11ChartBusinessReview(IDictionary<string, string> obj, IChart chart, int i, IChartDataWorkbook fact, int sldNo)
        {
            var series = chart.ChartData.Series;
            if (i == 0)
            {
                string[] listOfTimeType = { "ANNUAL", "QUARTER", "ROLLING 4 QUARTER", "COVID QUARTER" };
                if (listOfTimeType.Contains(TimeperiodType))
                {
                    string label1 = "";
                    string label2 = "";
                    string label3 = "";
                    if (TimeperiodType == "ANNUAL")
                    {
                        label1 = (year - 2).ToString(); label2 = (year - 1).ToString(); label3 = (year).ToString();
                    }
                    else
                    {
                        string prevYearAppendValue = ""; string prev2YearAppendValue = "";
                        if (TimeperiodType == "COVID QUARTER")
                        {
                            prevYearAppendValue = TimeperiodAppendValue; prev2YearAppendValue = TimeperiodAppendValue;
                            if ((year - 2) <= 2019)
                            {
                                prev2YearAppendValue = "(Pre-COVID19)";
                            }
                            if ((year - 1) <= 2019)
                            {
                                prevYearAppendValue = "(Pre-COVID19)";
                            }
                        }
                        label1 = TimeperiodValue + " " + (year - 2) + prev2YearAppendValue;
                        label2 = TimeperiodValue + " " + (year - 1) + prevYearAppendValue;
                        label3 = TimeperiodValue + " " + (year) + TimeperiodAppendValue;
                    }
                    chart.ChartData.ChartDataWorkbook.GetCell(0, 0, 1, label1);
                    chart.ChartData.ChartDataWorkbook.GetCell(0, 0, 2, label2);
                    chart.ChartData.ChartDataWorkbook.GetCell(0, 0, 3, label3);
                }
                series[0].DataPoints.Clear();
                series[1].DataPoints.Clear();
                series[2].DataPoints.Clear();
                series[0].NumberFormatOfValues = "##0.0%";
                series[1].NumberFormatOfValues = "##0.0%";
                series[2].NumberFormatOfValues = "##0.0%";
                series[0].Labels.DefaultDataLabelFormat.ShowValue = false;
                series[1].Labels.DefaultDataLabelFormat.ShowValue = false;
                series[2].Labels.DefaultDataLabelFormat.ShowValue = true;
            }

            series[0].DataPoints.AddDataPointForBarSeries(fact.GetCell(0, 1 + i, 3, GetChartValue(obj["Value2Y"]) / ((new[] { 49, 50, 51, 52, 59, 60, 73, 74 }).Contains(sldNo) ? 100 : 1)));
            series[1].DataPoints.AddDataPointForBarSeries(fact.GetCell(0, 1 + i, 2, GetChartValue(obj["ValueY"]) / ((new[] { 49, 50, 51, 52, 59, 60, 73, 74 }).Contains(sldNo) ? 100 : 1)));
            series[2].DataPoints.AddDataPointForBarSeries(fact.GetCell(0, 1 + i, 1, GetChartValue(obj["Value"]) / ((new[] { 49, 50, 51, 52, 59, 60, 73, 74 }).Contains(sldNo) ? 100 : 1)));
        }

        private static void BindTable12BusinessReview(IDictionary<string, string> obj, ITable table, int row, int column, string rowMetric, int sNo, string append)
        {
            if ((column == (int)MagicNumbers.two || column == (int)MagicNumbers.one)&&changeHeadingDollar)
            {
                table[sNo == 12 || sNo == 18 || sNo == 80 ? 0 : 1, row].TextFrame.Paragraphs[0].Text = rowMetric;
            }

            table[column, row].TextFrame.Paragraphs[0].Text = (append == "$" ? (obj[Value] != "NA" ? append + obj[Value] : "") : (obj[Value] != "NA" ? obj[Value] + append : ""));
            table[column, row].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[column, row].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");

            int pNo = sNo == 18 ? 0 : 1;
            if (table[column, row].TextFrame.Paragraphs.Count > pNo)
            {
                table[column, row].TextFrame.Paragraphs[pNo].Text = "";
            }
            if (obj["ChangeY"] != "" && obj["Change2Y"] != "" && table[column, row].TextFrame.Paragraphs.Count > pNo)
            {
                table[column, row].TextFrame.Paragraphs[pNo].Portions.Add(new Portion());
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].Text = obj["ChangeY"];
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                        Color.FromName(obj["ColorY"]);
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                table[column, row].TextFrame.Paragraphs[pNo].Portions.Add(new Portion());
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].Text = "/";
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color =
                        Color.FromName("Black");
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                table[column, row].TextFrame.Paragraphs[pNo].Portions.Add(new Portion());
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].Text = obj["Change2Y"];
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].PortionFormat.FillFormat.SolidFillColor.Color =
                        Color.FromName(obj["Color2Y"]);
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");
            }
        }

        private static void BindTable67BusinessReview(IDictionary<string, string> obj, ITable table, int row, int column, string rowMetric, int sNo, bool isValue, bool isDollar,bool isColor,bool isChange)
        {

            if (isValue)
            {
                string PerValue = ((obj[Value] != "NA" ? obj[Value] + "%" : ""));
                PerValue += isDollar ? ";" : "";
                table[column, row].TextFrame.Paragraphs[0].Text = PerValue;
                table[column, row].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[column, row].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");
            }



            int DpNo = 1;

            if(isDollar && obj["Dollar Sales"]!= "" && table[column, row].TextFrame.Paragraphs.Count > DpNo)
            {
                table[column, row].TextFrame.Paragraphs[DpNo].Portions.Add(new Portion());
                table[column, row].TextFrame.Paragraphs[DpNo].Portions[0].Text = obj["Dollar Sales"];
                table[column, row].TextFrame.Paragraphs[DpNo].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                table[column, row].TextFrame.Paragraphs[DpNo].Portions[0].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");
                table[column, row].TextFrame.Paragraphs[DpNo].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");
            }
            if (isColor && obj["ColorBG"] != "")
            {
                table[column, row].FillFormat.FillType = FillType.Solid;
                table[column, row].FillFormat.SolidFillColor.Color = ColorTranslator.FromHtml(obj["ColorBG"]);

            }
            int pNo = 0;
            if (isChange && obj["ChangeY"] != "" && obj["Change2Y"] != "" && table[column, row].TextFrame.Paragraphs.Count > pNo)
            {
                table[column, row].TextFrame.Paragraphs[pNo].Portions.Add(new Portion());
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].Text = obj["ChangeY"];
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                        Color.FromName(obj["ColorY"]);
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[0].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                table[column, row].TextFrame.Paragraphs[pNo].Portions.Add(new Portion());
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].Text = "/";
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color =
                        Color.FromName("Black");
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[1].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                table[column, row].TextFrame.Paragraphs[pNo].Portions.Add(new Portion());
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].Text = obj["Change2Y"];
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].PortionFormat.FillFormat.SolidFillColor.Color =
                        Color.FromName(obj["Color2Y"]);
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                table[column, row].TextFrame.Paragraphs[pNo].Portions[2].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");
            }
        }

        private static void BindSlide13TableBusinessReview(IDictionary<string, string> obj, IEnumerable<DataRow> list, ITable table, int i, string append)
        {
            if (i == 0 && changeHeadingDollar)
            {
                var label = list.Select(x => x.Field<string>("ColumnMetric")).ToList();
                table[1, i].TextFrame.Text = label.Count > 0 ? label[0] : "NA";
                table[2, i].TextFrame.Text = label.Count > 1 ? label[1] : "NA";
                table[3, i].TextFrame.Text = label.Count > 2 ? label[2] : "NA";
            }

            if (i == 1)
            {
                int r = 0;
                var label = list.OrderByDescending(z => z.Field<string>("ColumnMetric")).Select(x => x.Field<string>("ColumnMetric")).ToList();
                table[1, r].TextFrame.Text = label.Count > 0 ? label[0] : "NA";
                table[2, r].TextFrame.Text = label.Count > 1 ? label[1] : "NA";
                table[3, r].TextFrame.Text = label.Count > 2 ? label[2] : "NA";
            }


            table[0, i + 1].TextFrame.Text = list.Select(x => x.Field<string>("RowMetric")).ToList()[0];

            table[1, i + 1].TextFrame.Text = obj[Value] + (obj[Value] != "NA" ? append : "");
            table[1, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[1, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");

            table[2, i + 1].TextFrame.Text = obj["ValueY"] + (obj["ValueY"] != "NA" ? append : "");
            table[2, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[2, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");
            table[4, i + 1].TextFrame.Text = obj["ChangeY"];
            table[4, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[4, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                    Color.FromName(obj["ColorY"]);

            table[3, i + 1].TextFrame.Text = obj["Value2Y"] + (obj["Value2Y"] != "NA" ? append : "");
            table[3, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[3, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");
            table[5, i + 1].TextFrame.Text = obj["Change2Y"];
            table[5, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[5, i + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                    Color.FromName(obj["Color2Y"]);
        }

        private static void Bind79Slide(IBaseSlide sld, string CategoryName, string BrandName, string KCategoryName, System.Data.DataTable slideDataNew, ITable table1, int SlideNum, string ManufactureName)
        {

            UpdateTitle(sld, 79, CategoryName, BrandName, KCategoryName, ManufactureName);
            if (slideDataNew.Rows.Count > 0)
            {
                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");

                var DistinctRows = slideDataNew.AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();
                var DistinctColumns = slideDataNew.AsEnumerable().Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();
                var append = "";
                int row = 0;

                for (int i = 0; i < DistinctRows.Count; i++)
                {

                    for (int j = 0; j < DistinctColumns.Count; j++)
                    {
                        var list = slideDataNew.AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric) && x.Field<string>("BrandName").ToLower() == BrandName.ToLower()
                            && x.Field<string>("ColumnMetric").Equals(DistinctColumns[j].ColumnMetric)).Distinct().ToList();
                        var obj = ReturnCellValue(list, append);
                        BindTable12BusinessReview(obj, table1, row + i + 1, j + 1, DistinctRows[i].RowMetric, 12, append);
                    }

                    if (DistinctRows[i].RowMetric.ToUpper(Culture) == "ADULTS")
                    {
                        append = "%";
                        row++;
                    }
                }

            }
        }
        private static void Bind80Slide(IBaseSlide sld, string CategoryName, string BrandName, string KCategoryName, System.Data.DataTable slideDataNew, ITable table1, ITable table2, int SlideNum, string ManufactureName, bool isItem=false)
        {

            UpdateTitle(sld, 80, CategoryName, BrandName, KCategoryName,ManufactureName);
            if (slideDataNew.Rows.Count > 0)
            {
                var append = " ";
                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                table2 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table2");
                var DistinctRows = slideDataNew.AsEnumerable().Where(x=>x.Field<int>("GroupSort")<6).Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();
                var DistinctRowsDemographics = slideDataNew.AsEnumerable().Where(x => x.Field<int>("GroupSort") > 5).OrderBy(x=>x.Field<int>("GroupSort")).Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();

                for (int i = 0; i < DistinctRows.Count; i++)
                {


                    if (DistinctRows[i].RowMetric.ToUpper(Culture).Contains("SHARE"))
                    {
                        append = "%";
                    }
                    else if (DistinctRows[i].RowMetric.ToUpper(Culture).Contains("DOL"))
                    {
                        append = "$";
                    }
                    else
                    {
                        append = " ";
                    }

                    var mainlist = slideDataNew.AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric) && x.Field<string>("Brand").ToLower() == BrandName.ToLower()).Distinct().ToList();
                    var mainlist2 = slideDataNew.AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRowsDemographics[i].RowMetric) && x.Field<string>("Brand").ToLower() == BrandName.ToLower()).Distinct().ToList();
                    var DistinctColumns = mainlist.Where(x => x.Field<int>("GroupSort") < 6).Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();
                    for (int j = 0; j < DistinctColumns.Count; j++)
                    {
                        var list = mainlist.Where(x => x.Field<string>("ColumnMetric") == DistinctColumns[j].ColumnMetric).ToList();
                        var obj = ReturnCellValue(list, append);
                        string rowMetric = isItem ? DistinctRows[i].RowMetric.Replace("Brand", "Item") : DistinctRows[i].RowMetric;
                        BindTable12BusinessReview(obj, table1, i + 1, j + 1, rowMetric, 80, append);
                    }
                    DistinctColumns = mainlist2.Where(x => x.Field<int>("GroupSort") > 5).Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();
                    for (int j = 0; j < DistinctColumns.Count; j++)
                    {
                        var list = mainlist2.Where(x => x.Field<string>("ColumnMetric") == DistinctColumns[j].ColumnMetric).ToList();
                        var obj = ReturnCellValue(list, append);
                        string rowMetric = isItem ? DistinctRowsDemographics[i].RowMetric.Replace("Brand", "Item") : DistinctRowsDemographics[i].RowMetric;
                        BindTable12BusinessReview(obj, table2, i + 1, j + 1, rowMetric, 80, append);
                    }
                }
            }

        }


        private static void Bind77Slide(IBaseSlide sld, string CategoryName, string BrandName, string KCategoryName, System.Data.DataTable slideDataNew, IChart chart1, IChartDataWorkbook fact1, int SlideNum,string ManufactureName)
        {

            UpdateTitle(sld, 77, CategoryName, BrandName, KCategoryName, ManufactureName);
            if (slideDataNew.Rows.Count > 0)
            {
                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                fact1 = chart1.ChartData.ChartDataWorkbook;

                var DistinctRows = slideDataNew.AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();
                var DistinctColumns = slideDataNew.AsEnumerable().Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();

                for (int i = 0; i < DistinctRows.Count; i++)
                {
                    var list = slideDataNew.AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric) && x.Field<string>("BrandName").ToLower() == BrandName.ToLower()).ToList();
                    var obj = ReturnCellValue(list, "");

                    BindSlide13ChartBusinessReview(obj, chart1, i, fact1, "Value", 0, 46, new string[] { });

                }


            }
        }


        private static void Bind78Slide(IBaseSlide sld, string CategoryName, string BrandName, string KCategoryName, System.Data.DataTable slideDataNew, ITable table1, IChart chart1, IChartDataWorkbook fact1, IChart chart2, IChartDataWorkbook fact2, int SlideNum, string ManufactureName)
        {

            UpdateTitle(sld, 78, CategoryName, BrandName, KCategoryName, ManufactureName);
            if (slideDataNew.Rows.Count > 0)
            {
                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                chart2 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart2");
                fact1 = chart1.ChartData.ChartDataWorkbook;
                fact2 = chart2.ChartData.ChartDataWorkbook;
                var DistinctRows = slideDataNew.AsEnumerable().Select(x => new { RowMetric = x.Field<string>("RowMetric") }).Distinct().ToList();
                //    var DistinctColumns = slideDataNew.AsEnumerable().Select(x => new { ColumnMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();
                var append = "";
                for (int i = 0; i < DistinctRows.Count; i++)
                {
                    var list = slideDataNew.AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric) && x.Field<string>("BrandName").ToLower() == BrandName.ToLower()).ToList();
                    var obj = ReturnCellValue(list, "");
                    BindSlide13TableBusinessReview(obj, list, table1, i, append);
                    chart1.ChartData.Categories[i].Value = DistinctRows[i].RowMetric;
                    chart2.ChartData.Categories[i].Value = DistinctRows[i].RowMetric;
                    BindSlide13ChartBusinessReview(obj, chart1, i, fact1, "ChangeY%", 0, 13, new string[] { });
                    BindSlide13ChartBusinessReview(obj, chart2, i, fact2, "Change2Y%", 0, 13, new string[] { });

                }


            }
        }
        private static void Bind75Slide(IBaseSlide sld, string CategoryName, string BrandName, string KCategoryName, System.Data.DataTable slideDataNew, int SlideNum,string ManufactureName)
        {

            UpdateTitle(sld, 75, CategoryName, BrandName, KCategoryName, ManufactureName);
            if (slideDataNew.Rows.Count > 0)
            {
                #region who eats
                BindWhoEatsSlide47(sld, slideDataNew.AsEnumerable().Where(x => x.Field<int>("GroupSort") == 1 && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion

                #region when
                BindWhenSlide47(sld, slideDataNew.AsEnumerable().Where(x => x.Field<int>("GroupSort") == 2 && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion

                #region activity
                BindActivitySlide47(sld, slideDataNew.AsEnumerable().Where(x => x.Field<int>("GroupSort") == 8 && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion

                #region motivations
                BindP_MSlide47(sld, slideDataNew.AsEnumerable().Where(x => (new[] { 3, 4 }).Contains(x.Field<int>("GroupSort")) && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion

                #region where
                BindWhereSlide47(sld, slideDataNew.AsEnumerable().Where(x => (new[] { 5, 6, 7 }).Contains(x.Field<int>("GroupSort")) && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion


            }
        }
        private static void Bind76Slide(IBaseSlide sld, string CategoryName, string BrandName, string KCategoryName, System.Data.DataTable slideDataNew, int SlideNum, string ManufactureName)
        {

            UpdateTitle(sld, 76, CategoryName, BrandName, KCategoryName, ManufactureName);
            if (slideDataNew.Rows.Count > 0)
            {
                #region who eats
                BindWhoEatsSlide47(sld, slideDataNew.AsEnumerable().Where(x => x.Field<int>("GroupSort") == 1 && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion

                #region when
                BindWhenSlide47(sld, slideDataNew.AsEnumerable().Where(x => x.Field<int>("GroupSort") == 2 && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion

                #region activity
                BindActivitySlide47(sld, slideDataNew.AsEnumerable().Where(x => x.Field<int>("GroupSort") == 8 && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion

                #region motivations
                BindP_MSlide47(sld, slideDataNew.AsEnumerable().Where(x => (new[] { 3, 4 }).Contains(x.Field<int>("GroupSort")) && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion

                #region where
                BindWhereSlide47(sld, slideDataNew.AsEnumerable().Where(x => (new[] { 5, 6, 7 }).Contains(x.Field<int>("GroupSort")) && x.Field<string>("ColumnMetric").ToLower() == BrandName.ToLower()).ToList());
                #endregion


            }
        }

        private static void Bind81Slide(IBaseSlide sld, string CategoryName, string BrandName, string KCategoryName, System.Data.DataTable slideDataNew, ITable table1, IChart chart1, IChartDataWorkbook fact1, List<DataRow> chartBrandData, double RetailValue, int SlideNum, string ManufactureName)
        {

            UpdateTitle(sld, 81, CategoryName, BrandName, KCategoryName, ManufactureName);
            if (slideDataNew.Rows.Count > 0)
            {
                table1 = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table1");
                chart1 = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                var textbox = (IAutoShape)sld.Shapes.FirstOrDefault(x => x.Name == "TextBox1");
                fact1 = chart1.ChartData.ChartDataWorkbook;

                var chartData = chartBrandData;
                var obj1 = ReturnCellValue(chartData.Where(x => x.Field<int>("GroupId") == 0 && x.Field<string>("ColumnMetric") == "Total"
                && x.Field<string>("RowMetric") == BrandName && x.Field<int>("GroupSort") == 2).ToList(), "%");

                if (textbox != null)
                {
                    textbox.TextFrame.Paragraphs[1].Text = obj1[Value] + (obj1[Value] != "NA" ? "% " : " ");
                }

                var DistinctRows = chartData.Where(x => x.Field<int>("GroupId") == 0 && x.Field<string>("ColumnMetric") != "Total" &&
                    x.Field<string>("RowMetric").ToLower(Culture) == BrandName.ToLower(Culture)).OrderByDescending(x => x.Field<double?>("Volume"))
                    .Select(x => new { RowMetric = x.Field<string>("ColumnMetric") }).Distinct().ToList();


                var series = chart1.ChartData.Series;
                string[] colorList = new string[series[0].DataPoints.Count];
                for (int j = 0; j < series[0].DataPoints.Count; j++)
                {
                    colorList[j] = series[0].DataPoints[j].Format.Fill.SolidFillColor.Color.ToArgb().ToString(Culture);
                }
                chart1.ChartData.Categories.Clear();

                for (int i = 0; i < DistinctRows.Count; i++)
                {
                    var list = slideDataNew.AsEnumerable().Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[i].RowMetric) &&
                                x.Field<string>("BrandName").ToLower() == BrandName.ToLower()).ToList();
                    var obj = ReturnCellValue(list, "%");
                    obj1 = ReturnCellValue(chartData.Where(x => x.Field<string>("ColumnMetric") == DistinctRows[i].RowMetric && x.Field<string>("RowMetric") == BrandName && x.Field<int>("GroupSort") == 2).ToList(), "%");
                    BindSlide14TableBusinessReview(obj1, DistinctRows[i].RowMetric, table1, i + 1);

                    obj = UpdateObj(list[0].Field<int>("SlideNumber"), obj, obj1, RetailValue);
                    chart1.ChartData.Categories.Add(fact1.GetCell(0, i + 1, 5, DistinctRows[i].RowMetric));
                    BindSlide13ChartBusinessReview(obj, chart1, i, fact1, "Value", 0, 14, colorList);

                }
            }
        }
        private static void BindSlide13ChartBusinessReview(IDictionary<string, string> obj, IChart chart, int i, IChartDataWorkbook fact, string key, int seriesNo, int refSlide, string[] colorList)
        {
            var series = chart.ChartData.Series;
            if (i == 0 && seriesNo == 0)
            {
                series[0].DataPoints.Clear();
                series[0].NumberFormatOfValues = "##0.0%";
                series[0].Labels.DefaultDataLabelFormat.ShowValue = false;

                if (series.Count > 1)
                {
                    series[1].DataPoints.Clear();
                    series[1].NumberFormatOfValues = "##0.0%";
                    series[1].Labels.DefaultDataLabelFormat.ShowValue = false;
                }
                if (series.Count > 2)
                {
                    series[2].DataPoints.Clear();
                    series[2].NumberFormatOfValues = "##0.0%";
                    series[2].Labels.DefaultDataLabelFormat.ShowValue = false;
                }
                if (refSlide != 46)
                {
                    series[0].Labels.DefaultDataLabelFormat.ShowValue = true;
                }
            }
            double? value = GetChartValue(obj[key]);
            if (refSlide == (int)MagicNumbers.fourteen)
            {
                double? change = GetChartValue(obj["ChangeY"]);
                string sldNo = "False";
                obj.TryGetValue("SldNo", out sldNo);
                if (sldNo != null && (new[] { "54", "64", "81" }).Contains(obj["SldNo"]))
                {
                    series[seriesNo].DataPoints.AddDataPointForBubbleSeries(fact.GetCell(0, 1 + i, 0, value), fact.GetCell(0, 1 + i, 1, change / 100), fact.GetCell(0, 1 + i, 2, value));
                }
                else
                {
                    series[seriesNo].DataPoints.AddDataPointForBubbleSeries(fact.GetCell(0, 1 + i, 0, value / 100), fact.GetCell(0, 1 + i, 1, change), fact.GetCell(0, 1 + i, 2, value / 100));
                }
                series[seriesNo].DataPoints[i].Format.Fill.FillType = FillType.Solid;
                series[seriesNo].DataPoints[i].Format.Fill.SolidFillColor.Color = Color.FromArgb(Convert.ToInt32(colorList[i], Culture));
                var paragraph = series[seriesNo].Labels[i].AsIOverridableText.TextFrameForOverriding.Paragraphs;
                paragraph.Add(new Paragraph());
                paragraph[0].Portions.Add(new Portion());
                if (sldNo != null && (new[] { "54", "64", "81" }).Contains(obj["SldNo"]))
                {
                    paragraph[0].Portions[0].Text = fact.GetCell(0, i + 1, 5).Value + ", " + change + "%, $" + value;
                }
                else
                {
                    paragraph[0].Portions[0].Text = fact.GetCell(0, i + 1, 5).Value + ", " + change + ", " + value + "%";
                }
                paragraph[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                paragraph[0].Portions[0].PortionFormat.LatinFont = new FontData("Arial (Body)");

            }

            else if (refSlide == (int)MagicNumbers.sixteen)
            {
                series[seriesNo].Labels.DefaultDataLabelFormat.ShowValue = true;
                series[seriesNo].DataPoints.AddDataPointForLineSeries(fact.GetCell(0, i + 1, seriesNo + 1, value));
            }
            else if (refSlide == 46)
            {
                if (i == 0)
                {
                    string[] listOfTimeType = { "ANNUAL", "QUARTER", "ROLLING 4 QUARTER", "COVID QUARTER" };
                    if (listOfTimeType.Contains(TimeperiodType))
                    {
                        string label1 = "";
                        string label2 = "";
                        string label3 = "";
                        if (TimeperiodType == "ANNUAL")
                        {
                            label1 = (year - 2).ToString(); label2 = (year - 1).ToString(); label3 = (year).ToString();
                        }
                        else
                        {
                            string prevYearAppendValue = ""; string prev2YearAppendValue = "";
                            if (TimeperiodType == "COVID QUARTER")
                            {
                                prevYearAppendValue = TimeperiodAppendValue; prev2YearAppendValue = TimeperiodAppendValue;
                                if ((year - 2) <= 2019)
                                {
                                    prev2YearAppendValue = "(Pre-COVID19)";
                                }
                                if ((year - 1) <= 2019)
                                {
                                    prevYearAppendValue = "(Pre-COVID19)";
                                }
                            }
                            label1 = TimeperiodValue + " " + (year - 2) + prev2YearAppendValue;
                            label2 = TimeperiodValue + " " + (year - 1) + prevYearAppendValue;
                            label3 = TimeperiodValue + " " + (year) + TimeperiodAppendValue;
                        }
                        chart.ChartData.ChartDataWorkbook.GetCell(0, 1, 0, label1);
                        chart.ChartData.ChartDataWorkbook.GetCell(0, 2, 0, label2);
                        chart.ChartData.ChartDataWorkbook.GetCell(0, 3, 0, label3);
                    }
                }
                series[2].DataPoints.AddDataPointForLineSeries(fact.GetCell(0, 3, i + 1, GetChartValue(obj["Value"])));
                series[1].DataPoints.AddDataPointForLineSeries(fact.GetCell(0, 2, i + 1, GetChartValue(obj["ValueY"])));
                series[0].DataPoints.AddDataPointForLineSeries(fact.GetCell(0, 1, i + 1, GetChartValue(obj["Value2Y"])));
            }
            else
            {

                series[seriesNo].DataPoints.AddDataPointForBarSeries(fact.GetCell(0, 1 + i, 1, value));
                series[seriesNo].DataPoints[i].Format.Fill.FillType = FillType.Solid;
                series[seriesNo].DataPoints[i].Format.Fill.SolidFillColor.Color = (value != null && value < 0 ? Color.FromName("Red") : Color.FromName("Black"));

            }
        }

        private static void BindSlide17ChartBusinessReview(IDictionary<string, string> obj, IChart chart, List<DataRow> column, IChartDataWorkbook fact)
        {

            var series = chart.ChartData.Series;
            string[] vYear = { "Value", "ValueY", "Value2Y" };

            for (int i = 0; i < 3; i++)
            {
                if (i == 0)
                {
                    string[] listOfTimeType = { "ANNUAL", "QUARTER", "ROLLING 4 QUARTER", "COVID QUARTER" };
                    if (listOfTimeType.Contains(TimeperiodType))
                    {
                        string label1 = "";
                        string label2 = "";
                        string label3 = "";
                        if (TimeperiodType == "ANNUAL")
                        {
                            label1 = (year).ToString(); label2 = (year - 1).ToString(); label3 = (year-2).ToString();
                        }
                        else
                        {
                            string prevYearAppendValue = ""; string prev2YearAppendValue = "";
                            if (TimeperiodType == "COVID QUARTER")
                            {
                                prevYearAppendValue = TimeperiodAppendValue; prev2YearAppendValue = TimeperiodAppendValue;
                                if ((year - 2) <= 2019)
                                {
                                    prev2YearAppendValue = "(Pre-COVID19)";
                                }
                                if ((year - 1) <= 2019)
                                {
                                    prevYearAppendValue = "(Pre-COVID19)";
                                }
                            }
                            label1 = TimeperiodValue + " " + (year) + TimeperiodAppendValue;
                            label2 = TimeperiodValue + " " + (year - 1) + prevYearAppendValue;
                            label3 = TimeperiodValue + " " + (year - 2) + prev2YearAppendValue;
                        }
                        chart.ChartData.ChartDataWorkbook.GetCell(0, 0, 1, label1);
                        chart.ChartData.ChartDataWorkbook.GetCell(0, 0, 2, label2);
                        chart.ChartData.ChartDataWorkbook.GetCell(0, 0, 3, label3);
                    }
                }
                series[i].DataPoints.Clear();

                series[i].NumberFormatOfValues = "##0.0";

                series[i].Labels.DefaultDataLabelFormat.ShowValue = true;

                series[i].DataPoints.AddDataPointForBarSeries(fact.GetCell(0, 1, 1 + i, (obj[vYear[i]])=="NA"?"0.0": (obj[vYear[i]])));

            }



        }

        private static void BindSlide18ChartBusinessReview(IDictionary<string, string> obj, IChart chart, int i, IChartDataWorkbook fact)
        {
            var series = chart.ChartData.Series;
            if (i == 0)
            {
                series[0].DataPoints.Clear();
                series[0].NumberFormatOfValues = "##0.0";
                series[0].Labels.DefaultDataLabelFormat.ShowValue = true;
                series[1].DataPoints.Clear();
                series[1].NumberFormatOfValues = "##0.0";
                series[1].Labels.DefaultDataLabelFormat.ShowValue = true;
            }
            series[0].DataPoints.AddDataPointForBarSeries(fact.GetCell(0, 1 + i, 1, GetChartValue(obj["ChangeY"])));
            series[1].DataPoints.AddDataPointForBarSeries(fact.GetCell(0, 1 + i, 2, GetChartValue(obj["Change2Y"])));

        }

        private static void BindSlide14TableBusinessReview(IDictionary<string, string> obj, string rowMetric, ITable table, int i)
        {
            table[1, i].TextFrame.Text = rowMetric;
            table[2, i].TextFrame.Text = obj[Value] + (obj[Value] != "NA" ? "%" : "");
            table[2, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[2, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName("Black");

            table[3, i].TextFrame.Text = obj["ChangeY"];
            table[3, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[3, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj["ColorY"]);

            table[4, i].TextFrame.Text = obj["Change2Y"];
            table[4, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[4, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj["Color2Y"]);
        }

        private static void BindWhoEatsSlide47(IBaseSlide sld, IList<DataRow> list)
        {
            string[] tablelist = { "Table11", "Table12", "Table13" };
            int count = 0;
            string[] DistinctRows = list.Select(x => x.Field<string>("RowMetric")).Distinct().ToArray();
            for (int i = 0; i < tablelist.Length; i++)
            {
                ITable table = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == tablelist[i]);
                for (int j = 0; j < table.Columns.Count; j++)
                {
                    var tempList = list.Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[count])).ToList();
                    var obj = ReturnCellValue(tempList, "%");
                    table[j, 0].TextFrame.Text = DistinctRows[count];
                    table[j, 1].TextFrame.Text = obj[Value] + (obj[Value] != "NA" ? "% " : " ");
                    if (obj["ChangeY"] != "" && obj["Change2Y"] != "")
                    {
                        table[j, 1].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        table[j, 1].TextFrame.Paragraphs[0].Portions[1].Text = obj["ChangeY"];
                        table[j, 1].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[j, 1].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["ColorY"]);
                        table[j, 1].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                        table[j, 1].TextFrame.Paragraphs[0].Portions[1].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        table[j, 1].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        table[j, 1].TextFrame.Paragraphs[0].Portions[2].Text = "/";
                        table[j, 1].TextFrame.Paragraphs[0].Portions[2].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[j, 1].TextFrame.Paragraphs[0].Portions[2].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName("Black");
                        table[j, 1].TextFrame.Paragraphs[0].Portions[2].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                        table[j, 1].TextFrame.Paragraphs[0].Portions[2].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        table[j, 1].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        table[j, 1].TextFrame.Paragraphs[0].Portions[3].Text = obj["Change2Y"];
                        table[j, 1].TextFrame.Paragraphs[0].Portions[3].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[j, 1].TextFrame.Paragraphs[0].Portions[3].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["Color2Y"]);
                        table[j, 1].TextFrame.Paragraphs[0].Portions[3].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                        table[j, 1].TextFrame.Paragraphs[0].Portions[3].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");
                    }
                    count++;
                }
            }
        }
        private static void BindWhenSlide47(IBaseSlide sld, IList<DataRow> list)
        {
            ITable table = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table21");
            int count = 0;
            string[] DistinctRows = list.Select(x => x.Field<string>("RowMetric")).Distinct().ToArray();
            var colCount = table.Columns.Count;
            for (int i = 0; i < 6; i = i + 2)
            {
                for (int j = 0; j < colCount - (i == 2 ? 1 : 0); j++)
                {
                    var tempList = list.Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[count])).ToList();
                    var obj = ReturnCellValue(tempList, "%");
                    table[j, i].TextFrame.Text = DistinctRows[count];
                    table[j, i + 1].TextFrame.Paragraphs[0].Text = obj[Value] + (obj[Value] != "NA" ? "% " : " ");
                    table[j, i + 1].TextFrame.Paragraphs[1].Text = "";
                    if (obj["ChangeY"] != "" && obj["Change2Y"] != "")
                    {
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions.Add(new Portion());
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[1].Text = obj["ChangeY"];
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["ColorY"]);
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[1].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        table[j, i + 1].TextFrame.Paragraphs[1].Portions.Add(new Portion());
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[2].Text = "/";
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[2].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[2].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName("Black");
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[2].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[2].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        table[j, i + 1].TextFrame.Paragraphs[1].Portions.Add(new Portion());
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[3].Text = obj["Change2Y"];
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[3].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[3].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["Color2Y"]);
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[3].PortionFormat.FontHeight = (int)MagicNumbers.seven;
                        table[j, i + 1].TextFrame.Paragraphs[1].Portions[3].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");
                    }
                    count++;
                }
            }
        }
        private static void BindActivitySlide47(IBaseSlide sld, IList<DataRow> list)
        {
            ITable table = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == "Table31");
            int count = 0;
            string[] DistinctRows = list.Select(x => x.Field<string>("RowMetric")).Distinct().ToArray();
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 4; j = j + 2)
                {
                    var tempList = list.Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[count])).ToList();
                    var obj = ReturnCellValue(tempList, "%");
                    table[j + 1, i].TextFrame.Text = DistinctRows[count];
                    count++;
                    IAutoShape oval = (IAutoShape)sld.Shapes.FirstOrDefault(x => x.Name == "Oval" + count);
                    if (obj["ChangeY"] != "" && obj["Change2Y"] != "")
                    {
                        oval.TextFrame.Paragraphs[0].Text = "";
                        oval.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        oval.TextFrame.Paragraphs[0].Portions[0].Text = obj["ChangeY"];
                        oval.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        oval.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["ColorY"]);
                        oval.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                        oval.TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        oval.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        oval.TextFrame.Paragraphs[0].Portions[1].Text = " /";
                        oval.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                        oval.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName("Black");
                        oval.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                        oval.TextFrame.Paragraphs[0].Portions[1].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        oval.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        oval.TextFrame.Paragraphs[0].Portions[2].Text = obj["Change2Y"];
                        oval.TextFrame.Paragraphs[0].Portions[2].PortionFormat.FillFormat.FillType = FillType.Solid;
                        oval.TextFrame.Paragraphs[0].Portions[2].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["Color2Y"]);
                        oval.TextFrame.Paragraphs[0].Portions[2].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                        oval.TextFrame.Paragraphs[0].Portions[2].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");
                    }
                    else
                    {
                        oval.TextFrame.Paragraphs[0].Text = "";
                        oval.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        oval.TextFrame.Paragraphs[0].Portions[0].Text = obj["ChangeY"]==""?"0.0": obj["ChangeY"];
                        oval.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        oval.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["ColorY"]);
                        oval.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                        oval.TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        oval.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        oval.TextFrame.Paragraphs[0].Portions[1].Text = " /";
                        oval.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                        oval.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName("Black");
                        oval.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                        oval.TextFrame.Paragraphs[0].Portions[1].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        oval.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        oval.TextFrame.Paragraphs[0].Portions[2].Text = obj["Change2Y"] == "" ? "0.0" : obj["Change2Y"];
                        oval.TextFrame.Paragraphs[0].Portions[2].PortionFormat.FillFormat.FillType = FillType.Solid;
                        oval.TextFrame.Paragraphs[0].Portions[2].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["Color2Y"]);
                        oval.TextFrame.Paragraphs[0].Portions[2].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                        oval.TextFrame.Paragraphs[0].Portions[2].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");
                    }
                }
            }
        }
        private static void BindP_MSlide47(IBaseSlide sld, IList<DataRow> list)
        {
            string[] tablelist = { "Table41", "Table51" };
            string[] chartlist = { "Chart41", "Chart51" };
            for (int i = 0; i < tablelist.Length; i++)
            {
                string[] DistinctRows = list.Where(x => x.Field<int>("GroupId") == 0 && x.Field<int>("GroupSort") == (3 + i))
                    .OrderByDescending(x => x.Field<double?>("Volume")).Select(x => x.Field<string>("RowMetric")).Take(6).ToArray();
                ITable table = (ITable)sld.Shapes.FirstOrDefault(x => x.Name == tablelist[i]);
                IChart chart = (IChart)sld.Shapes.FirstOrDefault(x => x.Name == chartlist[i]);
                var series = chart.ChartData.Series;
                var fact = chart.ChartData.ChartDataWorkbook;
                string[] colorList = new string[chart.ChartData.Categories.Count];
                for (int k = 0; k < chart.ChartData.Categories.Count; k++)
                {
                    colorList[k] = series[0].DataPoints[k].Format.Fill.SolidFillColor.Color.ToArgb().ToString(Culture);
                }
                series[0].DataPoints.Clear();
                for (int j = 0; j < 6; j++)
                {
                    var tempList = list.Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[j])).ToList();
                    var obj = ReturnCellValue(tempList, "%");
                    table[0, j + 1].TextFrame.Text = obj[Value] + (obj[Value] != "NA" ? "% " : " ");
                    table[1, j + 1].TextFrame.Paragraphs[0].Portions[0].Text = obj["ChangeY"];
                    table[1, j + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[1, j + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                            Color.FromName(obj["ColorY"]);
                    table[2, j + 1].TextFrame.Paragraphs[0].Portions[0].Text = obj["Change2Y"];
                    table[2, j + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[2, j + 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                            Color.FromName(obj["Color2Y"]);
                    series[0].DataPoints.AddDataPointForBarSeries(fact.GetCell(0, 1 + j, 1, GetChartValue(obj[Value]) / 100));
                    series[0].DataPoints[j].Format.Fill.FillType = FillType.Solid;
                    series[0].DataPoints[j].Format.Fill.SolidFillColor.Color = Color.FromArgb(Convert.ToInt32(colorList[j], Culture));
                    chart.ChartData.Categories[j].Value = DistinctRows[j];
                }
            }

        }
        private static void BindWhereSlide47(IBaseSlide sld, IList<DataRow> list)
        {
            for (int i = 0; i < (int)MagicNumbers.three; i++)
            {
                string[] DistinctRows = list.Where(x => x.Field<int>("GroupId") == 0 && x.Field<int>("GroupSort") == (5 + i))
                    .OrderByDescending(x => x.Field<double?>("Volume")).Select(x => x.Field<string>("RowMetric")).Take(6).ToArray();
                GroupShape group = ((Aspose.Slides.GroupShape)(sld.Shapes.FirstOrDefault(x => x.Name == "Group" + (i + 1))));
                IChart chart = (IChart)group.Shapes.FirstOrDefault(x => x.Name == "Chart1");
                IChartSeriesCollection series = null;
                IChartDataWorkbook fact = null;
                string[] colorList = new string[] { };
                if (chart != null)
                {
                    series = chart.ChartData.Series;
                    fact = chart.ChartData.ChartDataWorkbook;
                    colorList = new string[chart.ChartData.Categories.Count];
                    for (int k = 0; k < chart.ChartData.Categories.Count; k++)
                    {
                        colorList[k] = series[0].DataPoints[k].Format.Fill.SolidFillColor.Color.ToArgb().ToString(Culture);
                    }
                    series[0].DataPoints.Clear();
                }
                for (int j = 0; j < DistinctRows.Length; j++)
                {
                    var tempList = list.Where(x => x.Field<string>("RowMetric").Equals(DistinctRows[j])).ToList();
                    var obj = ReturnCellValue(tempList, "%");
                    IAutoShape title = (IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Title" + (j + 1));
                    title.TextFrame.Text = DistinctRows[j];
                    if (chart != null)
                    {
                        series[0].DataPoints.AddDataPointForDoughnutSeries(fact.GetCell(0, 1 + j, 1, GetChartValue(obj[Value]) / (int)MagicNumbers.hundred));
                        series[0].DataPoints[j].Format.Fill.FillType = FillType.Solid;
                        series[0].DataPoints[j].Format.Fill.SolidFillColor.Color = Color.FromArgb(Convert.ToInt32(colorList[j], Culture));
                        chart.ChartData.Categories[j].Value = DistinctRows[j];
                    }
                    IAutoShape value = (IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Value" + (j + 1));
                    value.TextFrame.Paragraphs[0].Text = obj[Value] + (obj[Value] != "NA" ? "% " : " ");
                    value.TextFrame.Paragraphs[1].Text = "";
                    if (obj["ChangeY"] != "" && obj["Change2Y"] != "")
                    {
                        value.TextFrame.Paragraphs[1].Portions.Add(new Portion());
                        value.TextFrame.Paragraphs[1].Portions[0].Text = obj["ChangeY"];
                        value.TextFrame.Paragraphs[1].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        value.TextFrame.Paragraphs[1].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["ColorY"]);
                        value.TextFrame.Paragraphs[1].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                        value.TextFrame.Paragraphs[1].Portions[0].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        value.TextFrame.Paragraphs[1].Portions.Add(new Portion());
                        value.TextFrame.Paragraphs[1].Portions[1].Text = " /";
                        value.TextFrame.Paragraphs[1].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                        value.TextFrame.Paragraphs[1].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName("Black");
                        value.TextFrame.Paragraphs[1].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                        value.TextFrame.Paragraphs[1].Portions[1].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");

                        value.TextFrame.Paragraphs[1].Portions.Add(new Portion());
                        value.TextFrame.Paragraphs[1].Portions[2].Text = obj["Change2Y"];
                        value.TextFrame.Paragraphs[1].Portions[2].PortionFormat.FillFormat.FillType = FillType.Solid;
                        value.TextFrame.Paragraphs[1].Portions[2].PortionFormat.FillFormat.SolidFillColor.Color =
                                Color.FromName(obj["Color2Y"]);
                        value.TextFrame.Paragraphs[1].Portions[2].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                        value.TextFrame.Paragraphs[1].Portions[2].PortionFormat.LatinFont = new FontData("Franklin Gothic Book");
                    }
                }
            }
        }

        private static void UpdateTitle(IBaseSlide sld, int sldNo, string CategoryName, string BrandName, string KCategoryName,string ManufactureName)
        {
            string name = "";
            if (sldNo > 45 && sldNo <= 57)
            {
                name = CategoryName;
            }
            else if (sldNo > 57 && sldNo < 67)
            {
                name = KCategoryName;
            }
            else if (sldNo > 67 && sldNo < 71)
            {
                name = ManufactureName;
            }
            else if (sldNo > 71 && sldNo < 77)
            {
                name = BrandName;
            }
            else if (sldNo == 77 || sldNo == 78 || sldNo == 79 || sldNo == 81)
            {
                name = BrandName;
            }
            else if (sldNo == 80)
            {
                name = BrandName;
            }
            else
            {
                name = "";
            }
            var title = (IAutoShape)sld.Shapes.FirstOrDefault(x => x.Name == "Title");
            if(title != null && sldNo > 67 && sldNo < 71)
            {
                title.TextFrame.Paragraphs[0].Text = title.TextFrame.Paragraphs[0].Text.Replace("<Competitive>", name);
            }
            if (title != null)
            {
                title.TextFrame.Paragraphs[0].Text = title.TextFrame.Paragraphs[0].Text.Replace("<Category>", name).Replace("<Brand>", name);
            }


        }
        private static double? GetChartValue(string value)
        {
            value = value.Replace("%", "").Replace("$", "").Replace(" ", "");
            if (value == "NA" || value == "" || value == " ")
            {
                return null;
            }
            return Convert.ToDouble(value, Culture);
        }

        private static Dictionary<string, string> UpdateObj(int sldNo, Dictionary<string, string> obj, Dictionary<string, string> catObj, double RetailValue)
        {
            if ((new[] { 54, 64, 81 }).Contains(sldNo))
            {
                string value = obj[Value];

                obj["ChangeY"] = catObj[Value];
                obj["Value"] = (((GetChartValue(value) ?? 0) * RetailValue) / (int)MagicNumbers.hundred).ToString(Culture);
                obj.Add("SldNo", sldNo.ToString(Culture));
            }
            return obj;
        }
        private static ITable RemoveExtraColumn(ITable table, string[] timeList)
        {
            float tblWidth = table.Width;
            int timeListLen = timeList.Length;
            int c = 8;
            while (c > timeListLen)
            {
                table.Columns.RemoveAt(timeListLen + 1, false);
                c--;
            }


            c = 7;
            while (c > timeListLen - 1)
            {
                if (timeListLen > 1)
                    table.Columns.RemoveAt(2 * timeListLen - 1, false);
                else
                    table.Columns.RemoveAt(timeListLen + 1, false);

                c--;
            }
            table.MergeCells(table[1, 0], table[timeListLen, 0], false);
            if (timeListLen > 1)
                table.MergeCells(table[timeListLen + 1, 0], table[2 * timeListLen - 1, 0], false);

            double colWidth = (tblWidth - table.Columns[0].Width) / (2 * timeListLen - 1);

            for (int j = 1; j <= timeListLen; j++)
            {
                table.Columns[j].Width = colWidth;
                table[j, 1].TextFrame.Text = timeList[j - 1];
                if (j != timeListLen)
                {
                    table.Columns[timeListLen + j].Width = colWidth;
                    table[timeListLen + j, 1].TextFrame.Text = timeList[j] + " vs. Prev. Quarter";
                }
            }

            return table;
        }

        private static void BindQuarterSlide(ITable table, DataSet quarterData, int tableIndex, string[] timeList, int slideNum, bool isAvgRequired)
        {
            int timeListLen = timeList.Length;
            var dataTable = (from Row in quarterData.Tables[tableIndex].AsEnumerable() select Row).ToList();

            var occasionList = dataTable.Select(x => x.Field<string>("RowMetricName")).Distinct().ToList();

            for (int i = 0; i < 15; i++)
            {

                //  table[0, i + 2].TextFrame.Text = occasionList[i];
                IEnumerable<DataRow> dataRow = null;
                if (dataTable.Count > 0)
                    dataRow = dataTable.Where(x => x.Field<string>("RowMetricName") == occasionList[i]);

                for (int k = 1; k <= timeListLen; k++)
                {
                    if (dataRow != null)
                    {
                        var obj = FormatTrendData(dataRow.Where(x => x.Field<string>("ColumnMetricName") == timeList[k - 1].TrimStart()).ToList()[0], isAvgRequired);

                        if (slideNum == (int)MagicNumbers.seventeen && (obj[Value] != "LS" && obj[Value] != "NA"))
                        {

                            var avg = dataRow.Where(x => x.Field<string>("ColumnMetricName") == timeList[k - 1].TrimStart()).Select(x => x.Field<double>("OccasionShare")).ToList()[0];
                            table[k, i + 2].TextFrame.Text = Math.Round(avg, (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture);

                        }
                        else
                        {
                            table[k, i + 2].TextFrame.Text = obj[Value];
                        }

                        if (k != 1)
                        {
                            table[k - 1 + timeListLen, i + 2].TextFrame.Text = obj[Change];
                            table[k - 1 + timeListLen, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                            table[k - 1 + timeListLen, i + 2].TextFrame.Paragraphs[0].ParagraphFormat.Alignment = TextAlignment.Center;
                            table[k - 1 + timeListLen, i + 2].TextAnchorType = TextAnchorType.Center;
                            table[k - 1 + timeListLen, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                        }
                        table[k, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[k, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                    }
                    else
                    {
                        table[k, i + 2].TextFrame.Text = "NA";
                    }

                    table[k, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;

                    table[k, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

                }

            }

        }

        private static void BindYearSlide(ITable table, DataSet yearData, int tableIndex, string[] timeList, int slideNum, bool isAvgRequired)
        {
            var dataTable = (from Row in yearData.Tables[tableIndex].AsEnumerable() select Row).ToList();
            var occasionList = dataTable.Select(x => x.Field<string>("RowMetricName")).ToList();

            for (int i = 0; i < 15; i++)
            {
                // table[0, i + 2].TextFrame.Text = occasionList[i];
                IEnumerable<DataRow> dataRow = null;
                if (dataTable.Count > 0)
                    dataRow = dataTable.Where(x => x.Field<string>("RowMetricName") == occasionList[i]);

                if (dataRow != null)
                {
                    var obj = FormatTrendData(dataRow.ToList()[0], isAvgRequired);

                    if (slideNum == (int)MagicNumbers.eighteen && (obj[Value] != "LS" && obj[Value] != "NA"))
                    {
                        table[1, i + 2].TextFrame.Text = Math.Round(dataRow.Select(x => x.Field<double>("OccasionShare")).ToList()[0], (int)MagicNumbers.two,
                                                                              MidpointRounding.AwayFromZero).ToString("0.00", Culture);
                    }
                    else
                    {
                        table[1, i + 2].TextFrame.Text = obj[Value];
                    }

                    table[2, i + 2].TextFrame.Text = obj[Change];
                    table[2, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                    table[2, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");
                    table[1, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[1, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                }
                else
                {
                    table[1, i + 2].TextFrame.Text = "NA";
                }

                table[1, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eleven;
                table[1, i + 2].TextFrame.Paragraphs[0].Portions[0].PortionFormat.LatinFont = new FontData("Calibri");

            }

        }

        private static Dictionary<string, string> GetDefaultObject()
        {
            Dictionary<string, string> obj = new Dictionary<string, string>();
            obj.Add(Value, "NA");
            obj.Add(Change, "");
            obj.Add(ColorClass, Black);
            return obj;
        }

        private static void AddingAdditionalFilter(string addtnlName, IPresentation pres)
        {
            for (int ind = 0; ind < pres.Slides.Count; ind++)
            {
                ISlide slide = pres.Slides[ind];
                var addtnlText = addtnlName == "" ? " " : " * ";
                if (ind == (int)MagicNumbers.zero || ind == (int)MagicNumbers.fourteen || ind == (int)MagicNumbers.fifteen)
                {
                    addtnlText = addtnlName;
                }
                var filterShape = slide.Shapes.Where(x => x.Name.Contains("Filter")).ToList();
                for (int k = 0; k < filterShape.Count; k++)
                {
                    ((IAutoShape)filterShape[k]).TextFrame.Text = Regex.Replace(((IAutoShape)filterShape[k]).TextFrame.Text, "<Additional Filter>", addtnlText);
                }
                if (ind != (int)MagicNumbers.fourteen && ind != (int)MagicNumbers.fifteen)
                {
                    slide.NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[1].Text = addtnlName;
                    if (addtnlName == "")
                    {
                        slide.NotesSlideManager.NotesSlide.NotesTextFrame.Text = addtnlName;
                    }
                }
            }
        }
        private static void GetMarketName(string marketName)
        {
            selectedMarket = marketName.Substring(1);
            isRegionSelected = Convert.ToBoolean(Convert.ToByte(marketName.Substring(0, 1), Culture));
        }

        private static string SaveFile(IPresentation pres, string name)
        {
            var dirName = HttpContext.Current.Session.SessionID;
            var context = HttpContext.Current;
            //Set License
            Aspose.Slides.License license = new Aspose.Slides.License();
            license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));
            string destFile = "";
            var fileName = name + "-" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Culture) + ".pptx";
            /*create the directory with session name*/
            if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
            {
                Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
            }
            Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));
            destFile = context.Server.MapPath(TempFilePath + dirName + PathDelimiter + fileName);
            pres.Save(destFile, Aspose.Slides.Export.SaveFormat.Pptx);
            return TempFilePath + dirName + PathDelimiter + fileName;
        }

        private static int BindOccasionSlide1(IPresentation pres, System.Data.DataTable dataTable, int initialslide)
        {
            ISlide slide = pres.Slides[initialslide];
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();
            var wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == 1).ToList();
            var chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == 1).ToList();
            #region when widget
            Aspose.Slides.GroupShape group = ((Aspose.Slides.GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == "Group 38")));
            Aspose.Slides.Charts.IChart chart = (Aspose.Slides.Charts.IChart)group.Shapes.FirstOrDefault(x => x.Name == "WhenRadial");
            IAutoShape shape;
            var series = chart.ChartData.Series[0];
            string[] colorList = new string[chart.ChartData.Categories.Count];
            for (int i = 0; i < chart.ChartData.Categories.Count; i++)
            {
                colorList[i] = series.DataPoints[i].Format.Fill.SolidFillColor.Color.ToArgb().ToString(Culture);
            }
            if (selectedMarket.Contains("North America") || (selectedMarket.Split(',').Length > 1 && selectedMarket.Contains("Canada")))
            {
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailableWhen")).Hidden = false;
                group.Hidden = true;
            }
            else
            {
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailableWhen")).Hidden = true;
                group.Hidden = false;
                var fact = chart.ChartData.ChartDataWorkbook;
                fact.Clear(0);
                chart.ChartData.Series.Clear();
                chart.ChartData.Categories.Clear();
                chart.ChartData.Series.Add(fact.GetCell(0, 0, 1, "Series 1"), chart.Type);
                series = chart.ChartData.Series[0];
                for (int i = 0; i < chartData.Count; i++)
                {
                    var obj = FormatCell(chartData[i], 0);
                    var record = chartData[i];
                    series.DataPoints.AddDataPointForDoughnutSeries(fact.GetCell(0, i + 1, 1, (obj[Value] == "LS" ? 0 : record.Field<double?>(Volume)) ?? 0));
                    fact.GetCell(0, i + 1, 1).CustomNumberFormat = "##0%";
                    series.DataPoints[i].Format.Fill.FillType = FillType.Solid;
                    series.DataPoints[i].Format.Fill.SolidFillColor.Color = Color.FromArgb(Convert.ToInt32(colorList[i], Culture));
                    chart.ChartData.Categories.Add(fact.GetCell(0, i + 1, 0, record.Field<string>(DBParameters.Attribute)));
                    chart.ChartData.Categories[i].Value = record.Field<string>(DBParameters.Attribute);
                    fact.GetCell(0, i + 1, 0).Value = record.Field<string>(DBParameters.Attribute);
                    shape = ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == Value + " " + (i + 1)));
                    ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Title " + (i + 1))).TextFrame.Text = chartData[i].Field<string>(DBParameters.Attribute);
                    shape.TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                    shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                    if (shape.TextFrame.Paragraphs[0].Portions.Count < (int)MagicNumbers.two)
                    {
                        shape.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                    }
                    shape.TextFrame.Paragraphs[0].Portions[1].Text = obj[Change] != "" ? "(" + obj[Change] + ")" : "";
                    shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                    ((IConnector)group.Shapes.FirstOrDefault(x => x.Name == "Straight Connector " + (i + 1))).Hidden = false;
                }
                if (chartData.Count < (int)MagicNumbers.three)
                {
                    ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Value 3")).TextFrame.Text = "";
                    ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Title 3")).TextFrame.Text = "";
                    ((IConnector)group.Shapes.FirstOrDefault(x => x.Name == "Straight Connector 3")).Hidden = true;
                    if (chartData.Count < (int)MagicNumbers.two)
                    {
                        ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Value 2")).TextFrame.Text = "";
                        ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Title 2")).TextFrame.Text = "";
                        ((IConnector)group.Shapes.FirstOrDefault(x => x.Name == "Straight Connector 2")).Hidden = true;
                    }
                }
            }
            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.two).ToList();
            string[] element = new[] { "Group 11", "Group 15" };
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                group = ((Aspose.Slides.GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == element[i])));
                chart = (Aspose.Slides.Charts.IChart)group.Shapes.FirstOrDefault(x => x.Name == "TriangleChart");
                ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Title")).TextFrame.Text = chartData[i].Field<string>(DBParameters.Attribute);
                chart.ChartData.Series[0].DataPoints[0].Value.Data = (obj[Value] == "LS" ? 0 : chartData[i].Field<double?>(Volume)) ?? 0;
                chart.ChartData.Series[1].DataPoints[0].Value.Data = chartData[i].Field<double?>(Volume) != null && obj[Value] != "LS" ? 1 - chartData[i].Field<double>(Volume) : 1;

                shape = ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == Value));
                shape.TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                shape.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                shape.TextFrame.Paragraphs[0].Portions[1].Text = obj[Change] != "" ? "\n(" + obj[Change] + ")" : "";
                shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.nine;
            }
            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.three).ToList();
            element = new[] { "Group 19", "Group 17" };
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                group = ((Aspose.Slides.GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == element[i])));
                shape = ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == Value));
                shape.TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                shape.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                shape.TextFrame.Paragraphs[0].Portions[1].Text = obj[Change] != "" ? "\n(" + obj[Change] + ")" : "";
                shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.nine;
            }
            #endregion            

            #region where widget
            wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == (int)MagicNumbers.two).ToList();
            ITable table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "WhereTable"));
            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "ColumnChart");
            for (int i = 0; i < chart.ChartData.Categories.Count; i++)
            {
                string catName = chart.ChartData.Categories[i].Value.ToString();
                if (wigdetData.FirstOrDefault(x => x.Field<string>(DBParameters.Attribute).ToUpper(Culture) == catName.ToUpper(Culture)) != null)
                {
                    var record = wigdetData.Where(x => x.Field<string>(DBParameters.Attribute).ToUpper(Culture) == catName.ToUpper(Culture)).ToList()[0];
                    var obj = FormatCell(record, 0);
                    chart.ChartData.Series[0].DataPoints[i].Value.Data = (obj[Value] == "LS" ? 0 : record.Field<double?>(Volume)) ?? 0;
                    table[0, i].TextFrame.Paragraphs[0].Portions[0].Text = catName;
                    table[1, i].TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                    table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                    table[1, i].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                    table[1, i].TextFrame.Paragraphs[0].Portions[1].Text = obj[Change] != "" ? "(" + obj[Change] + ")" : "";
                    table[1, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                    table[1, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[1, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                }
            }
            #endregion

            #region why widget
            wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == (int)MagicNumbers.three).ToList();
            table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "TotalOccasionTable"));
            chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "TotalOccasionChart");
            BindThisOccasionTotalChart(wigdetData, table, chart, "Why", slide);
            #endregion

            #region who with widget
            wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == (int)MagicNumbers.four).ToList();
            for (int i = 0; i < wigdetData.Count; i++)
            {
                chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "WhoWithChart" + (i + 1));
                var record = wigdetData[i];
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "WhoWithTitle" + (i + 1))).TextFrame.Text = record.Field<string>(DBParameters.Attribute);
                var obj = FormatCell(record, 0);
                var volume = record.Field<double?>(Volume);
                chart.ChartData.Series[0].DataPoints[0].Value.Data = (obj[Value] == "LS" ? 0 : volume) ?? 0;
                chart.ChartData.Series[1].DataPoints[0].Value.Data = volume != null && obj[Value] != "LS" ? 1 - volume : 1;

                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "WhoWithValue" + (i + 1)));
                shape.TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                shape.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                shape.TextFrame.Paragraphs[0].Portions[1].Text = obj[Change] != "" ? "\n(" + obj[Change] + ")" : "";
                shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
            }
            #endregion

            #region who widget
            wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == (int)MagicNumbers.five).ToList();
            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.seven).ToList();
            element = new[] { "Group 33", "Group 35" };
            for (int i = 0; i < chartData.Count; i++)
            {
                group = ((Aspose.Slides.GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == element[i])));
                chart = (Aspose.Slides.Charts.IChart)group.Shapes.FirstOrDefault(x => x.Name == "RadialChart");
                var obj = FormatCell(chartData[i], 0);
                var volume = chartData[i].Field<double?>(Volume);

                chart.ChartData.Series[0].DataPoints[0].Value.Data = (obj[Value] == "LS" ? 0 : volume) ?? 0;
                chart.ChartData.Series[0].DataPoints[1].Value.Data = volume != null && obj[Value] != "LS" ? 1 - volume : 1;

                shape = ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == Value));
                shape.TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                shape = ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Change"));
                shape.TextFrame.Paragraphs[0].Portions[0].Text = obj[Change] != "" ? "(" + obj[Change] + ")" : "";
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.eight;
            }

            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.eight).ToList();
            table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "GenerationTable"));
            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "StackChart");
            for (int i = 0; i < chartData.Count; i++)
            {
                var record = chartData[i];
                var obj = FormatCell(record, 0);
                chart.ChartData.Series[i].DataPoints[0].Value.Data = (obj[Value] == "LS" ? 0 : record.Field<double?>(Volume)) ?? 0;
                table[1, i].TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                table[1, i].TextFrame.Paragraphs[1].Portions[0].Text = obj[Change] != "" ? "(" + obj[Change] + ")" : "";
                table[1, i].TextFrame.Paragraphs[1].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
            }
            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.nine && x.Field<string>(DBParameters.Attribute) != "Average HH Income").ToList();
            table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "HHIncomeTable1"));
            for (int i = 0; i < (int)MagicNumbers.four; i++)
            {
                var record = chartData[i];
                var obj = FormatCell(record, 0);
                table[0, i].TextFrame.Text = ReturnIncomeName(record.Field<string>(DBParameters.Attribute));
                table[1, i].TextFrame.Paragraphs[0].Portions[0].Text = CurrencySymbol == "" ? "NA" : obj[Value];
                table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = CurrencySymbol == "" ? Color.Black : Color.FromName(obj[ColorClass]);
                table[1, i].TextFrame.Paragraphs[1].Portions[0].Text = CurrencySymbol == "" || obj[Change] == "" ? "" : "(" + obj[Change] + ")";
                table[1, i].TextFrame.Paragraphs[1].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
            }
            table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "HHIncomeTable2"));
            chartData = chartData.Skip((int)MagicNumbers.four).ToList();
            for (int i = 0; i < (int)MagicNumbers.four; i++)
            {
                if (chartData.Count >= i + 1)
                {
                    var record = chartData[i];
                    var obj = FormatCell(record, 0);
                    table[0, i].TextFrame.Text = ReturnIncomeName(record.Field<string>(DBParameters.Attribute));
                    table[1, i].TextFrame.Paragraphs[0].Portions[0].Text = CurrencySymbol == "" ? "NA" : obj[Value];
                    table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[1, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = CurrencySymbol == "" ? Color.Black : Color.FromName(obj[ColorClass]);
                    table[1, i].TextFrame.Paragraphs[1].Portions[0].Text = CurrencySymbol == "" || obj[Change] == "" ? "" : "(" + obj[Change] + ")";
                    table[1, i].TextFrame.Paragraphs[1].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                }
                else
                {
                    table[0, i].TextFrame.Text = "";
                    table[1, i].TextFrame.Text = "";
                }
            }
            var obj1 = FormatCell(wigdetData.Where(x => x.Field<int>("ProfileOrder") == (int)MagicNumbers.nine && x.Field<string>(DBParameters.Attribute) == "Average HH Income").ToList()[0], 0);
            shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "HHIncome"));
            shape.TextFrame.Text = obj1[Value];
            shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj1[ColorClass]);
            #endregion
            return initialslide + 1;
        }

        private static string ReturnIncomeName(string input)
        {
            input = input.Replace(",", string.Empty);
            string[] numbers = Regex.Split(input, @"\D+");
            foreach (string value in numbers)
            {
                if (!string.IsNullOrEmpty(value))
                {
                    double i = double.Parse(value, Culture);
                    input = input.Replace(i.ToString(Culture), Math.Round((i + 1) / (int)MagicNumbers.thousand, 1) + "K");
                }
            }
            return input;
        }
        private static void BindThisOccasionTotalChart(IList<DataRow> wigdetData, ITable table, IChart chart, string widgetName, ISlide slide)
        {
            if (widgetName != "Why" && (selectedMarket.Contains("North America") || (selectedMarket.Split(',').Length > 1 && selectedMarket.Contains("Canada"))))
            {
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailable" + widgetName)).Hidden = false;
                ((IPictureFrame)slide.Shapes.FirstOrDefault(x => x.Name == "Shadow1")).Hidden = true;
                ((IPictureFrame)slide.Shapes.FirstOrDefault(x => x.Name == "Shadow2")).Hidden = true;
                table.Hidden = true;
                chart.Hidden = true;
            }
            else
            {
                if (widgetName != "Why")
                {
                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailable" + widgetName)).Hidden = true;
                    ((IPictureFrame)slide.Shapes.FirstOrDefault(x => x.Name == "Shadow1")).Hidden = false;
                    ((IPictureFrame)slide.Shapes.FirstOrDefault(x => x.Name == "Shadow2")).Hidden = false;
                    table.Hidden = false;
                    chart.Hidden = false;
                }
                for (int i = 0; i < wigdetData.Count; i++)
                {
                    var record = wigdetData[i];
                    var obj = FormatCell(record, 0);
                    var objTotal = FormatTotalCell(record, 0);

                    chart.ChartData.Series[0].DataPoints[i].Value.Data = (obj[Value] == "LS" ? 0 : record.Field<double?>(Volume)) ?? 0;
                    chart.ChartData.Series[1].DataPoints[i].Value.Data = (objTotal[Value] == "LS" ? 0 : record.Field<double?>(DBParameters.VolumeTotal)) ?? 0;

                    for (int k = 0; k < (int)MagicNumbers.two; k++)
                    {
                        var objTemp = k == 0 ? obj : objTotal;

                        table[0, i].TextFrame.Text = widgetName != "Shopper Mission" ? record.Field<string>(DBParameters.Attribute) : GetTitle(record.Field<string>(DBParameters.Attribute));
                        table[(int)MagicNumbers.two + k, i].TextFrame.Paragraphs[0].Portions[0].Text = objTemp[Value];
                        table[(int)MagicNumbers.two + k, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[(int)MagicNumbers.two + k, i].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(objTemp[ColorClass]);
                        table[(int)MagicNumbers.two + k, i].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        table[(int)MagicNumbers.two + k, i].TextFrame.Paragraphs[0].Portions[1].Text = objTemp[Change] != "" ? "\n(" + objTemp[Change] + ")" : "";
                        table[(int)MagicNumbers.two + k, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                        table[(int)MagicNumbers.two + k, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[(int)MagicNumbers.two + k, i].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                    }
                }
                int n = table.Rows.Count - 1;
                while (n + 1 > wigdetData.Count)
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

        private static string GetTitle(string attribute)
        {
            string[] shopperList = { "HEALTHY REPLENISHMENT", "ROUTINE REPLENISHMENT", "GRAB & GO", "FAMILY ENJOYMENT", "SPONTANEOUS BUYING",
                "SPONTANEOUS DEAL", "PLANNED DEAL", "TREAT/REWARD FOR ME OR MY FAMILY", "SPECIFIC ACTIVITY" };
            string[] titleList = { "To buy a nutritious and healthy food with a specif…dient that I always like to have in stock at home",
                "To buy food that I always like to have in stock at home",
                "To buy food right away, while on the go",
                "To buy food that the whole family would eat. A foo…know my kids will eat and I can share with others",
                "I hadn’t planned to buy this item when I started s…hile shopping for other food saw something to try",
                "Saw this item on special offer / promotion and found such a good deal I decided to buy some",
                "To buy a product that I knew was on special offer/deal/sale",
                "To buy an item as a treat/ reward. Something that is indulgent and would cheer me/my family up",
                "To buy an item that could be used for a specific a… hike/biking, before/after/during exercise, etc.)"
            };
            int index = shopperList.ToList().FindIndex(e => e == attribute.ToUpper(Culture));
            if (index > -1)
            {
                return titleList[index];
            }
            return attribute;
        }
        private static int BindOccasionSlide2(IPresentation pres, System.Data.DataTable dataTable, int initialslide)
        {
            ISlide slide = pres.Slides[initialslide];
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();
            var wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == 1).ToList();
            var chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == 1).OrderByDescending(x => x.Field<double?>(Volume)).Take(5).ToList();
            string[] element = new[] { "Rectangle 31", "Rectangle 32", "Rectangle 33", "Rectangle 34", "Rectangle 35" };
            GroupShape group = ((GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == "Group 15")));
            IChart chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "SquareChart");
            IAutoShape shape;
            ITable table;
            #region what widget
            for (int i = 0; i < chartData.Count; i++)
            {
                var record = chartData[i];
                var obj = FormatCell(record, 0);
                var objTotal = FormatTotalCell(record, 0);
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == element[i])).TextFrame.Text = record.Field<string>(DBParameters.Attribute);

                chart.ChartData.Series[0].DataPoints[i].Value.Data = (obj[Value] == "LS" ? 0 : record.Field<double?>(Volume)) ?? 0;
                chart.ChartData.Series[1].DataPoints[i].Value.Data = record.Field<double?>(Volume) != null && obj[Value] != "LS" ? 1 - record.Field<double?>(Volume) : 1;

                for (int k = 0; k < (int)MagicNumbers.two; k++)
                {
                    var objTemp = k == 0 ? obj : objTotal;
                    shape = (IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Cell" + k + (i + 1));
                    shape.TextFrame.Paragraphs[0].Portions[0].Text = objTemp[Value];
                    shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(objTemp[ColorClass]);
                    shape.TextFrame.Paragraphs[0].Portions[1].Text = objTemp[Change] != "" ? " (" + objTemp[Change] + ")" : "";
                }
            }

            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.two).OrderByDescending(x => x.Field<double?>(Volume)).Take((int)MagicNumbers.five).ToList();
            element = new[] { "Rectangle 106", "Rectangle 107", "Rectangle 108", "Rectangle 109", "Rectangle 110" };
            group = ((GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == "Group 16")));
            chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "ColumnChartBrands");
            for (int i = 0; i < chartData.Count; i++)
            {
                var record = chartData[i];
                var obj = FormatCell(record, 0);
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == element[i]));
                shape.TextFrame.Text = record.Field<string>(DBParameters.Attribute);

                chart.ChartData.Series[0].DataPoints[i].Value.Data = (obj[Value] == "LS" ? 0 : record.Field<double?>(Volume)) ?? 0;
                chart.ChartData.Series[1].DataPoints[i].Value.Data = record.Field<double?>(Volume) != null && obj[Value] != "LS" ? 1 - record.Field<double?>(Volume) : 1;

                shape = (IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "Rectangle 11" + (i + 1));
                shape.TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                shape.TextFrame.Paragraphs[0].Portions[1].Text = obj[Change] != "" ? " (" + obj[Change] + ")" : "";
            }

            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.three).ToList();
            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "ConsumptionChart");
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                chart.ChartData.Series[0].DataPoints[i].Value.Data = obj[Value] == "LS" ? 0 : chartData[i].Field<double?>(Volume);
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "ConsumptionValue"));
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "ConsumptionTitle")).TextFrame.Paragraphs[i].Portions[0].Text = chartData[i].Field<string>(DBParameters.Attribute);
                shape.TextFrame.Paragraphs[i].Portions[0].Text = obj[Value];
                shape.TextFrame.Paragraphs[i].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[i].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                shape.TextFrame.Paragraphs[i].Portions[1].Text = obj[Change] != "" ? " (" + obj[Change] + ")" : "";
            }
            chart.ChartData.Series[0].DataPoints[chartData.Count].Value.Data = chart.ChartData.Series[0].DataPoints[0].Value.Data;
            chart.ChartData.Series[0].DataPoints[chartData.Count + 1].Value.Data = chart.ChartData.Series[0].DataPoints[1].Value.Data;

            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.nine).ToList();
            shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Kelloggs Share"));
            if (chartData.Count > 0)
            {
                var obj1 = FormatCell(chartData[0], 0);
                shape.TextFrame.Paragraphs[0].Portions[0].Text = obj1[Value];
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj1[ColorClass]);
                shape.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                shape.TextFrame.Paragraphs[0].Portions[1].Text = obj1[Change] != "" ? " (" + obj1[Change] + ")" : "";
                shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.nine;
            }

            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.eight).ToList();
            if (chartData.Count > 0)
            {
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Average Items per Occasion"));
                var obj1 = FormatCell(chartData[0], 0);
                shape.TextFrame.Paragraphs[0].Portions[0].Text = obj1[Value];
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj1[ColorClass]);
                shape.TextFrame.Paragraphs[0].Portions.Add(new Portion());
                shape.TextFrame.Paragraphs[0].Portions[1].Text = obj1[Change] != "" ? " (" + obj1[Change] + ")" : "";
                shape.TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.nine;
            }
            #endregion

            #region purchase widget
            wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == (int)MagicNumbers.three).ToList();
            group = ((GroupShape)(slide.Shapes.FirstOrDefault(x => x.Name == "Group 116")));
            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.seven).ToList();
            chart = (Aspose.Slides.Charts.IChart)group.Shapes.FirstOrDefault(x => x.Name == "PurchaserChart");
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                chart.ChartData.Series[0].DataPoints[i].Value.Data = obj[Value] == "LS" ? 0 : chartData[i].Field<double?>(Volume);
                shape = ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "PurchaserValue"));
                ((IAutoShape)group.Shapes.FirstOrDefault(x => x.Name == "PurchaserTitle")).TextFrame.Paragraphs[i].Portions[0].Text = chartData[i].Field<string>(DBParameters.Attribute);
                shape.TextFrame.Paragraphs[i].Portions[0].Text = obj[Value];
                shape.TextFrame.Paragraphs[i].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[i].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                shape.TextFrame.Paragraphs[i].Portions[1].Text = obj[Change] != "" ? " (" + obj[Change] + ")" : "";
            }
            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.five).OrderByDescending(x => x.Field<double?>(Volume)).ToList();
            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "PackageTypeChart");
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                chart.ChartData.Series[0].DataPoints[i].Value.Data = obj[Value] == "LS" ? 0 : chartData[i].Field<double?>(Volume);
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "PackageTypeValue" + (i + 1)));
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "PackageTypeTitle" + (i + 1))).TextFrame.Text = chartData[i].Field<string>(DBParameters.Attribute);
                shape.TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                shape.TextFrame.Paragraphs[0].Portions[1].Text = obj[Change] != "" ? " (" + obj[Change] + ")" : "";
                if (shape.TextFrame.Paragraphs[0].Portions.Count > (int)MagicNumbers.two)
                {
                    shape.TextFrame.Paragraphs[0].Portions.RemoveAt((int)MagicNumbers.two);
                }
            }
            chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == (int)MagicNumbers.six).OrderByDescending(x => x.Field<double?>(Volume)).ToList();
            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "ChannelChart");
            for (int i = 0; i < chartData.Count; i++)
            {
                var obj = FormatCell(chartData[i], 0);
                chart.ChartData.Series[0].DataPoints[i].Value.Data = obj[Value] == "LS" ? 0 : chartData[i].Field<double?>(Volume);
                shape = ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "ChannelValue"));
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "ChannelTitle")).TextFrame.Paragraphs[i].Portions[0].Text = chartData[i].Field<string>(DBParameters.Attribute);
                shape.TextFrame.Paragraphs[i].Portions[0].Text = obj[Value];
                shape.TextFrame.Paragraphs[i].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                shape.TextFrame.Paragraphs[i].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                shape.TextFrame.Paragraphs[i].Portions[1].Text = obj[Change] != "" ? " (" + obj[Change] + ")" : "";
            }
            #endregion

            #region activities widget
            wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == (int)MagicNumbers.two).OrderByDescending(x => x.Field<double?>(Volume)).ToList();
            table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "TotalOccasionTable"));
            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "TotalOccasionChart");
            BindThisOccasionTotalChart(wigdetData, table, chart, "Activities", slide);
            #endregion
            return initialslide + 1;
        }
        private static int BindOccasionSlide3(IPresentation pres, System.Data.DataTable dataTable, string occasionName, int initialslide, string[] colorList)
        {

            ISlide slide = pres.Slides[initialslide];
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();
            var wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == 1 || x.Field<int>(DBParameters.GroupId) == 3).ToList();
            IChart chart = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "Chart 66");
            ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "OccasionName")).TextFrame.Text = occasionName;
            var fact = chart.ChartData.ChartDataWorkbook;
            int[] topList = new[] { 7, 3, 2, 2, 0, 0 };
            double totalSum = 0;
            double occasionSum = 0;
            var chartData = wigdetData.Where(x => x.Field<int>(DBParameters.ProfileOrder) == 6).OrderByDescending(x => x.Field<double?>(Volume)).Take(5).ToList();
            for (int i = 0; i < chartData.Count; i++)
            {
                var record = chartData[i];
                var obj = FormatCell(record, 0);
                var obj1 = FormatTotalCell(record, 0);
                var series = chart.ChartData.Series[chartData.Count - i];
                var channelName = record.Field<string>(DBParameters.Attribute);
                fact.GetCell(0, 0, i + 1).Value = channelName;
                series.DataPoints[0].Value.Data = (obj1[Value] == "LS" ? 0 : record.Field<double?>(DBParameters.VolumeTotal)) ?? 0;
                series.DataPoints[1].Value.Data = (obj[Value] == "LS" ? 0 : record.Field<double?>(DBParameters.Volumes)) ?? 0;
                totalSum += (obj1[Value] == "LS" ? 0 : record.Field<double?>(DBParameters.VolumeTotal)) ?? 0;
                occasionSum += (obj[Value] == "LS" ? 0 : record.Field<double?>(DBParameters.Volumes)) ?? 0;
                for (int k = 0; k < (int)MagicNumbers.two; k++)
                {
                    var objTemp = k == 0 ? obj1 : obj;
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = objTemp[Value];
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(objTemp[ColorClass]);
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].Text = objTemp[Change] == "" ? "" : "(" + objTemp[Change] + ")";
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                    series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                    if (series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs.Count > 1)
                    {
                        series.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[1].Text = "";
                    }
                }
                series.Labels.DefaultDataLabelFormat.TextFormat.TextBlockFormat.WrapText = NullableBool.False;
                ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "Channel" + (i + 1))).TextFrame.Text = channelName.ToUpper(Culture);
                if (i < (int)MagicNumbers.four)
                {
                    IChart chart1 = (IChart)slide.Shapes.FirstOrDefault(x => x.Name == "ColumnChart" + (i + 1));
                    var chartData1 = wigdetData.Where(x => x.Field<string>("MetricParentName") == record.Field<string>(DBParameters.MetricName)).ToList();
                    chartData1 = chartData1.OrderByDescending(x => x.Field<double?>(Volume)).Take(chartData1.Count < topList[i] ? chartData1.Count : topList[i]).ToList();
                    var fact1 = chart1.ChartData.ChartDataWorkbook;
                    fact1.Clear(0);
                    chart1.ChartData.Series.Clear();
                    chart1.ChartData.Categories.Clear();
                    if (chartData1.Count > 0)
                    {
                        chart1.ChartData.Series.Add(fact1.GetCell(0, 0, 1, "Series 1"), chart1.Type);
                    }
                    for (int j = 0; j < chartData1.Count; j++)
                    {
                        record = chartData1[j];
                        obj = FormatCell(record, 0);
                        series = chart1.ChartData.Series[0];
                        series.DataPoints.AddDataPointForBarSeries(fact1.GetCell(0, j + 1, 1, (obj[Value] == "LS" ? 0 : record.Field<double?>(Volume)) ?? 0));
                        series.DataPoints[j].Format.Fill.FillType = FillType.Solid;
                        series.DataPoints[j].Format.Fill.SolidFillColor.Color = Color.FromArgb(Convert.ToInt32(colorList[j], Culture));
                        chart1.ChartData.Categories.Add(fact1.GetCell(0, j + 1, 0, record.Field<string>(DBParameters.Attribute)));
                        chart1.ChartData.Categories[j].Value = record.Field<string>(DBParameters.Attribute);
                        fact1.GetCell(0, j + 1, 0).Value = record.Field<string>(DBParameters.Attribute);
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = obj[Value];
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.nine;
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].Text = obj[Change] == "" ? "" : "(" + obj[Change] + ")";
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                        series.Labels[j].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.eight;
                    }
                }
            }
            var series1 = chart.ChartData.Series[0];
            fact.GetCell(0, 0, (int)MagicNumbers.six).Value = "Other";
            chart.ChartData.Categories[0].Value = Total;
            chart.ChartData.Categories[1].Value = occasionName;
            series1.DataPoints[0].Value.Data = 1 - Math.Round(totalSum, (int)MagicNumbers.two, MidpointRounding.AwayFromZero);
            series1.DataPoints[1].Value.Data = 1 - Math.Round(occasionSum, (int)MagicNumbers.two, MidpointRounding.AwayFromZero);
            for (int k = 0; k < (int)MagicNumbers.two; k++)
            {
                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text =
                    Math.Round(Convert.ToDouble(series1.DataPoints[k].Value.Data, Culture) * (int)MagicNumbers.hundred, 0, MidpointRounding.AwayFromZero) + "%";
                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                series1.Labels[k].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
            }

            #region shopper mission widget
            wigdetData = data.Where(x => x.Field<int>(DBParameters.GroupId) == (int)MagicNumbers.two).OrderByDescending(x => x.Field<double?>(Volume)).ToList();
            wigdetData = wigdetData.Take((int)MagicNumbers.nine).ToList();
            var table = ((ITable)slide.Shapes.FirstOrDefault(x => x.Name == "TotalOccasionTable"));
            chart = (Aspose.Slides.Charts.IChart)slide.Shapes.FirstOrDefault(x => x.Name == "TotalOccasionChart");
            BindThisOccasionTotalChart(wigdetData, table, chart, "Shopper Mission", slide);
            #endregion
            return initialslide + 1;
        }
        private static int BindCategorySlide1(IPresentation pres, System.Data.DataTable dataTable, System.Data.DataTable brandTable, string categoryName, int initialslide)
        {
            ISlide slide = pres.Slides[initialslide];
            var BrandTable = (from Row in brandTable.AsEnumerable()
                              select Row).ToList();
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();

            string[] occasionList = BrandTable.Select(x => x.Field<string>(DBParameters.Attribute)).Distinct().ToArray();
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Table 68");
            int colIndex;
            int rowIndex = 1;
            string[] rowList = new[] { "OCCASION SIZE", "OCCASION SIZE WITHIN CATEGORY", "CATEGORY SIZE WITHIN OCCASION" };

            for (int j = 0; j < rowList.ToList().Count; j++)
            {
                var topOccasions = data.Where(x => x.Field<string>(Header).ToUpper(Culture) == rowList[j]).ToList();
                colIndex = (int)MagicNumbers.two;
                for (int i = 0; i < topOccasions.Count; i++)
                {
                    var record = topOccasions[i];
                    var obj = FormatCell(record, 0);
                    int index = 0;
                    if (j == (int)MagicNumbers.two)
                    {
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].Text = record.Field<int?>(DBParameters.USampleSize) != null ?
                            record.Field<int>(DBParameters.USampleSize) + " [" + Math.Round(record.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]" : sampleNA;

                        index = 1;
                        table[colIndex, rowIndex + (int)MagicNumbers.two].TextFrame.Paragraphs[0].Portions[0].Text = record.Field<Int64>("Rank").ToString(Culture);
                        if (colIndex == (int)MagicNumbers.two)
                        {
                            table[colIndex - 1, rowIndex + (int)MagicNumbers.two].TextFrame.Text = categoryName;
                        }
                    }
                    if (colIndex == (int)MagicNumbers.two && j < (int)MagicNumbers.two)
                    {
                        table[colIndex - 1, rowIndex + index].TextFrame.Paragraphs[(int)MagicNumbers.two].Text = "n= " + (record.Field<int?>(DBParameters.USampleSize) != null ?
                            record.Field<int>(DBParameters.USampleSize) + " [" + Math.Round(record.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]" : sampleNA);
                    }
                    table[colIndex, rowIndex + index].TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                    table[colIndex, rowIndex + index].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[colIndex, rowIndex + index].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                    table[colIndex, rowIndex + index].TextFrame.Paragraphs[1].Portions[0].Text = obj[Change] != "" ? "(" + obj[Change] + ")" : "";
                    colIndex++;
                }
                rowIndex++;
            }

            colIndex = (int)MagicNumbers.two;
            foreach (string occasion in occasionList)
            {
                string[] brandList = BrandTable.Where(x => x.Field<string>(DBParameters.Attribute) == occasion).Select(x => x.Field<string>("Category")).Distinct().ToArray();
                int rank = Convert.ToInt32(table[colIndex, (int)MagicNumbers.five].TextFrame.Text, Culture);
                rowIndex = (int)MagicNumbers.six;
                for (int j = 0; j < brandList.ToList().Count; j++)
                {
                    string color = "#000000";
                    NullableBool bold = NullableBool.False;
                    if (rank == j + 1)
                    {
                        color = "#D21E47";
                        bold = NullableBool.True;
                    }
                    table[colIndex, rowIndex].TextFrame.Text = brandList[j];
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = ColorTranslator.FromHtml(color);
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = bold;
                    rowIndex++;
                }
                colIndex++;
            }
            return initialslide + 1;
        }
        private static int BindCategorySlide2(IPresentation pres, System.Data.DataTable dataTable, int initialslide, string[] OccasionData)
        {
            ISlide slide = pres.Slides[initialslide];
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();
            int[] profileOrder = new[] { 7, 11, 22, 24, 27, 13, 19 };
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == table6);
            var colIndex = 0;
            var rowIndex = 2;
            foreach (var profId in profileOrder)
            {
                var profData = data.Where(x => x.Field<int>(DBParameters.ProfileOrder) == profId).ToList();
                var metricList = profData.Select(x => x.Field<string>(DBParameters.Attribute)).Distinct();
                if (profId == (int)MagicNumbers.nineteen)
                {
                    metricList = profData.Where(x => x.Field<string>(DBParameters.Occasion).ToUpper(Culture) == Total).OrderByDescending(x => x.Field<double?>(Volume))
                        .Select(x => x.Field<string>(DBParameters.Attribute)).Take((int)MagicNumbers.three).ToArray();
                    if (selectedMarket.Contains("North America") || (selectedMarket.Split(',').Length > 1 && selectedMarket.Contains("Canada")))
                    {
                        MakeActivitiesAsBlank(slide, metricList, table, rowIndex, true);
                        continue;
                    }
                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailable")).Hidden = true;
                    rowIndex++;
                }
                foreach (string inData in metricList)
                {
                    colIndex = (int)MagicNumbers.three;
                    foreach (var occasion in OccasionData)
                    {

                        DataRow record = profData.Where(x => x.Field<string>(DBParameters.Occasion).ToUpper(Culture) == occasion.ToUpper(Culture)
                        && x.Field<string>(DBParameters.Attribute) == inData).ToList()[0];
                        if (record.Field<string>("AttributeType") == "Generations" && inData == metricList.ToList()[0])
                        {
                            table[1, rowIndex].TextFrame.Text = inData;
                        }
                        var obj = FormatCell(record, 0);
                        if (rowIndex == (int)MagicNumbers.two || (inData == metricList.ToList()[0] && profId == (int)MagicNumbers.nineteen))
                        {
                            if (colIndex == (int)MagicNumbers.three)
                            {
                                DataRow record1 = profData.Where(x => x.Field<string>(DBParameters.Occasion) == "Total" && x.Field<string>(DBParameters.Attribute) == inData).ToList()[0];
                                table[colIndex - 1, rowIndex - 1].TextFrame.Text =
                                    record1.Field<int>(DBParameters.USampleSize) + " [" + Math.Round(record1.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]";
                            }
                            record = profData.Where(x => x.Field<string>(DBParameters.Occasion) == occasion).OrderByDescending(x => x.Field<int?>(DBParameters.USampleSize)).ToList()[0];
                            table[colIndex, rowIndex - 1].TextFrame.Text = record.Field<int?>(DBParameters.USampleSize) != null ?
                            record.Field<int>(DBParameters.USampleSize) + " [" + Math.Round(record.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]" : sampleNA;

                            table[colIndex, rowIndex - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                            table[colIndex, rowIndex - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                        }
                        if (colIndex == (int)MagicNumbers.three)
                        {
                            table[colIndex - (int)MagicNumbers.two, rowIndex].TextFrame.Text = inData;
                            DataRow record1 = profData.Where(x => x.Field<string>(DBParameters.Occasion) == "Total" && x.Field<string>(DBParameters.Attribute) == inData).ToList()[0];
                            var obj1 = FormatCell(record1, 0);
                            if (table[colIndex - 1, rowIndex].TextFrame.Paragraphs[0].Portions.Count < (int)MagicNumbers.one)
                            {
                                table[colIndex - 1, rowIndex].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                            }
                            table[colIndex - 1, rowIndex].TextFrame.Paragraphs[0].Portions[0].Text = obj1[Value];

                        }
                        if (table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions.Count < (int)MagicNumbers.one)
                        {
                            table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                        }
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                        colIndex++;
                    }
                    rowIndex++;
                }
            }
            return initialslide + 1;
        }
        private static int BindObppcRow(IPresentation pres, System.Data.DataTable dataTable, int initialslide, int initialRow, int occasionNumber)
        {
            ISlide slide = pres.Slides[initialslide];
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == "Content Placeholder 6");
            var obj = FormatCell(data.Where(x => x.Field<string>(Header) == "Occasion Size").ToList()[0], 0);
            table[0, initialRow].TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
            table[0, initialRow].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
            table[0, initialRow].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
            table[0, initialRow].TextFrame.Paragraphs.Add(new Paragraph());
            table[0, initialRow].TextFrame.Paragraphs[1].Portions[0].Text = obj[Change] != "" ? "(" + obj[Change] + ")" : "";
            string[] columnList = new[] { "TOP KELLOGGS CATEGORIES", "TOP 5 KELLOGGS BRANDS", "TOP 5 COMPETITOR BRANDS", "PACK TYPES", "KEY CHANNELS", "TOP 5 RETAILERS" };
            for (int j = 0; j < columnList.ToList().Count; j++)
            {
                var topOccasions = data.Where(x => x.Field<string>(Header).ToUpper(Culture) == columnList[j]).ToList();
                if (columnList[j].Contains("5"))
                {
                    topOccasions = topOccasions.OrderByDescending(x => x.Field<double?>(Volume)).ToList();
                }
                for (int i = 0; i < topOccasions.Count; i++)
                {
                    var record = topOccasions[i];
                    int precision = columnList[j].Contains("BRANDS") && record.Field<string>(DBParameters.Attribute) != "KELLOGG’S SHARE" ? 1 : 0;
                    obj = FormatCell(record, precision);
                    if (table[j + (int)MagicNumbers.two, initialRow].TextFrame.Paragraphs.Count < i + 1)
                    {
                        table[j + (int)MagicNumbers.two, initialRow].TextFrame.Paragraphs.Add(new Paragraph());
                    }
                    table[j + (int)MagicNumbers.two, initialRow].TextFrame.Paragraphs[i].Text = obj[Value] + " - " + record.Field<string>(DBParameters.Attribute);
                }
                int n = table[j + (int)MagicNumbers.two, initialRow].TextFrame.Paragraphs.Count - 1;
                while (table[j + (int)MagicNumbers.two, initialRow].TextFrame.Paragraphs.Count > topOccasions.Count)
                {
                    table[j + (int)MagicNumbers.two, initialRow].TextFrame.Paragraphs.RemoveAt(n--);
                }
            }
            if (occasionNumber == (int)MagicNumbers.four || occasionNumber == (int)MagicNumbers.eight || occasionNumber == (int)MagicNumbers.thirteen)
            {
                var record = data.Where(x => x.Field<string>("Occasion").ToUpper(Culture) == Total).ToList()[0];
                obj = FormatCell(record, 0);
                table[0, table.Rows.Count - 1].TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                table[0, table.Rows.Count - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                table[0, table.Rows.Count - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.White;
                table[0, table.Rows.Count - 1].TextFrame.Paragraphs[0].Portions[1].Text = obj[Change] != "" ? "(" + obj[Change] + ")" : "";
            }
            return initialRow + 1;
        }
        private static int BindKidsSlide1(IPresentation pres, System.Data.DataTable dataTable, System.Data.DataTable categoryTable, int initialslide)
        {
            ISlide slide = pres.Slides[initialslide];
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == table6);
            int colIndex;
            int rowIndex = 1;
            string[] rowList = new[] { "OCCASION SIZE AMONG KIDS(4-12)", "OCCASION SIZE AMONG TOTAL(4-70)", "INDEX: KIDS TO TOTAL" };
            for (int j = 0; j < rowList.ToList().Count; j++)
            {
                var topOccasions = data.Where(x => x.Field<string>(Header).ToUpper(Culture) == rowList[j]).ToList();
                colIndex = (int)MagicNumbers.three;
                for (int i = 0; i < topOccasions.Count; i++)
                {
                    var record = topOccasions[i];
                    var obj = FormatCell(record, 0);
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].Text = j < (int)MagicNumbers.two ? obj[Value] : obj[Value].Replace("%", String.Empty);
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                    if (j < (int)MagicNumbers.two)
                    {
                        table[colIndex, rowIndex].TextFrame.Paragraphs[1].Portions[0].Text = obj[Change] != "" ? "(" + obj[Change] + ")" : "";
                    }
                    else
                    {
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Gray;
                    }
                    if (colIndex == (int)MagicNumbers.three && j < (int)MagicNumbers.two)
                    {
                        table[colIndex - (int)MagicNumbers.two, rowIndex].TextFrame.Paragraphs[(int)MagicNumbers.two].Text = "n= " + (record.Field<int?>(DBParameters.USampleSize) != null ?
                            record.Field<int>(DBParameters.USampleSize) + "[" + Math.Round(record.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]" : sampleNA);
                    }
                    colIndex++;
                }
                rowIndex++;
            }
            BindKidsSlide1Categories(pres, categoryTable, initialslide);
            return initialslide + 1;
        }

        private static void BindKidsSlide1Categories(IPresentation pres, System.Data.DataTable categoryTable, int initialslide)
        {
            ISlide slide = pres.Slides[initialslide];
            var CategoryTable = (from Row in categoryTable.AsEnumerable()
                                 select Row).ToList();
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == table6);
            int colIndex;
            int rowIndex = 5;
            var occasionList = CategoryTable.Select(x => x.Field<string>(DBParameters.Attribute)).Distinct();
            var categoryList = CategoryTable.Select(x => x.Field<string>(Header)).Distinct();
            foreach (string category in categoryList)
            {
                colIndex = (int)MagicNumbers.two;
                foreach (string occasion in occasionList)
                {
                    var record = CategoryTable.Where(x => x.Field<string>(Header) == category && x.Field<string>(DBParameters.Attribute) == occasion).ToList()[0];
                    var obj = FormatCell(record, 0);
                    if (rowIndex == (int)MagicNumbers.five)
                    {
                        record = CategoryTable.Where(x => x.Field<string>(DBParameters.Attribute) == occasion).OrderByDescending(x => x.Field<int?>(DBParameters.USampleSize)).ToList()[0];
                        table[colIndex, rowIndex - (int)MagicNumbers.one].TextFrame.Text = record.Field<int?>(DBParameters.USampleSize) != null ?
                            record.Field<int>(DBParameters.USampleSize) + "\n[" + Math.Round(record.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]" : "NA\n[NA]";
                    }
                    if (colIndex == (int)MagicNumbers.two)
                    {
                        table[colIndex - (int)MagicNumbers.one, rowIndex].TextFrame.Text = category;
                    }
                    table[colIndex, rowIndex].TextFrame.Text = obj[Value];
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                    colIndex++;
                }
                rowIndex++;
            }
            int n = table.Rows.Count;
            while (n > categoryList.ToList().Count + (int)MagicNumbers.five)
            {
                for (int i = 0; i < table.Columns.Count - 1; i++)
                {
                    table.Rows[n - 1][i + 1].TextFrame.Text = "";
                }
                n--;
            }
        }

        private static void BindKidsSlide2(IPresentation pres, System.Data.DataTable dataTable, int initialslide)
        {
            ISlide slide = pres.Slides[initialslide];
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == table6);
            var colIndex = 0;
            var rowIndex = 2;
            int[] profileOrder = data.OrderBy(x => x.Field<int>(DBParameters.ProfileOrder)).Select(x => x.Field<int>(DBParameters.ProfileOrder)).Distinct().ToArray();
            string[] OccasionData = data.Select(x => x.Field<string>("Occasion").ToUpper(Culture)).Distinct().ToArray();
            foreach (var profId in profileOrder)
            {
                var profData = data.Where(x => x.Field<int>(DBParameters.ProfileOrder) == profId).ToList();
                var metricList = profData.Select(x => x.Field<string>(DBParameters.Attribute)).Distinct();
                if (profId == (int)MagicNumbers.five || profId == (int)MagicNumbers.two)
                {
                    metricList = profData.Where(x => x.Field<string>(DBParameters.Occasion).ToUpper(Culture) == Total).OrderByDescending(x => x.Field<double?>(Volume))
                        .Select(x => x.Field<string>(DBParameters.Attribute)).Take((int)MagicNumbers.five).ToArray();
                }
                if (profId == (int)MagicNumbers.five)
                {
                    if (selectedMarket.Contains("North America") || (selectedMarket.Split(',').Length > 1 && selectedMarket.Contains("Canada")))
                    {
                        MakeActivitiesAsBlank(slide, metricList, table, rowIndex, false);
                        continue;
                    }
                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailable")).Hidden = true;
                }
                foreach (string inData in metricList)
                {
                    colIndex = (int)MagicNumbers.two;
                    table[colIndex - 1, rowIndex].TextFrame.Text = inData;
                    foreach (var occasion in OccasionData)
                    {
                        DataRow record = profData.Where(x => x.Field<string>(DBParameters.Occasion).ToUpper(Culture) == occasion && x.Field<string>(DBParameters.Attribute) == inData).ToList()[0];
                        var obj = FormatCell(record, 0);
                        if (rowIndex == (int)MagicNumbers.two)
                        {
                            record = profData.Where(x => x.Field<string>("Occasion").ToUpper(Culture) == occasion).OrderByDescending(x => x.Field<int?>(DBParameters.USampleSize)).ToList()[0];
                            table[colIndex, rowIndex - 1].TextFrame.Text = record.Field<int?>(DBParameters.USampleSize) != null ?
                            record.Field<int>(DBParameters.USampleSize) + "\n[" + Math.Round(record.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]" : "NA\n[NA]";
                            table[colIndex, rowIndex - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                            table[colIndex, rowIndex - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                        }
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                        colIndex++;
                    }
                    rowIndex++;
                }
            }
        }

        private static void MakeActivitiesAsBlank(IBaseSlide slide, IEnumerable<string> metricList, ITable table, int rowIndex, bool equal)
        {
            ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailable")).Hidden = false;
            int ind = 0;
            while ((ind < metricList.ToList().Count) || (equal && ind == metricList.ToList().Count))
            {
                for (int i = 1; i < table.Columns.Count; i++)
                {
                    table[i, rowIndex + ind].TextFrame.Text = "";
                }
                ind++;
            }
        }

        private static int BindChannelRetailerSlide(IPresentation pres, System.Data.DataTable dataTable, System.Data.DataTable bottomTable, int initialslide, string value, bool isRetailer)
        {
            ISlide slide = pres.Slides[initialslide];
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == table6);
            int colIndex;
            const int rowIndex = 1;
            var topOccasions = data.Where(x => x.Field<string>(Header).ToUpper(Culture) == "CHANNEL SIZE").ToList();
            if (isRetailer)
            {
                data = (from Row in dataTable.AsEnumerable()
                        where Row.Field<int>(ChannelSort) == Convert.ToInt32(value.Substring(1), Culture)
                        select Row).ToList();
                topOccasions = data.Where(x => x.Field<string>(Header).ToUpper(Culture) == "RETAIL SIZE").ToList();
            }
            var columnOrder = topOccasions.Select(x => x.Field<string>(DBParameters.Attribute).ToUpper(Culture)).ToArray();
            colIndex = (int)MagicNumbers.two;
            for (int i = 0; i < topOccasions.Count; i++)
            {
                var record = topOccasions[i];
                var obj = FormatCell(record, 0);
                table[colIndex, rowIndex - (int)MagicNumbers.one].TextFrame.Text = record.Field<string>(DBParameters.Attribute).ToUpper(Culture);
                var tabEle = table[colIndex, rowIndex].TextFrame;
                if (tabEle.Paragraphs[0].Portions.Count < (int)MagicNumbers.one)
                {
                    tabEle.Paragraphs[0].Portions.Add(new Portion());
                }
                tabEle.Paragraphs[0].Portions[0].Text = record.Field<string>(DBParameters.Attribute).ToUpper(Culture) == "TOTAL" && !isRetailer ? "" : obj[Value];
                tabEle.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                tabEle.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                if (tabEle.Paragraphs[1].Portions.Count < (int)MagicNumbers.one)
                {
                    tabEle.Paragraphs[1].Portions.Add(new Portion());
                }
                tabEle.Paragraphs[1].Portions[0].Text = obj[Change] != "" && !(record.Field<string>(DBParameters.Attribute).ToUpper(Culture) == "TOTAL" && !isRetailer) ? "(" + obj[Change] + ")" : "";
                tabEle.Paragraphs[1].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                tabEle.Paragraphs[1].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                if (colIndex == (int)MagicNumbers.two)
                {
                    table[colIndex - (int)MagicNumbers.one, rowIndex].TextFrame.Paragraphs[(int)MagicNumbers.two].Text = "n= " + (record.Field<int?>(DBParameters.USampleSize) != null ?
                        record.Field<int>(DBParameters.USampleSize) + " [" + Math.Round(record.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]" : sampleNA);
                }
                table[colIndex, rowIndex + (int)MagicNumbers.one].TextFrame.Text = record.Field<int?>(DBParameters.UNumerator) != null ?
                    record.Field<int>(DBParameters.UNumerator) + "\n[" + Math.Round(record.Field<double>(DBParameters.WNumerator), 0, MidpointRounding.AwayFromZero) + "]" : sampleNA;
                colIndex++;
            }
            int n = table.Columns.Count - 1;
            while (table.Columns.Count > topOccasions.Count + (int)MagicNumbers.two)
            {
                table.Columns.RemoveAt(n--, false);
            }
            BindChannelRetailerSlideBottom(slide, bottomTable, columnOrder, value, isRetailer);
            return initialslide + 1;
        }

        private static void BindChannelRetailerSlideBottom(Aspose.Slides.IBaseSlide slide, System.Data.DataTable bottomTable, string[] columnOrder, string value, bool isRetailer)
        {
            var DataTable = (from Row in bottomTable.AsEnumerable()
                             select Row).ToList();
            int flag = Convert.ToInt32(value.Substring(0, 1), Culture);
            if (isRetailer)
            {
                DataTable = (from Row in bottomTable.AsEnumerable()
                             where Row.Field<int>(ChannelSort) == Convert.ToInt32(value.Substring(1), Culture)
                             select Row).ToList();
            }
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == table6);
            int colIndex;
            int rowIndex = 3;
            var rowList = DataTable.Select(x => x.Field<string>(Header).ToUpper(Culture)).Distinct();
            foreach (string rowHeader in rowList)
            {
                colIndex = (int)MagicNumbers.two;
                if (flag == (int)MagicNumbers.two)
                {
                    table[colIndex - 1, rowIndex].TextFrame.Text = rowHeader;
                }
                foreach (string header in columnOrder)
                {
                    var record = DataTable.Where(x => x.Field<string>(Header).ToUpper(Culture) == rowHeader && x.Field<string>(DBParameters.Attribute).ToUpper(Culture) == header).ToList()[0];
                    var obj = FormatCell(record, 0);
                    table[colIndex, rowIndex].TextFrame.Text = flag == 1 ? obj[Value].Replace("%", string.Empty) : obj[Value];
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                    table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                    colIndex++;
                }
                rowIndex++;
            }
            int n = table.Columns.Count - 1;
            while (table.Columns.Count > columnOrder.ToList().Count + (int)MagicNumbers.two)
            {
                table.Columns.RemoveAt(n--, false);
            }
            if (flag == (int)MagicNumbers.two)
            {
                n = table.Rows.Count;
                while (n > rowList.ToList().Count + (int)MagicNumbers.three)
                {
                    for (int i = 0; i < table.Columns.Count - 1; i++)
                    {
                        table.Rows[n - 1][i + 1].TextFrame.Text = "";
                    }
                    n--;
                }
            }
        }

        private static int BindChannelRetailerSlide2(IPresentation pres, System.Data.DataTable dataTable, string[] columnOrder, int initialslide, string value, bool isRetailer)
        {
            ISlide slide = pres.Slides[initialslide];
            var data = (from Row in dataTable.AsEnumerable()
                        select Row).ToList();
            if (isRetailer)
            {
                data = (from Row in dataTable.AsEnumerable()
                        where Row.Field<int>(ChannelSort) == Convert.ToInt32(value.Substring(1), Culture)
                        select Row).ToList();
            }
            ITable table = (ITable)slide.Shapes.FirstOrDefault(x => x.Name == table6);
            var colIndex = 0;
            var rowIndex = 2;
            int[] profileOrder = data.OrderBy(x => x.Field<int>("GroupSort")).Select(x => x.Field<int>("GroupSort")).Distinct().ToArray();
            foreach (var profId in profileOrder)
            {
                var profData = data.Where(x => x.Field<int>("GroupSort") == profId).ToList();
                var metricList = profData.Select(x => x.Field<string>(DBParameters.Attribute)).Distinct();
                if (profId == (int)MagicNumbers.seventeen)
                {
                    metricList = profData.Where(x => x.Field<string>(Header).ToUpper(Culture) == Total).OrderByDescending(x => x.Field<double?>(Volume))
                        .Select(x => x.Field<string>(DBParameters.Attribute)).Take((int)MagicNumbers.five);
                    if (selectedMarket.Contains("North America") || (selectedMarket.Split(',').Length > 1 && selectedMarket.Contains("Canada")))
                    {
                        MakeActivitiesAsBlank(slide, metricList, table, rowIndex, false);
                        continue;
                    }
                    ((IAutoShape)slide.Shapes.FirstOrDefault(x => x.Name == "notAvailable")).Hidden = true;
                }
                foreach (string inData in metricList)
                {
                    colIndex = (int)MagicNumbers.two;
                    table[colIndex - 1, rowIndex].TextFrame.Text = inData.ToUpper(Culture);
                    foreach (var header in columnOrder)
                    {
                        DataRow record = profData.Where(x => x.Field<string>(DBParameters.Attribute).ToUpper(Culture) == inData.ToUpper(Culture)
                        && x.Field<string>(Header).ToUpper(Culture) == header).ToList()[0];
                        var obj = FormatCell(record, 0);
                        if (rowIndex == (int)MagicNumbers.two)
                        {
                            table[colIndex, rowIndex - (int)MagicNumbers.two].TextFrame.Text = header;
                            record = profData.Where(x => x.Field<string>(Header).ToUpper(Culture) == header).OrderByDescending(x => x.Field<int?>(DBParameters.USampleSize)).ToList()[0];
                            table[colIndex, rowIndex - 1].TextFrame.Text = record.Field<int?>(DBParameters.USampleSize) != null ?
                            record.Field<int>(DBParameters.USampleSize) + "\n[" + Math.Round(record.Field<double>(DBParameters.WSampleSize), 0, MidpointRounding.AwayFromZero) + "]" : "NA\n[NA]";
                            table[colIndex, rowIndex - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                            table[colIndex, rowIndex - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                        }
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].Text = obj[Value];
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                        table[colIndex, rowIndex].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = Color.FromName(obj[ColorClass]);
                        colIndex++;
                    }
                    rowIndex++;
                }
            }
            int n = table.Columns.Count - 1;
            while (table.Columns.Count > columnOrder.ToList().Count + (int)MagicNumbers.two)
            {
                table.Columns.RemoveAt(n--, false);
            }
            return initialslide + 1;
        }

        private static Dictionary<string, string> FormatCell(DataRow rowObj, int precision)
        {
            Dictionary<string, string> obj = new Dictionary<string, string>();
            obj.Add(Value, "NA");
            obj.Add(Change, "");
            obj.Add(ColorClass, Black);

            if (rowObj.Field<double?>(Volume) != null)
            {//sample size check for volume
                double Volume = rowObj.Field<double>(DBParameters.Volumes);
                if (rowObj.Field<int?>(DBParameters.UNumerator) == null || rowObj.Field<int?>(DBParameters.USampleSize) == null)
                {
                    obj[Value] = "NA";
                }
                else if (rowObj.Field<int?>(DBParameters.USampleSize) < InsufficientSample)
                {
                    obj[Value] = "LS";
                }
                else
                {

                    if (rowObj.Field<string>(DBParameters.Attribute) != null && rowObj.Field<string>(DBParameters.Attribute).ToUpper(Culture) == "AVERAGE HH INCOME")
                    {
                        obj[Value] = CurrencySymbol == "" ? "Not Applicable" :
                                CurrencySymbol + Math.Round(Volume, (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture) + "K";
                    }
                    else if (rowObj.Field<string>(DBParameters.Attribute) != null &&
                        (rowObj.Field<string>(DBParameters.Attribute).ToUpper(Culture) == "AVERAGE ITEMS PER OCCASION" || rowObj.Field<string>("Attribute").ToUpper(Culture) == "AVERAGE HH SIZE"))
                    {
                        obj[Value] = Math.Round(Volume, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                    }
                    else
                    {
                        obj[Value] = (precision == 1 ? Math.Round(Volume * (int)MagicNumbers.hundred, precision, MidpointRounding.AwayFromZero).ToString("0.0", Culture) :
                            Math.Round(Volume * (int)MagicNumbers.hundred, precision, MidpointRounding.AwayFromZero).ToString(Culture)) + "%";
                    }

                    if (obj[Value] != "Not Applicable")
                    {
                        obj[ColorClass] = (rowObj.Field<int?>("USampleSize") >= InsufficientSample && rowObj.Field<int?>("USampleSize") <= LowSample) ? "Gray" : obj[ColorClass];
                    }
                }
            }
            if (obj[Value] != "NA" && obj[Value] != "LS" && rowObj.Field<int?>("Significance") != null && obj[ColorClass] != "Gray")
            {
                if (rowObj.Field<int>("Significance") > 0)
                {
                    obj[ColorClass] = "Green";
                }
                else if (rowObj.Field<int>("Significance") < 0)
                {
                    obj[ColorClass] = "Red";
                }
                else
                {
                    obj[ColorClass] = "Black";
                }
            }
            if (obj[Value] != "NA" && obj[Value] != "LS" && rowObj.Field<double?>("Change") != null)
            {
                double DiffVol = rowObj.Field<double>("Change");
                var change = Math.Round(DiffVol, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                obj[Change] = DiffVol >= 0 ? '+' + change : change;
            }
            if (rowObj.Field<string>(DBParameters.Attribute) != null && rowObj.Field<string>(DBParameters.Attribute).ToUpper(Culture) == "AVERAGE HH INCOME" && CurrencySymbol == "")
            {
                obj[Value] = "Not Applicable";
                obj[ColorClass] = Black;
            }
            return obj;
        }


        public static string CurrencySymbol
        {
            get
            {
                string symbol = "$";
                string market = selectedMarket;
                if (market != null)
                {
                    if (market.Split(',').ToList().Count > (int)MagicNumbers.one || isRegionSelected)
                    {
                        symbol = "";
                    }
                    else if (market == "Brazil")
                    {
                        symbol = "R$";
                    }
                    else if (market == "France")
                    {
                        symbol = "€";
                    }
                    else if (market == "UK")
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
        }

        private static Dictionary<string, string> FormatTotalCell(DataRow rowObj, int precision)
        {
            Dictionary<string, string> obj = new Dictionary<string, string>();
            obj.Add(Value, "NA");
            obj.Add(Change, "");
            obj.Add(ColorClass, Black);

            if (rowObj.Field<double?>("VolumeTotal") != null)
            {//sample size check for volume
                double Volume = rowObj.Field<double>("VolumeTotal");
                if (rowObj.Field<int?>(DBParameters.UNumeratorTotal) == null || rowObj.Field<int?>(DBParameters.USampleSizeTotal) == null)
                {
                    obj[Value] = "NA";
                }
                else if (rowObj.Field<int?>(DBParameters.USampleSizeTotal) < InsufficientSample)
                {
                    obj[Value] = "LS";
                }
                else
                {
                    if ((rowObj.Field<int?>(DBParameters.USampleSizeTotal) >= InsufficientSample && rowObj.Field<int?>(DBParameters.USampleSizeTotal) <= LowSample))
                    {
                        obj[ColorClass] = "Gray";
                    }

                    obj[Value] = (precision == 1 ? Math.Round(Volume * (int)MagicNumbers.hundred, precision, MidpointRounding.AwayFromZero).ToString("0.0", Culture) :
                        Math.Round(Volume * (int)MagicNumbers.hundred, precision, MidpointRounding.AwayFromZero).ToString(Culture)) + "%";
                }
            }
            if (obj[Value] != "NA" && obj[Value] != "LS" && rowObj.Field<double?>("ChangeTotal") != null)
            {
                double DiffVol = rowObj.Field<double>("ChangeTotal");
                var change = Math.Round(DiffVol, (int)MagicNumbers.one, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                obj[Change] = DiffVol >= 0 ? '+' + change : change;
            }
            return obj;
        }

        private static Dictionary<string, string> FormatTrendData(DataRow rowObj, bool isAvgRequired)
        {
            Dictionary<string, string> obj = new Dictionary<string, string>();
            obj.Add(Value, "NA");
            obj.Add(Change, "");
            obj.Add(ColorClass, Black);
            double value = 0;
            if (isAvgRequired)
            {
                if (rowObj.Field<double?>("AvgOccasionsPerson") != null)
                {
                    value = rowObj.Field<double>("AvgOccasionsPerson");
                }
            }
            else
            {
                if (rowObj.Table.Columns.Contains("Percentage") && rowObj.Field<double?>("Percentage") != null)
                {
                    value = rowObj.Field<double>("Percentage");
                }
                else if (rowObj.Table.Columns.Contains("OccasionShare") && rowObj.Field<double?>("OccasionShare") != null)
                {
                    value = rowObj.Field<double>("OccasionShare");
                }
            }

            if (rowObj.Field<int?>(DBParameters.UNumerator) == null || rowObj.Field<int?>(DBParameters.USampleSize) == null)
            {
                obj[Value] = "NA";
            }
            else if (rowObj.Field<int?>(DBParameters.USampleSize) < InsufficientSample)
            {
                obj[Value] = "LS";
            }
            else
            {
                if (isAvgRequired)
                {
                    obj[Value] = Math.Round(value, (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture);

                }
                else
                {
                    obj[Value] = Math.Round(value * (int)MagicNumbers.hundred, 0, MidpointRounding.AwayFromZero).ToString(Culture) + "%";
                }


                obj[ColorClass] = (rowObj.Field<int?>("USampleSize") >= InsufficientSample && rowObj.Field<int?>("USampleSize") <= LowSample) ? "Gray" : obj[ColorClass];

            }

            if (obj[Value] != "NA" && obj[Value] != "LS" && rowObj.Field<int?>("Significance") != null && obj[ColorClass] != "Gray")
            {
                if (rowObj.Field<int>("Significance") > 0)
                {
                    obj[ColorClass] = "Green";
                }
                else if (rowObj.Field<int>("Significance") < 0)
                {
                    obj[ColorClass] = "Red";
                }
                else
                {
                    obj[ColorClass] = Black;
                }

            }
            if (obj[Value] != "NA" && obj[Value] != "LS" && rowObj.Field<double?>("Change") != null)
            {
                double DiffVol = rowObj.Field<double>("Change");
                var change = Math.Round(DiffVol, (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture);
                obj[Change] = DiffVol >= 0 ? '+' + change : change;
            }

            return obj;
        }
        public static class SlideDetails
        {
            public const int Slide79Details = 78;
            public const int Slide77Details = 76;
            public const int Slide76Details = 75;
            public const int Slide75Details = 74;
            public const int Slide80Details = 79;
            public const int Slide78Details = 77;
            public const int Slide77Data = 77;
            public const int Slide78Data = 78;
            public const int Slide79Data = 79;
            public const int Slide81Data = 81;
            public const int Slide80Data = 80;
            public const int Slide81Details = 80;


        }

    }
}
