var commonService = angular.module('commonService', [])
.service('commonService', function () {
    /*replace special characters start*/
    this.replaceCharacters = function (a) {
        return a.replace(/[^\w\s]/gi, '')
    };
    /*replace special characters end*/

    /*close custom popup start*/
    this.close_popup = function () {
        angular.element(document.getElementsByClassName("custom-popup")).removeClass("show_element");
        angular.element(document.getElementsByClassName("samplesize-popup")).removeClass("show_element");
        angular.element(".custom-popup .popup-container .middleAlign").text("");
        angular.element(document.getElementsByClassName("popup-container")).empty();
        showBackgroundShadow(false, false);
    }
    /*close custom popup end*/

    /* overlay show start */
    this.showOverlay = function () {
        angular.element(document.getElementsByClassName("overlay1")).addClass("show_element");
    }
    /* overlay show end */

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
                    var d = response;//if -1 You entered wrong password// if 0 password could not be changed //if 1 password successfully changed

                    if (d == -1) {
                        $scope.curPwdstyl = {
                            "background-color": "coral",
                            "border-color": "red"
                        }
                        myEl.text('Enter correct password');
                        $scope.showInvalidPwdText = true;
                        $scope.crntPass = "";
                        angular.element("body").click();
                    }
                    else if (d == 0) {
                        myEl.text('Password could not be changed. Please try after some time.');
                        $scope.showInvalidPwdText = true;
                    }
                    else if (d == 1) {
                        //password successfully changed
                        show_popup("Alert", "Password successfully changed.");
                        //closechangePwdBox();
                        angular.element(".changePwdCross").click();
                        $scope.crntPass = $scope.newPass = $scope.reNewPass = "";
                        showBackgroundShadow(true, false);
                    }

                },
                error: function () {
                    //Hide loader
                    $(".default-loader-icon, .default-background").hide();
                    show_popup("Alert", customMessages.Error);
                }
            });
        }
    }

});

function show_popup(msg_header, msg_content) {
    showBackgroundShadow(true, false);
    $(".custom-popup > div.popup-header").show();
    angular.element(document.getElementsByClassName("custom-popup")).addClass("show_element");
    angular.element(".custom-popup .popup-container").html("<div class='middleAlign'  title='" + msg_content + "'>" + msg_content + "</div>");
    angular.element(".custom-popup .popup-header .middleAlign").text(msg_header);
    $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
    $(".custom-popup:visible .popup-container").css({ "height": ($(".custom-popup:visible").height() / document.documentElement.clientWidth) * 100 - 3 + "vw", "max-height": ($(".custom-popup:visible").height() / document.documentElement.clientWidth) * 100 - 3 + "vw" });
}
function showBackgroundShadow(flag, showLoaderIcon) {
    if (flag || angular.element(".popup-container").is(":visible"))
        angular.element(document.getElementsByClassName("default-background")).addClass("show_element");
    else
        angular.element(document.getElementsByClassName("default-background")).removeClass("show_element");

    if (showLoaderIcon) {
        angular.element(document.getElementsByClassName("default-loader-icon")).addClass("show_element");
        angular.element(document.getElementsByClassName("overlay1")).addClass("show_element");
    }
    else {
        angular.element(document.getElementsByClassName("default-loader-icon")).removeClass("show_element");
        angular.element(document.getElementsByClassName("overlay1")).removeClass("show_element");
    }

}
function replaceWithDouble_SingleCharacters(str) {
    if (str != undefined) {
        str = str.replace(/\'/g, "\\'")
        str = str.replace(/\"/g, '\\"')
    }
    return str;
}

/*snapshot charts*/

function bindCircleChart(widgetData, element) {
    if (widgetData.length < 14)
        return;
    widgetData = widgetData.chop(widgetData.length / 2)[0].concat(widgetData.chop(widgetData.length / 2)[1].reverse());
    let colorList = ['#C00000', '#E84518', '#FF9933', '#FF9933', '#FFC000', '#FFC000', '#4EB9D2', '#BFBFBF', '#7F7F7F', '#404040', '#002D4C', '#005086', '#3558EB', ' #4D8DD3'];
    let widgetBody = '<div class="widget-body">';
    let addIndex = 0;
    for (i = 0; i < 2; i++) {
        if (i == 1)
            addIndex = widgetData.length / 2;
        widgetBody += '<div class="portion">' +
                            '<div class="leftPortion">' +
                                (i == 0 ? '<div class="columnShadow"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>' : '') +
                                '<div class="subPortion"></div>' +
                                '<div class="subPortion"><div class="middleAlign">Occasion Size</div></div>' +
                                '<div class="subPortion"><div class="middleAlign">% of Occasion @Home</div></div>' +
                            '</div>' +
                            '<div class="rightPortion">';

        for (j = 0; j < widgetData.length / 2; j++) {
            let record = widgetData[j + addIndex];
            let obj = formatCellValues(record, 2);
            let obj1 = formatCellValues(record, 0);
            widgetBody += '<div class="circleContainer" id="circleContainer_' + (addIndex == 0 ? j + 1 : widgetData.length - j) + '">' +
                          '<div class="circleText" title="' + record.Attribute + '"><div class="middleAlign">' + (record.Attribute.indexOf("/") > -1 ? record.Attribute.replace("/", " / ") : record.Attribute) + '</div></div>' +
                          '<div class="circleDiv">' +
                            '<div class="emptyArea">' + ((j + addIndex + 1) > widgetData.length / 2 ? '<div class="circle-connector middleAlign"></div>' : '') + '</div>' +
                            //'<div class="circleArea"><div class="circle" id="circles-' + (j + addIndex + 1) + '"></div></div>' +
                            '<div class="circleArea"><div class="circle-text"><div class="middleAlign"><span class="percentage" style="color:' + obj1.colorClass + '">' + obj1.value + '</span>' + (obj1.change != "" ? '<br/><span class="change">(' + obj1.change + ')</span>' : '') + '</div></div><div class="circle" id="circles-' + (j + addIndex + 1) + '"></div></div>' +
                            '<div class="emptyArea">' + ((j + addIndex + 1) <= (widgetData.length / 2 + 1) || (j + addIndex + 1) == 14 ? '<div class="circle-connector middleAlign"></div>' : '') + '</div>' +
                          '</div>' +
                          '<div class="circlePercentage"><div class="middleAlign"><span class="percentage"  style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + '</div></div>' +
                      '</div>';
        }
        widgetBody += '</div>';
        if (i == 0)
            widgetBody += '<div class="connectorLine"></div>';
        widgetBody += '</div>';
    }
    widgetBody += '</div>';
    element.append(widgetBody);
    let width = element.find(".circleArea").width();
    let height = element.find(".circleArea").height();
    let radius = Math.min(width, height) / 2;
    angular.forEach(widgetData, function (a, b) {
        let obj = formatCellValues(a, 0);

        var svg = d3.select('#circles-' + (b + 1))
                .append("svg")
                  .attr("width", width)
                  .attr("height", height)
                .append("g")
                  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Create dummy data
        value = obj.value.indexOf("%") > -1 ? obj.value.split("%")[0] : 0
        var data = { a: 100, b: value }

        // set the color scale
        var color = d3.scale.ordinal()
          .domain(data)
          .range(["#dddddd", colorList[b]])

        // Compute the position of each group on the pie:
        var pie = d3.layout.pie()
          .value(function (d) { return d.value })
        var data_ready = pie(d3.entries(data))

        var myScale = d3.scale.linear().domain([0, 100]).range([0, 2 * Math.PI]);
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
          .selectAll('whatever')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
          .attr('preserveAspectRatio', 'xMinYMin')
          .attr('d', d3.svg.arc()
            .innerRadius(radius - 3)         // This is the size of the donut hole
            .outerRadius(radius)
          )
          .attr('fill', function (d) { return (color(d.data.key)) })


    })
    let connectorHeight = (element.find("#circles-8").position().top + element.find("#circles-8").height() / 2 - element.find("#circles-1").position().top + element.find("#circles-1").height() / 2 - 59);
    connectorHeight = (connectorHeight / document.documentElement.clientWidth) * 100 + "vw";
    angular.element(document.getElementsByClassName("connector")).css("height", connectorHeight)
}


function bindWidget2(widgetData, element, widget) {
    let widgetBody = '<div class="widget-body">';
    widgetBody += '<div class="leftPortion-widget-2">' +
                                '<div class="columnShadow"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>';
    let genderColorList = ["#c00000", "#FF9933"];
    let generationsColorList = ["#c00000", "#e84518", "#FF6600", "#FF9933", "#FFC000"].reverse();
    let triangleDivHeight = (($("#widget_2").height() - 40) / 2) * 0.5;
    triangleDivHeight = (triangleDivHeight / document.documentElement.clientWidth) * 100;
    let triangleDivWidth = ($("#widget_2").width() * 2 / 15) * 0.7;
    triangleDivWidth = (triangleDivWidth / document.documentElement.clientWidth) * 100;
    angular.forEach(widgetData.filter(function (e) { return e.ProfileOrder == 2 }), function (a, b) {
        let obj = formatCellValues(a, 0);
        calctriangleHeight = 0;
        if (obj.value != "NA" && obj.value != "LS")
            calctriangleHeight = ((triangleDivHeight * obj.value.split("%")[0]) / 100);
        let outerStyle = 'border-left: ' + triangleDivWidth + 'vw solid transparent;border-right: ' + triangleDivWidth + 'vw solid transparent;border-bottom: ' + triangleDivHeight + 'vw solid #eee;';
        let innerStyle = 'border-left: ' + triangleDivWidth + 'vw solid transparent;border-right: ' + triangleDivWidth + 'vw solid transparent;border-bottom: ' + calctriangleHeight + 'vw solid ' + genderColorList[b] + ';left: 0vw;top: ' + (triangleDivHeight - calctriangleHeight) + 'vw;'
        widgetBody += '<div class="subPortion">';
        if (b == 0)
            widgetBody += '<div class="bottomShadow"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div>';
        widgetBody += '<div class="triangleDiv"><div class="middleAlignHorizontal" style="position: absolute;">' +
                    '<div id="triangle-up" class="outer" style="' + outerStyle + '"></div>' +
                        '<div id="triangle-up" class="inner"  style="' + innerStyle + '"></div>' +
                 '</div></div>' +
                 '<div class="textDiv">' +
                    '<div class="middleAlignHorizontal" style="position: relative;"><div title="' + a.Attribute + '">' + a.Attribute + '</div><br/><div><span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + '</div></div>' +
                 '</div>' +
                 '</div>'
    })
    widgetBody += '</div>' +
                            '<div class="rightPortion-widget-2">' +
                                    '<div class="subPortion"><div class="bottomShadow"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div>' +
                                        '<div class="stackDiv">' +
                                            '<div class="stackBar">';

    let genBody = "";
    let prevBottom = 0;
    angular.forEach(widgetData.filter(function (e) { return e.ProfileOrder == 3 }).reverse(), function (a, b) {
        let customStyle = 'height:0%;background:white;';
        let obj = formatCellValues(a, 0);
        if (obj.value != "NA" && obj.value != "LS") {
            customStyle = 'height:' + obj.value.split("%")[0] + '%;background:' + generationsColorList[b] + ';bottom:' + prevBottom + '%;';
            prevBottom += parseInt(obj.value.split("%")[0]);
        }
        widgetBody += '<div class="stack" style="' + customStyle + '"></div>';
        genBody = '<div class="generation">' +
                        '<div class="genDotDiv"><div class="middleAlign"><div class="genDot" style="background:' + generationsColorList[b] + '"></div></div></div>' +
                        '<div class="genText" title="' + a.Attribute + '"><div class="middleAlign">' + a.Attribute + '</div></div>' +
                        '<div class="genPercentage"><div class="middleAlign">' + '<span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + '</div></div></div>' + genBody;
    })
    widgetBody += '</div></div><div class="GenNameDiv">' + genBody + '</div>';
    widgetBody += '</div>' +
'<div class="subPortion">';
    widgetBody += '<div class="sub-subPortion"><div class="middleAlignHorizontal" style="position: absolute;">' +
                       '<div class="householdIncomeIcon"></div></div>' +
                     '</div>';
    widgetBody += '<div class="sub-subPortion">' +
                            '<div class="houseHoldText"><div class="middleAlign">Average Household Income</div></div>';
    let marketInfo = "";
    if ($(".module-name").text().trim() == "My Dashboard")
        marketInfo = widget.SelectionSummary.split(" || ")[1];
    else
        marketInfo = SnapshotRequest != undefined ? SnapshotRequest.SelectionSummary.split(" || ")[1] : [];
    if (widgetData.filter(function (e) { return e.ProfileOrder == 4 }).length > 0 && marketInfo.split(":").length > 2 && marketInfo.split(",").length == 1) {
        let record = widgetData.filter(function (e) { return e.ProfileOrder == 4 })[0];
        let obj = formatCellValues(record, 0, marketInfo);
        widgetBody += '<div class="incomeText"><div class="middleAlign"><span class="percentage">' + obj.value + '</span>' +
                                    /*(obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + */'</div></div>';
    }
    else {
        widgetBody += '<div class="notApplicable"><div class="middleAlign">Not Applicable</div></div>';
    }
    widgetBody += '</div></div>';//sub-subPortion
    widgetBody += '</div></div>';//rightPortion-widget-2
    widgetBody += '</div>';//widgetbody
    element.append(widgetBody);
}

function bindWidget3(widgetData, element) {
    let widgetBody = '<div class="widget-body">';

    let squareDivHeight = Math.floor((($("#widget_3").height() - 40) / 3 * .75 - 5.5 * 2) / 5.5);
    //let squareDivWidth = (($("#widget_3").width() - 10) * 0.8 - 20 * 2) / 20
    let colorList = ["#c00000", "#FF9933", "#FF6600"]
    angular.forEach(widgetData, function (a, b) {
        let obj = formatCellValues(a, 0);
        let square = "";

        let count = 1;
        for (var j = 1; j <= 20; j++) {
            square += '<div class="squareContainer">';
            for (var i = 1; i <= 5; i++) {
                let color = "#dddddd";
                if (obj.value.indexOf("%") > -1 && count <= obj.value.split("%")[0])
                    color = colorList[b];
                square += '<div class="square" id="square_' + (count++) + '" style="height:' + ((squareDivHeight - 1) / document.documentElement.clientWidth) * 100 + 'vw;background:' + color + '"></div>';
            }
            square += '</div>';
        }


        widgetBody += '<div class="subPortion">' +
                        '<div class="AttributeName" title="' + a.Attribute + '"><div class="middleAlign">' + a.Attribute + '</div></div>' +
                        '<div class="squareChartDiv">' +
                            '<div class="squareArea">' + square + '</div>' +
                            '<div class="squarePercentage">' +
                                '<div class="middleAlign">' +
                                    '<span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + ' </span><br/>' +
                                    (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') +
                                '</div>' +
        '</div>' +
    '</div>';
        if (b < widgetData.length - 1)
            widgetBody += '<div class="bottomShadow"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div>'
        widgetBody += '</div>'
    })

    widgetBody += '</div>';//widgetbody
    element.append(widgetBody);
}

function bindWidget4(widgetData, element, widget) {
    let widgetBody = '<div class="widget-body">';
    let marketInfo = "";
    if ($(".module-name").text().trim() == "My Dashboard")
        marketInfo = widget.SelectionSummary.split(" || ")[1];
    else
        marketInfo = SnapshotRequest != undefined ? SnapshotRequest.SelectionSummary.split(" || ")[1] : [];
    if (((marketInfo.split(":").length == 2 && marketInfo.indexOf("North America") > -1) || (marketInfo.split(',').length > 1 && marketInfo.indexOf("Canada") > -1) || marketInfo.indexOf("All Markets") > -1) && (selectedModuleId == "6" || MarketRegionList.select("DisplayName").indexOf("Canada") > -1)) {
        widgetBody += '<div class="notAvailable"><div class="middleAlign">Not Applicable</div></div></div>'
        element.append(widgetBody);
        return;
    }
    angular.forEach(widgetData, function (a, b) {
        let obj = formatCellValues(a, 0);
        widgetBody += '<div class="subPortion"  style="height:calc(100% / ' + widgetData.length + ')">'
        if (b < widgetData.length - 1)
            widgetBody += '<div class="bottomShadow"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div>';
        widgetBody += '<div class="donutDiv" id="donutDiv_' + b + '"></div>' +
        '<div class="textDiv"><div class="middleAlign"><div class="whenText" title="' + a.Attribute + '">' + a.Attribute + '</div><div><span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + '</div></div></div>' + '</div>'
    })
    widgetBody += '</div>';//widgetbody
    element.append(widgetBody);
    let colors = ["#c00000", "#FF9933", "#FF6600"]
    angular.forEach(widgetData, function (a, b) {
        width = angular.element(document.getElementById("donutDiv_" + b)).width() - 4;
        height = angular.element(document.getElementById("donutDiv_" + b)).height() - 4;
        a.color = colors[b];
        angular.element(document.getElementById("donutDiv_" + b)).append(bindRadialChart(a, 4, height, width));
    })
}

function drawBarChart(widgetData) {
    let colorList = ["#c00000", "#e84518", "#FF6600", "#FF9933", "#FFC000", "#CDCB05", "#5D929A", "#6788BB", "#4651C5"];
    let ratio = returnAppropriateValues(widgetData, 0);
    let customHtml = "";
    maxArea = "100%";
    if (widgetData[0].WidgetNumber == 9)
        maxArea = "(100% - 1.9vw)";
    angular.forEach(widgetData, function (a, b) {
        let obj = formatCellValues(a, 0);
        customHtml += '<div class="subPortion"  style="height:calc(' + maxArea + ' / ' + widgetData.length + ');' + (b + 1 == widgetData.length ? "border-bottom-right-radius: 0.7vw;    border-bottom-left-radius: 0.7vw;" : "") + '">';
        customHtml += '<div class="textDiv-widget-5" title="' + a.Attribute + '"><div class="middleAlign">' + a.Attribute + '</div></div>';
        let barProperty = { width: (obj.value.indexOf("%") > -1 ? ratio * obj.value.split("%")[0] : 0), color: colorList[b] }
        customHtml += '<div class="barDiv-widget-5" id="barDiv_' + b + '">' +
            '<div class="barLineDiv" style="width:' + barProperty.width + '%;"><div class="middleAlign"><div class="bar"  style="background:' + barProperty.color + ';width:100%;height:0.15vw;"></div></div></div>';
        if (obj.value.indexOf("%") > -1)
            customHtml += '<div class="barMarkerDiv"><div class="middleAlign"><div class="barMarker" id="barMarker_' + b + '"></div></div></div>';
        customHtml += '</div>' +
        '<div class="percentageDiv-widget-5"><div class="middleAlign"><span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + '</div></div>' + '</div>'
    })
    return customHtml;
}

function bindWidget5(widgetData, element) {

    let widgetBody = '<div class="widget-body">';
    widgetBody += '<div class="columnShadow" style="left: calc(36% + 0.07vw);height: 100%;"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>'
    widgetBody += drawBarChart(widgetData);
    widgetBody += '</div>';//widgetbody
    element.append(widgetBody);
}

function bindWidget6_8_10(widgetData, element, widget) {
    let widgetBody = '<div class="widget-body">';
    if (angular.element(element).attr("id") != "widget_6") {
        let marketInfo = "";
        if ($(".module-name").text().trim() == "My Dashboard")
            marketInfo = widget.SelectionSummary.split(" || ")[1];
        else
            marketInfo = SnapshotRequest != undefined ? SnapshotRequest.SelectionSummary.split(" || ")[1] : [];
        if (((marketInfo.split(":").length == 2 && marketInfo.indexOf("North America") > -1) || (marketInfo.split(',').length > 1 && marketInfo.indexOf("Canada") > -1) || marketInfo.indexOf("All Markets") > -1) && (selectedModuleId == "6" || MarketRegionList.select("DisplayName").indexOf("Canada") > -1)) {
            widgetBody += '<div class="notAvailable"><div class="middleAlign">Not Applicable</div></div></div>'
            element.append(widgetBody);
            return;
        }
    }
    widgetBody += '<div class="subPortion"  style="height:calc(100% / ' + (widgetData.length + 1) + ')">' +
    '<div class="textDiv-widget-6"></div><div class="textDiv-widget-6-right" style="margin-left: 1%;width: 14%;"><div class="DotDiv"><div class="middleAlign"><div class="genDot" style="background:#c00000"></div></div></div><div class="headText"><div class="middleAlign">This Occasion</div></div></div><div class="textDiv-widget-6-right"><div class="DotDiv"><div class="middleAlign"><div class="genDot" style="background:#BFBFBF"></div></div></div><div class="headText"><div class="middleAlign">Total</div></div></div>' +
        '</div>';
    let ratio = returnAppropriateValues(widgetData, 1);

    if (angular.element(element).attr("id") != "widget_6")
        widgetData = widgetData.sort(function (a, b) { return b.Volume - a.Volume })
    angular.forEach(widgetData, function (a, b) {
        let obj = formatCellValues(a, 0);
        let obj1 = formatCellValues(a, 1);
        widgetBody += '<div class="subPortion"  style="height:calc(100% / ' + (widgetData.length + 1) + ');' + (b + 1 == widgetData.length ? "border-bottom-right-radius: 0.73vw;    border-bottom-left-radius: 0.73vw;" : "") + '">';
        widgetBody += '<div class="textDiv-widget-6" title="' + a.Attribute + '"><div class="middleAlign">' + a.Attribute + '</div></div>';
        let barProperty = { volWidth: (obj.value.indexOf("%") > -1 ? ratio * obj.value.split("%")[0] : 0), volTotalWidth: (obj1.value.indexOf("%") > -1 ? ratio * obj1.value.split("%")[0] : 0) }
        widgetBody += '<div class="barDiv-widget-6" id="barDiv_' + b + '">' +
            '<div class="barLineDiv"><div class="middleAlign"><div class="bar" style="width:' + barProperty.volWidth + '%;' + (barProperty.volWidth == 0 ? "border:none" : "") + '"><div class="percentageDiv" style="width:' + barProperty.volTotalWidth + '%;' + (barProperty.volTotalWidth == 0 ? "border:none" : "") + '"></div></div></div></div>' +
            '</div>' +
        '<div class="percentageDiv-widget-6"><div class="middleAlign"><span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + '</div></div>' +
        '<div class="percentageDiv-widget-6"><div class="middleAlign"><span class="percentage" style="color:' + obj1.colorClass + '">' + obj1.value + '</span>' + (obj1.change != "" ? '<span class="change">(' + obj1.change + ')</span>' : '') + '</div></div>' + '</div>'
    })

    widgetBody += '<div class="columnShadow" style="left: calc(85% + 0.07vw);height: 100%;"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>'
    if (angular.element(element).attr("id") != "widget_6")
        widgetBody += '<div class="columnShadow" style="left: calc(40% + 0.07vw);height: calc(100% * ' + widgetData.length + ' / ' + (widgetData.length + 1) + ');top: calc(100% / ' + (widgetData.length + 1) + ');"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>'
    else
        widgetBody += '<div class="columnShadow" style="left: calc(20% + 0.07vw);height: calc(100% * ' + widgetData.length + ' / ' + (widgetData.length + 1) + ');top: calc(100% / ' + (widgetData.length + 1) + ');"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>'
    widgetBody += '</div>';//widgetbody
    element.append(widgetBody);
}


function bindWidget7(widgetData, element) {
    var condition = true;
    if ($(".module-name").text().trim() == "Occasion Profile" && !angular.element(".page2").is(":visible"))
        condition = false;
    if (condition) {
        let widgetBody = '<div class="widget-body">';
        let verticalShadow = '<div class="columnShadow"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>';
        let bottomShadow = '<div class="bottomShadow"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div>';
        widgetBody += '<div class="subPortion-widget-7">'
        widgetBody += '<div class="headerText"><div class="middleAlign">Category</div>' +
                        '<div class="headerBorder"></div>' +
                      '</div>';
        let categoryBody = '<div class="sub-subPortion-widget-7" style="height:calc((100% - 1.9vw) / ' + (widgetData.filter(function (e) { return e.ProfileOrder == 9 }).length + 1) + ')">' +
                                '<div class="squareChart"></div>' +
                                '<div class="thisOccasionPer"><div class="middleAlign">This Occasion</div></div>' +
                                '<div class="TotalOccasionPer"><div class="middleAlign">Total</div></div>' +
                           '</div>';

        let squareDivHeight = (($("#widget_7").height() - 40) * 0.9 / 24);
        let colorList = ["#c00000", "#e84518", "#FF6600", "#FF9933", "#FFC000"];
        angular.forEach(widgetData.filter(function (e) { return e.ProfileOrder == 9 }).sort(function (a, b) { return b.Volume - a.Volume }), function (a, b) {
            let obj = formatCellValues(a, 0);
            let obj1 = formatCellValues(a, 1);
            let squareDiv = "";
            for (var j = 1; j <= 20; j++) {
                color = "#dddddd";
                squareDiv += '<div class="square" id="square_' + j + '" style="height:' + (squareDivHeight / document.documentElement.clientWidth) * 100 + 'vw;background:#dddddd;float:left;">';
                if (obj.value.indexOf("%") > -1 && j * 5 <= obj.value.split("%")[0])
                    squareDiv += '<div style="height:100%;background:' + colorList[b] + ';width:100%"></div>'
                else if (obj.value.indexOf("%") > -1 && (j - 1) * 5 < obj.value.split("%")[0]) {
                    squareDiv += '<div style="height:100%;background:' + colorList[b] + ';width:' + (5 - Math.abs(j * 5 - obj.value.split("%")[0])) * 20 + '%"></div>'
                }
                squareDiv += '</div>';
            }

            categoryBody += '<div class="sub-subPortion-widget-7" style="height:calc((100% - 1.9vw) / ' + (widgetData.filter(function (e) { return e.ProfileOrder == 9 }).length + 1) + ')">' +
                                '<div class="squareChart">' +
                                    '<div class="categoryName" title="' + a.Attribute + '"><div class="middleAlign">' + a.Attribute + '</div></div>' +
                                    '<div class="categoryChart">' + squareDiv + '</div>' +
                                '</div>' +
                                '<div class="thisOccasionPer"><div class="middleAlign"><span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + '</div></div>' +
                                '<div class="TotalOccasionPer"><div class="middleAlign"><span class="percentage" style="color:' + obj1.colorClass + '">' + obj1.value + '</span>' + (obj1.change != "" ? '<span class="change">(' + obj1.change + ')</span>' : '') + '</div></div>' +
                           '</div>'
        })
        widgetBody += categoryBody + '</div>';


        widgetBody += '<div class="subPortion-widget-7">'
        widgetBody += '<div class="headerText"><div class="middleAlign">Relevant Brands</div>' +
                        '<div class="headerBorder"></div>' +
                      '</div>';
        let brandBody = '';
        let ratio = returnAppropriateValues(widgetData.filter(function (e) { return e.ProfileOrder == 10 }), 0);
        angular.forEach(widgetData.filter(function (e) { return e.ProfileOrder == 10 }).sort(function (a, b) { return b.Volume - a.Volume }), function (a, b) {
            let obj = formatCellValues(a, 0);
            let customStyle = 'width:0%;background:' + colorList[b] + ';'
            if (obj.value.indexOf("%") > -1)
                customStyle = 'width:' + (ratio * obj.value.split("%")[0]) + '%;background:' + colorList[b] + ';'
            let barDiv = '<div class="barDiv"><div class="percentageDiv" style="' + customStyle + '"></div></div>';
            brandBody += '<div class="sub-subPortion-widget-7"  style="height:calc((100% - 1.9vw) / ' + (widgetData.filter(function (e) { return e.ProfileOrder == 10 }).length) + ')">' +
                                '<div class="squareChart">' +
                                    '<div class="categoryName" title="' + a.Attribute + '"><div class="middleAlign">' + a.Attribute + '</div></div>' +
                                    '<div class="categoryChart">' + barDiv + '</div>' +
                                '</div>' +
                                '<div class="thisOccasionPer"><div class="middleAlign"><span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + '</div></div>' +
                           '</div>'
        })
        widgetBody += brandBody + verticalShadow + '</div>';




        let obj = formatCellValues(widgetData.filter(function (e) { return e.ProfileOrder == 12 })[0], 0)
        widgetBody += '<div class="subPortion-widget-7">'
        let shareOccasionBody = '<div class="shareOfOccasion">' +
            '<div class="kelloggsIconDiv"><div class="middleAlign"><div class="kelloggsIcon"></div></div></div>' +
            '<div class="shareValue"><div class="middleAlign"><span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change"> (' + obj.change + ')</span>' : '') + '</div></div>' +
            '<div class="sharetext"><div class="middleAlign">Share of Occasion</div></div>' +
            '</div>'


        obj = formatCellValues(widgetData.filter(function (e) { return e.ProfileOrder == 11 })[0], 0)
        let avgOccasionBody = '<div class="avgItemPerOccasion">' +
            '<div class="avgIconDiv"><div class="middleAlign"><div class="avgIcon"></div></div></div>' +
            '<div class="avgValue"><div class="middleAlign"><span class="percentage">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change"> (' + obj.change + ')</span>' : '') + '</div></div>' +
            '<div class="avttext"><div class="middleAlign">Average items per occasion</div></div>' +
            '<div class="columnShadow"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div></div>'

        let consumptiontype = "";
        angular.forEach(widgetData.filter(function (e) { return e.ProfileOrder == 13 }), function (a, b) {
            let obj = formatCellValues(a, 0);
            consumptiontype += '<div class="consumptionText" title="' + a.Attribute + '"><div class="middleAlign">' + a.Attribute + '</div></div>';
            consumptiontype += '<div class="consumptionValue"><div class="middleAlign"><span class="percentage" style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change"> (' + obj.change + ')</span>' : '') + '</div></div>';
        })

        let m = 40;
        if ($(window).width() <= 896)
            m = 10;
        var width = angular.element(document.getElementById("widget_7")).width() * 0.25,
        height = (angular.element(document.getElementById("widget_7")).height() - m) * 0.5 / 2 - 8;
        let consumptionBody = '<div class="consumption">' +
            '<div class="headerText"><div class="middleAlign">Type of Consumption</div><div class="headerBorder"></div></div>' +
            '<div class="radialChart">' + bindRadialChart(widgetData.filter(function (e) { return e.ProfileOrder == 13 }), 7, height, width) + bottomShadow + '</div>' + consumptiontype + '</div>'
        widgetBody += shareOccasionBody + avgOccasionBody + consumptionBody + verticalShadow + '<div class="bottomShadow" style="top:50%;"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div>'; +'</div';
        widgetBody += '</div>';
        element.append(widgetBody);
    }
}

function bindWidget9(widgetData, element) {
    let colorList = ["#c00000", "#e84518", "#FF6600", "#FF9933", "#FFC000"];
    let widgetBody = '<div class="widget-body">';
    let verticalShadow = '<div class="columnShadow" style="height:100%;"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>';
    let horizontalShadow = '<div class="bottomShadow"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div>';

    let m = 40;
    if ($(window).width() <= 896)
        m = 20;
    var width = angular.element(document.getElementById("widget_9")).width() * 0.2,
    height = (angular.element(document.getElementById("widget_9")).height() - m) * 0.5;
    let radialPlot = bindRadialChart(widgetData.filter(function (e) { return e.ProfileOrder == 15 }), 9, height, width);
    let purchaserBody = "";
    angular.forEach(widgetData.filter(function (e) { return e.ProfileOrder == 15 }), function (a, b) {
        let obj = formatCellValues(a, 0);
        purchaserBody += '<div class="purchaser">' +
                            '<div class="purchaserName"  title="' + a.Attribute + '">' +
                                '<div class="middleAlign">' + a.Attribute + '</div>' +
                                '<div class="headLeftBorder" style="background:' + colorList[b] + ';"></div>' +
                            '</div>' +
                            '<div class="purchaserValue"><div class="middleAlign"><span class="percentage"  style="color:' + obj.colorClass + '">' + obj.value + '</span>' + (obj.change != "" ? '<span class="change">(' + obj.change + ')</span>' : '') + '</div></div>' +
                         '</div>'
    })
    widgetBody += '<div class="subPortion-widget-9">'
    widgetBody += '<div class="headerText"><div class="middleAlign">Purchaser</div>' +
                    '<div class="headerBorder"></div>' +
                  '</div>' +
                  '<div class="radialChart-widget-9">' + radialPlot + '</div>' +
                  purchaserBody +
                  '</div>';


    widgetBody += '<div class="subPortion-widget-9">'
    widgetBody += '<div class="headerText"><div class="middleAlign">Channels</div>' +
                    '<div class="headerBorder"></div>' +
                  '</div>'
    widgetBody += drawBarChart(widgetData.filter(function (e) { return e.ProfileOrder == 16 }).sort(function (a, b) { return b.Volume - a.Volume }))
    widgetBody += verticalShadow + '<div class="columnShadow" style="height:90%;"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>' + '</div>';


    widgetBody += '<div class="subPortion-widget-9">'
    widgetBody += '<div class="headerText"><div class="middleAlign">Package Type</div>' +
                    '<div class="headerBorder"></div>' +
                  '</div>'
    let packageBody = "";


    let ratio = returnAppropriateValues(widgetData.filter(function (e) { return e.ProfileOrder == 17 }), 0);
    angular.forEach(widgetData.filter(function (e) { return e.ProfileOrder == 17 }).sort(function (a, b) { return b.Volume - a.Volume }), function (a, b) {
        let obj = formatCellValues(a, 0);
        let customStyle = "";
        if (obj.value.indexOf("%") > -1)
            customStyle = "background:" + colorList[b] + ";width:" + (ratio * obj.value.split("%")[0]) + "%;";
        packageBody += "<div class='sub-subPortion' style='height:calc((100% - 1.9vw) / " + widgetData.filter(function (e) { return e.ProfileOrder == 17 }).length + ")'>";
        packageBody += '<div class="typeName" title="' + a.Attribute + '"><div class="middleAlign">' + a.Attribute + '</div></div>' +
        '<div class="typeChart"><div class="middleAlign"><div class="barChart" style="' + customStyle + '"></div></div>' + '<div class="columnShadow" style="top: 7%;"><img no-repeat="" src="../Content/Images/Kelloggs_vertical_shadow.png"></div>' + '</div>' +
        '<div class="typeValue"><div class="middleAlign"><div class="percentage"  style="color:' + obj.colorClass + '">' + obj.value + '</div>' + (obj.change != "" ? '<div class="change">(' + obj.change + ')</div>' : '') + '</div></div>'
        packageBody += (b < widgetData.filter(function (e) { return e.ProfileOrder == 17 }).length - 1 ? '<div class="bottomShadow" style="bottom: -0.37vw;"><img no-repeat="" src="../Content/Images/Kelloggs_horizontal_shadow.png"></div>' : '') + "</div>"
    })

    widgetBody += packageBody + verticalShadow + '</div>';

    widgetBody += '</div>';//widget body

    element.append(widgetBody);
}

//function bindRadialChart(widgetData, id, height, width) {
//    var xCenter = width / 2, yCenter = height / 2, maxRadius = Math.min(height - 1.4, width) / 2;
//    if (id == 7) {
//        yCenter = height,
//        maxRadius = height - 0.3;
//    }
//    height = (height / document.documentElement.clientWidth) * 100;
//    width = (width / document.documentElement.clientWidth) * 100;
//    var maxRadiusVW = id == 7 ? height - 0.3 : Math.min(height - 1.4, width) / 2;
//    let colorList = ["#c00000", "#FF9933", "#FF6600"]
//    let Data = [];
//    if (id == 4) {
//        let obj = formatCellValues(widgetData, 0);
//        Data = {
//            value: obj.value.indexOf("%") > -1 ? obj.value.split("%")[0] : 0,
//            color: widgetData.color
//        };
//    }
//    else {
//        valueNotZero = 0;
//        angular.forEach(widgetData, function (a, b) {
//            let obj = formatCellValues(a, 0);
//            if (obj.value.indexOf("%") > -1)
//                valueNotZero = obj.value.split("%")[0];
//            Data.push({
//                value: obj.value.indexOf("%") > -1 ? obj.value.split("%")[0] : (100 - valueNotZero),
//                color: obj.value.indexOf("%") > -1 ? colorList[b] : "#ffffff"
//            })
//        })
//    }
//    const svg1 = document.createElement("svg");
//    svg1.setAttribute("width", width + "vw");
//    svg1.setAttribute("height", height + "vw");
//    //const blurMeFilter = document.createElement("filter");
//    //blurMeFilter.setAttribute("id", 'blurMe');
//    //const feGaussianBlur = document.createElement("feGaussianBlur");
//    //feGaussianBlur.setAttribute("in", 'SourceGraphic');
//    //feGaussianBlur.setAttribute("stdDeviation", '5');
//    //blurMeFilter.appendChild(feGaussianBlur);
//    //svg1.appendChild(blurMeFilter);
//    const InnerBlurCircle = document.createElement("circle");
//    InnerBlurCircle.setAttribute("cx", xCenter);
//    InnerBlurCircle.setAttribute("cy", yCenter);
//    InnerBlurCircle.setAttribute("r", maxRadiusVW * 0.2 + "vw");
//    InnerBlurCircle.setAttribute("fill", "#D8D6D7");
//    InnerBlurCircle.setAttribute("filter", "url(#blurMe)");
//    svg1.appendChild(InnerBlurCircle);
//    const InnerCircle = document.createElement("circle");
//    InnerCircle.setAttribute("cx", xCenter);
//    InnerCircle.setAttribute("cy", yCenter);
//    InnerCircle.setAttribute("r", maxRadiusVW * 0.2 - 0.07 + "vw");
//    InnerCircle.setAttribute("fill", "#D8D6D7");
//    svg1.appendChild(InnerCircle);
//    formatinputData(Data, id);
//    if (id == 4) {
//        let Path1 = document.createElement("path");
//        Path1.setAttribute("id", 'arc1');
//        Path1.setAttribute("fill", 'none');
//        Path1.setAttribute("stroke", Data.color);
//        Path1.setAttribute("stroke-width", maxRadiusVW * 0.6 + "vw");
//        Path1.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.7, Data.StartFrom, Data.EndTo));
//        svg1.appendChild(Path1);
//        let Path2 = document.createElement("path");
//        Path2.setAttribute("id", 'arc2');
//        Path2.setAttribute("fill", 'none');
//        Path2.setAttribute("stroke", 'black');
//        Path2.setAttribute("opacity", '0.1');
//        Path2.setAttribute("stroke-width", maxRadiusVW * 0.2 + "vw");
//        Path2.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.5, Data.StartFrom, Data.EndTo));
//        svg1.appendChild(Path2);
//        const InnerBlurShadow = document.createElement("circle");
//        InnerBlurShadow.setAttribute("cx", xCenter);
//        InnerBlurShadow.setAttribute("cy", yCenter);
//        InnerBlurShadow.setAttribute("opacity", '0.3');
//        InnerBlurShadow.setAttribute("r", maxRadiusVW * 0.65 + "vw");
//        InnerBlurShadow.setAttribute("fill", "#D8D6D7");
//        svg1.appendChild(InnerBlurShadow);
//        const InnerBlurCircle = document.createElement("circle");
//        InnerBlurCircle.setAttribute("cx", xCenter);
//        InnerBlurCircle.setAttribute("cy", yCenter);
//        InnerBlurCircle.setAttribute("r", maxRadiusVW * 0.5 + "vw");
//        InnerBlurCircle.setAttribute("fill", "#D8D6D7");
//        //InnerBlurCircle.setAttribute("filter", "url(#blurMe)");
//        svg1.appendChild(InnerBlurCircle);
//        const InnerWhiteCircle = document.createElement("circle");
//        InnerWhiteCircle.setAttribute("cx", xCenter);
//        InnerWhiteCircle.setAttribute("cy", yCenter);
//        InnerWhiteCircle.setAttribute("r", maxRadiusVW * 0.35 + "vw");
//        InnerWhiteCircle.setAttribute("fill", "white");
//        svg1.appendChild(InnerWhiteCircle);
//    }
//    else {
//        for (let i = 0; i < Data.length; i++) {
//            let Path = document.createElement("path");
//            Path.setAttribute("id", 'arc' + i);
//            Path.setAttribute("fill", 'none');
//            Path.setAttribute("stroke", Data[i].color);
//            if (id == 9) {
//                Path.setAttribute("stroke-width", maxRadiusVW * 0.6 - i * 0.7 + "vw");
//                Path.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.7 - i * 5, Data[i].StartFrom, Data[i].EndTo));
//            }
//            else if (id == 7) {
//                Path.setAttribute("stroke-width", maxRadiusVW * 0.2 + "vw");
//                Path.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.85, Data[i].StartFrom, Data[i].EndTo));
//            }
//            svg1.appendChild(Path);
//        }
//        const OuterCircle = document.createElement("path");
//        OuterCircle.setAttribute("id", 'outerArc');
//        OuterCircle.setAttribute("fill", 'none');
//        if (id == 9) {
//            OuterCircle.setAttribute("stroke", 'white');
//            OuterCircle.setAttribute("stroke-width", maxRadiusVW * 0.1 + "vw");
//            OuterCircle.setAttribute("opacity", 0.5);
//            OuterCircle.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.5, 0, 359.9));
//        }
//        else if (id == 7) {
//            OuterCircle.setAttribute("stroke", '#D8D6D7');
//            OuterCircle.setAttribute("stroke-width", maxRadiusVW * 0.2 + "vw");
//            OuterCircle.setAttribute("opacity", 0.5);
//            OuterCircle.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.7, 0, 359.9));
//        }
//        //OuterCircle.setAttribute("filter", "url(#blurMe)");
//        svg1.appendChild(OuterCircle);
//    }
//    return svg1.outerHTML;
//}

function bindRadialChart(widgetData, id, height, width) {
    let m = 20;
    if ($(window).width() <= 896)
        m = 10;

    var xCenter = width / 2, yCenter = height / 2, maxRadius = Math.min(height - m, width) / 2;

    if (id == 7) {
        yCenter = height,
        maxRadius = height - 4;
    }
    let colorList = ["#c00000", "#FF9933", "#FF6600"]
    let Data = [];
    if (id == 4) {
        let obj = formatCellValues(widgetData, 0);
        Data = {
            value: obj.value.indexOf("%") > -1 ? obj.value.split("%")[0] : 0,
            color: widgetData.color
        };
    }
    else {
        valueNotZero = 0;
        angular.forEach(widgetData, function (a, b) {
            let obj = formatCellValues(a, 0);
            if (obj.value.indexOf("%") > -1)
                valueNotZero = obj.value.split("%")[0];
            Data.push({
                value: obj.value.indexOf("%") > -1 ? obj.value.split("%")[0] : (100 - valueNotZero),
                color: obj.value.indexOf("%") > -1 ? colorList[b] : "#ffffff"
            })
        })
    }

    var svg1 = document.createElement("svg");
    svg1.setAttribute("width", width);
    svg1.setAttribute("height", height);
    //const blurMeFilter = document.createElement("filter");
    //blurMeFilter.setAttribute("id", 'blurMe');
    //const feGaussianBlur = document.createElement("feGaussianBlur");
    //feGaussianBlur.setAttribute("in", 'SourceGraphic');
    //feGaussianBlur.setAttribute("stdDeviation", '5');
    //blurMeFilter.appendChild(feGaussianBlur);
    //svg1.appendChild(blurMeFilter);
    var InnerBlurCircle = document.createElement("circle");
    InnerBlurCircle.setAttribute("cx", xCenter);
    InnerBlurCircle.setAttribute("cy", yCenter);
    InnerBlurCircle.setAttribute("r", maxRadius * 0.2);
    InnerBlurCircle.setAttribute("fill", "#D8D6D7");
    InnerBlurCircle.setAttribute("filter", "url(#blurMe)");
    svg1.appendChild(InnerBlurCircle);
    var InnerCircle = document.createElement("circle");
    InnerCircle.setAttribute("cx", xCenter);
    InnerCircle.setAttribute("cy", yCenter);
    InnerCircle.setAttribute("r", maxRadius * 0.2 - 1);
    InnerCircle.setAttribute("fill", "#D8D6D7");
    svg1.appendChild(InnerCircle);
    formatinputData(Data, id);

    if (id == 4) {
        let Path1 = document.createElement("path");
        Path1.setAttribute("id", 'arc1');
        Path1.setAttribute("fill", 'none');
        Path1.setAttribute("stroke", Data.color);
        Path1.setAttribute("stroke-width", maxRadius * 0.6);
        Path1.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.7, Data.StartFrom, Data.EndTo));
        svg1.appendChild(Path1);
        let Path2 = document.createElement("path");
        Path2.setAttribute("id", 'arc2');
        Path2.setAttribute("fill", 'none');
        Path2.setAttribute("stroke", 'black');
        Path2.setAttribute("opacity", '0.1');
        Path2.setAttribute("stroke-width", maxRadius * 0.2);
        Path2.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.5, Data.StartFrom, Data.EndTo));
        svg1.appendChild(Path2);

        var InnerBlurShadow = document.createElement("circle");
        InnerBlurShadow.setAttribute("cx", xCenter);
        InnerBlurShadow.setAttribute("cy", yCenter);
        InnerBlurShadow.setAttribute("opacity", '0.3');
        InnerBlurShadow.setAttribute("r", maxRadius * 0.65);
        InnerBlurShadow.setAttribute("fill", "#D8D6D7");
        svg1.appendChild(InnerBlurShadow);
        var InnerBlurCircle = document.createElement("circle");
        InnerBlurCircle.setAttribute("cx", xCenter);
        InnerBlurCircle.setAttribute("cy", yCenter);
        InnerBlurCircle.setAttribute("r", maxRadius * 0.5);
        InnerBlurCircle.setAttribute("fill", "#D8D6D7");
        //InnerBlurCircle.setAttribute("filter", "url(#blurMe)");

        svg1.appendChild(InnerBlurCircle);
        var InnerWhiteCircle = document.createElement("circle");
        InnerWhiteCircle.setAttribute("cx", xCenter);
        InnerWhiteCircle.setAttribute("cy", yCenter);
        InnerWhiteCircle.setAttribute("r", maxRadius * 0.35);
        InnerWhiteCircle.setAttribute("fill", "white");
        svg1.appendChild(InnerWhiteCircle);
    }
    else {
        for (let i = 0; i < Data.length; i++) {
            let Path = document.createElement("path");
            Path.setAttribute("id", 'arc' + i);
            Path.setAttribute("fill", 'none');
            Path.setAttribute("stroke", Data[i].color);
            if (id == 9) {
                Path.setAttribute("stroke-width", maxRadius * 0.6 - i * 10);
                Path.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.7 - i * 10 / 2, Data[i].StartFrom, Data[i].EndTo));
            }
            else if (id == 7) {
                Path.setAttribute("stroke-width", maxRadius * 0.3);
                Path.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.85, Data[i].StartFrom, Data[i].EndTo));
            }
            svg1.appendChild(Path);
        }
        var OuterCircle = document.createElement("path");
        OuterCircle.setAttribute("id", 'outerArc');
        OuterCircle.setAttribute("fill", 'none');
        if (id == 9) {
            OuterCircle.setAttribute("stroke", 'white');
            OuterCircle.setAttribute("stroke-width", maxRadius * 0.1);
            OuterCircle.setAttribute("opacity", 0.5);
            OuterCircle.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.4, 0, 359.9));
        }
        else if (id == 7) {
            OuterCircle.setAttribute("stroke", '#D8D6D7');
            OuterCircle.setAttribute("stroke-width", maxRadius * 0.2);
            OuterCircle.setAttribute("opacity", 0.5);
            OuterCircle.setAttribute("d", describeArc(xCenter, yCenter, maxRadius * 0.7, 0, 359.9));
        }
        //OuterCircle.setAttribute("filter", "url(#blurMe)");
        svg1.appendChild(OuterCircle);
    }
    return svg1.outerHTML;

}
var polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

var describeArc = function (x, y, radius, startAngle, endAngle) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
}

var formatinputData = function (data, id) {
    if (id == 9) {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += Math.abs(data[i].value);
        }
        let divideBy = 360 / total;
        let StartFrom = 0
        for (let i = 0; i < data.length; i++) {
            data[i].StartFrom = StartFrom;
            data[i].EndTo = data.length - 1 == i ? 359.99 : StartFrom + divideBy * data[i].value;
            StartFrom = data[i].EndTo;
        }
    }
    else if (id == 4) {
        let total = 100;
        let divideBy = 359.99 / total;
        let StartFrom = 0
        data.StartFrom = StartFrom;
        data.EndTo = divideBy * data.value;
    }
    else if (id == 7) {
        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += Math.abs(data[i].value);
        }
        let divideBy = 180 / total;
        let StartFrom = -90;
        for (let i = 0; i < data.length; i++) {
            data[i].StartFrom = StartFrom;
            data[i].EndTo = StartFrom + divideBy * data[i].value;
            StartFrom = data[i].EndTo;
        }
    }
}


//function formatCellValues(row, flag, marketInfo) {
//    //note flag 0 for volume, 1 for  volume total and 2 for volume home
//    let obj = {}
//    obj.value = 'NA', obj.change = '', obj.colorClass = 'black';
//    if (row.Volume != null && flag == 0) {//sample size check for volume
//        if (row.USampleSize == null) {
//            obj.value = "NA";
//        }
//        else if (row.UNumerator < insufficientSample) {
//            obj.value = "LS";
//        }
//        else {
//            if (row.UNumerator >= insufficientSample && row.UNumerator <= lowSample)
//                obj.colorClass = 'grey';
//            if (row.Attribute.toUpperCase() == "AVERAGE HH INCOME")
//                obj.value = getCurrencySymbol(marketInfo) + row.Volume.toFixed(2) + "K";
//            else if (row.Attribute.toUpperCase() == "AVERAGE ITEMS PER OCCASION")
//                obj.value = row.Volume.toFixed(1);
//            else
//                obj.value = row.Volume.toFixed(0) + "% ";
//        }
//    }
//    else if (row.VolumeTotal != null && flag == 1) {//sample size check for total volume
//        if (row.USampleSizeTotal == null) {
//            obj.value = "NA";
//        }
//        else if (row.UNumeratorTotal < insufficientSample) {
//            obj.value = "LS";
//        }
//        else {
//            if (row.UNumeratorTotal >= insufficientSample && row.UNumeratorTotal <= lowSample)
//                obj.colorClass = 'grey';
//            obj.value = row.VolumeTotal.toFixed(0) + "% ";
//        }
//    }
//    else if (row.VolumeHome != null && flag == 2) {//sample size check for at home volume
//        if (row.USampleSizeHome == null) {
//            obj.value = "NA";
//        }
//        else if (row.UNumeratorHome < insufficientSample) {
//            obj.value = "LS";
//        }
//        else {
//            if (row.UNumeratorHome >= insufficientSample && row.UNumeratorHome <= lowSample)
//                obj.colorClass = 'grey';
//            obj.value = row.VolumeHome.toFixed(0) + "% ";
//        }
//    }
//    if (obj.value != 'NA' && obj.value != "LS" && row.Significance != null && obj.colorClass != 'grey' && flag != 1) {
//        if (row.Significance > 0)
//            obj.colorClass = 'green';
//        else if (row.Significance < 0)
//            obj.colorClass = 'red';
//    }
//    if (obj.value != 'NA' && obj.value != "LS" && row.DiffVol != null && flag == 0) {
//        if (row.DiffVol != null && row.DiffVol != 0) {
//            obj.change = row.DiffVol.toFixed(1);
//            obj.change = row.DiffVol >= 0 ? '+' + obj.change : obj.change;
//        }
//    }
//    else if (obj.value != 'NA' && obj.value != "LS" && row.DiffVolTotal != null && flag == 1) {
//        if (row.DiffVolTotal != null && row.DiffVolTotal != 0) {
//            obj.change = row.DiffVolTotal.toFixed(1);
//            obj.change = row.DiffVolTotal >= 0 ? '+' + obj.change : obj.change;
//        }
//    }
//    else if (obj.value != 'NA' && obj.value != "LS" && row.DiffVolHome != null && flag == 2) {
//        if (row.DiffVolHome != null && row.DiffVolHome != 0) {
//            obj.change = row.DiffVolHome.toFixed(1);
//            obj.change = row.DiffVolHome >= 0 ? '+' + obj.change : obj.change;
//        }
//    }
//    return obj;
//}

function returnAppropriateValues(widgetData, flag) {
    let tempList = [];
    angular.forEach(widgetData, function (a, b) {
        if (flag == 0 && a.Volume != null) {
            if (a.USampleSize != null && a.USampleSize >= insufficientSample) {
                tempList.push(parseInt(a.Volume.toFixed(0)));
            }
        }
        else if (flag == 1 && a.VolumeTotal != null) {
            if (a.USampleSizeTotal != null && a.USampleSizeTotal >= insufficientSample) {
                tempList.push(parseInt(a.VolumeTotal.toFixed(0)));
            }
        }
    })

    let ratio = 1;
    if (tempList.length > 0) {
        max = tempList.sort(function (a, b) { return b - a })[0];
        maxScaleValue = Math.ceil((max + 1) / 5) * 5;
        ratio = 100 / maxScaleValue;
    }
    return ratio;
}

function getCurrencySymbol(selectedMarket) {
    let symbol = '$';
    if (selectedMarket.indexOf("Select All Markets") == -1) {
        //US	$
        //Mexico	$
        //Brazil	R$
        //UK	£
        //France	€
        //Australia	$
        if (selectedMarket.indexOf("Brazil") > -1)
            symbol = "R$";
        else if (selectedMarket.indexOf("France") > -1)
            symbol = "€";
        else if (selectedMarket.indexOf("UK") > -1)
            symbol = "£";
    }
    return '<span>' + symbol + '</span>';
}


function openInfo() {
    show_popup("Information", '');
    var info = "<div class='infoArea' style='height:100%;width:100%;'>";
    angular.forEach(responseData.filter(function (e) { return e.WidgetNumber == 10 }).sort(function (a, b) { return b.Volume - a.Volume }), function (a, b) {
        var record = customTitle.filter(function (e) { return e.DisplayName == a.Attribute.toUpperCase() })[0];
        info += '<div class="property">' +
                            '<div class="propName"><div class="middleAlign" style="position:absolute;">' + record.DisplayName.toLowerCase() + '</div></div>' +
                            '<div class="propInfo"><div class="middleAlign" style="position:absolute;">' + record.Title + '.</div></div>' +
                        '</div>';
    })
    info += "</div>";
    angular.element(".popup-container").html(info);
    $(".custom-popup:visible .popup-container").css({ "height": "auto", "max-height": "inherit" });
    $(".custom-popup:visible .popup-container").css({ "height": $(".custom-popup:visible").height() - 40, "max-height": $(".custom-popup:visible").height() - 40 });
    SetScroll($('.custom-popup:visible .popup-container .infoArea'), "#D31245", 0, 0, 0, 0, 3, false);
}

function titleCase(str) {
    var splitStr = str.toUpperCase() == "CATEGORY/ITEM/BRAND" ? str.toLowerCase().split('/') : str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return str.toUpperCase() == "CATEGORY/ITEM/BRAND" ? splitStr.join('/') : splitStr.join(' ');
}


function formatCellValues(row, flag, marketInfo) {
    //note flag 0 for volume, 1 for  volume total and 2 for volume home
    let obj = {};
    obj.value = "NA";
    obj.colorClass = "black";
    obj.change = "";
    if (row == undefined)
        return obj;
    if (selectedModuleId == 3 && (marketInfo == "Weighted" || marketInfo == "Unweighted")) {
        if (marketInfo == "Weighted") {
            if (row.WSampleSize != null)
                obj.value = Math.round(row.WNumerator);//row.WNumerator.toFixed(2);
            if (row.UNumerator != null && row.USampleSize <= lowSample)
                obj.colorClass = 'grey';
        }
        else if (marketInfo == "Unweighted") {
            if (row.USampleSize != null)
                obj.value = Math.round(row.UNumerator);
            if (row.UNumerator != null && row.USampleSize <= lowSample)
                obj.colorClass = 'grey';
        }
        return obj;
    }
    let volume = null;
    if (selectedModuleId == 4)
        volume = row.Value;
    else if (selectedModuleId == 2 || selectedModuleId == 6)
        volume = row.Volume;
    else
        volume = row.Percentage
    if (volume != null && flag == 0) {//sample size check for volume
        if (row.USampleSize == null) {
            obj.value = "NA";
        }
        else if (row.USampleSize < insufficientSample) {
            obj.value = "LS";
        }
        else {
            if (row.USampleSize >= insufficientSample && row.USampleSize <= lowSample)
                obj.colorClass = 'grey';
            if ((selectedModuleId == 2 || selectedModuleId == 6) && row.Attribute.toUpperCase() == "AVERAGE HH INCOME")
                obj.value = getCurrencySymbol(marketInfo) + row.Volume.toFixed(2) + "K";
            else if ((selectedModuleId == 2 || selectedModuleId == 6) && row.Attribute.toUpperCase() == "AVERAGE ITEMS PER OCCASION")
                obj.value = row.Volume.toFixed(1);
            else if (selectedModuleId == 3 && (row.ColumnMetricName.toUpperCase() == "AVERAGE ITEMS PER OCCASION" || row.RowMetricName.toUpperCase() == "AVERAGE ITEMS PER OCCASION" || row.NestingMetricName.toUpperCase() == "AVERAGE ITEMS PER OCCASION"))
                obj.value = row.Percentage.toFixed(2);
            else if (selectedModuleId == 4 && row.Header.toUpperCase() == "AVERAGE ITEMS PER OCCASION")
                obj.value = row.Value.toFixed(2);
            else if ((selectedModuleId == 2 || selectedModuleId == 6))
                obj.value = row.Volume.toFixed(0) + "% ";
            else if (selectedModuleId == 4)
                obj.value = (row.Value * 100).toFixed(2) + "%";
            else
                obj.value = row.Percentage.toFixed(2) + "% ";
        }
    }
    else if (row.VolumeTotal != null && flag == 1) {//sample size check for total volume
        if (row.USampleSizeTotal == null) {
            obj.value = "NA";
        }
        else if (row.USampleSizeTotal < insufficientSample) {
            obj.value = "LS";
        }
        else {
            if (row.USampleSizeTotal >= insufficientSample && row.USampleSizeTotal <= lowSample)
                obj.colorClass = 'grey';
            obj.value = row.VolumeTotal.toFixed(0) + "% ";
        }
    }
    else if (row.VolumeHome != null && flag == 2) {//sample size check for at home volume
        if (row.USampleSizeHome == null) {
            obj.value = "NA";
        }
        else if (row.USampleSizeHome < insufficientSample) {
            obj.value = "LS";
        }
        else {
            if (row.USampleSizeHome >= insufficientSample && row.USampleSizeHome <= lowSample)
                obj.colorClass = 'grey';
            obj.value = row.VolumeHome.toFixed(0) + "% ";
        }
    }
    if (selectedModuleId == 4)
        obj = getTotalValues(row, obj)
    if (obj.value != 'NA' && obj.value != "LS" && row.Significance != null && obj.colorClass != 'grey' && flag != 1) {
        if (row.Significance > 0)
            obj.colorClass = 'green';
        else if (row.Significance < 0)
            obj.colorClass = 'red';
    }
    let change = (selectedModuleId == 2 || selectedModuleId == 6) ? row.DiffVol : row.Change;
    if (obj.value != 'NA' && obj.value != "LS" && change != null && flag == 0) {
        if (change !== null && change !== "") {
            obj.change = (selectedModuleId == 2 || selectedModuleId == 6) ? change.toFixed(1) : change.toFixed(2);
            obj.change = change >= 0 ? '+' + obj.change : obj.change;
        }
    }
    else if (obj.value != 'NA' && obj.value != "LS" && row.DiffVolTotal != null && flag == 1) {
        if (row.DiffVolTotal !== null && row.DiffVolTotal !== "") {
            obj.change = row.DiffVolTotal.toFixed(1);
            obj.change = row.DiffVolTotal >= 0 ? '+' + obj.change : obj.change;
        }
    }
    else if (obj.value != 'NA' && obj.value != "LS" && row.DiffVolHome != null && flag == 2) {
        if (row.DiffVolHome !== null && row.DiffVolHome !== "") {
            obj.change = row.DiffVolHome.toFixed(1);
            obj.change = row.DiffVolHome >= 0 ? '+' + obj.change : obj.change;
        }
    }
    return obj;
}