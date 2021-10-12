import React from "react";
import PhotoFour from "../../../public/images/image8.png";
import Image from "next/image";

const FreeTrialLayout = () => {
  return (

    <div className="mx-10">

      <div className="text-center transform hover:scale-110">
        <span className="text-4xl font-semibold tracking-widest">BENEFIT</span>
      </div>

      <div className="relative grid grid-cols-2 gap-2 place-items-start mx-12 my-28">
        <div className="h-40 space-y-4 absolute ml-9 mt-20 ">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <div className="relative text-left text-2xl tracking-wider leading-relaxed ml-24 md:mt-0 md:ml-16 pt-20">
          <span className=""> simple and user friendly</span><br />
          <span className="">alert system and dashboard</span><br />
          <span className="">tidying up your database</span><br />
          <span className="">add up to 900 items and categories</span>
        </div>
        <div className="max-w-prose  md:w-full">
          <Image src={PhotoFour} className="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default FreeTrialLayout;