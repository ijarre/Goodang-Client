import React, { useState, useEffect, useCallback } from "react";
import { UpdateProfile } from "../components";
import api from "../services/api";
import { useSelector } from "react-redux";

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
      loadImage();
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

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [profPicIsOpen, setProfPicIsOpen] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
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
    uploadImage(previewSource);
    setProfPicIsOpen(false);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await api.post(`/user/upload/${currentUser.uid}`, {
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const uploadImage = async (image) => {
  //   try {
  //     await api.post(`/user/upload/${currentUser.uid}`, {
  //       body: { data: image },
  //       headers: {
  //         Authorization: "bearer " + currentUser.accessToken,
  //         ContentType: "multipart/form-data"
  //       },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleDeleteFile

  const [imageId, setImageId] = useState();

  const loadImage = async () => {
    try {
      const res = await api.get(`/user/${currentUser.uid}`, {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      });
      const data = await res.json();
      console.log(data);
      setImageId(data);
      return;
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
        handleFileInputChange={handleFileInputChange}
        fileInputState={fileInputState}
        previewSource={previewSource}
        profPicIsOpen={profPicIsOpen}
        setProfPicIsOpen={setProfPicIsOpen}
        handleSubmitFile={handleSubmitFile}
        // handleDeleteFile={handleDeleteFile}
        imageId={imageId}
      />
    </div>
  );
};

export default UpdateProfilePage;
