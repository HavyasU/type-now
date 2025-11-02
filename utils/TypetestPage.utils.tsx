import { TextDataSet } from "@/components/Data/TextData";
import { playSound } from "./Playsound.util";
import React, { useEffect } from "react";
import keyDownEventHandlerParameters from "@/Types/TypingTest.types";

export const changeTypeText = (
  letterIndexRef: React.MutableRefObject<number>,
  setTextContent: (textContent: string) => void,
  setVisibleIndex: (num: number) => void,
) => {
  setTextContent(TextDataSet[Math.floor(Math.random() * 10)].content);
  setVisibleIndex(-1);
  letterIndexRef.current = -1;
};

export const keyDownEventHandler = ({
  actions,
  context,
  events,
  refs,
}: keyDownEventHandlerParameters) => {
  const {
    setIsCapsLockEnabled,
    setKeyPressed,
    updateLetterIndex,
    updateWrongLetterIndex,
  } = actions;

  const { restrictedKeys, textContent } = context;
  const { e } = events;
  const { counterRef, letterIndexRef } = refs;
  const isKeyExists = restrictedKeys.some((ele) => ele == e.key);
  setIsCapsLockEnabled(e.getModifierState("CapsLock"));
  if (e.key === "Backspace") {
    const newIndex = Math.max(letterIndexRef.current - 1, -1);
    updateLetterIndex(newIndex);
  } else {
    
  }
  
  if (!isKeyExists) {
      const nextIndex = letterIndexRef.current + 1;
      setKeyPressed(e.key);
      
      if (nextIndex < textContent.length) {
        if (e.key === textContent[nextIndex]) {
          if (letterIndexRef.current == -1) {
            counterRef.current?.callStartTimerFunction();
          }
          playSound("/assets/audios/type-sound.wav");
          updateLetterIndex(nextIndex);
          setKeyPressed(textContent[nextIndex+1]);
        } else {
          updateWrongLetterIndex(nextIndex);
          setKeyPressed(e.key);
        }
        e.preventDefault();
      }
    }
};


export const getRandomNumber = () => {
  // return 0;
  // const random = Math.floor(Math.random() * length);
  return 7;
};
