import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking,
} from 'react-native';
import DIDLayout from '../../../components/Layout/DID/Index';
import Headline from '../../../components/Headline/Index';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import { userDoc, userName } from 'app/lib/controller/tyron/user';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const Doc: React.FC<Props> = ({navigation}) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Doc;

const Child: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const name = userName.useValue()
  const doc = userDoc.useValue()
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;
  const net = 'mainnet';
  let exists = false;

  return (
    <View>
      <Headline navigation={navigation} data={[]} />
      <View style={styles.wrapper}>
        {doc?.doc !== null &&
          doc?.doc?.map((res: any) => {
            if (res[0] === 'Decentralized identifier') {
              const did = res[1] as string;
              switch (did) {
                case 'Not activated yet.':
                  return (
                    <View key={did} style={styles.idWrapper}>
                      <View style={styles.idWrapperAddr}>
                        <Text style={styles.txtKey}>
                          This DID has not been created by {name} yet.
                        </Text>
                      </View>
                    </View>
                  );
                default: {
                  exists = true;
                  const addr = did.substring(19);
                  return (
                    <View key={did} style={styles.idWrapper}>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            `https://devex.zilliqa.com/address/${addr}?network=https%3A%2F%2F${
                              net === 'mainnet' ? '' : 'dev-'
                            }api.zilliqa.com`,
                          )
                        }
                        style={styles.idWrapperAddr}
                      >
                        <Text style={{color: '#ffff32', textAlign: 'center'}}>
                          {did.substring(0, 19)}
                          {addr}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }
              }
            }
          })}
        {doc?.doc !== null && (
          <>
            <Text style={styles.titleSection}>{t('VERIFICATION METHODS')}</Text>
            {doc?.doc?.map((val: any) => {
              if (
                val[0] !== 'DID services' &&
                val[0] !== 'Decentralized identifier'
              ) {
                const addr = val[1][0];
                return (
                  <View key={addr} style={styles.idWrapper}>
                    <View style={styles.idWrapperAddr}>
                      <Text style={styles.keyTitle}>
                        {t(val[0].toUpperCase())}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            `https://devex.zilliqa.com/address/${addr}?network=https%3A%2F%2F${
                              net === 'mainnet' ? '' : 'dev-'
                            }api.zilliqa.com`,
                          )
                        }
                      >
                        <Text style={styles.txtKey}>{addr}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            })}
          </>
        )}
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  idWrapper: {
    width: (deviceWidth * 80) / 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginBottom: 30,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
  },
  idWrapperAddr: {
    marginRight: 10,
    marginLeft: 5,
  },
  wrapper: {
    marginTop: 50,
  },
  keyTitle: {
    color: '#c0c0c0',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleSection: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  txtKey: {
    color: '#fff',
    textAlign: 'center',
  },
});

const stylesLight = StyleSheet.create({
  idWrapper: {
    width: (deviceWidth * 80) / 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignSelf: 'center',
    marginBottom: 30,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
  },
  idWrapperAddr: {
    marginRight: 10,
    marginLeft: 5,
  },
  wrapper: {
    marginTop: 50,
  },
  keyTitle: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  titleSection: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  txtKey: {
    color: '#000',
    textAlign: 'center',
  },
});
