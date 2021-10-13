import React, { useState, useEffect, useCallback } from "react";
import { UpdateProfile } from "../components";
import api from "../services/api";
import { useSelector } from "react-redux";

const UpdateProfilePage = () => {
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

  return (
    <div>
      <UpdateProfile
        profileDetail={profileDetail}
        warehouseId={warehouseId}
        handleInputChange={handleInputChange}
        updateUserToDB={updateUserToDB}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    </div>
  );
};

export default UpdateProfilePage;
