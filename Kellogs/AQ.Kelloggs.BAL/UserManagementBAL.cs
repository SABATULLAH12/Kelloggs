using AQ.Kelloggs.DAL;
using AQ.Kelloggs.Models;
using AQ.Kelloggs.Models.UserManagement;
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

namespace AQ.Kelloggs.BAL
{
    public class UserManagementBAL
    {

        #region UserManagement
        readonly CommonDAL dalObj = new CommonDAL();
        const string timeFormat = "dd-MM-yyyy-hhmm";
        const string excelExtension = ".xlsx";


        #region export to excel

        public static string ReturnFilePath(string exportType, HttpContextBase context)
        {
            var dirName = HttpContext.Current.Session.SessionID;
            string filepath = "";
            string strpath = "";
            if (exportType == "CreateBatchUsers")
            {
                filepath = context.Server.MapPath(Templates.UserManagementCreateBatchUsers);
                strpath = TempFilePath + dirName + "/User_Management_Create_Batch_Users_" + DateTime.Now.ToString(timeFormat, Constants.Culture) + ".xlsm";
            }
            else if (exportType == "DeleteBatchUsers")
            {
                filepath = context.Server.MapPath(Templates.UserManagementDeleteBatchUsers);
                strpath = TempFilePath + dirName + "/User_Management_Delete_Batch_User_" + DateTime.Now.ToString(timeFormat, Constants.Culture) + excelExtension;
            }
            else if (exportType == "ExportUserData")
            {
                filepath = context.Server.MapPath(Templates.UserManagementUserList);
                strpath = TempFilePath + dirName + "/User_Management_User_List_" + DateTime.Now.ToString(timeFormat, Constants.Culture) + excelExtension;
            }
            else if(exportType== "ExportGroupData")
            {
                filepath = context.Server.MapPath(Templates.UserManagementGroupList);
                strpath = TempFilePath + dirName + "/User_Management_Group_List_" + DateTime.Now.ToString(timeFormat, Constants.Culture) + excelExtension;
            }
            else
            {
                filepath = context.Server.MapPath(Templates.UsageTracking);
                strpath = TempFilePath + dirName + "/LOV_Usage_" + DateTime.Now.ToString(timeFormat, Constants.Culture) + excelExtension;
            }
            return filepath + '#' + strpath;
        }

        public static string GetExcelDetails(string exportType, UserManagementResponse response, UserManagementResponse responseUser, HttpContextBase context)
        {
            string temp = ReturnFilePath(exportType, context);
            string filepath = temp.Split('#')[0];
            string strpath = temp.Split('#')[1];
            var dirName = HttpContext.Current.Session.SessionID;

            if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
            {
                Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
            }
            Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));

            string destFile = context.Server.MapPath(strpath);
            File.Copy(filepath, destFile, true);

            if (exportType == "DeleteBatchUsers" || response == null)
            {
                return strpath;
            }

            var responseData = response.DataList.ToList();
            var file = new FileInfo(destFile);

            if (exportType == "ExportUserData")
            {
                using (ExcelPackage p = new ExcelPackage(file))
                {
                    ExcelWorksheet worksheet = p.Workbook.Worksheets["EXPORT USER DATA"];

                    const int initialRow = 7;
                    int endRow = initialRow + responseData.Count;
                    int counter = 0;

                    for (int rows = initialRow; rows < endRow; rows++)
                    {
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.two].Value = responseData[counter].UserID;
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.three].Value = responseData[counter].UserName;
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.four].Value = responseData[counter].Email;
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.five].Value = responseData[counter].BusinessUnit;
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.six].Value = responseData[counter].Department;
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.seven].Value = responseData[counter].Role;
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.eight].Value = responseData[counter].GroupName;
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.nine].Value = responseData[counter].DateCreated.Split(' ');
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.ten].Value = responseData[counter].IsActive ? "Active" : "Inactive";
                        worksheet.Cells[rows, (int)Constants.MagicNumbers.eleven].Value = responseData[counter].LastActivityDate;
                        counter++;
                    }
                    FormatCells(initialRow, endRow, (int)Constants.MagicNumbers.eleven, worksheet);
                    p.Save();
                }
            }
            else
            {
                var groupNames = responseData.Select(x => x.GroupName).Distinct().ToList();
                using (ExcelPackage p = new ExcelPackage(file))
                {
                    ExcelWorksheet worksheet;
                    if (exportType == "CreateBatchUsers")
                    {
                        worksheet = p.Workbook.Worksheets["Sheet4"];
                        const int selsumstartRow = (int)Constants.MagicNumbers.eight;
                        int endRow = selsumstartRow + groupNames.Count;
                        int groupCounter = 0;
                        for (int rows = selsumstartRow; rows < endRow; rows++)
                        {
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.one].Value = groupNames[groupCounter];
                            groupCounter++;
                        }
                        p.Save();
                        return strpath;
                    }
                    var counter = 0;
                    foreach (var sheetName in groupNames)
                    {
                        var users = responseUser.DataList.Where(x => x.GroupName.Contains(sheetName)).ToList();
                        p.Workbook.Worksheets.Copy("DEMO SHEET", sheetName);
                        worksheet = p.Workbook.Worksheets[sheetName];

                        int selsumstartRow = (int)Constants.MagicNumbers.six;
                        const int colIndx = (int)Constants.MagicNumbers.three;

                        //start selection summary 

                        worksheet.Cells[selsumstartRow, colIndx].Value = responseData[counter].GroupName;
                        worksheet.Cells[selsumstartRow + (int)Constants.MagicNumbers.one, colIndx].Value = responseData[counter].CreatedBy;
                        worksheet.Cells[selsumstartRow + (int)Constants.MagicNumbers.two, colIndx].Value = responseData[counter].DateCreated.Split(' ');

                        selsumstartRow = (int)Constants.MagicNumbers.eleven;
                        int endRow = selsumstartRow + users.Count;
                        int userCounter = 0;
                        for (int rows = selsumstartRow; rows < endRow; rows++)
                        {
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.two].Value = users[userCounter].UserID;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.three].Value = users[userCounter].UserName;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.four].Value = users[userCounter].Email;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.five].Value = users[userCounter].BusinessUnit;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.six].Value = users[userCounter].Department;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.seven].Value = users[userCounter].Role;
                            userCounter++;
                        }
                        FormatCells(selsumstartRow, endRow, (int)Constants.MagicNumbers.seven, worksheet);
                        //end selection summary
                        counter++;
                    }
                    p.Workbook.Worksheets.Delete(1);
                    p.Save();
                }
            }
            #endregion
            return strpath;
        }

        public static string GetUsageTrackingReport(string exportType,IList<DetailedEntity> detailedUsage,IList<AggregatedEntity> aggregateUsage, HttpContextBase context)
        {
            string temp = ReturnFilePath(exportType, context);
            string filepath = temp.Split('#')[0];
            string strpath = temp.Split('#')[1];
            var dirName = HttpContext.Current.Session.SessionID;

            if (Directory.Exists(context.Server.MapPath(TempFilePath + dirName)))
            {
                Directory.Delete(context.Server.MapPath(TempFilePath + dirName), true);
            }
            Directory.CreateDirectory(context.Server.MapPath(TempFilePath + dirName));

            string destFile = context.Server.MapPath(strpath);
            File.Copy(filepath, destFile, true);

            var file = new FileInfo(destFile);

            using (ExcelPackage p = new ExcelPackage(file))
            {
                
                for (int sheet=1;sheet<=(int)MagicNumbers.two;sheet++)
                {
                    ExcelWorksheet worksheet = p.Workbook.Worksheets[sheet];
                    worksheet.Cells[(int)MagicNumbers.two, (int)MagicNumbers.two].Value = "LOV USAGE TRACKING REPORT - " + DateTime.Now.ToString("MMM", Constants.Culture).ToUpper(Culture)+ "'"+
                                                                                                                                                            DateTime.Now.ToString("yy", Culture);
                    if (sheet== (int)MagicNumbers.two)
                    {
                        const int initialRow = 5;
                        int endRow = initialRow+detailedUsage.Count;
                        int counter = 0;

                        for (int rows = initialRow; rows < endRow; rows++)
                        {
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.two].Value = detailedUsage[counter].SNo;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.three].Value = detailedUsage[counter].Name;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.four].Value = detailedUsage[counter].Country;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.five].Value = detailedUsage[counter].Department;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.six].Value = detailedUsage[counter].NoOfVisit;
                            counter++;
                        }
                        FormatCells(initialRow, endRow, (int)Constants.MagicNumbers.six, worksheet);
                    }
                   else
                    {
                        const int initialRow = 5;
                        int endRow = initialRow + aggregateUsage.Count;
                        int counter = 0;

                        for (int rows = initialRow; rows < endRow; rows++)
                        {
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.two].Value = aggregateUsage[counter].SNo;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.three].Value = aggregateUsage[counter].Country;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.four].Value = aggregateUsage[counter].Department;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.five].Value = aggregateUsage[counter].NoOfRegisteredUsers;
                            worksheet.Cells[rows, (int)Constants.MagicNumbers.six].Value = aggregateUsage[counter].NoOfVisit;
                            counter++;
                        }
                        FormatCells(initialRow, endRow, (int)Constants.MagicNumbers.six, worksheet);
                    }
                }
                p.Save();
            }

                return strpath;
        }

       

        public static void FormatCells(int initialRow, int endRow, int endColumn, ExcelWorksheet worksheet)
        {
            for (int rows = initialRow; rows < endRow; rows++)
            {
                for (int columns = (int)Constants.MagicNumbers.two; columns <= endColumn; columns++)
                {
                    worksheet.Cells[rows, columns].Style.Border.BorderAround(ExcelBorderStyle.Thin);
                    worksheet.Cells[rows, columns].Style.WrapText = true;
                    worksheet.Row(rows).Height = Math.Max(worksheet.Row(rows).Height,
                                MeasureTextHeight(worksheet.Cells[rows, columns].Value + "...",
                                worksheet.Cells[rows, columns].Style.Font, worksheet.Column(columns).Width * (int)Constants.MagicNumbers.one));
                    worksheet.Cells[rows, columns].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    if (columns >= (int)Constants.MagicNumbers.five)
                    {
                        worksheet.Cells[rows, columns].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    }
                }
            }
        }

        public static double MeasureTextHeight(string text, ExcelFont font, double width)
        {
            const int ExcelMaxHeight = 409;
            if (string.IsNullOrEmpty(text))
            {
                return 0.0;
            }
            var bitmap = new Bitmap((int)Constants.MagicNumbers.one, (int)Constants.MagicNumbers.one);
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

        public void EditGroup(string name, string userlist, string groupId)
        {
            object[] parameters =
           {
                 groupId,
                 name,
                 userlist
            };
            dalObj.EditGroup(parameters);
        }

        public void AddGroup(string userlist, string groupName, string createdBy)
        {
            object[] parameters =
            {
                 groupName,
                 userlist,
                 createdBy
            };
            dalObj.AddGroup(parameters);

        }

        #endregion

        public IList<object> GetUserManagementData
        {
            get
            {
                var response = new UsersResponse();
                DataSet dSet = dalObj.GetUsersData();
                List<object> userDataResponse = new List<object>();

                response.UserList = (from rows in dSet.Tables[0].AsEnumerable()
                                     select new UserListEntity
                                     {
                                         Id = Convert.ToString(rows[DBParameters.UMUserID], Constants.Culture),
                                         UserID = Convert.ToString(rows[DBParameters.UserID], Constants.Culture),
                                         UserName = Convert.ToString(rows[DBParameters.UserName], Constants.Culture),
                                         Email = Convert.ToString(rows[DBParameters.Email], Constants.Culture),
                                         Role = Convert.ToString(rows[DBParameters.Role], Constants.Culture),
                                         BusinessUnit = Convert.ToString(rows[DBParameters.BusinessUnit], Constants.Culture),
                                         Department = Convert.ToString(rows[DBParameters.Department], Constants.Culture),
                                         DateCreated = Convert.ToString(rows[DBParameters.DateCreated], Constants.Culture),
                                         LastActivityDate = Convert.ToString(rows[DBParameters.LastActivityDate], Constants.Culture),
                                         IsActive = Convert.ToBoolean(rows[DBParameters.IsActive], Constants.Culture),

                                     }).ToList();
                userDataResponse.Add(response.UserList);

                response.GroupList = (from rows in dSet.Tables[(int)Constants.MagicNumbers.one].AsEnumerable()
                                      select new GroupListEntity
                                      {

                                          GroupId = Convert.ToString(rows[DBParameters.GroupId], Constants.Culture),
                                          GroupName = Convert.ToString(rows[DBParameters.GroupName], Constants.Culture),
                                          CreatedBy = Convert.ToString(rows[DBParameters.CreatedBy], Constants.Culture),
                                          DateCreated = Convert.ToString(rows[DBParameters.DateCreated], Constants.Culture),

                                      }).ToList();
                userDataResponse.Add(response.GroupList);

                response.UserGroupMap = (from rows in dSet.Tables[(int)Constants.MagicNumbers.two].AsEnumerable()
                                         select new UserGroupMapList
                                         {
                                             UserId = Convert.ToString(rows[DBParameters.UserID], Constants.Culture),
                                             GroupId = Convert.ToString(rows[DBParameters.GroupId], Constants.Culture),


                                         }).ToList();
                userDataResponse.Add(response.UserGroupMap);

                response.DetailedList = (from rows in dSet.Tables[(int)Constants.MagicNumbers.three].AsEnumerable()
                                         select new DetailedEntity
                                         {
                                             SNo = Convert.ToInt32(rows[DBParameters.SNo], Constants.Culture),
                                             Name = Convert.ToString(rows[DBParameters.Name], Constants.Culture),
                                             Country = Convert.ToString(rows[DBParameters.Country], Constants.Culture),
                                             Department = Convert.ToString(rows[DBParameters.Department], Constants.Culture),
                                             NoOfVisit = Convert.ToInt32(rows[DBParameters.NoOfVisit], Constants.Culture)
                                         }).ToList();
                userDataResponse.Add(response.DetailedList);

                response.AggregatedList = (from rows in dSet.Tables[(int)Constants.MagicNumbers.four].AsEnumerable()
                                           select new AggregatedEntity
                                           {
                                               SNo = Convert.ToInt32(rows[DBParameters.SNo], Constants.Culture),
                                               Country = Convert.ToString(rows[DBParameters.Country], Constants.Culture),
                                               Department = Convert.ToString(rows[DBParameters.Department], Constants.Culture),
                                               NoOfRegisteredUsers = Convert.ToInt32(rows[DBParameters.NoOfRegisteredUsers], Constants.Culture),
                                               NoOfVisit = Convert.ToInt32(rows[DBParameters.NoOfVisit], Constants.Culture)
                                           }).ToList();
                userDataResponse.Add(response.AggregatedList);


                return userDataResponse;
            }
        }

        public CommonExportsResponse DeleteUser(string email, int flag)
        {
            var response = new CommonExportsResponse();
            object[] parameters = {
                     email,
                     flag
                };
            dalObj.DeleteUser(parameters);
            response.ResponseCode = (int)Constants.MagicNumbers.one;
            return response;
        }

        public void AddUserToGroups(string group, string id)
        {
            object[] parameters =
            {
                id,
                group

            };
            dalObj.AddUserToGroups(parameters);
        }

        public CommonExportsResponse DeleteGroup(int groupId)
        {
            var response = new CommonExportsResponse();
            object[] parameters = {
                     groupId
                };
            dalObj.DeleteGroup(parameters);
            response.ResponseCode = (int)Constants.MagicNumbers.one;
            return response;
        }

        public CommonExportsResponse UpdateLastActivity(string userId)
        {
            var response = new CommonExportsResponse();
            object[] parameters = {
                     userId
                };
            dalObj.UpdateLastActivity(parameters);
            response.ResponseCode = (int)Constants.MagicNumbers.one;
            return response;
        }

        public DataRow GetUserDetails(string userId)
        {
            object[] parameters = {
               userId
                };
            DataSet dSet = dalObj.GetUserDetail(parameters);

            return dSet.Tables[0].Rows[0];
        }
    }
}
