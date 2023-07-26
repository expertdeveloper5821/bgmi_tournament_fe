import sendRequest from "../auth_All_Api"

export const UserLogin = (data: any) => {
    sendRequest("localhost:5000/v1/login", {
        method: "POST",
        body: data,
    });
}

export const ForgotPassword = (data: any) => {
    sendRequest("localhost:5000/v1/forget-password", {
        method: "POST",
        body: data,
    })
}

export const ResetPassword = (data:any) => {
    sendRequest("localhost:5000/v1/reset-password",{
        method: "POST",
        body: data,
    })
}