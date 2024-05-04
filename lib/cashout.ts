import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const YOUR_ACCESS_TOKEN =
    "bnB4S2EyNVFwZ1NacTd2c18xS3ZhQ3d6NXRzYTp5SjBHMHA0U0Nrbm5hOXBxamM1ZUl2RjVFQW9h";

const generateUniqueOrderId = (): string => {
    return `cob${uuidv4()}`;
};
 export const sendBizaoRequest = async (
    amount: number,
    countryCode: string,
    operator: string,

    state: string
): Promise<any> => {
    const requestData = {
        currency: "XOF",
        order_id: generateUniqueOrderId(),
        amount,
        state,
        return_url: "https://cobaltinvest.com/dashboard",
        cancel_url: "https://cobaltinvest.com/",
        reference: "cobalt_invest",
    };

    const config= {
        headers: {
            Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
            "country-code": countryCode,
            "mno-name": operator,
            lang: "fr",
            channel: "web",
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await axios.post(
            "https://api.bizao.com/mobilemoney/v1",
            requestData,
            config
        );
        return response.data;
    } catch (error) {
        throw new Error(
            "Erreur lors de la requête vers Bizao API : " + error
        );
    }
};


// Exemple d'utilisation de la fonction
(async () => {
    try {
        const response = await sendBizaoRequest(
            100,
            "ci",
            "moov",
            "XOF",
           
        );
        console.log("Réponse du serveur:", response);
    } catch (error) {
        console.error(error);
    }
})();
