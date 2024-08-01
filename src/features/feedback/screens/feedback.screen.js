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

export const FeedbackScreen = ({ navigation }) => {
  const {
    rating,
    setRating,
    setFeedbackMessage,
    handleChangesFeedback,
    handleSubmitFeedback,
  } = React.useContext(FeedbackContext);
  useEffect(() => {}, [setRating]);

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
                onPress: () => navigation.navigate("Homepage"),
                style: "default",
              },
            ],
          );
        }}
      >
        {"<"}
        Retour
      </BackButton>
      <FeedbackTitle>
        Qu'avez vous pensez du cycle 4b que vous venez de visionner ?
      </FeedbackTitle>
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
              Alert.alert("Merci pour votre commentaire!", "", [
                { text: "OK", onPress: () => navigation.navigate("Homepage") },
              ]);
            }
          }}
        >
          <TextButton style={{ fontSize: 22 }}>Valider</TextButton>
        </FeedbackButton>
      </SecondView>
    </FeedbackBackground>
  );
};
