/**
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
} from 'react-native';
import { GraphRequestManager, LoginManager, AccessToken, GraphRequest } from "react-native-fbsdk";
import Profile from './profile';

const App: () => React$Node = () => {
  const [state, setState] = useState(null);
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
        : <Button title="Facebook" onPress={onPress} />
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
