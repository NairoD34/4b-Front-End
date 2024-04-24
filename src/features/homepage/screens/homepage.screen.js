import React from 'react';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  HomepageBackground,
  HomepageButton,
  TextButton,
} from '../components/homepage.style';
import { TouchableOpacity } from 'react-native';

export const HomepageScreen = ({ navigation }) => {
  return (
    
    <HomepageBackground>
        <Icon
      style={{position:"absolute",top:25,left:25}}
       size={50}
    name="bars"
    color="white"
    onPress = {()=> navigation.navigate('Settings')}
  > 
  </Icon>  
      <TouchableOpacity onPress={() => navigation.navigate('VideoPlayer')}>
        <HomepageButton mode="contained">
          <TextButton>COMMENCER</TextButton>
        </HomepageButton>
      </TouchableOpacity>
    </HomepageBackground>
  );
};
