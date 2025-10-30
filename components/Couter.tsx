import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "./ui/button";
export interface CounterRef {
  callStartTimerFunction: () => void;
}
const Counter = forwardRef((props, ref) => {
  const [timer, setTimer] = useState(30);

  const startTimerFunction = () => {
    const timeInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime == 0) {
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
