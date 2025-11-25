import { AppConfig } from "@/app/data/config";
import { Team } from "@/app/types/models";
import axios from "axios";

const signUp = ({ email, username, password }: {
    email: string,
    username: string,
    password: string,
}) => axios.post(AppConfig.API_URL + '/user/signup', { email, username, password }, { withCredentials: true });

const login = ({ email, password }: {
    email: string,
    password: string,
}) => axios.post(AppConfig.API_URL + '/auth/login', { email, password }, { withCredentials: true });

const verifyEmail = (token: string) =>
    axios.get(AppConfig.API_URL + `/email-verification/verify?token=${token}`, {
        withCredentials: true,
    });

const me = () =>  axios.get(AppConfig.API_URL + '/auth/me', { withCredentials: true });


const logout = () => axios.post(AppConfig.API_URL + '/auth/logout', {}, { withCredentials: true });

const createTeam = (data: { name: string; slug?: string }) =>
  axios.post(`${AppConfig.API_URL}/team`, data, { withCredentials: true });

const myTeams = () =>  axios.get(AppConfig.API_URL + '/team/my-teams', { withCredentials: true });

const getTeamBySlug = (slug: string) => axios.get<Team>(`/api/team/${slug}`, { withCredentials : false });

const meTeam = (teamSlug: string) =>  axios.get(`/api/auth/me-team/${teamSlug}`, { withCredentials: true });

export const ApiRequests = {
    login,
    logout,
    signUp,
    verifyEmail,
    me,
    meTeam,
    createTeam,
    myTeams,
    getTeamBySlug,
}