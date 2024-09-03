import React, { useRef } from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import LottieView from "lottie-react-native";

import {
  HomepageBackground,
  HomepageButton,
  TextButton,
} from "../components/homepage.style";
import { Alert, TouchableOpacity, View } from "react-native";
import { CycleContext } from "../../../service/cycle/cycle.context";
import { LoadingScreen } from "../../loading/screens/loading.screen";
import { AccountContext } from "../../../service/account/account.context";

export const HomepageScreen = ({ route, navigation }) => {
  const {
    retrieveCycle,
    isFinished,
    setIsFinished,
    setHasStarted,
    hasStarted,
  } = React.useContext(CycleContext);
  const { isLoading } = React.useContext(AccountContext);
  const confettiRef = useRef(null);
  React.useEffect(() => {
    if (route.params?.message) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      CongratsButtonAlert();
      TriggerConfetti();
      route.params.message = null;
    }
  }, [route.params?.message]);
  const TriggerConfetti = () => {
    confettiRef.current?.play(0);
    setIsFinished(false);

    return (
      <LottieView
        ref={confettiRef}
        source={require("../../../../assets/confetti.json")}
        autoPlay={true}
        loop={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          pointerEvents: "none",
        }}
        resizeMode="cover"
      />
    );
  };
  const CongratsButtonAlert = () => {
    Alert.alert("Félicitations", route.params.message, [
      {
        text: "OK",
      },
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <HomepageBackground>
          {isFinished ? <TriggerConfetti /> : <View />}

          <Icon
            style={{ position: "absolute", top: 25, left: 25 }}
            size={50}
            name="bars"
            color="white"
            onPress={() => navigation.navigate("Settings")}
          ></Icon>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 25,
              right: 25,
              height: 50,
              width: 50,
            }}
            onPress={() => navigation.navigate("Feedback")}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              navigation.navigate("VideoPlayer");
              await retrieveCycle();
              setHasStarted(true);
            }}
          >
            <HomepageButton mode="contained">
              {hasStarted ? (
                <TextButton>CONTINUER</TextButton>
              ) : (
                <TextButton>COMMENCER</TextButton>
              )}
            </HomepageButton>
          </TouchableOpacity>
        </HomepageBackground>
      )}
    </View>
  );
};
