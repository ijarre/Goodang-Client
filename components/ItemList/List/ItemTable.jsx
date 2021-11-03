import React from "react";

const ItemTable = ({ items, openEditModal, openDeleteModal, handleDelete, id }) => {
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
                <img className="h-10 w-10 ml-5 " src={el.itemImage} alt="" />
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
              <td className="px-9 py-4 ml-20">
                <span className="mr-6">
                  <button
                    className="bg-yellow-400 hover:bg-yellow-700 text-white py-2 px-4 rounded-full text-sm w-20 ml-5"
                    onClick={() => openEditModal(el)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-400 hover:bg-red-700 text-white py-2 px-4 rounded-full text-sm w-20 ml-3"
                    onClick={() =>
                      handleDelete(el.id)
                    }
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
  );
};

export default ItemTable;
