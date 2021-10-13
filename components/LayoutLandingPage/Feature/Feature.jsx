import React from "react";
import PhotoOne from "../../../public/images/image5.png";
import PhotoTwo from "../../../public/images/image6.png";
import PhotoTree from "../../../public/images/image7.png";
import Link from "next/link";
import Image from "next/image";

const Feature = ({ ...otherProps }) => {
  return (
    <div className="py-10">
      <div className="lg:w-5/12 mx-auto px-2 ">
        <h2 className="text-center text-7xl font-bold tracking-wider transform hover:scale-110">
          FEATURE
        </h2>
      </div>

      <div className="container item-center grid grid-cols-3 lg:grid-cols-3 gap-x-16 max-w-screen-lg mt-16">
        <div className="flex flex-col rounded-md shadow-md lg:mb-16 bg-white">
          <div className="pt-6 flex flex-col items-center">
            <Image
              src={PhotoOne}
              className="transform hover:scale-110"
              alt=""
            />
            <div className="p-4 mb-1 flex flex-col items-center">
              <ul>
                <li className="list-none">
                  <div className="font-bold text-lg tracking-wide text-center">
                    Asset Registration
                  </div>
                </li>

                <li className="list-none">
                  <div className="m-2 text-md flex text-center">
                    Manually add your items as you like
                  </div>
                </li>
              </ul>
              <div className="flex p-2 text-center">
                <button className="rounded-full py-2 px-6 bg-yellow-300  hover:bg-yellow-400 w-auto transform hover:scale-110 md:text-sm">
                  <Link href="/">Readmore</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg shadow-md lg:mb-16 bg-white">
          <div className="pt-6 flex flex-col items-center">
            <Image
              src={PhotoTwo}
              className="transform hover:scale-110"
              alt=""
            />
            <div className="p-4 mb-2 flex flex-col items-center">
              <ul>
                <li className="list-none">
                  <div className="font-bold text-lg tracking-wide text-center mt-3">
                    Quantity Check
                  </div>
                </li>

                <li className="list-none">
                  <div className="m-2 text-md flex text-center">
                    Provide you with actual asset management
                  </div>
                </li>
              </ul>
              <div className="flex text-center p-2">
                <button className="rounded-full py-2 px-6 bg-yellow-300  hover:bg-yellow-400 w-auto transform hover:scale-110 md:text-sm">
                  <Link href="/">Readmore</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg shadow-md  lg:mb-16 bg-white">
          <div className="pt-6 flex flex-col items-center">
            <Image
              src={PhotoTree}
              className="transform hover:scale-110"
              alt=""
            />
            <div className="p-4 flex flex-col items-center">
              <ul>
                <li className="list-none">
                  <div className="font-bold text-lg tracking-wide text-center">
                    Insightful Dashboard
                  </div>
                </li>

                <li className="list-none">
                  <div className="m-2 text-md flex text-center">
                    View transaction by period of time
                  </div>
                </li>
              </ul>
              <div className="flex p-2 text-center">
                <button className="rounded-full py-2 px-6 bg-yellow-300  hover:bg-yellow-400 w-auto transform hover:scale-110 md:text-sm">
                  <Link href="/">Readmore</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md  shadow-md grid grid-cols-2 justify-items-stretch relative xl:mx-64 h-38 bg-white">
        <div className="text-left relative my-6 mx-8 ">
          <div className="font-bold text-2xl tracking-wide">
            Start Your Free Trial
          </div>
          <h1 className="text-lg tracking-wider">
            figuring out in 90 days before deciding
          </h1>
        </div>
        <div className="items-center flex text-center justify-end mr-6">
          <button className="rounded-full py-2 px-6 bg-yellow-300  hover:bg-yellow-400 w-auto tracking-wider  transform hover:scale-110">
            <Link href="/">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
