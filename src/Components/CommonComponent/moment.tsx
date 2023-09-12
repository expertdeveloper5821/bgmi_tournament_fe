import moment from 'moment';
// If you installed moment-timezone xxx

// ...

export const formatDate = ({ date, format = 'l' }: { date: Date | string, format?: string }): string => {

    // Format the date as you desire
    return moment(date).format(format);
};

export const formatTime = ({ time, format = 'LT' }: { time: Date | string, format?: string }): string => {
    return moment(time).format(format)
};
