import React, { useContext } from "react";
import { View } from "react-native";

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

export const VerifyScreen = ({ navigation }) => {
  const {
    handleVerify,
    setPassword,
    setEmail,
    error,
    setVerifyCode,
    stayConnected,
    isLoading,
  } = useContext(AccountContext);

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
            <LoginTitle variant="title">Connexion</LoginTitle>
            <LoginContainer>
              {error ? <TextError>{error}</TextError> : <View />}
              <AccountInput
                placeholder="Code de vérification"
                onChangeText={(text) => setVerifyCode(text)}
              />
            </LoginContainer>
            <LoginButton onPress={() => handleVerify()}>
              <TextButton>Valider</TextButton>
            </LoginButton>
          </SafeArea>
        </LoginBackground>
      )}
    </View>
  );
};
