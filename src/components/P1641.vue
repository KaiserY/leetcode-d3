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
    data: [["a", "e", "i", "o", "u"]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var inputMatrixVLine: D3MatrixVLine = {
    id: "inputMatrixVLine",
    name: "i",
    index: -1,
    upper: true,
  };

  var countMatrix: D3Matrix = {
    id: "countMatrix",
    data: [[1, 1, 1, 1, 1]],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var countMatrixVLine: D3MatrixVLine = {
    id: "countMatrixVLine",
    name: "i",
    index: -1,
    upper: true,
  };

  var vowelsMatrix: D3Matrix = {
    id: "vowelsMatrix",
    data: [],
    x: 24 * 10,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [],
    x: 24 * 10,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{
    dp: [1, 1, 1, 1, 1],
    vowels: "",
    i: -1,
    sum: 0,
  }];

  countVowelStrings(2, steps);

  setInterval(() => {
    var step = steps[stepIndex];

    countMatrix.data = [step.dp];
    inputMatrixVLine.index = step.i;
    countMatrixVLine.index = step.i;
    vowelsMatrix.data = [[step.vowels]];
    outputMatrix.data = [[step.sum]];

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
    drawD3Matrix(d3js, countMatrix);
    drawD3MatrixVLine(d3js, countMatrix, countMatrixVLine);
    drawD3Matrix(d3js, vowelsMatrix);
    drawD3Matrix(d3js, outputMatrix);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});

function countVowelStrings(n: number, steps: Step[]): number {
  var input = ["a", "e", "i", "o", "u"];
  var dp = [1, 1, 1, 1, 1];
  var sum = 0;
  var vowels = "";

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 5; j++) {
      var count = 0;

      for (let k = j; k < dp.length; k++) {
        vowels = input[j] + input[k];

        count += dp[k];

        var tempDP = JSON.parse(JSON.stringify(dp));
        tempDP[j] = count;

        steps.push({
          dp: tempDP,
          i: j,
          sum: sum,
          vowels: vowels
        });
      }

      dp[j] = count;
    }
  }

  for (let i = 0; i < dp.length; i++) {
    sum += dp[i];

    steps.push({
      dp: JSON.parse(JSON.stringify(dp)),
      i: i,
      sum: sum,
      vowels: n == 1 ? input[i] : ""
    });
  }

  return sum;
};

interface Step {
  dp: number[];
  vowels: string;
  i: number;
  sum: number;
}

const d3svg = ref();
</script>
