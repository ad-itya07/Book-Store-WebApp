import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4zm2 5.292l6-3.465V20a8 8 0 01-6-2.708z"
            ></path>
          </svg>
          <p className="text-lg font-semibold text-gray-700">
            Loading, please wait...
          </p>
        </div>
      </div>
      );
    </div>
  );
};

export default Loading;
