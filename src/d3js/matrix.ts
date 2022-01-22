import * as d3 from "d3";

export interface D3Matrix {
  id: string;
  data: string[][];
  x: number;
  y: number;
  cellHeight: number;
  cellWidth: number;
  cellFontSize: string;
  renderData?: string[];
  OldRenderData?: string[];
  renderX?: number[];
  renderY?: number[];
}

export interface D3MatrixVLine {
  id: string;
  name: string;
  index: number;
  upper: boolean;
}

export interface D3MatrixHLine {
  id: string;
  name: string;
  index: number;
}

export interface D3MatrixPoint {
  id: string;
  name: string;
  x: number;
  y: number;
}

export function drawD3Matrix(
  d3js: d3.Selection<any, unknown, null, undefined>,
  matrix: D3Matrix
) {
  var gD3Matrix: d3.Selection<any, unknown, null, undefined> = d3js.select(
    "#" + matrix.id
  );

  if (gD3Matrix.empty()) {
    gD3Matrix = d3js.append("g").attr("id", matrix.id);
  }

  gD3Matrix.attr("transform", "translate(" + matrix.x + ", " + matrix.y + ")");

  if (matrix.renderData == null) {
    matrix.renderData = [];
  }

  if (matrix.renderX == null) {
    matrix.renderX = [];
  }

  if (matrix.renderY == null) {
    matrix.renderY = [];
  }

  if (matrix.OldRenderData == null) {
    matrix.OldRenderData = [];
  }

  for (let i = 0; i < matrix.data.length; i++) {
    for (let j = 0; j < matrix.data[i].length; j++) {
      var index = matrix.data[i].length * i + j;

      matrix.renderX[index] = j;
      matrix.renderY[index] = i;
      matrix.renderData[index] = matrix.data[i][j];
    }
  }

  gD3Matrix
    .selectAll("rect")
    .data(matrix.renderData)
    .join(
      (enter) => enter.append("rect"),
      (update) => update,
      (exit) => exit
    )
    .attr("x", (_, i) => {
      return matrix.cellWidth * matrix.renderX![i];
    })
    .attr("y", (_, i) => {
      return matrix.cellHeight * matrix.renderY![i];
    })
    .attr("height", matrix.cellHeight)
    .attr("width", matrix.cellWidth)
    .style("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  gD3Matrix
    .selectAll("text")
    .data(matrix.renderData)
    .join(
      (enter) => enter.append("text").text((d) => d),

      (update) => {
        update
          .filter((d, i) => d != matrix.OldRenderData![i])
          .style("opacity", 0)
          .transition()
          .duration(500)
          .style("opacity", 1);

        return update.text((d) => d);
      },
      (exit) => exit.transition().duration(500).style("opacity", 0).remove()
    )
    .attr("x", (_, i) => {
      return matrix.renderX![i] * matrix.cellWidth + matrix.cellWidth / 2;
    })
    .attr("y", (_, i) => {
      return matrix.cellHeight * matrix.renderY![i] + matrix.cellHeight / 2;
    })
    .attr("font-family", "Arial Black")
    .attr("font-size", matrix.cellFontSize)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .style("alignment-baseline", "central");

  for (let i = 0; i < matrix.renderData.length; i++) {
    matrix.OldRenderData[i] = matrix.renderData[i];
  }
}

export function drawD3MatrixVLine(
  d3js: d3.Selection<any, unknown, null, undefined>,
  matrix: D3Matrix,
  matrixVLine: D3MatrixVLine
) {
  var gD3MatrixVLine: d3.Selection<any, unknown, null, undefined> = d3js.select(
    "#" + matrixVLine.id
  );

  if (gD3MatrixVLine.empty()) {
    gD3MatrixVLine = d3js.append("g").attr("id", matrixVLine.id).lower();
  }

  gD3MatrixVLine
    .attr("transform", "translate(" + matrix.x + ", " + matrix.y + ")")
    .lower();

  gD3MatrixVLine
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

  var baseX = matrix.cellWidth * matrixVLine.index + matrix.cellWidth / 2;
  var baseY = -matrix.cellHeight;

  if (!matrixVLine.upper) {
    baseY = matrix.data.length * matrix.cellHeight;
  }

  gD3MatrixVLine
    .selectAll("line")
    .data([matrixVLine.index])
    .join(
      (enter) =>
        enter
          .append("line")
          .attr("x1", baseX)
          .attr("y1", matrixVLine.upper ? baseY + 12 : baseY + 12)
          .attr("x2", baseX)
          .attr("y2", matrixVLine.upper ? baseY + 18 : baseY + 6)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr("marker-end", "url(#arrow)"),
      (update) =>
        update
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("x1", baseX)
          .attr("y1", matrixVLine.upper ? baseY + 12 : baseY + 12)
          .attr("x2", baseX)
          .attr("y2", matrixVLine.upper ? baseY + 18 : baseY + 6),
      (exit) => exit
    );

  gD3MatrixVLine
    .selectAll("text")
    .data([matrixVLine.index])
    .join(
      (enter) =>
        enter
          .append("text")
          .attr("x", baseX)
          .attr("y", matrixVLine.upper ? baseY + 8 : baseY + 16)
          .attr("font-family", "Arial Black")
          .attr("font-size", matrix.cellFontSize)
          .attr("fill", "black")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "central")
          .text(matrixVLine.name + "=" + matrixVLine.index),
      (update) =>
        update
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("x", baseX)
          .attr("y", matrixVLine.upper ? baseY + 8 : baseY + 16)
          .text(matrixVLine.name + "=" + matrixVLine.index),
      (exit) => exit
    );

  var renderRect: number[] = [];

  for (let i = 0; i < matrix.data.length; i++) {
    renderRect[i] = 0;
  }

  gD3MatrixVLine
    .selectAll("rect")
    .data(renderRect)
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", matrixVLine.index * matrix.cellWidth)
          .attr("y", (_, i) => {
            return matrix.cellHeight * i;
          })
          .attr("height", matrix.cellHeight)
          .attr("width", matrix.cellWidth)
          .style("fill", "gray")
          .style("opacity", 0.5),
      (update) =>
        update
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("x", matrixVLine.index * matrix.cellWidth)
          .attr("y", (_, i) => {
            return matrix.cellHeight * i;
          }),
      (exit) => exit
    );
}

export function drawD3MatrixPoint(
  d3js: d3.Selection<any, unknown, null, undefined>,
  matrix: D3Matrix,
  matrixPoint: D3MatrixPoint
) {
  var gD3MatrixVLine: d3.Selection<any, unknown, null, undefined> = d3js.select(
    "#" + matrixPoint.id
  );

  if (gD3MatrixVLine.empty()) {
    gD3MatrixVLine = d3js.append("g").attr("id", matrixPoint.id).lower();
  }

  gD3MatrixVLine.attr(
    "transform",
    "translate(" + matrix.x + ", " + matrix.y + ")"
  );

  gD3MatrixVLine
    .selectAll("rect")
    .data([matrixPoint.name])
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", matrixPoint.x * matrix.cellWidth)
          .attr("y", matrixPoint.y * matrix.cellHeight)
          .attr("height", matrix.cellHeight)
          .attr("width", matrix.cellWidth)
          .style("fill", "gray")
          .style("opacity", 0.5),
      (update) =>
        update
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("x", matrixPoint.x * matrix.cellWidth)
          .attr("y", matrixPoint.y * matrix.cellHeight),
      (exit) => exit
    );
}
