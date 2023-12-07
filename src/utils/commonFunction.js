import moment from 'moment';

export const getIdPass = (dateAndTime) => {
  const REDUCE_TIME = 15 * 60 * 1000;
  const currentTime = new Date().getTime();
  const dateNumber = new Date(dateAndTime).getTime();
  const reducedTime = new Date(dateNumber - REDUCE_TIME).getTime();
  return currentTime >= reducedTime;
};

export const getPageName = (path) => {
  switch (path) {
    // case 'friends':
    //   return 'Invite your friends';
    case 'registerMatches':
      return 'Registered Matches';
    case 'userDashboard':
    case 'tournament':
      return 'Upcoming Matches';
    default:
      return '';
  }
};

export function debounce(func, delay = 1000) {
  let timeoutId;
  return function () {
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function toCamelCase(inputString) {
  return inputString
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join('');
}

export const getFormattedDateOrTime = (dateAndTime, Type) => {
  const momentObj = moment(dateAndTime);
  if (Type === 'Date') {
    const formattedDate = momentObj?.format('M/D/YYYY');
    return formattedDate;
  } else if (Type === 'Time') {
    const formattedTime = momentObj?.format('h:mm A');
    return formattedTime;
  }
};
