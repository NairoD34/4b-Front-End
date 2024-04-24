import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

import { SafeArea } from '../../../components/utility/safe-area.component';
import {Text} from "../../../components/typography/text.component";
import {
  RegisterBackground,
  TextButton,
  RegisterButton,
  ConditionText,
  ValidateView,
  AccountInput,
  RightBlockView,
  LeftBlockView,
  GenreView,
  RegisterTitle,
  BackButton,
  RegisterContainer
} from '../components/account.style';

export const RegisterScreen = ({ navigation }) => {
  const [genre, setGenre] = useState();
  const [isActive, setIsActive] = useState(false);
  const [bgMenColor, setBgMenColor] = useState('#5C8DFF');
  const [bgWomenColor, setBgWomenColor] = useState('#5C8DFF');
  console.log(genre);
  return (
    <RegisterBackground>
    <BackButton
          onPress={() => navigation.goBack()}>
          {'<'}
          Retour
        </BackButton>
      <SafeArea style={{ alignItems: 'center' }}>
        
        <RegisterTitle variant="title">Inscription</RegisterTitle>
        <RegisterContainer>
          <LeftBlockView>
            <AccountInput
              placeholder="Nom"
              
            />
            <AccountInput
              placeholder="Prénom"
            />
            <AccountInput
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
            <AccountInput
              placeholder="Mot de passe"
              secureTextEntry={true}
            />
          </RightBlockView>
        </RegisterContainer>
        <ValidateView>
          <Button
            icon={isActive ? 'check' : 'square'}
            textColor={isActive ? 'white' : '#4649E3'}
            buttonColor={isActive ? '#4649E3' : 'white'}
            onPress={() => {
              setIsActive(!isActive);
            }}
          />
          <ConditionText>
            J'accepte les conditions générales d'utilisation
          </ConditionText>
        </ValidateView>
        <RegisterButton>
          <TextButton style={{ fontSize: 22 }}>Valider</TextButton>
        </RegisterButton>
      </SafeArea>
    </RegisterBackground>
  );
};

