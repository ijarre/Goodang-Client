import React from "react";
import PhotoOne from "../../../public/images/image5.png";
import PhotoTwo from "../../../public/images/image6.png";
import PhotoTree from "../../../public/images/image7.png";
import Link from "next/link";
import Image from "next/image";


const Feature = ({ ...otherProps }) => {
  return (

    <div className="pb-32 pt-28">

      <div className='lg:w-5/12 mx-auto px-2 '>
        <h2 className='text-center text-4xl font-semibold tracking-wider transform hover:scale-110'>FEATURE</h2>
      </div>

      <div className="container item-center grid grid-cols-3 lg:grid-cols-3 gap-x-16 max-w-screen-lg mt-16">

        <div className="flex flex-col rounded-lg shadow-xl lg:mb-16 bg-white">
          <div className="p-6 flex flex-col items-center">
            <Image src={PhotoOne} className="transform hover:scale-110" alt="" />
            <div className="p-6 mb-1 flex flex-col items-center">
              <ul>
                <li className="list-none">
                  <span className="mt-5 mb-2 ml-16 font-bold text-lg tracking-wide text-center">Asset Registration</span>
                </li>

                <li className="list-none">
                  <h1 className="m-5 text-lg flex text-center">You can add manually your items as you like</h1>
                </li>
              </ul>
              <div className="flex p-6 text-center">
                <button className="rounded-full py-3 px-6 bg-yellow w-40 bg-orange hover:bg-btn transform hover:scale-110 md:text-xl">
                  <Link href="/">Readmore</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg shadow-xl lg:mb-16 bg-white">
          <div className="p-6 flex flex-col items-center">
            <Image src={PhotoTwo} className="md:h-44 transform hover:scale-110" alt="" />
            <div className="p-6 mb-2 flex flex-col items-center">
              <ul>
                <li className="list-none">
                  <span className="mt-5 mb-2 ml-20 font-bold text-lg tracking-wide text-center">Quantity Check</span>
                </li>

                <li className="list-none">
                  <h1 className="m-5 text-lg flex text-center">Provide you with actual diagram management</h1>
                </li>
              </ul>
              <div className="flex p-6 text-center">
                <button className="rounded-full py-3 px-6 bg-yellow w-40 bg-orange hover:bg-btn transform hover:scale-110 md:text-xl">
                  <Link href="/">Readmore</Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg shadow-xl  lg:mb-16 bg-white">
          <div className="p-6 flex flex-col items-center">
            <Image src={PhotoTree} className="transform hover:scale-110" alt="" />
            <div className="p-6 flex flex-col items-center">
              <ul>
                <li className="list-none">
                  <span className="mt-5 mb-2 ml-12 font-bold text-lg tracking-wide text-center">Insightful Dashboard</span>
                </li>

                <li className="list-none">
                  <h1 className="m-5 text-lg flex text-center">View transaction by period of time</h1>
                </li>
              </ul>
              <div className="flex p-6 text-center">
                <button className="rounded-full py-3 px-6 bg-yellow w-40 bg-orange hover:bg-btn transform hover:scale-110 md:text-xl">
                  <Link href="/">Readmore</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg  shadow-xl grid grid-cols-2 justify-items-stretch relative xl:mx-64 h-38 bg-white">
        <div className="text-left relative m-6 ">
          <span className="font-bold text-3xl tracking-wide">Start Your Free Trial</span>
          <h1 className="text-lg tracking-wider">figuring out in 90 days before deciding</h1>
        </div>
        <div className="items-center flex text-center ml-80">
          <button className="rounded-full py-3 px-6 bg-orange w-40 tracking-wider hover:bg-btn transform hover:scale-110">
            <Link href="/">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feature;
