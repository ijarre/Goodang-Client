import React, { useEffect, useState, useCallback } from "react";
import {
  ConfirmationDialog,
  ItemPicker,
  TransactionMaker,
} from "../../components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAllItems } from "../../services/getAllItems";
import { postTransaction } from "../../services/postTransaction";
import { useDispatch } from "react-redux";
import { addItem, clearItems, removeItem } from "../../features/trxSlice";
import { camelize, classNames } from "../../utils";

const TransactionPage = () => {
  const [trx, setTrx] = useState("");
  const [items, setItems] = useState();
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [note, setNote] = useState("");
  const [openSubmit, setOpenSubmit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { trxType } = router.query;

  const currentUser = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.app.loading);
  const cart = useSelector((state) => state.trx);
  const quantityByTrx = cart[camelize(trx)]?.quantity;
  const cartItemByTrx = cart[camelize(trx)]?.item;
  const dispatch = useDispatch();

  const { data, isLoading, isRefetching } = useQuery(
    ["items", page],
    () =>
      getAllItems(currentUser.warehouseId, currentUser.accessToken, page, 5),
    { enabled: !!currentUser.warehouseId },
  );
  const { data: allItems } = useQuery(
    "allItems",
    () =>
      getAllItems(
        currentUser.warehouseId,
        currentUser.accessToken,
        1,
        data?.count ? data.count : 9999,
      ),
    {
      enabled: !!data,
    },
  );
  const queryClient = useQueryClient();
  const querySwitch = useCallback((input) => {
    switch (input) {
      case "stock-in":
        return "Stock In";
      case "stock-out":
        return "Stock Out";
      case "audit":
        return "Audit";
      default:
        return "";
    }
  }, []);

  useEffect(() => {
    let state = querySwitch(trxType);
    setTrx(state);
  }, [querySwitch, trxType]);
  // useEffect(() => {
  //   console.log(cartItemByTrx);
  // }, [cartItemByTrx]);
  useEffect(() => {
    setItems(data?.data);
  }, [data]);

  const handleAddItemToCart = (id) => {
    const selected = items?.rows.filter((el) => el.id === id)[0];
    dispatch(addItem({ type: trx, item: selected }));
  };
  const handleRemoveItemFromCart = (id, name) => {
    dispatch(removeItem({ type: trx, id }));
  };

  // const transactionRequest = async (type, id, data) => {
  //   const switchType = () => {
  //     switch (type) {
  //       case "Stock In":
  //         return `/transaction/stockin/${id}`;
  //       case "Stock Out":
  //         return `/transaction/stockout/${id}`;

  //       case "Audit":
  //         return `/transaction/audit/${id}`;
  //       default:
  //         return;
  //     }
  //   };
  //   try {
  //     await api.post(switchType(), data, {
  //       headers: {
  //         Authorization: "Bearer " + currentUser.accessToken,
  //       },
  //     });
  //   } catch (err) {
  //     setError(err);
  //   }
  // };
  const { mutate, isLoading: isMutateLoading } = useMutation(
    ({ type, id, data, token }) => {
      postTransaction(type, id, data, token).then(() => {
        queryClient.invalidateQueries("items");
      });
    },
  );

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      cartItemByTrx.forEach((el) => {
        console.log("request:", el.stockQuantity);
        const data = {
          userId: currentUser.uid,
          stockQuantityNow: el.stockQuantity,
          transactionQuantity: quantityByTrx[el.id],
          note: note,
        };
        const dataAudit = {
          userId: currentUser.uid,
          stockQuantity: el.stockQuantity,
          actualStockQuantity: quantityByTrx[el.id],
          note: note,
        };
        if (trx === "Audit") {
          mutate({
            type: trx,
            id: el.id,
            data: dataAudit,
            token: currentUser.accessToken,
          });
          // transactionRequest(trx, el.id, dataAudit).then(() =>
          //   queryClient.invalidateQueries("items"),
          // );
        } else {
          mutate({
            type: trx,
            id: el.id,
            data,
            token: currentUser.accessToken,
          });
          // transactionRequest(trx, el.id, data).then(() =>
          //   queryClient.invalidateQueries("items"),
          // );
        }
      });
    } catch (err) {
      setError(err);
    }
    setNote("");
    dispatch(clearItems({ type: trx }));
    queryClient.invalidateQueries("items");
    setIsProcessing(false);
  };

  if (!isAuthenticated && !loading) {
    router.replace("/");
  }
  return (
    <div className=" bg-white min-h-screen  mx-auto max-w-screen-xl text-left px-7 py-7 ">
      <h1 className="text-2xl font-semibold mb-4">Transaction / {trx}</h1>
      {/* <ListboxTransaction
        selected={selected}
        setSelected={setSelected}
        option={option}
        handleListboxChange={handleListboxChange}
      /> */}
      <div className=" grid grid-cols-3 gap-y-10">
        <div className="row-span-2 col-span-2 pr-3 ">
          <ItemPicker
            allItems={allItems}
            trx={trx}
            items={items}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
            error={error}
            loadingData={isLoading}
            page={page}
            setPage={setPage}
          />
        </div>
        <div className="row-span-2 col-span-1 pl-3">
          <TransactionMaker trx={trx} cartItems={cartItemByTrx} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOpenSubmit(!openSubmit);
            // handleTransactionSubmit(e);
          }}
          className="col-span-3 flex justify-start row-start-3  items-end flex-col"
        >
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            placeholder="Write note"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none  bg-gray-100 shadow  "
            rows="2"
          />
          <div className="flex justify-end row-start-4  mt-3">
            <button
              type="submit"
              className={classNames(
                "  py-3 px-4 rounded-md text-base w-36 mr-3 ",
                cartItemByTrx?.length === 0
                  ? "bg-gray-500 text-white"
                  : "bg-green-400 hover:bg-green-700 hover:text-white",
              )}
              disabled={cartItemByTrx?.length === 0}
            >
              Submit
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-800  text-white  py-3 px-4 rounded-md text-base w-20 "
              onClick={() => {
                dispatch(clearItems({ type: trx }));
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
      <ConfirmationDialog
        trx={trx}
        cartItems={cartItemByTrx}
        openSubmit={openSubmit}
        setOpenSubmit={setOpenSubmit}
        handleTransactionSubmit={handleTransactionSubmit}
      />
    </div>
  );
};

export default TransactionPage;
