import { Text,TextInput } from 'react-native';
import React, { useState } from 'react';
import {Button} from "react-native-paper";
import { DatePickerInput } from 'react-native-paper-dates';

import { SafeArea } from '../../../components/utility/safe-area.component';
import {
  ProfileBackground,
  BackButton,
  ProfileInput,
  ProfileTitle,
  ProfileContainer,
  GenreView,
  RightBlockView,
  LeftBlockView,
  ProfileButton,
  TextButton,
  DobView,
  DobInput
} from '../components/profile.style';

export const ProfileScreen = ({navigation}) => {
   const [bgMenColor, setBgMenColor] = useState('#5C8DFF');
  const [bgWomenColor, setBgWomenColor] = useState('#5C8DFF');
    const [genre, setGenre] = useState();
 const [inputDate, setInputDate] = useState(undefined)



  return (
    <ProfileBackground>
      <BackButton onPress={() => navigation.goBack()}>
        {'<'}
        Retour
      </BackButton>
      <SafeArea style={{ alignItems: 'center' }}>
        <ProfileTitle variant="title">Mon Profil</ProfileTitle>
        <ProfileContainer>
          <LeftBlockView>
            <ProfileInput placeholder="Nom" />
            <ProfileInput placeholder="Prénom" />
          </LeftBlockView>
          <RightBlockView>
            <GenreView>
              <Text variant="label">Genre</Text>
              <Button
                style={{ backgroundColor: bgMenColor, borderRadius: 15 ,marginRight:15,marginLeft:15}}
                mode="contained"
                onPress={() => {
                  setBgMenColor('#4749E3');
                  setBgWomenColor('#5C8DFF');
                  setGenre('Homme');
                }}>
                Homme
              </Button>
              <Button
                style={{ backgroundColor: bgWomenColor, borderRadius: 15 }}
                mode="contained"
                onPress={() => {
                  setBgWomenColor('#4749E3');
                  setBgMenColor('#5C8DFF');
                  setGenre('Femme');
                }}>
                Femme
              </Button>
            </GenreView>
            <DobView>
            <Text variant="label">Date de naissance</Text>
            
            <DatePickerInput 
          locale="fr"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
          style={{marginLeft:15, backgroundColor:'#5C8DFF'}}
        />
            </DobView>
          </RightBlockView>
        </ProfileContainer>
        <ProfileButton>
          <TextButton style={{ fontSize: 22 }}>Enregistrer</TextButton>
        </ProfileButton>

      </SafeArea>
    </ProfileBackground>
  );
};
