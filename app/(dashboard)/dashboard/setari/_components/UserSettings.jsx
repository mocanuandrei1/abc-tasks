"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { userSettingsSchema } from "@/utils/zod";
import { useAction } from "next-safe-action/hooks";
import { DisplayServerActionResponse } from "@/components/custom ui/display-server-actions-response";
import { userSettings } from "@/utils/actions/user/user-settings";
import { toast } from "@/hooks/use-toast";

const UserSettings = ({ user }) => {
  const { reset, ...form } = useForm({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      password: "",
    },
  });

  const { execute, result, isExecuting } = useAction(userSettings, {
    onSuccess: ({ data }) => {
      reset({
        name: data.user.name,
        username: data.user.username,
        password: "", // Reset the password field
      });
      toast({
        variant: "default",
        title: "Succes",
        description: `Utilizatorul ${data.user.name} a fost editat cu succes!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A intervenit o eroare la editarea utilizatorului.",
        duration: 3000,
      });
    },
  });

  return (
    <Form {...form}>
      <div className="flex items-center h-[90vh] justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = form.getValues("name");
            const username = form.getValues("username");
            const password = form.getValues("password");

            execute({ name, username, password, id: parseInt(user.id) });
          }}
          className="max-w-md w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nume</FormLabel>
                <FormControl>
                  <Input placeholder="Popescu Ionel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {result.validationErrors?.name && (
            <p>{result.validationErrors?.name._errors[0]}</p>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="popescuionel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {result.validationErrors?.username && (
            <p>{result.validationErrors?.username._errors[0]}</p>
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parola</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="tarzan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {result.validationErrors?.password && (
            <p>{result.validationErrors?.password._errors[0]}</p>
          )}
          {!result.validationErrors && (
            <DisplayServerActionResponse result={result} />
          )}

          <Button
            type="submit"
            className="bg-black hover:bg-blue-500 text-white rounded-2xl text-center w-full py-2"
          >
            {isExecuting ? "Se salveaza..." : "Salveaza"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default UserSettings;
