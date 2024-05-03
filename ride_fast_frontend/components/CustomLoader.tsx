import React from "react";

const CustomLoader = () => {
  return (
    <div className="flex space-x-2 m-10 h-[90vh] items-center justify-center">
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.2s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    </div>
  );
};
export const CircularProgressBar = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 border-4 border-gray-300 rounded-full animate-spin border-t-black"></div>
    </div>
  );
};
export default CustomLoader;
