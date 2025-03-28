import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Components
import BigButton from "../components/commmon/BigButton";
import Toast from "../components/commmon/Toast";
import Dashboard from "../components/commmon/Dashboard";
import OptionButtons from "../components/commmon/OptionButtons";
import FormInput from "../components/commmon/FormInput";
import ImgUploader from "../components/ImgUploader";

// Icons
import { MdError } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";

// Services
import { create } from "../services/events/events.service";

// Redux Actions
import {
  setLoading,
  setToastMessage,
  setIsToatOpen,
  setDashboardOpen,
  setIsDeleteAble,
} from "../redux/slices/ui.slice";

const initialFormData = {
  title: "",
  description: "",
  location: "",
  date: "",
  time: "",
  category: "",
};

const EventForm = ({
  cover,
  setCover,
  formData,
  setFormData,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[400px] mx-auto border border-gray-700 bg-gray-800 rounded-xl p-3"
    >
      <ImgUploader cover={cover} setCover={setCover} />
      <FormInput
        label="Event Title"
        type="text"
        required={true}
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Agriculture Conference 2022"
      />
      <FormInput
        label="Location"
        type="text"
        required={true}
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        placeholder="New York, USA"
      />
      <FormInput
        label="Date"
        type="date"
        required={true}
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
      />
      <FormInput
        label="Time"
        type="text"
        required={true}
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        placeholder="9:30 am to 2:30 pm"
      />
      <FormInput
        label="Category"
        type="select"
        required={true}
        options={["music", "sports", "art", "other"]}
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />
      <FormInput
        label="Description"
        type="textarea"
        required={true}
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Describe the event"
      />
      <BigButton title="Create Event" />
    </form>
  );
};

function CreateEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { isToastOpen, isFilterBoxOpen } = useSelector((state) => state.ui);
  const [formData, setFormData] = useState(initialFormData);
  const [cover, setCover] = useState(null);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const { success, message } = await create(formData, token, dispatch);
    dispatch(setLoading(false));
    dispatch(setToastMessage(message));
    dispatch(setIsToatOpen(true));
    if (success) {
      setFormData(initialFormData);
      setCover(null);
      navigate("/");
    }
  };

  useEffect(() => {
    if (cover) {
      setFormData((prev) => ({ ...prev, cover }));
    }
  }, [cover]);

  useEffect(() => {
    dispatch(setDashboardOpen(false));
    dispatch(setIsDeleteAble(false));
  }, []);

  return (
    <Dashboard>
      <div className="flex-1 relative bg-gray-900 px-4 py-4 overflow-y-auto">
        {isToastOpen && <Toast Icon={MdError} />}
        <div className="w-full flex justify-end items-center px-4 mb-4">
          <OptionButtons
            active={isFilterBoxOpen}
            callback={() => dispatch(setDashboardOpen(true))}
            Icon={IoIosMenu}
            styles="md:hidden"
          />
        </div>
        <EventForm
          cover={cover}
          setCover={setCover}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onFormSubmit}
        />
      </div>
    </Dashboard>
  );
}

export default CreateEvent;
