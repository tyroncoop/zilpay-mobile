import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  View,
  Dimensions,
  Image,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import cross from '../../assets/img/ic_cross.png';
import power from '../../assets/img/power_icon.png';
import arrowUp from '../../assets/img/dashboard_arrow_up_icon.png';
import arrowDown from '../../assets/img/dashboard_arrow_down_icon.png';
import infoIcon from '../../assets/img/info_yellow.png';
import c1 from '../../assets/img/checkpoint_1.png';
import c2 from '../../assets/img/checkpoint_2.png';
import c3 from '../../assets/img/checkpoint_3.png';
import c4 from '../../assets/img/checkpoint_4.png';
import c5 from '../../assets/img/checkpoint_5.png';
import c6 from '../../assets/img/checkpoint_6.png';
import c7 from '../../assets/img/checkpoint_7.png';
import checkedIcon from '../../assets/img/checkpoint_selected.png';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export type Props = {
  visible: boolean;
  showGetStarted: any;
};

const GetStarted: React.FC<Props> = ({visible, showGetStarted}) => {
  const [active, setActive] = useState(0);
  const [checkedStep, setCheckedStep] = useState(Array());

  const toggleActive = (id: number) => {
    setCheckedStep([...checkedStep, active]);
    if (id !== active) {
      setActive(id);
    } else {
      setActive(0);
    }
  };

  const isChecked = (id: any) => {
    if (checkedStep.some(val => val === id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.modalWrapper}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.icoClose}
            onPress={() => showGetStarted(false)}
          >
            <Image style={styles.icoClose} source={cross} />
          </TouchableOpacity>
          <ScrollView indicatorStyle="white">
            <View style={styles.headerWrapper}>
              <Image source={power} />
              <Text style={styles.headerTitle}>YOUR QUICK START GUIDE</Text>
            </View>
            <View style={styles.stepsWrapper}>
              <View style={styles.stepsListWrapper}>
                <View style={styles.stepsHeaderWrapper}>
                  <View style={styles.stepsHeaderTitleWrapper}>
                    <Image source={isChecked(1) ? checkedIcon : c1} />
                    <Text style={styles.stepsHeaderTitle}>
                      Zilliqa blockchain
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleActive(1)}>
                    <Image source={active === 1 ? arrowUp : arrowDown} />
                  </TouchableOpacity>
                </View>
                {active === 1 ? (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Connect your Externally Owned Account for Zilliqa
                    </Text>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Go to{' '}
                        <Text
                          onPress={() => Linking.openURL('https://zilpay.io')}
                          style={styles.stepsListContentTxtLink}
                        >
                          zilpay.io
                        </Text>{' '}
                        and click on GET CHROME EXTENSION. Once you have
                        installed the extension, get into it and click Create to
                        generate a new account.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        You will see a list of words that make up your secret
                        phrase. You must write these words down in a safe place.
                        Remember that the words must be ordered and spelt
                        correctly. You can choose between 12 and 24 words.
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                'Info',
                                'Although the words shown at the beginning are 8, your secret phrase is made up of 12 or 24 words. To see the complete list, click between the words in the list and press the down-arrow button repeatedly on your keyboard until you see the total number of words.',
                              )
                            }
                          >
                            <Image
                              style={{width: 10, height: 10}}
                              source={infoIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        You will be asked to verify your secret phrase by
                        clicking on the words in the right order. After doing
                        so, click on Continue.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Now it&apos;s time to create your ZilPay username and
                        password. Then Accept Privacy Policy and Continue to
                        finish.
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Connect your Externally Owned Account for Zilliqa
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.stepsListWrapper}>
                <View style={styles.stepsHeaderWrapper}>
                  <View style={styles.stepsHeaderTitleWrapper}>
                    <Image source={isChecked(2) ? checkedIcon : c2} />
                    <Text style={styles.stepsHeaderTitle}>
                      Arweave blockchain
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleActive(2)}>
                    <Image source={active === 2 ? arrowUp : arrowDown} />
                  </TouchableOpacity>
                </View>
                {active === 2 ? (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Connect your Externally Owned Account for Arweave
                    </Text>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Go to{' '}
                        <Text
                          onPress={() =>
                            Linking.openURL('https://arconnect.io')
                          }
                          style={styles.stepsListContentTxtLink}
                        >
                          arconnect.io
                        </Text>{' '}
                        and click on Download ArConnect. Once you have installed
                        the chrome extension, a new tab will appear where you
                        will be asked to create a password for your new Arweave
                        wallet, called ArConnect.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Generate your password, and click on Create.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Next, select New Wallet.
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                'Info',
                                'Your SSI uses this wallet for encryption and decryption of data, and soon to make transactions on the permaweb as well!',
                              )
                            }
                          >
                            <Image
                              style={{width: 10, height: 10}}
                              source={infoIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Connect your Externally Owned Account for Arweave
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.stepsListWrapper}>
                <View style={styles.stepsHeaderWrapper}>
                  <View style={styles.stepsHeaderTitleWrapper}>
                    <Image source={isChecked(3) ? checkedIcon : c3} />
                    <Text style={styles.stepsHeaderTitle}>TYRON Network</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleActive(3)}>
                    <Image source={active === 3 ? arrowUp : arrowDown} />
                  </TouchableOpacity>
                </View>
                {active === 3 ? (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Create your self-sovereign identity
                    </Text>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Click on CONNECT in the top right corner, and approve
                        the connection between your Zilliqa wallet and the SSI
                        Browser open-source web application.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Click on LOG IN and then New User. This step will
                        connect your Arweave wallet as well.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Confirm with ZilPay. The cost to create your SSI is
                        around 1 ZIL&nbsp;
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                'Info',
                                'Your Zilliqa wallet needs to have at least 70 ZIL since the gas limit to deploy a new contract (contract creation) is 35,000 units of gas at 0.002 ZIL per unit (which is the minimum possible blockchain gas price). However, the actual cost is around 1 ZIL.',
                              )
                            }
                          >
                            <Image
                              style={{width: 10, height: 10}}
                              source={infoIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Click on your new self-sovereign identity address and
                        explore its data on Devex.
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Create your self-sovereign identity
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.stepsListWrapper}>
                <View style={styles.stepsHeaderWrapper}>
                  <View style={styles.stepsHeaderTitleWrapper}>
                    <Image source={isChecked(4) ? checkedIcon : c4} />
                    <Text style={styles.stepsHeaderTitle}>NFT Username</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleActive(4)}>
                    <Image source={active === 4 ? arrowUp : arrowDown} />
                  </TouchableOpacity>
                </View>
                {active === 4 ? (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Search for a username and buy it with your self-sovereign
                      identity
                    </Text>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        You can buy an available username with your SSI (either
                        a new SSI smart contract or an existing SSI).
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Click on Select recipient and choose This SSI to buy the
                        NFT Username for your SSI. Alternatively, you can buy
                        this username and assign it to any other address by
                        selecting Another address. If you choose to use the
                        username for another address, type this address and
                        Continue&nbsp;
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                'Info',
                                'The recipient of the NFT Username can be your SSI or another address of your choice. Either way, your SSI is the owner of the NFT, which means that your Decentralized Identifier (DID) is the controller of the username.',
                              )
                            }
                          >
                            <Image
                              style={{width: 10, height: 10}}
                              source={infoIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Choose a payment option in Select payment. Options are
                        TYRON, $SI and other stablecoins such as XSGD and zUSDT.
                      </Text>
                    </View>
                    <Text style={styles.stepsListContentTxt}>
                      If you are using a new SSI, new smart contracts do not
                      have funds yet to purchase a Username. Or, if your
                      existing SSI does not have enough coins, you can add funds
                      to proceed.
                    </Text>
                    <Text style={styles.stepsListContentTxt}>ADD FUNDS</Text>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Click on Select originator, and select ZilPay to add
                        funds from your ZilPay wallet. You can also add funds
                        from any other self-sovereign identity that you control.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Enter the amount you want to transfer to your SSI and
                        PROCEED with the transfer.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        When your SSI has enough funds, click on BUY NFT
                        USERNAME and confirm with ZilPay.
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Search for a username and buy it with your self-sovereign
                      identity
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.stepsListWrapper}>
                <View style={styles.stepsHeaderWrapper}>
                  <View style={styles.stepsHeaderTitleWrapper}>
                    <Image source={isChecked(5) ? checkedIcon : c5} />
                    <Text style={styles.stepsHeaderTitle}>DID Update</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleActive(5)}>
                    <Image source={active === 5 ? arrowUp : arrowDown} />
                  </TouchableOpacity>
                </View>
                {active === 5 ? (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Update your Decentralized Identifier Document
                    </Text>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Log in with your SSI.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Click on WALLET, next on DID OPERATIONS and then on
                        UPDATE.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Replace a DID Key (Verification Method) if you wish so.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Add SERVICES to publicly share web addresses that are
                        relevant to you, such as your personal or work sites,
                        blockchain addresses like Bitcoin, and more&nbsp;
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                'Info',
                                'You can have as many DID Services as you wish. If you want to add more services, write down how many you want in the Type amount input box.',
                              )
                            }
                          >
                            <Image
                              style={{width: 10, height: 10}}
                              source={infoIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Continue, and you can donate ZIL to the Donate DApp.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        To finish, click on UPDATE DID and confirm with ZilPay.
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Update your Decentralized Identifier Document
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.stepsListWrapper}>
                <View style={styles.stepsHeaderWrapper}>
                  <View style={styles.stepsHeaderTitleWrapper}>
                    <Image source={isChecked(6) ? checkedIcon : c6} />
                    <Text style={styles.stepsHeaderTitle}>Social Recovery</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleActive(6)}>
                    <Image source={active === 6 ? arrowUp : arrowDown} />
                  </TouchableOpacity>
                </View>
                {active === 6 ? (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Configure DID Social Recovery
                    </Text>
                    <Text style={styles.stepsListContentTxt}>
                      With Social Recovery, you can update the DID Controller
                      address of your self-sovereign identity with the help of
                      your guardians. This security feature is super helpful if
                      you lose control of your Zilliqa wallet.
                    </Text>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Log in with your SSI, and access its dashboard by
                        searching for its Username.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Click on WALLET, next on DID OPERATIONS and then select
                        SOCIAL RECOVERY.
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Choose how many guardians you would like for your
                        SSI&nbsp;
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                'Info',
                                'You can have an unlimited amount of guardians. To social recover your account, you need the signatures that correspond to half the amount of guardians + 1 extra signature. As a minimum, you need at least three signatures to execute social recovery.',
                              )
                            }
                          >
                            <Image
                              style={{width: 10, height: 10}}
                              source={infoIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Type the NFT Usernames of your guardians, click on
                        CONTINUE and then on CONFIGURE DID SOCIAL RECOVERY.
                        Confirm with ZilPay.
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Configure DID Social Recovery
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.stepsListWrapper}>
                <View style={styles.stepsHeaderWrapper}>
                  <View style={styles.stepsHeaderTitleWrapper}>
                    <Image source={isChecked(7) ? checkedIcon : c7} />
                    <Text style={styles.stepsHeaderTitle}>Add Funds</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleActive(7)}>
                    <Image source={active === 7 ? arrowUp : arrowDown} />
                  </TouchableOpacity>
                </View>
                {active === 7 ? (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Top up a DIDxWallet
                    </Text>
                    <Text style={styles.stepsListContentTxt}>
                      You can add funds to any SSI by searching for its Username
                      and selecting the ADD FUNDS card.
                    </Text>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Click on Select originator and select ZilPay to send
                        funds from your Zilliqa wallet or Self-sovereign
                        identity to add funds from another SSI that you
                        control&nbsp;
                        <View>
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                'Info',
                                'You can have an unlimited amount of guardians. To social recover your account, you need the signatures that correspond to half the amount of guardians + 1 extra signature. As a minimum, you need at least three signatures to execute social recovery.',
                              )
                            }
                          >
                            <Image
                              style={{width: 10, height: 10}}
                              source={infoIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        On Select coin, select the currency and enter the amount
                        you wish to transfer in Type amount. When the originator
                        of the transfer is your SSI, you can donate to the
                        Donate DApp and earn xPoints!
                      </Text>
                    </View>
                    <View style={styles.bulletWrapper}>
                      <View style={styles.bullet} />
                      <Text style={styles.stepsListContentTxt2}>
                        Continue to TRANSFER and confirm this transaction with
                        ZilPay.
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.stepsListContent}>
                    <Text style={styles.stepsListContentTxt}>
                      Top up a DIDxWallet
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    padding: 15,
  },
  modalView: {
    width: deviceWidth - 30,
    maxHeight: deviceHeight - 60,
    padding: 15,
    backgroundColor: '#000',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 60 : 30,
  },
  icoClose: {
    width: 15,
    height: 15,
    alignSelf: 'flex-end',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    maxWidth: deviceWidth - deviceWidth * 0.4,
  },
  stepsWrapper: {
    marginTop: 10,
    paddingLeft: 5,
    marginBottom: 30,
  },
  stepsListWrapper: {
    marginVertical: 5,
  },
  stepsHeaderWrapper: {
    flexDirection: 'row',
    width: deviceWidth - 600,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepsHeaderTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepsHeaderTitle: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 5,
  },
  stepsListContent: {
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    paddingLeft: 10,
    marginLeft: 15,
    marginTop: 5,
  },
  stepsListContentInactive: {
    paddingLeft: 10,
    marginLeft: 15,
    marginTop: 5,
  },
  stepsListContentTxt: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 5,
  },
  stepsListContentTxt2: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 5,
    marginBottom: 5,
  },
  stepsListContentTxtLink: {
    color: 'yellow',
    fontSize: 13,
  },
  bulletWrapper: {
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: 5,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#fff',
    marginTop: 7,
  },
});
