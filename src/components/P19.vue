<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref } from "vue";
import {
  D3LinkedList,
  D3LinkedListVLine,
  drawD3BarChart,
  drawD3LinkedListVLine,
} from "../d3js/linkedlist";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var inputLinkedList: D3LinkedList = {
    id: "inputLinkedList",
    data: [1, 2, 3, 4, 5],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var inputLinkedListVLine: D3LinkedListVLine = {
    id: "inputLinkedListVLine",
    name: "i",
    index: 0,
    upper: true,
  };

  var outpuLinkedList: D3LinkedList = {
    id: "outpuLinkedList",
    data: [],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{ output: [], i: 0 }];

  removeNthFromEnd(
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null))))
    ),
    2,
    steps
  );

  setInterval(() => {
    outpuLinkedList.data = steps[stepIndex].output;
    inputLinkedListVLine.index = steps[stepIndex].i;

    drawD3BarChart(d3js, inputLinkedList);
    drawD3LinkedListVLine(d3js, inputLinkedList, inputLinkedListVLine);
    drawD3BarChart(d3js, outpuLinkedList);

    stepIndex += 1;

    if (stepIndex >= steps.length) {
      stepIndex = 0;
    }
  }, 2000);
});

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function removeNthFromEnd(
  head: ListNode | null,
  n: number,
  steps: Step[]
): ListNode | null {
  var v: ListNode[] = [];
  var output: number[] = [];

  while (head != null) {
    var node = head;
    var next = head.next;
    head = next;
    v.push(node);
  }

  v.reverse();

  var res: ListNode | null = null;

  for (let i = 0; i < v.length; i++) {
    if (i != n - 1) {
      var node = v[i];
      node.next = res;
      res = node;

      output.push(node.val);

      var tempOutput: number[] = [];

      for (let j = 0; j < output.length; j++) {
        tempOutput.push(output[j]);
      }

      steps.push({ output: tempOutput.reverse(), i: v.length - i - 1 });
    }
  }

  return res;
}

interface Step {
  output: number[];
  i: number;
}

const d3svg = ref();
</script>
