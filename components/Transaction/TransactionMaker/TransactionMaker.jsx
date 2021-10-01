import React from "react";

const TransactionMaker = ({ trx, cartItems, quantity, setQuantity }) => {
  return (
    <div>
      <p className="text-lg font-semibold my-2 ">{trx} Item</p>

      <table className="w-full">
        <thead
          className={`${trx === "Stock In" ? "bg-green-100" : ""} ${
            trx === "Stock Out" ? "bg-red-100" : ""
          }  ${trx === "Audit" ? "bg-blue-100" : ""} rounded shadow `}
        >
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Item
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((el) => {
            return (
              <tr key={el.id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <img src={el.image} alt="" className="w-20 h-20" />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-base">
                  {el.itemName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex justify-center ">
                    <button
                      onClick={() => {
                        if (quantity[el.itemName] > 1) {
                          setQuantity({
                            ...quantity,
                            [el.itemName]: quantity[el.itemName] - 1,
                          });
                        }
                      }}
                    >
                      <div className="sr-only">Substract 1 from Quantity</div>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                    <div className="sr-only">
                      current {el.itemName} quantity is {quantity[el.itemName]}
                    </div>
                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={quantity[el.itemName]}
                      onChange={(e) => {
                        setQuantity({
                          ...quantity,
                          [el.itemName]: Number(e.target.value),
                        });
                      }}
                    />
                    <button
                      onClick={() => {
                        setQuantity({
                          ...quantity,
                          [el.itemName]: quantity[el.itemName] + 1,
                        });
                      }}
                    >
                      <div className="sr-only">Add 1 to Quantity</div>
                      <svg
                        className="fill-current text-gray-600 w-3"
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionMaker;
