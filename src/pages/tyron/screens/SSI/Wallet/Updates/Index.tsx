import React, {useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import Headline from '../../../../components/Headline/Index';
import DIDLayout from '../../../../components/Layout/DID/Index';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const Updates: React.FC<Props> = ({navigation}) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Updates;

const Child: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const isDark = useSelector((state: any) => state.user.isDark);
  const styles = isDark ? stylesDark : stylesLight;
  const [flip1, setFlip1] = useState(false);
  const [flip2, setFlip2] = useState(false);
  const [flip3, setFlip3] = useState(false);

  const flipAnimation1 = useRef(new Animated.Value(0)).current;
  const flipAnimation2 = useRef(new Animated.Value(0)).current;
  const flipAnimation3 = useRef(new Animated.Value(0)).current;

  let flipRotation1 = 0;
  let flipRotation2 = 0;
  let flipRotation3 = 0;

  flipAnimation1.addListener(
    ({value}: {value: any}) => (flipRotation1 = value),
  );
  flipAnimation2.addListener(
    ({value}: {value: any}) => (flipRotation2 = value),
  );
  flipAnimation3.addListener(
    ({value}: {value: any}) => (flipRotation3 = value),
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
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.txtHeader}>{t('UPDATES')}</Text>
        </View>
        <View>
          <View style={styles.cardWrapper}>
            <TouchableOpacity
              onLongPress={() =>
                !!flipRotation1 ? flipToBack(1) : flipToFront(1)
              }
            >
              <Animated.View style={{...styles.cardBack, ...flip1ToBackStyle}}>
                <Text style={styles.txtCardBack}>
                  {t('CHANGE THE ADDRESS OF DID CONTROLLER')}
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip1 ? styles.cardHidden : styles.cardFront),
                  ...flip1ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>
                  {flip1 ? '' : t('CONTROLLER')}
                </Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              onLongPress={() =>
                !!flipRotation2 ? flipToBack(2) : flipToFront(2)
              }
            >
              <Animated.View style={{...styles.cardBack, ...flip2ToBackStyle}}>
                <Text style={styles.txtCardBack}>
                  UPDATE THE PUBLIC NAME OF YOUR SSI
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip2 ? styles.cardHidden : styles.cardFront),
                  ...flip2ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>{flip2 ? '' : t('USERNAME')}</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              onLongPress={() =>
                !!flipRotation3 ? flipToBack(3) : flipToFront(3)
              }
            >
              <Animated.View style={{...styles.cardBack, ...flip3ToBackStyle}}>
                <Text style={styles.txtCardBack2}>
                  UPDATE THE MAXIMUM AMOUNT OF BLOCKS THAT YOUR SSI IS WILLING
                  TO WAIT FOR A TRANSACTION TO GET CONFIRED
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip3 ? styles.cardHidden : styles.cardFront),
                  ...flip3ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>{flip3 ? '' : t('DEADLINE')}</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  txtHeaderYellowWrapper: {
    marginVertical: 30,
  },
  txtHeader: {
    fontSize: 20,
    color: '#fff',
    letterSpacing: 2,
    textAlign: 'center',
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
  txtCardBack2: {
    color: '#ffff32',
    textAlign: 'center',
    fontSize: 8,
    lineHeight: 20,
  },
  txtDanger: {
    color: 'red',
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 15,
  },
});

const stylesLight = StyleSheet.create({
  txtHeaderYellowWrapper: {
    marginVertical: 30,
  },
  txtHeader: {
    fontSize: 20,
    color: '#000',
    letterSpacing: 2,
    textAlign: 'center',
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
  txtCardBack2: {
    color: '#ffff32',
    textAlign: 'center',
    fontSize: 8,
    lineHeight: 20,
  },
  txtDanger: {
    color: 'red',
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 15,
  },
});
