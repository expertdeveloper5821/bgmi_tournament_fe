import { sendRequest } from '@/utils/axiosInstanse';
import { serviceUrls } from './serviceUrls';
import { SignupFormValuesType } from '@/Components/pageComponents/auth/authInterfaces';

export const signUpService = async (data: SignupFormValuesType) => {
  try {
    const res = await sendRequest(serviceUrls.signup, {
      method: 'POST',
      data,
    });
    if (res.status === 200) {
      return res;
    } else throw Error();
  } catch (err) {
    return err;
  }
};
