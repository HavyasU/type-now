"use client";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
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
    actions: { setResults, setTimer, updateTimeLine,setTypingStatus },
    context: { wrongLetterIndex, timer , typingStatus},
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
      setTypingStatus("ended") 
    }
  },[timer, setTypingStatus])


  useEffect(()=>{
    if(typingStatus=="ended"){
      router.push("/type-test/result")
    }
  },[typingStatus, router])

 const startTimerFunction = () => {
  if (intervalRef.current) clearInterval(intervalRef.current);

  // Capture the start time
  const startTime = Date.now();
  const initialTimer = latestTimerRef.current; // e.g., 30

  intervalRef.current = setInterval(() => {
    setTimer((prev) => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, initialTimer - elapsedSeconds);
      const nextTime = remaining > 0 ? remaining : 0;

      // Use latest values from refs
      const totalTyped = Math.max(0, letterIndexRef.current + 1);
      const wrongCount = latestWrongRef.current.length;
      const correctCount = Math.max(0, totalTyped - wrongCount);

      // Elapsed time in minutes
      const minutes = elapsedSeconds / 60;
      const wpm = minutes > 0 ? Math.round((correctCount / 5) / minutes) : 0;
      const accuracy = totalTyped > 0 
        ? Math.round(Math.max(0, Math.min(100, (correctCount / totalTyped) * 100))) 
        : 0;

      // Update timeline with current elapsed second and stats
      updateTimeLine(elapsedSeconds, wpm, accuracy, wrongCount);
      setResults(wpm, accuracy);

      // Stop timer when time's up
      if (nextTime <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTypingStatus("ended"); // Ensure status is updated
        return 0;
      }

      return nextTime;
    });
  }, 1000);
};

  useImperativeHandle(ref, () => ({
    callStartTimerFunction: startTimerFunction,
  }));

  return <div>
    <Button   className="text-xl text-yellow-400 font-bold">{timer}s</Button>
  </div>;
});

Counter.displayName = "Counter";
export default Counter;
