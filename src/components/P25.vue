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
import { D3Matrix, drawD3Matrix } from "../d3js/matrix";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var inputLinkedList: D3LinkedList = {
    id: "inputLinkedList",
    data: [1, 2, 3, 4, 5],
    x: 24,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var queueMatrix: D3Matrix = {
    id: "queueMatrix",
    data: [],
    x: 24,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var outputLinkedList: D3LinkedList = {
    id: "outputLinkedList",
    data: [],
    x: 24,
    y: 120,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{ queue: [], output: [] }];

  reverseKGroup(
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null))))
    ),
    2,
    steps
  );

  setInterval(() => {
    queueMatrix.data = [steps[stepIndex].queue];
    outputLinkedList.data = steps[stepIndex].output;

    drawD3BarChart(d3js, inputLinkedList);
    drawD3Matrix(d3js, queueMatrix);
    drawD3BarChart(d3js, outputLinkedList);

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

function reverseKGroup(
  head: ListNode | null,
  k: number,
  steps: Step[]
): ListNode | null {
  var p = head;
  var count = 0;
  var queue: ListNode[] = [];

  while (p != null) {
    var node = p;
    queue.push(node);
    p = p.next;
    count += 1;
    if (count == k) {
      break;
    }
  }

  var stepQueue: number[] = [];
  for (let i = 0; i < queue.length; i++) {
    stepQueue.push(queue[i].val);
  }

  var stepOutput: number[] = JSON.parse(
    JSON.stringify(steps[steps.length - 1].output)
  );

  steps.push({ queue: stepQueue, output: stepOutput });

  if (queue.length == k) {
    var prev = reverseKGroup(p, k, steps);
    var link = queue.shift();
    while (link != null) {
      var node = link;
      node.next = prev;
      prev = node;
      link = queue.shift();
    }

    var stepQueue: number[] = [];
    for (let i = 0; i < queue.length; i++) {
      stepQueue.push(queue[i].val);
    }

    var stepOutput: number[] = [];
    var tempPrev = JSON.parse(JSON.stringify(prev));
    while (tempPrev != null) {
      stepOutput.push(tempPrev.val);
      tempPrev = tempPrev.next;
    }

    steps.push({ queue: stepQueue, output: stepOutput });

    return prev;
  } else {
    var prev: ListNode | null = null;
    var link = queue.pop();
    while (link != null) {
      var node = link;
      node.next = prev;
      prev = node;
      link = queue.shift();
    }

    var stepQueue: number[] = [];
    for (let i = 0; i < queue.length; i++) {
      stepQueue.push(queue[i].val);
    }

    var stepOutput: number[] = [];
    var tempPrev = JSON.parse(JSON.stringify(prev));
    while (tempPrev != null) {
      stepOutput.push(tempPrev.val);
      tempPrev = tempPrev.next;
    }

    steps.push({ queue: stepQueue, output: stepOutput });

    return prev;
  }
}

interface Step {
  queue: number[];
  output: number[];
}

const d3svg = ref();
</script>
