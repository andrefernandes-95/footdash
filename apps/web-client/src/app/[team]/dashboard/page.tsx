'use client'
import TeamDashboardLayout from "@/app/components/team-dashboard-layout/team-dashboard-layout";
import { useAuth } from "@/app/hooks/useAuth";
import { useCanControlTeam } from "@/app/hooks/useCanControlTeam";
import { useGetTeamBySlug } from "@/app/hooks/useGetTeamBySlug";
import { useParams } from "next/navigation";

export default function TeamDashboardPage() {
      const params = useParams<{ team: string; }>()

    
    const { team, loading } = useGetTeamBySlug(params.team)

    useCanControlTeam(team?.slug)

    if (loading) {
        return null;
    }

    return (
        <TeamDashboardLayout team={team!}>
            Hello world
        </TeamDashboardLayout>
    )
}