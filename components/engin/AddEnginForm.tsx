"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Engin, Type } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    message: "La puissance est requis",
  }),
  poids: z.coerce.number().min(1, {
    message: "Le poids est requis",
  }),
  image: z.string().min(3, {
    message: "L'image est requis",
  }),
  enginPrice: z.coerce.number().min(1, {
    message: "Le prix de l'engin est requis",
  }),
});

const AddEnginForm = ({
  type,
  engin,
  handleDialogueOpen,
}: AddEnginFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: engin || {
      registration: "",
      puissance: 0,
      poids: 0,
      image: "",
      enginPrice: 0,
    },
  });

  return <>Ajout</>;
};

export default AddEnginForm;
