import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCycle = async () => {
  const play = await getNextToPlay();
  if (!play) {
    return null;
  }
  const URL = `https://app.4brn.com${play.playNow}`;
  console.log("playnow", URL);
  const request = await fetch(URL);
  const response = await request.json();
  console.log("response1", response);
  return response;
};

export const getNextToPlay = async () => {
  const user = await AsyncStorage.getItem("user_id");
  console.log("user", user);
  const token = await AsyncStorage.getItem("token");
  const URL = `https://app.4brn.com/api/playlists/${user}`;
  const request = await fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await request.json();
  console.log("response2", response);
  return response;
};

export const postUserProgressLogs = async (status) => {
  const URL = "https://app.4brn.com/api/user_progress_logs";
  const token = await AsyncStorage.getItem("token");
  const user = await AsyncStorage.getItem("user_id");
  const cycleContent = await getNextToPlay();
  console.log("CC", cycleContent);
  const cycle = await getCycle();
  const request = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: `/api/users/${user}`,
      content: cycleContent.playNow,
      statusCode: status,
      cycle: cycle.Cycles,
    }),
  });

  const response = await request.json();
  console.log("UserPL", response);
  return response;
};
