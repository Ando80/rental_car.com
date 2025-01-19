import React from "react";
import VolumeSlider from "../shared/VolumeSlider";
import { experience } from "@/lib/experience";
import style from "./style.module.scss";

export const ExperienceRating = () => {
  return (
    <div
      className={`flex w-full justify-center xl:w-1/2 xl:justify-end ${style.experience}`}
    >
      <div className="text-white rounded-lg flex w-full flex-col items-start justify-center px-10 py-16 text-left xl:w-[max-content] xl:px-14">
        <div>
          <h1>Nos expériences</h1>
          <p>Nous sommes spécialisés en :</p>
        </div>
        <div className="mt-8 flex w-full flex-col items-start text-left">
          {experience.experience.map((exp, index) => (
            <VolumeSlider key={index} value={exp.value} name={exp.sector} />
          ))}
        </div>
      </div>
    </div>
  );
};
