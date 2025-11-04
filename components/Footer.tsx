import { Keyboard } from 'lucide-react';
import React from 'react';

const Footer = () => {
    return (
        <div className=' flex justify-center min-h-40 items-center flex-col bg-black' >
          <section>
                <div className=" mx-3 flex gap-2 flex-row w-fit h-full">
        <Keyboard />
        <h1>Type-now</h1>
      </div>
          </section>
          <section className='flex justify-center items-center flex-col ' >
              <h1>&copy; <span className='font-extrabold text-amber-400' >Type-Now</span> - All Rights Reserved</h1>
            <h3>Developed  by <a className=" font-bold text-amber-300"  href="http://havyas.vercel.app">Havyas U</a> </h3>
          </section>

                  </div>
    );
};

export default Footer;
