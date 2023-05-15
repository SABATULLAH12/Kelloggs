var leftPanel_Parents =
    [
        { id: 1, parent_name: "TIME PERIOD", parent_id: "", DisplayName: "TIME PERIOD", name_class: "timeperiod", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 2, parent_name: "MARKETS", parent_id: "", DisplayName: "MARKETS", name_class: "markets", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 3, parent_name: "FIND OPPORTUNITY FOR", parent_id: "", DisplayName: "FIND OPPORTUNITY FOR", name_class: "findOpportunityFor", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 4, parent_name: "CATEGORY/ITEM/BRAND", parent_id: "", DisplayName: "CATEGORY/ITEM/BRAND", name_class: "category", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isGroupNeeded: true },
        { id: 5, parent_name: "CATEGORY/ITEM-MANUFACTURER", parent_id: "", DisplayName: "CATEGORY/ITEM-MANUFACTURER", name_class: "manufacturer", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isGroupNeeded: true },
        { id: 6, parent_name: "CHANNEL/RETAILER", parent_id: "", DisplayName: "CHANNEL/RETAILER", name_class: "retailer", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isGroupNeeded: true },
        { id: 7, parent_name: "RETAIL SALES VALUE", parent_id: "", DisplayName: "RETAIL SALES VALUE", name_class: "retailSales", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 8, parent_name: "ADDITIONAL FILTERS", parent_id: "", DisplayName: "ADDITIONAL FILTERS", name_class: "additionalfilters", selections: "None", hasChild: true, menuLevel: 0, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 9, parent_name: "BENCHMARK", parent_id: "", DisplayName: "BENCHMARK", name_class: "benchmark", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isDisabled: false }
    ]

var ColumnStaticData = [
    { "AttributeId": 1, "AttributetypeId": 1, "CountryID": 0, "DisplayName": "Occasion", "Filter": "DIMENSION 1", "FilterID": 1, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Occasion", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 1, "data": [], "isDefaultLevel": false, "isSingle": true },
    {
        "AttributeId": 2, "AttributetypeId": 2, "CountryID": 0, "DisplayName": "Survey Category/Item/Brand", "Filter": "DIMENSION 1", "FilterID": 2, "IsLastLevel": false, "IsSelectable": false, "MetricName": "Survey Category/Item/Brand", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 2, "data": [
            { "AttributeId": 1, "AttributetypeId": 1, "CountryID": 0, "DisplayName": "Category", "Filter": "Survey Category/Item/Brand", "FilterID": 1, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Category", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 1, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 2, "AttributetypeId": 2, "CountryID": 0, "DisplayName": "Item", "Filter": "Survey Category/Item/Brand", "FilterID": 2, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Item", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 2, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 3, "AttributetypeId": 3, "CountryID": 0, "DisplayName": "Brand", "Filter": "Survey Category/Item/Brand", "FilterID": 3, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Brand", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 3, "data": [], "isDefaultLevel": false, "isSingle": true }
        ], "isDefaultLevel": false, "isSingle": true
    },
    {
        "AttributeId": 3, "AttributetypeId": 3, "CountryID": 0, "DisplayName": "Custom Category/Item/Brand", "Filter": "DIMENSION 1", "FilterID": 3, "IsLastLevel": false, "IsSelectable": false, "MetricName": "Custom Category/Item/Brand", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 3, "data": [
            { "AttributeId": 1, "AttributetypeId": 1, "CountryID": 0, "DisplayName": "Category", "Filter": "Custom Category/Item/Brand", "FilterID": 1, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Category", "MetricParentName": "Custom Category/Item/Brand", "ParentId": null, "SortID": 1, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 2, "AttributetypeId": 2, "CountryID": 0, "DisplayName": "Item", "Filter": "Custom Category/Item/Brand", "FilterID": 2, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Item", "MetricParentName": "Custom Category/Item/Brand", "ParentId": null, "SortID": 2, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 3, "AttributetypeId": 3, "CountryID": 0, "DisplayName": "Brand", "Filter": "Custom Category/Item/Brand", "FilterID": 3, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Brand", "MetricParentName": "Custom Category/Item/Brand", "ParentId": null, "SortID": 3, "data": [], "isDefaultLevel": false, "isSingle": true }
        ], "isDefaultLevel": false, "isSingle": true

    },
    { "AttributeId": 6, "AttributetypeId": 6, "CountryID": 0, "DisplayName": "5Ws", "Filter": "DIMENSION 1", "FilterID": 6, "IsLastLevel": true, "IsSelectable": true, "MetricName": "5Ws", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 6, "data": [], "isDefaultLevel": false, "isSingle": true },
    { "AttributeId": 7, "AttributetypeId": 7, "CountryID": 0, "DisplayName": "Demographics", "Filter": "ADDITIONAL FILTERS", "FilterID": 7, "IsLastLevel": false, "IsSelectable": false, "MetricName": "Demographics", "MetricParentName": "ADDITIONAL FILTERS", "ParentId": null, "SortID": 7, "data": [], "isDefaultLevel": false, "isSingle": true },

]
var MarketRegionList = [];
var selectedItems = [], LeftPanelOriginalData, timeperiodList, OSPRequest = [], responseData = [], submitFlag = 0, exportFlag = 0, selectedMarket, TotalSampleSize = [], innerResponseData = [], addtnlText = '';

var exportFlag = 0, maxLevel = 1;

$(window).resize(function () {
    if (responseData.length > 0) {

        if ($('.retailChartArea').css("display") == "block")
            CreateGrid("Retail", $(".output-container .chartArea"))
    }
    else if ($('.distributionChartArea').css("display") == "block") {
        CreateGrid("Distribution", $(".output-container .chartArea"))
    }
    else if ($('.demographicsChartArea').css("display") == "block") {
        CreateInnerGrid("Demographics", $('.drilldown-container .demographicsChartArea'), selectedCellObj);
    }
    else if ($('.motivationChartArea').css("display") == "block") {
        CreateInnerGrid("Motivations", $('.drilldown-container .motivationChartArea'), selectedCellObj);
    }
    else {
        CreateInnerGrid("5Ws", $('.drilldown-container .fiveWsChartArea'), selectedCellObj);
    }




})

angular.module('starter.controllers', ["ngAnimate", 'commonService'])
    .controller('parent-controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {
        showBackgroundShadow(true, true);
        $scope.ModuleIsHidden = true;
        $scope.leftMenuIsHidden = true;
        $scope.parent_list = [];
        angular.element(document.querySelectorAll(".moduleLevel[title='ADVANCED ANALYTICS']")).addClass("active");
        angular.element(document.querySelectorAll(".moduleLevel[title='OCCASION STRATEGIC']")).addClass("active");
        angular.element(document.querySelectorAll(".module-name .middleAlign")).text("Occasion Strategic Postures");
        angular.element(document.getElementsByClassName("header-left")).css({ "width": "20%" });
        angular.element(document.getElementsByClassName("header-center")).css({ "width": "50%" });


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
            angular.element(document.querySelectorAll(".summaryPopup")).css("display", "none");
            angular.element(document.querySelectorAll(".summary-view-click")).removeClass("summaryPopup_selected");
            angular.element(document.getElementsByClassName("weightedOccasionDiv")).addClass("active");
            angular.element(document.getElementsByClassName("unweightedOccasionDiv")).removeClass("active");
            angular.element(".samplesize-popup .samplesizeHead .middleAlign").text("SAMPLE SIZE");

            //if ($('.shareCategoryText').hasClass('active'))
            //    CreateGrid("ShareWeighted", $(".samplesize-popup .popup-container"));
            //else
            CreateGrid("Weighted", $(".samplesize-popup .popup-container"));
        }

        $scope.Exports = function (type) {
            if (!exportFlag) {
                show_popup("Alert", "Please click on submit and try again, as the selection has been changed.");
                return false;
            }

            var resp = JSON.stringify(responseData);
            showBackgroundShadow(true, true);

            if (type == 'ppt') {
                myFunction1();
                let opportunityFor = selectedItems[2].Data[0].DisplayName;
                let summary = OSPRequest.SelectionSummary;
                let data = responseData;
                $.ajax({
                    url: services.OSPExportPPT,
                    data: '{"request": "' + escape(JSON.stringify(OSPRequest)) + '","response": "' + escape(JSON.stringify(data)) + '","marketName": "' + selectedMarket[0].DisplayName + '","opportunityFor": "' + opportunityFor + '","summary": "' + summary + '"}',
                    method: callsType.Post,
                    async: true,
                    contentType: "application/json",
                    //processData: false,
                    success: function (response) {
                        if (response != "Error") {
                            window.location.href = services.DownloadFile + encodeURIComponent(response);
                            angular.element(document.getElementsByClassName("overlay")).hide();
                            CreateGrid('Distribution', $(".output-container .distributionChartArea"));
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
            else if (type == 'excel') {
                var exportExcelData, exportExcelType;
                if ($('.output-container').css('display') != 'none') {
                    exportExcelData = OSPRequest;
                    exportExcelType = "OSPRequest";
                }
                else {
                    exportExcelData = OSPInnerRequest;
                    exportExcelType = "OSPInnerRequest";
                }
                $.ajax({
                    url: services.GetOSPExportExcel,
                    data: "{'requestType': '" + exportExcelType + "', 'response' : '" + escape(JSON.stringify(responseData)) + "', 'requestData': '" + escape(JSON.stringify(exportExcelData)) + "' }",
                    method: callsType.Post,
                    async: true,
                    contentType: "application/json",
                    //processData: false,
                    success: function (response) {
                        if (response != "Error") {
                            window.location.href = services.DownloadFile + encodeURIComponent(response);
                            $timeout(function () {
                                showBackgroundShadow(false, false);
                            }, 1000);
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
        }
        /*sample size click event end*/


    }])
    .controller('OSP-Controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {

        $scope.customPopup['visible'] = false;
        $scope.crosstabLeftPanel = true;
        $scope.isShareCategory = false;
        $scope.shareName = "CATEGORY";

        $scope.hideLeftPanel = function ($event) {
            if (!$scope.leftMenuIsHidden)
                $scope.leftPanelToggle($event);
            if (!$scope.ModuleIsHidden)
                $scope.ModulePanelToggle();
            //$scope.showSettings = false;
            angular.element(document.querySelectorAll(".summaryPopup")).css("display", "none");
            angular.element(document.querySelectorAll(".summary-view-click")).removeClass("summaryPopup_selected");
        }

        $scope.hideChartHelp = function ($event) {

            if ($event.hasClass("disableSelection")) {
                $("#chartCallout").toggle();
            }
        }

        $scope.selectHeaderOption = function (type) {

            if (type == 1) {
                if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 || OSPRequest.RespType != "1,2,3") {
                    if ($("#retailCallout").is(":visible"))
                        $("#retailCallout").hide();
                    else
                        $("#retailCallout").show();
                    $scope.selectHeaderOption(2);
                    return false;
                }
                $("#retailCallout").hide();
                $('.disIcon').removeClass('active');
                $('.disText').removeClass('active');
                $('.retailIconImage').addClass('active');
                $('.retailText').addClass('active');
                $('.shareCategoryText').removeClass('active');
                $('.shareIcon').removeClass('active');
                angular.element(document.querySelectorAll('.distributionChartArea')).hide();
                angular.element(document.querySelectorAll('.shareCategoryChartArea')).hide();
                angular.element(document.querySelectorAll('.retailChartArea')).show();
                CreateGrid('Retail', $(".output-container .retailChartArea"));
            }
            else if (type == 2) {
                $('.disIcon').addClass('active');
                $('.disText').addClass('active');
                $('.retailIconImage').removeClass('active');
                $('.retailText').removeClass('active');
                $('.shareCategoryText').removeClass('active');
                $('.shareIcon').removeClass('active');
                angular.element(document.querySelectorAll('.retailChartArea')).hide();
                angular.element(document.querySelectorAll('.shareCategoryChartArea')).hide();
                angular.element(document.querySelectorAll('.distributionChartArea')).show();
                CreateGrid('Distribution', $(".output-container .distributionChartArea"));
            }
            else {
                $('.shareCategoryText').addClass('active');
                $('.shareIcon').addClass('active');
                $('.retailIconImage').removeClass('active');
                $('.retailText').removeClass('active');
                $('.disIcon').removeClass('active');
                $('.disText').removeClass('active');
                angular.element(document.querySelectorAll('.retailChartArea')).hide();
                angular.element(document.querySelectorAll('.distributionChartArea')).hide();
                angular.element(document.querySelectorAll('.shareCategoryChartArea')).show();
                CreateGrid('Share', $(".output-container .shareCategoryChartArea"));
            }


        }


        $scope.selectInnerHeaderOption = function (type) {

            if (type == 1) {
                $('.demogIconImage').addClass('active');
                $('.demogText').addClass('active');
                $('.motivIcon').removeClass('active');
                $('.motivText').removeClass('active');
                $('.fiveWsIcon').removeClass('active');
                $('.fiveWsText').removeClass('active');
                angular.element(document.querySelectorAll('.motivationChartArea')).hide();
                angular.element(document.querySelectorAll('.fiveWsChartArea')).hide();
                angular.element(document.querySelectorAll('.demographicsChartArea')).show();
                CreateInnerGrid("Demographics", $('.drilldown-container .demographicsChartArea'), selectedCellObj);

            }
            else if (type == 2) {
                $('.demogIconImage').removeClass('active');
                $('.demogText').removeClass('active');
                $('.motivIcon').addClass('active');
                $('.motivText').addClass('active');
                $('.fiveWsIcon').removeClass('active');
                $('.fiveWsText').removeClass('active');
                angular.element(document.querySelectorAll('.demographicsChartArea')).hide();
                angular.element(document.querySelectorAll('.fiveWsChartArea')).hide();
                angular.element(document.querySelectorAll('.motivationChartArea')).show();
                CreateInnerGrid("Motivations", $('.drilldown-container .motivationChartArea'), selectedCellObj);

            }
            else {
                $('.demogIconImage').removeClass('active');
                $('.demogText').removeClass('active');
                $('.motivIcon').removeClass('active');
                $('.motivText').removeClass('active');
                $('.fiveWsIcon').addClass('active');
                $('.fiveWsText').addClass('active');
                angular.element(document.querySelectorAll('.demographicsChartArea')).hide();
                angular.element(document.querySelectorAll('.motivationChartArea')).hide();
                angular.element(document.querySelectorAll('.fiveWsChartArea')).show();
                CreateInnerGrid("5Ws", $('.drilldown-container .fiveWsChartArea'), selectedCellObj);

            }

        }

        $scope.goBack = function () {

            $('.output-container').css('display', 'block');
            $('.drilldown-container').css('display', 'none');
            $('.footerContent').css('display', 'block');
            $('.innerFooterContent').css('display', 'none');
            angular.element(document.getElementsByClassName("pptDiv")).removeClass("disableSelection");

            if ($('.retailIconImage').hasClass('active'))
                $scope.selectHeaderOption(1);
            else
                $scope.selectHeaderOption(2);
        }




    }])
    .controller('LeftPanelController', ["$scope", "$timeout", "$http", "$filter", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, $filter, commonService, $compile, $sce) {

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
                menusList.data = angular.copy(ColumnStaticData.filter(function (e) { return e.DisplayName != "Occasion" }));
                applyToChild(menusList, ["Filter"], menusList.DisplayName);
                let customFilters = { "AttributeId": 7, "AttributetypeId": 7, "CountryID": 0, "DisplayName": "Custom Filters", "Filter": "ADDITIONAL FILTERS", "FilterID": 7, "IsLastLevel": false, "IsSelectable": false, "MetricName": "Custom Filters", "MetricParentName": "ADDITIONAL FILTERS", "ParentId": null, "SortID": 7, "data": [], "isDefaultLevel": false, "isSingle": true };
                let covid = { "AttributeId": 8, "AttributetypeId": 8, "CountryID": 0, "DisplayName": "COVID-19", "Filter": "ADDITIONAL FILTERS", "FilterID": 8, "IsLastLevel": false, "IsSelectable": false, "MetricName": "COVID-19", "MetricParentName": "ADDITIONAL FILTERS", "ParentId": null, "SortID": 7, "data": [], "isDefaultLevel": false, "isSingle": true };
                menusList.data.push(covid);
                menusList.data.push(customFilters);
                $scope.addSampleType(menusList);
                //let selectedOpportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data, []).select("DisplayName").distinct().join(', ');
                //let isCustomSelected = false, isSurveySelected = false;
                //if (selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data[0].DisplayName.indexOf("Custom") > -1)
                //    isCustomSelected = true;
                //if (selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data[0].DisplayName.indexOf("Survey") > -1)
                //    isSurveySelected = true;
                //if (isCustomSelected)
                //    categoryType = "Custom Category/Item/Brand";
                //else
                //    categoryType = "Survey Category/Item/Brand";
                //menusList.data.filter(function (e) { return e.DisplayName.indexOf("Category/Item/Brand") > -1 })[0].isDisabled = false;
                //menusList.data.filter(function (e) { return e.DisplayName.indexOf("Category/Item/Brand") > -1 })[0].data.filter(function (e) { return e.isDisabled = false });
                //if (selectedOpportunity.indexOf("Manufacturer") == -1) {
                //    if (selectedOpportunity == "Category")
                //        menusList.data.filter(function (e) { return e.DisplayName == categoryType })[0].data[0].isDisabled = true;
                //    if (selectedOpportunity == "Item") {
                //        menusList.data.filter(function (e) { return e.DisplayName == categoryType })[0].data[0].isDisabled = true;
                //        menusList.data.filter(function (e) { return e.DisplayName == categoryType })[0].data[1].isDisabled = true;
                //    }
                //    if (selectedOpportunity == "Brand") {
                //        menusList.data.filter(function (e) { return e.DisplayName == categoryType })[0].data.filter(function (e) { return e.isDisabled = true });
                //    }
                //    if (selectedOpportunity != "Channel" && selectedOpportunity != "Retailer") {
                //        if (isCustomSelected) {
                //            menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled = true });
                //        }
                //        else if (isSurveySelected) {
                //            menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled = true });
                //        }
                //    }
                //}
                //else {
                //    menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled = true });
                //    menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled = true });
                //}
                //if (menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled }).length == 3)
                //    menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].isDisabled = true;
                //if (menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled }).length == 3)
                //    menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].isDisabled = true;

                angular.forEach(menusList.data.filter(function (e) { return e.DisplayName.indexOf("Category/Item/Brand") > -1 }), function (val, ind) {
                    val.data.filter(function (e) { return e.IsSelectable = false });
                    val.data.filter(function (e) { return e.IsLastLevel = false });
                })
                menusList.data.filter(function (e) { return e.IsSelectable = false });
                menusList.data.filter(function (e) { return e.IsLastLevel = false });

            }
            else if (menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM/BRAND" || menusList.DisplayName.toUpperCase() == "CATEGORY" || menusList.DisplayName.toUpperCase() == "ITEM" || menusList.DisplayName.toUpperCase() == "BRAND") {

                let selectedOpportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data, []).select("DisplayName").distinct().join(', ');
                let appendText = "";
                if ((selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data[0].DisplayName.indexOf("Custom") > -1 && selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data[0].DisplayName.indexOf("Channel") == -1) || (parentList[0].DisplayName == "ADDITIONAL FILTERS" && parentList[1].DisplayName.indexOf("Custom") > -1))
                    appendText = "CUSTOM ";
                let CategoryType;
                if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && parentList[1].DisplayName == "Survey Category/Item/Brand") {
                    CategoryType = "Survey Category/Item/Brand";
                    appendText = "";
                }
                else if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && parentList[1].DisplayName == "Custom Category/Item/Brand") {
                    CategoryType = "Custom Category/Item/Brand";
                    appendText = "CUSTOM ";
                }
                let keepList = [];
                let tempData = [];
                let countryIds = $scope.returnCountryIds();
                tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return (parentList[0].DisplayName != "ADDITIONAL FILTERS" && e.DisplayName.toUpperCase() == appendText + selectedOpportunity.toUpperCase()) || e.DisplayName.toUpperCase() == appendText + menusList.DisplayName.toUpperCase() })[0].data, countryIds, menusList, parentList));

                if (countryIds.length > 1)
                    tempData = $scope.filterDups(tempData, countryIds.length);

                if (((selectedOpportunity == "Category") && menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM/BRAND") || menusList.DisplayName.toUpperCase() == "CATEGORY") {
                    //tempData = tempData.filter(function (e) { return e.DisplayName.toUpperCase() != "SELECT ALL " + appendText + "BRANDS" && //e.DisplayName.toUpperCase() != "SELECT ALL " + appendText + "ITEMS" && e.DisplayName.toUpperCase() != "SELECT ALL BRANDS" && //e.DisplayName.toUpperCase() != "SELECT ALL ITEMS" });
                    ///*show selected categories*/
                    //angular.forEach(tempData.filter(function (e) { return e.DisplayName != "Custom Group" }), function (a, b) {
                    //    a.data = [];
                    //    a.IsSelectable = true;
                    //    a.IsLastLevel = true;
                    //})
                    if (parentList[0].DisplayName != "ADDITIONAL FILTERS")
                        tempData = tempData.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 });
                    menusList.data = tempData;
                }
                else if (((selectedOpportunity == "Item") && menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM/BRAND") || menusList.DisplayName.toUpperCase() == "ITEM") {

                    //if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && selectedOpportunity == "Category") {
                    //    keepList = $scope.filterList(selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }), keepList);
                    //}
                    //let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
                    //let adnListData;
                    //if (adnList.length > 0 && parentList[0].DisplayName == "ADDITIONAL FILTERS") {
                    //    adnListData = adnList[0].Data.filter(function (e) { return e.DisplayName == CategoryType });
                    //    if (adnListData.length > 0) {
                    //        let bucketList = adnListData[0].Data;
                    //        if (bucketList.filter(function (e) { return e.DisplayName == "Category" }).length > 0)
                    //            keepList = $scope.filterList(bucketList.filter(function (e) { return e.DisplayName == "Category" }), keepList);
                    //    }
                    //}

                    if (keepList.length > 0)
                        tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "ITEMS" || e.DisplayName == "Custom Group" || e.DisplayName.toUpperCase() == "SELECT ALL ITEMS" });

                    //tempData = tempData.filter(function (e) { return !e.IsLastLevel || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + /"ITEMS" /|| e.DisplayName == "Custom Group" || e.DisplayName.toUpperCase() == "SELECT ALL ITEMS" });
                    //angular.forEach(tempData.filter(function (e) { return e.DisplayName != "Custom Group" }), function (a, b) {
                    //    if (a.DisplayName.indexOf("Select All") == -1) {
                    //        a.IsSelectable = false;
                    //        a.IsLastLevel = false;
                    //    }
                    //    angular.forEach(a.data, function (c, d) {
                    //        c.IsSelectable = true;
                    //        c.IsLastLevel = true;
                    //        c.ParentId = a.FilterID,
                    //        c.data = [];
                    //    })
                    //})
                    if (parentList[0].DisplayName != "ADDITIONAL FILTERS")
                        tempData = tempData.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 });
                    menusList.data = tempData;
                }
                else if (((selectedOpportunity == "Brand") && menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM/BRAND") || menusList.DisplayName.toUpperCase() == "BRAND") {
                    let itemList = []
                    //if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && selectedOpportunity == "Category") {
                    //    keepList = $scope.filterList(selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }), keepList);
                    //}
                    //if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && selectedOpportunity == "Item") {
                    //    keepList = $scope.filterList(selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }), keepList);
                    //    angular.forEach(menusList.data.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 }), function (a, b) {
                    //        angular.forEach(a.Data, function (c, d) {
                    //            var obj = {
                    //            };
                    //            obj.Item = c.DisplayName;
                    //            obj.Category = a.DisplayName;
                    //            itemList.push(obj);
                    //        })
                    //    })
                    //}
                    //let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
                    //let adnListData;
                    //if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && adnList.length > 0) {
                    //    adnListData = adnList[0].Data.filter(function (e) { return e.DisplayName == CategoryType });
                    //    if (adnListData.length > 0) {
                    //        let categoryList = adnListData[0].Data.filter(function (e) { return e.DisplayName == "Category" });
                    //        let itemsList = adnListData[0].Data.filter(function (e) { return e.DisplayName == "Item" });
                    //        if (categoryList.length > 0)
                    //            keepList = $scope.filterList(categoryList, keepList);
                    //        if (itemsList.length > 0) {
                    //            keepList = [];
                    //            keepList = $scope.filterList(itemsList, keepList);
                    //            angular.forEach(menusList.data.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 }), function (a, b) {
                    //                angular.forEach(a.Data, function (c, d) {
                    //                    var obj = {
                    //                    };
                    //                    obj.Item = c.DisplayName;
                    //                    obj.Category = a.DisplayName;
                    //                    itemList.push(obj);
                    //                })
                    //            })
                    //        }
                    //    }
                    //}

                    if (keepList.length > 0)
                        tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "BRANDS" || e.DisplayName.toUpperCase() == "SELECT ALL BRANDS" });
                    //tempData = tempData.filter(function (e) { return !e.IsLastLevel || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "BRANDS" || e.DisplayName.toUpperCase() == "SELECT ALL BRANDS" });
                    if (itemList.length > 0) {
                        angular.forEach(tempData.filter(function (e) { return e.DisplayName != "Custom Group" }), function (a, b) {
                            var BrandData = [];
                            angular.forEach(a.data.filter(function (e) { return itemList.filter(function (e) { return e.Category == a.DisplayName }).select("Item").indexOf(e.DisplayName) > -1 }), function (c, d) {
                                BrandData.push(c);
                            })
                            a.data = BrandData;
                        })
                    }
                    //tempData = tempData.filter(function (e) { return e.data.length || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "BRANDS" || e.DisplayName.toUpperCase() == "CUSTOM GROUP" || e.DisplayName.toUpperCase() == "SELECT ALL BRANDS"});
                    if (parentList[0].DisplayName != "ADDITIONAL FILTERS")
                        tempData = tempData.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 });
                    menusList.data = tempData;
                }

                applyToChild(menusList, ["isSingle"], false);
            }
            else if (menusList.DisplayName.toUpperCase() == "DEMOGRAPHICS") {
                let tempData = $scope.getDemographicsData();
                menusList.data = tempData;
            }
            else if (menusList.DisplayName.toUpperCase() == "5WS") {
                let removeList = [];
                let countryIds = $scope.returnCountryIds();
                let opportunityForList = selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" });
                let selectedOpportunity = $scope.getPKsAndName(opportunityForList[0].Data, []).select("DisplayName").distinct().join(', ');
                let appendText = opportunityForList[0].Data[0].DisplayName.indexOf("Custom") > -1 ? "CUSTOM " : "SURVEY ";
                menusList.data = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "5WS" })[0].data, countryIds, menusList, parentList));
                if (countryIds.length > 1)
                    menusList.data = $scope.filterDups(menusList.data, countryIds.length);
                menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].isDisabled = false;
                //if (selectedOpportunity == "Retailer" || selectedOpportunity == "Retailer Nets") {
                //    menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].isDisabled = true;
                //    //menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].data.filter(function (e) { return e.DisplayName == "Channel" })[0].isDisabled = true
                //}

                $scope.validationForCanada(menusList);
                //if (selectedOpportunity == "Channel") {
                //    angular.forEach(menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].data.filter(function (e) { return e.DisplayName.indexOf("Channel") > -1 || e.DisplayName.indexOf("Retailer") > -1 }), function (a, b) {
                //        if (a.DisplayName.toUpperCase() != appendText + "CHANNEL")
                //            a.isDisabled = true;
                //        else if (a.DisplayName.toUpperCase() == appendText + "CHANNEL") {
                //            a.isChannelSelected = 1;
                //        }
                //        if (!a.isDisabled) {
                //            let keepList = [];
                //            keepList = $scope.filterList(selectedItems.filter(function (e) { return e.DisplayName == "CHANNEL/RETAILER" }), keepList);
                //            a.data = a.data.filter(function (e) { return (keepList.indexOf(e.DisplayName) > -1 && e.data.length > 0) || (e.DisplayName.indexOf("Select All") > -1 && e.DisplayName.indexOf("Retailer") > -1) });
                //            angular.forEach(a.data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), function (value, index) {
                //                value.IsSelectable = false;
                //                if (a.DisplayName.toUpperCase() == "CUSTOM CHANNEL") {
                //                    value.data = value.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 || e.data.length > 0 || (e.DisplayName.indexOf("Select All") > -1 && e.DisplayName.indexOf("Retailers") > -1) });
                //                    angular.forEach(value.data, function (c, d) {
                //                        if (!c.IsLastLevel) {
                //                            c.IsSelectable = false;
                //                            c.data = c.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 });
                //                        }
                //                    })
                //                }
                //                a.data = a.data.filter(function (e) { return e.data.length > 0 || (e.DisplayName.indexOf("Select All") > -1 && e.DisplayName.indexOf("Retailer") > -1) });
                //            })
                //            if (a.data.length == 0 && selectedOpportunity == "Channel" && a.DisplayName.toUpperCase() == appendText + "CHANNEL") {
                //                a.isDisabled = true;
                //                menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].isDisabled = true;
                //            }
                //        }
                //    })
                //}
            }
            else if (menusList.DisplayName.toUpperCase() == "CHANNEL/RETAILER") {
                let countryIds = $scope.returnCountryIds();
                let selectedOpportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data, []).select("DisplayName").distinct().join(', ');
                let appendText = "";
                if (selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data[0].DisplayName.indexOf("Custom") > -1)
                    appendText = "CUSTOM ";
                if (selectedOpportunity == "Retailer Nets")
                    menusList.data = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "RETAILER NETS" })[0].data, countryIds, menusList, parentList));
                else
                    menusList.data = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + "CHANNEL/RETAILER" })[0].data, countryIds, menusList, parentList));
                if (countryIds.length > 1)
                    menusList.data = $scope.filterDups(menusList.data, countryIds.length);
                if (selectedOpportunity == "Channel" || selectedOpportunity == "Retailer Nets") {
                    angular.forEach(menusList.data.filter(function (e) { return e.DisplayName.indexOf("Custom Group") == -1 }), function (a, b) {
                        a.data = [];
                        a.IsLastLevel = 1;
                        a.IsSelectable = true;
                    })
                    menusList.data = menusList.data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 && e.DisplayName != "Custom Group Retailer" });
                }
                else if (selectedOpportunity == "Retailer") {
                    menusList.data = menusList.data.filter(function (e) { return e.DisplayName != "Custom Group Channel" });
                    menusList.data = menusList.data.filter(function (e) { return e.data.length > 0 || e.DisplayName.toUpperCase().indexOf("CUSTOM GROUP") > -1 });
                    menusList.data.filter(function (e) { return e.DisplayName != "Select All Retailers" }).filter(function (e) { return e.IsSelectable = false });
                    menusList.data.filter(function (e) { return e.DisplayName != "Select All Retailers" }).filter(function (e) { return e.isSingle = true });
                    menusList.data.filter(function (e) { return e.DisplayName == "Select All Retailers" }).filter(function (e) { return e.IsLastLevel = true });
                    angular.forEach(menusList.data.filter(function (e) { return e.DisplayName.indexOf("Custom Group") == -1 }), function (a, b) {

                        if (appendText != "") {
                            a.data = a.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 || e.data.length > 0 || (e.DisplayName.indexOf("Select All") > -1 && (e.DisplayName.indexOf("Retailers") > -1 || e.data.filter(function (x) { return !x.IsLastLevel }).length == 0)) });
                            if (a.data.length > 0) {
                                a.data.filter(function (e) { return e.DisplayName != "Select All Retailers" && !e.IsLastLevel }).filter(function (e) { return e.IsSelectable = false });
                                if (a.data.filter(function (val) { return val.data.length > 0 }).length > 0)
                                    angular.forEach(a.data.filter(function (val) { return val.DisplayName.indexOf("Select All") == -1 }), function (val1, ind1) {
                                        val1.data = val1.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 || e.DisplayName.indexOf("Select All") > -1 });
                                        //if (val1.data.length > 0 && val1.data.filter(function (e) { return e.DisplayName == "Select All" }).length == 0) {
                                        //    obj.MetricParentName = val1.DisplayName;
                                        //    obj.ParentId = val1.FilterID;
                                        //    obj.AttributetypeId = 17;
                                        //    val1.data.unshift(angular.copy(obj));
                                        //}
                                    })
                                //else if (a.data.filter(function (e) { return e.DisplayName.toUpperCase() == "SELECT ALL" }).length == 0 && a.DisplayName.toUpperCase().indexOf//("SELECT ALL") == -1) {
                                //    obj.MetricParentName = a.DisplayName,
                                //    obj.ParentId = a.FilterID,
                                //    a.data.unshift(angular.copy(obj));
                                //}
                            }
                        }
                        //else if (a.data.filter(function (e) { return e.DisplayName.toUpperCase() == "SELECT ALL" }).length == 0 && a.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1) {
                        //    obj.MetricParentName = a.DisplayName,
                        //    obj.ParentId = a.FilterID,
                        //    a.data.unshift(angular.copy(obj));
                        //}
                    })
                    if (appendText != "") {
                        menusList.data = menusList.data.filter(function (e) { return e.data.filter(function (f) { return f.DisplayName != "Select All" }).length > 0 || e.DisplayName.toUpperCase().indexOf("CUSTOM GROUP") > -1 });
                    }
                }

            }
            else if (menusList.DisplayName.toUpperCase() == "RETAIL SALES VALUE") {
                let selectedOpportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data, []).select("DisplayName").distinct().join(', ');
                let appendText = selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data[0].DisplayName.indexOf("Custom") > -1 ? "Custom" : "";
                let selectedList = [];
                if (stickySelection.length > 0) {
                    selectedItems = stickySelection.filter(function (e) { return e.DisplayName != "" });
                }
                if (selectedOpportunity == "Channel" || selectedOpportunity == "Retailer" || selectedOpportunity == "Retailer Nets") {
                    selectedList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "CHANNEL/RETAILER" }), []);
                }
                else if ((selectedOpportunity.indexOf("Category") > -1 || selectedOpportunity.indexOf("Item") > -1 || selectedOpportunity.indexOf("Brand") > -1) && selectedOpportunity.indexOf("Manufacturer") == -1) {
                    selectedList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }), []);
                }
                else
                    selectedList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM-MANUFACTURER" }), []);

                switch (selectedOpportunity) {
                    case 'Category':
                    case 'Item':
                    case 'Channel':
                    case 'Retailer Nets':
                        break;
                    case 'Brand':
                        {
                            let flag = 0;
                            if (selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data[0].DisplayName.indexOf("Custom") > -1)
                                flag = 1;

                            var List = [{ "DisplayName": "Custom Group" }];
                            if (selectedList[0].Parent != "Custom Group") {
                                List = getSummaryTextCustom(selectedItems.where(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].Data, selectedList[0].Parent, flag);
                            }
                            var obj = {};
                            obj.FilterID = selectedList[0].parentPK;
                            obj.DisplayName = List[0].DisplayName;
                            obj.Parent = null;
                            selectedList.unshift(obj);
                        }
                        break;
                    default: {
                        angular.forEach(selectedList.where(function (e) { return e.Parent != null }).select("parentPK").distinct().reverse(), function (a, b) {
                            var obj = {};
                            var record = selectedList.where(function (e) { return e.Parent != null && e.parentPK == a })[0];
                            obj.FilterID = record.parentPK;
                            obj.DisplayName = record.Parent;
                            if (appendText == "Custom" && selectedOpportunity == "Retailer") {
                                record = selectedItems.filter(function (e) { return e.DisplayName == "CHANNEL/RETAILER" })[0].Data[0];
                                obj.FilterID = record.FilterID;
                                obj.DisplayName = record.DisplayName;
                            }
                            obj.Parent = null;
                            if (selectedList.filter(function (e) { return e.DisplayName == obj.DisplayName && e.FilterID == obj.FilterID }).length == 0)
                                selectedList.unshift(obj);
                        })
                    }
                        break;
                }
                angular.forEach(selectedList, function (a, b) {
                    let value = "";
                    if (stickySelection.length > 0) {
                        let data = stickySelection.filter(function (e) { return e.DisplayName == "RETAIL SALES VALUE" });
                        if (data.length > 0 && data[0].Data.filter(function (e) { return e.OptionName == a.DisplayName }).length > 0)
                            value = data[0].Data.filter(function (e) { return e.OptionName == a.DisplayName })[0].DisplayName;
                    }
                    let obj = a;
                    obj.Filter = "RETAIL SALES VALUE";
                    obj.IsSelectable = false;
                    obj.IsLastLevel = true;
                    obj.data = [];
                    obj.className = a.DisplayName.replace(/[ ]/gi, '').replace(/[,]/gi, '').replace(/[/]/gi, '').replace(/[']/gi, '').replace(/[(]/gi, '').replace(/[)]/gi, '').replace(/[&]/gi, '').replace(/[%]/gi, '').replace(/[.]/gi, '').toLowerCase();
                    obj.value = value;
                    menusList.data.push(obj);
                })
            }
            else if (menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM-MANUFACTURER") {

                let tempData = [];
                let countryIds = $scope.returnCountryIds();

                let selectedOpportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data, []).select("DisplayName").distinct().join(', ');
                let appendText = "";
                if (selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data[0].DisplayName.indexOf("Custom") > -1)
                    appendText = "CUSTOM ";
                if (parentList[0].DisplayName == "ADDITIONAL FILTERS") {
                    appendText = parentList[1].DisplayName.split(' ')[0].toUpperCase();
                    appendText = appendText == "SURVEY" ? "" : "CUSTOM ";
                }
                tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "CATEGORY/ITEM-MANUFACTURER" })[0].data.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + selectedOpportunity.toUpperCase() && (e.CountryID == 0 || countryIds.indexOf(e.CountryID) > -1) }), countryIds, menusList, parentList));
                if (countryIds.length > 1)
                    tempData = $scope.filterDups(menusList.data, countryIds.length);
                tempData = tempData.filter(function (e) { return e.DisplayName == "Custom Group" }).concat(tempData.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + selectedOpportunity.toUpperCase() })[0].data);
                tempData.filter(function (e) { return e.isSingle = true });
                //   tempData = tempData.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + selectedOpportunity.toUpperCase() })[0].data;

                /*remove this when uncommenting the below code*/
                if (selectedOpportunity.indexOf("Item") > -1) {
                    angular.forEach(tempData.filter(function (e) { return e.DisplayName != "Custom Group" }), function (a, b) {
                        a.data = a.data.filter(function (val) { return val.data.length > 0 });
                    });
                }
                /*remove this when uncommenting the below code*/

                //angular.forEach(tempData, function (a, b) {
                //    if (a.DisplayName.indexOf("Select All") == -1) {
                //        /*add select all*/
                //        let obj = {};
                //        obj.IsSelectable = true;
                //        obj.IsLastLevel = true;
                //        obj.AttributeId = 0,
                //        obj.AttributetypeId = 21,
                //        obj.CountryID = 0,
                //        obj.DisplayName = "Select All",
                //        obj.Filter = parentList[0].DisplayName,
                //        obj.FilterLevel = null,
                //        obj.MetricName = "Select All",
                //        obj.SortID = 0,
                //        obj.data = [],
                //        obj.isDefaultLevel = false,
                //        obj.isSingle = false;
                //        if (selectedOpportunity.indexOf("Category") > -1) {
                //            if (a.data.filter(function (e) { return e.DisplayName == "Select All" }).length == 0 && a.data.length > 0) {
                //                obj.FilterID = a.FilterID;
                //                obj.MetricParentName = a.DisplayName;
                //                a.data.unshift(angular.copy(obj));
                //            }
                //        }
                //        else {
                //            a.data = a.data.filter(function (val) { return val.data.length > 0 });
                //            angular.forEach(a.data.filter(function (val) { return val.DisplayName.indexOf("Select All") == -1 }), function (val1, ind1) {
                //                if (val1.data.length > 0 && val1.data.filter(function (e) { return e.DisplayName == "Select All" }).length == 0) {
                //                    obj.MetricParentName = val1.DisplayName;
                //                    obj.ParentId = val1.FilterID;
                //                    val1.data.unshift(angular.copy(obj));
                //                }
                //            })
                //        }
                //    }
                //})
                tempData = tempData.filter(function (e) { return e.data.length > 0 || e.DisplayName.toUpperCase() == "CUSTOM GROUP" });
                menusList.data = angular.copy(tempData);
                if (selectedOpportunity == "Item-Manufacturer") {
                    angular.forEach(menusList.data, function (a, b) {
                        a.isSingle = true;
                        if (a.DisplayName != "Custom Group")
                            a.data.filter(function (e) { return e.isSingle = true });
                    })
                }
                else if (selectedOpportunity == "Category-Manufacturer") {
                    menusList.data.filter(function (e) { return e.isSingle = true });
                }
            }
            else if (LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase() }).length > 0) {
                let tempData = angular.copy(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == menusList.DisplayName.toUpperCase() })[0].data);
                if (menusList.DisplayName.toUpperCase() != "MARKETS" && menusList.DisplayName.toUpperCase() != "FIND OPPORTUNITY FOR") {
                    let countryIds = $scope.returnCountryIds();
                    tempData = $scope.modifyMarketDependency(tempData, countryIds, menusList, parentList);
                    if (countryIds.length > 1)
                        tempData = $scope.filterDups(tempData, countryIds.length);
                }

                menusList.data = tempData;
            }

            if (menusList.data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }).length == 0) {
                show_popup("Alert", customMessages.NoCommonMetric);
                return false;
            }

            if (menusList.DisplayName != "CATEGORY/ITEM-MANUFACTURER" && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "CHANNEL/RETAILER" && menusList.DisplayName != "BENCHMARK") {
                if (menusList.DisplayName == "MARKETS" || menusList.DisplayName == "FIND OPPORTUNITY FOR")
                    applyToChild(menusList, ["isSingle"], true)
                else if (menusList.DisplayName != "Custom Filters")
                    applyToChild(menusList, ["isSingle"], false)
            }

            if (menusList.DisplayName == "CATEGORY/ITEM/BRAND") {
                let selectedOpportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data, []).select("DisplayName").distinct().join(', ');
                if (selectedOpportunity.indexOf("Category") == -1 && selectedOpportunity != "Category-Manufacturer")
                    menusList.data.filter(function (e) { return e.isSingle = true; });
            }



            if (menusList.DisplayName == "FIND OPPORTUNITY FOR") {
                let marketSelected = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" })[0].Data, []).select("DisplayName").distinct().join(', ');
                if (selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }).length > 0 && marketSelected == "Canada")
                    menusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == "CUSTOM CHANNEL/RETAILER" })[0].isDisabled = true;
                if (selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }).length > 0 && marketSelected == "Australia")
                    menusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == "RETAILER NETS" })[0].isDisabled = true;

            }

            $scope.validationForAustraliaandGroup(parentList, menusList);

            return true;
        }

        //function to bind static first level
        function bindStaticList(parent) {
            var temp = [], list = [];
            if (parent == "ADDITIONAL FILTERS")
                list = ["Category", "Custom Category", "Item", "Custom Item", "Brand", "Custom Brand", "5Ws", "Demographics", "Custom Filters"];
            for (i = 0; i < list.length; i++) {
                let isDisabled = false;
                var obj = {};
                obj.AttributeId = i + 1;
                obj.AttributetypeId = i + 1;
                obj.CountryID = 0;
                obj.DisplayName = list[i];
                obj.Filter = parent;
                obj.FilterID = i + 1;
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
            else if (menusList.DisplayName != "TIME PERIOD" && !$scope.multiTimePeriodValidation(undefined, menusList.DisplayName)) {
                show_popup("Alert", customMessages.ConsecutiveTimePeriodSelection);
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "MARKETS" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "BENCHMARK") {
                show_popup("Alert", customMessages.MarketSelection)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "FIND OPPORTUNITY FOR" && menusList.DisplayName != "BENCHMARK") {
                show_popup("Alert", customMessages.FindOpportunitySelection)
                return false;
            }
            else if (menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "FIND OPPORTUNITY FOR" && menusList.DisplayName != "BENCHMARK" && menusList.DisplayName != "CHANNEL/RETAILER" && menusList.DisplayName != "CATEGORY/ITEM/BRAND" && menusList.DisplayName != "CATEGORY/ITEM-MANUFACTURER") {
                let selectedOpportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data, []).select("DisplayName").distinct().join(', ');
                if (selectedOpportunity == "Channel" || selectedOpportunity == "Retailer" || selectedOpportunity == "Retailer Nets") {
                    if (!selectedItems.some(function (e) { return e.DisplayName == "CHANNEL/RETAILER" })) {
                        show_popup("Alert", customMessages.ChannelRetailerSelection)
                        return false;
                    }
                }
                else if ((selectedOpportunity.indexOf("Category") > -1 || selectedOpportunity.indexOf("Item") > -1 || selectedOpportunity.indexOf("Brand") > -1) && selectedOpportunity.indexOf("Manufacturer") == -1) {
                    if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })) {
                        show_popup("Alert", customMessages.CategorySelection)
                        return false;
                    }
                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM-MANUFACTURER" })) {
                    show_popup("Alert", customMessages.CategoryItemManufacturerSelection);
                    return false;
                }
            }
            return true;
        }

        //function to enable or disable necessary tabs
        function enableDisableTabs(menusList, parentList, scope) {
            if (menusList.isDefaultLevel) {
                if (!requiredValidations(menusList, parentList))
                    return false;
            }
            let selectedOpportunity = "";
            if (selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" }).length > 0) {
                selectedOpportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data, []).select("DisplayName").distinct().join(', ');
                scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM-MANUFACTURER" })[0].isDisabled = true;
                scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].isDisabled = true;
                scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CHANNEL/RETAILER" })[0].isDisabled = true;
                if ((selectedOpportunity.indexOf("Category") > -1 || selectedOpportunity.indexOf("Item") > -1 || selectedOpportunity.indexOf("Brand") > -1) && selectedOpportunity.indexOf("Manufacturer") == -1)
                    scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].isDisabled = false;
                else if (selectedOpportunity == "Category-Manufacturer" || selectedOpportunity == "Item-Manufacturer")
                    scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM-MANUFACTURER" })[0].isDisabled = false;
                else if (selectedOpportunity == "Channel" || selectedOpportunity == "Retailer" || selectedOpportunity == "Retailer Nets")
                    scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CHANNEL/RETAILER" })[0].isDisabled = false;
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

            if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND" || parentList[0].DisplayName == "CATEGORY/ITEM-MANUFACTURER" || parentList[0].DisplayName == "CHANNEL/RETAILER") {
                let count = 0;
                if (selectedItems.filter(function (e) { return e.DisplayName == parentList[0].DisplayName }).length > 0)
                    count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == parentList[0].DisplayName })[0].Data, []).length;
                if (menusList.DisplayName.indexOf("Select All") > -1 && !menusList.hasChildSelected) {
                    if (parentList[parentList.length - 2].data.filter(function (e) { return e.IsCollapsible }).length > 0)
                        count += parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected && e.ParentId == menusList.ParentId }).length - 1;
                    else
                        count += parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected }).length - 1;
                }
                if (count >= 15 && !menusList.hasChildSelected) {
                    show_popup("ALERT", "User can select  max. of 15 selections at a time.");
                    return false;
                }
            }


            //Select All functionality start
            $scope.clickOnSelectAll(menusList, parentList);
            //Select All functionality end

            if (menusList.isDefaultLevel) {
                if (!requiredValidations(menusList, parentList))
                    return false;
            }

            if (menusList.DisplayName == "Custom Filters" && !menusList.data.some(function (e) { return e.hasChildSelected }))
                menusList.data = [];
            if (menusList.data.length == 0 && !menusList.IsLastLevel) {
                let status = $scope.bindingLeftPanelDynamically(menusList, parentList);
                if (!status)
                    return false;
                $scope.UlHeight = angular.element(".left-panel-load.firstleftPanel").css("height");

                /*temporarily disable metrics from left panel start*/
                //if (parentList[0].DisplayName == "MARKETS") {
                //    menusList.data.filter(function (e) { return e.DisplayName == "Latin America" })[0].data.filter(function (e) { return e.DisplayName == "Mexico" })[0].isDisabled = true;
                //}
                /*temporarily disable metrics from left panel end*/
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
                    if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND" && menusList.ParentId != a.FilterID) {
                        a.hasChildSelected = false;
                        a.hasSubMenusActive = false;
                        a.isTabSelected = false;
                        childList.filter(function (e) { return e.hasChildSelected = false; });
                        childList.filter(function (e) { return e.hasSubMenusActive = false; });
                        childList.filter(function (e) { return e.isTabSelected = false; });
                    }
                })

            }
            /*handling vertical selection on click of brands/cust. vs non cust. end*/

            /*mutually exclusive is selectable at consecutive levels start*/
            let condition = !menusList.isDefaultLevel && (parentList[0].DisplayName == "MARKETS" || parentList[0].DisplayName == "5Ws" || parentList[1].DisplayName == "5Ws" || parentList[0].DisplayName == "CATEGORY/ITEM/BRAND" || parentList[1].DisplayName == "Category/Item/Brand");
            $scope.mutuallyExclusiveConsecutiveLevels(menusList, parentList, condition, prevHasChildSelected);
            //angular.forEach(catList, function (a, b) {
            //    if (parentList.length > 2 && parentList[1].DisplayName.indexOf(a) > -1 && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
            //        $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, a);
            //    }
            //})

            if (parentList.length > 2 && parentList[1].DisplayName.indexOf("Category/Item/Brand") > -1 && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, "Category/Item/Brand");
            }
            /*mutually exclusive is selectable at consecutive levels end*/

            /*clear category/brand/item*/

            if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && parentList[1] != undefined && (parentList[1].DisplayName.indexOf("Category/Item/Brand") > -1) && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {

                let index = 1;
                if (parentList[2].DisplayName == "Category") {
                    parentList[index].data[1].data = [];
                    parentList[index].data[1].hasChildSelected = false;
                    parentList[index].data[1].hasSubMenusActive = false;
                    parentList[index].data[1].isTabSelected = false;

                    if (parentList[index].data.length > 2) {
                        parentList[index].data[2].data = [];
                        parentList[index].data[2].hasChildSelected = false;
                        parentList[index].data[2].hasSubMenusActive = false;
                        parentList[index].data[2].isTabSelected = false;
                    }
                }
                else if (parentList[2].DisplayName == "Item") {
                    if (parentList[index].data.length > 2) {
                        parentList[index].data[2].data = [];
                        parentList[index].data[2].hasChildSelected = false;
                        parentList[index].data[2].hasSubMenusActive = false;
                        parentList[index].data[2].isTabSelected = false;
                    }
                }

            }

            /*clear category/brand/item*/




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
            enableDisableTabs(menusList, parentList, $scope);
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
            if (menusList.DisplayName == "Custom Filters" && !menusList.data.some(function (e) { return e.hasChildSelected }))
                menusList.data = [];
            if (menusList.data.length == 0 && !menusList.IsLastLevel) {
                let status = $scope.bindingLeftPanelDynamically(menusList, parentList);
                if (!status)
                    return false;
                $scope.UlHeight = angular.element(".left-panel-load.firstleftPanel").css("height");

                /*temporarily disable metrics from left panel start*/

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
            //if (parentList[0].DisplayName.toUpperCase() == '5WS' || parentList[1].DisplayName.toUpperCase() == '5WS')
            //    $scope.hasSelectAll(menusList, parentList);

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
            angular.element(document.getElementsByClassName("save_filter_icon")).addClass("disableSelection");
            angular.element("body > .nicescroll-rails").remove();
            angular.element(document.querySelectorAll(".header-center")).html('');
            let scope = angular.element('.view-container').scope();

            showBackgroundShadow(true, true);
            if (!$scope.leftMenuIsHidden) {
                $scope.leftPanelToggle();
            }

            if (!$scope.ModuleIsHidden)
                $scope.ModulePanelToggle();

            if ($scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "RETAIL SALES VALUE" })[0].data.length == 0) {
                $scope.bindingLeftPanelDynamically($scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "RETAIL SALES VALUE" })[0], $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "RETAIL SALES VALUE" }));
            }
            $timeout(function () {
                var List = $scope.LeftStaticMenu.where(function (e) { return e.hasChild });
                List.where(function (e) { return e.hasSubMenusActive = false });
                List.where(function (e) { return e.isTabSelected = false });
                angular.forEach(List, function (a, b) {
                    applyToChild(a, ["isTabSelected"], false);
                })
                if (!onSubmitValidations())
                    return false;

                responseData = [];
                OSPRequest = $scope.returnRequestObject();

                addtnlText = "";
                let filters = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.select("DisplayName");
                if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "Demographics" }).length > 0 && filters.length == 1)
                    addtnlText = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "Demographics" })[0].Data, []).select("DisplayName").distinct().join(', ');
                else if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "Custom Filters" }).length > 0) {
                    let masterList = $scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].data.filter(function (e) { return e.DisplayName != "Demographics" }).select("DisplayName");
                    let custName = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "Custom Filters" })[0].Data[0].DisplayName;
                    let append = CustomFilterMaster.filter(function (e) { return e.Name == custName })[0].SelectionSummary;
                    let condition = true;
                    for (var i = 0; i < masterList.length; i++) {
                        if (append.indexOf(masterList[i] + ": ") > -1) {
                            condition = false;
                            break;
                        }
                    }
                    if (condition)
                        addtnlText = custName;
                }
                if (addtnlText != "")
                    addtnlText = " (" + addtnlText + ")";

                if (OSPRequest.OppurtunityFor == "1" || OSPRequest.OppurtunityFor == "2" || OSPRequest.OppurtunityFor == "6" || OSPRequest.OppurtunityFor == "14") {
                    scope.isShareCategory = false;
                    angular.element(document.querySelectorAll('.output-container .headerOptions')).css({ 'width': "22%", "margin-right": "2%" });
                    angular.element(document.querySelectorAll('.output-container .optionValue')).css('width', "48%");
                    angular.element(document.querySelectorAll('.strengthenCore')).css('margin-left', "36%");
                    angular.element(document.querySelectorAll('.share')).hide();
                    angular.element(document.querySelectorAll('.deprioritize')).hide();
                }
                else {
                    scope.isShareCategory = true;
                    if (OSPRequest.OppurtunityFor == "7" || OSPRequest.OppurtunityFor == "8") {
                        angular.element(document.querySelectorAll('.shareIcon')).addClass('channel').removeClass('category');
                        scope.shareName = "CHANNEL";
                    }
                    else {
                        angular.element(document.querySelectorAll('.shareIcon')).addClass('category').removeClass('channel');
                        scope.shareName = "CATEGORY";
                    }

                    angular.element(document.querySelectorAll('.output-container .headerOptions')).css({ 'width': "38%", "margin-right": "0%" });
                    angular.element(document.querySelectorAll('.output-container .optionValue')).css('width', "28%");
                    angular.element(document.querySelectorAll('.output-container .shareCategory')).css('width', "32%");
                    angular.element(document.querySelectorAll('.strengthenCore')).css('margin-left', "0%");
                    angular.element(document.querySelectorAll('.share')).show();
                    angular.element(document.querySelectorAll('.deprioritize')).show();
                }
                $.ajax({
                    type: callsType.Post,
                    url: services.GetOSPData,
                    async: true,
                    data: JSON.stringify(OSPRequest),
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
                            if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "Custom Filters" }).length == 0)
                                angular.element(document.getElementsByClassName("save_filter_icon")).removeClass("disableSelection");

                            angular.element(document.getElementsByClassName("excelDiv")).removeClass("disableSelection");
                            angular.element(document.getElementsByClassName("pptDiv")).removeClass("disableSelection");
                            angular.element(document.querySelectorAll(".drilldown-container")).hide();
                            if (addtnlText != "")
                                responseData.filter(function (e) { return e.SelectedAttribute += addtnlText })
                            else if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0)
                                responseData.filter(function (e) { return e.SelectedAttribute.toUpperCase() != "TOTAL ALL CATEGORIES" }).filter(function (e) { return e.SelectedAttribute += " (Filtered)" })
                            maxLevel = responseData.select("Level").distinct().sort(function (a, b) { return b - a })[0];
                            angular.element(".retailIconImage,.retailText").removeClass("disableSelection");
                            if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 || OSPRequest.RespType != "1,2,3")
                                angular.element(".retailIconImage,.retailText").addClass("disableSelection");
                            if ($('.retailIconImage').hasClass('active')) {
                                if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 || OSPRequest.RespType != "1,2,3")
                                    scope.selectHeaderOption(2);
                                else
                                    scope.selectHeaderOption(1);
                            }
                            else if ($('.shareCategoryText').hasClass('active') && scope.isShareCategory) {
                                scope.selectHeaderOption(3);
                            }
                            else {

                                scope.selectHeaderOption(2);//default tab set to distribution
                            }

                            showBackgroundShadow(false, false);
                        }
                        else {
                            angular.element(document.getElementsByClassName("excelDiv")).addClass("disableSelection");
                            angular.element(document.getElementsByClassName("pptDiv")).addClass("disableSelection");
                            angular.element(document.getElementsByClassName("save_filter_icon")).addClass("disableSelection");
                            show_popup("ALERT", customMessages.DataNotAvailable);
                        }
                    },
                    error: function (err, xhr, msg) {
                        showBackgroundShadow(true, true);
                    }
                });
            })
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
            else if (!selectedItems.some(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })) {
                show_popup("Alert", customMessages.FindOpportunitySelection)
                return false;
            }
            else {
                let selectedOpportunity = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" })[0].Data, []).select("DisplayName").distinct().join(', ');
                if (selectedOpportunity == "Channel" || selectedOpportunity == "Retailer" || selectedOpportunity == "Retailer Nets") {
                    if (!selectedItems.some(function (e) { return e.DisplayName == "CHANNEL/RETAILER" })) {
                        show_popup("Alert", customMessages.ChannelRetailerSelection)
                        return false;
                    }
                }
                else if ((selectedOpportunity.indexOf("Category") > -1 || selectedOpportunity.indexOf("Item") > -1 || selectedOpportunity.indexOf("Brand") > -1) && selectedOpportunity.indexOf("Manufacturer") == -1) {
                    if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })) {
                        show_popup("Alert", customMessages.CategorySelection)
                        return false;
                    }
                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM-MANUFACTURER" })) {
                    show_popup("Alert", customMessages.CategoryItemManufacturerSelection);
                    return false;
                }
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
            else if (parentList[0].DisplayName == "FIND OPPORTUNITY FOR" && menusList.DisplayName != "FIND OPPORTUNITY FOR")
                List = ["TIME PERIOD", "MARKETS", "FIND OPPORTUNITY FOR", "BENCHMARK"];
            else if (parentList[0].DisplayName == "CHANNEL/RETAILER" && menusList.DisplayName != "CHANNEL/RETAILER")
                List = ["TIME PERIOD", "MARKETS", "FIND OPPORTUNITY FOR", "BENCHMARK", "CHANNEL/RETAILER"];
            else if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND" && menusList.DisplayName != "CATEGORY/ITEM/BRAND")
                List = ["TIME PERIOD", "MARKETS", "FIND OPPORTUNITY FOR", "BENCHMARK", "CATEGORY/ITEM/BRAND"];
            else if (parentList[0].DisplayName == "CATEGORY/ITEM-MANUFACTURER" && menusList.DisplayName != "CATEGORY/ITEM-MANUFACTURER")
                List = ["TIME PERIOD", "MARKETS", "FIND OPPORTUNITY FOR", "BENCHMARK", "CATEGORY/ITEM-MANUFACTURER"];
            return List;
        }



        $scope.hasSearch = function (menusList, parent_list) {

            var searchList = searchSelectAllList.filter(function (e) { return e.Search }).select("DisplayName").distinct().concat(["CHANNEL/RETAILER", "CATEGORY/ITEM/BRAND", "CATEGORY/ITEM-MANUFACTURER"]);
            if (searchList.indexOf(menusList.DisplayName) > -1 && !(menusList.DisplayName == "5Ws" && menusList.isDefaultLevel))
                return true;
            return false;
        }

        // creating the request Obj for output start
        $scope.returnRequestObject = function () {
            var request = {};
            var respObj = getRespType();
            request.TimePeriod = "";
            request.Market = "";
            request.OppurtunityFor = "";
            request.FilterIDs = "";
            request.RespType = "";
            request.RetailSalesValue = "";
            request.AdditionalFilter = "";
            request.Benchmark = "";

            request.RespType = respObj.respId;
            let index = $(".summay-content-text .middleAlign").html().indexOf(" || <span>RESPONDENT TYPE");
            let inhtml = $(".summay-content-text .middleAlign").html();
            if (index > -1) {
                inhtml = inhtml.substring(0, index);
            }
            $(".summay-content-text .middleAlign").html(inhtml + " || <span>RESPONDENT TYPE: </span>" + respObj.respName);
            request.SelectionSummary = $(".summay-content-text").text().trim();

            /*get opportunity start*/
            let opportunityForSelections = selectedItems.filter(function (e) { return e.DisplayName == "FIND OPPORTUNITY FOR" });
            request.OppurtunityFor = $scope.getPKsAndName(opportunityForSelections, []).select("FilterID").join(",");
            let opportunityName = $scope.getPKsAndName(opportunityForSelections, []).select("DisplayName")[0];
            /*get opportunity end*/

            let getRetailSaleValues = "", getTempValues = "";
            let summary = angular.copy(selectedItems);
            let obj = {};
            obj.DisplayName = "RETAIL SALES VALUE";
            obj.Data = [];
            obj.CountryID = undefined;
            obj.hasSubMenusActive = false;
            obj.hasChildSelected = false;
            obj.ParentId = undefined;
            angular.forEach($(".menus_list input.retailLeftContent"), function (a, b) {
                let optionName = $(a).parents("li.left_panel_levels")[0].innerText.trim();
                let data = {};
                if ($(a).val() != "") {
                    data.DisplayName = $(a).val();
                    data.Data = [];
                    data.FilterID = $(a).attr("filterid");
                    data.CountryID = 0;
                    data.hasSubMenusActive = false;
                    data.hasChildSelected = false;
                    data.ParentId = null;
                    data.OptionName = optionName;
                    obj.Data.push(data);
                }
                let enteredValue = ($(a).val() == "" ? -1 : $(a).val());
                getRetailSaleValues += (b == 0 && ["CATEGORY", "CHANNEL", "ITEM", "CUSTOM CATEGORY", "CUSTOM ITEM", "RETAILER NETS"].indexOf(opportunityName.toUpperCase()) == -1 ? 0 : $(a).attr("filterid")) + '|' + enteredValue + ","
                getTempValues += optionName + '|' + enteredValue + ",";
            })
            summary.push(obj);
            request.SelectedItems = JSON.stringify(summary);

            /*get time period selections start*/
            let timeperiodSelections = selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" });
            request.TimePeriod = $scope.getPKsAndName(timeperiodSelections, []).select("FilterID").join(",");
            /*get time period selections end*/

            /*get market selections start*/
            let marketSelections = selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" });
            selectedMarket = $scope.getPKsAndName(marketSelections, []);
            if (marketSelections[0].Data[0].DisplayName != "Select All Markets")
                request.Market = selectedMarket.select("FilterID").join(",");
            else
                request.Market = MarketRegionList.select("FilterID").join(',');
            /*get market selections end*/

            /* get selected opportunity start*/
            let opportunitySelections = selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" || e.DisplayName == "CHANNEL/RETAILER" || e.DisplayName == "CATEGORY/ITEM-MANUFACTURER" });
            //request.FilterIDs = $scope.getPKsAndName(opportunitySelections, []).select("FilterID").join(",");
            /* get selected opportunity end*/

            /* get retail sales value start*/
            request.RetailSalesValue = getTempValues.substring(0, getTempValues.length - 1);
            request.FilterIDs = getRetailSaleValues.substring(0, getRetailSaleValues.length - 1);
            /* get retail sales value end*/

            /*get additional filter selections start*/
            request.AdditionalFilter = $scope.AdditionalFilterRequest().FilterID;
            /*get additional filter selections end*/

            /*get benchmark selections start*/
            if (selectedItems.filter(function (e) { return e.DisplayName == "BENCHMARK" }).length > 0) {
                let benchmarkSelections = selectedItems.filter(function (e) { return e.DisplayName == "BENCHMARK" });
                request.Benchmark = $scope.getPKsAndName(benchmarkSelections, []).select("FilterID").join(",");
            }

            return request;
        }

        function getRespType() {
            /*get respondent type start*/
            var selected = $("#lstRespType option:selected");
            var message = "", respname = "";
            if (angular.element(".leftpanelarea").is(":visible")) {
                $("#lstRespType").multiselect('selectAll', false);
                $("#lstRespType").multiselect('updateButtonText', true);
            } else
                selected.each(function () {
                    message += $(this).val() + ",";
                    respname += $(this).text().trim() + ', '
                });

            return { "respId": (message === "" ? "1,2,3" : message.substring(0, message.length - 1)), "respName": (respname === "" ? "Adult(18 - 70 yrs), Teen(13 - 17 yrs), Kids(4 -12 yrs)" : respname.substring(0, respname.length - 2)) };
            /*get respondent type end*/
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
    angular.element(element).find(".occasionChange:eq(0)").text("Number Indicates : Occasion");
    angular.element(element).find(".occasionChange:eq(2)").text("% (Change PP Vs Benchmark)");
    angular.element(element).find(".occasionChange:eq(1)").remove();
    angular.element(element).find(".columnPerc").remove();
}
//function to align brands and customer/non customer data for selection summary start
function getSummaryTextCustom(internalData, val, flag) {
    name = val;
    distinctVerticalIds = [];
    angular.forEach(internalData.where(function (e) { return e.DisplayName == name })[0].Data, function (a, b) {
        if (a.ParentId != null)
            distinctVerticalIds.push(a.ParentId);
        angular.forEach(a.Data, function (c, d) {
            if (c.ParentId != null)
                distinctVerticalIds.push(c.ParentId);
        })
    })
    var newList = [];
    angular.forEach(distinctVerticalIds.distinct(), function (label, index) {
        obj = {};

        if (flag)
            obj.DisplayName = LeftPanelOriginalData.where(function (e) { return e.DisplayName == "Custom Brand" })[0].data.where(function (e) { return e.FilterID == internalData[0].FilterID })[0].data.where(function (e) { return e.FilterID == label })[0].DisplayName;
        else
            obj.DisplayName = LeftPanelOriginalData.where(function (e) { return e.DisplayName == "Brand" })[0].data.where(function (e) { return e.FilterID == internalData[0].FilterID })[0].data.where(function (e) { return e.FilterID == label })[0].DisplayName;
        obj.Data = internalData.where(function (e) { return e.DisplayName == name })[0].Data.where(function (e) { return e.ParentId == label });
        obj.isBold = true;
        newList.push(obj);
    })
    return newList;
}
//function to align brands and customer/non customer data for selection summary end

//function to set property at all levels
//function applyToChild(menusList, item, newVal, parentValue) {
//    if (menusList.data.length > 0) {
//        angular.forEach(menusList.data.filter(function (e) { return !e.isDisabled }), function (value, index) {
//            if (value[item] || parentValue != undefined) {
//                if (value.data.length > 0)
//                    applyToChild(value, item, newVal, parentValue);
//                value[item] = newVal;
//                if (parentValue == "removeIfNotSelected" && (value.hasChildSelected || value.data.some(function (e) { return e.hasChildSelected }))) { //@vj
//                    value[item] = true;
//                }
//            }
//            else {
//                value[item] = newVal;
//                if (value.data.length > 0)
//                    applyToChild(value, item, newVal, parentValue);
//            }
//        })
//    }
//}

function CreateGrid(type, element) {
    let gridHtml = "";
    TotalSampleSize = [];
    let shadowDiv = '<div class="columnShadow"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>';
    let data = responseData;
    let distinctColumnHeaders = data.filter(function (e) { return e.Occasion.toUpperCase().indexOf("TOTAL") == -1 }).select("Occasion").distinct();
    let distinctRowHeaders = data.select("SelectedAttribute").distinct();
    //  let distinctNestingHeaders = data.filter(function (e) { return e.NestingMetricName != "" }).select("NestingMetricName").distinct();
    let colWidth = ((element.width() / document.documentElement.clientWidth) * 100 - 22) / 5;//6 columns including header column
    if (((distinctColumnHeaders.length + 1) * colWidth) < ((element.width() / document.documentElement.clientWidth) * 100 - 22)) {//if columns less than 6 increase column width to fit screen
        colWidth = ((element.width() / document.documentElement.clientWidth) * 100 - 22) / (distinctColumnHeaders.length + 1);
    }
    let addBaseClass = "";
    let retailHeader = "";
    //if (type != "Distribution" && type!="Retail")
    //    addBaseClass = "base";
    if (type == "Retail")
        retailHeader = "(VALUE IN MILLIONS)";
    gridHtml += '<div class="crosstabTableDiv">' +
        '<div id="crosstabTableContent" class="crosstabTable">' +
        /*left header start*/
        '<div class="leftHeader ' + addBaseClass + '" style="width:' + (22 + colWidth) + 'vw"><div class="row-item">' +
        '<div class="row-item-div row-item-head-div"  style="width:22vw">' + shadowDiv + '<div class="row-item-head-content">' + retailHeader + '</div></div>' +
        '<div class="row-item-div row-item-head-div"  style="width:' + colWidth + 'vw">' + shadowDiv +
        '<div class="row-item-head-content">TOTAL</div><div class="headerBorder"></div>' +
        '</div>' +
        '</div>';

    gridHtml += '</div>' /*left header left*/ +
        /*right header start*/
        '<div class="rightHeader ' + addBaseClass + '" style="width:calc(100% - ' + (22 + colWidth) + 'vw)">' +
        '<div class="row-item" style="width:' + (distinctColumnHeaders.length * colWidth) + 'vw">';
    angular.forEach(distinctColumnHeaders, function (a, b) {
        gridHtml += '<div class="row-item-div row-item-head-div" title="' + a + '" style="width:' + colWidth + 'vw">'
        if (b != distinctColumnHeaders.length - 1)
            gridHtml += shadowDiv;
        gridHtml += '<div class="row-item-head-content">' + a + '</div><div class="headerBorder"></div></div>';
    })

    gridHtml += '</div>';
    gridHtml += '</div>'
    /*right header end*/

    /*left body start*/
    gridHtml += '<div class="leftBody ' + addBaseClass + '" style="width:' + (22 + colWidth) + 'vw">';


    angular.forEach(distinctRowHeaders, function (a, b) {

        let row = data.filter(function (e) { return e.Occasion.toUpperCase().indexOf("TOTAL") > -1 && e.SelectedAttribute == a })[0];
        if (type == "Share" && row.Level != 3)
            return;
        let levelClass = '';
        let appnText = ''
        if (row.Level == 3)
            levelClass = 'level3';

        //if (!(type == "Retail" && a.toUpperCase() == "TOTAL")) {
        gridHtml += '<div class="row-item" style="width:100%">' +
            '<div class="row-item-div" title="' + a + '" style="width:22vw">' + shadowDiv +
            '<div class="row-right-item-container">' +
            '<div class="row-right-item-content ' + levelClass + '"><div class="leftBorder"></div>' + a + '</div>' +
            '</div>' +
            '</div>';
        let obj = {};

        obj = returnCellValues(row, obj, type);
        TotalSampleSize.push(row.USampleSize);
        gridHtml += '<div class="row-item-div"  style="width:' + colWidth + 'vw">' + shadowDiv +
            '<div class="row-right-item-container">' +
            '<div class="row-right-item-content">' +
            '<div class="row-item-value row-value"><span class="percentageValue"  style="color:' + obj.colorClass + '">' + obj.value + '</span>'
        //if (type == "Distribution" && obj.change != "") {
        //    gridHtml += '<span class="separator">|</span><span class="changeValue">' + obj.change.toFixed(1) + '</span>';
        //}
        gridHtml += '</div></div></div></div></div>';
        //  }



    })

    gridHtml += '</div>';

    /*left body end*/

    /*right body start*/
    gridHtml += '<div class="rightBody ' + addBaseClass + '" onscroll="reposVertical(this);" onwheel="reposVertical(this);" tabindex="0" style="overflow: hidden; outline: none;width:calc(100% - ' + (22 + colWidth) + 'vw)">';
    angular.forEach(distinctRowHeaders, function (a, b) {
        let row = data.filter(function (e) { return e.SelectedAttribute == a })[0];
        if (type == "Share" && row.Level != 3)
            return;
        gridHtml += '<div class="row-item" style="width:' + (distinctColumnHeaders.length * colWidth) + 'vw">'
        angular.forEach(distinctColumnHeaders, function (c, d) {
            let obj = {};
            let row = data.filter(function (e) { return e.Occasion == c && e.SelectedAttribute == a })[0];

            if (type == "Share")
                obj = returnCellValues(row, obj, type, b - 2);
            else
                obj = returnCellValues(row, obj, type, b);



            let cellObj = {};
            cellObj.colName = row.Occasion;
            cellObj.rowName = row.SelectedAttribute;
            cellObj.legendName = obj.LegendName;
            cellObj.legendColor = obj.columnColor;
            if (type == "Distribution" || type == "Retail" || type == "Share")

                gridHtml += '<div class="row-item-div"  style="width:' + colWidth + 'vw;border-left:' + obj.columnColor + ';background: repeating-linear-gradient(45deg,' + obj.hexColor + ' 0.15vw, transparent 0.44vw);cursor:' + obj.cursor + ';pointer-events:' + obj.pointerEvent + '" onclick= "selectCell(\'' + row.RowAttribute + '\',' + row.ColumnAttribute + ',\'' + escape(JSON.stringify(cellObj)) + '\')">';
            else
                gridHtml += '<div class="row-item-div"  style="width:' + colWidth + 'vw">';
            if (d != distinctColumnHeaders.length - 1)
                gridHtml += shadowDiv;
            gridHtml += '<div class="row-right-item-container">' +
                '<div class="row-right-item-content">' +
                '<div class="row-item-value row-value"><span class="percentageValue" style="color:' + obj.colorClass + '">' + obj.value + '</span>'
            if ((type == "Distribution" || type == "Share") && obj.change != "") {
                gridHtml += '<span class="separator" style="float: none;box-shadow:none;">|</span><span class="changeValue">' + obj.change + '</span>';
            }
            gridHtml += '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        })

        gridHtml += '</div>';

        //}

    })
    gridHtml += '</div>';
    /*right body end*/

    gridHtml += '</div>'
    gridHtml += '</div>'

    element.html(gridHtml);
    angular.element(".samplesize-popup .nicescroll-rails").remove();
    if (angular.element(document.getElementsByClassName("nsample-size_selected")).length == 0)
        angular.element("body > .nicescroll-rails").remove();
    let element1 = element.find(".crosstabTableDiv > #crosstabTableContent > .rightBody");
    SetScroll(element1, "#D31245", 0, 0, 0, 0, 3, true);
    angular.element(element1).scrollTop(0);
    angular.element(element1).scrollLeft(0);
    if (type == "Share") {
        angular.element(document.querySelectorAll('.leftBody .row-item .row-item-div:first-child .row-right-item-content.level3')).addClass("shareTab");
        angular.element(document.querySelectorAll('.leftBody .row-item .row-item-div:first-child .row-right-item-content.level3')).css({ 'margin-left': "0.73vw", 'width': "calc(100% - 1.47vw)", 'font-size': "1vw" });
    }
    else {
        angular.element(document.querySelectorAll('.leftBody .row-item .row-item-div:first-child .row-right-item-content.level3')).css({ 'margin-left': "2.3vw", 'width': "calc(100% - 3.4vw)", 'font-size': "0.9vw" });
    }
}

function CreateInnerGrid(type, element, cellObj) {
    let gridHtml = "";
    let shadowDiv = '<div class="columnShadow" style="opacity:1;"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>';

    let data = innerResponseData.filter(function (e) { return e.GroupName == type });
    let distinctColumnHeaders = data.select("Header").distinct();

    $('.legendOption').html(cellObj.legendName);
    $('.legendOption').css('border-left', cellObj.legendColor);
    $('.colName').html(cellObj.colName);
    $('.rowName').html(cellObj.rowName);

    gridHtml += '<div class="crosstabTableDiv">' +
        '<div id="crosstabTableContent" class="crosstabTable" style="width:96%;margin-left:2%">' +
        /*left header start*/
        '<div class="leftHeader" style="width:78%"><div class="row-item" style="border-bottom:none">' +
        '<div class="row-item-div row-item-head-div"  style="width:66%"></div>' +
        '<div class="row-item-div row-item-head-div"  style="width:34%"><div class="row-item-head-content">TOTAL</div><div class="headerBorder"></div>' +
        '</div>' +
        '</div>';
    gridHtml += '</div>' +

        /*right header start*/
        '<div class="rightHeader" style="width:22%">' +
        '<div class="row-item" style="width:100%;border-bottom:none;">';

    gridHtml += '<div class="row-item-div row-item-head-div" " style="width:100%">'

    gridHtml += '<div class="row-item-head-content">' + cellObj.colName + ' * ' + cellObj.rowName + '</div><div class="headerBorder"></div></div>';


    gridHtml += '</div>';
    gridHtml += '</div>';
    gridHtml += '<div class="drillDownContent">';
    angular.forEach(distinctColumnHeaders, function (a, b) {


        gridHtml += '<div class="parentHeader">' +
            '<div class="headerIconDiv"><div class="headerIcon_' + a.replace(/\s/g, '').replace(/[']/g, '') + ' middleAlign"></div></div>' +
            '<div class="headerText middleAlign">' + a + '</div>' +
            '</div>'
        /*right header end*/
        let headerChild = data.filter(function (e) { return e.Header == a });
        /*left body start*/
        angular.forEach(headerChild, function (c, d) {
            gridHtml += '<div class="leftBody" style="width:78%;height:3.3vw">';

            gridHtml += '<div class="row-item" style="width:100%;height:3.3vw">' +
                '<div class="row-item-div"  style="width:66%;">' + shadowDiv +
                '<div class="row-right-item-container">' +
                '<div class="row-right-item-content"><div class="leftBorder"></div>' + c.Attribute + '</div>' +
                '</div>' +
                '</div>';
            let obj = {};
            let row = data.filter(function (e) { return e.Header == a && e.Attribute == c.Attribute })[0];
            if (a != "Average HH Income")
                obj = formatCellValues(row, 0, type);
            else {
                obj.TotalValue = GetCurrencySymbol(selectedMarket[0].DisplayName) + row.TotalValue.toFixed(2) + "K";
                obj.value = GetCurrencySymbol(selectedMarket[0].DisplayName) + row.Value.toFixed(2) + "K";
                obj.TotalChange = "";
                obj.change = "";
            }


            //    TotalSampleSize.push(obj.value);
            gridHtml += '<div class="row-item-div"  style="width:34%">' + shadowDiv +
                '<div class="row-right-item-container">' +
                '<div class="row-right-item-content">' +
                '<div class="row-item-value row-value"><span class="percentageValue"  style="color:' + obj.TotalColorClass + '">' + obj.TotalValue + '</span>'
            if (obj.TotalChange != "")
                gridHtml += '<span class="separator" style="float: none;box-shadow:none;">|</span><span class="changeValue">' + obj.TotalChange + '</span>';

            gridHtml += '</div></div></div></div></div>';

            gridHtml += '</div>';
            /*left body end*/

            /*right body start*/
            gridHtml += '<div class="rightBody" tabindex="0" style="overflow: hidden; outline: none;width:22%;height:3.3vw">';

            gridHtml += '<div class="row-item" style="width:99%;height:3.3vw">'

            gridHtml += '<div class="row-item-div"  style="width:100%">';

            gridHtml += '<div class="row-right-item-container">' +
                '<div class="row-right-item-content">' +
                '<div class="row-item-value row-value"><span class="percentageValue" style="color:' + obj.colorClass + '">' + obj.value + '</span>';
            if (obj.change != "")
                gridHtml += '<span class="separator" style="float: none;box-shadow:none;">|</span><span class="changeValue">' + obj.change + '</span>';

            gridHtml += '</div>' +
                '</div>' +
                '</div>' +
                '</div>';


            gridHtml += '</div>';


            gridHtml += '</div>';
            /*right body end*/
        })

    })

    gridHtml += '</div></div>'
    gridHtml += '</div>'
    element.html(gridHtml);
    SetScroll($('.drillDownContent'), "#D31245", 0, 0, 0, 0, 3, false);
}

//function returnValues(row, obj, type, index) {
//    obj.value = "NA";
//    obj.colorClass = "";
//    obj.TotalColorClass = "";
//    obj.change = "";
//    obj.TotalChange = "";
//    obj.TotalValue = "";
//    if (row.USampleSize == null)
//        obj.value = "NA";
//    else if (row.UNumerator < 30)
//        obj.value = "LS";
//    else {
//        if (row.UNumerator >= 30 && row.UNumerator <= 50)
//            obj.colorClass = 'grey';
//        if (row.Header.toUpperCase() == "AVERAGE ITEMS PER OCCASION") {
//            obj.value = (row.Value).toFixed(2);
//        }
//        else {
//            obj.value = (row.Value * 100).toFixed(2) + "%";
//        }
//    }
//    if (row.UTotalSampleSize == null) {
//        obj.TotalValue = "NA";
//    }
//    else if (row.UTotalNumerator < 30) {
//        obj.TotalValue = "LS";
//    }
//    else {
//        if (row.UTotalNumerator >= 30 && row.UTotalNumerator <= 50)
//            obj.TotalColorClass = 'grey';
//        if (row.Header.toUpperCase() == "AVERAGE ITEMS PER OCCASION") {
//            obj.TotalValue = (row.TotalValue).toFixed(2);
//        }
//        else {
//            obj.TotalValue = (row.TotalValue * 100).toFixed(2) + "%";
//        }
//    }
//    if (obj.value != 'NA' && obj.value != "LS" && row.Significance != null && obj.colorClass != 'grey') {
//        if (row.Significance > 0)
//            obj.colorClass = 'green';
//        else if (row.Significance < 0)
//            obj.colorClass = 'red';
//    }
//    //  if (type == "Distribution" || type == "Retail") {
//    if (obj.value != 'NA' && obj.value != "LS" && row.Change != null) {
//        if (row.USampleSize != "") {
//            //    obj.change = row.Change.toFixed(2);
//            obj.change = row.Change >= 0 ? '+' + row.Change.toFixed(2) : row.Change.toFixed(2);
//        }
//    }
//    if (obj.TotalValue != 'NA' && obj.TotalValue != "LS" && row.TotalChange != null) {
//        if (row.UTotalSampleSize != "") {
//            //   obj.TotalChange = row.TotalChange.toFixed(2);
//            obj.TotalChange = row.TotalChange >= 0 ? '+' + row.TotalChange.toFixed(2) : row.TotalChange.toFixed(2);
//        }
//    }
//    //  }
//    //if (obj.value == 'NA' || obj.value == "LS")
//    //{
//    //    obj.hexColor = "";
//    //    obj.columnColor = "";
//    //}
//    return obj;
//}

function getTotalValues(row, obj) {
    obj.TotalColorClass = "black";
    obj.TotalValue = "";
    obj.TotalChange = "";
    if (row.UTotalSampleSize == null)
        obj.TotalValue = "NA";
    else if (row.UTotalSampleSize < insufficientSample)
        obj.TotalValue = "LS";
    else {
        if (row.UTotalSampleSize >= insufficientSample && row.UTotalSampleSize <= lowSample)
            obj.TotalColorClass = 'grey';
        if (row.Header.toUpperCase() == "AVERAGE ITEMS PER OCCASION")
            obj.TotalValue = (row.TotalValue).toFixed(2);
        else
            obj.TotalValue = (row.TotalValue * 100).toFixed(2) + "%";
    }
    if (obj.TotalValue != 'NA' && obj.TotalValue != "LS" && row.TotalChange != null) {
        if (row.UTotalSampleSize != "") {
            //   obj.TotalChange = row.TotalChange.toFixed(2);
            obj.TotalChange = row.TotalChange >= 0 ? '+' + row.TotalChange.toFixed(2) : row.TotalChange.toFixed(2);
        }
    }
    return obj;
}

function returnCellValues(row, obj, type, index) {
    obj.value = "NA";
    obj.colorClass = "";
    obj.change = "";
    obj.columnColor = "0.37vw solid ";
    obj.hexColor = "";
    obj.LegendName = "";
    obj.cursor = "";
    obj.pointerEvent = "";
    let retail = "";

    if (row.ColorScheme == "LL" || row.ColorScheme == "SL" || row.ColorScheme == "LLL") {
        obj.columnColor += '#FF0000';
        obj.hexColor = 'rgba(255,0,0,0.1)';
        obj.LegendName = "Strengthen Core";
    }
    else if (row.ColorScheme == "SLL" || row.ColorScheme == "SSL" || row.ColorScheme == "SS") {
        obj.columnColor += '#FFC925';
        obj.hexColor = 'rgba(255, 201, 37,0.1)';
        obj.LegendName = "Maintain";

    }

    else if (row.ColorScheme == "LS" || row.ColorScheme == "LSL" || row.ColorScheme == "LSS") {
        obj.columnColor += '#7030A0';
        obj.hexColor = 'rgba(112, 48, 160,0.1)';
        obj.LegendName = "Grow Relevance";
    }

    else if (row.ColorScheme == "LLS" || row.ColorScheme == "SLS") {

        obj.columnColor += '#0070C0';
        obj.hexColor = 'rgba(0, 112, 192,0.1)';
        obj.LegendName = "Take Share";
    }

    else {
        obj.columnColor += "#B7B7B7";
        obj.hexColor = 'rgba(183, 183, 183,0.1)';
        obj.LegendName = "Deprioritize";
    }

    if (type == "Retail") {
        if (row.RetailValue != null) {
            obj.value = "$" + row.RetailValue.toFixed(2);
        }

        if (row.USampleSize < insufficientSample && row.Occasion.toUpperCase().indexOf("TOTAL") > -1) {
            retail = "LS";
        }
        else if (row.Occasion.toUpperCase().indexOf("TOTAL") == -1 && index != undefined && TotalSampleSize[index] < insufficientSample) {
            retail = "LS";
        }

    }
    else if ((type == "Distribution" && row.Distribution != null) || (type == "Share" && row.Share != null)) {

        if (row.USampleSize == null) {
            obj.value = "NA";
        }
        else if (row.USampleSize < insufficientSample && row.Occasion.toUpperCase().indexOf("TOTAL") > -1) {
            obj.value = "LS";
        }
        else if (row.Occasion.toUpperCase().indexOf("TOTAL") == -1 && index != undefined && TotalSampleSize[index] < insufficientSample) {
            obj.value = "LS";
        }
        else {
            if (row.Occasion.toUpperCase().indexOf("TOTAL") > -1) {
                if (row.USampleSize >= insufficientSample && row.USampleSize <= lowSample) {
                    obj.colorClass = 'grey';
                }
            }
            else if (TotalSampleSize[index] <= lowSample)
                obj.colorClass = 'grey';

            if (type == "Distribution")
                obj.value = (row.Distribution * 100).toFixed(0) + "%";
            else
                obj.value = (row.Share * 100).toFixed(0) + "%";



        }

    }
    else if (type == "Weighted") {
        if (row.WSampleSize != null) {
            obj.value = Math.round(row.WSampleSize);//row.WNumerator.toFixed(2);
            if (row.Occasion.toUpperCase().indexOf("TOTAL") > -1) {
                if (row.USampleSize <= lowSample) {
                    obj.colorClass = 'grey';
                }
            }
            else if (TotalSampleSize[index] <= lowSample)
                obj.colorClass = 'grey';
        }
    }
    else if (type == "Unweighted") {
        if (row.USampleSize != null) {
            obj.value = Math.round(row.USampleSize);
            if (row.Occasion.toUpperCase().indexOf("TOTAL") > -1) {
                if (row.USampleSize <= lowSample) {
                    obj.colorClass = 'grey';
                }
            }
            else if (TotalSampleSize[index] <= lowSample)
                obj.colorClass = 'grey';
        }
    }


    if (obj.value != 'NA' && obj.value != "LS" && row.Significance != null && obj.colorClass != 'grey') {

        if ((type == "Retail" && retail != "LS") || type == "Distribution") {
            if (row.Significance > 0)
                obj.colorClass = 'green';
            else if (row.Significance < 0)
                obj.colorClass = 'red';
        }
        else if (type == "Share") {
            if (row.ShareSignificance > 0)
                obj.colorClass = 'green';
            else if (row.ShareSignificance < 0)
                obj.colorClass = 'red';
        }

    }

    if (type == "Distribution" || type == "Retail") {
        if (obj.value != 'NA' && obj.value != "LS" && row.Change != null) {
            if (row.USampleSize != null) {
                // obj.change = row.Change.toFixed(1);
                obj.change = row.Change >= 0 ? '+' + row.Change.toFixed(1) : row.Change.toFixed(1);
            }
        }
    }
    else if (type == "Share") {
        if (obj.value != 'NA' && obj.value != "LS" && row.ShareChange != null) {
            if (row.ShareUSampleSize != null) {
                // obj.change = row.Change.toFixed(1);
                obj.change = row.ShareChange >= 0 ? '+' + row.ShareChange.toFixed(1) : row.ShareChange.toFixed(1);
            }
        }
    }

    if (obj.value == 'NA' || obj.value == "LS" || row.Level != maxLevel || retail == "LS") {
        obj.hexColor = "";
        obj.columnColor = "none";
        obj.cursor = "";
        obj.pointerEvent = "none";
    }
    else {
        obj.cursor = "pointer";
    }

    if (row.SelectedAttribute.toUpperCase().indexOf("TOTAL") > -1) {
        obj.columnColor = "";
        obj.hexColor = "";
        obj.cursor = "";
        obj.pointerEvent = "none";
    }
    return obj;
}


function GetCurrencySymbol(selectedMarket) {
    var symbol = "$";
    if (selectedMarket != null) {
        if (selectedMarket == "Brazil") {
            symbol = "R$";
        }
        else if (selectedMarket == "France") {
            symbol = "€";
        }
        else if (selectedMarket == "UK") {
            symbol = "£";
        }
        //else if (selectedMarket.Split(':').ToList().Count == 2)
        //{
        //    symbol = "";
        //}
        else {
            symbol = "$";
        }
    }
    return symbol;
}

//function to switch between weighted and unweighted sample
function selectSampleType($event) {
    if (!angular.element($event.currentTarget).hasClass("active")) {//if not already active
        angular.element($event.currentTarget.parentElement).children().removeClass("active");
        angular.element($event.currentTarget).addClass("active");
        CreateGrid(angular.element($event.currentTarget).text().trim().split(" ")[0], $(".samplesize-popup .popup-container"));
    }
}
var selectedCellObj;
function selectCell(rowId, colId, cellObj) {
    cellObj = JSON.parse(unescape(cellObj));
    showBackgroundShadow(true, true);
    $('.output-container').css('display', 'none');
    $('.drilldown-container').css('display', 'block');
    angular.element("body > .nicescroll-rails").remove();
    $('.demogIconImage').addClass('active');
    $('.demogText').addClass('active');
    $('.motivIcon').removeClass('active');
    $('.motivText').removeClass('active');
    $('.fiveWsIcon').removeClass('active');
    $('.fiveWsText').removeClass('active');
    $('.footerContent').css('display', 'none');
    $('.innerFooterContent').css('display', 'block');

    selectedCellObj = cellObj;
    innerResponseData = [];
    OSPInnerRequest = angular.element("#left-pane-container").scope().returnRequestObject();

    OSPInnerRequest.RowAttributeId = rowId;
    OSPInnerRequest.ColumnAttributeId = colId;
    OSPInnerRequest.RowName = selectedCellObj.rowName;
    OSPInnerRequest.ColumnName = selectedCellObj.colName;

    $.ajax({
        type: callsType.Post,
        url: services.GetOSPCellData,
        async: true,
        data: JSON.stringify(OSPInnerRequest),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (resp) {
            innerResponseData = resp.DataList;

            if (responseData.length > 0) {
                angular.element(document.querySelectorAll('.motivationChartArea')).hide();
                angular.element(document.querySelectorAll('.fiveWsChartArea')).hide();
                angular.element(document.querySelectorAll('.demographicsChartArea')).show();
                angular.element(document.getElementsByClassName("pptDiv")).addClass("disableSelection");
                CreateInnerGrid("Demographics", $('.drilldown-container .demographicsChartArea'), cellObj);
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

        setTimeout(function () {
            let obj = {};
            obj.DisplayName = "RETAIL SALES VALUE";
            obj.Data = [];
            obj.CountryID = undefined;
            obj.hasSubMenusActive = false;
            obj.hasChildSelected = false;
            obj.ParentId = undefined;
            angular.forEach($(".menus_list input.retailLeftContent"), function (a, b) {
                if ($(a).val() != "") {
                    let optionName = $(a).parents("li.left_panel_levels")[0].innerText.trim();
                    let data = {
                    };
                    data.DisplayName = $(a).val();
                    data.Data = [];
                    data.FilterID = 1;
                    data.CountryID = 0;
                    data.hasSubMenusActive = false;
                    data.hasChildSelected = false;
                    data.ParentId = null;
                    obj.Data.push(data);
                }
            })
            selectedItems = selectedItems.filter(function (e) { return e.DisplayName != "RETAIL SALES VALUE" })
            selectedItems.push(obj);
            angular.element("#left-pane-container").scope().updateLeftMenuSelections(selectedItems, leftPanel_Parents.filter(function (e) { return e.DisplayName == "RETAIL SALES VALUE" }));
            angular.element("#left-pane-container").scope().$apply();
            selectedItems = selectedItems.filter(function (e) { return e.DisplayName != "RETAIL SALES VALUE" });
        })

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
