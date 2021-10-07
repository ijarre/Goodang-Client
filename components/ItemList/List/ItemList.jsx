import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";

const ItemList = ({
  items,
  handleDelete,
  openModal,
  handleEdit,
  handleSearch,
  isOpen,
  setIsOpen
}) => {
  const inputElement = useRef("");

  const getSearchTerm = () => {
    items.searchKeyword(inputElement.current.value);
  };
  return (
    <div>
      <div className="mt-5">
        <div action="" className="text-left my-2 flex">
          <div className="bg-grey-200 rounded-md ml-4">
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
          </div>
          <div className="bg-grey-200 rounded-md ml-4">
            <label className="text-gray-500 ml-1" htmlFor="searchByItemName">
              Search
            </label>
            <input
              className="text-sm bg-white block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
              ref={inputElement}
              // value={items.term}
              type="text"
              id=""
              placeholder="Search Item"
              onChange={getSearchTerm}
            />
            <i className="search"></i>
          </div>
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

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item Name
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
            </th>
            <th>
              <span className="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody className="overflow-y-scroll divide-y">
          {items?.map((el) => {
            return (
              <tr key={el.id}>
                <td className="px-6 py-4 whitespace-nowrap">{el.itemName}</td>
                <td>
                  <img className="h-10 w-10 ml-5 " src={el.image} alt="" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {el?.Categories?.map((category) => {
                    return (
                      <span
                        key={category.id}
                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                      >
                        {category.categoryName}
                      </span>
                    );
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <span className="ml-5">{el.stockQuantity}</span>
                </td>
                <td className="px-6 py-4 ml-20">
                  <span className="mr-6">
                    <button className="bg-yellow-400 hover:bg-yellow-700 text-white py-2 px-4 rounded-full text-sm w-20 ml-5">
                      <Link to={`/edit-item/${el.id}`}>Edit</Link>
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full text-sm w-20 ml-3"
                      type="submit"
                    >
                      Delete
                    </button>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-center">
        <Dialog
          as="div"
          className="fixed flex inset-0 items-center justify-center"
          open={isOpen}
          onClose={() => setIsOpen(false)}
          key={el.id}
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

          <div className="bg-white p-6 rounded-md z-10 shadow-xl flex flex-col items-center justify-center">
            
            <Dialog.Title as="div" className="text-md">
              Are you sure want to delete this item?
            </Dialog.Title>
            <button
              className="md:text-sm bg-white mt-3 px-5 py-2 rounded-xl text-gray-700 hover:text-gray-700 hover:bg-blue-200"
              onClick={() => handleDelete(el.id)}
            >
              Yes
            </button>
            <button
              className="md:text-sm bg-white mt-3 px-5 py-2 rounded-xl text-gray-700 hover:text-gray-700 hover:bg-red-600"
              onClick={() => setIsOpen(false)}
            >
              <Link to="/item-list">No</Link>
            </button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default ItemList;
