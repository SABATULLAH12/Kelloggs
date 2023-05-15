
/*Source Description
************************************************** File Description Block ***************************************************

                            The file contains the constants related to url for all the pages
******************************************************************************************************************************

        Modifiled Date                          Modified By                                     Comments
         17-05-2017                              Chandru

******************************************************************************************************************************/

var webCall = "";
var callsType = function () { };
callsType.Post = "POST";
callsType.Get = "GET";

/*custome messages start*/
var customMessages = function () { };
customMessages.LoginUserName = "Username should not be empty";
customMessages.LoginPassword = "Password should not be empty";
customMessages.InValidUserName_Password = "Invalid username or password";
customMessages.Timeperiod = "Please select Time Period(s) to proceed.";
customMessages.DataNotAvailable = "Data Not Available";
customMessages.EmailMandatory = "Email should not be empty";
customMessages.Error = "An error occurred. Please try again.";
customMessages.ColumnSelection = "Please select Column metric to proceed.";
customMessages.MaxColumnSelection = "Maximum limit of 24 selections for columns exceeded."
customMessages.RowSelection = "Please select Row metric to proceed.";
customMessages.RowNestingSelection = "Please select Row Nesting metric to proceed.";
customMessages.RequiredSelection = "Please select all the required selections first.";
customMessages.MarketSelection = "Please select Market(s) to proceed.";
customMessages.NoCommonMetric = "No item(s)/brand(s) available for above selections.";
customMessages.MaxRowSelection = "Maximum limit of 50 selections for rows exceeded.";
customMessages.OccasionSelection = "Please select Occasion(s) to proceed.";
customMessages.CategorySelection = "Please select Category/Item/Brand to proceed.";
customMessages.MetricSelection = "Please select 5W metric(s) to proceed.";
customMessages.DemographicSelection = "Please select Demographic(s) to proceed.";
customMessages.MobileViewLandscape = "This website is only viewable in landscape mode.";
customMessages.UserAddedSuccessfully = "User added successfully";
customMessages.UserAlreadyExist = "User Already Exist";
customMessages.FindOpportunitySelection = "Please select Find Opportunity For to proceed.";
customMessages.ChannelRetailerSelection = "Please select Channel(s)/Retailer(s) to proceed.";
customMessages.CategoryItemManufacturerSelection = "Please select Category/Item Manufacturer(s) to proceed.";
customMessages.Dimension1Selection = "Please select Dimension 1 to proceed."
customMessages.Dimension2Selection = "Please select Dimension 2 to proceed."
customMessages.ConsecutiveTimePeriodSelection = "Please select consecutive Time Periods. For example: You can select Q1 2019 and Q2 2019 at a time. However Q1 2019 and Q3 2019 at same time is not allowed."
customMessages.ReportSelection = "Please select Report to proceed.";
customMessages.PerformanceCategorySelection = "Please select Category to proceed.";
customMessages.CustomFilterTimeperiodUpdate = "Dashboard can not be updated as Custom Filter is not created in Additional filter for one/more widget.";
customMessages.MarketSelectionPopup = "Data not available for activities,purchase,shopper mission.";
customMessages.YoYSelection = "Please select atleast one YoY time period to proceed.";
customMessages.MoreTimePeriodSelection = "Occasion Trend Report will be disabled as more than 8 time periods are selected at a time.";
customMessages.ReportCategorySelection = "Please select Category to proceed.";
/*custome messages end*/

/*all services calls start*/
var services = function () { };

/*login*/
services.UserCheck = webCall + "/Login/UserCheck"
/*session check*/
services.SessionCheck = webCall + "/Common/GetLoginUrl"

/*load left panel data*/
services.LoadLeftPanel = webCall + "/Common/LoadLeftPanel";
services.LoadLeftPanelCrossTab = webCall + "/Common/LoadLeftPanelCrossTab";
services.LoadLeftPanelCorrespondenceMap = webCall + "/Common/LoadLeftPanelCorrespondenceMap";
services.LoadLeftPanelSnapshot = webCall + "/Common/LoadLeftPanelSnapshot";
services.LoadLeftPanelDashboard = webCall + "/Common/LoadLeftPanelDashboard";
services.LoadLeftPanelStrategicPostures = webCall + "/Common/LoadLeftPanelStrategicPostures";
services.LoadLeftPanelReportGenerator = webCall + "/Common/LoadLeftPanelReportGenerator";
services.LoadDashboard = webCall + "/Common/LoadDashboard";
services.LoadUserManagementData = webCall + "/Common/LoadUserManagementData";
services.SearchUser = webCall + "/Common/SearchUsers";
services.LoadLeftPanelPerformanceDashboard = webCall + "/Common/LoadLeftPanelPerformanceDashboard";


/*Forgot Password*/
services.ForgotPassword = webCall + "/Login/ForgotPassword"
/*all services calls end*/
/*Metrics sorting*/
services.JsonMetricSort = webCall + "/Scripts/Common/MetricsSortBy.json"

/*navigations start*/
var navigation = function () { };
navigation.LandingView = webCall + "/Home/Landing"
/*navigations end*/

services.SessionCheckDynamic = webCall + "/Common/SessionCheck"

services.GetStickySelection = webCall + "/Common/GetStickySelection"

services.CustomFilter = webCall + "/Common/Save_Custom_Filter"
services.LoadCustomList = webCall + "/Common/LoadCustomList"
services.CustomGroup = webCall + "/Common/Save_Custom_Group"
services.DeleteCustomGroup = webCall + "/Common/DeleteCustomGroup"
//To update password
services.UpdatePass = webCall + "/Home/UpdatePass";

/*set settings for landing page start*/
function showSettings() {
    if ($('.settingDropdown').is(':visible'))
        $('.settingDropdown').hide();
    else
        $('.settingDropdown').show();
}
/*set settings for landing page end*/

/*CrossTab start*/
services.GetCrossTabData = webCall + "/CrossTab/GetCrossTabData";
services.CrossTabExportToExcel = webCall + "/CrossTab/CrossTabExportToExcel";
services.GetChartData = webCall + "/CrossTab/GetChartData";
services.CrossTabExportToPPT = webCall + "/CrossTab/CrossTabExportToPPT";
services.CrosstabExport = webCall + "/CrossTab/CrosstabExport";
/*CrossTab end*/

/*Snapshot start*/
services.GetSnapshotData = webCall + "/Snapshot/GetSnapShotDataWidget";
services.GetSnapshotWidgetData = webCall + "/Snapshot/GetSnapshotData";
services.SnapshotExportToExcel = webCall + "/Snapshot/SnapshotExportToExcel";
services.SnapshotExportToPPT = webCall + "/Snapshot/SnapshotExportToPpt";
services.SaveImageSnapshot = webCall + "/Snapshot/SaveImage";
services.GetSnapshotDataDashboard = webCall + "/Snapshot/GetSnapshotDataDashboard";
/*Snapshot end*/

/*User Managaement start*/
services.UserManagementExport = webCall + "/UserManagement/UserManagementExport"
services.UserManagementGetData = webCall + "/UserManagement/GetUserData"
services.UpdateLastActivity = webCall + "/UserManagement/UpdateLastActivity"
/*User Managaement end*/

/*Dashboard start*/
services.DashboardExportToPPT = webCall + "/Dashboard/DashboardExportToPpt";
services.AddToDashboard = webCall + "/Dashboard/AddToDashboard";
services.UpdateDashboard = webCall + "/Dashboard/UpdateDashboard";
services.DeleteDashboard = webCall + "/Dashboard/DeleteDashboard";
services.SaveAsDashboard = webCall + "/Dashboard/SaveAsDashboard";
services.ShareDashboard = webCall + "/Dashboard/ShareDashboard";
services.GetAllDashboards = webCall + "/Common/GetAllDashboards";
/*Dashboard end*/

/*User Management start*/
services.AddUser = webCall + "/UserManagement/AddUser";
services.DeleteUser = webCall + "/UserManagement/DeleteUser";
services.EditUser = webCall + "/UserManagement/EditUser";
services.AddGroup = webCall + "/UserManagement/AddGroup";
services.EditGroup = webCall + "/UserManagement/EditGroup";
services.DeleteGroup = webCall + "/UserManagement/DeleteGroup";
services.HardDeleteUser = webCall + "/UserManagement/HardDeleteUser";
/*User Management end*/

/*Report Generator start*/
services.DownloadReport = webCall + "/ReportGenerator/DownloadReport";
services.LoadAttributeForOccasion = webCall + "/ReportGenerator/GetAttributeList";
/*Report Generator end*/

/*Occasion Stragic Postures start*/
services.GetOSPData = webCall + "/AdvancedAnalytics/GetOspData";
services.GetOSPCellData = webCall + "/AdvancedAnalytics/GetOspCellData";
services.OSPExportPPT = webCall + "/AdvancedAnalytics/GetOspExportPpt";
services.GetOSPExportExcel = webCall + "/AdvancedAnalytics/GetOspExportExcel";
/*Occasion Stragic Postures end*/

/*Correspondence Map start */
services.GetCMData = webCall + "/AdvancedAnalytics/GetCMData";
services.CMExportPPT = webCall + "/AdvancedAnalytics/GetCMExportPpt";
/*Correspondence Map end*/

/*Performance Dashboard start*/
services.GetPDashboardData = webCall + "/PerformanceDashboard/GetPDashboardData";
services.ExportPD = webCall + "/PerformanceDashboard/ExportPD";

/*Performance Dashboard start*/

services.DownloadFile = "/Common/DownloadFile?path=";
services.DownloadUserGuide = "/Common/DownloadUserGuide";
services.DownloadVideo = "/Common/DownloadVideo";

var searchSelectAllList = [
{ "DisplayName": "Time Period", "Search": 0, "Select All": 0 },
{ "DisplayName": "Market", "Search": 0, "Select All": 1 },
{ "DisplayName": "Category", "Search": 1, "Select All": 1 },
{ "DisplayName": "Item", "Search": 1, "Select All": 1 },
{ "DisplayName": "Brand", "Search": 1, "Select All": 1 },
{ "DisplayName": "Occasion", "Search": 0, "Select All": 1 },
{ "DisplayName": "Timing of ocassion", "Search": 1, "Select All": 1 },
{ "DisplayName": "Daypart", "Search": 0, "Select All": 1 },
{ "DisplayName": "Day of Week (Detailed)", "Search": 0, "Select All": 1 },
{ "DisplayName": "Where (Detailed)", "Search": 0, "Select All": 1 },
{ "DisplayName": "Motivation (Ocassion)", "Search": 0, "Select All": 1 },
{ "DisplayName": "Motivation (Detailed)", "Search": 0, "Select All": 1 },
{ "DisplayName": "Who With", "Search": 0, "Select All": 1 },
{ "DisplayName": "Type of consumption", "Search": 0, "Select All": 1 },
{ "DisplayName": "Purchaser", "Search": 0, "Select All": 1 },
{ "DisplayName": "Channel", "Search": 1, "Select All": 1 },
{ "DisplayName": "Retailer", "Search": 1, "Select All": 1 },
{ "DisplayName": "Package Type", "Search": 0, "Select All": 0 },
{ "DisplayName": "Activities", "Search": 1, "Select All": 1 },
{ "DisplayName": "Gender", "Search": 0, "Select All": 0 },
{ "DisplayName": "Age", "Search": 0, "Select All": 1 },
{ "DisplayName": "Ethnicity", "Search": 0, "Select All": 1 },
{ "DisplayName": "Background", "Search": 0, "Select All": 1 },
{ "DisplayName": "Income", "Search": 0, "Select All": 1 },
{ "DisplayName": "SEL", "Search": 0, "Select All": 1 },
{ "DisplayName": "Household Size", "Search": 0, "Select All": 1 },
{ "DisplayName": "Shopping Involvement", "Search": 0, "Select All": 1 },
{ "DisplayName": "Marital Status", "Search": 0, "Select All": 1 },
{ "DisplayName": "Education", "Search": 0, "Select All": 1 },
{ "DisplayName": "Employment Status", "Search": 0, "Select All": 1 },
{ "DisplayName": "Residence Location", "Search": 1, "Select All": 1 },
{ "DisplayName": "Column", "Search": 1, "Select All": 1 },
{ "DisplayName": "Row", "Search": 1, "Select All": 1 },
{ "DisplayName": "Row Nesting", "Search": 1, "Select All": 1 },
{ "DisplayName": "5Ws", "Search": 1, "Select All": 0 },
{ "DisplayName": "Demographics", "Search": 1, "Select All": 0 },
{ "DisplayName": "Category-Manufacturer", "Search": 1, "Select All": 0 },
{ "DisplayName": "Item-Manufacturer", "Search": 1, "Select All": 0 },
{ "DisplayName": "Survey Category-Manufacturer", "Search": 1, "Select All": 0 },
{ "DisplayName": "Survey Item-Manufacturer", "Search": 1, "Select All": 0 },
{ "DisplayName": "Custom Category-Manufacturer", "Search": 1, "Select All": 0 },
{ "DisplayName": "Custom Item-Manufacturer", "Search": 1, "Select All": 0 },
{ "DisplayName": "Survey Category", "Search": 1, "Select All": 1 },
{ "DisplayName": "Survey Item", "Search": 1, "Select All": 1 },
{ "DisplayName": "Survey Brand", "Search": 1, "Select All": 1 },
{ "DisplayName": "Custom Category", "Search": 1, "Select All": 1 },
{ "DisplayName": "Custom Item", "Search": 1, "Select All": 1 },
{ "DisplayName": "Custom Brand", "Search": 1, "Select All": 1 },
{ "DisplayName": "Survey Channel", "Search": 1, "Select All": 1 },
{ "DisplayName": "Online Channel", "Search": 1, "Select All": 1 },
{ "DisplayName": "Custom Channel", "Search": 1, "Select All": 1 },
{ "DisplayName": "Retailer Nets", "Search": 1, "Select All": 1 },
]