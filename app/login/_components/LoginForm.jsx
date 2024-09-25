"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser } from "react-icons/fa";
import { useAction } from "next-safe-action/hooks";
import { loginSchema } from "@/utils/zod";
import { useToast } from "@/hooks/use-toast";
import { DisplayServerActionResponse } from "@/components/custom ui/display-server-actions-response";
import { login } from "@/utils/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DisplayValidationError } from "@/components/custom ui/display-validation-error";

const LoginForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { execute, result, isExecuting } = useAction(login, {
    onSuccess: ({ data }) => {
      toast({
        variant: "default",
        title: "Succes",
        description: "Te-ai logat cu succes, " + data.username + "!",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: "Eroare",
        description: "Eroare la logare",
        duration: 3000,
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const username = form.getValues("username");
        const password = form.getValues("password");
        execute({ username, password });
      }}
      className="grid gap-4"
    >
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          {...form.register("username")}
          id="username"
          placeholder="username"
        />

        <DisplayValidationError value={result.validationErrors?.username} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input {...form.register("password")} id="password" type="password" />
      </div>

      <DisplayValidationError value={result.validationErrors?.password} />

      <Button type="submit" className="w-full" disabled={isExecuting}>
        {isExecuting ? "Se incarca..." : "Authentifica-te"}
      </Button>

      {!result.validationErrors && result.serverError && (
        <p className="text-red-500">Parola sau utilizatorul sunt gresite</p>
      )}
    </form>
  );
};

export default LoginForm;
