import axios from "axios";

const instamintAxiosInstance = axios.create()

export const setToken = (token: string | null)=>{
    instamintAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instamintAxiosInstance