import React, { useState, useEffect } from "react";
import { Dashboard } from "../components";
import { useSelector } from "react-redux";
import { getWarehouseId } from "../services/getWarehouseId";
import api from "../services/api";

const DashboardPage = ({
  assetValue,
  stockIn,
  stockOut,
  audit,
  history,
  alert,
}) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { warehouseId } = currentUser;

  console.log("asset", assetValue);
  console.log("stockIn", stockIn);
  console.log("stockOut", stockOut);
  console.log("audit", audit);
  console.log("history", history);
  console.log("alert", alert);

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const [infoDate, setInfoDate] = useState({
    currentDate: Date().toLocaleString(),
  });

  return (
    <div>
      <Dashboard
        assetValue={assetValue}
        infoDate={infoDate}
        history={history}
        alert={alert}
        stockIn={stockIn}
        stockOut={stockOut}
        audit={audit}
        warehouseId={warehouseId}
      />
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  const uid = req.cookies.uid;
  const warehouseId = await getWarehouseId(uid, token);

  const getAssetFromDB = await api.get(`/dashboard/totalAsset/${warehouseId}`, {
    headers: {
      Authorization: "bearer " + token,
    },
  });

  const getStockInFromDB = await api.get(
    `/dashboard/totalTransaction/${warehouseId}?transactionType=Stock In`,
    {
      headers: {
        Authorization: "bearer " + token,
      },
    },
  );

  const getStockOutFromDB = await api.get(
    `/dashboard/totalTransaction/${warehouseId}?transactionType=Stock Out`,
    {
      headers: {
        Authorization: "bearer " + token,
      },
    },
  );

  const getAuditFromDB = await api.get(
    `/dashboard/totalTransaction/${warehouseId}?transactionType=Audit`,
    {
      headers: {
        Authorization: "bearer " + token,
      },
    },
  );

  const getHistoryFromDB = await api.get(`/transaction/${warehouseId}`, {
    headers: {
      Authorization: "bearer " + token,
    },
  });

  const getAlertFromDB = await api.get(
    `/dashboard/alertedItems/${warehouseId}`,
    {
      headers: {
        Authorization: "bearer " + token,
      },
    },
  );

  return {
    props: {
      assetValue: getAssetFromDB.data.data,
      stockIn: getStockInFromDB.data.data,
      stockOut: getStockOutFromDB.data.data,
      audit: getStockOutFromDB.data.data,
      history: getHistoryFromDB.data.data,
      alert: getAlertFromDB.data.data,
    },
  };
}

export default DashboardPage;
