import {Dispatch, SetStateAction} from 'react';
export interface AuthContainerProps {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
  subTitle?: string;
}

export interface SignupFormValuesType {
  fullName: string;
  email: string;
  password: string;
}

export interface FormDefaultPropsType {
  handleStepChange: Dispatch<SetStateAction<number>>;
  currentStep: number
}

export interface onbStepType {
  id: number
  title: string
  subTitle: string
}