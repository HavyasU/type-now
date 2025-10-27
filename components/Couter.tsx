import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "./ui/button";
export interface CounterRef {
  callStartTimerFunction: () => void;
}
const Counter = forwardRef((props, ref) => {
  const [timer, setTimer] = useState(3);

  const startTimerFunction = () => {
    const timeInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime == 0) {
          clearInterval(timeInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useImperativeHandle(ref, () => ({
    callStartTimerFunction: startTimerFunction,
  }));

  return (
    <div>
      <Button>{timer}s</Button>
    </div>
  );
});

Counter.displayName = "Counter";
export default Counter;
