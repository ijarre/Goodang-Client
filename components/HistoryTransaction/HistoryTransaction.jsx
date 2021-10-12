import React from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";

const HistoryTransaction = ({ history }) => {
  const getDate = (date) => {
    return new Date(date);
  };
  return (
    <>
      <div className="flex-col w-full h-96 bg-white rounded-xl border border-gray-300 p-4">
        <div className="text-sm text-gray-900 md:text-m pb-3 font-bold pl-2">
          Transaction History
        </div>
        <div className="overflow-y-auto h-80">
          <table className="w-full">
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
                  className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Transaction
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Picture
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {history &&
                history?.map((el, i) => {
                  return (
                    // <div className="bg-red">
                    //   <pre>{JSON.stringify(el, null, 2)}</pre>

                    <tr key={el.id}>
                      <td className="px-6 py-3 whitespace-nowrap text-sm">
                        {getDate(el.updatedAt).toLocaleDateString("en-us")}
                      </td>

                      <td className="px-6 py-3 whitespace-nowrap flex text-sm">
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
                      <td>
                        <img
                          className="h-10 w-10 ml-5 "
                          src={el.image}
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm">
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
                        <span className="ml-5">{el.transactionQuantity}</span>
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

export default HistoryTransaction;
