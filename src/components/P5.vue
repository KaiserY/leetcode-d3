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
    data: [["b", "a", "b", "a", "d"]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
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
    upper: false,
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [["", "", "", "", ""]],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
  drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
  drawD3Matrix(d3js, outputMatrix);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        leftMatrixVLine.index = 0;
        rightMatrixVLine.index = 0;
        outputMatrix.data = [["", "", "", "", ""]];
        break;
      case 1:
        leftMatrixVLine.index = 0;
        rightMatrixVLine.index = 0;
        outputMatrix.data = [["", "", "", "", ""]];
        break;
      case 2:
        leftMatrixVLine.index = 1;
        rightMatrixVLine.index = 1;
        outputMatrix.data = [["", "", "", "", ""]];
        break;
      case 3:
        leftMatrixVLine.index = 0;
        rightMatrixVLine.index = 2;
        outputMatrix.data = [["b", "a", "b", "", ""]];
        break;
      case 4:
        leftMatrixVLine.index = 2;
        rightMatrixVLine.index = 2;
        outputMatrix.data = [["b", "a", "b", "", ""]];
        break;
      case 5:
        leftMatrixVLine.index = 1;
        rightMatrixVLine.index = 3;
        outputMatrix.data = [["b", "a", "b", "", ""]];
        break;
      case 6:
        leftMatrixVLine.index = 3;
        rightMatrixVLine.index = 3;
        outputMatrix.data = [["b", "a", "b", "", ""]];
        break;
      case 7:
        leftMatrixVLine.index = 4;
        rightMatrixVLine.index = 4;
        outputMatrix.data = [["b", "a", "b", "", ""]];
        break;
    }

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
    drawD3MatrixVLine(d3js, inputMatrix, rightMatrixVLine);
    drawD3Matrix(d3js, outputMatrix);

    if (step > 7) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
