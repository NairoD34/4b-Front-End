import React, { useState, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

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

export const PasswordScreen = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const { setEmail, setPassword, error, handleLogin} = useContext(AccountContext);
  return (
    <LoginBackground>
      <BackButton onPress={() => navigation.goBack()}>
        {"<"}
        Retour
      </BackButton>
      <SafeArea style={{ alignItems: "center" }}>
      <View style={{width:1, marginTop:20}}/>
        <LoginTitle variant="title">Mot de passe oublié ?</LoginTitle>
        <LoginContainer>
          <AccountInput placeholder="E-mail" keyboardType="email-address" onChangeText={setEmail}/>
        </LoginContainer>
        <TouchableOpacity>
        <SmallText style={{width: 250}}>Saisissez votre adresse mail pour recevoir un courriel afin de réinitialiser votre mot de passe.</SmallText>
        </TouchableOpacity>
        <LoginButton onPress={handleLogin}>
          <TextButton style={{ fontSize: 22 }}>Réinitialiser</TextButton>
        </LoginButton>
      </SafeArea>
    </LoginBackground>
  );
};
