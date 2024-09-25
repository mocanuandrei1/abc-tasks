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
import { userSchema } from "@/utils/zod";
import { useAction } from "next-safe-action/hooks";

import { DisplayServerActionResponse } from "@/components/custom ui/display-server-actions-response";
import { useState } from "react";
import { createUser } from "@/utils/actions/admin/create-user";
import { toast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";

const AddUser = ({ nodes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { reset, ...form } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      isAdmin: false,
      nodes: [],
    },
  });

  const { execute, result, isExecuting } = useAction(createUser, {
    onSuccess: ({ data }) => {
      setIsOpen(false);
      reset();
      toast({
        variant: "default",
        title: "Succes",
        description: `Utilizatorul ${data.name} a fost creat cu succes!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A intervenit o eroare la crearea utilizatorului.",
        duration: 3000,
      });
    },
  });

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="flex items-center gap-2 bg-primary p-2 text-primary-foreground rounded-lg hover:bg-primary/80">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Adauga utilizator
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Creeaza un utilizator</DialogTitle>
            <DialogDescription>
              Completeaza campurile de jos. Apasa pe Salvare pentru a salva.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = form.getValues("name");
              const username = form.getValues("username");
              const password = form.getValues("password");
              const isAdmin = form.getValues("isAdmin");
              const nodes = form.getValues("nodeIds");
              execute({ name, username, password, isAdmin, nodes });
            }}
            className="space-y-8"
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
              name="isAdmin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Este admin?</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
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
              name="nodeIds" // Assuming this field holds the selected node IDs
              render={() => (
                <FormItem className="">
                  <div className="mb-4">
                    <FormLabel className="text-base">Select Nodes</FormLabel>
                  </div>
                  {nodes.map((node, idx) => (
                    <FormField
                      key={node.id}
                      control={form.control}
                      name="nodeIds"
                      render={({ field }) => {
                        // Ensure field.value is initialized as an array
                        const selectedNodes = field.value || [];

                        return (
                          <FormItem
                            key={node.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={selectedNodes.includes(node.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...selectedNodes,
                                        node.id,
                                      ])
                                    : field.onChange(
                                        selectedNodes.filter(
                                          (nodeId) => nodeId !== node.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {node.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

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

export default AddUser;
