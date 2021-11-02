import React, { useState, useEffect, useCallback } from "react";
import { UpdateProfile } from "../components";
import api from "../services/api";
import { useSelector } from "react-redux";
import axios from "axios";
import { Image } from "cloudinary-react";
import { changeProfilePicture } from "../features/userSlice";
import { useDispatch } from "react-redux";
import sha1Hex from "sha1-hex";

const UpdateProfilePage = () => {
  useEffect(() => {
    if (currentUser) {
      getUserFromDB().then((user) => {
        console.log(user);
        setProfileDetail({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          image: user.data.profileImage,
        });
      });
    } else {
      setProfileDetail({});
    }
  }, [currentUser, getUserFromDB]);

  const dispatch = useDispatch();

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
  const [uploadingImage, setUploadingImage] = useState(false);

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
    uploadImage();
    // if (!previewSource) return;
    // uploadImage().then((imageURL) => {
    //   dispatch(changeProfilePicture(imageURL.public_id));
    // });
  };

  const uploadImage = async () => {
    setUploadingImage(true);
    console.log("mulai upload");
    console.log(profileDetail.image);

    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    console.log(timestamp);

    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "userTest");
    // formData.append("api_key", "859443939916899");

    // formData.append("timestamp", `${timestamp}`);

    // const public_id = profileDetail.image.slice(9, 29);
    // const signature = `public_id=${public_id}&timestamp=${timestamp}gGB3p9OF1yT9Wsu60eBboYElfHk`;
    // const sha1_hex = sha1Hex(signature);
    // console.log(signature);
    // console.log(sha1_hex);

    // {
    //   public_id ? formData.append("public_id", `${public_id}`) : formData;
    // }

    // {
    //   profileDetail.image
    //     ? formData.append("signature", `${sha1_hex}`)
    //     : formData;
    // }

    try {
      const uploadImageToCloudinary = await axios.post(
        "https://api.cloudinary.com/v1_1/dvsjfqm9e/image/upload",
        formData,
      );
      console.log("SUCCESS UPLOAD TO CLOUDINARY", uploadImageToCloudinary.data);
      setImageSelected(uploadImageToCloudinary.data.secure_url);

      const imageURL = {
        public_id: uploadImageToCloudinary.data.secure_url,
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
      setUploadingImage(false);
      console.log("selesai upload");
      return imageURL;
    } catch (error) {
      setUploadingImage(false);
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
        uploadingImage={uploadingImage}
      />
    </div>
  );
};

export default UpdateProfilePage;
