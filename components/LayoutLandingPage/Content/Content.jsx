import React from 'react';
import ImageOne from '../../../public/images/image4.png';
import Link from "next/link";
import Image from "next/image";


const Content = () => {
  return (

    <div className='relative grid grid-cols-2 pt-64 pb-20'>

      <div className="pr-4 ml-48 max-w-prose">
        <Image src={ImageOne} alt='' className='' />
      </div>
      <div className='mt-16 ml-28 text-left gap-y-2'>
        <span className='text-2xl mb-2 tracking-wide'>Multi Purpose Inventory</span>
        <h1 className='mb-2 text-7xl tracking-wide'>SIMPLIFY <br /> ORGANIZING </h1>
        <h1 className="relative text-lg tracking-wide">we care a lot about your inventory, sometimes it take too much <br />
          time to handle. <br /> Our value is to bring simple and extraordinary management<br />
          system for you.</h1>
        <div className="flex text-center mt-4 relative">
          <button className="rounded-full py-3 px-6 bg-orange w-40 tracking-wider hover:bg-btn transform hover:scale-110">
            <Link href="/">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
