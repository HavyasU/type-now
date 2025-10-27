"use client";
import React, { useEffect, useRef, useState } from "react";
import { TextDataSet } from "./Data/TextData";
import TestPageControls from "./TestPageControls";
import {
  changeTypeText,
  // getRandomNumber,
  keyDownEventHandler,
} from "@/utils/TypetestPage.utils";
import { CounterRef } from "./Couter";
import { restrictedKeysData } from "@/constants/RestrictedKeys.costants";
import { getColoredText } from "./ColoredTextComponent";

const TextToType = () => {
  const [random, setRandom] = useState<number>(0);
  const [TextContent, setTextContent] = useState(TextDataSet[random].content);
  const letterIndexRef = useRef(-1);
  const counterRef = useRef<CounterRef>(null);

  const [visibleIndex, setVisibleIndex] = useState<number>(-1);
  const [keyPressed, setKeyPressed] = useState<string>("");
  const [isCapsLockEnabled, setIsCapsLockEnabled] = useState<boolean | null>(
    false,
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keyDownEventHandler({
        e,
        restrictedKeys: restrictedKeysData,
        letterIndexRef,
        setIsCapsLockEnabled,
        setKeyPressed,
        setVisibleIndex,
        TextContent,
      });
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const changeTypeTextHandler = () => {
    changeTypeText(letterIndexRef, setTextContent, setVisibleIndex);
  };

  return (
    <div className="px-16">
      <TestPageControls
        counterRef={counterRef}
        isCapsLockEnabled={isCapsLockEnabled}
        changeTypeText={changeTypeTextHandler}
      />
      <div
        style={{
          fontFamily: "cursive",
        }}
        className="text-white select-none p-6 rounded-md bg-zinc-900   text-justify my-4  font-serif font-semibold  text-2xl  ">
        <h3 className="tracking-wide select-none min-h-1/2 leading-16 ">
          {getColoredText(TextContent, visibleIndex, letterIndexRef)}
        </h3>
      </div>
      <div className="flex flex-col justify-center select-none  items-center w-full overflow-hidden">
        <h2 className="text-2xl  ">
          {keyPressed && keyPressed != TextContent[visibleIndex] && (
            <div className="text-center">
              <p className="text-red-400  mt-2 font-bold">
                Wrong key!
                {keyPressed == " " ? " Space " : " (" + keyPressed + ") "}
              </p>
              <p className="text-green-200 font-semibold ">
                Please Press
                {TextContent[visibleIndex + 1] == " "
                  ? " (Space) "
                  : " (" + TextContent[visibleIndex + 1] + ") "}
              </p>
            </div>
          )}
        </h2>
      </div>
    </div>
  );
};

export default TextToType;
