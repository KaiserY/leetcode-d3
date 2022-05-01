<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import {
  D3Matrix,
  D3MatrixHLine,
  D3MatrixPoint,
  drawD3Matrix,
  drawD3MatrixHLine,
  drawD3MatrixPoint,
} from "../d3js/matrix";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var queriesMatrix: D3Matrix = {
    id: "queriesMatrix",
    data: [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var queriesMatrixHLine: D3MatrixHLine = {
    id: "queriesMatrixHLine",
    name: "i",
    index: 0,
    left: true,
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [],
    x: 24 * 10,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var graphMatrix: D3Matrix = {
    id: "graphMatrix",
    data: [],
    x: 24 * 5,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var graphMatrixPoint: D3MatrixPoint = {
    id: "graphMatrixPoint",
    name: "edge",
    x: 0,
    y: 0,
  };

  var stepIndex = 0;

  var steps: Step[] = [{
    i: 0,
    graph: new Map(),
    edge: ["", ""],
    output: [],
  }];

  calcEquation(
    [["a", "b"], ["b", "c"]],
    [2.0, 3.0],
    [["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]],
    steps,
  );

  setInterval(() => {
    var step = steps[stepIndex];

    var vertexes: any[] = Array.from(step.graph.keys()).sort();
    var matrix: any[][] = [];

    matrix[0] = [];

    for (let i = 0; i < vertexes.length; i++) {
      matrix[i + 1] = [];
      matrix[i + 1][0] = vertexes[i];
      matrix[0][i + 1] = vertexes[i];

      var tempEdges = step.graph.get(vertexes[i]);

      for (let j = 0; j < vertexes.length; j++) {
        if (tempEdges == undefined) {
          matrix[i + 1][j + 1] = -1;
        } else if (i == j) {
          matrix[i + 1][j + 1] = 1;
        } else {
          var tempEdge = tempEdges.find(x => x[0] == vertexes[j]);

          if (tempEdge == undefined) {
            matrix[i + 1][j + 1] = -1;
          } else {
            matrix[i + 1][j + 1] = tempEdge[1].toPrecision(1);
          }
        }
      }
    }

    queriesMatrixHLine.index = step.i;
    outputMatrix.data = [step.output];
    graphMatrixPoint.x = vertexes.indexOf(step.edge[1]) + 1;
    graphMatrixPoint.y = vertexes.indexOf(step.edge[0]) + 1;
    graphMatrix.data = matrix;


    drawD3Matrix(d3js, queriesMatrix);
    drawD3MatrixHLine(d3js, queriesMatrix, queriesMatrixHLine);
    drawD3Matrix(d3js, graphMatrix);
    drawD3MatrixPoint(d3js, graphMatrix, graphMatrixPoint);
    drawD3Matrix(d3js, outputMatrix);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});



function calcEquation(equations: string[][], values: number[], queries: string[][], steps: Step[]): number[] {
  var graph: Map<String, [string, number][]> = new Map();

  for (let i = 0; i < equations.length; i++) {
    var start = graph.get(equations[i][0]);

    if (start == undefined) {
      start = [];
      graph.set(equations[i][0], start);
    }

    start.push([equations[i][1], values[i]]);

    var end = graph.get(equations[i][1]);

    if (end == undefined) {
      end = [];
      graph.set(equations[i][1], end);
    }

    end.push([equations[i][0], 1 / values[i]]);
  }

  var answer: number[] = [];

  steps.push({
    i: 0,
    graph: graph,
    edge: ["", ""],
    output: JSON.parse(JSON.stringify(answer))
  });

  for (let i = 0; i < queries.length; i++) {
    const query = queries[i];

    if (!graph.has(query[0]) || !graph.has(query[1])) {
      answer.push(-1);

      steps.push({
        i: i,
        graph: graph,
        edge: [query[0], query[1]],
        output: JSON.parse(JSON.stringify(answer))
      });
    } else if (query[0] == query[1]) {
      answer.push(1);

      steps.push({
        i: i,
        graph: graph,
        edge: [query[0], query[1]],
        output: JSON.parse(JSON.stringify(answer))
      });
    } else {
      var pasts: Set<string> = new Set();
      pasts.add(query[0]);

      var val = -1;

      var stack: [string, number][] = [[query[0], 1]];

      while (stack.length != 0) {
        var node = stack.pop()!;
        var nextNodes = graph.get(node[0])!;

        for (const nextNode of nextNodes) {
          if (!pasts.has(nextNode[0])) {
            pasts.add(nextNode[0]);
            stack.push([nextNode[0], node[1] * nextNode[1]]);

            if (nextNode[0] == query[1]) {
              val = node[1] * nextNode[1];
              stack.splice(0, stack.length);

              var tempAnswer: number[] = JSON.parse(JSON.stringify(answer));
              tempAnswer.push(val);

              steps.push({
                i: i,
                graph: graph,
                edge: [node[0], nextNode[0]],
                output: tempAnswer
              });

              break;
            }
          }

          var tempAnswer: number[] = JSON.parse(JSON.stringify(answer));
          tempAnswer.push(val);

          steps.push({
            i: i,
            graph: graph,
            edge: [node[0], nextNode[0]],
            output: tempAnswer
          });
        }
      }

      answer.push(val);

      steps.push({
        i: i,
        graph: graph,
        edge: ["", ""],
        output: JSON.parse(JSON.stringify(answer))
      });
    }
  }

  return answer;
};

interface Step {
  i: number;
  graph: Map<String, [string, number][]>;
  edge: [string, string];
  output: any[];
}

const d3svg = ref();
</script>
