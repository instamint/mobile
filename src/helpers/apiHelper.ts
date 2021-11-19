import Config from "../configuration";

export const getFullPath = (path: string)=>{
    return `${Config.BASE_URL}/${Config.URL_PREFIX}/${path}`
}