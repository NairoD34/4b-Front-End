import React, { useState, createContext, useEffect } from "react";
import { format } from "date-fns";
import {
  accountService,
  getLogin,
  getNewPassword,
  getNewVerificationCode,
  getRegister,
  getUsersDataModify,
  getVerify,
  logout,
} from "./account.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import User from "../../model/User";

// Create a context for the account
export const AccountContext = createContext();

// Provider component for the account context
export const AccountContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState();
  const [modifyEmail, setModifyEmail] = useState(null);
  const [verifyCode, setVerifyCode] = useState(null);
  const [password, setPassword] = useState();
  const [isLoggedInPermanently, setIsLoggedInPermanently] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [stayConnected, setStayConnected] = useState(false);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [send, setSend] = useState(false);

  const [user, setUser] = useState();
  const [modifyFirstname, setModifyFirstname] = useState(null);
  const [modifyLastname, setModifyLastname] = useState(null);
  /** TODO condenser les data user dans un seul state user en mode objet et faire attention lorsque ses data
     /*sont modifiés à les géré correctement sans réécrire tout l'objet. voir video Manuel sur les best practice js
   **/
  // useEffect(() => {
  //   const newUser = new User(1, "d", "d@d.fr");
  //   console.log("newUser", newUser.firstname);
  //   const getToken = async () => {
  //     const userData = await AsyncStorage.getItem("user");
  //     const user = JSON.parse(userData);
  //     if (user.token != null && user.isVerified) {
  //       console.log("token: " + token);
  //       console.log("isVerified: " + user.isVerified);
  //
  //       setIsLoggedInPermanently(true);
  //     }
  //   };
  //   //getToken();
  //
  //   console.log("userdatas: ", user);
  //   console.log("ILP", isLoggedInPermanently);
  // }, []);
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const storedUser = JSON.parse(userData);
          if (storedUser.token && storedUser.isVerified) {
            setUser(storedUser);
            setIsLoggedInPermanently(true);
          }
        }
      } catch (error) {
        console.error("Failed to load user from AsyncStorage", error);
      }
    };

    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (stayConnected && user) {
      const saveUser = async () => {
        try {
          await accountService.saveAsyncData("user", JSON.stringify(user));
        } catch (e) {
          console.error("Error saving user data", e);
        }
      };
      saveUser();
    }
  }, [user, stayConnected]);
  /**
   * Handles user login.
   */

  const handleLogin = async () => {
    console.log("e&p", email, password);
    const response = await getLogin(email, password);
    setIsLoading(true);
    if (response.error) {
      setIsLoading(false);
      setIsLoggedInPermanently(false);
      setIsLoggedIn(false);
      setError(response.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else {
      setIsLoggedIn(true);
      setIsLoading(false);
      setError(null);
      const dob = new Date(response.dob);
      await setUser({
        ...user,
        id: response.id,
        email: response.email,
        firstName: response.firstname,
        lastName: response.lastname,
        dob: {
          day: format(dob, "dd"),
          month: format(dob, "MM"),
          year: format(dob, "yyyy"),
        },
        token: response.validTokenStrings[0],
        isVerified: response.verified === true,
      });
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
        user.email,
        password,
        user.firstName,
        user.lastName,
        formattedDOB(),
      );
      console.log("rescontext", response);
      if (!response.error) {
        setIsLoading(false);
        const loginResponse = await getLogin(user.email, password);
        console.log("loginRes", loginResponse);
        accountService.saveAsyncData(
          "user_id",
          JSON.stringify(loginResponse.id),
        );
        accountService.saveAsyncData(
          "token",
          loginResponse.validTokenStrings[0],
        );
        setIsLoggedIn(true);
        setIsLoading(false);
        setError(null);
        setUser({
          ...user,
          firstName: loginResponse.firstname,
          lastName: loginResponse.lastname,
          dob: {
            day: format(loginResponse.dob, "dd"),
            month: format(loginResponse.dob, "MM"),
            year: format(loginResponse.dob, "yyyy"),
          },
          token: loginResponse.validTokenStrings[0],
        });
        return true;
      } else {
        console.log("error", response.error);
        setIsRegister(false);
        setIsLoading(false);
        setError(response.error);
        setTimeout(() => {
          setError(null);
        }, 5000);
        return false;
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
    if (response.error) {
      setIsLoading(false);
      setError(response.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
      return false;
    } else {
      setIsLoading(false);
      setUser({ ...user, isVerified: true });
      return true;
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
      setUser({
        ...user,
        firstName: response.firstname,
        lastName: response.lastname,
        dob: {
          day: format(response.dob, "dd"),
          month: format(response.dob, "MM"),
          year: format(response.dob, "yyyy"),
        },
        email: response.email,
      });
      console.log("Firstname", response.firstname);
    } else {
      setIsLoading(false);
      setError(response.errors);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
    if (isLoggedInPermanently) {
      await AsyncStorage.removeItem("user");

      await accountService.saveAsyncData("user", user);
    }
  };

  const handleNewPassword = async () => {
    setIsLoading(true);
    const response = await getNewPassword(email);
    if (response.error) {
      setIsLoading(false);
      setError(response.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else {
      setIsLoading(false);
      setSend(true);
      setEmail(null);
    }
  };
  const handleNewCode = async () => {
    setIsLoading(true);
    const response = await getNewVerificationCode();
    console.log("newcode", response);
    if (response.error) {
      setIsLoading(false);
      setError(response.error);
      setTimeout(() => {
        setError(null);
      }, 5000);
      return false;
    } else {
      setIsLoading(false);
      return true;
    }
  };
  /**
   * Logs out the user.
   */
  const getLogout = async () => {
    const response = await logout();
    setIsLoggedIn(false);
    setIsLoggedInPermanently(false);
    setStayConnected(false);
    setUser({
      firstName: "",
      lastName: "",
      dob: {
        day: null,
        month: null,
        year: null,
      },
      email: "",
      token: "",
      isVerified: false,
    });
    setError(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AccountContext.Provider
      value={{
        setIsLoading,
        isLoading,
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
        password,
        handleRegister,
        handleVerify,
        setModifyFirstname,
        setModifyLastname,
        setModifyEmail,
        handleUsersDataModify,
        handleNewPassword,
        isRegister,
        send,
        setSend,
        handleNewCode,
        user,
        setUser,
        setDay,
        setMonth,
        setYear,
        setEmail,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
