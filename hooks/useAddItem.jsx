import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import api from "../services/api";
import uploadImageToCloudinary from "../services/uploadImageToCloudinary";

const useAddItem = async () => {
  let url;
  const { currentUser } = useSelector((state) => state.user);
  return useMutation(async (item, selectedFile) => {
    if (selectedFile) {
      uploadImageToCloudinary(selectedFile).then((result) => {
        url = result;
      });
      console.log(url);
    }
    return api.post(`/item`, url ? { ...item, itemImage: url } : item, {
      headers: {
        Authorization: "bearer " + currentUser.accessToken,
      },
    });
  });
};

export default useAddItem;
