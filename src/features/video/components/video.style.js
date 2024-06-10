import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const BackButton = styled(Button).attrs({
  textColor: "#FFFFFF",
})`
  position: absolute;
  color: white;
  top: 10px;
  left: 10px;
`;
export const PlayButton = styled(Button).attrs({
  buttonColor: "#4649E3",
})`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
