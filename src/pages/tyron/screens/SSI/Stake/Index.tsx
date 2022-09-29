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
import {useSelector} from 'react-redux';
import SearchBar from '../../../components/SearchBar/Index';
import Footer from '../../../components/Footer/Index';
import lightning from '../../../assets/img/lightning.jpg';
import lightning_light from '../../../assets/img/lightning_gris.jpg';
import Menu from '../../../components/Menu/Index';
import Modal from '../../../components/Modal/Index';
import GetStarted from '../../../components/GetStarted/Index';
import Headline from '../../../components/Headline/Index';
import Dashboard from '../../../components/Dashboard/Index';
import {useTranslation} from 'react-i18next';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const Stake: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [loginState, setLoginState] = useState('');
  const [flipWallet, setFlipWallet] = useState(false);
  const [flipDid, setFlipDid] = useState(false);
  const name = useSelector((state: any) => state.user.name);
  const domain = useSelector((state: any) => state.user.domain);
  const isDark = useSelector((state: any) => state.user.isDark);
  const lightning_ = isDark ? lightning : lightning_light;
  const styles = isDark ? stylesDark : stylesLight;

  const flipAnimation = useRef(new Animated.Value(0)).current;
  const flipAnimationDid = useRef(new Animated.Value(0)).current;
  const flipAnimationSoc = useRef(new Animated.Value(0)).current;
  const flipAnimationFund = useRef(new Animated.Value(0)).current;

  let flipRotation = 0;
  let flipRotationDid = 0;

  flipAnimation.addListener(({value}: {value: any}) => (flipRotation = value));
  flipAnimationDid.addListener(
    ({value}: {value: any}) => (flipRotationDid = value),
  );

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flipDidToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimationDid.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };
  const flipDidToBackStyle = {
    transform: [
      {
        rotateY: flipAnimationDid.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const flipToFront = (id: string) => {
    if (id === 'did') {
      Animated.timing(flipAnimationDid, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlipDid(true);
    } else {
      Animated.timing(flipAnimation, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlipWallet(true);
    }
  };

  const flipToBack = (id: string) => {
    if (id === 'did') {
      Animated.timing(flipAnimationDid, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlipDid(false);
      }, 300);
    } else {
      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlipWallet(false);
      }, 300);
    }
  };

  const dataBreadcrumbs = [
    {
      name: 'homepage',
      route: '',
    },
  ];

  return (
    <ImageBackground source={lightning_} style={styles.container}>
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        showConnect={setShowConnect}
        showGetStarted={setShowGetStarted}
      />
      <GetStarted visible={showGetStarted} showGetStarted={setShowGetStarted} />
      <Modal
        navigation={() => {}}
        visible={showConnect}
        hideModal={() => setShowConnect(false)}
        setLoginState={setLoginState}
      />
      {!showMenu && !showConnect && !showGetStarted && (
        <ScrollView>
          <Dashboard
            loginState={loginState}
            setShowMenu={setShowMenu}
            setLoginState={setLoginState}
            setShowConnect={setShowConnect}
          />
          <View style={styles.wrapperContent}>
            <SearchBar navigation={navigation} />
            <Headline navigation={navigation} data={dataBreadcrumbs} />
            <View style={styles.textHeaderWrapper}>
              <Text style={styles.txtHeader}>DID DOMAIN</Text>
              <Text style={styles.cardBluetxtHeaderBlue}>
                {name}.{domain}
              </Text>
            </View>
            <View>
              <View style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Doc')}
                  onLongPress={() =>
                    !!flipRotationDid ? flipToBack('did') : flipToFront('did')
                  }
                >
                  <Animated.View
                    style={{...styles.cardBack, ...flipDidToBackStyle}}
                  >
                    <Text style={styles.txtCardBack}>{t('TOP UP WALLET')}</Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      ...(flipDid ? styles.cardHidden : styles.cardBlue),
                      ...flipDidToFrontStyle,
                    }}
                  >
                    <Text style={styles.txtCard}>
                      {flipDid ? '' : t('ADD FUNDS')}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('StakeWallet')}
                  onLongPress={() =>
                    !!flipRotation
                      ? flipToBack('wallet')
                      : flipToFront('wallet')
                  }
                >
                  <Animated.View
                    style={{...styles.cardBack, ...flipToBackStyle}}
                  >
                    <Text style={styles.txtCardBack}>WEB3</Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      ...(flipWallet ? styles.cardHidden : styles.cardBlue),
                      ...flipToFrontStyle,
                    }}
                  >
                    <Text style={styles.txtCard}>
                      {flipWallet ? '' : t('WALLET')}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Footer navigation={navigation} />
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default Stake;

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  wrapperContent: {
    marginVertical: 25,
  },
  txtHeader: {
    fontSize: 10,
    color: '#dbe4eb',
    letterSpacing: 1,
  },
  cardBluetxtHeaderBlue: {
    fontSize: 25,
    color: '#0000ff',
    marginVertical: 5,
    letterSpacing: 1,
  },
  textHeaderWrapper: {
    marginVertical: 40,
    alignSelf: 'center',
  },
  cardWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  cardBlue: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    borderColor: '#dbe4eb',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
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
    backgroundColor: '#dbe4eb',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: '#0000ff',
    borderWidth: 2,
  },
  cardWhite: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12.5,
    position: 'absolute',
  },
  txtCard: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 20,
  },
  txtCardBack: {
    color: '#0000ff',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 20,
  },
  picker: {
    color: '#fff',
    width: deviceWidth * 0.6 + 25,
    alignSelf: 'center',
    marginVertical: 30,
  },
});

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  wrapperContent: {
    marginVertical: 25,
  },
  txtHeader: {
    fontSize: 10,
    color: '#000',
    letterSpacing: 1,
  },
  cardBluetxtHeaderBlue: {
    fontSize: 25,
    color: '#0000ff',
    marginVertical: 5,
    letterSpacing: 1,
  },
  textHeaderWrapper: {
    marginVertical: 40,
    alignSelf: 'center',
  },
  cardWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  cardBlue: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    borderColor: '#dbe4eb',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
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
    backgroundColor: '#dbe4eb',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 5,
    marginHorizontal: 10,
    borderColor: '#0000ff',
    borderWidth: 2,
  },
  cardWhite: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12.5,
    position: 'absolute',
  },
  txtCard: {
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 20,
  },
  txtCardBack: {
    color: '#0000ff',
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 20,
  },
  picker: {
    color: '#fff',
    width: deviceWidth * 0.6 + 25,
    alignSelf: 'center',
    marginVertical: 30,
  },
});
