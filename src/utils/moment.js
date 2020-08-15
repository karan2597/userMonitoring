import moment from 'moment';

export const getActivityTimeline = ({ timestamp, format }) => moment.unix(timestamp).format(format);

export const getFormattedDate = ({ date, format }) => moment(date).utc().format(format);
