import React, { useState, createContext, useEffect, useContext } from "react";

import {
  retrieveSurvey,
  retrieveSurveyQuestion,
  sendFeedback,
} from "./feedback.service";
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
  const { cycles } = useContext(CycleContext);

  useEffect(() => {
    getFeedbackSurvey();
  }, []);

  const getFeedbackSurvey = async () => {
    console.log("cycleid", cycles.id);
    const response = await retrieveSurvey(cycles.id);
    console.log("survey", response);
    if (!response.error) {
      setSurvey({
        ...survey,
        id: response.id,
        title: response.title,
        description: response.description,
        status: response.status,
        questions: [response.surveyQuestions],
      });
      console.log(survey);
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
        getFeedbackSurvey,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
