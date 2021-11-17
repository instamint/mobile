import axios, { AxiosError, AxiosResponse } from "axios";
import * as instagramSession from "../../helpers/instagramSessionHelper";
import * as instmintSession from "../../helpers/instamintSessionHelper";

const instamintAxiosInstance = axios.create()

export const setToken = (token: string | null)=>{
    instamintAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

instamintAxiosInstance.interceptors.response.use( (response: AxiosResponse)=>{
    //TODO: Intercept response
    return response
}, async (error: AxiosError)=>{
    const responseStatus = error?.response?.status;
    const token = instamintAxiosInstance.defaults.headers.common['Authorization']
    
    if (responseStatus === 401 && token) {
        //If it returns 401-Unauthorized and there's a token already, it means the token has expired
        //then force the user logs out
        await instagramSession.clear()
        await instmintSession.clear()
    }
})

export default instamintAxiosInstance