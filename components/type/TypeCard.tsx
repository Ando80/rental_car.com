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
      <div className=" flex gap-2 bg-background/50 border border-primary/5 rounded-lg">
        <div className="flex-1 aspect-square overflow-hidden relative w-full h-[210px] object-cover rounded-s-lg">
          <Image src={type.image} alt={type.title} width={400} height={400} />
        </div>
        <div className="flex-1 mt-2">
          <h3 className="font-semibold text-center ">{type.title}</h3>
          <div className="text-primary/90 text-center subpixel-antialiased">
            {type.description.substring(0, 70)}...
          </div>
          {isMyTypes && (
            <Button
              onClick={() => router.push(`/type/${type.id}`)}
              variant="outline"
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeCard;
