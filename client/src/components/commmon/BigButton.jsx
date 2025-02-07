import React from "react";

function BigButton({ title, disabled = false, callback, styles }) {
  return (
    <button
      onClick={callback}
      disabled={disabled}
      className={`text-white font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center transition-colors duration-200 
    ${
      disabled
        ? "bg-gray-500 cursor-not-allowed hover:bg-gray-500"
        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
    } 
    ${styles}`}
    >
      {title}
    </button>
  );
}

export default BigButton;
