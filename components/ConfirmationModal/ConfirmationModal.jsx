import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import React, { Fragment, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import api from "../../services/api";

const ConfirmationModal = ({ open, setOpen, toAction }) => {
  const cancelButtonRef = useRef(null);
  const [confirmedDelete, setConfirmedDelete] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  useQuery(
    "delete",
    async () => {
      await api.get(`/item/delete?id=${toAction.id}`, {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      });
      setConfirmedDelete(false);
    },
    { enabled: confirmedDelete },
  );
  const handleDelete = async () => {
    await api.get(`/item/delete/${toAction.id}`, {
      headers: {
        Authorization: "bearer" + currentUser.accessToken,
      },
    });
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-orange sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon
                      className="h-6 w-6 text-yellow-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl leading-6  font-semibold text-gray-900"
                    >
                      Delete Confirmation
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="text-md text-gray-500 leading-5">
                        You are aboout to delete {toAction?.itemName} from your
                        warehouse,{" "}
                        <span className="italic font-semibold">
                          are you sure?
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 bg-green-400 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Yes, I am sure
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2  text-base font-medium  bg-red-500 hover:bg-red-800  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                  }}
                  ref={cancelButtonRef}
                >
                  No, take me back
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ConfirmationModal;
