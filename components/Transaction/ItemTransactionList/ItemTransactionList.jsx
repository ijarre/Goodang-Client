import React from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import Image from "next/image";
import imagePlaceholder from "../../../public/images/image-placeholder.svg";

const ItemTransactionList = ({
  items,
  handleAddItemToCart,
  cartItems,
  handleRemoveItemFromCart,
  loadingData,
}) => {
  const isObjectInArray = (obj, arr) => {
    let output = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === obj) {
        output = true;
        break;
      }
    }
    return output;
  };
  if (loadingData) {
    return "loading data...";
  }
  return (
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
            <span className="sr-only">Add to transaction cart</span>
          </th>
        </tr>
      </thead>
      <tbody className="overflow-y-scroll divide-y">
        {items?.map((el) => {
          return (
            <tr key={el.id}>
              <td className="px-6 py-4 whitespace-nowrap">{el.itemName}</td>
              <td className="flex ">
                <div className="w-10 h-10 ml-5 relative top-2">
                  <Image src={el.image ? el.image : imagePlaceholder} alt="" />
                </div>
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
              <td>
                {isObjectInArray(el, cartItems) ? (
                  <button
                    className="rounded-full bg-red-400 p-1 hover:bg-red-700"
                    onClick={() => handleRemoveItemFromCart(el.id, el.itemName)}
                  >
                    <MinusIcon className="w-5" />
                  </button>
                ) : (
                  <button
                    className="rounded-full bg-yellow-300 hover:bg-yellow-500 hover:scale-105 p-1"
                    onClick={() => handleAddItemToCart(el.id)}
                  >
                    <PlusIcon className="w-5" />
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ItemTransactionList;
