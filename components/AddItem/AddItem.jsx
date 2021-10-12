import React from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

const AddItem = ({
  handleInputChange,
  fields,
  error,
  userAddItem,
  isOpen,
  setIsOpen,
}) => {
  const { itemName, Unit, stockQuantity, minimumQuantity } = fields;

  return (
    <div className="min-h-screen mx-auto max-w-screen-xl bg-white">
      <div className="form bg-grey-300 mx-20 md:w-full md:h-screen md:flex ">
        <div className="pl-28 pr-24 h-screen w-4/5">
          <div className="mt-10 mx-auto">
            <p className="font-light text-grey-900 pt-10">New Item</p>
            <h1 className="font-bold text-gray-900 md:text-2xl">Item Info</h1>
          </div>

          <div className="pt-10">
            <form onSubmit={userAddItem} className="mb-10 mx-auto space-y-3">
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
                <div className="block md:w-20 ml-30">
                  <Image src="images/plus-sign.png" alt="" />
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
                    value={Unit}
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
                >
                  <Link href="/item-list">Cancel</Link>
                </button>
              </div>
            </form>
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
                <div className="w-18 my-3">
                  <Image src="images/box-added.png" alt="" />
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
        </div>
      </div>
    </div>
  );
};

export default AddItem;
