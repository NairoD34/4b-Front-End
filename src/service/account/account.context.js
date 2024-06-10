import React, { useState, createContext, useEffect } from "react";
import { format } from "date-fns";

import {
  accountService,
  getLogin,
  getRegister,
  getVerify,
} from "./account.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";

export const AccountContext = createContext();

export const AccountContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState();
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
        accountService.saveAsyncData("token", response.validTokenStrings[0]);
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
      console.log("resloginafterregistered", response.email, password);
    } else {
      console.log("error");
      setIsLoading(false);
      setError(response.errors);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    const response = await getVerify(verifyCode);
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
  const getLogout = async () => {
    await accountService.logout();
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
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
