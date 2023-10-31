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

export interface onbStepType {
  id: number;
  title: string;
  subTitle: string;
}
export interface details {
  player: string;
  upi: string;
  whatsapp: string;
}

export interface FormDefaultPropsType {
  currentStep: number;
  handleStepChange: (stepId: number) => void;
}
