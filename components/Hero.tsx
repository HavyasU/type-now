import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="w-full p-5 max-lg:p-2 flex justify-center flex-col items-center h-full ">
      <div className="w-2/3 max-lg:w-4/5 text-center">
        <h1 className="parkinsans-font max-lg:text-4xl max-md:text-3xl text-glow font-bold text-6xl">
          Type Fast, Stay Sharp,{" "}
          <span className="text-amber-300  text-glow-gold">TypeNow</span>.
        </h1>
        <h3 className="text-2xl max-lg:px-10 max-lg:text-xl max-md:text-sm  max-md:px-0  px-16 my-3  mt-6  playfair-font  ">
          Challenge yourself with real-time typing tests, track progress, and
          master the art of precision typing — all in one sleek,
          distraction-free platform.
        </h3>
      </div>
      <Link href={"type-test"}>
        <Button
          className="cursor-pointer text-xl  px-6 bg-gray-100 hover:bg-gray-300 text-black rounded-lg font-bold py-6 mt-5 "
          variant={"default"}>
          Test Now
        </Button>
      </Link>
    </div>
  );
};

export default Hero;
