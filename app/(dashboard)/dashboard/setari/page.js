import { getSession } from "@/utils/get-session";
import UserSettings from "./_components/UserSettings";
import { getUser } from "@/utils/functions/users/get-user";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    return <div>Nu esti authentificat</div>;
  }

  if (!session.user.isAdmin) {
    return <div>Nu ai permisiuni.</div>;
  }

  const user = await getUser(parseInt(session.user.id));

  return <UserSettings user={user} />;
}
