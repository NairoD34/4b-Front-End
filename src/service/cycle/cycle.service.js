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
  const userString = await AsyncStorage.getItem("user"); // Retrieve the user from AsyncStorage
  let user = {};
  if (userString !== null) {
    user = JSON.parse(userString);
  } else {
    user = {
      id: await AsyncStorage.getItem("user_id"),
      token: await AsyncStorage.getItem("token"),
    };
  }
  try {
    const URL = `https://app.4brn.com/api/playlists/${user.id}`; // Construct the URL for fetching the next content to play
    const request = await fetch(URL, {
      method: "GET", // Set the request method to GET
      headers: {
        Authorization: `Bearer ${user.token}`, // Set the Authorization header with the token
        Accept: "application/json", // Set the Accept header to accept JSON
        "Content-Type": "application/json", // Set the Content-Type header to JSON
      },
    });
    const response = await request.json(); // Parse the response as JSON
    console.log("getNextToPlay from service", response); // Log the response for debugging
    if (!response.playNow) {
      return false;
    }
    return response; // Return the next content to play
  } catch (e) {
    console.error("Error in getNextToPlay", e);
    return null;
  }
};

/**
 * Posts the user's progress logs.
 *
 * @param cycleContent
 * @param cycle
 * @param {number} status - The status code representing the user's progress.
 * @returns {Promise<Object>} The response from the server.
 */
export const postUserProgressLogs = async (cycleContent, cycle, status) => {
  const URL = "https://app.4brn.com/api/user_progress_logs"; // URL for posting user progress logs
  // Retrieve the token from AsyncStorage
  const userString = await AsyncStorage.getItem("user"); // Retrieve the user ID from AsyncStorage
  console.log("test", cycleContent);
  let user = {};
  if (userString !== null) {
    user = JSON.parse(userString);
  } else {
    user = {
      id: await AsyncStorage.getItem("user_id"),
      token: await AsyncStorage.getItem("token"),
    };
  }
  const request = await fetch(URL, {
    method: "POST", // Set the request method to POST
    headers: {
      Accept: "application/json", // Set the Accept header to accept JSON
      "Content-Type": "application/json", // Set the Content-Type header to JSON
      Authentication: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      user: `/api/users/${user.id}`, // Set the user in the request body
      content: `/api/cycle_contents/${cycleContent}`, // Set the content in the request body
      statusCode: status, // Set the status code in the request body
      cycle: `/api/cycles/${cycle}`, // Set the cycle data in the request body
    }),
  });

  const response = await request.json(); // Parse the response as JSON
  console.log("UserPL from service", response); // Log the response for debugging
  return response; // Return the response from the server
};

export const putUserProgressLogs = async (cycleContent, cycle, status) => {
  const URL = "https://app.4brn.com/api/user_progress_logs"; // URL for posting user progress logs
  const token = await AsyncStorage.getItem("token"); // Retrieve the token from AsyncStorage
  const userString = await AsyncStorage.getItem("user"); // Retrieve the user ID from AsyncStorage
  console.log("test", cycleContent);
  let user = {};
  if (userString !== null) {
    user = JSON.parse(userString);
  } else {
    user = {
      id: await AsyncStorage.getItem("user_id"),
      token: await AsyncStorage.getItem("token"),
    };
  }
  const request = await fetch(URL, {
    method: "PUT", // Set the request method to POST
    headers: {
      Accept: "application/json", // Set the Accept header to accept JSON
      "Content-Type": "application/json", // Set the Content-Type header to JSON
      Authentication: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user: `/api/users/${user.id}`, // Set the user in the request body
      content: `/api/cycle_contents/${cycleContent}`, // Set the content in the request body
      statusCode: status, // Set the status code in the request body
      cycle: `/api/cycles/${cycle}`, // Set the cycle data in the request body
    }),
  });

  const response = await request.json(); // Parse the response as JSON
  console.log("UserPL from service", response); // Log the response for debugging
  return response; // Return the response from the server
};
