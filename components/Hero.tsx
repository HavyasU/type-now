import React from "react";
import { Button } from "./ui/button";
import KeyBoardStyle from "./KeyBoardStyle/KeyBoardStyle";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="w-full p-5 flex justify-center flex-col items-center h-full">
      <KeyBoardStyle />
      <h1
        style={{
          fontSize: "10vw",
          fontFamily: "cursive",
          textShadow:
            "10px 10px 10px black,10px 10px 5px black, 10px 10px 40px cyan",
        }}>
        Type-Now
      </h1>
      <h3
        style={{ fontFamily: "monospace" }}
        className="text-2xl my-6 font-thin font-serif ">
        Take Your Typing to the Next Level!
      </h3>
      <Link href={"type-test"}>
        <Button
          className="cursor-pointer  px-10 bg-gray-300 hover:bg-gray-500 text-black rounded-lg font-bold py-6 "
          variant={"default"}>
          Test Now
        </Button>
      </Link>
    </div>
  );
};

export default Hero;
