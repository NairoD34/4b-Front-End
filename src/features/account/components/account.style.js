import styled from "styled-components/native";
import { Platform } from "react-native";
import { Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";

import { colors } from "../../../infrastructure/theme/colors";

export const RegisterBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/register-bg.jpeg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const LoginBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/login-bg.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const RegisterContainer = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;
export const LoginContainer = styled.View`
  margin-bottom: 20px;
`;
export const BackButton = styled(Button).attrs({
  textColor: "#FFFFFF",
})`
  position: absolute;
  color: white;
  top: 10px;
  left: 10px;
`;
export const RegisterTitle = styled(Text)`
  color: #e3a546;
  margin-top: ${Platform.OS === "ios" ? `50px` : `25px`};
  margin-bottom: 15px;
`;
export const LoginTitle = styled(Text)`
  color: #4649e3;
  margin-top: ${Platform.OS === "ios" ? `50px` : `25px`};
  margin-bottom: 25px;
`;
export const GenreView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 10px;
`;
export const RightBlockView = styled.View`
  margin-left: 15px;
`;
export const LeftBlockView = styled.View`
  margin-right: 15px;
`;
export const AccountInput = styled.TextInput.attrs({
  placeholderTextColor: "white",
})`
  background-color: #5c8dff;
  margin-bottom: 10px;
  padding: 5px;
  width: 350px;
  text-align: center;
  border-radius: 10px;
  font-size: 20px;
`;
export const ValidateView = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const StayConnectedView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 165px;
  margin-bottom: 10px;
`;
export const ConditionText = styled.Text`
  font-size: 12px;
  padding-left: 5px;
`;
export const RegisterButton = styled(Button).attrs({
  mode: "contained",
})`
  background-color: #e3a546;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 358px;
  border-radius: 10px;
  padding: 5px;
`;

export const LoginButton = styled(Button).attrs({
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
export const TextError = styled.Text`
  color: crimson;
  text-align: center;
`;
export const AccountLine = styled.View`
  background-color: #c1c1c1;
  height: 1px;
  width: 100px;
`;
export const SmallText = styled.Text`
  font-size: 10px;
  color: #c1c1c1;
`;
export const AccountContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 25px;
`;
