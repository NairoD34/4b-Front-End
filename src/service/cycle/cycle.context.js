import React, { useState, createContext, useEffect } from "react";

import {
  getCycle,
  getNextToPlay,
  postUserProgressLogs,
  putUserProgressLogs,
} from "./cycle.service";

export const CycleContext = createContext();

export const CycleContextProvider = ({ children }) => {
  const [contentCount, setContentCount] = React.useState(0);

  const [isLoading2, setIsLoading2] = useState(false);
  const [error, setError] = useState(null);
  const [cycles, setCycles] = useState({});

  // TODO  condenser les data cycle dans un seul state cycle en mode objet et faire attention lorsque ses data
  //  sont modifiés à les géré correctement sans réécrire tout l'objet. voir video Manuel sur les best practice js

  const retrieveCycle = async () => {
    setIsLoading2(true);
    const response = await getNextToPlay();
    if (response !== false) {
      if (response !== null) {
        setIsLoading2(false);
        setCycles({
          id: response.cycle.id,
          label: response.cycle.label,
          playNow: response.playNow,
          cycleContent: response.cycleContents,
          progressLogs: response.progressLogs,
        });
      } else {
        setIsLoading2(false);
        setCycles({ ...cycles, cycleContent: null });
        setIsFinished(true);
      }
    } else {
      setIsLoading2(false);
      setError("Failed to retrieve cycle");
      console.log("error", "Failed to retrieve cycle");
      return false;
    }
  };
  const cycleContentProgress = async (id, statusCode) => {
    const response = await postUserProgressLogs(id, cycles.id, statusCode);
    console.log("postUserProgress from context", response);
    if (response.status === 400) {
      setError(response.detail);
      console.log("error", response.detail);
    } else if (response) {
      console.log("UserProgressLogs successfully updated");
      setCycles({ ...cycles, progressLogs: response });
    }
  };

  return (
    <CycleContext.Provider
      value={{
        setIsLoading2,
        isLoading2,
        error,
        retrieveCycle,
        cycleContentProgress,
        cycles,
        contentCount,
        setContentCount,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
