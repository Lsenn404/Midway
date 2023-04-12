import axios from "axios";

export const post = async (
    endpoint: string,
    params: { [key: string]: any } = {}
  ) => {
    const res = await axios.post(endpoint, params);
    return res.data;
  };