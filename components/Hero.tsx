import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="w-full p-5 flex justify-center flex-col items-center h-full">
      <h3 className="text-3xl mb-5 font-bold">Take Typing Test Now!</h3>
      <Button className="cursor-pointer" variant={"default"}>
        Test Now
      </Button>
    </div>
  );
};

export default Hero;
