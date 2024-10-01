import React, { useEffect, useRef } from "react";
import { Alert } from "react-native";

import {
  FeedbackBackground,
  FeedbackButton,
  FeedbackInput,
  SecondView,
  TextButton,
  FeedbackTitle,
} from "../components/feedback.style";
import { FeedbackContext } from "../../../service/feedback/feedback.context";
import { View } from "react-native";
import { BackButton } from "../../account/components/account.style";
import { AccountContext } from "../../../service/account/account.context";
import LottieView from "lottie-react-native";
import { LoadingScreen } from "../../loading/screens/loading.screen";
import { RatingComponent } from "../components/rating.component";

export const FeedbackScreen = ({ route, navigation }) => {
  const { setFeedbackMessage, handleSubmitFeedback, questionCount, survey } =
    React.useContext(FeedbackContext);

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

  const CongratsButtonAlert = () => {
    Alert.alert("Félicitations", route.params.message, [
      {
        text: "OK",
      },
    ]);
  };
  const TriggerConfetti = () => {
    confettiRef.current?.play(0);

    useEffect(() => {}, []);

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
  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FeedbackBackground>
          <BackButton
            onPress={() => {
              Alert.alert(
                "Êtes vous sûr de vouloir quitter sans noter le cycle ?",
                "Votre retour est important pour nous et nous permet d'améliorer les prochains cycles. ",
                [
                  {
                    text: "Annuler",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Valider",
                    onPress: () => {
                      navigation.navigate("Homepage");
                    },
                    style: "default",
                  },
                ],
              );
            }}
          >
            {"<"}
            Retour
          </BackButton>
          <FeedbackTitle>{survey.surveyQuestion[questionCount]}</FeedbackTitle>
          <RatingComponent />

          <SecondView>
            <FeedbackInput
              placeholder="Veuillez écrire votre réponse ici"
              keyboardType="email-address"
              onChangeText={setFeedbackMessage}
            />
            <FeedbackButton
              onPress={async () => {
                const response = await handleSubmitFeedback();
                if (response) {
                  console.log("screen", response);
                  navigation.navigate("Homepage", {
                    message: "Merci pour votre retour !",
                  });
                }
              }}
            >
              <TextButton style={{ fontSize: 22 }}>Valider</TextButton>
            </FeedbackButton>
          </SecondView>
        </FeedbackBackground>
      )}
    </View>
  );
};
