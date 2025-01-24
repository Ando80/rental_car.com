"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/layout/NavBar";

const Page: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4">
            <p className="text-amber-800  text-3xl">
              Paiement réussi. Vous allez recevoir un message de confirmation
              sur votre portable.
            </p>
          </div>
          <div>
            <Button variant="outline" onClick={() => router.push("/")}>
              Retour à l accueil
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
