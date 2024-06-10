import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { PasswordScreen } from "../../features/account/screens/password.screen";
import { VerifyScreen } from "../../features/account/screens/verify.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Password" component={PasswordScreen} />
    <Stack.Screen name="Verify" component={VerifyScreen} />
  </Stack.Navigator>
);
