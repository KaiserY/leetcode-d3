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
    data: [1, 2, 3, 4],
    x: 24,
    y: 24,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var firstLinkedList: D3LinkedList = {
    id: "firstLinkedList",
    data: [],
    x: 24,
    y: 72,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var secondLinkedList: D3LinkedList = {
    id: "secondLinkedList",
    data: [],
    x: 24,
    y: 120,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var restLinkedList: D3LinkedList = {
    id: "restLinkedList",
    data: [],
    x: 24,
    y: 168,
    cellHeight: 24,
    cellWidth: 24,
    cellFontSize: "8px",
  };

  var stepIndex = 0;

  var steps: Step[] = [{ first: [], second: [], rest: [] }];

  swapPairs(
    new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, null)))),
    steps
  );

  setInterval(() => {
    firstLinkedList.data = steps[stepIndex].first;
    secondLinkedList.data = steps[stepIndex].second;
    restLinkedList.data = steps[stepIndex].rest;

    drawD3BarChart(d3js, inputLinkedList);
    drawD3BarChart(d3js, firstLinkedList);
    drawD3BarChart(d3js, secondLinkedList);
    drawD3BarChart(d3js, restLinkedList);

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

function swapPairs(head: ListNode | null, steps: Step[]): ListNode | null {
  if (head != null) {
    var first = head;
    if (first.next != null) {
      var second = first.next;
      var rest = second.next;

      var tempFirst = JSON.parse(JSON.stringify(first));
      var stepFirst: number[] = [];
      while (tempFirst != null) {
        stepFirst.push(tempFirst.val);
        tempFirst = tempFirst.next!;
      }

      var tempSecond = JSON.parse(JSON.stringify(second));
      var stepSecond: number[] = [];
      while (tempSecond != null) {
        stepSecond.push(tempSecond.val);
        tempSecond = tempSecond.next!;
      }

      var tempRest = JSON.parse(JSON.stringify(rest));
      var stepRest: number[] = [];
      while (tempRest != null) {
        stepRest.push(tempRest.val);
        tempRest = tempRest.next!;
      }

      steps.push({ first: stepFirst, second: stepSecond, rest: stepRest });

      first.next = swapPairs(rest, steps);

      var tempFirst = JSON.parse(JSON.stringify(first));
      var stepFirst: number[] = [];
      while (tempFirst != null) {
        stepFirst.push(tempFirst.val);
        tempFirst = tempFirst.next!;
      }

      var tempSecond = JSON.parse(JSON.stringify(second));
      var stepSecond: number[] = [];
      while (tempSecond != null) {
        stepSecond.push(tempSecond.val);
        tempSecond = tempSecond.next!;
      }

      var tempRest = JSON.parse(JSON.stringify(rest));
      var stepRest: number[] = [];
      while (tempRest != null) {
        stepRest.push(tempRest.val);
        tempRest = tempRest.next!;
      }

      steps.push({ first: stepFirst, second: stepSecond, rest: stepRest });

      second.next = first;

      var tempFirst = JSON.parse(JSON.stringify(first));
      var stepFirst: number[] = [];
      while (tempFirst != null) {
        stepFirst.push(tempFirst.val);
        tempFirst = tempFirst.next!;
      }

      var tempSecond = JSON.parse(JSON.stringify(second));
      var stepSecond: number[] = [];
      while (tempSecond != null) {
        stepSecond.push(tempSecond.val);
        tempSecond = tempSecond.next!;
      }

      var tempRest = JSON.parse(JSON.stringify(rest));
      var stepRest: number[] = [];
      while (tempRest != null) {
        stepRest.push(tempRest.val);
        tempRest = tempRest.next!;
      }

      steps.push({ first: stepFirst, second: stepSecond, rest: stepRest });

      return second;
    } else {
      var tempFirst = JSON.parse(JSON.stringify(first));
      var stepFirst: number[] = [];
      while (tempFirst != null) {
        stepFirst.push(tempFirst.val);
        tempFirst = tempFirst.next!;
      }

      var stepSecond: number[] = JSON.parse(
        JSON.stringify(steps[steps.length - 1].second)
      );
      var stepRest: number[] = JSON.parse(
        JSON.stringify(steps[steps.length - 1].rest)
      );

      steps.push({ first: stepFirst, second: stepSecond, rest: stepRest });

      return first;
    }
  } else {
    var stepFirst: number[] = JSON.parse(
      JSON.stringify(steps[steps.length - 1].first)
    );
    var stepSecond: number[] = JSON.parse(
      JSON.stringify(steps[steps.length - 1].second)
    );
    var stepRest: number[] = JSON.parse(
      JSON.stringify(steps[steps.length - 1].rest)
    );

    steps.push({ first: stepFirst, second: stepSecond, rest: stepRest });

    return null;
  }
}

interface Step {
  first: number[];
  second: number[];
  rest: number[];
}

const d3svg = ref();
</script>
