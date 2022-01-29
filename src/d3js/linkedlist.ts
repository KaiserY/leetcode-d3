import * as d3 from "d3";

var previousData = d3.local<any>();

export interface D3LinkedList {
  id: string;
  data: any[];
  x: number;
  y: number;
  cellHeight: number;
  cellWidth: number;
  cellFontSize: string;
  renderData?: any[];
  OldRenderData?: any[];
}

export interface D3LinkedListVLine {
  id: string;
  name: string;
  index: number;
  upper: boolean;
}

export function drawD3BarChart(
  d3js: d3.Selection<any, unknown, null, undefined>,
  linkedList: D3LinkedList
) {
  var gD3LinkedList: d3.Selection<any, unknown, null, undefined> = d3js.select(
    "#" + linkedList.id
  );

  if (gD3LinkedList.empty()) {
    gD3LinkedList = d3js.append("g").attr("id", linkedList.id);
  }

  gD3LinkedList.attr(
    "transform",
    "translate(" + linkedList.x + ", " + linkedList.y + ")"
  );

  linkedList.renderData = [];

  if (linkedList.OldRenderData == null) {
    linkedList.OldRenderData = [];
  }

  for (let i = 0; i < linkedList.data.length; i++) {
    linkedList.renderData[i] = linkedList.data[i];
  }

  linkedList.renderData.push("null");

  gD3LinkedList
    .selectAll("rect")
    .data(linkedList.renderData)
    .join(
      (enter) => {
        var rect = enter.append("rect");
        rect.style("opacity", 0).transition().duration(500).style("opacity", 1);
        return rect;
      },
      (update) => update,
      (exit) => exit.transition().duration(500).style("opacity", 0).remove()
    )
    .attr("x", (_, i) => {
      return linkedList.cellWidth * i * 2;
    })
    .attr("y", 0)
    .attr("height", linkedList.cellHeight)
    .attr("width", linkedList.cellWidth)
    .style("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  gD3LinkedList
    .selectAll("text")
    .data(linkedList.renderData)
    .join(
      (enter) => {
        var text = enter.append("text");
        text
          .style("opacity", 0)
          .transition()
          .duration(500)
          .style("opacity", 1)
          .text((d) => d);

        return text;
      },
      (update) => {
        update
          .filter((d, i) => d != linkedList.OldRenderData![i])
          .style("opacity", 0)
          .transition()
          .duration(500)
          .style("opacity", 1);

        return update.text((d) => d);
      },
      (exit) => exit.transition().duration(500).style("opacity", 0).remove()
    )
    .attr("x", (_, i) => {
      return linkedList.cellWidth * i * 2 + linkedList.cellWidth / 2;
    })
    .attr("y", linkedList.cellHeight / 2)
    .attr("font-family", "Arial Black")
    .attr("font-size", linkedList.cellFontSize)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .style("alignment-baseline", "central");

  gD3LinkedList
    .append("svg:defs")
    .append("svg:marker")
    .attr("id", "arrow")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("viewBox", "0 0 12 12")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
    .style("stroke", "black");

  gD3LinkedList
    .selectAll("line")
    .data(linkedList.data)
    .join(
      (enter) => {
        var line = enter.append("line");
        line
          .attr("x1", (_, i) => {
            return linkedList.cellWidth * (i * 2 + 1);
          })
          .attr("y1", linkedList.cellHeight / 2)
          .attr("x2", (_, i) => {
            return linkedList.cellWidth * (i * 2 + 2) - 2;
          })
          .attr("y2", linkedList.cellHeight / 2)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr("marker-end", "url(#arrow)")
          .style("opacity", 0)
          .transition()
          .duration(500)
          .style("opacity", 1);
        return line;
      },
      (update) =>
        update
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("x1", (_, i) => {
            return linkedList.cellWidth * (i * 2 + 1);
          })
          .attr("y1", linkedList.cellHeight / 2)
          .attr("x2", (_, i) => {
            return linkedList.cellWidth * (i * 2 + 2) - 2;
          })
          .attr("y2", linkedList.cellHeight / 2),
      (exit) => exit.transition().duration(500).style("opacity", 0).remove()
    );

  for (let i = 0; i < linkedList.renderData.length; i++) {
    linkedList.OldRenderData[i] = linkedList.renderData[i];
  }
}

export function drawD3LinkedListVLine(
  d3js: d3.Selection<any, unknown, null, undefined>,
  linkedList: D3LinkedList,
  linkedListVLine: D3LinkedListVLine
) {
  var gD3LinkedListVLine: d3.Selection<any, unknown, null, undefined> =
    d3js.select("#" + linkedListVLine.id);

  if (gD3LinkedListVLine.empty()) {
    gD3LinkedListVLine = d3js
      .append("g")
      .attr("id", linkedListVLine.id)
      .lower();
  }

  gD3LinkedListVLine
    .attr("transform", "translate(" + linkedList.x + ", " + linkedList.y + ")")
    .lower();

  gD3LinkedListVLine
    .append("svg:defs")
    .append("svg:marker")
    .attr("id", "arrow")
    .attr("refX", 6)
    .attr("refY", 6)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("viewBox", "0 0 12 12")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
    .style("stroke", "black");

  var baseX =
    linkedList.cellWidth * linkedListVLine.index * 2 + linkedList.cellWidth / 2;
  var baseY = -linkedList.cellHeight;

  if (!linkedListVLine.upper) {
    baseY = linkedList.cellHeight;
  }

  gD3LinkedListVLine
    .selectAll("line")
    .data([linkedListVLine.index])
    .join(
      (enter) => {
        var line = enter.append("line");
        line
          .attr("x1", baseX)
          .attr("y1", linkedListVLine.upper ? baseY + 12 : baseY + 12)
          .attr("x2", baseX)
          .attr("y2", linkedListVLine.upper ? baseY + 18 : baseY + 6)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr("marker-end", "url(#arrow)")
          .style("opacity", 0)
          .transition()
          .duration(500)
          .style("opacity", 1);
        return line;
      },
      (update) =>
        update
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("x1", baseX)
          .attr("y1", linkedListVLine.upper ? baseY + 12 : baseY + 12)
          .attr("x2", baseX)
          .attr("y2", linkedListVLine.upper ? baseY + 18 : baseY + 6),
      (exit) => exit
    );

  gD3LinkedListVLine
    .selectAll("text")
    .data([linkedListVLine.index])
    .join(
      (enter) => {
        var text = enter.append("text");
        text
          .attr("x", baseX)
          .attr("y", linkedListVLine.upper ? baseY + 8 : baseY + 16)
          .attr("font-family", "Arial Black")
          .attr("font-size", linkedList.cellFontSize)
          .attr("fill", "black")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "central")
          .text(linkedListVLine.name + "=" + linkedListVLine.index)
          .style("opacity", 0)
          .transition()
          .duration(500)
          .style("opacity", 1);
        return text;
      },
      (update) =>
        update
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("x", baseX)
          .attr("y", linkedListVLine.upper ? baseY + 8 : baseY + 16)
          .text(linkedListVLine.name + "=" + linkedListVLine.index),
      (exit) => exit
    );

  gD3LinkedListVLine
    .selectAll("rect")
    .data([linkedListVLine.index])
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", linkedListVLine.index * linkedList.cellWidth * 2)
          .attr("y", 0)
          .attr("height", linkedList.cellHeight)
          .attr("width", linkedList.cellWidth)
          .style("fill", "gray")
          .style("opacity", 0.5),
      (update) =>
        update
          .transition()
          .duration(200)
          .style("opacity", 0)
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr("x", linkedListVLine.index * linkedList.cellWidth * 2)
          .attr("y", 0)
          .transition()
          .duration(200)
          .style("opacity", 0.5),

      (exit) => exit
    );
}
