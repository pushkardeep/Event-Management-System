import React from "react";

function OptionButtons({ styles, active, Icon, iconSize = "4", callback }) {
  return (
    <button
      onClick={callback}
      type="button"
      className={`cursor-pointer border font-medium rounded-full text-sm px-5 py-2.5 ${
        active ? "bg-gray-700" : "bg-gray-800"
      } text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 ${styles}`}
    >
      <Icon className={`w-${iconSize} h-${iconSize} `} />
    </button>
  );
}

export default OptionButtons;
