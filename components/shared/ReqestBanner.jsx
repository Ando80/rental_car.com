"use client";
import "../../styles/generic.scss";
import React from "react";
import { useRouter } from "next/navigation";
import style from "./style.module.scss";

export const ReqestBanner = () => {
  const router = useRouter();
  return (
    <div
      className={`request-banner my-6 md:my-16 rounded--30 flex w-full flex-col items-center py-10 px-4 md:px-0 ${style.reqest}`}
    >
      <h1 className={style.title}>Ensemble, facilitons votre déménagement.</h1>
      <p className={style.subtitle}>Ensemble, facilitons votre déménagement.</p>
    </div>
  );
};
