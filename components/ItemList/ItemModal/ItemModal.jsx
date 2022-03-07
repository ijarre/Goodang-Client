import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import React, { Fragment, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import useAddItem from "../../../hooks/useAddItem";
import api from "../../../services/api";
import uploadImageToCloudinary from "../../../services/uploadImageToCloudinary";

const ItemModal = ({
  open,
  setOpen,
  fields,
  setFields,
  mode,
  toAction,
  setToAction,
  page,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const cancelButtonRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const mutation = useMutation(
    async ({ fields, selectedFile }) => {
      if (selectedFile) {
        const url = await uploadImageToCloudinary(selectedFile);
        fields = { ...fields, itemImage: url["public_id"] };
      }
      const itemToAdd = { ...fields, warehouseId: currentUser.warehouseId };
      return api.post(
        `/item${mode === "edit" ? `/update/${toAction.id}` : ""}`,
        itemToAdd,
        {
          headers: {
            Authorization: "bearer " + currentUser.accessToken,
          },
        },
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("items");
      },
    },
  );
  const queryClient = useQueryClient();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFields({ ...fields, [id]: value });
  };
  const handleMutation = async (e) => {
    e.preventDefault();
    mutation.mutate({ fields, selectedFile });
    // await mutation.mutate(fields, selectedFile);
    setFields({
      itemName: "",
      unit: "",
      stockQuantity: "",
      minimumQuantity: "",
      categoryName: "",
      itemImage: "",
      warehouseId: "",
    });
    setToAction(null);
    setSelectedFile(null);
    setOpen(!open);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleMutation}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-3xl leading-6 font-semibold mb-4 text-gray-900"
                    >
                      {mode === "add" ? "Add" : "Edit"} Item
                    </Dialog.Title>
                    <div className="mt-2 ">
                      <label
                        htmlFor="itemName"
                        className="w-14 text-sm text-gray-600"
                      >
                        Item name
                      </label>
                      <input
                        id="itemName"
                        type="text"
                        value={fields.itemName}
                        onChange={handleChange}
                        required
                        className=" rounded w-full px-3 py-2 border border-gray-300  text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                        placeholder="Table, Chair, Car key"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="itemName"
                        className="w-14 text-sm text-gray-600"
                      >
                        Item image
                      </label>
                      <input
                        type="file"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="categoryName"
                        className="w-14 text-sm text-gray-600"
                      >
                        Category
                      </label>
                      <input
                        id="categoryName"
                        type="text"
                        value={fields.categoryName}
                        onChange={handleChange}
                        required
                        className=" rounded w-full px-3 py-2 border border-gray-300  text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                        placeholder="Furniture, Beverages, ..."
                      />
                    </div>
                    <div className="mt-2 flex gap-1">
                      <div className="w-5/6">
                        <label
                          htmlFor="stockQuantity"
                          className="w-14 text-sm text-gray-600"
                        >
                          Item quantity
                        </label>
                        <input
                          id="stockQuantity"
                          type="number"
                          required
                          readOnly={mode === "edit"}
                          value={fields.stockQuantity}
                          onChange={handleChange}
                          className={` rounded w-full px-3 py-2 border border-gray-300  text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  ${
                            mode === "edit" && "bg-gray-300"
                          }`}
                          placeholder="0"
                        />
                      </div>
                      <div className="">
                        <label
                          htmlFor="unit"
                          className="w-14 text-sm text-gray-600"
                        >
                          Unit
                        </label>
                        <input
                          id="unit"
                          value={fields.unit}
                          onChange={handleChange}
                          type="text"
                          required
                          className=" rounded w-full px-3 py-2 border border-gray-300  text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                          placeholder="Kg, Pcs, ..."
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="minimumQuantity"
                        className="w-14 text-sm text-gray-600"
                      >
                        Minimum qty in stock
                      </label>
                      <input
                        id="minimumQuantity"
                        type="number"
                        value={fields.minimumQuantity}
                        onChange={handleChange}
                        required
                        className=" rounded w-full px-3 py-2 border border-gray-300  text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 pl-9 pt-0 mt-2">
                  <button
                    type="submit"
                    className="w-full  justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white  ease-linear focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300 pl-3  sm:text-sm"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ItemModal;
