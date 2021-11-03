import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getTrxHistory } from "../../services/getTrxHistory";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  SwitchHorizontalIcon,
  ArrowSmRightIcon,
} from "@heroicons/react/outline";

import { useRouter } from "next/router";

const Report = React.forwardRef((props, ref) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const query = useQuery("HistoryToPrint", () =>
    getTrxHistory(currentUser.warehouseId, currentUser.accessToken, 1, 900),
  );

  React.useEffect(() => console.log(query.data), [query.data]);

  const router = useRouter();
  console.log(router.query);

  const getDate = (date) => {
    return new Date(date);
  };

  const {
    warehouseId,
    date,
    assetItems,
    assetQuantity,
    stockInItems,
    stockInQuantity,
    stockOutItems,
    stockOutQuantity,
    auditItems,
    auditQuantity,
  } = router.query;

  return (
    <div className="mx-10 mb-10 mt-3" ref={ref}>
      <div className="font-sans">
        <div className="flex text-xl justify-center font-bold">
          Daily Inventory Report
        </div>
        <div className="flex text-lg justify-center font-bold">
          Warehouse {warehouseId}
        </div>
        <div className="flex text-md justify-center font">{date}</div>

        <div className="flex flex-1 space-x-4 w-auto mt-3">
          <div
            className={`flex-1 bg-yellow-300 text-gray-700 rounded-lg py-3 px-5 shadow-md w-48 h-28`}
          >
            <span className="text-sm font-bold py-2">Total Asset</span>
            <div className="flex items-center">
              <span className="text-2xl flex font-black">{assetItems}</span>
              <span className="px-2">items </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl flex font-extrabold">
                {assetQuantity}
              </span>
              <span className="px-2">quantities</span>
            </div>
          </div>
          <div
            className={`flex-1 bg-blue-200 text-gray-700 rounded-lg py-3 px-5 shadow-md w-48 h-28`}
          >
            <span className="text-sm font-bold py-2">Stock In Today</span>
            <div className="flex items-center">
              <span className="text-2xl flex font-black">{stockInItems}</span>
              <span className="px-2">items </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl flex font-extrabold">
                {stockInQuantity}
              </span>
              <span className="px-2">quantities</span>
            </div>
          </div>
          <div
            className={`flex-1 bg-violet-300 text-gray-700 rounded-lg py-3 px-5 shadow-md w-48 h-28`}
          >
            <span className="text-sm font-bold py-2">Stock Out Today</span>
            <div className="flex items-center">
              <span className="text-2xl flex font-black">{stockOutItems}</span>
              <span className="px-2">items </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl flex font-extrabold">
                {stockOutQuantity}
              </span>
              <span className="px-2">quantities</span>
            </div>
          </div>
          <div
            className={`flex-1 bg-lime-300 text-gray-700 rounded-lg py-3 px-5 shadow-md w-48 h-28`}
          >
            <span className="text-sm font-bold py-2">Audit Today</span>
            <div className="flex items-center">
              <span className="text-2xl flex font-black">{auditItems}</span>
              <span className="px-2">items </span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl flex font-extrabold">
                {auditQuantity}
              </span>
              <span className="px-2">quantities</span>
            </div>
          </div>
        </div>

        <table className="w-full my-3">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>

              <th
                scope="col"
                className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Transaction
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Item
              </th>
              <th
                scope="col"
                className="pl-32 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Balance
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Change
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {query?.data &&
              query?.data?.rows.map((el, i) => {
                return (
                  <tr key={el.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {getDate(el.updatedAt).toLocaleDateString("en-us")}
                    </td>

                    <td className="pl-4 mt-2 py-3 whitespace-nowrap flex text-sm justify-items-center">
                      {el.transactionType === "Stock In" && (
                        <ArrowUpIcon className="w-3 mr-2  bg-green-400 rounded" />
                      )}
                      {el.transactionType === "Stock Out" && (
                        <ArrowDownIcon className="w-3 mr-2 bg-red-400 rounded" />
                      )}
                      {el.transactionType === "Audit" && (
                        <SwitchHorizontalIcon className="w-3 mr-2 bg-blue-400 rounded" />
                      )}

                      {el.transactionType}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {el.Item?.Categories?.map((el) => {
                        return (
                          <span
                            key={i}
                            className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                          >
                            {el.categoryName}
                          </span>
                        );
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {el.Item?.itemName}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="ml-2 flex justify-center">
                        {el.stockBefore} <ArrowSmRightIcon className="w-4" />
                        {el.stockAfter}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="ml-5">{el.transactionQuantity}</span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default Report;
