import UserDashboardLayout from "@/app/components/user-dashboard-layout/user-dashboard-layout";
import TeamsPage from "@/app/user/manage-teams";

export default function UserPage() {
  return (
    <UserDashboardLayout>
      <TeamsPage />
    </UserDashboardLayout>
  );
}
