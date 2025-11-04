"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function ReactConfettiPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="w-full flex justify-center flex-col h-full overflow-hidden py-10 px-24">
      {windowSize.width > 0 && (
        <ReactConfetti width={windowSize.width} height={windowSize.height} />
      )}
      {/* other result content */}
    </div>
  );

}


