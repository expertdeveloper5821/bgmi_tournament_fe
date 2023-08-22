import apiServices from "../api/apiServices";

const apiBaseUrl = process.env.DUMMY_LOCAL_URL;
const googleAuthBaseUrl = process.env.REACT_APP_GOOGLE_AUTH_URL;

export default async function sendRequest(path: string, opts: any = {}) {
    const headers = { ...opts.headers, 'Content-Type': 'application/json; charset=UTF-8' };
    console.log("apiBaseUrl", apiBaseUrl)
    console.log("opts", opts)
    console.log("headers", headers)
    try {
        const response = await apiServices({
            method: opts.method,
            url: `http://192.168.1.50:5000/` + path,
            data: opts.body,
            headers: headers,
        });

        return response;
    } catch (error) {
        console.error('Error making request:', error);
        throw error;
    }

}