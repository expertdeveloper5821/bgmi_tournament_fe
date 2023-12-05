import moment from 'moment-timezone';
// If you installed moment-timezone

// ...

export const formatDate = ({
  date,
  format = 'l',
}: {
  date: Date | string;
  format?: string;
}): string => {
  // Format the date as you desire
  return moment(date).format(format);
};

export const formatTime = ({
  time,
  format = 'h:mm',
  timeZone = 'UTC', // Set your desired time zone here
}: {
  time: Date | string;
  format?: string;
  timeZone?: string;
}): string => {
  return moment(time).tz(timeZone).format(format);
};

export const formatDateAndTime = (
  date: string | Date,
  time: string | Date,
  format: string,
): string => {
  return `${formatDate({ date })} at ${formatTime({ time, format })}`;
};
