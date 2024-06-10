import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { View } from "react-native";
import { Platform } from "react-native";

export const LoadingBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home-bg.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const LoadingTitle = styled.Text`
  color: #4649e3;
  margin-top: ${Platform.OS === "ios" ? `50px` : `25px`};
  margin-bottom: 25px;
  font-size: 45px;
  position: absolute;
  top: 10px;
`;
