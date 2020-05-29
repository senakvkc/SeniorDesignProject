import moment from 'moment';

export const toMessageDate = date => {
    const now = moment();
 
    if (now.diff(date, 'days') < 1) {
      return date.format("kk:mm");
    }
 
    return date.format("DD:MM");
};