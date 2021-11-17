import moment from 'moment';

export function getFormattedDateTime(date: string) {
  return moment(date).format('MM/DD/YYYY HH:mm:ss');
}