import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Fetches the cycle data for the current play.
 *
 * @returns {Promise<Object|null>} The cycle data or null if no play data is available.
 */
export const getCycle = async (play) => {
  const URL = `https://app.4brn.com${play.playNow}`; // Construct the URL for fetching the cycle data
  const request = await fetch(URL); // Make a fetch request to the URL
  const response = await request.json(); // Parse the response as JSON
  console.log("getCycle response from servive", response); // Log the response for debugging
  return response; // Return the cycle data
};

/**
 * Fetches the next content to play for the user.
 *
 * @returns {Promise<Object>} The next content to play.
 */
export const getNextToPlay = async () => {
  const user = await AsyncStorage.getItem("user_id"); // Retrieve the user ID from AsyncStorage
  const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
  const URL = `https://app.4brn.com/api/playlists/${user}`; // Construct the URL for fetching the next content to play
  const request = await fetch(URL, {
    method: "GET", // Set the request method to GET
    headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the token
      Accept: "application/json", // Set the Accept header to accept JSON
      "Content-Type": "application/json", // Set the Content-Type header to JSON
    },
  });
  const response = await request.json(); // Parse the response as JSON
  console.log("getNextToPlay from service", response); // Log the response for debugging
  return response; // Return the next content to play
};

/**
 * Posts the user's progress logs.
 *
 * @param {number} status - The status code representing the user's progress.
 * @returns {Promise<Object>} The response from the server.
 */
export const postUserProgressLogs = async (cycleContent, cycle, status) => {
  const URL = "https://app.4brn.com/api/user_progress_logs"; // URL for posting user progress logs
  const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
  const user = await AsyncStorage.getItem("user_id"); // Retrieve the user ID from AsyncStorage
  const request = await fetch(URL, {
    method: "POST", // Set the request method to POST
    headers: {
      Accept: "application/json", // Set the Accept header to accept JSON
      "Content-Type": "application/json", // Set the Content-Type header to JSON
    },
    body: JSON.stringify({
      user: `/api/users/${user}`, // Set the user in the request body
      content: cycleContent, // Set the content in the request body
      statusCode: status, // Set the status code in the request body
      cycle: cycle, // Set the cycle data in the request body
    }),
  });

  const response = await request.json(); // Parse the response as JSON
  console.log("UserPL from service", response); // Log the response for debugging
  return response; // Return the response from the server
};

export const getLastUserProgressLogs = async (cycle) => {
  const user = await AsyncStorage.getItem("user_id");
  const URL = `https://app.4brn.com/api/user_progress_logs?user.id=${user}&cycle.id=${cycle}`;
  const token = await AsyncStorage.getItem("token");
  const request = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();
  console.log("lastUserPL from service", response);
  return response;
};
