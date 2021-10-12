/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
import LogoHorizontal from "../../public/images/logo-horizontal-white.svg";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ isAuthenticated, handleLogout }) {
  const history = useHistory();
  const router = useRouter();
  const [current, setCurrent] = useState();

  useEffect(() => {
    setCurrent(router.pathname);
  }, [router.pathname]);

  const publicNav = [
    {
      name: "Register",
      link: "/register",
    },
    { name: "Log in", link: "/login" },
  ];

  const authNav = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Item List",
      link: "/item-list",
    },
    {
      name: "Stock In",
      link: "/transaction/stock-in",
    },
    {
      name: "Stock Out",
      link: "/transaction/stock-out",
    },
    {
      name: "Audit",
      link: "/transaction/audit",
    },
  ];

  return (
    <Disclosure as="nav" className="bg-dongker w-full h-16 fixed ">
      <>
        <div className="max-w-7xl mx-auto bg-dongker ">
          <div className="relative flex items-center justify-between h-16">
            {/* Mobile menu button*/}
            <Image
              src={LogoHorizontal}
              onClick={() => {
                history.push("/");
              }}
              width="128"
              className=" absolute cursor-pointer"
              alt=""
            />
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">
              {/* <div className="flex-shrink-0 flex items-center"> */}
              {/* <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  /> */}
              {/* </div> */}

              <div className="hidden sm:block relative right-5 ">
                <div className="flex space-x-4">
                  {/* <div className="w-28"></div> */}
                  {isAuthenticated &&
                    authNav.map((item, index) => (
                      <Link key={index} href={item.link}>
                        <a
                          className={classNames(
                            item.link === current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            " px-3 py-2 rounded-md text-sm font-medium ",
                          )}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

              {/* Profile dropdown */}
              {isAuthenticated ? (
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 mr-2 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item as="div">
                        {/* {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              Your Profile
                            </a>
                          )} */}
                        <Link href="/update-profile">
                          <a
                            className={classNames(
                              "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                            )}
                          >
                            Update Profile
                          </a>
                        </Link>
                      </Menu.Item>

                      <Menu.Item>
                        {/* {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              Sign out
                            </a>
                          )} */}
                        <Link href="/">
                          <a
                            className={classNames(
                              "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                            )}
                            onClick={handleLogout}
                          >
                            Sign out
                          </a>
                        </Link>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                publicNav.map((item, index) => {
                  return (
                    <Link key={index} href={item.link}>
                      <a
                        className={classNames(
                          item.link === current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          " px-3 py-2 rounded-md text-sm font-medium ",
                        )}
                      >
                        {item.name}
                      </a>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </>
    </Disclosure>
  );
}
