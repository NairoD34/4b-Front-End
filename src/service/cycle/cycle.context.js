import React, { useState, createContext, useEffect } from "react";

import { getCycle, getNextToPlay, postUserProgressLogs } from "./cycle.service";

export const CycleContext = createContext();

export const CycleContextProvider = ({ children }) => {
  const [cycleContent, setCycleContent] = useState();
  const [cycleContentURL, setCycleContentURL] = useState();
  const [isLoading2, setIsLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [cycle, setCycle] = useState(null);
  const [cycles, setCycles] = useState({
    id: "",
    displayOrder: "",
    cycleContent: {
      id: "",
      url: "",
      displayOrder: "",
    },
  });
  const [userProgressLogs, setUserProgressLogs] = useState({
    user: "https://example.com/",
    content: "https://example.com/",
    statusCode: 0,
    cycle: "https://example.com/",
  });

  // TODO  condenser les data cycle dans un seul state cycle en mode objet et faire attention lorsque ses data
  //  sont modifiés à les géré correctement sans réécrire tout l'objet. voir video Manuel sur les best practice js
  useEffect(() => {
    if (hasStarted) {
      cycleContentProgress(0);
    }
  }, [hasStarted]);
  const retrieveCycle = async () => {
    setIsLoading2(true);
    const play = await getNextToPlay();
    if (play.playNow) {
      const response = await getCycle(play);

      if (response) {
        setIsLoading2(false);
        setCycles({
          ...cycles,
          id: response.cycle,
          displayOrder: response.displayOrder,
          cycleContent: {
            id: response.id,
            url: response.content.media.url,
            displayOrder: response.displayOrder,
          },
        });
        setUserProgressLog();
      }
    } else {
      setIsLoading2(false);
      setCycles({ ...cycles, cycleContent: null });
      setIsFinished(true);
    }
  };
  const cycleContentProgress = async (statusCode) => {
    const response = await postUserProgressLogs(
      cycles.cycleContent.id,
      cycles.id,
      statusCode,
    );
    console.log("postUserProgress from context", response);
    setIsLoading2(true);
    if (response.status === 400) {
      setIsLoading2(false);
      setError(response.detail);
      setProgress(null);
      console.log("error", response.detail);
    } else if (response) {
      setIsLoading2(false);
      console.log("UserProgressLogs successfully updated");
      setProgress(null);
    }
  };
  return (
    <CycleContext.Provider
      value={{
        cycleContentURL,
        isLoading2,
        error,
        retrieveCycle,
        setProgress,
        progress,
        isFinished,
        setIsFinished,
        setHasStarted,
        hasStarted,
        cycle,
        cycleContentProgress,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
