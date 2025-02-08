import { addUserEvents } from "../../redux/slices/events.slice";
import { removeUser, setUser } from "../../redux/slices/user.slice";
import { request } from "../../utils/axios";
import { endpoints } from "../endpoints";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const profile = async (token, dispatch, navigate) => {
  try {
    const { success, user, message } = await request(
      undefined,
      BASE_URL,
      "GET",
      endpoints.PROFILE,
      token
    );

    if (!success) {
      localStorage.removeItem("token");
      dispatch(removeUser());
      navigate("/sign_in");
      return { success: false, message: message || "Something went wrong" };
    }

    dispatch(setUser(user));

    return { success: true };
  } catch (error) {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/sign_in");
    return { success: false, message: error.message | "Something went wrong" };
  }
};

export const userEvents = async (token, dispatch) => {
  try {
    const { success, userEvents, message } = await request(
      undefined,
      BASE_URL,
      "GET",
      endpoints.GET_USER_EVENTS,
      token
    );

    if (!success) {
      return { success: false, message: message || "Something went wrong" };
    }

    dispatch(addUserEvents(userEvents));

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message | "Something went wrong" };
  }
};
