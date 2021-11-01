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
                    <span className="text-center flex mb-5 text-xl leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel quaerat eius asperiores, tempora voluptatum quisquam velit aliquam, ad esse pariatur error quibusdam repellat dolores suscipit dolor quidem assumenda minima odit.
                    </span>
                    <div className="flex p-2 text-center justify-center">
                        <button className="rounded-full tracking-widest py-2 px-6 bg-yellow-300  hover:bg-yellow-400 w-auto transform hover:scale-110 md:text-sm">
                            <Link href="/register">Sign Up</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Insightful;