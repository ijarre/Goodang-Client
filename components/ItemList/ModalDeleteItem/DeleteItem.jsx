import React, { useRef, useEffect, useCallback, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import { Dialog } from "@headlessui/react";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDelete,
  isOpen,
  setIsOpen,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowDeleteModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Click" && showModal) {
        setShowDeleteModal(false);
      }
    },
    [setShowDeleteModal, showDeleteModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div
          className="min-h-screen w-10/12 h-3/4 bg-transparent fixed flex justify-center items-center"
          onClick={closeModal}
          ref={modalRef}
        >
          <div
            className="w-10/12 h-3/4 shadow-md bg-gray-50 grid grid-cols-1 relative z-10 rounded-md"
            showModal={showModal}
          >
            <div className="flex-col mt-9 ml-80 justify-center items-center bg-gray-50">
              <HiOutlineX
                as="div"
                aria-label="Close modal"
                className="cursor-pointer absolute top-4 right-4 p-0 z-10 "
                onClick={() => setShowDeleteModal((prev) => !prev)}
              />
              <div>
                  <h1>Are you sure want to delete this item?</h1>
                  <button onClick={() => handleDelete(item.id)} type="submit">Yes</button>
                  <button onClick={()=>setShowDeleteModal((prev) => !prev)}>No</button>
              </div>
              <div className="flex items-center justify-center">
                <Dialog
                  as="div"
                  className="fixed flex inset-0 items-center justify-center"
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

                  <div className="bg-white p-6 rounded-md z-10 shadow-xl flex flex-col items-center justify-center">
                    <Dialog.Title as="div" className="text-md">
                      Item Deleted!
                    </Dialog.Title>
                    <button
                      className="md:text-sm bg-blue-200 mt-3 px-5 py-2 rounded-xl text-gray-700 hover:text-gray-700 hover:bg-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteModal;
