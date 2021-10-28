import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
import { apiResolver } from "next/dist/server/api-utils";
import { current } from "immer";

const image = () => {
  const [imageSelected, setImageSelected] = useState();

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "userImage");

    try {
      const uploadImageToCloudinary = await axios.post(
        "https://api.cloudinary.com/v1_1/dvsjfqm9e/image/upload",
        formData,
      );
      console.log("SUCCESS", uploadImageToCloudinary.data);
      setImageSelected(uploadImageToCloudinary.data);

      const imageURL = `https://res.cloudinary.com/dvsjfqm9e/image/upload/v1635330384/${imageSelected}`;

      const uploadImageToDB = await api.post(
        `/user/upload/${currentUser.uid}`,
        imageURL,
        {
          headers: {
            Authorization: "bearer " + currentUser.accessToken,
          },
        },
      );
      console.log("SUCCESS UPLOAD", uploadImageToDB.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-sans">
      <div className="min-h-screen bg-white mx-auto max-w-screen-xl md:flex ">
        <div className="mt-20 mx-auto w-full h-full px-24 flex-col">
          <h1>tes</h1>
          <input
            type="file"
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
            }}
          />
          <button
            className="bg-red-400 py-2 px-2 rounded"
            onClick={uploadImage}
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default image;
