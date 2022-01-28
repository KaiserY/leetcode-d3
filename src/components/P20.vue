<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import {
  D3Matrix,
  D3MatrixVLine,
  drawD3Matrix,
  drawD3MatrixVLine,
} from "../d3js/matrix";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var inputMatrix: D3Matrix = {
    id: "inputMatrix",
    data: [["(", ")", "[", "]", "{", "}"]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var inputMatrixVLine: D3MatrixVLine = {
    id: "inputMatrixVLine",
    name: "i",
    index: 0,
    upper: true,
  };

  var mapMatrix: D3Matrix = {
    id: "mapMatrix",
    data: [
      [")", "("],
      ["}", "{"],
      ["]", "["],
    ],
    x: 240,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stackMatrix: D3Matrix = {
    id: "stackMatrix",
    data: [["", "", "", ""]],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{ i: 0, stack: ["", "", "", ""] }];

  isValid("()[]{}", steps);

  setInterval(() => {
    inputMatrixVLine.index = steps[stepIndex].i;
    stackMatrix.data = [steps[stepIndex].stack];

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
    drawD3Matrix(d3js, mapMatrix);
    drawD3Matrix(d3js, stackMatrix);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});

function isValid(s: string, steps: Step[]): boolean {
  var v: string[] = [];
  var pMap: Map<string, string> = new Map([
    [")", "("],
    ["}", "{"],
    ["]", "["],
  ]);

  for (let i = 0; i < s.length; i++) {
    if (pMap.has(s[i])) {
      if (v.pop() != pMap.get(s[i])) {
        var tempStack = ["", "", "", ""];

        for (let j = 0; j < v.length; j++) {
          tempStack[i] = v[j];
        }

        steps.push({ i: i, stack: tempStack });

        return false;
      }
    } else {
      v.push(s[i]);
    }

    var tempStack = ["", "", "", ""];

    for (let j = 0; j < v.length; j++) {
      tempStack[j] = v[j];
    }

    steps.push({ i: i, stack: tempStack });
  }

  return v.length == 0;
}

interface Step {
  stack: string[];
  i: number;
}

const d3svg = ref();
</script>
