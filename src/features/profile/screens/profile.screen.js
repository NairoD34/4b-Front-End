import { Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { Button } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";

import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  ProfileBackground,
  BackButton,
  ProfileInput,
  ProfileTitle,
  ProfileContainer,
  RightBlockView,
  LeftBlockView,
  ProfileButton,
  TextButton,
  DobView,
  DobInput,
} from "../components/profile.style";
import { AccountContext } from "../../../service/account/account.context";
import DatePicker from "react-native-date-picker";
import { LoadingScreen } from "../../loading/screens/loading.screen";

export const ProfileScreen = ({ navigation }) => {
  const [bgMenColor, setBgMenColor] = useState("#5C8DFF");
  const [bgWomenColor, setBgWomenColor] = useState("#5C8DFF");
  const [genre, setGenre] = useState();
  const [inputDate, setInputDate] = useState(undefined);
  const [date, setDate] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [open, setOpen] = useState(false);

  const { firstname, lastname, dob, isLoading } = useContext(AccountContext);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ProfileBackground>
          <BackButton onPress={() => navigation.goBack()}>
            {"<"}
            Retour
          </BackButton>
          <SafeArea style={{ alignItems: "center" }}>
            <ProfileTitle variant="title">Mon Profil</ProfileTitle>
            <ProfileContainer>
              <LeftBlockView>
                <ProfileInput placeholder={firstname} />
                <ProfileInput placeholder={lastname} />
              </LeftBlockView>
              <RightBlockView>
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
            </ProfileContainer>
            <ProfileButton>
              <TextButton style={{ fontSize: 22 }}>Enregistrer</TextButton>
            </ProfileButton>
          </SafeArea>
        </ProfileBackground>
      )}
    </View>
  );
};
