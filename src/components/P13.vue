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
    data: [["M", "C", "M", "X", "C", "I", "V"]],
    x: 60,
    y: 96,
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

  var symbolMatrix: D3Matrix = {
    id: "symbolMatrix",
    data: [
      [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
      ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
    ],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var symbolMatrixVLine: D3MatrixVLine = {
    id: "symbolMatrixVLine",
    name: "i",
    index: 0,
    upper: true,
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [["", "", "", ""]],
    x: 60,
    y: 144,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Matrix(d3js, inputMatrix);
  drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
  drawD3Matrix(d3js, symbolMatrix);
  drawD3MatrixVLine(d3js, symbolMatrix, symbolMatrixVLine);
  drawD3Matrix(d3js, outputMatrix);

  var i = 0;
  var num = 0;
  var m = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var input: any[] = ["M", "C", "M", "X", "C", "I", "V"];
  var output: any[] = ["", "", "", ""];
  var symboIndex = 0;
  var numAdd = 0;
  var rendered = false;

  setInterval(() => {
    rendered = false;

    if (i >= input.length) {
      i = 0;
      num = 0;
      input = ["M", "C", "M", "X", "C", "I", "V"];
      output = ["", "", "", ""];
      symboIndex = 0;
      numAdd = 0;

      symbolMatrixVLine.index = symboIndex;
      inputMatrixVLine.index = i;
      outputMatrix.data = [output];

      if (!rendered) {
        drawD3Matrix(d3js, inputMatrix);
        drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
        drawD3Matrix(d3js, symbolMatrix);
        drawD3MatrixVLine(d3js, symbolMatrix, symbolMatrixVLine);
        drawD3Matrix(d3js, outputMatrix);

        rendered = true;
      }

      return;
    }

    switch (input[i]) {
      case "I":
        if (input[i + 1]) {
          switch (input[i + 1]) {
            case "V":
              numAdd = 4;
              i += 1;
              break;
            case "X":
              numAdd = 9;
              i += 1;
              break;
            default:
              numAdd = 1;
              break;
          }
        } else {
          numAdd = 1;
        }
        break;
      case "V":
        numAdd = 5;
        break;
      case "X":
        if (input[i + 1]) {
          switch (input[i + 1]) {
            case "L":
              numAdd = 40;
              i += 1;
              break;
            case "C":
              numAdd = 90;
              i += 1;
              break;
            default:
              numAdd = 10;
              break;
          }
        } else {
          numAdd = 10;
        }
        break;
      case "L":
        numAdd = 5;
        break;
      case "C":
        if (input[i + 1]) {
          switch (input[i + 1]) {
            case "D":
              numAdd = 400;
              i += 1;
              break;
            case "M":
              numAdd = 900;
              i += 1;
              break;
            default:
              numAdd = 100;
              break;
          }
        } else {
          numAdd = 100;
        }
        break;
      case "D":
        numAdd = 500;
        break;
      case "M":
        numAdd = 1000;
        break;
    }

    for (let i = 0; i < m.length; i++) {
      if (m[i] == numAdd) {
        symboIndex = i;
      }
    }

    symbolMatrixVLine.index = symboIndex;

    num += numAdd;

    inputMatrixVLine.index = i;

    output = ("   " + num).slice(-4).split("");

    outputMatrix.data = [output];

    if (!rendered) {
      drawD3Matrix(d3js, inputMatrix);
      drawD3MatrixVLine(d3js, inputMatrix, inputMatrixVLine);
      drawD3Matrix(d3js, symbolMatrix);
      drawD3MatrixVLine(d3js, symbolMatrix, symbolMatrixVLine);
      drawD3Matrix(d3js, outputMatrix);

      rendered = true;
    }

    i += 1;
  }, 2000);
});

const d3svg = ref();
</script>
