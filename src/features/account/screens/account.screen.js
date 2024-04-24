import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from "react-native-svg";


import { SafeArea } from '../../../components/utility/safe-area.component';
import logo from "../../../../assets/logo";


import {
  AccountLine,
  SmallText,
  RegisterButton,
  LoginButton,
  AccountContainer,
  TextButton
} from '../components/account.style';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AccountScreen =({ navigation }) => {
    let getToken = async () =>{
        try {
            const token = await AsyncStorage.getItem('token');
            console.log("tokenAccountScreen", await AsyncStorage.getItem('token'));
        } catch {
            console.log("error");
        }    }
    getToken();
  return (
    <SafeArea style={{ backgroundColor: '#EDEFF7' }}>
      <AccountContainer>
       <SvgXml xml={logo}/>
      </AccountContainer>
      <AccountContainer>
        <RegisterButton
          mode="contained"
          onPress={() => navigation.navigate('Register')}>
          <TextButton>Créer un compte</TextButton>
        </RegisterButton>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 358,
          }}>
          <AccountLine />
          <SmallText>Déja inscrit ?</SmallText>
          <AccountLine />
        </View>
        <LoginButton
          mode="contained"
          onPress={() => navigation.navigate('Login')}>
          <TextButton>Se connecter</TextButton>
        </LoginButton>
      </AccountContainer>
    </SafeArea>
  );
};

