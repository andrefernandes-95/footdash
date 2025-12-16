import { AppConfig } from '@/app/data/config';

console.log(AppConfig);
export const TeamRoutes = {
  TEAM_DASHBOARD: (slug: string): string => '',
};

export const AppRoutes = {
  HOME: '/',
  CREATE_ACCOUNT: `/create-account`,
  CREATE_ACCOUNT_SUCCESS: `/create-account/success`,
  USER: `/user`,
  LOGIN: `/login`,
  ...TeamRoutes,
};
