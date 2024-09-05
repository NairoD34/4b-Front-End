import React, { useContext, useState } from "react";
import { Button } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Text } from "../../../components/typography/text.component";
import {
  PersonnalInfoBackground,
  TextButton,
  PersonnalInfoButton,
  PersonnalInfoInput,
  RightBlockView,
  LeftBlockView,
  GenreView,
  PersonnalInfoTitle,
  BackButton,
  PersonnalInfoContainer,
  DobView,
  PasswordButton,
} from "../components/personnal-info.style";
import { AccountContext } from "../../../service/account/account.context";
import { View } from "react-native";
import { DobInput } from "../../profile/components/profile.style";
import { LoadingScreen } from "../../loading/screens/loading.screen";

export const PersonnalInfoScreen = ({ navigation }) => {
  const {
    isLoading,
    setModifyFirstname,
    setModifyLastname,
    setModifyEmail,
    setDay,
    setMonth,
    setYear,
    handleUsersDataModify,
    user,
  } = useContext(AccountContext);
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <PersonnalInfoBackground>
          <BackButton onPress={() => navigation.goBack()}>
            {"<"}
            Retour
          </BackButton>
          <SafeArea style={{ alignItems: "center" }}>
            <PersonnalInfoTitle variant="title">Mon compte</PersonnalInfoTitle>
            <PersonnalInfoContainer>
              <LeftBlockView>
                <PersonnalInfoInput
                  placeholder={user.firstname}
                  onChangeText={(t) => setModifyFirstname(t)}
                />
                <PersonnalInfoInput
                  placeholder={user.lastname}
                  onChangeText={(t) => setModifyLastname(t)}
                />
                <PersonnalInfoInput
                  placeholder={user.email}
                  keyboardType="email-address"
                  onChangeText={(t) => setModifyEmail(t)}
                />
              </LeftBlockView>
              <RightBlockView>
                <PasswordButton>Changer votre mot de passe ?</PasswordButton>

                <DobView>
                  <Text variant="label">Date de naissance</Text>
                  <View style={{ flexDirection: "row", marginLeft: 20 }}>
                    <DobInput
                      placeholder={user.dob.day}
                      onChangeText={(d) => setDay(d)}
                      maxLength={2}
                      keyboardType={"number-pad"}
                    />
                    <DobInput
                      placeholder={user.dob.month}
                      onChangeText={(m) => setMonth(m)}
                      maxLength={2}
                      keyboardType={"number-pad"}
                    />
                    <DobInput
                      placeholder={user.dob.year}
                      onChangeText={(y) => setYear(y)}
                      maxLength={4}
                      keyboardType={"number-pad"}
                    />
                  </View>
                </DobView>
              </RightBlockView>
            </PersonnalInfoContainer>
            <PersonnalInfoButton onPress={handleUsersDataModify}>
              <TextButton style={{ fontSize: 22 }}>Enregistrer</TextButton>
            </PersonnalInfoButton>
          </SafeArea>
        </PersonnalInfoBackground>
      )}
    </View>
  );
};
