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
    data: ["flower".split(""), "flow".split(""), "flight".split("")],
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
    data: [["", "", "", ""]],
    x: 60,
    y: 120,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
  drawD3Matrix(d3js, outputMatrix);

  var i = 0;
  var input: any[] = ["flower", "flow", "flight"];
  var output: any[] = ["", "", "", ""];

  var rendered = false;
  var initFlag = false;

  setInterval(() => {
    rendered = false;

    if (initFlag) {
      initFlag = false;

      i = 0;
      input = ["flower", "flow", "flight"];
      output = ["", "", "", ""];

      inputMatrixVLine.index = i;
      outputMatrix.data = [output];

      if (!rendered) {
        drawD3Matrix(d3js, inputMatrix);
        drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
        drawD3Matrix(d3js, outputMatrix);

        rendered = true;
      }

      return;
    }

    var tempChar = input[0][i];

    for (let j = 0; j < input.length; j++) {
      if (input[j][i] != tempChar) {
        initFlag = true;
        break;
      }
    }

    if (!initFlag) {
      output[i] = tempChar;
    }

    inputMatrixVLine.index = i;
    outputMatrix.data = [output];

    if (!rendered) {
      drawD3Matrix(d3js, inputMatrix);
      drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
      drawD3Matrix(d3js, outputMatrix);

      rendered = true;
    }

    i += 1;
  }, 2000);
});

const d3svg = ref();
</script>
