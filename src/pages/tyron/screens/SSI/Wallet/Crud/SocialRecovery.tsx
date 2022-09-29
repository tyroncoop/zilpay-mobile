import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import Headline from '../../../../components/Headline/Index';
import DIDLayout from '../../../../components/Layout/DID/Index';
import {useSelector} from 'react-redux';
import {TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';
import ContinueArrow from '../../../../assets/icons/continue_arrow.svg';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const SocialRecovery: React.FC<Props> = ({navigation}) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default SocialRecovery;

const Child: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const isDark = useSelector((state: any) => state.user.isDark);
  const styles = isDark ? stylesDark : stylesLight;

  const dataHeadline = [
    {
      route: 'Wallet',
      name: 'Wallet',
    },
    {
      route: 'Crud',
      name: 'DID OPERATIONS',
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Headline navigation={navigation} data={dataHeadline} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderWrapper}>
          <Text style={styles.txtHeader}>{t('DID SOCIAL RECOVERY')}</Text>
          <Text style={styles.subTxtHeader}>
            {t('WITH THIS TRANSACTION, YOU WILL CONFIGURE SOCIAL RECOVERY.')}
          </Text>
        </View>
        <View>
          <View style={styles.wrapperInput}>
            <Text style={styles.txtInput}>
              {t('How many guardians would you like?')}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={t('Type amount')}
              placeholderTextColor={isDark ? '#fff' : '#000'}
            />
          </View>
          <View>
            <View style={styles.inputGuardianWrapper}>
              <View style={styles.txtGuardianWrapper}>
                <Text style={styles.txt}>{t('Guardian')}#1</Text>
              </View>
              <TextInput
                style={styles.inputGuardian}
                placeholder={t('Type NFT Username')}
                placeholderTextColor="#fff"
              />
              <View style={styles.txtGuardianWrapper}>
                <Text style={styles.txt}>.did</Text>
              </View>
            </View>
            <View style={styles.inputGuardianWrapper}>
              <View style={styles.txtGuardianWrapper}>
                <Text style={styles.txt}>{t('Guardian')}#2</Text>
              </View>
              <TextInput
                style={styles.inputGuardian}
                placeholder={t('Type NFT Username')}
                placeholderTextColor="#fff"
              />
              <View style={styles.txtGuardianWrapper}>
                <Text style={styles.txt}>.did</Text>
              </View>
            </View>
            <View style={styles.inputGuardianWrapper}>
              <View style={styles.txtGuardianWrapper}>
                <Text style={styles.txt}>{t('Guardian')}#3</Text>
              </View>
              <TextInput
                style={styles.inputGuardian}
                placeholder={t('Type NFT Username')}
                placeholderTextColor="#fff"
              />
              <View style={styles.txtGuardianWrapper}>
                <Text style={styles.txt}>.did</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.btnContinue}>
            <ContinueArrow width={40} height={40} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  wrapper: {
    marginBottom: 100,
  },
  txtHeader: {
    fontSize: 20,
    color: '#dbe4eb',
    letterSpacing: 1,
    textAlign: 'center',
  },
  txtHeaderWrapper: {
    marginVertical: 30,
  },
  subTxtHeader: {
    fontSize: 13,
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 15,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  input: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
  },
  inputGuardian: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
    height: 40,
    width: deviceWidth * 0.5,
  },
  txtInput: {
    maxWidth: '60%',
    color: '#fff',
  },
  txtGuardianWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 5,
  },
  inputGuardianWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  btnContinue: {
    alignSelf: 'center',
    marginTop: 20,
  },
  txt: {
    color: '#fff',
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    marginBottom: 100,
  },
  txtHeader: {
    fontSize: 20,
    color: '#000',
    letterSpacing: 1,
    textAlign: 'center',
  },
  txtHeaderWrapper: {
    marginVertical: 30,
  },
  subTxtHeader: {
    fontSize: 13,
    color: '#000',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 15,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  input: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
  },
  inputGuardian: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 5,
    color: '#000',
    paddingHorizontal: 10,
    height: 40,
    width: deviceWidth * 0.5,
  },
  txtInput: {
    maxWidth: '60%',
    color: '#000',
  },
  txtGuardianWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    paddingHorizontal: 5,
  },
  inputGuardianWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  btnContinue: {
    alignSelf: 'center',
    marginTop: 20,
  },
  txt: {
    color: '#000',
  },
});
