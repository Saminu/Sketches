function BarChart() {
    var width,
        height,
        xScale = d3.scaleBand(),
        yScale = d3.scaleLinear(),
        x,
        y,
        margin = {top: 15, bottom: 50, left: 100, right: 20},
        xAxis = d3.axisBottom(xScale),
        yAxis = d3.axisLeft(yScale);

    function my(selection) {

        if (!x) throw new Error("Bar Chart x column must be defined.");
        if (!y) throw new Error("Bar Chart y column must be defined.");
        if (!width) throw new Error("Bar Chart width must be defined.");
        if (!height) throw new Error("Bar Chart height must be defined.");

        selection.each(function (data) {

            var svg = d3.select(this)
                .attr("width", width)
                .attr("height", height);

            var g = svg.selectAll("g")
                .data([1]);
            g = g.enter().append("g")
                .merge(g)
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            var innerWidth = width - margin.left - margin.right;
            var innerHeight = height - margin.top - margin.bottom;

            xScale
                .domain(data.map(function (d) {
                    return d[x];
                }))
                .range([0, innerWidth]);

            yScale
                .domain([0, d3.max(data, function (d) {
                    // console.log(d)
                    return d[y]
                })])
                .range([innerHeight, 0]);

            var xAxisG = g.selectAll(".x-axis").data([1]);
            xAxisG.enter().append("g")
                .attr("class", "x-axis")
                .merge(xAxisG)
                .attr("transform", "translate(0," + innerHeight + ")")
                .call(xAxis);

            var yAxisG = g.selectAll(".y-axis").data([1]);
            yAxisG.enter().append("g")
                .attr("class", "y-axis")
                .merge(yAxisG)
                .call(yAxis);

            var rects = g.selectAll("rect")
                .data(data);
            rects.exit().remove();
            rects.enter().append("rect")
                .merge(rects)
                .attr("x", function (d) {
                    return xScale(d[x]);
                })
                .attr("y", function (d) {
                    console.log(d.date);
                    return yScale(d[y]);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function (d) {
                    return innerHeight - yScale(d[y]);
                });
        });
    }

    my.x = function (_) {
        return arguments.length ? (x = _, my) : x;
    };

    my.y = function (_) {
        return arguments.length ? (y = _, my) : y;
    };

    my.width = function (_) {
        return arguments.length ? (width = _, my) : width;
    };

    my.height = function (_) {
        return arguments.length ? (height = _, my) : height;
    };

    my.padding = function (_) {
        return arguments.length ? (xScale.padding(_), my) : xScale.padding();
    };

    return my;
}