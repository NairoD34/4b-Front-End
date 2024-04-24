import React, { useContext, useState, useEffect } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Button } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { CycleContext } from "../../../service/cycle/cycle.context";
import { CycleInfoCard } from "../components/cycle-info-card.component";
import { HomepageBackground } from "../../homepage/components/homepage.style";

const CycleList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
const Spacer = styled.View`
  margin-bottom: 12px;
`;
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const CycleScreen = ({ navigation }) => {
  const { isLoading, cycles } = useContext(CycleContext);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color="blue" />
        </LoadingContainer>
      )}
      <HomepageBackground>
        <CycleList
          data={cycles}
          renderItem={({ item }) => {
            return (
              <>
                <CycleInfoCard cycle={item} key={item["@id"]} navigation />

                <Spacer />
              </>
            );
          }}
          keyExtractor={(item) => item["@id"]}
        />
        <Button onPress={() => navigation.navigate("Homepage")}>Back</Button>
       
      </HomepageBackground>
    </SafeArea>
  );
}; 