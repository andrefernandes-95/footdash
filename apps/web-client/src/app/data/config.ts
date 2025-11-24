
const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')
  : undefined;

export const AppConfig = {
    API_URL,
}
