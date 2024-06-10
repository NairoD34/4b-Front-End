import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { Platform } from "react-native";

export const ProfileInput = styled.TextInput.attrs({
  placeholderTextColor: "white",
  textColor: "white",
})`
  background-color: #5c8dff;
  margin-bottom: 20px;
  padding: 5px;
  width: 350px;
  text-align: center;
  border-radius: 10px;
  font-size: 20px;
`;

export const ProfileBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/login-bg.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const BackButton = styled(Button).attrs({
  textColor: "#FFFFFF",
})`
  position: absolute;
  color: white;
  top: 10px;
  left: 10px;
`;
export const ProfileTitle = styled(Text)`
  color: #4649e3;
  margin-top: ${Platform.OS === "ios" ? `50px` : `25px`};
  margin-bottom: 25px;
`;
export const ProfileContainer = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;
export const GenreView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
  width: auto;
`;
export const DobView = styled.View`
  width: auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
`;
export const RightBlockView = styled.View`
  margin-left: 15px;
`;
export const LeftBlockView = styled.View`
  margin-right: 15px;
`;

export const ProfileButton = styled(Button).attrs({
  mode: "contained",
})`
  background-color: #4649e3;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 358px;
  border-radius: 10px;
  padding: 5px;
`;
export const TextButton = styled.Text`
  font-size: 21px;
`;
export const DobInput = styled.TextInput.attrs({
  placeholderTextColor: "white",
})`
  background-color: #5c8dff;
  padding: 5px;
  text-align: center;
  border-radius: 10px;
  font-size: 20px;
  margin-left: 15px;
  margin-right: 7.5px;
`;
