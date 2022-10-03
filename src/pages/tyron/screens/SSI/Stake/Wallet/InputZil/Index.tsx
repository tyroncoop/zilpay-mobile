import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import {Linking} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, StyleSheet, View, Dimensions, TextInput} from 'react-native';
import continueArrow from '../../../../../assets/img/continue_arrow.png';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export type Props = {};

const InputZil: React.FC<Props> = () => {
  const {t} = useTranslation();
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;

  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapperInput}>
        <TextInput style={styles.input} />
        <View style={styles.wrapperInfo}>
          <Text style={styles.txt}>ZIL</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Image style={styles.arrowSize} source={continueArrow} />
      </TouchableOpacity>
    </View>
  );
};

export default InputZil;

const stylesDark = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: 100,
  },
  wrapperInfo: {
    backgroundColor: '#ffffff13',
    padding: 5,
    borderRadius: 5,
  },
  txt: {
    color: '#fff',
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: 100,
  },
  wrapperInfo: {
    backgroundColor: '#ffffff13',
    padding: 5,
    borderRadius: 5,
  },
  txt: {
    color: '#fff',
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
});
