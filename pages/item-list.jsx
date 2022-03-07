import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { ItemModal, ItemList, ConfirmationModal } from "../components";
import { getAllItems } from "../services/getAllItems";

const Items = () => {
  const [page, setPage] = useState(1);
  const [toAction, setToAction] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addItem, setAddItem] = useState(false);
  const [mode, setMode] = useState("add");
  const [fields, setFields] = useState({
    itemName: "",
    unit: "",
    stockQuantity: "",
    minimumQuantity: "",
    categoryName: "",
    itemImage: "",
    warehouseId: "",
  });

  const { currentUser } = useSelector((state) => state.user);
  const { data } = useQuery(
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
    { enabled: !!data },
  );
  const handleEdit = (item) => {
    setToAction({ ...toAction, id: item.id });
    setFields({
      itemName: item.itemName,
      unit: item.unit,
      stockQuantity: item.stockQuantity,
      minimumQuantity: item.minimumQuantity,
      categoryName: item.categoryName,
      itemImage: item.itemImage,
      warehouseId: item.warehouseId,
    });
    setMode("edit");
    setAddItem(true);
  };
  const openDeleteModal = (item) => {
    setToAction(item);
    setConfirmDelete(true);
  };

  return (
    <div className="bg-white min-h-screen  mx-auto max-w-screen-xl text-left px-7 py-7">
      <ItemList
        allItems={allItems}
        items={data?.data}
        page={page}
        setPage={setPage}
        openModal={setAddItem}
        openEditModal={handleEdit}
        setFields={setFields}
        setMode={setMode}
        setToAction={setToAction}
        openDeleteModal={openDeleteModal}
      />
      <ItemModal
        open={addItem}
        setOpen={setAddItem}
        fields={fields}
        setFields={setFields}
        setMode={setMode}
        mode={mode}
        toAction={toAction}
        setToAction={setToAction}
        page={page}
      />
      <ConfirmationModal
        open={confirmDelete}
        setOpen={setConfirmDelete}
        toAction={toAction}
      />
    </div>
  );
};

export default Items;
