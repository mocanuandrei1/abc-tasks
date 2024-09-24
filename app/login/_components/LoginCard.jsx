import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const description =
  "Un formular de login simplu, cu un camp pentru email si unul pentru parola.";

export function LoginCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Logare</CardTitle>
        <CardDescription>
          Introdu datele de autentificare pentru a accesa aplicatia.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input id="email" type="email" placeholder="popescuionel" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Parola</Label>
          <Input id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Authentifica-te</Button>
      </CardFooter>
    </Card>
  );
}
