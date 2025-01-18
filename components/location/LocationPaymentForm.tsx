"use client";

import useLocateEngin from "@/hooks/useLocationEngin";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { Location } from "@prisma/client";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";

interface LocationPaymentFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}
type DateRangeType = {
  startDate: Date;
  endDate: Date;
};

function hasOverlap(
  startDate: Date,
  endDate: Date,
  dateRanges: DateRangeType[]
) {
  const targetInterval = {
    start: startOfDay(new Date(startDate)),
    end: endOfDay(new Date(endDate)),
  };

  for (const range of dateRanges) {
    const rangeStart = startOfDay(new Date(range.startDate));
    const rangeEnd = endOfDay(new Date(range.endDate));
    if (
      isWithinInterval(targetInterval.start, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      isWithinInterval(targetInterval.end, {
        start: rangeStart,
        end: rangeEnd,
      }) ||
      (targetInterval.start < rangeStart && targetInterval.end > rangeEnd)
    ) {
      return true;
    }
  }
  return false;
}

const LocationPaymentForm = ({
  clientSecret,
  handleSetPaymentSuccess,
}: LocationPaymentFormProps) => {
  const { locationEnginData, resetLocateEngin } = useLocateEngin();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
    setIsLoading(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements || !locationEnginData) {
      return;
    }

    try {
      // Vérifier les dates de chevauchement sans dépendre de l'authentification
      const locations = await axios.get(
        `/api/location/${locationEnginData.engin.id}`
      );

      const dateLocationEngin = locations.data.map((location: Location) => {
        return {
          startDate: location.startDate,
          endDate: location.endDate,
        };
      });

      const overlapFound = hasOverlap(
        locationEnginData.startDate,
        locationEnginData.endDate,
        dateLocationEngin
      );
      if (overlapFound) {
        setIsLoading(false);
        return toast.error(
          "Oops! Certaines dates sélectionnées sont déjà réservées. Veuillez choisir d'autres dates."
        );
      }

      // Effectuer le paiement sans dépendre de l'authentification
      stripe
        .confirmPayment({
          elements,
          redirect: "if_required",
        })
        .then((result) => {
          if (!result.error) {
            axios
              .patch(`/api/location/${result.paymentIntent.id}`)
              .then((res) => {
                toast.success("Engin réservé");
                router.refresh();
                resetLocateEngin();
                handleSetPaymentSuccess(true);
                setIsLoading(false);
              })
              .catch((error) => {
                console.log(error);
                toast.error("Une erreur est survenue");
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
          }
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (!locationEnginData?.startDate || !locationEnginData.endDate)
    return <div>Erreur: Absence de réservation de dates ...</div>;

  const startDate = moment(locationEnginData?.startDate).format("MMMM Do YYYY");
  const endDate = moment(locationEnginData?.endDate).format("MMMM Do YYYY");

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <h2 className="font-semibold mb-2 text-lg">Adresse de facturation</h2>
      <AddressElement
        options={{
          mode: "billing",
        }}
      />
      <h2 className="font-semibold mb-2 mt-4 text-lg">
        Informations de paiement
      </h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold mb-1 text-lg">Sommaire</h2>
        <div>Enregistré le : {startDate} - 5 heures </div>
        <div>Terminé le : {endDate} - 17 heures </div>
        {locationEnginData?.driverIncluded && (
          <div>Le moniteur est aussi inclus</div>
        )}
      </div>
      <Separator />
      <div className="font-bold text-lg mb-4">
        {locationEnginData?.driverIncluded && (
          <div className="mt-2">
            Prix moniteur: {locationEnginData.engin.driverPrice} Ariary
          </div>
        )}
        Total: {locationEnginData?.totalPrice} Ariary
      </div>

      {isLoading && (
        <Alert className=" text-lime-700 mt-6">
          <Terminal className="h-4 w-4 stroke-white" />
          <AlertTitle>Processus du paiement ... </AlertTitle>
          <AlertDescription>Restez sur cette page</AlertDescription>
        </Alert>
      )}

      <Button disabled={isLoading}>
        {isLoading ? "PROCESSUS PAYEMENT ..." : "PAYER MAINTENANT"}
      </Button>
    </form>
  );
};

export default LocationPaymentForm;
