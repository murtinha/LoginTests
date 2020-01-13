/**
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Profile({
  profile,
}) {
  const { picture, last_name, first_name } = profile;
  console.log(profile)
  return (
    <View style={styles.container}>
    </View>
  );
};
