import api from "./api";

const getAllItems = async (warehouseId, token, page) => {
  const response = await api.get(`/item/${warehouseId}?page=${page}&size=5`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response.data;
};

export { getAllItems };
