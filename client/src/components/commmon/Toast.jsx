import React from "react";

// icons
import { IoCloseOutline } from "react-icons/io5";

function Toast({ message, Icon, state }) {
  return (
    <div className="flex items-center w-full max-w-xs p-4 text-gray-400 bg-gray-800 rounded-lg shadow-lg absolute top-10 z-50 left-1/2 -translate-x-1/2">
      <Icon className="w-5 h-5" />
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 text-gray-500 hover:text-white rounded-lg p-1.5 hover:bg-gray-700 inline-flex items-center justify-center h-8 w-8 cursor-pointer"
      >
        <IoCloseOutline className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Toast;
