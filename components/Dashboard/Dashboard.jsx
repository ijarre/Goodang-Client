import React from "react";
import { AlertedItem, HistoryTransaction, Card } from "..";

const Dashboard = ({
  assetValue,
  infoDate,
  stockIn,
  stockOut,
  audit,
  alert,
  history,
}) => {
  return (
    <div className="font-sans">
      <div className="min-h-screen bg-white mx-auto max-w-screen-xl md:flex ">
        <div className="mt-20 mx-auto w-full h-full px-24 flex-col">
          <div className="flex flex-row">
            <div className="my-3 md:flex flex-col mr-8">
              <div className="font-bold text-gray-900 md:text-xl mr-6 my-1 w-max">
                Daily Report
              </div>
              <div className="font-light text-gray-900 text-sm bg-gray-200 rounded-md px-2 py-1 my-1 w-max">
                <h4>{infoDate.currentDate.slice(0, 25)}</h4>
              </div>
              <div className="font-light text-white text-sm bg-blue-700 rounded-md px-2 py-1 my-1 w-max">
                <h4>Warehouse 1</h4>
              </div>
            </div>
            <div className="flex flex-1 space-x-4 w-auto ml-5 mt-3">
              <Card
                title="Total Asset"
                value_items={assetValue.totalAssetItems}
                value_categories={assetValue.totalAssetQuantities}
                colorbg="bg-yellow-300"
              />
              <Card
                title="Stock In Today"
                value_items={stockIn.totalStockInItems}
                value_categories={stockIn.totalStockInQuantities}
                colorbg="bg-blue-200"
              />
              <Card
                title="Stock Out Today"
                value_items={stockOut.totalStockOutItems}
                value_categories={stockOut.totalStockOutQuantities}
                colorbg="bg-violet-300"
              />
              <Card
                title="Audit Today"
                value_items={audit.totalAuditItems}
                value_categories={audit.totalAuditQuantities}
                colorbg="bg-lime-300"
              />
            </div>
          </div>

          <div className="flex mt-5 space-x-5">
            <div className="">
              <HistoryTransaction history={history} />
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
