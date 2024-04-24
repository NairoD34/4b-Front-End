import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';

import { SafeArea } from '../../../components/utility/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import {
  PersonnalInfoBackground,
  TextButton,
  PersonnalInfoButton,
  PersonnalInfoInput,
  RightBlockView,
  LeftBlockView,
  GenreView,
  PersonnalInfoTitle,
  BackButton,
  PersonnalInfoContainer,
  DobView,
} from '../components/personnal-info.style';

export const PersonnalInfoScreen = ({ navigation }) => {
  const [genre, setGenre] = useState();
  const [isActive, setIsActive] = useState(false);
  const [bgMenColor, setBgMenColor] = useState('#5C8DFF');
  const [bgWomenColor, setBgWomenColor] = useState('#5C8DFF');
   const [inputDate, setInputDate] = useState(undefined)
  console.log(genre);
  return (
    <PersonnalInfoBackground>
      <BackButton onPress={() => navigation.goBack()}>
        {'<'}
        Retour
      </BackButton>
      <SafeArea style={{ alignItems: 'center' }}>
        <PersonnalInfoTitle variant="title">Mon compte</PersonnalInfoTitle>
        <PersonnalInfoContainer>
          <LeftBlockView>
            <PersonnalInfoInput placeholder="Nom" />
            <PersonnalInfoInput placeholder="Prénom" />
            <PersonnalInfoInput
              placeholder="E-mail"
              keyboardType="email-address"
            />
          </LeftBlockView>
          <RightBlockView>
            <GenreView>
              <Text variant="label">Genre</Text>
              <Button
                style={{ backgroundColor: bgMenColor, borderRadius: 15 }}
                mode="contained"
                onPress={() => {
                  setBgMenColor('#E3A546');
                  setBgWomenColor('#5C8DFF');
                  setGenre('Homme');
                }}>
                Homme
              </Button>
              <Button
                style={{ backgroundColor: bgWomenColor, borderRadius: 15 }}
                mode="contained"
                onPress={() => {
                  setBgWomenColor('#E3A546');
                  setBgMenColor('#5C8DFF');
                  setGenre('Femme');
                }}>
                Femme
              </Button>
            </GenreView>
            <PersonnalInfoInput
              placeholder="Mot de passe"
              secureTextEntry={true}
            />
           
            <Text variant="label">Date de naissance</Text>
            <DobView>
              <DatePickerInput
                locale="fr"
                value={inputDate}
                onChange={(d) => setInputDate(d)}
                inputMode="start"
                style={{backgroundColor: '#5C8DFF' }}
                placeholder="Date de naissance"
              />
            </DobView>
          </RightBlockView>
        </PersonnalInfoContainer>
        <PersonnalInfoButton>
          <TextButton style={{ fontSize: 22 }}>Enregistrer</TextButton>
        </PersonnalInfoButton>
      </SafeArea>
    </PersonnalInfoBackground>
  );
};
