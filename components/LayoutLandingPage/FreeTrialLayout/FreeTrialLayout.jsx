import React from "react";
import PhotoFour from "../../../public/images/image8.png";
import Image from "next/image";


const FreeTrialLayout = () => {
    return (

        <div className="mx-10">

            <div className="text-center mb-14 transform hover:scale-110">
                <span className="text-5xl font-semibold tracking-wide">BENEFIT</span>
            </div>
            <div className="relative grid grid-cols-2 m-4">
                <div className="relative place-items-start md:my-48">
                    <div className="h-40 space-y-7 absolute ml-16 mt-36 md:mt-2 md:space-y-7 md:ml-9 lg:mt-16">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div className="relative text-left text-3xl tracking-wider leading-relaxed mt-20 md:mt-0 md:ml-16 lg:mt-16">
                        <span className=""> simple and user friendly</span><br />
                        <span className="">alert system and dashboard</span><br />
                        <span className="">tidying up your database</span><br />
                        <span className="">add up to 900 items and categories</span>
                    </div>
                </div>
                <div className="relative">
                    <Image src={PhotoFour} className="max-w-prose md:w-full" alt="" />
                </div>
            </div>

        </div>
    );
};

export default FreeTrialLayout;