"use client";

import { useTypeContext } from "@/context/TypingTestContext/TypingTestContextProvider";
import { useRouter } from "next/navigation";

import React, { useLayoutEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Button } from "../ui/button";

const ResultPage = () => {
  const {
    context: { wpm, accuracy, timeline, wrongLetterIndex },
    actions: { setTimer, resetTest }
  } = useTypeContext();
  const router = useRouter();

  const handleResetTest = (e: React.MouseEvent) => {
    resetTest();
  }

  useLayoutEffect(() => {
    if (wpm === 0) {
      router.push("/type-test");
    }
  }, [wpm, router]);

  const data = [{
    name: "Test 1",
    wpm: 52,
    accuracy: 89,
    correctWords: 63,
    errors: 7,
  }]


  return (
    <div className="w-full flex justify-between h-full p-28">
      <div className="flex flex-col">
        <div className="my-6 flex flex-col  ">
          <h2 className="text-4xl font-extrabold">WPM</h2>
          <h3 className="text-3xl italic text-yellow-200 font-bold my-2 ">
            {wpm}
          </h3>
        </div>
        <div className="my-6">
          <h2 className="text-4xl font-extrabold">Accuracy</h2>
          <h3 className="text-3xl italic text-yellow-200 font-bold my-2 ">
            {accuracy.toFixed(1)}%
          </h3>
          {/* create a reset button */}
          <Button onClick={handleResetTest} >Reset</Button>
        </div>
      </div>
      <div className="">
        <div className="">
          <LineChart width={"100%"} responsive style={{
            width: "100vw",
            margin: "auto",
            aspectRatio: 2,
            maxWidth: 800,
          }} data={timeline}  >
            <CartesianGrid strokeDasharray="3 3" color="red" />
            <XAxis dataKey={"wpm"} xlinkTitle="Hood" />
            <YAxis dataKey={"wpm"} width={"auto"} />
            <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
            <Line type="monotone" dataKey="accuracy" stroke="blue" />
            <Line type="monotone" dataKey="errors" stroke="red" />
            <Line type="monotone" dataKey="second" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
