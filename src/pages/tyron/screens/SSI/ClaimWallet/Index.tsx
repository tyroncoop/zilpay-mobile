import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  text: string;
};

const ClaimWallet: React.FC<Props> = ({text}) => {
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;

  return (
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ClaimWallet;

const stylesDark = StyleSheet.create({
  btn: {
    width: deviceWidth * 0.6 + 25,
    height: deviceWidth * 0.2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    borderColor: '#dbe4eb',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  txt: {
    fontWeight: 'bold',
    color: '#fff'
  }
});

const stylesLight = StyleSheet.create({
  btn: {
    width: deviceWidth * 0.6 + 25,
    height: deviceWidth * 0.2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    borderColor: '#dbe4eb',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  txt: {
    fontWeight: 'bold',
    color: '#000'
  }
});
