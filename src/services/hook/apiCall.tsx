import { useState } from "react";
import axios from "axios";

export const useApiCall = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const apiCall = async (url:string, method:string, body:any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
      setLoading(false);
      return response.data;
    } catch (error: any) {
      setError(error.response.data.message);
      setLoading(false);
      throw error;
    }
  };

  return { data, error, loading, apiCall };

}

export default useApiCall;
