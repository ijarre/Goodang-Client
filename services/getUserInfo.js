import api from "./api";

const getUserInfo = async (uid, token) => {
  const response = await api.get(`/user/${uid}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response?.data?.data;
};

export { getUserInfo };
