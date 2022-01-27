import * as d3 from "d3";

export interface D3BarChart {
  id: string;
  data: BarChartData[];
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface BarChartData {
  x: any;
  y: any;
}

export interface D3BarChartArea {
  id: string;
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
  opacity: number;
}

export function drawD3BarChart(
  d3js: d3.Selection<any, unknown, null, undefined>,
  barchart: D3BarChart
) {
  var gD3BarChart: d3.Selection<any, unknown, null, undefined> = d3js.select(
    "#" + barchart.id
  );

  if (gD3BarChart.empty()) {
    gD3BarChart = d3js.append("g").attr("id", barchart.id);
  }

  gD3BarChart.attr(
    "transform",
    "translate(" + barchart.x + ", " + barchart.y + ")"
  );

  const yScale = d3.scaleLinear().range([barchart.height, 0]).domain([0, 10]);

  gD3BarChart.append("g").call(d3.axisLeft(yScale));

  const xScale = d3
    .scaleBand()
    .range([0, barchart.width])
    .domain(barchart.data.map((d) => d.x))
    .padding(0.9);

  gD3BarChart
    .append("g")
    .attr("transform", "translate(0, " + barchart.height + ")")
    .call(d3.axisBottom(xScale));

  gD3BarChart
    .selectAll()
    .data(barchart.data)
    .enter()
    .append("rect")
    .attr("x", (s) => xScale(s.x)!)
    .attr("y", (s) => yScale(s.y))
    .attr("height", (s) => barchart.height - yScale(s.y))
    .attr("width", xScale.bandwidth());
}

export function drawD3BarChartArea(
  d3js: d3.Selection<any, unknown, null, undefined>,
  barchart: D3BarChart,
  area: D3BarChartArea
) {
  var gD3BarChartArea: d3.Selection<any, unknown, null, undefined> =
    d3js.select("#" + area.id);

  if (gD3BarChartArea.empty()) {
    gD3BarChartArea = d3js.append("g").attr("id", area.id);
  }

  gD3BarChartArea.attr(
    "transform",
    "translate(" + barchart.x + ", " + barchart.y + ")"
  );

  gD3BarChartArea
    .selectAll("rect")
    .data([area.name])
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", area.x)
          .attr("y", area.y)
          .attr("height", area.height)
          .attr("width", area.width)
          .style("fill", area.color)
          .style("opacity", area.opacity),
      (update) =>
        update
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("x", area.x)
          .attr("y", area.y)
          .attr("height", area.height)
          .attr("width", area.width),
      (exit) => exit
    );
}
