import styled from "styled-components/native";
import { Card, Button } from 'react-native-paper';
import { Text } from '../../../components/typography/text.component';

export const SettingsCard = styled(Card)`
padding:15px;
width:210px;
border-radius:0px;
margin:10px;
`;

export const SettingsCardTitle = styled(Text)`
color:#2699FB;
 font-weight:bold;
`;
export const SettingsCardText = styled(Text)`
color:#2699FB;
`;

export const SettingsBackground =styled.ImageBackground.attrs({
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
export const DisconnectButton = styled(Button).attrs({
  mode: "contained",textColor:"#CBCBCB"
})`
  background-color: #FFFFFF;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 358px;
  border-radius: 10px;
  padding: 5px;
`;
export const TextButton = styled.Text`
  font-size: 21px;
`;
export const CardView = styled.View`
align-items:center;
flex-direction: row;
`;