import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import {Linking} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, StyleSheet, View, Dimensions, TextInput} from 'react-native';
import CloseIco from '../../../../../assets/img/ic_cross.png';
import continueArrow from '../../../../../assets/img/continue_arrow.png';
import RequestIco from '../../../../../assets/img/swap_request.png';
import ConfirmIco from '../../../../../assets/img/swap_confirm.png';
import RevokeIco from '../../../../../assets/img/swap_revoke.png';
import RejectIco from '../../../../../assets/img/swap_reject.png';
import Donate from '../../../../../components/Donate/Index';
import Selector from '../../../../../components/Selector/Index';
import { tyronThemeDark } from 'app/lib/controller/tyron/theme';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export type Props = {};

const DelegatorSwap: React.FC<Props> = () => {
  const {t} = useTranslation();
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;
  const [active, setActive] = useState('');
  const [recipient, setRecipient] = useState('');

  const toggleActive = (type: string) => {
    if (type === active) {
      setActive('');
    } else {
      setActive(type);
    }
  };

  const optionWallet = [
    {
      key: '',
      name: 'Address',
    },
    {
      key: 'tyron',
      name: 'NFT Username',
    },
    {
      key: 'zilliqa',
      name: 'Zilliqa address',
    },
  ];

  const optionWallet2 = [
    {
      key: '',
      name: 'Address',
    },
    {
      key: 'tyron',
      name: 'This xWallet',
    },
    {
      key: 'zilliqa',
      name: 'This ZilPay',
    },
  ];

  return (
    <View>
      <View style={styles.actionWrapper}>
        <TouchableOpacity
          onPress={() => toggleActive('request')}
          style={
            active === 'request' ? styles.btnActionActive : styles.btnAction
          }
        >
          <Text style={styles.txtBold}>REQUEST</Text>
          <Image source={RequestIco} />
        </TouchableOpacity>
        {active === 'request' && (
          <View style={styles.contentAction}>
            <TouchableOpacity
              onPress={() => toggleActive('')}
              style={styles.closeIcoWrapper}
            >
              <Image style={styles.closeIco} source={CloseIco} />
            </TouchableOpacity>
            <View>
              <Text style={{marginBottom: -5, marginTop: 10, ...styles.txt}}>
                Current Delegator's wallet
              </Text>
              <Selector
                data={optionWallet2}
                selectedData={recipient}
                setData={setRecipient}
              />
            </View>
            <View>
              <Text style={{marginBottom: -5, marginTop: 10, ...styles.txt}}>
                New Delegator's wallet
              </Text>
              <Selector
                data={optionWallet2}
                selectedData={recipient}
                setData={setRecipient}
              />
            </View>
            <Donate />
            <TouchableOpacity style={styles.btnSubmit}>
              <Text style={styles.txtBlue}>REQUEST DELEGATOR SWAP</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                marginTop: 5,
                ...styles.txt,
              }}
            >
              {t('GAS_AROUND')} 1-2 ZIL
            </Text>
          </View>
        )}
      </View>
      <View style={styles.actionWrapper}>
        <TouchableOpacity
          onPress={() => toggleActive('confirm')}
          style={
            active === 'confirm' ? styles.btnActionActive : styles.btnAction
          }
        >
          <Text style={styles.txtBold}>CONFIRM</Text>
          <Image source={ConfirmIco} />
        </TouchableOpacity>
        {active === 'confirm' && (
          <View style={styles.contentAction}>
            <TouchableOpacity
              onPress={() => toggleActive('')}
              style={styles.closeIcoWrapper}
            >
              <Image style={styles.closeIco} source={CloseIco} />
            </TouchableOpacity>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Type address"
                placeholderTextColor={isDark ? '#fff' : '#000'}
              />
              <TouchableOpacity>
                <Image style={styles.arrowSize} source={continueArrow} />
              </TouchableOpacity>
            </View>
            <Donate />
            <TouchableOpacity style={styles.btnSubmit}>
              <Text style={styles.txtBlue}>CONFIRM DELEGATOR SWAP</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                marginTop: 5,
                ...styles.txt,
              }}
            >
              {t('GAS_AROUND')} 1-2 ZIL
            </Text>
          </View>
        )}
      </View>
      <View style={styles.actionWrapper}>
        <TouchableOpacity
          onPress={() => toggleActive('revoke')}
          style={
            active === 'revoke' ? styles.btnActionActive : styles.btnAction
          }
        >
          <Text style={styles.txtBold}>REVOKE</Text>
          <Image source={RevokeIco} />
        </TouchableOpacity>
        {active === 'revoke' && (
          <View style={styles.contentAction}>
            <TouchableOpacity
              onPress={() => toggleActive('')}
              style={styles.closeIcoWrapper}
            >
              <Image style={styles.closeIco} source={CloseIco} />
            </TouchableOpacity>
            <Donate />
            <TouchableOpacity style={styles.btnSubmit}>
              <Text style={styles.txtBlue}>REVOKE DELEGATOR SWAP</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                marginTop: 5,
                ...styles.txt,
              }}
            >
              {t('GAS_AROUND')} 1-2 ZIL
            </Text>
          </View>
        )}
      </View>
      <View style={styles.actionWrapper}>
        <TouchableOpacity
          onPress={() => toggleActive('reject')}
          style={
            active === 'reject' ? styles.btnActionActive : styles.btnAction
          }
        >
          <Text style={styles.txtBold}>REJECT</Text>
          <Image source={RejectIco} />
        </TouchableOpacity>
        {active === 'reject' && (
          <View style={styles.contentAction}>
            <TouchableOpacity
              onPress={() => toggleActive('')}
              style={styles.closeIcoWrapper}
            >
              <Image style={styles.closeIco} source={CloseIco} />
            </TouchableOpacity>
            <View style={styles.wrapperInput}>
              <TextInput
                style={styles.input}
                placeholder="Type address"
                placeholderTextColor={isDark ? '#fff' : '#000'}
              />
              <TouchableOpacity>
                <Image style={styles.arrowSize} source={continueArrow} />
              </TouchableOpacity>
            </View>
            <Donate />
            <TouchableOpacity style={styles.btnSubmit}>
              <Text style={styles.txtBlue}>REJECT DELEGATOR SWAP</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 10,
                textAlign: 'center',
                marginTop: 5,
                ...styles.txt,
              }}
            >
              {t('GAS_AROUND')} 1-2 ZIL
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default DelegatorSwap;

const stylesDark = StyleSheet.create({
  btnAction: {
    width: (deviceWidth * 60) / 100,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  btnActionActive: {
    width: (deviceWidth * 60) / 100,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0000ff',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  txt: {
    color: '#fff',
  },
  txtBold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  txtBlue: {
    color: '#0000ff',
    textAlign: 'center',
  },
  contentAction: {
    width: (deviceWidth * 60) / 100,
    padding: 20,
    borderWidth: 1,
    borderColor: '#0000ff',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    marginVertical: 10,
    zIndex: 2,
  },
  closeIco: {
    width: 10,
    height: 10,
  },
  closeIcoWrapper: {
    alignSelf: 'flex-end',
  },
  actionWrapper: {
    marginVertical: 10,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#0000ff',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: 150,
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
});

const stylesLight = StyleSheet.create({
  btnAction: {
    width: (deviceWidth * 60) / 100,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  btnActionActive: {
    width: (deviceWidth * 60) / 100,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0000ff',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  txt: {
    color: '#fff',
  },
  txtBold: {
    color: '#fff',
    fontWeight: 'bold',
  },
  txtBlue: {
    color: '#0000ff',
    textAlign: 'center',
  },
  contentAction: {
    width: (deviceWidth * 60) / 100,
    padding: 20,
    borderWidth: 1,
    borderColor: '#0000ff',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    marginVertical: 10,
    zIndex: 2,
  },
  closeIco: {
    width: 10,
    height: 10,
  },
  closeIcoWrapper: {
    alignSelf: 'flex-end',
  },
  actionWrapper: {
    marginVertical: 10,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#0000ff',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: 150,
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
});
