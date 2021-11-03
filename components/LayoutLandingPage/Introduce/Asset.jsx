import React from "react"
import ImageNine from "../../../public/images/image9.png";
import Image from "next/image";

const Asset = () => {
    return (

        <div id="Asset" className="mx-10 mt-44 mb-44">

            <div className="relative grid grid-cols-2 gap-x-20 place-items-start mx-12 my-10">
                <div className="relative text-center text-2xl tracking-wider leading-relaxed ml-24 md:mt-0 md:ml-16 pt-20">
                    <h2 className="text-center text-4xl font-bold tracking-wider transform hover:scale-110 mb-16">
                        Asset Registration
                    </h2>
                    <span>Traditionally the maintenance of goods using a written book.
                        in the goodang application you can add and create your own warehouse which has been directly recorded in the <span className="font-semibold underline">Goodang</span> apps.<br /><br /><br />
                    </span>
                    {/* <span className="underline">
                        CREATE READ UPDATE AND DELETE
                    </span>
                    <div className="absolute text-left text-2xl mt-5 tracking tracking-widest leading-loose">
                        <span>
                            READ  Item Availability<br />
                            UPDATE Stock Items<br />
                            CREATE Account and Warehouse <br />
                            DELETE Unused Items
                        </span>
                    </div> */}
                </div>
                <div className="max-w-prose  md:w-full">
                    <Image src={ImageNine} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Asset;