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

  var nums1Matrix: D3Matrix = {
    id: "nums1Matrix",
    data: [["23", "69", "180", "400", "500", "600"]],
    x: 48,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var nums1MatrixVLine: D3MatrixVLine = {
    id: "nums1MatrixVLine",
    name: "i",
    index: 0,
    upper: true,
  };

  var nums2Matrix: D3Matrix = {
    id: "nums2Matrix",
    data: [["2", "14", "36", "57", "99"]],
    x: 240,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var nums2MatrixVLine: D3MatrixVLine = {
    id: "nums2MatrixVLine",
    name: "j",
    index: 0,
    upper: true,
  };

  var mergeMatrix: D3Matrix = {
    id: "mergeMatrix",
    data: [
      [
        "0",
        "2",
        "14",
        "23",
        "36",
        "57",
        "69",
        "99",
        "180",
        "400",
        "500",
        "600",
      ],
    ],
    x: 48,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var curMatrixVLine: D3MatrixVLine = {
    id: "curMatrixVLine",
    name: "cur",
    index: 0,
    upper: true,
  };

  var lastMatrixVLine: D3MatrixVLine = {
    id: "lastMatrixVLine",
    name: "last",
    index: 0,
    upper: false,
  };

  drawD3Matrix(d3js, nums1Matrix);
  drawD3MatrixVLine(d3js, nums1Matrix, nums1MatrixVLine);
  drawD3Matrix(d3js, nums2Matrix);
  drawD3MatrixVLine(d3js, nums2Matrix, nums2MatrixVLine);
  drawD3Matrix(d3js, mergeMatrix);
  drawD3MatrixVLine(d3js, mergeMatrix, curMatrixVLine);
  drawD3MatrixVLine(d3js, mergeMatrix, lastMatrixVLine);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        nums1MatrixVLine.index = 0;
        nums2MatrixVLine.index = 0;
        curMatrixVLine.index = 0;
        lastMatrixVLine.index = 0;
        break;
      case 1:
        nums1MatrixVLine.index = 0;
        nums2MatrixVLine.index = 1;
        curMatrixVLine.index = 1;
        lastMatrixVLine.index = 0;
        break;
      case 2:
        nums1MatrixVLine.index = 0;
        nums2MatrixVLine.index = 2;
        curMatrixVLine.index = 2;
        lastMatrixVLine.index = 1;
        break;
      case 3:
        nums1MatrixVLine.index = 1;
        nums2MatrixVLine.index = 2;
        curMatrixVLine.index = 3;
        lastMatrixVLine.index = 2;
        break;
      case 4:
        nums1MatrixVLine.index = 1;
        nums2MatrixVLine.index = 3;
        curMatrixVLine.index = 4;
        lastMatrixVLine.index = 3;
        break;
      case 5:
        nums1MatrixVLine.index = 1;
        nums2MatrixVLine.index = 4;
        curMatrixVLine.index = 5;
        lastMatrixVLine.index = 4;
        break;
      case 6:
        nums1MatrixVLine.index = 2;
        nums2MatrixVLine.index = 4;
        curMatrixVLine.index = 6;
        lastMatrixVLine.index = 5;
        break;
    }

    drawD3Matrix(d3js, nums1Matrix);
    drawD3MatrixVLine(d3js, nums1Matrix, nums1MatrixVLine);
    drawD3Matrix(d3js, nums2Matrix);
    drawD3MatrixVLine(d3js, nums2Matrix, nums2MatrixVLine);
    drawD3MatrixVLine(d3js, mergeMatrix, curMatrixVLine);
    drawD3MatrixVLine(d3js, mergeMatrix, lastMatrixVLine);

    if (step > 6) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
