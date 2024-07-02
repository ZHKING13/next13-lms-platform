// components/PromotionModal.tsx

import React from "react";
import { Button } from "./ui/button";

interface PromotionModalProps {
    onClose: () => void;
}

const PromotionModal: React.FC<PromotionModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center  justify-center">
            <div className="bg-white p-1 max-h-2/3 rounded-lg shadow-lg max-w-md md:w-1/2">
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
                    <img
                        src="/promo.png" // Chemin vers votre image de promotion
                        alt="Promotion Image"
                        className="rounded-lg object-contain max-h-[400px] w-full mb-3"
                    />
                    {/* <p className="text-gray-700 mb-4">
                        Découvrez notre dernière formation dès maintenant.
                    </p> */}
                    <Button onClick={onClose}>En savoir plus</Button>
                </div>
            </div>
        </div>
    );
};

export default PromotionModal;
