import { setUser } from "../../redux/slices/user.slice";
import { request } from "../../utils/axios";
import { endpoints } from "../endpoints";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const register = async (data, dispatch, navigate) => {
  try {
    const { success, user, token, message } = await request(
      data,
      BASE_URL,
      "POST",
      endpoints.REGISTER
    );

    if (!success) {
      return { success: false, message: message || "Something went wrong" };
    }

    dispatch(setUser(user));
    localStorage.setItem("token", token);
    navigate("/");

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message | "Something went wrong" };
  }
};

export const log_in = async (data, dispatch, navigate) => {
  try {
    const { success, user, token, message } = await request(
      data,
      BASE_URL,
      "POST",
      endpoints.LOG_IN
    );

    if (!success) {
      return { success: false, message: message || "Something went wrong" };
    }

    dispatch(setUser(user));
    localStorage.setItem("token", token);
    navigate("/");

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message | "Something went wrong" };
  }
};

export const guest = async (dispatch, navigate) => {
  try {
    const { success, user, token, message } = await request(
      undefined,
      BASE_URL,
      "POST",
      endpoints.GUEST
    );

    if (!success) {
      return { success: false, message: message || "Something went wrong" };
    }

    dispatch(setUser(user));
    localStorage.setItem("token", token);
    navigate("/");

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message | "Something went wrong" };
  }
};
