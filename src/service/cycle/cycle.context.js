import React, { useState, createContext, useEffect } from "react";

import { CyclesTransform, getCycle } from "./cycle.service";

export const CycleContext = createContext();

export const CycleContextProvider = ({ children }) => {
  const [cycles, setCycles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveCycle = () => {
    setIsLoading(true);
    setCycles([]);

    getCycle()
      .then((results) => {
        setIsLoading(false);
        setCycles(results);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        setError(err);
      });
  };
  useEffect(() => {
    retrieveCycle();
  }, []);

  return (
    <CycleContext.Provider
      value={{
        isLoading,
        cycles,
        error,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};
