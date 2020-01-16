/**
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
} from 'react-native';
import { GraphRequestManager, LoginManager, AccessToken, GraphRequest } from "react-native-fbsdk";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import Profile from './profile';

      // androidClientId: '982839903865-kvbb25c3plrgrngesqqos481v0l4qjhf.apps.googleusercontent.com',
const App: () => React$Node = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const [state, setState] = useState(null);
  const isSignedIn = async () => {
    // const isSignedIn = await GoogleSignin.isSignedIn();
    // const currentUser = await GoogleSignin.getCurrentUser();

    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn()
    .then(() => console.log('LOGADO')).catch(e => {
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('CANCELED', e)
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.log('PROGRESS', e)
        // operation (e.g. sign in) is in progress already
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('NOT AVAILABLE', e)
        // play services not available or outdated
      } else {
        console.log('AVAILABLE', e)
        // some other error happened
      }
  });
    // console.log('>>>>>>>',isSignedIn, currentUser, email)
  };
  const onPress = () => {
		LoginManager.logInWithPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            new GraphRequestManager().addRequest(new GraphRequest('/me', {
                accessToken,
                parameters: {
                  fields: {
                    string: 'first_name,last_name,picture',
                  },
                  redirect: {
                    string: 'false',
                  },
                },
              }, (e, data) => setState(data)
            )).start();
          });
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {state 
        ? <Profile profile={state} />
        : (
          <React.Fragment>
            <Button title="Facebook" onPress={onPress} />
            <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={isSignedIn}
            />
          </React.Fragment>
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
