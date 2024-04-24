import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Card } from 'react-native-paper';

import pen from '../../../../assets/pen-icon';
import profil from '../../../../assets/profil-icon';
import question from '../../../../assets/question-icon';
import { SafeArea } from '../../../components/utility/safe-area.component';
import { accountService } from "../../../service/account/account.service";
import {AccountContext} from "../../../service/account/account.context";
import {
  SettingsCard,
  SettingsCardTitle,
  SettingsCardText,
  SettingsBackground,
  BackButton,
  DisconnectButton,
  CardView,
  TextButton
} from '../components/settings.style';
import {useContext} from "react";

export const SettingsScreen = ({navigation}) => {
  const {getLogout} = useContext(AccountContext)
  return (
    <SettingsBackground>
      <BackButton onPress={() => navigation.goBack()}>
        {'<'}
        Retour
      </BackButton>
      <SafeArea style={{alignItems:"center", justifyContent:"center"}}>
      <View style={{height:60}}/>
      <CardView>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <SettingsCard>
            <Card.Content>
              <SvgXml xml={pen} />
              <View style={{ height: 20 }} />
              <SettingsCardTitle variant="label">Mon Profil</SettingsCardTitle>
              <View style={{ height: 10 }} />
              <SettingsCardText variant="label">Mon nom</SettingsCardText>
            </Card.Content>
          </SettingsCard>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('PersonnalInfo')}>
          <SettingsCard>
            <Card.Content>
              <SvgXml xml={profil} />
              <View style={{ height: 20 }} />
              <SettingsCardTitle variant="label">Mon Compte</SettingsCardTitle>
              <View style={{ height: 10 }} />
              <SettingsCardText variant="label">
                Mon.email@gmail.fr
              </SettingsCardText>
            </Card.Content>
          </SettingsCard>
          </TouchableOpacity>
          <TouchableOpacity>
          <SettingsCard>
            <Card.Content>
              <SvgXml xml={question} />
              <View style={{ height: 20 }} />
              <SettingsCardTitle variant="label">Aide</SettingsCardTitle>
              <View style={{ height: 10 }} />
              <SettingsCardText variant="label">Questions ?</SettingsCardText>
            </Card.Content>
          </SettingsCard>
        </TouchableOpacity>
        </CardView>

        <DisconnectButton onPress={getLogout}><TextButton>Se déconnecter</TextButton></DisconnectButton>
      </SafeArea>
    </SettingsBackground>
  );
};
