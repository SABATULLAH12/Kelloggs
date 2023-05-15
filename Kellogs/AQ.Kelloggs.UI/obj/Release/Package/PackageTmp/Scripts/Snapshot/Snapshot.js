var leftPanel_Parents =
    [
        { id: 1, parent_name: "TIME PERIOD", parent_id: "", DisplayName: "TIME PERIOD", name_class: "timeperiod", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 2, parent_name: "MARKETS", parent_id: "", DisplayName: "MARKETS", name_class: "markets", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 3, parent_name: "OCCASION", parent_id: "", DisplayName: "OCCASION", name_class: "occasion", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isGroupNeeded: true },
        { id: 4, parent_name: "ADDITIONAL FILTERS", parent_id: "", DisplayName: "ADDITIONAL FILTERS", name_class: "additionalfilters", selections: "None", hasChild: true, menuLevel: 0, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 5, parent_name: "BENCHMARK", parent_id: "", DisplayName: "BENCHMARK", name_class: "benchmark", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isDisabled: false }
    ]

var MarketRegionList = [];
var selectedItems = [], LeftPanelOriginalData, timeperiodList, SnapshotRequest = [], responseData = [], submitFlag = 0, exportFlag = 0, stackChartData = [];

var WidgetNameIdList = [
    { "id": "1", "WidgetName": "EATING OCCASION FRAMEWORK" },
    { "id": "2", "WidgetName": "WHO" },
    { "id": "3", "WidgetName": "WHO WITH" },
    { "id": "4", "WidgetName": "WHEN" },
    { "id": "5", "WidgetName": "WHERE" },
    { "id": "6", "WidgetName": "WHY" },
    { "id": "7", "WidgetName": "WHAT" },
    { "id": "8", "WidgetName": "ACTIVITIES" },
    { "id": "9", "WidgetName": "PURCHASE" },
    { "id": "10", "WidgetName": "SHOPPER MISSION" }
]
$(window).resize(function () {
    if (responseData.length > 0) {
        if ($(".page1").is(":visible")) {
            angular.element(document.getElementById("widget_1")).find(".widget-body").remove();
            angular.element(document.getElementById("widget_2")).find(".widget-body").remove();
            angular.element(document.getElementById("widget_3")).find(".widget-body").remove();
            angular.element(document.getElementById("widget_4")).find(".widget-body").remove();
            angular.element(document.getElementById("widget_5")).find(".widget-body").remove();
            angular.element(document.getElementById("widget_6")).find(".widget-body").remove();
            if (responseData.filter(function (e) { return e.WidgetNumber == 1 }).length > 0)
                bindCircleChart(responseData.filter(function (e) { return e.WidgetNumber == 1 }), angular.element(document.getElementById("widget_1")));
            if (responseData.filter(function (e) { return e.WidgetNumber == 2 }).length > 0)
                bindWidget2(responseData.filter(function (e) { return e.WidgetNumber == 2 }), angular.element(document.getElementById("widget_2")));
            if (responseData.filter(function (e) { return e.WidgetNumber == 3 }).length > 0)
                bindWidget3(responseData.filter(function (e) { return e.WidgetNumber == 3 }), angular.element(document.getElementById("widget_3")));
            if (responseData.filter(function (e) { return e.WidgetNumber == 4 }).length > 0)
                bindWidget4(responseData.filter(function (e) { return e.WidgetNumber == 4 }), angular.element(document.getElementById("widget_4")));
            if (responseData.filter(function (e) { return e.WidgetNumber == 5 }).length > 0)
                bindWidget5(responseData.filter(function (e) { return e.WidgetNumber == 5 }), angular.element(document.getElementById("widget_5")));
            if (responseData.filter(function (e) { return e.WidgetNumber == 6 }).length > 0)
                bindWidget6_8_10(responseData.filter(function (e) { return e.WidgetNumber == 6 }), angular.element(document.getElementById("widget_6")));
        }
        else {
            angular.element(document.getElementById("widget_7")).find(".widget-body").remove();
            angular.element(document.getElementById("widget_8")).find(".widget-body").remove();
            angular.element(document.getElementById("widget_9")).find(".widget-body").remove();
            angular.element(document.getElementById("widget_10")).find(".widget-body").remove();

            if (responseData.filter(function (e) { return e.WidgetNumber == 7 }).length > 0)
                bindWidget7(responseData.filter(function (e) { return e.WidgetNumber == 7 }), angular.element(document.getElementById("widget_7")));
            if (responseData.filter(function (e) { return e.WidgetNumber == 8 }).length > 0)
                bindWidget6_8_10(responseData.filter(function (e) { return e.WidgetNumber == 8 }), angular.element(document.getElementById("widget_8")));
            if (responseData.filter(function (e) { return e.WidgetNumber == 9 }).length > 0)
                bindWidget9(responseData.filter(function (e) { return e.WidgetNumber == 9 }), angular.element(document.getElementById("widget_9")));
            if (responseData.filter(function (e) { return e.WidgetNumber == 10 }).length > 0)
                bindWidget6_8_10(responseData.filter(function (e) { return e.WidgetNumber == 10 }), angular.element(document.getElementById("widget_10")));
        }
    }
})
angular.module('starter.controllers', ["ngAnimate", 'commonService'])
    .controller('parent-controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {
        showBackgroundShadow(true, true);
        $scope.ModuleIsHidden = true;
        //$scope.showSettings = false;
        $scope.leftMenuIsHidden = true;
        $scope.parent_list = [];
        angular.element(document.querySelectorAll(".moduleLevel[title='OCCASION PROFILE']")).addClass("active");
        angular.element(document.querySelectorAll(".module-name .middleAlign")).text("Occasion Profile");

        modifyFooter();

        //add specific class for internet explorer
        if ((/*@cc_on!@*/false || !!document.documentMode)) {
            angular.element("body,html,form").addClass("ie11");
        }

        $scope.LeftStaticMenu = leftPanel_Parents;
        $http({
            method: callsType.Post,
            url: services.LoadLeftPanel,
            data: { "moduleId": selectedModuleId },
            async: true,
        }).then(function successCallback(response) {
            LeftPanelOriginalData = response.data.where(function (e) { return e.DisplayName });
            timeperiodList = response.data[response.data.length - 1];
            MarketRegionList = [];
            angular.forEach(LeftPanelOriginalData.filter(function (e) { return e.DisplayName == "Markets" })[0].data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), function (a, b) {
                angular.forEach(a.data, function (c, d) {
                    MarketRegionList.push({ "DisplayName": c.DisplayName, "Region": a.DisplayName, "MarketId": c.CountryID, "FilterID": c.FilterID, "isDisabled": false })
                })
            })
        }, function (data) {
        });

        $(".left-view-container > .wrapper > ul").append('<div style="height: calc((100% / 13) * 8);background: white;box-shadow: inset -8px 0 10px -10px rgba(36, 21, 11, 0.5);" class="menu-tab-left"></div>')
        loadCommonFunctionalities($scope, commonService, $http); //Common functionalities

        $scope.Exports = function (type) {
            if (!exportFlag) {
                show_popup("Alert", "Please click on submit and try again, as the selection has been changed.");
                return false;
            }
            myFunction1();
            showBackgroundShadow(true, true);

            if (type == "ppt") {

                if (angular.element(document.getElementsByClassName("widgetArea")).is(":visible")) {
                    if ($(".view-load.page2").is(":visible"))
                        loadPage(1);
                    var sContainer = $(".view-load.page1");
                    if (!(/*@cc_on!@*/false || !!document.documentMode)) {
                        angular.element("body,html,form").addClass("ie11");
                    }
                    ReplaceSvgToCanvas(sContainer);

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
                            var request = SnapshotRequest;
                            request.Base64String = theImage1;
                            request.ImageName = "temp_Image_1";
                            request.theImage = request.Base64String;
                            $.ajax({
                                type: "POST",
                                url: services.SaveImageSnapshot,
                                data: JSON.stringify(request),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: function (response) {
                                    loadPage(2);
                                    var sContainer = $(".view-load.page2");
                                    ReplaceSvgToCanvas(sContainer);
                                    html2canvas($(sContainer), {
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
                                            var theImage2 = canvas.toDataURL();
                                            theImage2 = theImage2.replace('data:image/png;base64,', '');
                                            request.Base64String = theImage2;
                                            request.ImageName = "temp_Image_2";
                                            request.theImage = request.Base64String;
                                            $.ajax({
                                                type: "POST",
                                                url: services.SaveImageSnapshot,
                                                data: JSON.stringify(request),
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                success: function (response) {
                                                    loadPage(1);
                                                    if (response.ResponseCode == 1) {
                                                        request.Base64String = theImage1 + ";" + theImage2;
                                                        request.ImageName = "temp_Image_1" + ";" + "temp_Image_2";
                                                        request.theImage = request.Base64String;
                                                        request.Occasion = angular.element("#left-pane-container").scope().getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "OCCASION" })[0].Data, []).select("DisplayName").join(', ').toUpperCase();
                                                        $.ajax({
                                                            type: "POST",
                                                            url: services.SnapshotExportToPPT,
                                                            data: JSON.stringify(request),
                                                            contentType: "application/json; charset=utf-8",
                                                            success: function (response) {
                                                                if (response != "") {
                                                                    window.location.href = services.DownloadFile + encodeURIComponent(response);
                                                                    $timeout(function () {
                                                                        showBackgroundShadow(false, false);
                                                                    });
                                                                }
                                                                if (!(/*@cc_on!@*/false || !!document.documentMode)) {
                                                                    angular.element("body,html,form").removeClass("ie11");
                                                                }
                                                            },
                                                            error: function (e) {
                                                            }
                                                        });
                                                        angular.element('canvas').remove();
                                                        angular.element('svg').show();
                                                    }
                                                    else {
                                                        show_popup("Alert", customMessages.Error);
                                                        return false;
                                                    }
                                                },
                                                error: function (e) {
                                                }
                                            });
                                        }
                                    });
                                },
                                error: function (e) {
                                }
                            });
                        }
                    });
                }
            }
            else {
                let request = angular.copy(SnapshotRequest);
                delete request.SelectedItems;
                $.ajax({
                    url: services.SnapshotExportToExcel,
                    data: '{"request": "' + escape(JSON.stringify(request)) + '", "response": "' + escape(JSON.stringify(responseData)) + '"}',
                    method: callsType.Post,
                    contentType: "application/json",
                    //processData: false,
                    success: function (response) {
                        if (response != "Error") {
                            window.location.href = services.DownloadFile + encodeURIComponent(response);
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
            }
        };
    }])
    .controller('Snapshot-Controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {

        $scope.customPopup['visible'] = false;
        $scope.crosstabLeftPanel = false;

        $scope.hideLeftPanel = function ($event) {
            if (!$scope.leftMenuIsHidden)
                $scope.leftPanelToggle($event);
            if (!$scope.ModuleIsHidden)
                $scope.ModulePanelToggle();
            //$scope.showSettings = false;
            angular.element(document.querySelectorAll(".summaryPopup")).css("display", "none");
            angular.element(document.querySelectorAll(".summary-view-click")).removeClass("summaryPopup_selected");
        }
    }])
    .controller('LeftPanelController', ["$scope", "$timeout", "$http", "$filter", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, $filter, commonService, $compile, $sce) {

        $scope.bindingLeftPanelDynamically = function (menusList, parentList) {

            //adding data to the left Panel
            if (menusList.DisplayName.toUpperCase() == "TIME PERIOD") {
                menusList.data = angular.copy($scope.bindTimePeriod(false));
            }
            else if (menusList.DisplayName.toUpperCase() == "OCCASION")
                menusList.data = angular.copy(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "OCCASION SEGMENTS" })[0].data);
            else if (menusList.DisplayName == "ADDITIONAL FILTERS") {
                menusList.data = angular.copy(bindStaticList(parentList[0].DisplayName));
                $scope.addSampleType(menusList);
            }
            else if (menusList.DisplayName == "BENCHMARK") {
                menusList.data = angular.copy($scope.bindBenchmark());
            }
            else if (menusList.DisplayName.toUpperCase() == "CUSTOM FILTERS") {
                $scope.bindCustomFilters(menusList);
            }
            else if (menusList.DisplayName.toUpperCase().indexOf("MANUFACTURER") > -1) {
                let keepList = [];
                let countryIds = $scope.returnCountryIds();
                let appendText = parentList[1].DisplayName.indexOf("Custom") > -1 ? "CUSTOM " : "";

                let bucketName = menusList.DisplayName.replace("Custom ", "").replace("Survey ", "").split("-")[0].toUpperCase();
                tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "CATEGORY/ITEM-MANUFACTURER" })[0].data.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + bucketName + "-MANUFACTURER" && (e.CountryID == 0 || countryIds.indexOf(e.CountryID) > -1) }), countryIds, menusList, parentList));
                if (countryIds.length > 1)
                    tempData = $scope.filterDups(tempData, countryIds.length);

                tempData = tempData.filter(function (e) { return e.DisplayName == "Custom Group" }).concat(tempData.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + bucketName + "-MANUFACTURER" })[0].data);

                appendText = parentList[1].DisplayName.indexOf("Custom") > -1 ? "CUSTOM " : "SURVEY ";
                let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
                let adnListData = [];
                if (adnList.length > 0)
                    adnListData = adnList[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + bucketName });
                if (adnListData.length > 0) {
                    keepList = $scope.filterList(adnListData, keepList);
                    //keepList = keepList.concat(adnListData[0].Data.select("DisplayName").distinct());
                }
                if (keepList.length > 0)
                    tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 });

                if (bucketName.indexOf("Item") > -1) {
                    angular.forEach(tempData, function (a, b) {
                        a.data = a.data.filter(function (val) { return val.data.length > 0 });
                    });
                }
                //angular.forEach(tempData, function (a, b) {
                //    if (a.DisplayName.indexOf("Select All") == -1) {
                /*add select all*/
                //let obj = {};
                //obj.IsSelectable = true;
                //obj.IsLastLevel = true;
                //obj.AttributeId = 0,
                //obj.AttributetypeId = 21,
                //obj.CountryID = 0,
                //obj.DisplayName = "Select All",
                //obj.Filter = parentList[0].DisplayName,
                //obj.FilterID = 1;
                //obj.FilterLevel = null,
                //obj.MetricName = "Select All",
                //obj.SortID = 0,
                //obj.data = [],
                //obj.isDefaultLevel = false,
                //obj.isSingle = false;
                //   if (bucketName == "CATEGORY") {
                //if (a.data.filter(function (e) { return e.DisplayName == "Select All" }).length == 0 && a.data.length > 0) {
                //    obj.ParentId = a.FilterID;
                //    obj.MetricParentName = a.DisplayName;
                //    a.data.unshift(angular.copy(obj));
                //}
                //}
                //else {
                //    a.data = a.data.filter(function (val) { return val.data.length > 0 });
                //angular.forEach(a.data.filter(function (val) { return val.DisplayName.indexOf("Select All") == -1 }), function (val1, ind1) {
                //    if (val1.data.length > 0 && val1.data.filter(function (e) { return e.DisplayName == "Select All" }).length == 0) {
                //        obj.MetricParentName = val1.DisplayName;
                //        obj.ParentId = val1.FilterID;
                //        val1.data.unshift(angular.copy(obj));
                //    }
                //})
                //  }
                //}
                //})
                tempData = tempData.filter(function (e) { return e.data.length > 0 });
                menusList.data = angular.copy(tempData);
            }
            else if (menusList.DisplayName.toUpperCase().indexOf("CATEGORY") > -1) {
                let countryIds = $scope.returnCountryIds();
                if (menusList.DisplayName.toUpperCase().indexOf("CUSTOM") > -1)
                    menusList.data = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "CUSTOM CATEGORY/BRAND/ITEM" })[0].data, countryIds, menusList, parentList));
                else
                    menusList.data = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "CATEGORY/BRAND/ITEM" })[0].data, countryIds, menusList, parentList));
                if (countryIds.length > 1)
                    menusList.data = $scope.filterDups(menusList.data, countryIds.length);
                angular.forEach(menusList.data.filter(function (e) { return e.DisplayName != "Custom Group" }), function (a, b) {
                    a.data = [];
                    a.IsSelectable = true;
                    a.IsLastLevel = true;
                })
            }
            else if (menusList.DisplayName.toUpperCase() == "5WS") {
                let countryIds = $scope.returnCountryIds();
                menusList.data = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "5WS" })[0].data, countryIds, menusList, parentList));
                if (countryIds.length > 1)
                    menusList.data = $scope.filterDups(menusList.data, countryIds.length);

                $scope.validationForCanada(menusList);
                $scope.addSelectAllForChannelAndRetailer(menusList, parentList);
            }
            else if (menusList.DisplayName.toUpperCase() == "DEMOGRAPHICS") {
                let tempData = $scope.getDemographicsData();
                menusList.data = tempData;
            }
            else if (LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase() }).length > 0) {
                let tempData = angular.copy(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase() })[0].data);
                if (menusList.DisplayName.toUpperCase() != "MARKETS") {
                    let countryIds = $scope.returnCountryIds();
                    tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase() })[0].data, countryIds, menusList, parentList));
                    if (countryIds.length > 1)
                        tempData = $scope.filterDups(tempData, countryIds.length);
                }
                menusList.data = tempData;
            }

            if (menusList.data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }).length == 0) {
                show_popup("Alert", customMessages.NoCommonMetric);
                return false;
            }

            if (menusList.DisplayName == "OCCASION")
                applyToChild(menusList, ["isSingle"], true)
            if (parentList[0].DisplayName == "ADDITIONAL FILTERS")
                applyToChild(menusList, ["isSingle"], false)
            if (menusList.DisplayName.toUpperCase() == "CUSTOM FILTERS")
                applyToChild(menusList, ["isSingle"], true)


            $scope.validationForAustraliaandGroup(parentList, menusList);

            return true;
        }

        //function to bind static first level
        function bindStaticList(parent) {
            var temp = [], list = [], filterIds = [];
            list = ["Survey Category", "Custom Category", "Survey Category-Manufacturer", "Custom Category-Manufacturer", "5Ws", "Demographics", "COVID-19", "Custom Filters"];
            filterIds = [1, 2, 3, 4, 5, 6, 8, 7]
            for (i = 0; i < list.length; i++) {
                let isDisabled = false;

                var obj = {};
                obj.AttributeId = filterIds[i];
                obj.AttributetypeId = filterIds[i];
                obj.CountryID = 0;
                obj.DisplayName = list[i];
                obj.Filter = parent;
                obj.FilterID = filterIds[i];
                obj.IsLastLevel = false;
                obj.IsSelectable = false;
                obj.MetricName = list[i];
                obj.MetricParentName = parent;
                obj.ParentId = null;
                obj.SortID = i + 1;
                obj.data = [];
                obj.isDefaultLevel = false;
                obj.isDisabled = isDisabled;
                obj.isSingle = false;
                temp.push(obj);
            }
            return temp;
        }

        //function to check if all mandatory selections are made or not
        function requiredValidations(menusList, parentList) {
            if (!selectedItems.some(function (e) { return e.DisplayName == "TIME PERIOD" }) && menusList.DisplayName != "TIME PERIOD") {
                show_popup("Alert", customMessages.Timeperiod)
                return false;
            }
            else if (menusList.DisplayName != "TIME PERIOD" && !$scope.multiTimePeriodValidation()) {
                show_popup("Alert", customMessages.ConsecutiveTimePeriodSelection);
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "MARKETS" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "BENCHMARK") {
                show_popup("Alert", customMessages.MarketSelection)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "OCCASION" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "OCCASION" && menusList.DisplayName != "BENCHMARK") {
                show_popup("Alert", customMessages.OccasionSelection)
                return false;
            }
            return true;
        }

        //function to select left panel tab
        $scope.menu_Tab_Click = function (menusList, parentList, scope, flag) {
            if (menusList.isDefaultLevel && !menusList.hasChild) {
                return;
            }
            let prevHasChildSelected = menusList.hasChildSelected;
            let prevHasSubMenusActive = menusList.hasSubMenusActive;
            let prevIsTabSelected = menusList.isTabSelected;

            //Select All functionality start
            $scope.clickOnSelectAll(menusList, parentList);
            //Select All functionality end


            if (menusList.isDefaultLevel) {
                if (!requiredValidations(menusList, parentList))
                    return false;
            }

            if (!menusList.isDefaultLevel && parentList[0].DisplayName == "ADDITIONAL FILTERS") {
                if (!validateRowColumn(menusList, parentList, parentList[0].DisplayName))
                    return false;
            }

            if (menusList.DisplayName == "Custom Filters" && !menusList.data.some(function (e) { return e.hasChildSelected }))
                menusList.data = [];
            if (menusList.data.length == 0 && !menusList.IsLastLevel) {
                let status = $scope.bindingLeftPanelDynamically(menusList, parentList);
                if (!status)
                    return false;
                $scope.UlHeight = angular.element(".left-panel-load.firstleftPanel").css("height");
            }



            if (menusList.isDefaultLevel) {
                angular.forEach(scope.LeftStaticMenu, function (value, index) {
                    value.hasSubMenusActive = false;
                    value.isTabSelected = false;
                });
                $scope.DisableAdditionalFiltersTab(menusList, parentList);
            }
            else if (menusList.isSingle && !menusList.hasChildSelected) {
                $scope.singleSelectClick(menusList, parentList);
                if (!parentList[parentList.length - 2].data.some(function (e) { return e.hasChildSelected })) {
                    parentList[parentList.length - 2].hasChildSelected = false;
                }
            }
            else if (!menusList.isDefaultLevel) {
                angular.forEach(parentList[parentList.length - 2].data, function (value, index) {
                    if (value.DisplayName != menusList.DisplayName) {
                        if ((!value.hasChildSelected) && !(value.IsSelectable && !value.IsLastLevel && $scope.hasChildSelected(value)) && !(!value.IsSelectable && !value.IsLastLevel && $scope.hasChildSelected(value))) {
                            value.hasSubMenusActive = false;
                            //value.hasChildSelected = false;
                        }
                        value.isTabSelected = false;
                    }
                    else if (value.ParentId == menusList.ParentId) {
                        if (!value.IsLastLevel && (value.hasChildSelected || (value.IsSelectable && $scope.hasChildSelected(value)) || (!value.IsSelectable && $scope.hasChildSelected(value)))) {
                            menusList.hasSubMenusActive = !menusList.hasSubMenusActive;
                        }
                        menusList.hasSubMenusActive = !menusList.hasSubMenusActive;
                        menusList.isTabSelected = !menusList.isTabSelected;
                        if (!menusList.hasSubMenusActive)
                            menusList.isTabSelected = false;
                    }
                });
            }
            if (menusList.isDefaultLevel) {
                menusList.hasSubMenusActive = !prevHasSubMenusActive;
                menusList.isTabSelected = !prevIsTabSelected;
                let list = ["isTabSelected", "hasSubMenusActive"];
                //  applyToChild(menusList, "isTabSelected", false);
                applyToChild(menusList, list, false, "removeIfNotSelected", 1);
                //applyToChild(menusList, "isTabSelected", false);
                //applyToChild(menusList, "hasSubMenusActive", false, "removeIfNotSelected"); //for removing sub_menus_active only when the element is not selected @vj
            }
            //end child code

            if (menusList.IsSelectable) {
                let tempObj = angular.copy(menusList);
                tempObj.Sel = "";
                angular.forEach(parentList, function (value, index) {
                    if (index == 0)
                        tempObj.Menu = value.DisplayName;
                    else if (index == 1)
                        tempObj.FirstLevel = value.DisplayName;
                    tempObj.Sel += value.DisplayName + ":-:";
                    if (value.IsSelectable && value.data.length > 0 && !value.isDefaultLevel && flag)
                        value.hasChildSelected = false;
                    else
                        value.hasChildSelected = true;
                });
                if (!menusList.isTabSelected) {//deselecting code
                    menusList.hasChildSelected = false;
                    angular.forEach(parentList.reverse(), function (value, index) {
                        if (index == 0)
                            value.hasChildSelected = false;
                        else {
                            if (!value.data.some(function (e) { return (e.hasChildSelected || $scope.hasChildSelected(e)) && e.IsCollapsible == null }))
                                value.hasChildSelected = false;
                        }
                    });
                    parentList.reverse();
                }

            }
            //else {
            //    if (!menusList.isTabSelected && !menusList.isDefaultLevel) {//deselecting code
            //        deselectingAllChilds(menusList);
            //        menusList.hasSubMenusActive = false;
            //        angular.forEach(parentList.reverse(), function (value, index) {
            //            if (index == 0)
            //                value.hasChildSelected = false;
            //            else {
            //                if (!value.data.some(function (e) { return e.hasChildSelected && e.IsCollapsible == null }))
            //                    value.hasChildSelected = false;
            //            }
            //        });
            //        parentList.reverse();
            //    }
            //}
            if (!menusList.isDefaultLevel) {
                if (scope == undefined) {
                    if (menusList.isSingle)
                        $scope.searchSingleClick(parentList, 0);
                    if (parentList[1].data.length > 0 && !parentList[1].data.some(function (e) { return $scope.hasChildSelected(e) })) {
                        parentList[1].hasChildSelected = false;
                    }
                    angular.forEach(parentList[1].data, function (value, index) {
                        if (value.hasSubMenusActive && value.isSingle) {
                            if (value.DisplayName != parentList[2].DisplayName) {
                                value.hasChildSelected = false;
                                value.isTabSelected = false;
                                value.hasSubMenusActive = false;
                                let list = ["hasChildSelected", "isTabSelected", "hasSubMenusActive"]
                                applyToChild(value, list, false);
                                //applyToChild(value, "hasChildSelected", false);
                                //applyToChild(value, "isTabSelected", false);
                                //applyToChild(value, "hasSubMenusActive", false);
                            }
                        }
                    });

                    for (var i = parentList.length - 1; i > 0; i--) {
                        let a = parentList[i - 1].data.filter(function (e) { return e.DisplayName == parentList[i].DisplayName })[0];
                        a.data = parentList[i].data;
                        a.hasChildSelected = parentList[i].hasChildSelected;
                        a.hasSubMenusActive = true;
                        a.isTabSelected = true;
                    }
                    let a = $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == parentList[0].DisplayName });
                    a.data = parentList[0].data;
                    a.hasChildSelected = parentList[0].hasChildSelected;
                }
            }


            /*handling vertical selection on click of brands/cust. vs non cust. start*/
            if (menusList.IsCollapsible == null) {
                if ((parentList[parentList.length - 2] != undefined && parentList[parentList.length - 2].data.where(function (e) { return e.IsCollapsible }).length > 0) || (parentList[parentList.length - 3] != undefined && parentList[parentList.length - 3].data.where(function (e) { return e.IsCollapsible }).length > 0) || (parentList[parentList.length - 4] != undefined && parentList[parentList.length - 4].data.where(function (e) { return e.IsCollapsible }).length > 0)) {
                    let tempList = parentList[parentList.length - 2].data.where(function (e) { return e.IsCollapsible && e.FilterID == menusList.ParentId })[0];
                    childList = parentList[parentList.length - 2].data.where(function (e) { return e.IsCollapsible == null && e.ParentId == tempList.FilterID });
                    if (tempList != undefined) {
                        tempList.hasSubMenusActive = false;
                        tempList.hasChildSelected = false;
                        tempList.isTabSelected = false;
                        if (childList.some(function (e) { return $scope.hasChildSelected(e) })) {
                            tempList.hasSubMenusActive = true;
                            tempList.hasChildSelected = true;
                            tempList.isTabSelected = true;
                        }
                    }
                }
            }
            /*handling vertical selection on click of brands/cust. vs non cust. end*/

            /*mutually exclusive is selectable at consecutive levels start*/
            let condition = !menusList.isDefaultLevel && (parentList[1].DisplayName == "5Ws" || parentList[0].DisplayName == "MARKETS");
            $scope.mutuallyExclusiveConsecutiveLevels(menusList, parentList, condition, prevHasChildSelected);
            if (parentList.length > 2 && parentList[1].DisplayName.indexOf("Manufacturer") > -1 && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, "Manufacturer");
            }
            else if (parentList.length > 2 && parentList[1].DisplayName.indexOf("Category") > -1 && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, "Category");
            }
            /*mutually exclusive is selectable at consecutive levels end*/

            if (prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                submitFlag = 0;
                exportFlag = 0;
            }
            //clearing all below selections when selections are changed start
            if (prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                let notToBeClearedList = returnNotToBeClearedList(parentList, menusList);
                if (notToBeClearedList.length > 0)
                    $scope.resetSelections(notToBeClearedList);
            }
            //clearing all below selections when selections are changed end

            $scope.DisableBenchmark(menusList, parentList);

            if (menusList.isTabSelected) {
                $timeout(function (e) {
                    if (menusList.DisplayName != parentList[0].DisplayName)
                        if ($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul").length > 0)
                            SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                        else {
                            if (parentList.length > 2)
                                SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[parentList.length - 2].DisplayName) + "']  > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                            if (parentList.length > 3)
                                SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[parentList.length - 3].DisplayName) + "']  > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                        }
                    else
                        SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] > .internalWrapper > .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                })
            }


        }

        //function to open child level of selected tab
        $scope.next_Level_Click = function (menusList, parentList, scope) {
            /*check session start*/
            //$.ajax({
            //    async: true,
            //    type: callsType.Post,
            //    url: services.SessionCheckDynamic,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (response) {
            //        if (!response) {
            //            $(".logoutLbl").click();
            //            return false;
            //        }
            //    },
            //    error: function (xhr, status, error) {
            //        $(".logoutLbl").click();
            //        return false;
            //    }
            //});
            /*check session end*/
            if (menusList.DisplayName == "Custom Filters" && !menusList.data.some(function (e) { return e.hasChildSelected }))
                menusList.data = [];
            if (menusList.data.length == 0 && !menusList.IsLastLevel) {
                let status = $scope.bindingLeftPanelDynamically(menusList, parentList);
                if (!status)
                    return false;
                $scope.UlHeight = angular.element(".left-panel-load.firstleftPanel").css("height");
                /*temporarily disable metrics from left panel start*/
                //if (selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }).length > 0 && (parentList.length > 1 && parentList[1].DisplayName == "5Ws")) {
                //    var selectedMarkets = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" })[0].Data, []).select("DisplayName");
                //    if (menusList.data.filter(function (e) { return e.DisplayName == "When" }).length > 0 && menusList.data.filter(function (e) { return e.DisplayName == "When" })[0].data.filter(function (e) { return e.DisplayName == "Day of Week" }).length > 0) {
                //        menusList.data.filter(function (e) { return e.DisplayName == "When" })[0].isDisabled = false;
                //        if (selectedMarkets.indexOf("Europe") > -1 || selectedMarkets.indexOf("UK") > -1 || selectedMarkets.indexOf("France") > -1) {
                //            menusList.data.filter(function (e) { return e.DisplayName == "When" })[0].isDisabled = true;
                //        }
                //    }
                //}
                /*temporarily disable metrics from left panel end*/
            }
            if (menusList.isSingle && !menusList.hasChildSelected) {
                $scope.singleSelectClick(menusList, parentList);
                if (!parentList[parentList.length - 2].data.some(function (e) { return e.hasChildSelected })) {
                    parentList[parentList.length - 2].hasChildSelected = false;
                }
            }
            else if (!menusList.isDefaultLevel) {
                angular.forEach(parentList[parentList.length - 2].data, function (value, index) {
                    if (value.DisplayName != menusList.DisplayName) {
                        if ((!value.hasChildSelected) && !(value.IsSelectable && !value.IsLastLevel && $scope.hasChildSelected(value)) && !(!value.IsSelectable && !value.IsLastLevel && $scope.hasChildSelected(value))) {
                            value.hasSubMenusActive = false;
                            //value.hasChildSelected = false;
                        }
                        value.isTabSelected = false;
                    }
                    else if (value.ParentId == menusList.ParentId) {
                        if (!value.IsLastLevel && (value.hasChildSelected || (value.IsSelectable && $scope.hasChildSelected(value)) || (!value.IsSelectable && $scope.hasChildSelected(value)))) {
                            menusList.hasSubMenusActive = !menusList.hasSubMenusActive;
                        }
                        menusList.hasSubMenusActive = !menusList.hasSubMenusActive;
                        menusList.isTabSelected = !menusList.isTabSelected;
                        if (!menusList.hasSubMenusActive)
                            menusList.isTabSelected = false;
                    }
                });
            }
            if (menusList.data.filter(function (e) { return e.IsCollapsible }).length > 0) {
                angular.forEach(menusList.data, function (a, b) {
                    if (!a.IsCollapsible)
                        a.IsHidden = true;
                    else
                        a.IsExpanded = false;
                })
            }

            /*handling vertical selection on click of brands/cust. vs non cust. start*/
            if (!menusList.IsCollapsible && menusList.data.where(function (e) { return e.IsCollapsible }).length > 0) {
                angular.forEach(menusList.data.where(function (e) { return e.IsCollapsible }), function (a, b) {
                    childList = menusList.data.where(function (e) { return e.IsCollapsible == null && e.ParentId == a.FilterID });
                    a.hasChildSelected = false;
                    if (childList.some(function (e) { return e.hasChildSelected })) {
                        a.hasSubMenusActive = true;
                        a.isTabSelected = true;
                    }
                    else {
                        a.hasSubMenusActive = false;
                        a.isTabSelected = false;
                    }
                })

            }
            /*handling vertical selection on click of brands/cust. vs non cust. end*/

            if (!menusList.isDefaultLevel && (menusList.IsSelectable || menusList.isSingle)) {
                selectedItems = $scope.getSelectedItems($scope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
                List = [];
                List.push(parentList[0]);
                $scope.updateLeftMenuSelections(selectedItems, List);

                var selContent = $scope.formSelectionSummary(selectedItems, leftPanel_Parents.filter(function (e) { return e.hasChild }));
                angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
            }

            if (menusList.isGroupNeeded && menusList.isTabSelected) {
                $scope.addCustomGroup(menusList, parentList)
            }

            if (menusList.isTabSelected) {
                $timeout(function (e) {
                    if (menusList.DisplayName != parentList[0].DisplayName)
                        SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                    else
                        SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] > .internalWrapper > .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                })
            }
        }

        $scope.left_panel_submit = function () {

            angular.element(document.getElementsByClassName("footerContent")).hide();
            angular.element(document.getElementsByClassName("output-container")).hide();
            angular.element(document.getElementsByClassName("footerNote")).show();
            angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
            angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            angular.element(document.getElementsByClassName("excelDiv")).addClass("disableSelection");
            angular.element(document.getElementsByClassName("pptDiv")).addClass("disableSelection");
            angular.element(document.getElementsByClassName("save_filter_icon")).addClass("disableSelection");
            angular.element("body > .nicescroll-rails").remove();
            angular.element(document.querySelectorAll(".header-center")).html('');
            /*check session start*/
            //$.ajax({
            //    async: true,
            //    type: callsType.Post,
            //    url: services.SessionCheckDynamic,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    success: function (response) {
            //        if (!response) {
            //            $(".logoutLbl").click();
            //            return false;
            //        }
            //    },
            //    error: function (xhr, status, error) {
            //        $(".logoutLbl").click();
            //        return false;
            //    }
            //});
            /*check session end*/
            showBackgroundShadow(true, true);
            if (!$scope.leftMenuIsHidden) {
                $scope.leftPanelToggle();
            }

            if (!$scope.ModuleIsHidden)
                $scope.ModulePanelToggle();

            var List = $scope.LeftStaticMenu.where(function (e) { return e.hasChild });
            List.where(function (e) { return e.hasSubMenusActive = false });
            List.where(function (e) { return e.isTabSelected = false });
            angular.forEach(List, function (a, b) {
                applyToChild(a, ["isTabSelected"], false);
            })
            if (!onSubmitValidations())
                return false;

            responseData = [];
            SnapshotRequest = returnRequestObject();
            SnapshotRequest.SelectedItems = JSON.stringify(selectedItems);
            loadPage(1);
            angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
            angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            angular.element(document.getElementsByClassName("footerNote")).hide();
            angular.element(document.getElementsByClassName("footerContent")).show();
            angular.element(document.getElementsByClassName("output-container")).show();
            let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
            if (adnList.length > 0 && adnList[0].Data.filter(function (e) { return e.DisplayName == "Custom Filters" }).length == 0)
                angular.element(document.getElementsByClassName("save_filter_icon")).removeClass("disableSelection");
            for (var i = 1; i <= 10; i++) {
                bindWidgetHeader(i, angular.element(document.getElementById("widget_" + i)))
            }

            /*adding occasion in title start*/
            let appendText = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "OCCASION" })[0].Data, []).select("DisplayName").join(', ');
            let addtnlText = "";
            if (adnList.length > 0) {
                if (adnList[0].Data.filter(function (e) { return e.DisplayName.indexOf("Category") > -1 && e.DisplayName.indexOf("Manufacturer") == -1 }).length > 0)
                    addtnlText += $scope.getPKsAndName(adnList[0].Data.filter(function (e) { return e.DisplayName.indexOf("Category") > -1 })[0].Data, []).select("DisplayName").distinct().join(', ');
                if (adnList[0].Data.filter(function (e) { return e.DisplayName.indexOf("Manufacturer") > -1 }).length > 0) {
                    let sample = [];
                    let list = $scope.getPKsAndName(adnList[0].Data.filter(function (e) { return e.DisplayName.indexOf("Manufacturer") > -1 })[0].Data, []);
                    angular.forEach(list.select("Parent").distinct(), function (a, b) {
                        let newList = list.filter(function (e) { return e.Parent == a });
                        angular.forEach(newList, function (c, d) {
                            if (d == 0)
                                sample.push(a + ": " + c.DisplayName);
                            else
                                sample.push(c.DisplayName);
                        })
                    })
                    addtnlText += sample.distinct().join(', ');
                }
                if (adnList[0].Data.filter(function (e) { return e.DisplayName == "5Ws" }).length > 0)
                    addtnlText += (addtnlText != "" ? " || " : "") + $scope.getPKsAndName(adnList[0].Data.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data, []).select("DisplayName").distinct().join(', ');

                if (adnList[0].Data.filter(function (e) { return e.DisplayName == "Demographics" }).length > 0)
                    addtnlText += (addtnlText != "" ? " || " : "") + $scope.getPKsAndName(adnList[0].Data.filter(function (e) { return e.DisplayName == "Demographics" })[0].Data, []).select("DisplayName").distinct().join(', ');
                if (adnList[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "COVID-19" }).length > 0)
                    addtnlText += (addtnlText != "" ? " || " : "") + $scope.getPKsAndName(adnList[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "COVID-19" })[0].Data, []).select("DisplayName").distinct().join(', ');
                if (adnList[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "CUSTOM FILTERS" }).length > 0) {
                    let cFilter = adnList[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "CUSTOM FILTERS" })[0].Data[0];
                    addtnlText += (addtnlText != "" ? " || " : "") + cFilter.DisplayName + " (" + CustomFilterMaster.filter(function (e) { return e.FilterID == cFilter.FilterID && e.Name == cFilter.DisplayName })[0].SelectionSummary + ")";
                }
            }
            if (addtnlText != "")
                appendText += " (" + addtnlText + ")";
            let headerIcon = '<div class="header-arrow-styles" style="width:2.2vw;"><div class="middleAlign"><div class="header-arrow-occasion"></div></div></div>';
            angular.element(document.querySelectorAll(".header-center")).html(headerIcon + '<div class="OccasionName" title="' + appendText + '"><div class="middleAlign">' + appendText + '</div></div>');
            /*adding occasion in title end*/

            loadWidgetData(1);
        }

        //function to check if all mandatory selections are made or not
        function onSubmitValidations() {
            if (!selectedItems.some(function (e) { return e.DisplayName == "TIME PERIOD" })) {
                show_popup("Alert", customMessages.Timeperiod)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "MARKETS" })) {
                show_popup("Alert", customMessages.MarketSelection)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "OCCASION" })) {
                show_popup("Alert", customMessages.OccasionSelection)
                return false;
            }
            return true;
        }

        //function to return tabs which are not to be cleared
        function returnNotToBeClearedList(parentList, menusList) {
            let List = [];
            if (parentList[0].DisplayName == "TIME PERIOD" && menusList.DisplayName != "TIME PERIOD")
                List = ["TIME PERIOD", "BENCHMARK"];
            else if (parentList[0].DisplayName == "MARKETS" && menusList.DisplayName != "MARKETS")
                List = ["TIME PERIOD", "MARKETS", "OCCASION", "BENCHMARK"];
            else if (parentList[0].DisplayName == "OCCASION" && menusList.DisplayName != "OCCASION")
                List = ["TIME PERIOD", "MARKETS", "OCCASION", "BENCHMARK"];
            return List;
        }

        $scope.hasSearch = function (menusList, parent_list) {
            var searchList = searchSelectAllList.filter(function (e) { return e.Search }).select("DisplayName").distinct().concat(["OCCASION"]);
            if (searchList.indexOf(menusList.DisplayName) > -1 && !(menusList.DisplayName == "5Ws" && menusList.isDefaultLevel))
                return true;
            return false;
        }

        function validateRowColumn(menusList, parentList, parent) {
            let index = parentList.select("DisplayName").findIndex(function (e) { return e.toUpperCase().indexOf("MANUFACTURER") > -1 });
            if (index == -1) {
                index = parentList.select("DisplayName").findIndex(function (e) { return e.toUpperCase().indexOf("CATEGORY") > -1 });
            }
            if (!menusList.isDefaultLevel && parentList[0].DisplayName == parent && parentList.length > 2 && index > -1) {
                if (menusList.IsSelectable && parentList[index].DisplayName.indexOf("Category") > -1 && parentList[index].DisplayName.indexOf("Manufacturer") == -1) {
                    let appendText = parentList[index].DisplayName.indexOf("Custom") > -1 ? "CUSTOM " : "SURVEY ";
                    let newIndex = parentList[index - 1].data.select("DisplayName").findIndex(function (e) { return e.toUpperCase().indexOf(appendText + "CATEGORY-MANUFACTURER") > -1 });
                    if (newIndex > -1) {
                        parentList[index - 1].data[newIndex].data = [];
                        parentList[index - 1].data[newIndex].hasChildSelected = false;
                        parentList[index - 1].data[newIndex].hasSubMenusActive = false;
                        parentList[index - 1].data[newIndex].isTabSelected = false;
                    }
                }
            }
            return true;
        }

        // creating the request Obj for output start
        function returnRequestObject() {
            var request = {};
            request.TimePeriod = "";
            request.Market = "";
            request.Occasion = "";
            request.AdlFilters = "";
            request.Significance = "";
            request.SelectionSummary = $(".summay-content-text").text().trim();

            /*get time period selections start*/
            let timeperiodSelections = selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" });
            request.TimePeriod = $scope.getPKsAndName(timeperiodSelections, []).select("FilterID").join(",");
            /*get time period selections end*/

            /*get market selections start*/
            let marketSelections = selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" });
            if (marketSelections[0].Data[0].DisplayName != "Select All Markets")
                request.Market = $scope.getPKsAndName(marketSelections, []).select("FilterID").join(",");
            else
                request.Market = MarketRegionList.filter(function (e) { return !e.isDisabled }).select("FilterID").join(',');
            /*get market selections end*/

            /*get time period selections start*/
            let occasionSelections = selectedItems.filter(function (e) { return e.DisplayName == "OCCASION" });
            request.Occasion = $scope.getPKsAndName(occasionSelections, []).select("FilterID").join(",");
            /*get time period selections end*/

            /*get additional filter selections start*/
            request.AdlFilters = $scope.AdditionalFilterRequest().FilterID;
            /*get additional filter selections end*/

            /*get benchmark selections start*/
            if (selectedItems.filter(function (e) { return e.DisplayName == "BENCHMARK" }).length > 0) {
                let benchmarkSelections = selectedItems.filter(function (e) { return e.DisplayName == "BENCHMARK" });
                request.Significance = $scope.getPKsAndName(benchmarkSelections, []).select("FilterID").join(",");
            }
            return request;
        }

        CommonLeftPanelFunction($scope, commonService, $http, $sce, $timeout, $compile);

    }])

    .directive("ngVdata", function () {
        return {
            link: function (scope) {
                scope.curScope = scope;
            },
            templateUrl: function () {
                return "/AngularTemplates/LeftPanel.html?version=" + version;
            }
        }
    })
    .filter("search", function () {
        return function (listItem, args) {
            return searchFilter(listItem, args)
        }
    })

function modifyFooter() {
    let element = angular.element(document.getElementsByClassName("footerContent"));
    angular.element(element).find("#nsample-size").remove();
    angular.element(element).find(".occasionChange:eq(0)").text("Number Indicates : Occasion | Item");
    angular.element(element).find(".occasionChange:eq(2)").text("% (Change PP Vs Benchmark)");
    angular.element(element).find(".occasionChange:eq(1)").remove();
    angular.element(element).find(".columnPerc").remove();
}

function loadPage(id) {
    angular.element(".widgetScroll").removeClass("page1").removeClass("page2");
    angular.element(".widgetScroll").addClass("page" + id);
    angular.element(".page1,.page2").hide();
    angular.element(".page" + id).show();
    if (id == 1) {
        angular.element(document.getElementById("widget_1")).find(".widget-body").remove();
        angular.element(document.getElementById("widget_2")).find(".widget-body").remove();
        angular.element(document.getElementById("widget_3")).find(".widget-body").remove();
        angular.element(document.getElementById("widget_4")).find(".widget-body").remove();
        angular.element(document.getElementById("widget_5")).find(".widget-body").remove();
        angular.element(document.getElementById("widget_6")).find(".widget-body").remove();
        if (responseData.filter(function (e) { return e.WidgetNumber == 1 }).length > 0)
            bindCircleChart(responseData.filter(function (e) { return e.WidgetNumber == 1 }), angular.element(document.getElementById("widget_1")));
        if (responseData.filter(function (e) { return e.WidgetNumber == 2 }).length > 0)
            bindWidget2(responseData.filter(function (e) { return e.WidgetNumber == 2 }), angular.element(document.getElementById("widget_2")));
        if (responseData.filter(function (e) { return e.WidgetNumber == 3 }).length > 0)
            bindWidget3(responseData.filter(function (e) { return e.WidgetNumber == 3 }), angular.element(document.getElementById("widget_3")));
        if (responseData.filter(function (e) { return e.WidgetNumber == 4 }).length > 0)
            bindWidget4(responseData.filter(function (e) { return e.WidgetNumber == 4 }), angular.element(document.getElementById("widget_4")));
        if (responseData.filter(function (e) { return e.WidgetNumber == 5 }).length > 0)
            bindWidget5(responseData.filter(function (e) { return e.WidgetNumber == 5 }), angular.element(document.getElementById("widget_5")));
        if (responseData.filter(function (e) { return e.WidgetNumber == 6 }).length > 0)
            bindWidget6_8_10(responseData.filter(function (e) { return e.WidgetNumber == 6 }), angular.element(document.getElementById("widget_6")));
    }
    else {
        angular.element(document.getElementById("widget_7")).find(".widget-body").remove();
        angular.element(document.getElementById("widget_8")).find(".widget-body").remove();
        angular.element(document.getElementById("widget_9")).find(".widget-body").remove();
        angular.element(document.getElementById("widget_10")).find(".widget-body").remove();
        if (responseData.filter(function (e) { return e.WidgetNumber == 7 }).length > 0)
            bindWidget7(responseData.filter(function (e) { return e.WidgetNumber == 7 }), angular.element(document.getElementById("widget_7")));
        if (responseData.filter(function (e) { return e.WidgetNumber == 8 }).length > 0)
            bindWidget6_8_10(responseData.filter(function (e) { return e.WidgetNumber == 8 }), angular.element(document.getElementById("widget_8")));
        if (responseData.filter(function (e) { return e.WidgetNumber == 9 }).length > 0)
            bindWidget9(responseData.filter(function (e) { return e.WidgetNumber == 9 }), angular.element(document.getElementById("widget_9")));
        if (responseData.filter(function (e) { return e.WidgetNumber == 10 }).length > 0)
            bindWidget6_8_10(responseData.filter(function (e) { return e.WidgetNumber == 10 }), angular.element(document.getElementById("widget_10")));
    }
}

var loadWidgetData = function (counter) {
    if (counter < 11) {
        bindWidgetBody(counter);
    }
}

function bindWidgetHeader(widgetId, element) {
    element.html('');
    let header = '<div class="widget-header">' +
        '<div class="widget-head-icon"><div class="headLeftBorder"></div><div class="widgetIconDiv"><div class="middleAlign"><div class="widget-icon"></div></div></div><div class="head-right-shadow"></div></div>' +
        '<div class="widget-head-msg" id="custom_message" title="' + WidgetNameIdList[widgetId - 1].WidgetName + '">' +
        '<div class="middleAlign">' + WidgetNameIdList[widgetId - 1].WidgetName + '</div>' +
        '</div>'
    if (widgetId == 10)
        header += '<div class="headSaveIcon" onclick="openInfo()"><div class="columnShadow"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div><div class="middleAlignHorizontal" style="position: absolute;"><div class="widget-head-info-icon"></div></div></div>'
    header += '<div class="headSaveIcon" onclick="saveDashboard(event)"><div class="columnShadow"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div><div class="middleAlignHorizontal" style="position: absolute;"><div class="widget-head-save-icon"></div></div></div>' +
        '<div class="bottomShadow"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div>' +
        '</div>'
    element.append(header);
}

var getWidgetData = function (requestObj) {
    $.ajax({
        type: callsType.Post,
        url: services.GetSnapshotData,
        async: true,
        data: JSON.stringify(requestObj),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (resp) {
            for (var i = 0; i < resp.length; i++) {
                let widgetData = resp[i].DataList;
                responseData = responseData.concat(widgetData);

                if (responseData.select("WidgetNumber").distinct().length == 10) {
                    responseData = responseData.sort(function (a, b) { return a.WidgetNumber - b.WidgetNumber });
                    exportFlag = 1;
                    submitFlag = 1;
                    angular.element(document.getElementsByClassName("excelDiv")).removeClass("disableSelection");
                    angular.element(document.getElementsByClassName("pptDiv")).removeClass("disableSelection");
                    showBackgroundShadow(false, false);

                    //let selectedMarket = "";
                    //if (selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" })[0].Data[0].Data.length == 0)
                    //    selectedMarket = selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" })[0].Data[0].DisplayName.toUpperCase();
                    //if (selectedMarket =="SELECT ALL MARKETS" || selectedMarket =="NORTH AMERICA")
                    //    show_alert_popup("Alert", customMessages.MarketSelectionPopup);
                }
                else {
                    angular.element(document.getElementsByClassName("excelDiv")).addClass("disableSelection");
                    angular.element(document.getElementsByClassName("pptDiv")).addClass("disableSelection");
                }
                if (widgetData.length > 0) {
                    let element = angular.element(document.getElementById("widget_" + widgetData[0].WidgetNumber));

                    switch (widgetData[0].WidgetNumber) {
                        case 1:
                            functionCalled = bindCircleChart;
                            // loadWidgetData(widgetId + 1);
                            break;
                        case 2:
                            functionCalled = bindWidget2;
                            break;
                        case 3:
                            functionCalled = bindWidget3
                            break;
                        case 4:
                            functionCalled = bindWidget4;
                            break;
                        case 5:
                            functionCalled = bindWidget5;
                            break;
                        case 6:
                        case 8:
                        case 10:
                            functionCalled = bindWidget6_8_10;
                            break;
                        case 7:
                            functionCalled = bindWidget7;
                            break;

                        case 9:
                            functionCalled = bindWidget9;
                            break;
                    }

                    //element.attr("widget-data", JSON.stringify(widgetData));
                    functionCalled(widgetData, element);
                }
            }
        },
        error: function (err, xhr, msg) {
            showBackgroundShadow(true, true);
        }
    });
}

function bindWidgetBody(widgetId) {
    SnapshotRequest.WidgetId = widgetId;
    getWidgetData(SnapshotRequest);
    //switch (widgetId) {
    //    case 1:
    //        getWidgetData(SnapshotRequest);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //    case 2:
    //        getWidgetData(SnapshotRequest, bindWidget2);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //    case 3:
    //        getWidgetData(SnapshotRequest, bindWidget3);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //    case 4:
    //        getWidgetData(SnapshotRequest, bindWidget4);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //    case 5:
    //        getWidgetData(SnapshotRequest, bindWidget5);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //    case 6:
    //        getWidgetData(SnapshotRequest, bindWidget6_8_10);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //    case 7:
    //        getWidgetData(SnapshotRequest, bindWidget7);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //    case 8:
    //        getWidgetData(SnapshotRequest, bindWidget6_8_10);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //    case 9:
    //        getWidgetData(SnapshotRequest, bindWidget9);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //    case 10:
    //        getWidgetData(SnapshotRequest, bindWidget6_8_10);
    //        loadWidgetData(widgetId + 1);
    //        break;
    //}
}

document.onkeydown = checkKey;

function checkKey(e) {
    if (e.keyCode == '38' && !$(".view-load.page1").is(":visible")) {
        loadPage(1);
    }
    else if (e.keyCode == '40' && !$(".view-load.page2").is(":visible")) {
        loadPage(2);
    }

}