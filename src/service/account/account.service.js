import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLoginPermanently = async (email, password) => {

        const URL = "http://15.188.183.51/auth";
        fetch(URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data",data);
                const token = data.validTokenStrings[0]
                console.log("saveToken", token)
                accountService.saveToken(token);


            })
            .catch((err) => {
                console.log("error",err.status)
                console.log(err);
            });
};
    export const getLogin = async (email, password) => {

        const URL = "http://15.188.183.51/auth";
        fetch(URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data);
                return data.validTokenStrings[0]


            })
            .catch((err) => {
                console.log("error", err.status)
                console.log(err);
            });
    }
    //after receiving data lets fetch data from the response and store the token
    // here is an exemple of what you receive
    /*{
    "@context": "/api/context/User",
    "@id": "/api/users/14",
    "@type": "User",
    "id": 14,
    "email": "role@user.com",
    "dob": "2024-04-02T00:00:00+00:00",
    "lastname": "role@user.com",
    "firstname": "role@user.com",
    "cycles": [],
    "userProgressLogs": [],
    "verified": true,
    "validTokenStrings": [
        "4bt_38cb99735f4a6dc6050eccfbdb63c337527cf6362cc38ab8a50af6a4d9e911ff"
    ]
}
*/

  //First when the app is open lets check if the stay connected flag exist n the async  if it is then check for a token in the AsyncStorage if you find it then go to the HomepageNavigator now if it is not found go to the login page
  //if the button is not active show login page
  //When login in fetch/login fetch the user token on the response and save it to asyncStorage
  //after login in if the stay connected button is selected then save some flag on the async to keep the token


export const getRegister = async (email, password) => {
  const URL = "http://15.188.183.51/register";

  try {
    const response = await fetch(URL, options);
    console.log('Registration successful:', response.data.message);

    } catch (error) {
      console.error('Error during registration:', error.response.data.message);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'inscription.');
  }
};


const saveToken =async (token) =>{

  console.log("save",token);
    try {
    await AsyncStorage.setItem(
      'token',
      token
    );
  } catch (error) {
    console.log(error)
  }
  };

  let logout =async () => {
    try {
      await AsyncStorage.removeItem('token');
      let token = await AsyncStorage.getItem('token');
      console.log('token',token)
      }catch (error) {
    console.log(error)
  }
  };

  let isLogged =async (pouet) => {
      AsyncStorage.getItem('token').then(value => {
          console.log(value);
          pouet(typeof value === 'string')
      });




  };

  export const accountService = {
    saveToken, logout, isLogged
  };
