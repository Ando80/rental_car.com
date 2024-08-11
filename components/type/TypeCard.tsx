/* eslint-disable @next/next/no-img-element */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { TypeWithEngin } from "./AddTypeForm";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

const TypeCard = ({ type }: { type: TypeWithEngin }) => {
  const pathname = usePathname();
  const isMyTypes = pathname.includes("my-types");
  const router = useRouter();
  return (
    <div
      onClick={() => !isMyTypes && router.push(`/type-details/${type.id}`)}
      className={cn(
        "col-span-1 cursor-pointer transition hover:scale-105",
        isMyTypes && "cursor-default"
      )}
    >
      <div className=" w-full flex flex-col gap-2">
        <div className="relative w-full overflow-hidden rounded-xl aspect-square">
          <Image
            className="w-full h-full object-cover group-hover:scale-110 transition"
            src={type.image}
            alt={type.title}
            width={400}
            height={400}
          />
        </div>
        <div className="flex-1 mt-2">
          <h3 className="font-semibold ml-2">{type.title}</h3>
          <div className="text-primary/90 subpixel-antialiased ml-2">
            {type.description.substring(0, 30)}...
          </div>
          {isMyTypes && (
            <Button onClick={() => router.push(`/type/${type.id}`)}>
              Modifier
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeCard;
