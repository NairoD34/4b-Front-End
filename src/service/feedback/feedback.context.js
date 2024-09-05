import React, { useState, createContext, useEffect, useContext } from "react";

import { retrieveSurveyQuestion, sendFeedback } from "./feedback.service";
import { CycleContext } from "../cycle/cycle.context";

export const FeedbackContext = createContext();

export const FeedbackContextProvider = ({ children }) => {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [rating, setRating] = useState(4);
  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [survey, setSurvey] = useState({
    id: "",
    title: "",
    description: "",
    questions: [
      {
        id: "",
        content: "",
        displayOrder: "",
        required: true,
      },
    ],
  });
  const { cycle } = useContext(CycleContext);

  useEffect(() => {
    getFeedbackQuestion();
  }, []);

  const getFeedbackQuestion = async () => {
    const response = await retrieveSurveyQuestion(cycle);
    console.log("question", response);
    if (!response.error) {
      setQuestion(response.content);
      console.log(question);
      setQuestionId(response.id);
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
        question,
        getFeedbackQuestion,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
