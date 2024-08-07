import React, { useState, createContext, useEffect } from "react";

import {
  CyclesTransform,
  getCycle,
  getNextToPlay,
  postUserProgressLogs,
} from "./cycle.service";

export const CycleContext = createContext();

export const CycleContextProvider = ({ children }) => {
  const [cycleContent, setCycleContent] = useState();
  const [isLoading2, setIsLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  console.log("isloading2", isLoading2);
  useEffect(() => {
    cycleContentProgress(progress);
  }, [progress]);
  const retrieveCycle = async () => {
    setIsLoading2(true);
    const response = await getCycle();
    if (response === null) {
      setIsLoading2(false);
      setCycleContent(null);
      setIsFinished(true);
    }
    if (response.error) {
      setIsLoading2(false);
      setError(response.error);
    } else {
      console.log("Contextresponse");
      setIsLoading2(false);
      setCycleContent(response.content.media.url);
    }
  };
  let l;

  const cycleContentProgress = async (pouet) => {
    console.log("oui");
    const response = await postUserProgressLogs(pouet);
    setIsLoading2(true);
    if (response.status === 400) {
      setIsLoading2(false);
      setError(response.detail);
      console.log("error", response.detail);
    } else if (response) {
      setIsLoading2(false);
      console.log("UserProgressLogs successfully updated");
      await retrieveCycle();
    }
  };

  return (
    <CycleContext.Provider
      value={{
        cycleContent,
        isLoading2,
        error,
        retrieveCycle,
        setProgress,
        progress,
        isFinished,
        setIsFinished,
        setHasStarted,
        hasStarted,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
