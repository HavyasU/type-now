"use client";

import { TimeLineType } from "@/Types/TimeLineType";
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
    timer: number;
    timeline?: TimeLineType ;
  };
  actions: {
    setResults: (wpm: number, accuracy: number) => void;
    setTextContent: Dispatch<SetStateAction<string>>;
    setVisibleIndex: Dispatch<SetStateAction<number>>;
    updateWrongLetterIndex: (value: number) => void;
    setTimer: Dispatch<SetStateAction<number>>;
    updateTimeLine:( second:number,wpm:number, accuracy:number, errors:number )=>void
    resetTest:()=>void
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
    timeline: [{ second:0, wpm:0, accuracy:0, errors:0}],
    timer:0
  },
  actions: {
    setResults: () => {},
    setTextContent: () => {},
    setVisibleIndex: () => {},
    updateWrongLetterIndex: () => {},
    setTimer: () => {},
    updateTimeLine:()=>{},
    resetTest:()=>{}
  },
  ref: {
    letterIndexRef: { current: -1 },
  },
});
