export const checkAuthentication = () => {
  if (typeof localStorage !== 'undefined') {
    const stringifyExpirationTime = localStorage.getItem('expirationTime');

    if (stringifyExpirationTime) {
      const now = new Date().getTime();
      const expirationTime = Number(stringifyExpirationTime);
      const remainingTime = expirationTime - now;
      if (remainingTime) {
        return true;
      } else {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('expirationTime');
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
