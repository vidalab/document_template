/*--- IMPORTANT GUIDELINES ---
1. Use div #canvas-svg for svg rendering
    var svg = d3.select("#canvas-svg");
2. 'data' variable contains JSON data from Data tab
   'config' variable contains data from Properties tab
    Do NOT overwrite these variables
3. To define customizable properties, use capitalized variable names,
    and define them in Properties tab ---*/

var Y_AXIS_LABEL = config.yAxisLabel;

var X_DATA_PARSE = d3.time.format(config.xAxisTimeFormat).parse;

var X_DATA_TICK = d3.time.format("%b-%y");

var X_AXIS_COLUMN = config.xAxis;

var Y_AXIS_COLUMN = config.yAxis;

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = config.width - margin.left - margin.right,
    height = config.height - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(X_DATA_TICK);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.x_axis); })
    .y(function(d) { return y(d.y_axis); });

var svg = d3.select("#canvas-svg").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

data.forEach(function(d) {
  d.x_axis = X_DATA_PARSE(d[X_AXIS_COLUMN]);
  d.y_axis = +(d[Y_AXIS_COLUMN]);
});

x.domain(d3.extent(data, function(d) { return d.x_axis; }));
y.domain(d3.extent(data, function(d) { return d.y_axis; }));

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text(Y_AXIS_LABEL);

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line)
    .attr("stroke", config.lineColor)
    .attr("stroke-width", config.lineThickness);
