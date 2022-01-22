<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import {
  D3Matrix,
  D3MatrixPoint,
  drawD3Matrix,
  drawD3MatrixPoint,
} from "../d3js/matrix";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var dpMatrix: D3Matrix = {
    id: "dpMatrix",
    data: [
      ["", "", "a", "b", "*", "."],
      ["", "", "", "", "", ""],
      ["a", "", "", "", "", ""],
      ["b", "", "", "", "", ""],
      ["b", "", "", "", "", ""],
      ["c", "", "", "", "", ""],
    ],
    x: 48,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var dpMatrixPoint: D3MatrixPoint = {
    id: "dpMatrixPoint",
    name: "dp",
    x: 1,
    y: 1,
  };

  drawD3Matrix(d3js, dpMatrix);
  drawD3MatrixPoint(d3js, dpMatrix, dpMatrixPoint);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        dpMatrix.data = [
          ["", "", "a", "b", "*", "."],
          ["", "", "", "", "", ""],
          ["a", "", "", "", "", ""],
          ["b", "", "", "", "", ""],
          ["b", "", "", "", "", ""],
          ["c", "", "", "", "", ""],
        ];
        dpMatrixPoint.x = 1;
        dpMatrixPoint.y = 1;
        break;
      case 1:
        dpMatrix.data = [
          ["", "", "a", "b", "*", "."],
          ["", "T", "", "", "", ""],
          ["a", "F", "", "", "", ""],
          ["b", "F", "", "", "", ""],
          ["b", "F", "", "", "", ""],
          ["c", "F", "", "", "", ""],
        ];
        dpMatrixPoint.x = 1;
        dpMatrixPoint.y = 1;
        break;
      case 2:
        dpMatrix.data[1][2] = "F";
        dpMatrixPoint.x = 2;
        dpMatrixPoint.y = 1;
        break;
      case 3:
        dpMatrix.data[1][3] = "F";
        dpMatrixPoint.x = 3;
        dpMatrixPoint.y = 1;
        break;
      case 4:
        dpMatrix.data[1][4] = "F";
        dpMatrixPoint.x = 4;
        dpMatrixPoint.y = 1;
        break;
      case 5:
        dpMatrix.data[1][5] = "F";
        dpMatrixPoint.x = 5;
        dpMatrixPoint.y = 1;
        break;
      case 6:
        dpMatrix.data[2][2] = "T";
        dpMatrixPoint.x = 2;
        dpMatrixPoint.y = 2;
        break;
      case 7:
        dpMatrix.data[2][3] = "F";
        dpMatrixPoint.x = 3;
        dpMatrixPoint.y = 2;
        break;
      case 8:
        dpMatrix.data[2][4] = "T";
        dpMatrixPoint.x = 4;
        dpMatrixPoint.y = 2;
        break;
      case 9:
        dpMatrix.data[2][5] = "F";
        dpMatrixPoint.x = 5;
        dpMatrixPoint.y = 2;
        break;
      case 10:
        dpMatrix.data[3][2] = "F";
        dpMatrixPoint.x = 2;
        dpMatrixPoint.y = 3;
        break;
      case 11:
        dpMatrix.data[3][3] = "T";
        dpMatrixPoint.x = 3;
        dpMatrixPoint.y = 3;
        break;
      case 12:
        dpMatrix.data[3][4] = "T";
        dpMatrixPoint.x = 4;
        dpMatrixPoint.y = 3;
        break;
      case 13:
        dpMatrix.data[3][5] = "T";
        dpMatrixPoint.x = 5;
        dpMatrixPoint.y = 3;
        break;
      case 14:
        dpMatrix.data[4][2] = "F";
        dpMatrixPoint.x = 2;
        dpMatrixPoint.y = 4;
        break;
      case 15:
        dpMatrix.data[4][3] = "F";
        dpMatrixPoint.x = 3;
        dpMatrixPoint.y = 4;
        break;
      case 16:
        dpMatrix.data[4][4] = "T";
        dpMatrixPoint.x = 4;
        dpMatrixPoint.y = 4;
        break;
      case 17:
        dpMatrix.data[4][5] = "T";
        dpMatrixPoint.x = 5;
        dpMatrixPoint.y = 4;
        break;
      case 18:
        dpMatrix.data[5][2] = "F";
        dpMatrixPoint.x = 2;
        dpMatrixPoint.y = 5;
        break;
      case 19:
        dpMatrix.data[5][3] = "F";
        dpMatrixPoint.x = 3;
        dpMatrixPoint.y = 5;
        break;
      case 20:
        dpMatrix.data[5][4] = "F";
        dpMatrixPoint.x = 4;
        dpMatrixPoint.y = 5;
        break;
      case 21:
        dpMatrix.data[5][5] = "T";
        dpMatrixPoint.x = 5;
        dpMatrixPoint.y = 5;
        break;
    }
    drawD3Matrix(d3js, dpMatrix);
    drawD3MatrixPoint(d3js, dpMatrix, dpMatrixPoint);

    if (step > 21) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
