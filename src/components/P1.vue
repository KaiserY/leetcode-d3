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
    data: [[2, 7, 11, 15]],
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

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var tMapMatrix: D3Matrix = {
    id: "tMapMatrix",
    data: [],
    x: 280,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{
    i: 0,
    m: [],
    output: [],
  }];

  twoSum([2, 7, 11, 15], 9, steps);

  setInterval(() => {
    inputMatrixVLine.index = steps[stepIndex].i;
    tMapMatrix.data = steps[stepIndex].m;
    outputMatrix.data = [steps[stepIndex].output];

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
    drawD3Matrix(d3js, outputMatrix);
    drawD3Matrix(d3js, tMapMatrix);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});

function twoSum(nums: number[], target: number, steps: Step[]): number[] {
  var m: Map<number, number> = new Map();

  for (let i = 0; i < nums.length; i++) {
    let t = target - nums[i];

    let x = m.get(t);

    let mMap: number[][] = [];

    m.forEach((value: number, key: number) => {
      mMap.push([key, value]);
    });

    if (x != undefined) {

      steps.push({ i: i, m: mMap, output: [x, i] });
      return [x, i];
    } else {
      steps.push({ i: i, m: mMap, output: [] });
      m.set(nums[i], i);
    }
  }

  steps.push({ i: nums.length - 1, m: [], output: [] });

  return [];
};

interface Step {
  i: number;
  m: number[][];
  output: any[];
}

const d3svg = ref();
</script>
