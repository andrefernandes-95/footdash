
const CLIENT_URI = process.env.CLIENT_URI
    ? process.env.CLIENT_URI.replace(/\/$/, '')
    : undefined;

export const ApiConfig = {
    CLIENT_URI,
}
