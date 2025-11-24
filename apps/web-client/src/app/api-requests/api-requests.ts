import { AppConfig } from "@/app/data/config";
import axios from "axios";

const login = (
    email: string,
    password: string,
) => axios.post(AppConfig.API_URL + '/auth/login', { email, password }, { withCredentials: true });


const signUp = ({email, username, password }: {
    email: string,
    username: string,
    password: string,
}) => axios.post(AppConfig.API_URL + '/user/signup', { email, username, password }, { withCredentials: true });

export const ApiRequests = {
    login,
    signUp,
}