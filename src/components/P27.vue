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

  var inputD3Matrix: D3Matrix = {
    id: "inputD3Matrix",
    data: [[0, 1, 2, 2, 3, 0, 4, 2]],
    x: 24,
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

  var numsMatrix: D3Matrix = {
    id: "numsMatrix",
    data: [],
    x: 24,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [],
    x: 24,
    y: 120,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{ i: 0, nums: [], output: 0 }];

  removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2, steps);

  setInterval(() => {
    inputMatrixVLine.index = steps[stepIndex].i;
    numsMatrix.data = [steps[stepIndex].nums];
    outputMatrix.data = [[steps[stepIndex].output]];

    drawD3Matrix(d3js, inputD3Matrix);
    drawD3MatrixVLine(d3js, inputD3Matrix, inputMatrixVLine);
    drawD3Matrix(d3js, numsMatrix);
    drawD3Matrix(d3js, outputMatrix);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});

function removeElement(nums: number[], val: number, steps: Step[]): number {
  var size: number = 0;

  var tempNums: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != val) {
      nums[size] = nums[i];
      size += 1;

      tempNums.push(nums[i]);
    }

    steps.push({
      i: i,
      nums: JSON.parse(JSON.stringify(tempNums)),
      output: size,
    });
  }

  return size;
}

interface Step {
  i: number;
  nums: number[];
  output: number;
}

const d3svg = ref();
</script>
