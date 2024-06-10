import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import "react-native-reanimated";
import "react-native-gesture-handler";

import { theme } from "./src/infrastructure/theme/index";
import { HomepageScreen } from "./src/features/homepage/screens/homepage.screen";
import { Navigation } from "./src/infrastructure/navigation";
import { CycleContextProvider } from "./src/service/cycle/cycle.context";
import { AccountContextProvider } from "./src/service/account/account.context";
import { MotiView } from "moti";
import { LoadingScreen } from "./src/features/loading/screens/loading.screen";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AccountContextProvider>
          <CycleContextProvider>
            <Navigation />
          </CycleContextProvider>
        </AccountContextProvider>
      </ThemeProvider>
      <StatusBar hidden={true} />
    </>
  );
}
