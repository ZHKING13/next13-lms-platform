// components/PromotionModal.tsx

import React from "react";
import { Button } from "./ui/button";

interface PromotionModalProps {
    onClose: () => void;
    onValidate: () => void;
}
const avantages: string[] = [
    "Sessions de formations",
    "Coaching personnalisé",
    "Trading en direct assisté",
    "Séances en présentiel",
    "100 places disponibles",
];
const PromotionModal: React.FC<PromotionModalProps> = ({
    onClose,
    onValidate,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center backdrop-blur-lg  justify-center">
            <div className="bg-primary p-1 max-h-2/3 rounded-lg shadow-lg max-w-md md:w-1/2">
                <div className="flex justify-end">
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <div className="text-center">
                    <h1 className="text-white  text-2xl mb-2 font-bold">
                        Découvrez le{" "}
                        <span className="text-[#7043EC]">COBALT ACADEMY </span>
                    </h1>
                    <p className="text-white  text-md mb-2">
                        Nous vous offrons une formation intensive en présentiel
                        dès le{" "}
                        <span className="text-[#7043EC] font-bold">
                            31 Août 2024.{" "}
                        </span>{" "}
                        Soyez prêt à trader avec nous dès le troisième mois et à
                        développer votre carrière avec nous.
                    </p>
                    <div>
                        <div className="text-left pl-10 mb-4  ">
                            {avantages.map((item, id) => {
                                return (
                                    <div key={id} className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            className="fill-green-500 shrink-0"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                                data-original="#000000"
                                            ></path>
                                        </svg>
                                        <h6 className="text-base font-semibold ml-4">
                                            {item}
                                        </h6>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <Button
                        className="bg-[#7043EC] w-[90%]  mb-2 hover:bg-white hover:text-[#7043EC]"
                        onClick={onValidate}
                    >
                        Je participe
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PromotionModal;
