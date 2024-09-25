import { Navbar } from "./_components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
