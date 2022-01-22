<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import {
  D3BarChart,
  D3BarChartArea,
  drawD3BarChart,
  drawD3BarChartArea,
} from "../d3js/barchart";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var inputBarChart: D3BarChart = {
    id: "inputBarChart",
    data: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 1,
        y: 8,
      },
      {
        x: 2,
        y: 6,
      },
      {
        x: 3,
        y: 2,
      },
      {
        x: 4,
        y: 5,
      },
      {
        x: 5,
        y: 4,
      },
      {
        x: 6,
        y: 8,
      },
      {
        x: 7,
        y: 3,
      },
      {
        x: 8,
        y: 7,
      },
    ],
    x: 48,
    y: 24,
    height: 120,
    width: 240,
  };

  var areaBarChartArea: D3BarChartArea = {
    id: "areaBarChartArea",
    name: "",
    x: 24,
    y: 108,
    height: 12,
    width: 192,
    color: "gray",
    opacity: 0.25,
  };

  var maxBarChartArea: D3BarChartArea = {
    id: "maxBarChartArea",
    name: "",
    x: 24,
    y: 108,
    height: 12,
    width: 192,
    color: "red",
    opacity: 0.25,
  };

  drawD3BarChart(d3js, inputBarChart);
  drawD3BarChartArea(d3js, inputBarChart, areaBarChartArea);
  drawD3BarChartArea(d3js, inputBarChart, maxBarChartArea);

  var step = 0;

  setInterval(() => {
    switch (step) {
      case 0:
        areaBarChartArea.x = 24;
        areaBarChartArea.y = 108;
        areaBarChartArea.height = 12;
        areaBarChartArea.width = 192;
        maxBarChartArea.x = 24;
        maxBarChartArea.y = 108;
        maxBarChartArea.height = 12;
        maxBarChartArea.width = 192;
        break;
      case 1:
        areaBarChartArea.x = 48;
        areaBarChartArea.y = 36;
        areaBarChartArea.height = 84;
        areaBarChartArea.width = 168;
        maxBarChartArea.x = 48;
        maxBarChartArea.y = 36;
        maxBarChartArea.height = 84;
        maxBarChartArea.width = 168;
        break;
      case 2:
        areaBarChartArea.x = 48;
        areaBarChartArea.y = 84;
        areaBarChartArea.height = 36;
        areaBarChartArea.width = 144;
        maxBarChartArea.x = 48;
        maxBarChartArea.y = 36;
        maxBarChartArea.height = 84;
        maxBarChartArea.width = 168;
        break;
      case 3:
        areaBarChartArea.x = 48;
        areaBarChartArea.y = 24;
        areaBarChartArea.height = 96;
        areaBarChartArea.width = 120;
        maxBarChartArea.x = 48;
        maxBarChartArea.y = 36;
        maxBarChartArea.height = 84;
        maxBarChartArea.width = 168;
        break;
      case 4:
        areaBarChartArea.x = 48;
        areaBarChartArea.y = 72;
        areaBarChartArea.height = 48;
        areaBarChartArea.width = 96;
        maxBarChartArea.x = 48;
        maxBarChartArea.y = 36;
        maxBarChartArea.height = 84;
        maxBarChartArea.width = 168;
        break;
      case 5:
        areaBarChartArea.x = 48;
        areaBarChartArea.y = 60;
        areaBarChartArea.height = 60;
        areaBarChartArea.width = 72;
        maxBarChartArea.x = 48;
        maxBarChartArea.y = 36;
        maxBarChartArea.height = 84;
        maxBarChartArea.width = 168;
        break;
      case 6:
        areaBarChartArea.x = 48;
        areaBarChartArea.y = 96;
        areaBarChartArea.height = 24;
        areaBarChartArea.width = 48;
        maxBarChartArea.x = 48;
        maxBarChartArea.y = 36;
        maxBarChartArea.height = 84;
        maxBarChartArea.width = 168;
        break;
      case 7:
        areaBarChartArea.x = 48;
        areaBarChartArea.y = 48;
        areaBarChartArea.height = 72;
        areaBarChartArea.width = 24;
        maxBarChartArea.x = 48;
        maxBarChartArea.y = 36;
        maxBarChartArea.height = 84;
        maxBarChartArea.width = 168;
        break;
    }

    drawD3BarChart(d3js, inputBarChart);
    drawD3BarChartArea(d3js, inputBarChart, areaBarChartArea);
    drawD3BarChartArea(d3js, inputBarChart, maxBarChartArea);

    if (step > 8) {
      step = 0;
    } else {
      step += 1;
    }
  }, 2000);
});

const d3svg = ref();
</script>
