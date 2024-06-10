import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { HomepageNavigator } from "./homepage.navigator";
import { AccountNavigator } from "./account.navigator";
import { accountService } from "../../service/account/account.service";
import { AccountContext } from "../../service/account/account.context";

export const Navigation = () => {
  const { isLoggedIn, isLoggedInPermanently, isVerified } =
    useContext(AccountContext);

  useEffect(() => {}, [isLoggedIn, isLoggedInPermanently, isVerified]);
  return (
    <NavigationContainer>
      {isLoggedIn || isLoggedInPermanently ? (
        <HomepageNavigator />
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};
// {isConnected ?  <AccountNavigator /> :  <HomepageNavigator/> }
