import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import Headline from '../../../../components/Headline/Index';
import DIDLayout from '../../../../components/Layout/DID/Index';
import CloseIco from '../../../../assets/img/ic_cross.png';
import PauseIco from '../../../../assets/img/pause.png';
import WithdrawRewardsIco from '../../../../assets/img/withdraw_stake_rewards.png';
import WithdrawStakeIco from '../../../../assets/img/withdraw_stake_amount.png';
import DelegateStakeIco from '../../../../assets/img/delegate_stake.png';
import CompleteWithdrawalIco from '../../../../assets/img/complete_stake_withdrawal.png';
import RedelegateStakeIco from '../../../../assets/img/redelegate_stake.png';
import SwapIco from '../../../../assets/img/swap.png';
import continueArrow from '../../../../assets/img/continue_arrow.png';
import defaultCheckmark from '../../../../assets/img/default_checkmark.png';
import selectedCheckmark from '../../../../assets/img/selected_checkmark_blue.png';
import Donate from '../../../../components/Donate/Index';
import InputZil from './InputZil/Index';
import Selector from '../../../../components/Selector/Index';
import {TextInput} from 'react-native';
import SSNSelector from './SSNSelector/Index';
import DelegatorSwap from './DelegatorSwap/Index';
import DashboardStake from './DashboardStake/Index';

const deviceWidth = Dimensions.get('screen').width;

export type Props = {
  navigation: any;
};

const StakeWallet: React.FC<Props> = ({navigation}) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default StakeWallet;

const Child: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const name = useSelector((state: any) => state.user.name);
  const domain = useSelector((state: any) => state.user.domain);
  const isDark = useSelector((state: any) => state.user.isDark);
  const styles = isDark ? stylesDark : stylesLight;

  const [active, setActive] = useState('');
  const [recipient, setRecipient] = useState('');
  const [ssn, setSsn] = useState('');
  const [addZil, setAddZil] = useState(false);

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
      <Headline navigation={navigation} data={[]} />
      <View style={styles.textHeaderWrapper}>
        <Text style={styles.txtHeader}>ZIL STAKING WALLET</Text>
      </View>
      <DashboardStake />
      <View>
        <View>
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              onPress={() => toggleActive('pause')}
              style={
                active === 'pause' ? styles.btnActionActive : styles.btnAction
              }
            >
              <Text style={styles.txtBold}>PAUSE</Text>
              <Image source={PauseIco} />
            </TouchableOpacity>
            {active === 'pause' && (
              <View style={styles.contentAction}>
                <TouchableOpacity
                  onPress={() => toggleActive('')}
                  style={styles.closeIcoWrapper}
                >
                  <Image style={styles.closeIco} source={CloseIco} />
                </TouchableOpacity>
                <Donate />
                <TouchableOpacity style={styles.btnSubmit}>
                  <Text style={styles.txtBlue}>
                    PAUSE {name}.{domain}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: 'center',
                    marginTop: 5,
                    ...styles.txt,
                  }}
                >
                  Cost is less than 2 ZIL
                </Text>
              </View>
            )}
          </View>
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              onPress={() => toggleActive('sendZil')}
              style={
                active === 'sendZil' ? styles.btnActionActive : styles.btnAction
              }
            >
              <Text style={styles.txtBold}>SEND ZIL</Text>
              <Image source={continueArrow} />
            </TouchableOpacity>
            {active === 'sendZil' && (
              <View style={styles.contentAction}>
                <TouchableOpacity
                  onPress={() => toggleActive('')}
                  style={styles.closeIcoWrapper}
                >
                  <Image style={styles.closeIco} source={CloseIco} />
                </TouchableOpacity>
                <InputZil />
                <Selector
                  data={optionWallet}
                  selectedData={recipient}
                  setData={setRecipient}
                />
                {recipient === 'tyron' ? (
                  <View style={styles.wrapperInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Type username"
                      placeholderTextColor={isDark ? '#fff' : '#000'}
                    />
                    <TouchableOpacity>
                      <Image style={styles.arrowSize} source={continueArrow} />
                    </TouchableOpacity>
                  </View>
                ) : recipient === 'zilliqa' ? (
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
                ) : (
                  <></>
                )}
                <Donate />
                <TouchableOpacity style={styles.btnSubmit}>
                  <Text style={styles.txtBlue}>WITHDRAW 1 ZIL</Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 10,
                    textAlign: 'center',
                    marginTop: 5,
                    ...styles.txt,
                  }}
                >
                  {t('GAS_AROUND')} 3 ZIL
                </Text>
              </View>
            )}
          </View>
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              onPress={() => toggleActive('delegateStake')}
              style={
                active === 'delegateStake'
                  ? styles.btnActionActive
                  : styles.btnAction
              }
            >
              <Text style={styles.txtBold}>DELEGATE STAKE</Text>
              <Image source={DelegateStakeIco} />
            </TouchableOpacity>
            {active === 'delegateStake' && (
              <View style={styles.contentAction}>
                <TouchableOpacity
                  onPress={() => toggleActive('')}
                  style={styles.closeIcoWrapper}
                >
                  <Image style={styles.closeIco} source={CloseIco} />
                </TouchableOpacity>
                <SSNSelector
                  onChange={setSsn}
                  title="Staked Seed Node ID"
                  value={ssn}
                />
                <InputZil />
                <View style={styles.addZilWrapper}>
                  <TouchableOpacity onPress={() => setAddZil(!addZil)}>
                    <Image
                      source={addZil ? selectedCheckmark : defaultCheckmark}
                    />
                  </TouchableOpacity>
                  <Text style={{marginLeft: 10, ...styles.txt}}>
                    Add ZIL from DID Controller
                  </Text>
                </View>
                {addZil && <InputZil />}
                <Donate />
                <TouchableOpacity style={styles.btnSubmit}>
                  <Text style={styles.txtBlue}>
                    DELEGATE 10 ZIL to Moonlet.io
                  </Text>
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
              onPress={() => toggleActive('getRewards')}
              style={
                active === 'getRewards'
                  ? styles.btnActionActive
                  : styles.btnAction
              }
            >
              <Text style={styles.txtBold}>GET REWARDS</Text>
              <Image source={WithdrawRewardsIco} />
            </TouchableOpacity>
            {active === 'getRewards' && (
              <View style={styles.contentAction}>
                <TouchableOpacity
                  onPress={() => toggleActive('')}
                  style={styles.closeIcoWrapper}
                >
                  <Image style={styles.closeIco} source={CloseIco} />
                </TouchableOpacity>
                <View>
                  <Text
                    style={{marginBottom: -5, marginTop: 10, ...styles.txt}}
                  >
                    Current Delegator's wallet
                  </Text>
                  <Selector
                    data={optionWallet2}
                    selectedData={recipient}
                    setData={setRecipient}
                  />
                </View>
                <SSNSelector
                  onChange={setSsn}
                  title="Staked Seed Node ID"
                  value={ssn}
                />
                <Donate />
                <TouchableOpacity style={styles.btnSubmit}>
                  <Text style={styles.txtBlue}>WITHDRAW REWARDS</Text>
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
              onPress={() => toggleActive('withdrawStake')}
              style={
                active === 'withdrawStake'
                  ? styles.btnActionActive
                  : styles.btnAction
              }
            >
              <Text style={styles.txtBold}>WITHDRAW STAKE</Text>
              <Image source={WithdrawStakeIco} />
            </TouchableOpacity>
            {active === 'withdrawStake' && (
              <View style={styles.contentAction}>
                <TouchableOpacity
                  onPress={() => toggleActive('')}
                  style={styles.closeIcoWrapper}
                >
                  <Image style={styles.closeIco} source={CloseIco} />
                </TouchableOpacity>
                <SSNSelector
                  onChange={setSsn}
                  title="Staked Seed Node ID"
                  value={ssn}
                />
                <InputZil />
                <Donate />
                <TouchableOpacity style={styles.btnSubmit}>
                  <Text style={styles.txtBlue}>
                    WITHDRAW 10 ZIL from Moonlet.io
                  </Text>
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
              onPress={() => toggleActive('completeStake')}
              style={
                active === 'completeStake'
                  ? styles.btnActionActive
                  : styles.btnAction
              }
            >
              <Text style={styles.txtBold}>COMPLETE STAKE WITHDRAWAL</Text>
              <Image source={CompleteWithdrawalIco} />
            </TouchableOpacity>
            {active === 'completeStake' && (
              <View style={styles.contentAction}>
                <TouchableOpacity
                  onPress={() => toggleActive('')}
                  style={styles.closeIcoWrapper}
                >
                  <Image style={styles.closeIco} source={CloseIco} />
                </TouchableOpacity>
                <Donate />
                <TouchableOpacity style={styles.btnSubmit}>
                  <Text style={styles.txtBlue}>COMPLETE WITHDRAWAL</Text>
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
              onPress={() => toggleActive('redelegateStake')}
              style={
                active === 'redelegateStake'
                  ? styles.btnActionActive
                  : styles.btnAction
              }
            >
              <Text style={styles.txtBold}>REDELEGATE STAKE</Text>
              <Image source={RedelegateStakeIco} />
            </TouchableOpacity>
            {active === 'redelegateStake' && (
              <View style={styles.contentAction}>
                <TouchableOpacity
                  onPress={() => toggleActive('')}
                  style={styles.closeIcoWrapper}
                >
                  <Image style={styles.closeIco} source={CloseIco} />
                </TouchableOpacity>
                <SSNSelector
                  onChange={setSsn}
                  title="Current Staked Seed Node ID"
                  value={ssn}
                />
                <SSNSelector
                  onChange={setSsn}
                  title="New Staked Seed Node ID"
                  value={ssn}
                />
                <InputZil />
                <Donate />
                <TouchableOpacity style={styles.btnSubmit}>
                  <Text style={styles.txtBlue}>
                    REDELEGATE 10 ZIL from Moonlet.io to Zillet
                  </Text>
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
              onPress={() => toggleActive('delegatorSwap')}
              style={
                active === 'delegatorSwap'
                  ? styles.btnActionActive
                  : styles.btnAction
              }
            >
              <Text style={styles.txtBold}>DELEGATOR SWAP</Text>
              <Image source={SwapIco} />
            </TouchableOpacity>
            {active === 'delegatorSwap' && (
              <View style={{marginLeft: 50}}>
                <DelegatorSwap />
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  txtTitleWrapper: {
    marginVertical: 5,
  },
  txtHeader: {
    fontSize: 20,
    color: '#0000ff',
    letterSpacing: 2,
    textAlign: 'center',
    maxWidth: 200,
  },
  textHeaderWrapper: {
    marginVertical: 25,
    marginTop: 50,
    alignSelf: 'center',
  },
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
  addZilWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
});

const stylesLight = StyleSheet.create({
  txtTitleWrapper: {
    marginVertical: 5,
  },
  txtHeader: {
    fontSize: 20,
    color: '#0000ff',
    letterSpacing: 2,
    textAlign: 'center',
    maxWidth: 200,
  },
  textHeaderWrapper: {
    marginVertical: 25,
    marginTop: 50,
    alignSelf: 'center',
  },
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
  addZilWrapper: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
});
