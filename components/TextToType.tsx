"use client";
import React, { useEffect, useRef, useState } from "react";
import TestPageControls from "./TestPageControls";
import {
  changeTypeText,
  // getRandomNumber,
  keyDownEventHandler,
} from "@/utils/TypetestPage.utils";
import { restrictedKeysData } from "@/constants/RestrictedKeys.costants";
import { CounterRef } from "./Counter";
import GetColoredText from "./ColoredTextComponent";
import { useTypeContext } from "@/context/TypingTestContext/TypingTestContextProvider";

const TextToType = () => {
  const counterRef = useRef<CounterRef | null>(null);

  const {
    context: { visibleIndex, textContent, wrongLetterIndex ,typingStatus, wpm , accuracy},
    ref: { letterIndexRef },

    actions: { setVisibleIndex, setTextContent, updateWrongLetterIndex, loadNewText ,setTypingStatus},
  } = useTypeContext();

  const [keyPressed, setKeyPressed] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isCapsLockEnabled, setIsCapsLockEnabled] = useState<boolean | null>(
    false
  );

  const updateLetterIndex = (value: number) => {
    letterIndexRef.current = value;
    setVisibleIndex(value);
  };

  useEffect(()=>{
    loadNewText()
  },[])

  
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
  }, [textContent, typingStatus, wrongLetterIndex, counterRef, letterIndexRef, updateWrongLetterIndex, setTypingStatus]);

const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const lastChar = value[value.length - 1];
  if (!lastChar) return;

  keyDownEventHandler({
    events: { e: { key: lastChar } as unknown as KeyboardEvent },
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
    refs: { counterRef, letterIndexRef },
    isMobile: true, // 👈 Important flag
  });

  setTimeout(() => {
    e.target.value = "";
  }, 10);
};

  useEffect(() => {
  const focusInput = () => inputRef.current?.focus();
  window.addEventListener("touchstart", focusInput);
  window.addEventListener("click", focusInput);
  return () => {
    window.removeEventListener("touchstart", focusInput);
    window.removeEventListener("click", focusInput);
  };
}, []);


  const changeTypeTextHandler = () => {
    changeTypeText(letterIndexRef, setTextContent, setVisibleIndex);
  };

  
  return (
    <div className="px-10 max-lg:px-5   h-[80vh] mt-3 w-full flex flex-col justify-center items-center ">
      <div className="w-full max-md:h-[10vh]  h-fit flex gap-1 flex-col justify-center items-center    ">
           <TestPageControls
          counterRef={counterRef} 
          isCapsLockEnabled={isCapsLockEnabled}
          changeTypeText={changeTypeTextHandler}
        />
        <div className="flex flex-col justify-center select-none h-1/2  items-center overflow-hidden">
          <h2 className="text-2xl  ">
            {keyPressed && keyPressed !== textContent[visibleIndex] && (
              <div  className="text-center flex min-h-14 justify-center items-center  gap-3 ">
                <div className="text-white text-2xl rounded-lg max-md:h-5 max-md:px-3 max-md:text-lg  h-10 w-full px-5 text-center items-center flex justify-center  bg-red-500 font-bold">
                  <p> {keyPressed == " " ? " Space " : " " + keyPressed + " "}</p>
                </div>
                <div className="text-white text-2xl rounded-lg max-md:h-5 max-md:px-3 max-md:text-lg h-10 w-full  px-5 text-center items-center flex justify-center  bg-green-500 font-bold">

                  <p>  {textContent[visibleIndex + 1] == " "
                    ? " Space "
                    : " " + textContent[visibleIndex + 1] + ""}</p>
                </div>
              </div>
            )}


          </h2>
             <input
            ref={inputRef}
            type="text"
            className="absolute opacity-0 h-0 w-0"
            onChange={handleMobileInput}
            autoFocus
          />
        </div>
      </div>
      <div className="">
      <p>{wpm}</p>
      <p>{accuracy}</p>
      </div>
      <div className="text-white select-none p-6 max-lg:px-0 max-lg:py-2 rounded-md  montserrat-font   text-justify   font-serif font-semibold  text-2xl  ">
        <h3 style={
          {
            letterSpacing: "2px"
          }
        } className=" px-28 max-lg:px-0 tracking-wider max-md:mt-3 select-none h-3/4 leading-14  max-md:text-lg  max-md:tracking-tighter max-md:leading-7">
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
