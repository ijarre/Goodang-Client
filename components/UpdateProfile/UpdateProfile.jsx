import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CameraIcon, XCircleIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import uploading from "../../public/gif/uploading.gif";
import Image from "next/image";

const UpdateProfile = ({
  profileDetail,
  warehouseId,
  handleInputChange,
  updateUserToDB,
  setIsOpen,
  isOpen,
  setProfPicIsOpen,
  profPicIsOpen,
  uploadImage,
  handleFileInputChange,
  previewSource,
  handleSubmitFile,
  uploadingImage,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="form bg-main md:w-full md:h-screen font-sans md:flex">
      <div className="w-5/7 pl-24 pr-16 pt-10 md:flex items-center">
        <img src={"images/profpic_page.png"} alt="" />
      </div>
      <div className="pl-20 pr-24 h-screen w-4/5 bg-white">
        <div className="mt-20 mx-auto">
          <h1 className="font-bold text-gray-900 md:text-2xl pt-10 pb-3">
            Hi, {profileDetail.lastName}!
          </h1>
        </div>
        <div className="md:flex">
          <div className="md:w-24 h-24 relative">
            {previewSource ? (
              <img
                src={previewSource}
                alt="chosen"
                className="w-full h-full absolute bg-white rounded-full object-cover"
              />
            ) : profileDetail.image ? (
              <img
                src={profileDetail.image}
                bav
                className="w-full h-full absolute bg-white rounded-full object-cover"
              />
            ) : (
              <img
                src={
                  "https://res.cloudinary.com/dvsjfqm9e/image/upload/v1635518508/userImage/user_jpbyjy.png"
                }
                className="w-full h-full absolute bg-white rounded-full object-cover"
              />
            )}
          </div>
          <button
            type="button"
            className="w-6 p-1 absolute mt-20 ml-16 bg-white rounded-full shadow-md hover:bg-blue-200"
            onClick={() => setProfPicIsOpen(true)}
          >
            <CameraIcon />
          </button>
        </div>

        <div className="font-light text-white text-sm bg-blue-700 rounded-md px-2 py-1 mb-3 w-max mt-6">
          <h4>Warehouse {warehouseId}</h4>
        </div>
        <div>
          <form
            action=""
            className="mb-10 mx-auto space-y-3"
            onSubmit={updateUserToDB}
          >
            <div className="md:flex space-x-4 text-gray-900">
              <div className="md:w-1/2 space-y-1 md:text-sm">
                <label htmlFor="firstname">First Name</label>
                <input
                  id="firstname"
                  className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                  type="text"
                  placeholder="Your first name"
                  name="firstName"
                  value={profileDetail.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="md:w-1/2 space-y-1 md:text-sm">
                <label htmlFor="lastname">Last Name</label>
                <input
                  id="lastname"
                  className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                  type="text"
                  placeholder="Your last name"
                  name="lastName"
                  value={profileDetail.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="md:flex space-x-4 text-gray-900">
              <div className="space-y-1 md:text-sm text-gray-900 md:w-1/2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                  type="text"
                  placeholder="example@email.com"
                  name="email"
                  value={profileDetail.email}
                />
              </div>
              <div className="space-y-1 md:text-sm text-gray-900 md:w-1/2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                  type="text"
                  placeholder="********"
                />
              </div>
            </div>
            {/* <div className="space-y-1 md:text-sm text-gray-900 w-auto">
                                    <label htmlFor="aboutme">About Me</label>
                                    <input id="aboutme" className="h-24 text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"  type="text" placeholder="Insert something about you"/>
                            </div> */}
            <div className="py-4">
              <button
                type="submit"
                className="md:text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="space-x-2">
          <i
            style={{
              border: "solid black",
              borderWidth: " 0 1px 1px 0",
              display: "inline-block",
              padding: "3px",
              transform: "rotate(135deg)",
              WebkitTransform: "rotate(135deg)",
            }}
          ></i>
          <a className="text-sm text-gray-900 hover:text-gray-500">
            Back to dashboard
          </a>
        </div>
        <div className="flex items-center justify-center">
          <Dialog
            as="div"
            className="fixed flex inset-0 items-center justify-center"
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

            <div className="bg-white p-4 rounded-md z-10 shadow-xl flex flex-col items-center justify-center">
              <div className="w-16 my-3">
                <img src={"images/thumb-up.png"} alt="" />
              </div>
              <Dialog.Title as="div" className="text-sm">
                Your account is updated!
              </Dialog.Title>
              <button
                className="md:text-sm bg-yellow-400 hover:bg-yellow-700 text-black font-bold py-1 px-2 mt-2 rounded-full text-sm w-20"
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
            open={profPicIsOpen}
            onClose={() => setProfPicIsOpen(false)}
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

            <div className="bg-white p-4 rounded-md z-10 shadow-xl flex flex-col items-center justify-center">
              <div className="flex w-full justify-end">
                <button
                  type="button"
                  className="w-6 bg-white rounded-full shadow-md hover:bg-red-200 z-100"
                  onClick={() => setProfPicIsOpen(false)}
                >
                  <XCircleIcon />
                </button>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-center align-middle">
                  <div className="md:w-36 md:h-40 py-2">
                    {previewSource ? (
                      <img
                        src={previewSource}
                        alt="chosen"
                        className="bg-white rounded-full object-cover h-full w-full"
                      />
                    ) : profileDetail.image ? (
                      <img
                        src={profileDetail.image}
                        className=" bg-white rounded-full object-cover h-full w-full"
                      />
                    ) : (
                      <img
                        src={
                          "https://res.cloudinary.com/dvsjfqm9e/image/upload/v1635518508/userImage/user_jpbyjy.png"
                        }
                        className=" bg-white rounded-full object-cover h-full w-full"
                      />
                    )}
                  </div>
                </div>
                <div className="w-80 h-12">
                  {uploadingImage ? (
                    <div className="flex justify-center items-center bg-white">
                      <Image src={uploading} alt="" width="44" height="44" />
                      <div className="text-md">Uploading Image</div>
                    </div>
                  ) : (
                    <input
                      type="file"
                      onChange={handleFileInputChange}
                      className="flex justify-center py-3"
                    />
                  )}
                </div>
                <div className="flex justify-center w-full pb-2">
                  {/* <button
                    className={`md:text-sm text-black font-bold py-2 px-2 mt-2 rounded-md text-sm w-1/2 mr-1 ${
                      uploadingImage
                        ? "bg-gray-400"
                        : "bg-red-400 hover:bg-red-700"
                    }`}
                  >
                    Remove
                  </button> */}
                  <button
                    className={`md:text-sm  text-black font-bold py-2 px-2 mt-2 rounded-md text-sm w-full ${
                      uploadingImage
                        ? "bg-gray-400"
                        : "bg-blue-400 hover:bg-blue-700"
                    }`}
                    onClick={handleSubmitFile}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
