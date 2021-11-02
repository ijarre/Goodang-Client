import React from "react";
import { HiOutlineX } from "react-icons/hi";
import { Dialog } from "@headlessui/react";

const DeleteModal = ({ showDeleteModal, setShowDeleteModal }) => {
  return (
    <div className="flex items-center justify-center">
      <Dialog
        as="div"
        className="fixed flex inset-0 items-center justify-center"
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="bg-white p-4 rounded-md z-10 shadow-xl flex flex-col items-center justify-center">
          <div className="flex w-full justify-end">
            <button
              type="button"
              className="w-6 bg-white rounded-full z-100"
              onClick={() => setShowwDeleteModal(false)}
            >
              <HiOutlineX />
            </button>
          </div>

          <div className="w-full flex justify-center align-middle">
            <Dialog.Title as="div" className="text-md">
              Are you sure want to delete this item
            </Dialog.Title>
          </div>
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="md:text-sm bg-blue-400 hover:bg-blue-700 text-black font-bold py-1 px-2 mt-2 rounded-md text-sm w-1/2 "
              // onClick={handleSubmitItemImage}
            >
              No
            </button>
            <button
              type="submit"
              className="md:text-sm bg-blue-400 hover:bg-blue-700 text-black font-bold py-1 px-2 mt-2 rounded-md text-sm w-1/2 "
              // onClick={handleSubmitItemImage}
            >
              Yes
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteModal;