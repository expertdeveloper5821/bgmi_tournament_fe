import apiServices from "../api/apiServices";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const googleAuthBaseUrl = process.env.REACT_APP_GOOGLE_AUTH_URL;

export default async function sendRequest(path: string, opts: any = {}) {
    const headers = { ...opts.headers, 'Content-Type': 'application/json; charset=UTF-8' };
    console.log("apiBaseUrl", apiBaseUrl)
    console.log("opts", opts)
    console.log("headers", headers)
    try {
        const response = await apiServices({
            method: opts.method,
            url: apiBaseUrl + path,
            data: opts.body,
            headers: headers,
        });

        return response;
    } catch (error) {
        console.error('Error making request:', error);
        throw error;
    }

}