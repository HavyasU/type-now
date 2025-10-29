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
  setVisibleIndex: React.Dispatch<React.SetStateAction<number>>;
  setKeyPressed: React.Dispatch<React.SetStateAction<string>>;
  TextContent: string;
  typingStatus: typingStatusType;
  setTypingStatus: React.Dispatch<React.SetStateAction<typingStatusType>>;
  counterRef: React.RefObject<CounterRef | null>;
}

export const keyDownEventHandler = ({
  e,
  restrictedKeys,
  letterIndexRef,
  setIsCapsLockEnabled,
  setVisibleIndex,
  setKeyPressed,
  TextContent,
  typingStatus,
  setTypingStatus,
  counterRef,
}: keyDownEventHandlerParameters) => {
  const isKeyExists = restrictedKeys.some((ele) => ele == e.key);
  setIsCapsLockEnabled(e.getModifierState("CapsLock"));
  if (e.key === "Backspace") {
    setVisibleIndex((prev) => {
      const newIndex = Math.max(prev - 1, -1);
      letterIndexRef.current = newIndex;
      return newIndex;
    });
  } else {
    if (!isKeyExists) {
      setKeyPressed(e?.key);
      if (e.key == TextContent[letterIndexRef.current + 1]) {
        playSound("/assets/audios/type-sound.mp3");
        setVisibleIndex((prev) => {
          letterIndexRef.current = prev + 1;
          return prev + 1;
        });
        e.preventDefault();
      } else {
      }
    }
  }
};

export const getRandomNumber = (length: number) => {
  return 0;
  // const random = Math.floor(Math.random() * length);
  // return random;
};
