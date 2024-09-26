import { getAllUsers } from "@/utils/functions/users/get-all-users";
import { getAllNodes } from "@/utils/functions/nodes/get-all-nodes";
import { UserTable } from "./_components/UserTable";
import { getSession } from "@/utils/get-session";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default async function Page() {
  const sessionData = getSession();
  const usersData = getAllUsers();
  const nodesData = getAllNodes();

  const [users, nodes, session] = await Promise.all([
    usersData,
    nodesData,
    sessionData,
  ]);

  if (!session) {
    return <div>Nu esti authentificat</div>;
  }

  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center bg-muted/40">
      <div className="flex flex-col w-2/3 sm:gap-4 sm:py-4">
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <UserTable users={users} nodes={nodes} />
        </div>
      </div>
    </div>
  );
}
