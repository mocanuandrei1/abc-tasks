import React from "react";
import { NodesForm } from "./_components/NodesForm";
import NodesMapping from "./_components/NodesMapping";
import { getAllNodes } from "@/utils/functions/nodes/get-all-nodes";
import { getMermaidDiagram } from "@/utils/functions/mermaidDiagrams/get-mermaid-diagram";

const page = async () => {
  const nodesData = getAllNodes();
  const diagramData = getMermaidDiagram(1);

  const [nodes, diagram] = await Promise.all([nodesData, diagramData]);

  return (
    <div className="flex flex-col justify-center h-[90vh] gap-4 items-center">
      <h1>Diagrama</h1>
      <div className="flex gap-10">
        <NodesForm diagram={diagram.diagram} />
        <NodesMapping nodes={nodes} />
      </div>
    </div>
  );
};

export default page;
