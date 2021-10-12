import React, { useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";
import api from "../services/api";
import { getWarehouseId } from "../services/getWarehouseId";

const ssr = ({ value }) => {
  return (
    <div className="font-sans">
      <div className="min-h-screen bg-white mx-auto max-w-screen-xl md:flex ">
        <div className="mt-20 mx-auto w-full h-full px-24 flex-col">
          <h1>SSR</h1>
          <div>{value[0].countItem}</div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  const uid = req.cookies.uid;
  const warehouseId = await getWarehouseId(uid, token);

  const assetFromDB = await api.get(`/dashboard/totalAsset/${warehouseId}`, {
    headers: {
      Authorization: "bearer " + token,
    },
  });

  return {
    props: {
      value: assetFromDB.data.data,
    },
  };
}

export default ssr;
