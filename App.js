import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import "react-native-reanimated";
import "react-native-gesture-handler";

import { theme } from "./src/infrastructure/theme/index";
import { Navigation } from "./src/infrastructure/navigation";
import { CycleContextProvider } from "./src/service/cycle/cycle.context";
import { AccountContextProvider } from "./src/service/account/account.context";
import { useEffect } from "react";
import { FeedbackContextProvider } from "./src/service/feedback/feedback.context";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AccountContextProvider>
          <CycleContextProvider>
            <FeedbackContextProvider>
              <Navigation />
            </FeedbackContextProvider>
          </CycleContextProvider>
        </AccountContextProvider>
      </ThemeProvider>
      <StatusBar hidden={true} />
    </>
  );
}
