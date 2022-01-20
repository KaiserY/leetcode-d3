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
    data: [
      ["2", "4", "3"],
      ["5", "6", "4"],
      ["", "", ""],
      ["", "", ""],
    ],
    x: 160,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var inputMatrixVLine: D3MatrixVLine = {
    id: "inputMatrixVLine",
    name: "i",
    index: 0,
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        inputMatrix.data = [
          ["2", "4", "3"],
          ["5", "6", "4"],
          ["", "", ""],
          ["", "", ""],
        ];
        inputMatrixVLine.index = 0;
        break;
      case 1:
        inputMatrix.data = [
          ["2", "4", "3"],
          ["5", "6", "4"],
          ["", "", ""],
          ["7", "", ""],
        ];
        inputMatrixVLine.index = 0;
        break;
      case 2:
        inputMatrix.data = [
          ["2", "4", "3"],
          ["5", "6", "4"],
          ["", "", "1"],
          ["7", "0", ""],
        ];
        inputMatrixVLine.index = 1;
        break;
      case 3:
        inputMatrix.data = [
          ["2", "4", "3"],
          ["5", "6", "4"],
          ["", "", "1"],
          ["7", "0", "8"],
        ];
        inputMatrixVLine.index = 2;
        break;
    }

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);

    if (step > 3) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
