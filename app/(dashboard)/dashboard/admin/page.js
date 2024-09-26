import { Button } from "@/components/ui/button";
import { getSession } from "@/utils/get-session";
import Link from "next/link";
import React from "react";

const page = async () => {
  const session = await getSession();

  if (!session) {
    return <div>Nu esti authentificat</div>;
  }

  if (!session.user.isAdmin) {
    return <div>Nu ai permisiuni.</div>;
  }

  return (
    <div className="flex flex-col justify-center h-[90vh] gap-4 items-center">
      <h1>Admin</h1>
      <p>
        Aceasta este pagina de admin. De aici poti modifica/crea userii si
        nodurile.
      </p>

      <Link href="/dashboard/admin/users">
        <Button className="w-56">Useri</Button>
      </Link>
      <Link href="/dashboard/admin/nodes">
        <Button className="w-56">Noduri</Button>
      </Link>
    </div>
  );
};

export default page;
