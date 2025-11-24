'use client'

import UserDashboardLayout from "@/app/components/user-dashboard-layout/user-dashboard-layout";
import { useAuth } from "@/app/hooks/useAuth";
import TeamsPage from "@/app/user/manage-teams";
import { redirect } from "next/navigation";

export default function UserPage() {
  const { user, loading } = useAuth()

  if (!loading && !user) {
    redirect('/')
  }

  return (
    <UserDashboardLayout user={user}>
      <TeamsPage  user={user}/>
    </UserDashboardLayout>
  );
}
