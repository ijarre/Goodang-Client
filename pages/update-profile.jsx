import React, { useState, useEffect, useCallback } from "react";
import { UpdateProfile } from "../components";
import api from "../services/api";
import { useSelector } from "react-redux";
import axios from "axios";
import { Image } from "cloudinary-react";

const UpdateProfilePage = () => {
  useEffect(() => {
    if (currentUser) {
      getUserFromDB().then((user) => {
        console.log(user);
        setProfileDetail({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
        });
      });
    } else {
      setProfileDetail({});
    }
  }, [currentUser, getUserFromDB]);

  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { warehouseId } = currentUser;

  const [profileDetail, setProfileDetail] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetail({ ...profileDetail, [name]: value });
  };

  const getUserFromDB = useCallback(async () => {
    const userFromDB = await api.get(`/user/${currentUser.uid}`, {
      headers: {
        Authorization: "bearer " + currentUser.accessToken,
      },
    });
    return userFromDB.data;
  }, [currentUser.accessToken, currentUser.uid]);

  const updateUserToDB = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/user/update/${currentUser.uid}`, profileDetail, {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      });
      setIsOpen(true);
      console.log(profileDetail);
    } catch (err) {}
  };

  const [profPicIsOpen, setProfPicIsOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState();
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setImageSelected(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    console.log("submitting");
    e.preventDefault();
    if (!previewSource) return;
    uploadImage();
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "userImage");

    try {
      const uploadImageToCloudinary = await axios.post(
        "https://api.cloudinary.com/v1_1/dvsjfqm9e/image/upload",
        formData,
      );
      console.log("SUCCESS UPLOAD TO CLOUDINARY", uploadImageToCloudinary.data);
      setImageSelected(uploadImageToCloudinary.data.public_id);

      const imageURL = {
        public_id: `https://res.cloudinary.com/dvsjfqm9e/image/upload/v1635330384/${uploadImageToCloudinary.data.public_id}`,
      };

      console.log(imageURL);

      const uploadImageToDB = await api.post(
        `/user/upload/${currentUser.uid}`,
        imageURL,
        {
          headers: {
            Authorization: "bearer " + currentUser.accessToken,
          },
        },
      );
      console.log("SUCCESS UPLOAD TO DB", uploadImageToDB.data);
      setProfPicIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UpdateProfile
        profileDetail={profileDetail}
        warehouseId={warehouseId}
        handleInputChange={handleInputChange}
        updateUserToDB={updateUserToDB}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setProfPicIsOpen={setProfPicIsOpen}
        profPicIsOpen={profPicIsOpen}
        setImageSelected={setImageSelected}
        uploadImage={uploadImage}
        handleFileInputChange={handleFileInputChange}
        previewSource={previewSource}
        handleSubmitFile={handleSubmitFile}
      />
    </div>
  );
};

export default UpdateProfilePage;
