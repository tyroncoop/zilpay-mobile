import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import Headline from '../../../components/Headline/Index';
import DIDLayout from '../../../components/Layout/DID/Index';

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
  const name = useSelector((state: any) => state.user.name);
  const isDark = useSelector((state: any) => state.user.isDark);
  const styles = isDark ? stylesDark : stylesLight;
  return (
    <View style={styles.wrapper}>
      <Headline navigation={navigation} data={[]} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.txtHeaderYellow}>{t('DID SOCIAL RECOVERY')}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.txtInfo}>
          {t('Social Recovery has not been enabled by X yet.', {name})}
        </Text>
        <TouchableOpacity style={styles.btnSign}>
          <Text style={styles.btnSignTxt}>{t('SIGN ADDRESS')}</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.txtDangerZone}>{t('DANGER ZONE')}</Text>
          <TouchableOpacity style={styles.btnLock}>
            <Text style={styles.btnTxtLock}>{t('LOCK')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  wrapper: {
    marginBottom: 150,
  },
  txtHeaderYellowWrapper: {
    marginVertical: 5,
    marginTop: 50,
  },
  txtHeaderYellow: {
    fontSize: 20,
    color: '#ffff32',
    letterSpacing: 2,
    textAlign: 'center',
    maxWidth: 200,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  txtInfo: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  btnSign: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginVertical: 50,
  },
  btnSignTxt: {
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  txtDangerZone: {
    color: 'red',
    fontSize: 12,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  btnLock: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
  },
  btnTxtLock: {
    color: 'red',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    marginBottom: 150,
  },
  txtHeaderYellowWrapper: {
    marginVertical: 5,
    marginTop: 50,
  },
  txtHeaderYellow: {
    fontSize: 20,
    color: '#ffff32',
    letterSpacing: 2,
    textAlign: 'center',
    maxWidth: 200,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  txtInfo: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
  },
  btnSign: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginVertical: 50,
  },
  btnSignTxt: {
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  txtDangerZone: {
    color: 'red',
    fontSize: 12,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  btnLock: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
  },
  btnTxtLock: {
    color: 'red',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
