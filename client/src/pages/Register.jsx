import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// Components
import BigButton from "../components/commmon/BigButton";
import GuestLogInBar from "../components/commmon/GuestLogInBar";
import Toast from "../components/commmon/Toast";
import ScLoader from "../components/commmon/ScLoader";
import FormInput from "../components/commmon/FormInput";

// Icons
import { MdError } from "react-icons/md";

// Services
import { register } from "../services/auth/auth.service";

// Redux Actions
import {
  setLoading,
  setToastMessage,
  setIsToatOpen,
} from "../redux/slices/ui.slice";

const initialFormData = {
  name: "",
  email: "",
  location: "",
  password: "",
};

const RegisterForm = ({ formData, setFormData, onSubmit, isApproved }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[400px] border border-gray-700 bg-gray-800 rounded-xl p-4"
    >
      <FormInput
        label="Your Name"
        type="text"
        name="name"
        placeholder="Devis"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <FormInput
        label="Your Email"
        type="email"
        name="email"
        placeholder="name@flowbite.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <FormInput
        label="Your Location"
        type="text"
        name="location"
        placeholder="New York, USA"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      />
      <FormInput
        label="Your Password"
        type="password"
        name="password"
        placeholder="********"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <BigButton title="Create Account" disabled={!isApproved} />
      <div className="mt-3 text-white text-sm text-center">
        <span>Already have an account?</span>
        <Link
          to="/sign_in"
          className="text-blue-500 font-semibold ml-1.5 hover:text-blue-600"
        >
          Sign In
        </Link>
      </div>
      <span className="block text-[#fff]/30 text-xs text-center mt-1">Or</span>
      <GuestLogInBar />
    </form>
  );
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isToastOpen } = useSelector((state) => state.ui);
  const [formData, setFormData] = useState(initialFormData);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    setIsApproved(Object.values(formData).every((val) => val.trim() !== ""));
  }, [formData]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const { success, message } = await register(formData, dispatch, navigate);
    dispatch(setLoading(false));
    if (!success) {
      dispatch(setToastMessage(message));
      dispatch(setIsToatOpen(true));
      return;
    }

    setFormData(initialFormData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 relative">
      {isToastOpen && <Toast Icon={MdError} />}
      <RegisterForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={onFormSubmit}
        isApproved={isApproved}
      />
      {isLoading && <ScLoader />}
    </div>
  );
};

export default Register;
