import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// Components
import BigButton from "../components/commmon/BigButton";
import GuestLogInBar from "..//components/commmon/GuestLogInBar";
import Toast from "../components/commmon/Toast";
import ScLoader from "../components/commmon/ScLoader";
import FormInput from "../components/commmon/FormInput";

// Services
import { log_in } from "../services/auth/auth.service";

// Icons
import { MdError } from "react-icons/md";

// Redux Actions
import {
  setLoading,
  setToastMessage,
  setIsToatOpen,
} from "../redux/slices/ui.slice";

const initialFormData = { email: "", password: "" };

const SignInForm = ({ formData, setFormData, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[400px] border border-gray-700 bg-gray-800 rounded-xl p-4"
    >
      <FormInput
        label="Your Email"
        type="email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="name@example.com"
      />
      <FormInput
        label="Your Password"
        type="password"
        required
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="********"
      />
      <BigButton title="Log in"/>
      <div className="mt-3 text-white text-sm text-center">
        <span>Don't have an account?</span>
        <Link
          to="/register"
          className="text-blue-500 font-semibold ml-1.5 hover:text-blue-600"
        >
          Register
        </Link>
      </div>
      <span className="block text-[#fff]/30 text-xs text-center mt-1">Or</span>
      <GuestLogInBar />
    </form>
  );
};

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isToastOpen } = useSelector((state) => state.ui);

  const [formData, setFormData] = useState(initialFormData);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const { success, message } = await log_in(formData, dispatch, navigate);
    dispatch(setLoading(false));
    if (!success) {
      dispatch(setToastMessage(message));
      dispatch(setIsToatOpen(true));
      return;
    }

    setFormData(initialFormData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      {isToastOpen && <Toast Icon={MdError} />}
      <SignInForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={onFormSubmit}
      />
      {isLoading && <ScLoader />}
    </div>
  );
}

export default SignIn;
