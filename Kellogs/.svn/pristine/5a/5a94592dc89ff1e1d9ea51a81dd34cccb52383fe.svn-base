#region Includes
using AQ.DAL;
using AQ.Kelloggs.Models;
using System.Data;
using AQ.Kelloggs.Models;
using System;
#endregion

#region Namespace
namespace AQ.Kelloggs.DAL
{
    #region Common Public Class Class
    public class LeftPanelDAL : DBConnection
    {
        #region Get Left Panel Details
        public DataSet GetLeftPanel(int moduleId)
        {
            string SpName = "";
            switch (moduleId)
            {
                case (int)Constants.MagicNumbers.two:
                    SpName = Constants.LeftpanelSnapshot;
                    break;
                case (int)Constants.MagicNumbers.three:
                    SpName = Constants.LeftpanelCrossTab;
                    break;
                case (int)Constants.MagicNumbers.four:
                    SpName = Constants.LeftpanelStrategicPostures;
                    break;
                case (int)Constants.MagicNumbers.five:
                    SpName = Constants.LeftpanelCorrespondenceMap;
                    break;
                case (int)Constants.MagicNumbers.seven:
                    SpName = Constants.LeftpanelReportGenerator;
                    break;
                case (int)Constants.MagicNumbers.nine:
                    SpName = Constants.LeftpanelPerformanceDashboard;
                    break;
                default:
                    SpName = Constants.LeftpanelCrossTab;
                    break;
            }
            return DataAccess.GetData(ConnectionString, SpName, CommandTimeout);
        }
        //public DataSet GetLeftPanelCrossTab()
        //{
        //    return DataAccess.GetData(ConnectionString, Constants.LeftpanelCrossTab, CommandTimeout);
        //}
        //public DataSet GetLeftPanelSnapshot()
        //{
        //    return DataAccess.GetData(ConnectionString, Constants.LeftpanelSnapshot, CommandTimeout);
        //}        
        //public DataSet GetLeftPanelStrategicPostures()
        //{
        //    return DataAccess.GetData(ConnectionString, Constants.LeftpanelStrategicPostures, CommandTimeout);
        //}
        //public DataSet GetLeftPanelCorrespondenceMap()
        //{
        //    return DataAccess.GetData(ConnectionString, Constants.LeftpanelCorrespondenceMap, CommandTimeout);
        //}
        //public DataSet GetLeftPanelReportGenerator()
        //{
        //    return DataAccess.GetData(ConnectionString, Constants.LeftpanelReportGenerator, CommandTimeout);
        //}
        //public DataSet GetLeftPanelPerformanceDashboard()
        //{
        //    return DataAccess.GetData(ConnectionString, Constants.LeftpanelPerformanceDashboard, CommandTimeout);
        //}
        public DataSet GetLeftPanelDashboard(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.LeftpanelDashboard, CommandTimeout, parameters);
        }
        public DataSet GetDashboard(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.DashboardMaster, CommandTimeout, parameters);
        }
        #endregion

        #region Sticky Selections
        public void SaveStickySelection(object[] parameters)
        {
            DataAccess.GetData(ConnectionString, Constants.SaveStickySelections, CommandTimeout, parameters);
        }

        public DataSet GetStickySelection(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.GetStickySelections, CommandTimeout, parameters);
        }

        #endregion


        #region Custom Filters

        public DataSet GetCustomFilters(object[] parameters, int flag)
        {
            if (flag == 1)//custom group
            {
                return DataAccess.GetData(ConnectionString, Constants.CustomGroupMaster, CommandTimeout, parameters);
            }
            return DataAccess.GetData(ConnectionString, Constants.CustomFilterMaster, CommandTimeout, parameters);
        }

        public void Save_Custom_Filter(object[] parameters)
        {
                DataAccess.GetData(ConnectionString, Constants.CustomFilter, CommandTimeout, parameters);
        }
        #endregion

        public DataSet UpdateCustomGroup(object[] parameters)
        {
                return DataAccess.GetData(ConnectionString, Constants.CustomGroup, CommandTimeout, parameters);
        }

        #region MarketTimeperiod
        public DataSet GetMarketTimeperiodData()
        {
            return DataAccess.GetData(ConnectionString, Constants.MarketTimeperiodList, CommandTimeout);
        }

        #endregion
    }
    #endregion
}
#endregion
