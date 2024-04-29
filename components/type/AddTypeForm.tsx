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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import uploadImageAction from "../upload.action";
import {
  Eye,
  Loader2,
  Pencil,
  PencilLine,
  Plus,
  Terminal,
  Trash,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddEnginForm from "../engin/AddEnginForm";

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
});

const AddTypeForm = ({ type }: AddTypeFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isTypeDeleting, setIsTypeDeleting] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: type || {
      title: "",
      description: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    if (type) {
      axios
        .patch(`/api/type/${type.id}`, values)
        .then((res) => {
          toast.success(" 🎉 Catégorie modifier");

          router.push(`/type/${res.data.id}`);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(" 📌 Il y a une erreur");
          setIsLoading(false);
        });
    } else {
      axios
        .post("/api/type", values)
        .then((res) => {
          toast.success(" 🎉 Catégorie créer");

          router.push(`/type/${res.data.id}`);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(" 📌 Il y a une erreur");
          setIsLoading(false);
        });
    }
  }

  const handleDeleteType = async (type: TypeWithEngin) => {
    setIsTypeDeleting(true);
    const getImageKey = (src: string) =>
      src.substring(src.lastIndexOf("/") + 1);

    try {
      await axios.delete(`/api/type/${type.id}`);

      setIsTypeDeleting(false);
      toast.success("Catégorie supprimer");

      router.push("/type/new");
    } catch (error) {
      console.log(error);
      setIsTypeDeleting(false);
      toast.error("La catégorie ne peut etre supprimer");
    }
  };

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

  const handleDialogueOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Card>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <CardHeader>
              <CardTitle>
                {type
                  ? "Modifier la Catégorie"
                  : "Ajouter une nouvelle Catégorie d'Engin"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie *</FormLabel>
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
                    <FormLabel>Description *</FormLabel>
                    <FormDescription>
                      Description de la Catégorie
                    </FormDescription>
                    <FormControl>
                      <Textarea placeholder="bulldozer is ..." {...field} />
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
              {type && !type.engins.length && (
                <Alert className=" text-lime-700 mt-6">
                  <Terminal className="h-4 w-4 stroke-white" />
                  <AlertTitle>Une dernière étape!</AlertTitle>
                  <AlertDescription>
                    Votre Catégorie a été créé avec succès 🔥
                    <div>
                      Veuillez ajouter des engins pour compléter votre
                      configuration de Catégorie!
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>

            <CardFooter>
              <div className="flex justify-between gap-32 flex-wrap">
                {type && (
                  <Button
                    onClick={() => handleDeleteType(type)}
                    variant="ghost"
                    type="button"
                    className="max-w-[150px]"
                    disabled={isTypeDeleting || isLoading}
                  >
                    {isTypeDeleting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4" />
                        Deleting
                      </>
                    ) : (
                      <>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </>
                    )}
                  </Button>
                )}

                {type && (
                  <Button
                    onClick={() => router.push(`/type-details/${type.id}`)}
                    variant="outline"
                    type="button"
                  >
                    {" "}
                    <Eye className="mr-2 h-4 w-4" /> View
                  </Button>
                )}
                {type && (
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                      <Button
                        type="button"
                        variant="outline"
                        className="max-w-[150px]"
                      >
                        <Plus className="mr-2 h-4 w-4" /> Ajouter un Engin
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[900px] w-[90%]">
                      <DialogHeader className="px-2">
                        <DialogTitle> Ajouter un Engin</DialogTitle>
                        <DialogDescription>
                          Details de l engin
                        </DialogDescription>
                      </DialogHeader>
                      <AddEnginForm
                        type={type}
                        handleDialogueOpen={handleDialogueOpen}
                      />
                    </DialogContent>
                  </Dialog>
                )}

                {type ? (
                  <Button className="max-w-[150px]" disabled={isLoading}>
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
                  <Button className="max-w-[150px]" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4" /> Creating
                      </>
                    ) : (
                      <>
                        <Pencil className="mr-2 h-4 w-4" /> Create Type
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default AddTypeForm;
