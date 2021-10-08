import React, { useEffect } from "react";

const AlertedItem = ({ alert }) => {
  useEffect(() => {
    console.log(alert);
  }, [alert]);
  return (
    <div>
      <div className="flex-col w-auto h-96 bg-white rounded-xl border border-red-500 p-4">
        <div className="text-sm text-red-500 md:text-m pb-3 font-bold pl-2">
          Alerted Item
        </div>
        <div className="overflow-y-auto h-80">
          <table className="flex-col w-full">
            <thead className="bg-red-300 sticky top-0">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Picture
                </th>

                <th
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                ></th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll divide-y">
              {alert &&
                alert?.length !== [] &&
                alert?.map((el) => {
                  return (
                    <tr key={el.id}>
                      <td>
                        {el.image ? (
                          <img
                            className="h-10 w-10 ml-5"
                            src={el.image}
                            alt=""
                          />
                        ) : (
                          <div className="h-10 w-10 ml-5"></div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {el.Categories[0].categoryName}
                        </span>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-center text-sm">
                        {el.itemName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                        <span className="ml-5">{el.stockQuantity}</span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlertedItem;
