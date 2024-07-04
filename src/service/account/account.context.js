import React, { useState, createContext, useEffect } from "react";
import { format } from "date-fns";
import {
  accountService,
  getLogin,
  getRegister,
  getUsersDataModify,
  getVerify,
  logout,
} from "./account.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

// Create a context for the account
export const AccountContext = createContext();

// Provider component for the account context
export const AccountContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState();
  const [modifyEmail, setModifyEmail] = useState(null);
  const [verifyCode, setVerifyCode] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState();
  const [isLoggedInPermanently, setIsLoggedInPermanently] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stayConnected, setStayConnected] = useState(false);
  const [token, setToken] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [dob, setDob] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [modifyFirstname, setModifyFirstname] = useState(null);
  const [modifyLastname, setModifyLastname] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoggedInPermanently(true);
      }
    };
    const getUserData = async () => {
      const firstname = await AsyncStorage.getItem("user_firstname");
      const lastname = await AsyncStorage.getItem("user_lastname");
      const DOB = await AsyncStorage.getItem("user_dob");
      const email = await AsyncStorage.getItem("user_email");
      const isVerified = await AsyncStorage.getItem("verified");
      if (firstname) {
        console.log("Firstname: " + firstname);
        setFirstname(firstname);
      }
      if (lastname) {
        console.log("lastname: " + lastname);
        setLastname(lastname);
      }
      if (email) {
        console.log("email: " + email);
        setEmail(email);
      }
      if (isVerified) {
        setIsVerified(true);
      }
      if (DOB) {
        console.log("DOB", DOB);
        setDob({
          day: format(DOB, "dd"),
          month: format(DOB, "MM"),
          year: format(DOB, "yyyy"),
        });
      }
    };
    getToken();
    getUserData();
  }, []);

  /**
   * Handles user login.
   */
  const handleLogin = async () => {
    const response = await getLogin(email, password);
    console.log("res", response);
    if (response.error) {
      setIsLoading(false);
      setIsLoggedInPermanently(false);
      setIsLoggedIn(false);
      setError(response.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else {
      accountService.saveAsyncData("user_id", JSON.stringify(response.id));
      accountService.saveAsyncData("token", response.validTokenStrings[0]);
      setIsLoggedIn(true);
      setIsLoading(false);
      setToken(response.validTokenStrings[0]);
      setError(null);
      setFirstname(response.firstname);
      setLastname(response.lastname);
      setDob({
        day: format(response.dob, "dd"),
        month: format(response.dob, "MM"),
        year: format(response.dob, "yyyy"),
      });

      if (stayConnected) {
        accountService.saveAsyncData("user_id", JSON.stringify(response.id));
        accountService.saveAsyncData("user_firstname", response.firstname);
        accountService.saveAsyncData("user_lastname", response.lastname);
        accountService.saveAsyncData("user_dob", response.dob);
        accountService.saveAsyncData("user_email", response.email);
      }
      if (response.verified === true) {
        setIsVerified(true);
      }
    }
  };

  /**
   * Handles user registration.
   */
  const handleRegister = async () => {
    const formattedDOB = () => {
      if (month < 1 || month > 12 || day > 31 || day < 1) {
        return false;
      }
      if (!year || !month || !day) {
        return null;
      }
      return `${year}-${month}-${day}`;
    };
    try {
      const response = await getRegister(
        email,
        password,
        firstname,
        lastname,
        formattedDOB(),
      );
      console.log("rescontext", response);
      if (!response.errors) {
        setIsLoading(false);
        const loginResponse = await handleLogin();
        console.log("loginResponse", loginResponse);
      } else {
        console.log("error", response.errors);
        setIsLoading(false);
        setError(response.errors);
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Handles user verification.
   */
  const handleVerify = async () => {
    setIsLoading(true);
    const response = await getVerify(verifyCode);
    console.log("verify", response);
    if (response.error) {
      setIsLoading(false);
      setError(response.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else {
      setIsLoading(false);
      setIsVerified(true);
      await asyncStorage.setItem("verified", "true");
    }
  };

  /**
   * Handles modification of user data.
   */
  const handleUsersDataModify = async () => {
    const formattedDOB = () => {
      if (month < 1 || month > 12 || day > 31 || day < 1) {
        return false;
      }
      if (!year || !month || !day) {
        return null;
      }
      return `${year}-${month}-${day}`;
    };
    const response = await getUsersDataModify(
      modifyEmail,
      modifyFirstname,
      modifyLastname,
      formattedDOB,
    );
    console.log("DataModified", response);
    if (!response.errors) {
      setIsLoading(false);
      alert("Vos données ont bien étaient modifiés");
      setFirstname(response.firstname);
      console.log("Firstname", response.firstname);
      setLastname(response.lastname);
      setDob({
        day: format(response.dob, "dd"),
        month: format(response.dob, "MM"),
        year: format(response.dob, "yyyy"),
      });
      setEmail(response.email);
    } else {
      setIsLoading(false);
      setError(response.errors);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    if (isLoggedInPermanently) {
      await AsyncStorage.removeItem("user_firstname");
      await AsyncStorage.removeItem("user_lastname");
      await AsyncStorage.removeItem("user_dob");
      await AsyncStorage.removeItem("user_email");
      await accountService.saveAsyncData("user_firstname", response.firstname);
      await accountService.saveAsyncData("user_lastname", response.lastname);
      await accountService.saveAsyncData("user_dob", response.dob);
      await accountService.saveAsyncData("user_email", response.email);
    }
  };

  /**
   * Logs out the user.
   */
  const getLogout = async () => {
    const response = await logout();
    setIsLoggedIn(false);
    setIsLoggedInPermanently(false);
    setEmail(null);
    setPassword(null);
    setError(null);
    setFirstname(null);
    setLastname(null);
    setDob({
      day: null,
      month: null,
      year: null,
    });
  };

  return (
    <AccountContext.Provider
      value={{
        isLoading,
        setEmail,
        setPassword,
        error,
        handleLogin,
        isLoggedIn,
        setIsLoggedIn,
        setVerifyCode,
        getLogout,
        setStayConnected,
        stayConnected,
        isLoggedInPermanently,
        token,
        email,
        firstname,
        lastname,
        dob,
        password,
        setLastname,
        setFirstname,
        setDob,
        handleRegister,
        setDay,
        setMonth,
        setYear,
        handleVerify,
        isVerified,
        setModifyFirstname,
        setModifyLastname,
        setModifyEmail,
        handleUsersDataModify,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
