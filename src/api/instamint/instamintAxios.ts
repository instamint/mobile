import axios from "axios";

const instamintAxiosInstance = axios.create()

export const setToken = (token: string)=>{
    instamintAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instamintAxiosInstance