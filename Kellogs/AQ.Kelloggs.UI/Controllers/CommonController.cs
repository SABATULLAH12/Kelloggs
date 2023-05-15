/*
 * SonarQube, open source software quality management tool.
 * Copyright (C) 2008-2013 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * SonarQube is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * SonarQube is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
#region Includes
using System.Web.Mvc;
using models = AQ.Kelloggs.Models;
using AQ.Kelloggs.BAL;
using System.Web.Security;
using System.IO;
using System.Web;
using System;
using System.DirectoryServices.AccountManagement;
using System.Collections.Generic;
using System.Linq;
using AQ.Kelloggs.Models.Login;
using Microsoft.AspNet.Identity;
using AQ.Kelloggs.UI.App_Start;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity.EntityFramework;
using Newtonsoft.Json;
using System.Reflection.PortableExecutable;
using Microsoft.Graph;
using Microsoft.Graph.Auth;
using Microsoft.Identity.Client;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Configuration;
using System.Web.Script.Serialization;
#endregion

#region Namespace
namespace AQ.Kelloggs.UI.Controllers
{

    #region AD Search Filter
    public class AQUserPrincipalSearchFilter : AdvancedFilters
    {
        public AQUserPrincipalSearchFilter(Principal p) : base(p) { }

        public void UserType(string type)
        {
            this.AdvancedFilterSet("StructuralObjectClass", type, typeof(string), MatchType.Equals);
        }

        public void Designation()
        {
            this.AdvancedFilterSet("title", "*", typeof(string), MatchType.Equals);
        }

        public void Designation(string desig)
        {
            this.AdvancedFilterSet("title", desig, typeof(string), MatchType.Equals);
        }

        public void Team()
        {
            this.AdvancedFilterSet(models.Constants.DBParameters.Department.ToLower(Models.Constants.Culture), "*", typeof(string), MatchType.Equals);
        }

        public void Name(string usrname)
        {
            this.AdvancedFilterSet("name", usrname + "*", typeof(string), MatchType.Equals);
        }

        public void Team(string usrteam)
        {

            this.AdvancedFilterSet(models.Constants.DBParameters.Department.ToLower(Models.Constants.Culture), usrteam, typeof(string), MatchType.Equals);
        }

        public void Email()
        {
            this.AdvancedFilterSet("UserPrincipalName", "*", typeof(string), MatchType.Equals);
        }

        public void Email(string usremail)
        {
            this.AdvancedFilterSet("UserPrincipalName", usremail + "*", typeof(string), MatchType.Equals);
        }

        public void EmployeeID()
        {
            this.AdvancedFilterSet("Description", "*", typeof(string), MatchType.Equals);
        }

        public void EmployeeID(string empid)
        {
            this.AdvancedFilterSet("Description", empid, typeof(string), MatchType.Equals);
        }
    }

    [DirectoryRdnPrefix("CN")]
    [DirectoryObjectClass("Person")]
    public class AQUserPrincipal : UserPrincipal
    {
        // Inplement the constructor using the base class constructor. 
        public AQUserPrincipal(PrincipalContext context)
            : base(context)
        {
        }

        // Implement the constructor with initialization parameters.    
        public AQUserPrincipal(PrincipalContext context,
                             string samAccountName,
                             string password,
                             bool enabled)
            : base(context, samAccountName, password, enabled)
        {
        }

        AQUserPrincipalSearchFilter searchFilter;

        new public AQUserPrincipalSearchFilter AdvancedSearchFilter
        {
            get
            {
                if (null == searchFilter)
                {
                    searchFilter = new AQUserPrincipalSearchFilter(this);
                }
                return searchFilter;
            }
        }

        // Create the "Designation" property.    
        [DirectoryProperty("title")]
        public string Designation
        {
            get
            {
                if (ExtensionGet("title").Length != 1)
                {
                    return string.Empty;
                }
                return (string)ExtensionGet("title")[0];
            }
            set { ExtensionSet("title", value); }
        }

        // Create the "Team" property.    
        [DirectoryProperty("department")]
        public string Team
        {
            get
            {
                if (ExtensionGet(models.Constants.DBParameters.Department.ToLower(models.Constants.Culture)).Length != 1)
                {
                    return string.Empty;
                }

                return (string)ExtensionGet(models.Constants.DBParameters.Department.ToLower(models.Constants.Culture))[0];
            }
            set { ExtensionSet(models.Constants.DBParameters.Department.ToLower(models.Constants.Culture), value); }
        }

        // Create the "Email" property.    
        [DirectoryProperty("UserPrincipalName")]
        public string Email
        {
            get
            {
                if (ExtensionGet("UserPrincipalName").Length != 1)
                { return string.Empty; }

                return (string)ExtensionGet("UserPrincipalName")[0];
            }
            set { ExtensionSet("UserPrincipalName", value); }
        }

        // Create the "Employee ID" property.    
        [DirectoryProperty("Description")]
        public string EmployeeID
        {
            get
            {
                if (ExtensionGet("Description").Length != 1)
                { return string.Empty; }

                return (string)ExtensionGet("Description")[0];
            }
            set { ExtensionSet("Description", value); }
        }

        // Create the "Employee ID" property.    
        [DirectoryProperty("Company")]
        public string Company
        {
            get
            {
                if (ExtensionGet("Company").Length != 1)
                { return string.Empty; }

                return (string)ExtensionGet("Company")[0];
            }
            set { ExtensionSet("Company", value); }
        }

        // Create the "Employee ID" property.    
        [DirectoryProperty("department")]
        public string Department
        {
            get
            {
                if (ExtensionGet(models.Constants.DBParameters.Department.ToLower(models.Constants.Culture)).Length != 1)
                { return string.Empty; }

                return (string)ExtensionGet(models.Constants.DBParameters.Department.ToLower(models.Constants.Culture))[0];
            }
            set { ExtensionSet(models.Constants.DBParameters.Department.ToLower(models.Constants.Culture), value); }
        }

    }
    #endregion

    #region Controller Class
    [Authorize]
    public class CommonController : Controller
    {
        readonly LeftPanelBAL balObj = new LeftPanelBAL();
        readonly UserManagementBAL userbalObj = new UserManagementBAL();
        readonly string env = System.Configuration.ConfigurationManager.AppSettings["Environment"].ToString(models.Constants.Culture);
        readonly bool Testflag = System.Configuration.ConfigurationManager.AppSettings["Testflag"].ToString(models.Constants.Culture) == "true";
        readonly ApplicationUserManager userMgr = System.Web.HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
        private static string redirectUri = ConfigurationManager.AppSettings["ida:RedirectUri"];
        private static string appId = ConfigurationManager.AppSettings["ida:AppId"];
        private static string appSecret = ConfigurationManager.AppSettings["ida:AppSecret"];
        private static string nonAdminScopes = ConfigurationManager.AppSettings["ida:NonAdminScopes"];
        private static string adminScopes = ConfigurationManager.AppSettings["ida:AdminScopes"];
        readonly bool isMaintainence = ConfigurationManager.AppSettings["IsMaintainence"].ToString(models.Constants.Culture) == "true";
        readonly bool reloadLeftPanel = ConfigurationManager.AppSettings["ReloadLeftPanel"].ToString(models.Constants.Culture) == "true";
        readonly object objLocker = new object();
        readonly string Email = "Email";
        readonly string Error = "Error";
        // GET: Common
        public ActionResult Index()
        {
            ApplicationUser authUsr = new ApplicationUser();
            try
            {
                if (isMaintainence && Session[Email] != null
                    && !ConfigurationManager.AppSettings["AdminList"].ToUpper(models.Constants.Culture).Contains(Session[Email].ToString().ToUpper(Models.Constants.Culture)))
                {
                    return RedirectToAction("Maintainence", Error);
                }
                var roleMgr = System.Web.HttpContext.Current.GetOwinContext().Get<ApplicationRoleManager>();
                if (env == "Dev" && !Testflag && false)
                {
                    var winUsr = System.Web.HttpContext.Current.User.Identity;

                    AQLogger.Logger.GetInstance().Error("Name:" + winUsr.GetUserName());
                    var user = winUsr.Name.Split('\\');
                    authUsr = CheckUser(user[1], env);
                }
                else
                {
                    if (!Testflag)
                    {
                        var winUser = ClaimsPrincipal.Current.ToGraphUserAccount();
                        AQLogger.Logger.GetInstance().Error("Name:" + winUser.Email);

                        authUsr = CheckUser(winUser.Email, env);
                    }

                }

                if (env == "Dev" && Testflag && System.Web.HttpContext.Current.Request.Params["userid"] != null)
                {
                    var user1 = System.Web.HttpContext.Current.Request.Params["userid"].Split('\\');
                    authUsr = user1[1] != "" ? CheckUser(user1[1], env) : CheckUser(user1[(int)models.Constants.MagicNumbers.two], env);

                }

                if (authUsr != null)
                {
                    if (authUsr.IsActive)
                    {
                        FormsAuthentication.SetAuthCookie(authUsr.Email, true);

                        userMgr.UpdateSecurityStamp(authUsr.Id);
                        var role = userMgr.GetRoles(authUsr.Id).FirstOrDefault();
                        Session["Roles"] = role;
                        Session[Email] = authUsr.Email;
                        Session["Username"] = authUsr.UserName;
                        Session["UserId"] = authUsr.Id;
                        Session["Modules"] = roleMgr.FindByName(role).Modules;

                        if (!ConfigurationManager.AppSettings["AdminList"].ToUpper(models.Constants.Culture).Contains(Session[Email].ToString().ToUpper(Models.Constants.Culture)) && isMaintainence)
                        {
                            return RedirectToAction("Maintainence", Error);
                        }
                        //Usage Histroy
                        Logger.TrackSignIn("kellogg", "kellogg", authUsr.UserName);

                        userbalObj.UpdateLastActivity(authUsr.UserName);
                        return RedirectToAction("Home", "Home");
                    }
                    else
                    {
                        return RedirectToAction("NoAccess", Error);
                    }
                }
                else
                {
                    return RedirectToAction("NoAccess", Error);
                }
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.StackTrace);
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }

        #region Session Check
        public ApplicationUser CheckUser(string username, string env)
        {
            switch (env)
            {
                case "Dev":
                    {
                        return userMgr.FindByEmail(username);
                    }
                case "Prod":
                case "UAT":
                    {
                        return userMgr.FindByEmail(username);
                    }
                default:
                    {
                        break;
                    }
            }

            return null;

        }
        public Uri GetLoginUrl
        {
            get
            {
                return User.Identity.IsAuthenticated ? new Uri(string.Empty) : new Uri(FormsAuthentication.LoginUrl);
            }
        }
        #endregion

        #region Logout
        public ActionResult Logout()
        {
            if (Session != null)
            {
                Session.Clear();
            }
            //Usage History
            Logger.TrackSignOut();
            FormsAuthentication.SignOut();
            Session.Abandon();
            return RedirectToAction("Login");
        }
        #endregion


        public static GraphServiceClient GetAuthenticatedClient
        {
            get
            {
                if (!redirectUri.EndsWith("/"))
                { redirectUri = redirectUri + "/"; }
                bool? isAdmin = System.Web.HttpContext.Current.Session["IsAdmin"] as bool?;
                string allScopes = nonAdminScopes;
                if (isAdmin.GetValueOrDefault())
                {
                    allScopes += " " + adminScopes;
                }
                string[] scopes = allScopes.Split(' ');

                HttpContextBase context = System.Web.HttpContext.Current.GetOwinContext().Environment["System.Web.HttpContextBase"] as HttpContextBase;
                SessionTokenCacheProvider sessionTokenCacheProvider = new SessionTokenCacheProvider(context);

                IConfidentialClientApplication cca = AuthorizationCodeProvider.CreateClientApplication(appId, redirectUri, new ClientCredential(appSecret), sessionTokenCacheProvider);

                return new GraphServiceClient(new AuthorizationCodeProvider(cca, scopes));
            }
        }


        //Search User from AD
        public async Task<JsonResult> SearchUsers(string name)
        {
            IList<AQUserPrincipal> Users = null;

            try
            {
                List<object> userResponse = new List<object>();
                if (env == "Dev")
                {
                    //using (PrincipalContext ctx = new PrincipalContext(ContextType.Domain, "10.80.230.180", "us\\_Landmark_UAT_svc", "%!cQLnhA6=nET$LQ"))
                    using (PrincipalContext ctx = new PrincipalContext(ContextType.Domain, "192.168.0.2:389", "rajag@aq.local", "P@55w0rd@454"))
                    {
                        // Search the directory for the new object. 
                        AQUserPrincipal myUsersPrincipal = new AQUserPrincipal(ctx);
                        const string strCountry = "India";
                        myUsersPrincipal.AdvancedSearchFilter.Email(name);
                        PrincipalSearchResult<Principal> principals = null;

                        using (PrincipalSearcher principalSearcher = new PrincipalSearcher(myUsersPrincipal))
                        {
                            principals = principalSearcher.FindAll();
                        }

                        Users = principals.Select(principal => principal as AQUserPrincipal).ToList();

                        var UserList = (from rows in Users.AsEnumerable()
                                        select new models.UserManagement.UserListEntity
                                        {
                                            UserID = Convert.ToString(rows.SamAccountName, models.Constants.Culture),
                                            UserName = Convert.ToString(rows.DisplayName, models.Constants.Culture),
                                            Email = Convert.ToString(rows.Email, models.Constants.Culture),
                                            BusinessUnit = Convert.ToString(rows.Company, models.Constants.Culture),
                                            Department = Convert.ToString(rows.Department, models.Constants.Culture),
                                            Country = strCountry
                                        }).ToList();

                        userResponse.Add(UserList);

                        JsonResult jsonResult = Json(userResponse, JsonRequestBehavior.AllowGet);
                        jsonResult.MaxJsonLength = int.MaxValue;
                        HttpContext.Cache["UserList"] = jsonResult;

                        return jsonResult;
                    }
                }
                else
                {
                    GraphServiceClient graphClient = GetAuthenticatedClient;
                    IGraphServiceUsersCollectionPage userLst = await graphClient.Users.Request()
                        .WithUserAccount(ClaimsPrincipal.Current.ToGraphUserAccount())
                        .Filter("startswith(mail,'" + (name != null ? name.Replace("'", "''") : name) + "')")
                        .Select(x => new { x.GivenName, x.Department, x.DisplayName, x.Mail, x.CompanyName, x.OnPremisesSamAccountName, x.Country })
                        .GetAsync().ConfigureAwait(true);
                    var usrLst = new List<models.UserManagement.UserListEntity>();
                    foreach (var user in userLst)
                    {
                        usrLst.Add(new models.UserManagement.UserListEntity
                        {
                            UserID = user.OnPremisesSamAccountName,
                            UserName = user.DisplayName,
                            Email = user.Mail,
                            BusinessUnit = user.CompanyName,
                            Department = user.Department,
                            Country = user.Country
                        });
                    }

                    userResponse.Add(usrLst);

                    JsonResult jsonResult = Json(userResponse, JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    HttpContext.Cache["UserList"] = jsonResult;

                    return jsonResult;

                }
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.StackTrace);
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }

        #region left panel
        private static string GetJsonName(int moduleId)
        {
            string name = "";
            switch (moduleId)
            {
                case (int)models.Constants.MagicNumbers.two:
                    name = "../json/leftPanelSnapshot.json";
                    break;
                case (int)models.Constants.MagicNumbers.three:
                    name = "../json/leftPanelCrossTab.json";
                    break;
                case (int)models.Constants.MagicNumbers.four:
                    name = "../json/leftPanelOccasionStrategicPostures.json";
                    break;
                case (int)models.Constants.MagicNumbers.five:
                    name = "../json/leftPanelCorrespondenceMap.json";
                    break;
                case (int)models.Constants.MagicNumbers.seven:
                    name = "../json/leftPanelReportGenerator.json";
                    break;
                case (int)models.Constants.MagicNumbers.nine:
                    name = "../json/leftPanelPerformanceDashboard.json";
                    break;
                case (int)models.Constants.MagicNumbers.fifty:
                    name = "../json/leftPanelMarketTimePeriod.json";
                    break;
                default:
                    name = "../json/leftPanelCrossTab.json";
                    break;
            }
            return name;
        }
        public JsonResult LoadLeftPanel(int moduleId)
        {
            lock (objLocker)
            {
                try
                {
                    JsonResult jsonResult;
                    string fileName = GetJsonName(moduleId);
                    string file = Server.MapPath(fileName);
                    string cacheName = fileName.Split('/')[2].Split('.')[0];
                    //ClearFileAndCacheIfLeftPanelReload();
                    if (HttpContext.Cache[cacheName] == null)
                    {
                        if (!System.IO.File.Exists(file))
                        {
                            var response = moduleId == (int)models.Constants.MagicNumbers.fifty ? balObj.GetMarketTimeperiodData : balObj.GetLeftPanel(moduleId);
                            jsonResult = Json(response, JsonRequestBehavior.AllowGet);
                            jsonResult.MaxJsonLength = int.MaxValue;
                            new System.Threading.Thread(() =>
                            {
                                System.Threading.Thread.CurrentThread.IsBackground = true;
                                /* run your code here */
                                using (var tw = new StreamWriter(file, true))
                                {
                                    string jResult = JsonConvert.SerializeObject(jsonResult.Data);
                                    tw.Write(jResult);
                                    tw.Close();
                                }
                            }).Start();
                        }
                        else
                        {
                            using (StreamReader r = new StreamReader(file))
                            {
                                string data = r.ReadToEnd();
                                JavaScriptSerializer ser = new JavaScriptSerializer();
                                ser.MaxJsonLength = int.MaxValue;
                                var jData = ser.DeserializeObject(data);
                                jsonResult = Json(jData, JsonRequestBehavior.AllowGet);
                                jsonResult.MaxJsonLength = int.MaxValue;
                                r.Close();
                            }
                        }
                        HttpContext.Cache[cacheName] = jsonResult;
                    }
                    else
                    {
                        jsonResult = (JsonResult)HttpContext.Cache[cacheName];
                    }
                    return jsonResult;
                }
                catch (Exception ex)
                {
                    AQLogger.Logger.GetInstance().Error(ex.Message);
                    throw;
                }
            }
        }

        private void ClearFileAndCacheIfLeftPanelReload()
        {
            if (reloadLeftPanel)
            {
                var myConfiguration = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~");
                myConfiguration.AppSettings.Settings["IsMaintainence"].Value = "true";
                string[] filePaths = System.IO.Directory.GetFiles(Server.MapPath("../json"), "leftPanel*.json");
                foreach (string file in filePaths)
                {
                    object objLockInternal = new object();
                    lock (objLockInternal)
                    {
                        string cacheName = file.Substring(startIndex: file.IndexOf("left")).Split('.')[0];
                        if (System.IO.File.Exists(file))
                        {
                            System.IO.File.Delete(file);
                        }
                        if (HttpContext.Cache[cacheName] != null)
                        {
                            HttpContext.Cache.Remove(cacheName);
                        }
                        RecreateFileAndCache(file, cacheName);
                    }
                }
                myConfiguration.AppSettings.Settings["ReloadLeftPanel"].Value = "false";
                myConfiguration.AppSettings.Settings["IsMaintainence"].Value = "false";
                myConfiguration.Save();
            }
        }

        private void RecreateFileAndCache(string file, string cacheName)
        {
            object objLockInternal = new object();
            lock (objLockInternal)
            {
                int moduleId = GetModuleId(cacheName.Replace("leftPanel", "").ToLower(models.Constants.Culture));
                var response = moduleId == (int)models.Constants.MagicNumbers.fifty ? balObj.GetMarketTimeperiodData : balObj.GetLeftPanel(moduleId);
                JsonResult jsonResult = Json(response, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                using (var tw = new StreamWriter(file, true))
                {
                    string jResult = JsonConvert.SerializeObject(jsonResult.Data);
                    tw.Write(jResult);
                    tw.Close();
                }
                HttpContext.Cache[cacheName] = jsonResult;
            }
        }

        private static int GetModuleId(string cacheName)
        {
            int moduleId = 0;
            switch (cacheName)
            {
                case "snapshot":
                    moduleId = (int)models.Constants.MagicNumbers.two;
                    break;
                case "crosstab":
                    moduleId = (int)models.Constants.MagicNumbers.three;
                    break;
                case "occasionstrategicpostures":
                    moduleId = (int)models.Constants.MagicNumbers.four;
                    break;
                case "correspondencemap":
                    moduleId = (int)models.Constants.MagicNumbers.five;
                    break;
                case "reportgenerator":
                    moduleId = (int)models.Constants.MagicNumbers.seven;
                    break;
                case "performancedashboard":
                    moduleId = (int)models.Constants.MagicNumbers.nine;
                    break;
                default:
                    moduleId = (int)models.Constants.MagicNumbers.fifty;
                    break;
            }
            return moduleId;
        }

        #endregion

        #region Left Panel For Dashboard
        public JsonResult LoadLeftPanelDashboard(string userId)
        {
            try
            {
                var response = balObj.GetLeftPanelDashboard(userId);
                JsonResult jsonResult = Json(response, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                HttpContext.Cache["leftPanelDashboard"] = jsonResult;

                return jsonResult;
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }
        public JsonResult LoadDashboard(string userId, int flag)
        {
            try
            {
                var response = balObj.GetDashboard(userId, flag);
                JsonResult jsonResult = Json(response, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                HttpContext.Cache["Dashboard"] = jsonResult;

                return jsonResult;
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }
        #endregion

        #region User Management Data

        public JsonResult LoadUserManagementData()
        {
            try
            {
                var response = userbalObj.GetUserManagementData;
                JsonResult jsonResult = Json(response, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                HttpContext.Cache["UserManagementData"] = jsonResult;

                return jsonResult;
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }

        #endregion

        #region check session dynamic 
        public JsonResult SessionCheck()
        {
            return Session["UserName"] == null ? Json(false, JsonRequestBehavior.AllowGet) : Json(true, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Help file download
        public string DownloadUserGuide(int flag, string name)
        {
            try
            {
                string filepath = string.Empty;
                var dirName = "Guide" + DateTime.Now.ToString("dd-mm-yy hhmmss", models.Constants.Culture);
                if (System.IO.Directory.Exists(Server.MapPath(models.Constants.TempPath + dirName)))
                {
                    System.IO.Directory.Delete(Server.MapPath(models.Constants.TempPath + dirName), true);
                }
                System.IO.Directory.CreateDirectory(Server.MapPath(models.Constants.TempPath + dirName));

                if (flag == (int)models.Constants.UserGuideType.crosstab)//CrossTab
                {
                    filepath = models.Constants.TempPath + dirName + "/Crosstab.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.UserGuidePathCrosstab), Server.MapPath(filepath));
                }
                else if (flag == (int)models.Constants.UserGuideType.snapshot)//Snapshot guide
                {
                    filepath = models.Constants.TempPath + dirName + "/Occasion-Profile.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.UserGuidePathSnapshot), Server.MapPath(filepath));
                }
                else if (flag == (int)models.Constants.UserGuideType.swimlanes)//Advanced Analytics
                {
                    filepath = models.Constants.TempPath + dirName + "/Occasion-Strategic-Postures.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.UserGuidePathOSP), Server.MapPath(filepath));
                }
                else if (flag == (int)models.Constants.UserGuideType.correspondencemaps)//Advanced Analytics
                {
                    filepath = models.Constants.TempPath + dirName + "/Correspondence-Maps.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.UserGuidePathCM), Server.MapPath(filepath));
                }
                else if (flag == (int)models.Constants.UserGuideType.allmodules)//All modules
                {
                    filepath = models.Constants.TempPath + dirName + "/AllModules.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.UserGuidePathAll), Server.MapPath(filepath));
                }
                else if (flag == (int)models.Constants.UserGuideType.dashboard)//Dashboard
                {
                    filepath = models.Constants.TempPath + dirName + "/MyDashboard.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.UserGuidePathMyDashboard), Server.MapPath(filepath));
                }
                else if (flag == models.Constants.Questionairre)//All modules
                {
                    string QuestionairreType = System.Configuration.ConfigurationManager.AppSettings["QuestionairreType"].ToString(models.Constants.Culture);
                    if (QuestionairreType != "pdf")
                    {
                        filepath = models.Constants.TempPath + dirName + "/Questionairre." + QuestionairreType;
                        System.IO.File.Copy(Server.MapPath("~/UserGuide/Questionairre." + QuestionairreType), Server.MapPath(filepath));
                    }
                    else
                    {
                        filepath = models.Constants.TempPath + dirName + "/Questionairre.pdf";
                        System.IO.File.Copy(Server.MapPath(models.Constants.QuestionairreDocument), Server.MapPath(filepath));
                    }

                }
                else if (flag == models.Constants.RegionalContacts)//Regional Contacts
                {
                    filepath = models.Constants.TempPath + dirName + "/RegionalContacts.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.RegionalContactsDocument), Server.MapPath(filepath));
                }
                else if (flag == (int)models.Constants.UserGuideType.usermanagement)
                {
                    filepath = models.Constants.TempPath + dirName + "/UserManagement.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.UsermanagementGuide), Server.MapPath(filepath));
                }
                else if (flag == (int)models.Constants.UserGuideType.reportgenerator)//Report Generator
                {
                    filepath = models.Constants.TempPath + dirName + "/ReportGenerator.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.Reportgeneratorguide), Server.MapPath(filepath));
                }
                else if (flag == (int)models.Constants.UserGuideType.performanceDashboard)
                {
                    filepath = models.Constants.TempPath + dirName + "/PerformanceDashboard.pdf";
                    System.IO.File.Copy(Server.MapPath(models.Constants.PerformanceDashboardGuide), Server.MapPath(filepath));
                }
                else
                { filepath = ""; }
                return filepath;
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }
        #endregion

        public JsonResult GetStickySelection(int moduleId)
        {
            var userId = Session["Username"].ToString();
            models.StickyRequest stickyObj = null;
            if (!ConfigurationManager.AppSettings["StickySelectionDisableList"].ToUpper(Models.Constants.Culture).Contains(Session[Email].ToString().ToUpper(Models.Constants.Culture)))
            {
                stickyObj = balObj.GetStickySelections(new Models.StickyRequest { UserId = userId, ModuleId = moduleId });
            }
            if (stickyObj == null)
            { return Json(""); }
            return Json(stickyObj.FilterData ?? "");
        }

        public void SaveStickySelection(int moduleId, string selectionObj)
        {
            var userId = Session["Username"].ToString();
            balObj.SubmitStickySelections(new Models.StickyRequest { UserId = userId, ModuleId = moduleId, FilterData = selectionObj });
        }

        /*download files start*/
        public FileResult DownloadFile(string path)
        {
            try
            {
                var folderName = Path.GetDirectoryName(path);
                byte[] filedata = System.IO.File.ReadAllBytes(Server.MapPath(path));
                string contentType = MimeMapping.GetMimeMapping(Server.MapPath(path));
                var cd = new System.Net.Mime.ContentDisposition
                {
                    FileName = Path.GetFileName(path),
                    Inline = true,
                };
                Response.AppendHeader("Content-Disposition", cd.ToString());

                if (System.IO.Directory.Exists(Server.MapPath(folderName)))
                {
                    System.IO.Directory.Delete(Server.MapPath(folderName), true);
                }

                return File(filedata, contentType);
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }
        /*download files end*/

        public JsonResult LoadCustomList(string userId, int flag)
        {
            JsonResult jsonResult;
            try
            {
                var response = flag == 0 ? balObj.GetCustomFilters(userId) : balObj.GetCustomGroups(userId);
                jsonResult = Json(response, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                HttpContext.Cache["Custom Filters"] = jsonResult;

                return jsonResult;
            }
            catch (Exception ex)
            {
                AQLogger.Logger.GetInstance().Error(ex.Message);
                throw;
            }
        }
        public JsonResult Save_Custom_Filter(string userId, string FilterID, string FilterName, string CustomFilterName)
        {
            var response = balObj.Save_Custom_Filter(userId, FilterID, FilterName, CustomFilterName);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Save_Custom_Group(string userId, string request)
        {
            var requestData = JsonConvert.DeserializeObject<models.CustomGroupEntity>(HttpUtility.UrlDecode(request));
            var response = balObj.Save_Custom_Group(userId, requestData);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteCustomGroup(string userId, string filterIds, string type)
        {
            var response = balObj.DeleteCustomGroup(userId, filterIds, type);
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadMarketTimeperiod()
        {
            JsonResult jsonResult;
            lock (objLocker)
            {
                try
                {
                    if (HttpContext.Cache["MarketTimeperiod"] == null)
                    {
                        var response = balObj.GetMarketTimeperiodData;
                        jsonResult = Json(response, JsonRequestBehavior.AllowGet);
                        jsonResult.MaxJsonLength = int.MaxValue;
                        HttpContext.Cache["MarketTimeperiod"] = jsonResult;
                    }
                    else
                    {
                        jsonResult = (JsonResult)HttpContext.Cache["MarketTimeperiod"];
                    }
                    return jsonResult;
                }
                catch (Exception ex)
                {
                    AQLogger.Logger.GetInstance().Error(ex.Message);
                    throw;
                }
            }
        }
    }
    #endregion
}
#endregion