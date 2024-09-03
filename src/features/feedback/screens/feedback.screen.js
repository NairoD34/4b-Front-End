import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { Alert, Text, TextInput } from "react-native";

import {
  FeedbackBackground,
  FeedbackButton,
  FeedbackInput,
  Rating,
  SecondView,
  TextButton,
  FeedbackTitle,
} from "../components/feedback.style";
import { SvgXml } from "react-native-svg";
import { FeedbackContext } from "../../../service/feedback/feedback.context";
import { TouchableOpacity, View } from "react-native";
import greyStar from "../../../../assets/grey_star";
import star from "../../../../assets/star";
import { BackButton } from "../../account/components/account.style";
import { CycleContext } from "../../../service/cycle/cycle.context";
import { AccountContext } from "../../../service/account/account.context";
import LottieView from "lottie-react-native";

export const FeedbackScreen = ({ route, navigation }) => {
  const {
    rating,
    setFeedbackMessage,
    handleChangesFeedback,
    handleSubmitFeedback,
    question,
    getFeedbackQuestion,
  } = React.useContext(FeedbackContext);

  useEffect(() => {
    getFeedbackQuestion();
  }, []);

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

  const CongratsButtonAlert = () => {
    Alert.alert("Félicitations", route.params.message, [
      {
        text: "OK",
      },
    ]);
    setIsFinished(false);
  };
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
  return (
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
                  setHasStarted(false);
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
      <FeedbackTitle>{question}</FeedbackTitle>
      <Rating>
        <TouchableOpacity
          key={"buttonstar1"}
          onPress={() => {
            handleChangesFeedback(1);
          }}
        >
          {rating <= 0 ? (
            <SvgXml key={"greystar1"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star1"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          key={"buttonstar2"}
          onPress={() => {
            handleChangesFeedback(2);
          }}
        >
          {rating <= 1 ? (
            <SvgXml key={"greystar2"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star2"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          key={"buttonstar3"}
          onPress={() => {
            handleChangesFeedback(3);
          }}
        >
          {rating <= 2 ? (
            <SvgXml key={"greystar3"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star3"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          key={"buttonstar4"}
          onPress={() => {
            handleChangesFeedback(4);
          }}
        >
          {rating <= 3 ? (
            <SvgXml key={"greystar4"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star4"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          key={"buttonstar5"}
          onPress={() => {
            handleChangesFeedback(5);
          }}
        >
          {rating <= 4 ? (
            <SvgXml key={"greystar5"} xml={greyStar} width={50} height={50} />
          ) : (
            <SvgXml key={"star5"} xml={star} width={50} height={50} />
          )}
        </TouchableOpacity>
      </Rating>
      <SecondView>
        <FeedbackInput
          placeholder="Laissez nous un commentaire"
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
            setHasStarted(false);
          }}
        >
          <TextButton style={{ fontSize: 22 }}>Valider</TextButton>
        </FeedbackButton>
      </SecondView>
    </FeedbackBackground>
  );
};
