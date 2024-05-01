import { Engin } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocateEnginStore {
  locationEnginData: EnginDataType | null;
  paymentIntentId: string | null;
  clientSecret: string | undefined;
  setEnginData: (data: EnginDataType) => void;
  setPaymentIntentId: (paymentIntentId: string) => void;
  setClientSecret: (clientSecret: string) => void;
  resetLocateEngin: () => void;
}

type EnginDataType = {
  engin: Engin;
  totalPrice: number;
  driverIncluded: boolean;
  startDate: Date;
  endDate: Date;
};

const useLocateEngin = create<LocateEnginStore>()(
  persist(
    (set) => ({
      locationEnginData: null,
      paymentIntentId: null,
      clientSecret: undefined,
      setEnginData: (data: EnginDataType) => {
        set({ locationEnginData: data });
      },
      setPaymentIntentId: (paymentIntentId: string) => {
        set({ paymentIntentId });
      },
      setClientSecret: (clientSecret: string) => {
        set({ clientSecret });
      },
      resetLocateEngin: () => {
        set({
          locationEnginData: null,
          paymentIntentId: null,
          clientSecret: undefined,
        });
      },
    }),
    {
      name: "LocationEngin",
    }
  )
);

export default useLocateEngin;
