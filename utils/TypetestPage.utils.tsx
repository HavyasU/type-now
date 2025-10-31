import { TextDataSet } from "@/components/Data/TextData";
import { playSound } from "./Playsound.util";
import React from "react";
import { RestrictedKeyType } from "@/constants/RestrictedKeys.costants";
import {
  CounterRefInterface,
  typingStatusType,
} from "@/constants/typing.constants";
import { CounterRef } from "@/components/Couter";
import { useTypeContext } from "@/context/TypingTestContext/TypingTestContextProvider";
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
    setTypingStatus,
    updateLetterIndex,
  } = actions;

  const { restrictedKeys, textContent, typingStatus } = context;
  const { e } = events;
  const { counterRef, letterIndexRef } = refs;
  const isKeyExists = restrictedKeys.some((ele) => ele == e.key);
  setIsCapsLockEnabled(e.getModifierState("CapsLock"));
  if (e.key === "Backspace") {
    const newIndex = Math.max(letterIndexRef.current - 1, -1);
    updateLetterIndex(newIndex);
  } else {
    if (!isKeyExists) {
      setKeyPressed(e?.key);
      if (e.key == textContent[letterIndexRef.current + 1]) {
        if (letterIndexRef.current == -1) {
          counterRef.current?.callStartTimerFunction();
        }
        // check if typed key is same as current letter of text
        playSound("/assets/audios/type-sound.mp3");
        updateLetterIndex(letterIndexRef.current + 1);
        e.preventDefault();
      } else {
      }
    }
  }
};

export const getRandomNumber = (length: number) => {
  // return 0;
  // const random = Math.floor(Math.random() * length);
  return 7;
};
