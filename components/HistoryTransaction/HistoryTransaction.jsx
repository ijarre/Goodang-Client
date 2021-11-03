import React, { useEffect, useState } from "react";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  SwitchHorizontalIcon,
  ArrowSmRightIcon,
  RefreshIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";
import { useQuery } from "react-query";
import { getTrxHistory } from "../../services/getTrxHistory";
import { useSelector } from "react-redux";

const HistoryTransaction = ({ history, trxPage }) => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const getDate = (date) => {
    return new Date(date);
  };
  useEffect(() => {
    setMaxPage(history?.count % 5);
  }, [history?.count]);
  useEffect(() => {
    console.log(query.data);
    console.log(page);
  }, [query?.data]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const query = useQuery(
    ["trxHistory", page],
    () =>
      getTrxHistory(currentUser.warehouseId, currentUser.accessToken, page, 5),
    { initialData: history },
  );

  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <>
      <div className="flex-col w-full h-auto bg-white rounded-xl border border-gray-300 p-3">
        <div className="flex pb-3">
          <button onClick={refreshPage}>
            <ClipboardListIcon className="flex w-4 h-4 bg-blue-400 rounded" />
          </button>
          <div className="flex ml-2 text-sm text-gray-900 md:text-m font-bold">
            Transaction History
          </div>
        </div>

        <div className="overflow-y-auto h-auto">
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
                  className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Transaction
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Picture
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
                  className="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                    // <div className="bg-red">
                    //   <pre>{JSON.stringify(el, null, 2)}</pre>

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
                      <td>
                        <img
                          className="h-10 w-10 ml-4 my-2"
                          src={el.Item.itemImage}
                          alt=""
                        />
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
            <span
              className={`${page == 1 ? "text-gray-300 text-sm" : "text-sm"}`}
            >
              Prev
            </span>
          </div>
          <div className="text-sm">
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
            <span
              className={`${
                page == Number(maxPage) ? "text-gray-300 text-sm" : "text-sm"
              }`}
            >
              Next
            </span>
            <ChevronRightIcon
              className={`w-5 ${
                page == Number(maxPage) ? "text-gray-300 text-sm" : "text-sm"
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoryTransaction;
