"use client";
import useLocateEngin from "@/hooks/useLocationEngin";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import EnginCard from "../engin/EnginCard";
import { Elements } from "@stripe/react-stripe-js";
import LocationPaymentForm from "./LocationPaymentForm";
import { useCallback, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
);

const LocationEnginClient = () => {
  const { locationEnginData, clientSecret } = useLocateEngin();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: theme === "dark" ? "night" : "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = (value: boolean) => {
    setPaymentSuccess(value);
  };
  if (!paymentSuccess && (!locationEnginData || !clientSecret))
    return (
      <div className="flex items-center flex-col gap-4">
        <div className="text-rose-500">
          Ooops! la page ne demarre pas bien...
        </div>
        <div className=" flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Go Home
          </Button>
          <Button onClick={() => router.push("/my-locations")}>
            Voir location
          </Button>
        </div>
      </div>
    );

  if (paymentSuccess)
    return (
      <div className="flex items-center flex-col gap-4">
        <div className="text-teal-500 text-center">Succes du payement</div>
        <Button onClick={() => router.push("/my-locations")}>
          Voir location
        </Button>
      </div>
    );
  return (
    <div className="max-w-[700px] mx-auto">
      {clientSecret && locationEnginData && (
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            {" "}
            Completer le payement pour finaliser la location
          </h3>
          <div className="mb-6">
            <EnginCard engin={locationEnginData.engin} />
          </div>
          <Elements options={options} stripe={stripePromise}>
            <LocationPaymentForm
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handleSetPaymentSuccess}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default LocationEnginClient;
