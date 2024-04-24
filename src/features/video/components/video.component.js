import React from 'react';
import { ResizeMode, Video } from 'expo-av';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';


import { CycleContext } from '../../../service/cycle/cycle.context';

export const VideoComponent = ({ content }) => {
  const _onPlaybackStatusUpdate = playbackStatus => {
  if (!playbackStatus.isLoaded) {
    // Update your UI for the unloaded state
    if (playbackStatus.error) {
      console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
      // Send Expo team the error on Slack or the forums so we can help you debug!
    }
  } else {
    // Update your UI for the loaded state

    if (playbackStatus.isPlaying) {
      // Update your UI for the playing state
    } else {
      // Update your UI for the paused state
    }

    if (playbackStatus.isBuffering) {
      // Update your UI for the buffering state
    }

    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      // The player has just finished playing and will stop. Maybe you want to play something else?
    }
  }
};
  const _handleVideoRef = component => {
  const playbackObject = component;
  playbackObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
};
  const { cycles, isLoading } = React.useContext(CycleContext);
  const [fullscreen, setFullscreen] = React.useState(false);

  const [status, setStatus] = React.useState({});
  const uri = cycles.map((cycle) => {
    console.log("test", cycle)
   return(
    cycle.cycleContent.map((cycleContent) => {
      console.log(cycle);
      let i = 1;

      if (cycleContent.displayOrder === i) {
        i++;
        console.log("result",cycleContent.content[0])
        return cycleContent.content[0];
      } else {
        i = 1;
      }
      console.log(i);
    }))
  });

console.log(uri);
  return (
    <>
    <Video
      ref={this._handleVideoRef} // Store reference
      onError={this.videoError}
      source={{
        uri: uri[0][0],
      }}
      resizeMode={ResizeMode.CONTAIN}
      onFullscreenUpdate={() => setStatus(!fullscreen)}
      style={styles.video}
    />
     <View style={styles.buttons}>
          <Button
            icon={status.isPlaying ? 'pause' : 'play'}
            mode="contained"
            onPress={() => {
              return status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync();
            }}
          />
          <Button
            icon="fullscreen"
            mode="contained"
            onPress={() =>
              fullscreen
                ? video.current.dismissFullscreenPlayer()
                : video.current.presentFullscreenPlayer()
            }
          />
        </View>
        </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  video: {
    alignSelf: 'center',
    width: 600,
    height: 350,
  },
});

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
