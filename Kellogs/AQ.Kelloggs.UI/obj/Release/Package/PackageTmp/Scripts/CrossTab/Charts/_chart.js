var color_start = ['#95B9E5', '#F4C1C1', '#B5D8A3', '#B6BDC1', '#C2DCF2', '#FCA586', '#C29BC6', '#E2D6B0', '#88D1E5', '#D6A6A5', '#C4BAD3', '#F7C47F',
    '#F2BDDA', '#5ECCC9', '#F9CBAC'//, '#A8655D', '#B1A3C1', '#EA96BC', '#D38053', '#6A5B7C', '#6586A8', '#AAAAAA', '#AA4B49', '#83B5E5', '#B1B67E', '#E07070'
];
var withBestInClassColor_start = ['#1B1B1B', '#2371AF', '#EFB930', '#DD4A78', '#88BA6C', '#F69785', '#CFC393', '#67BCDB', '#D86552', '#AACF99', '#808981', '#F08128', '#8BB7A3',
    '#88568C', '#35B9BC', '#666A6D', '#A8655D', '#B1A3C1', '#EA96BC', '#D38053', '#6A5B7C', '#6586A8', '#AAAAAA', '#AA4B49', '#83B5E5', '#B1B67E', '#E07070'
];
var treeData = [
  {
      "name": "Top Level",
      "parent": "null",
      "children": [
        {
            "name": "Level 2: A",
            "parent": "Top Level",
            "children": [
              {
                  "name": "Son of A",
                  "parent": "Level 2: A"
              },
              {
                  "name": "Daughter of A",
                  "parent": "Level 2: A"
              }
            ]
        },
        {
            "name": "Level 2: B",
            "parent": "Top Level"
        }
      ]
  }
];
var global_filter_for_charts = [];
var noOfTicks = 5;
var stackChartData = [];
let common_chart_data = [
    //{ category: "Cosmetics Category", data: [{ x: 'Chili', y: 25, c: 0.1, s: -1.1 }, { x: 'McDonalds', y: 55, c: 0.1, s: -1.1 }, { x: 'KFC', y: 5, c: 0.1, s: -1.1 }] },
    //{ category: "Femcare Category", data: [{ x: 'Chili', y: 20, c: 0.1, s: -1.1 }, { x: 'McDonalds', y: 15, c: 0.1, s: -1.1 }, { x: 'KFC', y: 25, c: 0.1, s: -1.1 }] },
    //{ category: "Laundry Category", data: [{ x: 'Chili', y: 35, c: 0.1, s: -1.1 }, { x: 'McDonalds', y: 25, c: 0.1, s: -1.1 }, { x: 'KFC', y: 25, c: 0.1, s: -1.1 }] },
    //{ category: "Cosmetics Category2", data: [{ x: 'Chili', y: 25, c: 0.1, s: -1.1 }, { x: 'McDonalds', y: 25, c: 0.1, s: -1.1 }, { x: 'KFC', y: 25, c: 0.1, s: -1.1 }] },
    //{ category: "Cosmetics Category3", data: [{ x: 'Chili', y: 25, c: 0.1, s: -1.1 }, { x: 'McDonalds', y: 25, c: 0.1, s: -1.1 }, { x: 'KFC', y: 25, c: 0.1, s: -1.1 }] },
    //{ category: "Femcare Category2", data: [{ x: 'Chili', y: 25, c: 0.1, s: -1.1 }, { x: 'McDonalds', y: 25, c: 0.1, s: -1.1 }, { x: 'KFC', y: 20, c: 0.1, s: -1.1 }] },
    //{ category: "Femcare Category3", data: [{ x: 'Chili', y: 25, c: 0.1, s: -1.1 }, { x: 'McDonalds', y: 45, c: 0.1, s: -1.1 }, { x: 'KFC', y: 25, c: 0.1, s: -1.1 }] },
    //{ category: "Laundry Category2", data: [{ x: 'Chili', y: 25, c: 0.1, s: -1.1 }, { x: 'McDonalds', y: 25, c: 0.1, s: -1.1 }, { x: 'KFC', y: 50, c: 0.1, s: -1.1 }] },
    //{ category: "Laundry Category3", data: [{ x: 'Chili', y: 25, c: 0.1, s: -1.1 }, { x: 'McDonalds', y: 25, c: 0.1, s: -1.1 }, { x: 'KFC', y: 5, c: 0.1, s: -1.1 }] }
];
let ladder_chart_data = [{ name: "ALDI", data: [{ x: 'chili', y: 25 }, { x: 'bk', y: 10 }, { x: 'mcD', y: 30 }, { x: 'kfc', y: 20 }] },
{ name: "Amazon.com", data: [{ x: 'chili', y: 20 }, { x: 'bk', y: 10 }, { x: 'mcD', y: 30 }, { x: 'kfc', y: 25 }] },
{ name: "BJ's", data: [{ x: 'chili', y: 30 }, { x: 'bk', y: 10 }, { x: 'mcD', y: 20 }, { x: 'kfc', y: 35 }] },
{ name: "COSTCO", data: [{ x: 'chili', y: 15 }, { x: 'bk', y: 28 }, { x: 'mcD', y: 10 }, { x: 'kfc', y: 18 }] },
{ name: "XYZ", data: [{ x: 'chili', y: 15 }, { x: 'bk', y: 28 }, { x: 'mcD', y: 10 }, { x: 'kfc', y: 18 }] },
{ name: "XYZ1", data: [{ x: 'chili', y: 15 }, { x: 'bk', y: 28 }, { x: 'mcD', y: 10 }, { x: 'kfc', y: 18 }] }//,
//{ name: "XYZ12", data: [{ x: 'chili', y: 15 }, { x: 'bk', y: 28 }, { x: 'mcD', y: 10 }, { x: 'kfc', y: 18 }] },
//{ name: "XYZ123", data: [{ x: 'chili', y: 15 }, { x: 'bk', y: 28 }, { x: 'mcD', y: 10 }, { x: 'kfc', y: 18 }] }
];
var _isAscending = false;
var _sortingColNameForChart = '';
var niceScroll_chart_options = {
    cursorcolor: '#2371AF',
    cursorwidth: '0.3vw',
    background: 'rgba(220,220,220,1)',
    cursorborder: 'none',
    cursorborderradius: '0.37vw',
    railoffset: { left: -3 },
    railpadding: { top: 0, right: 0, left: 0, bottom: 3 },
    autohidemode: 'false'
};
var findMinX = function (data, xdata) {
    var Val = 100;
    data.forEach(function (d, i) {
        var tempVal = d.filter(function (obj) { return obj.x == xdata });
        if (i == 0) { Val = tempVal[0].y; }
        if (tempVal != null && tempVal[0].y < Val) {
            Val = tempVal[0].y;
        }
    });
    return Val;
}
var findMaxX = function (data, xdata) {
    var Val = 0;
    data.forEach(function (d, i) {
        var tempVal = d.filter(function (obj) { return obj.x == xdata });
        if (i == 0) { Val = tempVal[0].y; }
        if (tempVal != null && tempVal[0].y > Val) {
            Val = tempVal[0].y;
        }
    });
    return Val;
}
function getMaxCount(chartData) {
    var maxcount = 0, y = 0, maxindex = 0;
    for (i = 0; i < chartData.length; i++) {
        for (j = 0; j < chartData[i].data.length; j++) {
            if (j > maxcount) {
                maxcount = j;
                maxindex = i;
            }
        }
    }
    return maxindex;
}
function convertCommonChartDataToBubble(data) {
    var bubble_data = [];
    //var bubble_data = [{ y: -20, x: 0.10, name: "Amazon" },
    //            { y: 25, x: 10, name: "Aldi" },
    //            { y: 55, x: 25, name: "Costco" },
    //            { y: 5, x: -30, name: "Waitrose" },
    //            { y: 0, x: 2, name: "Lidl" },
    //            { y: 45, x: -20, name: "Boots" },
    //            { y: -15, x: 6, name: "Tesco" },
    //            { y: 35, x: 14, name: "Asda" }
    //];
    if (data.length < 2) { return bubble_data; }
    data[0].data.forEach(function (d, i) {
        bubble_data.push({ x: d.y, y: data[1].data[i].y, name: d.x });
    });
    return bubble_data;
}
function convertCommonChartDataToSpider(data, cur_color) {
    var spider_data = [];
    //var spider_data = [{
    //    color: 'red',
    //    name: 'Allocated Budget',
    //    marker: { symbol: 'circle' },
    //    data: [{ y: 30000, c: 2 }, { y: 10000, c: 6 }, { y: 600000, c: 2 }],
    //    pointPlacement: 'on'
    //}, {
    //    color: 'red',
    //    name: 'Allocated Budget',
    //    marker: { symbol: 'circle' },
    //    data: [{ y: 30000, c: 2 }, { y: 10000, c: 6 }, { y: 600000, c: 2 }],
    //    pointPlacement: 'on'
    //}];
    if (data.length < 3) { return spider_data; }

    data[0].data.forEach(function (d, i) {
        spider_data.push({
            color: cur_color[i],
            name: d.x,
            marker: { symbol: 'circle' },
            data: data.map(function (e) {
                let cur_itr_ele = {};
                e.data.forEach(function (f) {
                    if (f.x == d.x) {
                        cur_itr_ele = f; return;
                    }
                });
                return { y: cur_itr_ele.y, s: cur_itr_ele.s, ss: cur_itr_ele.ss, c: cur_itr_ele.c };
            }),
            //[{ y: 30000, c: 2 }, { y: 10000, c: 6 }, { y: 600000, c: 2 }],
            pointPlacement: 'on',
            stickyTracking: false
        });
    });
    return spider_data;
}
function horizontalWrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
                words = text.text().trim().replace(/\/ |\//g, '/``').split(/``| /g).reverse(), //split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.0, // ems
                y = text.attr("y"),
                x = text.attr("x"),
                dy = 0;//parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}

function truncateLabel(text, len) {
    if (text.length < len) {
        return text;
    }
    else
        return text.substring(0, len - 3) + '...';
}

function getStandardColor(color) {
    switch (color.toLowerCase()) {
        case "black":
            return "#000000";
        case "green":
            return "#0fba17"
        case "red":
            return "#FF0000";
        default:
            return "#778899";
    }
}

/**********************************************Stack Chart******************************/
/***********************************************Start*********************************/

var plot_stack_chart = function (data, __isScore, bestInClassSelection, isMinZero, dispLabels, disableLegendList) {
    //data = sort_bar_chart(chartdata);
    //data = JSON.parse(data);
    isMinZero = (isMinZero == null || isMinZero == undefined) ? true : isMinZero;
    var cur_ele = '.chartArea';
    if (bestInClassSelection) {
        if (document.querySelectorAll('.filter-block-subdiv[data-filter-for="Row"] .filterTextSelectn')[0].innerText == "RETAILERS") {
            var _cur_color = withBestInClassColor_start.filter(function (e, i) { return (global_filter_for_charts.indexOf(i) == -1); });
        }
        else {
            var _cur_color = color_start.filter(function (e, i) { return (global_filter_for_charts.indexOf(i) == -1); });
        }
    }
    else {
        var _cur_color = color_start.filter(function (e, i) { return (global_filter_for_charts.indexOf(i) == -1); });
    }

    if (disableLegendList == undefined) {
        disableLegendList = [];
        if ($(".legend-items-hr").length > 0)
            angular.forEach($(".legend-items-hr"), function (a, b) {
                if (angular.element(a).attr("style").indexOf("opacity: 0.5") > -1)
                    disableLegendList.push(parseInt(angular.element(a).attr("data-index")));
            })
        data = angular.copy(stackChartData);
        if (disableLegendList.length > 0)
            angular.forEach(disableLegendList.reverse(), function (a, b) {
                angular.forEach(data, function (c, d) {
                    c.data.splice(a, 1);
                })
            })
    }
    angular.forEach(disableLegendList, function (a, b) {
        _cur_color.splice(a, 1)
    })
    $(cur_ele).css('overflow', 'hidden');
    $(cur_ele).html('');
    $(cur_ele).append('<div class="saveDashboard"><div class="headSaveIcon" onclick="saveDashboard(event)"><div class="middleAlignHorizontal" style="position: absolute;"><div class="widget-head-save-icon"></div></div></div></div>');
    var marginForLegends = 0.15;
    var margin = { top: 0, right: 30, bottom: 45, left: 30 };

    try {
        if ((arguments.callee.caller == null || arguments.callee.caller.name == "rebindChart") && (/*@cc_on!@*/false || !!document.documentMode))
            margin = { top: 0, right: 30, bottom: 100, left: 30 };
    }
    catch (ex) {
        let stack = ex.stack || '';
        if (stack != '' && stack.indexOf("rebindChart") > -1)
            margin = { top: 0, right: 30, bottom: 100, left: 30 };
    }
    //if (arguments.callee.caller == null || arguments.callee.caller.name == "rebindChart")
    //    margin = { top: 0, right: 30, bottom: 100, left: 30 };
    var width = $(cur_ele).width() - margin.left - margin.right,
        height = $(cur_ele).height() * (1 - marginForLegends) - margin.top - margin.bottom;
    //var data = common_chart_data;
    var xData = data[0].data.map(function (d) { return d.x; }).filter(function (e, i) { return (global_filter_for_charts.indexOf(i) == -1); });
    var xValues = stackChartData[0].data.map(function (d) { return d.x; });

    //updating low sample data from charts
    angular.forEach(data, function (a, b) {
        a.data.filter(function (e) { return e.ss < insufficientSample }).filter(function (e) { return e.y = 0 });
    })
    // Transpose the data into layers
    var dataset = d3.layout.stack()(xData.map(function (xName, i) {

        return data.map(function (d) {
            var yData = 0;
            d.data.forEach(function (e) {
                if (e.x == xName) { yData = e; }
            });
            return { x: d.category, y: yData.y, c: yData.c, s: yData.s, series: yData.x, color: _cur_color[i], ss: yData.ss, scolor: getStandardColor(yData.color.split('[')[1].split(']')[0]) };
        });
    }));


    var padding_bars = 0.7;
    if (data.length > 10)
        padding_bars = 0.3;
    // Set x, y and colors
    if (dataset.length > 0) {
        var x = d3.scale.ordinal()
      .domain(dataset[0].map(function (d) { return d.x; }))
      .rangeRoundBands([0, width], padding_bars, 1);
        var y = d3.scale.linear()
          .domain([0, d3.max(dataset, function (d) { return d3.max(d, function (d) { return d.y0 + d.y }) })])
          .range([height, 0]);

        var colors = _cur_color;

        var svg = d3.select(cur_ele)
          .append("svg")
          .attr("width", "100%")//width + margin.left + margin.right
            .attr("height", (1 - 0) * 100 + "%")//height + margin.top + margin.bottom
            .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var div = d3.select(cur_ele).append("div")
            .attr("class", "d3_tooltip")
            .style("opacity", 0);
        var svgDefs = svg.append('defs');
        var mainGradient = svgDefs.append('linearGradient')
            .attr('id', 'mainGradient')
            .attr('x1', '0')
            .attr('x2', '0')
            .attr('y1', '1')
            .attr('y2', '0');
        mainGradient.append('stop')
            .attr('offset', '0%').attr('stop-color', '#ffffff');
        mainGradient.append('stop')
           .attr('offset', '50%').attr('stop-color', '#fefefe');
        mainGradient.append('stop')
           .attr('offset', '85%').attr('stop-color', '#f5f5f5');
        mainGradient.append('stop')
            .attr('offset', '100%').attr('stop-color', '#efefef');
        svg.append("rect")
              .attr("x", 0)
              .attr("y", height)
              .attr("height", 10)
              .attr("width", width)
              .style("fill", "url(#mainGradient)");
        //var barGradient = svgDefs.append('linearGradient')
        //   .attr('id', 'barGradient')
        //   .attr('x1', '0')
        //   .attr('x2', '0')
        //   .attr('y1', '0')
        //   .attr('y2', '1');
        //barGradient.append('stop')
        //    .attr('offset', '0%').attr('stop-color', '#77777711');
        //barGradient.append('stop')
        //   .attr('offset', '50%').attr('stop-color', '#77777722');
        //barGradient.append('stop')
        //   .attr('offset', '85%').attr('stop-color', '#77777733');
        //barGradient.append('stop')
        //    .attr('offset', '100%').attr('stop-color', '#44444444');
        //for (var i = 0; i < dataset[0].length; i++) {
        //    svg.append("rect")
        //      .attr("x", x.range()[i] - x.rangeBand() * 0.8)
        //      .attr("y", height)
        //      .attr("height", 60)
        //      .attr("width", x.rangeBand() + x.rangeBand() * 1.6)
        //      .style("fill", "url(#mainGradient)");
        //}

        // Define and draw axes
        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(5)
          .tickSize(-width, 0, 0)
          .tickFormat(function (d) { return d });

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
        //.tickFormat(d3.time.format("%Y"));

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (height + 3) + ")")
          .call(xAxis);
        // Create groups for each series, rects for each segment 
        var groups = svg.selectAll("g.cost")
          .data(dataset)
          .enter().append("g")
          .attr("class", "cost")
          .style("fill", function (d, i) { return colors[i]; });

        var rect = groups.selectAll("rect")
          .data(function (d) { return d; })
          .enter()
          .append("rect")
          .attr("x", function (d) { return x(d.x); })
          .attr("y", function (d) { return y(d.y0 + d.y); })
          .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
          .attr("size", function (d) { return y(d.y0) - y(d.y0 + d.y); })
          .attr("width", x.rangeBand())
        .on("mouseover", function (d) {
            div.transition()
                .duration(50)
                .style("opacity", 1);
            div.html(d.series + " : <span style='font-weight:800;color:" + d.scolor + ";'>" + d.y.toFixed(0) + (d.x.toUpperCase() == "AVERAGE ITEMS PER OCCASION" || d.series.toUpperCase() == "AVERAGE ITEMS PER OCCASION" ? "" : "%</span>") + (d.c != null ? "<span style='font-size:0.8vw;'> (" + formatChange(d.c) + ")</span>" : ""))
               .style("border", '0.08vw solid ' + d.color + '66') //+ d.color
               .style("left", ((d3.event.pageX - $(".d3_tooltip").width() / 2 - 5) / document.documentElement.clientWidth) * 100 + "vw")
               .style("top", ((d3.event.pageY - 50) / document.documentElement.clientWidth) * 100 + "vw");
        })
        .on("mouseout", function (d, i) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });
        //var grad_rect = groups.selectAll("grad_rect")
        //  .data(function (d) { return d; })
        //  .enter()
        //  .append("rect")
        //  .attr("x", function (d) { return x(d.x) + x.rangeBand() - 5; })
        //  .attr("y", function (d) { return y(d.y0 + d.y); })
        //  .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
        //  .attr("width", 20)
        ////.style('fill', 'url(#barGradient)')
        //.on("mouseover", function (d) {
        //    div.transition()
        //        .duration(50)
        //        .style("opacity", 1);
        //    div.html(d.series + " : <span style='font-weight:800;color:"+d.scolor+";'>" + d.y.toFixed(0) + "%</span>"+(d.c!=null ? "<span style='font-size:0.8vw;'> (" + formatChange(d.c) + ")</span>":""))
        //        .style("border", '0.08vw solid ' + d.color + '66') //+ d.color
        //        .style("left", (d3.event.pageX - $(".d3_tooltip").width() / 2 - 5) + "px")
        //        .style("top", (d3.event.pageY - 50) + "px");
        //})
        //  .on("mouseout", function (d, i) {
        //      div.transition()
        //          .duration(500)
        //          .style("opacity", 0);
        //  });
        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg.append("g")
          .attr("class", "tooltip")
          .style("display", "none");


        //Add an if condition and check for islabeldisplay to add or remove this code
        //if (dispLabels) {
        var _text_groups = svg.selectAll("g._text_cost")
                  .data(dataset)
                  .enter().append("g")
                  .attr("class", "_text_cost");
        //.style("fill", function (d, i) { return colors[i]; })
        _text_groups.selectAll("text.lab").data(Object)
     .enter().append("text")
     .attr('fill', function (d) { return (d.scolor); })
     .attr('class', 'lab')
     //.attr("transform", "translate(50,0)")
     .attr("text-anchor", "middle")
     .attr("x", function (d, i) { return x(x.domain()[i]) + (x.rangeBand() / 2) - ((d.ss >= insufficientSample && d.y != null && d.c != null) ? 15 : 0) })
     .attr("y", function (d) {
         //if (d.y > 7)
         //    return y(d.y0) - d.y * 1.4;
         //else
         //    return y(d.y0) - d.y;
         if ((d.ss != null && d.ss < insufficientSample) || (d.y == null && data.filter(function (e) { return e.category == d.x })[0].data.select("y").distinct().length == 1) || (d.ss == null && data.filter(function (e) { return e.category == d.x })[0].data.select("ss").distinct().length == 1))
             return y(d.y0) - 5.5;
         return y(d.y0 + d.y) + (y(d.y0) - y(d.y0 + d.y)) / 2 + 4;
     })
     .text(function (d) {
         if (d.ss != null && d.ss < insufficientSample && checkEntireColumn(data.filter(function (e) { return e.category == d.x })[0].data))
             return "LS";
         else if ((d.y == null && data.filter(function (e) { return e.category == d.x })[0].data.select("y").distinct().length == 1) || (d.ss == null && data.filter(function (e) { return e.category == d.x })[0].data.select("ss").distinct().length == 1))
             return "NA";
         else if (d.y != null && d.ss >= insufficientSample && dispLabels)
             return (d.y).toFixed(0) + (d.x.toUpperCase() == "AVERAGE ITEMS PER OCCASION" || d.series.toUpperCase() == "AVERAGE ITEMS PER OCCASION"? '' : "%");
         else
             return "";
     });

        _text_groups.selectAll("text.change").data(Object)
     .enter().append("text")
     .attr('fill', "black")
     .attr('class', 'change')
     //.attr("transform", "translate(50,0)")
     .attr("text-anchor", "middle")
     .attr("x", function (d, i) { return x(x.domain()[i]) + (x.rangeBand() / 2) + ((d.ss >= insufficientSample && d.y != null && d.c != null) ? 10 : 0) })
     .attr("y", function (d) {
         //if (d.y > 7)
         //    return y(d.y0) - d.y * 1.4;
         //else
         //    return y(d.y0) - d.y;
         if ((d.ss != null && d.ss < insufficientSample) || (d.y == null && data.filter(function (e) { return e.category == d.x })[0].data.select("y").distinct().length == 1) || (d.ss == null && data.filter(function (e) { return e.category == d.x })[0].data.select("ss").distinct().length == 1))
             return y(d.y0) - 5.5;
         return y(d.y0 + d.y) + (y(d.y0) - y(d.y0 + d.y)) / 2 + 4;
     })
     .text(function (d) {
         if (d.ss != null && d.ss < insufficientSample)
             return "";
         else if ((d.y == null && data.filter(function (e) { return e.category == d.x })[0].data.select("y").distinct().length == 1) || (d.ss == null && data.filter(function (e) { return e.category == d.x })[0].data.select("ss").distinct().length == 1))
             return "";
         else if (d.y != null && dispLabels)
             return (d.c != null ? " (" + formatChange(d.c) + ")" : "");
     });

        //}

        tooltip.append("rect")
          .attr("width", 30)
          .attr("height", 20)
          .attr("fill", "white")
          .style("opacity", 0.5);

        tooltip.append("text")
          .attr("x", 15)
          .attr("dy", "1.2em")
          .style("text-anchor", "middle")
          .attr("font-size", "0.8vw")
          .attr("font-weight", "bold");


        svg.selectAll("svg .x.axis text")[0].forEach(function (d, i) {
            $(d).attr('name', $(d).text())
            $(d).text(truncateLabel($(d).text(), Math.floor((6 * 26) / svg.selectAll("svg .x.axis text")[0].length) - 2));
        })
        //svg.selectAll("svg .x.axis text").call(horizontalWrap, 2 * x.rangeBand());

        svg.selectAll("svg .y.axis text").attr('transform', 'translate(-1, 0)');

        svg.selectAll("svg .x.axis text").on("mouseover", function () {
            div.transition()
                .duration(50)
                .style("opacity", 1);
            div.html('<span style="font-size:0.8vw;">' + $(this).attr('name') + '</span>')
                .style("left", ((d3.event.pageX - $(".d3_tooltip").width() / 2 - 5) / document.documentElement.clientWidth) * 100 + "vw")
                .style("top", ((d3.event.pageY - 50) / document.documentElement.clientWidth) * 100 + "vw");
        })
         .on("mouseout", function (d, i) {
             div.transition()
                 .duration(500)
                 .style("opacity", 0);
         });
    }

    /*Legends Start*/
    //Createv div for Legends
    $(cur_ele).append('<div class="legend-container-hr"></div>');
    //Append legend items
    let maxWidthOfLegends = (xValues.length > 12 ? 6.2 : 13.2);
    xValues.forEach(function (d, i) {
        let appendStyle = "";
        if (disableLegendList != undefined && disableLegendList.length > 0 && disableLegendList.indexOf(i) > -1)
            appendStyle = "opacity: 0.5";
        if (bestInClassSelection) {
            if (document.querySelectorAll('.filter-block-subdiv[data-filter-for="Row"] .filterTextSelectn')[0].innerText == "RETAILERS") {
                $('.legend-container-hr').append('<span style="max-width:' + maxWidthOfLegends + 'vw;' + appendStyle + '" class="legend-items-hr ' + (global_filter_for_charts.indexOf(i) != -1 ? 'labelDisabled' : '') + '" data-index="' + i + '"><span class="legend-left-bdr" style="background-color:' + withBestInClassColor_start[i] + '"></span><span style="padding:0 0.37vw;" title="' + d + '">' + d + '</span></span>');
            }
            else {
                $('.legend-container-hr').append('<span style="max-width:' + maxWidthOfLegends + 'vw;' + appendStyle + '" class="legend-items-hr ' + (global_filter_for_charts.indexOf(i) != -1 ? 'labelDisabled' : '') + '" data-index="' + i + '"><span class="legend-left-bdr" style="background-color:' + color_start[i] + '"></span><span style="padding:0 0.37vw;" title="' + d + '">' + d + '</span></span>');
            }
        }
        else {
            $('.legend-container-hr').append('<span style="max-width:' + maxWidthOfLegends + 'vw;' + appendStyle + '" class="legend-items-hr ' + (global_filter_for_charts.indexOf(i) != -1 ? 'labelDisabled' : '') + '" data-index="' + i + '"><span class="legend-left-bdr" style="background-color:' + color_start[i] + '"></span><span style="padding:0 0.37vw;" title="' + d + '">' + d + '</span></span>');
        }
    });


    // When a button change, I run the update function
    d3.selectAll(".legend-items-hr").on("click", function (d) {
        cb = d3.select(this);
        grp = parseInt(cb.attr("data-index")) + 1;
        if (cb.style("opacity") != "0.5")
            cb.style("opacity", "0.5");
        else
            cb.style("opacity", "1");
        disableLegendList = [];
        if ($(".legend-items-hr").length > 0)
            angular.forEach($(".legend-items-hr"), function (a, b) {
                if (angular.element(a).attr("style").indexOf("opacity: 0.5") > -1)
                    disableLegendList.push(parseInt(angular.element(a).attr("data-index")));
            })
        let tempdata = angular.copy(stackChartData);
        angular.forEach(disableLegendList.reverse(), function (a, b) {
            angular.forEach(tempdata, function (c, d) {
                c.data.splice(a, 1);
            })
        })
        plot_stack_chart(tempdata, false, "", true, $($('#dispLabel div:last-child')[1]).hasClass('chkbox_active'), disableLegendList);
    });

    /*Legends End*/
    if (angular.element(cur_ele).getNiceScroll().length > 0)
        angular.element(cur_ele).getNiceScroll()[0].remove();
}

function checkEntireColumn(data) {
    var sampleSizeList = [];
    angular.forEach(data, function (a, b) {
        sampleSizeList.push(parseInt(a.ss))
    })
    if (sampleSizeList.map(function (x) { return x >= insufficientSample }).distinct().indexOf(true) > -1)
        return false;
    return true;
}
/**********************************************Stack Chart******************************/
/************************************************End**********************************/

/**********************************************Trend Chart******************************/
/***********************************************Start*********************************/
var plot_trend_chart = function (_data, __isScore, bestInClassSelection, isMinZero, dispLabels, disableLegendList) {
    isMinZero = (isMinZero == null || isMinZero == undefined) ? true : isMinZero;
    var data = JSON.parse(JSON.stringify(_data));
    //data = sort_bar_chart(data);
    if (bestInClassSelection) {
        if (document.querySelectorAll('.filter-block-subdiv[data-filter-for="Row"] .filterTextSelectn')[0].innerText == "RETAILERS") {
            var _cur_color = withBestInClassColor_start.filter(function (e, i) { return (global_filter_for_charts.indexOf(i) == -1); });
        }
        else {
            var _cur_color = color_start.filter(function (e, i) { return (global_filter_for_charts.indexOf(i) == -1); });
        }
    }
    else {
        var _cur_color = color_start.filter(function (e, i) { return (global_filter_for_charts.indexOf(i) == -1); });
    }
    if (disableLegendList == undefined) {
        disableLegendList = [];
        if ($(".legend-items-hr").length > 0)
            angular.forEach($(".legend-items-hr"), function (a, b) {
                if (angular.element(a).attr("style").indexOf("opacity: 0.5") > -1)
                    disableLegendList.push(parseInt(angular.element(a).attr("data-index")));
            })
        data = angular.copy(stackChartData);
        if (disableLegendList.length > 0)
            angular.forEach(disableLegendList.reverse(), function (a, b) {
                angular.forEach(data, function (c, d) {
                    c.data.splice(a, 1);
                })
            })
    }
    angular.forEach(disableLegendList, function (a, b) {
        _cur_color.splice(a, 1)
    })
    var cur_ele = '.chartArea';
    $(cur_ele).css('overflow', 'hidden');
    $(cur_ele).html('');
    var marginForLegend = 0.1;
    var xData = [], xValues = [];
    for (var i = 0; i < stackChartData[0].data.length; i++) {
        xValues.push(stackChartData[0].data[i].x);
    }

    //updating low sample data from charts
    angular.forEach(data, function (a, b) {
        a.data = a.data.filter(function (e) { return e.ss >= insufficientSample });
    })

    xData = data[0].data.map(function (d) { return d.x; }).filter(function (e, i) { return (global_filter_for_charts.indexOf(i) == -1); });
    var temp, i, j, k, max = 0;
    var sample_flag = 0;
    var dataIntermediate = xData.map(function (c, i) {
        var temp_return_val = [];
        data.forEach(function (d, j) {
            if (d.data.length == 0) {
                temp_return_val.push({ x: d.category, y: undefined, index: +0, year: c, color: _cur_color[i], s: 0, c: null, ss: 0, scolor: getStandardColor('black') })
            }
            else {
                d.data.forEach(function (e, k) {
                    if (e.x == c) {
                        temp_return_val.push({ x: d.category, y: +e.y, index: +k, year: c, color: _cur_color[i], s: e.s, c: e.c, ss: e.ss, scolor: getStandardColor(e.color.split('[')[1].split(']')[0]) });
                    }
                });
            }
        });
        return temp_return_val;
    });
    $(cur_ele).empty();
    $(cur_ele).append('<div class="saveDashboard"><div class="headSaveIcon" onclick="saveDashboard(event)"><div class="middleAlignHorizontal" style="position: absolute;"><div class="widget-head-save-icon"></div></div></div></div>');

    var xvalues = [];
    if (dataIntermediate.length > 0) {
        var mainParentWidth = $(cur_ele).width();
        //use this height and width for entire chart and adjust here with svg traslation
        var tickStep = 10, left_margin_for_labels = 0;
        var margin = { top: 0, right: 45, bottom: 70, left: 0 };
        try {
            if ((arguments.callee.caller == null || arguments.callee.caller.name == "rebindChart") && (/*@cc_on!@*/false || !!document.documentMode))
                margin = { top: 0, right: 45, bottom: 120, left: 0 };
        }
        catch (ex) {
            let stack = ex.stack || '';
            if (stack != '' && stack.indexOf("rebindChart") > -1)
                margin = { top: 0, right: 45, bottom: 120, left: 0 };
        }
        //if (arguments.callee.caller == null || arguments.callee.caller.name == "rebindChart")
        //    margin = { top: 0, right: 45, bottom: 120, left: 0 };
        width = $(cur_ele).width() - margin.left - margin.right - 10,
        height = $(cur_ele).height() * (1 - marginForLegend) - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .domain(dataIntermediate[0].map(function (d) {
                return d.x;
            }))
            .rangeRoundBands([0, width]);
        var maxYaxisH = d3.max(dataIntermediate, function (d) { return (d3.max(d, function (e) { return e.y })) }) + 1;
        //maxYaxisH = Math.ceil(maxYaxisH + 10) + (10 - Math.ceil(maxYaxisH % 10));
        var minYaxisH = d3.min(dataIntermediate, function (d) { return (d3.min(d, function (e) { return e.y })) }) - 1;
        if (isMinZero)
            if (minYaxisH < 0) {
                minYaxisH = 0;
            } //else
        //minYaxisH = Math.floor(minYaxisH / 10 - 1) * 10;
        if (maxYaxisH == undefined || maxYaxisH == null || maxYaxisH == NaN) {
            maxYaxisH = 100;
        }
        var y = d3.scale.linear()
            .domain([minYaxisH, maxYaxisH])//set the maximum of the value,responsible for setting y axis labels and measurement
            .range([height, 0]);

        var chart = d3.select(cur_ele).append("svg")
           .attr("width", "100%")//width + margin.left + margin.right
            .attr("height", (1 - marginForLegend) * 100 + "%")//height + margin.top + margin.bottom
            .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
           .append("g")
           .attr("transform", "translate(40,30)");

        var svgDefs = chart.append('defs');
        //Main Gradient Rect
        var mainGradient = svgDefs.append('linearGradient')
            .attr('id', 'mainGradient')
            .attr('x1', '0')
            .attr('x2', '0')
            .attr('y1', '0')
            .attr('y2', '1');
        mainGradient.append('stop')
            .attr('offset', '0%').attr('stop-color', '#ffffff');
        mainGradient.append('stop')
           .attr('offset', '50%').attr('stop-color', '#fefefe');
        mainGradient.append('stop')
           .attr('offset', '85%').attr('stop-color', '#f5f5f5');
        mainGradient.append('stop')
            .attr('offset', '100%').attr('stop-color', '#efefef');
        chart.append("rect")
               .attr("x", 0)
               .attr("y", 0)
               .attr("height", height)
               .attr("width", width)
               .style("fill", "url(#mainGradient)");
        //Bottom shadow
        var bottomGradient = svgDefs.append('linearGradient')
            .attr('id', 'bottomGradient')
            .attr('x1', '0')
            .attr('x2', '0')
            .attr('y1', '0')
            .attr('y2', '1');
        bottomGradient.append('stop')
            .attr('offset', '0%').attr('stop-color', '#dadada');
        bottomGradient.append('stop')
           .attr('offset', '30%').attr('stop-color', '#eaeaea');
        bottomGradient.append('stop')
           .attr('offset', '75%').attr('stop-color', '#fafafa');
        bottomGradient.append('stop')
            .attr('offset', '100%').attr('stop-color', '#ffffff');
        chart.append("rect")
               .attr("x", -(left_margin_for_labels))
               .attr("y", height)
               .attr("height", 5)
               .attr("width", width + left_margin_for_labels)
               .style("fill", "url(#bottomGradient)");
        var yTickValues = [];
        //Dashed Lines
        for (var i = 0; i <= noOfTicks; i++) {
            chart.append("line")
               .attr("x1", 0)
               .attr("x2", width)
               .attr("y1", y((y.domain()[1] - y.domain()[0]) / noOfTicks * i + y.domain()[0]))
               .attr("y2", y((y.domain()[1] - y.domain()[0]) / noOfTicks * i + y.domain()[0]))
               .style("fill", "none")
               .attr("stroke", '#dedede')
               .style("stroke-dasharray", "5,3")
               .attr("stroke-width", "0.08vw");
            yTickValues.push((y.domain()[1] - y.domain()[0]) / noOfTicks * i + y.domain()[0]);
        }
        var xAxis = d3.svg.axis()
           .scale(x)
           .orient("bottom");//.outerTickSize(10);

        //setting the tick values
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left").tickValues(yTickValues);//.outerTickSize(10);
        chart.append("g")
            .attr("class", "y axis trendaxis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);
        chart.append("g")
            .attr("class", "x axis trendaxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        //Append connector line
        xvalues.forEach(function (d, i) {
            //Upper lines
            chart.append("line")
               .attr("x1", y.range()[0] - left_margin_for_labels)
               .attr("x2", y.range()[1])
               .attr("y1", x(d))
               .attr("y2", x(d))
               .style("fill", "none")
               .attr("stroke", '#eaeaea')
               .attr("stroke-width", "0.08vw");
            if (xvalues.length != (i + 1)) {
                //starting bold short line
                chart.append("line")
                   .attr("x1", y.range()[0] - left_margin_for_labels)
                   .attr("x2", y.range()[0] - left_margin_for_labels + 15)
                   .attr("y1", x(d) + x.rangeBand())
                   .attr("y2", x(d) + x.rangeBand())
                   .style("fill", "none")
                   .attr("stroke", '#2371AF')
                   .attr("stroke-width", "0.17vw");
            }
            chart.append("line")
               .attr("x1", y(findMinX(dataIntermediate, d)))
               .attr("x2", y(findMaxX(dataIntermediate, d)))
               .attr("y1", x(d) + x.rangeBand() / 2)
               .attr("y2", x(d) + x.rangeBand() / 2)
               .style("fill", "none")
               .attr("stroke", '#575757')
               .attr("stroke-width", "0.08vw");
        });

        //break the text at x-axis
        d3.selectAll(".x .tick text").attr('y', (+d3.selectAll(".x .tick text").attr('y')) + 10);//To maintain some axis gap
        d3.selectAll(".x .tick text")
        .call(horizontalWrap, x.rangeBand() - 10);
        //one hidden div for tooltip
        var div = d3.select(cur_ele).append("div")
            .attr("class", "d3_tooltip")
            .style("opacity", 0);

        var line = d3.svg.line()
        .x(function (d) {
            var tmpVal = x(d.x) + x.rangeBand() / 2;
            return tmpVal;
        })
        .y(function (d) {
            return y(d.y);
        });
        var filterAllNulls = function (rowData) {
            var dAttr = ""; var switchFlag = 0;
            for (var indxOfRow = 0; indxOfRow < rowData.length; indxOfRow++) {
                var xTemp = x(rowData[indxOfRow].x) + x.rangeBand() / 2;
                var yTemp = y(rowData[indxOfRow].y);
                if (xTemp == undefined || xTemp == null) { xTemp = 0; }
                if (yTemp == undefined || yTemp == null) { yTemp = 0; }
                if (indxOfRow == 0) { dAttr = dAttr.concat("M" + xTemp + "," + yTemp); if (rowData[indxOfRow].lowSampleSize == "lowSampleSize" || rowData[indxOfRow].nullIdentifier == "DataIsNull") { switchFlag = 1; } } else {
                    if (rowData[indxOfRow].lowSampleSize == "lowSampleSize" || rowData[indxOfRow].nullIdentifier == "DataIsNull") {
                        dAttr = dAttr.concat("M" + xTemp + "," + yTemp); switchFlag = 1;
                    } else {
                        if (switchFlag == 0) { dAttr = dAttr.concat("L" + xTemp + "," + yTemp); } else { dAttr = dAttr.concat("M" + xTemp + "," + yTemp); } switchFlag = 0;
                    }
                }
            }
            return dAttr;
        }
        //arc for mouse over
        var arc = d3.svg.arc()
              .innerRadius(14)
              .outerRadius(6)
              .startAngle(0)
              .endAngle(2 * Math.PI);
        //drawing line chart start
        for (var i = 0; i < dataIntermediate.length; i++) {
            chart.append("path")
              .attr("d", filterAllNulls(dataIntermediate[i]))
                .data(dataIntermediate[i].filter(function (e) { 
                if(e.y == undefined || e.y == null) 
                   return e.y = 0 
                else 
                    return e
                }))
              .attr('fill', 'none')
              .attr("stroke", _cur_color[i])
              //.style("stroke-dasharray", "3,3")
              .style("stroke-width", "2.0.37vw");
            countID = 0;//resetting the count for id

            ////Append Outer Circle
            //chart.selectAll("dot")
            //       .data(dataIntermediate[i])
            //       .enter().append("circle")
            //       .attr("cx", function (d) {
            //           return x(d.x) + x.rangeBand() / 2;
            //       })
            //       .attr("cy", function (d) {
            //           return y(d.y);
            //       })
            //       .attr("id", function (d) {
            //           var tmpCount = ++countID;
            //           return "circle" + i + "_" + tmpCount;
            //       })
            //       .attr("r", 8)
            //       .style("fill", "none")
            //       .attr("stroke", _cur_color[i])
            //       .attr("stroke-width", "0.08vw");

            //Append Inner Circle
            chart.selectAll("dot")
                    .data(dataIntermediate[i])
                    .enter().append("circle")
                .attr("cx", function (d) { if (d.y != undefined && d.y != null) return x(d.x) + x.rangeBand() / 2; })
                .attr("cy", function (d) { if (d.y != undefined && d.y != null) return y(d.y); })
                    //.attr("id", function (d) {
                    //    /*Data Label*/
                    //    var context = d3.select(this.parentNode);
                    //    context.append("text")
                    //        .attr("x", x(d.x) + x.rangeBand() / 2 - 7)
                    //        .attr("y", y(d.y) - 10)
                    //        .text((d.y == undefined || d.y == null) ? "NA" : d.y.toFixed(1) + "%")
                    //        .style("fill", d.statColor);
                    //    /*Data Label*/
                    //    var tmpCount = ++countID;
                    //    return "circle" + i + "_" + tmpCount;
                    //})
                    .attr("r", 4)
                    .attr("fill", '#fff')
                    .attr("stroke", _cur_color[i])
                    .attr("stroke-width", '0.22vw')
            //for tooltip we need above hidden div
            .on("mouseover", function (d, j) {
                div.transition()
                    .duration(50)
                    .style("opacity", 1);
                div.html(d.year + " : <span style='font-weight:800;color:" + d.scolor + "'>" + d.y.toFixed(0) + (d.x.toUpperCase() == "AVERAGE ITEMS PER OCCASION" || d.year.toUpperCase() == "AVERAGE ITEMS PER OCCASION" ? "" : "%</span>") + (d.c != null ? "<span style='font-size:0.8vw;'> (" + formatChange(d.c) + ")</span>" : ""))
                    .style("border", '0.08vw solid ' + d.color + '66')
                    .style("left", ((d3.event.pageX - $(".d3_tooltip").width() / 2 - 5) / document.documentElement.clientWidth) * 100 + "vw")
                    .style("top", ((d3.event.pageY - 50) / document.documentElement.clientWidth) * 100 + "vw");
            })
            .on("mouseout", function (d, i) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

            if (dispLabels) {
                chart.selectAll("dot")
                           .data(dataIntermediate[i])
                           .enter().append("circle")
                .attr("id", function (d) {
                    /*Data Label*/
                    var context = d3.select(this.parentNode);
                    context.append("text")//value
                        .attr("class", "percentage")
                        .attr("x", x(d.x) + x.rangeBand() / 2 - 7)
                        .attr("y", y(d.y) - 10)
                        .text((d.y == undefined || d.y == null) ? "NA" : (d.y.toFixed(0) + (d.x.toUpperCase() == "AVERAGE ITEMS PER OCCASION" || d.year.toUpperCase() == "AVERAGE ITEMS PER OCCASION"? '' : "%")))
                        .style("fill", d.scolor);
                    context.append("text")//change 
                        .attr("class", "change")
                        .attr("x", x(d.x) + x.rangeBand() / 2 - 7 + 25)
                        .attr("y", y(d.y) - 10)
                        .text((d.y != undefined && d.y != null) ? (d.c != null ? " (" + formatChange(d.c) + ")" : "") : "")
                        .style("fill", "black");
                    /*Data Label*/
                    var tmpCount = ++countID;
                    return "circle" + i + "_" + tmpCount;
                })
            }
        }


        //remove niceScroll if it is there
        if (angular.element(cur_ele).getNiceScroll().length != 0) {
            angular.element("#chart-visualisation").getNiceScroll().remove();
        }
        //$(".y.axis.trendaxis text").append("%");
    }

    /*Legends Start*/
    //Createv div for Legends
    $(cur_ele).append('<div class="legend-container-hr"></div>');
    //Append legend items
    let maxWidthOfLegends = (xValues.length > 13 ? 6.2 : 13.2);
    xValues.forEach(function (d, i) {
        let appendStyle = "";
        if (disableLegendList != undefined && disableLegendList.length > 0 && disableLegendList.indexOf(i) > -1)
            appendStyle = "opacity: 0.5";
        if (bestInClassSelection) {
            if (document.querySelectorAll('.filter-block-subdiv[data-filter-for="Row"] .filterTextSelectn')[0].innerText == "RETAILERS") {
                $('.legend-container-hr').append('<span style="max-width:' + maxWidthOfLegends + 'vw;' + appendStyle + '" class="legend-items-hr no-border  ' + (global_filter_for_charts.indexOf(i) != -1 ? 'labelDisabled' : '') + '" data-index="' + i + '"><span class="legend-sqr-bdr" style="background-color:' + withBestInClassColor_start[i] + '"></span><span style="padding:0 0.37vw;" title="' + d + '">' + d + '</span></span>');
            }
            else {
                $('.legend-container-hr').append('<span style="max-width:' + maxWidthOfLegends + 'vw;' + appendStyle + '" class="legend-items-hr no-border  ' + (global_filter_for_charts.indexOf(i) != -1 ? 'labelDisabled' : '') + '" data-index="' + i + '"><span class="legend-sqr-bdr" style="background-color:' + color_start[i] + '"></span><span style="padding:0 0.37vw;" title="' + d + '">' + d + '</span></span>');
            }
        }
        else {
            $('.legend-container-hr').append('<span style="max-width:' + maxWidthOfLegends + 'vw;' + appendStyle + '" class="legend-items-hr no-border  ' + (global_filter_for_charts.indexOf(i) != -1 ? 'labelDisabled' : '') + '" data-index="' + i + '"><span class="legend-sqr-bdr" style="background-color:' + color_start[i] + '"></span><span style="padding:0 0.37vw;" title="' + d + '">' + d + '</span></span>');
        }
    });
    // When a button change, I run the update function
    d3.selectAll(".legend-items-hr").on("click", function (d) {
        cb = d3.select(this);
        grp = parseInt(cb.attr("data-index")) + 1;
        if (cb.style("opacity") != "0.5")
            cb.style("opacity", "0.5");
        else
            cb.style("opacity", "1");
        disableLegendList = [];
        if ($(".legend-items-hr").length > 0)
            angular.forEach($(".legend-items-hr"), function (a, b) {
                if (angular.element(a).attr("style").indexOf("opacity: 0.5") > -1)
                    disableLegendList.push(parseInt(angular.element(a).attr("data-index")));
            })
        let tempdata = angular.copy(stackChartData);
        angular.forEach(disableLegendList.reverse(), function (a, b) {
            angular.forEach(tempdata, function (c, d) {
                c.data.splice(a, 1);
            })
        })
        plot_trend_chart(tempdata, false, "", true, $($('#dispLabel div:last-child')[1]).hasClass('chkbox_active'), disableLegendList);
    });
    /*Legends End*/
    if (angular.element('.chartArea').getNiceScroll().length > 0)
        angular.element('.chartArea').getNiceScroll()[0].remove();
}
/**********************************************Trend Chart******************************/
/************************************************End**********************************/
/********************************Formatting Start*******************************************/
var formatVolume = function (val, ss, __isScore) {
    var __starOnVolume = '';
    if ($(".pngSubMenu").find(".subMenuSelected").text() == "SHOPPERS PROFILE") {
        if (val == -9999) { return 'NA'; }
    }
    else {
        if (ss == -9999) { return 'NA'; }
        //if (ss < 20) { return 'NA*'; }
        if (ss < 20) { return 'NA'; }
        if (val == -9999) { return 'NA'; }
        if (ss >= 20 && ss < insufficientSample) { __starOnVolume = '*'; }
        //if (ss >= 20 && ss < 30) { __starOnVolume = '*'; }
        //if (__starOnVolume != '') {
        //    return 'NA';
        //}
    }
    //if (document.querySelectorAll('.filter-block-subdiv[data-filter-for="Measure"] .filterTextSelectn')[0].innerText == "COLUMN %") {
    return (__isScore ? (parseFloat(val).toFixed(1) + __starOnVolume) : parseFloat(val).toFixed(1) + __starOnVolume) + '%';
    //}
    //else {
    //    return (__isScore ? (parseFloat(val).toFixed(1) + __starOnVolume) : parseFloat(val).toFixed(1) + __starOnVolume);// + '%'
    //}

}
var formatChange = function (val) {
    if (val == -9999) { return ''; }
    if (parseFloat(val) > 0) { return '+' + parseFloat(val).toFixed(1); }
    return parseFloat(val).toFixed(1);
}
var convertToTreeViewData = function (_d) {
    var _rootName = "SHOPPER COMMITMENT";
    var _temp_treeData = [{
        "name": _rootName,
        "parent": "null",
        "children": []
    }];
    _d.forEach(function (d, i) {
        var _pillar = {
            "name": d.name,
            "parent": _rootName,
            "d": d.d,
            "c": d.c,
            "ss": d.ss,
            "children": []
        };
        d.children.forEach(function (e, j) {
            var _subPillar = {
                "name": e.name,
                "parent": d.name,
                "d": e.d,
                "c": e.c,
                "ss": e.ss,
                "children": []
            };
            e.children.forEach(function (f, k) {
                var _attr = {
                    "name": f.name,
                    "parent": e.name,
                    "d": f.d,
                    "c": f.c,
                    "ss": f.ss,
                    "children": []
                };
                _subPillar.children.push(_attr);
            });
            _pillar.children.push(_subPillar);
        });
        _temp_treeData[0].children.push(_pillar);
    });
    return _temp_treeData;
}
/////////////////////////////////////////////////////////////////////////////////////////
var plot_tree_view = function (_ele, _data) {
    var _cur_ele = _ele;
    $(_cur_ele).html('');
    var _treeData = convertToTreeViewData(_data);
    var margin = { top: 5, right: 100, bottom: 5, left: 180 },
        width = $(_cur_ele).width() - margin.right - margin.left,
        height = $(_cur_ele).height() - margin.top - margin.bottom;
    var i = 0,
        duration = 750,
        root;
    var tree = d3.layout.tree()
        .size([height, width]);
    var diagonal = d3.svg.diagonal()
        .projection(function (d) { return [d.y, d.x]; });

    var svg = d3.select(_cur_ele).append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    root = _treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;
    update(root);
    d3.select(self.frameElement).style("height", "36.6vw");

    function update(source) {
        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);
        // Normalize for fixed-depth.
        nodes.forEach(function (d) { d.y = d.depth * 180; });
        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) { return d.id || (d.id = ++i); });
        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("click", click);
        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) { return d._children ? "888888" : "#dadada"; });
        nodeEnter.append("text")
            .attr("x", function (d) { return d.children || d._children ? -13 : 13; })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
            .text(function (d) { return d.name; })
            .style("fill-opacity", 1e-6).style("fill", function (d) {
                return (d.c == null || d.c == undefined ? 'BLACK' : (d.c == 'YELLOW' ? 'BLACK' : (d.c == 'RED' || d.c == 'GREEN' ? d.c : 'BLACK')));
            });

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 3)
            .style("fill", function (d) { return d._children ? "#888888" : "#dadada"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            }).style('fill', 'none').style('stroke', '#AAA').style('stroke-width', '1');

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}
/********************************Formatting End*******************************************/