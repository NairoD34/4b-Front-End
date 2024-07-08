import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Authenticates a user with the provided email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The response from the server.
 */
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
  console.log("cookie", request.cookie);
  if (response.error === "Email and password must be provided") {
    return { error: "Veuillez saisir votre email et votre mot de passe" };
  }
  return response;
};

/**
 * Verifies a user with the provided code.
 * @param {string} code - The verification code.
 * @returns {Promise<Object>} - The response from the server.
 */
export const getVerify = async (code) => {
  const URL = "https://app.4brn.com/verify/code";
  const formdata = {
    code: code,
  };
  const request = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: formdata,
    }),
  });

  const response = await request.json();
  return response;
};

/**
 * Registers a new user with the provided details.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} firstname - The user's first name.
 * @param {string} lastname - The user's last name.
 * @param {string} dob - The user's date of birth.
 * @returns {Promise<Object>} - The response from the server.
 */
export const getRegister = async (
  email,
  password,
  firstname,
  lastname,
  dob,
) => {
  // Validate inputs
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
  // Format first and last names
  const fletter = firstname.slice(0, 1).toUpperCase();
  const ffollow = firstname.slice(1).toLowerCase();
  const fname = `${fletter}${ffollow}`;
  const lletter = lastname.slice(0, 1).toUpperCase();
  const lfollow = lastname.slice(1).toLowerCase();
  const lname = `${lletter}${lfollow}`;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("password", password);
  urlencoded.append("firstname", fname);
  urlencoded.append("lastname", lname);
  urlencoded.append("dob", dob);

  const requestOptions = {
    method: "POST",
    headers: { myHeaders, "App-Key": "e524291c40656cc5ab6ee082c773b68f" },
    body: urlencoded.toString(), // Ensure this is sent as a string
    redirect: "follow",
  };
  const request = await fetch("https://app.4brn.com/signup", requestOptions);
  const response = await request.json();
  if (response.errors === "There is already an account with this email") {
    return { error: "Un compte avec cette adresse mail existe déjà" };
  }
  return response;
};

/**
 * Modifies user data with the provided details.
 * @param {string} email - The user's email.
 * @param {string} firstname - The user's first name.
 * @param {string} lastname - The user's last name.
 * @param {string} dob - The user's date of birth.
 * @returns {Promise<Object>} - The response from the server.
 */
export const getUsersDataModify = async (email, firstname, lastname, dob) => {
  const token = await AsyncStorage.getItem("token");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/merge-patch+json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  // Format first and last names if provided
  if (firstname) {
    const fletter = firstname.slice(0, 1).toUpperCase();
    const ffollow = firstname.slice(1).toLowerCase();
    const fname = `${fletter}${ffollow}`;
    firstname = fname;
  }
  if (lastname) {
    const lletter = lastname.slice(0, 1).toUpperCase();
    const lfollow = lastname.slice(1).toLowerCase();
    const lname = `${lletter}${lfollow}`;
    lastname = lname;
  }

  let body = {};
  email && (body.email = email);
  firstname && (body.firstname = firstname);
  lastname && (body.lastname = lastname);
  dob && (body.dob = dob);
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: JSON.stringify(body),
  };
  const id = await AsyncStorage.getItem("user_id");
  const URL = `https://app.4brn.com/api/users/${id}`;
  const request = await fetch(URL, requestOptions);
  const response = await request.json();
  if (response.errors === "There is already an account with this email") {
    return { error: "Un compte avec cette adresse mail existe déjà" };
  }
  return response;
};

export const getNewPassword = async (email) => {
  const URL = "https://app.4brn.com/reset-password/request";
  if (!email) {
    return { error: "Veuillez saisir votre adresse mail" };
  }
  const urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  const request = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "App-Key": "e524291c40656cc5ab6ee082c773b68f",
    },
    body: urlencoded.toString(),
  });

  const response = await request.json();
  console.log("newPWD", response);
  return response;
};

/**
 * Saves data to AsyncStorage with the specified key.
 * @param {string} key - The key to store the data under.
 * @param {string} data - The data to store.
 */
const saveAsyncData = async (key, data) => {
  console.log("save", data);

  await AsyncStorage.setItem(key, data);
};

/**
 * Logs out the user by removing their data from AsyncStorage.
 */
export const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user_id");
  await AsyncStorage.removeItem("user_firstname");
  await AsyncStorage.removeItem("user_lastname");
  await AsyncStorage.removeItem("user_dob");
  await AsyncStorage.removeItem("user_email");
  await AsyncStorage.removeItem("isVerified");
};

/**
 * Service for account-related operations.
 */
export const accountService = {
  saveAsyncData,
  logout,
};
