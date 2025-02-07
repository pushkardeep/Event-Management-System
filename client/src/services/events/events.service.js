import { addEvents } from "../../redux/slices/events.slice";
import { request } from "../../utils/axios";
import { endpoints } from "../endpoints";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const create = async (data, token) => {
  try {
    const { success, event, message } = await request(
      data,
      BASE_URL,
      "POST",
      endpoints.CREATE_EVENT,
      token
    );

    if (!success) {
      return { success: false, message: message || "Something went wrong" };
    }

    return { success: true, message: message || "Event created successfully" };
  } catch (error) {
    return { success: false, message: error.message | "Something went wrong" };
  }
};

export const get_events = async (token, dispatch) => {
  try {
    const { success, events, message } = await request(
      undefined,
      BASE_URL,
      "GET",
      endpoints.GET_EVENTS,
      token
    );

    if (!success) {
      return { success: false, message: message || "Something went wrong" };
    }

    dispatch(addEvents(events));

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message | "Something went wrong" };
  }
};
