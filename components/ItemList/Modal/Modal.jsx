import React, { useRef, useEffect, useCallback, useState } from "react";
import { HiOutlineX } from "react-icons/hi";
import BoxAdded from "../../../public/images/box-added.png";
import { Dialog } from "@headlessui/react";

const Modal = ({
  showModal,
  setShowModal,
  handleInputChange,
  fields,
  userAddItem,
  isOpen,
  setIsOpen,
  itemImageIsOpen,
  setItemImageIsOpen,
  previewImage,
  handleInputItemImage,
  handleSubmitItemImage,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Click" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  const { itemName, unit, stockQuantity, minimumQuantity, categoryName } =
    fields;

  return (
    <>
      {showModal ? (
        <div
          className="md:min-h-full w-full h-full bg-auto bg-black bg-opacity-30 inset-0 fixed flex items-center justify-center"
          onClick={closeModal}
          ref={modalRef}
        >
          <div
            className="w-5/12 h-3/4 shadow-md bg-gray-50 grid grid-cols-1 relative z-10 rounded-md"
            showModal={showModal}
          >
            <div className="ml-36 justify-center items-center">
              <HiOutlineX
                as="div"
                aria-label="Close modal"
                className="cursor-pointer absolute top-4 right-4 p-0 z-10 "
                onClick={() => setShowModal((prev) => !prev)}
              />
              <div className="">
                <div className="mt-1 mx-auto">
                  <p className="font-light text-grey-900 pt-5">New Item</p>
                </div>
                <div className="pt-5">
                  <form
                    onSubmit={userAddItem}
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
                          value={itemName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="md:w-1/2 space-y-1 md:text-sm">
                      <label htmlFor="">Insert Image</label>
                      <div className="flex">
                        <div className="pr-3">
                          <img
                            src={"images/box-added.png"}
                            alt=""
                            className="w-6 h-6 absolute rounded-md"
                          />
                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="chosen"
                              className="w-6 h-6 absolute bg-white rounded-md"
                            />
                          )}
                        </div>
                        <div className="pl-3">
                        <button
                          type="button"
                          className="md:text-sm bg-gray-100 px-1 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-200 active:bg-gray-200 text-sm"
                          onClick={() => setItemImageIsOpen(true)}
                        >
                          Add Image
                        </button>
                        </div>
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
                          name="unit"
                          value={unit}
                          onChange={handleInputChange}
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
                      <div className="md:w-1/2 space-y-1 md:text-sm">
                        <label htmlFor="category">Category</label>
                        <span className="text-grey-700"></span>
                        <select
                          id="category"
                          className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                          type="text"
                          placeholder="category"
                          name="categoryName"
                          value={categoryName}
                          onChange={handleInputChange}
                        >
                          <option className="text-grey-700">Select</option>
                          <option>Furniture</option>
                          <option>Food and Beverages </option>
                          <option>Electronic</option>
                          <option>Fashion</option>
                          <option>Tools</option>
                          <option>Stationary</option>
                        </select>
                      </div>
                    </div>
                    <div className="md:flex space-x-4 text-gray-900">
                      <div className="space-y-1 md:text-sm text-gray-900 md:w-1/2">
                        <label htmlFor="stockQuantity">Stock Qty</label>
                        <input
                          id="stockQuantity"
                          className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                          type="text"
                          placeholder="0"
                          name="stockQuantity"
                          value={stockQuantity}
                          onChange={handleInputChange}
                        />
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
                          value={minimumQuantity}
                          onChange={handleInputChange}
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
                        onClick={() => setShowModal((prev) => !prev)}
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
                      Item Added!
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
              <div className="flex items-center justify-center">
                <Dialog
                  as="div"
                  className="fixed flex inset-0 items-center justify-center"
                  open={itemImageIsOpen}
                  onClose={() => setItemImageIsOpen(false)}
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

                  <div className="bg-white p-4 rounded-md z-10 shadow-xl flex flex-col items-center justify-center">
                    <div className="flex w-full justify-end">
                      <button
                        type="button"
                        className="w-6 bg-white rounded-full z-100"
                        onClick={() => setItemImageIsOpen(false)}
                      >
                        <HiOutlineX />
                      </button>
                    </div>

                    <div className="w-full flex justify-center align-middle">
                      <div className="md:w-44 relative">
                        <img
                          src={"images/box-added.png"}
                          alt=""
                          className="absolute"
                        />
                        {previewImage && (
                          <img
                            src={previewImage}
                            alt="chosen"
                            className="w-44 h-44 absolute bg-white rounded-md"
                          />
                        )}
                      </div>
                    </div>

                    <input
                      type="file"
                      onChange={handleInputItemImage}
                      className="flex justify-center py-3 mt-48"
                    />
                    <div className="flex justify-center w-full">
                      <button
                        type="submit"
                        className="md:text-sm bg-blue-400 hover:bg-blue-700 text-black font-bold py-1 px-2 mt-2 rounded-md text-sm w-1/2 "
                        onClick={handleSubmitItemImage}
                      >
                        Upload
                      </button>
                    </div>
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

export default Modal;
