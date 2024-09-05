import React, { useEffect } from "react";
import { ResizeMode, Video } from "expo-av";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

import { CycleContext } from "../../../service/cycle/cycle.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton, PlayButton } from "./video.style";
import VideoPlayer from "expo-video-player";
import { HomepageBackground } from "../../homepage/components/homepage.style";

export const VideoComponent = ({ navigation }) => {
  const {
    cycles,
    isFinished,
    setIsFinished,
    hasStarted,
    setHasStarted,
    cycleContentProgress,
  } = React.useContext(CycleContext);

  const [inFullscreen, setInFullscreen] = React.useState(true);

  const video = React.useRef(null);
  const _handleVideoRef = (component) => {
    const playbackObject = component;
    component.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  };
  let done = false;
  useEffect(() => {
    if (isFinished && hasStarted) {
      setIsFinished(false);
      navigation.navigate("Feedback", {
        message:
          "Vous avez terminez le cycle 4b ! Bravo à vous et à très vite pour de nouvelles aventures!",
        cycle: done,
      });
    }
    if (isFinished && !hasStarted) {
      setIsFinished(false);
      setHasStarted(false);
      navigation.navigate("Homepage", {
        message: "Plus de cycle 4b disponible, Nous revenons au plus vite !",
        cycle: done,
      });
    }
  }, [isFinished]);
  return (
    <HomepageBackground>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: `https://4bmedia.s3.eu-west-3.amazonaws.com/cycle_video/${cycles.cycleContent.url}`,
          },
          ref: video,
          nativeControls: false,
        }}
        playbackCallback={async (playbackStatus) => {
          let hasStarted = false;
          let isPlaying = false;
          if (cycleContentURL === undefined) {
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
            } else {
              // Update your UI for the paused state
            }

            if (playbackStatus.isBuffering) {
              // Update your UI for the buffering state
            }
          }

          if (
            playbackStatus.positionMillis > 1000 &&
            playbackStatus.positionMillis < 2000
          ) {
            setHasStarted(true);
            console.log("pouet");
          }

          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
            await cycleContentProgress(1);
            setIsFinished(true);
            done = true;
          }
        }}
        fullscreen={{
          visible: false,
          inFullscreen,
        }}
        slider={{
          visible: true,
        }}
        icon={{
          play: <Text style={{ fontSize: 24, color: "#4649E3" }}>PLAY</Text>,
          pause: <Text style={{ fontSize: 24, color: "#4649E3" }}>PAUSE</Text>,
        }}
        styker={{ flex: 1 }}
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

// if you fetch the user you can read the userProgressLogs, if it's empty start the first cycle at the first cc if it's not you start the next one from the user logs.
//To create a listener in the video use onPlaybackStatusUpdate
// to facilitate thing u just have to get the user endpoint and read the userprogressLog
//send this with a PUT method to track progress:
/*{
  "user": "https://example.com/",
  "content": "https://example.com/",
  "statusCode": 0,
  "cycle": "https://example.com/ "
}*/
/*status codes are
const STATUS_CODE_STARTED = 0;
const STATUS_CODE_COMPLETED = 1;
*/
