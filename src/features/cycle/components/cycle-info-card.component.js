import React from "react";

import { Text } from "../../../components/typography/text.component";
import { CycleCard } from "./cycle-info-card.style";
import { FlatList, View } from "react-native";
import { CycleContentInfo } from "./cycle-content-info.component";

export const CycleInfoCard = ({ cycle }) => {
  const { label, xp, cycleContent } = cycle;
  return (
    <CycleCard>
      <View>
        <Text variant="label">label: {label}</Text>
        <Text variant="label">xp: {xp}</Text>
        <View>
          <Text variant="label">Cycle content :</Text>
          <FlatList
            data={cycleContent}
            renderItem={({ item }) => {
              return <CycleContentInfo content={item} key={item["@id"]} />;
            }}
            keyExtractor={(item) => item["@id"]}
          />
        </View>
      </View>
    </CycleCard>
  );
};