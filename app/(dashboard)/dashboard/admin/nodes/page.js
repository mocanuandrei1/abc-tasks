import React from "react";
import { NodesForm } from "./_components/NodesForm";

const page = () => {
  return (
    <div className="flex flex-col justify-center h-[90vh] gap-4 items-center">
      <h1>Noduri</h1>
      <NodesForm />
    </div>
  );
};

export default page;
