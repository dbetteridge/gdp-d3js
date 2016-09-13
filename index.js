var data;
var dataset;


d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", function(json) {displayData(json)});
    

function displayData(data){
    var h = 800;
    var w = 1000;
    var barPadding = 10;
    dataset = data.data;
    var gdpValues = dataset.map(function(data){
        return data[1];
    });

    var dates = dataset.map(function(data){
        return data[0];
    });
    var yScale = d3.scaleLinear()
    .domain([Math.min.apply(Math, gdpValues),Math.max.apply(Math,gdpValues)])
    .range([10, h-50]);

    var yScaleAxis = d3.scaleLinear()
    .domain([d3.max(gdpValues),d3.min(gdpValues)])
    .range([10, h-50]);

    var xScale = d3.scaleLinear()
                     .domain([0, dataset.length])
                     .range([10, w]);

    var xScaleAxis = d3.scaleTime()
                     .domain([new Date(dates[0]), new Date(dates[dates.length-1])])
                     .range([10, w]);


    var monthScale = d3.scaleTime()
                    .domain([1,2,3,4,5,6,7,8,9,10,11,12])
                    .range(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    
    var xAxis = d3.axisBottom(xScaleAxis).ticks(d3.timeYear.every(5));
    var yAxis = d3.axisRight(yScaleAxis);
    var svg = d3.select("body").append("svg").attr("width", w+50).attr("height", h).attr("class","frame");
    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attrs({
        "x": function(d) { return xScaleAxis(new Date(d[0])); },
        "y": function(d) { return (h-50) - yScale(d[1]); },
        "height": function(d) { return yScale(d[1]) + 'px';},
        "width": function(){ return (xScale(1) - barPadding);},
        "class": "card",
        "fill": "gray"
    })
    .on("mouseover", function(d) {
        var xPosition = parseFloat(d3.select(this).attr("x"));
        var yPosition = parseFloat(d3.select(this).attr("y"));
        d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("left", xPosition + "px")
        .style("top", yPosition + "px")
        .append("p")
        .text("$" + d[1]+ " Billion")
        .append("p")
        .text(monthScale((new Date(d[0])).getMonth()) + " - " + (new Date(d[0])).getFullYear());

    })
    .on("mouseout", function(d) {
        d3.select(".tooltip").remove();
      
    });
    svg.append("g")
    .attr("transform", "translate(10,"+(h-50)+")")
    .attr("class", "xAxis")
    .call(xAxis);
    svg.append("g")
    .attr("transform", "translate(10,0)")
    .attr("class", "yAxis")
    .call(yAxis);

    
}

