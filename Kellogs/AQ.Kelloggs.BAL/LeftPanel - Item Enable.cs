/*Source Description
************************************************** File Description Block ***************************************************

                            The file contains the entities related to left panel
******************************************************************************************************************************

        Modifiled Date                          Modified By                                     Comments
         12-07-2019                              Varsha

******************************************************************************************************************************/

#region Includes
using System.Collections.Generic;
using System.Data;
using System;
using System.Linq;
using AQ.Kelloggs.DAL;
using AQ.Kelloggs.Models;
using System.Threading.Tasks;
using System.Text;
using static AQ.Kelloggs.Models.Constants;
using System.IO;
#endregion

#region Namespace
namespace AQ.Kelloggs.BAL
{
    #region Public Class
    public class LeftPanelBAL
    {
        readonly LeftPanelDAL dalObj = new LeftPanelDAL();
        DataTable tempDataTable;
        const string SelectAllText = "Select All";

        #region Left Panel
        readonly string[] parametersForLP = new[] {  DBParameters.Filter,
                                                    DBParameters.FilterID,
                                                    DBParameters.MetricName,
                                                    DBParameters.DisplayName,
                                                    DBParameters.MetricParentName,
                                                    DBParameters.ParentId,
                                                    DBParameters.IsSelectable,
                                                    DBParameters.AttributetypeId,
                                                    DBParameters.AttributeId,
                                                    DBParameters.IsLastLevel,
                                                    DBParameters.SortID,
                                                    DBParameters.CountryID,
                                                    DBParameters.FilterLevel,
                                                    DBParameters.ReportGeneratorFilter,
                                                    DBParameters.IsItemLevel};
        private static dynamic GetLeftPanelResponseType(int moduleId)
        {
            if (moduleId == (int)MagicNumbers.five)
            {
                return new LeftPanelCorrespondenceMapResponse();
            }
            else if (moduleId == (int)MagicNumbers.nine)
            {
                return new PerformanceDashboardResponse();
            }
            else
            {
                return new LeftPanelCrossTabResponse();
            }
        }
        public ICollection<object> GetLeftPanel(int moduleId)
        {
            dynamic response = GetLeftPanelResponseType(moduleId);
            DataSet dSet = dalObj.GetLeftPanel(moduleId);
            ICollection<object> leftPanelResponse = new List<object>();
            int count = dSet.Tables.Count - (int)MagicNumbers.two;
            if (moduleId == (int)MagicNumbers.nine)
            {
                count++;
            }
            int i;
            for (i = 0; i < count; i++)
            {
                tempDataTable = dSet.Tables[i];
                string filter = dSet.Tables[i].Rows[0].Field<string>(DBParameters.Filter);
                Dictionary<string, object> dict = new Dictionary<string, object>();
                if (!(new[] { "CUSTOM CATEGORY/BRAND/ITEM", "CATEGORY/BRAND/ITEM", "5WS" }).Contains(filter.ToUpper(Culture)))
                {
                    dict.Add(DBParameters.DisplayName, dSet.Tables[i].Rows[0].Field<string>(DBParameters.Filter));
                    dict.Add("data", ReturnChildData(null));
                    leftPanelResponse.Add(dict);
                }
                else
                {
                    IList<object> data = ReturnChildData(null);
                    leftPanelResponse = CategoryItemBrand.BindCategoryItemBrand(leftPanelResponse, data, dSet.Tables[i], moduleId);
                }
            }
            i = dSet.Tables.Count - ((new[] { (int)MagicNumbers.three, (int)MagicNumbers.five }).Contains(moduleId) ? (int)MagicNumbers.two : 1);
            /*Time Period */
            response.TimePeriodList = (from rows in dSet.Tables[i].AsEnumerable()
                                       select new TimePeriod
                                       {
                                           FilterID = Convert.ToInt32(rows[DBParameters.FilterID], Constants.Culture),
                                           TimePeriodType = Convert.ToString(rows[DBParameters.TimePeriodType], Constants.Culture),
                                           DisplayName = Convert.ToString(rows[DBParameters.DisplayName], Constants.Culture)
                                       }).ToList();
            leftPanelResponse.Add(response.TimePeriodList);

            /*scenarios */
            if (moduleId == (int)Constants.MagicNumbers.three)
            {
                response.Scenarios = (from rows in dSet.Tables[dSet.Tables.Count - 1].AsEnumerable()
                                      select new Scenarios
                                      {
                                          Column = Convert.ToString(rows[DBParameters.Column], Constants.Culture),
                                          Row = Convert.ToString(rows[DBParameters.Row], Constants.Culture),
                                          RowNesting = Convert.ToString(rows[DBParameters.RowNesting], Constants.Culture),
                                          TimePeriod = Convert.ToString(rows[DBParameters.TimePeriod], Constants.Culture),
                                          Market = Convert.ToString(rows[DBParameters.Market], Constants.Culture),
                                          Occasion = Convert.ToString(rows[DBParameters.Occasion], Constants.Culture),
                                          Category = Convert.ToString(rows[DBParameters.Category], Constants.Culture),
                                          Metric = Convert.ToString(rows[DBParameters.Metric], Constants.Culture),
                                          Demographics = Convert.ToString(rows[DBParameters.Demographics], Constants.Culture)
                                      }).ToList();
                leftPanelResponse.Add(response.Scenarios);
            }
            if (moduleId == (int)Constants.MagicNumbers.five)
            {
                response.Scenarios = (from rows in dSet.Tables[dSet.Tables.Count - 1].AsEnumerable()
                                      select new CMScenarios
                                      {
                                          Dimesion1 = Convert.ToString(rows[DBParameters.Dimension1], Constants.Culture),
                                          Dimesion2 = Convert.ToString(rows[DBParameters.Dimension2], Constants.Culture),
                                          Occasion = Convert.ToString(rows[DBParameters.Occasion], Constants.Culture),
                                          Category = Convert.ToString(rows[DBParameters.Category], Constants.Culture),
                                          Metric = Convert.ToString(rows[DBParameters.Metric], Constants.Culture),
                                          Channel = Convert.ToString(rows[DBParameters.Channel], Constants.Culture),
                                          Demographics = Convert.ToString(rows[DBParameters.Demographics], Constants.Culture)
                                      }).ToList();
                leftPanelResponse.Add(response.Scenarios);
            }
            return leftPanelResponse;
        }
        public IList<object> GetLeftPanelDashboard(string userId)
        {
            var response = new DashboardResponse();
            object[] parameters = {
                userId
                };
            DataSet dSet = dalObj.GetLeftPanelDashboard(parameters);
            List<object> leftPanelResponse = new List<object>();

            /*Time Period */
            response.TimePeriodList = (from rows in dSet.Tables[0].AsEnumerable()
                                       select new TimePeriod
                                       {
                                           FilterID = Convert.ToInt32(rows[DBParameters.FilterID], Constants.Culture),
                                           TimePeriodType = Convert.ToString(rows[DBParameters.TimePeriodType], Constants.Culture),
                                           DisplayName = Convert.ToString(rows[DBParameters.DisplayName], Constants.Culture)
                                       }).ToList();
            leftPanelResponse.Add(response.TimePeriodList);

            /*Time Period */
            response.DashboardList = (from rows in dSet.Tables[1].AsEnumerable()
                                      select new CommonRequestDashboard
                                      {
                                          UserID = (rows[DBParameters.UserID]).ToString(),
                                          DashBoardTypeId = Convert.ToInt32(rows[DBParameters.DashBoardTypeId], Constants.Culture),
                                          DashBoardID = Convert.ToInt32(rows[DBParameters.DashBoardID], Constants.Culture),
                                          DashboardName = Convert.ToString(rows[DBParameters.DashboardName], Constants.Culture),
                                          WidgetID = rows[DBParameters.WidgetID] == DBNull.Value ? null : (int?)rows[DBParameters.WidgetID],
                                          WidgetType = Convert.ToString(rows[DBParameters.WidgetType], Constants.Culture),
                                          WidgetName = Convert.ToString(rows[DBParameters.WidgetName], Constants.Culture),
                                          SelectionSummary = Convert.ToString(rows[DBParameters.SelectionSummary], Constants.Culture),
                                          RequestObj = Convert.ToString(rows[DBParameters.RequestObj], Constants.Culture),
                                          Image = rows[DBParameters.Image] == DBNull.Value ? null : Encoding.UTF32.GetString((byte[])rows[DBParameters.Image]),
                                          ResponseData = Convert.ToString(rows[DBParameters.ResponseData], Constants.Culture),
                                          SelectionObj = Convert.ToString(rows[DBParameters.SelectionObj], Constants.Culture),
                                          CreatedBy = Convert.ToString(rows[DBParameters.CreatedBy], Constants.Culture),
                                          CreatedDate = Convert.ToString(rows[DBParameters.CreatedDate], Constants.Culture),
                                          SharedDate = rows[DBParameters.SharedDate] == DBNull.Value ? null : (DateTime?)rows[DBParameters.SharedDate],
                                      }).ToList();
            leftPanelResponse.Add(response.DashboardList);
            response.UserList = (from rows in dSet.Tables[(int)Constants.MagicNumbers.two].AsEnumerable()
                                 select new UserEntity
                                 {
                                     UserID = (rows[DBParameters.UserID]).ToString(),
                                     UserName = Convert.ToString(rows[DBParameters.UserName], Constants.Culture),
                                     Email = Convert.ToString(rows[DBParameters.Email], Constants.Culture),
                                     Name = Convert.ToString(rows[DBParameters.Name], Constants.Culture)
                                 }).ToList();
            leftPanelResponse.Add(response.UserList);
            response.GroupList = (from rows in dSet.Tables[(int)Constants.MagicNumbers.three].AsEnumerable()
                                  select new GroupEntity
                                  {
                                      GroupId = (rows[DBParameters.GroupId]).ToString(),
                                      GroupName = Convert.ToString(rows[DBParameters.GroupName], Constants.Culture),
                                      NoOfUsers = Convert.ToInt32(rows[DBParameters.NoOfUsers], Constants.Culture)
                                  }).ToList();
            leftPanelResponse.Add(response.GroupList);

            return leftPanelResponse;
        }

        private IList<object> ReturnChildData(double? parentId)
        {
            var subTableTemp = from row in tempDataTable.AsEnumerable()
                               where row.Field<double?>(DBParameters.ParentId) == parentId
                               select row;
            subTableTemp = subTableTemp.OrderBy(u => u["SortID"]);
            List<object> leftPanelResponse = new List<object>();
            foreach (var row in subTableTemp)
            {

                Dictionary<string, object> dict = new Dictionary<string, object>();
                foreach (var item in parametersForLP)
                {
                    dict.Add(item, row.Table.Columns.Contains(item) ? row.Field<object>(item) : null);

                }
                dict.Add("isDefaultLevel", false);
                dict.Add("isSingle", false);
                if ((from row1 in tempDataTable.AsEnumerable()
                     where row1.Field<double?>(DBParameters.ParentId) == row.Field<double?>(DBParameters.ParentId)
                     select row1).Any()
                    )
                {
                    IList<object> internalData = ReturnChildData(row.Field<double?>(DBParameters.FilterID));
                    internalData = AddSelectAll(internalData, dict);
                    dict.Add("data", internalData);
                }
                else
                {
                    int[] empty = new int[] { };
                    dict.Add("data", empty);
                }
                leftPanelResponse.Add(dict);
            }
            return leftPanelResponse;
        }
        public static IList<object> AddSelectAll(IList<object> internalData, IDictionary<string, object> dict)
        {
            string[] filterList = { "CATEGORY/BRAND/ITEM", "CUSTOM CATEGORY/BRAND/ITEM", "5WS", "CATEGORY/ITEM-MANUFACTURER",
                "CUSTOM CATEGORY/ITEM-MANUFACTURER", "CHANNEL/RETAILER", "CUSTOM CHANNEL/RETAILER", "RETAILER NETS" };
            if (internalData.Count > 0 && Convert.ToString((internalData[0] as Dictionary<string, object>)["AttributetypeId"], Culture) != "124" &&
                filterList.Contains(Convert.ToString((internalData[0] as Dictionary<string, object>)["Filter"], Culture).ToUpper(Culture))
                        )
            {
                var inList = internalData.Where(x => !Convert.ToBoolean((x as Dictionary<string, object>)["IsLastLevel"], Culture) ||
                 Convert.ToString((x as Dictionary<string, object>)["DisplayName"], Culture) == SelectAllText).ToList();
                if (inList.Count == 0)
                {
                    IDictionary<string, object> newDict = new Dictionary<string, object>(dict);
                    newDict["DisplayName"] = newDict["MetricName"] = SelectAllText;
                    newDict["IsLastLevel"] = true;
                    newDict["FilterID"] = 0;
                    newDict["IsSelectable"] = true;
                    newDict["SortID"] = 0;
                    newDict["data"] = new int[] { };
                    newDict["ParentId"] = dict["FilterID"];
                    newDict["MetricParentName"] = dict["DisplayName"];
                    internalData.Insert(0, newDict);
                }
            }
            return internalData;
        }
        #endregion
        public IList<object> GetDashboard(string userId, int flag)
        {
            var response = new DashboardResponse();
            object[] parameters = {
                userId,
                flag
                };
            DataSet dSet = dalObj.GetDashboard(parameters);
            List<object> leftPanelResponse = new List<object>();

            /*Time Period */
            response.DashboardList = (from rows in dSet.Tables[0].AsEnumerable()
                                      select new CommonRequestDashboard
                                      {
                                          UserID = (rows[DBParameters.UserID]).ToString(),
                                          DashBoardTypeId = Convert.ToInt32(rows[DBParameters.DashBoardTypeId], Constants.Culture),
                                          DashBoardID = Convert.ToInt32(rows[DBParameters.DashBoardID], Constants.Culture),
                                          DashboardName = Convert.ToString(rows[DBParameters.DashboardName], Constants.Culture),
                                          WidgetID = rows[DBParameters.WidgetID] == DBNull.Value ? null : (int?)rows[DBParameters.WidgetID],
                                          WidgetType = Convert.ToString(rows[DBParameters.WidgetType], Constants.Culture),
                                          WidgetName = Convert.ToString(rows[DBParameters.WidgetName], Constants.Culture),
                                          SelectionSummary = Convert.ToString(rows[DBParameters.SelectionSummary], Constants.Culture),
                                          RequestObj = Convert.ToString(rows[DBParameters.RequestObj], Constants.Culture),
                                          Image = rows[DBParameters.Image] == DBNull.Value ? null : Encoding.UTF32.GetString((byte[])rows[DBParameters.Image]),
                                          ResponseData = Convert.ToString(rows[DBParameters.ResponseData], Constants.Culture),
                                          SelectionObj = Convert.ToString(rows[DBParameters.SelectionObj], Constants.Culture),
                                          CreatedBy = Convert.ToString(rows[DBParameters.CreatedBy], Constants.Culture),
                                          CreatedDate = Convert.ToString(rows[DBParameters.CreatedDate], Constants.Culture),
                                          SharedDate = rows[DBParameters.SharedDate] == DBNull.Value ? null : (DateTime?)rows[DBParameters.SharedDate],
                                      }).ToList();
            leftPanelResponse.Add(response.DashboardList);

            return leftPanelResponse;
        }

        #region Sticky Selections
        public void SubmitStickySelections(StickyRequest StickyRequest)
        {

            try
            {
                if (Convert.ToString(StickyRequest.UserId, Constants.Culture) != "")
                {

                    //Call to database to save selections
                    var parameters = new object[]{
                        StickyRequest.UserId ,
                        StickyRequest.ModuleId,
                        StickyRequest.FilterData };
                    dalObj.SaveStickySelection(parameters);
                }

            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                AQLogger.Logger.GetInstance().Debug(ex);

            }
        }

        public StickyRequest GetStickySelections(StickyRequest StickyRequest)
        {

            try
            {
                var parameters = new object[]{
                        StickyRequest.UserId ,
                        StickyRequest.ModuleId};
                DataSet dSet = dalObj.GetStickySelection(parameters);

                return (from rows in dSet.Tables[0].AsEnumerable()
                        select new StickyRequest
                        {
                            UserId = (rows[DBParameters.UserID]).ToString(),
                            ModuleId = Convert.ToInt32(rows[DBParameters.ModuleId], Constants.Culture),
                            FilterData = (rows[DBParameters.Selection]).ToString()
                        }).FirstOrDefault();
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                AQLogger.Logger.GetInstance().Debug(ex);
                return new StickyRequest();
            }

        }
        #endregion

        #region Custom Filters
        public CommonExportsResponse Save_Custom_Filter(string userId, string FilterID, string FilterName, string CustomFilterName)
        {
            var response = new CommonExportsResponse();
            object[] parameters = {
                0,
                userId,
                CustomFilterName,
                FilterID,//list of comma separated filter ids,
                FilterName,//list of comma separated filter name              
                };
            dalObj.Save_Custom_Filter(parameters);
            response.ResponseCode = (int)Constants.MagicNumbers.one;
            return response;
        }
        public IList<object> GetCustomFilters(string userId)
        {
            var response = new CustomFilterResponse();
            object[] parameters = {
                userId
                };
            DataSet dSet = dalObj.GetCustomFilters(parameters, 0);
            List<object> leftPanelResponse = new List<object>();

            /*Time Period */
            response.CustomFilterList = (from rows in dSet.Tables[0].AsEnumerable()
                                         select new CustomFilterEntity
                                         {
                                             Name = Convert.ToString(rows[DBParameters.Name], Constants.Culture),
                                             FilterID = Convert.ToString(rows[DBParameters.FilterID], Constants.Culture),
                                             ModuleId = Convert.ToString(rows[DBParameters.ModuleId], Constants.Culture),
                                             SelectionSummary = Convert.ToString(rows[DBParameters.SelectionSummary], Constants.Culture),
                                         }).ToList();
            leftPanelResponse.Add(response.CustomFilterList);

            return leftPanelResponse;
        }
        #endregion

        #region Custom Group
        public IList<object> Save_Custom_Group(string userId, CustomGroupEntity request)
        {
            var response = new CustomGroupResponse();
            object[] parameters = {
                0,
                userId,
                request.GroupId,
                request.GroupName,
                request.Filter,
                request.FilterID,//list of comma separated filter ids,
                request.SelectionSummary,//list of comma separated filter name  
                request.Parent,//list of comma separated parent name
                request.ParentFilterIDs,//list of comma separated parent ids
                request.CountryID
                };
            DataSet dSet = dalObj.UpdateCustomGroup(parameters);
            List<object> leftPanelResponse = new List<object>();

            /*Time Period */
            response.CustomGroupList = (from rows in dSet.Tables[0].AsEnumerable()
                                        select new CustomGroupEntity
                                        {
                                            Filter = Convert.ToString(rows[DBParameters.Filter], Constants.Culture),
                                            GroupId = Convert.ToString(rows[DBParameters.GroupId], Constants.Culture),
                                            GroupName = Convert.ToString(rows[DBParameters.GroupName], Constants.Culture),
                                            FilterID = Convert.ToString(rows[DBParameters.FilterID], Constants.Culture),
                                            ModuleId = Convert.ToString(rows[DBParameters.ModuleId], Constants.Culture),
                                            SelectionSummary = Convert.ToString(rows[DBParameters.SelectionSummary], Constants.Culture),
                                            Parent = Convert.ToString(rows[DBParameters.Parent], Constants.Culture),
                                            ParentFilterIDs = Convert.ToString(rows["ParentFilterIDs"], Constants.Culture),
                                            CountryID = Convert.ToString(rows[DBParameters.CountryID], Constants.Culture),
                                        }).ToList();
            leftPanelResponse.Add(response.CustomGroupList);

            return leftPanelResponse;
        }
        public IList<object> GetCustomGroups(string userId)
        {
            var response = new CustomGroupResponse();
            object[] parameters = {
                userId
                };
            DataSet dSet = dalObj.GetCustomFilters(parameters, 1);
            List<object> leftPanelResponse = new List<object>();

            /*Time Period */
            response.CustomGroupList = (from rows in dSet.Tables[0].AsEnumerable()
                                        select new CustomGroupEntity
                                        {
                                            Filter = Convert.ToString(rows[DBParameters.Filter], Constants.Culture),
                                            GroupId = Convert.ToString(rows[DBParameters.GroupId], Constants.Culture),
                                            GroupName = Convert.ToString(rows[DBParameters.GroupName], Constants.Culture),
                                            FilterID = Convert.ToString(rows[DBParameters.FilterID], Constants.Culture),
                                            ModuleId = Convert.ToString(rows[DBParameters.ModuleId], Constants.Culture),
                                            SelectionSummary = Convert.ToString(rows[DBParameters.SelectionSummary], Constants.Culture),
                                            Parent = Convert.ToString(rows[DBParameters.Parent], Constants.Culture),
                                            ParentFilterIDs = Convert.ToString(rows["ParentFilterIDs"], Constants.Culture),
                                            CountryID = Convert.ToString(rows[DBParameters.CountryID], Constants.Culture),
                                            IsItemLevel = Convert.ToBoolean(rows[DBParameters.IsItemLevel], Constants.Culture),
                                        }).ToList();
            leftPanelResponse.Add(response.CustomGroupList);

            return leftPanelResponse;
        }
        #region Custom group

        public CommonExportsResponse DeleteCustomGroup(string userId, string filterIds, string type)
        {
            var response = new CommonExportsResponse();
            if (type == "Group")
            {
                object[] parameters = {
                1,
                userId,
                filterIds,
                DBNull.Value,
                DBNull.Value,
                DBNull.Value,
                DBNull.Value,
                DBNull.Value,
                DBNull.Value,
                DBNull.Value
                };
                dalObj.UpdateCustomGroup(parameters);
            }
            else
            {
                object[] parameters = {
                1,
                userId,
                filterIds,
                DBNull.Value,
                DBNull.Value
                };
                dalObj.Save_Custom_Filter(parameters);
            }
            response.ResponseCode = (int)Constants.MagicNumbers.one;
            return response;
        }
        #endregion

        #endregion

        #region MarketTimeperiod

        public IList<object> GetMarketTimeperiodData
        {
            get
            {
                var response = new MarketTimeperiodResponse();

                DataSet dSet = dalObj.GetMarketTimeperiodData();
                List<object> leftPanelResponse = new List<object>();

                /*Time Period */
                response.MarketTimeperiodList = (from rows in dSet.Tables[0].AsEnumerable()
                                                 select new TableEntity
                                                 {
                                                     TimePeriodId = Convert.ToInt32(rows[DBParameters.TimePeriodId], Constants.Culture),
                                                     TimePeriod = Convert.ToString(rows[DBParameters.TimePeriod], Constants.Culture),
                                                     CountryId = Convert.ToInt32(rows[DBParameters.CountryID], Constants.Culture),
                                                     Country = Convert.ToString(rows[DBParameters.Country], Constants.Culture),
                                                 }).ToList();
                leftPanelResponse.Add(response.MarketTimeperiodList);

                return leftPanelResponse;
            }
        }
        #endregion
    }
    #endregion
    public static class CategoryItemBrand
    {
        const string SelectAllText = "Select All";
        const string BrandText = "Brand";
        public static Dictionary<TKey, TValue> CloneDictionaryCloningValues<TKey, TValue>(Dictionary<TKey, TValue> original)
        {
            Dictionary<TKey, TValue> ret = new Dictionary<TKey, TValue>(original.Count,
                                                                    original.Comparer);
            foreach (KeyValuePair<TKey, TValue> entry in original)
            {
                ret.Add(entry.Key, entry.Value);
            }
            return ret;
        }
        public static ICollection<object> BindCategoryItemBrand(ICollection<object> leftPanelResponse, IList<object> data, DataTable dataTable, int moduleId)
        {
            string filter = dataTable.Rows[0].Field<string>(DBParameters.Filter).ToUpper(Culture);
            if (filter.Contains("5WS"))
            {
                return Bind5Ws(leftPanelResponse, data);
            }
            string appendText = filter.Contains("CUSTOM") ? "Custom " : "";
            Dictionary<string, object> dict1 = new Dictionary<string, object>
            {
                { DBParameters.DisplayName, (moduleId != (int)MagicNumbers.two ? appendText +"Category" :  appendText +"Category/Brand/Item") }
            };
            Dictionary<string, object> dict2 = new Dictionary<string, object>
            {
                { DBParameters.DisplayName, appendText + "Item" }
            };
            Dictionary<string, object> dict3 = new Dictionary<string, object>
            {
                { DBParameters.DisplayName, appendText + BrandText }
            };
            ICollection<object> copyList1 = new List<object>();
            ICollection<object> copyList2 = new List<object>();
            ICollection<object> copyList3 = new List<object>();
            var copyData = ((List<object>)data).ConvertAll(elt => CloneDictionaryCloningValues((Dictionary<string, object>)(elt)));
            foreach (object row in copyData)
            {
                Dictionary<string, object> record1 = CloneDictionaryCloningValues((Dictionary<string, object>)(row));
                Dictionary<string, object> record2 = CloneDictionaryCloningValues((Dictionary<string, object>)(row));
                Dictionary<string, object> record3 = CloneDictionaryCloningValues((Dictionary<string, object>)(row));
                var recName = record1[DBParameters.DisplayName].ToString();
                if (!recName.Contains(SelectAllText))
                {
                    #region category
                    record1 = BindCategory(record1);
                    #endregion

                    if (moduleId != (int)MagicNumbers.two)
                    {
                        #region item
                        record2 = BindItem(record2);
                        #endregion

                        #region brand
                        if (moduleId == (int)MagicNumbers.seven)
                        {
                            record3 = BindBrandCategoryBusinessReport(record3);
                        }
                        else
                        {
                            record3 = BindBrand(record3);
                        }
                        //record3 = BindBrand(record3);
                        #endregion
                    }
                }
                copyList1 = AddRecord(recName, record1, copyList1, "Categories");
                if (moduleId != (int)MagicNumbers.two)
                {
                    copyList2 = AddRecord(recName, record2, copyList2, "Item");
                    copyList3 = AddRecord(recName, record3, copyList3, BrandText);
                }
            }
            dict1.Add("data", copyList1);
            leftPanelResponse.Add(dict1);
            if (moduleId != (int)MagicNumbers.two)
            {
                dict2.Add("data", copyList2);
                dict3.Add("data", copyList3);
                leftPanelResponse.Add(dict2);
                leftPanelResponse.Add(dict3);
            }
            return leftPanelResponse;
        }

        private static ICollection<object> Bind5Ws(ICollection<object> leftPanelResponse, IList<object> data)
        {
            string[] list = data.Select(x => ((Dictionary<string, object>)x)[DBParameters.DisplayName].ToString()).Distinct().ToArray();
            foreach (string name in list)
            {
                Dictionary<string, object> dict = new Dictionary<string, object>
                {
                    { DBParameters.DisplayName, name }
                };
                var pData = data.Where(x => ((Dictionary<string, object>)x)[DBParameters.DisplayName].ToString() == name).ToList()
                    .ConvertAll(elt => CloneDictionaryCloningValues((Dictionary<string, object>)(elt))).Select(x => x["data"]);
                var newData = new List<object>();
                foreach (var row in pData)
                {
                    newData = newData.Concat(((List<object>)(row)).Select(x => x)).ToList();
                }
                dict.Add("data", newData);
                leftPanelResponse.Add(dict);
                var purchaseData = data.Where(x => ((Dictionary<string, object>)x)[DBParameters.DisplayName].ToString() == name).ToList();
                purchaseData.ForEach(row => ((Dictionary<string, object>)row)["data"] = new int[] { });
            }
            Dictionary<string, object> dict1 = new Dictionary<string, object>
            {
                { DBParameters.DisplayName, "5Ws" },
                { "data", data }
            };
            leftPanelResponse.Add(dict1);
            return leftPanelResponse;
        }

        private static ICollection<object> AddRecord(string recName, Dictionary<string, object> record, ICollection<object> copyList, string flag)
        {
            bool condition1 = !(recName.Contains(SelectAllText) && !recName.Contains(flag));
            bool condition2;
            if (condition1 && flag == "Categories")
            {
                copyList.Add(record);
            }
            else
            {
                condition2 = !(((List<object>)record["data"]).Count == 0 && !recName.Contains(SelectAllText));
                if (condition1 && condition2)
                {
                    copyList.Add(record);
                }
            }
            return copyList;
        }

        private static Dictionary<string, object> BindCategory(IDictionary<string, object> record)
        {
            record[DBParameters.IsSelectable] = true;
            record[DBParameters.IsLastLevel] = true;
            record["data"] = new int[] { };
            return (Dictionary<string, object>)record;
        }
        private static Dictionary<string, object> BindItem(IDictionary<string, object> record)
        {
            var intData = ((List<object>)record["data"]).ConvertAll(elt => CloneDictionaryCloningValues((Dictionary<string, object>)(elt)));
            IList<object> ItemData = new List<object>();
            if (intData.Count > 0)
            {
                record[DBParameters.IsSelectable] = false;
                record[DBParameters.IsLastLevel] = false;
                foreach (object intRow in intData)
                {
                    Dictionary<string, object> intRecord = ((Dictionary<string, object>)(intRow));
                    if (!intRecord[DBParameters.DisplayName].ToString().Contains(SelectAllText))
                    {
                        intRecord[DBParameters.IsSelectable] = true;
                        intRecord[DBParameters.IsLastLevel] = true;
                        intRecord[DBParameters.ParentId] = record[DBParameters.FilterID];
                        intRecord["data"] = new int[] { };
                    }
                    ItemData.Add(intRecord);
                }
                ItemData = LeftPanelBAL.AddSelectAll(ItemData, (IDictionary<string, object>)intData[0]);
                record["data"] = ItemData;
            }
            return (Dictionary<string, object>)record;
        }
        private static Dictionary<string, object> BindBrand(IDictionary<string, object> record)
        {
            record[DBParameters.IsSelectable] = false;
            record[DBParameters.IsLastLevel] = false;
            var intData = ((List<object>)record["data"]).ConvertAll(elt => CloneDictionaryCloningValues((Dictionary<string, object>)(elt)));
            ICollection<object> BrandData = new List<object>();
            foreach (object intRow in intData)
            {
                Dictionary<string, object> intRecord = CloneDictionaryCloningValues((Dictionary<string, object>)(intRow));
                if (!intRecord[DBParameters.DisplayName].ToString().Contains(SelectAllText) && intRecord[DBParameters.IsLastLevel].ToString() == Boolean.FalseString)
                {
                    intRecord[DBParameters.IsSelectable] = false;
                    intRecord[DBParameters.IsLastLevel] = false;
                    intRecord["IsCollapsible"] = true;
                    intRecord["IsExpanded"] = false;

                    BrandData = GetInternalBrand(intRecord, BrandData);
                }
            }
            record["data"] = BrandData;
            return (Dictionary<string, object>)record;
        }

        private static Dictionary<string, object> BindBrandCategoryBusinessReport(IDictionary<string, object> record)
        {
            record[DBParameters.IsSelectable] = false;
            record[DBParameters.IsLastLevel] = false;
            var intData = ((List<object>)record["data"]).ConvertAll(elt => CloneDictionaryCloningValues((Dictionary<string, object>)(elt)));
            ICollection<object> BrandData = new List<object>();
            foreach (object intRow in intData)
            {
                Dictionary<string, object> intRecord = CloneDictionaryCloningValues((Dictionary<string, object>)(intRow));
                if (!intRecord[DBParameters.DisplayName].ToString().Contains(SelectAllText) && intRecord[DBParameters.IsLastLevel].ToString() == Boolean.FalseString)
                {
                    intRecord[DBParameters.IsSelectable] = true;
                    intRecord[DBParameters.IsLastLevel] = false;
                    intRecord["IsCollapsible"] = false;
                    intRecord["IsExpanded"] = true;

                    BrandData = GetInternalBrandReport(intRecord, BrandData);
                    //intRecord["data"] = BrandData;
                }
            }
            record["data"] = BrandData;
            return (Dictionary<string, object>)record;
        }

        private static ICollection<object> GetInternalBrand(Dictionary<string, object> intRecord, ICollection<object> BrandData)
        {
            string nametype = intRecord["data"].GetType().Name;
            if ((nametype.Contains("List") && ((List<object>)intRecord["data"]).Count > 0) || (nametype.Contains("[]") && ((Array)intRecord["data"]).Length > 0))
            {
                var temp = ((List<object>)intRecord["data"]).ConvertAll(elt => CloneDictionaryCloningValues((Dictionary<string, object>)(elt)));
                intRecord["data"] = new int[] { };
                BrandData.Add(intRecord);
                foreach (object internalRow in temp)
                {
                    var internalRecord = CloneDictionaryCloningValues((Dictionary<string, object>)(internalRow));
                    internalRecord[DBParameters.ParentId] = intRecord[DBParameters.FilterID];
                    internalRecord[DBParameters.IsSelectable] = true;
                    internalRecord[DBParameters.IsLastLevel] = true;
                    internalRecord["IsHidden"] = true;
                    internalRecord["ExtraPadding"] = true;
                    BrandData.Add(internalRecord);
                }
            }
            return BrandData;
        }
        private static ICollection<object> GetInternalBrandReport(Dictionary<string, object> intRecord, ICollection<object> BrandData)
        {
            string nametype = intRecord["data"].GetType().Name;
            if ((nametype.Contains("List") && ((List<object>)intRecord["data"]).Count > 0) || (nametype.Contains("[]") && ((Array)intRecord["data"]).Length > 0))
            {
                var temp = ((List<object>)intRecord["data"]).ConvertAll(elt => CloneDictionaryCloningValues((Dictionary<string, object>)(elt)));
                //intRecord["data"] = new int[] { };
                BrandData.Add(intRecord);
                foreach (object internalRow in temp)
                {
                    var internalRecord = CloneDictionaryCloningValues((Dictionary<string, object>)(internalRow));
                    internalRecord[DBParameters.ParentId] = intRecord[DBParameters.FilterID];
                    internalRecord[DBParameters.IsSelectable] = true;
                    internalRecord[DBParameters.IsLastLevel] = true;
                    internalRecord["IsHidden"] = true;
                    internalRecord["ExtraPadding"] = true;
                    BrandData.Add(internalRecord);
                }
            }
            return BrandData;
        }
    }
}
#endregion
