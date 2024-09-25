"use client";
import { diagram } from "@/utils/get-diagram";
import { MermaidDiagram } from "@lightenna/react-mermaid-diagram";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from "next/navigation";
import mermaid from "mermaid";
import { useEffect } from "react";
// Definim user-ul curent
const currentUser = "alex"; // Poți schimba rolul în funcție de utilizator

// Definim permisiunile fiecărui utilizator
const userPermissions = {
  alex: { accessibleNodes: [1, 2, 22, 4, 5, 6, 7, 8] },
  // Poți adăuga alți utilizatori aici
};

// Funcție care verifică dacă utilizatorul are acces la un anumit nod
const hasAccess = (id) => {
  const userPermission = userPermissions[currentUser];
  return userPermission.accessibleNodes.includes(id);
};

// Funcție care stilizează nodurile accesibile și inaccesibile în diagramă
const getStyledDiagram = (diagram) => {
  let styledDiagram = diagram.replace(/(\d+)\[.*?\]/g, (match, id) => {
    const elementId = parseInt(id, 10);
    if (hasAccess(elementId)) {
      // Stilizăm nodurile accesibile cu o clasă specială
      return `${match}:::accessible`;
    } else {
      // Stilizăm nodurile inaccesibile cu o clasă specială
      return `${match}:::inaccessible`;
    }
  });

  // Definim clasele pentru stilizarea nodurilor accesibile și inaccesibile
  styledDiagram += `
    classDef accessible fill:green,fill-opacity:1,color:white,stroke:black,stroke-width:2px,rx:5px;
    classDef inaccessible fill:red,fill-opacity:0.7,color:black,stroke:black,stroke-width:2px,rx:5px,opacity:0.7;
  `;

  return styledDiagram;
};
export const Diagram = () => {
  const router = useRouter();

  useEffect(() => {
    // Definim funcția callback globală
    window.callFunction = (id) => {
      router.push(`/dashboard/${id}`); // Redirecționează utilizatorul către /dashboard/[id]
    };

    const config = {
      startOnLoad: true,
      flowchart: { useMaxWidth: true, htmlLabels: true, curve: "cardinal" },
      securityLevel: "loose", // Permit interacțiuni JavaScript
    };
    mermaid.initialize(config); // Inițializăm mermaid cu configurarea dorită
  }, [router]);
  const styledDiagram = getStyledDiagram(diagram);
  return (
    <TransformWrapper limitToBounds={false} centerOnInit={true}>
      <TransformComponent>
        <div className="w-full h-full mt-10">
          <MermaidDiagram>{styledDiagram}</MermaidDiagram>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};
