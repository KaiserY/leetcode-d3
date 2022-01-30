<template>
  <svg ref="d3svg"></svg>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { axisRight } from "d3";
import { onMounted, ref } from "vue";
import {
  D3LinkedList,
  D3LinkedListVLine,
  drawD3BarChart,
  drawD3LinkedListVLine,
} from "../d3js/linkedlist";

onMounted(() => {
  const d3js = d3.select(d3svg.value).attr("viewBox", [0, 0, 400, 200]);

  var firstLinkedList: D3LinkedList = {
    id: "firstLinkedList",
    data: [1, 4, 5],
    x: 10,
    y: 10,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var secondLinkedList: D3LinkedList = {
    id: "secondLinkedList",
    data: [1, 3, 4],
    x: 10,
    y: 44,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var thirdLinkedList: D3LinkedList = {
    id: "thirdLinkedList",
    data: [2, 6],
    x: 10,
    y: 78,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var aLinkedList: D3LinkedList = {
    id: "aLinkedList",
    data: [],
    x: 10,
    y: 122,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var bLinkedList: D3LinkedList = {
    id: "bLinkedList",
    data: [],
    x: 10,
    y: 156,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{ a: [], b: [] }];

  mergeKLists(
    [
      new ListNode(1, new ListNode(4, new ListNode(5, null))),
      new ListNode(1, new ListNode(3, new ListNode(4, null))),
      new ListNode(2, new ListNode(6, null)),
    ],
    steps
  );

  setInterval(() => {
    aLinkedList.data = steps[stepIndex].a;
    bLinkedList.data = steps[stepIndex].b;

    drawD3BarChart(d3js, firstLinkedList);
    drawD3BarChart(d3js, secondLinkedList);
    drawD3BarChart(d3js, thirdLinkedList);
    drawD3BarChart(d3js, aLinkedList);
    drawD3BarChart(d3js, bLinkedList);

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

function mergeKLists(
  lists: Array<ListNode | null>,
  steps: Step[]
): ListNode | null {
  if (lists.length == 0) {
    return null;
  }

  var queue: Array<ListNode | null> = [];
  for (let i = 0; i < lists.length; i++) {
    queue.push(lists[i]!);
  }

  while (queue.length > 1) {
    var mergedList = merge(queue.shift()!, queue.shift()!, steps);
    queue.push(mergedList);
  }

  return queue.pop()!;
}

function merge(
  a: ListNode | null,
  b: ListNode | null,
  steps: Step[]
): ListNode | null {
  if (a == null && b == null) {
    return null;
  }
  if (a == null) {
    return b;
  }
  if (b == null) {
    return a;
  }

  var tempA: ListNode = JSON.parse(JSON.stringify(a));
  var tempB: ListNode = JSON.parse(JSON.stringify(b));
  var stepA: number[] = [];
  var stepB: number[] = [];

  while (tempA != null) {
    stepA.push(tempA.val);
    tempA = tempA.next!;
  }

  while (tempB != null) {
    stepB.push(tempB.val);
    tempB = tempB.next!;
  }

  steps.push({ a: stepA, b: stepB });

  if (a.val < b.val) {
    a.next = merge(a.next, b, steps);

    var tempA: ListNode = JSON.parse(JSON.stringify(a));
    var tempB: ListNode = JSON.parse(JSON.stringify(b));
    var stepA: number[] = [];
    var stepB: number[] = [];

    while (tempA != null) {
      stepA.push(tempA.val);
      tempA = tempA.next!;
    }

    while (tempB != null) {
      stepB.push(tempB.val);
      tempB = tempB.next!;
    }

    steps.push({ a: stepA, b: stepB });

    return a;
  } else {
    b.next = merge(a, b.next, steps);

    var tempA: ListNode = JSON.parse(JSON.stringify(a));
    var tempB: ListNode = JSON.parse(JSON.stringify(b));
    var stepA: number[] = [];
    var stepB: number[] = [];

    while (tempA != null) {
      stepA.push(tempA.val);
      tempA = tempA.next!;
    }

    while (tempB != null) {
      stepB.push(tempB.val);
      tempB = tempB.next!;
    }

    steps.push({ a: stepA, b: stepB });

    return b;
  }
}

interface Step {
  a: number[];
  b: number[];
}

const d3svg = ref();
</script>
