var dashboardType =
    [
        {
            type: 1, name: "MY SAVED DASHBOARDS", isSelected: false, list: []
        },
        {
            type: 2, name: "DASHBOARDS SHARED WITH ME", isSelected: false, list: []
        },
        {
            type: 3, name: "DASHBOARDS SHARED BY ME", isSelected: false, list: []
        }
    ];
var widgetList =
    [
        { id: 1, name: "EATING OCCASION FRAMEWORK", x: "-4.3vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-24.2vw", "height": "15.85vw", "width": "52.82vw", Url: "'../Content/Images/icons SVG/eatingOccasionIcon.svg'" },
        { id: 2, name: "WHO", x: "-12vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-24.2vw", "height": "15.85vw", "width": "42.3vw", Url: "'../Content/Images/icons SVG/whoIcon.svg'" },
        { id: 3, name: "WHO WITH", x: "-8.3vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-24.1vw", "height": "12.4vw", "width": "14.4vw", Url: "'../Content/Images/icons SVG/whoWithIcon.svg'" },
        { id: 4, name: "WHEN", x: "-68.5vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-23.7vw", "height": "12.4vw", "width": "14.4vw", Url: "'../Content/Images/icons SVG/whenIcon.svg'" },
        { id: 5, name: "WHERE", x: "-72.2vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-23.6vw", "height": "12.4vw", "width": "22.1vw", Url: "'../Content/Images/icons SVG/whereIcon.svg'" },
        { id: 6, name: "WHY", x: "-15.7vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-24.2vw", "height": "12.4vw", "width": "42.3vw", Url: "'../Content/Images/icons SVG/whyIcon.svg'" },
        { id: 7, name: "WHAT", x: "-53.5vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-23.7vw", "height": "15.85vw", "width": "52.82vw", Url: "'../Content/Images/icons SVG/whatIcon.svg'" },
        { id: 8, name: "ACTIVITIES", x: "-60.8vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-23.6vw", "height": "15.85vw", "width": "42.3vw", Url: "'../Content/Images/icons SVG/activitiesIcon.svg'" },
        { id: 9, name: "PURCHASE", x: "-57vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-23.6vw", "height": "12.4vw", "width": "52.82vw", Url: "'../Content/Images/icons SVG/purchaseIcon.svg'" },
        { id: 10, name: "SHOPPER MISSION", x: "-64.7vw", moduleUrl: "../Snapshot/Snapshot?moduleid=2", y: "-23.6vw", "height": "12.4vw", "width": "42.3vw", Url: "'../Content/Images/icons SVG/shopperMissionIcon.svg'" },
        { id: 11, name: "TREND", x: "-3.9vw", moduleUrl: "../Crosstab/Crosstab?moduleid=3", y: "-16.2vw", "height": "32.63vw", "width": "98vw", Url: "'../Content/Images/icons SVG/trendIcon.svg'" },
        { id: 12, name: "STACK", x: "-12.4vw", moduleUrl: "../Crosstab/Crosstab?moduleid=3", y: "-16.2vw", "height": "32.63vw", "width": "98vw", Url: "'../Content/Images/icons SVG/stackChartIcon.svg'" },
        { id: 13, name: "PERFORMANCE DASHBOARD", x: "-12.4vw", moduleUrl: "../PerformanceDashboard/PerformanceDashboard?moduleid=9", y: "-16.2vw", "height": "32.63vw", "width": "98vw", Url: "'../Content/Images/icons SVG/pdashIcon.svg'" }
    ];
var pptRequestList = [], updateDataList = [];
var groupList = [], userList = [];
var maxDashboardForShare = 3, maxUsersToShare = 20, maxGroupsToShare = 3;
var maxSelectedYear;
var iniFlag = 1;
$(window).resize(function() {
    positionImageInWidget();
})

angular.module('starter.controllers', ["ngAnimate", 'commonService'])
    .controller('parent-controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function($scope, $timeout, $http, commonService, $compile, $sce) {
        angular.element(document.getElementsByClassName("overlay")).show();
        showBackgroundShadow(true, true);
        $scope.ModuleIsHidden = true;
        $scope.leftMenuIsHidden = false;
        //add specific class for internet explorer
        if ((/*@cc_on!@*/false || !!document.documentMode)) {
            angular.element("body,html,form").addClass("ie11");
        }
        angular.element(document.querySelectorAll(".moduleLevel[title='MY DASHBOARD']")).addClass("active");
        angular.element(document.querySelectorAll(".module-name .middleAlign")).text("My Dashboard");

        if ((/*@cc_on!@*/false || !!document.documentMode)) {
            angular.element("body,html,form").addClass("ie11");
        }
        loadCommonFunctionalities($scope, commonService, $http);

    }])
    .controller('Dashboard-Controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function($scope, $timeout, $http, commonService, $compile, $sce) {

        CommonLeftPanelFunction($scope, commonService, $http, $sce, $timeout);

        $scope.customPopup['visible'] = false;

        $scope.hideLeftPanel = function($event) {
            if (!$scope.ModuleIsHidden)
                $scope.ModulePanelToggle();
        }

        $http({
            method: callsType.Post,
            url: services.LoadLeftPanelDashboard,
            async: true,
            data: "{'userId': '" + sessionStorage.getItem("Username") + "' }",
        }).then(function successCallback(response) {
            timeperiodList = response.data[0];
            timeperiodList = timeperiodList.filter(function(e) { return e.Title = e.DisplayName });
            timeperiodList = timeperiodList.filter(function(e) { return e.FilterID = e.FilterID.toString() });
            DashboardMaster = response.data[1];
            userList = response.data[2];
            groupList = response.data[3];
            $scope.DashboardMaster = DashboardMaster;
            $scope.ExceptionList = ["who with", "when", "where"];
            $scope.users = userList;
            $scope.groupsList = groupList;
            if (DashboardMaster.length > 0)
                $scope.showDashboardList(DashboardMaster[0].DashBoardTypeId, DashboardMaster[0]);
            else {
                angular.element(document.getElementsByClassName("overlay")).hide();
                showBackgroundShadow(false, false);
            }
            //angular.element(document.querySelectorAll('.headerButton:nth-child(' + (DashboardMaster[0].DashBoardTypeId - 1) + ')')).addClass("active");
        }, function(data) {
        });

        $scope.showDashboardList = function(type, dashboard, flag) {
            //flag is set only when some operation is done on widget or dashboard else it is undefined
            angular.element(document.getElementsByClassName("overlay")).show();
            showBackgroundShadow(true, true);
            if (flag == undefined)
                $scope.begin = 0;

            angular.element(document.querySelectorAll('.headerButton')).removeClass('active');
            angular.element(document.querySelectorAll('.headerButton:nth-child(' + type + ')')).addClass('active');

            let widget = [];
            angular.forEach(DashboardMaster.filter(function(e) { return e.DashBoardTypeId == type }), function(a, b) {
                if (a.RequestObj != null && a.RequestObj != "") {
                    var widgetRecord = widgetList.filter(function(e) { return a.WidgetType.indexOf(e.name.toLowerCase()) > -1 })[0];
                    let obj = angular.copy(a);
                    obj.x = widgetRecord.x;
                    obj.y = widgetRecord.y;
                    obj.moduleUrl = widgetRecord.moduleUrl;
                    obj.ImageUrl = "data:image/jpg;base64," + a.Image;
                    obj.widgetType = a.WidgetType;
                    obj.Url = widgetRecord.Url;
                    widget.push(obj);
                }
            })
            $scope.WidgetList = widget;
            let widgetNames = [];
            angular.forEach(widget.filter(function(e) { return e.DashBoardID == widget[0].DashBoardID }), function(a, b) {
                let obj = angular.copy(a);
                widgetName = a.WidgetName;
                if (widgetNames.select("DisplayName").indexOf(a.WidgetName) == -1) {
                }
                else {
                    if (widgetName.indexOf(" ") == -1)
                        existingList = widgetNames.filter(function(e) { return e.DisplayName.indexOf(widgetName) > -1 && !e.DisplayName.indexOf(" ") > -1 }).select("DisplayName").distinct().sort().reverse();
                    else
                        existingList = widgetNames.filter(function(e) { return e.DisplayName.indexOf(widgetName) > -1 }).select("DisplayName").distinct().sort().reverse();
                    if (existingList.length > 0)
                        widgetName = a.WidgetName + "_" + (existingList[0].split("_").length > 1 ? parseInt(existingList[0].split("_")[1]) + 1 : "1");
                }
                obj.DisplayName = widgetName;
                widgetNames.push(obj);
            })
            $scope.DashboardWidgetList = widgetNames.sort(function(a, b) { return a.WidgetID - b.WidgetID });
            let uniqueList = [];
            angular.forEach(DashboardMaster.filter(function(e) { return e.DashBoardTypeId == type }), function(a, b) {
                if (uniqueList.filter(function(e) { return e.DashBoardID == a.DashBoardID && e.DashBoardTypeId == a.DashBoardTypeId }).length == 0) {
                    a.isSelected = false;
                    if (uniqueList.length == 0)
                        a.isSelected = true;
                    uniqueList.push(a);
                }
            })
            $scope.DashboardsNameList = uniqueList;

            $scope.end = $scope.DashboardsNameList.length;
            SetScroll($('.slides-container'), "#D31245", 0, 0, 0, 0, 3, false);
            $timeout(function() {
                positionImageInWidget();
            })
            angular.element(".selectAllSlides .selectAllSlideIcon").removeClass("active");
            angular.element(".slides-container:visible .slide-widget .icon-container div.selectSlideIcon").removeClass("active");
        }

        $scope.moveLeft = function() {
            if ($scope.begin > 0)
                $scope.begin = $scope.begin - 1;
        }

        $scope.moveRight = function() {
            if ($scope.end - $scope.begin > 5)
                $scope.begin = $scope.begin + 1;
        }

        $scope.selectDashboard = function(dashboard) {
            if ($(".dashboardNameList.active").attr("id") == dashboard.DashBoardID) {
                return false;
            }
            angular.element(document.getElementsByClassName("overlay")).show();
            showBackgroundShadow(true, true);
            let widget1 = [];
            angular.forEach(DashboardMaster.filter(function(e) { return e.DashBoardTypeId == dashboard.DashBoardTypeId }), function(a, b) {
                if (a.RequestObj != null && a.RequestObj != "") {
                    var widgetRecord = widgetList.filter(function(e) { return a.WidgetType.indexOf(e.name.toLowerCase()) > -1 })[0];
                    let obj = angular.copy(a);
                    obj.x = widgetRecord.x;
                    obj.y = widgetRecord.y;
                    obj.moduleUrl = widgetRecord.moduleUrl;
                    obj.ImageUrl = "data:image/jpg;base64," + a.Image;
                    obj.Url = widgetRecord.Url;
                    obj.widgetType = a.WidgetType;
                    widget1.push(obj);
                }
            })
            $scope.WidgetList = widget1;
            let widget = $scope.WidgetList.filter(function(e) {
                return e.DashBoardID == dashboard.DashBoardID
            });
            let widgetNames = [];
            angular.forEach(widget, function(a, b) {
                let obj = angular.copy(a);
                widgetName = a.WidgetName;
                if (widgetNames.select("DisplayName").indexOf(a.WidgetName) == -1) {
                }
                else {
                    if (widgetName.indexOf(" ") == -1)
                        existingList = widgetNames.filter(function(e) { return e.DisplayName.indexOf(widgetName) > -1 && !e.DisplayName.indexOf(" ") > -1 }).select("DisplayName").distinct().sort().reverse();
                    else
                        existingList = widgetNames.filter(function(e) { return e.DisplayName.indexOf(widgetName) > -1 }).select("DisplayName").distinct().sort().reverse();
                    widgetName = a.WidgetName + "_" + (existingList[0].split("_").length > 1 ? parseInt(existingList[0].split("_")[1]) + 1 : "1");
                }
                obj.DisplayName = widgetName;
                widgetNames.push(obj);
            })
            $scope.DashboardWidgetList = widgetNames.sort(function(a, b) { return a.WidgetID - b.WidgetID });
            let uniqueList = [];
            angular.forEach(DashboardMaster.filter(function(e) { return e.DashBoardTypeId == dashboard.DashBoardTypeId }), function(a, b) {
                if (uniqueList.filter(function(e) { return e.DashBoardID == a.DashBoardID && e.DashBoardTypeId == a.DashBoardTypeId }).length == 0) {
                    a.isSelected = false;
                    if (dashboard.DashBoardID == a.DashBoardID)
                        a.isSelected = true;
                    uniqueList.push(a);
                }
            })
            $scope.DashboardsNameList = uniqueList;
            $scope.DashboardsNameList.filter(function(dashboard) { return dashboard.isSelected = false });
            dashboard.isSelected = true;
            $scope.end = $scope.DashboardsNameList.length;
            $timeout(function() {
                positionImageInWidget();
            })
            SetScroll($('.slides-container'), "#D31245", 0, 0, 0, 0, 3, false);
            angular.element(".selectAllSlides .selectAllSlideIcon").removeClass("active");
            angular.element(".slides-container:visible .slide-widget .icon-container div.selectSlideIcon").removeClass("active");
        }

        $scope.updateTimePeriod = function(dashboard) {
            showBackgroundShadow(true, true);
            let widgetList = DashboardMaster.filter(function(e) { return e.DashboardName == dashboard.DashboardName && e.DashBoardTypeId == dashboard.DashBoardTypeId });
            let updateStatus = true;
            for (var i = 0; i < widgetList.length; i++) {
                let selectionObj = JSON.parse(widgetList[i].SelectionObj);
                if (selectionObj.filter(function(e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectionObj.filter(function(e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function(e) { return e.DisplayName == "Custom Filters" }).length > 0) {
                    let record = selectionObj.filter(function(e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectionObj.filter(function(e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function(e) { return e.DisplayName == "Custom Filters" })[0].Data[0];
                    let fName = record.DisplayName;
                    let fId = record.FilterID;
                    let index = widgetList[i].SelectionSummary.split("||").findIndex(function(e) { return e.indexOf("ADDITIONAL FILTERS: Custom Filters") > -1 });
                    let filterName = widgetList[i].SelectionSummary.split("||")[index].replace("ADDITIONAL FILTERS: Custom Filters: ", "").trim();
                    if (CustomFilterMaster.filter(function(e) { return e.Name.toUpperCase() == fName.toUpperCase() }).length == 0) {
                        show_alert_popup("Alert", customMessages.CustomFilterTimeperiodUpdate);
                        showBackgroundShadow(false, false);
                        updateStatus = false;
                        break;
                    }
                    else if (CustomFilterMaster.filter(function(e) { return e.Name.toUpperCase() == fName.toUpperCase() && e.FilterID == fId }).length == 0) {
                        show_alert_popup("Alert", customMessages.CustomFilterTimeperiodUpdate);
                        showBackgroundShadow(false, false);
                        updateStatus = false;
                        break;
                    }
                }
            }

            if (!updateStatus)
                return;

            if (selectedModuleId == "6" && typeof (CustomGroupMaster) == "string") {
                setTimeout(function() {
                    $scope.updateTimePeriod(dashboard);
                })
                return false;
            }
            if (iniFlag) {
                angular.forEach(timeperiodList.select("TimePeriodType").distinct(), function(name, index) {
                    let templist = CustomGroupMaster.filter(function(e) { return e.Parent == name });
                    angular.forEach(templist, function(a, b) {
                        let obj = {};
                        obj.DisplayName = a.GroupName;
                        obj.TimePeriodType = name;
                        obj.FilterID = a.GroupId;
                        obj.Title = a.SelectionSummary;
                        timeperiodList.push(obj);
                    })
                })
                iniFlag = 0;
            }

            $scope.selectDashboard(dashboard);
            angular.element(".dashboardNameList .dashboardFeature div.updateTimePeriodIcon").removeClass("active");
            angular.element(".dashboardNameList[id='" + dashboard.DashBoardID + "'] .dashboardFeature div.updateTimePeriodIcon").addClass("active");
            show_popup("Update Time Period", '');
            var updateTime = "";
            let timePeriodTypeDiv = '';
            angular.forEach(timeperiodList.select("TimePeriodType").distinct(), function(a, b) {
                timePeriodTypeDiv += '<div class="timePeriodType ' + (b == 0 ? "selected" : "") + '" onclick="selectTimePeriodType(' + b + ',\'' + a + '\')"><div class="middleAlign">' + a + '</div></div>'
            })
            updateTime += '<div class="labelText" style="margin: 0.37vw 0 0.37vw 1.4vw;"><div class="middleAlign">SELECT TIME PERIOD</div></div>';
            updateTime += '<div class="timePeriodArea">' +
                '<div class="timePeriodTypeArea">' + timePeriodTypeDiv + '</div>' +
                '<div class="timePeriodListArea"></div>' +
                '</div>';
            updateTime += '<div class="buttonContainer">' +
                '<div class="buttonArea">' +
                '<div class="updateButton buttonDiv" ng-click="updateDashboardWidgets(' + dashboard.DashBoardTypeId + ',' + dashboard.DashBoardID + ',\'' + dashboard.UserID + '\')">' +
                '<div class="updateIconDiv buttonIconDiv"><div class="middleAlign"><div class="updateIcon buttonIcon"></div></div></div>' +
                '<div class="updateTextDiv buttonTextDiv"><div class="middleAlign">UPDATE</div></div>' +
                '</div>' +
                '</div>' +
                '<div class="buttonArea">' +
                '<div class="cancelButton buttonDiv" onclick="close_Dashboard_popup()">' +
                '<div class="cancelIconDiv buttonIconDiv"><div class="middleAlign"><div class="cancelIcon buttonIcon"></div></div></div>' +
                '<div class="cancelTextDiv buttonTextDiv"><div class="middleAlign">CANCEL</div></div>' +
                '</div>' +
                '</div>' +
                '</div>';
            angular.element(".popup-container").html($compile(updateTime)($scope));
            selectTimePeriodType(0, 'Quarter');
            $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
            $(".custom-popup:visible .popup-container").css({ "height": ((($(".custom-popup:visible").height() - 19) / document.documentElement.clientWidth) * 100) + "vw", "max-height": ((($(".custom-popup:visible").height() - 19) / document.documentElement.clientWidth) * 100) + "vw" });
            SetScroll($('.timePeriodListArea'), "#D31245", 0, 0, 0, 0, 3, false);
            SetScroll($('.timePeriodTypeArea'), "#D31245", 0, 0, 0, 0, 3, false);
            showBackgroundShadow(false, false);
        }

        $scope.updateDashboardWidgets = function(dashboardTypeId, dashboardId, userId) {
            angular.element('.timePeriodListArea').getNiceScroll().remove();
            updateDataList = [];
            let selectedTimePeriods = angular.element(".timePeriodListItem[timeperiodid != 0].selectedTimePeriod:visible").toArray();
            if (selectedTimePeriods.length > 0) {
                showBackgroundShadow(true, true);
                angular.element(document.getElementsByClassName("overlay")).show();
            }
            else {
                show_alert_popup("ALERT", "Please select time period");
                return false;
            }
            let selectedTimeIds = [];
            angular.forEach(selectedTimePeriods, function(a, b) {
                selectedTimeIds.push(angular.element(a).attr("timeperiodid"));
                //selectedTimeIds.push(parseInt(angular.element(a).attr("timeperiodid")));
            })
            if (!$scope.multiTimePeriodValidation(selectedTimeIds.sort(function(a, b) { return a - b }))) {
                showBackgroundShadow(false, false);
                show_alert_popup("Alert", customMessages.ConsecutiveTimePeriodSelection);
                angular.element(document.getElementsByClassName("overlay")).hide();
                return false;
            }
            let timeperiodType = $(".timePeriodType.selected").text().trim();
            let selectedTimePeriod = timeperiodList.filter(function(e) { return e.TimePeriodType == timeperiodType && selectedTimeIds.indexOf(e.FilterID) > -1 }).select("DisplayName").join(", ");
            let timeList = timeperiodList.filter(function(e) { return e.TimePeriodType == timeperiodType && selectedTimeIds.indexOf(e.FilterID) > -1 }).select("Title");
            let selectedYear = [];
            angular.forEach(timeList, function(a, b) {
                selectedYear.push(parseInt(a.substr(a.lastIndexOf(" ") == -1 ? 0 : a.lastIndexOf(" "))));
            })
            maxSelectedYear = Math.max.apply(this, selectedYear);

            let benchmark = "1";
            let benchType = "Previous Period";

            if (selectedTimeIds.join(",").indexOf("g") > -1 || (timeList.length > 1 && timeperiodType == "Quarter") || (timeList.length == 1 && (timeList[0].indexOf("Q1 2019") > -1 || timeperiodType == "Rolling 4 Quarter"))) {
                benchmark = "";
                benchType = "";
            }
            else if (timeperiodType == "COVID Quarter") {

                if (timeList.length == 1) {
                    let covidTime = timeList[0].split(' ');
                    let currTimeperiod = timeperiodList.filter(function(e) { return e.DisplayName == timeList[0] });
                    if (timeperiodList.filter(function(e) { return e.TimePeriodType == timeperiodType && e.DisplayName.indexOf(covidTime[2]) > -1 && e.FilterID < currTimeperiod[0].FilterID }).length == 0) {
                        benchmark = "";
                        benchType = "";
                    }
                }
                else {
                    let prevYearList = [];
                    angular.forEach(timeList, function(a, b) {
                        let t = a.split(' ');
                        t[1] = t[1] - 1;
                        t = t.join(' ');
                        prevYearList.push(t);
                    })
                    let isValid = 1;
                    angular.forEach(prevYearList, function(a, b) {
                        if (isValid) {
                            if (timeperiodList.filter(function(e) { return e.TimePeriodType == timeperiodType && e.DisplayName == a }).length == 0)
                                isValid = 0;
                        }
                    })

                    if (isValid) {
                        benchmark = "2";
                        benchType = "Previous Year";
                    }
                    else {
                        benchmark = "";
                        benchType = "";
                    }
                }

            }
            else if (timeperiodType == "YTD") {
                benchmark = "2";
                benchType = "Previous Year";
            }
            else if (timeperiodType == "Annual") {
                if (timeList[0].indexOf("2019") > -1) {
                    benchmark = "";
                    benchType = "";
                }
                else {
                    let prevYearList = timeList.map(function(value) {
                        return value - 1;
                    });
                    let isValid = 1;

                    angular.forEach(prevYearList, function(a, b) {
                        if (isValid) {
                            if (timeperiodList.filter(function(e) { return e.TimePeriodType == timeperiodtype && e.DisplayName == a }).length == 0)
                                isValid = 0;
                        }
                    })

                    if (isValid) {
                        benchmark = "2";
                        benchType = "Previous Year";
                    }
                    else {
                        benchmark = "";
                        benchType = "";
                    }

                }
            }


            let benchData = {
                DisplayName: "BENCHMARK",
                Data: [{
                    DisplayName: benchType,
                    FilterID: benchmark,
                    CountryID: 0,
                    hasSubMenusActive: true,
                    hasChildSelected: true,
                    Data: []
                }],
                CountryID: undefined,
                hasSubMenusActive: false,
                hasChildSelected: true,
                ParentId: null
            };

            let tempList = [];
            let origList = timeperiodList.filter(function(e) { return e.FilterID.indexOf("g") == -1 && e.TimePeriodType == timeperiodType }).select("FilterID");
            let selList = selectedTimeIds.filter(function(e) { return e.indexOf("g") == -1 });
            angular.forEach($scope.DashboardWidgetList, function(a, b) {
                let requestObj = JSON.parse(a.RequestObj);
                let selectionObj = JSON.parse(a.SelectionObj);
                let newBenchType = benchType;
                let newBenchmark = benchmark;
                let addnlFilter = selectionObj.filter(function(e) { return e.DisplayName == "ADDITIONAL FILTERS" });
                if (addnlFilter.length > 0 && addnlFilter[0].Data.filter(function(e) { return e.DisplayName == "COVID-19" }).length > 0 && addnlFilter[0].Data.filter(function(e) { return e.DisplayName == "COVID-19" })[0].Data.filter(function(e) { return e.DisplayName == "During-COVID19" }).length > 0) {
                    newBenchmark = "";
                    newBenchType = "";
                }
                let requestService = "";
                requestObj.Significance = newBenchmark;
                timeperiodType = $(".timePeriodType.selected").text().trim();
                if (a.WidgetType == "performance dashboard")
                    timeperiodType = "Annual";

                let timePeriodSummary = "TIME PERIOD: " + timeperiodType + ": ";

                if (a.WidgetType == "trend" || a.WidgetType == "stack") {//get crosstab data    
                    let obj = getSelectedMainValues(selectionObj);
                    if (requestObj.TimePeriod != "") {
                        requestObj.TimePeriod = selectedTimeIds.join(",");
                        timePeriodSummary = timePeriodSummary + selectedTimePeriod;
                    }
                    else if (obj.Column == "Time Period") {
                        requestObj.Columns = "TimePeriod|" + selectedTimeIds.join(",");
                        timePeriodSummary = timePeriodSummary + selectedTimePeriod;
                    }
                    else if (obj.Row == "Time Period") {
                        requestObj.Rows = "TimePeriod|" + selectedTimeIds.join(",");
                        timePeriodSummary = timePeriodSummary + selectedTimePeriod;
                    }
                    else if (obj.RowNesting == "Time Period") {
                        requestObj.RowNesting = "TimePeriod|" + selectedTimeIds.join(",");
                        timePeriodSummary = timePeriodSummary + selectedTimePeriod;
                    }
                    requestService = services.GetCrossTabData;
                }
                else if (a.WidgetType == "performance dashboard") {
                    requestObj.TimePeriod = timeperiodList.filter(function(e) { return e.TimePeriodType == timeperiodType && e.DisplayName == maxSelectedYear })[0].FilterID;
                    timePeriodSummary = timePeriodSummary.substr(0, timePeriodSummary.indexOf(": ") + 2) + maxSelectedYear;
                    requestService = services.GetPDashboardData;
                }
                else {//get snapshot data
                    requestObj.TimePeriod = selectedTimeIds.join(",");
                    timePeriodSummary = timePeriodSummary + selectedTimePeriod;
                    requestObj.WidgetId = widgetList.filter(function(e) {
                        return e.name.toUpperCase() == a.WidgetType.toUpperCase()
                    })[0].id;
                    requestService = services.GetSnapshotDataDashboard;
                }

                /*updating selection Obj*/
                let timeFilterId = [{ "type": "Quarter", "FilterID": 1 }, {
                    "type": "YTD", "FilterID": 2
                }, {
                    "type": "Rolling 4 Quarter", "FilterID": 3
                }, {
                    "type": "Annual", "FilterID": 4
                }, {
                    "type": "COVID Quarter", "FilterID": 5
                }];
                let timeData = timePeriodSummary.substr(timePeriodSummary.lastIndexOf(": ") + 2).split(",");
                let intData = [];
                angular.forEach(timeData, function(c, d) {
                    let obj = {};
                    let filID = timeperiodList.filter(function(e) { return e.TimePeriodType == timeperiodType && e.DisplayName == c.trim() })[0].FilterID;
                    obj.DisplayName = c.trim();
                    obj.Data = [];
                    obj.FilterID = filID.indexOf("g") > -1 ? filID : parseInt(filID);
                    obj.CountryID = 0;
                    obj.hasSubMenusActive = true;
                    obj.hasChildSelected = true;
                    obj.ParentId = a.WidgetType == "performance dashboard" ? null : timeFilterId.filter(function(e) { return e.type == timeperiodType })[0].FilterID;
                    obj.IsItemLevel = false;
                    if (obj.FilterID.toString().indexOf("g") > -1) {
                        let obj1 = {};
                        obj1.ParentId = a.WidgetType == "performance dashboard" ? null : obj.ParentId;
                        obj1.DisplayName = "Custom Group";
                        obj.ParentId = -1;
                        obj1.Data = [obj];
                        obj1.FilterID = -1;
                        obj1.CountryID = 0;
                        obj1.hasSubMenusActive = true;
                        obj1.hasChildSelected = true;
                        obj1.IsItemLevel = false;
                        if (intData.filter(function(e) { return e.DisplayName == "Custom Group" }).length == 0)
                            intData.push(obj1);
                        else
                            intData.filter(function(e) { return e.DisplayName == "Custom Group" })[0].Data.push(obj);
                    }
                    else
                        intData.push(obj);
                })
                if (origList.diff(selList).length == 0 && a.WidgetType != "performance dashboard") {
                    let newData = angular.copy(intData[0]);
                    newData.DisplayName = "Select All";
                    newData.FilterID = 0;
                    intData.unshift(newData);
                }
                let temp = [{ DisplayName: timeperiodType, FilterID: timeFilterId.filter(function(e) { return e.type == timeperiodType })[0].FilterID, IsItemLevel: false, Data: intData, hasSubMenusActive: true, hasChildSelected: true, ParentId: null }];
                if (a.WidgetType == "performance dashboard")
                    temp = intData;
                let selObj = JSON.parse(a.SelectionObj);
                selObj.filter(function(e) { return e.DisplayName == "TIME PERIOD" })[0].Data = temp;
                selObj = selObj.filter(function(e) { return e.DisplayName != "BENCHMARK" });
                if (newBenchType != "" && a.WidgetType != "performance dashboard") {
                    selObj.push(benchData);
                }
                a.SelectionObj = JSON.stringify(selObj);
                /*updating selection Obj*/
                requestObj.SelectedModuleId = "6";
                $.ajax({
                    type: callsType.Post,
                    url: requestService,
                    async: true,
                    data: JSON.stringify(requestObj),
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function(resp) {
                        let responseData = resp.DataList;
                        if (a.WidgetType == "trend" || a.WidgetType == "stack") {
                            $.ajax({
                                type: callsType.Post,
                                url: services.GetChartData,
                                async: false,
                                data: "{'responseData': '" + escape(JSON.stringify(responseData)) + "', 'showTotal': '" + (responseData.select("ColumnMetricName").distinct().indexOf("TOTAL") > -1) + "' }",
                                contentType: "application/json;charset=utf-8",
                                dataType: "json",
                                success: function(respdata) {
                                    //debugger;
                                    //if (respdata == false) {
                                    //    tempList.push()
                                    //}
                                    //else
                                    {
                                        responseData = respdata;
                                        a.ResponseData = JSON.stringify(responseData);
                                        a.RequestObj = JSON.stringify(requestObj);
                                        let index = a.SelectionSummary.split(" || ").findIndex(function(e) { return e.indexOf("TIME PERIOD") > -1 });
                                        let summary = a.SelectionSummary.split(" || ");
                                        summary[index] = timePeriodSummary;
                                        summary = summary.filter(function(e) { return e.indexOf("BENCHMARK") == -1 });
                                        if (newBenchType != "") {
                                            summary.push("BENCHMARK: " + newBenchType);
                                        }
                                        a.SelectionSummary = summary.join(" || ");
                                        tempList.push(a);
                                        if (tempList.length == $scope.DashboardWidgetList.length) {
                                            //$scope.expandWidget($scope.DashboardWidgetList[0]);
                                            storeUpdatedData(0);
                                        }
                                        //      angular.element(document.getElementsByClassName("overlay")).hide();

                                        //  show_popup("Alert", "Updated successfully");
                                    }
                                },
                                error: function(xhr, status, error) {
                                    angular.element(document.getElementsByClassName("overlay")).hide();
                                    showBackgroundShadow(false, false);
                                    show_popup("Alert", customMessages.Error);
                                    return false;
                                }
                            });
                        }

                        if (a.WidgetType != "trend" && a.WidgetType != "stack") {
                            a.ResponseData = JSON.stringify(responseData);
                            a.RequestObj = JSON.stringify(requestObj);
                            let index = a.SelectionSummary.split(" || ").findIndex(function(e) { return e.indexOf("TIME PERIOD") > -1 });
                            let summary = a.SelectionSummary.split(" || ");
                            summary[index] = timePeriodSummary;
                            summary = summary.filter(function(e) { return e.indexOf("BENCHMARK") == -1 });
                            if (newBenchType != "" && a.WidgetType != "performance dashboard") {
                                summary.push("BENCHMARK: " + newBenchType);
                            }
                            a.SelectionSummary = summary.join(" || ");
                            tempList.push(a);
                            if (tempList.length == $scope.DashboardWidgetList.length) {
                                //$scope.expandWidget($scope.DashboardWidgetList[0]);
                                storeUpdatedData(0);
                            }
                            //  angular.element(document.getElementsByClassName("overlay")).hide();
                        }


                    },
                    error: function(err, xhr, msg) {
                        angular.element(document.getElementsByClassName("overlay")).hide();
                        showBackgroundShadow(false, false);
                        show_popup("Alert", customMessages.Error);
                        return false;
                    }
                });
            })



        }

        function storeUpdatedData(b) {
            list = $scope.DashboardWidgetList;
            if (b >= list.length) {
                showBackgroundShadow(true, true);
                if (updateDataList.length == list.length) {
                    let count = 0;
                    angular.forEach(list, function(a, b) {
                        delete a.isSelected;
                        delete a.moduleUrl;
                        delete a.x;
                        delete a.y;
                        delete a.Url;
                        delete a.ImageUrl;
                        delete a.widgetType;
                        delete a.DisplayName;
                        delete a.$$hashKey;
                        $.ajax({
                            type: "POST",
                            url: services.UpdateDashboard,
                            data: JSON.stringify(a),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(response) {
                                count++;
                                if (count == updateDataList.length) {
                                    if (list.filter(function(e) { return e.WidgetType == "performance dashboard" }).length > 0) {
                                        msg = "Updated successfully.<br> Performance Dashboard widgets are updated for the year " + maxSelectedYear + ".";
                                        $scope.updatedScopeList(a, msg);
                                    }
                                    else
                                        $scope.updatedScopeList(a, "Updated successfully");

                                }
                            },
                            error: function(xhr, status, error) {
                                angular.element(document.getElementsByClassName("overlay")).hide();
                                showBackgroundShadow(false, false);
                                show_popup("Alert", customMessages.Error);
                                return false;
                            }
                        });
                    })

                }
                return
            };
            // some body
            let widgetDetails = list[b];
            $scope.expandWidget(widgetDetails);
            //showBackgroundShadow(true, true);
            var sContainer = $(".custom-popup.widgetchart");
            $(".custom-popup.widgetchart > div.popup-header").hide();
            d3.selectAll(".domain")
                .style("stroke", "transparent")
                .style("fill", "transparent");
            ReplaceSvgToCanvas(sContainer);
            html2canvas(sContainer, {
                allowTaint: true,
                letterRendering: true,
                useCORS: true,
                scale: 2,
                dpi: 600,
                imageTimeout: 0,
                logging: true,
                //imageTimeout: 1000,
                onrendered: function(canvas) {
                    ctx = canvas.getContext("2d");
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.imageSmoothingEnabled = false;
                    ctx.oImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    var theImage1 = canvas.toDataURL("image/png");
                    theImage1 = theImage1.replace('data:image/png;base64,', '');
                    widgetDetails.Image = theImage1;//(widgetDetails.WidgetType == "trend" || widgetDetails.WidgetType == "stack") ? widgetDetails.Image : theImage1;
                    widgetDetails.Flag = 1;
                    updateDataList.push(widgetDetails);
                    angular.element('canvas').remove();
                    angular.element('svg').show();
                    if (updateDataList.length == list.length)
                        close_Dashboard_popup();
                    storeUpdatedData(b + 1);
                }
            });
        }
        $scope.editDashboardName = function(dashboard, flag) {
            //$scope.selectDashboard(dashboard);
            angular.element(".dashboardNameList .dashboardFeature div.editDashboardNameIcon").removeClass("active");
            angular.element(".dashboardNameList[id='" + dashboard.DashBoardID + "'] .dashboardFeature div.editDashboardNameIcon").addClass("active");
            show_popup("Edit Dashboard Name", '');
            var editDashboard = "";
            editDashboard += '<div class="editDashboardName"><div class="textArea"><div class="middleAlign">Enter Dashboard Name</div></div><div class="inputArea" style=" margin-left: 0;"><div class="middleAlign"><input class="editDashboardName" placeholder="Enter Dashboard Name" maxlength="40"></div></div></div>';
            editDashboard += '<div class="buttonContainer">' +
                '<div class="buttonArea">' +
                (flag == 0 ? '<div class="saveButton buttonDiv" ng-click="saveAs_Dashboard(' + dashboard.DashBoardID + ',\'' + dashboard.UserID + '\')">' : '<div class="saveButton buttonDiv" ng-click="edit_DashboardName(' + dashboard.DashBoardTypeId + ',' + dashboard.DashBoardID + ',\'' + dashboard.UserID + '\')">') +
                '<div class="saveIconDiv buttonIconDiv"><div class="middleAlign"><div class="saveIcon buttonIcon"></div></div></div>' +
                '<div class="saveTextDiv buttonTextDiv"><div class="middleAlign">SAVE</div></div>' +
                '</div>' +
                '</div>' +
                '<div class="buttonArea">' +
                '<div class="cancelButton buttonDiv" onclick="close_Dashboard_popup()">' +
                '<div class="cancelIconDiv buttonIconDiv" style="margin-left: 3%;"><div class="middleAlign"><div class="cancelIcon buttonIcon"></div></div></div>' +
                '<div class="cancelTextDiv buttonTextDiv" style="width: calc(100% - 2.6vw);"><div class="middleAlign">CANCEL</div></div>' +
                '</div>' +
                '</div>' +
                '</div>';
            angular.element(".popup-container").html($compile(editDashboard)($scope));
            $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
            $(".custom-popup:visible .popup-container").css({ "height": ((($(".custom-popup:visible").height() - 36) / document.documentElement.clientWidth) * 100 + 1) + "vw", "max-height": ((($(".custom-popup:visible").height() - 36) / document.documentElement.clientWidth) * 100 + 1) + "vw" });
        }
        $scope.deleteDashboard = function(dashboard) {
            angular.element(".dashboardNameList .dashboardFeature div.deleteDashboardIcon").removeClass("active");
            angular.element(".dashboardNameList[id='" + dashboard.DashBoardID + "'] .dashboardFeature div.deleteDashboardIcon").addClass("active");
            show_popup("Delete Dashboard", '');
            var deleteDashboard = "";
            if (dashboard.DashBoardTypeId == 2)
                deleteDashboard += '<div class="editDashboardName"><div class="textArea" style="width:100%;text-align:center;margin:0;"><div class="middleAlign">Dashboard will be deleted only for you. Are you sure you want to delete the <b>entire dashboard?</b></div></div></div>';
            else if (dashboard.DashBoardTypeId == 3)
                deleteDashboard += '<div class="editDashboardName"><div class="textArea" style="width:100%;text-align:center;margin:0;"><div class="middleAlign">Dashboard will be deleted for all the users with whom the dashboard has been shared. Are you sure you want to delete the <b>entire dashboard?</b></div></div></div>';
            else
                deleteDashboard += '<div class="editDashboardName"><div class="textArea" style="width:100%;text-align:center;margin:0;"><div class="middleAlign">Do you wish to <b>Delete</b> the entire dashboard?</div></div></div>';
            deleteDashboard += '<div class="buttonContainer">' +
                '<div class="buttonArea">' +
                '<div class="yesButton buttonDiv" ng-click="delete_Dashboard(' + dashboard.DashBoardTypeId + ',' + dashboard.DashBoardID + ',\'' + dashboard.UserID + '\',0)">' +
                '<div class="yesIconDiv buttonIconDiv"><div class="middleAlign"><div class="yesIcon buttonIcon"></div></div></div>' +
                '<div class="yesTextDiv buttonTextDiv"><div class="middleAlign">YES</div></div>' +
                '</div>' +
                '</div>' +
                '<div class="buttonArea">' +
                '<div class="noButton buttonDiv" onclick="close_Dashboard_popup()">' +
                '<div class="noIconDiv buttonIconDiv"><div class="middleAlign"><div class="noIcon buttonIcon"></div></div></div>' +
                '<div class="noTextDiv buttonTextDiv"><div class="middleAlign">NO</div></div>' +
                '</div>' +
                '</div>' +
                '</div>';
            angular.element(".popup-container").html($compile(deleteDashboard)($scope));
            $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
            $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 26, "max-height": $(".custom-popup:visible").height() - 26 });

        }

        $scope.expandWidget = function(widget) {
            angular.element(".slides-container:visible .slide-widget[id=" + widget.WidgetID + "] .icon-container div.expandIcon").addClass("active");
            show_popup($scope.DashboardWidgetList.filter(function(e) { return e.WidgetID == widget.WidgetID })[0].DisplayName, '');
            try {
                if (arguments.callee.caller != null && (arguments.callee.caller.name == "captureImage" || arguments.callee.caller.name == "storeUpdatedData"))
                    showBackgroundShadow(true, true);
            }
            catch (ex) {
                let stack = ex.stack || '';
                if (stack != '' && (stack.indexOf("captureImage") > -1 || stack.indexOf("storeUpdatedData") > -1))
                    showBackgroundShadow(true, true);
            }
            let widgetImage = angular.element(".slides-container:visible .slide-widget[id=" + widget.WidgetID + "] > div > img");
            angular.element(".popup-container").html(widgetImage[0].outerHTML);
            $(".custom-popup:visible").css({ "width": "auto" });
            //if ($scope.ExceptionList.indexOf(widget.widgetType) > -1)
            //    $(".custom-popup:visible").css({ "width": "min-content" });
            $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
            $(".custom-popup:visible .popup-container,.custom-popup:visible").addClass("widgetchart");
            //$(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 26, "max-height": $(".custom-popup:visible").height() - 26 });
            let calcWidth = parseFloat(widgetList.filter(function(e) { return e.name == widget.WidgetType.toUpperCase() })[0].width.replace("vw", ''));//($(".custom-popup:visible .popup-container.widgetchart > img").width() / document.documentElement.clientWidth) * 100;
            let calcHeight = parseFloat(widgetList.filter(function(e) { return e.name == widget.WidgetType.toUpperCase() })[0].height.replace("vw", ''));//($(".custom-popup:visible .popup-container.widgetchart > img").height() / document.documentElement.clientWidth) * 100;
            $(".custom-popup:visible .popup-container").css({ "height": calcHeight + 1 + "vw", "max-height": calcHeight + 1 + "vw", "overflowY": "hidden" });
            if (widget.WidgetType != "trend" && widget.WidgetType != "stack" && widget.WidgetType != "performance dashboard") {
                $(".custom-popup:visible").css({ "width": calcWidth + "vw" });
                angular.element(".custom-popup:visible .popup-container").html("<div class='widget' id='widget_" + JSON.parse(widget.ResponseData)[0].WidgetNumber + "' style='width:" + calcWidth + "vw;height:" + calcHeight + "vw;box-shadow: none;pointer-events:none;margin:0;'></div>")
                rebindChart(widget, angular.element(".custom-popup:visible .popup-container .widget"));
            }
            else if (widget.WidgetType == "performance dashboard") {
                $(".custom-popup:visible").css({ "width": calcWidth + "vw" });
                angular.element(".custom-popup:visible .popup-container").html("<div class='chartArea' id='PDchartArea' style='width:" + calcWidth + "vw;height:" + calcHeight + "vw;box-shadow: none;pointer-events:none;margin:0;'></div>");
                rebindChart(widget, angular.element(".custom-popup:visible .popup-container .chartArea"));
            }
            else {
                let width = 0.7, height = 0.8;
                try {
                    if (arguments.callee.caller != null && (arguments.callee.caller.name == "captureImage" || arguments.callee.caller.name == "storeUpdatedData"))
                        width = 1, height = 1;
                }
                catch (ex) {
                    let stack = ex.stack || '';
                    if (stack != '' && (stack.indexOf("captureImage") > -1 || stack.indexOf("storeUpdatedData") > -1))
                        width = 1, height = 1;
                }
                $(".custom-popup:visible").css({ "width": calcWidth * width + "vw" });
                angular.element(".custom-popup:visible .popup-container").html("<div class='chartArea' id='chartArea' style='width:" + calcWidth * width + "vw;height:" + calcHeight * height + "vw;box-shadow: none;pointer-events:none;margin:0;'></div>")
                rebindChart(widget, angular.element(".custom-popup:visible.popup-container .chartArea"));
                angular.element(".custom-popup:visible .popup-container .chartArea .saveDashboard").remove();
            }
            let widgetRecord = widgetList.filter(function(e) { return e.name == widget.WidgetType.toUpperCase() })[0];
            let headerIcon = '<div class="widgetIconDiv">' +
                '<div class="middleAlign">' +
                '<div class="widget-icon" style="background: url(' + widgetRecord.Url + ');"></div>' +
                '</div>' +
                '</div>';
            angular.element(".widgetchart .popup-header #custom_message").prepend(headerIcon);
        }

        $scope.getInfo = function(widget) {
            let moduleName = "Occasion Profile";
            if (widget.moduleUrl.indexOf("Crosstab") > -1)
                moduleName = "Visual Crosstab";
            else if (widget.moduleUrl.indexOf("PerformanceDashboard") > -1)
                moduleName = "Performance Dashboard";
            angular.element(".slides-container:visible .slide-widget[id=" + widget.WidgetID + "] .icon-container div.infoIcon").addClass("active");
            let selectionSummary = widget.SelectionSummary.split(" || ");
            show_popup("Information", '');
            var info = '<div class="property">' +
                '<div class="tabIcon"><div class="middleAlign"><div class="owner"></div></div></div>' +
                '<div class="tabName" title="Owner"><div class="middleAlign">Owner</div></div>' +
                '<div class="tabInfo" title="' + widget.CreatedBy + '"><div class="middleAlign">' + widget.CreatedBy + '</div></div>' +
                '</div>';
            info += '<div class="property">' +
                '<div class="tabIcon"><div class="middleAlign"><div class="moduleName"></div></div></div>' +
                '<div class="tabName" title="Module"><div class="middleAlign">Module</div></div>' +
                '<div class="tabInfo" title="' + moduleName + '"><div class="middleAlign">' + moduleName + '</div></div>' +
                '</div>';
            angular.forEach(selectionSummary, function(a, b) {
                let tabName = a.split(": ")[0].toLowerCase();
                info += '<div class="property">' +
                    '<div class="tabIcon"><div class="middleAlign"><div class="' + (tabName.replace(/[ ]/g, '') == "5ws" ? "ws" : tabName.replace(/[ ]/g, '').replace("/item/brand", '')) + '"></div></div></div>' +
                    '<div class="tabName" title="' + titleCase(tabName) + '"><div class="middleAlign">' + tabName + '</div></div>' +
                    '<div class="tabInfo" title="' + a.substring(a.indexOf(":") + 1) + '"><div class="middleAlign">' + a.substring(a.indexOf(":") + 1) + '</div></div>' +
                    '</div>';
            })
            angular.element(".popup-container").html(info);
            $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
            $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 36, "max-height": $(".custom-popup:visible").height() - 36 });
        }

        $scope.goToOriginalModule = function(widget) {
            let selectionObj = JSON.parse(widget.SelectionObj);

            if (selectionObj.filter(function(e) { return e.DisplayName == "TIME PERIOD" })[0].Data.filter(function(e) { return e.DisplayName == "YTD" }).length > 0) {
                let latestYTDTimeperiod = timeperiodList.filter(function(e) { return e.TimePeriodType == "YTD" })[0].DisplayName;
                let timeperiodPresentinWidget = selectionObj.filter(function(e) { return e.DisplayName == "TIME PERIOD" })[0].Data.filter(function(e) { return e.DisplayName == "YTD" })[0].Data[0].DisplayName;
                if (latestYTDTimeperiod != timeperiodPresentinWidget) {
                    show_alert_popup("Alert", "Please update dashboard with latest YTD time period.");
                    showBackgroundShadow(false, false);
                    return false;
                }
            }

            if (selectionObj.filter(function(e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectionObj.filter(function(e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function(e) { return e.DisplayName == "Custom Filters" }).length > 0) {
                let record = selectionObj.filter(function(e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function(e) { return e.DisplayName == "Custom Filters" })[0].Data[0];
                let fName = record.DisplayName;
                let fId = record.FilterID;
                if (CustomFilterMaster.filter(function(e) { return e.Name.toUpperCase() == fName.toUpperCase() }).length == 0) {
                    show_alert_popup("Alert", "Custom Filters: " + fName + " is not created in Additional filter.");
                    showBackgroundShadow(false, false);
                    return false;
                }
                else if (CustomFilterMaster.filter(function(e) { return e.Name.toUpperCase() == fName.toUpperCase() && e.FilterID == fId }).length == 0) {
                    show_alert_popup("Alert", "Custom Filters: " + fName + " is not created in Additional filter.");
                    showBackgroundShadow(false, false);
                    return false;
                }
            }

            let checkList = ["CATEGORY/ITEM/BRAND", "DEMOGRAPHICS", "5Ws", "OCCASION", "ADDITIONAL FILTERS"];

            for (var i in checkList) {
                if (!checkCustomGroup(selectionObj, checkList[i]))
                    return false;
            }

            sessionStorage.setItem("widgetInfo", JSON.stringify(widget));
            if (!$scope.checkAccess(widget)) {
                show_popup("Alert", "Access to this module is <b>Restricted</b>.");
                return false;
            }
            window.open(widget.moduleUrl, '_blank');
            //use widget.RequestObj,widget.SelectionSummary,widget.ResponseData
        }

        function checkCustomGroup(selectionObj, bucketName) {
            if (selectionObj.filter(function(e) { return e.DisplayName == bucketName }).length > 0) {
                let catObj = selectionObj.filter(function(e) { return e.DisplayName == bucketName })[0].Data;
                if (bucketName != "OCCASION" && bucketName != "ADDITIONAL FILTERS") {
                    if (!checkForRowColumn(catObj, "COLUMN", bucketName))
                        return false;
                    if (!checkForRowColumn(catObj, "ROW", bucketName))
                        return false;
                }
                else {
                    if (!checkForRowColumn(catObj, bucketName, bucketName))
                        return false;
                }

            }

            return true;
        }

        function checkForRowColumn(catObj, bucket, bucketName) {
            if (catObj.filter(function(e) { return e.DisplayName.toUpperCase() == bucket }).length > 0 || bucket == "OCCASION" || bucket == "ADDITIONAL FILTERS") {
                let bucketData = catObj;
                if (bucket != "OCCASION" && bucket != "ADDITIONAL FILTERS" && bucketName != "5Ws") {
                    bucketData = catObj.filter(function(e) { return e.DisplayName.toUpperCase() == bucket })[0].Data;
                }
                else if (bucket == "ADDITIONAL FILTERS" || bucketName == "5Ws") {
                    bucketData = $scope.getPKsAndName(catObj, []);
                }
                let record = "";

                if (bucketData.filter(function(e) { return e.DisplayName.indexOf("Custom Group") > -1 }).length > 0)
                    record = bucketData.filter(function(e) { return e.DisplayName.indexOf("Custom Group") > -1 })[0].Data;
                else if (bucketData.filter(function(e) { return e.Parent != undefined && e.Parent.indexOf("Custom Group") > -1 }).length > 0)
                    record = bucketData.filter(function(e) { return e.Parent.indexOf("Custom Group") > -1 });

                if (record != "") {
                    for (var i in record) {
                        let fName = record[i].DisplayName;
                        if (CustomGroupMaster.filter(function(e) { return e.GroupName.toUpperCase() == fName.toUpperCase() }).length == 0) {
                            show_alert_popup("Alert", "Custom Group: " + fName + " is not created in " + bucketName + ".");
                            showBackgroundShadow(false, false);
                            return false;
                        }
                        else {
                            let fId = CustomGroupMaster.filter(function(e) { return e.GroupName == fName }).select("FilterID");
                            if (CustomGroupMaster.filter(function(e) { return e.GroupName.toUpperCase() == fName.toUpperCase() && e.FilterID == fId }).length == 0) {
                                show_alert_popup("Alert", "Custom Group: " + fName + " is not created in " + bucketName + ".");
                                showBackgroundShadow(false, false);
                                return false;
                            }
                        }

                    }

                }
            }

            return true;
        }

        $scope.selectSlide = function(widgetId) {
            if (angular.element(".slides-container:visible .slide-widget[id=" + widgetId + "] .icon-container div.selectSlideIcon").hasClass("active")) {
                angular.element(".selectAllSlides .selectAllSlideIcon").removeClass("active");
                angular.element(".slides-container:visible .slide-widget[id=" + widgetId + "] .icon-container div.selectSlideIcon").removeClass("active");
            }
            else {
                angular.element(".slides-container:visible .slide-widget[id=" + widgetId + "] .icon-container div.selectSlideIcon").addClass("active");
                let totalCount = angular.element(".slides-container:visible .slide-widget .icon-container div.selectSlideIcon").length;
                let selectedCount = angular.element(".slides-container:visible .slide-widget .icon-container div.selectSlideIcon.active").length;
                if (totalCount == selectedCount)
                    angular.element(".selectAllSlides .selectAllSlideIcon").addClass("active");
            }
        }

        $scope.saveSelectedSlides = function() {
            let selectedWidgetIds = [];
            let selectedDashboardTypeId = 2;//this option only present in shared with me
            let selectedDashboardId = angular.element(".dashboardNameList.active:visible").attr("id");
            let dashboard = $scope.DashboardsNameList.filter(function(e) {
                return e.DashBoardID == selectedDashboardId && e.DashBoardTypeId == selectedDashboardTypeId
            })[0];
            $scope.editDashboardName(dashboard, 0);
            angular.element(".custom-popup .popup-header .middleAlign").text("Save As");
            $("input.editDashboardName:visible").val(dashboard.DashboardName);
        }

        $scope.saveAs_Dashboard = function(dashboardId, userId) {
            showBackgroundShadow(true, true);
            var requestObj = {};
            requestObj.UserID = userId;
            requestObj.DashBoardTypeId = 1;
            requestObj.DashBoardID = dashboardId;
            requestObj.DashboardName = "";
            requestObj.WidgetName = "";
            requestObj.WidgetID = 0;
            requestObj.SelectionSummary = "";
            requestObj.RequestObj = "";
            requestObj.Image = "";
            requestObj.ResponseData = "";
            requestObj.SelectionObj = "";
            requestObj.Flag = 0;
            let dbName = angular.element("input.editDashboardName:visible").val();
            if (dbName == "" || dbName.match(/^[A-Za-z][0-9A-Za-z_-][0-9A-Za-z_-]+$/) == null) {
                show_alert_popup("ALERT", "Enter a valid Dashboard Name");
                showBackgroundShadow(false, false);
                return false;
            }
            let notAlreadyExists = DashboardMaster.filter(function(e) { return e.DashboardName.toLowerCase() == dbName.toLowerCase() && e.DashBoardTypeId == 1 }).length == 0;
            if (notAlreadyExists) {
                close_Dashboard_popup();
                requestObj.DashboardName = dbName;
                $.ajax({
                    type: "POST",
                    url: services.SaveAsDashboard,
                    data: JSON.stringify(requestObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(response) {
                        $scope.updatedScopeList(requestObj, "Saved successfully");
                    },
                    error: function(xhr, status, error) {
                        showBackgroundShadow(false, false);
                        show_popup("Alert", customMessages.Error);
                        return false;
                    }
                });
            }
            else {
                show_alert_popup("ALERT", "Dashboard Name already exists");
                showBackgroundShadow(false, false);
                return false;
            }
        }
        $scope.selectAllSlides = function() {
            if (!angular.element(".selectAllSlides .selectAllSlideIcon").hasClass("active")) {
                angular.element(".selectAllSlides .selectAllSlideIcon").addClass("active");
                angular.element(".slides-container:visible .slide-widget .icon-container div.selectSlideIcon").addClass("active");
            }
            else {
                angular.element(".selectAllSlides .selectAllSlideIcon").removeClass("active");
                angular.element(".slides-container:visible .slide-widget .icon-container div.selectSlideIcon").removeClass("active");
            }
        }

        $scope.deleteSelectedSlides = function() {
            let selectedWidgetIds = [];
            if ($scope.DashboardWidgetList.length > 0) {
                let selectedDashboardTypeId = $scope.DashboardWidgetList[0].DashBoardTypeId;
                let selectedDashboardId = angular.element(".dashboardNameList.active:visible").attr("id");
                angular.forEach(angular.element(".slides-container:visible .slide-widget .icon-container div.selectSlideIcon.active").parents(".slide-widget"), function(a, b) {
                    let widgetDetails = $scope.DashboardWidgetList.filter(function(e) {
                        return e.WidgetID == angular.element(a).attr("id")
                    })[0];
                    selectedWidgetIds.push(angular.element(a).attr("id"));
                })
                if (selectedWidgetIds.length == 0) {
                    show_popup("Alert", "No slides to delete");
                    return false;
                }
                show_popup("Delete Dashboard", '');
                var deleteDashboard = "";
                if (selectedDashboardTypeId == 1)
                    deleteDashboard += '<div class="editDashboardName"><div class="textArea" style="width:100%;text-align:center;margin:0;"><div class="middleAlign">Do you wish to delete the <b>selected slides of the</b> dashboard?</div></div></div>';
                else if (selectedDashboardTypeId == 3)
                    deleteDashboard += '<div class="editDashboardName"><div class="textArea" style="width:100%;text-align:center;margin:0;"><div class="middleAlign">Slides will be deleted for all the users. Are you sure you want to delete the <b>selected slides</b> of the dashboard?</div></div></div>';
                else if (selectedDashboardTypeId == 2)
                    deleteDashboard += '<div class="editDashboardName"><div class="textArea" style="width:100%;text-align:center;margin:0;"><div class="middleAlign">Slides will be deleted only for you. Are you sure you want to delete the <b>selected slides</b> of the dashboard?</div></div></div>';
                deleteDashboard += '<div class="buttonContainer">' +
                    '<div class="buttonArea">' +
                    '<div class="yesButton buttonDiv" ng-click="delete_Dashboard(' + selectedDashboardTypeId + ',' + selectedDashboardId + ',\'' + DashboardMaster[0].UserID + '\',1,\'' + selectedWidgetIds.join(",") + '\')">' +
                    '<div class="yesIconDiv buttonIconDiv"><div class="middleAlign"><div class="yesIcon buttonIcon"></div></div></div>' +
                    '<div class="yesTextDiv buttonTextDiv"><div class="middleAlign">YES</div></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="buttonArea">' +
                    '<div class="noButton buttonDiv" onclick="close_Dashboard_popup()">' +
                    '<div class="noIconDiv buttonIconDiv"><div class="middleAlign"><div class="noIcon buttonIcon"></div></div></div>' +
                    '<div class="noTextDiv buttonTextDiv"><div class="middleAlign">NO</div></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                angular.element(".popup-container").html($compile(deleteDashboard)($scope));
                $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
                $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 25, "max-height": $(".custom-popup:visible").height() - 25 });
            }
            else {
                show_popup("Alert", "No slides to delete");
                return false;
            }
        }
        $scope.deleteSharedDashboard = function() {
            let selectedDashboardTypeId = 2;//this option only present in shared with me
            let selectedDashboardId = angular.element(".dashboardNameList.active:visible").attr("id");
            let dashboard = DashboardMaster.filter(function(e) { return e.DashBoardID == selectedDashboardId && e.DashBoardTypeId == selectedDashboardTypeId })[0];
            show_popup("Delete Dashboard", '');
            var deleteDashboard = "";
            deleteDashboard += '<div class="editDashboardName"><div class="textArea" style="width:100%;text-align:center;margin:0;"><div class="middleAlign">Dashboard will be deleted only for you. Are you sure you want to delete the <b>entire dashboard?</b></div></div></div>';
            deleteDashboard += '<div class="buttonContainer">' +
                '<div class="buttonArea">' +
                '<div class="yesButton buttonDiv" ng-click="delete_Dashboard(' + dashboard.DashBoardTypeId + ',' + dashboard.DashBoardID + ',\'' + dashboard.UserID + '\',0)">' +
                '<div class="yesIconDiv buttonIconDiv"><div class="middleAlign"><div class="yesIcon buttonIcon"></div></div></div>' +
                '<div class="yesTextDiv buttonTextDiv"><div class="middleAlign">YES</div></div>' +
                '</div>' +
                '</div>' +
                '<div class="buttonArea">' +
                '<div class="noButton buttonDiv" onclick="close_Dashboard_popup()">' +
                '<div class="noIconDiv buttonIconDiv"><div class="middleAlign"><div class="noIcon buttonIcon"></div></div></div>' +
                '<div class="noTextDiv buttonTextDiv"><div class="middleAlign">NO</div></div>' +
                '</div>' +
                '</div>' +
                '</div>';
            angular.element(".popup-container").html($compile(deleteDashboard)($scope));
            $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
            $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 36, "max-height": $(".custom-popup:visible").height() - 36 });
        }
        $scope.getTrustedHtml = function(item) {
            return $sce.trustAsHtml(item);
        }
        $scope.edit_DashboardName = function(dashboardTypeId, dashboardId, userId, flag) {
            showBackgroundShadow(true, true);
            var requestObj = {};
            requestObj.UserID = userId;
            requestObj.DashBoardTypeId = dashboardTypeId;
            requestObj.DashBoardID = dashboardId;
            requestObj.DashboardName = "";
            requestObj.WidgetName = "";
            requestObj.WidgetID = 0;
            requestObj.SelectionSummary = "";
            requestObj.RequestObj = "";
            requestObj.Image = "";
            requestObj.ResponseData = "";
            requestObj.SelectionObj = "";
            requestObj.Flag = 0;
            let dbName = angular.element("input.editDashboardName").val();
            if (dbName == "" || dbName.match(/^[A-Za-z][0-9A-Za-z_-][0-9A-Za-z_-]+$/) == null) {
                show_alert_popup("ALERT", "Enter a valid Dashboard Name");
                showBackgroundShadow(false, false);
                return false;
            }
            let notAlreadyExists = DashboardMaster.filter(function(e) { return e.DashboardName.toLowerCase() == dbName.toLowerCase() && e.DashBoardTypeId == dashboardTypeId }).length == 0;
            if (notAlreadyExists) {
                requestObj.DashboardName = dbName;
                close_Dashboard_popup();
                $.ajax({
                    type: "POST",
                    url: services.UpdateDashboard,
                    data: JSON.stringify(requestObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(response) {
                        $scope.updatedScopeList(requestObj, "Edited successfully");
                    },
                    error: function(xhr, status, error) {
                        showBackgroundShadow(false, false);
                        show_popup("Alert", customMessages.Error);
                        return false;
                    }
                });
            }
            else {
                show_alert_popup("ALERT", "Dashboard Name already exists");
                showBackgroundShadow(false, false);
                return false;
            }
        }
        $scope.delete_Dashboard = function(dashboardTypeId, dashboardId, userId, flag, widgetIds) {
            showBackgroundShadow(true, true);
            close_Dashboard_popup();
            var requestObj = {};
            requestObj.UserID = userId;
            requestObj.DashBoardTypeId = dashboardTypeId;
            requestObj.DashBoardID = dashboardId;
            requestObj.DashboardName = "";
            requestObj.WidgetName = "";
            requestObj.WidgetID = 0;
            requestObj.SelectionSummary = "0";
            if (widgetIds != undefined)
                requestObj.SelectionSummary = widgetIds;
            requestObj.RequestObj = "";
            requestObj.Image = "";
            requestObj.ResponseData = "";
            requestObj.SelectionObj = "";
            requestObj.Flag = flag;
            $.ajax({
                type: "POST",
                url: services.DeleteDashboard,
                data: JSON.stringify(requestObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    $scope.updatedScopeList(requestObj, "Deleted successfully");
                },
                error: function(xhr, status, error) {
                    showBackgroundShadow(false, false);
                    show_popup("Alert", customMessages.Error);
                    return false;
                }
            });
        }
        $scope.searchItemClick = function(item, searchText) {
            item = item.replace(new RegExp("<strong>", 'gi'), "").replace(new RegExp("</strong>", 'gi'), "");
            let dashboard = $scope.DashboardsNameList.filter(function(e) {
                return e.DashboardName.toUpperCase() == item.toUpperCase()
            })[0];

            /*making the searched dashboard visible*/
            let selectedDashboardId = angular.element(".dashboardNameList:visible").first().attr("id");
            let selectedindex = $scope.DashboardsNameList.findIndex(function(e) {
                return e.DashBoardID == selectedDashboardId
            })
            let toBeSelectedIndex = $scope.DashboardsNameList.findIndex(function(e) {
                return e.DashboardName.toUpperCase() == item.toUpperCase()
            })
            if (toBeSelectedIndex <= selectedindex) {
                for (var i = 0; i < selectedindex - toBeSelectedIndex; i++)
                    $scope.moveLeft();
            }
            else {
                for (var i = 0; i < toBeSelectedIndex - selectedindex; i++)
                    $scope.moveRight();
            }
            /*making the searched dashboard visible*/
            $scope.selectDashboard(dashboard);
            searchText.text = "";
        }

        $scope.downloadSelectedSlides = function(dashboard) {
            let count = 0;
            let list = angular.element(".slides-container:visible .slide-widget .icon-container div.selectSlideIcon.active").parents(".slide-widget").toArray().reverse();
            if (dashboard != undefined) {
                //$scope.selectDashboard(dashboard);
                list = angular.copy(DashboardMaster.filter(function(e) { return e.DashBoardID == dashboard.DashBoardID && e.DashBoardTypeId == dashboard.DashBoardTypeId }))//angular.element(".slides-container:visible .slide-widget .icon-container div.selectSlideIcon").parents(".slide-widget").toArray().reverse();
            }
            if (list.length > 0) {
                showBackgroundShadow(true, true);
                let downloadList = [];
                angular.forEach(list, function(a, b) {
                    let obj = dashboard != undefined ? a : angular.copy($scope.DashboardWidgetList.filter(function(e) { return e.WidgetType == angular.element(a).attr("type") && e.WidgetID == angular.element(a).attr("id") })[0]);
                    if (obj.isSelected != undefined)
                        delete obj.isSelected;
                    if (obj.moduleUrl != undefined)
                        delete obj.moduleUrl;
                    if (obj.x != undefined)
                        delete obj.x;
                    if (obj.y != undefined)
                        delete obj.y;
                    if (obj.Url != undefined)
                        delete obj.Url;
                    if (obj.ImageUrl != undefined)
                        delete obj.ImageUrl;
                    if (obj.widgetType != undefined)
                        delete obj.widgetType;
                    if (obj.widgetType != undefined)
                        delete obj.widgetType;
                    if (obj.$$hashKey != undefined)
                        delete obj.$$hashKey;
                    obj.WidgetID = widgetList.filter(function(e) { return e.name == obj.WidgetType.toUpperCase() })[0].id;
                    obj.Image = null;
                    //obj.RequestObj = null;
                    obj.SelectionObj = null;
                    downloadList.push(obj);
                })

                $.ajax({
                    type: "POST",
                    url: services.DashboardExportToPPT,
                    data: JSON.stringify(downloadList),
                    contentType: "application/json; charset=utf-8",
                    success: function(response) {
                        if (response != "") {
                            window.location.href = services.DownloadFile + encodeURIComponent(response);
                            $timeout(function() {
                                showBackgroundShadow(false, false);
                            }, 1000);
                        }
                        else {
                            showBackgroundShadow(false, false);
                            show_popup("Alert", customMessages.Error);
                            return false;
                        }
                    },
                    error: function(xhr, status, error) {
                        showBackgroundShadow(false, false);
                        show_popup("Alert", customMessages.Error);
                        return false;
                    }
                });
            }
            else {
                show_popup("Alert", "No slides to download");
                return false;
            }
        }
        function captureImage(list, b) {
            if (b >= list.length) {
                if (pptRequestList.length == list.length) {
                    $.ajax({
                        type: "POST",
                        url: services.DashboardExportToPPT,
                        data: JSON.stringify(pptRequestList),
                        contentType: "application/json; charset=utf-8",
                        success: function(response) {
                            if (response != "") {
                                window.location.href = services.DownloadFile + encodeURIComponent(response);
                                angular.element(document.getElementsByClassName("overlay")).hide();
                                $timeout(function() {
                                    showBackgroundShadow(false, false);
                                }, 1000);
                            }
                            else {
                                angular.element(document.getElementsByClassName("overlay")).hide();
                                showBackgroundShadow(false, false);
                                show_popup("Alert", customMessages.Error);
                                return false;
                            }
                        },
                        error: function(xhr, status, error) {
                            angular.element(document.getElementsByClassName("overlay")).hide();
                            showBackgroundShadow(false, false);
                            show_popup("Alert", customMessages.Error);
                            return false;
                        }
                    });
                }
                return
            };
            // some body
            let widgetDetails = $scope.DashboardWidgetList.filter(function(e) {
                return e.WidgetID == angular.element(list[b]).attr("id")
            })[0];
            $scope.expandWidget(widgetDetails);
            setTimeout(1000);
            //showBackgroundShadow(true, true);
            var sContainer = $(".custom-popup.widgetchart");
            $(".custom-popup.widgetchart > div.popup-header").hide();
            d3.selectAll(".domain")
                .style("stroke", "transparent")
                .style("fill", "transparent");
            ReplaceSvgToCanvas(sContainer);
            html2canvas(sContainer, {
                allowTaint: true,
                letterRendering: true,
                useCORS: true,

                //imageTimeout: 1000,
                onrendered: function(canvas) {
                    ctx = canvas.getContext("2d");
                    ctx.webkitImageSmoothingEnabled = false;
                    ctx.mozImageSmoothingEnabled = false;
                    ctx.imageSmoothingEnabled = false;
                    ctx.oImageSmoothingEnabled = false;
                    ctx.msImageSmoothingEnabled = false;
                    var theImage1 = canvas.toDataURL();
                    theImage1 = theImage1.replace('data:image/png;base64,', '');
                    var request = {};
                    request.Occasion = angular.element(".dashboardNameList.active:visible").text().trim();//dashboardName;
                    request.Base64String = theImage1;//(widgetDetails.WidgetType == "trend" || widgetDetails.WidgetType == "stack") ? widgetDetails.Image : theImage1;
                    request.ImageName = "temp_Image_" + b;
                    request.theImage = request.Base64String;
                    request.SelectionSummary = widgetDetails.SelectionSummary;
                    request.SampleSize = widgetDetails.DisplayName;
                    request.CreatedBy = widgetDetails.CreatedBy.toString();
                    request.DateCreated = widgetDetails.CreatedDate.toString();
                    if (pptRequestList.filter(function(e) { return e.ImageName == "temp_Image_" + b }).length == 0)
                        pptRequestList.push(angular.copy(request));
                    angular.element('canvas').remove();
                    angular.element('svg').show();
                    if (b + 1 == pptRequestList.length)
                        close_Dashboard_popup();
                    captureImage(list, b + 1);
                }
            });
        }

        $scope.updatedScopeList = function(requestObj, msg) {
            showBackgroundShadow(true, true);
            $scope.loadDashboard(requestObj, msg, $scope);
        }
        $scope.openShareDashbaord = function() {

            angular.element(document.querySelectorAll('#share')).addClass('active');
            show_popup("Share Dashboard", '');

            var addDashboardDiv = "";
            addDashboardDiv += '<div class="labelText"><div class="middleAlign">SELECT DASHBOARD</div></div>';
            let dashboardList = DashboardMaster.filter(function(e) {
                return e.DashBoardTypeId == 1
            });
            let dashboardDiv = "";
            let uniqueList = [];
            dashboardDiv += '<div id="search-container" class="headerButton dashboardSearchBox" style="margin: 0;width: 98%;">' +
                '<input type="text" placeholder="Search" id="dashboardSearchBox" ng-keyup="bindDashbaordSearchList()"/>' +
                '<div id="searchIcon-container">' +
                '<div  class="middleAlign"><div id="searchIcon"></div></div>' +
                '</div>' +
                '<div class="search-item-container"></div>' +
                '</div>';
            angular.forEach(dashboardList, function(a, b) {
                let obj = {
                };
                obj.dashboardid = a.DashBoardID;
                obj.dashboardtypeid = a.DashBoardTypeId;
                if (uniqueList.filter(function(e) { return e.dashboardid == a.DashBoardID && e.dashboardtypeid == a.DashBoardTypeId }).length == 0) {
                    dashboardDiv += '<div class="dashboard-list-item" dashboardid="' + a.DashBoardID + '" dashboardtypeid="' + a.DashBoardTypeId + '" ng-click="selectDashboardMulti(' + a.DashBoardID + ',' + a.DashBoardTypeId + ')" style="font-size: 0.9vw;">' +
                        '<div class="radioButton"><div class="middleAlign"><div class="radioImage multiple"></div></div></div>' +
                        '<div class="radioText"><div class="middleAlign">' + a.DashboardName + (a.DashBoardTypeId == 3 ? '<sup>*</sup>' : '') + '</div></div>' +
                        '</div>'
                    uniqueList.push(obj);
                }

            })
            addDashboardDiv += '<div class="dashboardListDiv" style="max-height: 8.8vw;height: 8.6vw;">' + dashboardDiv + '</div>';
            addDashboardDiv += '<div class="sharedNoteDiv" style="height:0.7vw;"><div class="bottomShadow" style="top: 0.14vw;"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div></div>'

            var shareDiv = addDashboardDiv;
            let shareTypeDiv = '';
            angular.forEach(["Individual", "Groups"], function(a, b) {
                let selectedIcon = (b == 0 ? '<div class="selectedIcon"><div class="middleAlign"><div class="selected-arrow-icon"></div></div></div>' : "")
                shareTypeDiv += '<div class="userType ' + (b == 0 ? "selected" : "") + '" ng-click="selectShareType(' + b + ',\'' + a + '\')"><div class="middleAlign">' + a + '</div>' + selectedIcon + '</div>'
            })
            shareDiv += '<div class="labelText"><div class="middleAlign">SHARE WITH</div></div>';
            shareDiv += '<div class="userArea">' +
                '<div class="userTypeArea">' + shareTypeDiv + '</div>' +
                '<div class="userListArea"></div>' +
                '</div>';
            shareDiv += '<div class="buttonContainer">' +
                '<div class="buttonArea">' +
                '<div class="shareButton buttonDiv" ng-click="shareDashboard(\'' + sessionStorage.getItem("Username") + '\')">' +
                '<div class="shareIconDiv buttonIconDiv"><div class="middleAlign"><div class="shareIcon buttonIcon"></div></div></div>' +
                '<div class="shareTextDiv buttonTextDiv"><div class="middleAlign">SHARE</div></div>' +
                '</div>' +
                '</div>' +
                '<div class="buttonArea">' +
                '<div class="cancelButton buttonDiv" onclick="close_Dashboard_popup()">' +
                '<div class="cancelIconDiv buttonIconDiv"><div class="middleAlign"><div class="cancelIcon buttonIcon"></div></div></div>' +
                '<div class="cancelTextDiv buttonTextDiv"><div class="middleAlign">CANCEL</div></div>' +
                '</div>' +
                '</div>' +
                '</div>';
            angular.element(".popup-container").html($compile(shareDiv)($scope));
            $scope.selectShareType(0, 'Individual');
            $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
            $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 19, "max-height": $(".custom-popup:visible").height() - 19 });
            SetScroll($('.dashboardListDiv'), "#D31245", 0, 0, 0, 0, 3, false);
            SetScroll($('.userArea > .userListArea'), "#D31245", 0, 0, 0, 0, 3, false);


        }
        $scope.selectShareType = function(flag, name) {
            let timeList = '<div class="columnShadow" style="height:100%;left: -0.44vw;"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png" style="height:100%;"></div>';
            angular.element(".userTypeArea > div").removeClass("selected");
            angular.element(".userTypeArea > div:eq(" + flag + ")").addClass("selected");
            timeList += '<div id="search-container" class="headerButton userSearchBox" style="margin:0.37vw 0 0.37vw 5%;">' +
                '<input type="text" placeholder="Search" id="userSearchBox" ng-keyup="bindUserSearchList(' + flag + ')"/>' +
                '<div id="searchIcon-container">' +
                '<div  class="middleAlign"><div id="searchIcon"></div></div>' +
                '</div>' +
                '<div class="search-item-container"></div>' +
                '</div>'
            if (flag == 0) {
                angular.forEach($scope.users.filter(function(e) { return e.UserName != sessionStorage.getItem("Username") }), function(a, b) {
                    timeList += '<div class="userListItem" ng-click="selectUser(\'' + a.UserName + '\',0)" userid="' + a.UserName + '">' +
                        '<div class="radioButton"><div class="middleAlign"><div class="radioImage multiple"></div></div></div>' +
                        '<div class="radioText"><div class="middleAlign">' + a.Name + '</div></div>' +
                        '</div>'

                })
            }
            else {
                angular.forEach($scope.groupsList, function(a, b) {
                    timeList += '<div class="userListItem" ng-click="selectUser(' + a.GroupId + ',1)" groupid="' + a.GroupId + '">' +
                        '<div class="radioButton"><div class="middleAlign"><div class="radioImage multiple"></div></div></div>' +
                        '<div class="radioText"><div class="middleAlign">' + a.GroupName + " [" + a.NoOfUsers + "]" + '</div></div>' +
                        '</div>'

                })
            }
            angular.element(".userListArea").html($compile(timeList)($scope));
        }

        $scope.selectUser = function(id, flag, check) {

            if (flag == 0) {
                if (angular.element(".userListArea > .userListItem[userid='" + id + "']").hasClass("selectedTimePeriod") && check == undefined)
                    angular.element(".userListArea > .userListItem[userid='" + id + "']").removeClass("selectedTimePeriod");
                else {
                    if (angular.element(".custom-popup .userListArea > .userListItem.selectedTimePeriod").length >= maxUsersToShare) {
                        show_alert_popup("Alert", "Dashboard(s) can be shared with maximum 20 users at a time.");
                        return false;
                    }
                    angular.element(".userListArea > .userListItem[userid='" + id + "']").addClass("selectedTimePeriod");
                }

            }
            else if (flag == 1) {
                if (angular.element(".userListArea > .userListItem[groupid='" + id + "']").hasClass("selectedTimePeriod") && check == undefined)
                    angular.element(".userListArea > .userListItem[groupid='" + id + "']").removeClass("selectedTimePeriod");
                else {
                    if (angular.element(".custom-popup .userListArea > .userListItem.selectedTimePeriod").length >= maxGroupsToShare) {
                        show_alert_popup("Alert", "Dashboard(s) can be shared with maximum 3 groups at a time.");
                        return false;
                    }
                    angular.element(".userListArea > .userListItem[groupid='" + id + "']").addClass("selectedTimePeriod");
                }
            }
            if (check != undefined) {
                angular.element("#userSearchBox").val("");
                angular.element(".userSearchBox .search-item-container").html("");
            }
        }

        $scope.bindUserSearchList = function(flag) {
            let searchText = angular.element("#userSearchBox").val().toLowerCase();
            if (searchText == "" || searchText.length < 3) {
                angular.element(".userSearchBox .search-item-container").html("");
                return false;
            }
            let listDiv = "";
            let list = [];
            if (flag == 0) {
                list = $scope.users.filter(function(e) { return e.Name.toLowerCase().indexOf(searchText) > -1 && e.UserName != sessionStorage.getItem("Username") });
                angular.forEach(list, function(a, b) {
                    listDiv += '<div class="search-item" ng-click="selectUser(\'' + a.UserName + '\',0,1)" id="' + a.UserName + '"><div class="middleAlign">' + a.Name.replace(new RegExp(searchText, 'gi'), "<strong>" + searchText + "</strong>") + '</div></div>'
                })
            }
            else if (flag == 1) {
                list = $scope.groupsList.filter(function(e) { return e.GroupName.toLowerCase().indexOf(searchText) > -1 });
                angular.forEach(list, function(a, b) {
                    listDiv += '<div class="search-item" ng-click="selectUser(\'' + a.GroupId + '\',1,1)" id="' + a.GroupId + '"><div class="middleAlign">' + a.GroupName.replace(new RegExp(searchText, 'gi'), "<strong>" + searchText + "</strong>") + '</div></div>'
                })
            }
            angular.element(".userSearchBox .search-item-container").html($compile(listDiv)($scope));
            SetScroll($('.userSearchBox .search-item-container'), "#D31245", 0, 0, 0, 0, 3, false);
        }

        $scope.selectDashboardMulti = function(dashboardId, dashboardTypeId, check) {
            if (angular.element(".dashboardListDiv > div[dashboardid=" + dashboardId + "][dashboardtypeid=" + dashboardTypeId + "]").hasClass("selectedDashboardOption") && check == undefined)
                angular.element(".dashboardListDiv > div[dashboardid=" + dashboardId + "][dashboardtypeid=" + dashboardTypeId + "]").removeClass("selectedDashboardOption");
            else {
                if (angular.element(".custom-popup .dashboardListDiv > div.selectedDashboardOption").length >= maxDashboardForShare) {
                    show_alert_popup("Alert", "Maximum 3 Dashboard can be shared at a time.");
                    return false;
                }
                angular.element(".dashboardListDiv > div[dashboardid=" + dashboardId + "][dashboardtypeid=" + dashboardTypeId + "]").addClass("selectedDashboardOption");
            }

            if (check != undefined) {
                angular.element("#dashboardSearchBox").val("");
                angular.element(".dashboardSearchBox .search-item-container").html("");
            }



        }

        $scope.bindDashbaordSearchList = function() {
            let searchText = angular.element("#dashboardSearchBox").val().toLowerCase();
            if (searchText == "" || searchText.length < 3) {
                angular.element(".dashboardSearchBox .search-item-container").html("");
                return false;
            }
            let listDiv = "";
            let list = [];
            list = DashboardMaster.filter(function(e) {
                return e.DashBoardTypeId == 1 && e.DashboardName.toLowerCase().indexOf(searchText) > -1
            });
            let uniqueList = [];
            angular.forEach(list, function(a, b) {
                if (uniqueList.filter(function(e) { return e.DashBoardID == a.DashBoardID && e.DashBoardTypeId == a.DashBoardTypeId }).length == 0) {
                    a.isSelected = false;
                    if (uniqueList.length == 0)
                        a.isSelected = true;
                    uniqueList.push(a);
                }
            })
            angular.forEach(uniqueList, function(a, b) {
                listDiv += '<div class="search-item" ng-click="selectDashboardMulti(' + a.DashBoardID + ',' + a.DashBoardTypeId + ',1)" id="' + a.DashBoardID + '"><div class="middleAlign">' + a.DashboardName.replace(new RegExp(searchText, 'gi'), "<strong>" + searchText + "</strong>") + '</div></div>'
            })
            angular.element(".dashboardSearchBox .search-item-container").html($compile(listDiv)($scope));

            SetScroll($('.dashboardSearchBox .search-item-container'), "#D31245", 0, 0, 0, 0, 3, false);
        }

        $scope.shareDashboard = function(userId) {
            let flag = angular.element(".userType.selected").text().trim() == "Individual" ? 0 : 1;
            let dashboardIds = [];
            let userList = [];
            angular.forEach(angular.element(".dashboardListDiv:visible .dashboard-list-item.selectedDashboardOption"), function(a, b) {
                dashboardIds.push(angular.element(a).attr("dashboardid"));
            })
            if (dashboardIds.length == 0) {
                show_alert_popup("ALERT", "Select dashboard(s) to share");
                return false;
            }
            angular.forEach(angular.element(".userListArea:visible .userListItem.selectedTimePeriod"), function(a, b) {
                if (flag == 0)
                    userList.push(angular.element(a).attr("userid"));
                else
                    userList.push(angular.element(a).attr("groupid"));
            })
            if (userList.length == 0) {
                show_alert_popup("ALERT", "Select users to share dashboard(s)");
                return false;
            }
            showBackgroundShadow(true, true);
            close_Dashboard_popup();
            var requestObj = {
            };
            requestObj.UserID = userId;
            requestObj.DashBoardTypeId = 1;
            requestObj.DashBoardID = 1;
            requestObj.DashboardName = "";
            requestObj.WidgetName = "";
            requestObj.WidgetID = 0;
            requestObj.SelectionSummary = "0";
            if (dashboardIds != undefined)
                requestObj.SelectionSummary = dashboardIds.join(",");
            requestObj.RequestObj = "0";
            if (userList != undefined)
                requestObj.RequestObj = userList.join(",");
            requestObj.Image = "";
            requestObj.ResponseData = "";
            requestObj.SelectionObj = "";
            requestObj.Flag = flag;
            $.ajax({
                type: "POST",
                url: services.ShareDashboard,
                data: JSON.stringify(requestObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(response) {
                    $scope.updatedScopeList(requestObj, "Shared successfully");
                },
                error: function(e) {
                    showBackgroundShadow(false, false);
                    show_popup("Alert", customMessages.Error);
                    return false;
                }
            });
        }
        $scope.checkAccess = function(widget) {
            let accessCode = sessionStorage.getItem("Modules").split(",");
            let moduleName = accessList.filter(function(e) { return accessCode.indexOf(e.id.toString()) > -1 }).select("Module");
            let redirectModule = widget.moduleUrl.split("/")[1];
            if (moduleName.indexOf(redirectModule) > -1 || moduleName.indexOf("All Modules") > -1)
                return true;
            return false;
        }

        $scope.editWidgetName = function(widget, flag) {
            //$scope.selectDashboard(dashboard);
            angular.element(".slide-widget .icon-container div.editDashboardNameIcon").removeClass("active");
            angular.element(".slide-widget[id='" + widget.WidgetID + "'] .icon-container div.editDashboardNameIcon").addClass("active");
            show_popup("Edit Widget Name", '');
            var editWidget = "";
            editWidget += '<div class="editWidgetName"><div class="textArea" style="width: calc(40% - 1.4vw);"><div class="middleAlign">Enter Widget Name</div></div><div class="inputArea" style=" margin-left: 0;width: calc(60% - 1.4vw);"><div class="middleAlign"><input class="editWidgetName" placeholder="Enter Name" value="' + widget.WidgetName + '" maxlength="80"></div></div></div>';
            editWidget += '<div class="buttonContainer">' +
                '<div class="buttonArea">' + '<div class="saveButton buttonDiv" ng-click="edit_WidgetName(' + widget.DashBoardTypeId + ',' + widget.DashBoardID + ',' + widget.WidgetID + ',\'' + widget.UserID + '\')">' +
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
            angular.element(".popup-container").html($compile(editWidget)($scope));
            $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
            $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 26, "max-height": $(".custom-popup:visible").height() - 26 });
        }

        $scope.edit_WidgetName = function(dashboardTypeId, dashboardId, widgetId, userId) {
            showBackgroundShadow(true, true);
            var requestObj = {};
            requestObj.UserID = userId;
            requestObj.DashBoardTypeId = dashboardTypeId;
            requestObj.DashBoardID = dashboardId;
            requestObj.DashboardName = "";
            requestObj.WidgetName = "";
            requestObj.WidgetID = widgetId;
            requestObj.SelectionSummary = "";
            requestObj.RequestObj = "";
            requestObj.Image = "";
            requestObj.ResponseData = "";
            requestObj.SelectionObj = "";
            requestObj.Flag = 2;
            let wdgName = angular.element("input.editWidgetName").val();
            if (wdgName == "" || wdgName.match(/^(?![ ])(?!.*[ ]$)(?!.*?[ ][ ])[A-Za-z][0-9A-Za-z_() /-][0-9A-Za-z_() /-]+$/) == null) {
                show_alert_popup("ALERT", "Please enter valid Widget name. Widget name must contain atleast 3 characters and cannot contain special character apart from Space ' ',Parenthesis '()', '/', '_', '-'.");
                showBackgroundShadow(false, false);
                return false;
            }
            let notAlreadyExists = $scope.DashboardWidgetList.filter(function(e) { return e.DashBoardID == dashboardId && e.DashBoardTypeId == dashboardTypeId && e.WidgetName == wdgName }).length == 0;
            if (notAlreadyExists) {
                requestObj.DashboardName = wdgName;
                close_Dashboard_popup();
                $.ajax({
                    type: "POST",
                    url: services.UpdateDashboard,
                    data: JSON.stringify(requestObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function(response) {
                        $scope.updatedScopeList(requestObj, "Edited successfully");
                    },
                    error: function(xhr, status, error) {
                        showBackgroundShadow(false, false);
                        show_popup("Alert", customMessages.Error);
                        return false;
                    }
                });
            }
            else {
                show_alert_popup("ALERT", "Widget Name already exists");
                showBackgroundShadow(false, false);
                return false;
            }
        }

    }])
    .filter("search", function() {
        return function(listItem, args) {
            searchText = args["searchText"];
            if (searchText == "" || searchText == undefined || searchText == null || searchText.length < 3) {
                return [];
            }
            else {
                let retList = listItem.select("DashboardName");
                let filteredList = retList.filter(function(e) {
                    return e.toUpperCase().indexOf(searchText.toUpperCase()) > -1
                });
                var newFilteredList = [];
                angular.forEach(filteredList, function(value, index) {
                    newFilteredList.push((value.replace(new RegExp(searchText, 'gi'), "<strong>" + searchText + "</strong>")));
                });
                SetScroll($('.search-item-container'), "#D31245", 0, 0, 0, 0, 3, false);
                return newFilteredList;
            }
        }
    })

function selectTimePeriodType(flag, name) {
    let timeList = '<div class="columnShadow" style="height:100%;left: -0.44vw;"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png" style="height:100%;"></div>';
    angular.element(".timePeriodTypeArea > div").removeClass("selected");
    angular.element(".timePeriodTypeArea > div:eq(" + flag + ")").addClass("selected");
    let qList = timeperiodList.filter(function(e) { return e.TimePeriodType == "Quarter" });
    let list = timeperiodList.filter(function(e) { return e.TimePeriodType == name });
    if (name == "Annual" && qList[qList.length - 1].DisplayName.indexOf("Q4") == -1)
        list.splice(list.length - 1);
    if (name != "YTD" && name != "Rolling 4 Quarter") {
        let obj = {
            DisplayName: "Select All",
            FilterID: 0,
            TimePeriodType: name,
            Title: "Select All"
        };
        list.unshift(obj);
    }
    if (selectedModuleId == "7") {
        list = list.filter(function(e) { return e.DisplayName.indexOf("2019") == -1 });
    }
    let count = list.filter(function(e) { return e.FilterID.toString().indexOf("g") == -1 }).length - 1;
    angular.forEach(list, function(a, b) {
        let selectedIcon = (b == 0 ? '<div class="selectedIcon"><div class="middleAlign"><div class="selected-arrow-icon"></div></div></div>' : "")
        timeList += '<div class="timePeriodListItem ' + (b == count && selectedModuleId != "7" ? "selectedTimePeriod" : "") + '" onclick="selectTimePeriod(\'' + a.FilterID + '\',' + flag + ')" timeperiodid="' + a.FilterID + '" title="' + a.Title + '">' + selectedIcon +
            '<div class="radioButton"><div class="middleAlign"><div class="radioImage' + (name == "Rolling 4 Quarter" ? "" : " multiple") + '"></div></div></div>' +
            '<div class="radioText"><div class="middleAlign">' + a.DisplayName + '</div></div>' +
            '</div>'

    })
    angular.element(".timePeriodListArea").html(timeList);
    selectAllTimePeriod();
}

function selectTimePeriod(id, flag) {
    if (flag == 2) {
        angular.element(".timePeriodListArea > .timePeriodListItem[timeperiodid!='" + id + "']").removeClass("selectedTimePeriod");
    }
    if (angular.element(".timePeriodListArea > .timePeriodListItem[timeperiodid='" + id + "']").hasClass("selectedTimePeriod")) {
        angular.element(".timePeriodListArea > .timePeriodListItem[timeperiodid='" + id + "']").removeClass("selectedTimePeriod");
        if (id == 0)//select all
            angular.element(".timePeriodListArea > .timePeriodListItem").removeClass("selectedTimePeriod");
    }
    else {
        angular.element(".timePeriodListArea > .timePeriodListItem[timeperiodid='" + id + "']").addClass("selectedTimePeriod");
        if (id == 0)//select all
            angular.element(".timePeriodListArea > .timePeriodListItem").addClass("selectedTimePeriod");
    }
    selectAllTimePeriod();
}
function selectAllTimePeriod() {
    if (angular.element(".timePeriodListArea > .timePeriodListItem[timeperiodid=0]").length > 0) {
        let totalCount = angular.element(".timePeriodListArea > .timePeriodListItem[timeperiodid!=0]").length;
        let selectedCount = angular.element(".timePeriodListArea > .timePeriodListItem[timeperiodid!=0].selectedTimePeriod").length;
        if (totalCount == selectedCount)
            angular.element(".timePeriodListArea > .timePeriodListItem[timeperiodid=0]").addClass("selectedTimePeriod");
        else
            angular.element(".timePeriodListArea > .timePeriodListItem[timeperiodid=0]").removeClass("selectedTimePeriod");
    }
}
function rebindChart(widget, element) {
    let widgetData = JSON.parse(widget.ResponseData);
    let requestObj = JSON.parse(widget.RequestObj);
    if (widget.WidgetType == "stack" || widget.WidgetType == "trend") {
        isDispLabel = requestObj.isDispLabel;
        isDispTotal = requestObj.isDispTotal;
    }
    if (widgetData.length > 0) {
        try {
            if (widget.WidgetType != "stack" && widget.WidgetType != "trend" && widget.WidgetType != "performance dashboard") {
                let id = widgetData[0].WidgetNumber;
                if (id == 1)
                    bindCircleChart(widgetData, element, widget);
                else if (id == 2)
                    bindWidget2(widgetData, element, widget);
                else if (id == 3)
                    bindWidget3(widgetData, element, widget);
                else if (id == 4)
                    bindWidget4(widgetData, element, widget);
                else if (id == 5)
                    bindWidget5(widgetData, element, widget);
                else if (id == 6)
                    bindWidget6_8_10(widgetData, element, widget);
                else if (id == 7)
                    bindWidget7(widgetData, element, widget);
                else if (id == 8)
                    bindWidget6_8_10(widgetData, element, widget);
                else if (id == 9)
                    bindWidget9(widgetData, element, widget);
                else if (id == 10)
                    bindWidget6_8_10(widgetData, element, widget);
            }
            else if (widget.WidgetType == "trend") {
                stackChartData = widgetData.filter(function(e) { return e.category != "TOTAL" });
                plot_trend_chart(widgetData.filter(function(e) { return e.category != "TOTAL" }), false, "", true, isDispLabel);
            }
            else if (widget.WidgetType == "stack") {
                list = widgetData;
                if (!isDispTotal)
                    list = widgetData.filter(function(e) { return e.category != "TOTAL" })
                stackChartData = list;
                plot_stack_chart(list, false, "", true, isDispLabel);
            }
            else if (widget.WidgetType == "performance dashboard") {
                CreateGrid("Distribution", element, widgetData);
            }
        }
        catch (ex) {
            show_popup("ALERT", customMessages.Error);
        }
    }
    else {
        element.append('<div class="datanotavailable"><div class="middleAlign">Data Not Available</div></div>');
        return false;
    }
}
function positionImageInWidget() {
    setTimeout(function() {
        angular.forEach($(".slide-widget .imageContainer").toArray(), function(a, b) {
            height = angular.element(a).height();
            width = angular.element(a).width();
            imgHeight = angular.element(a).find(".image").height();
            imgWidth = angular.element(a).find(".image").width();
            angular.element(a).find(".image").css({ "margin-top": (height - imgHeight) / 2, "margin-left": (width - imgWidth) / 2 })
        })
        setTimeout(function() {
            showBackgroundShadow(false, false);
            angular.element(document.getElementsByClassName("overlay")).hide();
        }, 200);
    })
}