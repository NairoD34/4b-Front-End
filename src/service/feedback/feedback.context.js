import React, { useState, createContext, useEffect, useContext } from "react";

import {
  retrieveSurvey,
  retrieveSurveyQuestion,
  sendFeedback,
} from "./feedback.service";
import { CycleContext } from "../cycle/cycle.context";
import { AccountContext } from "../account/account.context";

export const FeedbackContext = createContext();

export const FeedbackContextProvider = ({ children }) => {
  const { cycles } = useContext(CycleContext);

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState(4);
  const [questionCount, setQuestionCount] = useState(0);
  const [survey, setSurvey] = useState();

  const getFeedbackSurvey = async () => {
    const response = await retrieveSurvey(cycles.id);
    console.log("resSurvey", response[0].cycle);

    if (!response.error) {
      console.log("resSurveyContext", response[0]);
      await setSurvey(response[0]);
      console.log("survey", survey);
      return true;
    }
  };
  const handleSubmitFeedback = async () => {
    const response = await sendFeedback(feedbackMessage, rating, questionId);
    console.log("feedback", feedbackMessage, "ratings", rating);
    if (response.errors) {
      console.error("Error sending feedback:", response.errors);
      return false;
    } else {
      setFeedbackMessage("");
      setRating(4);
      console.log("context", response);
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
        getFeedbackSurvey,
        questionCount,
        setQuestionCount,
        survey,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
