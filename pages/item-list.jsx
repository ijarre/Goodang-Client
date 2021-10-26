import React, { useEffect, useState } from "react";
import axios from "axios";
import { ItemList } from "../components";
import api from "../services/api";
import { useSelector } from "react-redux";
import { Modal } from "../components";
import { EditItemModal } from "../components";
import { DeleteModal } from "../components";
import { useRouter } from "next/router";
import {useQuery} from "react-query";
// import { getWarehouseId } from "../services/getWarehouseId";

const ItemListPage = () => {
  const [items, setItems] = useState();
  // const [searchTerm, setSearchTerm] = useState();
  // const [searchResult, setSearchResult] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    itemName: "",
    Unit: "",
    stockQuantity: "",
    minimumQuantity: "",
  });
  const [editField, setEditField] = useState({});
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();

  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);
  // const { warehouseId } = currentUser;
  // const { currentUser } = useAuth();

  //pagination item list
  useEffect(() => {
    setMaxPage(items?.count % 5);
  }, [items?.count]);

  useEffect(() => {
    console.log(query.data);
    console.log(page);
  }, [query?.data]);

  const query = useQuery([
    items, page
  ], ()=> {
    getAllItems(currentUser.warehouseId, currentUser.accessToken, page, 5),
   {initialData: items} 
  })

  //user read his items
  useEffect(() => {
    const getAllItems = async (page, size) => {
      const response = await api.get(
        `/item/${currentUser.warehouseId}?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: "bearer " + currentUser.accessToken,
          },
        },
      );
      return response.data;
    };
    getAllItems().then((data) => {
      setItems(data.data);
    });
  }, [currentUser?.accessToken, currentUser?.warehouseId]);

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
    await axios.post(
      `https://nameless-sands-57704.herokuapp.com/v1/item`,
      { ...fields, warehouseId: currentUser.warehouseId },
      {
        headers: {
          Authorization: "Bearer " + currentUser.accessToken,
        },
      },
    );
  };

  //user search his item
  // const handleSearch = (searchTerm) => {
  //   setSearchTerm(searchTerm);
  //   if (searchTerm !== "") {
  //     const searchItemList = items.filter((items) => {
  //       return Object.values(items)
  //         .join(" ")
  //         .toLowerCase()
  //         .includes(searchTerm.toLowerCase());
  //     });
  //     setSearchResult(searchItemList);
  //   } else {
  //     setSearchResult(items);
  //   }
  // };

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

  // useEffect(() => {
  //   // const getItem = async () => {
  //   //   const response = await api.get(`/item/${id}`, {
  //   //     headers: {
  //   //       Authorization: "bearer " + currentUser.accessToken,
  //   //     },
  //   //   });
  //   //   return response.data;
  //   // };
  //   // getItem().then((res) => {
  //   //   const { itemName, minimumQuantity, unit } = res.data;
  //   //   setEditField({
  //   //     ...editField,
  //   //     itemName,
  //   //     minimumQuantity,
  //   //     unit,
  //   //   });
  //   // })s;
  // }, []);

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
      />
      <EditItemModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editField={editField}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
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
        handleDelete={handleDelete}
        openModal={openModal}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        itemPage={itemPage}
        // term={searchTerm}
        // searchKeyword={handleSearch}
      />
    </div>
  );
};

export default ItemListPage;
