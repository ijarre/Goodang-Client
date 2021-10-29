import React from "react";
import ImageOne from "../../../public/images/image4.png";
import Link from "next/link";
import Image from "next/image";

const Content = () => {
  return (
    <div className="relative grid grid-cols-2 pt-36 pb-20">
      <div className="pr-2 ml-36 max-w-prose">
        <Image src={ImageOne} alt="" className="" />
      </div>
      <div className="mt-16 ml-20  text-left gap-y-2">
        <div className="text-2xl mb-2 tracking-widest">
          Multi Purpose Inventory
        </div>
        <h1 className="mb-2 text-7xl tracking-wide font-bold">
          SIMPLIFY <br /> ORGANIZING
        </h1>
        <h1 className="relative text-xl tracking-widest font-medium">
          we care a lot about your inventory <br />
          we know it take too much time to handle <br />
          goodang will overcome those all! <br />
        </h1>
        <div className="flex text-center mt-4 relative">
          <button className="rounded-full py-2 px-6 bg-yellow-300  hover:bg-yellow-400 p-1 w-auto tracking-wider transform hover:scale-110">
            <Link href="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
