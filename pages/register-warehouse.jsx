import { Dialog, Tab, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useRef,
} from "react";
import api from "../services/api";
import { useRouter } from "next/router";
import { setWarehouseId } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RegisterWarehousePage = () => {
  const [warehouseData, setWarehouseData] = useState();
  const [createForm, setCreateForm] = useState("");
  const [selected, setSelected] = useState();
  const [canCreate, setCanCreate] = useState();
  const [notification, setNotification] = useState();
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [searchForm, setSearchForm] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const router = useRouter();

  const getWarehouses = useCallback(async () => {
    const warehouses = await api.get("/warehouse", {
      headers: {
        Authorization: "bearer " + currentUser.accessToken,
      },
    });
    return warehouses.data;
  }, [currentUser.accessToken]);

  useEffect(() => {
    setCanCreate(false);

    getWarehouses().then((warehouses) => {
      setWarehouseData(warehouses.data);
    });
  }, [getWarehouses]);

  //NEED TO CONFIGURE IF USER PRESS GO TO DASHBOARD, USEEFFECT BELOW NOT TRIGGERED

  // useEffect(() => {
  //   if (openJoin || openCreate) {
  //     setTimeout(() => {
  //       if (openJoin || openCreate) {
  //         setOpenJoin(false);
  //         setOpenCreate(false);
  //         router.push("/dashboard");
  //       }
  //     }, 3000);
  //   }
  // }, [openJoin, openCreate]);
  const okButtonRef = useRef(null);
  const handleCreateWarehouse = (e) => {
    e.preventDefault();
    console.log("create warehouse");
    api
      .post(
        "/warehouse",
        { warehouseName: createForm, userId: currentUser.uid },
        {
          headers: {
            Authorization: "Bearer " + currentUser.accessToken,
          },
        },
      )
      .then((response) => {
        dispatch(setWarehouseId({ warehouseId: response.data.data.id }));
      })
      .then(() => {
        console.log(currentUser);
        setOpenCreate(true);
      });
  };

  const handleJoinWarehouse = () => {
    console.log(selected.id);
    api
      .post(
        "/user/addWarehouse",
        { warehouseId: selected.id, userId: currentUser.uid },
        {
          headers: {
            Authorization: "Bearer " + currentUser.accessToken,
          },
        },
      )
      .then(() => {
        setOpenJoin(true);
      });
  };

  const handleCheckName = (e) => {
    e.preventDefault();
    console.log("checkname");
    setLoading(true);
    if (createForm.length === 0) {
      setNotification("Please Fill Out Warehouse Name");
    } else {
      api
        .post(
          "/warehouse/check",
          { warehouseName: createForm },
          {
            headers: {
              Authorization: "Bearer " + currentUser.accessToken,
            },
          },
        )
        .then((res) => {
          if (res.data.data.result === false) {
            console.log(res.data.data);
            setCanCreate(true);
            setNotification("");
          } else {
            setNotification("Warehouse Name Already Taken");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-4">
      <div className="max-w-md w-full bg-white px-5 py-8 border-2 border-gray-800 rounded-md shadow-lg ">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 pb-4">
          Create or Join a Warehouse
        </h2>
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-600 rounded-xl ">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-lg leading-5 font-bold  rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow text-gray-900"
                    : "text-white hover:bg-white hover:text-gray-900",
                )
              }
            >
              Create
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-lg leading-5   rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow text-gray-900"
                    : "text-white hover:bg-white hover:text-gray-900",
                )
              }
            >
              Join
            </Tab>
          </Tab.List>
          <Tab.Panels className=" ">
            <Tab.Panel>
              <div className="w-full p-3 text-red-600 italic">
                {notification && notification}
              </div>

              <form onSubmit={handleCreateWarehouse}>
                <input
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-3 mt-5"
                  value={createForm}
                  onChange={(e) => {
                    setCreateForm(e.target.value);
                  }}
                  placeholder="Input your Warehouse name"
                />
                <button
                  className={` ${
                    canCreate ? "bg-green-200 cursor-not-allowed" : "bg-orange"
                  } p-3 text-xs  text-dongker font-sans font-bold rounded-lg shadow mb-10`}
                  onClick={handleCheckName}
                >
                  {canCreate ? "Available" : "Check name availibility"}
                </button>

                <button
                  type="submit"
                  disabled={!canCreate}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md   ${
                    !canCreate
                      ? "bg-gray-600 text-black cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white"
                  } `}
                >
                  Create a Warehouse
                </button>
              </form>
            </Tab.Panel>
            <Tab.Panel>
              <input
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  mt-5"
                value={createForm}
                onChange={(e) => {
                  setCreateForm(e.target.value);
                }}
                placeholder="Search"
              />
              <div className=" grid grid-rows-4 ">
                <div className=" row-span-3 h-40 overflow-y-scroll my-5 flex flex-col">
                  {/* <h3 className="text-sm font-sans font-bold">
                    Choose your warehouse
                  </h3> */}
                  {warehouseData?.map((el, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setSelected(el);
                        }}
                        className={` p-2 my-1 rounded cursor-pointer ${
                          el.warehouseName === selected?.warehouseName
                            ? "bg-green-200 italic font-bold"
                            : "bg-orange"
                        }`}
                      >
                        {el.warehouseName}
                      </div>
                    );
                  })}
                </div>
                <div className="">
                  <p className="text-gray-500">
                    Selected Warehouse: {selected?.warehouseName}
                  </p>
                  <button
                    onClick={handleJoinWarehouse}
                    disabled={!selected}
                    className={` group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  mt-1 ${
                      !selected
                        ? "bg-gray-600 text-black cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white"
                    } `}
                  >
                    Join a warehouse
                  </button>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {/* CREATE WAREHOUSE MODAL */}
      <Transition.Root show={openCreate} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={okButtonRef}
          onClose={setOpenCreate}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        {createForm} Created!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You have successfully create and join your warehouse,
                          start adding item to your inventory
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpenCreate(false);
                      router.push("/dashboard");
                    }}
                    ref={okButtonRef}
                  >
                    Redirect me to Dashboard
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={openJoin} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={okButtonRef}
          onClose={setOpenJoin}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <CheckIcon
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Joined {selected?.warehouseName}!
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          You have successfully joined a warehouse, start adding
                          item to your inventory
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpenJoin(false);
                      router.push("/dashboard");
                    }}
                    ref={okButtonRef}
                  >
                    Redirect me to Dashboard
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default RegisterWarehousePage;
