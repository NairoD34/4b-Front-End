import { colors } from "../../../infrastructure/theme/colors";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { ImageBackground, Platform, View } from "react-native";
import { Text } from "../../../components/typography/text.component";

export const FeedbackTitle = styled(Text)`
  color: #e3a546;
  z-index: 1000;
  margin-top: ${Platform.OS === "ios" ? `10px` : `5px`};

  font-weight: bold;
  font-size: 20px;
`;
export const FeedbackBackground = styled(ImageBackground).attrs({
  source: require("../../../../assets/home-bg.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
export const FeedbackInput = styled.TextInput.attrs({
  placeholderTextColor: "white",
})`
  background-color: #ffc850;
  padding: 5px;
  width: 350px;
  text-align: center;
  border-radius: 10px;
  font-size: 20px;
  height: 150px;
  margin-left: 200px;
`;

export const FeedbackButton = styled(Button).attrs({
  mode: "contained",
})`
  background-color: #e3a546;
  width: 150px;
  border-radius: 10px;
  margin-left: 50px;
  padding: 5px;
  height: 55px;
  text-align: center;
  align-items: center;
`;

export const SecondView = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;
export const TextButton = styled.Text`
  font-size: 21px;
  text-align: center;
`;
