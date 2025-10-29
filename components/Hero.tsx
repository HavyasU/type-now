import React from "react";
import { Button } from "./ui/button";
import KeyBoardStyle from "./KeyBoardStyle/KeyBoardStyle";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="w-full p-5 flex justify-center flex-col items-center h-full">
      <KeyBoardStyle />
      <div className="w-2/3 text-center">
        <h1 className="parkinsans-font text-glow font-bold text-6xl">
          Type Fast, Stay Sharp,{" "}
          <span className="text-amber-300  text-glow-gold">TypeNow</span>.
        </h1>
        <h3 className="text-2xl px-16 my-3 mt-6  playfair-font  ">
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
