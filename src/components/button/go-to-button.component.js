import * as React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const GoToButton = ({ screenName, param }) => {
  const navigation = useNavigation();

  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName, { param })}
    />
  );
};
