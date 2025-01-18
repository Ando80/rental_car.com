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
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { toast } from "sonner";
import { differenceInCalendarDays } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import useLocateEngin from "@/hooks/useLocationEngin";
import moment from "moment";

interface MyLocationClientProps {
  location: Location & { Engin: Engin | null } & { Type: Type | null };
}

const MyLocationClient: React.FC<MyLocationClientProps> = ({ location }) => {
  const { setEnginData, paymentIntentId, setClientSecret, setPaymentIntentId } =
    useLocateEngin();
  const [locationIsLoading, setLocationIsLoading] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();
  const { Type, Engin } = location;

  if (!Type || !Engin) return <div>Absence de donnee...</div>;

  const startDate = moment(location.startDate).format("MMMM Do YYYY");
  const endDate = moment(location.endDate).format("MMMM Do YYYY");
  const dayCount = differenceInCalendarDays(
    location.endDate,
    location.startDate
  );

  const handleLocateEngin = () => {
    if (!userId) return toast.error("oops! Make sure you are logged in");

    if (!Type?.userId)
      return toast.error(
        "Something went wrong, refresh the page and try again!"
      );

    setLocationIsLoading(true);

    const locationEnginData = {
      engin: Engin,
      totalPrice: location.totalPrice,
      driverIncluded: location.driverIncluded,
      startDate: location.startDate,
      endDate: location.endDate,
    };
    setEnginData(locationEnginData);

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: {
          typeOwnerId: Type.userId,
          typeId: Type.id,
          enginId: Engin.id,
          startDate: locationEnginData.startDate,
          endDate: locationEnginData.endDate,
          driverIncluded: locationEnginData.driverIncluded,
          totalPrice: locationEnginData.totalPrice,
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
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{Type.title}</CardTitle>
          <CardDescription>
            <p className="py-2">{Type.description}</p>
          </CardDescription>
          <CardTitle>{Engin.registration}</CardTitle>
          <CardDescription>{Engin.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="aspect-square overflow-hidden relative h-[200px] rounded-lg">
            {Engin.image ? (
              <img
                src={Engin.image}
                alt={Engin.registration}
                className="object-cover"
              />
            ) : null}
          </div>
          <Separator />

          <div className="flex gap-4 justify-between">
            <div>
              Prix de location:{" "}
              <span className=" font-bold">{Engin.enginPrice} Ariary</span>
              <span className="text-xs">/24hrs</span>
            </div>
            {!!Engin.driverPrice && (
              <div>
                Prix moniteur:{" "}
                <span className="font-bold">{Engin.driverPrice} Ariary</span>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <CardTitle>Details des locations</CardTitle>
            <div className="text-primary/90">
              <div>
                Engin louer par {location.userName} pour {dayCount} jours -{" "}
                {moment(location.locationAt).fromNow()}{" "}
              </div>
              <div>enregistrement: {startDate} a 5heures</div>
              <div>vérifier: {endDate} a 17heures</div>
              {location.driverIncluded && (
                <div>Le moniteur est inclus dans votre offre</div>
              )}
              {location.paymentStatus ? (
                <div className="text-teal-500">
                  {" "}
                  Payer {location.totalPrice} Ariary - Engin Reserver
                </div>
              ) : (
                <div className="text-rose-500">
                  Non Payer {location.totalPrice} Ariary - Engin Non Reserver
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-center justify-between">
          <Button
            disabled={locationIsLoading}
            variant="outline"
            onClick={() => router.push(`/type-details/${Type.id}`)}
          >
            Voir cette categorie
          </Button>
          {!location.paymentStatus && location.userId === userId && (
            <Button
              disabled={locationIsLoading}
              onClick={() => handleLocateEngin()}
            >
              {locationIsLoading ? "Processus ..." : " Payer maintenant"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default MyLocationClient;
