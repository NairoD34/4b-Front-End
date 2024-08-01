import React, { useState, createContext, useEffect, useContext } from "react";

import { sendFeedback } from "./feedback.service";
import { CycleContext } from "../cycle/cycle.context";

export const FeedbackContext = createContext();

export const FeedbackContextProvider = ({ children }) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState(null);
  const { cycle } = useContext(CycleContext);

  const handleSubmitFeedback = () => {
    const response = sendFeedback(feedbackMessage, rating, cycle);
    console.log("feedback", feedbackMessage, "ratings", rating);
    if (response.errors) {
      console.error("Error sending feedback:", response.errors);
      return false;
    } else {
      setFeedbackMessage("");
      setRating(0);
      console.log(response);
      return true;
    }
  };
  const handleChangesFeedback = (rating = 0, feedbackMessage = "") => {
    if (rating) {
      console.log("context", rating);
      setRating(rating);
    }
    if (feedbackMessage) {
      console.log(feedbackMessage);
      setFeedbackMessage(feedbackMessage);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        setFeedbackMessage,
        setRating,
        handleSubmitFeedback,
        handleChangesFeedback,
        rating,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
