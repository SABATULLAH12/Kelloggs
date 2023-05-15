using System;
using System.Web.Mvc;
using AQ.Kelloggs.Models.UserManagement;
using AQ.Kelloggs.BAL;
using AQ.Kelloggs.Models;
using System.Collections;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Collections.Generic;
using Microsoft.AspNet.Identity;
using AQ.Kelloggs.UI.App_Start;
using Microsoft.AspNet.Identity.Owin;
using AQ.Kelloggs.Models.Login;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data;
using System.IO;
using System.Drawing;
using System.Data.Entity.Validation;

namespace AQ.Kelloggs.UI.Controllers
{
    public class UserManagementController : BaseController
    {
        readonly UserManagementBAL balObj = new UserManagementBAL();
        // GET: UserManagement
        public ActionResult UserManagement()
        {
            if (Session["Roles"].ToString() != "Admin")
            {
                return RedirectToAction("AccessDenied", "Error");
            }
            return View();
        }

        public string UserManagementExport(string exportType, string response, string userData)
        {

            try
            {
                if (exportType != "excel")
                {
                    var responseData = new UserManagementResponse { DataList = JsonConvert.DeserializeObject<List<ResponseData>>(HttpUtility.UrlDecode(response, System.Text.UTF8Encoding.Default)) };
                    UserManagementResponse responseUserData = new UserManagementResponse();
                    if (userData != null)
                    {
                        responseUserData = new UserManagementResponse { DataList = JsonConvert.DeserializeObject<List<ResponseData>>(HttpUtility.UrlDecode(userData)) };
                    }

                    return UserManagementBAL.GetExcelDetails(exportType, responseData, responseUserData, this.HttpContext);
                }
                else
                {
                    var detailedUsage = JsonConvert.DeserializeObject<List<DetailedEntity>>(HttpUtility.UrlDecode(userData));
                    var aggregateUsage = JsonConvert.DeserializeObject<List<AggregatedEntity>>(HttpUtility.UrlDecode(response));
                    return UserManagementBAL.GetUsageTrackingReport(exportType, detailedUsage, aggregateUsage, this.HttpContext);
                }



            }
            catch (Exception ex)
            {
                AQ.Logger.TrackEvent(ex.Message);
                return "";
            }
        }

        readonly bool sendMail = Convert.ToBoolean(System.Configuration.ConfigurationManager.AppSettings["SendEmail"].ToString(Models.Constants.Culture), Models.Constants.Culture);
        readonly SmtpMail mailer = new SmtpMail();
        public bool AddUser(string user, string role, string group)
        {


            var request = JsonConvert.DeserializeObject<UserListEntity>(HttpUtility.UrlDecode(user));

            ApplicationDbContext dbContext = new ApplicationDbContext();
            HttpContextBase context = this.HttpContext;
            var userobj = dbContext.Users.FirstOrDefault(x => x.Email == request.Email);
            if (userobj != null)
            {
                return false;
            }
            else
            {
                dbContext.Users.Add(new ApplicationUser
                {
                    Email = request.Email,
                    UserName = request.UserID,
                    Name = request.UserName,
                    Department = request.Department,
                    BusinessUnit = request.BusinessUnit,
                    DateCreated = DateTime.Now,
                    LastActivityDate = DateTime.Now,
                    IsActive = true,
                    Country = request.Country
                });

                try
                {
                    dbContext.SaveChanges();
                }
                catch (DbEntityValidationException e)
                {
                    foreach (var eve in e.EntityValidationErrors)
                    {
                        AQLogger.Logger.GetInstance().ErrorFormat("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                         eve.Entry.Entity.GetType().Name, eve.Entry.State);

                        foreach (var ve in eve.ValidationErrors)
                        {
                            AQLogger.Logger.GetInstance().ErrorFormat("- Property: \"{0}\", Error: \"{1}\"",
                                ve.PropertyName, ve.ErrorMessage);

                        }
                    }
                    throw;
                }
                userobj = dbContext.Users.FirstOrDefault(x => x.Email == request.Email);
                var roleId = dbContext.Roles.FirstOrDefault(x => x.Name == role);

                userobj.Roles.Add(new IdentityUserRole { RoleId = roleId.Id, UserId = userobj.Id });

                dbContext.SaveChanges();
                if (group != "undefined " && group != " ")
                {
                    UserManagementBAL userbalObj = new UserManagementBAL();
                    userbalObj.AddUserToGroups(group, userobj.UserName);
                }


                if (sendMail)
                {
                    string pathToHTMLFile = context.Server.MapPath("~/Templates/Email/Kelloggs_mailer.html");

                    string savedFile = "../Temp" + DateTime.Now.ToString("dd-MM-yyyy-hhmmss", Models.Constants.Culture) + context.Session["UserId"] + ".html";

                    string htmlString = System.IO.File.ReadAllText(pathToHTMLFile);

                    htmlString = htmlString.Replace("$$url", System.Configuration.ConfigurationManager.AppSettings["ida:RedirectUri"].ToString(Models.Constants.Culture));

                    GetImages(ref htmlString, "\\Content\\Images\\Kelloggs_Mailer_Elements\\Kelloggs_mailer_01.jpg", "$$images01");

                    mailer.MailObj.To = request.Email;
                    mailer.MailObj.Subject = System.Configuration.ConfigurationManager.AppSettings["UserAdditionSubject"].ToString(Models.Constants.Culture);

                    System.IO.File.WriteAllText(context.Server.MapPath(savedFile), htmlString);
                    mailer.MailObj.Body = htmlString;
                    mailer.SendMail();

                }
                return true;
            }
        }

        private static void GetImages(ref string htmlString, string path, string replace)
        {
            try
            {
                using (Image image = Image.FromFile(AppContext.BaseDirectory + path))
                {
                    using (MemoryStream m = new MemoryStream())
                    {
                        image.Save(m, image.RawFormat);
                        byte[] imageBytes = m.ToArray();

                        // Convert byte[] to Base64 String
                        string base64String = Convert.ToBase64String(imageBytes);

                        htmlString = htmlString.Replace(replace, "data:image/jpg;base64," + base64String);

                    }
                }
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }

        public JsonResult DeleteUser(string email, int flag)
        {

            var response = balObj.DeleteUser(email, flag);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public bool EditUser(string user, string role, string group, string status)
        {

            var request = JsonConvert.DeserializeObject<UserListEntity>(HttpUtility.UrlDecode(user));

            ApplicationDbContext dbContext = new ApplicationDbContext();
            var userobj = dbContext.Users.FirstOrDefault(x => x.Email == request.Email);
            var roleId = dbContext.Roles.FirstOrDefault(x => x.Name == role);
            userobj.Roles.Clear();
            userobj.Roles.Add(new IdentityUserRole { RoleId = roleId.Id, UserId = userobj.Id });
            userobj.IsActive = status == "Active";
            dbContext.SaveChanges();

            if (group != "undefined" && group != "")
            {
                UserManagementBAL userbalObj = new UserManagementBAL();
                userbalObj.AddUserToGroups(group, userobj.UserName);
            }

            return true;
        }

        public bool AddGroup(string userlist, string groupName)
        {
            UserManagementBAL userbalObj = new UserManagementBAL();
            userbalObj.AddGroup(userlist, groupName, Session["Username"].ToString());
            return true;
        }

        public bool EditGroup(string name, string userlist, string groupId)
        {
            UserManagementBAL userbalObj = new UserManagementBAL();
            userbalObj.EditGroup(name, userlist, groupId);
            return true;
        }

        public JsonResult DeleteGroup(int groupId)
        {

            var response = balObj.DeleteGroup(groupId);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateLastActivity(string userId)
        {

            var response = balObj.UpdateLastActivity(userId);
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
