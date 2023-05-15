var leftPanel_Parents =
    [
        { id: 1, parent_name: "TIME PERIOD", parent_id: "", DisplayName: "TIME PERIOD", name_class: "timeperiod", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 2, parent_name: "MARKETS", parent_id: "", DisplayName: "MARKETS", name_class: "markets", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },

        { id: 3, parent_name: "CATEGORY", parent_id: "", DisplayName: "CATEGORY", name_class: "category", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },

    ]

var MarketRegionList = [];
var selectedItems = [], LeftPanelOriginalData, timeperiodList, PDRequest = [], exportRequest = {}, responseData = [], submitFlag = 0, exportFlag = 0, stackChartData = [];

angular.module('starter.controllers', ["ngAnimate", 'commonService'])
    .controller('parent-controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {
        showBackgroundShadow(true, true);
        $scope.ModuleIsHidden = true;
        $scope.leftMenuIsHidden = true;
        $scope.parent_list = [];
        angular.element(document.querySelectorAll(".moduleLevel[title='PERFORMANCE DASHBOARD']")).addClass("active");
        angular.element(document.querySelectorAll(".module-name .middleAlign")).text("Performance Dashboard");
        angular.element(document.getElementsByClassName("header-left")).css({ "width": "20%" });
        angular.element(document.getElementsByClassName("header-center")).css({ "width": "50%" });
        angular.element(document.getElementsByClassName("save_filter_icon")).css("display", "none");
        angular.element(document.getElementsByClassName("left-panel-view")).css("margin-left", "3vw");


        modifyFooter();
        //add specific class for internet explorer
        if ((/*@cc_on!@*/false || !!document.documentMode)) {
            angular.element("body,html,form").addClass("ie11");
        }

        $scope.LeftStaticMenu = leftPanel_Parents;
        $http({
            method: callsType.Post,
            url: services.LoadLeftPanel,
            async: true,
            data: { "moduleId": selectedModuleId },
        }).then(function successCallback(response) {
            LeftPanelOriginalData = response.data.where(function (e) { return e.DisplayName });
            timeperiodList = response.data[response.data.length - 1];
            MarketRegionList = [];
            angular.forEach(LeftPanelOriginalData.filter(function (e) { return e.DisplayName == "Markets" })[0].data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), function (a, b) {
                angular.forEach(a.data, function (c, d) {
                    MarketRegionList.push({ "DisplayName": c.DisplayName, "Region": a.DisplayName, "MarketId": c.CountryID, "FilterID": c.FilterID })
                })
            })
            $timeout(function () {
                defaultSelections(9);
            }, 1000)
        }, function (data) {
        });

        loadCommonFunctionalities($scope, commonService, $http);

        /*sample size click event start*/
        $scope.samplesizedetails = function ($event) {
            //$scope.showSettings = false;
            if (!$scope.leftMenuIsHidden)
                $scope.leftPanelToggle($event);
            if (!$scope.ModuleIsHidden)
                $scope.ModulePanelToggle($event);
            var activeSampleSize = "nsample-size_selected";
            if (!angular.element($event.currentTarget).hasClass(activeSampleSize)) {
                angular.element($event.currentTarget).addClass(activeSampleSize);
                angular.element(document.getElementsByClassName("samplesize-popup")).addClass("show_element");
                showBackgroundShadow(true, false);
            }
            else {
                angular.element($event.currentTarget).removeClass(activeSampleSize);
                angular.element(document.getElementsByClassName("samplesize-popup")).removeClass("show_element");
                showBackgroundShadow(false, false);
            }
            let element = angular.element(document.querySelectorAll(".samplesize-popup .popup-header"));
            angular.element(document.querySelectorAll(".summaryPopup")).css("display", "none");
            angular.element(document.querySelectorAll(".summary-view-click")).removeClass("summaryPopup_selected");
            angular.element(document.getElementsByClassName("sampleTypeDiv")).css("display", "block");
            angular.element(document.getElementsByClassName("weightedOccasionDiv")).removeClass("active");
            angular.element(element).find(".weightedOccasionDiv:eq(0)").addClass("active");
            angular.element(element).find(".weightedTextDiv:eq(1) .middleAlign").text("Category Weighted Occasion");
            angular.element(element).find(".unweightedTextDiv:eq(1) .middleAlign").text("Category Unweighted Occasion");
            angular.element(document.getElementsByClassName("unweightedOccasionDiv")).removeClass("active");
            angular.element(".samplesize-popup .samplesizeHead .middleAlign").text("SAMPLE SIZE");

            //if ($('.shareCategoryText').hasClass('active'))
            //    CreateGrid("ShareWeighted", $(".samplesize-popup .popup-container"));
            //else
            CreateGrid("KWeighted", $(".samplesize-popup .popup-container"));
        }
        /*sample size click event end*/

        $scope.Exports = function (type) {
            if (!exportFlag) {
                show_popup("Alert", "Please click on submit and try again, as the selection has been changed.");
                return false;
            }
            showBackgroundShadow(true, true);
            $.ajax({
                url: services.ExportPD,
                data: '{"request": "' + escape(JSON.stringify(exportRequest)).replace(/[+]/gi, "%2B") + '","response": "' + escape(JSON.stringify(responseData)) + '","type":"' + type + '"}',
                method: callsType.Post,
                async: true,
                contentType: "application/json",
                //processData: false,
                success: function (response) {
                    if (response != "Error") {
                        window.location.href = services.DownloadFile + encodeURIComponent(response);
                        angular.element(document.getElementsByClassName("overlay")).hide();
                        $timeout(function () {
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
                error: function (xhr, status, error) {
                    show_popup("Alert", customMessages.Error);
                    return false;
                }
            });
        }
    }])
    .controller('PerformanceDashboard-Controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {
        $scope.customPopup['visible'] = false;
        $scope.crosstabLeftPanel = true;
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

        CommonLeftPanelFunction($scope, commonService, $http, $sce, $timeout);
        $scope.bindingLeftPanelDynamically = function (menusList, parentList) {

            //adding data to the left Panel
            if (menusList.DisplayName.toUpperCase() == "TIME PERIOD") {
                menusList.data = angular.copy($scope.bindTimePeriod(false));
            }
            else if (menusList.DisplayName.toUpperCase() == "CATEGORY") {
                let keepList = [];
                let tempData = [];
                let countryIds = $scope.returnCountryIds();
                tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "CATEGORY" })[0].data, countryIds));

                if (countryIds.length > 1)
                    tempData = $scope.filterDups(tempData, countryIds.length);

                tempData = tempData.filter(function (e) { return e.DisplayName != "Select All Brands" && e.DisplayName != "Select All Items" });
                /*show selected categories*/
                angular.forEach(tempData, function (a, b) {
                    a.data = [];
                    a.IsSelectable = true;
                    a.IsLastLevel = true;
                })
                menusList.data = tempData;

                applyToChild(menusList, ["isSingle"], true);
            }
            else if (LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase() }).length > 0)
                menusList.data = angular.copy(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase() })[0].data);

            if (menusList.data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }).length == 0) {
                show_popup("Alert", customMessages.NoCommonMetric);
                return false;
            }

            if (menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "CATEGORY") {
                if (menusList.DisplayName == "MARKETS")
                    applyToChild(menusList, ["isSingle"], true)
                else if (menusList.DisplayName != "Custom Filters")
                    applyToChild(menusList, ["isSingle"], false)
            }

            /*enabling/disabling Australia on time period selection start*/
            if (parentList[0].DisplayName == "MARKETS") {
                if ((sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "")) {
                    let widgetInfo = JSON.parse(sessionStorage.getItem("widgetInfo"));
                    selectionObj = JSON.parse(widgetInfo.SelectionObj);
                    selectedItems = selectionObj.filter(function (e) { return e.DisplayName != "" });
                }
                else if (stickySelection.length > 0) {
                    selectedItems = stickySelection.filter(function (e) { return e.DisplayName != "" });
                }
                menusList.data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 }).filter(function (e) { return e.IsSelectable = false });
            }
            /*enabling/disabling Australia on time period selection end*/
            return true;
        }

        //function to bind time period
        $scope.bindTimePeriod = function (isSingle) {
            var temp = [];
            var internalData = timeperiodList.filter(function (e) { return e.TimePeriodType.toUpperCase() == "ANNUAL" });

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
                obj1.ParentId = null;
                obj1.SortID = j + 1;
                obj1.isSingle = true;
                obj1.data = [];
                obj1.isDefaultLevel = false;
                temp.push(obj1);
            }

            return temp;
        }

        //function to check if all mandatory selections are made or not
        function requiredValidations(menusList, parentList) {
            if (!selectedItems.some(function (e) { return e.DisplayName == "TIME PERIOD" }) && menusList.DisplayName != "TIME PERIOD") {
                show_popup("Alert", customMessages.Timeperiod)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "MARKETS" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS") {
                show_popup("Alert", customMessages.MarketSelection)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "CATEGORY") {
                show_popup("Alert", customMessages.PerformanceCategorySelection)
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
            //   angular.element(document.getElementsByClassName("noteDiv")).css("display", "none");

            //Select All functionality start
            $scope.clickOnSelectAll(menusList, parentList);
            //Select All functionality end

            if (menusList.isDefaultLevel) {
                if (!requiredValidations(menusList, parentList))
                    return false;
            }
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

            if (!menusList.isDefaultLevel) {
                selectedItems = $scope.getSelectedItems($scope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
                List = [];
                List.push(parentList[0]);
                $scope.updateLeftMenuSelections(selectedItems, List);

                var selContent = $scope.formSelectionSummary(selectedItems, leftPanel_Parents.filter(function (e) { return e.hasChild }));
                angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
            }

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

            if (menusList.isTabSelected) {
                $timeout(function (e) {
                    if (parentList.length > 2 && parentList[parentList.length - 2].data.filter(function (e) { return e.IsCollapsible }).length > 0)
                        SetScroll($($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "']").parents("li")[0]).find(" > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false)
                    else if (menusList.DisplayName != parentList[0].DisplayName) {
                        if ($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul").length > 0)
                            SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                        else {
                            if (parentList.length > 2)
                                SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[parentList.length - 2].DisplayName) + "']  > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                            if (parentList.length > 3)
                                SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[parentList.length - 3].DisplayName) + "']  > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                        }
                    }
                    else {
                        SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] > .internalWrapper > .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                        SetScroll($(".navigation .wrapper ul li.tab_selected > .internalWrapper > .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                    }


                })
            }
        }

        //function to open child level of selected tab
        $scope.next_Level_Click = function (menusList, parentList, scope) {
            if (menusList.data.length == 0 && !menusList.IsLastLevel) {
                let status = $scope.bindingLeftPanelDynamically(menusList, parentList);
                if (!status)
                    return false;
                $scope.UlHeight = angular.element(".left-panel-load.firstleftPanel").css("height");
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

            if (!menusList.isDefaultLevel && (menusList.IsSelectable || menusList.isSingle)) {
                selectedItems = $scope.getSelectedItems($scope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
                List = [];
                List.push(parentList[0]);
                $scope.updateLeftMenuSelections(selectedItems, List);

                var selContent = $scope.formSelectionSummary(selectedItems, leftPanel_Parents.filter(function (e) { return e.hasChild }));
                angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
            }

            if (menusList.isTabSelected) {
                $timeout(function (e) {
                    if (menusList.DisplayName != parentList[0].DisplayName) {
                        SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                    }

                    else {
                        SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] > .internalWrapper > .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                    }
                })
            }
        }

        $scope.left_panel_submit = function () {
            angular.element(document.getElementsByClassName("footerContent")).hide();
            angular.element(document.getElementsByClassName("innerFooterContent")).hide();
            angular.element(document.getElementsByClassName("output-container")).hide();
            angular.element(document.getElementsByClassName("footerNote")).show();
            angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
            angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            angular.element(document.getElementsByClassName("excelDiv")).addClass("disableSelection");
            angular.element(document.getElementsByClassName("pptDiv")).addClass("disableSelection");


            angular.element("body > .nicescroll-rails").remove();
            angular.element(document.querySelectorAll(".header-center")).html('');
            let scope = angular.element('.view-container').scope();
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
            PDRequest = $scope.returnRequestObject();
            PDRequest.SelectedItems = JSON.stringify(selectedItems);

            $.ajax({
                type: callsType.Post,
                url: services.GetPDashboardData,
                async: true,
                data: JSON.stringify(PDRequest),
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (resp) {
                    responseData = resp.DataList;
                    submitFlag = 1;
                    exportFlag = 1;
                    if (responseData.length > 0) {
                        angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
                        angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
                        angular.element(document.getElementsByClassName("footerNote")).hide();
                        angular.element(document.getElementsByClassName("footerContent")).show();
                        angular.element(document.getElementsByClassName("output-container")).show();
                        angular.element(document.getElementsByClassName("excelDiv")).removeClass("disableSelection");
                        angular.element(document.getElementsByClassName("pptDiv")).removeClass("disableSelection");
                        CreateGrid("Distribution", $(".output-container .chartArea"));
                        showBackgroundShadow(false, false);
                    }
                    else {
                        angular.element(document.getElementsByClassName("excelDiv")).addClass("disableSelection");
                        angular.element(document.getElementsByClassName("pptDiv")).addClass("disableSelection");
                        show_popup("ALERT", customMessages.DataNotAvailable);
                    }
                },
                error: function (err, xhr, msg) {
                    showBackgroundShadow(true, true);
                }
            });
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
            else if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY" })) {
                show_popup("Alert", customMessages.PerformanceCategorySelection)
                return false;
            }

            return true;
        }

        //function to return tabs which are not to be cleared
        function returnNotToBeClearedList(parentList, menusList) {
            let List = [];
            if (parentList[0].DisplayName == "TIME PERIOD" && menusList.DisplayName != "TIME PERIOD")
                List = ["TIME PERIOD"];
            else if (parentList[0].DisplayName == "MARKETS" && menusList.DisplayName != "MARKETS")
                List = ["TIME PERIOD", "MARKETS"];
            else if (parentList[0].DisplayName == "CATEGORY" && menusList.DisplayName != "CATEGORY")
                List = ["TIME PERIOD", "MARKETS", "CATEGORY"];
            return List;
        }

        $scope.hasSearch = function (menusList, parent_list) {
            var searchList = searchSelectAllList.filter(function (e) { return e.Search }).select("DisplayName").distinct().concat(["CATEGORY"]);
            if (searchList.indexOf(menusList.DisplayName) > -1)
                return true;
            return false;
        }

        // creating the request Obj for output start
        $scope.returnRequestObject = function () {
            var request = {};
            request.TimePeriod = "";
            request.Market = "";
            request.Category = "";
            request.SelectionSummary = $(".summay-content-text").text().trim();
            exportRequest.SelectionSummary = request.SelectionSummary;

            /*get time period selections start*/
            let timeperiodSelections = selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" });
            exportRequest.TimePeriod = $scope.getPKsAndName(timeperiodSelections, []).select("DisplayName").join(",");
            request.TimePeriod = $scope.getPKsAndName(timeperiodSelections, []).select("FilterID").join(",");
            /*get time period selections end*/

            /*get market selections start*/
            let marketSelections = selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" });
            selectedMarket = $scope.getPKsAndName(marketSelections, []);
            if (marketSelections[0].Data[0].DisplayName != "Select All Markets") {
                request.Market = selectedMarket.select("FilterID").join(",");
                exportRequest.Market = selectedMarket.select("DisplayName").join(",");
            }
            else {
                request.Market = MarketRegionList.filter(function (e) { return !e.isDisabled }).select("FilterID").join(',');
                exportRequest.Market = MarketRegionList.filter(function (e) { return !e.isDisabled }).select("DisplayName").join(",");
            }
            /*get market selections end*/

            /* get selected opportunity start*/
            let categorySelections = selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY" });
            request.Category = $scope.getPKsAndName(categorySelections, []).select("FilterID").join(",");
            exportRequest.Category = $scope.getPKsAndName(categorySelections, []).select("DisplayName").join(",");
            /* get selected opportunity end*/

            return request;
        }

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

function CreateGrid(type, element, dashData) {
    let gridHtml = "";
    let shadowDiv = '<div class="columnShadow"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>';
    let data = responseData;
    if (dashData != undefined)
        data = dashData;
    let distinctColumnHeaders = data.filter(function (e) { return e.TimePeriod.toUpperCase().indexOf("K. SHARE OF OCCASION") == -1 }).select("TimePeriod").distinct();
    let distinctRowHeaders = data.select("Occasion").distinct();
    let leftHeaderWidth = 28;
    if (type != "Distribution")
        leftHeaderWidth = 19;
    let colWidth = ((element.width() / document.documentElement.clientWidth) * 100 - leftHeaderWidth) / 5;//6 columns including header column

    if (((distinctColumnHeaders.length + 1) * colWidth) < ((element.width() / document.documentElement.clientWidth) * 100 - leftHeaderWidth)) {//if columns less than 6 increase column width to fit screen
        colWidth = ((element.width() / document.documentElement.clientWidth) * 100 - leftHeaderWidth) / (distinctColumnHeaders.length + 1);
    }

    if (distinctColumnHeaders.length == 4 && type == "Distribution")
        colWidth--;
    let addBaseClass = "";
    let kshareSubHeader = data.filter(function (e) { return e.TimePeriod.toUpperCase() == "K. SHARE OF OCCASION" && e.Metric.indexOf("CL") == -1 }).select("Metric").distinct();
    let timeperiodSubHeader = data.filter(function (e) { return e.TimePeriod.toUpperCase().indexOf("K. SHARE OF OCCASION") == -1 }).select("Metric").distinct();
    gridHtml += '<div class="crosstabTableDiv">' +
        '<div id="crosstabTableContent" class="crosstabTable">' +
        /*left header start*/
        '<div class="leftHeader ' + addBaseClass + '" style="width:' + (leftHeaderWidth + colWidth) + 'vw"><div class="row-item">' +
        '<div class="row-item-div row-item-head-div"  style="width:' + leftHeaderWidth + 'vw;border:none">' + shadowDiv + '<div class="row-item-head-content middleAlign"></div></div>' +
        '<div class="row-item-div row-item-head-div"  style="width:' + colWidth + 'vw">' + shadowDiv;
    if (type != "Distribution") {
        gridHtml += '<div class="row-item-head-content middleAlign" title="' + kshareSubHeader[0] + '">' + kshareSubHeader[0] + '</div>';
    }
    else
        gridHtml += '<div class="row-item-head-content middleAlign" title="K. SHARE OF OCCASION">K. SHARE OF OCCASION</div><div class="headerBorder"></div>';

    gridHtml += '</div></div>' +
        '<div class="row-item sub-row-item">' +
        '<div class="row-item-div row-item-head-div"  style="width:' + leftHeaderWidth + 'vw">' + shadowDiv + '<div class="row-item-head-content middleAlign"></div></div>' +
        '<div class="row-item-div row-item-head-div"  style="width:' + colWidth + 'vw">';
    if (type != "Distribution") {

        if (type == "KWeighted" || type == "KUnweighted")
            gridHtml += shadowDiv + '<div class="row-item-head-content middleAlign" title="K. SHARE OF OCCASION" style="width:' + colWidth + 'vw">K. SHARE OF OCCASION</div><div class="headerBorder"></div>';
        else
            gridHtml += shadowDiv + '<div class="row-item-head-content middleAlign" title="CATEGORY SHARE" style="width:' + colWidth + 'vw">CATEGORY SHARE</div><div class="headerBorder"></div>';

    }
    else
        gridHtml += '<div class="row-item-head-content head-div sub-row-item" title="' + kshareSubHeader[0] + '" style="width:' + colWidth / 2 + 'vw">' + shadowDiv + kshareSubHeader[0] + '</div><div class="row-item-head-content head-div sub-row-item" title="' + kshareSubHeader[1] + ' (pts change)" style="width:' + colWidth / 2 + 'vw">' + shadowDiv + kshareSubHeader[1] + ' (pts change)</div>';

    gridHtml += '</div></div>';
    if (type != "Distribution") {
        let obj = {};
        if (type == "KWeighted") {
            let sampleSize = data.filter(function (e) { return e.TimeperiodOrder == 0 && e.MetricOrder == 1 }).select("WNumerator").distinct().sort(function (a, b) { return b - a })[0];
            if (sampleSize != null)
                obj.value = Math.round(sampleSize);//sampleSize.toFixed(2);
            else
                obj.value = "NA";
            if (data.filter(function (e) { return e.TimeperiodOrder == 0 && e.MetricOrder == 1 }).select("UNumerator").distinct().sort(function (a, b) { return b - a })[0] <= lowSample)
                obj.colorClass = "grey";
        }
        else if (type == "KUnweighted") {
            let sampleSize = data.filter(function (e) { return e.TimeperiodOrder == 0 && e.MetricOrder == 1 }).select("UNumerator").distinct().sort(function (a, b) { return b - a })[0];
            if (sampleSize != null)
                obj.value = Math.round(sampleSize);
            else
                obj.value = "NA";
            if (obj.value <= lowSample)
                obj.colorClass = "grey";
        }
        else if (type == "CWeighted") {
            let sampleSize = data.filter(function (e) { return e.TimeperiodOrder == 0 && e.MetricOrder == 1 }).select("WSampleSize").distinct().sort(function (a, b) { return b - a })[0];
            if (sampleSize != null)
                obj.value = Math.round(sampleSize);//sampleSize.toFixed(2);
            else
                obj.value = "NA";
            if (data.filter(function (e) { return e.TimeperiodOrder == 0 && e.MetricOrder == 1 }).select("USampleSize").distinct().sort(function (a, b) { return b - a })[0] <= lowSample)
                obj.colorClass = "grey";
        }
        else if (type == "CUnweighted") {
            let sampleSize = data.filter(function (e) { return e.TimeperiodOrder == 0 && e.MetricOrder == 1 }).select("USampleSize").distinct().sort(function (a, b) { return b - a })[0];
            if (sampleSize != null)
                obj.value = Math.round(sampleSize);
            else
                obj.value = "NA";
            if (obj.value <= lowSample)
                obj.colorClass = "grey";
        }

    }
    gridHtml += '</div>' /*left header left*/ +
        /*right header start*/
        '<div class="rightHeader ' + addBaseClass + '" style="width:calc(100% - ' + (leftHeaderWidth + colWidth) + 'vw)">';
    if (type != "Distribution") {
        gridHtml += '<div class="row-item" style="width:' + (distinctColumnHeaders.length * colWidth) + 'vw">';
    }
    else
        gridHtml += '<div class="row-item" style="width:' + (distinctColumnHeaders.length * (colWidth + 1)) + 'vw">';
    angular.forEach(distinctColumnHeaders, function (a, b) {
        if (b != 3 || type != "Distribution") {
            gridHtml += '<div class="row-item-div row-item-head-div" title="' + a + '" style="width:' + colWidth + 'vw">'
        }
        else
            gridHtml += '<div class="row-item-div row-item-head-div" title="' + a + '" style="width:' + (colWidth + 4) + 'vw">'
        if (b != distinctColumnHeaders.length - 1)
            gridHtml += shadowDiv;
        gridHtml += '<div class="row-item-head-content middleAlign">' + a + '</div>';

        if (type == "Distribution")
            gridHtml += '<div class="headerBorder"></div> ';

        gridHtml += '</div>';
    })

    gridHtml += '</div>';
    if (type != "Distribution") {
        gridHtml += '<div class="row-item sub-row-item" style="width:' + (distinctColumnHeaders.length * colWidth) + 'vw">';
    }
    else
        gridHtml += '<div class="row-item sub-row-item" style="width:' + (distinctColumnHeaders.length * (colWidth + 1)) + 'vw">';

    angular.forEach(distinctColumnHeaders, function (a, b) {
        let newColWidth = colWidth;
        if (b == 3 && type == "Distribution")
            newColWidth = colWidth + 4;

        gridHtml += '<div class="row-item-div row-item-head-div" style="width:' + newColWidth + 'vw">'

        if (b == 3)
            newColWidth = newColWidth / 3;
        else
            newColWidth = newColWidth / 2;

        if (type == "Distribution") {
            gridHtml += '<div class="row-item-head-content head-div sub-row-item" title="K. Share of Occasion" style="width:' + newColWidth + 'vw">' + shadowDiv + 'K. Share of Occasion</div><div class="row-item-head-content head-div sub-row-item" title = "' + timeperiodSubHeader[1] + '" style="width:' + newColWidth + 'vw">' + shadowDiv + timeperiodSubHeader[1] + '</div>';
            if (b == 3) {
                gridHtml += '<div class="row-item-head-content head-div sub-row-item" title = "' + timeperiodSubHeader[2] + '"  style="width:' + newColWidth + 'vw">' + timeperiodSubHeader[2] + '</div>';
            }
        }
        else {
            if (b != 3)
                gridHtml += shadowDiv;
            if (type == "KWeighted" || type == "KUnweighted")
                gridHtml += '<div class="row-item-head-content middleAlign" title="K. SHARE OF OCCASION" style="width:' + colWidth + 'vw">K. SHARE OF OCCASION</div><div class="headerBorder"></div>';
            else
                gridHtml += '<div class="row-item-head-content middleAlign" title="CATEGORY SHARE" style="width:' + colWidth + 'vw">CATEGORY SHARE</div><div class="headerBorder"></div>';

        }


        gridHtml += '</div>';
    })
    gridHtml += '</div>';
    gridHtml += '</div>'
    /*right header end*/

    /*left body start*/
    gridHtml += '<div class="leftBody" style="width:' + (leftHeaderWidth + colWidth) + 'vw">';


    angular.forEach(distinctRowHeaders, function (a, b) {
        let row = data.filter(function (e) { return e.TimeperiodOrder == 0 && e.Occasion == a && e.MetricOrder == 1 })[0];

        gridHtml += '<div class="row-item" style="width:100%">' +
            '<div class="row-item-div" style="width:' + leftHeaderWidth + 'vw">' + shadowDiv;

        if (type == "Distribution") {
            gridHtml += '<div class="row-right-item-container" >' +
                '<div class="row-right-item-content  head-div"   title="' + a + '" style="width: 52%;"><div class="leftBorder"></div>' + a + '</div>' +
                '</div>';
            if (row.StrategicPosture != "")
                gridHtml += '<div class="row-right-item-container">' +
                    '<div class="row-right-item-content  head-div"  title="' + row.StrategicPosture + '" style="margin-left: 0.6vw;width: 42%;"><div class="leftBorder" style="background: #717171;"></div>' + row.StrategicPosture + '</div>' +
                    '</div>';
        }
        else {
            gridHtml += '<div class="row-right-item-container">' +
                '<div class="row-right-item-content" style="width: 90%;" title="' + a + '"><div class="leftBorder"></div>' + a + '</div>' +
                '</div>'
        }
        gridHtml += '</div>';
        gridHtml += '<div class="row-item-div"  style="width:' + colWidth + 'vw">';


        if (type == "Distribution") {
            angular.forEach(kshareSubHeader, function (c, d) {
                let row1 = data.filter(function (e) { return e.TimeperiodOrder == 0 && e.Occasion == a && e.Metric == c })[0];

                let obj = {};

                obj = returnCellValues(row1, obj, type, data);
                obj.changeValue = "";
                if (row1.MetricOrder == 4) {
                    if (obj.value != "-") {
                        obj.changeValue = " (" + ((row1.Value * 100).toFixed(1) - (row.Value * 100).toFixed(1)).toFixed(1) + "%)";
                    }
                }
                gridHtml += '<div class="row-right-item-container item-container">' + shadowDiv +
                    '<div class="row-right-item-content head-div" style="width:' + (colWidth / 2) + 'vw;margin-top: 0.5vw;">' +
                    '<div class="row-item-value row-value"><span class="percentageValue"  style="color:' + obj.colorClass + '">' + obj.value + obj.changeValue + '</span>'

                gridHtml += '</div></div></div>';

            })
        }
        else {
            row = data.filter(function (e) { return e.TimeperiodOrder == 0 && e.Occasion == a && e.MetricOrder == 1 })[0];

            let obj = {};

            obj = returnCellValues(row, obj, type);

            gridHtml += '<div class="row-right-item-container">' + shadowDiv +
                '<div class="row-right-item-content" style="width:' + colWidth + 'vw">' +
                '<div class="row-item-value row-value"><span class="percentageValue"  style="color:' + obj.colorClass + ';font-size:1vw">' + obj.value + '</span>'

            gridHtml += '</div></div></div>';
        }

        gridHtml += '</div></div>';
    })

    gridHtml += '</div>';

    /*left body end*/

    /*right body start*/
    gridHtml += '<div class="rightBody" onscroll="reposVertical(this);" onwheel="reposVertical(this);" tabindex="0" style="overflow: hidden; outline: none;width:calc(100% - ' + (leftHeaderWidth + colWidth) + 'vw)">';
    angular.forEach(distinctRowHeaders, function (a, b) {

        if (type == "Distribution")
            gridHtml += '<div class="row-item" style="width:' + (distinctColumnHeaders.length * (colWidth + 1)) + 'vw">'
        else
            gridHtml += '<div class="row-item" style="width:' + (distinctColumnHeaders.length * colWidth) + 'vw">'

        angular.forEach(distinctColumnHeaders, function (c, d) {

            let newColWidth = colWidth;
            if (d == 3 && type == "Distribution")
                newColWidth = colWidth + 4;

            gridHtml += '<div class="row-item-div"  style="width:' + newColWidth + 'vw">';


            if (type == "Distribution") {
                angular.forEach(timeperiodSubHeader, function (f, g) {

                    let obj = {};
                    let row1 = data.filter(function (e) { return e.TimePeriod == c && e.Occasion == a && e.Metric == f });
                    let row = data.filter(function (e) { return e.TimePeriod == c && e.Occasion == a && e.MetricOrder == 1 })[0];
                    if (row1.length != 0) {
                        obj = returnCellValues(row1[0], obj, type, data);
                        let newShadowDiv = shadowDiv;
                        if (g == timeperiodSubHeader.length - 1 && d == distinctColumnHeaders.length - 1)
                            newShadowDiv = "";
                        let innerColWidth = newColWidth;
                        if (d == 3) {
                            innerColWidth = innerColWidth / 3;
                        }

                        else
                            innerColWidth = innerColWidth / 2;

                        if (g == 2) {
                            if (row1[0].Value > 0)
                                obj.colorClass = "green";
                            else if (row1[0].Value < 0)
                                obj.colorClass = "red";
                            obj.columnColor = "";
                            obj.hexColor = "";
                        }

                        gridHtml += '<div class="row-right-item-container item-container" style="background:' + obj.hexColor + '">' + newShadowDiv +
                            '<div class="row-right-item-content head-div" style="width:' + (innerColWidth) + 'vw;border-left:' + obj.columnColor + ';margin-top:0">' +
                            '<div class="row-item-value row-value middleAlign"><span class="percentageValue" style="color:' + obj.colorClass + ';margin-left:' + obj.margin + '">' + obj.value + '</span>'
                        if (type == "Distribution" && obj.change != "") {
                            gridHtml += '<span class="separator" style="float: none;box-shadow:none;">|</span><span class="changeValue">' + obj.change + '</span>';
                        }
                        gridHtml += '</div></div></div>';
                    }

                })
            }
            else {
                let obj = {};
                let row = data.filter(function (e) { return e.TimePeriod == c && e.Occasion == a && e.MetricOrder == 1 })[0];
                obj = returnCellValues(row, obj, type);
                let newShadowDiv = shadowDiv;
                if (d == distinctColumnHeaders.length - 1)
                    newShadowDiv = "";
                gridHtml += '<div class="row-right-item-container">' + newShadowDiv +
                    '<div class="row-right-item-content" style="width:' + colWidth + 'vw">' +
                    '<div class="row-item-value"><span class="percentageValue" style="color:' + obj.colorClass + ';font-size:1vw">' + obj.value + '</span>'

                gridHtml += '</div></div></div>';
            }

            gridHtml += '</div>';
        })

        gridHtml += '</div>';

    })
    gridHtml += '</div>';
    /*right body end*/

    gridHtml += '</div>'
    gridHtml += '</div>'

    element.html(gridHtml);

    if (dashData == undefined) {
        angular.element(".samplesize-popup .nicescroll-rails").remove();
        if (angular.element(document.getElementsByClassName("nsample-size_selected")).length == 0)
            angular.element("body > .nicescroll-rails").remove();
    }
    if (type != "Distribution") {
        let element1 = element.find(".crosstabTableDiv > #crosstabTableContent > .rightBody");
        SetScroll(element1, "#D31245", 0, 0, 0, 0, 3, true);
        angular.element(element1).scrollTop(0);
        angular.element(element1).scrollLeft(0);
    }

}

function returnCellValues(row, obj, type, data, index) {
    obj.value = "NA";
    obj.colorClass = "";
    obj.change = "";
    obj.columnColor = "0.2vw solid ";
    obj.hexColor = "";
    obj.margin = "";

    let targetCol, benchmarkCol, kShareCol;

    if (data != undefined) {

        targetCol = data.filter(function (e) { return e.TimeperiodOrder == 0 && e.MetricOrder == 4 && e.Occasion == row.Occasion })[0];
        benchmarkCol = data.filter(function (e) { return e.TimeperiodOrder == 0 && e.MetricOrder == 1 && e.Occasion == row.Occasion })[0];
        kShareCol = data.filter(function (e) { return e.TimeperiodOrder == row.TimeperiodOrder && e.MetricOrder == 1 && e.Occasion == row.Occasion })[0];

    }

    if (row.StrategicColor == 2) {
        obj.columnColor += '#70AD47';
        obj.hexColor = 'rgba(112,173,71,0.6)';
    }
    else if (row.StrategicColor == 1) {
        obj.columnColor += '#A9D18E';
        obj.hexColor = 'rgba(169,209,142,0.3)';
    }

    else if (row.StrategicColor == -1) {
        obj.columnColor += '#FFC925';
        obj.hexColor = 'rgba(255, 201, 37,0.4)';
    }

    else if (row.StrategicColor == -2) {

        obj.columnColor += '#FF0000';
        obj.hexColor = 'rgba(255,0,0,0.4)';
    }

    else {
        obj.columnColor = "none";
        obj.hexColor = 'none';
    }

    if (type == "Distribution" && row.Value != null) {

        if (row.UNumerator == null) {
            obj.value = "-";
        }
        else if (row.UNumeratorTotal < insufficientSample) {
            obj.value = "LS";
        }
        else {
            if (row.UNumeratorTotal <= lowSample)
                obj.colorClass = 'grey';

            obj.value = (row.Value * 100).toFixed(1) + "%";

        }

        if (row.MetricOrder == 4 || row.MetricOrder == 2 || row.MetricOrder == 3) {

            if (row.StrategicPosture != null && row.StrategicPosture.toUpperCase() == "DEPRIORITIZE")
                obj.value = "-";
            else {

                if (row.MetricOrder == 2) {
                    obj.value = getValue(row, benchmarkCol, kShareCol);
                }
                else if (row.MetricOrder == 3) {
                    obj.value = getValue(row, targetCol, kShareCol);
                }
                else {
                    obj.value = getValue(row, benchmarkCol);
                }
            }

        }
    }
    else if (type == "CWeighted") {
        if (row.WSampleSize != null)
            obj.value = Math.round(row.WSampleSize);//row.WNumerator.toFixed(2);
        if (row.WSampleSize != null && row.UNumeratorTotal <= lowSample)
            obj.colorClass = 'grey';
    }
    else if (type == "CUnweighted") {
        if (row.USampleSize != null)
            obj.value = Math.round(row.USampleSize);
        if (row.USampleSize != null && row.UNumeratorTotal <= lowSample)
            obj.colorClass = 'grey';
    }
    else if (type == "KWeighted") {
        if (row.WNumerator != null)
            obj.value = Math.round(row.WNumerator);//row.WNumerator.toFixed(2);
        if (row.WNumerator != null && row.UNumeratorTotal <= lowSample)
            obj.colorClass = 'grey';
    }
    else if (type == "KUnweighted") {
        if (row.UNumerator != null)
            obj.value = Math.round(row.UNumerator);
        if (row.UNumerator != null && row.UNumeratorTotal <= lowSample)
            obj.colorClass = 'grey';
    }

    if (type == "Distribution" && obj.value == "NA")
        obj.value = "-";

    if (obj.value == "LS" || obj.value == "-") {
        obj.columnColor = "none";
        obj.hexColor = "none";
    }

    if (obj.columnColor == "none")
        obj.margin = "0.2vw";

    return obj;
}

function getValue(row, col1, col2) {

    let value = "-";


    if (col2 != undefined) {

        if (col2.UNumeratorTotal >= insufficientSample && (col1.UNumeratorTotal >= insufficientSample || col1.Metric.indexOf("Target") > -1)) {

            value = ((col2.Value * 100).toFixed(1) - (col1.Value * 100).toFixed(1)).toFixed(1) + "%";
        }
    }
    else {

        if (col1.UNumeratorTotal >= insufficientSample) {
            //  let change = +((row.Value * 100).toFixed(1) - (col1.Value * 100).toFixed(1)).toFixed(0);
            value = (row.Value * 100).toFixed(1) + "%";
        }
    }



    return value;
}



function modifyFooter() {
    angular.element(".body-footer").show();
    let element = angular.element(document.getElementsByClassName("footerContent"));
    angular.element(element).find(".occasionChange:eq(0)").text("Strategic Postures displayed are Business Driven");
    angular.element(element).find(".separatorNew:eq(1)").css("border-left", "0.08vw solid black");
    angular.element(element).find(".occasionChange:eq(2)").text("Target @90% CL based on Strategic Postures");
    $(".footerContent > div:gt(6)").remove();
    let html = "";
    html += '<div class="middleAlign">LS : Insufficient sample (< 150)</div><div class="separatorNew"></div><div class="middleAlign">Low Sample: </div> <div class="middleAlign"><div class="greyDot"></div></div>' +
        '<div class="middleAlign">150-250</div>'
    element.append(html);

}

//function to switch between weighted and unweighted sample
function selectSampleType($event) {
    if (!angular.element($event.currentTarget).hasClass("active")) {//if not already active
        angular.element($event.currentTarget.parentElement).children().removeClass("active");
        angular.element($event.currentTarget).addClass("active");
        CreateGrid(angular.element($event.currentTarget).text().trim().split(" ")[0].substring(0, 1) + angular.element($event.currentTarget).text().trim().split(" ")[1], $(".samplesize-popup .popup-container"));
    }
}