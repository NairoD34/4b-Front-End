import React, { useState, useContext } from "react";
import { View, Image, StyleSheet, TextInput } from "react-native";
import { Button } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import {
  RegisterBackground,
  TextButton,
  RegisterButton,
  ConditionText,
  ValidateView,
  AccountInput,
  RightBlockView,
  LeftBlockView,
  GenreView,
  RegisterTitle,
  BackButton,
  RegisterContainer,
  TextError,
} from "../components/account.style";
import { DobInput } from "../../profile/components/profile.style";
import { DobView } from "../../personnal-info/components/personnal-info.style";
import { AccountContext } from "../../../service/account/account.context";
import { LoadingScreen } from "../../loading/screens/loading.screen";

export const RegisterScreen = ({ navigation }) => {
  const [isActive, setIsActive] = useState(false);
  const [date, setDate] = useState(undefined);
  const {
    setFirstname,
    setLastname,
    setDay,
    setMonth,
    setYear,
    setEmail,
    setPassword,
    handleRegister,
    handleLogin,
    error,
    isVerified,
    isLoading,
  } = useContext(AccountContext);
  return (
    <RegisterBackground>
      <BackButton onPress={() => navigation.goBack()}>
        {"<"}
        Retour
      </BackButton>
      <SafeArea style={{ alignItems: "center" }}>
        <RegisterTitle variant="title">Inscription</RegisterTitle>
        {error ? <TextError>{error}</TextError> : <View />}

        <RegisterContainer>
          <LeftBlockView>
            <AccountInput
              placeholder="Nom"
              onChangeText={(n) => setLastname(n)}
            />
            <AccountInput
              placeholder="Prénom"
              onChangeText={(p) => setFirstname(p)}
            />
            <AccountInput
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e)}
            />
          </LeftBlockView>
          <RightBlockView>
            <AccountInput
              placeholder="Mot de passe"
              secureTextEntry={true}
              onChangeText={(mdp) => setPassword(mdp)}
            />
            <View
              style={{
                height: 50,
              }}
            />
            <DobView>
              <Text variant="label">Date de naissance</Text>
              <View style={{ flexDirection: "row", marginLeft: 20 }}>
                <DobInput
                  placeholder={"DD"}
                  onChangeText={(d) => setDay(d)}
                  maxLength={2}
                  keyboardType={"number-pad"}
                />
                <DobInput
                  placeholder={"MM"}
                  onChangeText={(m) => setMonth(m)}
                  maxLength={2}
                  keyboardType={"number-pad"}
                />
                <DobInput
                  placeholder={"YYYY"}
                  onChangeText={(y) => setYear(y)}
                  maxLength={4}
                  keyboardType={"number-pad"}
                />
              </View>
            </DobView>
          </RightBlockView>
        </RegisterContainer>
        <ValidateView>
          <Button
            icon={isActive ? "check" : "square"}
            textColor={isActive ? "white" : "#4649E3"}
            buttonColor={isActive ? "#4649E3" : "white"}
            onPress={() => {
              setIsActive(!isActive);
            }}
          />
          <ConditionText>
            J'accepte les conditions générales d'utilisation
          </ConditionText>
        </ValidateView>
        <RegisterButton
          onPress={() => {
            if (isActive) {
              handleRegister();
            } else {
              alert("Veuillez accepter les conditions générales d'utilisation");
            }
          }}
        >
          <TextButton style={{ fontSize: 22 }}>Valider</TextButton>
        </RegisterButton>
      </SafeArea>
    </RegisterBackground>
  );
};
