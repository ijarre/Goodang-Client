import api from "./api";

const getWarehouseId = async (uid, token) => {
  const response = await api.get(`/user/${uid}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response?.data?.data?.warehouseId;
};

export { getWarehouseId };
