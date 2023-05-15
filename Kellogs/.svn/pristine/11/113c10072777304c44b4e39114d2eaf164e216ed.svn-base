using AQ.DAL;
using AQ.Kelloggs.Models;
using System.Data;
using System;

namespace AQ.Kelloggs.DAL
{
    public class CommonDAL : DBConnection
    {
        #region Crosstab
        public DataSet GetCrossTabData(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.CrossTabData, CommandTimeout, parameters);
        }
        #endregion

        #region Snapshot
        public DataSet GetSnapshotData(object[] parameters)
        {
             return DataAccess.GetData(ConnectionString, Constants.SnapshotData, CommandTimeout, parameters);
        }
        #endregion

        #region UserManagement
        public DataSet GetUserManagementData()
        {
            return DataAccess.GetData(ConnectionString, Constants.UserManagementData, CommandTimeout);
        }

        public DataSet GetUserDetail(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.GetUserDetails, CommandTimeout, parameters);
        }

        public DataSet GetUsersData()
        {
            return DataAccess.GetData(ConnectionString, Constants.UserManagement, CommandTimeout);
        }

        public DataSet DeleteUser(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.DeleteUser, CommandTimeout, parameters);
        }

        public void AddUserToGroups(object[] parameters)
        {
            DataAccess.GetData(ConnectionString, Constants.AddUserToGroup, CommandTimeout, parameters);
        }

        public void AddGroup(object[] parameters)
        {
            DataAccess.GetData(ConnectionString, Constants.AddGroup, CommandTimeout, parameters);

        }

        public void EditGroup(object[] parameters)
        {
            DataAccess.GetData(ConnectionString, Constants.EditGroup, CommandTimeout, parameters);
        }
        public DataSet DeleteGroup(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.DeleteGroup, CommandTimeout, parameters);
        }
        public DataSet UpdateLastActivity(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.UpdateLastActivity, CommandTimeout, parameters);
        }

        #endregion
        #region Dashboard
        public DataSet AddToDashboard(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.AddToDasboard, CommandTimeout, parameters);
        }
        public DataSet UpdateDashboard(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.UpdateDashboard, CommandTimeout, parameters);
        }
        public DataSet DeleteDashboard(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.DeleteDashboard, CommandTimeout, parameters);
        }
        public DataSet SaveAsDashboard(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.SaveAsDashboard, CommandTimeout, parameters);
        }
        public DataSet ShareDashboard(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.ShareDashboard, CommandTimeout, parameters);
        }

        public DataSet ShareDashboardGetEmailIds(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.GetEmailIdsForDashboardShare, CommandTimeout, parameters);
        }

        #endregion
      
        #region OSP
        public DataSet GetOSPData(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.OspData, CommandTimeout, parameters);

        }

        public DataSet GetOSPCellData(object[] parameters)
        {
              return DataAccess.GetData(ConnectionString, Constants.OspCellData, CommandTimeout, parameters);

        }
        #endregion

        #region CM

        public DataSet GetCMData(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.CMData, CommandTimeout, parameters);

        }




        #endregion

        #region PerformanceDashboard

        public DataSet GetPDashboardData(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.PDashboardData, CommandTimeout, parameters);
        }
        #endregion
    }
}
