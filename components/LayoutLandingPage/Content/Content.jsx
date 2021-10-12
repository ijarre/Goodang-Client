import React from "react";
import Image from "next/image";
import Link from "next/link";
const Content = () => {
  return (
    <div className="relative grid grid-cols-2 gap-2 place-items-start mt-44 ml-32 text-black">
      <div className="pr-4 max-w-prose">
        <Image src="images/image4.png" alt="" className="" />
      </div>
      <div className="relative mt-16 text-left gap-y-2 ml-30">
        <span className="text-2xl mb-2 tracking-wide">
          Multi Purpose Inventory
        </span>
        <h1 className="mb-2 text-8xl tracking-wide">
          SIMPLIFY <br /> ORGANIZING{" "}
        </h1>
        <h1 className="relative text-lg tracking-wide">
          we care a lot about your inventory, sometimes it take too much <br />
          time to handle. <br /> Our value is to bring simple and extraordinary
          management
          <br />
          system for you.
        </h1>
        <div className="flex text-center mt-4 relative">
          <Link
            href="/"
            className="rounded-full py-3 px-6 bg-orange w-40 tracking-wider hover:bg-white transform hover:scale-110"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Content;
