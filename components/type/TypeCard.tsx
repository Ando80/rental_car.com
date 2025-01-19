"use client";
import "@/styles/cards.scss";
import "@/styles/variables.scss";
import { usePathname, useRouter } from "next/navigation";
import { TypeWithEngin } from "./AddTypeForm";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Divider } from "../shared/Divider";

const TypeCard = ({ type }: { type: TypeWithEngin }) => {
  const pathname = usePathname();
  const isMyTypes = pathname.includes("my-types");
  const router = useRouter();
  return (
    <>
      <div
        className="mt-12"
        onClick={() => !isMyTypes && router.push(`/type-details/${type.id}`)}
      >
        <div className="project-card xl:aspect--5-4 rounded-2xl relative flex h-full w-full min-h-[300px] max-w-[400px] cursor-pointer flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <figure className="h-full max-h-[150px] w-full py-12 xl:max-h-full">
            <Image
              className="h-full w-full object-cover"
              src={type.image}
              alt={type.title}
              layout="fill"
            />
          </figure>
          <div
            className="description_overflow relative bottom-0 z-10 flex translate-x-0 flex-col
                items-center bg-primary-pink px-6 pt-4 text-center text-white xl:absolute xl:translate-y-[63%]"
          >
            <div className="description_title text--24-bold uppercase">
              {type.title}
            </div>
            <div className="description text--base lg:min-h-[75px] my-4">
              {type.description}
            </div>
            {isMyTypes && (
              <Button onClick={() => router.push(`/type/${type.id}`)}>
                Modifier
              </Button>
            )}
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default TypeCard;
