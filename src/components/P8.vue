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
    data: [["", "", "-", "4", "2", "", "w", "o", "r", "d"]],
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
    data: [["", "", "", "", "", "", "", "", "", ""]],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
  drawD3Matrix(d3js, outputMatrix);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        inputMatrixVLine.index = 0;
        outputMatrix.data = [["", "", "", "", "", "", "", "", "", ""]];
        break;
      case 1:
        inputMatrixVLine.index = 0;
        outputMatrix.data = [["", "", "", "", "", "", "", "", "", ""]];
        break;
      case 2:
        inputMatrixVLine.index = 1;
        outputMatrix.data = [["", "", "", "", "", "", "", "", "", ""]];
        break;
      case 3:
        inputMatrixVLine.index = 2;
        outputMatrix.data = [["", "", "", "", "", "", "", "", "", "-"]];
        break;
      case 4:
        inputMatrixVLine.index = 3;
        outputMatrix.data = [["", "", "", "", "", "", "", "", "-", "4"]];
        break;
      case 5:
        inputMatrixVLine.index = 4;
        outputMatrix.data = [["", "", "", "", "", "", "", "-", "4", "2"]];
        break;
      case 6:
        inputMatrixVLine.index = 5;
        outputMatrix.data = [["", "", "", "", "", "", "", "-", "4", "2"]];
        break;
    }

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
    drawD3Matrix(d3js, outputMatrix);

    if (step > 6) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
