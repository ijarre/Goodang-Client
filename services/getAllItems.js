import api from "./api";

const getAllItems = async (warehouseId, token) => {
  const response = await api.get(`/item/${warehouseId}?page=1&size=10`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export { getAllItems };
