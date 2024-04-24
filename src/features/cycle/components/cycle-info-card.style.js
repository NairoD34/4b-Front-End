import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const CycleCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.brand.secondary};
  padding: ${(props) => props.theme.space[2]};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;