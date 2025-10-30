import { TextDataSet } from "@/components/Data/TextData";
import { playSound } from "./Playsound.util";
import React from "react";
import { RestrictedKeyType } from "@/constants/RestrictedKeys.costants";
import {
  CounterRefInterface,
  typingStatusType,
} from "@/constants/typing.constants";
import { CounterRef } from "@/components/Couter";

export const changeTypeText = (
  letterIndexRef: React.MutableRefObject<number>,
  setTextContent: (textContent: string) => void,
  setVisibleIndex: (num: number) => void,
) => {
  setTextContent(TextDataSet[Math.floor(Math.random() * 10)].content);
  setVisibleIndex(-1);
  letterIndexRef.current = -1;
};

interface keyDownEventHandlerParameters {
  e: KeyboardEvent;
  restrictedKeys: readonly RestrictedKeyType[];
  letterIndexRef: React.MutableRefObject<number>;
  setIsCapsLockEnabled: React.Dispatch<React.SetStateAction<boolean | null>>;
  updateLetterIndex: (value: number) => void;
  setKeyPressed: React.Dispatch<React.SetStateAction<string>>;
  textContent: string;
  typingStatus: typingStatusType;
  setTypingStatus: React.Dispatch<React.SetStateAction<typingStatusType>>;
  counterRef: React.RefObject<CounterRef | null>;
}

export const keyDownEventHandler = ({
  e,
  restrictedKeys,
  letterIndexRef,
  setIsCapsLockEnabled,
  setKeyPressed,
  textContent,
  typingStatus,
  setTypingStatus,
  updateLetterIndex,
  counterRef,
}: keyDownEventHandlerParameters) => {
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
