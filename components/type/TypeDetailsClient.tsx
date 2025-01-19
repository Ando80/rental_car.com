/* eslint-disable @next/next/no-img-element */
"use client";

import { Location } from "@prisma/client";
import { TypeWithEngin } from "./AddTypeForm";
import EnginCard from "../engin/EnginCard";
import React from "react";
import Image from "next/image";
import style from "./style.module.scss";
const TypeDetailsClient = ({
  type,
  locations,
}: {
  type: TypeWithEngin;
  locations?: Location[];
}) => {
  return (
    <>
      <div>
        <h1 className={style.title}>{type.title}</h1>
      </div>
      <div
        className={`h-[65%] w-[100%] flex flex-col items-center mt-16 justify-center ${style.image}`}
      >
        <figure className="rounded-2xl border-4 border-gray-300 relative my-12 aspect-video w-4/5 overflow-hidden object-cover ml-30">
          <Image
            src={type.image}
            alt={type.title}
            layout="fill"
            className="h-full w-full object-cover"
          />
        </figure>
      </div>

      <div>
        <h1 className={style.title}>Details CATÉGORIE</h1>
        <p className={style.valueDesc}>{type.description}</p>
      </div>
      <div>
        {!!type.engins.length && (
          <div>
            <h1 className={style.title}>Les engins de cette catégorie</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-24">
              {type.engins.map((engin) => {
                return (
                  <EnginCard
                    type={type}
                    engin={engin}
                    key={engin.id}
                    locations={locations}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TypeDetailsClient;
