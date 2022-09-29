import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
  Linking,
  Image,
} from 'react-native';
import DIDLayout from '../../../../components/Layout/DID/Index';
import Headline from '../../../../components/Headline/Index';
import {useSelector} from 'react-redux';
import instagram from '../../../../assets/img/instagram.png';
import linkedin from '../../../../assets/img/linkedin.png';
import discord from '../../../../assets/img/discord.png';
import facebook from '../../../../assets/img/facebook.png';
import github from '../../../../assets/img/github.png';
import twitter from '../../../../assets/img/twitter.png';
import other from '../../../../assets/img/other.png';
import {useTranslation} from 'react-i18next';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const Services: React.FC<Props> = ({navigation}) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Services;

const Child: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const name = 'bagasi';
  const doc:any = null
  // const name = useSelector((state: any) => state.user.name);
  // const doc = useSelector((state: any) => state.user.doc);
  const isDark = true
  // const isDark = useSelector((state: any) => state.user.isDark);
  const styles = isDark ? stylesDark : stylesLight;
  const net = 'mainnet';
  let available = false;

  return (
    <View style={styles.wrapper}>
      {/* <Headline navigation={navigation} data={[]} /> */}
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.txtHeaderWhite}>{t('SOCIAL TREE')}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddFunds')}
          style={styles.donateBtn}
        >
          <View style={styles.plusIco}>
            <Text style={styles.plus}>+</Text>
          </View>
          <Text style={styles.txtBtn}>{t('DONATE')}</Text>
        </TouchableOpacity>
        <View style={styles.wrapperContent}>
          {doc?.doc.map((val: any, i: number) => {
            if (val[0] === 'DID services') {
              available = true;
              let ico = other;
              return (
                <>
                  {val[1].map((res: any) => {
                    switch (res[1][0].split('#')[0].toLowerCase()) {
                      case 'facebook':
                        ico = facebook;
                        break;
                      case 'github':
                        ico = github;
                      case 'instagram':
                        ico = instagram;
                        break;
                      case 'linkedin':
                        ico = linkedin;
                        break;
                      case 'twitter':
                        ico = twitter;
                        break;
                    }
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            `https://${res[1][1]
                              .replace('wwww.', '')
                              .replace('https://', '')}`,
                          )
                        }
                        style={[
                          {
                            borderColor: `#${res[1][0].split('#')[1]}`,
                            backgroundColor: `#${res[1][0].split('#')[2]}`,
                          },
                          styles.serviceBtn,
                        ]}
                      >
                        <Text style={{color: `#${res[1][0].split('#')[1]}`}}>
                          {res[1][0].split('#')[0]}
                        </Text>
                        <View style={styles.plusIco}>
                          <Image
                            style={styles.socialIco}
                            width={10}
                            source={ico}
                          />
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </>
              );
            }
          })}
          {!available && (
            <View style={styles.noDataWrapper}>
              <Text style={{color: '#fff'}}>No data yet</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  wrapper: {
    marginBottom: 200,
  },
  txtHeaderYellowWrapper: {
    marginVertical: 5,
  },
  txtHeaderWhite: {
    fontSize: 20,
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
  donateBtn: {
    width: (deviceWidth * 40) / 100,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  serviceBtn: {
    width: (deviceWidth * 40) / 100,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  txtBtn: {
    color: '#fff',
    marginLeft: 10,
  },
  plusIco: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: '#fff',
  },
  noDataWrapper: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.075)',
    alignItems: 'center',
    marginTop: 50,
  },
  wrapperContent: {
    marginBottom: 100,
  },
  socialIco: {
    width: 5,
    height: 10,
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    marginBottom: 200,
  },
  txtHeaderYellowWrapper: {
    marginVertical: 5,
  },
  txtHeaderWhite: {
    fontSize: 20,
    color: '#000',
    letterSpacing: 2,
    textAlign: 'center',
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
  donateBtn: {
    width: (deviceWidth * 40) / 100,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  serviceBtn: {
    width: (deviceWidth * 40) / 100,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  txtBtn: {
    color: '#000',
    marginLeft: 10,
  },
  plusIco: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: '#fff',
  },
  noDataWrapper: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.075)',
    alignItems: 'center',
    marginTop: 50,
  },
  wrapperContent: {
    marginBottom: 100,
  },
  socialIco: {
    width: 5,
    height: 10,
  },
});
