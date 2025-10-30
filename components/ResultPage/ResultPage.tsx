"use client";

import { useTypeContext } from "@/context/TypingTestContext/TypingTestContextProvider";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

const ResultPage = () => {
  const { accuracy, wpm } = useTypeContext();
  const router = useRouter();

  useLayoutEffect(() => {
    if (wpm == 0) {
      router.push("/type-test");
    }
  }, []);

  return (
    <div className="w-full h-full p-28">
      <div className="my-6">
        <h2 className="text-4xl font-extrabold">WPM</h2>
        <h3 className="text-3xl italic text-yellow-200 font-bold my-2 ">
          {wpm}
        </h3>
      </div>
      <div className="my-6">
        <h2 className="text-4xl font-extrabold">Accuracy</h2>
        <h3 className="text-3xl italic text-yellow-200 font-bold my-2 ">
          {accuracy}
        </h3>
      </div>
    </div>
  );
};

export default ResultPage;
