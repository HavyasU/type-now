"use client";
import React, { useEffect, useRef, useState } from "react";
import TestPageControls from "./TestPageControls";
import {
  changeTypeText,
  // getRandomNumber,
  keyDownEventHandler,
} from "@/utils/TypetestPage.utils";
import { restrictedKeysData } from "@/constants/RestrictedKeys.costants";
import { typingStatusType } from "@/constants/typing.constants";
import { CounterRef } from "./Counter";
import GetColoredText from "./ColoredTextComponent";
import { useTypeContext } from "@/context/TypingTestContext/TypingTestContextProvider";

const TextToType = () => {
  // const [random, setRandom] = useState<number>(0);
  const counterRef = useRef<CounterRef | null>(null);

  const {
    context: { visibleIndex, textContent, wrongLetterIndex },
    ref: { letterIndexRef },

    actions: { setVisibleIndex, setTextContent, updateWrongLetterIndex },
  } = useTypeContext();

  const [keyPressed, setKeyPressed] = useState<string>("");
  const [isCapsLockEnabled, setIsCapsLockEnabled] = useState<boolean | null>(
    false
  );

  const updateLetterIndex = (value: number) => {
    letterIndexRef.current = value;
    setVisibleIndex(value);
  };

  const [typingStatus, setTypingStatus] =
    useState<typingStatusType>("no-started");
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keyDownEventHandler({
        events: {
          e,
        },
        actions: {
          setIsCapsLockEnabled,
          setKeyPressed,
          setTypingStatus,
          updateLetterIndex,
          updateWrongLetterIndex,
        },
        context: {
          restrictedKeys: restrictedKeysData,
          textContent,
          typingStatus,
          wrongLetterIndex,
        },
        refs: {
          counterRef,
          letterIndexRef,
        },
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

  useEffect(() => {
    console.log(keyPressed)
  }, [keyPressed])

  return (
    <div className="px-10  h-[80vh] w-full flex flex-col justify-center items-center ">
      <div className="w-full  h-1/5 flex gap-5 flex-col justify-center items-center    ">
        <div className="h-1/2 w-full">
           <TestPageControls
          counterRef={counterRef} 
          isCapsLockEnabled={isCapsLockEnabled}
          changeTypeText={changeTypeTextHandler}
        />
        </div>
        <div className="flex flex-col justify-center select-none h-1/2  items-center overflow-hidden">
          <h2 className="text-2xl  ">
            {keyPressed && keyPressed !== textContent[visibleIndex + 1] && (
              <div className="text-center flex min-h-14 justify-center items-center  gap-3 ">
                <div className="text-white text-2xl rounded-lg  h-10 w-full px-5 text-center items-center flex justify-center  bg-red-500 font-bold">
                  <p> {keyPressed == " " ? " Space " : " " + keyPressed + " "}</p>
                </div>
                <div className="text-white text-2xl rounded-lg h-10 w-full  px-5 text-center items-center flex justify-center  bg-green-500 font-bold">

                  <p>  {textContent[visibleIndex + 1] == " "
                    ? " Space "
                    : " " + textContent[visibleIndex + 1] + ""}</p>
                </div>
              </div>
            )}


          </h2>
        </div>
      </div>
      <div className="text-white select-none p-6 rounded-md  montserrat-font   text-justify   font-serif font-semibold  text-2xl  ">
        <h3 style={
          {
            letterSpacing: "4px"
          }
        } className=" px-28 tracking-wider select-none min-h-1/2 leading-14 ">
          {/* {getColoredText(textContent, visibleIndex, letterIndexRef)} */}

          <GetColoredText
            textContent={textContent}
            letterIndexRef={letterIndexRef}
            visibleIndex={visibleIndex}
          />
        </h3>
      </div>

    </div>
  );
};

export default TextToType;
