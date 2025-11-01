"use client";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "./ui/button";
import { TypingContext } from "@/context/TypingTestContext/TypingTestContext";
import { useRouter } from "next/navigation";

export interface CounterRef {
  callStartTimerFunction: () => void;
}

const Counter = forwardRef((props, ref) => {
  const router = useRouter();
  const {
    actions: { setResults, setTimer, updateTimeLine },
    context: { wrongLetterIndex, timer },
    ref: { letterIndexRef },
  } = useContext(TypingContext);

  const latestWrongRef = useRef<number[]>(wrongLetterIndex);
  const latestTimerRef = useRef<number>(timer);
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // keep refs in sync so interval callback can read latest values without stale closure
  React.useEffect(() => {
    latestWrongRef.current = wrongLetterIndex;
  }, [wrongLetterIndex]);
  React.useEffect(() => {
    // console.log("Timer updated:", timer);
    latestTimerRef.current = timer;
  }, [timer]);

  

  useEffect(()=>{
    if(timer==0)
    {
      router.push("/type-test/result")
    }
  },[timer, router])

  const startTimerFunction = () => {
    if (intervalRef.current) clearInterval(intervalRef.current!)

    intervalRef.current = setInterval(() => {
      // Use functional updater to ensure we base on the latest prev value
      setTimer((prev) => {
        const nextTime = prev - 1;

        // read latest values from refs/context
        const totalTyped = Math.max(0, letterIndexRef.current + 1);
        const wrongCount = latestWrongRef.current.length;
        const correctCount = Math.max(0, totalTyped - wrongCount);

        // elapsed minutes (we track from 60 seconds total; adjust if timer not 60)
        const minutes = (timer - prev) / 60;
        const wpm = minutes > 0 ? (correctCount / 5) / minutes : 0;
        const accuracy = totalTyped > 0 ? Math.max(0, Math.min(100, (correctCount / totalTyped) * 100)) : 0;

        // push to timeline with current second (prev) and current stats
        updateTimeLine(prev, Math.round(wpm), Math.round(accuracy), wrongCount);

        if (nextTime <= 0) {
          setResults(Math.round(wpm), Math.round(accuracy));
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }

        return nextTime;
      });
    }, 1000);
  }


  useImperativeHandle(ref, () => ({
    callStartTimerFunction: startTimerFunction,
  }));

  return <div>
    <Button className="text-3xl px-5 py-3">{timer}s</Button>
    {wrongLetterIndex.length}
  </div>;
});

Counter.displayName = "Counter";
export default Counter;
