import React from "react"
import Image from "next/image";
import Link from "next/link";
import Image1 from "../../../public/images/image1.png";

const Insightful = () => {
    return (

        <div id="Insightful">

            <div className=" grid grid-rows-3 gap-y-2 place-items-center">
                <div className="md:w-3/12">
                    <Image src={Image1} alt="" />
                </div>
                <div className="lg:w-5/12 h-20 mx-auto ">
                    <h2 className="mb-8 text-center text-4xl font-bold italic tracking-wider transform hover:scale-110">
                        Insightful Dashboard.
                    </h2>
                    <span className="text-center flex mb-5 text-2xl leading-relaxed">
                        You can see the availability of goods in your own warehouse and manually add items, update
                        stock, choose items photo and delete items that are no longer used or replace existing items.<br />
                        So Join Now and Registration Your Accound.
                    </span>
                    <div className="flex p-2 text-center justify-center">
                        <button className="rounded-full text-semibld tracking-widest py-2 px-6 bg-yellow-300  hover:bg-yellow-400 w-40 h-10 transform hover:scale-110 md:text-lg">
                            <Link href="/register">Register</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insightful;