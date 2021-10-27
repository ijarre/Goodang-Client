import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { ItemTransactionList } from "../..";
import Link from "next/link";
import { classNames } from "../../../utils";

const ItemPicker = ({
  items,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  loadingData,
  page = 1,
  setPage,
  trx,
  allItems,
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
    // setSearchField(e.target.value);
    // const filter = allItems.data.rows.filter(
    //   (el) => el.itemName === e.target.value,
    // );
    // setFilteredItems(filter);
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
    // const filter = allItems.data.rows.filter(
    //   (el) => el.itemName === searchField,
    // );
    // setFilteredItems(filter);
    // setSearchField("");
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

  const maximumPage = (totalItem, itemPerPage) => {
    return (totalItem % itemPerPage).toString();
  };

  return (
    <div className={`flex flex-col rows-span-3`}>
      <p className="text-lg font-semibold my-2 ">Select Item(s)</p>
      <form
        className="shadow flex items-start mb-4"
        onSubmit={handleSearchAction}
      >
        <input
          className="w-full rounded p-2"
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <button
          type="submit"
          className="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400"
        >
          <SearchIcon className="w-6 mr-1" />
          Search
        </button>
      </form>
      <div
        className={classNames(
          items?.length === 0 ? "items-center justify-center flex" : "",
          "w-full ",
        )}
      >
        {/* EMPTY ITEM PLACEHOLDER */}
        {items?.length === 0 ? (
          <div className="">
            <p className="text-gray-500 text-center ">
              {"You don't have item in your inventory, start adding them "}
              <Link href="/item-list">
                <a className="text-blue-600 italic">here</a>
              </Link>
            </p>
          </div>
        ) : (
          <div className="h-80 overflow-y-scroll">
            <ItemTransactionList
              items={
                filteredItems && filteredItems.length !== 0
                  ? filteredItems
                  : items?.rows
              }
              handleAddItemToCart={handleAddItemToCart}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              loadingData={loadingData}
              trx={trx}
            />
          </div>
        )}
        {!searchField || searchField?.length === 0 ? (
          <div className="flex justify-between px-4 py-2">
            <div
              className={`flex ${page !== 1 && "cursor-pointer"}`}
              onClick={() => {
                if (page !== 1) {
                  setPage((page -= 1));
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
                  setPage((page += 1));
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
            Search Mode
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemPicker;
