<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import { D3Matrix, drawD3Matrix } from "../d3js/matrix";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var outputMatrix: D3Matrix = {
    id: "outputMatrix",
    data: [],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{ output: [] }];

  generateParenthesis(3, steps);

  setInterval(() => {
    outputMatrix.data = steps[stepIndex].output;

    drawD3Matrix(d3js, outputMatrix);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});

function generateParenthesis(n: number, steps: Step[]): string[] {
  var res: string[] = [];
  var cur: string[] = [];
  dfs(n, n, cur, res, steps);

  return res;
}

function dfs(
  left: number,
  right: number,
  cur: string[],
  all: string[],
  steps: Step[]
) {
  if (left == 0 && right == 0) {
    all.push(cur.join(""));

    var tempOutput: string[][] = [];
    for (let i = 0; i < all.length; i++) {
      tempOutput.push(all[i].split(""));
    }
    steps.push({ output: tempOutput });
  } else {
    if (left > 0) {
      cur.push("(");

      var tempOutput: string[][] = [];
      for (let i = 0; i < all.length; i++) {
        tempOutput.push(all[i].split(""));
      }
      tempOutput.push(JSON.parse(JSON.stringify(cur)));
      steps.push({ output: tempOutput });

      dfs(left - 1, right, cur, all, steps);
      cur.pop();

      var tempOutput: string[][] = [];
      for (let i = 0; i < all.length; i++) {
        tempOutput.push(all[i].split(""));
      }
      tempOutput.push(JSON.parse(JSON.stringify(cur)));
      steps.push({ output: tempOutput });
    }
    if (right > left) {
      cur.push(")");

      var tempOutput: string[][] = [];
      for (let i = 0; i < all.length; i++) {
        tempOutput.push(all[i].split(""));
      }
      tempOutput.push(JSON.parse(JSON.stringify(cur)));
      steps.push({ output: tempOutput });

      dfs(left, right - 1, cur, all, steps);
      cur.pop();

      var tempOutput: string[][] = [];
      for (let i = 0; i < all.length; i++) {
        tempOutput.push(all[i].split(""));
      }
      tempOutput.push(JSON.parse(JSON.stringify(cur)));
      steps.push({ output: tempOutput });
    }
  }
}

interface Step {
  output: string[][];
}

const d3svg = ref();
</script>
