import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Link from "next/link";
import api from "../../services/api";

const EditItem = () => {
  const [editField, setEditField] = useState({});

  // useEffect(() => {
  //   const getItem = async () => {
  //     const response = await api.get(`/item/${id}`, {
  //       headers: {
  //         Authorization: "bearer " + currentUser.accessToken,
  //       },
  //     });
  //     return response.data;
  //   };
  //   getItem().then((res) => {
  //     const { itemName, minimumQuantity, unit } = res.data;
  //     setEditField({
  //       ...editField,
  //       itemName,
  //       minimumQuantity,
  //       unit,
  //     });
  //   });
  // }, [currentUser.accessToken, editField, id]);
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);
  const history = useHistory();

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
  return (
    <div className="min-h-screen mx-auto max-w-screen-xl bg-white">
      <div className="form bg-grey-300 mx-20 md:w-full md:h-screen md:flex ">
        <div className="pl-28 pr-24 h-screen w-4/5">
          <div className="mt-10 mx-auto">
            <p className="font-light text-grey-900 pt-10">Edit Item</p>
            <h1 className="font-bold text-gray-900 md:text-2xl">Item Info</h1>
          </div>

          <div className="pt-10">
            <form onSubmit={handleSubmit} className="mb-10 mx-auto space-y-3">
              <div className="md:flex space-x-4 text-gray-900">
                <div className="md:w-1/2 space-y-1 md:text-sm">
                  <label htmlFor="itemName">Item Name</label>
                  <input
                    id="itemName"
                    className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                    type="text"
                    placeholder="item name"
                    name="itemName"
                    value={editField.itemName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="md:w-1/2 space-y-1 md:text-sm">
                  <label htmlFor="unit">Unit</label>
                  <span className="text-grey-700"></span>
                  <select
                    id="Unit"
                    className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                    type="text"
                    placeholder="unit"
                    name="Unit"
                    value={editField.unit}
                    onChange={handleChange}
                  >
                    <option className="text-grey-700">Select</option>
                    <option>pcs</option>
                    <option>ea</option>
                    <option>Kg</option>
                    <option>tonne</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="space-y-1 md:text-sm text-gray-900 md:w-1/2">
                  <label htmlFor="minimumQuantity">Minimum Qty</label>
                  <input
                    id="minimumQuantity"
                    className="text-sm bg-gray-200 block py-2 px-2 w-full rounded-sm focus:outline-none focus:ring-1 focus:border-blue-300"
                    type="text"
                    placeholder="0"
                    name="minimumQuantity"
                    value={editField.minimumQuantity}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="py-4">
                <button
                  type="submit"
                  className="md:text-sm bg-blue-200 px-5 py-2 rounded-xl text-gray-700 hover:text-gray-700 hover:bg-blue-400 active:bg-yellow-200"
                >
                  Submit
                </button>
                <button
                  type="submit"
                  className="md:text-sm bg-red-200 px-5 py-2 ml-2 rounded-xl text-gray-700 hover:text-gray-700 hover:bg-red-400 active:bg-yellow-200"
                >
                  <Link href="/item-list">Cancel</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
