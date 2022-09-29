import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {passcodeKey} from '../redux/actions/user';
import lightning from '../assets/img/lightning.jpg';
import lightning_light from '../assets/img/lightning_gris.jpg';
import deleteIco from '../assets/img/delete.png';
import {setLogin} from '../redux/actions/isLogin';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useTranslation} from 'react-i18next';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export type Props = {
  navigation: any;
};

const Login: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const {i18n} = useTranslation();
  const [passcode, setPasscode] = useState(Array());
  const [passcode2, setPasscode2] = useState(Array());
  const [phase, setPhase] = useState(1);
  const _passcode = useSelector((state: any) => state.user.passcode);
  const language = useSelector((state: any) => state.user.lang);
  const [wallet, setWallet] = useState();
  const isDark = useSelector((state: any) => state.user.isDark);
  const lightning_ = isDark ? lightning : lightning_light;
  const styles = isDark ? stylesDark : stylesLight;

  useEffect(() => {
    EncryptedStorage.getItem('zilliqa').then((res: any) => {
      setWallet(res);
    });
  });

  useEffect(() => {
    i18n
      .changeLanguage(language)
      .then(() => {})
      .catch(err => console.log(err));
  }, []);

  const checkPasscode = (index: number) => {
    if (phase === 1) {
      if (passcode[index] !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      if (passcode2[index] !== undefined) {
        return true;
      } else {
        return false;
      }
    }
  };

  const inputPasscode = (val: number) => {
    if (phase === 1 && _passcode === '') {
      if (passcode.length < 6) {
        let newArr = [...passcode, val];
        setPasscode(newArr);
      }
    } else if (phase === 2) {
      if (passcode2.length < 6) {
        let newArr = [...passcode2, val];
        setPasscode2(newArr);
      }
    } else {
      if (passcode.length < 6) {
        let newArr = [...passcode, val];
        setPasscode(newArr);
        if (newArr.length === 6) {
          if (newArr.toString() === _passcode.toString()) {
            if (wallet === undefined || wallet === null) {
              navigation.navigate('Account');
            } else {
              navigation.navigate('Welcome');
            }
            dispatch(setLogin(true));
            setPasscode([]);
          } else {
            Alert.alert('Wrong passcode');
            setPasscode([]);
          }
        }
      }
    }
  };

  const deletePasscode = () => {
    if (phase === 1) {
      let arr = passcode.slice(0, -1);
      setPasscode(arr);
    } else {
      let arr = passcode2.slice(0, -1);
      setPasscode2(arr);
    }
  };

  const headerText = () => {
    if (_passcode === '') {
      if (phase === 1) {
        return 'Create Your Security Code';
      } else {
        return 'Confirm Your Security Code';
      }
    } else {
      return 'Enter Your Security Code';
    }
  };

  const confirmPasscode = () => {
    if (passcode.toString() === passcode2.toString()) {
      dispatch(passcodeKey(passcode));
      setPasscode([]);
      setPasscode2([]);
      setPhase(1);
    } else {
      Alert.alert("Passcode didn't match");
      setPasscode([]);
      setPasscode2([]);
      setPhase(1);
    }
  };

  const disconnect = () => {
    EncryptedStorage.removeItem('zilliqa')
      .then(() => {
        dispatch(passcodeKey(''));
        dispatch(setLogin(false));
      })
      .catch(() => {
        dispatch(passcodeKey(''));
        dispatch(setLogin(false));
      });
  };

  return (
    <ImageBackground source={lightning_} style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.textHeader}>{headerText()}</Text>
        <View style={styles.bulletWrapper}>
          {checkPasscode(0) ? (
            <View style={styles.bulletActive} />
          ) : (
            <View style={styles.bulletInactive} />
          )}
          {checkPasscode(1) ? (
            <View style={styles.bulletActive} />
          ) : (
            <View style={styles.bulletInactive} />
          )}
          {checkPasscode(2) ? (
            <View style={styles.bulletActive} />
          ) : (
            <View style={styles.bulletInactive} />
          )}
          {checkPasscode(3) ? (
            <View style={styles.bulletActive} />
          ) : (
            <View style={styles.bulletInactive} />
          )}
          {checkPasscode(4) ? (
            <View style={styles.bulletActive} />
          ) : (
            <View style={styles.bulletInactive} />
          )}
          {checkPasscode(5) ? (
            <View style={styles.bulletActive} />
          ) : (
            <View style={styles.bulletInactive} />
          )}
        </View>
        {_passcode !== '' && (
          <TouchableOpacity onPress={disconnect}>
            <Text style={styles.txtForgot}>Forgot passcode? Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.btnNumWrapper}>
        <View style={styles.btnNumRow}>
          <TouchableOpacity
            onPress={() => inputPasscode(1)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputPasscode(2)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputPasscode(3)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnNumRow}>
          <TouchableOpacity
            onPress={() => inputPasscode(4)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputPasscode(5)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputPasscode(6)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnNumRow}>
          <TouchableOpacity
            onPress={() => inputPasscode(7)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputPasscode(8)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => inputPasscode(9)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnNumRow}>
          <View style={styles.btnNum} />
          <TouchableOpacity
            onPress={() => inputPasscode(0)}
            style={styles.btnNum}
          >
            <Text style={styles.btnNumTxt}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={deletePasscode} style={styles.btnNum}>
            <Image style={styles.deleteIco} source={deleteIco} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerWrapper}>
        {phase === 1 && _passcode === '' && (
          <TouchableOpacity
            onPress={() => setPhase(2)}
            style={styles.continueBtn}
          >
            <Text style={styles.continueBtnTxt}>Continue</Text>
          </TouchableOpacity>
        )}
        {phase === 2 && (
          <>
            <TouchableOpacity
              onPress={confirmPasscode}
              style={styles.continueBtn}
            >
              <Text style={styles.continueBtnTxt}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPhase(1)}>
              <Text style={styles.continueBtnTxtBack}>Back</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default Login;

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerWrapper: {
    alignItems: 'center',
    flex: 10,
    maxHeight: 150,
  },
  footerWrapper: {
    alignItems: 'center',
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  bulletWrapper: {
    flexDirection: 'row',
    marginTop: 50,
  },
  bulletInactive: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  bulletActive: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  btnNumWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: 400,
  },
  btnNumRow: {
    flexDirection: 'row',
    marginVertical: deviceHeight * 0.02,
  },
  btnNum: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: deviceWidth * 0.04,
  },
  btnNumTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
  deleteIco: {
    width: 25,
    height: 25,
  },
  continueBtn: {
    width: deviceWidth - 60,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  continueBtnTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  continueBtnTxtBack: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  txtForgot: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerWrapper: {
    alignItems: 'center',
    flex: 10,
    maxHeight: 150,
  },
  footerWrapper: {
    alignItems: 'center',
  },
  textHeader: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  bulletWrapper: {
    flexDirection: 'row',
    marginTop: 50,
  },
  bulletInactive: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  bulletActive: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  btnNumWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    maxHeight: 400,
  },
  btnNumRow: {
    flexDirection: 'row',
    marginVertical: deviceHeight * 0.02,
  },
  btnNum: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: deviceWidth * 0.05,
  },
  btnNumTxt: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
  },
  deleteIco: {
    width: 25,
    height: 25,
  },
  continueBtn: {
    width: deviceWidth - 60,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  continueBtnTxt: {
    color: '#000',
    fontWeight: 'bold',
  },
  continueBtnTxtBack: {
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  txtForgot: {
    color: '#000',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
