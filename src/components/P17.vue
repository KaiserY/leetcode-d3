<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import { D3Matrix, drawD3Matrix } from "../d3js/matrix";
import { D3Tree, drawD3Tree } from "../d3js/tree";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var inputD3Tree: D3Tree = {
    id: "inputD3Tree",
    x: 24,
    y: 24,
    height: 100,
    width: 360,
    cellFontSize: "8px",
    selectedID: "root",
    data: {
      id: "root",
      name: "23",
      selected: false,
      data: [
        {
          id: "a",
          name: "a",
          data: [
            { id: "ad", name: "d", data: [], selected: false },
            { id: "ae", name: "e", data: [], selected: false },
            { id: "af", name: "f", data: [], selected: false },
          ],
          selected: false,
        },
        {
          id: "b",
          name: "b",
          data: [
            { id: "bd", name: "d", data: [], selected: false },
            { id: "be", name: "e", data: [], selected: false },
            { id: "bf", name: "f", data: [], selected: false },
          ],
          selected: false,
        },
        {
          id: "c",
          name: "c",
          data: [
            { id: "cd", name: "d", data: [], selected: false },
            { id: "ce", name: "e", data: [], selected: false },
            { id: "cf", name: "f", data: [], selected: false },
          ],
          selected: false,
        },
      ],
    },
  };

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [["", "", "", "", "", "", "", "", ""]],
    x: 96,
    y: 168,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  drawD3Tree(d3js, inputD3Tree);
  drawD3Matrix(d3js, outputMatrix);

  var step = 0;
  var rendered = false;
  var initFlag = false;

  var result: string[] = ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"];
  var output: string[] = ["", "", "", "", "", "", "", "", ""];
  var outputIndex = 0;

  setInterval(() => {
    rendered = false;

    if (initFlag) {
      initFlag = false;

      output = ["", "", "", "", "", "", "", "", ""];
      outputIndex = 0;

      inputD3Tree.selectedID = "root";

      outputMatrix.data = [output];

      drawD3Tree(d3js, inputD3Tree);
      drawD3Matrix(d3js, outputMatrix);

      return;
    }

    output[outputIndex] = result[outputIndex];

    inputD3Tree.selectedID = result[outputIndex];
    outputMatrix.data = [output];

    drawD3Tree(d3js, inputD3Tree);
    drawD3Matrix(d3js, outputMatrix);

    outputIndex += 1;

    if (outputIndex >= result.length) {
      initFlag = true;
    }

    step += 1;
  }, 2000);
});

const d3svg = ref();
</script>
