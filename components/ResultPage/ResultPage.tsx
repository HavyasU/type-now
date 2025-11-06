"use client";

import { useTypeContext } from "@/context/TypingTestContext/TypingTestContextProvider";
import { useRouter } from "next/navigation";

import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { TimeLineType } from "@/Types/TimeLineType";
import Link from "next/link";
import ReactConfettiPage from "../ReactConfetti";

const ResultPage = () => {

  const {
    context: { wpm, accuracy, timeline, wrongLetterIndex, typingStatus },
    actions: { resetTest },
  } = useTypeContext();

  const router = useRouter();




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

  useEffect(()=>{
    if(typingStatus !== "ended"){
      router.push("/type-test")
    }
  },[typingStatus,router])



  return (
    <div className="w-full flex justify-center    flex-col h-full overflow-hidden py-10 px-24 max-md:px-3">
      <ReactConfettiPage />
    <section className="text-center flex items-center justify-center gap-2 mb-10 flex-col " >
      <h1 className="text-2xl font-bold my-3" >Congratulations!! typing test completed. </h1>
     <div className="flex w-1/ justify-center gap-3  ">
        <Button onClick={resetTest} className="text-md py-4 px-5 rounded-sm bg-yellow-300 hover:bg-yellow-400 cursor-pointer text-black  font-bold" >Reset</Button>
<Link href="/" >
       <Button className="text-md py-4 px-5 rounded-sm bg-white hover:bg-white/90 cursor-pointer text-black  font-bold" >Home</Button>
</Link>   </div> </section>
    <section className="max-md:w-full max-md:flex-col flex justify-center gap-32 max-md:gap-10  " >
        <div className="flex max-md:w-full flex-col max-md:flex-row gap-3 max-md:gap-2 justify-start items-center">
        {resultSet && resultSet?.map(({ name, value }, index) => {
          return (
            <Card key={index} className="bg-zinc-900  rounded-lg w-full py-3 max-md:py-2 pr-10 max-md:pr-0 mb-2 shadow-none gap-1 max-md:gap-0.5 text-start border-0 border-yellow-100 pl-5 max-md:px-2 shadow-black" >
              <CardTitle>
                <p className="playfair-font  max-md:text-lg italic text-3xl text-white ">{name}</p>
              </CardTitle>
              <CardTitle>
                <p className="text-2xl max-md:text-lg  text-yellow-400 font-bold  ">
                  {value}
                </p>
              </CardTitle>
            </Card>
          )
        })}

      </div>
      <div className="h-full ">
            <LineChart width={"100%"}     
 responsive style={{
          width: "90vw",
          margin: "auto",
          height:"40vh",
          aspectRatio: 2,
          maxWidth: 750,
          maxHeight: 900,
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
