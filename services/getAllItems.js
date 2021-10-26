import api from "./api";

const getAllItems = async (warehouseId, token, page, size) => {
  const response = await api.get(
    `/item/${warehouseId}?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );
  return response.data;
};

export { getAllItems };
