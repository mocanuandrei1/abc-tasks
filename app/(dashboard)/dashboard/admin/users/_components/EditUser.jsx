"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { updateUserSchema } from "@/utils/zod";
import { useAction } from "next-safe-action/hooks";

import { DisplayServerActionResponse } from "@/components/custom ui/display-server-actions-response";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateUser } from "@/utils/actions/admin/update-user";
import { useEffect } from "react";

const EditUser = ({ user, nodes, isOpen, setIsOpen }) => {
  const { reset, ...form } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      isAdmin: false,
      nodes: [],
    },
  });

  const { execute, result, isExecuting } = useAction(updateUser, {
    onSuccess: ({ data }) => {
      setIsOpen(false);
      reset();
      toast({
        variant: "default",
        title: "Succes",
        description: `Utilizatorul ${data.name} a fost editat cu succes!`,
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

  // Use useEffect to reset the form whenever the `user` prop changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
        password: "",
        isAdmin: user.isAdmin,
        nodes: user.nodes ? user.nodes.map((node) => node.id) : [], // Safely check if nodes is defined
      });
    }
  }, [user, reset]);

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[1500px]">
          <DialogHeader>
            <DialogTitle>Editează utilizatorul</DialogTitle>
            <DialogDescription>
              Completează câmpurile de jos. Apasă pe Salvare pentru a salva.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = form.getValues("name");
              const username = form.getValues("username");
              const password = form.getValues("password");
              const isAdmin = form.getValues("isAdmin");
              const nodes = form.getValues("nodes");
              execute({
                id: user.id,
                name,
                username,
                password,
                isAdmin,
                nodes,
              });
            }}
            className="space-y-8"
          >
            <div className="grid grid-cols-4 gap-5">
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
                name="isAdmin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Este admin?</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={String(field.value)}
                      name={field.name}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue ref={field.ref} placeholder="Nu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Da</SelectItem>
                        <SelectItem value="false">Nu</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {result.validationErrors?.isAdmin && (
                <p>{result.validationErrors?.isAdmin._errors[0]}</p>
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
            </div>

            <FormField
              control={form.control}
              name="nodes" // Name must match the form field for nodeIds
              render={({ field }) => (
                <FormItem className="">
                  <div className="mb-4">
                    <FormLabel className="text-base">Select Nodes</FormLabel>
                  </div>

                  <ScrollArea className="h-[500px] w-[1400px] rounded-md border p-4">
                    <div className="grid grid-cols-6 gap-3">
                      {nodes.map((node) => (
                        <FormItem
                          key={node.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value.includes(node.id)} // Check if node is in selected array
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, node.id]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (nodeId) => nodeId !== node.id
                                    )
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {node.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </ScrollArea>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!result.validationErrors && (
              <DisplayServerActionResponse result={result} />
            )}
            <DialogFooter>
              <Button
                type="submit"
                className="bg-black hover:bg-blue-500 text-white rounded-2xl text-center w-full py-2"
              >
                {isExecuting ? "Se creează..." : "Creează"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default EditUser;
