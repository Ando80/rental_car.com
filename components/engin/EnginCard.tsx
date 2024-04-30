"use client";

import { Engin, Location, Type } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Divide, Loader2, Pencil, Plus, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Console } from "console";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddEnginForm from "./AddEnginForm";
import axios from "axios";
import { toast } from "sonner";

interface EnginCardProps {
  type?: Type & {
    engins: Engin[];
  };
  engin: Engin;
  locations?: Location[];
}

const EnginCard = ({ type, engin, locations = [] }: EnginCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const isTypeDetailsPage = pathname.includes("type-details");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleDialogueOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleEnginDelete = (engin: Engin) => {
    setIsLoading(true);

    axios
      .delete(`/api/engin/${engin.id}`)
      .then(() => {
        router.refresh();
        toast.success("Engin supprimer");
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Il y a une erreur");
      });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{engin.registration}</CardTitle>
          <CardDescription>{engin.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
            {engin.image ? (
              <img
                src={engin.image}
                alt={engin.registration}
                className="object-cover"
              />
            ) : null}
          </div>
          <Separator />

          <div className="flex gap-4 justify-between">
            <div>
              Prix de location:{" "}
              <span className=" font-bold">{engin.enginPrice} Ariary</span>
              <span className="text-xs">/24hrs</span>
            </div>
            {!!engin.driverPrice && (
              <div>
                Prix chauffeur:{" "}
                <span className="font-bold">{engin.driverPrice} Ariary</span>
              </div>
            )}
          </div>
          <Separator />
        </CardContent>
        <CardFooter>
          {isTypeDetailsPage ? (
            <div>Catégorie Details Page</div>
          ) : (
            <div className="flex w-full justify-between">
              <Button
                disabled={isLoading}
                type="button"
                variant="ghost"
                onClick={() => {
                  handleEnginDelete(engin);
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </>
                )}
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                  <Button
                    type="button"
                    variant="outline"
                    className="max-w-[150px]"
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Modifier
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[900px] w-[90%]">
                  <DialogHeader className="px-2">
                    <DialogTitle> Modifier un Engin</DialogTitle>
                    <DialogDescription>
                      Faire un changement sur cette engin
                    </DialogDescription>
                  </DialogHeader>
                  <AddEnginForm
                    type={type}
                    engin={engin}
                    handleDialogueOpen={handleDialogueOpen}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default EnginCard;
