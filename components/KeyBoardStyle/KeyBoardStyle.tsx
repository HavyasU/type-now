"use client";
import React from "react";
const KeyLetters = ({ letter }: { letter: string }) => {
  return (
    <h1
      style={{
        fontSize: "5vw",
        textShadow: "10px 10px 10px black, 10px 10px 40px cyan",
        position: "absolute",
        // top:,
        opacity: 0.1,
      }}>
      {letter}
    </h1>
  );
};

const KeyBoardStyle = () => {
  return <div>{/* <KeyLetters letter="Q" /> */}</div>;
};

export default KeyBoardStyle;
