"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";

type TFooter = {
    className?: string;
    onHandleNextStep?: () => void;
    onHandlePreviousStep?: () => void;
};

export default function Footer({
    className,
    onHandleNextStep,
    onHandlePreviousStep,
}: TFooter) {
    const step = useStore((state) => state.step);
    const load =useStore((state) => state.loading);
    return (
        <footer
            className={cn(
                "p-4 bg-c-neutral-white flex items-center  justify-between",
                className
            )}
        >
            {step === 1 && <div className="w-full" />}

            {step > 1 && (
                <Button
                    className="text-c-neutral-cool-gray text-primary bg-white hover:bg-c-primary-marine-blue-hover "
                    onClick={onHandlePreviousStep}
                >
                    Retour
                </Button>
            )}
            <Button
                className={cn(
                    "bg-[#7043EC] text-white hover:bg-c-primary-marine-blue-hover"
                )}
                onClick={onHandleNextStep}
                disabled={load}
                
            >
                {step === 3 ? "Passer au paiement" : "Suivant"}
            </Button>
        </footer>
    );
}
