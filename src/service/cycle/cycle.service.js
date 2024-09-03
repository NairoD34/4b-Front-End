import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Fetches the cycle data for the current play.
 *
 * @returns {Promise<Object|null>} The cycle data or null if no play data is available.
 */
export const getCycle = async () => {
  const play = await getNextToPlay(); // Fetch the next content to play for the user
  if (play.playNow === undefined) {
    return null; // Return null if no play data is available
  }
  const URL = `https://app.4brn.com${play.playNow}`; // Construct the URL for fetching the cycle data
  const request = await fetch(URL); // Make a fetch request to the URL
  const response = await request.json(); // Parse the response as JSON
  return response; // Return the cycle data
};

/**
 * Fetches the next content to play for the user.
 *
 * @returns {Promise<Object>} The next content to play.
 */
export const getNextToPlay = async () => {
  const user = await AsyncStorage.getItem("user_id"); // Retrieve the user ID from AsyncStorage
  console.log("user", user); // Log the user ID for debugging
  const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
  const URL = `https://app.4brn.com/api/playlists/${user}`; // Construct the URL for fetching the next content to play
  console.log("token", token); // Log the
  const request = await fetch(URL, {
    method: "GET", // Set the request method to GET
    headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the token
      Accept: "application/json", // Set the Accept header to accept JSON
      "Content-Type": "application/json", // Set the Content-Type header to JSON
    },
  });
  const response = await request.json(); // Parse the response as JSON
  console.log("response2", response); // Log the response for debugging
  return response; // Return the next content to play
};

/**
 * Posts the user's progress logs.
 *
 * @param {number} status - The status code representing the user's progress.
 * @returns {Promise<Object>} The response from the server.
 */
export const postUserProgressLogs = async (status) => {
  const URL = "https://app.4brn.com/api/user_progress_logs"; // URL for posting user progress logs
  const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
  const user = await AsyncStorage.getItem("user_id"); // Retrieve the user ID from AsyncStorage
  const cycleContent = await getNextToPlay(); // Get the next content to play for the user
  console.log("CC", cycleContent); // Log the cycle content for debugging
  const cycle = await getCycle(); // Get the current cycle data
  const request = await fetch(URL, {
    method: "POST", // Set the request method to POST
    headers: {
      Accept: "application/json", // Set the Accept header to accept JSON
      "Content-Type": "application/json", // Set the Content-Type header to JSON
    },
    body: JSON.stringify({
      user: `/api/users/${user}`, // Set the user in the request body
      content: cycleContent.playNow, // Set the content in the request body
      statusCode: status, // Set the status code in the request body
      cycle: cycle.Cycles, // Set the cycle data in the request body
    }),
  });

  const response = await request.json(); // Parse the response as JSON
  console.log("UserPL", response); // Log the response for debugging
  return response; // Return the response from the server
};
