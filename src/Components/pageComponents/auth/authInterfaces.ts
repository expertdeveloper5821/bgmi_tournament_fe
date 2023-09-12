export interface AuthContainerProps {
    children: string | JSX.Element | JSX.Element[]
    title?: string
}

export interface SignupFormValuesType {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    upiId: string;
}