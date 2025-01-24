"use client";

import useLocateEngin from "@/hooks/useLocationEngin";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import EnginCard from "../engin/EnginCard";
import { Elements } from "@stripe/react-stripe-js";
import LocationPaymentForm from "./LocationPaymentForm";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

const LocationEnginClient = () => {
  const { locationEnginData, clientSecret } = useLocateEngin();
  const [pageLoaded, setPageLoaded] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  };

  if (pageLoaded && (!locationEnginData || !clientSecret))
    return (
      <div className="flex items-center flex-col gap-4">
        <div className=" flex items-center gap-4">
          Payement reussi. vous allez recevoir une message de confirmation sur
          votre portable
          <Button variant="outline" onClick={() => router.push("/")}>
            Retour a l acceuil
          </Button>
        </div>
      </div>
    );

  return (
    <div className="max-w-[700px] mx-auto">
      {clientSecret && locationEnginData && (
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            Completer le payement pour finaliser la location
          </h3>
          <div className="mb-6">
            <EnginCard engin={locationEnginData.engin} />
          </div>
          <Elements options={options} stripe={stripePromise}>
            <LocationPaymentForm clientSecret={clientSecret} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default LocationEnginClient;
