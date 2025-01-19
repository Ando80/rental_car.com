"use client";
import React, { useRef, useEffect } from "react";
import PagePadded from "../PagePadded";
import gsap from "gsap";
import style from "./style.module.scss";

const Acceuil = () => {
  return (
    <>
      <div className={style.hero} style={{ height: "95vh", width: "100vw" }}>
        <div className={style.header}>
          <h1 className={style.head}>PROTENDER</h1>
          <p className={style.para}> Contact : protender@gmail.com</p>
        </div>
        <PagePadded>
          <div className={style.content}>
            <h2 className={style.subtitle}>
              Simplifier vos Déménagements avec notre flotte de confiance
            </h2>
            <p className={style.description}>
              Des véhicules adaptés à tous vos besoins, pour des trajets sans
              soucis.
            </p>
          </div>
          <Illustration />
        </PagePadded>
      </div>
    </>
  );
};

export default Acceuil;

export const Illustration = () => {
  const laptopRef = useRef<HTMLImageElement | null>(null);
  const cupRef = useRef<HTMLImageElement | null>(null);

  const sineMovement = (
    element: HTMLElement | null,
    span: number,
    duration: number
  ): void => {
    if (element) {
      gsap.fromTo(
        element,
        { y: 0 }, // Position initiale
        {
          y: span,
          duration: duration,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }
      );
    }
  };

  useEffect(() => {
    sineMovement(laptopRef.current, 19, 1.7);
    sineMovement(cupRef.current, 15, 2);
  }, []);

  return (
    <div
      className="absolute inset-0 flex justify-end items-center opacity-100"
      style={{ height: "100%" }}
    >
      <figure className="relative h-full w-full max-w-[750px]">
        <img
          ref={cupRef}
          className="absolute bottom-[40%] left-[18%] z-[3] w-[20%]"
          src="/background/maison.png"
          alt="Maison"
        />
        <img
          ref={laptopRef}
          className="absolute bottom-[7%] right-[14%] z-[3] w-[80%]"
          src="/background/voiture.png"
          alt="Voiture"
        />
        <img
          className="absolute bottom-0 left-0 w-full"
          src="/background/shadow.png"
          alt="Ombre"
        />
      </figure>
    </div>
  );
};
