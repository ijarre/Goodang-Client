import React, { useState, useEffect, useCallback } from "react";
import { UpdateProfile } from "../components";
import api from "../services/api";

const UpdateProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

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

  useEffect(() => {
    if (currentUser) {
      getUserFromDB().then((user) => {
        console.log(user);
        setProfileDetail({
          Firstname: user.data.firstName,
          Lastname: user.data.lastName,
          Email: user.data.email,
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
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default UpdateProfilePage;
