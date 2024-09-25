import { getSession } from "@/utils/get-session";
import { Diagram } from "./_components/Diagram";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    return <div>Nu esti authentificat</div>;
  }

  return <Diagram />;
}
