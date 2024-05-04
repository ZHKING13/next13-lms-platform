// const CLIENT_ID = "npxKa25QpgSZq7vs_1KvaCwz5tsa";
// const CLIENT_SECRET = "yJ0G0p4SCknna9pqjc5eIvF5EAoa";
// // Concatenate CLIENT_ID and CLIENT_SECRET with a colon
// const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;

// // Encode the concatenated string in base64
// const basicToken = Buffer.from(credentials).toString('base64');

// console.log("YOUR BASIC TOKEN:", basicToken);

(async() => {
    try {
        const response = await sendBizaoRequest(
            100,
            "ci",
            "orange",
            "XOF",

        );
        console.log("Réponse du serveur:", response);
    } catch (error) {
        console.error(error);
    }
})();