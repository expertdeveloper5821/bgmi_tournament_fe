import * as Yup from 'yup';
import { emailRegex, passwordRegex } from './pattern';
import { FormDataType } from '@/types/spectatorTypes';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email')
    .matches(emailRegex, 'Invalid email'),

  password: Yup.string()
    .required('Please enter your password')
    .matches(passwordRegex, 'Must contain:8 chars: 1 upper,lower,number,special.'),
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email')
    .matches(emailRegex, 'Invalid email'),
});

const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email')
    .matches(emailRegex, 'Invalid email'),
});

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Please enter your password')
    .matches(passwordRegex, 'Must contain:8 chars: 1 upper,lower,number,special.'),

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
    .required('Player Id or Username is required')
    .min(4, 'Player Id or Username must be min 4 and max 20')
    .max(20, 'Player Id or Username must be min 4 and max 20'),

  upi: Yup.string()
    .required('UPI ID is required')
    .matches(/^[\w]{3,}@[\w]{3,}$/, {
      message: "UPI ID: 3 characters before & after '@' needed.",
    }),

  whatsapp: Yup.string()
    .required('Whatsapp number is required')
    .matches(/^(\+91|\\+)?[1-9][0-9]{9}$/, {
      message: 'Enter valid 10-digit number or +91 start.',
    }),
});

const teamsDetailsSchema = Yup.object().shape({
  teamName: Yup.string()
    .required('Team name must contain at least three letters or digits.')
    .matches(/^[a-zA-Z0-9]{3,}$/, {
      message: 'Team name must contain at least three letters or digits.',
    }),

  emails: Yup.array()
    .of(Yup.string().email('Invalid email').matches(emailRegex, 'Invalid email'))
    .min(1, 'At least one valid email is required'),
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
  forgetPasswordSchema,
  teamsDetailsSchema,
  addFormValidations,
};
