import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";
import useStore from "@/store/useStore";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

export default function PlanCard({ item, onClick }: any) {
  const { isToggled, plan } = useStore((state) => state);

  let imgSrc = "";
  let alt = "";

  switch (item?.name) {
    case "Pack Elite":
      imgSrc = "/images/basic.png";
      alt = item?.name;
      break;
    
    case "Pack Premium":
      imgSrc = "/images/diamant.png";
      alt = item?.name;
    default:
      break;
  }

  const monthlyPrice = `${formatPrice(item.subscription.monthly?.price)}/mois`;
  const yearlyPrice = `${formatPrice(item.subscription.yearly?.price)}/année`;
  const trails = item.subscription.yearly?.trails;

  return (
    <Card
      className={cn(
        "w-full cursor-pointer hover:border hover:border-c-primary-purplish-blue",
        {
          "border border-c-primary-purplish-blue text-white bg-c-neutral-alabaster":
            plan && plan?.id === item.id,
        }
      )}
      onClick={onClick}
    >
      <CardContent className="w-full lg:pt-5 flex items-center h-full gap-[14px] p-4 lg:flex-col lg:items-start">
        <div className="relative w-10 h-10 lg:mb-[39px]">
          <Image src={imgSrc} alt={alt} fill />
        </div>
        <div className="flex flex-col gap-[7px]">
          <CardTitle className="text-base font-medium text-c-primary-marine-blue">
            {item?.name}
          </CardTitle>
          <p className="text-sm text-c-neutral-cool-gray">
            {isToggled ? yearlyPrice : monthlyPrice}
          </p>
         
        </div>
      </CardContent>
    </Card>
  );
}