import * as d3 from "d3";

export interface D3Matrix {
  id: string;
  data: any[][];
  x: number;
  y: number;
  cellHeight: number;
  cellWidth: number;
  cellFontSize: string;
  renderData?: string[];
  OldRenderData?: string[];
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
  left: boolean;
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

  var xLength = 0;
  var yLength = Math.max(0, matrix.data.length);

  for (let i = 0; i < matrix.data.length; i++) {
    xLength = Math.max(xLength, matrix.data[i].length);
  }

  var renderX: number[] = [];
  var renderY: number[] = [];

  matrix.renderData = [];

  for (let i = 0; i < yLength; i++) {
    for (let j = 0; j < xLength; j++) {
      var index = xLength * i + j;

      renderX[index] = j;
      renderY[index] = i;
      matrix.renderData[index] = "";
    }
  }

  for (let i = 0; i < matrix.data.length; i++) {
    for (let j = 0; j < matrix.data[i].length; j++) {
      var index = xLength * i + j;

      matrix.renderData[index] = matrix.data[i][j];
    }
  }

  if (matrix.OldRenderData == null) {
    matrix.OldRenderData = [];
  }

  gD3Matrix
    .selectAll("rect")
    .data(matrix.renderData)
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
      return matrix.cellWidth * renderX![i];
    })
    .attr("y", (_, i) => {
      return matrix.cellHeight * renderY![i];
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
      return renderX![i] * matrix.cellWidth + matrix.cellWidth / 2;
    })
    .attr("y", (_, i) => {
      return matrix.cellHeight * renderY![i] + matrix.cellHeight / 2;
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
      (enter) => {
        var line = enter.append("line");
        line
          .attr("x1", baseX)
          .attr("y1", matrixVLine.upper ? baseY + 12 : baseY + 12)
          .attr("x2", baseX)
          .attr("y2", matrixVLine.upper ? baseY + 18 : baseY + 6)
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
          .attr("y1", matrixVLine.upper ? baseY + 12 : baseY + 12)
          .attr("x2", baseX)
          .attr("y2", matrixVLine.upper ? baseY + 18 : baseY + 6),
      (exit) => exit
    );

  gD3MatrixVLine
    .selectAll("text")
    .data([matrixVLine.index])
    .join(
      (enter) => {
        var text = enter.append("text");
        text
          .attr("x", baseX)
          .attr("y", matrixVLine.upper ? baseY + 8 : baseY + 16)
          .attr("font-family", "Arial Black")
          .attr("font-size", matrix.cellFontSize)
          .attr("fill", "black")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "central")
          .text(matrixVLine.name + "=" + matrixVLine.index)
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

export function drawD3MatrixHLine(
  d3js: d3.Selection<any, unknown, null, undefined>,
  matrix: D3Matrix,
  matrixHLine: D3MatrixHLine
) {
  var gD3MatrixHLine: d3.Selection<any, unknown, null, undefined> = d3js.select(
    "#" + matrixHLine.id
  );

  if (gD3MatrixHLine.empty()) {
    gD3MatrixHLine = d3js.append("g").attr("id", matrixHLine.id).lower();
  }

  gD3MatrixHLine
    .attr("transform", "translate(" + matrix.x + ", " + matrix.y + ")")
    .lower();

  gD3MatrixHLine
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

  var baseX = 0;
  var baseY = matrix.cellHeight / 2 + matrix.cellHeight * matrixHLine.index;

  if (!matrixHLine.left) {
    baseX = matrix.data[matrixHLine.index].length * matrix.cellWidth;
  }

  gD3MatrixHLine
    .selectAll("line")
    .data([matrixHLine.index])
    .join(
      (enter) => {
        var line = enter.append("line");
        line
          .attr("x1", matrixHLine.left ? baseX - 12 : baseX + 12)
          .attr("y1", baseY)
          .attr("x2", matrixHLine.left ? baseX - 6 : baseX + 6)
          .attr("y2", baseY)
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
          .attr("x1", matrixHLine.left ? baseX - 12 : baseX + 12)
          .attr("y1", baseY)
          .attr("x2", matrixHLine.left ? baseX - 6 : baseX + 6)
          .attr("y2", baseY),
      (exit) => exit
    );

  gD3MatrixHLine
    .selectAll("text")
    .data([matrixHLine.index])
    .join(
      (enter) => {
        var text = enter.append("text");
        text
          .attr("x", matrixHLine.left ? baseX - 24 : baseX + 24)
          .attr("y", baseY)
          .attr("font-family", "Arial Black")
          .attr("font-size", matrix.cellFontSize)
          .attr("fill", "black")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "central")
          .text(matrixHLine.name + "=" + matrixHLine.index)
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
          .attr("x", matrixHLine.left ? baseX - 24 : baseX + 24)
          .attr("y", baseY)
          .text(matrixHLine.name + "=" + matrixHLine.index),
      (exit) => exit
    );

  var renderRect: number[] = [];

  for (let i = 0; i < matrix.data[matrixHLine.index].length; i++) {
    renderRect[i] = 0;
  }

  gD3MatrixHLine
    .selectAll("rect")
    .data(renderRect)
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", (_, i) => {
            return matrix.cellWidth * i;
          })
          .attr("y", matrixHLine.index * matrix.cellHeight)
          .attr("height", matrix.cellHeight)
          .attr("width", matrix.cellWidth)
          .style("fill", "gray")
          .style("opacity", 0.5),
      (update) =>
        update
          .transition()
          .duration(500)
          .ease(d3.easeLinear)
          .attr("x", (_, i) => {
            return matrix.cellWidth * i;
          })
          .attr("y", matrixHLine.index * matrix.cellHeight),
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
