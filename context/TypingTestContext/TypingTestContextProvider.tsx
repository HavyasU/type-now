"use client";

import React, {  useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { TypingContext, TypingContextValueType } from "./TypingTestContext";
import { TextDataSet } from "@/components/Data/TextData";
import { getRandomNumber } from "@/utils/TypetestPage.utils";
import { TimeLineType } from "@/Types/TimeLineType";
import { typingStatusType } from "@/constants/typing.constants";

export const TypingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);  
  const [textContent, setTextContent] = useState("")
  const [visibleIndex, setVisibleIndex] = useState<number>(-1);
  const letterIndexRef = useRef(-1);
  const [wrongLetterIndex, setWrongLetterIndex] = useState<number[]>([]);
  //NOTE: Timer in seconds
  const [timer, setTimer] = useState<number>(30); 
  const [timeline,setTimeLine]  = useState<TimeLineType>([])
  const [typingStatus, setTypingStatus] =
    useState<typingStatusType>("no-started");

 

  const setResults = (wpm: number, accuracy: number) => {
  setAccuracy(accuracy);
  setWpm(wpm);
  }

  const loadNewText = ()=>{
    const randomIndex = getRandomNumber();
    setTextContent(TextDataSet[randomIndex].content);
  }

  

  const updateWrongLetterIndex = (value: number) => {
    if (value >= 0 && value < textContent.length) {
      setWrongLetterIndex((prev) =>
        prev.includes(value) ? prev : [...prev, value]
      );
    }

  };

  const clearWrongLetterIndex = ()=>{
    setWrongLetterIndex([])
  }

  const updateTimeLine = ( second:number,wpm:number, accuracy:number, errors:number ) => {
    setTimeLine((prev)=>[...prev,{second, wpm, accuracy, errors}]);
  }

  const resetTest = ()=>{
    setTimer(30);
    setTimeLine([])
    letterIndexRef.current = -1;
    const randomIndex = getRandomNumber();
    setTextContent(TextDataSet[randomIndex].content);
    setVisibleIndex(-1);
    setWrongLetterIndex([]);
    setWpm(0);
    setAccuracy(0);
    setTypingStatus("no-started")
  }


  const values: TypingContextValueType = {
    actions: {
      setResults,
      setTextContent,
      setVisibleIndex,
      updateWrongLetterIndex,
      setTimer,
      updateTimeLine,
      resetTest,
      loadNewText,
      setTypingStatus,
      clearWrongLetterIndex
    },
    context: {
      accuracy,
      textContent,
      visibleIndex,
      wpm,
      wrongLetterIndex,
      timeline,
      timer,
      typingStatus
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
