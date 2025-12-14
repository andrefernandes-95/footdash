
const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')
  : undefined;

  
export const AppConfig = {
    API_URL,
    BASE_DOMAIN: process.env.NEXT_PUBLIC_BASE_DOMAIN,
    TEAM_NAME: process.env.NEXT_PUBLIC_TEAM_NAME ?? 'Team Name',
    TEAM_COLOR: process.env.NEXT_PUBLIC_TEAM_COLOR ?? 'green'
}
