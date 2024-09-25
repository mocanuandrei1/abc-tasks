import { getSession } from "@/utils/get-session";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <Image
            src="/abccontrol_logo_desktop.webp"
            alt="ABC Control"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />

          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Organizare inteligentă.
            <strong className="font-extrabold text-primary sm:block">
              Din haos la ordine.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Vizualizează procesele, optimizează fluxurile de lucru și ia decizii
            informate.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/80 focus:outline-none focus:ring active:bg-primary/80 sm:w-auto"
              href="/login"
            >
              Logare
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
