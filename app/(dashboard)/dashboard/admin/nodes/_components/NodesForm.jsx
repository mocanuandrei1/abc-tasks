"use client";
import { createNodes } from "@/utils/actions/node/create-nodes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React, { useEffect } from "react";
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
import { toast } from "@/hooks/use-toast";
import { MermaidDiagram } from "@lightenna/react-mermaid-diagram";

export const NodesForm = ({ diagram }) => {
  const { reset, ...form } = useForm({
    resolver: zodResolver(MermaidDiagram),
    defaultValues: {
      mermaidDiagram: diagram, // Setting the default value for the diagram field
    },
  });

  useEffect(() => {
    // Update the form values if the diagram prop changes
    reset({ mermaidDiagram: diagram });
  }, [diagram, reset]);

  const { execute, result, isExecuting } = useAction(createNodes, {
    onSuccess: ({ data }) => {
      reset();
      toast({
        variant: "default",
        title: "Success",
        description: `Diagrama ${data.name} a fost creată cu succes!`,
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

          execute({ diagram: mermaidDiagram });
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
                  placeholder="Plasează diagrama Mermaid aici"
                  className="h-[50vh] resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Diagrama Mermaid este un limbaj de marcare pentru crearea de
                diagrame.
                <a
                  href="https://mermaid-js.github.io/mermaid/#/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500"
                >
                  Află mai multe
                </a>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {result.validationErrors ? (
          <p>{result.validationErrors.diagram._errors[0]}</p>
        ) : null}
        <Button type="submit">
          {isExecuting ? "Se actualizează..." : "Actualizează"}
        </Button>
      </form>
    </Form>
  );
};
