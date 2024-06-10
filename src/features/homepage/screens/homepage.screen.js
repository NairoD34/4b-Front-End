import React from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  HomepageBackground,
  HomepageButton,
  TextButton,
} from "../components/homepage.style";
import { TouchableOpacity, View } from "react-native";
import { CycleContext } from "../../../service/cycle/cycle.context";
import { LoadingScreen } from "../../loading/screens/loading.screen";
import { AccountContext } from "../../../service/account/account.context";

export const HomepageScreen = ({ navigation }) => {
  const { retrieveCycle } = React.useContext(CycleContext);
  const { isLoading } = React.useContext(AccountContext);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <HomepageBackground>
          <Icon
            style={{ position: "absolute", top: 25, left: 25 }}
            size={50}
            name="bars"
            color="white"
            onPress={() => navigation.navigate("Settings")}
          ></Icon>
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate("VideoPlayer");
              await retrieveCycle();
            }}
          >
            <HomepageButton mode="contained">
              <TextButton>COMMENCER</TextButton>
            </HomepageButton>
          </TouchableOpacity>
        </HomepageBackground>
      )}
    </View>
  );
};
