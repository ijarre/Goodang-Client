import React, { useEffect, useState } from "react";
import axios from "axios";
import { ItemList } from "../components";
import api from "../services/api";
import { useSelector } from "react-redux";
import { Modal } from "../components";
import { EditItemModal } from "../components";
// import { DeleteModal } from "../components";
// import { popUp } from "../components";
import { useRouter } from "next/router";
import { getAllItems } from "../services/getAllItems";
import { useQuery, useQueryClient } from "react-query";

const ItemListPage = () => {
  const [items, setItems] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [popUp, setPopUp] = useState({
  //   show: false,
  //   id: null,
  // })
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    itemName: "",
    unit: "",
    stockQuantity: "",
    minimumQuantity: "",
    categoryName: "",
  });
  const [editField, setEditField] = useState({});
  const [page, setPage] = useState(1);
  const [itemImageIsOpen, setItemImageIsOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState();
  const [previewImage, setPreviewImage] = useState("");

  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  //user read his items
  const { data } = useQuery(
    ["items", page],
    () =>
      getAllItems(currentUser.warehouseId, currentUser.accessToken, page, 5),
    { enabled: !!currentUser.warehouseId },
  );
  const { data: allItems } = useQuery(
    "allItems",
    () =>
      getAllItems(
        currentUser.warehouseId,
        currentUser.accessToken,
        1,
        data?.count ? data.count : 9999,
      ),
    { enabled: !!data },
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    setItems(data?.data);
  }, [data]);

  //user add item
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (fields.itemName === "") {
      setError("Input item name");
    } else {
      setError("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const userAddItem = async (e) => {
    e.preventDefault();
    setIsOpen(true);
    await api.post(
      `/item`,
      { ...fields, warehouseId: currentUser.warehouseId, itemImage:imageSelected?imageSelected.secure_url:null, },
      {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      },
    );
    queryClient.invalidateQueries("items");
    setShowModal(false);
  };

  //user edit his item

  const openEditModal = (el) => {
    setEditField(el);
    setShowEditModal((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(
      `/item/update/${editField.id}`,
      { ...editField, itemImage: imageSelected?imageSelected.secure_url:null, },
      {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      },
    );
    router.push("/item-list");
    queryClient.invalidateQueries("items");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditField({ ...editField, [name]: value });
  };

  // const itemImage = {public_id: response?.data.secure_url};

  //user upload item image
  // const uploadImageToCloudinary = await axios.post(
  //   "https://api.cloudinary.com/v1_1/dvsjfqm9e/image/upload", formData,)

  const handleInputItemImage = (e) => {
    const file = e.target.files[0];
    setImageSelected(file);
    previewFile(file);
  };

  const handleSubmitItemImage = (e) => {
    e.preventDefault();
    if (!previewImage) return;
    uploadImage();
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const uploadImage = async (e) => {
    
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "itemImage");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dvsjfqm9e/image/upload",
      formData,
    );


    setImageSelected(response?.data);

    setItemImageIsOpen(false);

  };

  const { id } = router.query;

  return (
    <div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        fields={fields}
        userAddItem={userAddItem}
        handleAddItem={handleAddItem}
        handleInputChange={handleInputChange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        itemImageIsOpen={itemImageIsOpen}
        setItemImageIsOpen={setItemImageIsOpen}
        setImageSelected={setImageSelected}
        uploadImage={uploadImage}
        handleInputItemImage={handleInputItemImage}
        handleSubmitItemImage={handleSubmitItemImage}
        previewImage={previewImage}
      />
      <EditItemModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editField={editField}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        itemImageIsOpen={itemImageIsOpen}
        setItemImageIsOpen={setItemImageIsOpen}
        uploadImage={uploadImage}
        handleInputItemImage={handleInputItemImage}
        handleSubmitItemImage={handleSubmitItemImage}
        previewImage={previewImage}
      />
      {/* <popUp
        // showDeleteModal={showDeleteModal}
        // setShowDeleteModal={setShowDeleteModal}
        // isOpen={isOpen}
        // setIsOpen={setIsOpen}
        // handleDelete={handleDelete}
        // // handleDeleteTrue={handleDeleteTrue}
        handleDelete={handleDelete}
        handleDelete={handleDeleteTrue}
      /> */}
      <ItemList
        items={items}
        allItems={allItems}
        // handleDelete={handleDelete}
        openModal={openModal}
        openEditModal={openEditModal}
        // openDeleteModal={openDeleteModal}
        page={page}
        setPage={setPage}
        // handleDeleteTrue={handleDeleteTrue}
        // handleDeleteFalse={handleDeleteFalse}
      />
    </div>
  );
};

export default ItemListPage;
