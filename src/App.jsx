import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";
import data from "./data/mindmap.json";

const nodeStyle = {
  padding: 10,
  borderRadius: 30,
  border: "2px solid #4ea8ff",
  background: "#9dd3ff",
  fontWeight: "bold"
};

function buildGraph(node, x = 0, y = 0, level = 0, parent = null, nodes = [], edges = []) {
  nodes.push({
    id: node.id,
    data: { label: node.label, summary: node.summary },
    position: { x, y },
    style: nodeStyle
  });

  if (parent) {
    edges.push({
      id: `${parent}-${node.id}`,
      source: parent,
      target: node.id
    });
  }

  node.children?.forEach((child, index) => {
    buildGraph(
      child,
      x + 250,
      y + index * 120 - (node.children.length * 60),
      level + 1,
      node.id,
      nodes,
      edges
    );
  });

  return { nodes, edges };
}

export default function App() {
  const [selected, setSelected] = useState(null);

  const { nodes, edges } = useMemo(() => buildGraph(data), []);

  const onNodeClick = (_, node) => {
    setSelected(node.data);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Mindmap */}
      <div style={{ flex: 3 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      {/* Sidebar */}
      <div style={{ flex: 1, padding: 20, background: "#1e293b", color: "white" }}>
        <h2>Architecture Documentation</h2>
        {selected ? (
          <>
            <h3>{selected.label}</h3>
            <p>{selected.summary}</p>
          </>
        ) : (
          <p>Click a node to see details</p>
        )}
      </div>
    </div>
  );
}
