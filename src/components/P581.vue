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
    data: [[2, 6, 4, 8, 10, 9, 15]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var leftVLine: D3MatrixVLine = {
    id: "leftVLine",
    name: "left",
    index: 0,
    upper: false,
  };

  var startVLine: D3MatrixVLine = {
    id: "startVLine",
    name: "start",
    index: 0,
    upper: true,
  };

  var endVLine: D3MatrixVLine = {
    id: "endVLine",
    name: "end",
    index: 0,
    upper: true,
  };

  var smallestMatrix: D3Matrix = {
    id: "smallestMatrix",
    data: [],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var largestMatrix: D3Matrix = {
    id: "largestMatrix",
    data: [],
    x: 12 + 24 * 8,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [],
    x: 60,
    y: 120,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{
    left: 0,
    start: 6,
    end: 0,
    smallest: -1,
    largest: -1,
    output: 0
  }];

  findUnsortedSubarray(
    [2, 6, 4, 8, 10, 9, 15],
    steps,
  );

  setInterval(() => {
    var step = steps[stepIndex];

    leftVLine.index = step.left;
    startVLine.index = step.start;
    endVLine.index = step.end;
    smallestMatrix.data = [[step.smallest]];
    largestMatrix.data = [[step.largest]];
    outputMatrix.data = [[step.output]];


    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, startVLine);
    drawD3MatrixVLine(d3js, inputMatrix, endVLine);
    drawD3MatrixVLine(d3js, inputMatrix, leftVLine);
    drawD3Matrix(d3js, smallestMatrix);
    drawD3Matrix(d3js, largestMatrix);
    drawD3Matrix(d3js, outputMatrix);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});

function findUnsortedSubarray(nums: number[], steps: Step[]): number {
  const maxIntegerNumber = Math.pow(2, 31) - 1;

  if (nums.length == 1) {
    return 0;
  }

  var left = 0;
  var start = nums.length - 1;
  var end = 0;
  var largest = -1;
  var smallest = -1;

  while (left < nums.length) {
    largest = Math.max(largest, nums[left]);

    if (left + 1 < nums.length && nums[left + 1] < nums[left] && start > left) {
      start = left;

      steps.push({
        left,
        start,
        end,
        largest,
        smallest,
        output: 0,
      });

      while (start - 1 >= 0 && start - 1 < maxIntegerNumber) {
        if (nums[start - 1] > nums[left + 1]) {
          start -= 1;

          steps.push({
            left,
            start,
            end,
            largest,
            smallest,
            output: 0,
          });
        } else {
          break;
        }
      }
    }

    if (left + 1 < nums.length && (nums[left + 1] < largest || nums[left + 1] < nums[start])) {
      end = left + 1;

      steps.push({
        left,
        start,
        end,
        largest,
        smallest,
        output: 0,
      });
    }

    steps.push({
      left,
      start,
      end,
      largest,
      smallest,
      output: 0,
    });

    left += 1;
  }

  smallest = largest;

  steps.push({
    left,
    start,
    end,
    largest,
    smallest,
    output: 0,
  });

  for (let i = start; i <= end; i++) {
    if (smallest > nums[i]) {
      smallest = nums[i];

      steps.push({
        left,
        start,
        end,
        largest,
        smallest,
        output: 0,
      });
    }
  }

  while (start - 1 >= 0 && start - 1 < maxIntegerNumber) {
    if (nums[start - 1] > smallest) {
      start -= 1;

      steps.push({
        left,
        start,
        end,
        largest,
        smallest,
        output: 0,
      });
    } else {
      break;
    }
  }

  if (start == nums.length - 1) {
    steps.push({
      left,
      start,
      end,
      largest,
      smallest,
      output: 0,
    });

    return 0;
  } else {
    steps.push({
      left,
      start,
      end,
      largest,
      smallest,
      output: end - start + 1,
    });

    return end - start + 1;
  }
};

interface Step {
  left: number;
  start: number;
  end: number;
  largest: number;
  smallest: number;
  output: number;
}

const d3svg = ref();
</script>
