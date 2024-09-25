"use client";
import { createNodes } from "@/utils/actions/node/create-nodes";
import { multipleNodesSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { extractNodes } from "@/utils/functions/nodes/extract-nodes";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const NodesSchema1 = z.object({
  nodes: z.array(z.object({ name: z.string() })),
});

export const NodesForm = () => {
  const { reset, ...form } = useForm({
    resolver: zodResolver(NodesSchema1),
    defaultValues: {
      nodes: [{ id: "", name: "" }],
    },
  });

  const { execute, result, isExecuting } = useAction(createNodes, {
    onSuccess: ({ data }) => {
      setIsOpen(false);
      reset();
      toast({
        variant: "default",
        title: "Succes",
        description: `Nodurile au fost create cu succes!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A intervenit o eroare la crearea nodurilor.",
        duration: 3000,
      });
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const mermaidDiagram = form.getValues("mermaidDiagram");

          const nodes = extractNodes(mermaidDiagram);

          execute({ nodes });
        }}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="mermaidDiagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mermaid Diagram</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Plaseaza diagrama mermaid aici"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Diagrama mermaid este un limbaj de marcare pentru crearea de
                diagrame.
                <a
                  href="https://mermaid-js.github.io/mermaid/#/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  Afla mai multe
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {result.validationErrors ? (
          <p>Nu cred ca ai folosit un format Mermaid potrivit.</p>
        ) : null}
        <Button type="submit">
          {isExecuting ? "Se actualizeaza..." : "Actualizeaza"}
        </Button>
      </form>
    </Form>
  );
};
