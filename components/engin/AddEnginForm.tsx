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
} from "../ui/form";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import uploadImageAction from "../upload.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2, Pencil, PencilLine } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface AddEnginFormProps {
  type?: Type & {
    engins: Engin[];
  };
  engin?: Engin;

  handleDialogueOpen: () => void;
}

const formSchema = z.object({
  registration: z.string().min(3, {
    message: "La matriculation est requis",
  }),
  puissance: z.coerce.number().min(1, {
    message: "La puissance dois contenir des chiffres",
  }),
  description: z.string().min(10, {
    message: "La description dois avoir au moins 10 caracteres",
  }),
  image: z.string().min(3, {
    message: "L'image est requis",
  }),
  enginPrice: z.coerce.number().min(1, {
    message: "Le prix de l'engin  dois contenir des chiffres",
  }),
});

const AddEnginForm = ({
  type,
  engin,
  handleDialogueOpen,
}: AddEnginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: engin || {
      registration: "",
      puissance: 0,
      description: "",
      image: "",
      enginPrice: 0,
    },
  });

  const submitImage = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.set("file", file);
      const { data, serverError } = await uploadImageAction(formData);

      if (!data || serverError) {
        toast.error(serverError);
        return;
      }

      const url = data.url;
      form.setValue("image", url);
    },
  });

  useEffect(() => {
    if (typeof image === "string") {
      form.setValue("image", image, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }, [form, image]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (type && engin) {
      axios
        .patch(`/api/engin/${engin.id}`, values)
        .then((res) => {
          toast.success(" 🎉 Engin modifier");

          router.refresh();
          setIsLoading(false);
          handleDialogueOpen();
        })
        .catch((err) => {
          console.log(err);
          toast.error(" 📌 Il y a une erreur");
          setIsLoading(false);
        });
    } else {
      if (!type) return;
      axios
        .post("/api/engin", { ...values, typeId: type.id })
        .then((res) => {
          toast.success(" 🎉 Engin créer");

          router.refresh();
          setIsLoading(false);
          handleDialogueOpen();
        })
        .catch((err) => {
          console.log(err);
          toast.error(" 📌 Il y a une erreur");
          setIsLoading(false);
        });
    }
  }

  return (
    <div className="max-h-[75vh] overflow-y-auto px-2">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="registration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matriculation *</FormLabel>
                <FormDescription>Matriculation de l engin</FormDescription>
                <FormControl>
                  <Input placeholder="A500BM" {...field} />
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
                <FormLabel>Description *</FormLabel>
                <FormDescription>Description de l engin</FormDescription>
                <FormControl>
                  <Textarea placeholder="cette machine est  ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image *</FormLabel>
                <FormDescription>Choisir une image</FormDescription>
                <div className="flex items-center gap-6">
                  <FormControl className="flex-1">
                    <Input
                      type="file"
                      placeholder="iPhone 15"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) {
                          return;
                        }

                        if (file.size > 1024 * 1024) {
                          toast.error("File is too big");
                          return;
                        }

                        if (!file.type.includes("image")) {
                          toast.error("File is not an image");
                          return;
                        }

                        submitImage.mutate(file);
                      }}
                    />
                  </FormControl>
                  {field.value ? (
                    <Avatar className="rounded-sm flex-none w-20">
                      <AvatarFallback>{field.value[0]}</AvatarFallback>
                      <AvatarImage src={field.value} />
                    </Avatar>
                  ) : null}
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-6">
            <div className="flex-1 flex flex-col gap-6">
              <FormField
                control={form.control}
                name="puissance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puissance *</FormLabel>
                    <FormDescription>Puissance de la machine</FormDescription>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <FormField
                control={form.control}
                name="enginPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix en Ariary *</FormLabel>
                    <FormDescription>Prix de location</FormDescription>
                    <FormControl>
                      <Input type="number" min={0} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="pt-4 pb-2">
            {engin ? (
              <Button
                onClick={form.handleSubmit(onSubmit)}
                type="button"
                className="max-w-[150px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4" /> Updating
                  </>
                ) : (
                  <>
                    <PencilLine className="mr-2 h-4 w-4" /> Update
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={form.handleSubmit(onSubmit)}
                type="button"
                className="max-w-[150px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4" /> Creating
                  </>
                ) : (
                  <>
                    <Pencil className="mr-2 h-4 w-4" /> Create Engin
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEnginForm;
