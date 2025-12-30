export function jsonToGraph(
  data,
  parentId = null,
  nodes = [],
  edges = [],
  level = 0
) {
  nodes.push({
    id: data.id,
    data: {
      label: data.title,
      summary: data.summary,
      parentId
    },
    position: {
      x: level * 250,
      y: nodes.length * 120
    }
  });

  if (parentId) {
    edges.push({
      id: `${parentId}-${data.id}`,
      source: parentId,
      target: data.id
    });
  }

  data.children?.forEach(child =>
    jsonToGraph(child, data.id, nodes, edges, level + 1)
  );

  return { nodes, edges };
}
