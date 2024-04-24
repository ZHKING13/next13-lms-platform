const CLIENT_ID = "yfGFsSVapIkOieVzpirC0aBim6oa";
const CLIENT_SECRET = "e5CspPutOfaU6QH3wWAM53T2YS0a";

// Concatenate CLIENT_ID and CLIENT_SECRET with a colon
const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;

// Encode the concatenated string in base64
const basicToken = Buffer.from(credentials).toString('base64');

console.log("YOUR BASIC TOKEN:", basicToken);