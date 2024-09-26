import { getUser } from "@/utils/functions/users/get-user";
import { getSession } from "@/utils/get-session";

export default async function page({ params }) {
  const { id } = params;
  const session = await getSession();

  if (!session) {
    return <div>Nu esti authentificat</div>;
  }

  const user = await getUser(parseInt(session.user.id));

  if (!user.isAdmin && !user.nodes.some((node) => node.id === parseInt(id))) {
    return <div>Nu ai permisiuni pentru a accesa aceasta pagina</div>;
  }

  return (
    <div>
      <h1>Pagina Dashboard pentru ID: {id}</h1>
    </div>
  );
}
