import React, { useEffect, useState } from "react";
import axios from "axios";
import { ItemList } from "../components";
import api from "../services/api";
import { useSelector } from "react-redux";
import { Modal } from "../components";
import { EditItemModal } from "../components";
import { DeleteModal } from "../components";
import { useRouter } from "next/router";
import { getAllItems } from "../services/getAllItems";
import { useQuery, useQueryClient } from "react-query";


const ItemListPage = () => {
  const [items, setItems] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    itemName: "",
    unit: "",
    stockQuantity: "",
    minimumQuantity: "",
  });
  const [editField, setEditField] = useState({});
  const [page, setPage] = useState(1);
  const [itemImageIsOpen, setItemImageIsOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState();
  const [previewImage, setPreviewImage]= useState("");

  

  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);


  //user read his items
  const {data} = useQuery(
    ["items", page],
    () => 
    getAllItems(currentUser.warehouseId, currentUser.accessToken, page, 5),
    {enabled: !!currentUser.warehouseId},
  );
  const {data: allItems} = useQuery(
    "allItems",
    () => 
    getAllItems(
      currentUser.warehouseId,
      currentUser.accessToken,
      1,
      data?.count ? data.count : 9999,

    ), {enabled: !!data}
  )
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
      { ...fields, warehouseId: currentUser.warehouseId },
      {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      },
    );
  };

  //user delete his item

  const handleDelete = async (id) => {
    await api.get(`/item/delete/${id}`, {
      headers: {
        Authorization: "bearer " + currentUser.accessToken,
      },
    });
  };

  const openDeleteModal = () => {
    setShowDeleteModal((prev) => !prev);
  };

  //user edit his item

  const openEditModal = (el) => {
    setEditField(el);
    setShowEditModal((prev) => !prev);
    console.log(el);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(`/item/update/${editField.id}`, editField, {
      headers: {
        Authorization: "bearer " + currentUser.accessToken,
      },
    });
    router.push("/item-list");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditField({ ...editField, [name]: value });
  };

  //user upload item image
  const handleInputItemImage = (e) => {
    const file = e.target.files[0];
    setImageSelected(file);
    previewFile(file);
  };

  const handleSubmitItemImage = (e) => {
    e.preventDefault();
    if(!previewImage) return;
    uploadImage();
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "itemImage");

    try {
      const uploadImageToCloudinary = await axios.post(
        "https://api.cloudinary.com/v1-1/dvsjfqm9e/image/upload", formData,
      );
        console.log("success cloudinary", uploadImageToCloudinary.data);
        setImageSelected(uploadImageToCloudinary.data);

       const itemImage = `https://res.cloudinary.com/dvsjfqm9e/image/upload/v1635330384/${imageSelected}`;

       const uploadImageToServer = await api.post(
         `/item`,
         { ...itemImage, warehouseId: currentUser.warehouseId },
         {
           headers: {
             Authorization: "bearer" + currentUser.accesToken,
           },
         },
       );
       console.log("succes db",uploadImageToServer.data);
       setItemImageIsOpen(false);

    } catch (error) {
      console.log(error);
    };
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
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
      />
      <ItemList
        items={items}
        allItems={allItems}
        handleDelete={handleDelete}
        openModal={openModal}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default ItemListPage;
