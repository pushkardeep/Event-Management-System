import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

// components
import BigButton from "../components/commmon/BigButton";
import GuestLogInBar from "../components/commmon/GuestLogInBar";
import Toast from "../components/commmon/Toast";
import ScLoader from "../components/commmon/ScLoader";

// services
import { register } from "../services/auth/auth.service";

// icons
import { MdError } from "react-icons/md";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const onFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const { success, message } = await register(formData, dispatch, navigate);

    if (!success) {
      setMessage(message);
    }

    setLoading(false);
    setFormData({
      name: "",
      email: "",
      location: "",
      password: "",
    });
  };

  useEffect(() => {
    if (
      formData.name &&
      formData.email &&
      formData.location &&
      formData.password
    ) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [formData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4 relative">
      {message && <Toast message={message} Icon={MdError} />}
      <form
        onSubmit={onFormSubmit}
        className="w-full max-w-[400px] border border-gray-700 bg-gray-800 rounded-xl p-4"
      >
        <div className="mb-3">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder="Devis"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder="name@flowbite.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Location
          </label>
          <input
            type="text"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder="New York, USA"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your password
          </label>
          <input
            type="password"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder="********"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        <BigButton title="Create Account" disabled={!isApproved} />

        <div className="mt-3 text-white text-sm text-center">
          <span>Already have an account :</span>
          <span>
            <Link
              to={"/sign_in"}
              className="text-blue-500 font-semibold ml-1.5 hover:text-blue-600"
            >
              Sign In
            </Link>
          </span>
        </div>
        <span className="block text-[#fff]/30 text-xs text-center mt-1">
          Or
        </span>
        <GuestLogInBar
          setErrorMessage={setMessage}
          setLoadingState={setLoading}
        />
      </form>
      {loading && <ScLoader />}
    </div>
  );
}

export default Register;
