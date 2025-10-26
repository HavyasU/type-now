"use client";
import React, { useEffect, useRef, useState } from "react";
import { TextDataSet } from "./Data/TextData";
import { playSound } from "@/utils/Playsound.util";
import TestPageControls from "./TestPageControls";
import { changeTypeText, getColoredText } from "@/utils/TypetestPage.utils";

const TextToType = () => {
  const restrictedKeys = [
    "Alt",
    "Enter",
    "Control",
    "Escape",
    "Shift",
    "CapsLock",
  ];
  const [randomNum] = useState(0);

  const [TextContent, setTextContent] = useState(
    TextDataSet[randomNum].content
  );
  const letterIndexRef = useRef(-1);
  const [visibleIndex, setVisibleIndex] = useState<number>(-1);
  const [keyPressed, setKeyPressed] = useState<string>("");
  const [isCapsLockEnabled, setIsCapsLockEnabled] = useState<boolean | null>(
    false
  );

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      const isKeyExists = restrictedKeys.some((ele) => ele == e.key);
      playSound("/assets/audios/type-sound.mp3");
      setIsCapsLockEnabled(e.getModifierState("CapsLock"));
      if (e.key === "Backspace") {
        setVisibleIndex((prev) => {
          const newIndex = Math.max(prev - 1, -1);
          letterIndexRef.current = newIndex;
          return newIndex;
        });
      } else {
        if (!isKeyExists) {
          setKeyPressed(e?.key);
          if (e.key == TextContent[letterIndexRef.current + 1]) {
            setVisibleIndex((prev) => {
              letterIndexRef.current = prev + 1;
              return prev + 1;
            });
            e.preventDefault();
          } else {
          }
        }
      }
    });

    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, [TextContent]);

  return (
    <div className="px-16">
      <TestPageControls
        isCapsLockEnabled={isCapsLockEnabled}
        changeTypeText={() =>
          changeTypeText(letterIndexRef, setTextContent, setVisibleIndex)
        }
      />
      <div className="text-white select-none p-6 rounded-md bg-zinc-900   text-justify my-4  font-serif font-semibold  text-2xl  ">
        <h3 className="tracking-wide select-none min-h-1/2 leading-16 ">
          {getColoredText(TextContent, visibleIndex, letterIndexRef)}
        </h3>
      </div>
      <div className="flex flex-col justify-center  items-center w-full overflow-hidden">
        <h2 className="text-4xl mt-2 font-extrabold ">{keyPressed}</h2>
      </div>
    </div>
  );
};

export default TextToType;
