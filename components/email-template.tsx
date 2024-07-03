import * as React from "react";

interface EmailTemplateProps {
    name: string;
    email: string;
    number: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    name,
    email,
    number,
}) => (
    <div>
        <h1>Nouvelle demande d&apos;inscription!</h1>
        <p>Nom :::: {name}</p>
        <p>Email :::: {email}</p>
        <p>Numero :::: {number}</p>
    </div>
);
