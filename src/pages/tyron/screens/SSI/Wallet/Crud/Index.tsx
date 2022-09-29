import React, {useState, useRef} from 'react';
import {TextInput} from 'react-native';
import {Image} from 'react-native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Headline from '../../../../components/Headline/Index';
import DIDLayout from '../../../../components/Layout/DID/Index';
import rightArrow from '../../../../assets/img/right-arrow.png';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const Crud: React.FC<Props> = ({navigation}) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Crud;

const Child: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const isDark = useSelector((state: any) => state.user.isDark);
  const styles = isDark ? stylesDark : stylesLight;
  const [flip1, setFlip1] = useState(false);
  const [flip2, setFlip2] = useState(false);
  const [flip3, setFlip3] = useState(false);
  const [flip4, setFlip4] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [deactivate, setDeactivate] = useState(false);

  const items = [
    {label: t('Select address'), value: ''},
    {label: t('This SSI'), value: 'did'},
    {label: t('Another address'), value: 'address'},
  ];

  const flipAnimation1 = useRef(new Animated.Value(0)).current;
  const flipAnimation2 = useRef(new Animated.Value(0)).current;
  const flipAnimation3 = useRef(new Animated.Value(0)).current;
  const flipAnimation4 = useRef(new Animated.Value(0)).current;

  let flipRotation1 = 0;
  let flipRotation2 = 0;
  let flipRotation3 = 0;
  let flipRotation4 = 0;

  flipAnimation1.addListener(
    ({value}: {value: any}) => (flipRotation1 = value),
  );
  flipAnimation2.addListener(
    ({value}: {value: any}) => (flipRotation2 = value),
  );
  flipAnimation3.addListener(
    ({value}: {value: any}) => (flipRotation3 = value),
  );
  flipAnimation4.addListener(
    ({value}: {value: any}) => (flipRotation4 = value),
  );

  const flip1ToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation1.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flip1ToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation1.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flip2ToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation2.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flip2ToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation2.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flip3ToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation3.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flip3ToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation3.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flip4ToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation4.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flip4ToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation4.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flipToFront = (id: number) => {
    if (id === 1) {
      Animated.timing(flipAnimation1, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlip1(true);
    } else if (id === 2) {
      Animated.timing(flipAnimation2, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlip2(true);
    } else if (id === 3) {
      Animated.timing(flipAnimation3, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlip3(true);
    } else {
      Animated.timing(flipAnimation4, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlip4(true);
    }
  };

  const flipToBack = (id: number) => {
    if (id === 1) {
      Animated.timing(flipAnimation1, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlip1(false);
      }, 300);
    } else if (id === 2) {
      Animated.timing(flipAnimation2, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlip2(false);
      }, 300);
    } else if (id === 3) {
      Animated.timing(flipAnimation3, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlip3(false);
      }, 300);
    } else {
      Animated.timing(flipAnimation4, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlip4(false);
      }, 300);
    }
  };

  const dataHeadline = [
    {
      route: 'Wallet',
      name: t('Wallet'),
    },
  ];

  return (
    <View>
      <Headline navigation={navigation} data={dataHeadline} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderWrapper}>
          <Text style={styles.txtHeader}>{t('DECENTRALIZED IDENTIFIER')}</Text>
        </View>
        <View>
          <View style={styles.cardWrapper}>
            {/* <TouchableOpacity
              onLongPress={() =>
                !!flipRotation4 ? flipToBack(4) : flipToFront(4)
              }
            >
              <Animated.View style={{...styles.cardBack, ...flip4ToBackStyle}}>
                <Text style={styles.txtCardBack}>
                  CREATE DOCUMENT
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip4 ? styles.cardHidden : styles.cardFront),
                  ...flip4ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>
                  {flip4 ? '' : 'CREATE'}
                </Text>
              </Animated.View>
            </TouchableOpacity> */}
            <TouchableOpacity
              onLongPress={() =>
                !!flipRotation1 ? flipToBack(1) : flipToFront(1)
              }
              onPress={() => navigation.navigate('Update')}
            >
              <Animated.View style={{...styles.cardBack, ...flip1ToBackStyle}}>
                <Text style={styles.txtCardBack}>{t('CHANGE DOCUMENT')}</Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip1 ? styles.cardHidden : styles.cardFront),
                  ...flip1ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>{flip1 ? '' : t('UPDATE')}</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              onLongPress={() =>
                !!flipRotation2 ? flipToBack(2) : flipToFront(2)
              }
              onPress={() => navigation.navigate('DIDSocialRecovery')}
            >
              <Animated.View style={{...styles.cardBack, ...flip2ToBackStyle}}>
                <Text style={styles.txtCardBack}>
                  {t('CONFIGURE GUARDIANS')}
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip2 ? styles.cardHidden : styles.cardFront),
                  ...flip2ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>
                  {flip2 ? '' : t('SOCIAL RECOVERY')}
                </Text>
              </Animated.View>
            </TouchableOpacity>
            {!deactivate && (
              <>
                <Text style={styles.txtDanger}>{t('DANGER ZONE')}</Text>
                <TouchableOpacity
                  onLongPress={() =>
                    !!flipRotation3 ? flipToBack(3) : flipToFront(3)
                  }
                  onPress={() => setDeactivate(true)}
                >
                  <Animated.View
                    style={{...styles.cardBack, ...flip3ToBackStyle}}
                  >
                    <Text style={styles.txtCardBack}>
                      {t('PERMANENT DEACTIVATION')}
                    </Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      ...(flip3 ? styles.cardHidden : styles.cardFrontRed),
                      ...flip3ToFrontStyle,
                    }}
                  >
                    <Text style={styles.txtCard}>
                      {flip3 ? '' : t('DEACTIVATE')}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </>
            )}
            {deactivate && (
              <View>
                <Text style={styles.txtDeactivate}>{t('DID DEACTIVATE')}</Text>
                <View style={styles.picker}>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={open}
                    value={value}
                    items={items}
                    multiple={false}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder=""
                    placeholderStyle={{color: '#fff'}}
                    theme="DARK"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: '#fff',
                    }}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.inputAddr}
                    placeholder={t('Type address')}
                    placeholderTextColor="#fff"
                  />
                  <TouchableOpacity style={styles.arrowBtn}>
                    <Image style={styles.arrowRight} source={rightArrow} />
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.btnSave}>
                    <Text>SAVE</Text>
                  </TouchableOpacity> */}
                </View>
                <Text style={styles.txtConfirm}>
                  {t('Are you sure? There is no way back')}
                </Text>
                <View style={styles.btnWrapper}>
                  <TouchableOpacity style={styles.btnYes}>
                    <Text style={{color: '#fff'}}>{t('YES')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setDeactivate(false)}
                    style={styles.btnNo}
                  >
                    <Text style={{color: '#fff'}}>{t('NO')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  txtHeader: {
    fontSize: 20,
    color: '#dbe4eb',
    letterSpacing: 1,
    textAlign: 'center',
  },
  txtHeaderWrapper: {
    marginVertical: 30,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  cardWrapper: {
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardFront: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 10,
  },
  cardFrontRed: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 10,
  },
  cardHidden: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  cardBack: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 5,
    marginVertical: 10,
    borderColor: '#ffff32',
    borderWidth: 2,
  },
  txtCard: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 12,
  },
  txtCardBack: {
    color: '#ffff32',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 20,
  },
  txtDanger: {
    color: 'red',
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 15,
  },
  txtDeactivate: {
    color: 'red',
    fontSize: 16,
    letterSpacing: 1,
    marginTop: 15,
    textAlign: 'center',
  },
  picker: {
    color: '#fff',
    width: deviceWidth * 0.5 + 25,
    alignSelf: 'center',
    marginVertical: 20,
    zIndex: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputAddr: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: '60%',
    color: '#fff',
  },
  btnSave: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnYes: {
    backgroundColor: '#ff3232',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 70,
  },
  btnNo: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 70,
  },
  txtConfirm: {
    marginTop: 20,
    marginBottom: 10,
    color: '#fff',
  },
  arrowRight: {
    width: 15,
    height: 15,
  },
  arrowBtn: {
    backgroundColor: '#5d5c5c',
    padding: 5,
    borderRadius: 50,
    marginLeft: 20,
  },
});

const stylesLight = StyleSheet.create({
  txtHeader: {
    fontSize: 20,
    color: '#000',
    letterSpacing: 1,
    textAlign: 'center',
  },
  txtHeaderWrapper: {
    marginVertical: 30,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  cardWrapper: {
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  cardFront: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 10,
  },
  cardFrontRed: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 10,
  },
  cardHidden: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  cardBack: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 5,
    marginVertical: 10,
    borderColor: '#ffff32',
    borderWidth: 2,
  },
  txtCard: {
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 12,
  },
  txtCardBack: {
    color: '#ffff32',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 20,
  },
  txtDanger: {
    color: 'red',
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 15,
  },
  txtDeactivate: {
    color: 'red',
    fontSize: 16,
    letterSpacing: 1,
    marginTop: 15,
    textAlign: 'center',
  },
  picker: {
    color: '#000',
    width: deviceWidth * 0.5 + 25,
    alignSelf: 'center',
    marginVertical: 20,
    zIndex: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputAddr: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: '60%',
    color: '#000',
  },
  btnSave: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnYes: {
    backgroundColor: '#ff3232',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 70,
  },
  btnNo: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: 70,
  },
  txtConfirm: {
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  arrowRight: {
    width: 15,
    height: 15,
  },
  arrowBtn: {
    backgroundColor: '#5d5c5c',
    padding: 5,
    borderRadius: 50,
    marginLeft: 20,
  },
});
