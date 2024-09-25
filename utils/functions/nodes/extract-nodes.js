export function extractNodes(diagram) {
  const nodePattern = /(\d+)\[(.*?)\]/g;
  let nodes = [];
  let match;

  // Set to track unique node IDs
  const uniqueIds = new Set();

  while ((match = nodePattern.exec(diagram)) !== null) {
    let [_, id, value] = match;

    // Remove HTML and CSS from value using regex
    value = value.replace(/<\/?[^>]+(>|$)/g, "");

    // Check for duplicates using the Set
    if (!uniqueIds.has(id)) {
      nodes.push({ id, value });
      uniqueIds.add(id);
    }
  }

  const transformedNodes = nodes.map((node) => ({
    id: Number(node.id), // Convert id to a number
    name: node.value, // Rename value to name
  }));

  return transformedNodes;
}
