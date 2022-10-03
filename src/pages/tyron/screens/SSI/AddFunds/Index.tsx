import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking,
  TextInput,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DIDLayout from '../../../components/Layout/DID/Index';
import Headline from '../../../components/Headline/Index';
import {useTranslation} from 'react-i18next';
import ContinueArrow from '../../../assets/icons/continue_arrow.svg';
import { tyronThemeDark } from 'app/lib/controller/tyron/theme';
import { userName } from 'app/lib/controller/tyron/user';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const AddFunds: React.FC<Props> = ({navigation}) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default AddFunds;

const Child: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const name = userName.useValue()
  const isDark = tyronThemeDark.useValue()
  const styles = isDark ? stylesDark : stylesLight;
  const [openOriginator, setOpenOriginator] = useState(false);
  const [valueOriginator, setValueOriginator] = useState('');
  const [openCoin, setOpenCoin] = useState(false);
  const [valueCoin, setValueCoin] = useState('');
  const [openSSI, setOpenSSI] = useState(false);
  const [valueSSI, setValueSSI] = useState('');

  const itemsOriginator = [
    {label: t('Select originator'), value: ''},
    {label: 'TYRON', value: 'ssi'},
    {label: 'Zilliqa', value: 'zilpay'},
  ];

  const itemsSSI = [
    {label: t('NFT Username'), value: 'nft'},
    {label: t('Address'), value: 'address'},
  ];

  const itemsCoin = [
    {label: t('Select coin'), value: ''},
    {label: 'TYRON', value: 'tyron'},
    {label: '$SI', value: '$si'},
    {label: 'ZIL', value: 'zil'},
  ];

  return (
    <View style={styles.wrapper}>
      <Headline navigation={navigation} data={[]} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.txtHeaderYellow}>{t('ADD FUNDS')}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.txtInfo}>
          {t('You can add funds into X from your SSI or ZilPay.', {name})}
        </Text>
        <View style={styles.picker}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            open={openOriginator}
            value={valueOriginator}
            items={itemsOriginator}
            multiple={false}
            setOpen={setOpenOriginator}
            setValue={setValueOriginator}
            placeholder="Select originator"
            placeholderStyle={{color: '#fff'}}
            theme="DARK"
            style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
          />
        </View>
        {valueOriginator === 'zilpay' && (
          <View style={styles.wrapperZilpayInfo}>
            <Text style={styles.txtZilpayInfo}>
              {t('Wallet')}:{' '}
              <Text
                onPress={() =>
                  Linking.openURL(
                    'https://devex.zilliqa.com/address/zil1pksk4fxxgnwn3ffy7nxrxrgrrpwm2rjl8xaaup?network=https%3A%2F%2Fdev-api.zilliqa.com',
                  )
                }
              >
                zil1pksk4fxxgnwn3ffy7nxrxrgrrpwm2rjl8xaaup
              </Text>
            </Text>
            <Text style={styles.txtZilpayInfo}>Balance: -</Text>
          </View>
        )}
        {valueOriginator === 'ssi' && (
          <View style={styles.pickerSSI}>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={openSSI}
              value={valueSSI}
              items={itemsSSI}
              multiple={false}
              setOpen={setOpenSSI}
              setValue={setValueSSI}
              placeholder={t('Log in')}
              placeholderStyle={{color: '#fff'}}
              theme="DARK"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
            />
          </View>
        )}
        {valueSSI === 'nft' ? (
          <View style={styles.wrapperDomain}>
            <TextInput
              placeholder={t('Type username')}
              placeholderTextColor="#fff"
              style={styles.inputAddress}
            />
            <TouchableOpacity>
              <ContinueArrow width={30} height={30} />
            </TouchableOpacity>
          </View>
        ) : valueSSI === 'address' ? (
          <View style={styles.wrapperDomain}>
            <TextInput
              placeholder={t('Type address')}
              placeholderTextColor="#fff"
              style={styles.inputAddress}
            />
            <TouchableOpacity>
              <ContinueArrow width={30} height={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
        {valueOriginator === 'zilpay' ||
        (valueOriginator === 'ssi' && valueSSI !== '') ? (
          <View style={styles.selectCoinWrapper}>
            <Text style={styles.txtCoin}>
              {t('ADD_FUNDS_INTO_TITLE')}{' '}
              <Text style={{color: '#ffff32'}}>ilhambagas.did</Text>
            </Text>
            <View style={styles.pickerCoin}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={openCoin}
                value={valueCoin}
                items={itemsCoin}
                multiple={false}
                setOpen={setOpenCoin}
                setValue={setValueCoin}
                placeholder="Select coin"
                placeholderStyle={{color: '#fff'}}
                theme="DARK"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
              />
            </View>
          </View>
        ) : (
          <></>
        )}
        {valueCoin !== '' && (
          <View style={styles.coinInputWrapper}>
            <Text style={styles.txtCoinType}>{valueCoin}</Text>
            <TextInput
              placeholder={t('Type amount')}
              placeholderTextColor="#fff"
              style={styles.coinInput}
            />
            <TouchableOpacity>
              <ContinueArrow width={30} height={30} />
            </TouchableOpacity>
          </View>
        )}
        {valueCoin !== '' && (
          <View>
            <TouchableOpacity style={styles.btnTransfer}>
              <Text style={styles.btnTransferTxt}>
                {t('TRANSFER')}{' '}
                <Text style={{color: '#ffff32', textTransform: 'uppercase'}}>
                  1 {valueCoin}
                </Text>{' '}
                {t('TO')} <Text style={{color: '#ffff32'}}>ilhambagas.did</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.txtGas}>{t('GAS_AROUND')} 4-7 zil</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 150,
  },
  txtHeaderYellowWrapper: {
    marginVertical: 5,
    marginTop: 50,
  },
  txtHeaderYellow: {
    fontSize: 20,
    color: 'silver',
    letterSpacing: 2,
    textAlign: 'center',
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  txtInfo: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  picker: {
    color: '#fff',
    width: deviceWidth * 0.6 + 25,
    marginVertical: 30,
    zIndex: 4,
    alignSelf: 'center',
  },
  pickerSSI: {
    color: '#fff',
    width: deviceWidth * 0.6 + 25,
    zIndex: 3,
    alignSelf: 'center',
  },
  pickerDomain: {
    color: '#fff',
    width: deviceWidth * 0.3,
    zIndex: 3,
  },
  pickerCoin: {
    color: '#fff',
    width: deviceWidth * 0.6 + 25,
    marginVertical: 10,
    alignSelf: 'center',
    zIndex: 3,
  },
  wrapperZilpayInfo: {
    marginLeft: 10,
    marginTop: -20,
  },
  txtZilpayInfo: {
    fontSize: 14,
    color: '#fff',
  },
  txtCoin: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'center',
    zIndex: 1,
  },
  selectCoinWrapper: {
    marginVertical: 30,
  },
  coinInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
    alignItems: 'center',
  },
  txtCoinType: {
    color: '#fff',
    textTransform: 'uppercase',
    backgroundColor: 'hsla(0,0%,100%,.075)',
    padding: 10,
    borderRadius: 5,
  },
  coinInput: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: deviceWidth * 0.3,
    color: '#fff',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  buttonContinue: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  btnTransfer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnTransferTxt: {
    color: '#fff',
    letterSpacing: 1,
  },
  txtGas: {
    color: 'silver',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 10,
  },
  wrapperDomain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputDomain: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: deviceWidth * 0.3,
    color: '#fff',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  inputAddress: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: deviceWidth * 0.5,
    color: '#fff',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  button: {
    width: 60,
    height: 40,
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchIco: {
    width: 17,
    height: 17,
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 150,
  },
  txtHeaderYellowWrapper: {
    marginVertical: 5,
    marginTop: 50,
  },
  txtHeaderYellow: {
    fontSize: 20,
    color: '#000',
    letterSpacing: 2,
    textAlign: 'center',
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  txtInfo: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
  },
  picker: {
    color: '#000',
    width: deviceWidth * 0.6 + 25,
    marginVertical: 30,
    zIndex: 4,
    alignSelf: 'center',
  },
  pickerSSI: {
    color: '#000',
    width: deviceWidth * 0.6 + 25,
    zIndex: 3,
    alignSelf: 'center',
  },
  pickerDomain: {
    color: '#000',
    width: deviceWidth * 0.3,
    zIndex: 3,
  },
  pickerCoin: {
    color: '#000',
    width: deviceWidth * 0.6 + 25,
    marginVertical: 10,
    alignSelf: 'center',
    zIndex: 3,
  },
  wrapperZilpayInfo: {
    marginLeft: 10,
    marginTop: -20,
  },
  txtZilpayInfo: {
    fontSize: 14,
    color: '#000',
  },
  txtCoin: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'center',
    zIndex: 1,
  },
  selectCoinWrapper: {
    marginVertical: 30,
  },
  coinInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 50,
    alignItems: 'center',
  },
  txtCoinType: {
    color: '#000',
    textTransform: 'uppercase',
    backgroundColor: 'hsla(0,0%,100%,.075)',
    padding: 10,
    borderRadius: 5,
  },
  coinInput: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: deviceWidth * 0.3,
    color: '#000',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  buttonContinue: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  btnTransfer: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'center',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnTransferTxt: {
    color: '#000',
    letterSpacing: 1,
  },
  txtGas: {
    color: 'silver',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginVertical: 10,
    alignSelf: 'center',
    fontSize: 10,
  },
  wrapperDomain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputDomain: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: deviceWidth * 0.3,
    color: '#000',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  inputAddress: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    width: deviceWidth * 0.5,
    color: '#000',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  button: {
    width: 60,
    height: 40,
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  searchIco: {
    width: 17,
    height: 17,
  },
});
