import React from "react";
import { colors } from "../../../infrastructure/theme/colors";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { ImageBackground, View } from "react-native";

export const HomepageBackground = styled(ImageBackground).attrs({
  source: require("../../../../assets/home-bg.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const HomepageCover = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const HomepageContainer = styled(View)`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const HomepageButton = styled(Button).attrs({
  buttonColor: colors.brand.primary,

})`
  border-radius: 160px;
  border-style: solid;
  border-color: white;
  border-width: 15px;
  width: 250px;
  height: 250px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
export const TextButton = styled.Text`
  position: absolute;
  top: 50%;
  bottom: 50%;
  right: 50%;
  left: 50%;
  font-size: 22px;
`;
