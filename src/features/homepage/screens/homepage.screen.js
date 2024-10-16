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
import { retrieveSurvey } from "../../../service/feedback/feedback.service";
import { FeedbackContext } from "../../../service/feedback/feedback.context";

export const HomepageScreen = ({ route, navigation }) => {
  const {
    retrieveCycle,
    cycles,
    isFinished,
    setIsFinished,
    setHasStarted,
    hasStarted,
  } = React.useContext(CycleContext);
  const { getFeedbackSurvey, survey } = React.useContext(FeedbackContext);
  const { setIsLoading, isLoading } = React.useContext(AccountContext);
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
            onPress={async () => {
              const res = await getFeedbackSurvey();
              if (res) {
                setIsLoading(true);
                setTimeout(() => {
                  console.log("surveyHomepage", survey);
                  setIsLoading(false);
                }, 5000);
                navigation.navigate("Feedback");
              }
            }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              const res = await retrieveCycle();
              if (res === false) {
                Alert.alert(
                  "Félicitations",
                  "Vous avez terminé tous les cycles 4b disponibles ! Nous revenons très bientôt !",
                  [
                    {
                      text: "OK",
                    },
                  ],
                );
              } else {
                navigation.navigate("VideoPlayer");
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                }, 2000);
              }
            }}
          >
            <HomepageButton mode="contained">
              {cycles.progressLogs && cycles.progressLogs.statusCode === 1 ? (
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
