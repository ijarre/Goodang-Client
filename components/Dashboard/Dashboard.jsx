import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { DownloadIcon } from "@heroicons/react/outline";
import { AlertedItem, HistoryTransaction, Card } from "..";
import router from "next/router";

const Dashboard = ({
  assetValue,
  infoDate,
  stockIn,
  stockOut,
  audit,
  alert,
  history,
  warehouseId,
  trxPage,
}) => {
  return (
    <div className="font-sans">
      <div className="min-h-screen bg-white mx-auto max-w-screen-xl md:flex ">
        <div className=" mt-16 pt-2 mx-auto w-full h-full px-24 flex-col">
          <div className="flex flex-row">
            <div className="my-3 md:flex flex-col mr-8">
              <div className="flex flex-row items-center">
                <div className="flex font-bold text-gray-900 md:text-xl mr-4 my-1 w-max">
                  Daily Report
                </div>
                <button
                  onClick={() => {
                    router.push({
                      pathname: "/report",

                      query: {
                        warehouseId: warehouseId,
                        date: infoDate.currentDate.slice(0, 25),
                        assetItems: assetValue[0].countItem,
                        assetQuantity: assetValue[0].totalQuantity,
                        stockInItems: stockIn[0].countItems,
                        stockInQuantity: stockIn[0].totalQuantity,
                        stockOutItems: stockOut[0].countItems,
                        stockOutQuantity: stockOut[0].totalQuantity,
                        auditItems: audit[0].countItems,
                        auditQuantity: audit[0].totalQuantity,
                      },
                    });
                  }}
                >
                  <DownloadIcon className="flex w-5 h-5 bg-blue-300 rounded" />
                </button>
              </div>
              <div className="font-light text-gray-900 text-sm bg-gray-200 rounded-md px-2 py-1 my-1 w-max">
                <h4>{infoDate.currentDate.slice(0, 25)}</h4>
              </div>
              <div className="font-light text-white text-sm bg-blue-700 rounded-md px-2 py-1 my-1 w-max">
                <h4>Warehouse {warehouseId}</h4>
              </div>
            </div>
            <div className="flex flex-1 space-x-4 w-auto ml-5 mt-3">
              <Card
                title="Total Asset"
                value_items={assetValue[0].countItem}
                value_categories={assetValue[0].totalQuantity}
                colorbg="bg-yellow-300"
              />
              <Card
                title="Stock In Today"
                value_items={stockIn[0].countItems}
                value_categories={stockIn[0].totalQuantity}
                colorbg="bg-blue-200"
              />
              <Card
                title="Stock Out Today"
                value_items={stockOut[0].countItems}
                value_categories={stockOut[0].totalQuantity}
                colorbg="bg-violet-300"
              />
              <Card
                title="Audit Today"
                value_items={audit[0].countItems}
                value_categories={audit[0].totalQuantity}
                colorbg="bg-lime-300"
              />
            </div>
          </div>

          <div className="flex mt-5 space-x-5">
            <div className="">
              <HistoryTransaction history={history} trxPage={trxPage} />
            </div>
            <div className="">
              <AlertedItem alert={alert} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
