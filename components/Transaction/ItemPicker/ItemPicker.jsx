import React, { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { ItemTransactionList } from "../..";
import Link from "next/link";

const ItemPicker = ({
  items,
  handleAddItemToCart,
  handleRemoveItemFromCart,
  loadingData,
  page = 1,
  setPage,
  trx,
}) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [maxPage, setMaxPage] = useState();
  const [searchField, setSearchField] = useState("");
  const [filteredItems, setFilteredItems] = useState();

  useEffect(() => {
    if (items) {
      setMaxPage(maximumPage(items.count, 5));
    }
  }, [items]);
  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };
  const handleSearchAction = (e) => {
    e.preventDefault();
    const filter = allItems.data.rows.filter(
      (el) => el.itemName === searchField,
    );
    setFilteredItems(filter);
    setSearchField("");
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
          value={searchField}
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
            <span className={`${page == 1 ? "text-gray-300" : ""}`}>Prev</span>
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
      </div>
    </div>
  );
};

export default ItemPicker;
