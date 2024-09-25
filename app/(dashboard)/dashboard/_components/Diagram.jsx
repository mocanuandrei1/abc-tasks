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
  alex: { accessibleNodes: [108, 31, 18, 21, 6, 2, 4, 3] },
  // Poți adăuga alți utilizatori aici
};

// Funcție care verifică dacă utilizatorul are acces la un anumit nod
const hasAccess = (id) => {
  const userPermission = userPermissions[currentUser];
  return userPermission?.accessibleNodes.includes(id);
};

// Funcție care stilizează nodurile accesibile și inaccesibile în diagramă și adaugă apeluri click la final
const getStyledDiagram = (diagram) => {
  let styledDiagram = diagram.replace(/(\d+)\[.*?\]/g, (match, id) => {
    const elementId = parseInt(id, 10);
    if (hasAccess(elementId)) {
      // Stilizăm nodurile accesibile
      return `${match}:::accessible`;
    } else {
      // Stilizăm nodurile inaccesibile
      return `${match}:::inaccessible`;
    }
  });

  // Colectăm apelurile de click doar pentru nodurile accesibile
  const clickEvents = diagram
    .match(/(\d+)\[.*?\]/g)
    .map((match) => {
      const elementId = parseInt(match.match(/\d+/)[0], 10);
      if (hasAccess(elementId)) {
        return `click ${elementId} callFunction`;
      }
      return null;
    })
    .filter(Boolean)
    .join("\n");

  // Definim clasele pentru stilizarea nodurilor accesibile și inaccesibile
  styledDiagram += `
    classDef accessible fill:green,fill-opacity:1,color:white,stroke:black,stroke-width:2px,rx:5px;
    classDef inaccessible fill:red,fill-opacity:0.7,color:black,stroke:black,stroke-width:2px,rx:5px,opacity:0.7;
  `;

  // Adăugăm click-urile la finalul diagramei
  return styledDiagram + "\n" + clickEvents;
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

  // Aplicăm stilizarea diagrama
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
