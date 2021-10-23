import React from "react";
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
  cartItems,
  handleRemoveItemFromCart,
  loadingData,
  page = 1,
  setPage,
}) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className={`flex flex-col rows-span-3`}>
      <p className="text-lg font-semibold my-2 ">Select Item(s)</p>
      <div className="shadow flex items-start mb-4">
        <input
          className="w-full rounded p-2"
          type="text"
          placeholder="Search..."
        />
        <button className="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
          <SearchIcon className="w-6 mr-1" />
          Search
        </button>
      </div>
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
              items={items}
              handleAddItemToCart={handleAddItemToCart}
              cartItems={cartItems}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              loadingData={loadingData}
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

          <div className="">Page: {page}</div>
          <div
            className="flex cursor-pointer"
            onClick={() => setPage((page += 1))}
          >
            <span>Next</span>
            <ChevronRightIcon className="w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPicker;
