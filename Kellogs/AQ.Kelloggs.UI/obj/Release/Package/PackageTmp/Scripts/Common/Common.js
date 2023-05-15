var DashboardMaster = "", CustomFilterMaster = [], CustomGroupMaster = "", MarketTimeperiodList = [];
var selectedModuleId = window.location.href.split('=').length > 1 ? window.location.href.split('=')[1] : "";
var accessList = [{ "Module": "All Modules", "id": 1, "Name": "All Modules" }, { "Module": "Snapshot", "id": 2, "Name": "Occasion Profile" }, { "Module": "Crosstab", "id": 3, "Name": "Visual Crosstab" }, { "Module": "Occasion Strategic Postures", "id": 4, "Name": "Occasion Strategic Postures" }, { "Module": "Correspondence Maps", "id": 5, "Name": "Correspondence Maps" }, { "Module": "My Dashboard", "id": 6, "Name": "My Dashboard" }, { "Module": "Report Generator", "id": 7, "Name": "Report Generator" }, { "Module": "Performance Dashboard", "id": 9, "Name": "Performance Dashboard" }]
var selectAllList = ["SELECT ALL ITEMS", "SELECT ALL BRANDS", "SELECT ALL RETAILERS", "SELECT ALL DAYS", "SELECT ALL (DETAILED)", "SELECT ALL DETAILED MOTIVATIONS", "SELECT ALL DETAILED ACTIVITIES", "SELECT ALL ONLINE RETAILERS", "SELECT ALL SURVEY RETAILERS", "SELECT ALL CUSTOM RETAILERS", "SELECT ALL CUSTOM ITEMS", "SELECT ALL CUSTOM BRANDS", "SELECT ALL YES", "SELECT ALL NO"];
var catList = ["Category", "Item", "Brand", "Category-Manufacturer", "Item-Manufacturer"];

var exceptionMetricList = [{ "DisplayName": "Home", "MetricParentName": "Where/Location", "Filter": "Where/Location" },
{ "DisplayName": "Away from Home", "MetricParentName": "Where/Location", "Filter": "Where/Location" },
{ "DisplayName": "Home", "MetricParentName": "Where", "Filter": "Where/Location" },
{ "DisplayName": "Away from Home", "MetricParentName": "Where", "Filter": "Where/Location" },
{ "DisplayName": "Alone", "MetricParentName": "Who With", "Filter": "Who With" },
{ "DisplayName": "With Family", "MetricParentName": "Who With", "Filter": "Who With" },
{ "DisplayName": "With Others", "MetricParentName": "Who With", "Filter": "Who With" },
{ "DisplayName": "Self", "MetricParentName": "Who Purchased", "Filter": "Purchase" },
{ "DisplayName": "Other", "MetricParentName": "Who Purchased", "Filter": "Purchase" }];
var customTitle = [{ "DisplayName": "HEALTHY REPLENISHMENT", "Title": "To buy a nutritious and healthy food with a specific health benefit or ingredient that I always like to have in stock at home" },
{ "DisplayName": "ROUTINE REPLENISHMENT", "Title": "To buy food that I always like to have in stock at home" },
{ "DisplayName": "GRAB & GO", "Title": "To buy food right away, while on the go" },
{ "DisplayName": "FAMILY ENJOYMENT", "Title": "To buy food that the whole family would eat. A food that I know my kids will eat and I can share with others" },
{ "DisplayName": "SPONTANEOUS BUYING", "Title": "I hadn’t planned to buy this item when I started shopping but while shopping for other food saw something to try" },
{ "DisplayName": "SPONTANEOUS DEAL", "Title": "Saw this item on special offer / promotion and found such a good deal I decided to buy some" },
{ "DisplayName": "PLANNED DEAL", "Title": "To buy a product that I knew was on special offer/deal/sale" },
{ "DisplayName": "TREAT/REWARD FOR ME OR MY FAMILY", "Title": "To buy an item as a treat/ reward. Something that is indulgent and would cheer me/my family up" },
{ "DisplayName": "SPECIFIC ACTIVITY", "Title": "To buy an item that could be used for a specific activity (e.g., hike/biking, before/after/during exercise, etc.)" },
{ "DisplayName": "REGULAR MAJOR GROCERY TRIP", "Title": "Regular major grocery trip" },
{ "DisplayName": "QUICK RE-STOCK GROCERY TRIP", "Title": "Quick re-stock grocery trip" },
{ "DisplayName": "EMERGENCY ITEM PICK-UP", "Title": "Emergency item pick-up" },
{ "DisplayName": "SPECIAL OCCASION/ENTERTAINMENT SHOP", "Title": "Special occasion/entertainment shop" }];
var insufficientSample = 150, lowSample = 250;
var disableMultiMarket = [{ "DisplayName": "Ethinicity", "Market": "US" },
{ "DisplayName": "Background", "Market": "Australia" },
{ "DisplayName": "Income", "Market": "All" },
{ "DisplayName": "SEL", "Market": "Mexico" },
{ "DisplayName": "SEL", "Market": "Brazil" },
{ "DisplayName": "Residence Location", "Market": "All" },
{ "DisplayName": "Hispanic", "Market": "All" },
{ "DisplayName": "Birth Country", "Market": "All" },
{ "DisplayName": "Custom Income", "Market": "US" }];
var customRetailersAttributeIds = [17, 102];
var List5Ws = [];
var commonService = angular.module('commonFunctionality', ["$http"])
    .service('commonFunctionality', function ($http) {

        function show_popup(msg_content) {
            angular.element(document.getElementsByClassName("default-background")).addClass("show_element");
            angular.element(document.getElementsByClassName("custom-popup")).addClass("show_element");
            angular.element(".popup-container").html("<div class='middleAlign' title='" + msg_content + "'>" + msg_content + "</div>");
        }

        this.close_Custom_popup = function () {
            showBackgroundShadow(false, false);
        }

        this.updatePassword = function (crntPass, newPass, reNewPass, $scope) {
            //crntPass check

            //
            myEl = angular.element(document.querySelector('.changePwdInvalidPassText'));
            if (newPass != reNewPass) {
                $scope.newPwdstyl = {
                    "background-color": "coral",
                    "border-color": "red"
                }
                $scope.newPass = $scope.reNewPass = "";
                myEl.text('Passwords do not match');
                $scope.showInvalidPwdText = true;
            }//New passwords don't match
            else if (newPass.length < 8) {
                myEl.text("Password can't be less than 8 characters");
                $scope.newPwdstyl = {
                    "background-color": "coral",
                    "border-color": "red"
                }
                $scope.showInvalidPwdText = true;
                $scope.newPass = $scope.reNewPass = "";
            }//New passwords length less than 8
            else {
                var pass = { "crntPass": crntPass, "newPass": newPass }
                $.ajax({
                    url: services.UpdatePass,
                    data: JSON.stringify(pass),
                    method: "POST",
                    contentType: "application/json",
                    success: function (response) {
                        var d = response;//if -1 You enetered wrong password// if 0 password could not be changed //if 1 password successfully changed

                        if (d == -1) {
                            $scope.curPwdstyl = {
                                "background-color": "coral",
                                "border-color": "red"
                            }
                            myEl.text('Enter correct password');
                            $scope.showInvalidPwdText = true;
                            $scope.crntPass = "";
                            // angular.element("body").click();
                        }
                        else if (d == 0) {
                            myEl.text('Password could not be changed. Please try after some time.');
                            $scope.showInvalidPwdText = true;
                        }
                        else if (d == 1) {
                            //password successfully changed
                            show_popup("Password successfully changed.");
                            //closechangePwdBox();
                            angular.element(".changePwdCross").click();
                            $scope.crntPass = $scope.newPass = $scope.reNewPass = "";
                            showBackgroundShadow(true, false);
                        }
                    },
                    error: function () {
                        //Hide loader
                        $(".default-loader-icon, .default-background").hide();
                        show_popup(customMessages.Error);
                    }
                });
            }
        }

        /*show and hide background start*/
        function showBackgroundShadow(flag, showLoaderIcon) {
            if (flag || angular.element(".popup-container").is(":visible"))
                angular.element(document.getElementsByClassName("default-background")).addClass("show_element");
            else
                angular.element(document.getElementsByClassName("default-background")).removeClass("show_element");

            if (showLoaderIcon)
                angular.element(document.getElementsByClassName("default-loader-icon")).addClass("show_element");
            else
                angular.element(document.getElementsByClassName("default-loader-icon")).removeClass("show_element");

        }
        /*show and hide background end*/
    });

if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        }
    });
}

$(document).ready(function () {
    $(".ddIcon span").addClass("ddIconSpan");
    $(".excelDiv").hover(function () {
        $(this).find(".ddIcon span").removeClass("ddExclIconSpan").addClass("exclIconHover ddIconHover");
    },
        function () {
            $(this).find(".ddIcon span").removeClass("exclIconHover ddIconHover").addClass("ddExclIconSpan");
        });


    $(".pptDiv").hover(function () {
        $(this).find(".ddIcon span").removeClass("ddPptIconSpan").addClass("pptIconHover ddIconHover");
    },
        function () {
            $(this).find(".ddIcon span").removeClass("pptIconHover ddIconHover").addClass("ddPptIconSpan");
        });

    $(".logoutDiv").hover(function () {
        $(this).find(".ddIcon span").removeClass("ddLogoutIconSpan").addClass("logoutIconHover ddIconHover");
    },
        function () {
            $(this).find(".ddIcon span").removeClass("logoutIconHover ddIconHover").addClass("ddLogoutIconSpan");
        });

    /*hide all tabing clicks start*/
    $(".view-container").hover(function () {
        angular.element(".dashboard-submenu,.quickchart-submenu,.reporting-submenu, .customDataTables-submenu").hide();
        //try { clear_select_menutabs(defaultTabName); } catch (ex) { }
    });
    /*hide all tabing clicks end*/

    //$.ajax({
    //    url: services.UpdateLastActivity,
    //    data: '{"userId": "' + sessionStorage.getItem("Username") + '"}',
    //    method: callsType.Post,
    //    contentType: "application/json",
    //    //processData: false,
    //    success: function (response) {
    //
    //    },
    //    error: function (xhr, status, error) {
    //        show_popup("Alert", customMessages.Error);
    //        return false;
    //    }
    //});
    setInterval(SessionCheck, 60 * 60000); // 60 minutes
    function SessionCheck() {
        $.ajax({
            async: true,
            type: callsType.Post,
            url: services.SessionCheckDynamic,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            success: function (response) {
                if (!response) {
                    window.location = "/Common/Index";
                    return false;
                }
            },
            error: function (xhr, status, error) {
                window.location = "/Common/Index";
                return false;
            }
        });
    }
});

$(document).on('focus', 'input', function () {
    $(document.activeElement)[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
});

function clear_select_menutabs(title) {
    angular.element(".menu-selections").find(".border-align").removeClass("border-align-selected");
    angular.element(".menu-selections").find(".menuName").removeClass("menuName-selected");
    angular.element(".menu-selections[title='" + title + "']").find(".border-align").addClass("border-align-selected");
    angular.element(".menu-selections[title='" + title + "']").find(".menuName").addClass("menuName-selected");
}

function loadCommonFunctionalities($scope, commonService, $http) {
    angular.element(document.getElementsByClassName("view-container")).css("min-height", angular.element(document.getElementsByClassName("view-container")).height());
    angular.element(document.getElementById("parentBody")).css("min-height", angular.element(document.getElementById("parentBody")).height());


    $scope.checkUserAccess = function (moduleId, name) {
        let modules = sessionStorage.getItem("Modules");
        if (name == "Advanced Analytics" && modules != "1") {
            if (modules.indexOf("5") == -1 && modules.indexOf("4") == -1)
                return false;
            else
                return true;
        }
        else if (modules == "1" || modules.indexOf(moduleId) > -1)
            return true;
        return false;
    }

    $scope.IsOptionsHidden = true;
    /*custom popUp handler objet (even for translucent div)*/
    $scope.customPopup = {
        visible: false
    };

    $scope.showOptions = function () {
        $scope.IsOptionsHidden = !$scope.IsOptionsHidden;
        if (!$scope.IsOptionsHidden) {
            angular.element(event.currentTarget).addClass("active");
        }
        else {
            angular.element(event.currentTarget).removeClass("active");
        }

    }

    $scope.showSetting = function ($event) {
        let initialValue = $scope.showSettings;
        closeAllPopups($event, $scope);
        if (initialValue == false)
            $scope.showSettings = true;
        else
            $scope.showSettings = false;
    }

    $scope.leftPanelToggle = function () {
        $scope.leftMenuIsHidden = !$scope.leftMenuIsHidden;
        $scope.ModuleIsHidden = true;
        //$scope.showSettings = false;
        var elemtn = document.getElementById("left_panel_click_element");
        if ($scope.leftMenuIsHidden) {
            angular.element(elemtn).removeClass("showing_leftpanel");
            angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "block");
            angular.element(document.querySelectorAll(".calloutArrow")).css("display", "block");
            if (angular.element(".output-container").is(":visible")) {
                angular.element(document.getElementsByClassName("footerContent")).show();
                angular.element(document.getElementsByClassName("footerNote")).hide();
                angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
                angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            }
            else if (angular.element(".drilldown-container").is(":visible")) {
                angular.element(document.getElementsByClassName("innerFooterContent")).show();
                angular.element(document.getElementsByClassName("footerNote")).hide();
                angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
                angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            }
            else {
                angular.element(document.getElementsByClassName("footerContent")).hide();
                angular.element(document.getElementsByClassName("innerFooterContent")).hide();
                angular.element(document.getElementsByClassName("footerNote")).show();
            }
        }
        else {
            angular.element(elemtn).addClass("showing_leftpanel");
            angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
            angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            angular.element(document.getElementsByClassName("footerNote")).show();
            angular.element(document.getElementsByClassName("footerContent")).hide();
            angular.element(document.getElementsByClassName("innerFooterContent")).hide();
        }


        angular.element(document.querySelectorAll(".summaryPopup")).css("display", "none");
        angular.element(document.querySelectorAll(".summary-view-click")).removeClass("summaryPopup_selected");
        if ($scope.LeftStaticMenu != undefined && $scope.LeftStaticMenu.length > 0) {
            var List = $scope.LeftStaticMenu.where(function (e) { return e.hasChild });
            List.where(function (e) { return e.hasSubMenusActive = false });
            List.where(function (e) { return e.isTabSelected = false });
            angular.forEach(List, function (a, b) {
                applyToChild(a, ["isTabSelected"], false);
            })
        }
    }

    $scope.ModulePanelToggle = function () {
        $scope.ModuleIsHidden = !$scope.ModuleIsHidden;
        $scope.leftMenuIsHidden = true;
        //$scope.showSettings = false;
        var elemtn = document.getElementById("left_panel_click_element");
        angular.element(elemtn).removeClass("showing_leftpanel");

        if ($scope.leftMenuIsHidden) {
            angular.element(elemtn).removeClass("showing_leftpanel");
            angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "block");
            angular.element(document.querySelectorAll(".calloutArrow")).css("display", "block");
            if (angular.element(".output-container").is(":visible")) {
                angular.element(document.getElementsByClassName("footerContent")).show();
                angular.element(document.getElementsByClassName("footerNote")).hide();
                angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
                angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            }
            else if (angular.element(".drilldown-container").is(":visible")) {
                angular.element(document.getElementsByClassName("innerFooterContent")).show();
                angular.element(document.getElementsByClassName("footerNote")).hide();
                angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
                angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            }
            else {
                angular.element(document.getElementsByClassName("footerContent")).hide();
                angular.element(document.getElementsByClassName("innerFooterContent")).hide();
                angular.element(document.getElementsByClassName("footerNote")).show();
            }
        }
        else {
            angular.element(elemtn).addClass("showing_leftpanel");
            angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
            angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            angular.element(document.getElementsByClassName("footerNote")).show();
            angular.element(document.getElementsByClassName("footerContent")).hide();
            angular.element(document.getElementsByClassName("innerFooterContent")).hide();
        }

        angular.element(document.querySelectorAll(".summaryPopup")).css("display", "none");
        angular.element(document.querySelectorAll(".summary-view-click")).removeClass("summaryPopup_selected");

    }

    $scope.loadModule = function ($event, path) {
        angular.element(event.currentTarget.parentElement).find(".moduleLevel").removeClass("active");
        if (!$scope.IsOptionsHidden)
            $scope.IsOptionsHidden = !$scope.IsOptionsHidden;
        angular.element(event.currentTarget).addClass("active");
        window.location.href = path;
    }

    // focus on input box in change password
    $scope.inputBox = function () {
        $scope.newPwdstyl = $scope.curPwdstyl = {
            "background-color": "#DDDDDD",
            "border-color": "grey"
        }
        $scope.showInvalidPwdText = false;
    }

    $scope.showchangePwd = function () {
        showBackgroundShadow(true, false);
        $scope.showchangePwdBox = true;
        $scope.showSettings = false;
    }

    // close button click
    $scope.closechangePwdBox = function () {
        $scope.showchangePwdBox = false;
        $scope.crntPass = $scope.newPass = $scope.reNewPass = "";
        $scope.newPwdstyl = $scope.curPwdstyl = {
            "background-color": "#DDDDDD",
            "border-color": "grey"
        }
        $scope.showInvalidPwdText = false;
        showBackgroundShadow(false, false);
    }

    $scope.close_Custom_popup = function () {
        $scope.customPopup['visible'] = false;
        $(".custom-popup:visible").css({ "width": "35%", "height": "auto" });
        $(".custom-popup:visible .popup-container").css({ "overflow-y": "auto" });
        angular.element(".widgetchart .popup-header #custom_message .widgetIconDiv").remove();
        $(".custom-popup:visible .popup-container,.custom-popup:visible").removeClass("widgetchart");
        commonService.close_popup();
        angular.element(document.getElementById("nsample-size")).removeClass("nsample-size_selected");
        angular.element(document.getElementsByClassName("userguide-popup")).removeClass("show_element");
        angular.element(".custom-popup > .nicescroll-rails").remove();
        try {
            if (arguments.callee.caller == null && arguments.callee.caller.name != "close_Dashboard_popup")
                close_Dashboard_popup();
        }
        catch (ex) {
            let stack = ex.stack || '';
            if (stack != '' && stack.indexOf("close_Dashboard_popup") == -1)
                close_Dashboard_popup();
        }
    }

    $scope.showAllSummary = function () {
        if (!$scope.leftMenuIsHidden)
            $scope.leftPanelToggle();
        if (!$scope.ModuleIsHidden)
            $scope.ModulePanelToggle();

        if (selectedItems.length == 0)
            return;

        var displayType = angular.element(document.querySelectorAll(".summaryPopup")).css("display");
        if (displayType == "none" || displayType == "") {
            angular.element(document.querySelectorAll(".pop_selection_summ")).html(angular.element(document.querySelectorAll(".summay-content-text > div")).html());
            angular.element(document.querySelectorAll(".summaryPopup")).css("display", "block");
            angular.element(document.querySelectorAll(".summary-view-click")).addClass("summaryPopup_selected");
        }
        else {
            angular.element(document.querySelectorAll(".summaryPopup")).css("display", "none");
            angular.element(document.querySelectorAll(".summary-view-click")).removeClass("summaryPopup_selected");
        }
        SetScroll(angular.element(".summaryPopup"), "#D31245", 0, 0, 0, 0, 3, false);
    }

    //submit click change password
    $scope.changePassword = function (crntPass, newPass, reNewPass) {
        commonService.updatePassword(crntPass, newPass, reNewPass, $scope);

    }

    $scope.downloadUserGuide = function (flag, name) {
        myFunction1();
        var url = window.location.href.split("/");
        if (url[3] == "UserManagement") {
            downloadGuide(8, "");
        }
        else {
            let accessCode = sessionStorage.getItem("Modules").split(",");
            let all = ["All Modules", "Occasion Profile", "Performance Dashboard", "Visual Crosstab", "Occasion Strategic Postures", "Correspondence Maps", "My Dashboard", "Report Generator"];
            let moduleList = accessList.filter(function (e) { return accessCode.indexOf(e.id.toString()) > -1 }).select("Name");
            var accessibleModuleList = ["All Modules"].concat(moduleList);
            if (moduleList.indexOf("All Modules") > -1)
                accessibleModuleList = all;
            var disableList = $(all).not(accessibleModuleList).get();
            var popupHtml = "";
            show_popup("Download User Guide", '');
            all.forEach(function (a, b) {
                let flag = accessList.filter(function (e) { return e.Name == a })[0].id;
                popupHtml += '<div class="downloadOption ' + (disableList.indexOf(a) > -1 ? "disableSelection" : "") + '" title="' + a + '" style="' + (b == 0 ? 'width:100%' : '') + '">' +
                    '<div class="middleAlign" style="position:absolute;"><div class="moduleGuide" onclick="downloadGuide(' + flag + ')" style="' + (a == "All Modules" || a == "Performance Dashboard" ? 'width:100%' : '') + '">' + a + "</div>" + (a != "All Modules" && a != "Performance Dashboard" ? '<div class="playButton border" title="Training Video - ' + a + '" onclick="openAdPopup(' + flag + ')"><div>' : '') + '</div></div>' + '</div>' +
                    '</div>';
            })
            $(".popup-container").html(popupHtml);
            $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
            $(".custom-popup:visible .popup-container").css({ "height": ($(".custom-popup:visible").height() / document.documentElement.clientWidth) * 100 + "vw", "max-height": ($(".custom-popup:visible").height() / document.documentElement.clientWidth) * 100 + "vw" });
            angular.element(document.getElementsByClassName('downloadOption')).parent().css({ "overflow-y": "hidden" });
        }
    };

    $scope.loadDashboard = function (requestObj, msg, scope) {
        let dashboardid = 0;
        DashboardMaster = "";
        $http({
            method: callsType.Post,
            url: services.LoadDashboard,
            async: true,
            data: "{'userId': '" + sessionStorage.getItem("Username") + "','flag': " + (selectedModuleId == 6 ? 1 : 0) + "}",
        }).then(function successCallback(response) {
            DashboardMaster = response.data[0];
            if (selectedModuleId == 6) {
                scope.DashboardMaster = DashboardMaster.filter(function (e) {
                    return e.RequestObj != "" && e.RequestObj != null
                });
                DashboardMaster = scope.DashboardMaster;
                if (DashboardMaster.filter(function (e) { return e.DashBoardTypeId == requestObj.DashBoardTypeId }).length > 0) {
                    scope.showDashboardList(requestObj.DashBoardTypeId, requestObj, 1);
                    dashboardid = DashboardMaster.filter(function (e) { return e.DashBoardTypeId == requestObj.DashBoardTypeId })[0].DashBoardID;
                    if (DashboardMaster.filter(function (e) { return e.DashBoardID == requestObj.DashBoardID }).length > 0) {
                        dashboardid = requestObj.DashBoardID;
                    }
                }
                else {
                    scope.WidgetList = [];
                    scope.DashboardWidgetList = [];
                    scope.DashboardsNameList = [];
                }
                setTimeout(function () {
                    scope.$apply();
                    showBackgroundShadow(false, false);
                    if (DashboardMaster.filter(function (e) { return e.DashBoardTypeId == requestObj.DashBoardTypeId && e.DashBoardID == dashboardid }).length > 0)
                        scope.selectDashboard(DashboardMaster.filter(function (e) { return e.DashBoardTypeId == requestObj.DashBoardTypeId && e.DashBoardID == dashboardid })[0]);
                    if (msg != undefined)
                        show_popup("Alert", msg);
                })
                angular.element(".selectAllSlides .selectAllSlideIcon").removeClass("active");
                angular.element(document.getElementsByClassName("overlay")).hide();
                close_Dashboard_popup();

            }
        }, function (data) {
        });
    }

    $scope.loadCustomFilters = function (msg) {
        $http({
            method: callsType.Post,
            url: services.LoadCustomList,
            async: true,
            data: "{'userId': '" + sessionStorage.getItem("Username") + "' ,'flag': 0 }",
        }).then(function successCallback(response) {
            CustomFilterMaster = response.data[0];
            if (selectedModuleId != "7" && selectedModuleId != "6")
                setTimeout(function () {
                    defaultSelections(selectedModuleId);
                })
            if (msg != undefined) {
                show_popup("Alert", msg);
                if (selectedModuleId == "7" || selectedModuleId == "6")
                    showBackgroundShadow(false, false);
            }
        }, function (data) {
        });
    }

    $scope.loadCustomGroup = function (msg) {
        CustomGroupMaster = "";
        $http({
            method: callsType.Post,
            url: services.LoadCustomList,
            async: true,
            data: "{'userId': '" + sessionStorage.getItem("Username") + "','flag': 1 }",
        }).then(function successCallback(response) {
            CustomGroupMaster = response.data[0];
            if (msg != undefined) {
                show_popup("Alert", msg);
                showBackgroundShadow(false, false);
            }
        }, function (data) {
        });
    }
    $scope.loadMarketTimeperiodData = function () {
        $http({
            method: callsType.Post,
            url: services.LoadLeftPanel,
            data: { "moduleId": "50" },
            async: true
        }).then(function successCallback(response) {
            MarketTimeperiodList = response.data[0];
        }, function (data) {
        });
    }
    if (selectedModuleId != undefined && selectedModuleId != "" && selectedModuleId != "8") {
        if (selectedModuleId != "9") {
            $scope.loadCustomFilters();
            $scope.loadCustomGroup();
            if (selectedModuleId != "6")
                $scope.loadMarketTimeperiodData();
        }
        if (selectedModuleId != "7" && selectedModuleId != "6" && selectedModuleId != "4" && selectedModuleId != "5") {
            setTimeout(function () {
                $scope.loadDashboard();
            }, selectedModuleId == 9 ? 2000 : 100)
        }
    }


    $scope.create_Group = function (menusList, parent_list) {
        let curscope = angular.element("#left-pane-container").scope();
        menusList = JSON.parse(unescape(menusList));
        parent_list = JSON.parse(unescape(parent_list));
        showBackgroundShadow(true, true);
        let gName = angular.element("input.createGroupName").val();
        if (gName == "" || gName.length < 3 || gName.match(/^[A-Za-z][ 0-9A-Za-z_-][ 0-9A-Za-z_-]+$/) == null) {
            show_alert_popup("ALERT", "Please enter valid custom group name. Custom group name must contain atleast 3 characters and cannot special character apart from '_', '-', Space ' '.");
            showBackgroundShadow(false, false);
            return false;
        }
        let pName = curscope.getPFilterName(parent_list);
        let isRetailer = 0;
        if (pName.indexOf(" Retailer") > -1)
            isRetailer = 1;
        let selections = selectedItems.filter(function (e) { return (!menusList.isDefaultLevel && (e.DisplayName.toUpperCase() == menusList.Filter.toUpperCase() || e.DisplayName.toUpperCase() == parent_list[0].DisplayName.toUpperCase())) || (menusList.isDefaultLevel && e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase()) });
        if (selections.length > 0 && ["Column", "Row Nesting", "Row"].indexOf(menusList.DisplayName) > -1)
            selections = selections[0].Data.filter(function (e) { return e.DisplayName == menusList.DisplayName });
        let curScope = angular.element("#left-pane-container").scope();
        let adnList = curScope.getPKsAndName(selections, []);
        if (parent_list[0].DisplayName.toUpperCase() == "5WS" || (parent_list.length > 1 && parent_list[1].DisplayName.toUpperCase() == "5WS")) {
            if (isRetailer && menusList.DisplayName.indexOf("Custom") > -1) {
                let CRlist = [];
                angular.forEach(menusList.data.filter(function (e) { return curScope.hasChildSelected(e) }), function (a, b) {
                    CRlist = CRlist.concat(angular.copy(a.data.filter(function (e) { return e.hasChildSelected && e.DisplayName.indexOf("Select All") == -1 })));
                    angular.forEach(a.data.filter(function (e) { return !e.hasChildSelected && e.hasSubMenusActive }), function (c, d) {
                        CRlist = CRlist.concat(angular.copy(c.data.filter(function (e) { return e.hasChildSelected && e.DisplayName.indexOf("Select All") == -1 })));
                    })
                })
                adnList = adnList.filter(function (e) { return CRlist.select("DisplayName").indexOf(e.DisplayName) > -1 });
            }
            else if (isRetailer || adnList.filter(function (e) { return e.Parent.toUpperCase() == menusList.DisplayName.toUpperCase() }).length == 0) {
                adnList = adnList.filter(function (e) { return menusList.data.filter(function (e) { return !e.isDisabled }).select("DisplayName").map(function (e) { return e.toUpperCase() }).indexOf(e.Parent.toUpperCase()) > -1 })
            }
            else {
                adnList = adnList.filter(function (e) { return e.Parent.toUpperCase() == menusList.DisplayName.toUpperCase() || e.Parent.indexOf("Custom Group") > -1 });
            }
        }
        let request = {};
        request.Filter = pName;
        request.GroupId = "g" + (CustomGroupMaster.length == 0 ? 1 : (CustomGroupMaster.select("GroupId").map(function (e) { return parseInt(e.replace("g", "")) }).reduce(function (a, b) { return Math.max(a, b) }) + 1));
        request.GroupName = gName;
        request.FilterID = adnList.select("FilterID").join(",");
        request.SelectionSummary = adnList.select("DisplayName").join(",");

        if (request.Filter.indexOf("Item-Manufacturer") > -1) {
            request.Parent = selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data.filter(function (e) { return e.DisplayName == parent_list[parent_list.length - 1].DisplayName })[0].Data.select("DisplayName").join('##');
            request.ParentFilterIDs = selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data.filter(function (e) { return e.DisplayName == parent_list[parent_list.length - 1].DisplayName })[0].Data.select("FilterID").join('##')
        }
        else if ((request.Filter.indexOf("Category") > -1 && request.Filter != "Category-Manufacturer") || request.Filter.toUpperCase().indexOf("CHANNEL") > -1 && request.Filter.toUpperCase().indexOf("RETAILER") == -1) {
            request.Parent = adnList.select("DisplayName").join('##');
            request.ParentFilterIDs = adnList.select("FilterID").join('##');
        }
        else if (request.Filter.toUpperCase() == "DEMOGRAPHICS") {
            request.Parent = selections[0].Data.select("DisplayName").join('##');
            request.ParentFilterIDs = selections[0].Data.select("FilterID").join('##');
        }
        else {
            request.Parent = adnList.select("Parent").join('##');
            request.ParentFilterIDs = adnList.select("parentPK").join('##');
        }
        request.CountryId = angular.element("#left-pane-container").scope().returnCountryIds().join(",");
        if (CustomGroupMaster.filter(function (e) { return e.GroupName.toUpperCase() == gName.toUpperCase() }).length > 0) {
            show_alert_popup("ALERT", "Custom Group with same name already exists.");
            showBackgroundShadow(false, false);
            return false;
        }
        if (CustomGroupMaster.filter(function (e) { return replaceWithDouble_SingleCharacters(e.SelectionSummary).toUpperCase() == replaceWithDouble_SingleCharacters(request.SelectionSummary.toUpperCase()) }).length > 0) {
            show_alert_popup("ALERT", "Custom Group with selected item/metric(s) already exists.");
            showBackgroundShadow(false, false);
            return false;
        }
        let dispName = "Custom Group";
        if (menusList.DisplayName.toUpperCase().indexOf("CHANNEL") > -1 || menusList.DisplayName.toUpperCase().indexOf("RETAILER") > -1) {
            dispName = "Custom Group Channel";
        }

        $.ajax({
            type: "POST",
            url: services.CustomGroup,
            data: "{'userId': '" + sessionStorage.getItem("Username") + "','request': '" + escape(JSON.stringify(request)) + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            success: function (response) {
                close_Dashboard_popup();
                showBackgroundShadow(true, true);
                //code for adding the added filter in left panel start
                response = response[0][0];
                let obj = {};
                obj.Filter = response.Filter;
                obj.FilterID = response.GroupId;
                obj.IsSelectable = true;
                obj.IsLastLevel = true;
                obj.MetricName = response.GroupName,
                    obj.MetricParentName = obj.Filter.indexOf(" Retailer") > -1 ? "Custom Group Retailer" : dispName,
                    obj.data = [],
                    obj.isDefaultLevel = false,
                    obj.isSingle = false;
                obj.DisplayName = response.GroupName;
                obj.title = response.SelectionSummary;
                obj.Parent = response.Parent;
                let parentItem = curscope.LeftStaticMenu;
                angular.forEach(parent_list, function (a, b) {
                    parentItem = parentItem.filter(function (e) { return e.DisplayName == a.DisplayName })[0].data;
                })
                parentItem.filter(function (e) { return e.DisplayName == obj.MetricParentName })[0].data.push(obj);
                parentItem.filter(function (e) { return e.DisplayName == obj.MetricParentName })[0].isDisabled = false;
                curscope.loadCustomGroup("Custom Group Created Successfully.");
                //code for adding the added filter in left panel 
                return false;
            },
            error: function (e) {
                show_popup("Alert", customMessages.Error);
                return false;
            }
        });
    }

    $scope.delete_Group = function (menusList, parent_list) {
        let curscope = angular.element("#left-pane-container").scope();
        menusList = JSON.parse(unescape(menusList));
        parent_list = JSON.parse(unescape(parent_list));
        showBackgroundShadow(true, true);
        let selections = selectedItems.filter(function (e) { return (!menusList.isDefaultLevel && (e.DisplayName.toUpperCase() == menusList.Filter.toUpperCase() || e.DisplayName.toUpperCase() == parent_list[0].DisplayName.toUpperCase())) || (menusList.isDefaultLevel && e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase()) });
        let adnList = curscope.getPKsAndName(selections, []).filter(function (e) { return e.Parent.indexOf("Custom Group") > -1 });
        if (parent_list[0].DisplayName.toUpperCase() == "5WS" || (parent_list.length > 1 && parent_list[1].DisplayName.toUpperCase() == "5WS")) {
            adnList = adnList.filter(function (e) { return e.Parent.toUpperCase() == menusList.DisplayName.toUpperCase() })
        }
        let filterIds = adnList.select("FilterID").join(",");
        $.ajax({
            type: "POST",
            url: services.DeleteCustomGroup,
            data: "{'userId': '" + sessionStorage.getItem("Username") + "','filterIds': '" + filterIds + "','type':'Group'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            success: function (response) {
                close_Dashboard_popup();
                showBackgroundShadow(true, true);
                //code for deleting the group in left panel start
                let parentItem = curscope.LeftStaticMenu;
                angular.forEach(parent_list, function (a, b) {
                    if (a.DisplayName.indexOf("Custom Group") == -1)
                        parentItem = parentItem.filter(function (e) { return e.DisplayName == a.DisplayName })[0].data;
                })
                let newGroupData = [];
                angular.forEach(parentItem.filter(function (e) { return e.DisplayName.indexOf(menusList.DisplayName) > -1 })[0].data, function (a, b) {
                    if (adnList.select("FilterID").indexOf(a.FilterID) == -1)
                        newGroupData.push(a);
                })
                let record = parentItem.filter(function (e) { return e.DisplayName.indexOf(menusList.DisplayName) > -1 })[0];
                record.hasChildSelected = false;
                record.hasSubMenusActive = false;
                record.isTabSelected = false;
                record.isDisabled = false;
                if (newGroupData.length == 0)
                    record.isDisabled = true;
                parentItem.filter(function (e) { return e.DisplayName.indexOf(menusList.DisplayName) > -1 })[0].data = newGroupData;
                //code for deleting the group in left panel end

                //update selection summary and left panel selection start
                selectedItems = curscope.getSelectedItems(curscope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
                List = [];
                List.push(parentList[0]);
                curscope.updateLeftMenuSelections(selectedItems, List);

                var selContent = curscope.formSelectionSummary(selectedItems, leftPanel_Parents.filter(function (e) { return e.hasChild }));
                angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
                //update selection summary and left panel selection end

                curscope.loadCustomGroup("Custom Group(s) Deleted Successfully.");
                return false;
            },
            error: function (e) {
                show_popup("Alert", customMessages.Error);
                return false;
            }
        });
    }

    $scope.delete_CustomFilter = function (menusList, parent_list) {
        let curscope = angular.element("#left-pane-container").scope();
        menusList = JSON.parse(unescape(menusList));
        parent_list = JSON.parse(unescape(parent_list));
        showBackgroundShadow(true, true);
        let selections = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
        let adnList = curscope.getPKsAndName(selections, []).filter(function (e) { return e.Parent == "Custom Filters" });
        let filterName = adnList.select("DisplayName").join(",");
        $.ajax({
            type: "POST",
            url: services.DeleteCustomGroup,
            data: "{'userId': '" + sessionStorage.getItem("Username") + "','filterIds': '" + filterName + "','type':'Filter'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            success: function (response) {
                close_Dashboard_popup();
                showBackgroundShadow(true, true);
                //code for deleting the group in left panel start
                let parentItem = curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].data.filter(function (e) { return e.DisplayName == "Custom Filters" })[0];
                let newGroupData = [];
                angular.forEach(parentItem.data, function (a, b) {
                    if (adnList.select("FilterID").indexOf(a.FilterID) == -1)
                        newGroupData.push(a);
                })
                parentItem.hasChildSelected = false;
                parentItem.hasSubMenusActive = false;
                parentItem.isTabSelected = false;
                parentItem.isDisabled = false;
                if (newGroupData.length == 0)
                    parentItem.isDisabled = true;
                parentItem.data = newGroupData;
                //code for deleting the group in left panel end

                //update selection summary and left panel selection start
                selectedItems = curscope.getSelectedItems(curscope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
                List = [];
                List.push(parent_list[0]);
                curscope.updateLeftMenuSelections(selectedItems, List);

                var selContent = curscope.formSelectionSummary(selectedItems, leftPanel_Parents.filter(function (e) { return e.hasChild }));
                angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
                //update selection summary and left panel selection end

                curscope.loadCustomFilters("Custom Filter Deleted Successfully.");
                return false;
            },
            error: function (e) {
                show_popup("Alert", customMessages.Error);
                return false;
            }
        });
    }

    $scope.numPages = function () {
        if ($scope.dataList != undefined && $scope.dataList.length > 0)
            return Math.ceil($scope.dataList.length / $scope.numPerPage);
        return;
    };
}

var downloadGuide = function (flag, name) {
    myFunction1();
    showBackgroundShadow(true, true);
    $.ajax({
        url: services.DownloadUserGuide,
        data: "{'flag': '" + flag + "','name':'" + name + "'}",
        method: callsType.Post,
        contentType: "application/json",
        //processData: false,
        success: function (response) {
            if (response != "Error") {
                //window.location.href = services.DownloadFile + encodeURIComponent(response);
                if (response != "")
                    window.open(services.DownloadFile + encodeURIComponent(response));
                else
                    show_popup("Alert", "Currently the selected guide not available");
                showBackgroundShadow(false, false);
            }
            else {
                show_popup("Alert", customMessages.Error);
                return false;
            }

        },
        error: function (xhr, status, error) {
            show_popup("Alert", customMessages.Error);
            return false;
        }
    });
};

function closeAllPopups($event, $scope) {
    if (!$scope.leftMenuIsHidden)
        $scope.leftPanelToggle();
    if (!$scope.ModuleIsHidden)
        $scope.ModulePanelToggle();
    $scope.showSettings = false;
    angular.element(document.querySelectorAll(".summaryPopup")).css("display", "none");
    angular.element(document.querySelectorAll(".summary-view-click")).removeClass("summaryPopup_selected");
}

let SetScroll = function (Obj, cursor_color, top, right, left, bottom, cursorwidth, horizrailenabled) {
    if (horizrailenabled != undefined) {
        angular.element(Obj).niceScroll({
            cursorcolor: cursor_color,
            cursorborder: cursor_color,
            cursorwidth: (cursorwidth / document.documentElement.clientWidth) * 100 + "vw",
            autohidemode: false,
            horizrailenabled: horizrailenabled,
            railpadding: {
                top: top,
                right: right,
                left: left,
                bottom: bottom
            }
        });
    }
    else {
        $(Obj).niceScroll({
            cursorcolor: cursor_color,
            cursorborder: cursor_color,
            cursorwidth: (cursorwidth / document.documentElement.clientWidth) * 100 + "vw",
            autohidemode: false,
            railpadding: {
                top: top,
                right: right,
                left: left,
                bottom: bottom
            }
        });
    }

    if (!$(Obj).hasClass('rightBody') && !$(Obj).hasClass('timePeriodListArea')) {
        angular.element(Obj).getNiceScroll().resize();
    }
    angular.element(".nicescroll-cursors").css("cursor", "pointer");
}

let initialScrollTop = 0;
let reposVertical = function (e) {
    angular.element(e).parent().find(".leftBody").scrollTop(e.scrollTop);
    angular.element(e).parent().find(".rightHeader").scrollLeft(e.scrollLeft);
    if (selectedModuleId == 3 && initialScrollTop != e.scrollTop) {
        initialScrollTop = e.scrollTop
        loadMore(e.scrollTop < initialScrollTop ? 'prepend' : 'append');
    }
}

function saveDashboard(event, flag) {
    angular.element(event.currentTarget).find(".widget-head-save-icon").addClass("active");
    let element = angular.element(event.currentTarget).parents(".widget").attr("id");
    if (element == undefined || element.indexOf("widget") == -1) {
        if (flag) {
            element = angular.element(event.currentTarget).parents(".headerArea").siblings(".chartArea").attr("id");
        }
        else
            element = angular.element(event.currentTarget).parents(".chartArea").attr("id");
    }
    if (typeof (DashboardMaster) == "string") {
        setTimeout(function () {
            if (element.indexOf("widget") == -1)
                $(".saveDashboard .headSaveIcon").click();
            else
                $("#" + element).find(".headSaveIcon").click();
        }, 3000)
        showBackgroundShadow(true, true);
        return false;
    }
    showBackgroundShadow(false, false);

    show_popup("Save Dashboard", '');
    var saveDashboard = "";
    saveDashboard += '<div class="selectDashboardOption">' +
        '<div class="newOption selectedDashboardOption" onclick="selectDashboardOption(0,\'' + element + '\')">' +
        '<div class="radioButton"><div class="middleAlign"><div class="radioImage"></div></div></div>' +
        '<div class="radioText"><div class="middleAlign">New Dashboard</div></div>' +
        '</div>' +
        (DashboardMaster.filter(function (e) { return e.DashBoardID != 2 }).length > 0 ? '<div class="appendOption" onclick="selectDashboardOption(1,\'' + element + '\')">' +
            '<div class="radioButton"><div class="middleAlign"><div class="radioImage"></div></div></div>' +
            '<div class="radioText"><div class="middleAlign">Append to Saved/Shared Dashboard</div></div>' +
            '</div>' : '') +
        '</div>';
    angular.element(".popup-container").html(saveDashboard);
    selectDashboardOption(0, element);
    $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
    $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 19, "max-height": $(".custom-popup:visible").height() - 19 });

}

function selectDashboardOption(flag, element) {
    angular.element(".selectDashboardOption > div").removeClass("selectedDashboardOption");
    angular.element(".selectDashboardOption > div:eq(" + flag + ")").addClass("selectedDashboardOption");
    angular.element(".popup-container > div:not(.selectDashboardOption)").remove();
    var addDashboardDiv = "";
    if (flag == 0) {//new dashboard
        addDashboardDiv += '<div class="addDashboardName"><div class="dashboardName"><div class="middleAlign">DASHBOARD NAME</div></div><input class="dashboardName" placeholder="Enter Name"></div>';
    }
    else {
        addDashboardDiv += '<div class="addDashboardName"><div class="dashboardName"><div class="middleAlign">SELECT DASHBOARD</div></div></div>';
        let dashboardList = DashboardMaster.filter(function (e) { return e.DashBoardTypeId != 2 });
        let dashboardDiv = "";
        let uniqueList = [];
        angular.forEach(dashboardList, function (a, b) {
            let obj = {};
            obj.dashboardid = a.DashBoardID;
            obj.dashboardtypeid = a.DashBoardTypeId;
            if (uniqueList.filter(function (e) { return e.dashboardid == a.DashBoardID && e.dashboardtypeid == a.DashBoardTypeId }).length == 0) {
                dashboardDiv += '<div class="dashboard-list-item" dashboardid="' + a.DashBoardID + '" dashboardtypeid="' + a.DashBoardTypeId + '" onclick="selectDashboard(' + a.DashBoardID + ',' + a.DashBoardTypeId + ')">' +
                    '<div class="radioButton"><div class="middleAlign"><div class="radioImage"></div></div></div>' +
                    '<div class="radioText" title="' + a.DashboardName + (a.DashBoardTypeId == 3 ? '<sup>*</sup>' : '') + '"><div class="middleAlign">' + a.DashboardName + (a.DashBoardTypeId == 3 ? '<sup>*</sup>' : '') + '</div></div>' +
                    '</div>'
                uniqueList.push(obj);
            }

        })
        addDashboardDiv += '<div class="dashboardListDiv">' + dashboardDiv + '</div>';
        addDashboardDiv += '<div class="sharedNoteDiv"><div class="bottomShadow" style="top: 0.15vw;"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div><div class="middleAlign" style="padding: 0 1.4vw;">Note: * Shared Dashboards</div></div>'
    }

    addDashboardDiv += '<div class="buttonContainer">' +
        '<div class="buttonArea">' +
        '<div class="saveButton buttonDiv" onclick="save_Dashboard(' + flag + ',\'' + element + '\')">' +
        '<div class="saveIconDiv buttonIconDiv"><div class="middleAlign"><div class="saveIcon buttonIcon"></div></div></div>' +
        '<div class="saveTextDiv buttonTextDiv"><div class="middleAlign">SAVE</div></div>' +
        '</div>' +
        '</div>' +
        '<div class="buttonArea">' +
        '<div class="cancelButton buttonDiv" onclick="close_Dashboard_popup()">' +
        '<div class="cancelIconDiv buttonIconDiv"><div class="middleAlign"><div class="cancelIcon buttonIcon"></div></div></div>' +
        '<div class="cancelTextDiv buttonTextDiv"><div class="middleAlign">CANCEL</div></div>' +
        '</div>' +
        '</div>' +
        '</div>';
    angular.element(".popup-container").append(addDashboardDiv);
    $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
    $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 19, "max-height": $(".custom-popup:visible").height() - 19 });
    SetScroll(angular.element(".dashboardListDiv"), "#D31245", 0, 0, 0, 0, 3, false);
}

function selectDashboard(dashboardId, dashboardTypeId) {
    angular.element(".dashboardListDiv > div").removeClass("selectedDashboardOption");
    angular.element(".dashboardListDiv > div[dashboardid=" + dashboardId + "][dashboardtypeid=" + dashboardTypeId + "]").addClass("selectedDashboardOption");
}

function close_Dashboard_popup() {
    angular.element(".custom-popup").scope().close_Custom_popup();
    angular.element(".dashboardFeature div").removeClass("active");
    angular.element(".widget-head-save-icon").removeClass("active");
    angular.element(".slides-container:visible .icon-container div:not(.selectSlideIcon)").removeClass("active");
    angular.element(".widgetchart .popup-header #custom_message .widgetIconDiv").remove();
    angular.element("#share").removeClass('active');
    angular.element(".custom-popup .popup-header").removeClass("reportTimePopup");
    angular.element(".custom-popup .popup-header .head-msg").removeClass("reportMsg");
    angular.element(".custom-popup > .nicescroll-rails").remove();
}
function save_Dashboard(flag, element) {
    let requestObj = {};
    requestObj.UserID = "";
    requestObj.DashBoardTypeId = "";
    requestObj.DashBoardID = "";
    requestObj.DashboardName = "";
    requestObj.WidgetType = "";
    requestObj.WidgetName = "";
    requestObj.WidgetID = "";
    requestObj.SelectionSummary = $(".summay-content-text").text().trim();
    requestObj.RequestObj = "";
    requestObj.Image = "";
    requestObj.ResponseData = "";
    requestObj.Flag = flag;
    var sContainer = angular.element(document.getElementById(element));
    var widgetData = stackChartData;
    if (element.indexOf("widget") > -1) {
        sContainer = angular.element(sContainer).find(".widget-body");
        widgetData = responseData.filter(function (e) { return e.WidgetNumber == element.split("_")[1] })
    }
    else if (element.indexOf("PD") > -1) {
        widgetData = responseData;
    }
    d3.selectAll(".domain")
        .style("stroke", "transparent")
        .style("fill", "transparent");
    if (flag == 0) {
        let dbName = angular.element("input.dashboardName").val();
        //|| !dbName.match(/^[A-Za-z][0-9A-Za-z_-]+$/)
        if (dbName == "" || dbName.length < 3 || dbName.match(/^[A-Za-z][0-9A-Za-z_-][0-9A-Za-z_-]+$/) == null) {
            show_alert_popup("ALERT", "Please enter valid Dashboard name. Dashboard name must contain atleast 3 characters and cannot contain Space ' ', special character apart from '_', '-'.");
            showBackgroundShadow(false, false);
            return false;
        }
        let notAlreadyExists = DashboardMaster.filter(function (e) { return dbName.toLowerCase() == e.DashboardName.toLowerCase() && (e.DashBoardTypeId == 1 || e.DashBoardTypeId == 3) }).length == 0;
        if (notAlreadyExists) {
            close_Dashboard_popup();
            showBackgroundShadow(true, true);
            ReplaceSvgToCanvas(sContainer);
            if (!(/*@cc_on!@*/false || !!document.documentMode)) {
                angular.element("body,html,form").addClass("ie11");
            }
            html2canvas(sContainer, {
                allowTaint: true,
                letterRendering: true,
                useCORS: true,
                onrendered: function (canvas) {
                    ctx = canvas.getContext("2d");
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.imageSmoothingEnabled = false;
                    ctx.oImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    var theImage1 = canvas.toDataURL();
                    theImage1 = theImage1.replace('data:image/png;base64,', '');
                    requestObj.UserID = sessionStorage.getItem("Username");
                    requestObj.DashBoardTypeId = 1;
                    let dashboardList = DashboardMaster.select("DashBoardID").distinct();
                    requestObj.DashBoardID = Math.max.apply(this, dashboardList) + 1;//maxId is the id of the last added dashboard by the user
                    requestObj.DashboardName = dbName;
                    requestObj.WidgetID = 1;//since new dashboard is being created the id of the widget is set to 1
                    requestObj.Image = theImage1;
                    requestObj.ResponseData = JSON.stringify(widgetData);
                    requestObj.SelectionObj = JSON.stringify(selectedItems);
                    var curScope = angular.element("#left-pane-container").scope();
                    var country = curScope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" })[0].Data, []).select("DisplayName");
                    let request;
                    if (element.indexOf("widget") > -1) {
                        requestObj.WidgetType = angular.element(document.getElementById(element)).find("#custom_message").attr("title").toLowerCase();
                        requestObj.WidgetName = requestObj.WidgetType[0].toUpperCase() + requestObj.WidgetType.substring(1) + " (" + curScope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "OCCASION" })[0].Data, []).select("DisplayName").join(', ') + ") - " + country.join(", ").replace("Select All Markets", "All Markets");
                        request = angular.copy(SnapshotRequest);
                    }
                    else if (element.indexOf("PD") > -1) {
                        requestObj.WidgetType = "performance dashboard";
                        requestObj.WidgetName = selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY" })[0].Data[0].DisplayName + " - " + country.join(", ").replace("Select All Markets", "All Markets");
                        request = angular.copy(PDRequest);
                    }
                    else {
                        var obj = getSelectedMainValues();
                        requestObj.WidgetType = angular.element(document.getElementsByClassName("chartIcons")).find(".active").attr("class").split(" ")[0].replace("Chart", "").replace("Icon", "");
                        requestObj.WidgetName = obj.Row + " Across " + obj.Column + " - " + country.join(", ").replace("Select All Markets", "All Markets");
                        request = angular.copy(CrossTabRequest);
                        request.isDispLabel = $($('#dispLabel div:last-child')[1]).hasClass('chkbox_active');
                        request.isDispTotal = $($('#dispTotal div:last-child')[1]).hasClass('chkbox_active');

                    }
                    delete request.SelectionSummary;
                    delete request.SelectedItems;
                    requestObj.RequestObj = JSON.stringify(request);

                    $.ajax({
                        type: "POST",
                        url: services.AddToDashboard,
                        data: JSON.stringify(requestObj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        crossDomain: true,
                        success: function (response) {
                            angular.element(".custom-popup").scope().loadDashboard();
                            showBackgroundShadow(false, false);
                            show_popup("Alert", "Saved successfully");
                            angular.element('canvas').remove();
                            angular.element('svg').show();
                            if (!(/*@cc_on!@*/false || !!document.documentMode)) {
                                angular.element("body,html,form").removeClass("ie11");
                            }
                        },
                        error: function (e) {
                            showBackgroundShadow(false, false);
                            show_popup("Alert", customMessages.Error);
                            angular.element('canvas').remove();
                            angular.element('svg').show();
                            return false;
                        }
                    });
                    angular.element('canvas').remove();
                    angular.element('svg').show();
                }
            });
        }
        else {
            showBackgroundShadow(false, false);
            show_alert_popup("ALERT", "Dashboard Already Exists");
            return false;
        }
    }
    else {
        let dashboardIds = [];
        angular.forEach(angular.element(".dashboardListDiv:visible .dashboard-list-item.selectedDashboardOption"), function (a, b) {
            dashboardIds.push(angular.element(a).attr("dashboardid"));
        })
        if (dashboardIds.length == 0) {
            showBackgroundShadow(false, false);
            show_alert_popup("ALERT", "Select dashboard to append");
            return false;
        }
        requestObj.DashBoardTypeId = angular.element(".dashboard-list-item.selectedDashboardOption").attr("dashboardtypeid");
        requestObj.DashBoardID = angular.element(".dashboard-list-item.selectedDashboardOption").attr("dashboardid");//existing dashboard id
        close_Dashboard_popup();
        showBackgroundShadow(true, true);
        ReplaceSvgToCanvas(sContainer);
        if (!(/*@cc_on!@*/false || !!document.documentMode)) {
            angular.element("body,html,form").addClass("ie11");
        }
        html2canvas(sContainer, {
            allowTaint: true,
            letterRendering: true,
            useCORS: true,
            onrendered: function (canvas) {
                ctx = canvas.getContext("2d");
                ctx.webkitImageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                ctx.oImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                var theImage1 = canvas.toDataURL();
                theImage1 = theImage1.replace('data:image/png;base64,', '');
                requestObj.UserID = sessionStorage.getItem("Username");
                requestObj.DashboardName = DashboardMaster.filter(function (e) { return e.DashBoardID == requestObj.DashBoardID && e.DashBoardTypeId == requestObj.DashBoardTypeId })[0].DashboardName;//existing dbName;
                let widgetIds = DashboardMaster.filter(function (e) { return e.DashBoardID == requestObj.DashBoardID && e.DashBoardTypeId == requestObj.DashBoardTypeId && e.WidgetID != null }).select("WidgetID").distinct();
                if (widgetIds.length > 0)
                    requestObj.WidgetID = parseInt(DashboardMaster.filter(function (e) { return e.DashBoardID == requestObj.DashBoardID && e.DashBoardTypeId == requestObj.DashBoardTypeId }).select("WidgetID").sort().reverse()[0]) + 1;
                else
                    requestObj.WidgetID = 1;
                requestObj.Image = theImage1;
                requestObj.ResponseData = JSON.stringify(widgetData);
                requestObj.SelectionObj = JSON.stringify(selectedItems);
                var curScope = angular.element("#left-pane-container").scope();
                var country = curScope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" })[0].Data, []).select("DisplayName");
                let request;
                if (element.indexOf("widget") > -1) {
                    requestObj.WidgetType = angular.element(document.getElementById(element)).find("#custom_message").attr("title").toLowerCase();
                    requestObj.WidgetName = requestObj.WidgetType[0].toUpperCase() + requestObj.WidgetType.substring(1) + " (" + curScope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "OCCASION" })[0].Data, []).select("DisplayName").join(', ') + ") - " + country.join(", ").replace("Select All Markets", "All Markets");
                    request = angular.copy(SnapshotRequest);

                }
                else if (element.indexOf("PD") > -1) {
                    requestObj.WidgetType = "performance dashboard";
                    requestObj.WidgetName = selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY" })[0].Data[0].DisplayName + " - " + country.join(", ").replace("Select All Markets", "All Markets");
                    request = angular.copy(PDRequest);
                    requestObj.RequestObj = JSON.stringify(request);
                }
                else {
                    var obj = getSelectedMainValues();
                    requestObj.WidgetType = angular.element(document.getElementsByClassName("chartIcons")).find(".active").attr("class").split(" ")[0].replace("Chart", "").replace("Icon", "");
                    requestObj.WidgetName = obj.Row + " Across " + obj.Column + " - " + country.join(", ").replace("Select All Markets", "All Markets");
                    request = angular.copy(CrossTabRequest);
                    request.isDispLabel = $($('#dispLabel div:last-child')[1]).hasClass('chkbox_active');
                    request.isDispTotal = $($('#dispTotal div:last-child')[1]).hasClass('chkbox_active');
                }
                delete request.SelectedItems;
                delete request.SelectionSummary;
                requestObj.RequestObj = JSON.stringify(request);
                if (DashboardMaster.filter(function (e) { return e.RequestObj == requestObj.RequestObj && e.SelectionObj == requestObj.SelectionObj && e.WidgetType == requestObj.WidgetType && e.DashBoardID == requestObj.DashBoardID && e.DashBoardTypeId == requestObj.DashBoardTypeId }).length > 0) {
                    showBackgroundShadow(false, false);
                    if (!(/*@cc_on!@*/false || !!document.documentMode)) {
                        angular.element("body,html,form").removeClass("ie11");
                    }
                    show_alert_popup("ALERT", "Duplicate slides are not allowed with the same selection values in a dashboard. Please check selections for the slide.");
                    angular.element('canvas').remove();
                    angular.element('svg').show();
                    return false;
                }
                $.ajax({
                    type: "POST",
                    url: services.AddToDashboard,
                    data: JSON.stringify(requestObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    crossDomain: true,
                    success: function (response) {
                        angular.element(".custom-popup").scope().loadDashboard();
                        showBackgroundShadow(false, false);
                        show_popup("Alert", "Saved successfully");
                        angular.element('canvas').remove();
                        angular.element('svg').show();
                        if (!(/*@cc_on!@*/false || !!document.documentMode)) {
                            angular.element("body,html,form").removeClass("ie11");
                        }
                    },
                    error: function (e) {
                        showBackgroundShadow(false, false);
                        show_popup("Alert", customMessages.Error);
                        angular.element('canvas').remove();
                        angular.element('svg').show();
                        return false;
                    }
                });
                angular.element('canvas').remove();
                angular.element('svg').show();
            }
        });
    }
}
function ReplaceSvgToCanvas(sContainer) {
    svgElements = $(sContainer).find('svg');

    //replace all svgs with a temp canvas
    var i = 0;
    svgElements.each(function () {
        var canvas, xml;
        // canvg doesn't cope very well with em font sizes so find the calculated size in pixels and replace it in the element.
        $.each($(this).find('[style*=em]'), function (index, el) {
            $(this).css('font-size', getStyle(el, 'font-size'));
        });
        canvas = document.createElement("canvas");
        sContainer[0].appendChild(canvas);

        //convert SVG into a XML string
        xml = (new XMLSerializer()).serializeToString(this);

        xml = xml.replace(/xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\"/, '');
        xml = xml.replace(/xlink:href/g, '');

        //draw the SVG onto a canvas
        canvg(canvas, xml);
        $(canvas).height($(this).height());
        $(canvas).width($(this).width());
        //Padding     position: absolute;                top: 0;                left: 70px;
        $(canvas).css('position', 'absolute');
        $(canvas).css('top', $(this).css('padding-top'));
        $(canvas).css('left', $(this).css('padding-left'));
        $(canvas).insertAfter(this);
        //hide the SVG element
        $(this).hide();
    });
}
var isDispLabel = false, isDispTotal = true;
var stickySelection = "";
if (selectedModuleId != undefined && selectedModuleId != "" && selectedModuleId != "7" && selectedModuleId != "6" && selectedModuleId != "8")
    getStickySelection();
function getStickySelection() {
    let selectionObj = [];
    $.ajax({
        type: "POST",
        url: services.GetStickySelection,
        data: "{'moduleId': " + selectedModuleId + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        success: function (response) {
            if (response != "")
                selectionObj = JSON.parse(response);
            stickySelection = selectionObj == "" ? [] : selectionObj;
            stickySelection = stickySelection.filter(function (e) { return e.DisplayName != "" });
        },
        error: function (e) {
            show_popup("Alert", customMessages.Error);
            return false;
        }
    });
}
function defaultSelections(moduleId) {
    let selectionObj = [];
    if (LeftPanelOriginalData == undefined || (selectedModuleId != "9" && typeof (CustomGroupMaster) == "string")) {
        setTimeout(function () {
            defaultSelections(moduleId);
        })
        return false;
    }
    if (sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "" && sessionStorage.getItem("widgetMId") == selectedModuleId) {
        let widgetInfo = JSON.parse(sessionStorage.getItem("widgetInfo"));
        selectionObj = JSON.parse(widgetInfo.SelectionObj);
        requestObj = JSON.parse(widgetInfo.RequestObj);
        if (widgetInfo.WidgetType == "stack" || widgetInfo.WidgetType == "trend") {
            isDispLabel = requestObj.isDispLabel;
            isDispTotal = requestObj.isDispTotal;
        }
        selectedItems = selectionObj.filter(function (e) { return e.DisplayName != "" });
        clickSelections(selectionObj.filter(function (e) { return e.DisplayName != "" }));
    }
    else {
        //code for sticky selection
        if (typeof (stickySelection) == "string") {
            $.ajax({
                type: "POST",
                url: services.GetStickySelection,
                data: "{'moduleId': " + moduleId + "}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                success: function (response) {
                    if (response != "")
                        selectionObj = JSON.parse(response);
                    stickySelection = selectionObj == "" ? [] : selectionObj;
                    clickSelections(selectionObj.filter(function (e) { return e.DisplayName != "" }));

                },
                error: function (e) {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }
            });
        }
        else {
            clickSelections(stickySelection.filter(function (e) { return e.DisplayName != "" }));
        }
    }
}

function clickSelections(selectionObj) {
    //selectedItems = angular.copy(selectionObj);
    let temp = angular.copy(selectionObj);
    if (selectionObj.length > 0) {
        //$(".panel-click").click();
        let curscope = angular.element("#left-pane-container").scope();
        angular.forEach(selectionObj, function (a, b) {
            if (selectedModuleId != 6)
                curscope.menu_Tab_Click(curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == a.DisplayName })[0], curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == a.DisplayName }), curscope);
            let leftPanelData = curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == a.DisplayName });
            if (a.DisplayName != "RETAIL SALES VALUE")
                makeSelections(a, leftPanelData[0].data.filter(function (e) { return a.Data.select("FilterID").indexOf(e.FilterID) > -1 }), curscope, [leftPanelData[0]]);
            selectedItems = curscope.getSelectedItems(curscope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
            List = [];
            List.push(curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == a.DisplayName })[0]);
            curscope.updateLeftMenuSelections(temp, List);
            curscope.$apply();

            if ((a.DisplayName == "TIME PERIOD" || a.DisplayName == "ADDITIONAL FILTERS") && curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" }).length > 0) {
                curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].isDisabled = false;
                timeList = [];
                let timeGList = curscope.getPKsAndName(temp.where(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data, []).select("FilterID").join(",");
                if (temp.where(function (e) { return e.DisplayName == "TIME PERIOD" }).length > 0) {
                    timeList = curscope.getPKsAndName(temp.where(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data, []).select("DisplayName");
                }
                if (temp.length > 0 && timeGList.indexOf("g") == -1 && (timeList.length > 1 || (timeList.length == 1 && timeList[0] != "2019" && timeList[0] != "Q1 2019" && timeList[0].indexOf("YTD") == -1))) {
                    curscope.menu_Tab_Click(curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0], curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" }), curscope);
                    //bindingLeftPanelDynamically(curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0], curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" }));
                    if (curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].data.filter(function (e) { return e.isDisabled }).length < 2)
                        curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].hasChildSelected = true;
                    else {
                        curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].isDisabled = true;
                        curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].hasChildSelected = false;
                        curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].data = [];
                    }
                }
                else {
                    if (timeList.length > 0)
                        curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].isDisabled = true;
                    curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].hasChildSelected = false;
                    curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].data = [];
                }

                if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "COVID-19" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "COVID-19" })[0].Data.filter(function (e) { return e.DisplayName == "During-COVID19" }).length > 0) {
                    curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].isDisabled = true;
                    curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].hasChildSelected = false;
                    curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" })[0].data = [];
                }
            }
        })
        temp = temp.filter(function (e) { return e.DisplayName != "RETAIL SALES VALUE" });
        var selContent = curscope.formSelectionSummary(temp, leftPanel_Parents.filter(function (e) { return e.hasChild && e.DisplayName != "RETAIL SALES VALUE" }));
        angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
        selectedItems = temp;
        if (outputNeededStickySelection || (sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "")) {
            curscope.left_panel_submit('leftPanel');
            let widgetInfo = JSON.parse(sessionStorage.getItem("widgetInfo"));
            if (sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "")
                if (widgetInfo.WidgetType != "stack" && widgetInfo.WidgetType != "trend") {
                    sessionStorage.removeItem("widgetInfo");
                }
        }
        else {
            showBackgroundShadow(false, false);
            sessionStorage.removeItem("widgetInfo");
        }
        stickySelection = [];
    }
    else {
        showBackgroundShadow(false, false);
    }
}

function makeSelections(menusList, leftPanelData, curscope, parentList) {
    if (menusList.Data != undefined && menusList.Data.length > 0) {
        angular.forEach(menusList.Data, function (value, index) {
            if (leftPanelData.filter(function (e) { return e.FilterID == value.FilterID && e.ParentId == value.ParentId }).length > 0) {
                record = leftPanelData.filter(function (e) { return e.FilterID == value.FilterID && e.ParentId == value.ParentId })[0];
                if (leftPanelData.filter(function (e) { return e.FilterID == value.FilterID && e.ParentId == value.ParentId }).length > 1)
                    record = leftPanelData.filter(function (e) { return e.FilterID == value.FilterID && e.ParentId == value.ParentId && e.DisplayName == value.DisplayName })[0];
                if (menusList.DisplayName == "BENCHMARK") {
                    parentList.push(record);
                    curscope.singleSelectClick(record, parentList);
                }
                record.hasSubMenusActive = value.hasSubMenusActive;
                record.hasChildSelected = value.hasChildSelected;
                value.IsItemLevel = record.IsItemLevel;
                if (value.Data.length > 0) {
                    if (parentList != undefined) {
                        parentList.push(record);
                        if (record.data.length == 0 || record.isGroupNeeded)
                            curscope.checkIsLastLevel(record, parentList, curscope);
                    }
                    makeSelections(value, record.data.filter(function (e) {
                        return value.Data.select("FilterID").indexOf(e.FilterID) > -1 && value.Data.select("ParentId").indexOf(e.ParentId) > -1
                    }), curscope, parentList);
                }
            }
        })
    }
}

function bindWidgetChart() {
    setTimeout(function () {
        let widgetInfo = JSON.parse(sessionStorage.getItem("widgetInfo"));
        if (widgetInfo.WidgetType == "stack" || widgetInfo.WidgetType == "trend") {
            angular.element(".chartIcons ." + widgetInfo.WidgetType + "Chart").trigger("click");
            if (isDispLabel)
                $($('#dispLabel div:last-child')[1]).addClass("chkbox_active").addClass("chkbox");
            else
                $($('#dispLabel div:last-child')[1]).removeClass("chkbox_active").addClass("chkbox");
            if (isDispTotal)
                $($('#dispTotal div:last-child')[1]).addClass("chkbox_active").addClass("chkbox")
            else
                $($('#dispTotal div:last-child')[1]).removeClass("chkbox_active").addClass("chkbox")
            angular.element(".chartIcons ." + widgetInfo.WidgetType + "Chart").trigger("click");
        }
        if (sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "")
            sessionStorage.removeItem("widgetInfo");
        showBackgroundShadow(false, false);
    })
}
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function show_alert_popup(msg_header, msg_content) {
    angular.element(document.getElementsByClassName("alert-overlay")).addClass("show_element");
    angular.element(document.getElementsByClassName("alert-popup")).addClass("show_element");
    angular.element(".alert-popup .popup-container").html("<div class='middleAlign' title='" + msg_content + "' style='padding: 0vw 0 1vw 0;'>" + msg_content + "</div>");
    angular.element(".alert-popup .popup-header .middleAlign").text(msg_header);
    if ($(".alert-popup:visible").hasClass("playAd")) {
        $(".alert-popup:visible").css({ "height": "auto", "max-height": "70%" });
        $(".alert-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
        $(".alert-popup:visible .popup-container").css({ "height": ($(".alert-popup:visible").height() / document.documentElement.clientWidth) * 100 - 3 + "vw", "max-height": ($(".alert-popup:visible").height() / document.documentElement.clientWidth) * 100 - 3 + "vw" });
    }
    else {
        $(".alert-popup:visible .popup-container").css({ "height": "", "max-height": "" });
    }
}

function close_alert_popup() {
    angular.element(document.getElementsByClassName("alert-overlay")).removeClass("show_element");
    angular.element(document.getElementsByClassName("alert-popup")).removeClass("show_element");
    angular.element(".alert-popup .popup-container .middleAlign").text("");
    angular.element(".alert-popup").css({ "height": "26%", "width": "35%" });
    angular.element(document.getElementsByClassName("alert-popup")).removeClass("playAd");
    if (angular.element(".popup-container video").length > 0)
        angular.element(".popup-container video")[0].pause();
    showBackgroundShadow(false, false);
}

function custom_filters_popup(dashboard, flag) {
    let additionalFiltersSelections = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
    let adnList = angular.element("#left-pane-container").scope().getPKsAndName(additionalFiltersSelections, []);
    if (adnList.filter(function (e) { return e.Parent.indexOf("Custom Group") > -1 }).length > 0) {
        show_alert_popup("ALERT", "Cannot create custom filter when group(s) is/are selected.");
        showBackgroundShadow(false, false);
        return false;
    }
    show_popup("Save Filter", '');
    var addFilter = "";
    addFilter += '<div class="filterName"><div class="textArea"><div class="middleAlign">Name</div></div><div class="inputArea" style=" margin-left: 0;"><div class="middleAlign"><input class="filterName" placeholder="Enter Name" maxlength="40"></div></div></div>';
    addFilter += '<div class="buttonContainer">' +
        '<div class="buttonArea">' +
        '<div class="saveButton buttonDiv" onclick="save_custom_filters()">' +
        '<div class="saveIconDiv buttonIconDiv"><div class="middleAlign"><div class="saveIcon buttonIcon"></div></div></div>' +
        '<div class="saveTextDiv buttonTextDiv"><div class="middleAlign">SAVE</div></div>' +
        '</div>' +
        '</div>' +
        '<div class="buttonArea">' +
        '<div class="cancelButton buttonDiv" onclick="close_Dashboard_popup()">' +
        '<div class="cancelIconDiv buttonIconDiv"><div class="middleAlign"><div class="cancelIcon buttonIcon"></div></div></div>' +
        '<div class="cancelTextDiv buttonTextDiv"><div class="middleAlign">CANCEL</div></div>' +
        '</div>' +
        '</div>' +
        '</div>';
    angular.element(".popup-container").html(addFilter);
    $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
    $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 36, "max-height": $(".custom-popup:visible").height() - 36 });
}

function custom_filters() {
    if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0) {
        custom_filters_popup();
    }
    else {
        show_popup("ALERT", "No <b>Additional Filters</b> selected");
        return false;
    }
}

function save_custom_filters() {
    showBackgroundShadow(true, true);
    let fName = angular.element("input.filterName").val();

    let additionalFiltersSelections = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
    let adnList = angular.element("#left-pane-container").scope().getPKsAndName(additionalFiltersSelections, []);
    let userId = sessionStorage.getItem("Username");
    let FilterIds = adnList.select("FilterID").join(",");
    let selSum = $(".summay-content-text").text().trim().split(" || ");
    let FilterNames = selSum[selSum.findIndex(function (e) { return e.indexOf("ADDITIONAL FILTERS") > -1 })].replace("ADDITIONAL FILTERS: ", "");
    let customFilterName = fName;

    if (fName == "" || fName.length < 3 || fName.match(/^[A-Za-z][ 0-9A-Za-z_-][ 0-9A-Za-z_-]+$/) == null) {
        show_alert_popup("ALERT", "Please enter valid Custom Filter name. Custom Filter name must contain atleast 3 characters and cannot special character apart from '_', '-', Space ' '.");
        showBackgroundShadow(false, false);
        return false;
    }
    if (CustomFilterMaster.filter(function (e) { return e.Name.toUpperCase() == fName.toUpperCase() }).length > 0) {
        show_alert_popup("ALERT", "Custom Filter with same name already exists.");
        showBackgroundShadow(false, false);
        return false;
    }
    if (CustomFilterMaster.filter(function (e) { return e.SelectionSummary.toUpperCase() == replaceWithDouble_SingleCharacters(FilterNames.toUpperCase()) || e.SelectionSummary.toUpperCase() == FilterNames.toUpperCase() }).length > 0) {
        show_alert_popup("ALERT", "Custom Filter with selected additional filters already exists.");
        showBackgroundShadow(false, false);
        return false;
    }
    $.ajax({
        type: "POST",
        url: services.CustomFilter,
        data: "{'userId': '" + userId + "','FilterID': '" + FilterIds + "','FilterName': '" + replaceWithDouble_SingleCharacters(FilterNames) + "','CustomFilterName': '" + customFilterName + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        success: function (response) {
            close_Dashboard_popup();
            showBackgroundShadow(false, false);
            //code for adding the added filter in left panel start
            let obj = {};
            obj.Filter = "ADDITIONAL FILTERS";
            obj.FilterID = FilterIds;
            obj.IsSelectable = true;
            obj.IsLastLevel = true;
            obj.isSingle = true;
            obj.MetricName = customFilterName,
                obj.MetricParentName = "Custom Filters",
                obj.data = [],
                obj.isDefaultLevel = false,
                obj.isSingle = false;
            obj.data = [];
            obj.DisplayName = customFilterName;
            obj.title = FilterNames;
            let curscope = angular.element("#left-pane-container").scope();
            curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].data.filter(function (e) { return e.DisplayName == "Custom Filters" })[0].isDisabled = false;
            curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].data.filter(function (e) { return e.DisplayName == "Custom Filters" })[0].data.push(obj);
            curscope.loadCustomFilters("Custom Filter Saved Successfully");
            //code for adding the added filter in left panel end
            return false;
        },
        error: function (e) {
            show_popup("Alert", customMessages.Error);
            return false;
        }
    });
}

function openAdPopup(moduleId) {
    var moduleName = accessList.filter(function (e) { return e.id == moduleId.toString() });
    angular.element(document.getElementsByClassName("alert-popup")).addClass("playAd");
    show_alert_popup("Training Video - " + moduleName[0].Name, "");
    angular.element(".alert-popup .popup-container").empty();
    if (fileExists("../Content/Videos/Training_Video-" + moduleName[0].Name.replace(/[ ]/gi, '_') + ".mp4")) {
        var tempHTML = '<video class="video-js vjs-default-skin" id="mediaVideo" controls autoplay style="height:100%;width:100%"><source src="' + "../Content/Videos/Training_Video-" + moduleName[0].Name.replace(/[ ]/gi, '_') + ".mp4" + '" type="video/mp4"></video>';
        angular.element(".popup-container").scrollTop(0);
        angular.element(".alert-popup .popup-container").append(tempHTML);
        videojs(document.querySelector('.video-js'));
        var downloadButton = '<div class="downloadLink" title="Download">' +
            '<div class="downloadImage"><a href="../Content/Videos/Training_Video-' + moduleName[0].Name.replace(/[ ]/gi, '_') + '.mp4" download></div>' +
            '</div>';
        angular.element(".alert-popup .popup-container").append(downloadButton);
    }
    else {
        angular.element(document.getElementsByClassName("alert-popup")).removeClass("playAd");
        angular.element(".alert-popup .popup-container").append("<div class='middleAlign'>Currently the selected training video is not available.</div>");
    }
}

function fileExists(url) {
    if (url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status == 200;
    }
    else {
        return false;
    }
}

function CommonLeftPanelFunction($scope, commonService, $http, $sce, $timeout, $compile) {

    $scope.bindCustomFilters = function (menusList) {
        let currentModuleName = $(".module-name").text().trim();
        let currentModuleId = selectedModuleId;
        let selectedList = CustomFilterMaster.filter(function (e) { return e.ModuleId.split(",").indexOf(currentModuleId.toString()) > -1 });
        let customList = [];
        if ((sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "")) {
            let widgetInfo = JSON.parse(sessionStorage.getItem("widgetInfo"));
            selectionObj = JSON.parse(widgetInfo.SelectionObj);
            if (selectionObj.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0)
                customList = $scope.getPKsAndName(selectionObj.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data, []).select("DisplayName");
        }
        else if (stickySelection.length > 0) {
            selectionObj = stickySelection.filter(function (e) { return e.DisplayName != "" });
            if (selectionObj.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0)
                customList = $scope.getPKsAndName(selectionObj.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data, []).select("DisplayName");
        }
        angular.forEach(selectedList, function (a, b) {
            let obj = a;
            obj.Filter = "ADDITIONAL FILTERS";
            obj.FilterID = a.FilterID;
            obj.IsSelectable = true;
            obj.IsLastLevel = true;
            obj.isSingle = true;
            obj.MetricName = a.Name,
                obj.hasChildSelected = customList.indexOf(a.Name) > -1 ? true : false;
            obj.hasSubMenusActive = customList.indexOf(a.Name) > -1 ? true : false;
            obj.MetricParentName = "Custom Filters",
                obj.data = [],
                obj.isDefaultLevel = false,
                obj.isSingle = false;
            obj.data = [];
            obj.DisplayName = a.Name;
            obj.title = a.SelectionSummary;
            //obj.ParentId = menusList.FilterID;
        })
        menusList.data = angular.copy(selectedList);
        applyToChild(menusList, ["isSingle"], true)
    }

    $scope.mutuallyExclusiveFilters = function (menusList, parentList) {
        if (parentList[1].DisplayName == "Custom Filters") {
            angular.forEach(parentList[0].data.filter(function (e) { return e.DisplayName != "Custom Filters" && e.DisplayName != "Sample Type" }), function (a, b) {
                a.hasChildSelected = false;
                a.hasSubMenusActive = false;
                a.isTabSelected = false;
                let list = ["hasChildSelected", "hasSubMenusActive", "isTabSelected"];
                applyToChild(a, list, false);
                //applyToChild(a, "hasSubMenusActive", false);
                //applyToChild(a, "isTabSelected", false);
            })
        }
        else if (parentList[1].DisplayName != "Sample Type") {
            let record = parentList[0].data.filter(function (e) { return e.DisplayName == "Custom Filters" })[0];
            if (record != undefined) {
                record.hasChildSelected = false;
                record.hasSubMenusActive = false;
                record.isTabSelected = false;
                let list = ["hasChildSelected", "hasSubMenusActive", "isTabSelected"];
                applyToChild(record, list, false);
            }
        }
    }

    $scope.mutuallyExclusiveChannelRetailers = function (menusList, parentList, field) {
        let index = parentList.select("DisplayName").findIndex(function (e) { return e.toUpperCase().indexOf(field.toUpperCase()) > -1 });
        if (parentList[index].isDefaultLevel) {
            index = parentList.filter(function (e) { return !e.isDefaultLevel }).select("DisplayName").findIndex(function (e) { return e.toUpperCase().indexOf(field.toUpperCase()) > -1 }) + 1;
        }
        let retIndex = parentList.select("DisplayName").findIndex(function (e) { return e.toUpperCase().indexOf("RETAILER") > -1 });
        let list = [];
        if (index > -1) {
            list = parentList[index - 1].data.filter(function (e) { return e.DisplayName.toUpperCase() != parentList[index].DisplayName.toUpperCase() && e.DisplayName.toUpperCase().indexOf(field.toUpperCase()) > -1 });
            if (selectedModuleId == "4") {
                if (parentList[index].DisplayName.toUpperCase().indexOf("CUSTOM") > -1) {
                    list = parentList[index - 1].data.filter(function (e) { return e.DisplayName.toUpperCase() != parentList[index].DisplayName.toUpperCase() && (e.DisplayName.toUpperCase().indexOf(field.toUpperCase()) > -1 || catList.map(function (r) { return r.toUpperCase() }).indexOf(e.DisplayName.toUpperCase()) > -1) })
                }
                else if (parentList[index].DisplayName.toUpperCase().indexOf("CUSTOM") == -1) {
                    list = parentList[index - 1].data.filter(function (e) { return e.DisplayName.toUpperCase() != parentList[index].DisplayName.toUpperCase() && (e.DisplayName.toUpperCase().indexOf(field.toUpperCase()) > -1 || catList.map(function (r) { return "CUSTOM " + r.toUpperCase() }).indexOf(e.DisplayName.toUpperCase()) > -1) })
                }
            }
            //if (field == "Channel" && parentList[index].DisplayName == "Custom Channel") {
            //    let isChannel = 1 ;
            //    if (customRetailersAttributeIds.indexOf(menusList.AttributetypeId) > -1)
            //        isChannel = 0;
            //    let getCustomRetailerList = [];
            //    let getCustomChannelList = parentList[index].data.filter(function (e) { return e.DisplayName != "Custom Group Retailer" && e.DisplayName.indexOf("Select All") == -1 });
            //    angular.forEach(parentList[index].data, function (a, b) {
            //        getCustomRetailerList = getCustomRetailerList.concat(a.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }));
            //        getCustomChannelList = getCustomChannelList.concat(a.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) == -1 }));
            //        angular.forEach(a.data, function (c, d) {
            //            if (c.data.length > 0) {
            //                getCustomRetailerList = getCustomRetailerList.concat(c.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 || e.DisplayName == "Select All"}));
            //            }
            //        })
            //    })
            //    if (isChannel) {
            //        getCustomRetailerList.filter(function (e) { return e.hasChildSelected = false });
            //        getCustomRetailerList.filter(function (e) { return e.hasSubMenusActive = false });                   
            //    }
            //    else {
            //        getCustomChannelList.filter(function (e) { return e.hasChildSelected = false });
            //        getCustomChannelList.filter(function (e) { return !$scope.hasChildSelected(e) }).filter(function (e) { return e.hasSubMenusActive = false });
            //    }
            //}
            if (selectedModuleId == "2" && field != "Channel") {
                let appendText = parentList[index].DisplayName.indexOf("Custom") > -1 ? "Survey " : "Custom ";
                list = parentList[index - 1].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(appendText.toUpperCase()) > -1 && (e.DisplayName.indexOf("Category") > -1 || e.DisplayName.indexOf("Item") > -1) });
            }
            //for retailer nets
            if (parentList[index].DisplayName.toUpperCase().indexOf("CHANNEL") > -1 && parentList[parentList.length - 2].DisplayName != "Custom Group Channel" && parentList[parentList.length - 2].DisplayName != "Custom Group Retailer") {
                list = parentList[index - 1].data.filter(function (e) { return (e.DisplayName.toUpperCase() != parentList[index].DisplayName.toUpperCase() && e.DisplayName.toUpperCase().indexOf(field.toUpperCase()) > -1) || e.DisplayName.toUpperCase().indexOf("RETAILER") > -1 });
            }
        }
        else if (retIndex > -1) {
            list = parentList[retIndex - 1].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("CHANNEL") > -1 });
        }
        angular.forEach(list, function (a, b) {
            a.hasChildSelected = false;
            a.hasSubMenusActive = false;
            a.isTabSelected = false;
            let list = ["hasChildSelected", "hasSubMenusActive", "isTabSelected"];
            applyToChild(a, list, false);
            //applyToChild(a, "hasChildSelected", false);
            //applyToChild(a, "hasSubMenusActive", false);
            //applyToChild(a, "isTabSelected", false);
            if (field.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") > -1) {
                angular.forEach(a.data, function (c, d) {
                    c.data = [];
                })
            }
            else if (catList.indexOf(a.DisplayName.replace("Custom ", "").replace("Survey ", "")) > -1) {
                a.data = [];
            }
        })
    }

    $scope.getPKsAndName = function (List, tempList, parentPK, parentName) {
        angular.forEach(List, function (value, index) {
            if (value != "" && value.Data.length != 0) {
                if (value.FilterID != undefined)
                    parentPK = value.FilterID;
                $scope.getPKsAndName(value.Data, tempList, parentPK, value.DisplayName);
            }
            else if (value != "" && (value.DisplayName.indexOf("Select All") == -1 /*|| (selectedModuleId != 3 && value.DisplayName.indexOf("Select All Markets") > -1) || (selectedModuleId == 3 && value.DisplayName.indexOf("Select All Markets") > -1 && getSelectedMainValues().Column != "Market")*/)) {
                tempList.push({ "FilterID": value.FilterID, "DisplayName": value.DisplayName, "parentPK": parentPK, "Parent": parentName, "IsItemLevel": value.IsItemLevel });
            }
        })
        return tempList;
    }

    $scope.multiTimePeriodValidation = function (timeList) {
        /*uncomment to enable consecutive time period validation start*/
        //if (timeList != undefined || selectedItems.some(function (e) { return e.DisplayName == "TIME PERIOD" })) {
        //    if (timeList == undefined)
        //        timeList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data, []).select("FilterID");
        //    if (timeList.length > 1) {
        //        let timePeriodType = timeperiodList.filter(function (e) { return e.FilterID == timeList[0] })[0].TimePeriodType;
        //        let actualTimeList = timeperiodList.filter(function (e) { return e.TimePeriodType == timePeriodType }).select("FilterID");
        //        let index = actualTimeList.findIndex(function (e) { return e == timeList[0] });
        //        if (!timeList.every(function (e) { return actualTimeList.slice(index, index + timeList.length).indexOf(e) > -1 }))
        //            return false;
        //    }
        //}
        /*uncomment to enable consecutive time period validation end*/
        return true;
    }

    //function to bind time period
    $scope.bindTimePeriod = function (isSingle) {
        var FirstLevel = timeperiodList.select("TimePeriodType").distinct(), temp = [];
        for (var i = 0; i < FirstLevel.length; i++) {
            var obj = {};
            obj.AttributeId = i + 1;
            obj.AttributetypeId = i + 1;
            obj.CountryID = 0;
            obj.DisplayName = FirstLevel[i];
            obj.Filter = "Time Period";
            obj.FilterID = i + 1;
            obj.IsLastLevel = false;
            obj.IsSelectable = false;
            obj.MetricName = FirstLevel[i];
            obj.MetricParentName = "Time Period";
            obj.ParentId = null;
            obj.SortID = i + 1;
            obj.isSingle = true;
            var internalData = timeperiodList.filter(function (e) { return e.TimePeriodType == FirstLevel[i] });
            var intData = [];
            for (var j = 0; j < internalData.length; j++) {
                var obj1 = {};
                obj1.AttributeId = j + 1;
                obj1.AttributetypeId = j + 1;
                obj1.CountryID = 0;
                obj1.DisplayName = internalData[j].DisplayName;
                obj1.Filter = "Time Period";
                obj1.FilterID = internalData[j].FilterID;
                obj1.IsLastLevel = true;
                obj1.IsSelectable = true;
                obj1.MetricName = internalData[j].DisplayName;
                obj1.MetricParentName = "Time Period";
                obj1.ParentId = i + 1;
                obj1.SortID = j + 1;
                obj1.isSingle = ((selectedModuleId == "3" && getSelectedMainValues().Column != "Time Period") || selectedModuleId != "3") && FirstLevel[i] == "Rolling 4 Quarter" ? true : isSingle;
                obj1.data = [];
                obj1.isDefaultLevel = false;
                intData.push(obj1);
            }
            if (FirstLevel[i] == "Annual" && temp[0].data[temp[0].data.length - 1].DisplayName.indexOf("Q4") == -1)
                intData.splice(intData.length - 1);
            obj.data = intData;
            obj.isDefaultLevel = false;
            //if (selectedModuleId == "3" && getSelectedMainValues().Column == "Time Period" && FirstLevel[i] == "YTD")
            //    obj.isDisabled = true;
            if (!intData[0].isSingle && FirstLevel[i] != "YTD") {
                let obj2 = {};
                obj2.AttributeId = 0,
                    obj2.AttributetypeId = 21,
                    obj2.CountryID = 0,
                    obj2.DisplayName = "Select All",
                    obj2.Filter = "TIME PERIOD",
                    obj2.FilterID = 0,
                    obj2.FilterLevel = null,
                    obj2.MetricName = "Select All",
                    obj2.MetricParentName = FirstLevel[i],
                    obj2.SortID = 0,
                    obj2.data = [],
                    obj2.isDefaultLevel = false,
                    obj2.isSingle = false;
                obj2.IsSelectable = true;
                obj2.IsLastLevel = true;
                obj2.ParentId = obj.FilterID;
                intData.unshift(obj2);
                obj.isGroupNeeded = true;
            }
            temp.push(obj);
        }
        return temp;
    }

    //function to bind Benchmark
    $scope.bindBenchmark = function (selectedTimePeriod) {
        let temp = [];
        var list = ["Previous Period", "Previous Year"];

        for (i = 0; i < list.length; i++) {
            let isDisabled = false;
            let timeperiodtype = "";
            if (selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data.length > 0)
                timeperiodtype = selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data[0].DisplayName;


            if (list[i] == "Previous Period") {
                if (timeList.length > 0 && (timeList.length > 1 || timeList[0].indexOf("YTD") > -1 || (timeperiodtype == "Rolling 4 Quarter") || timeperiodtype == "Annual"))
                    isDisabled = true;

                if (timeperiodtype == "COVID Quarter" && timeList.length == 1) {

                    let covidTime = timeList[0].split(' ');
                    let currTimeperiod = timeperiodList.filter(function (e) { return e.DisplayName == timeList[0] });
                    if (timeperiodList.filter(function (e) { return e.TimePeriodType == timeperiodtype && e.DisplayName.indexOf(covidTime[2]) > -1 && e.FilterID < currTimeperiod[0].FilterID }).length > 0) {
                        isDisabled = false;
                    }
                    else
                        isDisabled = true;
                }
            }
            if (list[i] == "Previous Year") {
                if (timeperiodtype != "YTD" && (timeList[0].indexOf("2019") > -1 || (timeperiodtype == "Rolling 4 Quarter")))
                    isDisabled = true;

                if (timeList.length > 1) {

                    let prevYearList = [];
                    if (timeperiodtype != "Annual") {
                        angular.forEach(timeList, function (a, b) {
                            let t = a.split(' ');
                            t[1] = t[1] - 1;
                            t = t.join(' ');
                            prevYearList.push(t);
                        })
                    }
                    else {
                        prevYearList = timeList.map(function (value) {
                            return value - 1;
                        });
                    }


                    let isValid = 1;

                    angular.forEach(prevYearList, function (a, b) {
                        if (isValid) {
                            if (timeperiodList.filter(function (e) { return e.TimePeriodType == timeperiodtype && e.DisplayName == a }).length == 0)
                                isValid = 0;
                        }
                    })

                    if (isValid)
                        isDisabled = false;
                    else
                        isDisabled = true;
                }
                else if (timeperiodtype == "COVID Quarter" && timeList.length == 1) {

                    let covidTime = timeList[0].split(' ');
                    let prevYear = covidTime[0] + " " + (covidTime[1] - 1) + " " + covidTime[2];
                    let currTimeperiod = timeperiodList.filter(function (e) { return e.DisplayName == timeList[0] });
                    if (timeperiodList.filter(function (e) { return e.TimePeriodType == timeperiodtype && e.DisplayName.indexOf(covidTime[2]) > -1 && e.FilterID < currTimeperiod[0].FilterID }).length > 0 && timeperiodList.filter(function (e) { return e.TimePeriodType == timeperiodtype && e.DisplayName == prevYear }).length > 0) {
                        isDisabled = false;
                    }
                    else
                        isDisabled = true;

                }
            }

            let timeGList = $scope.getPKsAndName(selectedItems.where(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data, []).select("FilterID").join(",");
            if (timeGList.indexOf("g") > -1) {
                isDisabled = true;
            }
            var obj = {};
            obj.AttributeId = i + 1;
            obj.AttributetypeId = i + 1;
            obj.CountryID = 0;
            obj.DisplayName = list[i];
            obj.Filter = "BENCHMARK";
            obj.FilterID = i + 1;
            obj.IsLastLevel = true;
            obj.IsSelectable = true;
            obj.MetricName = list[i];
            obj.MetricParentName = "BENCHMARK";
            obj.ParentId = null;
            obj.SortID = i + 1;
            obj.data = [];
            obj.isDefaultLevel = false;
            obj.isDisabled = isDisabled;
            obj.isSingle = true;
            if (list[i] == "Previous Period" && !isDisabled) {
                obj.hasChildSelected = true;
                obj.hasSubMenusActive = true;
                obj.isTabSelected = true;
            }
            else if (list[i] == "Previous Year" && !isDisabled && timeperiodtype.indexOf("Quarter") == -1) {
                obj.hasChildSelected = true;
                obj.hasSubMenusActive = true;
                obj.isTabSelected = true;
                let record = temp.filter(function (e) { return e.DisplayName == "Previous Period" });
                if (record != null) {
                    record[0].hasChildSelected = false;
                    record[0].hasSubMenusActive = false;
                    record[0].isTabSelected = false;
                }
            }
            temp.push(obj);
        }
        return temp;
    }

    //function to remove duplicates in case of multi market selections
    $scope.filterDups = function (list, n) {

        let filtered = [];
        if (list.some(function (e) { return e.IsCollapsible })) {
            let distinctList = list.filter(function (e) { return e.IsCollapsible }).sort(function (a, b) { return a.SortID - b.SortID }).select("DisplayName").map(function (x) { return x.toUpperCase() }).distinct();
            let count = distinctList.length;
            for (let i = 0; i < count; ++i) {
                let mainList = list.filter(function (e) { return e.DisplayName.toUpperCase() == distinctList[i].toUpperCase() });
                let parentIdList = mainList.select("FilterID");
                mainList[0].FilterID = mainList.select("FilterID").toString();
                mainList[0].CountryID = mainList.select("CountryID").toString();
                mainList[0].data = [];
                mainList[0].FilterID = mainList[0].FilterID.split(",").distinct().sort().join(",");
                mainList[0].CountryID = mainList[0].CountryID.split(",").distinct().sort().join(",");
                filtered.push(mainList[0]);
                var childList = list.filter(function (e) { return parentIdList.indexOf(e.ParentId) > -1 });
                childList = childList.filter(function (e) { return e.ParentId = parentIdList.distinct().join(",") });
                filtered = filtered.concat($scope.filterDups(childList, n))
            }
        }
        else {
            let distinctList = list.select("DisplayName");
            distinctList = distinctList.map(function (x) { return x.toUpperCase() }).distinct();
            let count = distinctList.length;
            for (let i = 0; i < count; ++i) {
                let mainList = list.filter(function (e) { return e.DisplayName.toUpperCase() == distinctList[i].toUpperCase() });
                mainList[0].FilterID = mainList.select("FilterID").toString();
                mainList[0].CountryID = mainList.select("CountryID").toString();
                mainList[0].data = mainList[0].data.concat.apply([], mainList.select("data")).sort(function (a, b) { return a.SortID - b.SortID });
                mainList[0].FilterID = mainList[0].FilterID.split(",").distinct().sort().toString();
                mainList[0].CountryID = mainList[0].CountryID.split(",").distinct().sort().toString();
                if (mainList.select("IsLastLevel").some(function (e) { return e == false }))
                    mainList[0].IsLastLevel = false;
                filtered.push(mainList[0]);
            }
        }

        if (filtered.filter(function (e) { return e.data.length > 0 }).length > 0) {
            let count = filtered.length - 1;
            for (var i = count; i >= 0; --i) {
                if (filtered[i].data.length > 0) {
                    filtered[i].data = $scope.filterDups(filtered[i].data, n);
                    if (filtered[i].data.length > 0 && !filtered[i].IsLastLevel)
                        filtered[i].IsLastLevel = false;
                    else
                        filtered[i].IsLastLevel = true;
                }
                else if (List5Ws.indexOf(filtered[i].DisplayName) == -1)
                    filtered[i].IsLastLevel = true;
            }
        }

        filtered = filtered.filter(function (d) { return (d.IsLastLevel == 1 || d.data.length > 0 || d.IsCollapsible || List5Ws.indexOf(d.DisplayName) > -1) });
        return filtered;
    }

    $scope.modifyMarketDependency = function (actualData, countryIds, menusList, parentList) {

        actualData = actualData.filter(function (e) { return e.CountryID == 0 || countryIds.indexOf(e.CountryID) > -1 });
        if (menusList != undefined) {
            if (actualData[0].Filter != "5Ws" || !isSearchFlag || (isSearchFlag = 1 && bindParentName != "" && bindParentName.DisplayName == menusList.DisplayName)) {
                menusList.data = actualData;
            }
            if (menusList.isGroupNeeded) {
                $scope.addCustomGroup(menusList, parentList)
            }
            if (actualData.length > 0 && actualData[0].Filter == "5Ws") {
                if (actualData[0].MetricParentName == "5Ws") {
                    let list = actualData.filter(function (e) { return ["WHEN", "PURCHASE", "COVID BEHAVIOURS"].indexOf(e.DisplayName.toUpperCase()) > -1 });
                    angular.forEach(list, function (val, ind) {
                        val.data.filter(function (e) { return groupNeeded5Ws.indexOf(e.DisplayName.toUpperCase()) > -1 }).filter(function (e) { return e.isGroupNeeded = true });
                    })
                    actualData.filter(function (e) { return e.DisplayName == "Activities" || e.DisplayName == "Shopper Mission" }).filter(function (e) { return e.isGroupNeeded = true });
                    List5Ws = LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "5WS" })[0].data.select("DisplayName").distinct();
                }
                if (List5Ws.indexOf(actualData[0].MetricParentName) > -1) {
                    actualData.filter(function (e) { return groupNeeded5Ws.indexOf(e.DisplayName.toUpperCase()) > -1 }).filter(function (e) { return e.isGroupNeeded = true });
                }
            }
            if (menusList.isGroupNeeded)
                actualData = menusList.data;
        }
        return actualData;
    }

    //function to reset left panel tabs
    $scope.resetSelections = function (notToBeClearedList) {
        parent_Scope = angular.element("#left-pane-container").scope();
        List = parent_Scope.LeftStaticMenu.where(function (e) { return notToBeClearedList.indexOf(e.DisplayName) == -1 && e.hasChild });
        List.where(function (e) { return e.data = [] });
        if (selectedItems.length > 0) {
            selectedItems = selectedItems.where(function (e) { return notToBeClearedList.indexOf(e.DisplayName) > -1 });
            var selContent = $scope.formSelectionSummary(selectedItems, leftPanel_Parents.filter(function (e) { return e.hasChild }));
            angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
        }
        leftPanel_Parents.where(function (e) { return notToBeClearedList.indexOf(e.DisplayName) == -1 }).where(function (e) { return e.selections = "None" });
    }

    //function to update selections in left panel (None or Multiple)
    $scope.updateLeftMenuSelections = function (selectionObj, List) {
        var selCount = 0, selName = "";
        angular.forEach(List, function (a, b) {
            if (selectionObj.length > 0 && selectionObj.where(function (e) { return e.DisplayName == a.DisplayName }).length > 0) {
                let tempList = selectionObj.where(function (e) { return e.DisplayName == a.DisplayName })[0].Data;
                let pkList = $scope.getPKsAndName(tempList, []);
                selCount = pkList.length;
                if (selCount == 1)
                    selName = pkList[0].DisplayName;
            }
            index = leftPanel_Parents.findIndex(function (e, f) { return e.DisplayName == a.DisplayName });
            leftPanel_Parents[index].selections = "None";
            if (index > -1) {
                if (selCount > 1)
                    leftPanel_Parents[index].selections = "Multiple";
                else if (selCount == 0) {
                    leftPanel_Parents[index].selections = "None";
                }
                else
                    leftPanel_Parents[index].selections = selName;
            }
        })
    }

    //function to select necessary action on selected tab
    $scope.checkIsLastLevel = function (menusList, parentList, scope) {
        if (menusList.IsCollapsible)
            $scope.showBrands(menusList, parentList, scope)
        else if (menusList.IsLastLevel && !menusList.isDefaultLevel)
            $scope.menu_Tab_Click(menusList, parentList, scope, 1);
        else
            $scope.next_Level_Click(menusList, parentList, scope);
    }


    //function to clear all selections in left panel
    $scope.left_panel_clearAll = function () {
        angular.element(document.getElementsByClassName("footerContent")).hide();
        angular.element(document.getElementsByClassName("innerFooterContent")).hide();
        angular.element(document.getElementsByClassName("output-container")).hide();
        angular.element(document.getElementsByClassName("drilldown-container")).hide();
        angular.element(document.getElementsByClassName("footerNote")).show();
        angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
        angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
        angular.element(document.getElementsByClassName("excelDiv")).addClass("disableSelection");
        angular.element(document.getElementsByClassName("pptDiv")).addClass("disableSelection");
        angular.element(document.getElementsByClassName("save_filter_icon")).addClass("disableSelection");
        angular.element(document.querySelectorAll(".header-center")).html('');
        angular.element("body > .nicescroll-rails").remove();
        angular.element(document.querySelectorAll(".header-center")).html('');
        if (!$scope.leftMenuIsHidden)
            $scope.leftPanelToggle();
        if (selectedModuleId == 3)
            $scope.resetSelections(["TABLE STRUCTURE", "TABLE CONTENT"]);
        else
            $scope.resetSelections([]);
        if ($scope.LeftStaticMenu != undefined && $scope.LeftStaticMenu.length > 0) {
            var List = $scope.LeftStaticMenu.where(function (e) { return e.hasChild });
            angular.forEach(List, function (a, b) {
                applyToChild(a, ["isTabSelected"], false);
            })
        }
    }

    /*function to bind selection summary*/
    $scope.formSelectionSummary = function (filterSelectionObj, List) {
        var summary = "";
        if (filterSelectionObj.length == 0)
            return false;
        //let selectedOpportunity = "";
        //if (selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" }).length > 0)
        //    selectedOpportunity = selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data[0].DisplayName;
        angular.forEach(List, function (a, b) {
            var itemSelection = "";
            appendData1 = "";
            data = [];
            if (filterSelectionObj.where(function (e) { return e.DisplayName == a.DisplayName }).length > 0 && filterSelectionObj.where(function (e) { return e.DisplayName == a.DisplayName })[0].Data.length > 0) {
                data = filterSelectionObj.where(function (e) { return e.DisplayName == a.DisplayName })[0].Data;
            }
            else if (a.DisplayName == "RETAIL SALES VALUE") {
                let opportunitySelections = selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" || e.DisplayName == "CHANNEL/RETAILER" || e.DisplayName == "CATEGORY/ITEM MANUFACTURER" });
                /* get selected opportunity end*/

                if (opportunitySelections.length > 0) {
                    let list = $scope.getPKsAndName(opportunitySelections, []);
                    angular.forEach(list, function (a, b) {
                        let val = $("#" + a.DisplayName.replace(/[ ]/gi, '').replace(/[,]/gi, '').replace(/[/]/gi, '').replace(/[']/gi, '').replace(/[(]/gi, '').replace(/[)]/gi, '').replace(/[&]/gi, '').replace(/[%]/gi, '').replace(/[.]/gi, '').toLowerCase()).val();
                        if (val != "" && val != undefined) {
                            let enteredValue = $("#" + a.DisplayName.replace(/[ ]/gi, '').replace(/[ ]/gi, '').replace(/[,]/gi, '').replace(/[/]/gi, '').replace(/[']/gi, '').replace(/[(]/gi, '').replace(/[)]/gi, '').replace(/[&]/gi, '').replace(/[%]/gi, '').replace(/[.]/gi, '').toLowerCase()).val();
                            itemSelection += a.DisplayName + ': ' + enteredValue + ", ";
                        }
                    })
                }
            }
            angular.forEach(data, function (dataValue, dataIndex) {
                lvl1LabelNameList = data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }).select("DisplayName").distinct();
                //lvl1LabelNameList = data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 || (selectedModuleId != 3 && e.DisplayName.indexOf("Select All Markets") > -1) || (selectedModuleId == 3 && e.DisplayName.indexOf("Select All Markets") > -1 && getSelectedMainValues().Column != "Market") }).select("DisplayName").distinct();
                appendData1 = "";
                angular.forEach(lvl1LabelNameList, function (val, ind) {
                    //if (selectedOpportunity == "Brand" && a.DisplayName == "CATEGORY/ITEM/BRAND")
                    //    internalData = getSummaryTextCustom(data, val);
                    //else
                    internalData = data.where(function (e) { return e.DisplayName == val })[0].Data;
                    appendData1 += internalData == undefined || internalData.length == 0 ? val + ', ' : val + ": ";
                    if (internalData != undefined && internalData.length > 0)
                        appendData1 += (val == "Custom Filters" ? $scope.getSummaryText(internalData).substring(0, $scope.getSummaryText(internalData).length - 2) + " (" + CustomFilterMaster.filter(function (e) { return e.FilterID == internalData[0].FilterID && e.Name == internalData[0].DisplayName })[0].SelectionSummary + ") ," : $scope.getSummaryText(internalData)); //recursive call to handle selection summary

                })
                itemSelection = appendData1;
            });
            if (itemSelection != "") {
                itemSelection = itemSelection.substring(0, itemSelection.trim().length - 1);
                if (itemSelection.indexOf("Select All Markets") > -1)
                    itemSelection = itemSelection.replace("Select ", "");
                if (b == 0)
                    summary = summary + "<span>" + a.DisplayName + ": </span>" + itemSelection;
                else
                    summary = summary + " || <span>" + a.DisplayName + ": </span>" + itemSelection;
            }
            if (a.DisplayName == "REPORT" && itemSelection == "Occasions Trend Report") {
                summary = summary + " || <span>YOY TIMEPERIOD: </span>" + yoyName;
            }
        });
        if (filterSelectionObj.length > 0)
            return summary;
        else
            return "";
    }

    //function to handle selection summary
    $scope.getSummaryText = function (internalData) {
        let appendData = '';
        angular.forEach(internalData, function (val, ind) {
            if (val.DisplayName.indexOf("Select All") == -1) {
                internalData1 = internalData.where(function (e) { return e.DisplayName == val.DisplayName })[0].Data;
                appendData += internalData1.length == 0 ? val.DisplayName + ', ' : val.DisplayName + ": ";
                if (internalData1.length > 0)
                    appendData += $scope.getSummaryText(internalData1);
            }
        });
        return appendData;
    }

    //function to handle single select tabs
    $scope.singleSelectClick = function (menusList, parentList) {
        angular.forEach(parentList[parentList.length - 2].data, function (value, index) {
            if (value.hasSubMenusActive)
                $scope.deselectingAllChilds(value)
            if (value.DisplayName != menusList.DisplayName) {
                value.hasSubMenusActive = false;
                value.isTabSelected = false;
                value.hasChildSelected = false;
            }
            else {
                value.hasSubMenusActive = !value.hasSubMenusActive;
                value.isTabSelected = !value.isTabSelected;
                //value.hasChildSelected = !value.hasChildSelected;
            }
        });
    }

    //function to remove selections till last level
    $scope.deselectingAllChilds = function (menusList) {
        let list = ["hasChildSelected", "isTabSelected", "hasSubMenusActive"];
        applyToChild(menusList, list, false);
        //applyToChild(menusList, "hasChildSelected", false);
        //applyToChild(menusList, "isTabSelected", false);
        //applyToChild(menusList, "hasSubMenusActive", false);
    }

    $scope.searchSingleClick = function (parentList, i) {
        angular.forEach(parentList[i].data, function (value, index) {
            if (value.hasSubMenusActive && value.isSingle) {
                if (parentList[i + 1] == undefined || value.DisplayName != parentList[i + 1].DisplayName) {
                    value.hasChildSelected = false;
                    value.isTabSelected = false;
                    value.hasSubMenusActive = false;
                    let list = ["hasChildSelected", "isTabSelected", "hasSubMenusActive"];
                    applyToChild(value, list, false);
                    //applyToChild(value, "isTabSelected", false);
                    //applyToChild(value, "hasSubMenusActive", false);
                }
                else {
                    $scope.searchSingleClick(parentList, i + 1)
                }
            }
        });
    }

    $scope.searchItemClick = function (menusList, parentList, item, searchText) {
        item = item.replace(new RegExp("<strong>", 'gi'), "").replace(new RegExp("</strong>", 'gi'), "");
        let itemList = item.split(" : ");
        let newParentList = parentList;
        newParentList = newParentList.filter(function (e) { return e.hasChildSelected = true });
        let newMenusList = menusList;
        let verticalId = "";
        let terminateFlag = 0;
        applyToChild(newMenusList, ["isTabSelected"], false);
        angular.forEach(itemList, function (value, index) {
            if (newMenusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == value.toUpperCase() && !e.IsCollapsible })[0] != undefined) {
                if (newMenusList.isSingle) {
                    $scope.searchSingleClick(newParentList, 0);
                    if (!newMenusList.isDefaultLevel) {
                        selectedItems = $scope.getSelectedItems($scope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
                        List = [];
                        List.push(newParentList[0]);
                        $scope.updateLeftMenuSelections(selectedItems, List);
                        var selContent = $scope.formSelectionSummary(selectedItems, leftPanel_Parents.filter(function (e) { return e.hasChild }));
                        angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
                    }
                }
                let tempList = [];
                if (verticalId != "") {
                    tempList = newMenusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == value.toUpperCase() && verticalId == e.ParentId })[0];
                    if (tempList == undefined)
                        tempList = newMenusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == value.toUpperCase() })[0];
                }
                else
                    tempList = newMenusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == value.toUpperCase() })[0];

                if (tempList.data.length == 0 && tempList.hasChildSelected) {
                    searchText.text = "";
                    terminateFlag = 1;
                    angular.element("li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul > li[ng-name='search'] .search-item-container").getNiceScroll().remove();
                    return false;
                }
                if (!tempList.IsSelectable)
                    tempList.hasChildSelected = true;
                newParentList.push(tempList);
                newMenusList = tempList;
                //$scope.menu_Tab_Click(newMenusList, newParentList);
            }
            else {
                if (newMenusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == value.toUpperCase() && e.IsCollapsible })[0] != undefined) {
                    verticalId = newMenusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == value.toUpperCase() && e.IsCollapsible })[0].FilterID;
                    angular.forEach(newMenusList.data.where(function (e) { return e.IsCollapsible }), function (a, b) { //for collapsing other verticals @vj
                        let tempList = newMenusList.data.where(function (e) { return e.IsCollapsible == null && e.ParentId == a.FilterID });
                        angular.forEach(tempList, function (c, d) {
                            c.IsHidden = true;
                            c.isTabSelected = false;
                            if (c.data.length > 0 && !c.data.some(function (e) { return e.hasChildSelected == true })) {
                                c.hasChildSelected = false;
                                c.hasSubMenusActive = false;
                            }
                        })
                        a.IsExpanded = false;
                    });
                    newMenusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == value.toUpperCase() && e.IsCollapsible && e.FilterID == verticalId })[0].IsExpanded = true; //for expanding the vertical @vj
                    angular.forEach(newMenusList.data.filter(function (e) { return !e.IsCollapsible && e.ParentId == verticalId }), function (a, b) {
                        a.IsHidden = false;//for displaying brands under vertical @vj
                    })
                }
            }
        })
        if (terminateFlag) {
            angular.element("li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul > li[ng-name='search'] .search-item-container").getNiceScroll().remove();
            return false;
        }

        newParentList[newParentList.length - 2].hasSubMenusActive = true;
        if (!(newMenusList.data.length > 0 && newMenusList.IsSelectable)) {
            if (newParentList[newParentList.length - 3] != undefined)
                newParentList[newParentList.length - 3].data.filter(function (e) { return e.isTabSelected = false })
        }
        angular.element("li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul > li[ng-name='search'] .search-item-container").getNiceScroll().remove();
        $scope.menu_Tab_Click(newMenusList, newParentList, undefined, 0);
        searchText.text = "";
    }

    $scope.returnCountryIds = function () {
        let ids = [];
        let marketData = selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" });
        if ((selectedModuleId != 4 && marketData.length > 0) || (selectedModuleId == 4 && marketData.length > 0 && marketData[0].Data.filter(function (e) { return e.DisplayName != "Select All Markets" }).length > 0)) {
            marketData = marketData[0].Data;
            let marketList = LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "MARKETS" })[0].data;
            angular.forEach(marketData, function (a, b) {
                if (a.Data.length == 0)
                    ids = ids.concat(marketList.filter(function (e) { return e.DisplayName == a.DisplayName })[0].data.select("CountryID"));
                else
                    ids = ids.concat(a.Data.select("CountryID"));
            })
        }
        if (ids.length == 0) {
            ids = MarketRegionList.filter(function (e) { return !e.isDisabled }).select("MarketId");
        }
        return ids;
    }

    $scope.showBrands = function (menusList, parentList, scope) {
        isExpanded = menusList.IsExpanded;
        let index = parentList.length - 2;
        angular.forEach(parentList[index].data.where(function (e) { return e.IsCollapsible }), function (a, b) {
            let tempList = parentList[index].data.where(function (e) { return e.IsCollapsible == null && (a.FilterID.toString().split(",").indexOf(e.ParentId.toString()) > -1 || e.ParentId == a.FilterID) });
            angular.forEach(tempList, function (c, d) {
                c.IsHidden = true;
                c.isTabSelected = false;
                if (c.data.length > 0 && !c.data.some(function (e) { return e.hasChildSelected == true })) {
                    c.hasChildSelected = false;
                    c.hasSubMenusActive = false;
                }
            })
            a.IsExpanded = false;
        });
        if (!isExpanded) {
            let tempList = parentList[index].data.where(function (e) { return e.IsCollapsible == null && (menusList.FilterID.toString().split(",").indexOf(e.ParentId.toString()) > -1 || e.ParentId == menusList.FilterID) });
            angular.forEach(tempList, function (a, b) {
                a.IsHidden = false;
            })
            menusList.IsExpanded = true;
            if (selectedModuleId == 4 || selectedModuleId == 5) {
                var unique = {};
                var distinct = [];
                parentList[index].data.forEach(function (x) {
                    if (!unique[x.MetricParentName]) {
                        distinct.push(x.MetricParentName);
                        unique[x.MetricParentName] = true;
                    }
                });
            }
        }
        else {
            let tempList = parentList[index].data.where(function (e) { return e.IsCollapsible == null && (menusList.FilterID.toString().split(",").indexOf(e.ParentId.toString()) > -1 || e.ParentId == menusList.FilterID) });
            angular.forEach(tempList, function (a, b) {
                a.IsHidden = true;
            })
            menusList.IsExpanded = false;
        }
        $timeout(function () {
            SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[1].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "']").parent(), "#D31245", 0, 0, 0, 0, 3, false);
        })
    }

    $scope.getTrustedHtml = function (item) {
        return $sce.trustAsHtml(item);
    }

    $scope.returnTitle = function (menusList, parentList, event) {
        if (menusList.MetricParentName.toUpperCase() == "SHOPPER MISSION" && customTitle.select("DisplayName").indexOf(menusList.DisplayName.toUpperCase()) > -1)
            return customTitle.filter(function (e) { return e.DisplayName == menusList.DisplayName.toUpperCase() })[0].Title;
        else if (menusList.MetricParentName.indexOf('Custom Group') > -1 && typeof (CustomGroupMaster) != "string" && CustomGroupMaster.length > 0)
            return CustomGroupMaster.filter(function (e) { return e.GroupName == menusList.DisplayName })[0].SelectionSummary;
        else
            return menusList.DisplayName;
    }
    $scope.returnIsExceptionOrNot = function (menusList, parentList) {
        if (parentList.select("MetricName").distinct().diff(exceptionMetricList.select("MetricParentName").distinct()).length < parentList.select("MetricName").distinct().length)
            return true;
        else
            return false;
    }

    //function to get list of all selections
    $scope.getSelectedItems = function (list) {
        let tempList = [];
        //angular.forEach(list.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), function (value, index) {
        angular.forEach(list, function (value, index) {
            let newList = {};
            newList.DisplayName = "";
            if ((value.hasChildSelected && value.IsSelectable && !value.IsCollapsible) || $scope.hasChildSelected(value, 0)) {
                if (value.data.length != 0) {
                    newList.DisplayName = value.DisplayName;
                    newList.Data = $scope.getSelectedItems(value.data);
                    if (value.FilterID != undefined)
                        newList.FilterID = value.FilterID;
                    newList.CountryID = value.CountryID;
                    newList.hasSubMenusActive = value.hasSubMenusActive;
                    newList.hasChildSelected = value.hasChildSelected;
                    newList.ParentId = value.ParentId;
                    newList.IsItemLevel = value.IsItemLevel == undefined ? false : value.IsItemLevel;
                }
                else if (value.hasSubMenusActive) {
                    newList.DisplayName += value.DisplayName;
                    newList.FilterID = value.FilterID;
                    newList.CountryID = value.CountryID;
                    newList.hasSubMenusActive = value.hasSubMenusActive;
                    newList.hasChildSelected = value.hasChildSelected;
                    newList.ParentId = value.ParentId;
                    newList.IsItemLevel = value.IsItemLevel == undefined ? false : value.IsItemLevel;
                    newList.Data = [];
                }
                tempList.push(newList);
            }
        })
        return tempList;
    }

    //function to update selections in left panel (None or Multiple)
    $scope.updateLeftMenuSelections = function (selectionObj, List) {
        var selCount = 0, selName = "";
        angular.forEach(List, function (a, b) {
            if (selectionObj.length > 0 && selectionObj.where(function (e) { return e.DisplayName == a.DisplayName }).length > 0) {
                let tempList = selectionObj.where(function (e) { return e.DisplayName == a.DisplayName })[0].Data;
                let pkList = $scope.getPKsAndName(tempList, []);
                selCount = pkList.length;
                if (selCount == 1)
                    selName = pkList[0].DisplayName;
            }
            index = leftPanel_Parents.findIndex(function (e, f) { return e.DisplayName == a.DisplayName });
            leftPanel_Parents[index].selections = "None";
            if (index > -1) {
                if (selCount > 1)
                    leftPanel_Parents[index].selections = "Multiple";
                else if (selCount == 0) {
                    leftPanel_Parents[index].selections = "None";
                }
                else
                    leftPanel_Parents[index].selections = selName;
            }
        })

    }

    //function to know if child is selected at any level or not
    $scope.hasChildSelected = function (value, flag) {
        angular.forEach(value.data, function (a, b) {
            if (a.hasChildSelected && a.IsSelectable)
                flag = 1;
            else {
                if (a.data.length > 0) {
                    if ($scope.hasChildSelected(a, flag))
                        flag = 1;
                }
            }
        })
        if (flag)
            return true;
        else
            return false;
    }

    $scope.clickOnSelectAll = function (menusList, parentList) {
        let noOfSelectSelected = 0;
        if (parentList[parentList.length - 2] != undefined)
            noOfSelectSelected = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.hasSubMenusActive && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).length;
        if (menusList.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 || selectAllList.indexOf(menusList.DisplayName.toUpperCase()) > -1) {
            //if ((selectedModuleId == 2 && menusList.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") == -1 && selectAllList.indexOf(menusList.DisplayName.toUpperCase()) > -1) || (selectedModuleId != 2 && menusList.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 || selectAllList.indexOf(menusList.DisplayName.toUpperCase()) > -1)) {
            let value = true;
            var isDeselected = false;
            if (menusList.hasChildSelected == true)
                value = false;
            if (!value)
                isDeselected = true;
            if ((menusList.DisplayName.toUpperCase() == "SELECT ALL YES" || menusList.DisplayName.toUpperCase() == "SELECT ALL NO") && noOfSelectSelected != 0)
                value = true;
            angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled && e.DisplayName.indexOf("Custom Group") == -1 }), function (a, b) {
                let modifyRetailer = true;
                if ((menusList.DisplayName.toUpperCase() == "SELECT ALL CUSTOM RETAILERS" || menusList.DisplayName.toUpperCase() == "SELECT ALL RETAILERS") && parentList[parentList.length - 2].DisplayName == "Custom Channel") {
                    angular.forEach(a.data.filter(function (e) { return !e.isDisabled }), function (c, d) {
                        c.isTabSelected = false;
                        if (c.data.length > 0) {
                            c.hasSubMenusActive = value;
                            angular.forEach(c.data.filter(function (e) { return (!e.isDisabled && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1) || e.DisplayName == "Select All" }), function (e, f) {
                                e.hasChildSelected = value;
                                e.hasSubMenusActive = value;
                            })
                        }
                        else if (customRetailersAttributeIds.indexOf(c.AttributetypeId) > -1) {
                            c.hasChildSelected = value;
                            c.hasSubMenusActive = value;
                        }
                        else {
                            modifyRetailer = false;
                        }
                    })
                }
                else if (a.DisplayName.toUpperCase() != "COVID SCHOOLING") {
                    let list = ["hasSubMenusActive", "hasChildSelected"];
                    applyToChild(a, list, value);
                    //   applyToChild(a, "hasChildSelected", value);
                    applyToChild(a, ["isTabSelected"], false);
                }
                if ((a.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase()) && modifyRetailer) {
                    a.hasChildSelected = false;
                    a.hasSubMenusActive = value;
                    a.isTabSelected = false;
                }
                if (menusList.DisplayName.indexOf("Retailers") > -1 && a.DisplayName == "Custom Group Channel") {
                    let list = ["hasSubMenusActive", "hasChildSelected", "isTabSelected"];
                    applyToChild(a, list, false);
                    //applyToChild(a, "hasChildSelected", false);
                    //applyToChild(a, "isTabSelected", false);
                }
            })

            if (menusList.DisplayName.indexOf("Select All") > -1 && menusList.DisplayName.indexOf("Retailers") > -1) {
                let record = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName == "Custom Group Channel" })[0];
                if (record != undefined) {
                    record.hasChildSelected = false;
                    record.hasSubMenusActive = false;
                    let list = ["hasSubMenusActive", "hasChildSelected"];
                    applyToChild(record, list, false);
                }
            }
            if (parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 }).length > 0) {
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 })[0].hasChildSelected = false;
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 })[0].isTabSelected = false;
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 })[0].hasSubMenusActive = false;
            }
            else if ((menusList.DisplayName.toUpperCase() == "SELECT ALL YES" || menusList.DisplayName.toUpperCase() == "SELECT ALL NO") && noOfSelectSelected != 0) {
                let temp = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() });
                temp.filter(function (e) { return e.hasChildSelected = true });
                temp.filter(function (e) { return e.isTabSelected = true });
                temp.filter(function (e) { return e.hasSubMenusActive = true });

                if (!isDeselected)
                    noOfSelectSelected++;
            }
            else if (parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).length > 0) {
                let temp = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() });
                temp.filter(function (e) { return e.hasChildSelected = false });
                temp.filter(function (e) { return e.isTabSelected = false });
                temp.filter(function (e) { return e.hasSubMenusActive = false });
            }
        }
        else if (menusList.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && menusList.DisplayName.toUpperCase() != "SELECT ALL MARKETS" && !menusList.isSingle) {
            let value = true;
            if (menusList.hasChildSelected == true)
                value = false;
            if (menusList.ExtraPadding)
                list = parentList[parentList.length - 2].data.filter(function (e) { return e.ParentId == menusList.ParentId && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled });
            else
                list = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled });
            angular.forEach(list.filter(function (e) { return e.DisplayName.indexOf("Custom Group") == -1 }), function (a, b) {
                if (a.IsSelectable) {
                    a.hasChildSelected = value;
                    a.hasSubMenusActive = value;
                    a.isTabSelected = false;
                }
                else {
                    let propertyList = ["hasSubMenusActive", "hasChildSelected"];
                    applyToChild(a, propertyList, value);
                    //   applyToChild(a, "hasChildSelected", value);
                    applyToChild(a, ["isTabSelected"], false);
                    if (a.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase()) {
                        a.hasChildSelected = false;
                        a.hasSubMenusActive = value;
                        a.isTabSelected = false;
                    }
                }

            })

            if (menusList.DisplayName.toUpperCase() == "SELECT ALL REGIONS") {
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].hasChildSelected = false;
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].isTabSelected = false;
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].hasSubMenusActive = false;
                angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }), function (a, b) {
                    let list = ["hasSubMenusActive", "hasChildSelected", "isTabSelected"];
                    applyToChild(a, list, false);
                    //applyToChild(a, "hasChildSelected", false);
                    //applyToChild(a, "isTabSelected", false);
                    a.hasChildSelected = value;
                    a.hasSubMenusActive = value;
                    a.isTabSelected = false;
                })
            }
            else if (menusList.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL ") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).length > 0) {
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.hasChildSelected = false });
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.isTabSelected = false });
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.hasSubMenusActive = false });
            }
            else if (menusList.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && parentList[parentList.length - 3] != undefined && parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).length > 0) {
                parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.hasChildSelected = false });
                parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.isTabSelected = false });
                parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.hasSubMenusActive = false });
            }
        }
        else if (parentList[parentList.length - 2] != undefined && parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 }).length > 0 && parentList[parentList.length - 2].data.filter(function (e) { return e.FilterID == menusList.FilterID && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 }).length > 0 && !menusList.isSingle) {
            let record = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName == "Custom Group Retailer" })[0];
            if (record != undefined && parentList.select("DisplayName").indexOf("Retailer Nets") > -1) {
                record.hasSubMenusActive = false;
                record.hasChildSelected = false;
                record.data.filter(function (e) { return e.hasChildSelected = false });
                record.data.filter(function (e) { return e.hasSubMenusActive = false });
            }
            let totalCount = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
            let selectedCount = parentList[parentList.length - 2].data.filter(function (e) { return e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
            if (menusList.ExtraPadding) {
                totalCount = parentList[parentList.length - 2].data.filter(function (e) { return e.ParentId == menusList.ParentId && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
                selectedCount = parentList[parentList.length - 2].data.filter(function (e) { return e.ParentId == menusList.ParentId && e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
            }
            if (parentList[parentList.length - 3] == undefined && parentList[0].DisplayName == "MARKETS") {
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].hasChildSelected = false;
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].isTabSelected = false;
                parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].hasSubMenusActive = false;
                tempRecord = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 })[0];
            }
            else if (parentList[parentList.length - 2].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length > 0) {
                angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL ") > -1 }), function (a, b) {
                    a.hasChildSelected = false;
                    a.isTabSelected = false;
                    a.hasSubMenusActive = false;
                })
                tempRecord = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 })[0];
            }
            else if (menusList.ExtraPadding)
                tempRecord = parentList[parentList.length - 2].data.filter(function (e) { return e.ParentId == menusList.ParentId && e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 })[0];
            else {
                //angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && !e.IsSelectable }), function (val, ind) {
                //    totalCount += val.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
                //    selectedCount += val.data.filter(function (e) { return e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
                //})
                tempRecord = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 })[0];
            }
            if (tempRecord != undefined) {
                if (!menusList.hasChildSelected && selectedCount + 1 == totalCount) {
                    tempRecord.hasChildSelected = true;
                    tempRecord.hasSubMenusActive = true;
                    tempRecord.isTabSelected = true;
                }
                else {
                    tempRecord.hasChildSelected = false;
                    tempRecord.hasSubMenusActive = false;
                    tempRecord.isTabSelected = false;
                }
            }
        }
        else if (parentList[parentList.length - 3] != undefined && parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 }).length > 0 && !menusList.isSingle && parentList[parentList.length - 3].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length == 0) {
            if (parentList.select("DisplayName").indexOf("Retailer Nets") > -1) {
                if (parentList[parentList.length - 2].DisplayName == "Custom Group Retailer" && parentList.select("DisplayName").indexOf("Retailer Nets") > -1) {
                    angular.forEach(parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName != "Custom Group Retailer" }), function (a, b) {
                        a.hasChildSelected = false;
                        if (!a.data.some(function (e) { return e.hasSubMenusActive }))
                            a.hasSubMenusActive = false;
                        if (a.DisplayName == "Custom Group Channel") {
                            a.hasSubMenusActive = false;
                            a.data.filter(function (e) { return e.hasChildSelected = false });
                            a.data.filter(function (e) { return e.hasSubMenusActive = false });
                        }
                    })
                }
                else if (parentList[parentList.length - 2].DisplayName == "Custom Group Channel") {
                    angular.forEach(parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName != "Custom Group Channel" }), function (a, b) {
                        if (!a.hasChildSelected || a.DisplayName.indexOf("Select All") > -1 || a.DisplayName == "Custom Group Retailer") {
                            a.hasChildSelected = false;
                            a.hasSubMenusActive = false;
                        }
                        let list = ["hasSubMenusActive", "hasChildSelected"];
                        applyToChild(a, list, false);
                        //    applyToChild(a, "hasChildSelected", false);
                    })
                }
            }
            let totalCount = parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
            let selectedCount = parentList[parentList.length - 3].data.filter(function (e) { return e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;

            angular.forEach(parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && !e.IsSelectable && e.DisplayName.indexOf("Custom Group") == -1 }), function (val, ind) {
                totalCount += val.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
                selectedCount += val.data.filter(function (e) { return e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
            })
            tempRecord = parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 })[0];

            if (tempRecord != undefined) {
                if ((!menusList.hasChildSelected && selectedCount + 1 == totalCount) || (selectedCount == totalCount && parentList.select("DisplayName").indexOf("Retailer Nets") > -1)) {
                    tempRecord.hasChildSelected = true;
                    tempRecord.hasSubMenusActive = true;
                    tempRecord.isTabSelected = true;
                }
                else if (parentList.length > 1 && parentList[parentList.length - 2].DisplayName.indexOf("Custom Group") == -1) {
                    tempRecord.hasChildSelected = false;
                    tempRecord.hasSubMenusActive = false;
                    tempRecord.isTabSelected = false;
                }
            }
        }

        if (menusList.DisplayName.toUpperCase() == "SELECT ALL YES" || menusList.DisplayName.toUpperCase() == "SELECT ALL NO") {

            if (noOfSelectSelected < 2) {
                let quesData = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 });
                let ans = "NO(";
                if (menusList.DisplayName.toUpperCase() == "SELECT ALL YES") {
                    if (isDeselected)
                        ans = "YES("
                }
                else {
                    if (!isDeselected)
                        ans = "YES("
                }
                angular.forEach(quesData, function (a, b) {

                    angular.forEach(a.data, function (c, d) {

                        let temp = c.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(ans) > -1 });

                        if (temp.length > 0) {
                            temp[0].isTabSelected = false;
                            temp[0].hasChildSelected = false;
                            temp[0].hasSubMenusActive = false;
                        }
                    })
                })
            }
        }
    }

    //$scope.clickOnSelectAll = function (menusList, parentList) {
    //    let noOfSelectSelected = 0;
    //    if (parentList[parentList.length - 2] != undefined)
    //        noOfSelectSelected = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.hasSubMenusActive && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).length;
    //    if (menusList.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 || selectAllList.indexOf(menusList.DisplayName.toUpperCase()) > -1) {
    //        //if ((selectedModuleId == 2 && menusList.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") == -1 && selectAllList.indexOf(menusList.DisplayName.toUpperCase()) > -1) || (selectedModuleId != 2 && menusList.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 || selectAllList.indexOf(menusList.DisplayName.toUpperCase()) > -1)) {
    //        let value = true;
    //        var isDeselected = false;
    //        if (menusList.hasChildSelected == true)
    //            value = false;
    //        if (!value)
    //            isDeselected = true;
    //        if ((menusList.DisplayName.toUpperCase() == "SELECT ALL YES" || menusList.DisplayName.toUpperCase() == "SELECT ALL NO") && noOfSelectSelected != 0)
    //            value = true;
    //        angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled }), function (a, b) {
    //            if ((menusList.DisplayName.toUpperCase() == "SELECT ALL CUSTOM RETAILERS" || menusList.DisplayName.toUpperCase() == "SELECT ALL RETAILERS") && parentList[parentList.length - 2].DisplayName == "Custom Channel") {
    //                angular.forEach(a.data.filter(function (e) { return !e.isDisabled }), function (c, d) {
    //                    c.isTabSelected = false;
    //                    if (c.data.length > 0) {
    //                        c.hasSubMenusActive = value;
    //                        angular.forEach(c.data.filter(function (e) { return (!e.isDisabled && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1) || e.DisplayName == "Select All" }), function (e, f) {
    //                            e.hasChildSelected = value;
    //                            e.hasSubMenusActive = value;
    //                        })
    //                    }
    //                    else if (customRetailersAttributeIds.indexOf(c.AttributetypeId) > -1 || c.MetricParentName == "Custom Group Retailer") {
    //                        c.hasChildSelected = value;
    //                        c.hasSubMenusActive = value;
    //                    }
    //                })
    //            }
    //            else {
    //                applyToChild(a, "hasSubMenusActive", value);
    //                applyToChild(a, "hasChildSelected", value);
    //                applyToChild(a, "isTabSelected", false);
    //            }
    //            if (a.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase()) {
    //                a.hasChildSelected = false;
    //                a.hasSubMenusActive = value;
    //                a.isTabSelected = false;
    //            }
    //            if (menusList.DisplayName.indexOf("Retailers") > -1 && a.DisplayName == "Custom Group Channel") {
    //                applyToChild(a, "hasSubMenusActive", false);
    //                applyToChild(a, "hasChildSelected", false);
    //                applyToChild(a, "isTabSelected", false);
    //            }
    //        })
    //        if (parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 }).length > 0) {
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 })[0].hasChildSelected = false;
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 })[0].isTabSelected = false;
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 })[0].hasSubMenusActive = false;
    //        }
    //        else if ((menusList.DisplayName.toUpperCase() == "SELECT ALL YES" || menusList.DisplayName.toUpperCase() == "SELECT ALL NO") && noOfSelectSelected != 0) {
    //            let temp = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() });
    //            temp.filter(function (e) { return e.hasChildSelected = true });
    //            temp.filter(function (e) { return e.isTabSelected = true });
    //            temp.filter(function (e) { return e.hasSubMenusActive = true });
    //            if (!isDeselected)
    //                noOfSelectSelected++;
    //        }
    //        else if (parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).length > 0) {
    //            let temp = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() });
    //            temp.filter(function (e) { return e.hasChildSelected = false });
    //            temp.filter(function (e) { return e.isTabSelected = false });
    //            temp.filter(function (e) { return e.hasSubMenusActive = false });
    //        }
    //    }
    //    else if (menusList.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && menusList.DisplayName.toUpperCase() != "SELECT ALL MARKETS" && !menusList.isSingle) {
    //        let value = true;
    //        if (menusList.hasChildSelected == true)
    //            value = false;
    //        if (menusList.ExtraPadding)
    //            list = parentList[parentList.length - 2].data.filter(function (e) { return e.ParentId == menusList.ParentId && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled });
    //        else
    //            list = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled });
    //        angular.forEach(list, function (a, b) {
    //            if (a.IsSelectable) {
    //                a.hasChildSelected = value;
    //                a.hasSubMenusActive = value;
    //                a.isTabSelected = false;
    //            }
    //            else {
    //                applyToChild(a, "hasSubMenusActive", value);
    //                applyToChild(a, "hasChildSelected", value);
    //                applyToChild(a, "isTabSelected", false);
    //                if (a.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase()) {
    //                    a.hasChildSelected = false;
    //                    a.hasSubMenusActive = value;
    //                    a.isTabSelected = false;
    //                }
    //            }
    //        })
    //        if (menusList.DisplayName.toUpperCase() == "SELECT ALL REGIONS") {
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].hasChildSelected = false;
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].isTabSelected = false;
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].hasSubMenusActive = false;
    //            angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }), function (a, b) {
    //                applyToChild(a, "hasSubMenusActive", false);
    //                applyToChild(a, "hasChildSelected", false);
    //                applyToChild(a, "isTabSelected", false);
    //                a.hasChildSelected = value;
    //                a.hasSubMenusActive = value;
    //                a.isTabSelected = false;
    //            })
    //        }
    //        else if (menusList.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL ") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).length > 0) {
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.hasChildSelected = false });
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.isTabSelected = false });
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.hasSubMenusActive = false });
    //        }
    //        else if (menusList.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && parentList[parentList.length - 3] != undefined && parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).length > 0) {
    //            parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.hasChildSelected = false });
    //            parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.isTabSelected = false });
    //            parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase() != menusList.DisplayName.toUpperCase() }).filter(function (e) { return e.hasSubMenusActive = false });
    //        }
    //    }
    //    else if (parentList[parentList.length - 2] != undefined && parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 }).length > 0 && parentList[parentList.length - 2].data.filter(function (e) { return e.FilterID == menusList.FilterID && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 }).length > 0 && !menusList.isSingle) {
    //        let record = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName == "Custom Group Retailer" })[0];
    //        if (record != undefined && parentList.select("DisplayName").indexOf("Retailer Nets") > -1) {
    //            record.hasSubMenusActive = false;
    //            record.hasChildSelected = false;
    //            record.data.filter(function (e) { return e.hasChildSelected = false });
    //            record.data.filter(function (e) { return e.hasSubMenusActive = false });
    //        }
    //        let totalCount = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //        let selectedCount = parentList[parentList.length - 2].data.filter(function (e) { return e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //        if (menusList.ExtraPadding) {
    //            totalCount = parentList[parentList.length - 2].data.filter(function (e) { return e.ParentId == menusList.ParentId && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //            selectedCount = parentList[parentList.length - 2].data.filter(function (e) { return e.ParentId == menusList.ParentId && e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //        }
    //        if (parentList[parentList.length - 3] == undefined && parentList[0].DisplayName == "MARKETS") {
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].hasChildSelected = false;
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].isTabSelected = false;
    //            parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL MARKETS") > -1 })[0].hasSubMenusActive = false;
    //            tempRecord = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL REGIONS") > -1 })[0];
    //        }
    //        else if (parentList[parentList.length - 2].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length > 0) {
    //            angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL ") > -1 }), function (a, b) {
    //                a.hasChildSelected = false;
    //                a.isTabSelected = false;
    //                a.hasSubMenusActive = false;
    //            })
    //            tempRecord = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 })[0];
    //        }
    //        else if (menusList.ExtraPadding)
    //            tempRecord = parentList[parentList.length - 2].data.filter(function (e) { return e.ParentId == menusList.ParentId && e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 })[0];
    //        else {
    //            angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && !e.IsSelectable }), function (val, ind) {
    //                totalCount += val.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //                selectedCount += val.data.filter(function (e) { return e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //            })
    //            tempRecord = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 })[0];
    //        }
    //        if (tempRecord != undefined) {
    //            if (!menusList.hasChildSelected && selectedCount + 1 == totalCount) {
    //                tempRecord.hasChildSelected = true;
    //                tempRecord.hasSubMenusActive = true;
    //                tempRecord.isTabSelected = true;
    //            }
    //            else {
    //                tempRecord.hasChildSelected = false;
    //                tempRecord.hasSubMenusActive = false;
    //                tempRecord.isTabSelected = false;
    //            }
    //        }
    //    }
    //    else if (parentList[parentList.length - 3] != undefined && parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 }).length > 0 && !menusList.isSingle && parentList[parentList.length - 3].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length == 0) {
    //        if (parentList.select("DisplayName").indexOf("Retailer Nets") > -1) {
    //            if (parentList[parentList.length - 2].DisplayName == "Custom Group Retailer" && parentList.select("DisplayName").indexOf("Retailer Nets") > -1) {
    //                angular.forEach(parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName != "Custom Group Retailer" }), function (a, b) {
    //                    a.hasChildSelected = false;
    //                    if (!a.data.some(function (e) { return e.hasSubMenusActive }))
    //                        a.hasSubMenusActive = false;
    //                    if (a.DisplayName == "Custom Group Channel") {
    //                        a.hasSubMenusActive = false;
    //                        a.data.filter(function (e) { return e.hasChildSelected = false });
    //                        a.data.filter(function (e) { return e.hasSubMenusActive = false });
    //                    }
    //                })
    //            }
    //            else if (parentList[parentList.length - 2].DisplayName == "Custom Group Channel") {
    //                angular.forEach(parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName != "Custom Group Channel" }), function (a, b) {
    //                    if (!a.hasChildSelected || a.DisplayName.indexOf("Select All") > -1) {
    //                        a.hasChildSelected = false;
    //                        a.hasSubMenusActive = false;
    //                    }
    //                    applyToChild(a, "hasSubMenusActive", false);
    //                    applyToChild(a, "hasChildSelected", false);
    //                })
    //            }
    //        }
    //        let totalCount = parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //        let selectedCount = parentList[parentList.length - 3].data.filter(function (e) { return e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //        angular.forEach(parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && !e.IsSelectable }), function (val, ind) {
    //            if (!(parentList[parentList.length - 2].DisplayName == "Custom Group Channel" && val.DisplayName == "Custom Group Retailer")) {
    //                totalCount += val.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //                selectedCount += val.data.filter(function (e) { return e.hasChildSelected && e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 && !e.isDisabled && e.IsSelectable }).length;
    //            }
    //        })
    //        tempRecord = parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 })[0];
    //        if (tempRecord != undefined) {
    //            if (!menusList.hasChildSelected && selectedCount + 1 == totalCount) {
    //                tempRecord.hasChildSelected = true;
    //                tempRecord.hasSubMenusActive = true;
    //                tempRecord.isTabSelected = true;
    //            }
    //            else {
    //                tempRecord.hasChildSelected = false;
    //                tempRecord.hasSubMenusActive = false;
    //                tempRecord.isTabSelected = false;
    //            }
    //        }
    //    }
    //    if (menusList.DisplayName.toUpperCase() == "SELECT ALL YES" || menusList.DisplayName.toUpperCase() == "SELECT ALL NO") {
    //        if (noOfSelectSelected < 2) {
    //            let quesData = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 });
    //            let ans = "NO(";
    //            if (menusList.DisplayName.toUpperCase() == "SELECT ALL YES") {
    //                if (isDeselected)
    //                    ans = "YES("
    //            }
    //            else {
    //                if (!isDeselected)
    //                    ans = "YES("
    //            }
    //            angular.forEach(quesData, function (a, b) {
    //                angular.forEach(a.data, function (c, d) {
    //                    let temp = c.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(ans) > -1 });
    //                    temp[0].isTabSelected = false;
    //                    temp[0].hasChildSelected = false;
    //                    temp[0].hasSubMenusActive = false;
    //                })
    //            })
    //        }
    //    }
    //}

    $scope.mutuallyExclusiveConsecutiveLevels = function (menusList, parentList, condition, prevHasChildSelected) {
        let selectedCount = 0, totalCount = 0;
        if (condition) {
            let isException = $scope.returnIsExceptionOrNot(menusList, parentList);
            if (menusList.IsSelectable && (menusList.data.length > 0 || parentList[parentList.length - 2].data.some(function (e) { return e.data.length > 0 }))) {

                if (menusList.DisplayName.indexOf("Select All Markets") == -1 && selectAllList.indexOf(menusList.DisplayName.toUpperCase()) == -1) {
                    angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return e.IsSelectable || e.DisplayName == "Custom Group Retailer" }), function (a, b) {
                        if (!isException || (isException && parentList.select("DisplayName").indexOf(a.DisplayName) > -1 && (exceptionMetricList.select("DisplayName").indexOf(a.DisplayName) > -1 || exceptionMetricList.select("DisplayName").indexOf(a.MetricParentName) > -1)) || menusList.DisplayName == "Select All" || parentList[parentList.length - 2].DisplayName == "Away from Home") {
                            let list = ["hasSubMenusActive", "hasChildSelected", "isTabSelected"];
                            applyToChild(a, list, false);
                            //applyToChild(a, "hasChildSelected", false);
                            //applyToChild(a, "isTabSelected", false);
                            if (!(a.hasChildSelected || $scope.hasChildSelected(a)))
                                a.hasSubMenusActive = false;
                        }
                    })
                    if (menusList.DisplayName.indexOf("Select All") == -1) {
                        menusList.isTabSelected = false;
                        menusList.hasChildSelected = false;
                        menusList.hasSubMenusActive = false;
                    }
                }
                parentList.filter(function (e) { return e.IsSelectable }).filter(function (e) { return e.hasChildSelected = false })
                angular.forEach(parentList.reverse(), function (a, b) {
                    if (!a.data.some(function (e) { return e.hasChildSelected || (e.IsSelectable && $scope.hasChildSelected(e)) })) {
                        a.hasChildSelected = false;
                    }
                })
                parentList.reverse();
                if (!prevHasChildSelected) {
                    menusList.hasChildSelected = true;
                    menusList.hasSubMenusActive = true;
                    parentList.filter(function (e) { return !e.IsSelectable }).filter(function (e) { return e.hasChildSelected = true })
                }
                if (parentList[parentList.length - 3] != undefined && parentList[parentList.length - 2].IsSelectable)
                    angular.forEach(parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName != parentList[parentList.length - 2].DisplayName }), function (a, b) {
                        if ((isException && parentList.select("DisplayName").indexOf(a.DisplayName) > -1 && (exceptionMetricList.select("DisplayName").indexOf(a.DisplayName) > -1 || exceptionMetricList.select("DisplayName").indexOf(a.MetricParentName) > -1)) || !(isException && parentList.select("DisplayName").indexOf(a.DisplayName) == -1 && (exceptionMetricList.select("DisplayName").indexOf(a.DisplayName) == -1 || exceptionMetricList.select("DisplayName").indexOf(a.MetricParentName) == -1)) || a.DisplayName == "Select All") {
                            a.hasSubMenusActive = false;
                            a.hasChildSelected = false;
                        }
                    })
            }
            else if (parentList[parentList.length - 3] != undefined && parentList[parentList.length - 3].data.filter(function (e) { return e.IsSelectable }).length > 0 && parentList[parentList.length - 2].IsSelectable) {
                angular.forEach(parentList[parentList.length - 3].data.filter(function (e) { return !(e.ParentId == menusList.ParentId && e.DisplayName == menusList.DisplayName) && !e.isDisabled && (e.IsSelectable || e.DisplayName.indexOf("Custom Group") > -1) }), function (a, b) {
                    if (parentList[parentList.length - 3].data.filter(function (e) { return (e.DisplayName == "Select All Custom Retailers" || e.DisplayName == "Select All Retailers") && parentList.select("DisplayName").indexOf("Custom Channel") > -1 }).length > 0) {
                        selectedCount += a.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                        totalCount += a.data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                        angular.forEach(a.data, function (c, d) {
                            selectedCount += c.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                            totalCount += c.data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                        })
                    }
                    else {
                        selectedCount += a.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled }).length;
                        totalCount += a.data.filter(function (e) { return !e.isDisabled }).length;
                    }
                    if (!(isException && parentList.select("DisplayName").indexOf(a.DisplayName) == -1 && (exceptionMetricList.select("DisplayName").indexOf(a.DisplayName) == -1 || exceptionMetricList.select("DisplayName").indexOf(a.MetricParentName) == -1)) || a.DisplayName == "Select All" || parentList[parentList.length - 3].DisplayName == "Away from Home") {
                        if (!a.data.some(function (e) { return e.hasChildSelected || $scope.hasChildSelected(e) }) && (a.DisplayName != parentList[parentList.length - 2].DisplayName)) {
                            a.hasSubMenusActive = false;
                        }
                        a.hasChildSelected = false;
                        if (a.DisplayName == "Custom Group Channel") {
                            a.hasSubMenusActive = false;
                            let list = ["hasSubMenusActive", "hasChildSelected", "isTabSelected"];
                            applyToChild(a, list, false);
                            //applyToChild(a, "hasChildSelected", false);
                            //applyToChild(a, "isTabSelected", false);
                        }
                    }
                })
                let tempRecord = parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.indexOf("Select All Markets") > -1 || selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 })[0];
                if (tempRecord != undefined && (menusList.Filter.toUpperCase() == "MARKETS" || parentList[parentList.length - 3].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length > 0)) {
                    if (totalCount == selectedCount) {
                        tempRecord.hasChildSelected = true;
                        tempRecord.hasSubMenusActive = true;
                    }
                    else {
                        tempRecord.hasChildSelected = false;
                        tempRecord.hasSubMenusActive = false;
                    }
                }
                selectedCount = 0, totalCount = 0;

                if (parentList[parentList.length - 4] != undefined && parentList[parentList.length - 4].data.filter(function (e) { return e.IsSelectable }).length > 0) {
                    angular.forEach(parentList[parentList.length - 4].data.filter(function (e) { return !(e.ParentId == menusList.ParentId && e.DisplayName == menusList.DisplayName) }), function (a, b) {
                        if (parentList[parentList.length - 4].data.filter(function (e) { return (e.DisplayName == "Select All Custom Retailers" || e.DisplayName == "Select All Retailers") && parentList.select("DisplayName").indexOf("Custom Channel") > -1 }).length > 0) {
                            selectedCount += a.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                            totalCount += a.data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                            angular.forEach(a.data, function (c, d) {
                                selectedCount += c.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                                totalCount += c.data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                            })
                        }
                        else {
                            selectedCount += a.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled }).length;
                            totalCount += a.data.filter(function (e) { return !e.isDisabled }).length;
                        }
                        if (!(isException && parentList.select("DisplayName").indexOf(a.DisplayName) == -1) || a.DisplayName == "Select All") {
                            if (!a.data.some(function (e) { return e.hasChildSelected || $scope.hasChildSelected(e) }) && (a.DisplayName != parentList[parentList.length - 3].DisplayName)) {
                                a.hasSubMenusActive = false;
                            }
                            a.hasChildSelected = false;
                        }
                    })

                    let tempRecord = parentList[parentList.length - 4].data.filter(function (e) { return e.DisplayName.indexOf("Select All Markets") > -1 || selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 })[0];
                    if (tempRecord != undefined && (menusList.Filter.toUpperCase() == "MARKETS" || parentList[parentList.length - 4].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length > 0)) {

                        if (totalCount == selectedCount) {
                            tempRecord.hasChildSelected = true;
                            tempRecord.hasSubMenusActive = true;
                        }
                        else {
                            tempRecord.hasChildSelected = false;
                            tempRecord.hasSubMenusActive = false;
                        }


                    }
                }
            }
            else if (parentList[parentList.length - 3] != undefined && parentList[parentList.length - 3].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length > 0) {
                angular.forEach(parentList[parentList.length - 3].data.filter(function (e) { return !(e.ParentId == menusList.ParentId && e.DisplayName == menusList.DisplayName) }), function (a, b) {
                    if (a.DisplayName == "Custom Group Channel" && parentList[parentList.length - 2].DisplayName == "Custom Group Retailer") {
                        a.hasChildSelected = false;
                        a.hasSubMenusActive = false;
                        a.data.filter(function (e) { return e.hasChildSelected = false });
                        a.data.filter(function (e) { return e.hasSubMenusActive = false });
                    }
                    else if ((a.DisplayName.indexOf("Select All") > -1 && a.DisplayName.indexOf("Channel") > -1) && parentList[parentList.length - 2].DisplayName == "Custom Group Retailer") {
                        a.hasChildSelected = false;
                        a.hasSubMenusActive = false;
                    }
                    else if ((a.DisplayName.indexOf("Select All") > -1 && a.DisplayName.indexOf("Retailer") > -1) && parentList[parentList.length - 2].DisplayName == "Custom Group Channel") {
                        a.hasChildSelected = false;
                        a.hasSubMenusActive = false;
                    }
                    else if (parentList[parentList.length - 2].DisplayName == "Custom Group Channel" && a.DisplayName != "Custom Group Channel") {
                        if (!a.hasChildSelected || a.DisplayName.indexOf("Select All") > -1) {
                            a.hasChildSelected = false;
                            a.hasSubMenusActive = false;
                        }
                        let list = ["hasSubMenusActive", "hasChildSelected"];
                        applyToChild(a, list, false);
                        //  applyToChild(a, "hasChildSelected", false);
                    }
                    if (parentList[parentList.length - 3].data.filter(function (e) { return (e.DisplayName == "Select All Custom Retailers" || e.DisplayName == "Select All Retailers") && parentList.select("DisplayName").indexOf("Custom Channel") > -1 }).length > 0 && parentList[parentList.length - 2].DisplayName != "Custom Group Channel") {
                        selectedCount += a.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible && (customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 || e.MetricParentName == "Custom Group Retailer") }).length;
                        totalCount += a.data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible && (customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 || e.MetricParentName == "Custom Group Retailer") }).length;
                        angular.forEach(a.data, function (c, d) {
                            selectedCount += c.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                            totalCount += c.data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                        })
                    }
                    else if (a.DisplayName.indexOf("Custom Group") == -1 && parentList[parentList.length - 2].DisplayName != "Custom Group Channel") {
                        selectedCount += a.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible }).length;
                        totalCount += a.data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible }).length;
                    }
                    if (a.DisplayName.indexOf("Select All") == -1 && (parentList[parentList.length - 2].DisplayName.indexOf("Custom Group") == -1 || (parentList[parentList.length - 2].DisplayName.indexOf("Custom Group") > -1 && parentList[parentList.length - 2].DisplayName == "Custom Group Retailer"))) {
                        if (!a.data.some(function (e) { return e.hasChildSelected || $scope.hasChildSelected(e) }) && (a.DisplayName != parentList[parentList.length - 2].DisplayName)) {
                            a.hasSubMenusActive = false;
                        }
                        a.hasChildSelected = false;
                    }
                })
                if (parentList[parentList.length - 2].DisplayName == "Custom Group Channel") {
                    selectedCount += parentList[parentList.length - 3].data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible && e.DisplayName.indexOf("Select All") == -1 && e.DisplayName.indexOf("Custom Group") == -1 }).length;
                    totalCount += parentList[parentList.length - 3].data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible && e.DisplayName.indexOf("Select All") == -1 && e.DisplayName.indexOf("Custom Group") == -1 }).length;
                }
                let tempRecord = parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.indexOf("Select All ") > -1 })[0];
                if (parentList[parentList.length - 3].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) == -1 && e.DisplayName.indexOf("Select All") > -1 }).length > 0) {
                    if (parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 && e.DisplayName.indexOf("Custom Group") == -1 && e.hasChildSelected }).length > 0)
                        tempRecord = parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.indexOf("Select All") > -1 })[0];
                }
                if (parentList[parentList.length - 2].DisplayName == "Custom Group Retailer") {
                    tempRecord = parentList[parentList.length - 3].data.filter(function (e) { return e.DisplayName.indexOf("Select All ") > -1 && e.DisplayName.indexOf("Retailers") > -1 })[0];
                }
                if (tempRecord != undefined && parentList[parentList.length - 3].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length > 0) {
                    if (totalCount == selectedCount) {
                        tempRecord.hasChildSelected = true;
                        tempRecord.hasSubMenusActive = true;
                    }
                    else if (parentList.length > 1 && parentList[parentList.length - 2].DisplayName.indexOf("Custom Group") == -1) {
                        tempRecord.hasChildSelected = false;
                        tempRecord.hasSubMenusActive = false;
                    }
                }
            }
            selectedCount = 0, totalCount = 0;
            let yesSelectedCount = 0, noSelectedCount = 0;
            if (parentList[parentList.length - 4] != undefined && parentList[parentList.length - 4].data.filter(function (e) { return e.IsSelectable }).length > 0 && parentList[parentList.length - 4].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length > 0) {
                angular.forEach(parentList[parentList.length - 4].data.filter(function (e) { return !(e.ParentId == menusList.ParentId && e.DisplayName == menusList.DisplayName) }), function (a, b) {
                    if (parentList[parentList.length - 4].data.filter(function (e) { return (e.DisplayName == "Select All Custom Retailers" || e.DisplayName == "Select All Retailers") && parentList.select("DisplayName").indexOf("Custom Channel") > -1 }).length > 0) {
                        selectedCount += a.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                        totalCount += a.data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                        angular.forEach(a.data, function (c, d) {
                            selectedCount += c.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                            totalCount += c.data.filter(function (e) { return !e.isDisabled && !e.IsCollapsible && customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 }).length;
                        })
                    }
                    else if (parentList[parentList.length - 4].data.filter(function (e) { return e.DisplayName == "Select All Yes" || e.DisplayName == "Select All No" }).length > 0) {
                        if (a.data.length > 0 && a.DisplayName.toUpperCase() != "COVID SCHOOLING") {
                            let covidQuestion = a.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled });
                            angular.forEach(covidQuestion, function (c, d) {
                                yesSelectedCount += c.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("YES(") > -1 && e.hasSubMenusActive }).length;
                                noSelectedCount += c.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("NO(") > -1 && e.hasSubMenusActive }).length;
                            })

                            totalCount += a.data.filter(function (e) { return !e.isDisabled }).length;
                        }

                    }
                    else {
                        selectedCount += a.data.filter(function (e) { return e.hasChildSelected && !e.isDisabled }).length;
                        totalCount += a.data.filter(function (e) { return !e.isDisabled }).length;
                    }
                    if (!(isException && parentList.select("DisplayName").indexOf(a.DisplayName) == -1) || a.DisplayName == "Select All") {
                        if (!a.data.some(function (e) { return e.hasChildSelected || $scope.hasChildSelected(e) }) && (a.DisplayName != parentList[parentList.length - 3].DisplayName)) {
                            a.hasSubMenusActive = false;
                        }
                        a.hasChildSelected = false;
                    }
                })
                let tempRecord = parentList[parentList.length - 4].data.filter(function (e) { return e.DisplayName.indexOf("Select All Markets") > -1 || selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 });
                if (tempRecord != undefined && (menusList.Filter.toUpperCase() == "MARKETS" || parentList[parentList.length - 4].data.filter(function (e) { return selectAllList.indexOf(e.DisplayName.toUpperCase()) > -1 }).length > 0)) {

                    if (tempRecord.length == 1) {
                        tempRecord = tempRecord[0];
                        if (totalCount == selectedCount) {
                            tempRecord.hasChildSelected = true;
                            tempRecord.hasSubMenusActive = true;
                        }
                        else {
                            tempRecord.hasChildSelected = false;
                            tempRecord.hasSubMenusActive = false;
                        }
                    }
                    else {
                        if (totalCount == yesSelectedCount) {
                            tempRecord[0].hasChildSelected = true;
                            tempRecord[0].hasSubMenusActive = true;
                        }
                        else {
                            tempRecord[0].hasChildSelected = false;
                            tempRecord[0].hasSubMenusActive = false;
                        }

                        if (totalCount == noSelectedCount) {
                            tempRecord[1].hasChildSelected = true;
                            tempRecord[1].hasSubMenusActive = true;
                        }
                        else {
                            tempRecord[1].hasChildSelected = false;
                            tempRecord[1].hasSubMenusActive = false;
                        }
                    }
                }
            }
        }

        if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
            $scope.mutuallyExclusiveFilters(menusList, parentList);
        }
        //if (parentList.length > 2 && (parentList[0].DisplayName == "5Ws" || parentList[1].DisplayName == "5Ws") && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
        //    $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, "Channel");
        //}
    }

    $scope.DisableBenchmark = function (menusList, parentList) {

        let curscope = angular.element("#left-pane-container").scope();
        if (menusList.data.filter(function (e) { return e.IsCollapsible }).length > 0) {
            angular.forEach(menusList.data, function (a, b) {
                if (!a.IsCollapsible)
                    a.IsHidden = true;
                else
                    a.IsExpanded = false;
            })
        }

        if (!menusList.isDefaultLevel) {
            selectedItems = $scope.getSelectedItems($scope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
            List = [];
            List.push(parentList[0]);
            $scope.updateLeftMenuSelections(selectedItems, List);
            let benchmarkList = $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "BENCHMARK" });
            if (parentList[0].DisplayName == "TIME PERIOD" || parentList[0].DisplayName == "ADDITIONAL FILTERS" || parentList[0].DisplayName == "REPORT" || parentList[0].DisplayName == "MARKETS") {
                benchmarkList[0].isDisabled = false;
                timeList = [];
                if (selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" }).length > 0)
                    timeList = $scope.getPKsAndName(selectedItems.where(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data, []).select("DisplayName");
                if (selectedItems.length > 0 && (timeList.length > 1 || (timeList.length == 1 && timeList[0] != "2019" && timeList[0] != "Q1 2019" && timeList[0] != "YTD Q1 2019"))) {
                    curscope.bindingLeftPanelDynamically(benchmarkList[0], benchmarkList);
                    if (benchmarkList[0].data.filter(function (e) { return e.isDisabled }).length < 2)
                        benchmarkList[0].hasChildSelected = true;
                    else {
                        benchmarkList[0].isDisabled = true;
                    }
                }
                else {
                    if (timeList.length > 0)
                        benchmarkList[0].isDisabled = true;
                    benchmarkList[0].hasChildSelected = false;
                    benchmarkList[0].data = [];
                }

                if (selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }).length > 0) {
                    //When Russia, Italy, Germany, Spain, or Australia are selected as a single country, benchmark is disabled as there is no previous period or previous year data for these markets
                    let marketList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }), []).select("DisplayName").join(",");
                    if (marketList.split(",").length == 1 && ["Russia", "Italy", "Germany", "Spain", "Australia"].indexOf(marketList) > -1) {
                        benchmarkList[0].isDisabled = true;
                        benchmarkList[0].hasChildSelected = false;
                        benchmarkList[0].data = [];
                    }
                }
                if (selectedItems.filter(function (e) { return e.DisplayName == "REPORT" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "REPORT" })[0].Data[0].DisplayName == "Occasions Trend Report") {
                    benchmarkList[0].isDisabled = true;
                    benchmarkList[0].hasChildSelected = false;
                    benchmarkList[0].data = [];
                }

                let addnlFilter = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
                if (addnlFilter.length > 0 && addnlFilter[0].Data.filter(function (e) { return e.DisplayName == "COVID-19" }).length > 0 && addnlFilter[0].Data.filter(function (e) { return e.DisplayName == "COVID-19" })[0].Data.filter(function (e) { return e.DisplayName == "During-COVID19" }).length > 0) {
                    benchmarkList[0].isDisabled = true;
                    benchmarkList[0].hasChildSelected = false;
                    benchmarkList[0].data = [];
                }
                selectedItems = $scope.getSelectedItems($scope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
                $scope.updateLeftMenuSelections(selectedItems, [benchmarkList[0]]);
            }

            var selContent = $scope.formSelectionSummary(selectedItems, leftPanel_Parents.filter(function (e) { return e.hasChild }));
            angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
        }
    }

    $scope.createGroup = function (menusList, parent_list, curScope, $this) {

        let selections = selectedItems.filter(function (e) { return (!menusList.isDefaultLevel && (e.DisplayName.toUpperCase() == menusList.Filter.toUpperCase() || e.DisplayName.toUpperCase() == parent_list[0].DisplayName.toUpperCase())) || (menusList.isDefaultLevel && e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase()) });
        if (selections.length > 0 && selections[0].Data.filter(function (e) { return e.DisplayName == menusList.DisplayName }).length > 0)
            selections = selections[0].Data.filter(function (e) { return e.DisplayName == menusList.DisplayName });
        let pName = curscope.getPFilterName(parent_list);
        let isRetailer = 0;
        if (pName.indexOf(" Retailer") > -1)
            isRetailer = 1;
        let adnList = $scope.getPKsAndName(selections, []);
        if (parent_list[0].DisplayName.toUpperCase() == "5WS" || (parent_list.length > 1 && parent_list[1].DisplayName.toUpperCase() == "5WS")) {
            if (isRetailer && menusList.DisplayName.indexOf("Custom") > -1) {
                let CRlist = [];
                angular.forEach(menusList.data.filter(function (e) { return $scope.hasChildSelected(e) }), function (a, b) {
                    CRlist = CRlist.concat(angular.copy(a.data.filter(function (e) { return e.hasChildSelected && e.DisplayName.indexOf("Select All") == -1 })));
                    angular.forEach(a.data.filter(function (e) { return !e.hasChildSelected && e.hasSubMenusActive }), function (c, d) {
                        CRlist = CRlist.concat(angular.copy(c.data.filter(function (e) { return e.hasChildSelected && e.DisplayName.indexOf("Select All") == -1 })));
                    })
                })
                adnList = adnList.filter(function (e) { return CRlist.select("DisplayName").indexOf(e.DisplayName) > -1 });
            }
            else if (isRetailer || adnList.filter(function (e) { return e.Parent.toUpperCase() == menusList.DisplayName.toUpperCase() }).length == 0) {
                adnList = adnList.filter(function (e) { return menusList.data.filter(function (e) { return !e.isDisabled }).select("DisplayName").map(function (e) { return e.toUpperCase() }).indexOf(e.Parent.toUpperCase()) > -1 })
            }
            else {
                adnList = adnList.filter(function (e) { return e.Parent.toUpperCase() == menusList.DisplayName.toUpperCase() || e.Parent.indexOf("Custom Group") > -1 });
            }
        }
        if (adnList.filter(function (e) { return e.Parent.indexOf("Custom Group") > -1 }).length > 0) {
            show_alert_popup("ALERT", "Cannot create custom group when group(s) is/are selected.");
            showBackgroundShadow(false, false);
            return false;
        }
        if (!$scope.hasChildSelected(menusList, 0)) {
            show_alert_popup("ALERT", "Please make more than 1 selection to create group.");
            showBackgroundShadow(false, false);
            return false;
        }
        angular.element($this).addClass("active");
        show_popup("Create Group", '');
        var createGroup = '<div class="createGroupName"><div class="textArea"><div class="middleAlign">Name</div></div><div class="inputArea" style=" margin-left: 0;"><div class="middleAlign"><input class="createGroupName" placeholder="Enter Group Name" maxlength="40"></div></div></div>';
        createGroup += '<div class="buttonContainer">' +
            '<div class="buttonArea">' +
            '<div class="saveButton buttonDiv" ng-click="create_Group(\'' + escape(JSON.stringify(menusList)) + '\',\'' + escape(JSON.stringify(parent_list)) + '\')">' +
            '<div class="saveIconDiv buttonIconDiv"><div class="middleAlign"><div class="saveIcon buttonIcon"></div></div></div>' +
            '<div class="saveTextDiv buttonTextDiv"><div class="middleAlign">CREATE</div></div>' +
            '</div>' +
            '</div>' +
            '<div class="buttonArea">' +
            '<div class="cancelButton buttonDiv" onclick="close_Dashboard_popup()">' +
            '<div class="cancelIconDiv buttonIconDiv" style="margin-left: 3%;"><div class="middleAlign"><div class="cancelIcon buttonIcon"></div></div></div>' +
            '<div class="cancelTextDiv buttonTextDiv" style="width: calc(100% - 2.6vw);"><div class="middleAlign">CANCEL</div></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        angular.element(".popup-container").html($compile(createGroup)($scope));
        $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
        $(".custom-popup:visible .popup-container").css({ "height": ((($(".custom-popup:visible").height() - 36) / document.documentElement.clientWidth) * 100) + "vw", "max-height": ((($(".custom-popup:visible").height() - 36) / document.documentElement.clientWidth) * 100) + "vw" });
    }

    $scope.deleteGroup = function (menusList, parent_list, curScope, $this, type) {
        if (!$scope.hasChildSelected(menusList, 0)) {
            show_alert_popup("ALERT", (type == 'Group' ? "Please select atleast 1 group to delete." : "Please select a filter to delete."));
            showBackgroundShadow(false, false);
            return false;
        }
        angular.element($this).addClass("active");
        show_popup("Delete " + type, '');
        var deleteGroup = '<div class="deleteGroup"><div class="textArea" style="width:100%;text-align:center;margin:0;"><div class="middleAlign">Do you wish to <b>Delete the selected ' + type.toLowerCase() + '(s)</b>?</div></div></div>';
        deleteGroup += '<div class="buttonContainer">' +
            '<div class="buttonArea">' +
            (type == 'Group' ? '<div class="yesButton buttonDiv" ng-click="delete_Group(\'' + escape(JSON.stringify(menusList)) + '\',\'' + escape(JSON.stringify(parent_list)) + '\')">' : '<div class="yesButton buttonDiv" ng-click="delete_CustomFilter(\'' + escape(JSON.stringify(menusList)) + '\',\'' + escape(JSON.stringify(parent_list)) + '\')">') +
            '<div class="yesIconDiv buttonIconDiv"><div class="middleAlign" style="position: absolute;"><div class="yesIcon buttonIcon"></div></div></div>' +
            '<div class="yesTextDiv buttonTextDiv"><div class="middleAlign">YES</div></div>' +
            '</div>' +
            '</div>' +
            '<div class="buttonArea">' +
            '<div class="noButton buttonDiv" onclick="close_Dashboard_popup()">' +
            '<div class="noIconDiv buttonIconDiv"><div class="middleAlign"  style="position: absolute;"><div class="noIcon buttonIcon"></div></div></div>' +
            '<div class="noTextDiv buttonTextDiv"><div class="middleAlign">NO</div></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        angular.element(".popup-container").html($compile(deleteGroup)($scope));
        $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
        $(".custom-popup:visible .popup-container").css({ "height": ((($(".custom-popup:visible").height() - 36) / document.documentElement.clientWidth) * 100) + "vw", "max-height": ((($(".custom-popup:visible").height() - 36) / document.documentElement.clientWidth) * 100) + "vw" });

    }

    $scope.DisableAdditionalFiltersTab = function (menusList, parentList) {
        if (parentList[0].DisplayName == "ADDITIONAL FILTERS") {
            let customIsDisabled = true, covidDisabled = false;
            if (CustomFilterMaster.filter(function (e) { return e.ModuleId.split(",").indexOf(selectedModuleId) > -1 }).length > 0)
                customIsDisabled = false;
            menusList.data.filter(function (e) { return e.DisplayName == "Custom Filters" })[0].isDisabled = customIsDisabled;
            let timeList = selectedItems.where(function (e) { return e.DisplayName == "TIME PERIOD" });
            if (timeList.length > 0 && timeList[0].Data.length > 0 && timeList[0].Data[0].DisplayName == "COVID Quarter") {
                covidDisabled = true;
            }
            menusList.data.filter(function (e) { return e.DisplayName == "COVID-19" })[0].isDisabled = covidDisabled;
        }
    }

    $scope.getDemographicsData = function () {
        let countryIds = $scope.returnCountryIds();
        let tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "DEMOGRAPHICS" })[0].data, countryIds));
        if (countryIds.length > 1)
            tempData = $scope.filterDups(tempData, countryIds.length);
        tempData.filter(function (e) { return e.isDisabled = false });
        tempData.filter(function (e) { return disableMultiMarket.select("DisplayName").indexOf(e.DisplayName) > -1 }).filter(function (e) { return e.isDisabled = true });
        let marketList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }), []).select("DisplayName").join(",")
        if ((marketList.indexOf("North America") > -1 || marketList.indexOf("Select All Markets") > -1 || (marketList.split(',').length > 1 && marketList.indexOf("Canada") > -1)) && MarketRegionList.select("DisplayName").indexOf("Canada") > -1) {
            tempData.filter(function (e) { return e.DisplayName == "Employment Status" }).filter(function (e) { return e.isDisabled = true });
        }
        if (countryIds.length == 1) {
            tempData.filter(function (e) { return disableMultiMarket.filter(function (e) { return e.Market == "All" }).select("DisplayName").indexOf(e.DisplayName) > -1 }).filter(function (e) { return e.isDisabled = false });
            let marketName = MarketRegionList.filter(function (e) { return e.MarketId == countryIds[0] })[0].DisplayName;
            tempData.filter(function (e) { return disableMultiMarket.filter(function (e) { return e.Market == marketName }).select("DisplayName").indexOf(e.DisplayName) > -1 }).filter(function (e) { return e.isDisabled = false });
        }
        return tempData;
    }

    $scope.showMarketTimeperiodPopup = function () {
        show_popup("LOV Markets & Time Period", '');
        let tableDiv = "";
        $(".custom-popup:visible").css({ "height": "70%", "max-height": "inherit", "width": "66%" });
        let element = $(".custom-popup:visible .popup-container");

        let gridHtml = "";
        let tickImg = '<div class="tickImg middleAlign"><img no-repeat="" src="../Content/Images/tickIcon.png"></div>';
        let data = MarketTimeperiodList;
        let timeperiodYear = timeperiodList.filter(function (e) { return e.TimePeriodType == "Annual" }).select("DisplayName");
        let distinctColumnHeaders = data.select("TimePeriod").distinct();
        let distinctRowHeaders = data.select("Country").distinct();
        let leftHeaderWidth = 10;
        let colWidth = ((element.width() / document.documentElement.clientWidth) * 100 - leftHeaderWidth) / 2;//9 columns including header column
        //  timeperiodYear.push("2021");
        if (((timeperiodYear.length + 1) * colWidth) < ((element.width() / document.documentElement.clientWidth) * 100 - leftHeaderWidth)) {//if columns less than 6 increase column width to fit screen
            colWidth = ((element.width() / document.documentElement.clientWidth) * 100 - leftHeaderWidth) / (timeperiodYear.length + 1);
        }

        gridHtml += '<div class="crosstabTableDiv TMPopup">' +
            '<div id="crosstabTableContent" class="crosstabTable">' +
            /*left header start*/
            '<div class="leftHeader" style="width:' + (leftHeaderWidth) + 'vw"><div class="row-item">' +
            '<div class="row-item-div row-item-head-div"  style="width:' + leftHeaderWidth + 'vw;border-bottom:none"><div class="row-item-head-content middleAlign"></div></div>';
        gridHtml += '</div>' +
            '<div class="row-item sub-row-item">' +
            '<div class="row-item-div row-item-head-div"  style="width:' + leftHeaderWidth + 'vw"><div class="row-item-head-content middleAlign"></div></div>';

        gridHtml += '</div></div>';

        /*left header left*/
        /*right header start*/
        gridHtml += '<div class="rightHeader" style="width:calc(100% - ' + (leftHeaderWidth) + 'vw)">';

        gridHtml += '<div class="row-item" style="width:' + (timeperiodYear.length * colWidth) + 'vw">';

        angular.forEach(timeperiodYear, function (a, b) {

            gridHtml += '<div class="row-item-div row-item-head-div" title="' + a + '" style="width:' + colWidth + 'vw">'


            gridHtml += '<div class="row-item-head-content head-div sub-row-item"><div class="middleAlign">' + a + '</div></div>';

            gridHtml += '</div>';
        })

        gridHtml += '</div>';

        gridHtml += '<div class="row-item sub-row-item" style="width:' + (timeperiodYear.length * colWidth) + 'vw">';

        angular.forEach(timeperiodYear, function (a, b) {
            let newColWidth = colWidth;


            gridHtml += '<div class="row-item-div row-item-head-div" style="width:' + newColWidth + 'vw">'
            let quarterList = distinctColumnHeaders.filter(function (e) { return e.indexOf(a) > -1 });

            newColWidth = newColWidth / quarterList.length;

            angular.forEach(quarterList, function (a, b) {
                gridHtml += '<div class="row-item-head-content head-div sub-row-item" title = "' + a + '" style="width:' + newColWidth + 'vw"><div class="middleAlign">' + a + '</div></div>';

            })

            gridHtml += '</div>';
        })
        gridHtml += '</div>';
        gridHtml += '</div>'
        /*right header end*/

        /*left body start*/
        gridHtml += '<div class="leftBody" style="width:' + (leftHeaderWidth) + 'vw">';


        angular.forEach(distinctRowHeaders, function (a, b) {

            gridHtml += '<div class="row-item" style="width:100%">' +
                '<div class="row-item-div" style="width:' + leftHeaderWidth + 'vw">';


            gridHtml += '<div class="row-right-item-container">' +
                '<div class="row-right-item-content" style="width: 90%;" title="' + a + '"><div class="leftBorder"></div>' + a + '</div>' +
                '</div>'

            gridHtml += '</div>';
            gridHtml += '<div class="row-item-div"  style="width:' + colWidth + 'vw">';

            gridHtml += '</div></div>';
        })

        gridHtml += '</div>';

        /*left body end*/

        /*right body start*/
        gridHtml += '<div class="rightBody" onscroll="reposVertical(this);" onwheel="reposVertical(this);" tabindex="0" style="overflow: hidden; outline: none;width:calc(100% - ' + (leftHeaderWidth) + 'vw)">';
        angular.forEach(distinctRowHeaders, function (a, b) {

            gridHtml += '<div class="row-item" style="width:' + (timeperiodYear.length * colWidth) + 'vw">'

            angular.forEach(timeperiodYear, function (c, d) {

                let newColWidth = colWidth;

                gridHtml += '<div class="row-item-div"  style="width:' + newColWidth + 'vw">';

                let quarterList = distinctColumnHeaders.filter(function (e) { return e.indexOf(c) > -1 });

                newColWidth = newColWidth / quarterList.length;

                angular.forEach(quarterList, function (f, g) {

                    let row = data.filter(function (e) { return e.TimePeriod == f && e.Country == a });
                    let img = '';
                    if (row.length > 0)
                        img = tickImg;
                    gridHtml += '<div class="row-item-head-content head-div sub-row-item" style="width:' + newColWidth + 'vw">' + img + '</div>';

                })

                gridHtml += '</div>';
            })

            gridHtml += '</div>';

        })
        gridHtml += '</div>';
        /*right body end*/

        gridHtml += '</div>'
        gridHtml += '</div>'



        $(".custom-popup:visible .popup-container").css({ "height": "calc(100% - 4vw)", "max-height": "calc(100% - 4vw)" });
        element.html(gridHtml);
        let element1 = element.find(".crosstabTableDiv > #crosstabTableContent > .rightBody");
        SetScroll(element1, "#D31245", 0, 0, 0, 0, 3, true);
        angular.element(element1).scrollTop(0);
        angular.element(element1).scrollLeft(0);

    }

    $scope.validationForCanada = function (menusList) {
        let marketList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }), []).select("DisplayName").join(",");
        if ((marketList.indexOf("North America") > -1 || (marketList.split(',').length > 1 && marketList.indexOf("Canada") > -1) || marketList.indexOf("Select All Markets") > -1) && MarketRegionList.select("DisplayName").indexOf("Canada") > -1) {
            let activityList = menusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == "ACTIVITIES" });
            let shopperList = menusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == "SHOPPER MISSION" });
            let whenList = menusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == "WHEN" });
            if (activityList.length > 0)
                activityList[0].isDisabled = true;
            if (shopperList.length > 0)
                shopperList[0].isDisabled = true;
            if (whenList.length > 0) {
                let timingList = whenList[0].data.filter(function (e) { return e.DisplayName.toUpperCase() == "TIMING OF OCCASION" });
                if (timingList.length > 0)
                    timingList[0].isDisabled = true;
            }
        }


        //disable channels and retailer nets when multiple markets are selected
        //if (!(selectedModuleId == "3" && (menusList.DisplayName == "Column" || menusList.DisplayName == "Row" || menusList.DisplayName == "Row Nesting"))) {
        //    if (marketList.split(",").length > 1 || MarketRegionList.select("Region").distinct().diff(marketList.split(",")).length < MarketRegionList.select("Region").distinct().length || marketList.indexOf("Select All Markets") > -1) {
        //        angular.forEach(menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].data, function (a, b) {
        //            if (a.DisplayName.toUpperCase().indexOf("CHANNEL") > -1 || a.DisplayName.toUpperCase().indexOf("RETAILER") > -1) 
        //                a.isDisabled = true;
        //        })
        //        if (menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].data.filter(function (e) { return !e.isDisabled }).length == 0)
        //            menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].isDisabled = true;
        //    }
        //}
    }

    //not same for OSP
    $scope.addSelectAllForChannelAndRetailer = function (menusList, parentList) {
        return false;
        //if (menusList.data.filter(function (e) { return e.DisplayName == "Purchase" }).length > 0 && menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].data.filter(function (e) { return e.DisplayName.indexOf("Channel") > -1 || e.DisplayName.indexOf("Retailer") > -1 }).length > 0) {
        //    angular.forEach(menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].data.filter(function (e) { return e.DisplayName.indexOf("Channel") > -1 || e.DisplayName.indexOf("Retailer") > -1 }), function (c, d) {
        //        if (!c.isDisabled) {
        //            angular.forEach(c.data, function (a, b) {
        //                if (a.data.length > 0 && a.DisplayName.indexOf("Select All") == -1) {
        //                    let obj = {};
        //                    obj.AttributeId = 0,
        //                    obj.AttributetypeId = 21,
        //                    obj.CountryID = 0,
        //                    obj.DisplayName = "Select All",
        //                    obj.Filter = parentList[0].DisplayName,
        //                    obj.FilterID = 47,
        //                    obj.FilterLevel = null,
        //                    obj.IsLastLevel = true,
        //                    obj.IsSelectable = true,
        //                    obj.MetricName = "Select All",
        //                    obj.SortID = 0,
        //                    obj.data = [],
        //                    obj.isDefaultLevel = false,
        //                    obj.isSingle = false,
        //                    obj.ReportGeneratorFilter = a.ReportGeneratorFilter;
        //                    if (c.DisplayName.indexOf("Custom") > -1) {
        //                        angular.forEach(a.data.filter(function (val) { return val.DisplayName.indexOf("Select All") == -1 }), function (val1, ind1) {
        //                            if (val1.data.length > 0 && val1.data.filter(function (e) { return e.DisplayName == "Select All" }).length == 0) {
        //                                obj.MetricParentName = val1.DisplayName;
        //                                obj.ParentId = val1.FilterID;
        //                                obj.AttributetypeId = 17;
        //                                val1.data.unshift(angular.copy(obj));
        //                            }
        //                        })
        //                    }
        //                    else if (a.data.filter(function (e) { return e.DisplayName.toUpperCase() == "SELECT ALL" }).length == 0 && a.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1) {
        //                        obj.MetricParentName = a.DisplayName,
        //                        obj.ParentId = a.FilterID,
        //                        a.data.unshift(angular.copy(obj));
        //                    }
        //                }
        //            })
        //        }
        //    })
        //}
    }

    $scope.addSampleType = function (menusList) {
        let sampleTypeEnable = false;
        let marketList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }), []).select("DisplayName").join(",")
        if (marketList == "North America" || ["US", "Canada", "US,Canada"].indexOf(marketList) > -1) {
            sampleTypeEnable = true;
        }
        if (["ADMIN", "SUPER USER"].indexOf(sessionStorage.getItem("Roles").toUpperCase()) > -1 && LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "SAMPLE TYPE" }).length > 0 && sampleTypeEnable) {
            let countryIds = $scope.returnCountryIds();
            let tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "SAMPLE TYPE" })[0].data, countryIds));
            if (tempData.length > 0) {

                if (countryIds.length > 1)
                    tempData = $scope.filterDups(tempData, countryIds.length);
                let maxValue = menusList.data.select("SortID").reduce(function (a, b) { return Math.max(a, b) }) + 1;
                let sampleType = {
                    "AttributeId": maxValue, "AttributetypeId": maxValue, "CountryID": 0, "DisplayName": "Sample Type", "Filter": "ADDITIONAL FILTERS", "FilterID": maxValue,
                    "IsLastLevel": false, "IsSelectable": false, "MetricName": "Sample Type", "MetricParentName": "ADDITIONAL FILTERS", "ParentId": null, "SortID": maxValue,
                    "data": angular.copy(tempData), "isSingle": false, "isDisabled": sampleTypeEnable ? false : true
                };
                menusList.data.push(sampleType);
            }
        }
        $scope.addGroupNeeded(menusList);
    }
    $scope.addCustomGroup = function (menusList, parent_list) {
        if (menusList.data.filter(function (e) { return e.DisplayName.indexOf("Custom Group") > -1 }).length == 0) {
            if (typeof (CustomGroupMaster) == "string") {
                setTimeout(function () {
                    $scope.addCustomGroup(menusList, parent_list)
                }, 1000)
                showBackgroundShadow(true, true);
                return false;
            }
            let pName = $scope.getPFilterName(parent_list);
            let currentModuleName = $(".module-name").text().trim();
            let currentModuleId = selectedModuleId;
            let countryIds = $scope.returnCountryIds();
            let selectedList = angular.copy(CustomGroupMaster.filter(function (e) { return e.ModuleId.split(",").indexOf(currentModuleId.toString()) > -1 && e.Filter.replace(/( Retailer)/gi, '').toUpperCase() == pName.toUpperCase().replace(/( Retailer)/gi, '') }));
            let filteredSelectedList = [];
            let customList = [];
            if (!menusList.isDefaultLevel && selectedItems.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.Filter.toUpperCase() }).length > 0) {
                let selections = selectedItems.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.Filter.toUpperCase() });
                if (["Column", "Row Nesting", "Row"].indexOf(menusList.DisplayName) > -1)
                    selections = selections[0].Data.filter(function (e) { return e.DisplayName == menusList.DisplayName });
                customList = $scope.getPKsAndName(selections, []);
            }
            if ((sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "")) {
                let widgetInfo = JSON.parse(sessionStorage.getItem("widgetInfo"));
                selectionObj = JSON.parse(widgetInfo.SelectionObj);
                if (!menusList.isDefaultLevel && selectionObj.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.Filter.toUpperCase() }).length > 0)
                    customList = $scope.getPKsAndName(selectionObj.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.Filter.toUpperCase() })[0].Data, []);
            }
            else if (stickySelection.length > 0) {
                selectionObj = stickySelection.filter(function (e) { return e.DisplayName != "" });
                if (!menusList.isDefaultLevel && selectionObj.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.Filter.toUpperCase() }).length > 0)
                    customList = $scope.getPKsAndName(selectionObj.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.Filter.toUpperCase() })[0].Data, []);
            }
            if (customList.length > 0) {
                customList = customList.filter(function (e) { return e.Parent != undefined && e.Parent.indexOf("Custom Group") > -1 }).select("DisplayName")
            }
            let dispName = "Custom Group";
            if (menusList.DisplayName.toUpperCase().indexOf("CHANNEL") > -1 || menusList.DisplayName.toUpperCase().indexOf("RETAILER") > -1) {
                dispName = "Custom Group Channel";
            }
            let isSingle = false;
            if (selectedModuleId == "2" && pName.toUpperCase() == "OCCASION")
                isSingle = true;
            angular.forEach(selectedList, function (a, b) {
                let groupCountryId = a.CountryID.split(',');
                if (countryIds.some(function (val) { return groupCountryId.includes(val.toString()) }) || groupCountryId.includes("0")) {
                    let obj = a;
                    if (selectedModuleId == "7")
                        obj.ReportGeneratorFilter = 0;
                    obj.Parent = a.Filter;
                    obj.Filter = menusList.Filter;
                    obj.FilterID = a.GroupId;
                    obj.IsSelectable = true;
                    obj.IsLastLevel = true;
                    obj.isSingle = false;
                    obj.MetricName = a.GroupName,
                        obj.hasChildSelected = customList.indexOf(a.GroupName) > -1 ? true : false;
                    obj.hasSubMenusActive = customList.indexOf(a.GroupName) > -1 ? true : false;
                    obj.MetricParentName = obj.Parent.indexOf(" Retailer") > -1 ? "Custom Group Retailer" : dispName,
                        obj.data = [],
                        obj.isDefaultLevel = false,
                        obj.isSingle = isSingle;
                    obj.DisplayName = a.GroupName;
                    obj.title = a.SelectionSummary;
                    obj.ParentId = -1;
                    obj.IsItemLevel = a.IsItemLevel;
                    filteredSelectedList.push(obj);
                }
            })
            let groupList = angular.copy(filteredSelectedList.filter(function (e) { return e.MetricParentName == dispName }));
            let hasChildSelected = groupList.some(function (e) { return e.hasChildSelected });
            isSingle = (pName.toUpperCase() == "DEMOGRAPHICS" && (parent_list.select("DisplayName").indexOf("Row") > -1 || parent_list.select("DisplayName").indexOf("Row Nesting") > -1)) ? true : false;
            if (selectedModuleId == "2" && pName.toUpperCase() == "OCCASION")
                isSingle = true;
            if (dispName == "Custom Group Channel" && menusList.isChannelSelected)
                hasChildSelected = false;
            let customGroup = {
                "AttributeId": -1, "AttributetypeId": -1, "CountryID": 0, "DisplayName": dispName, "Filter": parent_list[0].DisplayName, "FilterID": -1,
                "IsLastLevel": false, "IsSelectable": false, "MetricName": dispName, "MetricParentName": menusList.DisplayName, "ParentId": menusList.FilterID, "SortID": 100000,
                "data": angular.copy(groupList), "isSingle": isSingle, "isDisabled": (groupList.length == 0 || (dispName == "Custom Group Channel" && menusList.isChannelSelected) ? true : false), "hasChildSelected": hasChildSelected, "hasSubMenusActive": hasChildSelected, "ReportGeneratorFilter": 0
            };
            let index = findLastIndex(menusList.data, 'DisplayName', 'Select All');
            menusList.data = menusList.data.filter(function (e) { return e.DisplayName.indexOf("Custom Group") == -1 });
            menusList.data.splice((index > -1 ? index + 1 : 0), 0, angular.copy(customGroup));//to add at start or after select all
            if (dispName == "Custom Group Channel") {
                groupList = angular.copy(filteredSelectedList.filter(function (e) { return e.MetricParentName == "Custom Group Retailer" }));
                hasChildSelected = groupList.some(function (e) { return e.hasChildSelected });
                let customRetailerGroup = {
                    "AttributeId": -2, "AttributetypeId": -2, "CountryID": 0, "DisplayName": "Custom Group Retailer", "Filter": parent_list[0].DisplayName, "FilterID": -2,
                    "IsLastLevel": false, "IsSelectable": false, "MetricName": "Custom Group Retailer", "MetricParentName": menusList.DisplayName, "ParentId": menusList.FilterID, "SortID": 100001,
                    "data": angular.copy(groupList), "isSingle": false, "isDisabled": (groupList.length > 0 ? false : true), "hasChildSelected": hasChildSelected, "hasSubMenusActive": hasChildSelected, "ReportGeneratorFilter": 0
                };
                menusList.data.splice((index > -1 ? index + 2 : 1), 0, angular.copy(customRetailerGroup));//to add at start or after select all
            }
            if (dispName == "Custom Group Channel" && (selectedModuleId == "5" || selectedModuleId == "4")) {
                if (menusList.isChannelSelected)
                    menusList.data = menusList.data.filter(function (e) { return e.DisplayName.indexOf("Custom Group Channel") == -1 });
            }
            //menusList.data.push(customGroup);// to add at the end
        }
    }
    function findLastIndex(array, searchKey, searchValue) {
        var index = array.slice().reverse().findIndex(x => x[searchKey].indexOf(searchValue) > -1);
        var count = array.length - 1
        var finalIndex = index >= 0 ? count - index : index;
        //   console.log(finalIndex)
        return finalIndex;
    }
    var groupNeeded5Ws = ["TIMING OF OCCASION", "DAYPART", "SURVEY CHANNEL", "CUSTOM CHANNEL", "ONLINE CHANNEL", "RETAILER NETS", "PACKAGE TYPE"/*, "COVID BEHAVIOURS", "COVID FUTURE PURCHASE"*/];
    $scope.addGroupNeeded = function (menusList) {
        if (selectedModuleId == "2") {
            menusList.data.filter(function (e) { return e.DisplayName.indexOf("Category") > -1 }).filter(function (e) { return e.isGroupNeeded = true });
        }
        else {
            angular.forEach(menusList.data.filter(function (e) { return e.DisplayName.indexOf("Category/Item/Brand") > -1 }), function (val, ind) {
                val.data.filter(function (e) { return e.isGroupNeeded = true });
            })
        }
        if (menusList.data.filter(function (e) { return e.DisplayName == "Demographics" }).length > 0)
            menusList.data.filter(function (e) { return e.DisplayName == "Demographics" })[0].isGroupNeeded = true;
        if (menusList.data.filter(function (e) { return e.DisplayName == "Occasion" }).length > 0)
            menusList.data.filter(function (e) { return e.DisplayName == "Occasion" })[0].isGroupNeeded = true;
    }
    $scope.getPFilterName = function (parent_list) {
        let pName = parent_list[0].DisplayName;
        if (selectedModuleId == "3" && pName == "CATEGORY/ITEM/BRAND") {
            let obj = getSelectedMainValues();
            let selBucket = "";
            if (parent_list[parent_list.length - 1].DisplayName == "Column")
                selBucket = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "COLUMN" })[0].Data, [])[0];
            if (parent_list[parent_list.length - 1].DisplayName == "Row")
                selBucket = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "ROW" })[0].Data, [])[0];
            if (parent_list[parent_list.length - 1].DisplayName == "Row Nesting")
                selBucket = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "ROW NESTING" })[0].Data, [])[0];
            appendText = (selBucket != "" && selBucket.Parent.indexOf("Custom") > -1) ? "Custom " : "";
            pName = appendText + selBucket.DisplayName;
        }
        else if (selectedModuleId == "5" && (pName == "CATEGORY/ITEM/BRAND" || pName == "CHANNEL/RETAILER")) {
            let selBucket = "";
            let dim1 = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data, [])[0];
            let dim2 = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data, [])[0];
            if (pName == "CATEGORY/ITEM/BRAND") {
                selBucket = dim1;
                if (catList.indexOf(dim2.DisplayName) > -1)
                    selBucket = dim2;
            }
            else {
                selBucket = dim1;
                if (["Channel", "Retailer"].indexOf(dim2.DisplayName) > -1)
                    selBucket = dim2;
            }
            appendText = (selBucket != "" && selBucket.Parent.indexOf("Custom") > -1) ? "Custom " : (pName == "CHANNEL/RETAILER" ? "Survey " : "");
            pName = appendText + (selBucket.DisplayName == "Retailer" ? "Channel Retailer" : selBucket.DisplayName);
        }
        else if ((selectedModuleId == "3" || selectedModuleId == "5") && pName == "5Ws") {
            pName = parent_list[parent_list.length - 1].DisplayName;
        }
        else if (pName == "ADDITIONAL FILTERS") {
            pName = parent_list[1].DisplayName;
            if (selectedModuleId != "2" && pName.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") > -1) {
                pName = (pName.split(" ")[0].indexOf("Custom") > -1 ? "Custom " : "") + parent_list[2].DisplayName;
            }
            else if (selectedModuleId == "2" && pName.toUpperCase().indexOf("CATEGORY") > -1) {
                pName = pName.replace("Survey ", "");
            }
            else if (pName == "5Ws") {
                pName = parent_list[parent_list.length - 1].DisplayName;
            }
        }
        else if (selectedModuleId == "4" && (pName == "CATEGORY/ITEM/BRAND" || pName == "CATEGORY/ITEM-MANUFACTURER" || pName == "CHANNEL/RETAILER")) {
            let opportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase() == "FIND OPPORTUNITY FOR" })[0].Data, [])[0];
            let selBucket = "";
            let appendText = "";
            selBucket = opportunity;
            if (selBucket.DisplayName != "Retailer Nets")
                appendText = (selBucket != "" && selBucket.Parent.indexOf("Custom") > -1) ? "Custom " : (pName == "CHANNEL/RETAILER" ? "Survey " : "");
            pName = appendText + (selBucket.DisplayName == "Retailer" ? "Channel Retailer" : selBucket.DisplayName);

        }
        else if (pName == "TIME PERIOD") {
            pName = parent_list[parent_list.length - 1].DisplayName;
        }
        else if (selectedModuleId == '7' && pName == "CATEGORY/ITEM/BRAND") {
            pName = parent_list[parent_list.length - 1].DisplayName.replace("Survey ", "");
        }

        if ((pName.indexOf("Channel") > -1 || pName.indexOf("Retailer Nets") > -1) && parent_list[0].DisplayName != "CHANNEL/RETAILER") {
            let listArray = parent_list[parent_list.length - 1];
            if (listArray.data.some(function (e) { return $scope.hasChildSelected(e) && e.DisplayName.indexOf("Select All") == -1 })) {
                if (!listArray.data.some(function (e) { return e.hasChildSelected && e.DisplayName.indexOf("Select All") == -1 }))
                    pName += " Retailer";//retailer selected
            }
        }
        return pName;
    }
    $scope.AdditionalFilterRequest = function () {
        let addtnlFilters = "";
        let FilterName;
        let sampleTypeEnable = false;
        let record = {};
        let marketInfo = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }), []);
        let marketList = marketInfo.select("DisplayName").join(",");
        let newRecord = {};
        try {
            newRecord = LeftPanelOriginalData.filter(function (e) { return e.DisplayName == "Sample Type" })[0].data.filter(function (e) { return e.DisplayName == "Survey Sample" && marketInfo.select("FilterID").map(function (e) { return MarketRegionList.filter(function (x) { return x.FilterID == e })[0].MarketId }).indexOf(e.CountryID) > -1 })[0];
        }
        catch (ex) {
            newRecord = { "FilterID": "9009.1", "DisplayName": "Survey Sample" };
        }
        if (newRecord == undefined) {
            newRecord = { "FilterID": "9009.1", "DisplayName": "Survey Sample" };
        }
        if ((marketList == "North America" || ["US", "Canada", "US,Canada"].indexOf(marketList) > -1) && ["ADMIN", "SUPER USER"].indexOf(sessionStorage.getItem("Roles").toUpperCase()) > -1 && LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "SAMPLE TYPE" }).length > 0) {
            sampleTypeEnable = true;
            $scope.menu_Tab_Click($scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0], $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }), $scope);
            record = $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].data.filter(function (e) { return e.DisplayName == "Sample Type" })[0].data.filter(function (e) { return e.DisplayName.indexOf("Survey") > -1 })[0];
        }
        if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0) {
            let additionalFiltersSelections = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
            let filterRecs = $scope.getPKsAndName(additionalFiltersSelections, []);
            FilterName = "";
            $.each(filterRecs, function (a, b) {
                if (selectedModuleId == 7) {//added parent for report generator
                    FilterName += b.Parent + ": ";
                }
                FilterName += b.DisplayName + ",";
                if (b.Parent.indexOf("Custom Group") > -1) {//sending original filter ids when custom group selected in additional filters
                    let groupRecord = CustomGroupMaster.filter(function (e) { return e.GroupName.toUpperCase() == b.DisplayName.toUpperCase() })[0];
                    let filterIds = groupRecord.FilterID.split(',');
                    let fName = groupRecord.Filter;
                    let countryIds = $scope.returnCountryIds();
                    let filteredIdList = filterIds;
                    if (fName.toUpperCase() != "OCCASION") {
                        filteredIdList = [];
                        angular.forEach(countryIds, function (a, b) {
                            filteredIdList.push(filterIds.filter(function (e) { return e.split('.')[1] == a }));
                        })
                    }
                    b.FilterID = filteredIdList.join(',');
                }
            })
            addtnlFilters = filterRecs.select("FilterID").join(",");
            if (additionalFiltersSelections[0].Data.filter(function (e) { return e.DisplayName == "Sample Type" }).length == 0 && sampleTypeEnable) {
                addtnlFilters += "," + record.FilterID;
                //FilterName += "," + record.DisplayName;
            }
            else if (!sampleTypeEnable) {
                addtnlFilters += "," + newRecord.FilterID;
                //FilterName += "," + newRecord.DisplayName;
            }
            FilterName = FilterName.substring(0, FilterName.length - 1);
        }
        else if (sampleTypeEnable) {
            $scope.menu_Tab_Click($scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0], $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }), $scope);
            addtnlFilters = record.FilterID;
            //FilterName = record.DisplayName;
        }
        else {
            addtnlFilters = newRecord.FilterID;
            //FilterName = newRecord.DisplayName;
        }
        return { FilterID: addtnlFilters, DisplayName: FilterName };
    }

    $scope.validationForAustraliaandGroup = function (parentList, menusList) {
        /*enabling/disabling Australia on time period selection start*/
        if (parentList[0].DisplayName == "MARKETS") {
            menusList.data.filter(function (e) { return e.DisplayName == "AMEA" })[0].isDisabled = true;
            MarketRegionList.filter(function (e) { return e.DisplayName == "Australia" })[0].isDisabled = true;

            if ((sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "")) {
                let widgetInfo = JSON.parse(sessionStorage.getItem("widgetInfo"));
                selectionObj = JSON.parse(widgetInfo.SelectionObj);
                selectedItems = selectionObj.filter(function (e) { return e.DisplayName != "" });
            }
            else if (stickySelection.length > 0) {
                selectedItems = stickySelection.filter(function (e) { return e.DisplayName != "" });
            }
            if (selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data.length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data[0].Data.filter(function (e) { return e.DisplayName.indexOf("Q1 2019") > -1 }).length > 0) {
                menusList.data.filter(function (e) { return e.DisplayName == "AMEA" })[0].isDisabled = false;
                MarketRegionList.filter(function (e) { return e.DisplayName == "Australia" })[0].isDisabled = false;
            }
            if (selectedModuleId == 4)
                menusList.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 }).filter(function (e) { return e.IsSelectable = false });
        }
        /*enabling/disabling Australia on time period selection end*/

        if (menusList.isGroupNeeded && menusList.DisplayName.toUpperCase() == "OCCASION") {
            $scope.addCustomGroup(menusList, parentList)
        }
    }

    $scope.filterList = function (dataList, keepList) {
        keepList = keepList.concat(dataList[0].Data.filter(function (e) { return e.DisplayName.indexOf("Custom Group") == -1 }).select("DisplayName"));
        let customList = dataList[0].Data.filter(function (e) { return e.DisplayName.indexOf("Custom Group") > -1 });
        if (customList.length > 0) {
            let parentGroupList = [];
            let customListData = customList[0].Data.select("DisplayName");
            angular.forEach(CustomGroupMaster.filter(function (e) { return customListData.indexOf(e.GroupName) > -1 }), function (a, b) {
                parentGroupList = parentGroupList.concat(a.Parent.split('##'));
            })
            keepList = keepList.concat(parentGroupList);
            keepList = Array.from(new Set(keepList));
        }

        return keepList;
    }
    $scope.isGroupNeeded = function (menusList, parent_list) {
        if (selectedModuleId == "3" && parent_list[0].DisplayName != 'ADDITIONAL FILTERS' && parent_list[0].DisplayName != 'TIME PERIOD')
            return true;
        if (selectedModuleId == "3" && parent_list[0].DisplayName == 'TIME PERIOD' && (getSelectedMainValues().Column == "Time Period" || getSelectedMainValues().Row == "Time Period" || getSelectedMainValues().RowNesting == "Time Period"))
            return true;
        return false;
    }
}

//function to get list of items for search functionality
function findItem(listItem, searchText) {
    // function filterList(listItem, searchText) {
    let tempList = [];
    var newList = [];
    if (listItem.filter(function (e) { return !e.isDisabled }).some(function (e) { return e.IsCollapsible == true })) {
        angular.forEach(listItem.filter(function (e) { return e.IsCollapsible }).select("DisplayName"), function (value, index) {
            if (listItem.filter(function (e) { return e.DisplayName == value })[0] != undefined) {
                let productId = listItem.filter(function (e) { return e.DisplayName == value })[0].FilterID;
                angular.forEach(listItem, function (value1, index1) {
                    if (value1.ParentId == productId) {
                        let temp = angular.copy(value1);
                        temp.DisplayName = value + " : " + temp.DisplayName;
                        newList.push(temp);
                    }
                })
            }
        });
        listItem = angular.copy(newList);
    }
    angular.forEach(listItem.filter(function (e) { return !e.isDisabled }), function (value, index) {
        let tempName = angular.copy(value.DisplayName);
        if ((value.data.length != 0 && !value.IsLastLevel) || List5Ws.indexOf(value.DisplayName) > -1) {
            if (value.IsSelectable) {
                let text = "";
                text += tempName;
                tempList.push({ "DisplayName": text, "ParentId": value.ParentId });
            }
            if (value.data.length == 0 && !value.IsLastLevel && List5Ws.indexOf(value.DisplayName) > -1) {
                let scope = angular.element("#left-pane-container").scope();
                let countryIds = scope.returnCountryIds();
                bindParentName = value;
                isSearchFlag = 1;
                let tempList = angular.copy(scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == value.DisplayName.toUpperCase() })[0].data, countryIds, menusList, parentList));
                if (countryIds.length > 1)
                    tempList = scope.filterDups(tempList, countryIds.length);
                value.data = angular.copy(tempList);
                if (value.isGroupNeeded) {
                    scope.addCustomGroup(value, parentList)
                }
                isSearchFlag = 0;
            }
            let childItems = findItem(value.data, searchText);
            angular.forEach(childItems, function (value1, index1) {
                let text = "";
                text += tempName + " : " + value1.DisplayName;
                tempList.push({ "DisplayName": text, "ParentId": value1.ParentId });
            })
        }
        else {
            let text = "";
            text += tempName;
            tempList.push({ "DisplayName": text, "ParentId": value.ParentId });
        }
    });
    return tempList;
}

//function to set property at all levels
function applyToChild(menusList, itemList, newVal, parentValue, ind) {
    if (menusList.data.length > 0) {
        angular.forEach(menusList.data.filter(function (e) { return !e.isDisabled }), function (value, index) {
            for (var i in itemList) {
                value[itemList[i]] = newVal;
            }
            if (value.data.length > 0)
                applyToChild(value, itemList, newVal, parentValue, ind);
            if (parentValue != undefined) {

                if (parentValue == "removeIfNotSelected" && (value.hasChildSelected || value.data.some(function (e) { return e.hasChildSelected }))) { //@vj
                    value[itemList[ind]] = true;
                }
            }


        })
    }
}

var bindParentName = '', isSearchFlag = 0;
function searchFilter(listItem, args) {
    searchText = args["searchText"];
    parentList = args["parentList"];
    menusList = args["menusList"];
    if (searchText == "" || searchText == undefined || searchText == null || searchText.length < 3) {
        if (menusList != undefined)
            angular.element("li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul > li[ng-name='search'] .search-item-container").getNiceScroll().remove();
        else
            angular.element("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] > .internalWrapper> .wrapper > ul > li[ng-name='search'] .search-item-container").getNiceScroll().remove();

        return [];
    }
    else {
        let retList = findItem(listItem, searchText).select("DisplayName");
        let filteredList = retList.filter(function (e) { return e.toUpperCase().indexOf(searchText.toUpperCase()) > -1 && e.toUpperCase().indexOf("SELECT ALL") == -1 });
        var newFilteredList = [];
        angular.forEach(filteredList, function (value, index) {
            newFilteredList.push((value.replace(new RegExp(searchText, 'gi'), "<strong>" + searchText + "</strong>")));//$sce.trustAsHtml
        })
        if (menusList != undefined)
            SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul > li[ng-name='search'] .search-item-container"), "#D31245", 0, 0, 0, 0, 3, false);
        else
            SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] > .internalWrapper > .wrapper > ul > li[ng-name='search'] .search-item-container"), "#D31245", 0, 0, 0, 0, 3, false);
        return newFilteredList;
    }
}

//function to get row,column and row nesting selections crosstab
function getSelectedMainValues(selectionObj) {
    if (selectionObj != undefined)
        selectedItems = selectionObj;
    let selectedRowNesting = "", selectedRow = "", selectedColumn = "";
    if (selectedItems != undefined && selectedItems.length > 0) {
        if (selectedItems.length > 0 && selectedItems[0].DisplayName == "COLUMN" && selectedItems[0].Data.length > 0)
            selectedColumn = selectedItems[0].Data[0].Data.length > 0 ? selectedItems[0].Data[0].Data[0].DisplayName : selectedItems[0].Data[0].DisplayName;
        if (selectedItems.length > 1 && selectedItems[1].DisplayName == "ROW" && selectedItems[1].Data.length > 0)
            selectedRow = selectedItems[1].Data[0].Data.length > 0 ? selectedItems[1].Data[0].Data[0].DisplayName : selectedItems[1].Data[0].DisplayName;
        if (selectedItems.length > 2 && selectedItems[2].DisplayName == "ROW NESTING" && selectedItems[2].Data.length > 0)
            selectedRowNesting = selectedItems[2].Data[0].Data.length > 0 ? selectedItems[2].Data[0].Data[0].DisplayName : selectedItems[2].Data[0].DisplayName;
    }
    let temp = {};
    temp.Column = selectedColumn;
    temp.Row = selectedRow;
    temp.RowNesting = selectedRowNesting;
    return temp;
}

function updateFooterPercentageCategory(scope) {
    var element = $(".footerContent .occasionChange.percentageCategory");
    var flag = 0;
    if (selectedModuleId == "3") {
        var list = ["OCCASION", "CATEGORY/ITEM/BRAND", "5Ws", "DEMOGRAPHICS"];
        for (var i = 0; i < list.length; ++i) {
            var tData = selectedItems.filter(function (e) { return e.DisplayName == list[i] });
            if (tData.length == 0)
                continue;
            var pData = scope.getPKsAndName(tData, []).select("IsItemLevel").distinct().join(",");
            if (pData.indexOf("true") > -1) {
                flag = 1;
                break;
            }
        }
        element.text("Occasion %");
        if (flag)
            element.text("Item %");
    }
    return flag;
}
