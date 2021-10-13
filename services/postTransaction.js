import api from "./api";

export const postTransaction = async (type, id, data, token) => {
  const switchType = () => {
    switch (type) {
      case "Stock In":
        return `/transaction/stockin/${id}`;
      case "Stock Out":
        return `/transaction/stockout/${id}`;

      case "Audit":
        return `/transaction/audit/${id}`;
      default:
        return;
    }
  };
  try {
    await api.post(switchType(), data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
