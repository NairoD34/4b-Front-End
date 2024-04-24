import React, { useState, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';


import {AccountContext} from "../../../service/account/account.context";
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
} from "../components/account.style";

export const LoginScreen = ({ navigation }) => {

   const {handleLogin, setPassword, setEmail, error, setStayConnected, stayConnected} = useContext(AccountContext);

  return (
    <LoginBackground>
      <BackButton onPress={() => navigation.goBack()}>
        {"<"}
        Retour
      </BackButton>
      <SafeArea style={{ alignItems: "center" }}>
        <LoginTitle variant="title">Connexion</LoginTitle>
        <LoginContainer>
          <AccountInput placeholder="E-mail" keyboardType="email-address" onChangeText={setEmail}/>
          <View style={{ marginTop: 20 }} />
          <AccountInput placeholder="Mot de passe" secureTextEntry={true} onChangeText={setPassword}/>
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
        <TouchableOpacity  onPress={() => navigation.navigate("Password")}>
        <SmallText>Mot de passe oublié ?</SmallText>
        </TouchableOpacity>
        <LoginButton onPress={handleLogin}>
          <TextButton style={{ fontSize: 22 }}>Valider</TextButton>
        </LoginButton>
      </SafeArea>
    </LoginBackground>
  );
};
