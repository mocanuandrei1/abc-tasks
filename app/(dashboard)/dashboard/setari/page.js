import { getSession } from "@/utils/get-session";
import UserSettings from "./_components/UserSettings";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    return <div>Nu esti authentificat</div>;
  }

  return <UserSettings user={session.user} />;
}
