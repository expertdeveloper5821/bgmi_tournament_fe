export interface ForgetFormValues {
  email: string;
}

export interface TeamsDetailsFormValues {
  teamName: string;
  emails: string[] | [];
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface PersonalDetailsValue {
  player: string;
  upi: string;
  whatsapp: string;
}

export interface sendInviteServiceValuesType {
  token: string;
  data: TeamsDetailsFormValues;
}

export interface UpdateUserDetailsService {
  token: string;
  data: {
    userName: string;
    upiId: string;
    phoneNumber: string;
    profilePic?: File;
  };
}

export interface LoginServiceValuesType {
  email: string;
  password: string;
}

export interface resetPasswordValuesType {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetFormValues {
  newPassword: string;
  confirmPassword: string;
}

export interface AuthLoginFormValues {
  email: string;
  password: string;
}

export interface AuthPropsType {
  heading: string;
  subheading: string;
  stepperIsVisible?: boolean;
  step?: number;
}
