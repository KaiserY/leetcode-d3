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
    data: [["1", "2", "3"]],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var remainderMatrix: D3Matrix = {
    id: "remainderMatrix",
    data: [["1", "2", "3"]],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [["", "", "0"]],
    x: 60,
    y: 120,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3Matrix(d3js, remainderMatrix);
  drawD3Matrix(d3js, outputMatrix);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        remainderMatrix.data = [["1", "2", "3"]];
        outputMatrix.data = [["", "", "0"]];
        break;
      case 1:
        remainderMatrix.data = [["1", "2", "3"]];
        outputMatrix.data = [["", "", "0"]];
        break;
      case 2:
        remainderMatrix.data = [["1", "2", "3"]];
        outputMatrix.data = [["", "", "3"]];
        break;
      case 3:
        remainderMatrix.data = [["", "1", "2"]];
        outputMatrix.data = [["", "", "3"]];
        break;
      case 4:
        remainderMatrix.data = [["", "1", "2"]];
        outputMatrix.data = [["", "3", "0"]];
        break;
      case 5:
        remainderMatrix.data = [["", "1", "2"]];
        outputMatrix.data = [["", "3", "2"]];
        break;
      case 6:
        remainderMatrix.data = [["", "", "1"]];
        outputMatrix.data = [["", "3", "2"]];
        break;
      case 7:
        remainderMatrix.data = [["", "", "1"]];
        outputMatrix.data = [["3", "2", "0"]];
        break;
      case 8:
        remainderMatrix.data = [["", "", "1"]];
        outputMatrix.data = [["3", "2", "1"]];
        break;
      case 9:
        remainderMatrix.data = [["", "", "0"]];
        outputMatrix.data = [["3", "2", "1"]];
        break;
    }

    drawD3Matrix(d3js, inputMatrix);
    drawD3Matrix(d3js, remainderMatrix);
    drawD3Matrix(d3js, outputMatrix);

    if (step > 9) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
