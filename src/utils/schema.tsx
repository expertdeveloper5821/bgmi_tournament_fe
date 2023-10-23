import * as Yup from 'yup';
import { emailRegex, passwordRegex } from './pattern';
import { FormDataType } from '@/types/spectatorTypes';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Please enter your Full Name'),
  // userName: Yup.string().required('Please enter your  Username'),
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
});

const personDetailSchema = Yup.object().shape({
  player: Yup.string()
    .required('player Id or username is Required')
    .min(8, 'playerId or username must be min 8 ').max(12, "playerId or username must be max 12"),
  upi: Yup.string()
    .required('UPI is needed'),
    // whatsapp:  Yup.string()
    // .matches(/^\+\d{1,3}\d{6,14}$/, 'Invalid WhatsApp number')
    // .required('Phone number is required'),
});

const addFormValidations = (name, value, setFormErrors) => {
  if (name === 'fullName') {
    if (value?.length < 3) {
      setFormErrors((prevError: FormDataType) => {
        return {
          ...prevError,
          fullName: 'Username must be at least 3 characters long.',
        };
      });
    } else {
      setFormErrors((prevError: FormDataType) => {
        return {
          ...prevError,
          fullName: '',
        };
      });
    }
  } else if (name === 'userName') {
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    if (!usernameRegex.test(value)) {
      setFormErrors((prevError: FormDataType) => {
        return {
          ...prevError,
          userName:
            'Username must be at least 3 characters long and can only contain letters, numbers, and underscores.',
        };
      });
    } else {
      setFormErrors((prevError: FormDataType) => {
        return {
          ...prevError,
          userName: '',
        };
      });
    }
  } else if (name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setFormErrors((prevError: FormDataType) => {
        return {
          ...prevError,
          email: 'Invalid email address. Please enter a valid email address.',
        };
      });
    } else {
      setFormErrors((prevError: FormDataType) => {
        return {
          ...prevError,
          email: '',
        };
      });
    }
  } else if (name === 'password') {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(value)) {
      setFormErrors((prevError: FormDataType) => {
        return {
          ...prevError,
          password:
            'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.',
        };
      });
    } else {
      setFormErrors((prevError: FormDataType) => {
        return {
          ...prevError,
          password: '',
        };
      });
    }
  }
};

export {
  SignupSchema,
  loginSchema,
  ResetPasswordSchema,
  validationSchema,
  personDetailSchema,
  addFormValidations,
};
