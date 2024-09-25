"use client";
import { diagram } from "@/utils/get-diagram";
import { MermaidDiagram } from "@lightenna/react-mermaid-diagram";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const workingNodes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const Diagram = () => {
  return (
    <TransformWrapper limitToBounds={false} centerOnInit={true}>
      <TransformComponent>
        <div className="w-full h-full mt-10">
          <MermaidDiagram>{diagram}</MermaidDiagram>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};
