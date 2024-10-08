/* eslint-disable @next/next/no-img-element */
"use client";

import { Location } from "@prisma/client";
import { TypeWithEngin } from "./AddTypeForm";
import EnginCard from "../engin/EnginCard";
import React from "react";
import Image from "next/image";
const TypeDetailsClient = ({
  type,
  locations,
}: {
  type: TypeWithEngin;
  locations?: Location[];
}) => {
  return (
    <div className="flex flex-col pb-2">
      <div className="aspect-square overflow-hidden relative w-full h-[100px] md:h-[400px] rounded-lg">
        <Image src={type.image} alt={type.title} width={1920} height={1080} />
      </div>

      <div>
        <h3 className="font-semibold text-xl md:text-3xl pt-3 text-orange-900">
          {type.title}
        </h3>
        <h2 className="font-semibold text-lg mt-4 mb-2 pt-2">
          À PROPOS DE CETTE CATÉGORIE
        </h2>
        <p className="text-primary/90 mb-2">{type.description}</p>
      </div>
      <div>
        {!!type.engins.length && (
          <div>
            <h3 className="text-lg font-semibold my-4">
              Les engins de cette catégorie
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    </div>
  );
};

export default TypeDetailsClient;
