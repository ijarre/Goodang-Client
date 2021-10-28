import React from "react";
import {ItemTable} from "./ItemTable";
import {
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

const ItemList = ({
  items,
  openModal,
  openEditModal,
  handleDelete,
  openDeleteModal,
  page = 1,
  setPage,
  maxPage,
  searchField,
  handleSearchChange,
  handleSearchAction,
}) => {

  return (
    <div className="min-h-screen bg-white mx-auto max-w-screen-xl text-left p-3 flex flex-col">
      <h1 className="ml-4 font-bold text-2xl">Item List</h1>
      <div className="mt-5">
        <div action="" className="text-left my-2 flex">
          <form className="shadow flex items-start mb-4" onSubmit={handleSearchAction}>
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
          {/* <div className="bg-grey-200 rounded-md ml-4">
            <label className=" text-gray-500 ml-1" htmlFor="filterByCategory">
              Filter
            </label>
            <input
              className="text-sm bg-white block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
              type="text"
              id=""
              placeholder="Filter Category"
            />
            <i className="filter"></i>
          </div> */}
        </div>
        <div className="md:col-span-5 text-right">
          <div className="inline-flex items-end mr-5 mb-1">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full cursor-pointer"
              onClick={openModal}
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
      {items?.length === 0 (
        <div className="h-80 overflow-auto">
          <ItemTable
          items={
            filteredItems && filteredItems.length !== 0 ? filteredItems : items?.rows
          }
          openEditModal={openEditModal}
          handleDelete={handleDelete}/>
        </div>
      )}
      {!searchField || searchField?.length === 0 (
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
          <span className={`${page == 1 ? "text-gray-300" : ""}`}>Prev</span>
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
          <span className={`${page == Number(maxPage) ? "text-gray-300" : ""}`}>
            Next
          </span>
          <ChevronRightIcon
            className={`w-5 ${page == Number(maxPage) ? "text-gray-300" : ""}`}
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default ItemList;
