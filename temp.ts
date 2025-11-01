 const calculateResult = () => {
    const wpm = letterIndexRef?.current / 5 / (timer / 60);
    const totalTyped = Math.max(0, letterIndexRef.current)
    const wrongCount = wrongLetterIndex.length;
    const correctCount = Math.max(0, totalTyped - wrongCount);
    const accuracy = totalTyped > 0 ? Math.max(0, Math.min(100, (correctCount / totalTyped) * 100)) : 0;
    console.log(timer, wpm, totalTyped, wrongCount, correctCount)

    setCalculatedResults({ wpm, accuracy });
  }
  // }, [letterIndexRef, wrongLetterIndex, timer]);



  // useEffect(() => {
  //   if(calculatedResults){
  //     if (timer<=1) 
  //       {

  //       }
  //     }
  //   }, [calculatedResults, setResults, router,timer]);

  const startTimerFunction = () => {
    if (intervalRef.current)
      clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      
      calculateResult();
      const { wpm, accuracy } = calculatedResults;
      setTimer((prevTime) => {
        const nextTime = prevTime - 1;

        updateTimeLine(prevTime,
          wpm || 0,
          accuracy || 0,
          wrongLetterIndex.length
        );

        console.log("Timer:", nextTime, "WPM:", wpm, "Accuracy:", accuracy);

        // if (nextTime <= 0) {
        //   setResults(wpm, accuracy);
        //   clearInterval(intervalRef.current!)
        //   setTimeout(() => {
        //     // router.push("/type-test/result");
        //   }, 1);
        //   return 0;
        // }


        return nextTime;
      });
    }, 1000);
  };