import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendFeedback = async (text, rating, cycle) => {
  const URL = `https://app.4brn.com/api/survey_responses`;
  const userString = await AsyncStorage.getItem("user"); // Retrieve the user ID from AsyncStorage
  let user = {};
  if (userString !== null) {
    user = JSON.parse(userString);
  }
  const feedback = {
    rating: rating,
    response: text,
    user: `/api/users/${user.id}`,
    question: `/api/survey_questions/1`,
  };
  // Make a POST request to the URL with the feedback data
  const request = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authentication: `Bearer${user.token}`,
    },
    body: JSON.stringify(feedback),
  });
  console.log("requestresponse", request);
  const response = await request.json();
  console.log("serviceresponse", response);
  return response;
};

export const retrieveSurveyQuestion = async (cycle) => {
  const URL = `https://app.4brn.com/api/survey_questions.json?survey.cycle.id=${cycle}`;
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
  console.log("servicequestion", response[0].content);
  console.log("surveyQuestion", response.content);
  return response;
};

export const retrieveSurvey = async (cycle) => {
  const URL = `https://app.4brn.com/api/surveys.json?cycle.id=${cycle}`;
  const userString = await AsyncStorage.getItem("user"); // Retrieve the user ID from AsyncStorage
  let user = {};
  if (userString !== null) {
    user = JSON.parse(userString);
  }
  // Make a GET request to the URL with the user's token

  const request = await fetch(
    "https://app.4brn.com/api/surveys.json?cycle.id=3",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authentication: `Bearer ${user.token}`,
      },
    },
  );
  const response = await request.json();
  console.log("servicequestion", response);
  return response;
};
