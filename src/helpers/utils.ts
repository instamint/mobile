import moment from 'moment';
import Config from "../configuration";

export const getFormattedDateTime = (date: string)=>{
  return moment(date).format('MM/DD/YYYY HH:mm:ss');
}

export const getResourceURL = (path: string) =>{
  const arrayPath = path.split('/')

  if (arrayPath.length == 0) return undefined
  const resourceName = arrayPath[arrayPath.length -1]//Last item

  return `${Config.BASE_URL}/${Config.STORAGE_PATH}/${resourceName}`
}