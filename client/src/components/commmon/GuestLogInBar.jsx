import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// icon
import { GiAstronautHelmet } from "react-icons/gi";

// components
import { guest } from "../../services/auth/auth.service";

// methods
import {
  setLoading,
  setToastMessage,
  setIsToatOpen,
} from "../../redux/slices/ui.slice";

function GuestLogInBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGuestLogIn = async () => {
    dispatch(setLoading(true));
    const { success, message } = await guest(dispatch, navigate);

    if (!success) {
      dispatch(setIsToatOpen(true));
      dispatch(setToastMessage(message));
    }

    dispatch(setLoading(false));
  };
  return (
    <div
      onClick={handleGuestLogIn}
      className="w-fit mt-2 mx-auto flex justify-center items-center gap-1.5 text-white text-sm border-2 border-gray-700 rounded-full py-2 px-4 cursor-pointer hover:bg-gray-700"
    >
      <GiAstronautHelmet className="w-4 h-4" />
      <h6>Go as Guest</h6>
    </div>
  );
}

export default GuestLogInBar;
