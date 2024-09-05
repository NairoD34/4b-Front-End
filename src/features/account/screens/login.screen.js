import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AccountContext } from "../../../service/account/account.context";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  LoginBackground,
  TextButton,
  LoginButton,
  ConditionText,
  SmallText,
  StayConnectedView,
  AccountInput,
  LoginTitle,
  BackButton,
  LoginContainer,
  TextError,
} from "../components/account.style";
import { LoadingScreen } from "../../loading/screens/loading.screen";

export const LoginScreen = ({ navigation }) => {
  const {
    handleLogin,
    isVerified,
    setPassword,
    setEmail,
    email,
    password,
    user,
    setUser,
    error,
    setStayConnected,
    stayConnected,
    isLoading,
    isLoggedInPermanently,
    isLoggedIn,
  } = useContext(AccountContext);

  return (
    <LoginBackground>
      <BackButton onPress={() => navigation.goBack()}>
        {"<"}
        Retour
      </BackButton>
      <SafeArea style={{ alignItems: "center" }}>
        <LoginTitle variant="title">Connexion</LoginTitle>
        <LoginContainer>
          {error ? <TextError>{error}</TextError> : <View />}
          <AccountInput
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={(e) => setUser({ ...user, email: e })}
          />
          <View style={{ marginTop: 20 }} />
          <AccountInput
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </LoginContainer>

        <StayConnectedView>
          <Button
            icon={stayConnected ? "check" : "square"}
            textColor={stayConnected ? "white" : "#4649E3"}
            buttonColor={stayConnected ? "#4649E3" : "white"}
            onPress={() => {
              setStayConnected(!stayConnected);
            }}
          />
          <ConditionText>Rester connecté ?</ConditionText>
        </StayConnectedView>
        <TouchableOpacity onPress={() => navigation.navigate("Password")}>
          <SmallText>Mot de passe oublié ?</SmallText>
        </TouchableOpacity>
        <LoginButton
          onPress={async () => {
            await handleLogin();
            if (!isVerified && !error) {
              navigation.navigate("Verify");
            }
          }}
        >
          <TextButton style={{ fontSize: 22 }}>Valider</TextButton>
        </LoginButton>
      </SafeArea>
    </LoginBackground>
  );
};
