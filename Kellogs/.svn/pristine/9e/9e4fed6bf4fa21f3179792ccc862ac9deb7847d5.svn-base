#region Includes
using AQ.Kelloggs.Models;
using System;
#endregion

#region Namespace
namespace AQ.Kelloggs.DAL
{
    #region Public Class
    public class DBConnection
    {
        #region Properties
        public string ConnectionString { get; set; }
        public Int32 CommandTimeout { get; set; }

        public string ConnectionString_MemberShip { get; set; }
        #endregion

        #region Constructor
        public DBConnection()
        {
            string appConnection = System.Configuration.ConfigurationManager.AppSettings["TooConnection"];
            ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings[appConnection].ConnectionString;
            ConnectionString_MemberShip = System.Configuration.ConfigurationManager.ConnectionStrings["connection_membership"].ConnectionString;
            CommandTimeout = Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["CommandTimeout"],Constants.Culture);
        }
        #endregion
    }
    #endregion
}
#endregion