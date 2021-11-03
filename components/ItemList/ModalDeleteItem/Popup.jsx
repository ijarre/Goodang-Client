import React from "react";
import { HiOutlineX } from "react-icons/hi";
// import { Dialog } from "@headlessui/react";

function Popup({ handleDeleteTrue, handleDeleteFalse }) {
  return (
    <div className="md:min-h-full w-full h-full bg-black bg-opacity-30 inset-0 fixed flex justify-center items-center">
      <div className="w-1/4 h-1/4 shadow-md bg-gray-50 grid grid-cols-1 relative z-10 rounded-md">
        <div className="mt-9 justify-center items-center bg-gray-50">
          <HiOutlineX
            as="div"
            aria-label="Close modal"
            className="cursor-pointer absolute top-4 right-4 p-0 z-10 "
            onClick={handleDeleteFalse}
          />
          <div className="mt-10">
          <div className="flex justify-center align-middle">
            Are you sure want to delete this item
          </div>
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="md:text-sm bg-red-400 hover:bg-red-700 text-black py-1 px-2 mt-2 rounded-md text-sm w-1/3 mr-2"
              onClick={handleDeleteFalse}
            >
              No
            </button>
            <button
              type="submit"
              className="md:text-sm bg-blue-400 hover:bg-blue-700 text-black py-1 px-2 mt-2 rounded-md text-sm w-1/3 ml-2"
              onClick={handleDeleteTrue}
            >
              Yes
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
