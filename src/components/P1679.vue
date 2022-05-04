<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import {
  D3Matrix,
  D3MatrixHLine,
  drawD3Matrix,
  drawD3MatrixHLine,
} from "../d3js/matrix";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var inputMatrix: D3Matrix = {
    id: "inputMatrix",
    data: [[1, 2, 3, 4]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var countMatrix: D3Matrix = {
    id: "countMatrix",
    data: [],
    x: 24 * 9,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var keyMatrixHLine: D3MatrixHLine = {
    id: "keyMatrixHLine",
    name: "i",
    index: -1,
    left: true,
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [],
    x: 24 * 12,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{
    key: -1,
    count: new Map(),
    res: 0
  }];

  maxOperations([1, 2, 3, 4], 5, steps);

  setInterval(() => {
    var step = steps[stepIndex];

    var countArray = Array.from(step.count);
    var countMatrixData: any[][] = [];

    var keyIndex = -1;

    for (let i = 0; i < countArray.length; i++) {
      countMatrixData[i] = [];
      countMatrixData[i][0] = countArray[i][0];
      countMatrixData[i][1] = countArray[i][1];

      if (countArray[i][0] == step.key) {
        keyIndex = i;
      }
    }

    countMatrix.data = countMatrixData;
    keyMatrixHLine.index = keyIndex;
    outputMatrix.data = [[step.res]];


    drawD3Matrix(d3js, inputMatrix);
    drawD3Matrix(d3js, countMatrix);
    drawD3MatrixHLine(d3js, countMatrix, keyMatrixHLine);
    drawD3Matrix(d3js, outputMatrix);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});

function maxOperations(nums: number[], k: number, steps: Step[]): number {
  var count: Map<number, number> = new Map();

  for (let i = 0; i < nums.length; i++) {
    var element = count.get(nums[i]);
    if (element == undefined) {
      count.set(nums[i], 1);
    } else {
      count.set(nums[i], element + 1);
    }
  }

  var res = 0;

  steps.push({
    key: -1,
    count,
    res,
  });

  count.forEach((value: number, key: number) => {
    var a = count.get(key) == undefined ? 0 : value;
    var b = count.get(k - key) == undefined ? 0 : count.get(k - key);
    res += Math.min(a!, b!);

    steps.push({
      key: key,
      count,
      res: res,
    });
  });

  steps.push({
    key: -1,
    count,
    res: res / 2,
  });

  return res / 2;
};

interface Step {
  key: number;
  count: Map<number, number>;
  res: number;
}

const d3svg = ref();
</script>
