function Sidebar({ node, onDrillUp }) {
  if (!node) return <p>Select a node</p>;

  return (
    <div>
      <h2>{node.data.label}</h2>
      <p>{node.data.summary}</p>

      <button onClick={onDrillUp} style={{ marginTop: 10 }}>
        Drill Up
      </button>
    </div>
  );
}

export default Sidebar;
