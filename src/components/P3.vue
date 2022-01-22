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
    data: [["a", "b", "c", "a", "b", "c", "b", "b"]],
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

  var leftMatrixVLine: D3MatrixVLine = {
    id: "leftMatrixVLine",
    name: "left",
    index: 0,
    upper: false,
  };

  var tableMatrix: D3Matrix = {
    id: "tableMatrix",
    data: [
      ["...", "a", "b", "c", "..."],
      ["", "", "", "", ""],
    ],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [["0"]],
    x: 60,
    y: 144,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
  drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
  drawD3Matrix(d3js, tableMatrix);
  drawD3Matrix(d3js, outputMatrix);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        inputMatrixVLine.index = 0;
        leftMatrixVLine.index = 0;
        tableMatrix.data = [
          ["...", "a", "b", "c", "..."],
          ["", "", "", "", ""],
        ];
        outputMatrix.data = [["0"]];
        break;
      case 1:
        inputMatrixVLine.index = 0;
        leftMatrixVLine.index = 0;
        tableMatrix.data = [
          ["...", "a", "b", "c", "..."],
          ["", "0", "", "", ""],
        ];
        outputMatrix.data = [["1"]];
        break;
      case 2:
        inputMatrixVLine.index = 1;
        leftMatrixVLine.index = 0;
        tableMatrix.data = [
          ["...", "a", "b", "c", "..."],
          ["", "0", "1", "", ""],
        ];
        outputMatrix.data = [["2"]];
        break;
      case 3:
        inputMatrixVLine.index = 2;
        leftMatrixVLine.index = 0;
        tableMatrix.data = [
          ["...", "a", "b", "c", "..."],
          ["", "0", "1", "2", ""],
        ];
        outputMatrix.data = [["3"]];
        break;
      case 4:
        inputMatrixVLine.index = 3;
        leftMatrixVLine.index = 1;
        tableMatrix.data = [
          ["...", "a", "b", "c", "..."],
          ["", "3", "1", "2", ""],
        ];
        outputMatrix.data = [["3"]];
        break;
      case 5:
        inputMatrixVLine.index = 4;
        leftMatrixVLine.index = 2;
        tableMatrix.data = [
          ["...", "a", "b", "c", "..."],
          ["", "3", "4", "2", ""],
        ];
        outputMatrix.data = [["3"]];
        break;
      case 6:
        inputMatrixVLine.index = 5;
        leftMatrixVLine.index = 3;
        tableMatrix.data = [
          ["...", "a", "b", "c", "..."],
          ["", "3", "4", "5", ""],
        ];
        outputMatrix.data = [["3"]];
        break;
      case 7:
        inputMatrixVLine.index = 6;
        leftMatrixVLine.index = 5;
        tableMatrix.data = [
          ["...", "a", "b", "c", "..."],
          ["", "3", "6", "5", ""],
        ];
        outputMatrix.data = [["3"]];
        break;
      case 8:
        inputMatrixVLine.index = 7;
        leftMatrixVLine.index = 7;
        tableMatrix.data = [
          ["...", "a", "b", "c", "..."],
          ["", "3", "7", "5", ""],
        ];
        outputMatrix.data = [["3"]];
        break;
    }

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
    drawD3MatrixVLine(d3js, inputMatrix, leftMatrixVLine);
    drawD3Matrix(d3js, tableMatrix);
    drawD3Matrix(d3js, outputMatrix);

    if (step > 8) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
