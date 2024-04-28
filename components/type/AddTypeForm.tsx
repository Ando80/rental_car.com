"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Engin, Type } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";

interface AddTypeFormProps {
  type: TypeWithEngin | null;
}

export type TypeWithEngin = Type & {
  engins: Engin[];
};

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Le titre dois avoir au moins 3 caracteres",
  }),
  description: z.string().min(10, {
    message: "La description dois avoir au moins 10 caracteres",
  }),
  image: z.string().min(1, {
    message: "Il dois y avoir au moins une image",
  }),
  nbrEngin: z.string().optional(),
});

const AddTypeForm = ({ type }: AddTypeFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      nbrEngin: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type
            ? "Modifier la Catégorie"
            : "Ajouter une nouvelle Catégorie d'Engin"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormDescription>Nom de la Catégorie</FormDescription>
                  <FormControl>
                    <Input placeholder="bulldozer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormDescription>Description de la Catégorie</FormDescription>
                  <FormControl>
                    <Textarea placeholder="bulldozer is ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddTypeForm;
