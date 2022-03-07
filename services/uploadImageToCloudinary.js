import axios from "axios";

const uploadImageToCloudinary = async (fileData, failedCb) => {
  const formData = new FormData();
  formData.append("file", fileData);
  formData.append("upload_preset", "userTest");
  try {
    const uploadImageToCloudinary = await axios.post(
      "https://api.cloudinary.com/v1_1/dvsjfqm9e/image/upload",
      formData,
    );

    const imageURL = {
      public_id: uploadImageToCloudinary.data.secure_url,
    };

    return imageURL;
  } catch (err) {
    if (failedCb) {
      failedCb(err);
    }
    console.log(err);
  }
};
export default uploadImageToCloudinary;
