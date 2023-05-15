var leftPanel_Parents =
    [
        { id: 1, parent_name: "TIME PERIOD", parent_id: "", DisplayName: "TIME PERIOD", name_class: "timeperiod", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 2, parent_name: "MARKETS", parent_id: "", DisplayName: "MARKETS", name_class: "markets", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 3, parent_name: "DIMENSION 1", parent_id: "", DisplayName: "DIMENSION 1", name_class: "dimension1", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 4, parent_name: "DIMENSION 2", parent_id: "", DisplayName: "DIMENSION 2", name_class: "dimension2", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 5, parent_name: "OCCASION", parent_id: "", DisplayName: "OCCASION", name_class: "occasion", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isGroupNeeded: true },
        { id: 6, parent_name: "CATEGORY/ITEM/BRAND", parent_id: "", DisplayName: "CATEGORY/ITEM/BRAND", name_class: "category", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isGroupNeeded: true },
        { id: 7, parent_name: "CHANNEL/RETAILER", parent_id: "", DisplayName: "CHANNEL/RETAILER", name_class: "retailer", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [], isGroupNeeded: true },
        { id: 8, parent_name: "5Ws", parent_id: "", DisplayName: "5Ws", name_class: "ws", selections: "None", menuLevel: 0, hasChild: true, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 9, parent_name: "DEMOGRAPHICS", parent_id: "", DisplayName: "DEMOGRAPHICS", name_class: "demographics", selections: "None", hasChild: true, menuLevel: 0, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
        { id: 10, parent_name: "ADDITIONAL FILTERS", parent_id: "", DisplayName: "ADDITIONAL FILTERS", name_class: "additionalfilters", selections: "None", hasChild: true, menuLevel: 0, isDefaultLevel: true, IsSelectable: true, isMulti: true, show: true, data: [] },
    ];

var distData = $.getJSON("/json/distribution.json", function (data) { return data });
var ColumnStaticData = [
    { "AttributeId": 1, "AttributetypeId": 1, "CountryID": 0, "DisplayName": "Occasion", "Filter": "DIMENSION 1", "FilterID": 1, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Occasion", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 1, "data": [], "isDefaultLevel": false, "isSingle": true },
    {
        "AttributeId": 2, "AttributetypeId": 2, "CountryID": 0, "DisplayName": "Survey Category/Item/Brand", "Filter": "DIMENSION 1", "FilterID": 2, "IsLastLevel": false, "IsSelectable": false, "MetricName": "Survey Category/Item/Brand", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 2, "data": [
            { "AttributeId": 1, "AttributetypeId": 1, "CountryID": 0, "DisplayName": "Category", "Filter": "Survey Category/Item/Brand", "FilterID": 1, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Category", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 1, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 2, "AttributetypeId": 2, "CountryID": 0, "DisplayName": "Item", "Filter": "Survey Category/Item/Brand", "FilterID": 2, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Item", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 2, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 3, "AttributetypeId": 3, "CountryID": 0, "DisplayName": "Brand", "Filter": "Survey Category/Item/Brand", "FilterID": 3, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Brand", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 3, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 4, "AttributetypeId": 4, "CountryID": 0, "DisplayName": "Category-Manufacturer", "Filter": "Survey Category/Item/Brand", "FilterID": 4, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Category-Manufacturer", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 4, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 5, "AttributetypeId": 5, "CountryID": 0, "DisplayName": "Item-Manufacturer", "Filter": "Survey Category/Item/Brand", "FilterID": 5, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Item-Manufacturer", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 5, "data": [], "isDefaultLevel": false, "isSingle": true }
        ], "isDefaultLevel": false, "isSingle": true
    },
    {
        "AttributeId": 3, "AttributetypeId": 3, "CountryID": 0, "DisplayName": "Custom Category/Item/Brand", "Filter": "DIMENSION 1", "FilterID": 3, "IsLastLevel": false, "IsSelectable": false, "MetricName": "Custom Category/Item/Brand", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 3, "data": [
            { "AttributeId": 1, "AttributetypeId": 1, "CountryID": 0, "DisplayName": "Category", "Filter": "Custom Category/Item/Brand", "FilterID": 1, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Category", "MetricParentName": "Custom Category/Item/Brand", "ParentId": null, "SortID": 1, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 2, "AttributetypeId": 2, "CountryID": 0, "DisplayName": "Item", "Filter": "Custom Category/Item/Brand", "FilterID": 2, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Item", "MetricParentName": "Custom Category/Item/Brand", "ParentId": null, "SortID": 2, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 3, "AttributetypeId": 3, "CountryID": 0, "DisplayName": "Brand", "Filter": "Custom Category/Item/Brand", "FilterID": 3, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Brand", "MetricParentName": "Custom Category/Item/Brand", "ParentId": null, "SortID": 3, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 4, "AttributetypeId": 4, "CountryID": 0, "DisplayName": "Category-Manufacturer", "Filter": "Custom Category/Item/Brand", "FilterID": 4, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Category-Manufacturer", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 4, "data": [], "isDefaultLevel": false, "isSingle": true },
            { "AttributeId": 5, "AttributetypeId": 5, "CountryID": 0, "DisplayName": "Item-Manufacturer", "Filter": "Custom Category/Item/Brand", "FilterID": 5, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Item-Manufacturer", "MetricParentName": "Survey Category/Item/Brand", "ParentId": null, "SortID": 5, "data": [], "isDefaultLevel": false, "isSingle": true }
        ], "isDefaultLevel": false, "isSingle": true

    },
    { "AttributeId": 4, "AttributetypeId": 4, "CountryID": 0, "DisplayName": "Channel/Retailer", "Filter": "DIMENSION 1", "FilterID": 4, "IsLastLevel": false, "IsSelectable": false, "MetricName": "Channel/Retailer", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 4, "data": [{ "AttributeId": 1, "AttributetypeId": 1, "CountryID": 0, "DisplayName": "Channel", "Filter": "Channel/Retailer", "FilterID": 1, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Channel", "MetricParentName": "Channel/Retailer", "ParentId": null, "SortID": 1, "data": [], "isDefaultLevel": false, "isSingle": true }, { "AttributeId": 2, "AttributetypeId": 2, "CountryID": 0, "DisplayName": "Retailer", "Filter": "Channel/Retailer", "FilterID": 2, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Retailer", "MetricParentName": "Channel/Retailer", "ParentId": null, "SortID": 2, "data": [], "isDefaultLevel": false, "isSingle": true }], "isDefaultLevel": false, "isSingle": true, "isDisabled": false },
    { "AttributeId": 5, "AttributetypeId": 5, "CountryID": 0, "DisplayName": "Custom Channel/Retailer", "Filter": "DIMENSION 1", "FilterID": 5, "IsLastLevel": false, "IsSelectable": false, "MetricName": "Channel/Retailer", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 5, "data": [{ "AttributeId": 1, "AttributetypeId": 1, "CountryID": 0, "DisplayName": "Channel", "Filter": "Channel/Retailer", "FilterID": 1, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Channel", "MetricParentName": "Channel/Retailer", "ParentId": null, "SortID": 1, "data": [], "isDefaultLevel": false, "isSingle": true }, { "AttributeId": 2, "AttributetypeId": 2, "CountryID": 0, "DisplayName": "Retailer", "Filter": "Channel/Retailer", "FilterID": 2, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Retailer", "MetricParentName": "Channel/Retailer", "ParentId": null, "SortID": 2, "data": [], "isDefaultLevel": false, "isSingle": true }], "isDefaultLevel": false, "isSingle": true, "isDisabled": false },
    { "AttributeId": 6, "AttributetypeId": 6, "CountryID": 0, "DisplayName": "5Ws", "Filter": "DIMENSION 1", "FilterID": 6, "IsLastLevel": true, "IsSelectable": true, "MetricName": "5Ws", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 6, "data": [], "isDefaultLevel": false, "isSingle": true },
    { "AttributeId": 7, "AttributetypeId": 7, "CountryID": 0, "DisplayName": "Demographics", "Filter": "DIMENSION 1", "FilterID": 7, "IsLastLevel": true, "IsSelectable": true, "MetricName": "Demographics", "MetricParentName": "DIMENSION 1", "ParentId": null, "SortID": 7, "data": [], "isDefaultLevel": false, "isSingle": true },

]

var MarketRegionList = [];
var selectedItems = [], LeftPanelOriginalData, timeperiodList, responseData = [], submitFlag = 0, exportFlag = 0, CMRequest = [], ScatterChartData = [], dimension1, dimension2;

$(window).resize(function () {
    if (ScatterChartData.length > 0) {
        angular.element(".noOutput").hide();
        scatterPlotChart(ScatterChartData, 1);
    }
    else {
        angular.element("#chart-container").empty();
        angular.element(".noOutput").show();
    }
})
angular.module('starter.controllers', ["ngAnimate", 'commonService'])
    .controller('parent-controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {
        showBackgroundShadow(true, true);
        $scope.ModuleIsHidden = true;
        $scope.leftMenuIsHidden = true;
        $scope.parent_list = [];
        angular.element(document.querySelectorAll(".moduleLevel[title='ADVANCED ANALYTICS']")).addClass("active");
        angular.element(document.querySelectorAll(".moduleLevel[title='CORRESPONDENCE MAPS']")).addClass("active");
        angular.element(document.querySelectorAll(".module-name .middleAlign")).text("Correspondence Maps");
        angular.element(document.getElementsByClassName("header-left")).css({ "width": "20%" });
        angular.element(document.getElementsByClassName("header-center")).css({ "width": "50%" });



        modifyFooter();

        //let headerIcon = '  <div class="advHeader OSP"><div class="middleAlign">Occasion Strategic Posture</div></div>' +
        //              '<div class="advHeader CM" style="margin-left:0%; color:#d11245"><div class="middleAlign">Correspondence Maps</div> </div>';
        //angular.element(document.querySelectorAll(".header-center")).html(headerIcon);

        //add specific class for internet explorer
        if ((/*@cc_on!@*/false || !!document.documentMode)) {
            angular.element("body,html,form").addClass("ie11");
        }

        loadCommonFunctionalities($scope, commonService, $http);
        $scope.LeftStaticMenu = leftPanel_Parents;

        $http({
            method: callsType.Post,
            url: services.LoadLeftPanel,
            data: { "moduleId": selectedModuleId },
            async: true,
        }).then(function successCallback(response) {
            LeftPanelOriginalData = response.data.where(function (e) { return e.DisplayName });
            timeperiodList = response.data[response.data.length - 2];
            MarketRegionList = [];
            angular.forEach(LeftPanelOriginalData.filter(function (e) { return e.DisplayName == "Markets" })[0].data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), function (a, b) {
                angular.forEach(a.data, function (c, d) {
                    MarketRegionList.push({ "DisplayName": c.DisplayName, "Region": a.DisplayName, "MarketId": c.CountryID, "FilterID": c.FilterID, "isDisabled": false })
                })
            })
            scenarios = response.data[response.data.length - 1];
        }, function (data) {
            show_popup("Error", data.statusText);
            showBackgroundShadow(false, false);
        });


        $scope.Exports = function (type) {
            if (!exportFlag) {
                show_popup("Alert", "Please click on submit and try again, as the selection has been changed.");
                return false;
            }

            var resp = JSON.stringify(ScatterChartData);
            let curscope = angular.element("#left-pane-container").scope();
            let dim1 = curscope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data, []).select("DisplayName")[0];
            let dim2 = curscope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data, []).select("DisplayName")[0];
            let dim1List, dim2List;
            if (dim1.indexOf("Manufacturer") > -1)
                dim1 = dim1.split('-')[0];
            if (dim1 != "5Ws" && dim1 != "Demographics")
                dim1List = curscope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.indexOf(dim1.toUpperCase()) > -1 })[0].Data, []).select("DisplayName");
            else {
                dim1List = curscope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(dim1.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 1" })[0].Data, []).select("DisplayName");
            }
            if (dim2.indexOf("Manufacturer") > -1)
                dim2 = dim2.split('-')[0];
            if (dim2 != "5Ws" && dim2 != "Demographics")
                dim2List = curscope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.indexOf(dim2.toUpperCase()) > -1 })[0].Data, []).select("DisplayName");
            else {
                dim2List = curscope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(dim2.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].Data, []).select("DisplayName");

            }

            dim1List = dim1List.join('#');
            dim2List = dim2List.join('#');

            showBackgroundShadow(true, true);

            if (type == 'ppt') {
                myFunction1();

                $.ajax({
                    url: services.CMExportPPT,
                    data: '{"response": "' + escape(resp) + '","dimension1":"' + dimension1 + '","dimension2":"' + dimension2 + '","dim1List":"' + dim1List + '","dim2List":"' + dim2List + '","selectionSummary":"' + CMRequest.SelectionSummary + '"}',
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
        }
    }])
    .controller('CorrespondenceMap-Controller', ["$scope", "$timeout", "$http", "commonService", "$compile", "$sce", function ($scope, $timeout, $http, commonService, $compile, $sce) {

        $scope.customPopup['visible'] = false;

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
            else if (menusList.DisplayName.toUpperCase() == "CUSTOM FILTERS") {
                $scope.bindCustomFilters(menusList);
            }
            else if (menusList.DisplayName == "DIMENSION 1" || menusList.DisplayName == "DIMENSION 2" || menusList.DisplayName == "ADDITIONAL FILTERS") {
                if (menusList.DisplayName == "DIMENSION 1" || menusList.DisplayName == "DIMENSION 2") {
                    menusList.data = angular.copy(ColumnStaticData);
                    let marketList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }), []).select("DisplayName").join(",")
                    if ((marketList.indexOf("North America") > -1 || marketList.indexOf("Select All Markets") > -1 || marketList.indexOf("Canada") > -1) && MarketRegionList.select("DisplayName").indexOf("Canada") > -1)
                        menusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == "CUSTOM CHANNEL/RETAILER" })[0].isDisabled = true;
                }
                else
                    menusList.data = angular.copy(ColumnStaticData.filter(function (e) { return e.DisplayName.indexOf("Channel/Retailer") == -1 }));
                applyToChild(menusList, ["Filter"], menusList.DisplayName);
                if (menusList.DisplayName == "ADDITIONAL FILTERS") {
                    let customFilters = { "AttributeId": 7, "AttributetypeId": 7, "CountryID": 0, "DisplayName": "Custom Filters", "Filter": "ADDITIONAL FILTERS", "FilterID": 7, "IsLastLevel": false, "IsSelectable": false, "MetricName": "Custom Filters", "MetricParentName": "ADDITIONAL FILTERS", "ParentId": null, "SortID": 8, "data": [], "isDefaultLevel": false, "isSingle": true };
                    let covid = { "AttributeId": 8, "AttributetypeId": 8, "CountryID": 0, "DisplayName": "COVID-19", "Filter": "ADDITIONAL FILTERS", "FilterID": 8, "IsLastLevel": false, "IsSelectable": false, "MetricName": "COVID-19", "MetricParentName": "ADDITIONAL FILTERS", "ParentId": null, "SortID": 7, "data": [], "isDefaultLevel": false, "isSingle": true };
                    menusList.data.push(covid);
                    menusList.data.push(customFilters);
                    $scope.addSampleType(menusList);
                    //let obj = getSelectedMainValues();
                    //let selectedDimesion2 = obj.Dimesion2, selectedDimesion1 = obj.Dimesion1;
                    //menusList.data.filter(function (e) { return e.DisplayName == "Occasion" })[0].isDisabled = false;
                    //if (selectedDimesion1 == "Occasion" || selectedDimesion2 == "Occasion")
                    //    menusList.data.filter(function (e) { return e.DisplayName == "Occasion" })[0].isDisabled = true;
                    //let isCustomSelected = false, isSurveySelected = false, categoryType;
                    //if (selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data[0].DisplayName == "Custom Category/Item/Brand" || selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data[0].DisplayName == "Custom Category/Item/Brand")
                    //    isCustomSelected = true;
                    //if (selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data[0].DisplayName == "Survey Category/Item/Brand" || selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data[0].DisplayName == "Survey Category/Item/Brand")
                    //    isSurveySelected = true;
                    //if (isCustomSelected)
                    //    categoryType = "Custom Category/Item/Brand";
                    //else
                    //    categoryType = "Survey Category/Item/Brand";
                    //menusList.data.filter(function (e) { return e.DisplayName.indexOf("Category/Item/Brand") > -1 })[0].isDisabled = false;
                    //menusList.data.filter(function (e) { return e.DisplayName.indexOf("Category/Item/Brand") > -1 })[0].data.filter(function (e) { return e.isDisabled = false });
                    //if (selectedDimesion1 == "Category" || selectedDimesion2 == "Category") {
                    //    menusList.data.filter(function (e) { return e.DisplayName == categoryType })[0].data[0].isDisabled = true;
                    //}
                    //if (selectedDimesion1 == "Item" || selectedDimesion2 == "Item") {
                    //    menusList.data.filter(function (e) { return e.DisplayName == categoryType })[0].data[0].isDisabled = true;
                    //    menusList.data.filter(function (e) { return e.DisplayName == categoryType })[0].data[1].isDisabled = true;
                    //}
                    //if (selectedDimesion1 == "Brand" || selectedDimesion2 == "Brand" || selectedDimesion1.indexOf("Manufacturer") > -1 || selectedDimesion2.indexOf("Manufacturer") > -1) {
                    //    menusList.data.filter(function (e) { return e.DisplayName == categoryType })[0].data.filter(function (e) { return e.isDisabled = true });
                    //}
                    //if (isCustomSelected) {
                    //    menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled = true });
                    //}
                    //else if (isSurveySelected) {
                    //    menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled = true });
                    //}
                    //if (menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled }).length == 5)
                    //    menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].isDisabled = true;
                    //if (menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled }).length == 5)
                    //    menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].isDisabled = true;

                    angular.forEach(menusList.data.filter(function (e) { return e.DisplayName.indexOf("Category/Item/Brand") > -1 }), function (val, ind) {
                        val.data.filter(function (e) { return e.IsSelectable = false });
                        val.data.filter(function (e) { return e.IsLastLevel = false });
                    })
                    menusList.data.filter(function (e) { return e.IsSelectable = false });
                    menusList.data.filter(function (e) { return e.IsLastLevel = false });
                }
            }
            else if (menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM/BRAND" || menusList.DisplayName.toUpperCase() == "CATEGORY" || menusList.DisplayName.toUpperCase() == "ITEM" || menusList.DisplayName.toUpperCase() == "BRAND" || menusList.DisplayName.toUpperCase() == "CATEGORY-MANUFACTURER" || menusList.DisplayName.toUpperCase() == "ITEM-MANUFACTURER") {
                let isCustomSelected = false;
                let countryIds = $scope.returnCountryIds();
                if (selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data[0].DisplayName == "Custom Category/Item/Brand" ||
                    selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data[0].DisplayName == "Custom Category/Item/Brand" ||
                    (parentList[0].DisplayName == "ADDITIONAL FILTERS" && parentList[1].DisplayName == "Custom Category/Item/Brand"))
                    isCustomSelected = true;
                let keepList = [];
                let tempData = [];
                let obj = getSelectedMainValues();
                let selectedDimesion2 = obj.Dimesion2, selectedDimesion1 = obj.Dimesion1;
                let appendText = "";
                if (isCustomSelected)
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
                let bucketName = "";
                if (menusList.DisplayName.toUpperCase().indexOf("MANUFACTURER") > -1)
                    bucketName = menusList.DisplayName;
                else if (selectedDimesion1.toUpperCase().indexOf("MANUFACTURER") > -1)
                    bucketName = selectedDimesion1;
                else if (selectedDimesion2.toUpperCase().indexOf("MANUFACTURER") > -1)
                    bucketName = selectedDimesion2;

                if (selectedDimesion1.indexOf('Manufacturer') > -1 || selectedDimesion2.indexOf('Manufacturer') > -1 || menusList.DisplayName.toUpperCase() == "CATEGORY-MANUFACTURER" || menusList.DisplayName.toUpperCase() == "ITEM-MANUFACTURER") {
                    tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "CATEGORY/ITEM-MANUFACTURER" })[0].data.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + bucketName.toUpperCase() && (e.CountryID == 0 || countryIds.indexOf(e.CountryID) > -1) }), countryIds, menusList, parentList));
                    if (countryIds.length > 1)
                        tempData = $scope.filterDups(tempData, countryIds.length);
                    tempData = tempData.filter(function (e) { return e.DisplayName == "Custom Group" }).concat(tempData.filter(function (e) { return e.DisplayName.toUpperCase() == appendText + bucketName.toUpperCase() })[0].data);
                }
                else {
                    tempData = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return (parentList[0].DisplayName != "ADDITIONAL FILTERS" && [appendText + selectedDimesion1.toUpperCase(), appendText + selectedDimesion2.toUpperCase()].indexOf(e.DisplayName.toUpperCase()) > -1) || appendText + menusList.DisplayName.toUpperCase() == e.DisplayName.toUpperCase() })[0].data, countryIds, menusList, parentList));
                    if (countryIds.length > 1)
                        tempData = $scope.filterDups(tempData, countryIds.length);
                }

                if (((selectedDimesion1 == "Category" || selectedDimesion2 == "Category") && menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM/BRAND") || menusList.DisplayName.toUpperCase() == "CATEGORY") {
                    //tempData = tempData.filter(function (e) { return e.DisplayName.toUpperCase() != "SELECT ALL " + appendText + "BRANDS" && e.DisplayName.toUpperCase() != "SELECT ALL " + appendText + "ITEMS" && e.DisplayName.toUpperCase() != "SELECT ALL BRANDS" && e.DisplayName.toUpperCase() != "SELECT ALL ITEMS" });
                    ///*show selected categories*/
                    //angular.forEach(tempData.filter(function (e) { return e.DisplayName != "Custom Group" }), function (a, b) {
                    //    a.data = [];
                    //    a.IsSelectable = true;
                    //    a.IsLastLevel = true;
                    //})
                    menusList.data = tempData;
                }
                else if (((selectedDimesion1 == "Item" || selectedDimesion2 == "Item") && menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM/BRAND") || menusList.DisplayName.toUpperCase() == "ITEM") {

                    //if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && (selectedDimesion1 == "Category" || selectedDimesion2 == "Category")) {
                    //    keepList = $scope.filterList(selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }), keepList);
                    //}
                    //let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
                    //let adnListData;
                    //if (adnList.length > 0) {
                    //    adnListData = adnList[0].Data.filter(function (e) { return e.DisplayName == parentList[1].DisplayName });
                    //    if (adnListData.length > 0 && parentList[0].DisplayName == "ADDITIONAL FILTERS") {
                    //        let bucketList = adnListData[0].Data.filter(function (e) { return e.DisplayName == CategoryType });
                    //        if (bucketList[0].Data.filter(function (e) { return e.DisplayName == "Category" }).length > 0)
                    //            keepList = $scope.filterList(bucketList[0].Data.filter(function (e) { return e.DisplayName == "Category" }), keepList);
                    //    }
                    //}

                    //if (keepList.length > 0)
                    //    tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "ITEMS" || e.DisplayName.toUpperCase() == "SELECT ALL ITEMS" });

                    //tempData = tempData.filter(function (e) { return !e.IsLastLevel || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "ITEMS" || e.DisplayName.toUpperCase() == "SELECT ALL ITEMS" });
                    //angular.forEach(tempData.filter(function (e) { return e.DisplayName.indexOf("Custom Group") == -1 }), function (a, b) {
                    //    if (a.DisplayName.indexOf("Select All") == -1) {
                    //        a.IsSelectable = false;
                    //        a.IsLastLevel = false;

                    //        /*add select all*/
                    //        let obj = {
                    //        };
                    //        obj.AttributeId = 0,
                    //            obj.AttributetypeId = 21,
                    //            obj.CountryID = 0,
                    //            obj.DisplayName = "Select All",
                    //            obj.Filter = parentList[0].DisplayName,
                    //            obj.FilterID = a.FilterID,
                    //            obj.FilterLevel = null,
                    //            obj.MetricName = "Select All",
                    //            obj.MetricParentName = a.DisplayName,
                    //            obj.SortID = 0,
                    //            obj.data = [],
                    //            obj.isDefaultLevel = false,
                    //            obj.isSingle = false;
                    //        if (a.data.filter(function (e) { return e.DisplayName == "Select All" }).length == 0)
                    //            a.data.unshift(angular.copy(obj));
                    //    }
                    //    angular.forEach(a.data, function (c, d) {
                    //        c.IsSelectable = true;
                    //        c.IsLastLevel = true;
                    //        c.ParentId = a.FilterID,
                    //            c.data = [];
                    //    })
                    //})
                    menusList.data = tempData;
                }
                else if (((selectedDimesion1 == "Brand" || selectedDimesion2 == "Brand") && menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM/BRAND") || menusList.DisplayName.toUpperCase() == "BRAND") {
                    let itemList = []
                    //if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && (selectedDimesion1 == "Category" || selectedDimesion2 == "Category")) {
                    //    keepList = $scope.filterList(selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }), keepList);
                    //}
                    //if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && (selectedDimesion1 == "Item" || selectedDimesion2 == "Item")) {
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

                    //if (keepList.length > 0)
                    //    tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 || e.DisplayName.toUpperCase() == "SELECT ALL " + appendText + "BRANDS" || e.DisplayName == "Custom Group" || e.DisplayName.toUpperCase() == "SELECT ALL BRANDS" });
                    if (itemList.length > 0) {
                        angular.forEach(tempData.filter(function (e) { return e.DisplayName != "Custom Group" }), function (a, b) {
                            var BrandData = [];
                            angular.forEach(a.data.filter(function (e) { return itemList.filter(function (e) { return e.Category == a.DisplayName }).select("Item").indexOf(e.DisplayName) > -1 }), function (c, d) {
                                BrandData.push(c);
                            })
                            a.data = BrandData;
                        })
                    }
                    menusList.data = tempData;
                }
                else if (((selectedDimesion1.indexOf("Manufacturer") > -1 || selectedDimesion2.indexOf("Manufacturer") > -1) && menusList.DisplayName.toUpperCase() == "CATEGORY/ITEM/BRAND") || menusList.DisplayName.toUpperCase().indexOf("MANUFACTURER") > -1) {

                    let bucketName = "";
                    if (menusList.DisplayName.toUpperCase().indexOf("MANUFACTURER") > -1)
                        bucketName = menusList.DisplayName.split("-")[0];
                    else if (selectedDimesion1.toUpperCase().indexOf("MANUFACTURER") > -1)
                        bucketName = selectedDimesion1.split("-")[0];
                    else if (selectedDimesion2.toUpperCase().indexOf("MANUFACTURER") > -1)
                        bucketName = selectedDimesion2.split("-")[0];

                    keepList = [];
                    let catItemList = selectedItems.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" });
                    if ((selectedDimesion1 == bucketName) && catItemList.length > 0) {
                        keepList = $scope.filterList(catItemList, keepList);
                    }
                    if ((selectedDimesion2 == bucketName) && catItemList.length > 0) {
                        keepList = $scope.filterList(catItemList, keepList);
                    }

                    //let adnList = selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" });
                    //let adnListData;
                    //if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && adnList.length > 0) {
                    //    adnListData = adnList[0].Data.filter(function (e) { return e.DisplayName == parentList[1].DisplayName });
                    //    if (adnListData.length > 0) {
                    //        let bucketList = adnListData[0].Data.filter(function (e) { return e.DisplayName == bucketName });
                    //        if (bucketList.length > 0)
                    //            keepList = $scope.filterList(bucketList, keepList);
                    //    }
                    //}

                    if (keepList.length > 0)
                        tempData = tempData.filter(function (e) { return keepList.indexOf(e.DisplayName) > -1 || e.DisplayName == "Custom Group" });

                    if (bucketName.indexOf("Item") > -1) {
                        angular.forEach(tempData.filter(function (e) { return e.DisplayName != "Custom Group" }), function (a, b) {
                            a.data = a.data.filter(function (val) { return val.data.length > 0 });
                        });
                    }
                    tempData = tempData.filter(function (e) { return e.data.length > 0 || e.DisplayName == "Custom Group" });
                    //if ((selectedDimesion1.toUpperCase().indexOf("MANUFACTURER") > -1 || selectedDimesion2.toUpperCase().indexOf("MANUFACTURER") > -1) && parentList//[0].DisplayName == "CATEGORY/ITEM/BRAND")
                    //    tempData.filter(function (e) { return e.isSingle = true });
                    menusList.data = angular.copy(tempData);
                }
            }
            else if (menusList.DisplayName.toUpperCase().indexOf("CHANNEL/RETAILER") > -1) {
                let obj = getSelectedMainValues();
                let countryIds = $scope.returnCountryIds();
                let selectedDimesion2 = obj.Dimesion2, selectedDimesion1 = obj.Dimesion1;
                let selBucket = "";
                if (selectedDimesion1 == "Channel" || selectedDimesion1 == "Retailer") {
                    selBucket = selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data[0].DisplayName
                }
                if (selectedDimesion2 == "Channel" || selectedDimesion2 == "Retailer") {
                    selBucket = selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data[0].DisplayName
                }
                if (selBucket != "") {
                    selBucket = selBucket.toUpperCase().indexOf("CUSTOM") > -1 ? "CUSTOM " : "";
                }

                menusList.data = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == selBucket + "CHANNEL/RETAILER" })[0].data, countryIds, menusList, parentList));
                if (countryIds.length > 1)
                    menusList.data = $scope.filterDups(menusList.data, countryIds.length);
                if (selectedDimesion1 == "Channel" || selectedDimesion2 == "Channel") {
                    angular.forEach(menusList.data.filter(function (e) { return e.DisplayName.indexOf("Custom Group") == -1 }), function (a, b) {
                        a.data = [];
                        a.IsLastLevel = 1;
                        a.IsSelectable = true;
                    })
                    menusList.data = menusList.data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 && e.DisplayName != "Custom Group Retailer" });
                }
                else if (selectedDimesion1 == "Retailer" || selectedDimesion2 == "Retailer") {
                    menusList.data = menusList.data.filter(function (e) { return e.DisplayName != "Custom Group Channel" });
                    menusList.data = menusList.data.filter(function (e) { return e.data.length > 0 || e.DisplayName.indexOf("Custom Group") > -1 /*|| e.DisplayName == "Select All Retailers"*/ });
                    menusList.data.filter(function (e) { return e.DisplayName != "Select All Retailers" }).filter(function (e) { return e.IsSelectable = false });
                    menusList.data.filter(function (e) { return e.isSingle = false });
                    menusList.data.filter(function (e) { return e.DisplayName == "Select All Retailers" }).filter(function (e) { return e.IsLastLevel = true });
                    angular.forEach(menusList.data.filter(function (e) { return e.DisplayName.indexOf("Custom Group") == -1 }), function (a, b) {
                        if (selBucket != "") {
                            a.data = a.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 || e.data.length > 0 || (e.DisplayName.indexOf("Select All") > -1 && e.DisplayName.indexOf("Retailers") > -1) });
                            if (a.data.length > 0) {
                                a.data.filter(function (e) { return e.DisplayName != "Select All Retailers" && !e.IsLastLevel }).filter(function (e) { return e.IsSelectable = false });
                                if (a.data.filter(function (val) { return val.data.length > 0 }).length > 0)
                                    angular.forEach(a.data.filter(function (val) { return val.DisplayName.indexOf("Select All") == -1 }), function (val1, ind1) {
                                        val1.data = val1.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 || e.DisplayName.indexOf("Select All") > -1 });
                                    })
                            }
                        }
                    })
                    if (selBucket != "") {
                        menusList.data = menusList.data.filter(function (e) { return e.data.filter(function (f) { return f.DisplayName != "Select All" }).length > 0 || e.DisplayName.indexOf("Custom Group") > -1 });
                    }
                }
            }
            else if (menusList.DisplayName.toUpperCase() == "DEMOGRAPHICS" || ((menusList.DisplayName.toUpperCase() == "DIMENSION 1" || menusList.DisplayName.toUpperCase() == "DIMENSION 2") && parentList[0].DisplayName == "DEMOGRAPHICS")) {
                if (menusList.isDefaultLevel) {
                    menusList.data = angular.copy(bindStaticList("DEMOGRAPHICS"));
                    menusList.data.filter(function (e) { return e.IsSelectable = false });
                    menusList.data.filter(function (e) { return e.IsLastLevel = false });
                    menusList.data.filter(function (e) { return e.isDisabled = false });
                    if (getSelectedMainValues().Dimesion1 != "Demographics")
                        menusList.data[0].isDisabled = true;
                    if (getSelectedMainValues().Dimesion2 != "Demographics")
                        menusList.data[1].isDisabled = true;

                }
                else {
                    let tempData = $scope.getDemographicsData();
                    menusList.data = tempData;
                    if (menusList.DisplayName == "Dimension 1" || menusList.DisplayName == "Dimension 2") {
                        menusList.data = menusList.data.filter(function (e) { return e.DisplayName == "K-EAT Typologies"});
                        menusList.data.filter(function (e) { return e.isSingle = true });
                        angular.forEach(menusList.data, function (a, b) {
                            if (!a.data.some(function (e) { return e.DisplayName != "Select All" && e.IsSelectable })) {
                                a.data.filter(function (e) { return e.isSingle = true });
                            }
                        });
                    }
                    if ((sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "")) {
                        let widgetInfo = JSON.parse(sessionStorage.getItem("widgetInfo"));
                        selectionObj = JSON.parse(widgetInfo.SelectionObj);
                        selectedItems = selectionObj.filter(function (e) { return e.DisplayName != "" });
                    }
                    else if (stickySelection.length > 0) {
                        selectedItems = stickySelection.filter(function (e) { return e.DisplayName != "" });
                    }
                    if (menusList.DisplayName == "Dimension 2" /*|| parentList[0].DisplayName == "ADDITIONAL FILTERS"*/) {
                        if (getSelectedMainValues().Dimesion1 == "Demographics") {
                            let dim1Metric = selectedItems.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 1" })[0].Data;
                            angular.forEach(dim1Metric, function (a, b) {
                                let removeList = a.Data.select("DisplayName");
                                menusList.data.filter(function (e) { return e.DisplayName == a.DisplayName })[0].data.filter(function (e) { return removeList.indexOf(e.DisplayName) > -1 }).filter(function (e) { return e.isDisabled = true });
                            });
                        }
                    }
                }
            }
            else if (menusList.DisplayName.toUpperCase() == "5WS" || ((menusList.DisplayName.toUpperCase() == "DIMENSION 1" || menusList.DisplayName.toUpperCase() == "DIMENSION 2") && parentList[0].DisplayName == "5Ws")) {
                let removeList = [];
                let countryIds = $scope.returnCountryIds();
                let isCustomSelected = false;
                if (selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data[0].DisplayName == "Custom Channel/Retailer" ||
                    selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data[0].DisplayName == "Custom Channel/Retailer")
                    isCustomSelected = true;
                if (menusList.isDefaultLevel) {
                    menusList.data = angular.copy(bindStaticList("5Ws"));
                    menusList.data.filter(function (e) { return e.IsSelectable = false });
                    menusList.data.filter(function (e) { return e.IsLastLevel = false });
                    menusList.data.filter(function (e) { return e.isDisabled = false });
                    if (getSelectedMainValues().Dimesion1 != "5Ws")
                        menusList.data[0].isDisabled = true;
                    if (getSelectedMainValues().Dimesion2 != "5Ws")
                        menusList.data[1].isDisabled = true;

                }
                else {
                    menusList.data = angular.copy($scope.modifyMarketDependency(LeftPanelOriginalData.filter(function (e) { return e.DisplayName.toUpperCase() == "5WS" })[0].data, countryIds, menusList, parentList));
                    if (countryIds.length > 1)
                        menusList.data = $scope.filterDups(menusList.data, countryIds.length);
                    if ((sessionStorage.getItem("widgetInfo") != null && sessionStorage.getItem("widgetInfo") != "")) {
                        let widgetInfo = JSON.parse(sessionStorage.getItem("widgetInfo"));
                        selectionObj = JSON.parse(widgetInfo.SelectionObj);
                        selectedItems = selectionObj.filter(function (e) { return e.DisplayName != "" });
                    }
                    else if (stickySelection.length > 0) {
                        selectedItems = stickySelection.filter(function (e) { return e.DisplayName != "" });
                    }

                    if (menusList.DisplayName.toUpperCase() == "DIMENSION 1" || menusList.DisplayName.toUpperCase() == "DIMENSION 2") {
                        menusList.data = menusList.data.filter(function (e) { return e.DisplayName.toUpperCase() != "PURCHASE" });
                    }

                    if (menusList.DisplayName == "Dimension 2" /*|| parentList[0].DisplayName == "ADDITIONAL FILTERS"*/) {
                        if (getSelectedMainValues().Dimesion1 == "5Ws") {
                            let columnMetric = selectedItems.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 1" })[0].Data;
                            filterChannels(columnMetric, menusList)
                        }
                    }

                    //if (parentList[0].DisplayName == "ADDITIONAL FILTERS") {
                    //    if (menusList.data.filter(function (e) { return e.DisplayName == "What" }).length > 0)
                    //        menusList.data.filter(function (e) { return e.DisplayName == "What" })[0].data = menusList.data.filter(function (e) { return e.DisplayName == "What" })[0].data.filter(function (e) { return !e.IsLastLevel });
                    //    let purchaseData = menusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == "PURCHASE" })[0].data;
                    //    purchaseData.filter(function (e) { return e.isDisabled = true });
                    //    if (getSelectedMainValues().Dimesion1 == "Channel" || getSelectedMainValues().Dimesion2 == "Channel") {
                    //        let keepList = [];
                    //        keepList = $scope.filterList(selectedItems.filter(function (e) { return e.DisplayName == "CHANNEL/RETAILER" }), keepList);
                    //        if (isCustomSelected) {
                    //            purchaseData.filter(function (e) { return e.DisplayName.indexOf("Custom") > -1 })[0].isDisabled = false;
                    //            purchaseData.filter(function (e) { return e.DisplayName.indexOf("Custom") > -1 })[0].data = purchaseData.filter(function (e) { return e.DisplayName.indexOf("Custom") > -1 })[0].data.filter(function (e) { return (keepList.indexOf(e.DisplayName) > -1 && e.data.length > 0) || e.DisplayName.toUpperCase() == "SELECT ALL CUSTOM RETAILERS" || e.DisplayName.toUpperCase() == "SELECT ALL RETAILERS" });
                    //            let newlist = menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].data.filter(function (e) { return e.DisplayName == "Custom Channel" })[0].data;
                    //            angular.forEach(newlist.filter(function (e) { return e.DisplayName.toUpperCase() != "SELECT ALL CUSTOM RETAILERS" && e.DisplayName.toUpperCase() != "SELECT ALL RETAILERS" }), function (c, d) {
                    //                c.IsSelectable = false;
                    //                c.data = c.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 || e.data.length > 0 || (e.DisplayName.indexOf("Select All") > -1 && e.DisplayName.indexOf("Retailers") > -1) });
                    //                if (c.data.length > 0) {
                    //                    c.data.filter(function (e) { return e.DisplayName != "Select All Retailers" && !e.IsLastLevel }).filter(function (e) { return e.IsSelectable = false });
                    //                    angular.forEach(c.data.filter(function (val) { return val.DisplayName.indexOf("Select All") == -1 }), function (val1, ind1) {
                    //                        if (!val1.IsLastLevel)
                    //                            val1.IsSelectable = false;
                    //                        val1.data = val1.data.filter(function (e) { return customRetailersAttributeIds.indexOf(e.AttributetypeId) > -1 });
                    //                    })
                    //                }
                    //            })
                    //            menusList.data.filter(function (e) { return e.DisplayName == "Purchase" })[0].data.filter(function (e) { return e.DisplayName == "Custom Channel" })[0].data = newlist.filter(function (e) { return e.data.length > 0 || (e.DisplayName.toUpperCase().indexOf("SELECT ALL") > -1 && e.DisplayName.toUpperCase().indexOf("RETAILERS") > -1) });
                    //        }
                    //        else {
                    //            purchaseData.filter(function (e) { return e.DisplayName.indexOf("Survey") > -1 })[0].isDisabled = false;
                    //            purchaseData.filter(function (e) { return e.DisplayName.indexOf("Survey") > -1 })[0].data = purchaseData.filter(function (e) { return e.DisplayName.indexOf("Survey") > -1 })[0].data.filter(function (e) { return (keepList.indexOf(e.DisplayName) > -1  && e.data.length > 0) || e.DisplayName.toUpperCase() == "SELECT ALL SURVEY RETAILERS" });
                    //            purchaseData.filter(function (e) { return e.DisplayName.indexOf("Survey") > -1 })[0].data.filter(function (e) { return e.DisplayName.toUpperCase().indexOf("SELECT ALL") == -1 }).filter(function (e) { return e.IsSelectable = false });
                    //        }
                    //        purchaseData.filter(function (e) { return (e.DisplayName == "Custom Channel" && isCustomSelected) || (e.DisplayName == "Survey Channel" && !isCustomSelected) })[0].isChannelSelected = 1;
                    //    }
                    //    else if (getSelectedMainValues().Dimesion1 == "Retailer" || getSelectedMainValues().Dimesion2 == "Retailer") {
                    //        menusList.data.filter(function (e) { return e.DisplayName.toUpperCase() == "PURCHASE" })[0].isDisabled = true;
                    //    }
                    //    else if (getSelectedMainValues().Dimesion2 == "5Ws") {
                    //        purchaseData.filter(function (e) { return e.isDisabled = false });
                    //        let rowMetric = selectedItems.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].Data;
                    //        filterChannels(rowMetric, menusList)
                    //    }
                    //    else {
                    //        purchaseData.filter(function (e) { return e.isDisabled = false });
                    //    }

                    //}
                    //if (menusList.DisplayName == "Dimension 2") {
                    menusList.data.filter(function (e) { return e.isSingle = true });
                    //}

                    $scope.validationForCanada(menusList);
                    $scope.addSelectAllForChannelAndRetailer(menusList, parentList);
                }
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


            if (menusList.data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }).length == 0) {
                show_popup("Alert", customMessages.NoCommonMetric);
                return false;
            }
            if (menusList.DisplayName == "DIMENSION 1" || menusList.DisplayName == "DIMENSION 2" /*|| menusList.DisplayName == "MARKETS"*/)
                applyToChild(menusList, ["isSingle"], true)
            if (menusList.DisplayName == "ADDITIONAL FILTERS")
                applyToChild(menusList, ["isSingle"], false)


            $scope.validationForAustraliaandGroup(parentList, menusList);

            return true;
        }

        //function to bind static first level
        function bindStaticList(parent) {
            var temp = [], list = [];

            if (parent == "ADDITIONAL FILTERS")
                list = ["Occasion", "Survey Category/Item/Brand", "Custom Category/Item/Brand", "5Ws", "Demographics"];
            else if (parent == "5Ws" || parent == "DEMOGRAPHICS")
                list = ["Dimension 1", "Dimension 2"];

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
                //obj.isDisabled = list[i] == "Previous Year" ? true : false;
                //if (list[i] == "Previous Period") {
                //    obj.hasChildSelected = true;
                //    obj.hasSubMenusActive = true;
                //    obj.isTabSelected = true;
                //}
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
            else if (!selectedItems.some(function (e) { return e.DisplayName == "MARKETS" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS") {
                show_popup("Alert", customMessages.MarketSelection)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "DIMENSION 1" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "DIMENSION 1") {
                show_popup("Alert", customMessages.Dimension1Selection)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "DIMENSION 2" }) && menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "DIMENSION 1" && menusList.DisplayName != "DIMENSION 2") {
                show_popup("Alert", customMessages.Dimension2Selection)
                return false;
            }
            else if (menusList.DisplayName != "TIME PERIOD" && menusList.DisplayName != "MARKETS" && menusList.DisplayName != "DIMENSION 1" && menusList.DisplayName != "DIMENSION 2") {
                curscope = angular.element("#left-pane-container").scope();
                let obj = getSelectedMainValues();
                let selectedDimesion2 = obj.Dimesion2, selectedDimesion1 = obj.Dimesion1;
                let availableItems = scenarios.filter(function (e) { return e.Dimesion1 == selectedDimesion1 && e.Dimesion2 == selectedDimesion2 })[0];
                if (!selectedItems.some(function (e) { return e.DisplayName == "OCCASION" }) && availableItems.Occasion != 'Disabled' && menusList.DisplayName != "OCCASION") {
                    show_popup("Alert", customMessages.OccasionSelection)
                    return false;
                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }) && availableItems.Category != 'Disabled' && menusList.DisplayName != "OCCASION" && menusList.DisplayName != "CATEGORY/ITEM/BRAND") {
                    show_popup("Alert", customMessages.CategorySelection)
                    return false;
                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "CHANNEL/RETAILER" }) && availableItems.Channel != 'Disabled' && menusList.DisplayName != "OCCASION" && menusList.DisplayName != "CATEGORY/ITEM/BRAND" && menusList.DisplayName != "CHANNEL/RETAILER") {
                    show_popup("Alert", customMessages.ChannelRetailerSelection)
                    return false;
                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "5Ws" }) && availableItems.Metric != 'Disabled' && menusList.DisplayName != "OCCASION" && menusList.DisplayName != "CATEGORY/ITEM/BRAND" && menusList.DisplayName != "CHANNEL/RETAILER" && menusList.DisplayName != "5Ws") {
                    show_popup("Alert", customMessages.MetricSelection)
                    return false;
                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "DEMOGRAPHICS" }) && availableItems.Demographics != 'Disabled' && menusList.DisplayName != "OCCASION" && menusList.DisplayName != "CATEGORY/ITEM/BRAND" && menusList.DisplayName != "CHANNEL/RETAILER" && menusList.DisplayName != "5Ws" && menusList.DisplayName != "DEMOGRAPHICS") {
                    show_popup("Alert", customMessages.DemographicSelection)
                    return false;
                }
                else if (availableItems.Metric != 'Disabled' && curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].data.filter(function (e) { return !e.isDisabled }).length != curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].data.filter(function (e) { return e.hasChildSelected }).length && menusList.DisplayName != "OCCASION" && menusList.DisplayName != "CATEGORY/ITEM/BRAND" && menusList.DisplayName != "5Ws") {
                    if (!curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].isDisabled && !curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].hasChildSelected) {
                        show_popup("Alert", customMessages.Dimension2Selection)
                        return false;
                    }
                }
                else if (availableItems.Demographics != 'Disabled' && curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].data.filter(function (e) { return !e.isDisabled }).length != curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].data.filter(function (e) { return e.hasChildSelected }).length && menusList.DisplayName != "OCCASION" && menusList.DisplayName != "CATEGORY/ITEM/BRAND" && menusList.DisplayName != "5Ws" && menusList.DisplayName != "DEMOGRAPHICS") {
                    if (!curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].isDisabled && !curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].hasChildSelected) {
                        show_popup("Alert", customMessages.Dimension2Selection)
                        return false;
                    }

                }

                if (selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion1.toUpperCase()) > -1 }).length > 0 && parentList[0].DisplayName.toUpperCase().indexOf(selectedDimesion1.toUpperCase()) == -1) {
                    let count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion1.toUpperCase()) > -1 })[0].Data, []).length;
                    if (selectedDimesion1 == "5Ws")
                        count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 1" })[0].Data, []).length;
                    if (count < 3) {
                        show_popup("ALERT", "Min. of 3 selections required in Dimension 1.");
                        return false;
                    }
                }
                if (selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion2.toUpperCase()) > -1 }).length > 0 && parentList[0].DisplayName.toUpperCase().indexOf(selectedDimesion2.toUpperCase()) == -1) {
                    count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion2.toUpperCase()) > -1 })[0].Data, []).length;
                    if (selectedDimesion2 == "5Ws")
                        count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 2" })[0].Data, []).length;
                    if (count < 3) {
                        show_popup("ALERT", "Min. of 3 selections required in Dimension 2.");
                        return false;
                    }
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
            if (menusList.DisplayName == "DIMENSION 2") {
                let selectedDimesion1 = getSelectedMainValues().Dimesion1;
                let availableItems = scenarios.filter(function (e) { return e.Dimesion1 == selectedDimesion1 }).select("Dimesion2").distinct();
                angular.forEach(menusList.data, function (value, index) {
                    if (value.DisplayName == "Survey Category/Item/Brand" || value.DisplayName == "Custom Category/Item/Brand") {
                        angular.forEach(value.data, function (value1, index) {
                            if (availableItems.indexOf(value1.DisplayName) == -1) {
                                value1.isDisabled = true;
                            }
                            else
                                value1.isDisabled = false;
                        })
                        menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].isDisabled = false;
                        menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].isDisabled = false;
                        if (menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled }).length == 5)
                            menusList.data.filter(function (e) { return e.DisplayName == "Survey Category/Item/Brand" })[0].isDisabled = true;
                        if (menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].data.filter(function (e) { return e.isDisabled }).length == 5)
                            menusList.data.filter(function (e) { return e.DisplayName == "Custom Category/Item/Brand" })[0].isDisabled = true;
                    }
                    else if (value.DisplayName.indexOf("Channel/Retailer") > -1) {
                        angular.forEach(value.data, function (value1, index) {
                            if (availableItems.indexOf(value1.DisplayName) == -1) {
                                value1.isDisabled = true;
                            }
                            else
                                value1.isDisabled = false;
                        })
                        menusList.data.filter(function (e) { return e.DisplayName == "Channel/Retailer" })[0].isDisabled = false;//set true for enabling
                        if (menusList.data.filter(function (e) { return e.DisplayName == "Channel/Retailer" })[0].data.filter(function (e) { return e.isDisabled }).length == 2)
                            menusList.data.filter(function (e) { return e.DisplayName == "Channel/Retailer" })[0].isDisabled = true;
                        menusList.data.filter(function (e) { return e.DisplayName == "Custom Channel/Retailer" })[0].isDisabled = false;//set true for enabling
                        let marketList = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" }), []).select("DisplayName").join(",")
                        if (menusList.data.filter(function (e) { return e.DisplayName == "Custom Channel/Retailer" })[0].data.filter(function (e) { return e.isDisabled }).length == 2 || ((marketList.indexOf("North America") > -1 || marketList.indexOf("Select All Markets") > -1 || marketList.indexOf("Canada") > -1) && MarketRegionList.select("DisplayName").indexOf("Canada") > -1))
                            menusList.data.filter(function (e) { return e.DisplayName == "Custom Channel/Retailer" })[0].isDisabled = true;
                    }
                    else {
                        if (availableItems.indexOf(value.DisplayName) == -1) {
                            value.isDisabled = true;
                        }
                        else
                            value.isDisabled = false;
                    }
                });
            }


            let obj = getSelectedMainValues();
            let selectedDimesion2 = obj.Dimesion2, selectedDimesion1 = obj.Dimesion1;
            let availableItems = [];
            if (scenarios != undefined)
                availableItems = scenarios.filter(function (e) { return e.Dimesion1 == selectedDimesion1 && e.Dimesion2 == selectedDimesion2 })[0];

            if (availableItems != undefined && !$scope.hasChildSelected(menusList)) {
                scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "OCCASION" })[0].isDisabled = false;
                scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].isDisabled = false;
                scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].isDisabled = false;
                scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].isDisabled = false;
                scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CHANNEL/RETAILER" })[0].isDisabled = false;

                if (menusList.DisplayName == "OCCASION" && menusList.isDefaultLevel) {
                    if (availableItems.Occasion == "Multiple") {
                        applyToChild(menusList, ["isSingle"], false);
                    }
                }
                else if (menusList.DisplayName == "CATEGORY/ITEM/BRAND" && menusList.isDefaultLevel && !(selectedDimesion1.toUpperCase().indexOf("MANUFACTURER") > -1 || selectedDimesion2.toUpperCase().indexOf("MANUFACTURER") > -1)) {
                    if (availableItems.Category == "Multiple") {
                        applyToChild(menusList, ["isSingle"], false);
                    }
                }
                else if (menusList.DisplayName == "5Ws" && menusList.isDefaultLevel) {
                    if (availableItems.Metric == "Multiple") {
                        angular.forEach(menusList.data, function (a, b) {
                            angular.forEach(a.data, function (c, d) {
                                applyToChild(c, ["isSingle"], false);
                            })
                        })
                    }
                }
                else if (menusList.DisplayName == "DEMOGRAPHICS" && menusList.isDefaultLevel) {
                    if (availableItems.Demographics == "Multiple") {
                        angular.forEach(menusList.data, function (a, b) {
                            angular.forEach(a.data, function (c, d) {
                                applyToChild(c, ["isSingle"], false);
                            })
                        })
                    }
                }
                else if (menusList.DisplayName == "CHANNEL/RETAILER" && menusList.isDefaultLevel) {
                    if (availableItems.Channel == "Multiple") {
                        angular.forEach(menusList.data, function (a, b) {
                            applyToChild(a, ["isSingle"], false);
                        })
                    }
                }

                if (availableItems.Occasion == "Disabled")
                    scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "OCCASION" })[0].isDisabled = true;

                if (availableItems.Category == "Disabled")
                    scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" })[0].isDisabled = true;

                if (availableItems.Metric == "Disabled")
                    scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].isDisabled = true;

                if (availableItems.Demographics == "Disabled")
                    scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].isDisabled = true;

                if (availableItems.Channel == "Disabled")
                    scope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "CHANNEL/RETAILER" })[0].isDisabled = true;
            }
            return true;
        }

        //function to get dimesion1,dimension2 selections
        function getSelectedMainValues() {
            let selectedDimesion1 = "", selectedDimesion2 = "";
            if (selectedItems.length > 2) {
                if (selectedItems.length > 2 && selectedItems[2].DisplayName == "DIMENSION 1" && selectedItems[2].Data.length > 0)
                    selectedDimesion1 = selectedItems[2].Data[0].Data.length > 0 ? selectedItems[2].Data[0].Data[0].DisplayName : selectedItems[2].Data[0].DisplayName;
                if (selectedItems.length > 3 && selectedItems[3].DisplayName == "DIMENSION 2" && selectedItems[3].Data.length > 0)
                    selectedDimesion2 = selectedItems[3].Data[0].Data.length > 0 ? selectedItems[3].Data[0].Data[0].DisplayName : selectedItems[3].Data[0].DisplayName;

            }
            let temp = {};
            temp.Dimesion1 = selectedDimesion1;
            temp.Dimesion2 = selectedDimesion2;
            return temp;
        }


        //function to bind channels and retailers
        function filterChannels(list, menusList) {
            removeList = list.select("DisplayName");
            menusList.data.filter(function (e) { return removeList.indexOf(e.DisplayName) > -1 }).filter(function (e) { return e.isDisabled = true });

        }

        //function to select left panel tab
        $scope.menu_Tab_Click = function (menusList, parentList, scope, flag) {
            if (menusList.isDefaultLevel && !menusList.hasChild) {
                return;
            }
            let prevHasChildSelected = menusList.hasChildSelected;
            let prevHasSubMenusActive = menusList.hasSubMenusActive;
            let prevIsTabSelected = menusList.isTabSelected;

            let obj = getSelectedMainValues();
            let dimension1 = obj.Dimesion1;
            let dimension2 = obj.Dimesion2;
            if ((parentList[0].DisplayName == "CATEGORY/ITEM/BRAND" || parentList[0].DisplayName == "OCCASION" || parentList[0].DisplayName == "CHANNEL/RETAILER" || parentList[0].DisplayName == "5Ws")) {
                if (dimension1.toUpperCase().indexOf("MANUFACTURER") > -1)
                    dimension1 = dimension1.split("-")[0];
                if (dimension2.toUpperCase().indexOf("MANUFACTURER") > -1)
                    dimension2 = dimension2.split("-")[0];
                if (parentList[0].DisplayName.indexOf(dimension1.toUpperCase()) > -1) {
                    let count = 0;

                    if (selectedItems.filter(function (e) { return e.DisplayName == parentList[0].DisplayName }).length > 0) {
                        count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.indexOf(dimension1.toUpperCase()) > -1 })[0].Data, []).length;
                        if (dimension1 == "5Ws" || dimension1 == "Demographics")
                            count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase() == dimension1.toUpperCase() })[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 1" })[0].Data, []).length;

                    }
                    if (menusList.DisplayName.indexOf("Select All") > -1 && !menusList.hasChildSelected) {
                        if (parentList[parentList.length - 2].data.filter(function (e) { return e.IsSelectable && e.DisplayName.indexOf("Select All") == -1 }).length > 0) {
                            if (parentList[parentList.length - 2].data.filter(function (e) { return e.IsCollapsible }).length > 0)
                                count += parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected && e.ParentId == menusList.ParentId }).length - 1;
                            else
                                count += parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected }).length - 1;
                        }
                        else {
                            angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return !e.IsSelectable && e.DisplayName.indexOf("Select All") == -1 }), function (a, b) {
                                count += a.data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected && e.DisplayName.indexOf("Select All") == -1 }).length - 1;
                            })
                        }
                    }
                    if ((count >= 30) && !menusList.hasChildSelected && !menusList.isDefaultLevel) {
                        show_popup("ALERT", "User can select  max. of 30 selections at a time in Dimension 1.");
                        return false;
                    }
                }
                if (parentList[0].DisplayName.indexOf(dimension2.toUpperCase()) > -1) {
                    let count = 0;

                    if (selectedItems.filter(function (e) { return e.DisplayName.indexOf(dimension2.toUpperCase()) > -1 }).length > 0) {
                        count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.indexOf(dimension2.toUpperCase()) > -1 })[0].Data, []).length;
                        if (dimension2 == "5Ws" || dimension2 == "Demographics")
                            count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase() == dimension2.toUpperCase() })[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 2" })[0].Data, []).length;
                    }
                    if (menusList.DisplayName.indexOf("Select All") > -1 && !menusList.hasChildSelected) {
                        if (parentList[parentList.length - 2].data.filter(function (e) { return e.IsSelectable && e.DisplayName.indexOf("Select All") == -1 }).length > 0) {
                            if (parentList[parentList.length - 2].data.filter(function (e) { return e.IsCollapsible }).length > 0)
                                count += parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected && e.ParentId == menusList.ParentId }).length - 1;
                            else
                                count += parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected }).length - 1;
                        }
                        else {
                            angular.forEach(parentList[parentList.length - 2].data.filter(function (e) { return !e.IsSelectable && e.DisplayName.indexOf("Select All") == -1 }), function (a, b) {
                                count += a.data.filter(function (e) { return !e.isDisabled && !e.hasChildSelected && e.DisplayName.indexOf("Select All") == -1 }).length - 1;
                            })
                        }
                    }
                    if ((count >= 30) && !menusList.hasChildSelected && !menusList.isDefaultLevel) {
                        show_popup("ALERT", "User can select  max. of 30 selections at a time in Dimension 2.");
                        return false;
                    }
                }
            }

            //Select All functionality start
            $scope.clickOnSelectAll(menusList, parentList);
            //Select All functionality end

            if (menusList.isDefaultLevel) {
                if (!requiredValidations(menusList, parentList))
                    return false;
            }

            if (!menusList.isDefaultLevel && (parentList[0].DisplayName == "5Ws" || parentList[0].DisplayName == "DEMOGRAPHICS" || parentList[0].DisplayName == "ADDITIONAL FILTERS")) {
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
            let condition = !menusList.isDefaultLevel && (parentList[0].DisplayName == "MARKETS" || parentList[0].DisplayName == "5Ws" || parentList[1].DisplayName == "5Ws" || parentList[0].DisplayName == "CATEGORY/ITEM/BRAND" || parentList[1].DisplayName.indexOf("Category/Item/Brand") > -1);
            $scope.mutuallyExclusiveConsecutiveLevels(menusList, parentList, condition, prevHasChildSelected);
            if (parentList.length > 2 && parentList[1].DisplayName.indexOf("Category/Item/Brand") > -1 && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                $scope.mutuallyExclusiveChannelRetailers(menusList, parentList, "Category/Item/Brand");
            }
            /*mutually exclusive is selectable at consecutive levels end*/

            /*clear category/brand/item*/

            if (parentList[0].DisplayName == "ADDITIONAL FILTERS" && parentList.length > 1 && parentList[1].DisplayName.indexOf("Category/Item/Brand") > -1 && (parentList[2].DisplayName.indexOf("Category") > -1 || parentList[2].DisplayName.indexOf("Item") > -1 || parentList[2].DisplayName == "Brand") && prevHasChildSelected != menusList.hasChildSelected && !menusList.isDefaultLevel) {
                let index = 1;
                if (parentList[2].DisplayName == "Category") {
                    angular.forEach(parentList[index].data, function (a, b) {
                        if (b > 0) {
                            a.data = [];
                            a.hasChildSelected = false;
                            a.hasSubMenusActive = false;
                            a.isTabSelected = false;
                        }

                    })
                }
                else if (parentList[2].DisplayName == "Item") {
                    angular.forEach(parentList[index].data, function (a, b) {
                        if (b > 1) {
                            a.data = [];
                            a.hasChildSelected = false;
                            a.hasSubMenusActive = false;
                            a.isTabSelected = false;
                        }

                    })
                }
            }

            /*clear category/brand/item*/

            if (!menusList.isDefaultLevel) {
                selectedItems = $scope.getSelectedItems($scope.LeftStaticMenu.filter(function (e) { return e.hasChild }));
                List = [];
                List.push(parentList[0]);
                $scope.updateLeftMenuSelections(selectedItems, List);

                var selContent = $scope.formSelectionSummary(selectedItems, leftPanel_Parents.filter(function (e) { return e.hasChild }));
                angular.element(document.querySelectorAll(".summay-content-text > div")).html(selContent);
            }

            enableDisableTabs(menusList, parentList, $scope);

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

            if (menusList.data.filter(function (e) { return e.IsCollapsible }).length > 0) {
                angular.forEach(menusList.data, function (a, b) {
                    if (!a.IsCollapsible)
                        a.IsHidden = true;
                    else
                        a.IsExpanded = false;
                })
            }

            if (menusList.isTabSelected) {
                $timeout(function (e) {
                    if (parentList.length > 2 && parentList[parentList.length - 2].data.filter(function (e) { return e.IsCollapsible }).length > 0)
                        SetScroll($($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "']").parents("li")[0]).find(" > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false)
                    else if (menusList.DisplayName != parentList[0].DisplayName)
                        if ($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul").length > 0)
                            SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                        else {
                            if (parentList.length > 2)
                                SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[parentList.length - 2].DisplayName) + "']  > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                            if (parentList.length > 3)
                                SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[parentList.length - 3].DisplayName) + "']  > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
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
            if (!menusList.isDefaultLevel && (parentList[0].DisplayName == "5Ws" || parentList[0].DisplayName == "DEMOGRAPHICS" || parentList[0].DisplayName == "ADDITIONAL FILTERS")) {
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
                    if (menusList.DisplayName != parentList[0].DisplayName)
                        SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] li[ng-name='" + replaceWithDouble_SingleCharacters(menusList.DisplayName) + "'] > .internalWrapper> .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                    else
                        SetScroll($("li[ng-name='" + replaceWithDouble_SingleCharacters(parentList[0].DisplayName) + "'] > .internalWrapper > .wrapper > ul"), "#D31245", 0, 0, 0, 0, 3, false);
                })
            }
        }

        $scope.left_panel_submit = function () {


            angular.element(document.getElementsByClassName("footerNote")).show();
            angular.element(document.getElementsByClassName("footerContent")).hide();

            angular.element(document.getElementsByClassName("output-container")).hide();
            angular.element(document.getElementsByClassName("save_filter_icon")).addClass("disableSelection");
            angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
            angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
            angular.element(document.getElementsByClassName("excelDiv")).addClass("disableSelection");
            angular.element(document.getElementsByClassName("pptDiv")).addClass("disableSelection");
            angular.element("body > .nicescroll-rails").remove();
            angular.element(document.querySelectorAll(".header-center")).html('');


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
            CMRequest = returnRequestObject();

            //showBackgroundShadow(false, false);
            //show_popup("Alert", "Success");
            //return false;

            if (selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data[0].Data.length != 0)
                dimension1 = selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data[0].Data[0].DisplayName;
            else {
                dimension1 = selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data[0].DisplayName;
                if (dimension1 == "5Ws") {
                    dimension1 = selectedItems.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 1" })[0].Data[0].DisplayName
                }
            }


            if (selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data[0].Data.length != 0)
                dimension2 = selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data[0].Data[0].DisplayName;
            else {
                dimension2 = selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 2" })[0].Data[0].DisplayName;
                if (dimension2 == "5Ws") {
                    dimension2 = selectedItems.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].Data[0].DisplayName;
                }
            }

            angular.element(document.querySelectorAll('.dim1 .legendName')).html(dimension1);
            angular.element(document.querySelectorAll('.dim2 .legendName')).html(dimension2);
            //showBackgroundShadow(false, false);
            //show_popup("Alert", "Success");
            //return false;

            $.ajax({
                type: callsType.Post,
                url: services.GetCMData,
                async: true,
                data: JSON.stringify(CMRequest),
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (resp) {
                    responseData = resp.DataList;                  
                    submitFlag = 1;
                    exportFlag = 1;
                    if (responseData != null && responseData.length > 0) {
                        angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
                        angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
                        angular.element(document.getElementsByClassName("footerNote")).hide();
                        angular.element(document.getElementsByClassName("footerContent")).show();
                        angular.element(document.getElementsByClassName("output-container")).show();
                        //angular.element(document.getElementsByClassName("excelDiv")).removeClass("disableSelection");
                        angular.element(document.getElementsByClassName("pptDiv")).removeClass("disableSelection");
                        if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "Custom Filters" }).length == 0)
                            angular.element(document.getElementsByClassName("save_filter_icon")).removeClass("disableSelection");

                        let obj = getSelectedMainValues();
                        let dim1 = obj.Dimesion1;
                        let dim2 = obj.Dimesion2;
                        let dim1List=[], dim2list =[];

                        if (dim1.indexOf("Manufacturer") > -1)
                            dim1 = dim1.split('-')[0];
                        if (dim1 != "5Ws" & dim1 != "Demographics")
                            dim1List = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.indexOf(dim1.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), []).select("DisplayName");
                        else {
                            dim1List = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(dim1.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 1" })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), []).select("DisplayName");
                        }

                        if (dim2.indexOf("Manufacturer") > -1)
                            dim2 = dim2.split('-')[0];
                        if (dim2 != "5Ws" & dim2 != "Demographics")
                            dim2List = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.indexOf(dim2.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), []).select("DisplayName");
                        else {
                            dim2List = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(dim2.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), []).select("DisplayName");
                        }

                        var uniqueObj = [];
                        var sorting = dim2List.concat(dim1List).filter(function (e) { return responseData.select("name").indexOf(e) > -1 });
                        sorting.forEach(function (key) {
                            if (uniqueObj.findIndex(function (e) { return e.DisplayName == key }) == -1) {
                                uniqueObj.push(responseData.filter(function (e) { return e.name == key })[0]);
                            }
                        })
                        responseData = uniqueObj;
                        
                        let list = selectedItems.filter(function (e) { return e.DisplayName.toUpperCase() == selectedItems.filter(function (e) { return e.DisplayName == "DIMENSION 1" })[0].Data[0].DisplayName.toUpperCase().replace("CUSTOM ", "").replace("SURVEY ", "") })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 });
                        if (getSelectedMainValues().Dimesion1 == "5Ws") {
                            list = list.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 1" })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 });
                        }
                        ScatterChartData = prepareDataForScatter(responseData, responseData.select("name").filter(function (obj) { return dim1List.indexOf(obj) > -1 }).length);

                        if (ScatterChartData.length > 0) {
                            angular.element(".noOutput").hide();
                            scatterPlotChart(ScatterChartData, 1);
                        }
                        else {
                            angular.element("#chart-container").empty();
                            angular.element(".noOutput").show();
                        }

                        showBackgroundShadow(false, false);
                    }
                    else {
                        angular.element(document.querySelectorAll(".selectionButtonCallout")).css("display", "none");
                        angular.element(document.querySelectorAll(".calloutArrow")).css("display", "none");
                        angular.element(document.getElementsByClassName("footerNote")).hide();
                        angular.element(document.getElementsByClassName("footerContent")).show();
                        angular.element(document.getElementsByClassName("output-container")).show();
                        //angular.element(document.getElementsByClassName("excelDiv")).removeClass("disableSelection");
                        angular.element(document.getElementsByClassName("pptDiv")).removeClass("disableSelection");
                        if (selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" }).length > 0 && selectedItems.filter(function (e) { return e.DisplayName == "ADDITIONAL FILTERS" })[0].Data.filter(function (e) { return e.DisplayName == "Custom Filters" }).length == 0)
                            angular.element(document.getElementsByClassName("save_filter_icon")).removeClass("disableSelection");
                        angular.element("#chart-container").empty();
                        angular.element(".noOutput").show();
                        ScatterChartData = [];
                        showBackgroundShadow(false, false);
                    }
                },
                error: function (err, xhr, msg) {
                    showBackgroundShadow(true, true);
                }
            });
        }

        //function to check if all mandatory selections are made or not
        function onSubmitValidations() {
            if (selectedItems == undefined || selectedItems.length == 0) {
                show_popup("Alert", customMessages.Timeperiod)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "TIME PERIOD" })) {
                show_popup("Alert", customMessages.Timeperiod)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "MARKETS" })) {
                show_popup("Alert", customMessages.MarketSelection)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "DIMENSION 1" })) {
                show_popup("Alert", customMessages.Dimension1Selection)
                return false;
            }
            else if (!selectedItems.some(function (e) { return e.DisplayName == "DIMENSION 2" })) {
                show_popup("Alert", customMessages.Dimension2Selection)
                return false;
            }

            else {
                curscope = angular.element("#left-pane-container").scope();
                let obj = getSelectedMainValues();
                let selectedDimesion2 = obj.Dimesion2, selectedDimesion1 = obj.Dimesion1;
                let availableItems = scenarios.filter(function (e) { return e.Dimesion1 == selectedDimesion1 && e.Dimesion2 == selectedDimesion2 })[0];
                if (!selectedItems.some(function (e) { return e.DisplayName == "OCCASION" }) && availableItems.Occasion != 'Disabled') {
                    show_popup("Alert", customMessages.OccasionSelection)
                    return false;
                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "CATEGORY/ITEM/BRAND" }) && availableItems.Category != 'Disabled') {
                    show_popup("Alert", customMessages.CategorySelection)
                    return false;
                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "CHANNEL/RETAILER" }) && availableItems.Channel != 'Disabled') {
                    show_popup("Alert", customMessages.ChannelRetailerSelection)
                    return false;
                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "5Ws" }) && availableItems.Metric != 'Disabled') {
                    show_popup("Alert", customMessages.MetricSelection)
                    return false;
                }
                else if (availableItems.Metric != 'Disabled' && curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].data.filter(function (e) { return !e.isDisabled }).length != curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].data.filter(function (e) { return e.hasChildSelected }).length) {
                    if (!curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].isDisabled && !curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "5Ws" })[0].data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].hasChildSelected) {
                        show_popup("Alert", customMessages.Dimension2Selection)
                        return false;
                    }

                }
                else if (!selectedItems.some(function (e) { return e.DisplayName == "DEMOGRAPHICS" }) && availableItems.Demographics != 'Disabled') {
                    show_popup("Alert", customMessages.DemographicSelection)
                    return false;
                }
                else if (availableItems.Demographics != 'Disabled' && curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].data.filter(function (e) { return !e.isDisabled }).length != curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].data.filter(function (e) { return e.hasChildSelected }).length) {
                    if (!curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].isDisabled && !curscope.LeftStaticMenu.filter(function (e) { return e.DisplayName == "DEMOGRAPHICS" })[0].data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].hasChildSelected) {
                        show_popup("Alert", customMessages.Dimension2Selection)
                        return false;
                    }

                }
                if (selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion1.toUpperCase()) > -1 }).length > 0) {
                    let count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion1.toUpperCase()) > -1 })[0].Data, []).length;
                    if (selectedDimesion1 == "5Ws")
                        count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 1" })[0].Data, []).length;
                    if (count < 3) {
                        show_popup("ALERT", "Min. of 3 selections required in Dimension 1.");
                        return false;
                    }
                }
                if (selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion2.toUpperCase()) > -1 }).length > 0) {
                    count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion2.toUpperCase()) > -1 })[0].Data, []).length;
                    if (selectedDimesion2 == "5Ws")
                        count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 2" })[0].Data, []).length;
                    if (count < 3) {
                        show_popup("ALERT", "Min. of 3 selections required in Dimension 2.");
                        return false;
                    }
                }
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
            else if (parentList[0].DisplayName == "DIMENSION 1" && menusList.DisplayName != "DIMENSION 1")
                List = ["TIME PERIOD", "MARKETS", "DIMENSION 1"];
            else if (parentList[0].DisplayName == "DIMENSION 2" && menusList.DisplayName != "DIMENSION 2")
                List = ["TIME PERIOD", "MARKETS", "DIMENSION 1", "DIMENSION 2"];
            else if (parentList[0].DisplayName == "OCCASION" && menusList.DisplayName != "OCCASION")
                List = ["TIME PERIOD", "MARKETS", "DIMENSION 1", "DIMENSION 2", "OCCASION"];
            else if (parentList[0].DisplayName == "CATEGORY/ITEM/BRAND" && menusList.DisplayName != "CATEGORY/ITEM/BRAND")
                List = ["TIME PERIOD", "MARKETS", "DIMENSION 1", "DIMENSION 2", "OCCASION", "CATEGORY/ITEM/BRAND"];
            else if (parentList[0].DisplayName == "CHANNEL/RETAILER" && menusList.DisplayName != "CHANNEL/RETAILER")
                List = ["TIME PERIOD", "MARKETS", "DIMENSION 1", "DIMENSION 2", "OCCASION", "CATEGORY/ITEM/BRAND", "CHANNEL/RETAILER"];
            else if (parentList[0].DisplayName == "5Ws" && menusList.DisplayName != "5Ws")
                List = ["TIME PERIOD", "MARKETS", "DIMENSION 1", "DIMENSION 2", "OCCASION", "CATEGORY/ITEM/BRAND", "CHANNEL/RETAILER", "5Ws"];

            return List;
        }

        $scope.hasSearch = function (menusList, parent_list) {
            var searchList = searchSelectAllList.filter(function (e) { return e.Search }).select("DisplayName").distinct().concat(["CHANNEL/RETAILER", "CATEGORY/ITEM/BRAND"]);
            if (searchList.indexOf(menusList.DisplayName) > -1 && !(menusList.DisplayName == "5Ws" && menusList.isDefaultLevel))
                return true;
            return false;
        }

        function validateRowColumn(menusList, parentList, parent) {
            if (parentList[0].DisplayName == parent && parentList[parentList.length - 2].DisplayName == parent) {
                var enabledList = parentList[parentList.length - 2].data.filter(function (e) { return !e.isDisabled }).select("DisplayName");
                let obj = getSelectedMainValues();
                let selectedDimesion1 = obj.Dimesion1, selectedDimesion2 = obj.Dimesion2;
                if (enabledList.indexOf("Dimension 1") > -1 && menusList.DisplayName.toUpperCase() != "DIMENSION 1" && selectedItems.filter(function (e) { return e.DisplayName == parent }).length == 0) {
                    show_popup("Alert", customMessages.Dimension1Selection);
                    return false;
                }
                else if (selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion1.toUpperCase()) > -1 }).length > 0 && parentList[1].DisplayName.toUpperCase() != "DIMENSION 1") {
                    let count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimesion1.toUpperCase()) > -1 })[0].Data, []).length;
                    if (selectedDimesion1 == "5Ws")
                        count = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName == "5Ws" })[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 1" })[0].Data, []).length;
                    if (count < 3) {
                        show_popup("ALERT", "Min. of 3 selections required in Dimension 1.");
                        return false;
                    }
                }
                else if (enabledList.indexOf("Dimension 2") > -1 && menusList.DisplayName.toUpperCase() != "DIMENSION 2" && menusList.DisplayName.toUpperCase() != "DIMENSION 1" && (selectedItems.filter(function (e) { return e.DisplayName == parent }).length == 0 || selectedItems.filter(function (e) { return e.DisplayName == parent })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 2" }).length == 0)) {
                    show_popup("Alert", customMessages.Dimension2Selection);
                    return false;
                }
            }
            let index = 0;
            if (!menusList.isDefaultLevel && parentList[0].DisplayName == parent && parentList.length > 2) {
                if (menusList.IsSelectable && (parentList.select("DisplayName").indexOf("Dimension 1") > -1 || parentList.select("DisplayName").indexOf("Category") > -1)) {
                    if (parentList.select("DisplayName").indexOf("Category") > -1)
                        index = 1;
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
                else if (menusList.IsSelectable && (parentList.select("DisplayName").indexOf("Dimension 2") > -1 || parentList.select("DisplayName").indexOf("Item") > -1)) {
                    if (parentList.select("DisplayName").indexOf("Item") > -1)
                        index = 1;
                    if (parentList[index].data.length > 2) {
                        parentList[index].data[2].data = [];
                        parentList[index].data[2].hasChildSelected = false;
                        parentList[index].data[2].hasSubMenusActive = false;
                        parentList[index].data[2].isTabSelected = false;
                    }
                }
            }
            return true;
        }

        // creating the request Obj for output start
        function returnRequestObject() {
            var request = {};
            request.Dimension1 = "";
            request.Dimension2 = "";
            request.TimePeriod = "";
            request.Market = "";
            request.AdditionalFilter = "";
            request.SelectionSummary = $(".summay-content-text").text().trim();
            request.SelectedItems = JSON.stringify(selectedItems);

            let obj = getSelectedMainValues();
            let selectedDimension1 = obj.Dimesion1;
            let selectedDimension2 = obj.Dimesion2;

            /*get column selections start*/
            if (selectedDimension1.indexOf("Manufacturer") > -1)
                selectedDimension1 = selectedDimension1.split('-')[0];
            let columnSelections = selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimension1.toUpperCase()) > -1 });
            if (selectedDimension1 == "5Ws")
                request.Dimension1 = $scope.getPKsAndName(columnSelections[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 1" })[0].Data, []).select("FilterID").join(",");
            else
                request.Dimension1 = $scope.getPKsAndName(columnSelections, []).select("FilterID").join(",");
            /*get column selections end*/

            /*get row selections start*/
            if (selectedDimension2.indexOf("Manufacturer") > -1)
                selectedDimension2 = selectedDimension2.split('-')[0];
            let rowSelections = selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(selectedDimension2.toUpperCase()) > -1 });
            if (selectedDimension2 == "5Ws")
                request.Dimension2 = $scope.getPKsAndName(rowSelections[0].Data.filter(function (e) { return e.DisplayName.toUpperCase() == "DIMENSION 2" })[0].Data, []).select("FilterID").join(",");
            else
                request.Dimension2 = $scope.getPKsAndName(rowSelections, []).select("FilterID").join(",");
            /*get row selections end*/


            /*get time period selections start*/

            let timeperiodSelections = selectedItems.filter(function (e) { return e.DisplayName == "TIME PERIOD" });
            request.TimePeriod = $scope.getPKsAndName(timeperiodSelections, []).select("FilterID").join(",");

            /*get time period selections end*/

            /*get market selections start*/
            //if (selectedColumn != "Market") {
            //    let marketSelections = selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" });
            //    request.Market = $scope.getPKsAndName(marketSelections, []).select("FilterID").join(",");
            //}
            let marketSelections = selectedItems.filter(function (e) { return e.DisplayName == "MARKETS" });
            if (marketSelections[0].Data[0].DisplayName != "Select All Markets")
                request.Market = $scope.getPKsAndName(marketSelections, []).select("FilterID").join(",");
            else
                request.Market = MarketRegionList.filter(function (e) { return !e.isDisabled }).select("FilterID").join(',');
            /*get market selections end*/

            /*get additional filter selections start*/
            request.AdditionalFilter = $scope.AdditionalFilterRequest().FilterID;
            /*get additional filter selections end*/



            return request;
        }

        var prepareDataForScatter = function (rData, NoOfEst) {
            var temp_data = [];
            let obj = getSelectedMainValues();
            let dim1 = obj.Dimesion1;
            let dim2 = obj.Dimesion2;
            let dim1List, dim2List;

            if (dim1.indexOf("Manufacturer") > -1)
                dim1 = dim1.split('-')[0];
            if (dim1 != "5Ws" && dim1 != "Demographics")
                dim1List = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.indexOf(dim1.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), []).select("DisplayName");
            else {
                dim1List = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(dim1.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 1" })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), []).select("DisplayName");
            }

            if (dim2.indexOf("Manufacturer") > -1)
                dim2 = dim2.split('-')[0];
            if (dim2 != "5Ws" && dim2 != "Demographics")
                dim2List = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.indexOf(dim2.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), []).select("DisplayName");
            else {
                dim2List = $scope.getPKsAndName(selectedItems.filter(function (e) { return e.DisplayName.toUpperCase().indexOf(dim2.toUpperCase()) > -1 })[0].Data.filter(function (e) { return e.DisplayName == "Dimension 2" })[0].Data.filter(function (e) { return e.DisplayName.indexOf("Select All") == -1 }), []).select("DisplayName");
            }
            var degreeOfFreedom = (dim1List.length - 1) * (dim2List.length - 1);
            var hd = rData.map(function (d) {
                var g = {
                    species: d.name.replace(/\"/g, ""), xVal: +d.x, yVal: +d.y, radialWidth: 5, colorDot: "#c00000", nearEle: [], distance: Math.sqrt(Math.pow(d.x, 2) + Math.pow(d.y, 2)), chiDist: d.chiDist
                };
                if (parseFloat(d.chiDist) >= parseFloat(distData.responseJSON.Distribution.filter(function (e) { return e.DF == degreeOfFreedom || e.DF == Math.round(degreeOfFreedom / 50) * 50; })[0]["0.05"]))
                    temp_data.push(g);
            });
            temp_data.forEach(function (d, i) {
                if (i >= temp_data.length - NoOfEst) {
                    d.colorDot = "#FFC000";
                }
            });
            /**/
            var j = 0;
            temp_data.forEach(function (d, i) {
                var Temp_n3 = [];
                if (d.colorDot == "#FFC000") {
                    for (j = 0; j < temp_data.length - NoOfEst; j++) {
                        var obj_d = {
                            Text: temp_data[j].species, dis: 0
                        };
                        obj_d.dis = Math.sqrt((d.xVal - temp_data[j].xVal) * (d.xVal - temp_data[j].xVal) + (d.yVal - temp_data[j].yVal) * (d.yVal - temp_data[j].yVal));
                        Temp_n3.push(obj_d);
                    }
                }
                if (d.colorDot == "#c00000") {
                    for (j = temp_data.length - NoOfEst; j < temp_data.length; j++) {
                        var obj_d = {
                            Text: temp_data[j].species, dis: 0
                        };
                        obj_d.dis = Math.sqrt((d.xVal - temp_data[j].xVal) * (d.xVal - temp_data[j].xVal) + (d.yVal - temp_data[j].yVal) * (d.yVal - temp_data[j].yVal));
                        Temp_n3.push(obj_d);
                    }
                }
                //sort top 3
                Temp_n3.sort(function compare(a, b) {
                    if (a.dis < b.dis)
                        return -1;
                    if (a.dis > b.dis)
                        return 1;
                    return 0;
                });
                //Store top 3;
                d.nearEle.push(Temp_n3[0], Temp_n3[1], Temp_n3[2]);
            });
            /**/
            return temp_data;

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
    angular.element(".body-footer").show();
    let element = angular.element(document.getElementsByClassName("footerContent"));
    angular.element(element).find("#nsample-size").remove();
    angular.element(element).find(".occasionChange:eq(0)").text("Output is displayed based on dependence between variables @ 95% CL");
    $(".footerContent > div:gt(2)").remove();
}

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

var scatterPlotChart = function (originalData, val) {
    $("#chart-container").html("");
    $(".Top_Header").css("display", "inline-block");
    data = angular.copy(originalData);
    data.forEach(function (d) {
        d.yVal = +d.yVal;
        d.xVal = +d.xVal;
        d.radialWidth = +0.37;
        d.species = d.species;
        d.colorDot = d.colorDot;
    });
    var max_rad = d3.max(data, function (d) { return d.radialWidth });
    //var margin = { top: 30, right: 100, bottom: 60, left: 100 },
    var margin = { top: 25, right: 150, bottom: 20, left: 150 },
        width = $("#chart-container").width() - margin.left - margin.right,
        height = $("#chart-container").height() - margin.top - margin.bottom;
    if (val != 1) {
        width *= Math.pow(1.1, val);
        height *= Math.pow(1.1, val);
    }
    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis().orient("bottom")
        .scale(x).outerTickSize(0).ticks(0);

    var yAxis = d3.svg.axis().orient("left")
        .scale(y).outerTickSize(0).ticks(0);
    var svg = d3.select("#chart-container").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(d3.extent(data, function (d) { return d.xVal; })).nice();
    y.domain(d3.extent(data, function (d) { return d.yVal; })).nice();
    /////////////////////////////////////////////
    var X_max = 0, X_min = 0, Y_max = 0, Y_min = 0;
    X_max = d3.max(x.domain());
    X_min = d3.min(x.domain());
    Y_max = d3.max(y.domain());
    Y_min = d3.min(y.domain());
    /*checking for origin trnlst*/
    var xTranFact = 0, yTranFact = height;
    if ((X_max > 0 && X_min < 0)) { xTranFact = (-X_min / (X_max - X_min)) * width; }
    if ((Y_max > 0 && Y_min < 0)) { yTranFact = (Y_max / (Y_max - Y_min)) * height; }
    /*checking for origin trnlst*/
    /////////////////////////////////////////////
    var tool_tip = d3.select("#chart-container").append("div")
        .attr("class", "d3_tooltip")
        .style("opacity", 0);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + yTranFact + ")")
        .style("fill", "transparent")
        //.style("stroke", "#BBBDBF")
        .style("stroke", "transparent")
        .style("stroke-width", "0.07vw")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Sepal Width (cm)");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + xTranFact + ",0)")
        .style("fill", "transparent")
        //.style("stroke", "#BBBDBF")
        .style("stroke", "transparent")
        .style("stroke-width", "0.07vw")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Sepal Length (cm)")


    svg.selectAll(".dot1").data(data)
        .enter().append("circle")
        .attr("class", "outer-circle")
        .attr("r", function (d) {
            return (d.radialWidth + 0.185) + "vw";
        })
        .attr("cx", function (d) { return x(d.xVal); })
        .attr("cy", function (d) {
            /*Text*/
            var context = d3.select(this.parentNode);
            context.append("text")
                .attr("class", "dot_text")
                .attr("x", x(d.xVal))
                .attr("y", y(d.yVal) - (d.radialWidth * document.documentElement.clientWidth) / 100 - 2)
                .text(d.species)
                .style("fill", "#000").style("text-anchor", "middle").style("text-transform", "uppercase").style("font-size", "0.8vw");
            /*Text*/
            return y(d.yVal);
        })
        .style("fill", function (d) {
            return "#fff";
        })
        .style("stroke", function (d) {
            if (d.colorDot == "#c00000") { return "#c00000"; } return "#ffc000";
        })
        .style("stroke-width", function (d) { return "0.07vw"; })
        .style("opacity", 0.6)
        .on("mouseover", function (d) {
            tool_tip.transition()
                .duration(200)
                .style("opacity", 1);
            //tool_tip.html("1." + d.nearEle[0].Text + "<br/>2." + d.nearEle[1].Text + "<br/>3." + d.nearEle[2].Text)
            tool_tip.html(d.species)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 35) + "px");
        })
        .on("mouseout", function (d) {
            tool_tip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function (d) { return (d.radialWidth - 0.07) + "vw"; })
        .attr("cx", function (d) { return x(d.xVal); })
        .attr("cy", function (d) { return y(d.yVal); })
        .style("fill", function (d) { return "#fff"; })
        .style("stroke", function (d) { if (d.colorDot == "#c00000") { return "#c00000"; } return "#ffc000"; })
        .style("stroke-width", function (d) { return "0.3vw"; })
        .on("mouseover", function (d) {
            tool_tip.transition()
                .duration(200)
                .style("opacity", 1);
            //tool_tip.html("1." + d.nearEle[0].Text + "<br/>2." + d.nearEle[1].Text + "<br/>3." + d.nearEle[2].Text)
            tool_tip.html(d.species)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 35) + "px");
        })
        .on("mouseout", function (d) {
            tool_tip.transition()
                .duration(500)
                .style("opacity", 0);
        });


    svg.append("rect")
        .attr("x", xTranFact - 15)
        .attr("y", yTranFact - 1)
        .attr("width", 30)
        .attr("height", 2)
        .style("fill", "#F39D1F")
    svg.append("rect")
        .attr("x", xTranFact - 1)
        .attr("y", yTranFact - 15)
        .attr("width", 2)
        .attr("height", 30)
        .style("fill", "#F39D1F")
    //var legend = svg.selectAll(".legend")
    //    .data(color.domain())
    //  .enter().append("g")
    //    .attr("class", "legend")
    //    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    //legend.append("rect")
    //    .attr("x", width - 18)
    //    .attr("width", 18)
    //    .attr("height", 18)
    //    .style("fill", color);

    //legend.append("text")
    //    .attr("x", width - 24)
    //    .attr("y", 9)
    //    .attr("dy", ".35em")
    //    .style("text-anchor", "end")
    //    .text(function (d) { return d; });
}
