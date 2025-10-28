import React from "react";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";
import Counter, { CounterRef } from "./Couter";

const TestPageControls = ({
  counterRef,
  isCapsLockEnabled,
  changeTypeText,
}: {
  counterRef: React.RefObject<CounterRef | null>;
  isCapsLockEnabled: boolean | null;
  changeTypeText: () => void;
}) => {
  return (
    <div className="controls my-5 flex justify-between gap-2 ">
      {/* <Button
        className=" hover:bg-slate-800 cursor-pointer"
        onClick={() => {
          changeTypeText();
        }}>
        <RefreshCw />
        Change Text
      </Button> */}

      <p
        style={{
          textShadow: "2px 3px 20px white",
        }}
        className="text-2x w-full text-red-400 font-bold">
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
      </p>
      {/* <Counter ref={counterRef} /> */}
    </div>
  );
};

export default TestPageControls;
