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
    data: [[1, 0, -1, 0, -2, 2]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var iMatrixVLine: D3MatrixVLine = {
    id: "iMatrixVLine",
    name: "i",
    index: 0,
    upper: true,
  };

  var jMatrixVLine: D3MatrixVLine = {
    id: "jMatrixVLine",
    name: "j",
    index: 0,
    upper: true,
  };

  var leftMatrixVLine: D3MatrixVLine = {
    id: "leftMatrixVLine",
    name: "l",
    index: 0,
    upper: true,
  };

  var rightMatrixVLine: D3MatrixVLine = {
    id: "rightMatrixVLine",
    name: "r",
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

  var steps: Step[] = [
    {
      input: [1, 0, -1, 0, -2, 2],
      i: 0,
      j: 0,
      left: 0,
      right: 0,
      output: [],
    },
  ];

  fourSum([1, 0, -1, 0, -2, 2], 0, steps);

  var stepIndex = 0;

  setInterval(() => {
    inputMatrix.data = [steps[stepIndex].input];
    iMatrixVLine.index = steps[stepIndex].i;
    jMatrixVLine.index = steps[stepIndex].j;
    leftMatrixVLine.index = steps[stepIndex].left;
    rightMatrixVLine.index = steps[stepIndex].right;
    outputMatrix.data = steps[stepIndex].output;

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, iMatrixVLine);
    drawD3MatrixVLine(d3js, inputMatrix, jMatrixVLine);
    drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
    drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
    drawD3Matrix(d3js, outputMatrix);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});

function fourSum(nums: number[], target: number, steps: Step[]): number[][] {
  var res: number[][] = [];

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 1; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) {
      continue;
    }

    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] == nums[j - 1]) {
        continue;
      }

      var left = j + 1;
      var right = nums.length - 1;

      while (left < right) {
        var tmp = nums[i] + nums[j] + nums[left] + nums[right];
        if (tmp == target) {
          res.push([nums[i], nums[j], nums[left], nums[right]]);
          left += 1;
          right -= 1;

          while (left < right && nums[left] == nums[left - 1]) {
            left += 1;
          }
          while (left < right && nums[right] == nums[right + 1]) {
            right -= 1;
          }
        } else if (tmp < target) {
          left += 1;
        } else if (tmp > target) {
          right -= 1;
        }

        steps.push({
          input: nums,
          i: i,
          j: j,
          left: left,
          right: right,
          output: JSON.parse(JSON.stringify(res)),
        });
      }
    }
  }

  return [];
}

interface Step {
  input: number[];
  i: number;
  j: number;
  left: number;
  right: number;
  output: any[][];
}

const d3svg = ref();
</script>
