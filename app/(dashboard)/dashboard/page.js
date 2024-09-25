import { getSession } from "@/utils/get-session";
import { Diagram } from "./_components/Diagram";
import { getMermaidDiagram } from "@/utils/functions/mermaidDiagrams/get-mermaid-diagram";

export default async function Page() {
  const sessionData = getSession();
  const mermaidDiagramData = getMermaidDiagram(1);

  const [session, mermaidDiagram] = await Promise.all([
    sessionData,
    mermaidDiagramData,
  ]);

  if (!session) {
    return <div>Nu esti authentificat</div>;
  }

  return <Diagram diagram={mermaidDiagram.diagram} />;
}
