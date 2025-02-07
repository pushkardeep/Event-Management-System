import axios from "axios";

const axiosInstance = axios.create({});

export const request = async (
  formData,
  base_url,
  method,
  endpoint,
  token = null
) => {
  try {
    const headers = {};
    token && (headers.Authorization = `Bearer ${token}`);
    const data = await axiosInstance({
      baseURL: base_url,
      url: endpoint,
      method: method,
      data: formData,
      headers,
    });
    return data.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data.message || error.message || "Something went wrong",
    };
  }
};
