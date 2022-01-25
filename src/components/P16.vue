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
    data: [[-4, -6, 2, 2, 0, 1, 3, -2]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var startMatrixVLine: D3MatrixVLine = {
    id: "startMatrixVLine",
    name: "i",
    index: 0,
    upper: true,
  };

  var leftMatrixVLine: D3MatrixVLine = {
    id: "leftMatrixVLine",
    name: "j",
    index: 1,
    upper: true,
  };

  var rightMatrixVLine: D3MatrixVLine = {
    id: "rightMatrixVLine",
    name: "k",
    index: inputMatrix.data[0].length - 1,
    upper: true,
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3MatrixVLine(d3js, inputMatrix, startMatrixVLine);
  drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
  drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
  drawD3Matrix(d3js, outputMatrix);

  var input: any[] = [-4, -6, 2, 2, 0, 1, 3, -2];
  var output: any[][] = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  var target = 2;
  var res = Math.pow(2, 32);
  var start = 0;
  var left = 1;
  var right = input.length - 1;
  var innerFlag = true;

  var step = 0;
  var rendered = false;
  var initFlag = false;

  setInterval(() => {
    rendered = false;

    if (initFlag) {
      initFlag = false;

      step = 0;
      input = [-4, -6, 2, 2, 0, 1, 3, -2];
      output = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];

      start = 0;
      left = 1;
      right = input.length - 1;

      inputMatrix.data = [input];
      startMatrixVLine.index = start;
      leftMatrixVLine.index = left;
      rightMatrixVLine.index = right;
      outputMatrix.data = output;

      if (!rendered) {
        drawD3Matrix(d3js, inputMatrix);
        drawD3MatrixVLine(d3js, inputMatrix, startMatrixVLine);
        drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
        drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
        drawD3Matrix(d3js, outputMatrix);

        rendered = true;
      }

      return;
    }

    if (step == 0) {
      input.sort((a, b) => a - b);

      inputMatrix.data = [input];

      drawD3Matrix(d3js, inputMatrix);
      drawD3MatrixVLine(d3js, inputMatrix, startMatrixVLine);
      drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
      drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
      drawD3Matrix(d3js, outputMatrix);

      step += 1;

      return;
    }

    if (innerFlag) {
      left = start + 1;
      right = input.length - 1;
    }

    if (left < right) {
      var sum = input[left] + input[right] + input[start];

      if (sum == target) {
        output[0][0] = input[start];
        output[0][1] = input[left];
        output[0][2] = input[right];

        startMatrixVLine.index = start;
        leftMatrixVLine.index = left;
        rightMatrixVLine.index = right;
        outputMatrix.data = output;

        drawD3Matrix(d3js, inputMatrix);
        drawD3MatrixVLine(d3js, inputMatrix, startMatrixVLine);
        drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
        drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
        drawD3Matrix(d3js, outputMatrix);

        initFlag = true;

        return;
      } else if (sum > target) {
        right -= 1;
      } else if (sum < target) {
        left += 1;
      }

      if (Math.abs(target - sum) < Math.abs(target - res) && left < right) {
        res = sum;
      }

      startMatrixVLine.index = start;
      leftMatrixVLine.index = left;
      rightMatrixVLine.index = right;
      outputMatrix.data = output;

      drawD3Matrix(d3js, inputMatrix);
      drawD3MatrixVLine(d3js, inputMatrix, startMatrixVLine);
      drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
      drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
      drawD3Matrix(d3js, outputMatrix);

      step += 1;

      innerFlag = false;

      return;
    }

    innerFlag = true;

    startMatrixVLine.index = start;
    leftMatrixVLine.index = left;
    rightMatrixVLine.index = right;

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, startMatrixVLine);
    drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
    drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
    drawD3Matrix(d3js, outputMatrix);

    start += 1;

    if (start >= input.length - 1) {
      initFlag = true;

      output[0][0] = input[start];
      output[0][1] = input[left];
      output[0][2] = input[right];

      startMatrixVLine.index = start;
      leftMatrixVLine.index = left;
      rightMatrixVLine.index = right;
      outputMatrix.data = output;

      drawD3Matrix(d3js, inputMatrix);
      drawD3MatrixVLine(d3js, inputMatrix, startMatrixVLine);
      drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
      drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
      drawD3Matrix(d3js, outputMatrix);
    }

    step += 1;
  }, 2000);
});

const d3svg = ref();
</script>
