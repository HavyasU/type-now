"use client";

import React, {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
} from "react";

export interface TypingContextValueType {
  context: {
    wpm: number;
    accuracy: number;
    textContent: string;
    visibleIndex: number;
    wrongLetterIndex: number[];
  };
  actions: {
    setResults: (wpm: number, accuracy: number) => void;
    setTextContent: Dispatch<SetStateAction<string>>;
    setVisibleIndex: Dispatch<SetStateAction<number>>;
    updateWrongLetterIndex: (value: number) => void;
  };
  ref: {
    letterIndexRef: MutableRefObject<number>;
  };
}

export const TypingContext = createContext<TypingContextValueType>({
  context: {
    wpm: 0,
    accuracy: 0,
    visibleIndex: 0,
    textContent: "",
    wrongLetterIndex: [],
  },
  actions: {
    setResults: () => {},
    setTextContent: () => {},
    setVisibleIndex: () => {},
    updateWrongLetterIndex: () => {},
  },
  ref: {
    letterIndexRef: { current: -1 },
  },
});
