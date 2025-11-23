import axios from "axios";

const apiPath = `http://localhost:3005`

const login = (
    email: string,
    password: string,
) => axios.post(apiPath + '/auth/login', { email, password }, { withCredentials: true });

export const ApiRequests = {
    login,
}