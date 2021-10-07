import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { ItemList } from "../../components";
import api from "../../services/api";
import { useHistory } from "react-router";
import { Modal } from "../../components";
//import { UserAddItem } from "../../components";

const ItemListPage = () => {
  const [items, setItems] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState({
    itemName: "",
    Unit: "",
    stockQuantity: "",
    minimumQuantity: "",
  });

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

  const handleDelete = async (id) => {
    await api.get(`/item/delete/${id}`, {
      headers: {
        Authorization: "bearer " + currentUser.accessToken,
      },
    });
    history.go(0);
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white mx-auto max-w-screen-xl text-left p-3 flex flex-col">
      <h1 className="ml-4 font-bold text-2xl">Item List</h1>
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
        <ItemList
          items={items}
          handleDelete={handleDelete}
          openModal={openModal}
          term={searchTerm}
          searchKeyword={handleSearch}
        />
        
        
    </div>
  );
};

export default ItemListPage;
