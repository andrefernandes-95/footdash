import DashboardPage from "@/app/components/dashboard-page/dashboard-page";
import TeamsPage from "@/app/user/manage-teams";

export default function UserPage() {
  return (
    <DashboardPage>
      <TeamsPage />
    </DashboardPage>
  );
}
