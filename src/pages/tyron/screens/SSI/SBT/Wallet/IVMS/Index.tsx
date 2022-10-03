import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import Donate from 'app/pages/tyron/components/Donate/Index';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import {Linking} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, StyleSheet, View, Dimensions, TextInput} from 'react-native';
import continueArrow from '../../../../../assets/img/continue_arrow.png';
import defaultCheckmark from '../../../../../assets/img/default_checkmark.png';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export type Props = {};

const IVMS: React.FC<Props> = () => {
  const {t} = useTranslation();
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;

  return (
    <View>
      <Text style={styles.txt}>Complete the following information for an&nbsp;
        <Text
          onPress={() =>
            Linking.openURL(
              'https://intervasp.org/wp-content/uploads/2020/05/IVMS101-interVASP-data-model-standard-issue-1-FINAL.pdf',
            )
          }
          style={{textDecorationLine: 'underline'}}>
            IVMS101 Message.
        </Text>
      </Text>
      <Text style={{fontSize: 10, marginVertical: 10, ...styles.txt}}>ALL YOUR PERSONAL, PRIVATE DATA WILL GET ENCRYPTED, AND ONLY THE ISSUER CAN DECRYPT IT.</Text>
      <View style={styles.form}>
        <Text style={styles.txt}>VC ISSUER</Text>
        <View style={styles.wrapper}>
          <View style={styles.wrapperInput}>
            <TextInput style={styles.input} />
          </View>
          <TouchableOpacity>
            <Image style={styles.arrowSize} source={continueArrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.txt}>FIRST NAME</Text>
        <View style={styles.wrapper}>
          <View style={styles.wrapperInput}>
            <TextInput style={styles.input} />
          </View>
          <TouchableOpacity>
            <Image style={styles.arrowSize} source={continueArrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.txt}>LAST NAME</Text>
        <View style={styles.wrapper}>
          <View style={styles.wrapperInput}>
            <TextInput style={styles.input} />
          </View>
          <TouchableOpacity>
            <Image style={styles.arrowSize} source={continueArrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.txt}>COUNTRY OF RESIDENCE</Text>
        <View style={styles.wrapper}>
          <View style={styles.wrapperInput}>
            <TextInput style={styles.input} />
          </View>
          <TouchableOpacity>
            <Image style={styles.arrowSize} source={continueArrow} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.txt}>PASSPORT NUMBER</Text>
        <View style={styles.wrapper}>
          <View style={styles.wrapperInput}>
            <TextInput style={styles.input} />
          </View>
          <TouchableOpacity>
            <Image style={styles.arrowSize} source={continueArrow} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.check}>
        <Image source={defaultCheckmark} />
        <Text style={{marginLeft: 10, ...styles.txt}}>User's DID Signature</Text>
      </TouchableOpacity>
      <Donate />
      <TouchableOpacity style={styles.btnSubmit}>
        <Text style={styles.txtYellow}>
          SUBMIT TRAVEL RULE
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 10,
          textAlign: 'center',
          marginTop: 5,
          ...styles.txt,
        }}
      >
        Cost is less than 2 ZIL
      </Text>
    </View>
  );
};

export default IVMS;

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
    width: '90%',
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
  btnSubmit: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffff32',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtYellow: {
    color: '#ffff32',
    textAlign: 'center',
  },
  form: {
    marginVertical: 5,
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  }
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
    width: '90%',
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
  btnSubmit: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffff32',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtYellow: {
    color: '#ffff32',
    textAlign: 'center',
  },
  form: {
    marginVertical: 5,
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  }
});
