import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getAllItems } from "../services/getAllItems";

export const useItems = async () => {
  const { currentUser } = useSelector((state) => state.user);
  const { data, ...rest } = useQuery("items", () =>
    getAllItems(currentUser.warehouseId, currentUser.accessToken),
  );

  return { data: data?.data, ...rest };
};
