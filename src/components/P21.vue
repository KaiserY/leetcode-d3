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

  var firstLinkedList: D3LinkedList = {
    id: "firstLinkedList",
    data: [1, 2, 4],
    x: 60,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var secondLinkedList: D3LinkedList = {
    id: "secondLinkedList",
    data: [1, 3, 4],
    x: 60,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var outputLinkedList: D3LinkedList = {
    id: "outputLinkedList",
    data: [],
    x: 60,
    y: 120,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{ output: [] }];

  mergeTwoLists(
    new ListNode(1, new ListNode(2, new ListNode(4, null))),
    new ListNode(1, new ListNode(3, new ListNode(4, null))),
    steps
  );

  setInterval(() => {
    outputLinkedList.data = steps[stepIndex].output;

    drawD3BarChart(d3js, firstLinkedList);
    drawD3BarChart(d3js, secondLinkedList);
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

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
  steps: Step[]
): ListNode | null {
  if (list1 == null) {
    var tempList: any = list2!;
    var tempOutput: number[] = [];
    while (tempList != null) {
      tempOutput.push(tempList.val);
      tempList = tempList.next;
    }
    steps.push({ output: tempOutput });

    return list2;
  }

  if (list2 == null) {
    var tempList: any = list1!;
    var tempOutput: number[] = [];
    while (tempList != null) {
      tempOutput.push(tempList.val);
      tempList = tempList.next;
    }
    steps.push({ output: tempOutput });

    return list1;
  }

  var p1 = list1;
  var p2 = list2;

  if (p1!.val < p2!.val) {
    p1!.next = mergeTwoLists(p1!.next, p2, steps);

    var tempList: any = p1;
    var tempOutput: number[] = [];
    while (tempList != null) {
      tempOutput.push(tempList.val);
      tempList = tempList.next;
    }
    steps.push({ output: tempOutput });

    return p1;
  } else {
    p2!.next = mergeTwoLists(p1, p2!.next, steps);

    var tempList: any = p2;
    var tempOutput: number[] = [];
    while (tempList != null) {
      tempOutput.push(tempList.val);
      tempList = tempList.next;
    }
    steps.push({ output: tempOutput });

    return p2;
  }
}

interface Step {
  output: number[];
}

const d3svg = ref();
</script>
