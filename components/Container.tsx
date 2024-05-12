// import Sidebar from "@/app/Sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import Footer from "./Footer1";
import useStore from "@/store/useStore";
import Sidebar from "@/app/souscription/Sidebar";

type TContainer = {
    children: React.ReactNode;
    className?: string;
    onNext: () => void;
    onPreviousStep?: () => void;
};

export default function Container({
    children,
    className,
    onNext,
    onPreviousStep,
}: TContainer) {
const { step, decreaseStep, plan, selectedAddOns, isSubmitted, onSubmit } =
    useStore((state) => state);    return (
        <>
            <section
                className={cn(
                    "w-80 flex items-center md:mt-5 justify-center md:w-1/2",
                    className
                )}
            >
                <Sidebar />
                <div className="w-full  ">
                    {children}
                    {!isSubmitted && (
                        <Footer
                            className="hid"
                            onHandleNextStep={onNext}
                            onHandlePreviousStep={onPreviousStep}
                        />
                    )}
                </div>
            </section>
            {/* {!isSubmitted && (
                <Footer
                    className={cn(
                        "inline-flex lg:hidden ",
                        { "-bottom-12": step === 2 }
                    )}
                    onHandleNextStep={onNext}
                    onHandlePreviousStep={onPreviousStep}
                />
            )} */}
        </>
    );
}
