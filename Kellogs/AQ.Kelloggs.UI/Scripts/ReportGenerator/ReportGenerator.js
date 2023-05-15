var leftPanel_Parents =
    [
        { id: 1, parent_name: "TIME PERIOD", parent_id: "", DisplayName: "TIME PERIOD", name_class: "timeperiod", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 2, parent_name: "MARKETS", parent_id: "", DisplayName: "MARKETS", name_class: "markets", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 3, parent_name: "REPORT", parent_id: "", DisplayName: "REPORT", name_class: "report", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 4, parent_name: "CATEGORY/ITEM/BRAND", parent_id: "", DisplayName: "CATEGORY/ITEM/BRAND", name_class: "category", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 5, parent_name: "RETAIL SALES VALUE", parent_id: "", DisplayName: "RETAIL SALES VALUE", name_class: "retailSales", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 6, parent_name: "ADDITIONAL FILTERS", parent_id: "", DisplayName: "ADDITIONAL FILTERS", name_class: "additionalfilters", selections: "None", hasChild: true, menuLevel: 0, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 7, parent_name: "BENCHMARK", parent_id: "", DisplayName: "BENCHMARK", name_class: "benchmark", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isDisabled: false }

    ];


var ReportType = [{ id: 1, name: "Occasion Profiles", isDisabled: false }, { id: 2, name: "Category Occasion Profiles", isDisabled: false }, { id: 3, name: "Channel/Retailer Occasion Profiles", isDisabled: false }, { id: 4, name: "OBPPC Summaries", isDisabled: false }, { id: 5, name: "Kids Occasion Profiles", isDisabled: false }, { id: 2, name: "Custom Category Occasion Profiles", isDisabled: false }, { id: 3, name: "Custom Channel/Retailer Occasion Profiles", isDisabled: false }];

var isRegion = 0;
var selectedItems = [], MarketRegionList = [], timeperiodList, LeftPanelOriginalData, ReportRequest = [], yoyId = "", yoyName = "";

angular.module('starter.controllers', ["ngAnimate", 'commonService'])
    .controller('parent-controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {
        showBackgroundShadow(true, true);
        $scope.ModuleIsHidden = true;
        //$scope.showSettings = false;
        $scope.leftMenuIsHidden = true;
        $scope.parent_list = [];
        angular.element(document.querySelectorAll(".moduleLevel[title='REPORT GENERATOR']")).addClass("active");
        angular.element(document.querySelectorAll(".module-name .middleAlign")).text("Report Generator");

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
                    MarketRegionList.push({ "DisplayName": c.DisplayName, "Region": a.DisplayName, "MarketId": c.CountryID, "FilterID": c.FilterID, "isDisabled": false })
                })
            })
            $timeout(function () {
                showBackgroundShadow(false, false);
            }, 2000)
        }, function (data) {
        });

        $(".left-view-container > .wrapper > ul").append('<div style="height: calc((100% / 13) * 8);background: white;box-shadow: inset -8px 0 10px -10px rgba(36, 21, 11, 0.5);" class="menu-tab-left"></div>')
        loadCommonFunctionalities($scope, commonService, $http); //Common functionalitiesloadCommonFunctionalities($scope, commonService, $http);

    }])
    .controller('ReportGenerator-Controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {

        $scope.customPopup['visible'] = false;
        $scope.LeftStaticMenu = leftPanel_Parents;
        $scope.hideLeftPanel = function ($event) {
            if (!$scope.ModuleIsHidden)
                $scope.ModulePanelToggle();
        }
    }])
    .controller('LeftPanelController', ["$scope", "$timeout", "$http", "$filter", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, $filter, commonService, $compile, $sce) {
        $(".submit-tab > div[title='Submit'] .button-text .middleAlign").text("DOWNLOAD");
        $scope.bindingLeftPanelDynamically = function (menusList, parentList) {

            //adding data to the left Panel
            if (menusList.DisplayName.toUpperCase() == "TIME PERIOD") {
                menusList.data = angular.copy($scope.bindTimePeriod(false));
            }
            else if (menusList.DisplayName == "BENCHMARK") {
                menusList.data = angular.copy($scope.bindBenchmark());
            }
            else if (menusList.DisplayName.toUpperCase() == "CUSTOM FILTERS") {
                $scope.bindCustomFilters(menusList);
            }
            else if (menusList.DisplayName == "ADDITIONAL FILTERS") {
                menusList.data = angular.copy(bindStaticList(parentList[0].DisplayName, parentList[0].DisplayName));
                $scope.addSampleType(menusList);
            }
            else if (menusList.DisplayName == "REPORT") {
                menusList.data = angular.copy(bindStaticList(parentList[0].DisplayName, parentList[0].DisplayName));
            }
            else if (menusList.DisplayName.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") > -1 || ((catList.map(function (e) { return e.toUpperCase() }).indexOf(menusList.DisplayName.toUpperCase()) > -1) && parentList[0].DisplayName == "ADDITIONAL FILTERS") || ((menusList.DisplayName.toUpperCase().indexOf("CATEGORY") > -1 || menusList.DisplayName.toUpperCase().indexOf("ITEM") > -1 || menusList.DisplayName.toUpperCase().indexOf("BRAND") > -1 || menusList.DisplayName.toUpperCase().indexOf("CATEGORY-MANUFACTURER") > -1) && parentList[0].DisplayName == "CATEGORY/ITEM/BRAND")) {

                let tempData = [], keepList = [];
                let countryIds = $scope.returnCountryIds();
                let appendText = parentList.length > 1 ? (parentList[1].DisplayName.indexOf("Custom") > -1 ? "CUSTOM " : "") : "";
                if (menusList.DisplayName.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") == -1) {
                    let name = menusList.DisplayName.toUpperCase().replace("SURVEY ", "").replace("CUSTOM ", "");
                    if (name == "CATEGORY-MANUFACTURER" || name == "ITEM-MANUFACTURER") {
                        tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "CATEGORY/ITEM-MANUFACTURER" })[0].data.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + name && (e.CountryID == 0 || countryIds.indexOf(e.CountryID) > -1) }), countryIds, menusList, parentList));
                        if (countryIds.length > 1)
                            tempData = $scope.filterDups(tempData, countryIds.length);
                        tempData = tempData.filter(function (e) { return e.DisplayName == "Custom Group" }).concat(tempData.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + name })[0].data);
                    }
                    else {
                        tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + name })[0].data, countryIds, menusList, parentList));
                        if (countryIds.length > 1)
                            tempData = $scope.filterDups(tempData, countryIds.length);
                    }
                }
                if (menusList.isDefaultLevel && menusList.DisplayName.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") > -1) {
                    menusList.data = angular.copy(bindStaticList("CATEGORY/ITEM/BRAND", parentList[0].DisplayName));
                    menusList.data.filter(function (e) { return e.isGroupNeeded = true });
                }
                else if (menusList.DisplayName.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") > -1) {
                    menusList.data = angular.copy(bindStaticList(parentList[1].DisplayName.toUpperCase(), parentList[0].DisplayName));
                    menusList.data.filter(function (e) { return e.isGroupNeeded = true });
                }
                else if (menusList.DisplayName.toUpperCase().indexOf("CATEGORY") > -1 && menusList.DisplayName.toUpperCase().indexOf("MANUFACTURER") == -1) {
                    if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND") {
                        tempData = tempData.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 });
                    }
                    menusList.data = tempData;
                }
                else if (menusList.DisplayName.toUpperCase() == "ITEM") {
                    /*show selected categories*/
                    let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
                    let adnListData = [];
                    if (adnList.length > 0)
                        adnListData = adnList[0].Data.filter(function (e) { return e.DisplayName == parentList[1].DisplayName });

                    if (adnListData.length > 0 && parentList[0].DisplayName == "ADDITIONAL FILTERS") {
                        if (adnListData[0].Data.filter(function (e) { return e.DisplayName == "Category" }).length > 0)
                            keepList = $scope.filterList(adnListData[0].Data.filter(function (e) { return e.DisplayName == "Category" }), keepList);
                    }
                    if (keepList.length > 0)
                        tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "ITEMS" || e.DisplayName == "Custom Group" || e.DisplayName.toUpperCase() == "SELECT ALL ITEMS" });
                    if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND") {
                        tempData = tempData.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 });
                    }
                    menusList.data = tempData;
                }
                else if (menusList.DisplayName.toUpperCase().indexOf("ITEM") > -1) {
                    let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" || e.DisplayName == "CATEGORY/ITEM/BRAND" });
                    let adnListData;
                    if (adnList.length > 0) {
                        adnListData = adnList[0].Data.filter(function (e) { return e.DisplayName == parentList[1].DisplayName });
                        if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND") {
                            adnListData = adnList;
                        }
                        if (adnListData.length > 0) {
                            let categoryList = adnListData[0].Data.filter(function (e) { return e.DisplayName.indexOf("Category") > -1 && e.DisplayName.indexOf("Manufacturer") == -1 });
                            if (categoryList.length > 0)
                                keepList = $scope.filterList(categoryList, keepList);
                        }
                    }
                    if (keepList.length > 0)
                        tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "ITEMS" || e.DisplayName == "Custom Group" || e.DisplayName.toUpperCase() == "SELECT ALL ITEMS" });
                    if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND") {
                        tempData = tempData.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 });
                    }
                    menusList.data = tempData;
                }
                else if (menusList.DisplayName.toUpperCase().indexOf("BRAND") > -1) {
                    let itemList = [];
                    let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" || e.DisplayName == "CATEGORY/ITEM/BRAND" });
                    let adnListData;
                    if (adnList.length > 0) {
                        adnListData = adnList[0].Data.filter(function (e) { return e.DisplayName == parentList[1].DisplayName });
                        if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND") {
                            adnListData = adnList;
                        }
                        if (adnListData.length > 0) {
                            let categoryList = adnListData[0].Data.filter(function (e) { return e.DisplayName.indexOf("Category") > -1 && e.DisplayName.indexOf("Manufacturer") == -1 });
                            let itemsList = adnListData[0].Data.filter(function (e) { return e.DisplayName.indexOf("Item") > -1 && e.DisplayName.indexOf("Manufacturer") == -1 });
                            if (categoryList.length > 0)
                                keepList = $scope.filterList(categoryList, keepList);
                            if (itemsList.length > 0) {
                                keepList = [];
                                keepList = $scope.filterList(itemsList, keepList);
                                angular.forEach(menusList.data.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 }), function (a, b) {
                                    angular.forEach(a.Data, function (c, d) {
                                        var obj = {};
                                        obj.Item = c.DisplayName;
                                        obj.Category = a.DisplayName;
                                        itemList.push(obj);
                                    })
                                })
                            }
                        }
                    }
                    if (keepList.length > 0)
                        tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "BRANDS" || e.DisplayName == "Custom Group" || e.DisplayName.toUpperCase() == "SELECT ALL BRANDS" });
                    if (itemList.length > 0) {
                        angular.forEach(tempData.filter(function (e) { return e.DisplayName != "Custom Group" }), function (a, b) {

                            var BrandData = [];
                            angular.forEach(a.data.filter(function (e) { return itemList.filter(function (e) { return e.Category == a.DisplayName }).select("Item").indexOf(e.DisplayName) > -1 }), function (c, d) {
                                BrandData.push(c);
                            })
                            a.data = BrandData;
                        })
                    }
                    if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND") {
                        tempData = tempData.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 });
                    }
                    menusList.data = tempData;
                }
                else if (menusList.DisplayName.toUpperCase().indexOf("CATEGORY-MANUFACTURER") > -1 || menusList.DisplayName.toUpperCase().indexOf("ITEM-MANUFACTURER") > -1) {
                    let bucketName = "";
                    if (menusList.DisplayName.toUpperCase().indexOf("MANUFACTURER") > -1)
                        bucketName = menusList.DisplayName.split("-")[0];

                    let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" || e.DisplayName == "CATEGORY/ITEM/BRAND" });
                    let adnListData;
                    if (adnList.length > 0) {
                        adnListData = adnList[0].Data.filter(function (e) { return e.DisplayName == parentList[1].DisplayName });
                        if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND") {
                            adnListData = adnList;
                        }
                        if (adnListData.length > 0) {
                            let bucketList = adnListData[0].Data.filter(function (e) { return e.DisplayName == bucketName });
                            if (bucketList.length > 0)
                                keepList = $scope.filterList(bucketList, keepList);
                        }
                    }
                    if (keepList.length > 0)
                        tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 });

                    if (bucketName.indexOf("Item") > -1) {
                        angular.forEach(tempData, function (a, b) {
                            a.data = a.data.filter(function (val) { return val.data.length > 0 });
                        });
                    }

                    tempData = tempData.filter(function (e) { return e.data.length > 0 });
                    menusList.data = angular.copy(tempData);
                }
            }
            else if (menusList.DisplayName == "RETAIL SALES VALUE") {
                let selectedList = ["Category", "Kellogg Category"];
                if (selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data.some(function (e) { return e.DisplayName.indexOf("Manufacturer") > -1 })) {
                    selectedList.push("Competitor Category");
                }
                /*remove/comment for Single retail value for Brand start*/
                //if (selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data.some(function (e) { return e.DisplayName.indexOf("Brand") > -1 })) {
                //    selectedList.push("Brand");
                //}
                /*remove/comment for Single retail value for Brand end*/

                /*uncomment for multi retail value for brand start*/
                if (selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data.some(function (e) { return e.DisplayName.indexOf("Brand") > -1 })) {
                    let brandList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Brand") > -1 }), []).select("DisplayName");
                    for (i = 0; i < brandList.length; i++) {
                        selectedList.push(brandList[i]);
                    }
                }
                /*uncomment for multi retail value for brand End */
                if (selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data.some(function (e) { return e.DisplayName.indexOf("Item") > -1 })) {
                    let itemList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Item") > -1 }), []).select("DisplayName");
                    for (i = 0; i < itemList.length; i++) {
                        selectedList.push(itemList[i]);
                    }
                }

                angular.forEach(selectedList, function (a, b) {
                    let value = "";
                    if (stickySelection.length > 0) {
                        let data = stickySelection.filter(function (e) { return e.DisplayName == "RETAIL SALES VALUE" });
                        if (data.length > 0 && data[0].Data.filter(function (e) { return e.OptionName == a.DisplayName }).length > 0)
                            value = data[0].Data.filter(function (e) { return e.OptionName == a.DisplayName })[0].DisplayName;
                    }
                    let obj = {};
                    obj.FilterID = b + 1;
                    obj.DisplayName = a;
                    obj.Filter = "RETAIL SALES VALUE";
                    obj.IsSelectable = false;
                    obj.IsLastLevel = true;
                    obj.data = [];
                    obj.className = a.replace(/[ ]/gi, '').replace(/[,]/gi, '').replace(/[/]/gi, '').replace(/[']/gi, '').replace(/[(]/gi, '').replace(/[)]/gi, '').replace(/[&]/gi, '').replace(/[%]/gi, '').replace(/[.]/gi, '').toLowerCase();
                    obj.value = value;
                    menusList.data.push(obj);
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
                    tempData = $scope.modifyMarketDependency(tempData, countryIds, menusList, parentList);
                    if (countryIds.length > 1)
                        tempData = $scope.filterDups(tempData, countryIds.length);
                }
                menusList.data = tempData;
            }

            if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && !menusList.isDefaultLevel && menusList.DisplayName.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") == -1 && menusList.DisplayName.toUpperCase() != "CUSTOM FILTERS") {
                menusList.data = filterReportFilters(menusList.data, selectedItems.filter(function (e) { return e.DisplayName == "REPORT" })[0].Data[0].FilterID.toString());
            }

            if (menusList.data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }).length == 0) {
                show_popup("Alert", customMessages.NoCommonMetric);
                return false;
            }
            if (menusList.DisplayName == "REPORT")
                applyToChild(menusList, ["isSingle"], true)
            if (parentList[0].DisplayName == "ADDITIONAL FILTERS")
                applyToChild(menusList, ["isSingle"], false)
            if (menusList.DisplayName.toUpperCase() == "CUSTOM FILTERS")
                applyToChild(menusList, ["isSingle"], true)

            if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND" && !menusList.isDefaultLevel && parentList.length == 2) {
                if ((menusList.DisplayName.indexOf("Brand") == -1) && (menusList.DisplayName.indexOf("Item") == -1)) {
                    applyToChild(menusList, ["isSingle"], true);
                }
            }

            $scope.validationForAustraliaandGroup(parentList, menusList);

            return true;
        }

        //function to bind static first level
        function bindStaticList(name, parent) {
            var temp = [], list = [], enableReport = [], ids = [];
            var reportId = "";
            let timeList = $scope.getPKsAndName(selectedItems.where(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data, []);
            if (selectedItems.filter(function (e) { return e.DisplayName == "REPORT" }).length > 0)
                reportId = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "REPORT" }), []).select("FilterID").join(",");
            if (parent == "CATEGORY/ITEM/BRAND") {
                list = ["Survey Category", "Custom Category", "Survey Category-Manufacturer", "Custom Category-Manufacturer", "Survey Item", "Custom Item", "Survey Brand", "Custom Brand"];
                ids = [1, 2, 3, 4, 5, 6];
            }
            else if (name == "ADDITIONAL FILTERS") {
                list = ["Survey Category/Item/Brand", "Custom Category/Item/Brand", "5Ws", "Demographics", "COVID-19", "Custom Filters"];
                enableReport = ['1,2,3,5,6,7,8,9', '1,2,3,5,6,7,8,9', '1,2,3,4,5,6,7,8,9', '1,2,3,4,5,6,7,8,9', '1,2,3,4,5,6,7,8,9', '1,2,3,4,5,6,7,8,9'];
            }
            else if (name == "REPORT") {
                //list = ["Occasion Profiles", "Category Occasion Profiles", "Channel/Retailer Occasion Profiles", "OBPPC Summaries", "Kids Occasion Profiles", "Custom Category Occasion Profiles", "Custom Channel/Retailer Occasion Profiles", "Occasions Trend Report", "Category Business Review"];
                //ids = [1, 2, 3, 4, 5, 6, 7, 8, 10]
                list = ["Occasion Profiles", "Category Occasion Profiles", "Channel/Retailer Occasion Profiles", "OBPPC Summaries", "Kids Occasion Profiles", "Custom Category Occasion Profiles", "Custom Channel/Retailer Occasion Profiles", "Occasions Trend Report"];
                ids = [1, 2, 3, 4, 5, 6, 7, 8]
            }
            else if (name.indexOf("CATEGORY/ITEM/BRAND") > -1) {
                list = catList;
                //if (name.indexOf("CUSTOM") > -1)
                //    list = list.diff(["Category-Manufacturer", "Item-Manufacturer"]);
            }
            for (i = 0; i < list.length; i++) {
                let isDisabled = false;
                if (name == "ADDITIONAL FILTERS") {
                    if (enableReport[i].indexOf(reportId) == -1)
                        isDisabled = true;
                }
                if (name.indexOf("CATEGORY/ITEM/BRAND") > -1) {
                    if (reportId == "2" || reportId == "6") {
                        if (list[i] == "Category")
                            isDisabled = true;
                    }
                }
                var obj = {};
                obj.AttributeId = i + 1;
                obj.AttributetypeId = i + 1;
                obj.CountryID = 0;
                obj.DisplayName = list[i];
                obj.Filter = name;
                obj.FilterID = parent == "CATEGORY/ITEM/BRAND" || parent == "REPORT" ? ids[i] : i + 1;
                obj.IsLastLevel = name == "REPORT" ? true : false;
                obj.IsSelectable = name == "REPORT" ? true : false;
                obj.MetricName = list[i];
                obj.MetricParentName = name;
                obj.ParentId = null;
                obj.SortID = i + 1;
                obj.data = [];
                obj.isDefaultLevel = false;
                obj.isDisabled = parent == "CATEGORY/ITEM/BRAND" && i > 1 ? true : isDisabled;
                obj.isSingle = name == "REPORT" ? true : false;
                obj.ReportGeneratorFilter = 0;
                let marketList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }), []).select("DisplayName").join(",");
                if (name == "REPORT" && list[i].indexOf("Channel/Retailer") > -1) {
                    if (marketList.indexOf("Canada") > -1 && list[i] == "Custom Channel/Retailer Occasion Profiles")
                        obj.isDisabled = true;
                    if (marketList.split(",").length > 1 || MarketRegionList.select("Region").distinct().diff(marketList.split(",")).length < MarketRegionList.select("Region").distinct().length || marketList.indexOf("Select All Markets") > -1)
                        obj.isDisabled = true;
                }
                if (name == "REPORT" && list[i].indexOf("Trend") > -1 && (timeList.length > 8 || timeList.select("Parent").distinct().indexOf("Custom Group") > -1)) {
                    obj.isDisabled = true;
                }
                if (name == "REPORT" && list[i].indexOf("Business Review") > -1) {
                    let timeperiodSelections = selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" });
                    let ttype = selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data[0].DisplayName;
                    let isRolling = ((ttype.toUpperCase()) == "ROLLING 4 QUARTER") ? true : false;
                    let isRollingQ4 = false;
                    if (isRolling) {
                        let timeperiodSelectedInRolling = $scope.getPKsAndName(timeperiodSelections, []).select("DisplayName").map(function (e) {
                            return (e.split(" ").length > 2 ? e.split(" ")[e.split(" ").length - 2] : e)
                        }).distinct()[0];
                        if (timeperiodSelectedInRolling == "Q4") {
                            isRollingQ4 = true;
                        }
                    }
                    let timeYearCount;
                    if ((ttype.toUpperCase()) == "COVID QUARTER") {
                        timeYearCount = $scope.getPKsAndName(timeperiodSelections, []).select("DisplayName").map(function (e) {
                            return (e.split(" ").length > 2 ? e.split(" ")[e.split(" ").length - 2] : e)
                        }).distinct();
                    }
                    else {
                        timeYearCount = $scope.getPKsAndName(timeperiodSelections, []).select("DisplayName").map(function (e) {
                            return (e.split(" ").length > 1 ? e.split(" ")[e.split(" ").length - 1] : e)
                        }).distinct();
                    }

                    if (marketList != "US" || timeYearCount.length > 1 || (isRolling == true && isRollingQ4 == false) || ["Quarter", "YTD", "Annual", "COVID Quarter", "Rolling 4 Quarter"].indexOf(ttype) == -1) {
                        obj.isDisabled = true;
                    }
                }
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
            else if (!selectedItems.some(function (e) { return e.DisplayName == "REPORT" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "REPORT" && menusList.DisplayName != "BENCHMARK") {
                show_popup("Alert", customMessages.ReportSelection)
                return false;
            }
            else if (selectedItems.some(function (e) { return e.DisplayName == "REPORT" }) && ["TIME PERIOD", "MARKETS", "REPORT"].indexOf(menusList.DisplayName) == -1 && [8, 9].indexOf(selectedItems.filter(function (e) { return e.DisplayName == "REPORT" })[0].Data[0].FilterID) > -1 && yoyId.length == 0) {
                show_alert_popup("Alert", customMessages.YoYSelection);
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }) && selectedItems.filter(function (e) { return e.DisplayName == "REPORT" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "REPORT" })[0].Data[0].FilterID == 10 && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "REPORT" && menusList.DisplayName != "BENCHMARK" && menusList.DisplayName != "CATEGORY/ITEM/BRAND") {
                show_popup("Alert", customMessages.ReportCategorySelection)
                return false;
            }
            else if (selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }) && selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Category") > -1 && e.DisplayName.indexOf("Manufacturer") == -1})) {
                show_popup("Alert", customMessages.ReportCategorySelection)
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


            let count = 0;
            if (selectedItems.filter(function (e) { return e.DisplayName == parentList[0].DisplayName }).length > 0) {
                count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == parentList[0].DisplayName })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Brand") > -1 }), []).length;
            }
            if (menusList.DisplayName.indexOf("Select All") > -1 && !menusList.hasChildSelected && parentList.select("DisplayName").findIndex(function (e) { return e.indexOf("Brand") > -1 }) > -1) {
                if (parentList[parentList.length - 2].data.filter(function (e) { return e.IsSelectable && e.DisplayName.indexOf("Select All") == -1 }).length > 0) {
                    if (parentList[parentList.length - 2].data.filter(function (e) { return e.IsCollapsible }).length > 0)
                        count += parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected && e.ParentId == menusList.ParentId }).length - 1;
                }
                else {
                    angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return !e.IsSelectable && e.DisplayName.indexOf("Select All") == -1 }), function (a, b) {
                        count += a.data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected && e.DisplayName.indexOf("Select All") == -1 }).length - 1;
                    })
                }
            }
            if ((count >= 10) && !menusList.hasChildSelected && !menusList.isDefaultLevel) {
                show_popup("ALERT", "User can select max. of 10 selections at a time in Brands.");
                return false;
            }

            //Select All functionality start
            $scope.clickOnSelectAll(menusList, parentList);
            //Select All functionality end


            if (menusList.isDefaultLevel) {
                if (!requiredValidations(menusList, parentList))
                    return false;
            }
            else if (parentList[0].DisplayName == "TIME PERIOD" && menusList.IsLastLevel && !menusList.hasChildSelected) {
                let timeListRG = [];
                if (selectedItems.some(function (e) { return e.DisplayName == "TIME PERIOD" })) {
                    timeListRG = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data, []).filter(function (e) { return e.DisplayName != "Select All" }).select("FilterID");
                }
                else if (menusList.DisplayName == "Select All") {
                    timeListRG = parentList[parentList.length - 2].data.filter(function (e) { return e.DisplayName != "Select All" && e.DisplayName != "Custom Group" });
                }
                if ((menusList.DisplayName == "Select All" && timeListRG.length > 8) || (menusList.DisplayName != "Select All" && timeListRG.length >= 8)) {
                    show_popup("Alert", customMessages.MoreTimePeriodSelection);
                }
            }

            if (!menusList.isDefaultLevel && parentList[1].DisplayName.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") > -1) {
                if (!validateRowColumn(menusList, parentList, parentList[0].DisplayName))
                    return false;
            }

            if (!menusList.isDefaultLevel && parentList[0].DisplayName.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") > -1) {
                if (!validateCategory(menusList, parentList, parentList[1].DisplayName))
                    return false;
            }

            if (!menusList.isDefaultLevel && parentList[0].DisplayName.toUpperCase().indexOf("CATEGORY/ITEM/BRAND") > -1) {
                if (parentList[1].DisplayName.toUpperCase().indexOf("ITEM") > -1) {
                    clearItemBrand(menusList, parentList, parentList[1].DisplayName)
                }
                else if (parentList[1].DisplayName.toUpperCase().indexOf("BRAND") > -1) {
                    clearItemBrand(menusList, parentList, parentList[1].DisplayName)
                }
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
            if (!menusList.IsCollapsible && parentList[parentList.length - 2] != undefined && parentList[parentList.length - 2].data.where(function (e) { return e.IsCollapsible }).length > 0) {
                angular.forEach(parentList[parentList.length - 2].data.where(function (e) { return e.IsCollapsible }), function (a, b) {
                    childList = parentList[parentList.length - 2].data.where(function (e) { return e.IsCollapsible == null && e.ParentId == a.FilterID });
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

            /*mutually exclusive is selectable at consecutive levels start*/
            let condition = !menusList.isDefaultLevel && (parentList[1].DisplayName == "5Ws" || parentList[0].DisplayName == "MARKETS");
            $scope.mutuallyExclusiveConsecutiveLevels(menusList, parentList, condition, prevHasChildSelected);
            if (parentList.length > 2 && parentList[1].DisplayName.indexOf("Category/Item/Brand") > -1 && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, "Category/Item/Brand");
            }
            if (parentList.length > 2 && parentList[1].DisplayName.indexOf("Manufacturer") > -1 && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, "Manufacturer");
            }
            else if (parentList.length > 2 && parentList[1].DisplayName.indexOf("Category") > -1 && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, "Category");
            }
            else if (parentList.length > 2 && parentList[1].DisplayName.indexOf("Brand") > -1 && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, "Brand");
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

            if (menusList.DisplayName == "Occasions Trend Report" && menusList.isTabSelected) {
                showYearOverYearTimeperiodPopup();
            }
            if (parentList[0].DisplayName == "REPORT" && !menusList.isDefaultLevel) {
                $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" || e.DisplayName == "BENCHMARK" }).filter(function (e) { return e.isDisabled = false });
                $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" || e.DisplayName == "RETAIL SALES VALUE" }).filter(function (e) { return e.isDisabled = true });
                if (menusList.DisplayName == "Category Business Review" && menusList.isTabSelected) {
                    $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" || e.DisplayName == "BENCHMARK" }).filter(function (e) { return e.isDisabled = true });
                    $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" || e.DisplayName == "RETAIL SALES VALUE" }).filter(function (e) { return e.isDisabled = false });
                }
            }
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
            showBackgroundShadow(true, true);
            if (!$scope.leftMenuIsHidden) {
                $scope.leftPanelToggle();
            }

            if (!$scope.ModuleIsHidden)
                $scope.ModulePanelToggle();

            if ($scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "RETAIL SALES VALUE" })[0].data.length == 0) {
                $scope.bindingLeftPanelDynamically($scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "RETAIL SALES VALUE" })[0], $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "RETAIL SALES VALUE" }));
            }

            var List = $scope.LeftStaticMenu.where(function (e) { return e.hasChild });
            List.where(function (e) { return e.hasSubMenusActive = false });
            List.where(function (e) { return e.isTabSelected = false });
            angular.forEach(List, function (a, b) {
                applyToChild(a, ["isTabSelected"], false);
            })
            if (!onSubmitValidations())
                return false;

            angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
            angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            responseData = [];
            ReportRequest = returnRequestObject();
            $.ajax({
                url: services.DownloadReport,
                data: JSON.stringify(ReportRequest),
                data: "{'request': '" + replaceWithDouble_SingleCharacters(JSON.stringify(ReportRequest)) + "' ,'origTimeList': '" + JSON.stringify(timeperiodList.filter(function (e) { return e.TimePeriodType.indexOf("Quarter") > -1 })) + "' }",
                method: callsType.Post,
                async: true,
                contentType: "application/json",
                //processData: false,
                success: function (response) {
                    if (response != "Error") {
                        window.location.href = services.DownloadFile + encodeURIComponent(response);
                        angular.element(document.getElementsByClassName("overlay")).hide();
                        if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "Custom Filters" }).length == 0)
                            angular.element(document.getElementsByClassName("save_filter_icon")).removeClass("disableSelection");
                        $timeout(function () {
                            show_popup("Alert", "Report downloaded successfully");
                            showBackgroundShadow(false, false);
                        }, 1000);
                    }
                    else {
                        angular.element(document.getElementsByClassName("overlay")).hide();
                        angular.element(document.getElementsByClassName("save_filter_icon")).addClass("disableSelection");
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
            else if (!selectedItems.some(function (e) { return e.DisplayName == "REPORT" })) {
                show_popup("Alert", customMessages.ReportSelection)
                return false;
            }
            else if (selectedItems.some(function (e) { return e.DisplayName == "REPORT" }) && selectedItems.filter(function (e) { return e.DisplayName == "REPORT" })[0].Data[0].FilterID == 8 && yoyId.length == 0) {
                show_alert_popup("Alert", customMessages.YoYSelection);
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }) && selectedItems.filter(function (e) { return e.DisplayName == "REPORT" })[0].Data[0].FilterID == 10) {
                show_popup("Alert", customMessages.ReportCategorySelection)
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
                List = ["TIME PERIOD", "MARKETS", "BENCHMARK"];
            else if (parentList[0].DisplayName == "REPORT" && menusList.DisplayName != "REPORT")
                List = ["TIME PERIOD", "MARKETS", "REPORT", "BENCHMARK"];
            else if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND" && menusList.DisplayName != "CATEGORY/ITEM/BRAND")
                List = ["TIME PERIOD", "MARKETS", "REPORT", "CATEGORY/ITEM/BRAND", "ADDITIONAL FILTERS"];
            return List;
        }

        $scope.hasSearch = function (menusList, parent_list) {
            var searchList = searchSelectAllList.filter(function (e) { return e.Search }).select("DisplayName").distinct();
            if (searchList.indexOf(menusList.DisplayName) > -1 && !(menusList.DisplayName == "5Ws" && menusList.isDefaultLevel))
                return true;
            return false;
        }

        // creating the request Obj for output start
        function returnRequestObject() {
            let request = {}
            request.TimeperiodId = "";
            request.MarketId = "";
            request.ReportId = "";
            request.TimeperiodName = "";
            request.MarketName = isRegion;
            request.Benchmark = "";
            request.AdditionalFilter = "";
            request.FilterName = "";
            request.YearOverYearId = "";//applicable for trend report only
            request.YearOverYearName = "";//applicable for trend report only
            request.Category = "";// applicable for business review report
            request.Manufacturer = "";// applicable for business review report
            request.Brand = "";// applicable for business review report
            request.PrevBenchmark = "";// applicable for business review report
            request.KelloggCategory = "";// applicable for business review report
            request.RetailSalesName = "";// applicable for business review report
            request.RetailSalesValue = "";// applicable for business review report

            /*get time period selections start*/
            let timeperiodSelections = selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" });
            request.TimeperiodName = selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data[0].DisplayName + ": " + $scope.getPKsAndName(timeperiodSelections, []).select("DisplayName").join(",");
            request.TimeperiodId = $scope.getPKsAndName(timeperiodSelections, []).select("FilterID").join(",");
            /*get time period selections end*/

            /*get yr over yr selections start*/
            request.YearOverYearName = yoyName;
            request.YearOverYearId = yoyId;
            /*get yr over yr selections end*/

            /*get market selections start*/
            let marketSelections = selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" });
            if (marketSelections[0].Data[0].DisplayName != "Select All Markets") {
                request.MarketId = $scope.getPKsAndName(marketSelections, []).select("FilterID").join(",");
                request.MarketName += $scope.getPKsAndName(marketSelections, []).select("DisplayName").join(", ");
            }
            else {
                request.MarketId = MarketRegionList.filter(function (e) { return !e.isDisabled }).select("FilterID").join(',');
                request.MarketName += MarketRegionList.filter(function (e) { return !e.isDisabled }).select("DisplayName").join(', ');
            }
            /*get market selections end*/

            /*get report selections start*/
            let reportSelections = selectedItems.filter(function (e) { return e.DisplayName == "REPORT" });
            request.ReportId = $scope.getPKsAndName(reportSelections, []).select("FilterID").join(",");
            /*get report selections end*/

            if (request.ReportId == 10) {
                if ((selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" })[0].Data[0].DisplayName.toUpperCase()) == "COVID QUARTER") {
                    let currentYear = timeList.map(function (e) {
                        return parseInt(e.split(" ").length > 1 ? e.split(" ")[e.split(" ").length - 2] : e)
                    }).distinct()[0];

                    if (currentYear - 1 > 2018) {
                        let prevTimeList = timeList.slice();
                        let append = "";
                        if ((currentYear - 1) == 2019) {
                            append = "(Pre-COVID19)";
                        }
                        else {
                            append = "(During-COVID19)";
                        }
                        prevTimeList = prevTimeList.map((e) => {
                            return e.substr(0, 7)+" "+append;
                        })
                        request.Benchmark = timeperiodList.filter(function (e) {
                            return e.TimePeriodType == "COVID Quarter" && prevTimeList.map(function (e) { return e.replace(currentYear.toString(), (currentYear - 1).toString()) }).indexOf(e.DisplayName) > -1
                        }).select("FilterID").join(",");
                        if (currentYear - 2 > 2018) {
                            prevTimeList = timeList.slice();
                            append = "";
                            if ((currentYear - 2) == 2019) {
                                append = "(Pre-COVID19)";
                            }
                            else {
                                append = "(During-COVID19)";
                            }
                            prevTimeList = prevTimeList.map((e) => {
                                return e.substr(0, 7) + " " + append;
                            })
                            request.PrevBenchmark = timeperiodList.filter(function (e) {
                                return e.TimePeriodType == "COVID Quarter" && prevTimeList.map(function (e) { return e.replace(currentYear.toString(), (currentYear - 2).toString()) }).indexOf(e.DisplayName) > -1
                            }).select("FilterID").join(",");
                        }
                    }
                }
                else {
                    let currentYear = timeList.map(function (e) {
                        return parseInt(e.split(" ").length > 1 ? e.split(" ")[e.split(" ").length - 1] : e)
                    }).distinct()[0];
                    if (currentYear - 1 > 2018) {
                        request.Benchmark = timeperiodList.filter(function (e) {
                            return timeList.map(function (e) { return e.replace(currentYear.toString(), (currentYear - 1).toString()) }).indexOf(e.DisplayName) > -1
                        }).select("FilterID").join(",");
                        if (currentYear - 2 > 2018) {
                            request.PrevBenchmark = timeperiodList.filter(function (e) {
                                return timeList.map(function (e) { return e.replace(currentYear.toString(), (currentYear - 2).toString()) }).indexOf(e.DisplayName) > -1
                            }).select("FilterID").join(",");
                        }
                    }

                }

                request.MarketId = "11";
            }

            /*get category selections start*/
            let categorySelections = selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" });
            if (categorySelections.length > 0 && categorySelections[0].Data.length > 0) {
                let a = $($(".menus_list input.retailLeftContent")[0]);
                let tempCat = $scope.getPKsAndName(categorySelections[0].Data[0].Data, []);
                request.Category = tempCat.select("FilterID").join(",");
                request.Category += "|" + ($(a).val() == "" || $(a).val() == undefined ? 0 : $(a).val());
                request.RetailSalesName += categorySelections[0].Data[0].DisplayName + " : " + tempCat.select("DisplayName").join(",");
                request.RetailSalesValue += categorySelections[0].Data[0].DisplayName + " : " + request.Category.split("|")[1];

                a = $($(".menus_list input.retailLeftContent")[1])
                request.KelloggCategory = ($(a).val() == "" || $(a).val() == undefined ? 0 : $(a).val());
                request.RetailSalesValue += "|Kellogg Category : " + request.KelloggCategory;

                let intData = categorySelections[0].Data.filter(function (e) { return e.DisplayName.indexOf("Manufacturer") > -1 });
                if (intData.length > 0) {
                    a = $($(".menus_list input.retailLeftContent")[2]);
                    tempCat = $scope.getPKsAndName(intData, []);
                    request.Manufacturer = $scope.getPKsAndName(intData, []).select("FilterID").join(",");
                    request.Manufacturer += "|" + ($(a).val() == "" || $(a).val() == undefined ? 0 : $(a).val());
                    request.RetailSalesName += "|" + intData[0].DisplayName + " : " + tempCat.select("DisplayName").join(",");
                    request.RetailSalesValue += "|" + intData[0].DisplayName + " : " + request.Manufacturer.split("|")[1];
                }
                /*remove/comment for Single retail value for Brand start*/
                //intData = categorySelections[0].Data.filter(function (e) { return e.DisplayName.indexOf("Brand") > -1 });
                //if (intData.length > 0) {
                //    a = $($(".menus_list input.retailLeftContent")[2]);
                //    tempCat = $scope.getPKsAndName(intData, []);
                //    request.Brand = tempCat.select("FilterID").join(",");
                //    request.Brand += "|" + ($(a).val() == "" || $(a).val() == undefined ? 0 : $(a).val());
                //    request.RetailSalesName += "|" + intData[0].DisplayName + " : " + tempCat.select("DisplayName").join(",");
                //    request.RetailSalesValue += "|" + intData[0].DisplayName + " : " + request.Brand.split("|")[1];
                //}
                /*remove/comment for Single retail value for Brand end*/

                /*uncomment for multi retail value for brand Start */
                let initialIndex = 3;
                intData = categorySelections[0].Data.filter(function (e) { return e.DisplayName.indexOf("Brand") > -1 });
                if (intData.length > 0) {
                    tempCat = $scope.getPKsAndName(intData, []);
                    var brandList = tempCat.select("DisplayName");
                    request.Brand = "Brand:" + tempCat.select("FilterID").join(",") + "|";
                    for (i = 0; i < brandList.length; i++) {
                        a = $($(".menus_list input.retailLeftContent")[initialIndex + i]);
                        request.Brand += ($(a).val() == "" || $(a).val() == undefined ? -1 : $(a).val()) + (i == brandList.length - 1 ? "" : ",");
                    }
                    request.RetailSalesName += "|" + intData[0].DisplayName + " : " + tempCat.select("DisplayName").join(",");
                    request.RetailSalesValue += "|" + intData[0].DisplayName + " : " + request.Brand.split("|")[1];
                }
                /*uncomment for multi retail value for brand End */

                intData = categorySelections[0].Data.filter(function (e) { return e.DisplayName.indexOf("Item") > -1 });
                if (intData.length > 0) {
                    tempCat = $scope.getPKsAndName(intData, []);
                    var itemList = tempCat.select("DisplayName");
                    request.Brand = "Item:" + tempCat.select("FilterID").join(",") + "|";
                    for (i = 0; i < itemList.length; i++) {
                        a = $($(".menus_list input.retailLeftContent")[initialIndex + i]);
                        request.Brand += ($(a).val() == "" || $(a).val() == undefined ? -1 : $(a).val()) + (i == itemList.length - 1 ? "" : ",");
                    }
                    request.RetailSalesName += "|" + intData[0].DisplayName + " : " + tempCat.select("DisplayName").join(",");
                    request.RetailSalesValue += "|" + intData[0].DisplayName + " : " + request.Brand.split("|")[1];
                }
            }
            /*get report selections end*/

            /*get additional filter selections start*/
            if (request.ReportId != 10) {
                let filterRec = $scope.AdditionalFilterRequest();
                request.AdditionalFilter = filterRec.FilterID;
                request.FilterName = filterRec.DisplayName;
            }
            /*get additional filter selections end*/

            /*get benchmark selections start*/
            if (request.ReportId != 10 && selectedItems.filter(function (e) { return e.DisplayName == "BENCHMARK" }).length > 0) {
                let benchmarkSelections = selectedItems.filter(function (e) { return e.DisplayName == "BENCHMARK" });
                request.Benchmark = $scope.getPKsAndName(benchmarkSelections, []).select("FilterID").join(",");
            }
            return request;
        }

        function filterReportFilters(actualData, reportId) {
            actualData = actualData.filter(function (e) { return e.ReportGeneratorFilter != undefined && (e.ReportGeneratorFilter == 0 || e.ReportGeneratorFilter.indexOf(reportId) > -1) });
            angular.forEach(actualData, function (a, b) {
                a.data = a.data.filter(function (e) { return e.ReportGeneratorFilter != undefined && (e.ReportGeneratorFilter == 0 || e.ReportGeneratorFilter.indexOf(reportId) > -1) });
                if (a.data.length > 0) {
                    a.data = filterReportFilters(a.data, reportId);
                }
            })
            return actualData;
        }

        function validateCategory(menusList, parentList, imm_parent) {
            let appendText = parentList.length > 1 ? (parentList[1].DisplayName.indexOf("Custom") > -1 ? "Custom " : "Survey ") : "";
            if (imm_parent.indexOf("Category") > -1 && imm_parent.indexOf("Manufacturer") == -1) {
                angular.forEach(parentList[0].data, function (a, b) {
                    if (b > 1) {
                        if (a.DisplayName.indexOf(appendText) > -1) {
                            a.isDisabled = false;
                        }
                        else {
                            a.isDisabled = true;
                        }
                        a.data = [];
                        a.hasChildSelected = false;
                        a.hasSubMenusActive = false;
                        a.isTabSelected = false;
                    }
                })
            }
            return true;
        }

        function clearItemBrand(menusList, parentList, imm_parent) {
            let appendText = parentList.length > 1 ? (parentList[1].DisplayName.indexOf("Custom") > -1 ? "Custom " : "Survey ") : "";
            let comparer = imm_parent.indexOf("Item") > -1 ? "Brand" : "Item";
            if (imm_parent.indexOf("Item") > -1 || imm_parent.indexOf("Brand") > -1) {
                angular.forEach(parentList[0].data, function (a, b) {
                    if (b > 1 && a.DisplayName == (appendText + comparer)) {
                        a.data = [];
                        a.hasChildSelected = false;
                        a.hasSubMenusActive = false;
                        a.isTabSelected = false;
                    }
                })
            }
            return true;
        }

        function validateRowColumn(menusList, parentList, parent) {
            let index = 0;
            if (!menusList.isDefaultLevel && parentList[0].DisplayName == parent && parentList.length > 2) {
                if (menusList.IsSelectable && parentList.select("DisplayName").indexOf("Category") > -1) {
                    if (parentList.select("DisplayName").indexOf("Category") > -1)
                        index = 1;

                    angular.forEach(parentList[index].data, function (a, b) {
                        if (b > 0) {
                            parentList[index].data[b].data = [];
                            parentList[index].data[b].hasChildSelected = false;
                            parentList[index].data[b].hasSubMenusActive = false;
                            parentList[index].data[b].isTabSelected = false;
                        }
                    })
                }
                else if (menusList.IsSelectable && parentList.select("DisplayName").indexOf("Item") > -1) {
                    if (parentList.select("DisplayName").indexOf("Item") > -1)
                        index = 1;
                    angular.forEach(parentList[index].data, function (a, b) {
                        if (b > 1) {
                            parentList[index].data[b].data = [];
                            parentList[index].data[b].hasChildSelected = false;
                            parentList[index].data[b].hasSubMenusActive = false;
                            parentList[index].data[b].isTabSelected = false;
                        }
                    })
                }
            }
            return true;
        }

        function showYearOverYearTimeperiodPopup() {
            show_popup("The Time Period currently selected will be used for the Quarter-Over-Quarter component of the Occasions Trend Report.  Please select Time Period for Year-Over-Year component of this report.", '');
            angular.element(".custom-popup:visible .popup-header").addClass("reportTimePopup");
            angular.element(".custom-popup:visible .popup-header .head-msg").addClass("reportMsg");

            var updateTime = "";
            let timePeriodTypeDiv = '';
            angular.forEach(timeperiodList.filter(function (e) { return e.TimePeriodType != "Rolling 4 Quarter" }).select("TimePeriodType").distinct(), function (a, b) {
                timePeriodTypeDiv += '<div class="timePeriodType ' + (b == 0 ? "selected" : "") + '" onclick="selectTimePeriodType(' + b + ',\'' + a + '\')"><div class="middleAlign">' + a + '</div></div>'
            })
            updateTime += '<div class="labelText" style="margin: 0.37vw 0 0.37vw 1.4vw;"><div class="middleAlign">SELECT YEAR-OVER-YEAR TIME PERIOD</div></div>';
            updateTime += '<div class="timePeriodArea">' +
                '<div class="timePeriodTypeArea">' + timePeriodTypeDiv + '</div>' +
                '<div class="timePeriodListArea"></div>' +
                '</div>';
            updateTime += '<div class="buttonContainer">' +
                '<div class="buttonArea">' +
                '<div class="updateButton buttonDiv" onclick="selectYOYTimeperiod()">' +
                '<div class="updateIconDiv buttonIconDiv"><div class="middleAlign"><div class="yesIcon buttonIcon"></div></div></div>' +
                '<div class="updateTextDiv buttonTextDiv"><div class="middleAlign">SELECT</div></div>' +
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

window.onclick = function (event) {
    if (!angular.element(event.target).hasClass('dropdownBox') && !angular.element(event.target).parents(".dropdown-list").length > 0) {
        angular.element(document.querySelectorAll('.dropdown-list')).hide();
        angular.element(document.querySelectorAll('.dropdown-bar')).find('.arrow').removeClass('active');
    }
    if (!angular.element(event.target).hasClass('dropbtn')) {
        var dropdowns = document.getElementsByClassName("settingDropdown");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        document.getElementById('mySettings').style.background = "";
        document.getElementById('mySettings').style.backgroundColor = "";
    }
}

function selectYOYTimeperiod() {
    let selectedTimePeriods = angular.element(".timePeriodListItem[timeperiodid != 0].selectedTimePeriod:visible").toArray();
    if (selectedTimePeriods.length == 0) {//if YoY selection is mandatory
        show_alert_popup("Alert", customMessages.YoYSelection);
        return false;
    }
    let timeperiodType = $(".timePeriodType.selected").text().trim();
    let selectedTimeIds = [];
    angular.forEach(selectedTimePeriods, function (a, b) {
        selectedTimeIds.push(parseInt(angular.element(a).attr("timeperiodid")));
    })

    yoyId = selectedTimeIds.join(',');
    yoyName = timeperiodList.filter(function (e) { return e.TimePeriodType == timeperiodType && selectedTimeIds.indexOf(e.FilterID) > -1 }).select("DisplayName").join(",");
    let index = $(".summay-content-text .middleAlign").html().indexOf(" || <span>YOY TIMEPERIOD");
    let inhtml = $(".summay-content-text .middleAlign").html();
    if (index > -1) {
        inhtml = inhtml.substring(0, index);
    }
    $(".summay-content-text .middleAlign").html(inhtml + " || <span>YOY TIMEPERIOD: </span>" + yoyName);
    close_Dashboard_popup();
}


function validateInput(e, el) {
    var key = !isNaN(e.charCode) ? e.charCode : e.keyCode;
    var dotcontains = e.target.value.indexOf(".") != -1;
    if (dotcontains)
        if (key == 46) return false;

    if (!keyAllowed(key))
        e.preventDefault();
    else {


        var inputValue = e.target.value;
        let val = inputValue.slice(0, e.target.selectionStart) + e.key + inputValue.slice(e.target.selectionEnd);
        var re = /^\d{0,6}(\.\d{0,3})?$/;
        if (!re.test(val)) {
            e.target.value = val == null ? "" : inputValue;
            return false;

            //    validateInput(e, el);
        }
        return true;
    }


};

function keyAllowed(key) {
    var keys = [8, 9, 13, 16, 17, 18, 19, 20, 27, 46, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57
    ];
    if (key && keys.indexOf(key) === -1)
        return false;
    else
        return true;
}