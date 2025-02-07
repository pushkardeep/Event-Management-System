import React from "react";

function ScLoader() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center fixed top-0 left-0 backdrop-blur-md bg-gray-800/50 z-50">
      <div className="w-10 h-10 border-4 border-white/15 border-t-4 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default ScLoader;
