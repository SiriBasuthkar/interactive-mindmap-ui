import ReactFlow, {
  Controls,
  Background,
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";

function Mindmap({
  nodes,
  edges,
  onNodeClick,
  onNodeHover
}) {
  const { fitView } = useReactFlow();

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <button
        onClick={() => fitView()}
        style={{
          position: "absolute",
          zIndex: 10,
          top: 10,
          left: 10
        }}
      >
        Reset View
      </button>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        onNodeMouseEnter={onNodeHover}
        onNodeMouseLeave={() => onNodeHover(null)}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Mindmap;
