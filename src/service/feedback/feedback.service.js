export const sendFeedback = async (text, rating, cycle) => {
  const URL = `https://app.4brn.com/feedback`;
  const user = await AsyncStorage.getItem("user_id"); // Retrieve the user ID from AsyncStorage
  const feedback = {
    content: text,
    rating: rating,
    user_id: user,
    cycle_id: cycle,
  };
  // Make a POST request to the URL with the feedback data
  const request = fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  });
  const response = await request.json();
  console.log(response);
  return response;
  // Send feedback logic here
  // Example:
  // fetch('/api/feedback', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ feedback: 'Your feedback here' }),
  // });
};
