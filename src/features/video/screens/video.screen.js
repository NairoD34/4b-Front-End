import React from "react";
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
  const { cycleContent, setProgress, isLoading2 } =
    React.useContext(CycleContext);
  const { isLoading } = React.useContext(AccountContext);

  const [fullscreen, setFullscreen] = React.useState(false);

  const [status, setStatus] = React.useState({});
  const [isPlaying, setIsPlaying] = React.useState(true);

  const video = React.useRef(null);
  const _handleVideoRef = (component) => {
    const playbackObject = component;
    component.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  };
  return (
    <HomepageBackground>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: `https://4bmedia.s3.eu-west-3.amazonaws.com/cycle_video/${cycleContent}`,
          },
          ref: video,
          nativeControls: false,
        }}
        playbackCallback={async (playbackStatus) => {
          let hasStarted = false;
          let isPlaying = false;
          if (cycleContent === undefined) {
            navigation.navigate("Homepage");
          }
          if (playbackStatus.isLoaded) {
            if (playbackStatus.error) {
              console.log(
                `Encountered a fatal error during playback: ${playbackStatus.error}`,
              );
              // Send Expo team the error on Slack or the forums so we can help you debug!
            }
          } else {
            // Update your UI for the loaded state

            if (playbackStatus.isPlaying) {
              isPlaying = true;
            } else {
              // Update your UI for the paused state
            }

            if (playbackStatus.isBuffering) {
              // Update your UI for the buffering state
            }
          }
          if (hasStarted === false) {
            if (playbackStatus.positionMillis > 0) {
              hasStarted = true;
              setProgress(0);
            }
          }
          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
            setProgress(1);
          }
        }}
        fullscreen={{
          visible: false,
        }}
        slider={{
          visible: true,
        }}
        icon={{
          play: <Text style={{ fontSize: 24, color: "#4649E3" }}>PLAY</Text>,
          pause: <Text style={{ fontSize: 24, color: "#4649E3" }}>PAUSE</Text>,
        }}
        timeVisible={false}
        header={
          <BackButton onPress={() => navigation.navigate("Homepage")}>
            {"<"}
            Retour
          </BackButton>
        }
      />
    </HomepageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  video: {
    flex: 1,
    alignSelf: "center",
    width: 700,
  },
});
