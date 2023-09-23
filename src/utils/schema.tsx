import * as Yup from 'yup';
import { emailRegex, passwordRegex } from './pattern';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Please enter your Full Name'),
  userName: Yup.string().required('Please enter your  Username'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email')
    .matches(emailRegex, 'Invalid email'),
  password: Yup.string()
    .required('Please enter your password')
    .matches(
      passwordRegex,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
    ),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email')
    .matches(emailRegex, 'Invalid email'),
  password: Yup.string().required('Please enter your password'),
});

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

const validationSchema = Yup.object().shape({
  roomId: Yup.number().required('Please enter your Room Id'),
  gameName: Yup.string().required('Please enter your  Game Name'),
  gameType: Yup.string().required('Please enter your Game Type'),
  mapType: Yup.string().required('Please enter your Map Type'),
  password: Yup.string().required('Please enter your password'),
  version: Yup.string().required('please enter your version'),
  // time: Yup
  //   .string()
  //   .required('Time is required').matches(
  //     /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
  //     'Time must be in HH:mm format'
  //   ),
  // date: Yup
  //   .date()
  //   .required('Date is required'),
  secondWin: Yup.number().required('Please enter second winner prize '),
  lastSurvival: Yup.number().required('Please enter lastSurvival winner prize'),
  highestKill: Yup.number().required('Please enter highestKill winner prize'),
  thirdWin: Yup.number().required('Please enter Third winner prize '),
  entryFee: Yup.number().required('Please enter entry Fee'),
});

const SendInviteSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email')
    .matches(emailRegex, 'Invalid email'),
});
export { SignupSchema, loginSchema, ResetPasswordSchema, validationSchema, SendInviteSchema };
