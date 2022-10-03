import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import * as zaccount from '@zilliqa-js/account';
import * as zcrypto from '@zilliqa-js/crypto';
import {HTTPProvider} from '@zilliqa-js/core';
import * as tyron from '../../../../node_modules/tyron';
import lightning from '../assets/img/lightning.jpg';
import lightning_light from '../assets/img/lightning_gris.jpg';
import EncryptedStorage from 'react-native-encrypted-storage';
import { tyronThemeDark } from 'app/lib/controller/tyron/theme';

export type Props = {
  navigation: any;
};

const deviceWidth = Dimensions.get('screen').width;

const Account: React.FC<Props> = ({navigation}) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [secretPhrase, setSecretPhrase] = useState('');
  const [privKey, setPrivKey] = useState('');
  const [loading, setLoading] = useState(false);
  const isDark = tyronThemeDark.useValue()
  const lightning_ = isDark ? lightning : lightning_light;

  const submitSecretPhrase = async () => {
    const provider = new HTTPProvider('https://dev-api.zilliqa.com');
    const wallet = new zaccount.Wallet(provider);
    if (secretPhrase.split(' ').length === 12) {
      Alert.alert('Should be 12 phrase!');
    } else {
      try {
        const address = await wallet.addByMnemonic(secretPhrase.toLowerCase());
        console.log(address);
        const res = {
          address: address,
          bech32Address: zcrypto.toBech32Address(address),
          privateKey: '',
        };
        EncryptedStorage.setItem('zilliqa', JSON.stringify(res)).then(() => {
          setLoading(false);
          navigation.navigate('Welcome');
          resetState();
        });
      } catch {
        Alert.alert('Invalid mnemonic phrase');
      }
    }
  };

  const submitPrivateKey = async () => {
    setLoading(true);
    try {
      const wallet = new zaccount.Account(privKey.toLowerCase());
      EncryptedStorage.setItem('zilliqa', JSON.stringify(wallet)).then(() => {
        setLoading(false);
        navigation.navigate('Welcome');
        resetState();
      });
      console.log(wallet);
    } catch {
      setLoading(false);
      Alert.alert('Invalid private key');
    }
  };

  const createNew = async () => {
    setLoading(true);
    try {
      tyron.Wallet.default.generateZilliqa().then(res => {
        const wallet = new zaccount.Account(res);
        console.log(wallet);
        EncryptedStorage.setItem('zilliqa', JSON.stringify(wallet)).then(() => {
          setLoading(false);
          navigation.navigate('Welcome');
          resetState();
        });
      });
    } catch {
      setLoading(false);
      Alert.alert('Failed to create new wallet');
    }
  };

  const resetState = () => {
    setSelectedMethod('');
    setSecretPhrase('');
    setPrivKey('');
  };

  return (
    <ImageBackground source={lightning_} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.headerWrapper}>
            <Text style={styles.textHeader}>Add Wallet</Text>
          </View>
          {loading ? (
            <ActivityIndicator style={{marginTop: 20}} color="#fff" />
          ) : (
            <View style={styles.contentWrapper}>
              {selectedMethod !== '1' && (
                <TouchableOpacity
                  onPress={() => setSelectedMethod('1')}
                  style={styles.btn}
                >
                  <Text style={styles.btnTxt}>Secret Phrase</Text>
                </TouchableOpacity>
              )}
              {selectedMethod === '1' && (
                <View>
                  <TextInput
                    onChangeText={setSecretPhrase}
                    placeholder="Enter secret phrase"
                    placeholderTextColor="#c0c0c0"
                    style={styles.inputForm}
                    multiline
                  />
                  <TouchableOpacity
                    onPress={submitSecretPhrase}
                    style={styles.btnBlack}
                  >
                    <Text style={styles.btnTxtBlack}>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.txtOr}>or</Text>
              {selectedMethod !== '2' && (
                <TouchableOpacity
                  onPress={() => setSelectedMethod('2')}
                  style={styles.btn}
                >
                  <Text style={styles.btnTxt}>Private Key</Text>
                </TouchableOpacity>
              )}
              {selectedMethod === '2' && (
                <View>
                  <TextInput
                    onChangeText={setPrivKey}
                    placeholder="Enter private key"
                    placeholderTextColor="#c0c0c0"
                    style={styles.inputForm}
                    multiline
                  />
                  <TouchableOpacity
                    onPress={submitPrivateKey}
                    style={styles.btnBlack}
                  >
                    <Text style={styles.btnTxtBlack}>Submit</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity onPress={createNew}>
                <Text style={styles.txtCreateNew}>Create new wallet</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerWrapper: {
    alignItems: 'center',
  },
  textHeader: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
  },
  contentWrapper: {
    alignItems: 'center',
    marginTop: 150,
  },
  btn: {
    width: deviceWidth - (deviceWidth * 40) / 100,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btnBlack: {
    width: deviceWidth - (deviceWidth * 40) / 100,
    height: 45,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#ffff32',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnTxtBlack: {
    color: '#ffff32',
    fontWeight: 'bold',
  },
  txtOr: {
    color: '#fff',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  txtCreateNew: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 50,
  },
  inputForm: {
    width: deviceWidth - (deviceWidth * 40) / 100,
    height: 100,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    color: '#fff',
    padding: 10,
    marginVertical: 20,
    textTransform: 'lowercase',
  },
});
