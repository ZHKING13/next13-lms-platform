import * as React from "react";

interface EmailTemplateProps {
    name: string;
    email: string;
    number: string;
    pack: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    email,
    number,
    pack,
}) => (
    <div>
        <h1>Nouvelle demande d'inscription!</h1>
        <p>Nom :::: {name}</p>
        <p>Email :::: {email}</p>
        <p>Numero :::: {number}</p>
        <p>Pack :::: {pack}</p>
    </div>
);
