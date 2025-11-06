import React from "react";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";
import Counter from "./Counter";
import { CounterRefInterface } from "@/constants/typing.constants";

const TestPageControls = ({
  counterRef,
  isCapsLockEnabled,
  changeTypeText,
}: {
  counterRef: React.RefObject<CounterRefInterface | null>;
  isCapsLockEnabled: boolean | null;
  changeTypeText: () => void;
}) => {
  return (
    <div className="controls  items-center justify-center flex gap-2  h-fit w-full  ">
       <div className="">
        <Counter
        ref={counterRef}
      />
      </div>
      <Button
        className=" hover:bg-slate-800 cursor-pointer"
        onClick={() => {
          changeTypeText();
        }}>
        <RefreshCw />
        Change Text
      </Button>

      <div
        style={{
          textShadow: "2px 3px 20px white",
        }}
        className="text-2xl max-md:hidden text-red-400 font-bold">
        <Button
          className={
            `${
              isCapsLockEnabled
                ? " bg-slate-800 shadow-sm shadow-yellow-200 text-yellow-300 "
                : "bg-slate-900"
            }` + " hover:bg-slate-800 cursor-pointer"
          }>
          {isCapsLockEnabled ? "Caps Lock On" : "Caps Lock Off"}
        </Button>
      </div>
     
    </div>
  );
};

export default TestPageControls;
