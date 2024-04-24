import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme/index";
import { HomepageScreen } from "./src/features/homepage/screens/homepage.screen";
import { Navigation } from "./src/infrastructure/navigation";
import { CycleContextProvider } from "./src/service/cycle/cycle.context";
import { AccountContextProvider } from "./src/service/account/account.context";

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
    </>
  );
}
