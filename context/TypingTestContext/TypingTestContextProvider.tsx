"use client";

import React, {
  useContext,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { TypingContext, TypingContextValueType } from "./TypingTestContext";
import { TextDataSet } from "@/components/Data/TextData";
import { getRandomNumber } from "@/utils/TypetestPage.utils";

export const TypingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [textContent, setTextContent] = useState(() => {
    const randomIndex = getRandomNumber(TextDataSet.length);
    return TextDataSet[randomIndex].content;
  });
  const [visibleIndex, setVisibleIndex] = useState<number>(-1);
  const letterIndexRef = useRef(-1);
  const [wrongLetterIndex, setWrongLetterIndex] = useState<Array<number>>([]);

  const setResults = (wpm: number, accuracy: number) => {
    setAccuracy(accuracy);
    setWpm(wpm);
  };
  const updateWrongLetterIndex = (value: number) => {
    setWrongLetterIndex((prev) => [...prev, value]);
  };
  const values: TypingContextValueType = {
    actions: {
      setResults,
      setTextContent,
      setVisibleIndex,
      updateWrongLetterIndex,
    },
    context: {
      accuracy,
      textContent,
      visibleIndex,
      wpm,
      wrongLetterIndex,
    },
    ref: {
      letterIndexRef,
    },
  };
  return (
    <TypingContext.Provider value={values}>{children}</TypingContext.Provider>
  );
};

export const useTypeContext = (): TypingContextValueType => {
  const context = useContext(TypingContext);

  if (!context) {
    throw new Error("Error in Creating TypingContext Hook");
  }
  return context;
};
