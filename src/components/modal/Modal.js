import React from "react";

const Modal = (props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-sm">
      {/* Background */}
      <div
        onClick={props.onHideModal}
        className="absolute inset-0 bg-gray-300 opacity-30"
      ></div>

      {/* Modal */}
      <div className="flex flex-col items-center justify-center w-[30%] bg-white shadow-xl rounded-lg p-8">
        {/* Content */}
        <p className="text-rose-600">Wrong username or</p>
        <p className="text-rose-600">password</p>

        {/* Close button */}

        <button
          onClick={props.onHideModal}
          className="z-50 cursor-pointer bg-rose-600 text-white rounded-lg border-1 border-rose-600 py-2 px-10 mt-6"
        >
          ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
