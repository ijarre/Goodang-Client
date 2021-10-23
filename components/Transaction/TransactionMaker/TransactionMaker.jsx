import { ArrowSmRightIcon } from "@heroicons/react/outline";
import React from "react";
import Image from "next/image";
import imagePlaceholder from "../../../public/images/image-placeholder.svg";

const TransactionMaker = ({ trx, cartItems, quantity, setQuantity }) => {
  return (
    <>
      <p className="text-lg font-semibold mt-2 mb-2 sticky top-0">{trx} Item</p>
      <div className="h-96 overflow-y-scroll">
        <div className="l">
          <table className=" w-full">
            <thead
              className={`${trx === "Stock In" ? "bg-green-100" : ""} ${
                trx === "Stock Out" ? "bg-red-100" : ""
              }  ${
                trx === "Audit" ? "bg-blue-100" : ""
              } rounded shadow sticky  z-40`}
            >
              <tr>
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
                  Item
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((el) => {
                return (
                  <tr key={el.id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Image
                        width="60"
                        height="40"
                        src={el.image ? el.image : imagePlaceholder}
                        alt=""
                      />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-base">
                      {el.itemName}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="relative top-3">
                        <div className="flex justify-center ">
                          <button
                            onClick={() => {
                              if (quantity[el.id] > 1) {
                                setQuantity({
                                  ...quantity,
                                  [el.id]: quantity[el.id] - 1,
                                });
                              }
                            }}
                          >
                            <div className="sr-only">
                              Substract 1 from Quantity
                            </div>
                            <svg
                              className="fill-current text-gray-600 w-3"
                              viewBox="0 0 448 512"
                            >
                              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>
                          </button>
                          <div className="sr-only">
                            current {el.itemName} quantity is {quantity[el.id]}
                          </div>
                          <input
                            className="mx-2 border text-center w-8"
                            type="text"
                            value={quantity[el.id]}
                            onChange={(e) => {
                              setQuantity({
                                ...quantity,
                                [el.id]: Number(e.target.value),
                              });
                            }}
                          />
                          <button
                            onClick={() => {
                              setQuantity({
                                ...quantity,
                                [el.id]: quantity[el.id] + 1,
                              });
                            }}
                          >
                            <div className="sr-only">Add 1 to Quantity</div>
                            <svg
                              className="fill-current text-gray-600 w-3"
                              viewBox="0 0 448 512"
                            >
                              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>
                          </button>
                        </div>

                        <div className="flex justify-center text-sm italic pt-1 font-semibold">
                          {el.stockQuantity}{" "}
                          <ArrowSmRightIcon className="w-4" />{" "}
                          {trx === "Stock In" &&
                            el.stockQuantity + quantity[el.id]}
                          {trx === "Stock Out" &&
                            el.stockQuantity - quantity[el.id]}
                          {trx === "Audit" && quantity[el.id]}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TransactionMaker;
