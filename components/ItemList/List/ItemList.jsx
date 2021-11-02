import React, { useState, useEffect } from "react";
import ItemTable from "./ItemTable";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { classNames, maximumPage } from "../../../utils";

const ItemList = ({
  items,
  allItems,
  openModal,
  openEditModal,
  handleDelete,
  openDeleteModal,
  page = 1,
  setPage,
}) => {
  const [maxPage, setMaxPage] = useState();
  const [searchField, setSearchField] = useState("");
  const [filteredItems, setFilteredItems] = useState();

  useEffect(() => {
    if (items) {
      setMaxPage(maximumPage(items.count, 5));
    }
  }, [items]);

  useEffect(() => {
    if (searchField === "") {
      setFilteredItems();
    }
  }, [searchField]);

  const checkName = (name, str) => {
    var pattern = str
      .split("")
      .map((x) => {
        return `(?=.*${x})`;
      })
      .join("");
    var regex = new RegExp(`${pattern}`, "g");
    return name.match(regex);
  };

  const handleSearchChange = (e) => {
    var str = e.target.value.toLowerCase().substring(0, 3);
    var filteredArr = allItems.data.rows.filter((x) => {
      var xSub = x.itemName.substring(0, 3).toLowerCase();
      return checkName(xSub, str);
    });
    if (filteredArr.length > 0) {
      setFilteredItems(filteredArr);
    }
    setSearchField(e.target.value);
  };

  const handleSearchAction = (e) => {
    e.preventDefault();
    if (searchField.length !== 0) {
      var str = searchField.toLowerCase().substring(0, 3);
      var filteredArr = allItems.data.rows.filter((x) => {
        var xSub = x.itemName.substring(0, 3).toLowerCase();
        return x.itemName.toLowerCase().includes(str) || checkName(xSub, str);
      });
      if (filteredArr.length > 0) {
        setFilteredItems(filteredArr);
      }
    }
  };
  return (
    <div className="min-h-screen bg-white mx-auto max-w-screen-xl text-left p-3 flex flex-col">
      <h1 className="ml-4 font-bold text-2xl">Item List</h1>
      <div className="mt-3 flex justify-end">
        <div action="" className="text-left my-2">
          <form
            className="shadow flex items-end mb-4"
            onSubmit={handleSearchAction}
          >
            <input
              className="w-full rounded p-2"
              type="text"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
            <button className="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
              <SearchIcon className="w-6 mr-1" />
              Search
            </button>
          </form>
        </div>
        <div className="text-left my-2">
          <div className="items-end pl-2 mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full cursor-pointer"
              onClick={openModal}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          items?.length === 0 ? "items-center justify-center flex" : "",
          "w-full items-center justify-items-center",
        )}
      >
        {items?.length === 0 ? (
          <div className="">
            <p className="text-gray-500 text-center ">
              {"You don't have item in your inventory, start adding them "}
            </p>
          </div>
        ) : (
          <div className="w-full h-full overflow-y-scroll">
            <ItemTable
              items={
                filteredItems && filteredItems.length !== 0
                  ? filteredItems
                  : items?.rows
              }
              openEditModal={openEditModal}
              handleDelete={handleDelete}
            />
          </div>
        )}
        {!searchField || searchField?.length === 0 ? (
          <div className="flex justify-between px-4 py-2">
            <div
              className={`flex ${page !== 1 && "cursor-pointer"}`}
              onClick={() => {
                if (page !== 1) {
                  let current = page;
                  setPage((current -= 1));
                }
              }}
            >
              <ChevronLeftIcon
                className={`w-5 ${page == 1 ? "text-gray-300" : ""}`}
              />
              <span className={`${page == 1 ? "text-gray-300" : ""}`}>
                Prev
              </span>
            </div>
            <div className="">
              Page: {page} of {maxPage}
            </div>

            <div
              className={`flex ${page !== maxPage && "cursor-pointer"}`}
              onClick={() => {
                if (page !== Number(maxPage)) {
                  let current = page;
                  setPage((current += 1));
                }
              }}
            >
              <span
                className={`${page == Number(maxPage) ? "text-gray-300" : ""}`}
              >
                Next
              </span>
              <ChevronRightIcon
                className={`w-5 ${
                  page == Number(maxPage) ? "text-gray-300" : ""
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between px-4 py-2 italic text-sm">
            Item not found
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemList;
