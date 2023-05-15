using System;
using System.Data;
using System.Linq;
using AQ.Kelloggs.Models;
using System.Web;
using AQ.Kelloggs.DAL;
using System.IO;
using System.Drawing;
using Aspose.Slides;
using System.Configuration;
using OfficeOpenXml.Style;
using OfficeOpenXml;
using System.Collections.Generic;
using static AQ.Kelloggs.Models.Constants;
using AQ.Kelloggs.Models.AdvancedAnalytics;

namespace AQ.Kelloggs.BAL
{
    public class AdvancedAnalyticsBAL
    {
        readonly CommonDAL dalObj = new CommonDAL();
        double?[] TotalSampleSize;
        private const int mergeColumns = (int)Constants.MagicNumbers.six;
        int maxLevel = 1;

        #region OSP
        #region get osp data
        public OspResponse GetOspData(OspRequest OSPRequestData, HttpContextBase context)
        {
            OspResponse response = new OspResponse();
            if (OSPRequestData != null)
            {
                object[] parameters = {
                OSPRequestData.TimePeriod,
                OSPRequestData.Market,
                OSPRequestData.OppurtunityFor,
                OSPRequestData.FilterIDs,
                OSPRequestData.AdditionalFilter,
                OSPRequestData.Benchmark,
                OSPRequestData.RespType
            };

                DataSet dataset = dalObj.GetOSPData(parameters);

                response.DataList = (from rows in dataset.Tables[0].AsEnumerable()
                                     select new OspResponseData
                                     {
                                         SelectedAttribute = Convert.ToString(rows[DBParameters.SelectedAttribute], Constants.Culture),
                                         Occasion = Convert.ToString(rows[DBParameters.Occasion], Constants.Culture),
                                         Distribution = rows[DBParameters.Distribution] == DBNull.Value ? null : (double?)rows[DBParameters.Distribution],
                                         RetailValue = rows[DBParameters.RetailValue] == DBNull.Value ? null : (double?)rows[DBParameters.RetailValue],
                                         ColorScheme = Convert.ToString(rows[DBParameters.ColorScheme], Constants.Culture),
                                         USampleSize = rows[DBParameters.USampleSize] == DBNull.Value ? null : (double?)rows[DBParameters.USampleSize],
                                         WSampleSize = rows[DBParameters.WSampleSize] == DBNull.Value ? null : (double?)rows[DBParameters.WSampleSize],
                                         Change = rows[DBParameters.Changes] == DBNull.Value ? null : (double?)rows[DBParameters.Changes],
                                         Significance = rows[DBParameters.Significance] == DBNull.Value ? null : (int?)rows[DBParameters.Significance],
                                         RowAttribute = Convert.ToString(rows[DBParameters.RowAttribute],Constants.Culture) ,
                                         ColumnAttribute = rows[DBParameters.ColumnAttribute] == DBNull.Value ? null : (int?)rows[DBParameters.ColumnAttribute],
                                         ShareUSampleSize = rows[DBParameters.ShareUSampleSize] == DBNull.Value ? null : (double?)rows[DBParameters.ShareUSampleSize],
                                         ShareWSampleSize = rows[DBParameters.ShareWSampleSize] == DBNull.Value ? null : (double?)rows[DBParameters.ShareWSampleSize],
                                         ShareChange = rows[DBParameters.ShareChange] == DBNull.Value ? null : (double?)rows[DBParameters.ShareChange],
                                         ShareSignificance = rows[DBParameters.ShareSignificance] == DBNull.Value ? null : (int?)rows[DBParameters.ShareSignificance],
                                         Share = rows[DBParameters.Share] == DBNull.Value ? null : (double?)rows[DBParameters.Share],
                                         Level = Convert.ToInt32(rows[DBParameters.Level], Constants.Culture)

                                     }).ToList();
            }
            return response;
        }

        #endregion

        public OspInnerResponse GetOspCellData(OspRequest OSPRequestData, HttpContextBase httpContext)
        {
            OspInnerResponse response = new OspInnerResponse();
            if (OSPRequestData != null)
            {
                object[] parameters = {
                OSPRequestData.TimePeriod,
                OSPRequestData.Market,
                OSPRequestData.OppurtunityFor,
                OSPRequestData.AdditionalFilter,
                OSPRequestData.Benchmark,
                OSPRequestData.RespType,
                OSPRequestData.RowAttributeId,
                OSPRequestData.ColumnAttributeId
            };

                DataSet dataset = dalObj.GetOSPCellData(parameters);

                response.DataList = (from rows in dataset.Tables[0].AsEnumerable()
                                     select new OspInnerResponseData
                                     {
                                         GroupName = Convert.ToString(rows[DBParameters.GroupName], Constants.Culture),
                                         Header = Convert.ToString(rows[DBParameters.Headers], Constants.Culture),
                                         Attribute = Convert.ToString(rows[DBParameters.Attribute], Constants.Culture),
                                         TotalValue = rows[DBParameters.TotalValue] == DBNull.Value ? null : (double?)rows[DBParameters.TotalValue],
                                         Value = rows[DBParameters.Values] == DBNull.Value ? null : (double?)rows[DBParameters.Values],
                                         Change = rows[DBParameters.Changes] == DBNull.Value ? null : (double?)rows[DBParameters.Changes],
                                         Significance = rows[DBParameters.Significance] == DBNull.Value ? null : (int?)rows[DBParameters.Significance],
                                         TotalChange = rows[DBParameters.TotalChange] == DBNull.Value ? null : (double?)rows[DBParameters.TotalChange],
                                         USampleSize = rows[DBParameters.USampleSize] == DBNull.Value ? null : (int?)rows[DBParameters.USampleSize],
                                         UTotalSampleSize = rows[DBParameters.UTotalSampleSize] == DBNull.Value ? null : (int?)rows[DBParameters.UTotalSampleSize],
                                         WSampleSize = rows[DBParameters.WSampleSize] == DBNull.Value ? null : (double?)rows[DBParameters.WSampleSize],
                                         WTotalSampleSize = rows[DBParameters.WTotalSampleSize] == DBNull.Value ? null : (double?)rows[DBParameters.WTotalSampleSize],
                                         UNumerator = rows[DBParameters.UNumerator] == DBNull.Value ? null : (int?)rows[DBParameters.UNumerator],
                                         WNumerator = rows[DBParameters.WNumerator] == DBNull.Value ? null : (double?)rows[DBParameters.WNumerator],
                                         UTotalNumerator = rows[DBParameters.UTotalNumerator] == DBNull.Value ? null : (int?)rows[DBParameters.UTotalNumerator],
                                         WTotalNumerator = rows[DBParameters.WTotalNumerator] == DBNull.Value ? null : (double?)rows[DBParameters.WTotalNumerator]
                                     }).ToList();
            }
            return response;
        }

        public string GetPptDetails(OspRequest request, OspResponse responseData, string marketName, string opportunityFor, string summary)
        {
            maxLevel = responseData.DataList.OrderByDescending(x => x.Level).ToList()[0].Level;
            string pptName = "";
            try
            {
                var context = HttpContext.Current;
                var _tempPPT = "";
                string name = "";


                _tempPPT = context.Server.MapPath(Templates.OSPPpt);
                name = "OSP_Kellogg_ExportPPT";


                Aspose.Slides.License license = new Aspose.Slides.License();
                license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));
                Aspose.Slides.IPresentation pres = new Aspose.Slides.Presentation(_tempPPT);

                using (pres)
                {
                  
                    var row = responseData.DataList.Select(x => x.SelectedAttribute).Distinct().ToList();
                    var col = responseData.DataList.Select(x => x.Occasion).Distinct().ToList();

                    var slideNum = 4;
                    var shareSlideNum = 3;
                    if (request.OppurtunityFor == "1" || request.OppurtunityFor == "2" || request.OppurtunityFor == "6" || request.OppurtunityFor == "14")
                    {
                        pres.Slides.RemoveAt((int)MagicNumbers.three);
                        slideNum = (int)MagicNumbers.three;
                        shareSlideNum = 0;
                    }

                    #region slide0
                    ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "TextBox 2")).TextFrame.Text = System.DateTime.Today.ToShortDateString();
                    #endregion

                    #region slide1 slide 3 slide 4
                    IAutoShape header2;
                    IAutoShape selectionSummary2;
                    ITable table2 = null;


                    if (shareSlideNum != 0)
                    {
                        header2 = (IAutoShape)pres.Slides[shareSlideNum].Shapes.FirstOrDefault(x => x.Name == Title4);
                        selectionSummary2 = (IAutoShape)pres.Slides[shareSlideNum].Shapes.FirstOrDefault(x => x.Name == "TextBox 21");
                        table2 = (ITable)pres.Slides[shareSlideNum].Shapes.FirstOrDefault(x => x.Name == "Table 23");
                        header2.TextFrame.Text = StrategicPostures + opportunityFor.ToUpper(Culture);
                        selectionSummary2.TextFrame.Text = summary;
                        table2[0, 0].TextFrame.Text = request.OppurtunityFor == "7" || request.OppurtunityFor == "8" ? "Share of Channel" : "Share of Category";
                    }
                    IAutoShape header = (IAutoShape)pres.Slides[1].Shapes.FirstOrDefault(x => x.Name == Title4);
                    IAutoShape header1 = (IAutoShape)pres.Slides[slideNum].Shapes.FirstOrDefault(x => x.Name == Title4);
                    IAutoShape selectionSummary = (IAutoShape)pres.Slides[1].Shapes.FirstOrDefault(x => x.Name == "TextBox 21");
                    IAutoShape selectionSummary1 = (IAutoShape)pres.Slides[slideNum].Shapes.FirstOrDefault(x => x.Name == "TextBox 21");

                    header.TextFrame.Text = StrategicPostures + opportunityFor.ToUpper(Culture);
                    selectionSummary.TextFrame.Text = summary;
                    header1.TextFrame.Text = StrategicPostures + opportunityFor.ToUpper(Culture);
                    selectionSummary1.TextFrame.Text = summary;



                    ITable legendTable = (ITable)pres.Slides[1].Shapes.FirstOrDefault(x => x.Name == "Table 16");
                    ITable legendTable1 = (ITable)pres.Slides[2].Shapes.FirstOrDefault(x => x.Name == "Table 22");
                    ITable legendTable2 = (ITable)pres.Slides[slideNum].Shapes.FirstOrDefault(x => x.Name == "Table 15");

                    var tableWidth = legendTable.Frame.Width;


                    if (request.OppurtunityFor == "1" || request.OppurtunityFor == "2" || request.OppurtunityFor == "6" || request.OppurtunityFor == "14")
                    {
                        legendTable.Columns.RemoveAt((int)MagicNumbers.zero, false);
                        legendTable.Columns.RemoveAt((int)MagicNumbers.three, false);
                        legendTable1.Columns.RemoveAt((int)MagicNumbers.zero, false);
                        legendTable1.Columns.RemoveAt((int)MagicNumbers.three, false);
                        legendTable2.Columns.RemoveAt((int)MagicNumbers.zero, false);
                        legendTable2.Columns.RemoveAt((int)MagicNumbers.three, false);

                        legendTable.X += tableWidth - legendTable.Frame.Width;
                        legendTable1.X += tableWidth - legendTable.Frame.Width;
                        legendTable2.X += tableWidth - legendTable.Frame.Width;


                        legendTable[(int)MagicNumbers.two, 0].BorderRight.Width = 0;
                        legendTable[(int)MagicNumbers.two, 0].BorderRight.FillFormat.SolidFillColor.Color = Color.White;
                        legendTable1[(int)MagicNumbers.two, 0].BorderRight.Width = 0;
                        legendTable1[(int)MagicNumbers.two, 0].BorderRight.FillFormat.SolidFillColor.Color = Color.White;
                        legendTable2[(int)MagicNumbers.two, 0].BorderRight.Width = 0;
                        legendTable2[(int)MagicNumbers.two, 0].BorderRight.FillFormat.SolidFillColor.Color = Color.White;

                    }

                    ITable table = (ITable)pres.Slides[1].Shapes.FirstOrDefault(x => x.Name == "Table 11");
                    ITable table1 = (ITable)pres.Slides[slideNum].Shapes.FirstOrDefault(x => x.Name == "Table 35");

                    table1.Rows.RemoveAt(1, false);
                    table1.Rows.RemoveAt(1, false);


                    TotalSampleSize = new double?[row.Count];
                    for (int i = 0; i < row.Count; i++)
                    {

                        var data = responseData.DataList.Where(p => p.Occasion.ToUpper(Culture) == Constants.TotalinCaps && p.SelectedAttribute == row[i]).ToList();
                        ExportPptData tableData = new ExportPptData();
                        tableData = ReturnValues(data[0], DBParameters.Distribution, tableData, -1);

                        if (i > 0)
                        {
                            table.Rows.AddClone(table.Rows[(int)MagicNumbers.two], false);
                            if (data[0].Level == maxLevel)
                            {
                                table1.Rows.AddClone(table1.Rows[1], false);
                            }
                               
                        }

                        if (data[0].Level == (int)MagicNumbers.three)
                        {
                            table[0, i + (int)MagicNumbers.two].TextFrame.Text = "";
                            table[1, i + (int)MagicNumbers.two].TextFrame.Text = row[i];
                            table[(int)MagicNumbers.two, i + (int)MagicNumbers.two].TextFrame.Text = tableData.Value;
                            table[ (int)MagicNumbers.two, i + (int)MagicNumbers.two].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = tableData.Color;

                        }
                        else if (data[0].Level == (int)MagicNumbers.two)
                        {
                            table[0, i + (int)MagicNumbers.two].TextFrame.Text = row[i];
                            table[1, i + (int)MagicNumbers.two].TextFrame.Text = "";
                            table[(int)MagicNumbers.two, i + (int)MagicNumbers.two].TextFrame.Text = tableData.Value;
                            table[(int)MagicNumbers.two, i + (int)MagicNumbers.two].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = tableData.Color;
                            table.MergeCells(table[0, i + (int)MagicNumbers.two], table[1, i + (int)MagicNumbers.two], false);
                            table[(int)MagicNumbers.two, i + (int)MagicNumbers.two].BorderLeft.FillFormat.SolidFillColor.Color = System.Drawing.ColorTranslator.FromHtml("#ccc");
                        }
                        else
                        {
                            table[0, i + 1].TextFrame.Text = row[i];
                            table[(int)MagicNumbers.two, i + 1].TextFrame.Text = tableData.Value;
                            table[(int)MagicNumbers.two, i + (int)MagicNumbers.one].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = tableData.Color;

                        }

                        if (i > 0 && data[0].Level == maxLevel)
                        {
                            var ind = maxLevel != 3 ? 1 : 0;
                            table1[0, i +ind].TextFrame.Text = row[i];
                        }


                        if (shareSlideNum != 0)
                        {
                            tableData = ReturnValues(data[0], DBParameters.Share, tableData, -1);

                            if (i > (int)MagicNumbers.two)
                            {
                                table2.Rows.AddClone(table2.Rows[1], false);
                            }

                            if (i > 1)
                            {
                                table2[0, i - 1].TextFrame.Text = row[i];
                                table2[1, i - 1].TextFrame.Text = tableData.Value;
                                table2[(int)MagicNumbers.one, i -1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = tableData.Color;

                            }

                        }
                        TotalSampleSize[i] =data[0].USampleSize;



                    }
                    int index = 0;
                    for (int i = 0; i < row.Count; i++)
                    {
                        for (int j = 1; j < col.Count; j++)
                        {

                            var data = responseData.DataList.Where(p => p.Occasion == col[j] && p.SelectedAttribute == row[i]).ToList();

                            ExportPptData tableData = new ExportPptData();
                            tableData = ReturnValues(data[0], Constants.DBParameters.Distribution, tableData, i);

                            index = data[0].Level != 1 ? 1 : 0;
                            table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions[0].Text = tableData.Value;
                            table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                            table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = tableData.Color;
                            if (table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions.Count < (int)MagicNumbers.two)
                            {
                                table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                            }
                            table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions[1].Text = tableData.Change != "" ? "|" + tableData.Change : "";
                            table[j + (int)MagicNumbers.two, i + 1 + index].BorderLeft.FillFormat.SolidFillColor.Color = tableData.BorderColor == TransparentColor ? 
                                System.Drawing.ColorTranslator.FromHtml("#ccc") : System.Drawing.ColorTranslator.FromHtml(tableData.BorderColor);
                            if (tableData.BorderColor == TransparentColor || tableData.BorderColor == "#ccc")
                            {
                                table[j + (int)MagicNumbers.two, i + 1 + index].BorderLeft.Width = 1;
                            }

                            if (table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions.Count > (int)MagicNumbers.two)
                            {
                                table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions[(int)MagicNumbers.two].Text = "";
                            }

                            if (shareSlideNum != 0 && i > 1)
                            {
                                tableData = ReturnValues(data[0], DBParameters.Share, tableData, i);
                                table2[j + 1, i - 1].TextFrame.Paragraphs[0].Portions[0].Text = tableData.Value;
                                table2[j + 1, i - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                                table2[j + 1, i - 1].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = tableData.Color;
                                if (table2[j + 1, i - 1].TextFrame.Paragraphs[0].Portions.Count < (int)MagicNumbers.two)
                                {
                                    table2[j + 1, i - 1].TextFrame.Paragraphs[0].Portions.Add(new Portion());
                                }
                                table2[j + 1, i - 1].TextFrame.Paragraphs[0].Portions[1].Text = tableData.Change != "" ? "|" + tableData.Change : "";
                                table2[j + 1, i - 1].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.FillType = FillType.Solid;
                                table2[j + 1, i - 1].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FillFormat.SolidFillColor.Color = Color.Black;
                                table2[j + 1, i - 1].TextFrame.Paragraphs[0].Portions[1].PortionFormat.FontHeight = (int)MagicNumbers.ten;
                                table2[j + 1, i - 1].BorderLeft.FillFormat.SolidFillColor.Color = tableData.BorderColor == TransparentColor ? System.Drawing.ColorTranslator.FromHtml("#ccc") :
                                    System.Drawing.ColorTranslator.FromHtml(tableData.BorderColor);

                                if (tableData.BorderColor == TransparentColor || tableData.BorderColor == "#ccc")
                                {
                                    table2[j+1, i - 1].BorderLeft.Width = 1;
                                }

                            }

                            if (i > 0 && data[0].Level == maxLevel)
                            {
                                var ind = maxLevel != 3 ? 1 : 0;
                                table1[j, i+ind ].FillFormat.FillType = FillType.Solid;
                                table1[j, i+ind ].FillFormat.SolidFillColor.Color = tableData.BorderColor == "#ccc" ? System.Drawing.ColorTranslator.FromHtml(TransparentColor) :
                                    System.Drawing.ColorTranslator.FromHtml(tableData.BorderColor);

                                if (tableData.BorderColor == TransparentColor || tableData.BorderColor == "#ccc")
                                {
                                    table1[j , i+ind ].BorderLeft.Width = 1;
                                }


                            }
                        }
                    }
                    table1.Rows.RemoveAt(1, false);
                    table.Rows.RemoveAt((int)MagicNumbers.two, false);
                    #endregion

                    #region slide2

                    header = (IAutoShape)pres.Slides[(int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == Title4);

                    selectionSummary = (IAutoShape)pres.Slides[(int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == "TextBox 19");

                    header.TextFrame.Text = StrategicPostures + opportunityFor.ToUpper(Culture);
                    selectionSummary.TextFrame.Text = summary;
                    table = (ITable)pres.Slides[(int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == "Table 17");
   
                    for (int i = 0; i < row.Count; i++)
                    {
                        if (i > 0)
                        {
                            table.Rows.AddClone(table.Rows[(int)MagicNumbers.two], false);
                        }


                        var data = responseData.DataList.Where(p => p.Occasion.ToUpper(Culture) == Constants.TotalinCaps && p.SelectedAttribute == row[i]).ToList();
                        ExportPptData tableData = new ExportPptData();
                        tableData = ReturnValues(data[0], Constants.Retail, tableData, -1);
                        if (data[0].Level == (int)MagicNumbers.three)
                        {
                            table[0, i + (int)MagicNumbers.two].TextFrame.Text = "";
                            table[1, i + (int)MagicNumbers.two].TextFrame.Text = row[i];
                            table[(int)MagicNumbers.two, i + (int)MagicNumbers.two].TextFrame.Text = tableData.Value;
                        }
                        else if (data[0].Level == (int)MagicNumbers.two)
                        {
                            table[0, i + (int)MagicNumbers.two].TextFrame.Text = row[i];
                            table[1, i + (int)MagicNumbers.two].TextFrame.Text = "";
                            table[(int)MagicNumbers.two, i + (int)MagicNumbers.two].TextFrame.Text = tableData.Value;
                            table.MergeCells(table[0, i + (int)MagicNumbers.two], table[1, i + (int)MagicNumbers.two], false);
                            table[(int)MagicNumbers.two, i + (int)MagicNumbers.two].BorderLeft.FillFormat.SolidFillColor.Color = System.Drawing.ColorTranslator.FromHtml("#ccc");
                        }
                        else
                        {
                            table[0, i + 1].TextFrame.Text = row[i];
                            table[(int)MagicNumbers.two, i + 1].TextFrame.Text = tableData.Value;
                        }
                    }
                    for (int i = 0; i < row.Count; i++)
                    {
                        for (int j = 1; j < col.Count; j++)
                        {
                            var data = responseData.DataList.Where(p => p.Occasion == col[j] && p.SelectedAttribute == row[i]).ToList();
                            ExportPptData tableData = new ExportPptData();
                            tableData = ReturnValues(data[0], Constants.Retail, tableData, i);
                            index = data[0].Level != 1 ? 1 : 0;
                            table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Text = tableData.Value;
                            table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.FillType = FillType.Solid;
                            table[j + (int)MagicNumbers.two, i + 1 + index].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FillFormat.SolidFillColor.Color = tableData.Color;
                            table[j + (int)MagicNumbers.two, i + 1 + index].BorderLeft.FillFormat.SolidFillColor.Color = tableData.BorderColor == TransparentColor ? 
                                System.Drawing.ColorTranslator.FromHtml("#ccc") :System.Drawing.ColorTranslator.FromHtml(tableData.BorderColor);
                            if (tableData.BorderColor ==TransparentColor || tableData.BorderColor == "#ccc")
                            {
                                table[j + (int)MagicNumbers.two, i + 1 + index].BorderLeft.Width = 1;
                            }
                           
                        }
                    }

                    table.Rows.RemoveAt((int)MagicNumbers.two, false);
                    #endregion


                    if(request.RespType != "1,2,3" || request.SelectionSummary.Replace("||", "|").Split('|').Any(s => s.IndexOf("ADDITIONAL FILTERS") > -1))
                    {
                        pres.Slides.RemoveAt((int)MagicNumbers.two);
                    }



                }
                pptName = SaveFile(pres, name);
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
            }
            return pptName;
        }

        private ExportPptData ReturnValues(OspResponseData row, string type, ExportPptData obj, int index)
        {
            obj.Value = "NA";
            obj.Color = Color.Black;
            obj.Change = "";
            obj.BorderColor = "";
            obj.Retail = "";

            if (row.ColorScheme == "LL" || row.ColorScheme == "SL" || row.ColorScheme == "LLL")
            {
                obj.BorderColor = "#FF0000";


            }
            else if (row.ColorScheme == "SLL" || row.ColorScheme == "SSL" || row.ColorScheme == "SS")
            {
                obj.BorderColor = "#FFC925";


            }

            else if (row.ColorScheme == "LS" || row.ColorScheme == "LSL" || row.ColorScheme == "LSS")
            {

                obj.BorderColor = "#7030A0";

            }

            else if (row.ColorScheme == "LLS" || row.ColorScheme == "SLS")
            {
                obj.BorderColor = "#0070C0";

            }

            else
            {
                obj.BorderColor = "#B7B7B7";

            }


            if (type == Constants.Retail)
            {
                if (row.RetailValue != null)
                {
                    obj.Value ="$" + Math.Round(((double)row.RetailValue * (int)MagicNumbers.hundred) / (int)MagicNumbers.hundred,
                        (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture);
                }

                if (row.USampleSize < InsufficientSample && row.Occasion.ToUpper(Culture) == Constants.TotalinCaps)
                {
                    obj.Retail = "LS";
                }
                else
                {
                    if (row.Occasion.ToUpper(Culture) != Constants.TotalinCaps && index != -1 && TotalSampleSize[index] < InsufficientSample)
                    {
                        obj.Retail = "LS";
                    }
                      
                }
               
            }
            else if ((type == Constants.DBParameters.Distribution && row.Distribution != null) || (type == Constants.DBParameters.Share && row.Share != null))
            {

                if (row.USampleSize == null)
                {
                    obj.Value = "NA";
                }
                else if (row.USampleSize < InsufficientSample && row.Occasion.ToUpper(Culture) == Constants.TotalinCaps)
                {
                    obj.Value = "LS";
                }
                else if (row.Occasion.ToUpper(Culture) != Constants.TotalinCaps && index != -1 && TotalSampleSize[index] < InsufficientSample)
                {
                    obj.Value = "LS";
                }
                else
                {
                    if (row.Occasion.ToUpper(Culture) == Constants.TotalinCaps)
                    {
                        if (row.USampleSize >= InsufficientSample && row.USampleSize <= LowSample)
                        {
                            obj.Color = Color.Gray;
                        }
                    }
                    else if (index!=-1 && TotalSampleSize[index] <= LowSample)
                        obj.Color = Color.Gray;

                    obj.Value = type == Constants.DBParameters.Distribution ? Math.Round((double)(row.Distribution * (int)MagicNumbers.hundred), 2, MidpointRounding.AwayFromZero).ToString("0.00", Culture) + "%" :
                                                    Math.Round((double)(row.Share * (int)MagicNumbers.hundred), 2, MidpointRounding.AwayFromZero).ToString("0.00", Culture) + "%";

                }

            }
            else if (type == "Weighted")
            {
                if (row.WSampleSize != null)
                {
                    obj.Value = Math.Round((double)row.WSampleSize, 0, MidpointRounding.AwayFromZero).ToString(Culture);
                    if (row.Occasion.ToUpper(Culture) == Constants.TotalinCaps)
                    {
                        if (row.USampleSize <= LowSample)
                        {
                            obj.Color = Color.Gray;
                        }
                    }
                    else if (index != -1 && TotalSampleSize[index] <= LowSample)
                        obj.Color = Color.Gray;
                }

              

            }
            else
            {
                if (row.USampleSize != null)
                {
                    obj.Value = Math.Round((double)row.USampleSize, 0, MidpointRounding.AwayFromZero).ToString(Culture);
                    if (row.Occasion.ToUpper(Culture) == Constants.TotalinCaps)
                    {
                        if (row.USampleSize <= LowSample)
                        {
                            obj.Color = Color.Gray;
                        }
                    }
                    else if (index != -1 && TotalSampleSize[index] <= LowSample)
                        obj.Color = Color.Gray;
                }
            }


            if (obj.Value != "NA" && obj.Value != "LS" && row.Significance != null && obj.Color != Color.Gray)
            {
                if ((type == Constants.DBParameters.RetailValue && obj.Retail!="LS") || type == Constants.DBParameters.Distribution)
                {
                    if (row.Significance > 0)
                    {
                        obj.Color = Color.Green;
                    }
                    else if (row.Significance < 0)
                    {
                        obj.Color = Color.Red;
                    }
                    else
                    {
                        obj.Color = Color.Black;
                    }
                }
                else
                {
                    if (type == Constants.DBParameters.Share)
                    {
                        if (row.ShareSignificance > 0)
                        {
                            obj.Color = Color.Green;
                        }
                        else if (row.ShareSignificance < 0)
                        {
                            obj.Color = Color.Red;
                        }
                        else
                        {
                            obj.Color = Color.Black;
                        }
                    }
                       
                }


            }

            if (type == Constants.DBParameters.RetailValue || type == Constants.DBParameters.Distribution)
            {
                if (obj.Value != "NA" && obj.Value != "LS" && row.Change != null && row.USampleSize != null)
                {
                    var change = Math.Round(((double)row.Change * (int)MagicNumbers.ten) / (int)MagicNumbers.ten, 1, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                    obj.Change = change;
                }
            }
            else 
            {
                if (type == DBParameters.Share && obj.Value != "NA" && obj.Value != "LS" && row.ShareChange != null && row.ShareUSampleSize != null)
                {
                        var change = Math.Round(((double)row.ShareChange * (int)MagicNumbers.ten) / (int)MagicNumbers.ten, 1, MidpointRounding.AwayFromZero).ToString("0.0", Culture);
                        obj.Change =change;
                }
                   
            }


            if (obj.Value == "NA" || obj.Value == "LS" || row.SelectedAttribute.ToUpper(Culture) == Constants.TotalinCaps)
            {
                obj.BorderColor = "#ccc";
            }

            if (obj.Retail == "LS" || row.Level != maxLevel)
            {
                obj.BorderColor =TransparentColor;
            }


            return obj;
        }

        private static string SaveFile(IPresentation pres, string name)
        {
            var dirName = HttpContext.Current.Session.SessionID;
            var context = HttpContext.Current;
            //Set License
            Aspose.Slides.License license = new Aspose.Slides.License();
            license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));
            string destFile = "";
            var fileName = name + "-" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Constants.Culture) + ".pptx";
            /*create the directory with session name*/
            if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
            {
                Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
            }
            Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));
            destFile = context.Server.MapPath(TempFilePath + dirName + Constants.PathDelimiter + fileName);
            pres.Save(destFile, Aspose.Slides.Export.SaveFormat.Pptx);
            return TempFilePath + dirName + Constants.PathDelimiter + fileName;
        }

        public static string GetCurrencySymbol(string selectedMarket)
        {
            string symbol = "$";
            if (selectedMarket != null)
            {
                if (selectedMarket.Contains("Brazil"))
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
            return Math.Min(Convert.ToDouble(size.Height + (int)MagicNumbers.ten), ExcelMaxHeight);
        }
        public string AdvancedAnalyticsExcelExportOsp(OspRequest request, OspResponse response, HttpContextBase context)
        {
            maxLevel = response.DataList.OrderByDescending(x => x.Level).ToList()[0].Level;
            if (response == null)
            {
                response = new OspResponse();
            }
            if (request == null)
            {
                request = new OspRequest();
            }

            string filepath = context.Server.MapPath("~/Templates/Occasion_Strategic_Postures_Excel_Template.xlsx");
            var dirName = HttpContext.Current.Session.SessionID;
            var strpath = TempFilePath + dirName + "/OSP_Export" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Constants.Culture) + ".xlsx";

            if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
            {
                Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
            }
            Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));

            string destFile = context.Server.MapPath(strpath);
            const ExcelBorderStyle borderStyle = ExcelBorderStyle.Thin;
            const bool isWrapText = true;
            const bool isMerge = true;

            var file = new FileInfo(destFile);
            File.Copy(filepath, destFile, true);

            if (request != null)
            {

                using (ExcelPackage p = new ExcelPackage(file))
                {
                    var flag = false;
                    for (int sheet = 1; sheet <= (int)Constants.MagicNumbers.four; sheet++)
                    {
                        ExcelWorksheet ws1 = flag ? p.Workbook.Worksheets[sheet - 1] : p.Workbook.Worksheets[sheet];
                        var summary = request.SelectionSummary.Replace("||", "|").Split('|');
                        if (sheet == (int)Constants.MagicNumbers.two && (request.RespType != "1,2,3" || summary.Any(s => s.IndexOf("ADDITIONAL FILTERS") >-1)))
                        {
                            continue;
                        }
                        if ((request.OppurtunityFor == "1" || request.OppurtunityFor == "2" || request.OppurtunityFor == "6" 
                            || request.OppurtunityFor == "14") &&  sheet == (int)Constants.MagicNumbers.three)
                        {
                            p.Workbook.Worksheets.Delete(ws1);
                            flag = true;
                            continue;
                        }
                        else
                        {
                            if (sheet == (int)Constants.MagicNumbers.three)
                            {
                                ws1.Name = request.OppurtunityFor == "7" || request.OppurtunityFor == "8" ? "Share of Channel" : "Share of Category";
                                ws1.Cells[(int)MagicNumbers.twentyone + 1, (int)MagicNumbers.two, (int)MagicNumbers.twentyone+ (int)MagicNumbers.two, (int)MagicNumbers.three].Value = ws1.Name;
                            }
                               
                        }
                        //Get the column names
                        var colNames = response.DataList.GroupBy(x => x.Occasion).AsEnumerable().Select(x => x.First()).ToList();

                        //Get the row names
                        List<OspResponseData> rowNames = new List<OspResponseData>();
                        rowNames.AddRange(response.DataList.GroupBy(x => new { x.SelectedAttribute, x.Level })
                            .Select(x => new OspResponseData { SelectedAttribute = x.Key.SelectedAttribute, Level = x.Key.Level }).ToList());

                        int selsumstartRow = (int)MagicNumbers.six;
                        const int colIndx = (int)MagicNumbers.four;
                        int rowCount = rowNames.Count;
                        int startRow = 22 + rowCount;
                        int rowStart = 13 + rowCount;
                        const int retailStart = 13;
                        Color significanceColour;

                        if (rowCount > (int)MagicNumbers.two)
                        {
                            ws1.InsertRow(retailStart + 1, rowCount - (int)MagicNumbers.two, retailStart);
                        }
                           
                        //Ignore error for Number as Text issue in Excel
                        ws1.IgnoredError.Range = ws1.Dimension.Address;
                        ws1.IgnoredError.NumberStoredAsText = true;

                        //Selection Summary
                     
                        foreach (var item in summary)
                        {
                            while (selsumstartRow <= rowStart)
                            {
                                if (item.Split(':')[0].ToLower(Constants.Culture).Trim() == "benchmark")
                                {
                                    ws1.Cells[rowStart-1, colIndx].Value = item.Split(':')[1];
                                    break;
                                }
                                else if (ws1.Cells[selsumstartRow, colIndx - (int)Constants.MagicNumbers.two].Value != null &&
                                    ws1.Cells[selsumstartRow, colIndx - (int)Constants.MagicNumbers.two].Value.ToString().ToLower(Constants.Culture).Trim() ==
                                    item.Split(':')[0].ToLower(Constants.Culture).Trim())
                                {
                                    var items = item.Split(':');
                                    ws1.Cells[selsumstartRow, colIndx, selsumstartRow, colIndx + mergeColumns].Merge = isMerge;

                                    string value = items[1];

                                    switch (items[1].ToLower(Constants.Culture).Trim())
                                    {
                                        case "row":
                                        case "column":
                                        case "survey category/item/brand":
                                        case "custom category/item/brand":
                                        case "channel/retailer":
                                        case "custom channel/retailer":
                                            {
                                                value = item.Replace(items[0] + ":", "");
                                                break;
                                            }
                                        default:
                                            {
                                                break;
                                            }
                                    }
                                    switch (items[0].ToString(Constants.Culture).ToLower(Constants.Culture).Trim())
                                    {
                                        case "markets":
                                            value = item.Replace(items[0] + ":", "");
                                            break;

                                        case "additional filters":
                                        case "category/item/brand":
                                        case "channel/retailer":
                                        case "time period":
                                            {
                                                value = item.Replace(items[0] + ":", "");
                                                break;
                                            }

                                        case "category/item-manufacturer":
                                            {
                                                value = item.Replace(items[0] + ":" + items[1] + ":", "");
                                                break;
                                            }

                                        case "time period1":
                                            {
                                                value = items.Length > (int)Constants.MagicNumbers.two ? items[(int)Constants.MagicNumbers.two].ToString(Constants.Culture) : "";
                                                break;
                                            }
                                        default:
                                            {
                                                break;
                                            }
                                    }

                                    ws1.Cells[selsumstartRow, colIndx].Value = value.Trim();
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

                        //Retail Sales Value in Selection Summary

                        var retailValues = request.FilterIDs.Split(',');
                        for (var index = 0; index < rowCount - 1; index++)
                        {
                            ws1.Cells[retailStart + index, colIndx, retailStart + index, colIndx + (int)MagicNumbers.six].Merge = true;
                            ws1.Cells[retailStart + index, colIndx].Value = rowNames[index + 1].SelectedAttribute + ": " +
                                (retailValues[index].Split('|')[1] == "-1" ? "NA" : ("$" +
                                String.Format(Culture, Constants.CurrencyFormat, Convert.ToDecimal(retailValues[index].Split('|')[1], Culture))));
                        }

                        if (request.OppurtunityFor == "1" || request.OppurtunityFor == "2" || request.OppurtunityFor == "6" || request.OppurtunityFor == "14")
                        {
                            ws1.Cells[startRow - (int)MagicNumbers.four, (int)MagicNumbers.four].Clear();
                            ws1.Cells[startRow - (int)MagicNumbers.four, (int)MagicNumbers.eight].Clear();
                            ws1.Cells[startRow - (int)MagicNumbers.four, (int)MagicNumbers.seven].Style.Border.Right.Style = ExcelBorderStyle.None;
                        }

                        var cstartCol = 0;
                        var rstartRow = startRow;
                        var isLSFlag = false;
                        var isGreyFlag =false;

                        OspResponseData rowObj;
                        ExportPptData tableData = new ExportPptData();
                        //For Row Labels
                        foreach (var rowitem in rowNames)
                        {
                            cstartCol = colIndx;
                            if (sheet == (int)MagicNumbers.three && rowitem.Level != (int)MagicNumbers.three)
                            {
                                continue;
                            }

                            ws1.Cells[rstartRow, cstartCol - (int)MagicNumbers.two].Value = rowitem.SelectedAttribute;
                            if (rowitem.Level == (int)MagicNumbers.three)
                            {
                                ws1.Cells[rstartRow, cstartCol - (int)MagicNumbers.two].Style.Indent = (int)MagicNumbers.three;
                            }
                            else
                            {
                                ws1.Cells[rstartRow, cstartCol - (int)MagicNumbers.two].Style.Font.Bold = true;
                            }
                            ws1.Cells[rstartRow, cstartCol - (int)MagicNumbers.two].Style.Border.BorderAround(borderStyle);
                            ws1.Cells[rstartRow, cstartCol - (int)MagicNumbers.one].Style.Border.BorderAround(borderStyle);
                            isLSFlag = false;
                            isGreyFlag =false;

                            foreach (var colitem in colNames)
                            {
                                rowObj = response.DataList.FirstOrDefault(x => x.SelectedAttribute == rowitem.SelectedAttribute && x.Occasion == colitem.Occasion);

                                ws1.Cells[rstartRow, cstartCol].Style.Border.BorderAround(borderStyle);

                                if (sheet == (int)Constants.MagicNumbers.one)
                                {
                                    tableData = ReturnValues(rowObj, Constants.DBParameters.Distribution, tableData, -1);

                                    if (rowObj.Occasion == Constants.TotalAttribute)
                                    {
                                        if (tableData.Value == "LS")
                                            isLSFlag = true;
                                        else if (tableData.Color == Color.Gray)
                                            isGreyFlag = true;
                                    }
                                   

                                    //Adding Data
                                    if (isLSFlag || tableData.Value == "NA")
                                    {
                                        ws1.Cells[rstartRow, cstartCol].Value = "";
                                    }
                                    else
                                    {
                                        ws1.Cells[rstartRow, cstartCol].Value = (Convert.ToDouble(tableData.Value.Replace("%", String.Empty), Culture)) / (int)MagicNumbers.hundred;
                                        if (colitem.Occasion != Constants.TotalAttribute && rowitem.SelectedAttribute != Constants.TotalAttribute && tableData.BorderColor != TransparentColor)
                                        {
                                            ws1.Cells[rstartRow, cstartCol].Style.Border.Left.Style = ExcelBorderStyle.Thick;
                                            ws1.Cells[rstartRow, cstartCol].Style.Border.Left.Color.SetColor(System.Drawing.ColorTranslator.FromHtml(tableData.BorderColor));
                                        }
                                        ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(isGreyFlag?Color.Gray:tableData.Color);
                                    }

                                    //Adding Change Values
                                    if (rowObj.Occasion != Constants.TotalAttribute && !isLSFlag && tableData.Change!="")
                                    {
                                        ws1.Cells[rstartRow, cstartCol + colNames.Count - (int)Constants.MagicNumbers.one].Style.Numberformat.Format = "###0.0";
                                        ws1.Cells[rstartRow, cstartCol + colNames.Count - (int)Constants.MagicNumbers.one].Value = Convert.ToDouble(tableData.Change);
                                    }
                                    ws1.Cells[rstartRow, cstartCol + colNames.Count - (int)Constants.MagicNumbers.one].Style.Border.BorderAround(borderStyle);
                                }
                                else if (sheet == (int)Constants.MagicNumbers.two)
                                {
                                    tableData = ReturnValues(rowObj, Constants.Retail, tableData, -1);

                                    if(tableData.Retail=="LS")
                                    {
                                        isLSFlag = true;
                                    }

                                    if (rowObj.RetailValue != null)
                                    {
                                        ws1.Cells[rstartRow, cstartCol].Value = rowObj.RetailValue;
                                        if (colitem.Occasion != Constants.TotalAttribute && rowitem.SelectedAttribute != Constants.TotalAttribute
                                            && tableData.BorderColor != TransparentColor && !isLSFlag)
                                        {

                                            ws1.Cells[rstartRow, cstartCol].Style.Border.Left.Style = ExcelBorderStyle.Thick;
                                            ws1.Cells[rstartRow, cstartCol].Style.Border.Left.Color.SetColor(System.Drawing.ColorTranslator.FromHtml(tableData.BorderColor));


                                        }
                                        ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(tableData.Color);
                                    }
                                    else
                                    {
                                        ws1.Cells[rstartRow, cstartCol].Value = "";
                                    }
                                }
                                else if (sheet == (int)MagicNumbers.three)
                                {
                                    tableData = ReturnValues(rowObj, Constants.DBParameters.Share, tableData, -1);

                                    if (rowObj.Occasion == Constants.TotalAttribute)
                                    {
                                        if (tableData.Value == "LS")
                                            isLSFlag = true;
                                        else if (tableData.Color == Color.Gray)
                                            isGreyFlag = true;
                                    }

                                    //Adding Data
                                    if (isLSFlag || tableData.Value == "NA")
                                    {
                                        ws1.Cells[rstartRow, cstartCol].Value = "";
                                    }
                                    else
                                    {
                                        ws1.Cells[rstartRow, cstartCol].Value = (Convert.ToDouble(tableData.Value.Replace("%", String.Empty), Culture)) / (int)MagicNumbers.hundred;
                                        if (colitem.Occasion != Constants.TotalAttribute && rowitem.SelectedAttribute != Constants.TotalAttribute && tableData.BorderColor !=TransparentColor)
                                        {
                                            ws1.Cells[rstartRow, cstartCol].Style.Border.Left.Style = ExcelBorderStyle.Thick;
                                            ws1.Cells[rstartRow, cstartCol].Style.Border.Left.Color.SetColor(System.Drawing.ColorTranslator.FromHtml(tableData.BorderColor));
                                        }
                                        ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(isGreyFlag?Color.Gray:tableData.Color);
                                    }

                                    //Adding Change Values
                                    if (rowObj.Occasion != Constants.TotalAttribute && !isLSFlag && tableData.Change!="")
                                    {
                                        ws1.Cells[rstartRow, cstartCol + colNames.Count - (int)Constants.MagicNumbers.one].Style.Numberformat.Format = "###0.0";
                                        ws1.Cells[rstartRow, cstartCol + colNames.Count - (int)Constants.MagicNumbers.one].Value = Convert.ToDouble(tableData.Change);
                                    }
                                    ws1.Cells[rstartRow, cstartCol + colNames.Count - (int)Constants.MagicNumbers.one].Style.Border.BorderAround(borderStyle);
                                }
                                else 
                                {
                                    if (sheet == (int)Constants.MagicNumbers.four)
                                    {
                                        tableData = ReturnValues(rowObj, Constants.DBParameters.Unweighted, tableData, -1);
                                        if (rowObj.Occasion == Constants.TotalAttribute)
                                        {
                                            if (tableData.Color == Color.Gray)
                                                isGreyFlag = true;
                                        }
                                        significanceColour =isGreyFlag ? Color.Gray : Color.Black;

                                        ws1.Cells[rstartRow, cstartCol].Value = Math.Round(Convert.ToDouble(rowObj.WSampleSize, Culture));
                                        ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(significanceColour);
                                        significanceColour = isGreyFlag ? Color.Gray : Color.Black;

                                        ws1.Cells[rstartRow, cstartCol + colNames.Count].Value = Math.Round(Convert.ToDouble(rowObj.USampleSize, Culture));
                                        ws1.Cells[rstartRow, cstartCol + colNames.Count].Style.Font.Color.SetColor(significanceColour);
                                        ws1.Cells[rstartRow, cstartCol + colNames.Count].Style.Border.BorderAround(borderStyle);
                                    }
                                       
                                }
                                cstartCol += 1;
                            }
                            rstartRow += 1;
                        }
                    }
                    if (request.RespType != "1,2,3" || request.SelectionSummary.Replace("||", "|").Split('|').Any(s => s.IndexOf("ADDITIONAL FILTERS") >-1))
                    {
                        p.Workbook.Worksheets.Delete(p.Workbook.Worksheets[(int)MagicNumbers.two]);
                    }
                    p.Save();
                }
            }
            return strpath;
        }

        public string AdvancedAnalyticsExcelExportOspInner(OspRequest request, OspResponse response, OspInnerResponse innerResponse, HttpContextBase context)
        {

            string filepath = context.Server.MapPath(Templates.ExportExcelProfile);
            var dirName = HttpContext.Current.Session.SessionID;
            var strpath = TempFilePath + dirName + "/OSPProfile_Export" + DateTime.Now.ToString("dd-MM-yyyy-hhmm", Constants.Culture) + ".xlsx";

            if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
            {
                Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
            }
            Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));

            string destFile = context.Server.MapPath(strpath);
            const ExcelBorderStyle borderStyle = ExcelBorderStyle.Thin;
            const bool isWrapText = true;
            const bool isMerge = true;
            string selectedMarket = "";

            var file = new FileInfo(destFile);
            File.Copy(filepath, destFile, true);

            if (request != null)
            {
                using (ExcelPackage p = new ExcelPackage(file))
                {
                    string[] groupName = { "Demographics", "Motivations", "5Ws" };
                    for (int sheet = 1; sheet <= (int)Constants.MagicNumbers.three; sheet++)
                    {
                        ExcelWorksheet ws1 = p.Workbook.Worksheets[sheet];

                        //Ignore error for Number as Text issue in Excel
                        ws1.IgnoredError.Range = ws1.Dimension.Address;
                        ws1.IgnoredError.NumberStoredAsText = true;

                        //Get the row names
                        List<OspResponseData> rowNames = new List<OspResponseData>();
                        rowNames.AddRange(response.DataList.GroupBy(x => new { x.SelectedAttribute })
                            .Select(x => new OspResponseData { SelectedAttribute = x.Key.SelectedAttribute }).ToList());

                        int selsumstartRow = (int)MagicNumbers.six;
                        const int colIndx = (int)MagicNumbers.four;
                        int rowCount = rowNames.Count;
                        int startRow = 20 + rowCount;
                        int rowStart = 13 + rowCount;
                        const int retailStart = 13;

                        if (rowCount > (int)MagicNumbers.two)
                        {
                            ws1.InsertRow(retailStart + 1, rowCount - (int)MagicNumbers.two, retailStart);
                        }


                        //Selection Summary
                        var summary = request.SelectionSummary.Replace("||", "|").Split('|');

                        foreach (var item in summary)
                        {
                            while (selsumstartRow <= rowStart)
                            {
                                if (item.Split(':')[0].ToLower(Constants.Culture).Trim() == "benchmark")
                                {
                                    ws1.Cells[rowStart-1, colIndx].Value = item.Split(':')[1];
                                    break;
                                }
                                else if (ws1.Cells[selsumstartRow, colIndx - (int)Constants.MagicNumbers.two].Value != null &&
                                    ws1.Cells[selsumstartRow, colIndx - (int)Constants.MagicNumbers.two].Value.ToString().ToLower(Constants.Culture).Trim() ==
                                    item.Split(':')[0].ToLower(Constants.Culture).Trim())
                                {
                                    var items = item.Split(':');
                                    ws1.Cells[selsumstartRow, colIndx, selsumstartRow, colIndx + mergeColumns].Merge = isMerge;

                                    string value = items[1];

                                    switch (items[1].ToLower(Constants.Culture).Trim())
                                    {
                                        case "row":
                                        case "column":
                                        case "survey category/item/brand":
                                        case "custom category/item/brand":
                                        case "channel/retailer":
                                        case "custom channel/retailer":
                                            {
                                                value = item.Replace(items[0] + ":", "");
                                                break;
                                            }
                                        default:
                                            {
                                                break;
                                            }
                                    }
                                    switch (items[0].ToString(Constants.Culture).ToLower(Constants.Culture).Trim())
                                    {
                                        case "markets":
                                            selectedMarket = items[(int)Constants.MagicNumbers.two];
                                            value = item.Replace(items[0] + ":", "");
                                            break;

                                        case "additional filters":
                                        case "category/item/brand":
                                        case "channel/retailer":
                                        case "time period":
                                            {
                                                value = item.Replace(items[0] + ":", "");
                                                break;
                                            }

                                        case "category/item-manufacturer":
                                            {
                                                value = item.Replace(items[0] + ":" + items[1] + ":", "");
                                                break;
                                            }

                                        case "time period1":
                                            {
                                                value = items.Length > (int)Constants.MagicNumbers.two ? items[(int)Constants.MagicNumbers.two].ToString(Constants.Culture) : "";
                                                break;
                                            }
                                        default:
                                            {
                                                break;
                                            }
                                    }

                                    ws1.Cells[selsumstartRow, colIndx].Value = value.Trim();
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

                        //Retail Sales Value in Selection Summary

                        var retailValues = request.FilterIDs.Split(',');
                        for (var index = 0; index < rowCount - 1; index++)
                        {
                            ws1.Cells[retailStart + index, colIndx, retailStart + index, colIndx + (int)MagicNumbers.six].Merge = true;
                            ws1.Cells[retailStart + index, colIndx].Value = rowNames[index + 1].SelectedAttribute + ": " +
                                (retailValues[index].Split('|')[1] == "-1" ? "NA" : ("$" + 
                                String.Format(Culture, Constants.CurrencyFormat, Convert.ToDecimal(retailValues[index].Split('|')[1], Culture))));
                        }

                        //Table data
                        var groupList = innerResponse.DataList.Where(x => x.GroupName == groupName[sheet - 1]).ToList();
                        var headerList = groupList.Select(x => x.Header).Distinct().ToList();
                        const int cstartCol = colIndx;
                        var rstartRow = startRow;
                        ws1.Cells[rstartRow - (int)MagicNumbers.two, (int)MagicNumbers.two].Value = request.ColumnName + " X " + request.RowName;
                        ws1.Cells[rstartRow - (int)MagicNumbers.two, (int)MagicNumbers.five].Value = request.ColumnName;
                        ws1.Cells[rstartRow - (int)MagicNumbers.two, (int)MagicNumbers.seven].Value = request.ColumnName;
                        ws1.Cells[rstartRow - (int)MagicNumbers.two, (int)MagicNumbers.ten].Value = request.ColumnName + " X " + request.RowName;
                        ws1.Cells[rstartRow - (int)MagicNumbers.two, (int)MagicNumbers.thirteen].Value = request.ColumnName;
                        ws1.Cells[rstartRow - (int)MagicNumbers.two, (int)MagicNumbers.fifteen].Value = request.ColumnName;
                        rstartRow = sheet == (int)MagicNumbers.two ? (startRow - 1) : startRow;

                        OspInnerResponseData rowObj;
                        ExportExcelProfileData tableData = new ExportExcelProfileData();
                        foreach (var header in headerList)
                        {
                            var childList = groupList.Where(x => x.Header == header).ToList();
                            ws1.Cells[rstartRow, (int)MagicNumbers.two].Value = header;
                            ws1.Cells[rstartRow, (int)MagicNumbers.two].Style.Font.Bold = true;
                            ws1.Cells[rstartRow, (int)MagicNumbers.ten].Value = header;
                            ws1.Cells[rstartRow, (int)MagicNumbers.ten].Style.Font.Bold = true;

                            for (int i = (int)MagicNumbers.two; i <= (int)MagicNumbers.seven; i++)
                            {
                                ws1.Cells[rstartRow, i].Style.Border.BorderAround(borderStyle);
                            }

                            for (int i = 10; i <= (int)MagicNumbers.fifteen; i++)
                            {
                                ws1.Cells[rstartRow, i].Style.Border.BorderAround(borderStyle);
                            }
                            rstartRow++;
                            for (int j = 0; j < childList.Count; j++)
                            {
                                rowObj = childList[j];
                                tableData = ReturnInnerValues(rowObj, tableData);
                                ws1.Cells[rstartRow, (int)MagicNumbers.two].Value = childList[j].Attribute;
                                ws1.Cells[rstartRow, (int)MagicNumbers.two].Style.Indent = (int)MagicNumbers.two;
                                ws1.Cells[rstartRow, (int)MagicNumbers.two].Style.Border.BorderAround(borderStyle);
                                ws1.Cells[rstartRow, (int)MagicNumbers.three].Style.Border.BorderAround(borderStyle);
                                ws1.Cells[rstartRow, (int)MagicNumbers.ten].Value = childList[j].Attribute;
                                ws1.Cells[rstartRow, (int)MagicNumbers.ten].Style.Indent = (int)MagicNumbers.two;
                                ws1.Cells[rstartRow, (int)MagicNumbers.ten].Style.Border.BorderAround(borderStyle);
                                ws1.Cells[rstartRow, (int)MagicNumbers.eleven].Style.Border.BorderAround(borderStyle);

                                //Data
                                if (rowObj.Attribute == "Average HH Income")
                                {
                                    ws1.Cells[rstartRow, cstartCol].Value = GetCurrencySymbol(selectedMarket) + String.Format(Culture, Constants.CurrencyFormat, rowObj.TotalValue) + "K";
                                    ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(tableData.TotalColor);

                                    ws1.Cells[rstartRow, cstartCol + 1].Value = GetCurrencySymbol(selectedMarket) + String.Format(Culture, Constants.CurrencyFormat, rowObj.Value) + "K";
                                    ws1.Cells[rstartRow, cstartCol + 1].Style.Font.Color.SetColor(tableData.Color);


                                }
                                else
                                {
                                    if (tableData.TotalValue == "LS" || tableData.TotalValue == "NA")
                                    {
                                        ws1.Cells[rstartRow, cstartCol].Value = "";
                                    }
                                    else
                                    {
                                        ws1.Cells[rstartRow, cstartCol].Value = (Convert.ToDouble(tableData.TotalValue.Replace("%", String.Empty), Culture)) / (int)MagicNumbers.hundred;
                                        ws1.Cells[rstartRow, cstartCol].Style.Font.Color.SetColor(tableData.TotalColor);
                                    }

                                    if (tableData.Value == "LS" || tableData.Value == "NA")
                                    {
                                        ws1.Cells[rstartRow, cstartCol + 1].Value = "";
                                    }
                                    else
                                    {
                                        ws1.Cells[rstartRow, cstartCol + 1].Value = (Convert.ToDouble(tableData.Value.Replace("%", String.Empty), Culture)) / (int)MagicNumbers.hundred;
                                        ws1.Cells[rstartRow, cstartCol + 1].Style.Font.Color.SetColor(tableData.Color);
                                    }

                                    if (tableData.TotalChange != "")
                                    {
                                        ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.two].Style.Numberformat.Format = "###0.00";
                                        ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.two].Value = Convert.ToDouble(tableData.TotalChange);
                                    }                               
                                    if (tableData.Change != "")
                                    {
                                        ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.three].Style.Numberformat.Format = "###0.00";
                                        ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.three].Value = Convert.ToDouble(tableData.Change);
                                    }
                                   
                                }
                                ws1.Cells[rstartRow, cstartCol].Style.Border.BorderAround(borderStyle);
                                ws1.Cells[rstartRow, cstartCol + 1].Style.Border.BorderAround(borderStyle);
                                ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.two].Style.Border.BorderAround(borderStyle);
                                ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.three].Style.Border.BorderAround(borderStyle);

                                //Sample Size

                                if (rowObj.WTotalSampleSize < LowSample)
                                {
                                    ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight].Style.Font.Color.SetColor(Color.Gray);
                                }
                                if (rowObj.WTotalSampleSize != null)
                                    ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight].Value = Convert.ToInt32(Math.Round((double)rowObj.WTotalSampleSize));

                                if (rowObj.WSampleSize < LowSample)
                                {
                                    ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight + 1].Style.Font.Color.SetColor(Color.Gray);
                                }

                                if (rowObj.WSampleSize != null)
                                ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight + 1].Value =Convert.ToInt32( Math.Round((double)rowObj.WSampleSize));

                                if (rowObj.UTotalSampleSize < LowSample)
                                {
                                    ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight + (int)MagicNumbers.two].Style.Font.Color.SetColor(Color.Gray);
                                }

                                ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight + (int)MagicNumbers.two].Value = Convert.ToInt32(rowObj.UTotalSampleSize);

                                if (rowObj.USampleSize < LowSample)
                                {
                                    ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight + (int)MagicNumbers.three].Style.Font.Color.SetColor(Color.Gray);
                                }
                                ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight + (int)MagicNumbers.three].Value = Convert.ToInt32(rowObj.USampleSize);
                                ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight].Style.Border.BorderAround(borderStyle);
                                ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight + 1].Style.Border.BorderAround(borderStyle);
                                ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight + (int)MagicNumbers.two].Style.Border.BorderAround(borderStyle);
                                ws1.Cells[rstartRow, cstartCol + (int)MagicNumbers.eight + (int)MagicNumbers.three].Style.Border.BorderAround(borderStyle);

                                rstartRow++;
                            }

                        }
                    }
                    p.Save();
                }
            }
            return strpath;
        }

        private static ExportExcelProfileData ReturnInnerValues(OspInnerResponseData row, ExportExcelProfileData obj)
        {
            obj.Value = "NA";
            obj.Color = Color.Black;
            obj.TotalColor = Color.Black;
            obj.Change = "";
            obj.TotalChange = "";
            obj.TotalValue = "";

            if (row.USampleSize == null)
            {
                obj.Value = "NA";
            }
            else if (row.USampleSize < InsufficientSample)
            {
                obj.Value = "LS";
            }
            else
            {
                if (row.USampleSize >= InsufficientSample && row.USampleSize <= LowSample)
                {
                    obj.Color = Color.Gray;
                }
                obj.Value = row.Header.ToUpper(Culture) == Constants.AvgItemsPerOccasion ?
                    Math.Round(((double)row.Value * (int)MagicNumbers.hundred) / (int)MagicNumbers.hundred, (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture) :
                    Math.Round(((double)row.Value * (int)MagicNumbers.hundred), (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture) + "%";

            }

            if (row.UTotalSampleSize == null)
            {

                obj.TotalValue = "NA";
            }
            else if (row.UTotalSampleSize < InsufficientSample)
            {
                obj.TotalValue = "LS";

            }

            else
            {
                if (row.UTotalSampleSize >= InsufficientSample && row.UTotalSampleSize <= LowSample)
                {
                    obj.TotalColor = Color.Gray;
                }
                obj.TotalValue = row.Header.ToUpper(Culture) == Constants.AvgItemsPerOccasion ?
                     Math.Round(((double)row.TotalValue), (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture) :
                    Math.Round(((double)row.TotalValue * (int)MagicNumbers.hundred), (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture) + "%";

            }

            if (obj.Value != "NA" && obj.Value != "LS" && row.Significance != null && obj.Color != Color.Gray)
            {
                if (row.Significance > 0)
                {
                    obj.Color = Color.Green;
                }
                else if (row.Significance < 0)
                {
                    obj.Color = Color.Red;
                }
                else
                {
                    obj.Color = Color.Black;
                }
            }


            if (obj.Value != "NA" && obj.Value != "LS" && row.Change != null && row.USampleSize != null)
            {

                obj.Change = Math.Round(((double)row.Change), (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture);

            }

            if (obj.TotalValue != "NA" && obj.TotalValue != "LS" && row.TotalChange != null && row.UTotalSampleSize != null)
            {

                obj.TotalChange =Math.Round(((double)row.TotalChange), (int)MagicNumbers.two, MidpointRounding.AwayFromZero).ToString("0.00", Culture);

            }
            return obj;
        }

        #endregion
        #endregion

        #region CM
        public CMResponse GetCMData(CMRequest CMRequestData, HttpContextBase context)
        {
            CMResponse response = new CMResponse();
            if (CMRequestData != null)
            {
                object[] parameters = {
                CMRequestData.TimePeriod,
                CMRequestData.Market,
                CMRequestData.Dimension1,
                CMRequestData.Dimension2,
                CMRequestData.AdditionalFilter
            };

                DataSet dataset = dalObj.GetCMData(parameters);
                if (dataset.Tables[0].Rows[0][0].ToString().ToUpper(Culture) == "NO DATA AVAILABLE" || dataset.Tables[0].Rows.Count < (int)MagicNumbers.two || 
                    dataset.Tables[0].Columns.Count < (int)MagicNumbers.three)
                {
                    return response;
                }
                DataTable expectedValues = dataset.Tables[0].Copy();
                DataTable ChiSquareValues = dataset.Tables[0].Copy();
                DataTable result = AQ.Statistics.CorrespondenceAnalysis(dataset.Tables[0]);

                #region
                DataRow rowi = dataset.Tables[0].NewRow();
                rowi[0] = "ColumnTotal";
                dataset.Tables[0].Rows.Add(rowi);
                dataset.Tables[0].Columns.Add(new DataColumn("RowTotal", typeof(double)));
                for (int i = 1; i < dataset.Tables[0].Columns.Count - 1; i++)
                {
                    double columnTotal = 0;
                    for (int j = 0; j < dataset.Tables[0].Rows.Count - 1; j++)
                    {
                        columnTotal += Convert.ToDouble(dataset.Tables[0].Rows[j][i], Culture);
                    }
                    dataset.Tables[0].Rows[dataset.Tables[0].Rows.Count - 1][i] = columnTotal;
                }

                for (int i = 0; i < dataset.Tables[0].Rows.Count; i++)
                {
                    double rowTotal = 0;
                    for (int j = 1; j < dataset.Tables[0].Columns.Count - 1; j++)
                    {
                        rowTotal += Convert.ToDouble(dataset.Tables[0].Rows[i][j], Culture);
                    }
                    dataset.Tables[0].Rows[i][dataset.Tables[0].Columns.Count - 1] = rowTotal;
                }

                double chiDist = 0;
                for (int i = 0; i < expectedValues.Rows.Count; i++)
                {
                    for (int j = 1; j < expectedValues.Columns.Count; j++)
                    {
                        double expected = (Convert.ToDouble(dataset.Tables[0].Rows[i][dataset.Tables[0].Columns.Count - 1], Culture) *
                            Convert.ToDouble(dataset.Tables[0].Rows[dataset.Tables[0].Rows.Count - 1][j], Culture)) /
                            Convert.ToDouble(dataset.Tables[0].Rows[dataset.Tables[0].Rows.Count - 1][dataset.Tables[0].Columns.Count - 1], Culture);
                        expectedValues.Rows[i][j] = expected;

                        double chiSquare = Math.Pow(Convert.ToDouble(dataset.Tables[0].Rows[i][j], Culture) - Convert.ToDouble(expectedValues.Rows[i][j], Culture), (int)MagicNumbers.two) /
                            Convert.ToDouble(expectedValues.Rows[i][j], Culture);
                        ChiSquareValues.Rows[i][j] = chiSquare;
                        chiDist += chiSquare;
                    }
                }

                #endregion

                response.DataList = (from item in result.AsEnumerable()
                                     select new CMResponseData
                                     {
                                         name = Convert.ToString(item[0], Culture),
                                         x = Convert.ToString(item[(int)MagicNumbers.one], Culture),
                                         y = Convert.ToString(item[(int)MagicNumbers.two], Culture),
                                         chiDist = Convert.ToString(chiDist, Culture)
                                     }).ToList();

            }
            return response;
        }

        public static string GetCMPptDetails(CMPptResponse responseData, string dimension1, string dimension2, string[] dim1List, string[] dim2List, string selectionSummary)
        {
            string pptName = "";
            dim1List = dim1List[0].Split('#');
            dim2List = dim2List[0].Split('#');
            try
            {
                var context = HttpContext.Current;
                var _tempPPT = "";
                string name = "";
                _tempPPT = context.Server.MapPath(Templates.CMPpt);
                name = "Correspondence_Maps";
                Aspose.Slides.License license = new Aspose.Slides.License();
                license.SetLicense(context.Server.MapPath("~/Aspose.Slides.167923.lic"));
                Aspose.Slides.IPresentation pres = new Aspose.Slides.Presentation(_tempPPT);

                using (pres)
                {
                    #region slide1
                    ((IAutoShape)pres.Slides[0].Shapes.FirstOrDefault(x => x.Name == "Date")).TextFrame.Text = System.DateTime.Today.ToShortDateString();
                    #endregion

                    #region slide2
                    ((IAutoShape)pres.Slides[1].Shapes.FirstOrDefault(x => x.Name == Title4)).TextFrame.Text = "CORRESPONDENCE MAP: " + dimension1 + " X " + dimension2;
                    pres.Slides[1].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Text = "";
                    pres.Slides[1].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions[0].Text = "Selection Summary : ";
                    pres.Slides[1].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions[0].PortionFormat.FontBold = NullableBool.True;
                    if (pres.Slides[1].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions.Count < (int)MagicNumbers.two)
                    {
                        pres.Slides[1].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions.Add(new Portion());
                    }
                    pres.Slides[1].NotesSlideManager.NotesSlide.NotesTextFrame.Paragraphs[0].Portions[1].Text = selectionSummary;

                    Aspose.Slides.Charts.IChart chart = (Aspose.Slides.Charts.IChart)pres.Slides[1].Shapes.FirstOrDefault(x => x.Name == "Chart");
                    Aspose.Slides.IAutoShape shape = (Aspose.Slides.IAutoShape)pres.Slides[1].Shapes.FirstOrDefault(x => x.Name == "Popup");
                    if (responseData.DataList.Count > 0)
                    {
                        chart.ChartData.ChartDataWorkbook.Clear(0);
                        var fact = chart.ChartData.ChartDataWorkbook;
                        chart.ChartData.Series.Clear();
                        chart.ChartData.Series.Add(fact.GetCell(0, 1, 1, "Series 1"), chart.Type);
                        Aspose.Slides.Charts.IChartSeries series = chart.ChartData.Series[0];
                        series.Marker.Size = (int)MagicNumbers.ten;
                        series.Marker.Symbol = Aspose.Slides.Charts.MarkerStyleType.Circle;
                        for (int ind = 0; ind < responseData.DataList.Count; ind++)
                        {

                            series.DataPoints.AddDataPointForScatterSeries(fact.GetCell(0, ind, 0, responseData.DataList[ind].xVal), fact.GetCell(0, ind, 1, responseData.DataList[ind].yVal));
                            series.DataPoints[ind].Marker.Format.Fill.FillType = FillType.Solid;
                            series.DataPoints[ind].Marker.Format.Fill.SolidFillColor.Color = System.Drawing.ColorTranslator.FromHtml(responseData.DataList[ind].colorDot);
                            series.DataPoints[ind].Marker.Format.Line.FillFormat.FillType = FillType.Solid;
                            series.DataPoints[ind].Marker.Format.Line.FillFormat.SolidFillColor.Color = System.Drawing.ColorTranslator.FromHtml(responseData.DataList[ind].colorDot);
                            fact.GetCell(0, ind, 0, responseData.DataList[ind].xVal);
                            fact.GetCell(0, ind, 1, responseData.DataList[ind].yVal);
                            fact.GetCell(0, ind, (int)MagicNumbers.two, responseData.DataList[ind].species);
                            series.Labels[ind].AsIOverridableText.TextFrameForOverriding.Paragraphs.Add(new Paragraph());
                            series.Labels[ind].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions.Add(new Portion());
                            series.Labels[ind].AsIOverridableText.TextFrameForOverriding.Paragraphs[0].Portions[0].Text = responseData.DataList[ind].species;
                        }
                        series.Labels.DefaultDataLabelFormat.TextFormat.TextBlockFormat.WrapText = NullableBool.False;
                        series.Labels.DefaultDataLabelFormat.ShowLeaderLines = true;
                        shape.Hidden = true;
                    }
                    else
                    {
                        chart.Hidden = true;
                    }
                    #endregion

                    #region slide3
                    ITable table1 = (ITable)pres.Slides[(int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == "Table 13");
                    ITable table2 = (ITable)pres.Slides[(int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == "Table 6");
                    table1[0, 0].TextFrame.Text = "Dimension: <" + dimension1 + ">";
                    table2[0, 0].TextFrame.Text = "Dimension: <" + dimension2 + ">";
                    int slideCloneCount = Math.Max((int)Math.Ceiling((double)dim1List.Count() / 15), (int)Math.Ceiling((double)dim2List.Count() / 15));
                    int initialslide = 3;

                    for (int j = 1; j < slideCloneCount; j++)
                    {
                        pres.Slides.InsertClone(initialslide++, pres.Slides[(int)MagicNumbers.two]);
                    }
                    int i = 1;
                    int k = 1;
                    for (int j = 0; j < slideCloneCount && i <= dim1List.Count(); j++)
                    {
                        table1 = (ITable)pres.Slides[j + (int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == "Table 13");
                        for (i = (int)MagicNumbers.fifteen * j + 1, k = 1; i <= (int)MagicNumbers.fifteen * (j + 1) && i <= dim1List.Count(); i++, k++)
                        {
                            table1[0, k].TextFrame.Text = dim1List[i - 1];
                            table1[0, k].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.twelve;
                            table1[1, k].TextFrame.Text = responseData.DataList.FirstOrDefault(x => x.species == dim1List[i - 1]) != null ?
                                responseData.DataList.FirstOrDefault(x => x.species == dim1List[i - 1]).distance.ToString("0.00", Culture) : "Not Plotted";
                            table1[1, k].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.twelve;
                        }
                    }
                    i = 1;
                    for (int j = 0; j < slideCloneCount && i <= dim2List.Count(); j++)
                    {
                        table2 = (ITable)pres.Slides[j + (int)MagicNumbers.two].Shapes.FirstOrDefault(x => x.Name == "Table 6");
                        for (i = (int)MagicNumbers.fifteen * j + 1, k = 1; i <= (int)MagicNumbers.fifteen * (j + 1) && i <= dim2List.Count(); i++, k++)
                        {
                            table2[0, k].TextFrame.Text = dim2List[i - 1];
                            table2[0, k].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.twelve;
                            table2[1, k].TextFrame.Text = responseData.DataList.FirstOrDefault(x => x.species == dim2List[i - 1]) != null ?
                                responseData.DataList.FirstOrDefault(x => x.species == dim2List[i - 1]).distance.ToString("0.00", Culture) : "Not Plotted";
                            table2[1, k].TextFrame.Paragraphs[0].Portions[0].PortionFormat.FontHeight = (int)MagicNumbers.twelve;
                        }
                    }
                    #endregion
                }
                pptName = SaveFile(pres, name);
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
            }
            return pptName;
        }

        #endregion
    }
}
