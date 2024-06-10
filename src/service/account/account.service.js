import AsyncStorage from "@react-native-async-storage/async-storage";
export const getLogin = async (email, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formdata = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formdata),
    redirect: "follow",
  };

  const request = await fetch("https://app.4brn.com/auth", requestOptions);
  const response = await request.json();
  console.log(response);
  return response;

  /* const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const formdata = {
    email: email,
    password: password,
  };

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(formdata),
    redirect: "follow",
  };

  await fetch("https://app.4brn.com/auth", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => console.error(error));
    */
};

export const getVerify = async (code) => {
  const URL = "https://app.4brn.com/verify/code";
  const request = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code,
    }),
  });

  const response = await request.json();
  return response;
};
//after receiving data lets fetch data from the response and store the token
// here is an exemple of what you receive
/*{
    "@context": "/api/context/User",
    "@id": "/api/users/14",
    "@type": "User",
    "id": 14,
    "email": "role@user.com",
    "dob": "2024-04-02T00:00:00+00:00",
    "lastname": "role@user.com",
    "firstname": "role@user.com",
    "cycles": [],
    "userProgressLogs": [],
    "verified": true,
    "validTokenStrings": [
        "4bt_38cb99735f4a6dc6050eccfbdb63c337527cf6362cc38ab8a50af6a4d9e911ff"
    ]
}
*/

//First when the app is open lets check if the stay connected flag exist n the async  if it is then check for a token in the AsyncStorage if you find it then go to the HomepageNavigator now if it is not found go to the login page
//if the button is not active show login page
//When login in fetch/login fetch the user token on the response and save it to asyncStorage
//after login in if the stay connected button is selected then save some flag on the async to keep the token

export const getRegister = async (
  email,
  password,
  firstname,
  lastname,
  dob,
) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("password", password);
  urlencoded.append("firstname", firstname);
  urlencoded.append("lastname", lastname);
  urlencoded.append("dob", dob);

  const requestOptions = {
    method: "POST",
    headers: { myHeaders, "App-Key": "e524291c40656cc5ab6ee082c773b68f" },
    body: urlencoded.toString(), // Ensure this is sent as a string
    redirect: "follow",
  };
  if (!email) {
    return { error: "Veuillez remplir votre adresse mail" };
  }
  if (!password) {
    return { error: "Veuillez remplir votre mot de passe" };
  }
  if (password.length < 6) {
    return { error: "Votre mot de passe doit contenir au moins 6 caractères" };
  }
  if (!firstname) {
    return { error: "Veuillez remplir votre prénom" };
  }
  if (!lastname) {
    return { error: "Veuillez remplir votre nom" };
  }
  if (dob === null) {
    return { error: "Veuillez remplir votre date de naissance" };
  }
  if (dob === false) {
    return { error: "Veuillez donner une date de naissance correcte" };
  }
  const request = await fetch("https://app.4brn.com/signup", requestOptions);
  const response = await request.json();
  console.log("poet", response.errors[0][0]);
  if (response.errors === "There is already an account with this email") {
    return { error: "Un compte avec cette adresse mail existe déjà" };
  }
  return response;

  /* const URL = "http://15.188.183.51/signup";
  const body = JSON.stringify({
    email: "peiro.dorian@gmail.com",
    password: "Do123456@@",
    firstname: "do",
    lastname: "lastname",
    dob: "1111-11-11",
  });
  try {
    const request = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!request.ok) {
      // Log the status and text if it's not OK
      const text = await request.text();
      console.log(body);
      console.log(request.text());
      console.error("Error response:", request.status, text);
      throw new Error(`Request failed with status ${request.status}`);
    }

    // Parse the response as JSON
    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
  */
};

const saveAsyncData = async (key, data) => {
  console.log("save", data);

  await AsyncStorage.setItem(key, data);
};

let logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user_id");
  await AsyncStorage.removeItem("user_firstname");
  await AsyncStorage.removeItem("user_lastname");
  await AsyncStorage.removeItem("user_dob");
  await AsyncStorage.removeItem("user_email");
};

export const accountService = {
  saveAsyncData,
  logout,
};
