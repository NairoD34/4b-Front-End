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
  const [genre, setGenre] = useState();
  const [isActive, setIsActive] = useState(false);
  const [bgMenColor, setBgMenColor] = useState("#5C8DFF");
  const [bgWomenColor, setBgWomenColor] = useState("#5C8DFF");
  const [date, setDate] = useState(undefined);
  const { firstname, lastname, dob, email, password, isLoading } =
    useContext(AccountContext);
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
                <PersonnalInfoInput placeholder={firstname} />
                <PersonnalInfoInput placeholder={lastname} />
                <PersonnalInfoInput
                  placeholder={email}
                  keyboardType="email-address"
                />
              </LeftBlockView>
              <RightBlockView>
                <PasswordButton>Changer votre mot de passe ?</PasswordButton>

                <DobView>
                  <Text variant="label">Date de naissance</Text>
                  <View style={{ flexDirection: "row", marginLeft: 20 }}>
                    <DobInput
                      placeholder={dob.day}
                      onChangeText={(d) => setDate({ day: d })}
                      maxLength={2}
                      keyboardType={"number-pad"}
                    />
                    <DobInput
                      placeholder={dob.month}
                      onChangeText={(m) => setDate({ month: m })}
                      maxLength={2}
                      keyboardType={"number-pad"}
                    />
                    <DobInput
                      placeholder={dob.year}
                      onChangeText={(y) => setDate({ year: y })}
                      maxLength={4}
                      keyboardType={"number-pad"}
                    />
                  </View>
                </DobView>
              </RightBlockView>
            </PersonnalInfoContainer>
            <PersonnalInfoButton>
              <TextButton style={{ fontSize: 22 }}>Enregistrer</TextButton>
            </PersonnalInfoButton>
          </SafeArea>
        </PersonnalInfoBackground>
      )}
    </View>
  );
};
