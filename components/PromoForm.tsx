// components/NewsletterModal.tsx

import { useState } from "react";
import { z, ZodError } from "zod";

const schema = z.object({
    firstName: z
        .string()
        .min(2, { message: "Le prénom doit comporter au moins 2 caractères" }),
    lastName: z
        .string()
        .min(2, { message: "Le nom doit comporter au moins 2 caractères" }),
    phoneNumber: z
        .string()
        .min(10, {
            message:
                "Le numéro de téléphone doit comporter au moins 10 caractères",
        }),
    email: z.string().email({ message: "Adresse email invalide" }),
});

type FormValues = z.infer<typeof schema>;

interface NewsletterModalProps {
    onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({ onClose }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const values: FormValues = schema.parse({
                firstName,
                lastName,
                phoneNumber,
                email,
            });
            console.log(values); // Utilisez les valeurs validées ici (par exemple, les envoyer à un backend)
            onClose(); // Ferme le modal après soumission réussie
        } catch (error) {
            if (error instanceof ZodError) {
                const errors: { [key: string]: string } = {};
                error.errors.forEach((err) => {
                    // Vérifiez si err.path est défini avant de l'utiliser
                    if (err.path && err.path.length > 0) {
                        errors[err.path[0] as string] = err.message; // Assurez-vous que err.path[0] est traité comme une chaîne
                    }
                });
                setFormErrors(errors);
            }
        }
    };

    return (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-8 relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 cursor-pointer shrink-0 fill-gray-800 hover:fill-red-500 float-right"
                    viewBox="0 0 320.591 320.591"
                    onClick={onClose}
                >
                    <path
                        d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                        data-original="#000000"
                    ></path>
                    <path
                        d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                        data-original="#000000"
                    ></path>
                </svg>
                <div className="my-8 text-center">
                    <h4 className="text-2xl text-gray-800 font-bold">
                        Subscribe to our Newsletter
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">
                        Join thousands getting emails in their inbox.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Prénom"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`px-4 py-2.5 mt-2 bg-[#f0f1f2] text-gray-800 w-full text-sm focus:bg-transparent outline-blue-600 rounded-md ${
                                    formErrors.firstName ? "border-red-500" : ""
                                }`}
                            />
                            {formErrors.firstName && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formErrors.firstName}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Nom"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`px-4 py-2.5 mt-2 bg-[#f0f1f2] text-gray-800 w-full text-sm focus:bg-transparent outline-blue-600 rounded-md ${
                                    formErrors.lastName ? "border-red-500" : ""
                                }`}
                            />
                            {formErrors.lastName && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formErrors.lastName}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Numéro de téléphone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className={`px-4 py-2.5 mt-2 bg-[#f0f1f2] text-gray-800 w-full text-sm focus:bg-transparent outline-blue-600 rounded-md ${
                                    formErrors.phoneNumber
                                        ? "border-red-500"
                                        : ""
                                }`}
                            />
                            {formErrors.phoneNumber && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formErrors.phoneNumber}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`px-4 py-2.5 mt-2 bg-[#f0f1f2] text-gray-800 w-full text-sm focus:bg-transparent outline-blue-600 rounded-md ${
                                    formErrors.email ? "border-red-500" : ""
                                }`}
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {formErrors.email}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-2.5 w-full rounded-md text-white text-sm outline-none bg-blue-600 hover:bg-blue-700"
                        >
                            Yeah, thanks!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsletterModal;
