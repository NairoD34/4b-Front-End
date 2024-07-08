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
    cycleContent,
    setProgress,
    retrieveCycle,
    isFinished,
    hasStarted,
    setHasStarted,
  } = React.useContext(CycleContext);

  const [fullscreen, setFullscreen] = React.useState(false);

  const [status, setStatus] = React.useState({});

  const _onPlaybackStatusUpdate = async (playbackStatus) => {
    let Started = false;
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
    if (Started === false) {
      if (playbackStatus.positionMillis > 0) {
        Started = true;
        setProgress(0);
      }
    }
    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      // The player has just finished playing and will stop. Maybe you want to play something else?
      setProgress(1);
    }
  };
  const video = React.useRef(null);
  const _handleVideoRef = (component) => {
    const playbackObject = component;
    component.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  };
  useEffect(() => {
    if (isFinished) {
      setHasStarted(false);
      navigation.navigate("Homepage", {
        message:
          "Vous avez terminez le cycle 4b ! Bravo à vous et à très vite pour de nouvelles aventures!",
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
