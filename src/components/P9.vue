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
    data: [["1", "2", "3", "2", "1"]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var xMatrix: D3Matrix = {
    id: "xMatrix",
    data: [["1", "2", "3", "2", "1"]],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var yMatrix: D3Matrix = {
    id: "yMatrix",
    data: [["", "", "", "", ""]],
    x: 60,
    y: 120,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3Matrix(d3js, xMatrix);
  drawD3Matrix(d3js, yMatrix);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        xMatrix.data = [["1", "2", "3", "2", "1"]];
        yMatrix.data = [["", "", "", "", ""]];
        break;
      case 1:
        xMatrix.data = [["1", "2", "3", "2", "1"]];
        yMatrix.data = [["", "", "", "", ""]];
        break;
      case 2:
        xMatrix.data = [["", "1", "2", "3", "2"]];
        yMatrix.data = [["", "", "", "", "1"]];
        break;
      case 3:
        xMatrix.data = [["", "", "1", "2", "3"]];
        yMatrix.data = [["", "", "", "1", "2"]];
        break;
      case 4:
        xMatrix.data = [["", "", "", "1", "2"]];
        yMatrix.data = [["", "", "", "1", "2"]];
        break;
    }

    drawD3Matrix(d3js, inputMatrix);
    drawD3Matrix(d3js, xMatrix);
    drawD3Matrix(d3js, yMatrix);

    if (step > 4) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
