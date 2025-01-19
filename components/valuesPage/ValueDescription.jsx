import Image from "next/image";
import React from "react";
import style from "./style.module.scss";

export const ValueDescription = () => {
  return (
    <div className="relative mb-16 w-full lg:mb-0 lg:w-1/2">
      <div>
        <h1 className={style.valueTitle}>Nos Valeurs</h1>
        <p className={style.valueDesc}>
          Devenir l une des principales agences de location de voitures de
          déménagement, en offrant un service de qualité supérieure et en
          utilisant des véhicules modernes et bien entretenus pour répondre aux
          besoins de nos clients. Nous nous engageons à offrir une expérience de
          location fluide et pratique, contribuant ainsi à rendre chaque
          déménagement plus simple et plus efficace.
        </p>
      </div>
      <div className="absolute top-[60%] flex h-full w-full items-center opacity-40 xl:opacity-100">
        <figure className="relative mx-auto w-[70%] h-auto">
          <Image
            className={style.image}
            src="/background/values.png"
            layout="intrinsic"
            width={400}
            height={200}
            alt="Nos valeurs"
          />
        </figure>
      </div>
    </div>
  );
};
