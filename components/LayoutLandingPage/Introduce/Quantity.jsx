import React from "react"
import ImageEleven from "../../../public/images/image11.png";
import Image from "next/image";

const Quantity = () => {
    return (

        <div id="Quantity" className="mx-10 mt-10">

            <div className="lg:w-5/12 mx-auto px-2 mb-20">
                <h2 className="text-center text-4xl font-bold tracking-wider transform hover:scale-110">
                    Quantity Check
                </h2>
            </div>

            <div className="relative grid grid-cols-3 gap-x-6 place-items-start my-44">
                <div className="relative text-center text-2xl tracking-wider leading-relaxed md:mt-0 md:ml-16 pt-20">
                    <span className=""> You can manage Stock In, Stock Out and Goods Available in your own Warehouse <br />

                    </span>
                </div>

                <div className="max-w-prose ml-10 md:w-full">
                    <Image src={ImageEleven} alt="" />
                </div>

                <div className="relative text-left text-2xl tracking-widest leading-loose md:mt-0 md:ml-16 pt-20">
                    <span className=""> Notification</span>
                    <br />
                    <span className="">Stock Items Check</span>
                    <br />
                    <span className="">Add A New and old Items</span>
                    <br />
                    <span className="">Placed In A Private Warehouse</span>
                </div>
            </div>
        </div>

    );
};

export default Quantity;