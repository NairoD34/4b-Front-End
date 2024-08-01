import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { VideoComponent } from "../components/video.component";
import { HomepageBackground } from "../../homepage/components/homepage.style";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { BackButton, PlayButton } from "../components/video.style";
import { CycleContext } from "../../../service/cycle/cycle.context";
import { ResizeMode, Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { LoadingScreen } from "../../loading/screens/loading.screen";
import { AccountContext } from "../../../service/account/account.context";

export const VideoPlayerScreen = ({ navigation }) => {
  const { cycleContent, isFinished, isLoading2 } = useContext(CycleContext);
  const { isLoading } = useContext(AccountContext);
  console.log(cycleContent);
  const [fullscreen, setFullscreen] = React.useState(false);

  const [status, setStatus] = React.useState({});
  const [isPlaying, setIsPlaying] = React.useState(true);

  const video = React.useRef(null);

  console.log("URL", cycleContent);

  return (
    <View style={{ flex: 1 }}>
      {isLoading || isLoading2 ? (
        <LoadingScreen />
      ) : (
        <VideoComponent navigation={navigation} />
      )}
    </View>
  );
};
