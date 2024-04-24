export const getCycle = async () => {
  const URL = "http://15.188.183.51/api/cycles";
  try {
    const response = await fetch(URL);

    const data = await response.json();
    if (URL === "http://15.188.183.51/api/cycles.json") {
      return data;
    }
    if (URL === "http://15.188.183.51/api/cycles") {
      return data["hydra:member"];
    }
  } catch (error) {
    console.error(error);
  }
};
