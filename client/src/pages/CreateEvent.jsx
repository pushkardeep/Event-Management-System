import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// components
import BigButton from "../components/commmon/BigButton";
import Toast from "../components/commmon/Toast";
import ScLoader from "../components/commmon/ScLoader";

// icons
import { MdError } from "react-icons/md";

// services
import { imgUploader } from "../services/cloudinary/img_uploading.service";
import { create } from "../services/events/events.service";

function CreateEvent() {
  const dispatch = useDispatch();
  const imgInputRef = useRef(null);

  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [formData, setFormData] = useState({
    cover: "",
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    category: "",
    status: "",
  });

  const onImgInputChange = async (e) => {
    setImgUploading(true);
    const { success, message, url } = await imgUploader(e.target.files[0]);

    if (!success) {
      return setMessage(message);
    }

    setImgUploading(false);
    setFormData({ ...formData, cover: url });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { success, message } = await create(formData, token, dispatch);
    if (!success) {
      setLoading(false);
      return setMessage(message);
    }

    setLoading(false);
    setMessage(message);
    setFormData({
      cover: "",
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      category: "",
      status: "",
    });
  };

  // set form approval
  useEffect(() => {
    if (
      formData.cover &&
      formData.title &&
      formData.description &&
      formData.location &&
      formData.date &&
      formData.time &&
      formData.category &&
      formData.status
    ) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [formData]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 py-8">
      {message && <Toast Icon={MdError} message={message} />}
      <form
        onSubmit={onFormSubmit}
        className="w-full max-w-[400px] border border-gray-700 bg-gray-800 rounded-xl p-3"
      >
        <div className="mb-3">
          {formData?.cover ? (
            <img
              className="w-full h-48 rounded-lg shadow-lg object-cover"
              src={formData?.cover}
              alt="cover"
            />
          ) : (
            <>
              <label
                htmlFor="Upload Image"
                className="block mb-2 text-sm font-medium text-white"
              >
                Upload Image
              </label>
              <div
                onClick={() => imgInputRef.current?.click()}
                className="flex items-center justify-center w-full"
              >
                {imgUploading ? (
                  <div className="flex flex-col items-center justify-center w-full h-48 border-2 rounded-lg cursor-pointer bg-gray-700 border-gray-600 ">
                    <div className="w-10 h-10 border-4 border-white/15 border-t-4 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 bg-gray-700 border-gray-600 hover:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      ref={imgInputRef}
                      onChange={onImgInputChange}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      required
                    />
                  </label>
                )}
              </div>
            </>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-white"
          >
            Event Title
          </label>
          <input
            type="text"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder="Agriculture Conference 2022"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="location and date"
            className="block mb-2 text-sm font-medium text-white"
          >
            Event Location and Date
          </label>
          <div className="flex space-x-4">
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
            <input
              type="date"
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label
            htmlFor="time"
            className="block mb-2 text-sm font-medium text-white"
          >
            Event Timing
          </label>

          <input
            type="text"
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder="9:30 am to 2:30 pm"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-white"
          >
            Event Category
          </label>
          <select
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          >
            <option value="">Select a Category</option>
            {["music", "sports", "art", "other"].map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-white"
          >
            Event Status
          </label>
          <select
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            required
          >
            <option value="">Select Event Status</option>
            {["wait", "live"].map((e, i) => (
              <option key={i} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-white"
          >
            Event Description
          </label>
          <textarea
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 placeholder-gray-400"
            placeholder="Describe the event"
            rows="4"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <BigButton title={"Create Event"} disabled={!isApproved} />
      </form>
      {loading && <ScLoader />}
    </div>
  );
}

export default CreateEvent;
