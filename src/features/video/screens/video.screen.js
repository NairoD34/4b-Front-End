import React from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { VideoComponent } from '../components/video.component';
import { HomepageBackground } from '../../homepage/components/homepage.style';
import { SafeArea } from '../../../components/utility/safe-area.component';

export const VideoPlayerScreen = ({ route }) => {
  const navigation = useNavigation();
  const [fullscreen, setFullscreen] = React.useState(false);
  const video = React.useRef(null);

  const [status, setStatus] = React.useState({});
  console.log('screen', route.params);
  return (
    <SafeArea>
      <HomepageBackground>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          return to previous screen
        </Button>
        <VideoComponent />
       
      </HomepageBackground>
    </SafeArea>
  );
};

