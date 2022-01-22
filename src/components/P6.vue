<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import {
  D3Matrix,
  D3MatrixPoint,
  D3MatrixVLine,
  drawD3Matrix,
  drawD3MatrixPoint,
  drawD3MatrixVLine,
} from "../d3js/matrix";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var inputMatrix: D3Matrix = {
    id: "inputMatrix",
    data: [
      ["P", "A", "Y", "P", "A", "L", "I", "S", "H", "I", "R", "I", "N", "G"],
    ],
    x: 30,
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

  var zigzagMatrix: D3Matrix = {
    id: "zigzagMatrix",
    data: [
      ["P", "", "A", "", "H", "", "N"],
      ["A", "P", "L", "S", "I", "I", "G"],
      ["Y", "", "I", "", "R", "", ""],
    ],
    x: 30,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var zigzagMatrixPoint: D3MatrixPoint = {
    id: "zigzagMatrixPoint",
    name: "j",
    x: 0,
    y: 0,
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [["", "", "", "", "", "", "", "", "", "", "", "", "", ""]],
    x: 30,
    y: 168,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
  drawD3Matrix(d3js, zigzagMatrix);
  drawD3MatrixPoint(d3js, zigzagMatrix, zigzagMatrixPoint);
  drawD3Matrix(d3js, outputMatrix);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        inputMatrixVLine.index = 0;
        zigzagMatrixPoint.x = 0;
        zigzagMatrixPoint.y = 0;
        outputMatrix.data = [
          ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ];
        break;
      case 1:
        inputMatrixVLine.index = 0;
        zigzagMatrixPoint.x = 0;
        zigzagMatrixPoint.y = 0;
        outputMatrix.data = [
          ["P", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        ];
        break;
      case 2:
        inputMatrixVLine.index = 4;
        zigzagMatrixPoint.x = 2;
        zigzagMatrixPoint.y = 0;
        outputMatrix.data = [
          ["P", "A", "", "", "", "", "", "", "", "", "", "", "", ""],
        ];
        break;
      case 3:
        inputMatrixVLine.index = 8;
        zigzagMatrixPoint.x = 4;
        zigzagMatrixPoint.y = 0;
        outputMatrix.data = [
          ["P", "A", "H", "", "", "", "", "", "", "", "", "", "", ""],
        ];
        break;
      case 4:
        inputMatrixVLine.index = 12;
        zigzagMatrixPoint.x = 6;
        zigzagMatrixPoint.y = 0;
        outputMatrix.data = [
          ["P", "A", "H", "N", "", "", "", "", "", "", "", "", "", ""],
        ];
        break;
      case 5:
        inputMatrixVLine.index = 1;
        zigzagMatrixPoint.x = 0;
        zigzagMatrixPoint.y = 1;
        outputMatrix.data = [
          ["P", "A", "H", "N", "A", "", "", "", "", "", "", "", "", ""],
        ];
        break;
      case 6:
        inputMatrixVLine.index = 3;
        zigzagMatrixPoint.x = 1;
        zigzagMatrixPoint.y = 1;
        outputMatrix.data = [
          ["P", "A", "H", "N", "A", "P", "", "", "", "", "", "", "", ""],
        ];
        break;
      case 7:
        inputMatrixVLine.index = 5;
        zigzagMatrixPoint.x = 2;
        zigzagMatrixPoint.y = 1;
        outputMatrix.data = [
          ["P", "A", "H", "N", "A", "P", "L", "", "", "", "", "", "", ""],
        ];
        break;
      case 8:
        inputMatrixVLine.index = 7;
        zigzagMatrixPoint.x = 3;
        zigzagMatrixPoint.y = 1;
        outputMatrix.data = [
          ["P", "A", "H", "N", "A", "P", "L", "S", "", "", "", "", "", ""],
        ];
        break;
      case 9:
        inputMatrixVLine.index = 9;
        zigzagMatrixPoint.x = 4;
        zigzagMatrixPoint.y = 1;
        outputMatrix.data = [
          ["P", "A", "H", "N", "A", "P", "L", "S", "I", "", "", "", "", ""],
        ];
        break;
      case 10:
        inputMatrixVLine.index = 11;
        zigzagMatrixPoint.x = 5;
        zigzagMatrixPoint.y = 1;
        outputMatrix.data = [
          ["P", "A", "H", "N", "A", "P", "L", "S", "I", "I", "", "", "", ""],
        ];
        break;
      case 11:
        inputMatrixVLine.index = 13;
        zigzagMatrixPoint.x = 6;
        zigzagMatrixPoint.y = 1;
        outputMatrix.data = [
          ["P", "A", "H", "N", "A", "P", "L", "S", "I", "I", "G", "", "", ""],
        ];
        break;
      case 12:
        inputMatrixVLine.index = 2;
        zigzagMatrixPoint.x = 0;
        zigzagMatrixPoint.y = 2;
        outputMatrix.data = [
          ["P", "A", "H", "N", "A", "P", "L", "S", "I", "I", "G", "Y", "", ""],
        ];
        break;
      case 13:
        inputMatrixVLine.index = 6;
        zigzagMatrixPoint.x = 2;
        zigzagMatrixPoint.y = 2;
        outputMatrix.data = [
          ["P", "A", "H", "N", "A", "P", "L", "S", "I", "I", "G", "Y", "I", ""],
        ];
        break;
      case 14:
        inputMatrixVLine.index = 10;
        zigzagMatrixPoint.x = 4;
        zigzagMatrixPoint.y = 2;
        outputMatrix.data = [
          [
            "P",
            "A",
            "H",
            "N",
            "A",
            "P",
            "L",
            "S",
            "I",
            "I",
            "G",
            "Y",
            "I",
            "R",
          ],
        ];
        break;
    }

    drawD3Matrix(d3js, inputMatrix);
    drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
    drawD3Matrix(d3js, zigzagMatrix);
    drawD3MatrixPoint(d3js, zigzagMatrix, zigzagMatrixPoint);
    drawD3Matrix(d3js, outputMatrix);

    if (step > 14) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
