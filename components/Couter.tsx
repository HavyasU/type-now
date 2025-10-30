"use client";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
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
  const [timer, setTimer] = useState(30);
  const { textContent, setResults, letterIndexRef } = useContext(TypingContext);
  const calculateResult = () => {
    const wpm = letterIndexRef.current / 5 / 0.5;
    setResults(wpm, 0);
    router.push("/type-test/result");
  };

  const startTimerFunction = () => {
    const timeInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime == 0) {
          calculateResult();
          clearInterval(timeInterval);
          setTimer(30);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useImperativeHandle(ref, () => ({
    callStartTimerFunction: startTimerFunction,
  }));

  return <Button className="text-3xl px-5 py-3">{timer}s</Button>;
});

Counter.displayName = "Counter";
export default Counter;
