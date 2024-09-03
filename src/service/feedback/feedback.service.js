import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendFeedback = async (text, rating, cycle) => {
  const URL = `https://app.4brn.com/api/survey_responses`;
  const user = await AsyncStorage.getItem("user_id"); // Retrieve the user ID from AsyncStorage
  const token = await AsyncStorage.getItem("token"); // Retrieve the user ID from AsyncStorage
  const feedback = {
    rating: rating,
    response: text,
    user: `/api/users/${user}`,
    question: `/api/survey_questions/1`,
  };
  // Make a POST request to the URL with the feedback data
  const request = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer${token}`,
    },
    body: JSON.stringify(feedback),
  });
  console.log("requestresponse", request);
  const response = await request.json();
  console.log("serviceresponse", response);
  return response;
};

export const retrieveSurveyQuestion = async (cycle) => {
  const URL = `https://app.4brn.com/api/survey_questions?survey.cycle.id=${cycle}`;
  const token = await AsyncStorage.getItem("token"); // Retrieve the user ID from AsyncStorage
  // Make a GET request to the URL with the user's token

  const request = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer ${token}`,
    },
  });
  console.log("requestquestion", request);
  const response = await request.json();
  console.log("servicequestion", response);
  console.log("surveyQuestion", response.id);
  return response;
};
