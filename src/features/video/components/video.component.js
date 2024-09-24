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
    setIsLoading2,
    setHasStarted,
    cycleContentProgress,
    contentCount,
    setContentCount,
  } = React.useContext(CycleContext);

  const [inFullscreen, setInFullscreen] = React.useState(true);
  const [URL, setURL] = React.useState();

  const video = React.useRef(null);
  const _handleVideoRef = (component) => {
    const playbackObject = component;
    component.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
  };
  let done = false;

  useEffect(() => {
    console.log("cycle pouet", cycles.cycleContent[contentCount]);
    console.log("cycle pouet 2 ", contentCount);
    if (cycles.cycleContent) {
      if (
        cycles.cycleContent[contentCount] === undefined &&
        cycles.cycleContent[contentCount - 1]
      ) {
        navigation.navigate("Feedback", {
          message:
            "Vous avez terminez le cycle 4b ! Bravo à vous et à très vite pour de nouvelles aventures!",
          cycle: done,
        });
        setContentCount(0);
      } else {
        setURL(cycles.cycleContent[contentCount].content.media.url);
      }
    }
  }, [contentCount, cycles]);
  useEffect(() => {
    if (cycles.progressLogs) {
      console.log("logs1");
      if (cycles.progressLogs[0]) {
        console.log("logs2");

        const logs = cycles.progressLogs.find(
          (p) => p.content.id === cycles.cycleContent[contentCount].id,
        );
        if (logs) {
          console.log("logs3", logs);

          if (logs.statusCode !== 0 && logs.statusCode !== 2) {
            console.log("logs4");

            setContentCount((prev) => prev + 1);
          }
        }
      }
    }
  }, []);

  return (
    <HomepageBackground>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: `https://4bmedia.s3.eu-west-3.amazonaws.com/cycle_video/${URL}`,
          },
          ref: video,
          nativeControls: false,
        }}
        playbackCallback={async (playbackStatus) => {
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
            playbackStatus.positionMillis < 1500
          ) {
            await cycleContentProgress(cycles.cycleContent[contentCount].id, 0);
          }

          if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
            // The player has just finished playing and will stop. Maybe you want to play something else?
            await cycleContentProgress(cycles.cycleContent[contentCount].id, 1);

            setIsLoading2(true);
            setTimeout(() => {
              setContentCount((prev) => prev + 1);
              playbackStatus.positionMillis = 0;
              setIsLoading2(false);
            }, 2000);
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
        timeVisible={false}
        header={
          <BackButton
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Homepage" }],
              });
            }}
          >
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
