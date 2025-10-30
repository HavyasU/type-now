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
import { CounterRef } from "./Couter";
import GetColoredText from "./ColoredTextComponent";
import { useTypeContext } from "@/context/TypingTestContext/TypingTestContextProvider";

const TextToType = () => {
  const [random, setRandom] = useState<number>(0);
  const counterRef = useRef<CounterRef | null>(null);

  const {
    textContent,
    setTextContent,
    letterIndexRef,
    setVisibleIndex,
    visibleIndex,
  } = useTypeContext();

  const [keyPressed, setKeyPressed] = useState<string>("");
  const [isCapsLockEnabled, setIsCapsLockEnabled] = useState<boolean | null>(
    false,
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
        e,
        restrictedKeys: restrictedKeysData,
        letterIndexRef,
        updateLetterIndex,
        setIsCapsLockEnabled,
        setKeyPressed,
        textContent,
        typingStatus,
        setTypingStatus,
        counterRef,
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
      <div className="text-white select-none p-6 rounded-md bg-zinc-900   text-justify my-4  font-serif font-semibold  text-2xl  ">
        <h3 className="tracking-wide select-none min-h-1/2 leading-16 ">
          {/* {getColoredText(textContent, visibleIndex, letterIndexRef)} */}

          <GetColoredText
            textContent={textContent}
            letterIndexRef={letterIndexRef}
            visibleIndex={visibleIndex}
          />
        </h3>
      </div>
      <div className="flex flex-col justify-center select-none  items-center w-full overflow-hidden">
        <h2 className="text-2xl  ">
          {keyPressed && keyPressed != textContent[visibleIndex] && (
            <div className="text-center">
              <p className="text-red-400  mt-2 font-bold">
                Wrong key!
                {keyPressed == " " ? " Space " : " (" + keyPressed + ") "}
              </p>
              <p className="text-green-200 font-semibold ">
                Please Press
                {textContent[visibleIndex + 1] == " "
                  ? " (Space) "
                  : " (" + textContent[visibleIndex + 1] + ") "}
              </p>
            </div>
          )}
        </h2>
      </div>
    </div>
  );
};

export default TextToType;
