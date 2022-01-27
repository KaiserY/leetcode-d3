import * as d3 from "d3";

export interface D3Tree {
  id: string;
  data: D3TreeNode;
  x: number;
  y: number;
  height: number;
  width: number;
  cellFontSize: string;
  selectedID: string;
}

export interface D3TreeNode {
  id: string;
  name: string;
  data: D3TreeNode[];
  selected: boolean;
}

export function drawD3Tree(
  d3js: d3.Selection<any, unknown, null, undefined>,
  tree: D3Tree
) {
  var gD3Tree: d3.Selection<any, unknown, null, undefined> = d3js.select(
    "#" + tree.id
  );

  if (gD3Tree.empty()) {
    gD3Tree = d3js.append("g").attr("id", tree.id);
  }

  gD3Tree.attr("transform", "translate(" + tree.x + ", " + tree.y + ")");

  var d3tree = d3.tree().size([tree.width, tree.height]);

  var root = d3.hierarchy(tree.data, (d) => {
    return d.data;
  });

  var treeData = d3tree(root) as d3.HierarchyPointNode<D3TreeNode>;

  var nodes = treeData.descendants();
  var links = treeData.descendants().slice(1);

  var selectedNode = nodes.find((d) => tree.selectedID == d.data.id);

  nodes.forEach((d) => (d.data.selected = false));

  selectedNode?.ancestors().forEach((d) => (d.data.selected = true));

  gD3Tree
    .selectAll("g.node")
    .data(nodes)
    .join(
      (enter) => {
        var gNode = enter
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => {
            return "translate(" + d.x + "," + d.y + ")";
          });
        gNode
          .append("circle")
          .attr("class", "node")
          .attr("r", tree.cellFontSize)
          .style("fill", "lightsteelblue")
          .attr("stroke", (d) => (d.data.selected ? "red" : "black"))
          .attr("stroke-width", 1);
        gNode
          .append("text")
          .attr("font-size", tree.cellFontSize)
          .attr("fill", "black")
          .style("text-anchor", "middle")
          .style("alignment-baseline", "central")
          .text((d) => d.data.name);
        return gNode;
      },
      (update) => {
        update
          .selectAll("circle")
          .attr("r", tree.cellFontSize)
          .style("fill", "lightsteelblue")
          .attr("stroke-width", 1)
          .transition()
          .duration(500)
          .attr("stroke", (d) =>
            (d as d3.HierarchyPointNode<D3TreeNode>).data.selected
              ? "red"
              : "black"
          );
        return update;
      },
      (exit) => exit
    );

  var link = d3
    .linkVertical()
    .x((d) => d[0])
    .y((d) => d[1]);

  gD3Tree
    .selectAll("path.link")
    .data(links)
    .join(
      (enter) =>
        enter
          .insert("path", "g")
          .attr("class", "link")
          .attr("d", (d) =>
            link({ source: [d.parent!.x, d.parent!.y], target: [d.x, d.y] })
          )
          .style("fill", "none")
          .style("stroke", (d) => (d.data.selected ? "red" : "black"))
          .style("stroke-width", 1),
      (update) =>
        update
          .attr("d", (d) =>
            link({ source: [d.parent!.x, d.parent!.y], target: [d.x, d.y] })
          )
          .style("fill", "none")
          .style("stroke-width", 1)
          .transition()
          .duration(500)
          .style("stroke", (d) => (d.data.selected ? "red" : "black")),
      (exit) => exit
    );
}
