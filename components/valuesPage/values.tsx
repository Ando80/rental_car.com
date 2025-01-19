import React from "react";
import SectionHeadText from "@/components/shared/SectionHeadText";
import { Divider } from "@/components/shared/Divider";
import { ValueDescription } from "./ValueDescription";
import { ExperienceRating } from "./ExperienceRating";
import style from "./style.module.scss";
import PagePadded from "@/components/molecules/PagePadded";
const Value = () => {
  return (
    <div className={style.values}>
      <PagePadded isSection>
        <div className="mx-auto flex w-full flex-col items-center gap-8 lg:w-[85%] lg:gap-20">
          <h1 className={style.title}>
            Mission et Valeurs <br></br> Fondamentals .
          </h1>
          <Divider />
          <div className="mx-auto flex w-full flex-col justify-between gap-12 lg:flex-row ">
            <ValueDescription />
            <ExperienceRating />
          </div>
          <Divider />
        </div>
      </PagePadded>
    </div>
  );
};
export default Value;
