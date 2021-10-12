import React from "react";
import PhotoOne from "../../../assets/img/image5.png";
import PhotoTwo from "../../../assets/img/image6.png";
import PhotoTree from "../../../assets/img/image7.png";
import Image from "next/image";
import Link from "next/link";
const Feature = ({ ...otherProps }) => {
  return (
    <div className="pb-32 my-28">
      <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
        <h2 className="text-center text-4xl mt-52 tracking-wider">FEATURE</h2>
      </div>

      <div className="container items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-screen-lg mt-16">
        <div className="flex flex-col rounded-lg shadow-xl lg:mb-16">
          <div className="p-6 flex flex-col items-center">
            <Image src={PhotoOne} className="" alt="" />
            <div className="p-6 flex flex-col items-center">
              <ul>
                <li className="list-none">
                  <span className="mt-5 mb-2 font-bold text-lg tracking-wide">
                    Asset Registration
                  </span>
                </li>

                <li className="list-none">
                  <span className="mb-2">
                    You can add manually your items as you like
                  </span>
                </li>
              </ul>
              <div className="flex p-6 text-center">
                <Link
                  href="/"
                  className="rounded-full py-3 px-6 bg-orange w-40 tracking-wide hover:bg-white transform hover:scale-110"
                >
                  Readmore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg shadow-xl lg:mb-16">
          <div className="p-6 flex flex-col items-center">
            <Image src={PhotoTwo} className="" alt="" />
            <div className="p-6 flex flex-col items-center">
              <ul>
                <li className="list-none">
                  <span className="mt-5 mb-2 font-bold text-lg tracking-wide">
                    Quantity Check
                  </span>
                </li>

                <li className="list-none">
                  <span className="mb-2">
                    Provide you with actual diagram management
                  </span>
                </li>
              </ul>
              <div className="flex p-6 text-center">
                <Link
                  href="/"
                  className="rounded-full py-3 px-6 bg-orange w-40 tracking-wide hover:bg-white transform hover:scale-110"
                >
                  Readmore
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg shadow-xl lg:mb-16 ">
          <div className="p-6 flex flex-col items-center">
            <Image src={PhotoTree} className="" alt="" />
            <div className="p-6 flex flex-col items-center">
              <ul>
                <li className="list-none">
                  <span className="mt-5 mb-2 font-bold text-lg tracking-wide">
                    Insightful Dashboard
                  </span>
                </li>

                <li className="list-none">
                  <span className="mb-2">
                    View transaction by period of time
                  </span>
                </li>
              </ul>
              <div className="flex p-6 text-center">
                <Link
                  href="/"
                  className="rounded-full py-3 px-6 bg-orange w-40 tracking-wide hover:bg-white transform hover:scale-110"
                >
                  Readmore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-xl relative place-items-start mx-48 mt-10 h-40 text-black flex ">
        <div className="text-left relative m-6 mt-16">
          <span className="font-bold text-3xl tracking-wide">
            Start Your Free Trial
          </span>
          <h1 className="text-xl tracking-wider">
            figuring out in 90 days before deciding
          </h1>
        </div>
        <div className="flex flex-col items-center text-center ml-96 pl-52 mt-16 w-44">
          <Link
            href="/"
            className="rounded-full py-3 px-6 bg-orange w-40 tracking-wide hover:bg-white transform hover:scale-110"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Feature;
