import axios from "axios";

export const  getToken=async()=> {
    // get token from environment
    try {
        const token = process.env.BIZAO_TOKEN;
        const response = await axios.post(
            "https://api.bizao.com/token",
            {
                grant_type: "client_credentials",
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        const { access_token } = response.data;
        console.log("Access Token:", access_token);
        return access_token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Utilisation de la fonction
