import React, { useState, useContext, useEffect } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-paper";

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

export const PasswordScreen = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const { setEmail, error, handleNewPassword, isLoading, send, setSend } =
    useContext(AccountContext);
  useEffect(() => {
    if (send) {
      ValidationButtonAlert();
      setSend(false);
    }
  }, [setSend, send]);
  const ValidationButtonAlert = () =>
    Alert.alert(
      "Email envoyé",
      "Un mail de réinitialisation a été envoyé sur l'adresse transmise, vérifier vos mails et vos spams",
      [
        {
          text: "Connexion",
          onPress: () => {
            navigation.navigate("Login");
          },
        },
        { text: "Annuler", onPress: () => console.log("cancel Pressed") },
      ],
    );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <LoginBackground>
          <BackButton onPress={() => navigation.goBack()}>
            {"<"}
            Retour
          </BackButton>
          <SafeArea style={{ alignItems: "center" }}>
            <View style={{ width: 1, marginTop: 20 }} />
            <LoginTitle variant="title">Mot de passe oublié ?</LoginTitle>
            {error ? <TextError>{error}</TextError> : <View />}

            <LoginContainer>
              <AccountInput
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={setEmail}
              />
            </LoginContainer>
            <TouchableOpacity>
              <SmallText style={{ width: 250 }}>
                Saisissez votre adresse mail pour recevoir un courriel afin de
                réinitialiser votre mot de passe.
              </SmallText>
            </TouchableOpacity>
            <LoginButton onPress={handleNewPassword}>
              <TextButton style={{ fontSize: 22 }}>Réinitialiser</TextButton>
            </LoginButton>
          </SafeArea>
        </LoginBackground>
      )}
    </View>
  );
};
