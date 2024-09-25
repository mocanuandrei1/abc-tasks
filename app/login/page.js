import React from "react";
import { LoginCard } from "./_components/LoginCard";
import { getSession } from "@/utils/get-session";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <LoginCard />
    </main>
  );
};

export default page;
