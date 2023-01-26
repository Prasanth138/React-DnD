import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Panel,
} from "reactflow";
import dagre from "dagre";
import { Stack, VStack, Box, Button} from "@chakra-ui/react";
import "reactflow/dist/style.css";

import "./dagre.css";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input" },
    position,
  },
  {
    id: "2",
    data: { label: "node 2" },
    position,
  },
  {
    id: "2a",
    data: { label: "node 2a" },
    position,
  },
  {
    id: "2b",
    data: { label: "node 2b" },
    position,
  },
  {
    id: "2c",
    data: { label: "node 2c" },
    position,
  },
  {
    id: "2d",
    data: { label: "node 2d" },
    position,
  },
  {
    id: "3",
    data: { label: "node 3" },
    position,
  },
  {
    id: "4",
    data: { label: "node 4" },
    position,
  },
  {
    id: "5",
    data: { label: "node 5" },
    position,
  },
  {
    id: "6",
    type: "output",
    data: { label: "output" },
    position,
  },
  { id: "7", type: "output", data: { label: "output" }, position },
];

const initialEdges = [
  {
    id: "e12",
    source: "1",
    target: "2",
    type: edgeType,
    style: {
      strokeWidth: 1,
      stroke: "#FF0072",
    },
  },
  {
    id: "e13",
    source: "1",
    target: "3",
    type: edgeType,
    style: {
      strokeWidth: 1,
      stroke: "#FF0072",
    },
  },
  {
    id: "e22a",
    source: "2",
    target: "2a",
    type: edgeType,
    style: {
      strokeWidth: 1,
      stroke: "#FF0072",
    },
  },
  {
    id: "e22b",
    source: "2",
    target: "2b",
    type: edgeType,
    style: {
      strokeWidth: 1,
      stroke: "#FF0072",
    },
  },
  {
    id: "e22c",
    source: "2",
    target: "2c",
    type: edgeType,
    style: {
      strokeWidth: 1,
      stroke: "#FF0072",
    },
  },
  {
    id: "e2c2d",
    source: "2c",
    target: "2d",
    type: edgeType,
    style: {
      strokeWidth: 1,
      stroke: "#FF0072",
    },
  },
  {
    id: "e45",
    source: "4",
    target: "5",
    type: edgeType,
    style: {
      strokeWidth: 1,
      stroke: "#FF0072",
    },
  },
  {
    id: "e56",
    source: "5",
    target: "6",
    type: edgeType,
    style: {
      strokeWidth: 1,
      stroke: "#FF0072",
    },
  },
  {
    id: "e57",
    source: "5",
    target: "7",
    type: edgeType,
    style: {
      strokeWidth: 1,
      stroke: "#FF0072",
    },
  },
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <Stack bg="blue.50">
      <VStack bg="blue.200">
        <Box
          w={["sm", "2xl"]}
          h={["sm", "xl"]}
          m={2}
          bg="green.50"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="1px solid black"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView
          >
            <Background color="#99b3ec" />
            <Panel position="top-left">
              <Button mx={1} onClick={() => onLayout("TB")}>
                vertical layout
              </Button>
              <Button mx={1} onClick={() => onLayout("LR")}>
                horizontal layout
              </Button>
            </Panel>
          </ReactFlow>
        </Box>
      </VStack>
    </Stack>
  );
};

export default LayoutFlow;

// import React, { useEffect, useRef } from 'react';
// import { Box, Text } from '@chakra-ui/react';
// import dagre from 'dagre';
// import dagreD3 from 'dagre-d3';
// import * as d3 from 'd3';

// const DagreGraph = () => {
//     const graphContainer = useRef();
//     const svgRef = useRef();
//     const graph = new dagre.graphlib.Graph();

//     useEffect(() => {
//         graph.setGraph({});
//         graph.setDefaultEdgeLabel(() => { return {}; });

//         graph.addNode("A", { label: "Node A" });
//         graph.addNode("B", { label: "Node B" });
//         graph.addNode("C", { label: "Node C" });
//         graph.addEdge(null, "A", "B");
//         graph.addEdge(null, "B", "C");

//         dagre.layout(graph);
//         var renderer = new dagreD3.render();
//         renderer(d3.select(svgRef.current), graph);
//     }, []);

//     return (
//         <Box ref={graphContainer}>
//             <svg ref={svgRef} style={{ width: "100%", height: "500px" }}>
//                 <g className="edgePaths">
//                     <path className="edgePath" style={{ fill: 'none', stroke: '#ccc', strokeWidth: 1.5 }} />
//                 </g>
//                 <g className="nodes">
//                     <g className="node" style={{ fill: '#fff', stroke: '#000', cursor: 'pointer' }}>
//                         <Text className="node-label" style={{ fontSize: '14px', fontWeight: 'bold', textAnchor: 'middle' }} />
//                     </g>
//                 </g>
//             </svg>
//         </Box>
//     );
// };

// export default DagreGraph;
