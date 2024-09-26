import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/utils/get-session";
import { logout } from "@/utils/actions/auth/logout";
import Image from "next/image";
import Link from "next/link";

export const Navbar = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return (
    <header className="sticky top-0 flex h-16 items-center shadow-lg justify-between px-4 md:px-6">
      <Link href="/dashboard">
        <Image
          src="/abccontrol_logo_desktop.webp"
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-8 w-8" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Contul meu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard/setari">Setari</Link>
          </DropdownMenuItem>
          {session?.user.isAdmin && (
            <DropdownMenuItem>
              <Link href="/dashboard/admin">Admin</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="bg-destructive focus:bg-destructive/90 text-destructive-foreground focus:text-destructive-foreground">
            <form action={logout}>
              <button type="submit" className="">
                Delogare
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
