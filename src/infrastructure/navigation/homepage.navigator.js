import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { HomepageScreen } from "../../features/homepage/screens/homepage.screen";
import { CycleScreen } from "../../features/cycle/screens/cycle.screen";
import { VideoPlayerScreen } from "../../features/video/screens/video.screen";
import { ProfileScreen } from "../../features/profile/screens/profile.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { PersonnalInfoScreen } from "../../features/personnal-info/screens/personnal-info.screen";

const HomepageStack = createStackNavigator();

export const HomepageNavigator = () => {
  return (
    <HomepageStack.Navigator
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
        animation: "fade",
        headerShown: false,
      }}
    >
      <HomepageStack.Screen name="Homepage" component={HomepageScreen} />
      <HomepageStack.Screen name="Cycle" component={CycleScreen} />
      <HomepageStack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
      <HomepageStack.Screen name="Settings" component={SettingsScreen} />
      <HomepageStack.Screen name="Profile" component={ProfileScreen} />
      <HomepageStack.Screen
        name="PersonnalInfo"
        component={PersonnalInfoScreen}
      />
    </HomepageStack.Navigator>
  );
};
