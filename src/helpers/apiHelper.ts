import { BASE_URL, URL_PREFIX } from "../configuration";

export const getFullPath = (path: string)=>{
    return `${BASE_URL}/${URL_PREFIX}/${path}`
}