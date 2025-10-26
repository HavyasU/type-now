import React, { useState } from "react";
import { Button } from "./ui/button";

const Couter = () => {
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

  return (
    <div>
      <Button>{timer}s</Button>
    </div>
  );
};

export default Couter;
