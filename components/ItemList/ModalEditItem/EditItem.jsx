import React, { useEffect, useState, useRef, useCallback } from "react";
import { Dialog } from "@headlessui/react";
import BoxAdded from "../../../public/images/box-added.png";
import { HiOutlineX } from "react-icons/hi";

const EditItemModal = ({
  showEditModal,
  setShowEditModal,
  isOpen,
  setIsOpen,
  handleChange,
  handleSubmit,
  editField,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowEditModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Click" && showEditModal) {
        setShowEditModal(false);
      }
    },
    [setShowEditModal, showEditModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showEditModal ? (
        <div
          className="min-h-screen w-10/12 h-3/4 bg-transparent fixed flex justify-center items-center"
          onClick={closeModal}
          ref={modalRef}
        >
          <div
            className="w-10/12 h-3/4 shadow-md bg-gray-50 grid grid-cols-1 relative z-10 rounded-md"
            showEditModal={showEditModal}
          >
            <div className="flex-col mt-9 ml-80 justify-center items-center bg-gray-50">
              <HiOutlineX
                as="div"
                aria-label="Close modal"
                className="cursor-pointer absolute top-4 right-4 p-0 z-10 "
                onClick={() => setShowEditModal((prev) => !prev)}
              />
              
                <div className="">
                  <div className="mt-10 mx-auto">
                    <p className="font-light text-grey-900 pt-10">Edit Item</p>
                    <h1 className="font-bold text-gray-900 md:text-2xl">
                      Item Info
                    </h1>
                  </div>

                  <div className="pt-10">
                    <form
                      onSubmit={handleSubmit}
                      className="mb-10 mx-auto space-y-3"
                    >
                      <div className="md:flex space-x-4 text-gray-900">
                        <div className="md:w-1/2 space-y-1 md:text-sm">
                          <label htmlFor="itemName">Item Name</label>
                          <input
                            id="itemName"
                            className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                            type="text"
                            placeholder="item name"
                            name="itemName"
                            value={editField.itemName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="md:w-1/2 space-y-1 md:text-sm">
                          <label htmlFor="unit">Unit</label>
                          <span className="text-grey-700"></span>
                          <select
                            id="Unit"
                            className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                            type="text"
                            placeholder="unit"
                            name="Unit"
                            value={editField.unit}
                            onChange={handleChange}
                          >
                            <option className="text-grey-700">Select</option>
                            <option>pcs</option>
                            <option>ea</option>
                            <option>Kg</option>
                            <option>tonne</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div className="space-y-1 md:text-sm text-gray-900 md:w-1/2">
                          <label htmlFor="minimumQuantity">Minimum Qty</label>
                          <input
                            id="minimumQuantity"
                            className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                            type="text"
                            placeholder="0"
                            name="minimumQuantity"
                            value={editField.minimumQuantity}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="py-4">
                        <button
                          type="submit"
                          className="md:text-sm bg-blue-200 px-5 py-2 rounded-xl text-gray-700 hover:text-gray-700 hover:bg-blue-400 active:bg-yellow-200"
                        >
                          Submit
                        </button>
                        <button
                          type="submit"
                          className="md:text-sm bg-red-200 px-5 py-2 ml-2 rounded-xl text-gray-700 hover:text-gray-700 hover:bg-red-400 active:bg-yellow-200"
                          onClick={() => setShowEditModal((prev) => !prev)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
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
                    <div className="w-16 my-3">
                      <img src={BoxAdded} alt="" />
                    </div>
                    <Dialog.Title as="div" className="text-md">
                      Item Edited!
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

export default EditItemModal;
