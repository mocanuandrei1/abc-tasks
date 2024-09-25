"use client";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Pagina Dashboard pentru ID: {id}</h1>
    </div>
  );
}
