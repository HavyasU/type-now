"use client";

import { useTypeContext } from "@/context/TypingTestContext/TypingTestContextProvider";
import { useRouter } from "next/navigation";

import React, { useLayoutEffect, useMemo } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { TimeLineType } from "@/Types/TimeLineType";
import Link from "next/link";
import ReactConfettiPage from "../ReactConfetti";

const ResultPage = () => {

  const {
    context: { wpm, accuracy,textContent, timeline, wrongLetterIndex },
    actions: { resetTest },
  } = useTypeContext();
  
  const router = useRouter();



  // reset action exposed via button (use inline onClick where needed)

  const resultSet = [
    { "name": "WPM", "value": wpm },
    { "name": "Accuracy", "value": accuracy.toFixed(2) + "%" },
    { "name": "Errors", "value": wrongLetterIndex.length },
  ]

  const timeLineData = useMemo((): TimeLineType => {
    if (!timeline) return [];
    // copy then sort to avoid mutating original
    return [...timeline];

  }, [timeline]);

  useLayoutEffect(() => {
    if (wpm === 0) {
      router.push("/type-test");
    }
  }, [wpm, router]);




  return (
    <div className="w-full flex justify-center    flex-col h-full overflow-hidden py-10 px-24">
      <ReactConfettiPage />
    <section className="text-center flex items-center justify-center gap-2 mb-10 flex-col " >
      <h1 className="text-2xl font-bold my-3" >Congratulations!! typing test completed. </h1>
     <div className="flex w-1/ justify-center gap-3  ">
        <Button onClick={resetTest} className="text-md py-4 px-5 rounded-sm bg-yellow-300 hover:bg-yellow-400 cursor-pointer text-black  font-bold" >Reset</Button>
<Link href="/" >
       <Button className="text-md py-4 px-5 rounded-sm bg-white hover:bg-white/90 cursor-pointer text-black  font-bold" >Home</Button>
</Link>   </div> </section>
    <section className="w-full flex justify-center gap-32  " >
        <div className="flex flex-col gap-3  justify-start items-center">
        {resultSet && resultSet?.map(({ name, value }, index) => {
          return (
            <Card key={index} className="bg-zinc-900  rounded-lg w-full py-3 pr-10 mb-2 shadow-none gap-1 text-start border-0 border-yellow-100 pl-5 shadow-black" >
              <CardTitle>
                <p className="playfair-font   italic text-3xl text-white ">{name}</p>
              </CardTitle>
              <CardTitle>
                <p className="text-2xl  text-yellow-400 font-bold  ">
                  {value}
                </p>
              </CardTitle>
            </Card>
          )
        })}

      </div>
      <div className="h-full ">
        <LineChart width={"100%"} responsive style={{
          width: "70vw",
          margin: "auto",
          aspectRatio: 2,
          maxWidth: 750,
          maxHeight: 500,
        }} data={timeLineData}  >
          <CartesianGrid strokeDasharray="3 3" color="white" />
          <Tooltip wrapperClassName="bg-zinc-900"/>

          <XAxis dataKey={"second"} xlinkTitle="Hood" />
          <YAxis name="" tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32} xlinkTitle="sf" dataKey={"accuracy"} width={"auto"} />
          <Line type="monotone" dataKey="second" stroke="#82ca9d" />
          <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
          <Line type="monotone" dataKey="accuracy" stroke="blue" />
          <Line type="monotone" dataKey="errors" stroke="red" />
          <Legend align="center"  ></Legend>
        </LineChart>
      </div>
      
    </section>
    
    </div>
  );
};

export default ResultPage;
