import React, { useEffect, useState, useCallback } from "react";
import { ItemPicker, TransactionMaker } from "../../components";
import api from "../../services/api";
import { useRouter } from "next/router";
import { getWarehouseId } from "../../services/getWarehouseId";
import { useSelector } from "react-redux";
import { useItems } from "../../hooks/useItems";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getAllItems } from "../../services/getAllItems";
import { postTransaction } from "../../services/postTransaction";

const TransactionPage = () => {
  const [trx, setTrx] = useState("");
  const [items, setItems] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [error, setError] = useState();
  const [note, setNote] = useState("");
  const router = useRouter();
  const { trxType } = router.query;

  const currentUser = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.app.loading);
  const { data, isLoading } = useQuery(
    "items",
    () => getAllItems(currentUser.warehouseId, currentUser.accessToken),
    { enabled: !!currentUser.warehouseId },
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

  useEffect(() => {
    setItems(data?.data);
    console.log(data);
  }, [data]);

  const handleAddItemToCart = (id) => {
    const selected = items.filter((el) => el.id === id)[0];
    setCartItems([...cartItems, selected]);
    setQuantity({ ...quantity, [selected.itemName]: 1 });
  };
  const handleRemoveItemFromCart = (id, name) => {
    const updatedCart = cartItems.filter((el) => el.id !== id);
    const updatedQty = quantity;
    delete updatedQty[name];

    setCartItems(updatedCart);
    setQuantity(updatedQty);
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
  const { mutate } = useMutation(({ type, id, data, token }) => {
    postTransaction(type, id, data, token).then(() =>
      queryClient.invalidateQueries("items"),
    );
  });

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    try {
      cartItems.forEach((el) => {
        const data = {
          userId: currentUser.uid,
          stockQuantityNow: el.stockQuantity,
          transactionQuantity: quantity[el.itemName],
          note: note,
        };
        const dataAudit = {
          userId: currentUser.uid,
          stockQuantity: el.stockQuantity,
          actualStockQuantity: quantity[el.itemName],
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
    setCartItems([]);
  };

  if (!isAuthenticated && !loading) {
    router.push("/");
  }
  return (
    <div className="min-h-screen bg-white mx-auto max-w-screen-xl text-left px-7 py-4 flex flex-col ">
      <h1 className="text-2xl font-semibold mb-4 mt-16">Transaction / {trx}</h1>

      {/* <ListboxTransaction
        selected={selected}
        setSelected={setSelected}
        option={option}
        handleListboxChange={handleListboxChange}
      /> */}
      <div className="min-h-screen grid grid-cols-3">
        <div className="row-span-2 col-span-2 pr-3 ">
          <ItemPicker
            trx={trx}
            items={items}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
            cartItems={cartItems}
            error={error}
            loadingData={isLoading}
          />
        </div>
        <div className="row-span-2  pl-3">
          <TransactionMaker
            trx={trx}
            cartItems={cartItems}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>

        <form
          onSubmit={handleTransactionSubmit}
          className="col-span-3 flex justify-start row-start-3  items-end flex-col"
        >
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            placeholder="Write note"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none h-1/3 bg-gray-100 shadow  "
            rows="2"
          />
          <div className="flex justify-end row-start-4  mt-3">
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-700 hover:text-white  py-3 px-4 rounded-md text-base w-36 mr-3"
            >
              Submit
            </button>
            <button className="bg-red-500 hover:bg-red-800  text-white  py-3 px-4 rounded-md text-base w-20 ">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionPage;
