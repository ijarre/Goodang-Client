import React from "react";
import Image from "next/image";

const FreeTrialLayout = () => {
  return (
    <div className="mx-10">
      <div className="text-center mb-14">
        <span className="text-5xl tracking-wide">BENEFIT</span>
      </div>

      <div className="relative grid grid-cols-2 gap-2 place-items-start mt-16 mx-12">
        <div className="h-40 space-y-4 absolute ml-16 mt-36">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="relative text-left text-2xl tracking-wider leading-relaxed ml-24 mt-36">
          <span className=""> simple and user friendly</span>
          <br />
          <span className="">alert system and dashboard</span>
          <br />
          <span className="">tidying up your database</span>
          <br />
          <span className="">add up to 900 items adn categories</span>
        </div>
        <Image src={"images/image8.png"} className="max-w-prose" alt="" />
      </div>
    </div>
  );
};

export default FreeTrialLayout;
