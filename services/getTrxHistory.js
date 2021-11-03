import api from "./api";

const getTrxHistory = async (warehouseId, token, page, size) => {
  const response = await api.get(
    `/transaction/${warehouseId}?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: "bearer " + token,
      },
    },
  );
  return response.data.data;
};

export { getTrxHistory };
