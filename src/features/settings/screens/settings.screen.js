import { Linking, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { Card } from "react-native-paper";

import pen from "../../../../assets/pen-icon";
import profil from "../../../../assets/profil-icon";
import question from "../../../../assets/question-icon";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { accountService } from "../../../service/account/account.service";
import { AccountContext } from "../../../service/account/account.context";
import {
  SettingsCard,
  SettingsCardTitle,
  SettingsCardText,
  SettingsBackground,
  BackButton,
  DisconnectButton,
  CardView,
  TextButton,
} from "../components/settings.style";
import { useCallback, useContext } from "react";
import { LoadingScreen } from "../../loading/screens/loading.screen";

export const SettingsScreen = ({ navigation }) => {
  const { getLogout, email, user, isLoading } = useContext(AccountContext);
  const helpwebsite = "https://4bkids.fr/faq";
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity onPress={handlePress}>{children}</TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <SettingsBackground>
          <BackButton onPress={() => navigation.goBack()}>
            {"<"}
            Retour
          </BackButton>
          <SafeArea style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ height: 60 }} />
            <CardView>
              <TouchableOpacity
                onPress={() => navigation.navigate("PersonnalInfo")}
              >
                <SettingsCard>
                  <Card.Content>
                    <SvgXml xml={profil} />
                    <View style={{ height: 20 }} />
                    <SettingsCardTitle variant="label">
                      Mon Compte
                    </SettingsCardTitle>
                    <View style={{ height: 10 }} />
                    <SettingsCardText variant="label">
                      {user.email}
                    </SettingsCardText>
                  </Card.Content>
                </SettingsCard>
              </TouchableOpacity>

              <OpenURLButton url={helpwebsite}>
                <SettingsCard>
                  <Card.Content>
                    <SvgXml xml={question} />
                    <View style={{ height: 20 }} />
                    <SettingsCardTitle variant="label">Aide</SettingsCardTitle>
                    <View style={{ height: 10 }} />
                    <SettingsCardText variant="label">
                      Questions ?
                    </SettingsCardText>
                  </Card.Content>
                </SettingsCard>
              </OpenURLButton>
            </CardView>

            <DisconnectButton onPress={getLogout}>
              <TextButton>Se déconnecter</TextButton>
            </DisconnectButton>
          </SafeArea>
        </SettingsBackground>
      )}
    </View>
  );
};
/* Profile card
<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <SettingsCard>
                  <Card.Content>
                    <SvgXml xml={pen} />
                    <View style={{ height: 20 }} />
                    <SettingsCardTitle variant="label">
                      Mon Profil
                    </SettingsCardTitle>
                    <View style={{ height: 10 }} />
                    <SettingsCardText variant="label">
                      {firstname} {lastname}
                    </SettingsCardText>
                  </Card.Content>
                </SettingsCard>
              </TouchableOpacity>
 */
