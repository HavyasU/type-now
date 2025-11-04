import { Button } from "@/components/ui/button";
import React from "react";
import Hero from "@/components/Hero";
// import Image from "next/image";
const page = () => {
  return (
    <div className="">
      <div className="w-full   select-none min-h-[90vh] max-md:min-h-[70vh] flex flex-col justify-center items-center">
        <Hero />
      </div>
      {/* <div className="footer bg-black p-4 w-full flex justify-between items-start ">
        <div className="">
          <h1>Type-Now</h1>
          <h3>Use the platform to master the typing speed.</h3>
        </div>
        <div className="font-thin list-none">
          <li>Home</li>
          <li>Type-test</li>
          <li>Leaderboard</li>
          <li>Support</li>
        </div>
        <div className="">
          <Image
            src="/assets/images/keyboard.png"
            alt=""
            height={200}
            width={200}
          />
        </div>
      </div> */}
    </div>
  );
};

export default page;
