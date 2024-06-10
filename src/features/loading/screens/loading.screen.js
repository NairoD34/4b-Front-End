import React from "react";
import { View, Text } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { LoadingBackground, LoadingTitle } from "../components/loading.style";
import { LoadingComponent } from "../components/loading.component";
export const LoadingScreen = () => {
  return (
    <LoadingBackground>
      <LoadingTitle>Chargement</LoadingTitle>

      <LoadingComponent size={200}>
        <LoadingTitle>Chargement</LoadingTitle>
      </LoadingComponent>
    </LoadingBackground>
  );
};
