import { AppConfig } from "@/app/data/config"

console.log(AppConfig)
export const TeamRoutes = {
    TEAM_DASHBOARD: (slug: string): string => `http${AppConfig.BASE_DOMAIN?.startsWith('localhost') ? '' : 's'}://${slug}.${AppConfig.BASE_DOMAIN}/dashboard`,
}

export const AppRoutes = {
    CREATE_ACCOUNT: `/create-account`,
    CREATE_ACCOUNT_SUCCESS: `/create-account/success`,
    USER: `/user`,
    LOGIN: `/login`,
    ...TeamRoutes,
}

