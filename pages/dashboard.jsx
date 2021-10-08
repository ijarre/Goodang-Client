import React, { useState, useEffect } from "react";
import { Dashboard } from "../components";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [assetValue, setAssetValue] = useState({});
  const [history, setHistory] = useState();
  const [alert, setAlert] = useState();
  const [stockIn, setStockIn] = useState({});
  const [stockOut, setStockOut] = useState({});
  const [audit, setAudit] = useState({});
  const [error, setError] = useState();

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

  useEffect(() => {
    if (currentUser) {
      getAssetFromDB().then((asset) => {
        setAssetValue({
          totalAssetItems: asset.data[0].countItem,
          totalAssetQuantities: asset.data[0].totalQuantity,
        });
      });
      getStockInFromDB().then((stockin) => {
        console.log(stockin);
        setStockIn({
          totalStockInItems: stockin.data[0].countItems,
          totalStockInQuantities: stockin.data[0].totalQuantity,
        });
      });
      getStockOutFromDB().then((stockout) => {
        setStockOut({
          totalStockOutItems: stockout.data[0].countItems,
          totalStockOutQuantities: stockout.data[0].totalQuantity,
        });
      });
      getAuditFromDB().then((audit) => {
        setAudit({
          totalAuditItems: audit.data[0].countItems,
          totalAuditQuantities: audit.data[0].totalQuantity,
        });
      });
      getHistoryFromDB().then((history) => {
        setHistory(history.data);
      });
      getAlertFromDB().then((alert) => {
        console.log(alert);
        setAlert(alert.data);
      });
    } else {
      setAssetValue({});
      setStockIn({});
      setStockOut({});
      setAudit({});
    }
    // getAlertFromDB();
  }, []);

  const getAssetFromDB = async () => {
    try {
      const assetFromDB = await api.get(`/dashboard/totalAsset/1`, {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      });
      return assetFromDB.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const getStockInFromDB = async () => {
    try {
      const stockInFromDB = await api.get(
        `/dashboard/totalTransaction/1?transactionType=Stock In`,
        {
          headers: {
            Authorization: "bearer " + currentUser.accessToken,
          },
        },
      );
      return stockInFromDB.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const getStockOutFromDB = async () => {
    try {
      const stockOutFromDB = await api.get(
        `/dashboard/totalTransaction/1?transactionType=Stock Out`,
        {
          headers: {
            Authorization: "bearer " + currentUser.accessToken,
          },
        },
      );
      return stockOutFromDB.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const getAuditFromDB = async () => {
    try {
      const auditFromDB = await api.get(
        `/dashboard/totalTransaction/1?transactionType=Audit`,
        {
          headers: {
            Authorization: "bearer " + currentUser.accessToken,
          },
        },
      );
      return auditFromDB.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const getHistoryFromDB = async () => {
    try {
      const historyFromDB = await api.get(`/transaction/1`, {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      });
      return historyFromDB.data;
    } catch (err) {
      setError(err.message);
    }
  };

  const getAlertFromDB = async () => {
    try {
      const alertFromDB = await api.get(`/dashboard/alertedItems/1`, {
        headers: {
          Authorization: "bearer " + currentUser.accessToken,
        },
      });
      return alertFromDB.data;
    } catch (err) {
      setError(err.message);
    }
  };

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
      />
    </div>
  );
};

export default DashboardPage;
