/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
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
import { Divide, Loader2, Pencil, Plus, Trash, Wand2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Console } from "console";
import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";
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
import { DatePickerWithRange } from "./DateRangePicker";
import { DateRange } from "react-day-picker";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { useAuth } from "@clerk/nextjs";
import useLocateEngin from "@/hooks/useLocationEngin";

interface EnginCardProps {
  type?: Type & {
    engins: Engin[];
  };
  engin: Engin;
  locations?: Location[];
}

const EnginCard = ({ type, engin, locations = [] }: EnginCardProps) => {
  const { setEnginData, paymentIntentId, setClientSecret, setPaymentIntentId } =
    useLocateEngin();
  const [isLoading, setIsLoading] = useState(false);
  const [locationIsLoading, setLocationIsLoading] = useState(false);
  const pathname = usePathname();
  const isTypeDetailsPage = pathname.includes("type-details");
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState<DateRange | undefined>();
  const [totalPrice, setTotalPrice] = useState(engin.enginPrice);
  const [includeDriver, setIncludeDriver] = useState(false);
  const [days, setDays] = useState(1);
  const { userId } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (date && date.from && date.to) {
      const dayCount = differenceInCalendarDays(date.to, date.from);

      setDays(dayCount);

      if (dayCount && engin.enginPrice) {
        if (includeDriver && engin.driverPrice) {
          setTotalPrice(
            dayCount * engin.enginPrice + dayCount * engin.enginPrice
          );
        } else {
          setTotalPrice(dayCount * engin.enginPrice);
        }
      } else {
        setTotalPrice(engin.enginPrice);
      }
    }
  }, [date, engin.enginPrice, includeDriver]);

  const handleDialogueOpen = () => {
    setOpen((prev) => !prev);
  };

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    const enginLocations = locations.filter(
      (location) => location.enginId === engin.id
    );

    enginLocations.forEach((location) => {
      const range = eachDayOfInterval({
        start: new Date(location.startDate),
        end: new Date(location.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [locations]);

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

  const handleLocateEngin = () => {
    if (!userId) return toast.error("oops! Make sure you are logged in");

    if (!type?.userId)
      return toast.error(
        "Something went wrong, refresh the page and try again!"
      );

    if (date?.from && date?.to) {
      setLocationIsLoading(true);

      const locationEnginData = {
        engin,
        totalPrice,
        driverIncluded: includeDriver,
        startDate: date.from,
        endDate: date.to,
      };
      setEnginData(locationEnginData);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: {
            typeOwnerId: type.userId,
            typeId: type.id,
            enginId: engin.id,
            startDate: date.from,
            endDate: date.to,
            driverIncluded: includeDriver,
            totalPrice: totalPrice,
          },
          payment_intent_id: paymentIntentId,
        }),
      })
        .then((res) => {
          setLocationIsLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          setPaymentIntentId(data.paymentIntent.id);
          router.push("/locate-engin");
        })
        .catch((error: any) => {
          console.log("Error:", error);
          toast.error(`Error! ${error.message}`);
        });
    } else {
      toast.error("Select a date");
    }
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
            <div className="flex flex-col gap-6">
              <div>
                <div className="mb-2"> Choisis une date de Location </div>
                <DatePickerWithRange
                  date={date}
                  setDate={setDate}
                  disabledDates={disabledDates}
                />
              </div>
              {engin.driverPrice > 0 && (
                <div>
                  <div className="mb-2">Voulez vous incluez un chauffeur?</div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="driver"
                      onCheckedChange={(value) => setIncludeDriver(!!value)}
                    />
                    <label htmlFor="driver" className="text-sm">
                      Inclue un chauffeur
                    </label>
                  </div>
                </div>
              )}
              <div>
                Prix Total: <span className="font-bold">{totalPrice}</span>{" "}
                Ariary pour <span className="font-bold">{days} Jours</span>
              </div>
              <Button
                onClick={() => handleLocateEngin()}
                disabled={locationIsLoading}
                type="button"
              >
                {locationIsLoading ? (
                  <Loader2 className="mr-2 h-4 w-4" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                {locationIsLoading ? "Chargement..." : "Louer cette Engin"}
              </Button>
            </div>
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
