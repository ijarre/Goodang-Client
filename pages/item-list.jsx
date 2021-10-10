import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { ItemList } from "../components";
import api from "../services/api";
import { Modal } from "../components";
import { EditItemModal } from "../components";
import { useParams, useHistory } from "react-router-dom";

const ItemListPage = () => {
  const [items, setItems] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    itemName: "",
    Unit: "",
    stockQuantity: "",
    minimumQuantity: "",
  });
  const [editField, setEditField] = useState({});

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

  const { currentUser } = useAuth();

  const userAddItem = async (e) => {
    e.preventDefault();
    setIsOpen(true);
    await axios.post(
      "https://nameless-sands-57704.herokuapp.com/v1/item",
      fields,
      {
        headers: {
          Authorization: "Bearer " + currentUser.accessToken,
        },
      },
    );
  };

  const history = useHistory();

  //user read his items
  useEffect(() => {
    const getAllItems = async () => {
      const response = await api.get("/item/1", {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      });
      return response.data;
    };
    getAllItems().then((data) => {
      setItems(data.data);
      console.log(items);
    });
  }, [currentUser.accessToken]);

  //user search his item
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const searchItemList = items.filter((items) => {
        return Object.values(items)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(searchItemList);
    } else {
      setSearchResult(items);
    }
  };

  //user delete his item

  const handleDelete = async (id) => {
    await api.get(`/item/delete/${id}`, {
      headers: {
        Authorization: "bearer " + currentUser.accessToken,
      },
    });
    history.go(0);
  };



  //user edit his item

  const openEditModal = () => {
    setShowEditModal((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(`/item/update/${id}`, editField, {
      headers: {
        Authorization: "bearer " + currentUser.accessToken,
      },
    });
    history.push("/item-list");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditField({ ...editField, [name]: value });
  };

  useEffect(() => {
    const getItem = async () => {
      const response = await api.get(`/item/${id}`, {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      });
      return response.data;
    };
    getItem().then((res) => {
      const { itemName, minimumQuantity, unit } = res.data;
      setEditField({
        ...editField,
        itemName,
        minimumQuantity,
        unit,
      });
    });
  }, []);
  const { id } = useParams();

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
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <ItemList
        items={items}
        handleDelete={handleDelete}
        openModal={openModal}
        openEditModal={openEditModal}
        term={searchTerm}
        searchKeyword={handleSearch}
      />
    </div>
  );
};

export default ItemListPage;
