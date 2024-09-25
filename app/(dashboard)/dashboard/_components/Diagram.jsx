"use client";
import { diagram } from "@/utils/get-diagram";
import { getSession } from "@/utils/get-session";
import { MermaidDiagram } from "@lightenna/react-mermaid-diagram";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
