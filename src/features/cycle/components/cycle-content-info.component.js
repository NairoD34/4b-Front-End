import React from "react";

import { Text } from "../../../components/typography/text.component";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const CycleContentInfo = ({ content }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("VideoPlayer", {
          content,
        })
      }
    >
      <Text> {content.title}</Text> 
    </TouchableOpacity>
  );
};