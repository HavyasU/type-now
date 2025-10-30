"use client";

import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

export interface TypingContextValueType {
  wpm: number;
  accuracy: number;
  setResults: (wpm: number, accuracy: number) => void;
  textContent: string;
  setTextContent: Dispatch<SetStateAction<string>>;
  visibleIndex: number;
  setVisibleIndex: Dispatch<SetStateAction<number>>;
  letterIndexRef: MutableRefObject<number>;
}

export const TypingContext = createContext<TypingContextValueType>({
  wpm: 0,
  accuracy: 0,
  setResults: () => {},
  textContent: "",
  setTextContent: () => {},
  visibleIndex: 0,
  setVisibleIndex: () => {},
  letterIndexRef: { current: -1 },
});
