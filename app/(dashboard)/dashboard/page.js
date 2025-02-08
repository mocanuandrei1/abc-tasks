import { getSession } from "@/utils/get-session";
import { Diagram } from "./_components/Diagram";
import { getMermaidDiagram } from "@/utils/functions/mermaidDiagrams/get-mermaid-diagram";
import { getUser } from "@/utils/functions/users/get-user";

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

  if (!mermaidDiagram) {
    return <div>Diagrama nu a fost gasita</div>;
  }

  console.log(mermaidDiagram);

  const user = await getUser(parseInt(session.user.id));

  return <Diagram user={user} diagram={mermaidDiagram.diagram} />;
}
