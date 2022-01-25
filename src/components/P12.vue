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
    data: [[1, 9, 9, 4]],
    x: 60,
    y: 96,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
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
  drawD3Matrix(d3js, symbolMatrix);
  drawD3MatrixVLine(d3js, symbolMatrix, symbolMatrixVLine);
  drawD3Matrix(d3js, outputMatrix);

  var i = 0;
  var num = 1994;
  var m = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var s = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  var numArray: any[] = [1, 9, 9, 4];
  var output: any[] = ["", "", "", ""];
  var outputIndex = 0;
  var rendered = false;

  setInterval(() => {
    rendered = false;

    if (i >= m.length) {
      i = 0;
      num = 1994;
      numArray = [1, 9, 9, 4];
      output = ["", "", "", ""];
      outputIndex = 0;

      symbolMatrixVLine.index = i;
      inputMatrix.data = [numArray];
      outputMatrix.data = [output];

      if (!rendered) {
        drawD3Matrix(d3js, inputMatrix);
        drawD3Matrix(d3js, symbolMatrix);
        drawD3MatrixVLine(d3js, symbolMatrix, symbolMatrixVLine);
        drawD3Matrix(d3js, outputMatrix);

        rendered = true;
      }

      return;
    }

    symbolMatrixVLine.index = i;

    var j = Math.floor(num / m[i]);

    num %= m[i];

    numArray = ("   " + num).slice(-4).split("");

    inputMatrix.data = [numArray];

    while (j > 0) {
      output[outputIndex] = s[i];

      outputMatrix.data = [output];

      if (!rendered) {
        drawD3Matrix(d3js, inputMatrix);
        drawD3Matrix(d3js, symbolMatrix);
        drawD3MatrixVLine(d3js, symbolMatrix, symbolMatrixVLine);
        drawD3Matrix(d3js, outputMatrix);

        rendered = true;
      }

      outputIndex += 1;
      j -= 1;
    }

    if (!rendered) {
      drawD3Matrix(d3js, inputMatrix);
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
