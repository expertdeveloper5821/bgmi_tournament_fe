export const getIdPass = (dateAndTime: string) => {
  const REDUCE_TIME = 15 * 60 * 1000;
  const currentTime = new Date().getTime();
  const dateNumber = new Date(dateAndTime).getTime();
  const reducedTime = new Date(dateNumber - REDUCE_TIME).getTime();
  return currentTime >= reducedTime;
};

export const getPageName = (path: string) => {
  switch (path) {
    case 'registerMatches':
      return 'Registered Matches';
    case 'userDashboard':
    case 'tournament':
      return 'Upcoming Matches';
    default:
      return '';
  }
};
