import React, { useState, createContext, useEffect } from "react";

import {accountService, getLogin,getLoginPermanently, getRegister} from "./account.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AccountContext = createContext();

export const AccountContextProvider =  ({ children }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoggedInPermanently, setIsLoggedInPermanently] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stayConnected, setStayConnected] = useState(false);
  const [token, setToken] = useState(null);
  useEffect( () => {
      const getToken = async ()=>{
          const token = await AsyncStorage.getItem('token')
          if(token) {
              setIsLoggedInPermanently(true)
          }
      }

getToken()

      },[])
    console.log("context", stayConnected);
const getLogout = async () => {
    await accountService.logout();
    setIsLoggedIn(false);
    setIsLoggedInPermanently(false);
}
  const handleLogin =async  () =>{
    setIsLoading(true);

       if (stayConnected === true) {
           await getLoginPermanently(email,password)
           .then(
               () => {

                   setIsLoggedInPermanently(true);
                   setIsLoading(false);

               })
           .catch(
               (err) => {
                   setIsLoading(false);
                   console.error(err);
                   setError(err);
               }
           )}else{
           await getLogin(email,password)
               .then(
                   (response) => {
                       setToken(response);
                       setIsLoggedIn(true);
                       setIsLoggedInPermanently(false)
                       setIsLoading(false);

                   })
               .catch(
                   (err) => {
                       setIsLoading(false);
                       console.error(err);
                       setError(err);
                   })

     }
     }

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
          getLogout,
          setStayConnected,
          stayConnected,
          isLoggedInPermanently,
          token
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
