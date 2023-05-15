using AQ.DAL;
using AQ.Kelloggs.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AQ.Kelloggs.DAL
{
    public class ReportGeneratorDAL : DBConnection
    {
        public DataSet GetReport(object[] parameters, string reportId)
        {
            if (reportId == "1")
            {
                return DataAccess.GetData(ConnectionString, Constants.OccasionReportData, CommandTimeout, parameters);//Occasion Report
            }
            else if (reportId == "2" || reportId == "6")
            {
                return DataAccess.GetData(ConnectionString, Constants.CategoryReportData, CommandTimeout, parameters);//Category Report
            }
            else if (reportId == "3" || reportId == "7")
            {
                return DataAccess.GetData(ConnectionString, Constants.ChannelReportData, CommandTimeout, parameters);//Channel/Retailer Report
            }
            else if (reportId == "4")
            {
                return DataAccess.GetData(ConnectionString, Constants.ObppcReportData, CommandTimeout, parameters);//OBPPC Report
            }
            else if (reportId == "5")
            {
                return DataAccess.GetData(ConnectionString, Constants.KidsReportData, CommandTimeout, parameters);//Kids Report
            }
            else
            {
                return DataAccess.GetData(ConnectionString, Constants.TrendReportData, CommandTimeout, parameters);//Trend Report 2
            }
        }

        public DataSet GetTrendReport(object[] parameters, int spNum)
        {
            if (spNum == 1)
            {
                return DataAccess.GetData(ConnectionString, Constants.TrendReportData, CommandTimeout, parameters);
            }
            else if (spNum == 2)
            {
                return DataAccess.GetData(ConnectionString, Constants.TrendReportData2, CommandTimeout, parameters);
            }
            else
            {
                return DataAccess.GetData(ConnectionString, Constants.TrendReportData3, CommandTimeout, parameters);
            }
        }

        public DataSet GetReportCommonSlides(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.CommonReportData, CommandTimeout, parameters);
        }

        public DataSet GetBusinessReportData(object[] parameters, int slidenumber)
        {
            if (slidenumber == 59)
            {
                return DataAccess.GetData(ConnectionString, Constants.BusinessReportData59, CommandTimeout, parameters);
            }
            else if (slidenumber == 56)
            {
                return DataAccess.GetData(ConnectionString, Constants.BusinessReportData56, CommandTimeout, parameters);
            }
            else if (slidenumber == 53)
            {
                return DataAccess.GetData(ConnectionString, Constants.BusinessReportData53, CommandTimeout, parameters);
            }
            else if (slidenumber == 50)
            {
                return DataAccess.GetData(ConnectionString, Constants.BusinessReportData50, CommandTimeout, parameters);
            }
            else if (slidenumber == 47)
            {
                return DataAccess.GetData(ConnectionString, Constants.BusinessReportData47, CommandTimeout, parameters);
            }
            else if (slidenumber == 67)
            {
                return DataAccess.GetData(ConnectionString, Constants.BusinessReportData67, CommandTimeout, parameters);
            }
            else
            {
                return DataAccess.GetData(ConnectionString, Constants.BusinessReportData, CommandTimeout, parameters);
            }
        }


        public DataSet GetAttributeList()
        {
            return DataAccess.GetData(ConnectionString, Constants.OccasionAttribute, CommandTimeout);

        }

        public DataSet GetCategoryList(object[] parameters)
        {
            return DataAccess.GetData(ConnectionString, Constants.CategoryAttribute, CommandTimeout, parameters);

        }
    }
}
