import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking,
  TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DIDLayout from "../../../components/Layout/DID/Index";
import Headline from "../../../components/Headline/Index";
import { useTranslation } from "react-i18next";
import ContinueArrow from "../../../assets/icons/continue_arrow.svg";
import Tick from "../../../assets/icons/tick.svg";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import {
  loginInfo,
  userName,
  userResolved,
} from "app/lib/controller/tyron/user";
import { ActivityIndicator } from "react-native";
import { TyronConfirm } from "app/pages/tyron/components/PopUp";
import { showTxModal, txId, txStatus } from "app/lib/controller/tyron/tx";
import { ZilPayBase } from "app/pages/tyron/util/zilpay-base";
import { Alert } from "react-native";
import OriginatorAddress from "app/pages/tyron/components/OriginatorAddress/Index";
import { donation, originatorAddress } from "app/lib/controller/tyron/utils";
import WalletInfo from "app/pages/tyron/components/WalletInfo/Index";
import wallet from "app/pages/tyron/util/wallet";
import Donate from "app/pages/tyron/components/Donate/Index";
import * as tyron from "../../../../../../node_modules/tyron";
import smartContract from "app/pages/tyron/util/smartContract";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
  type?: string;
  coin?: string;
};

const AddFunds: React.FC<any> = ({ navigation, coin, type }) => {
  let coin_: string = "";
  if (coin !== undefined) {
    coin_ = coin;
  }
  const { getSmartContract } = smartContract();
  const { checkBalance } = wallet();
  const { t } = useTranslation();
  const name = userName.useValue();
  const resolvedInfo = userResolved.useValue();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const [openCoin, setOpenCoin] = useState(false);
  const [valueCoin, setValueCoin] = useState(coin_);
  const [popup, setPopup] = useState(false);
  const [savedInput, setSavedInput] = useState(false);
  const [loadingInfoBal, setLoadingInfoBal] = useState(false);
  const [inputCoin, setInputCoin] = useState<any>(0);
  const net = "testnet";
  const originatorAddress_: any = originatorAddress.useValue();
  const originator_address: any = originatorAddress.useValue();
  const donation_ = donation.useValue();
  const loginInfo_ = loginInfo.useValue();
  const username = resolvedInfo?.name;
  const domain = resolvedInfo?.domain;

  let recipient: string;
  if (type === "buy") {
    recipient = loginInfo_.address;
  } else {
    recipient = resolvedInfo?.addr!;
  }

  const handleSubmit = async (privkey: string) => {
    try {
      if (originator_address?.value !== null) {
        const zilpay = new ZilPayBase();
        const _currency = tyron.Currency.default.tyron(valueCoin, inputCoin);
        const txID = _currency.txID;
        const amount = _currency.amount;

        showTxModal.set(true);
        txStatus.set("loading");
        switch (originator_address?.value!) {
          case "zilliqa":
            switch (txID) {
              case "SendFunds":
                const tx: any = await zilpay.call({
                  contractAddress: recipient,
                  transition: "AddFunds",
                  params: [],
                  amount: String(inputCoin),
                  privkey,
                });
                txId.set(tx.id);
                txStatus.set("confirmed");
                Linking.openURL(
                  `https://v2.viewblock.io/zilliqa/tx/${tx.id}?network=${net}`
                );
                break;
              default:
                {
                  const init_addr = await tyron.SearchBarUtil.default.fetchAddr(
                    net,
                    "init",
                    "did"
                  );
                  const services = await getSmartContract(
                    init_addr!,
                    "services"
                  );
                  const services_ = await tyron.SmartUtil.default.intoMap(
                    services.result.services
                  );
                  const token_addr = services_.get(valueCoin.toLowerCase());

                  const tx_params = await tyron.TyronZil.default.AddFunds(
                    recipient,
                    String(amount)
                  );

                  if (token_addr !== undefined) {
                    // toast.info(
                    //     `${t(
                    //         'You’re about to transfer'
                    //     )} ${input} ${currency}`,
                    //     {
                    //         position: 'top-center',
                    //         autoClose: 6000,
                    //         hideProgressBar: false,
                    //         closeOnClick: true,
                    //         pauseOnHover: true,
                    //         draggable: true,
                    //         progress: undefined,
                    //         theme: toastTheme(isLight),
                    //         toastId: 6,
                    //     }
                    // )
                    const tx: any = await zilpay.call({
                      contractAddress: token_addr,
                      transition: txID,
                      params: tx_params as unknown as Record<string, unknown>[],
                      amount: "0",
                      privkey,
                    });
                    txId.set(tx.id);
                    txStatus.set("confirmed");
                    Linking.openURL(
                      `https://v2.viewblock.io/zilliqa/tx/${tx.id}?network=${net}`
                    );
                  } else {
                    throw new Error("Token not supported yet.");
                  }
                }
                break;
            }
            break;
          default: {
            const addr = originator_address?.value;
            let beneficiary: tyron.TyronZil.Beneficiary;
            if (type === "buy") {
              beneficiary = {
                constructor: tyron.TyronZil.BeneficiaryConstructor.Recipient,
                addr: recipient,
              };
            } else {
              await tyron.SearchBarUtil.default
                .Resolve(net, addr!)
                .then(async (res: any) => {
                  if (Number(res?.version.slice(8, 11)) < 5.6) {
                    beneficiary = {
                      constructor:
                        tyron.TyronZil.BeneficiaryConstructor.Recipient,
                      addr: recipient,
                    };
                  } else {
                    beneficiary = {
                      constructor:
                        tyron.TyronZil.BeneficiaryConstructor.NftUsername,
                      username: username,
                      domain: domain,
                    };
                  }
                })
                .catch((err) => {
                  beneficiary = {
                    constructor:
                      tyron.TyronZil.BeneficiaryConstructor.NftUsername,
                    username: username,
                    domain: domain,
                  };
                });
            }
            let _amount = "0";
            if (donation_ !== null) {
              _amount = String(donation_);
              const tyron_ = await tyron.Donation.default.tyron(donation_);
              let tx_params = Array();
              switch (txID) {
                case "SendFunds":
                  tx_params = await tyron.TyronZil.default.SendFunds(
                    addr!,
                    "AddFunds",
                    beneficiary!,
                    String(amount),
                    tyron_
                  );
                  break;
                default:
                  tx_params = await tyron.TyronZil.default.Transfer(
                    addr!,
                    valueCoin.toLowerCase(),
                    beneficiary!,
                    String(amount),
                    tyron_
                  );
                  break;
              }

              // toast.info(
              //     `${t(
              //         'You’re about to transfer'
              //     )} ${input} ${currency}`,
              //     {
              //         position: 'top-center',
              //         autoClose: 6000,
              //         hideProgressBar: false,
              //         closeOnClick: true,
              //         pauseOnHover: true,
              //         draggable: true,
              //         progress: undefined,
              //         theme: toastTheme(isLight),
              //         toastId: 7,
              //     }
              // )
              const tx: any = await zilpay.call({
                contractAddress: originator_address?.value!,
                transition: txID,
                params: tx_params as unknown as Record<string, unknown>[],
                amount: _amount,
                privkey,
              });
              txId.set(tx.id);
              txStatus.set("confirmed");
              Linking.openURL(
                `https://v2.viewblock.io/zilliqa/tx/${tx.id}?network=${net}`
              );
            }
          }
        }
      }
    } catch (error) {
      txStatus.set("rejected");
      // updateModalTxMinimized(false)
      // updateModalTx(true)
      Alert.alert(String(error));
    }
    originatorAddress.set(null);
    donation.set(null);
  };

  const saveInputCoin = () => {
    setSavedInput(false);
    let input = inputCoin;
    const re = /,/gi;
    input = input.replace(re, ".");
    const input_ = Number(input);
    if (!isNaN(input_)) {
      handleSave();
    } else {
      Alert.alert("The input is not a number.");
    }
  };

  const onChangeInputCoin = (val: string) => {
    setSavedInput(false);
    setInputCoin(val);
  };

  const handleSave = async () => {
    const isEnough = await checkBalance(
      valueCoin,
      inputCoin,
      setLoadingInfoBal
    );
    if (inputCoin === 0) {
      Alert.alert("The amount cannot be zero.");
    } else if (!isEnough) {
      Alert.alert("Insufficient balance.");
    } else {
      setSavedInput(true);
    }
  };

  const renderSubmit = () => {
    if (originatorAddress_?.value !== "zilliqa") {
      if (donation_ !== null) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const itemsCoin = [
    { label: t("Select coin"), value: "" },
    { label: "TYRON", value: "tyron" },
    { label: "$SI", value: "$si" },
    { label: "ZIL", value: "zil" },
  ];

  useEffect(() => {
    originatorAddress.set(null);
    setSavedInput(false);
  }, [valueCoin]);

  useEffect(() => {
    setSavedInput(false);
  }, [originatorAddress_]);

  return (
    <View style={styles.wrapper}>
      {type !== "buy" && <Headline navigation={navigation} data={[]} />}
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.txtHeaderYellow}>{t("ADD FUNDS")}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.txtInfo}>
          {t("You can add funds into X from your SSI or ZilPay.", { name })}
        </Text>
        {type !== "buy" && (
          <View style={styles.pickerCoin}>
            <DropDownPicker
              zIndex={5000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW"
              open={openCoin}
              value={valueCoin}
              items={itemsCoin}
              multiple={false}
              setOpen={setOpenCoin}
              setValue={setValueCoin}
              placeholder="Select coin"
              placeholderStyle={{ color: "#fff" }}
              theme="DARK"
              style={{ backgroundColor: "#000", borderColor: "#fff" }}
            />
          </View>
        )}
        {valueCoin !== "" && <OriginatorAddress />}
        {originatorAddress_?.value && (
          <>
            <WalletInfo coin={valueCoin} />
            <View style={styles.selectCoinWrapper}>
              <Text style={styles.txtCoin}>
                {t("ADD_FUNDS_INTO_TITLE")}{" "}
                <Text style={{ color: "#ffff32" }}>{name}</Text>
              </Text>
            </View>
            <View style={styles.coinInputWrapper}>
              <Text style={styles.txtCoinType}>{valueCoin}</Text>
              <TextInput
                placeholder={t("Type amount")}
                placeholderTextColor="#fff"
                style={styles.coinInput}
                onChangeText={(text: string) => onChangeInputCoin(text)}
              />
              {loadingInfoBal ? (
                <ActivityIndicator color={isDark ? "#fff" : "#000"} />
              ) : !savedInput ? (
                <TouchableOpacity onPress={saveInputCoin}>
                  <ContinueArrow width={30} height={30} />
                </TouchableOpacity>
              ) : (
                <Tick width={30} height={30} />
              )}
            </View>
            {savedInput && (
              <>
                {originatorAddress_?.value !== "zilliqa" && <Donate />}
                {renderSubmit() && (
                  <View>
                    <TouchableOpacity
                      onPress={() => setPopup(true)}
                      style={styles.btnTransfer}
                    >
                      <Text style={styles.btnTransferTxt}>
                        {t("TRANSFER")}{" "}
                        <Text
                          style={{
                            color: "#ffff32",
                            textTransform: "uppercase",
                          }}
                        >
                          {inputCoin} {valueCoin}
                        </Text>{" "}
                        {type !== "buy" && (
                          <>
                            {t("TO")}{" "}
                            <Text style={{ color: "#ffff32" }}>{name}</Text>
                          </>
                        )}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.txtGas}>{t("GAS_AROUND")} 1-2 zil</Text>
                  </View>
                )}
              </>
            )}
          </>
        )}
        <TyronConfirm
          title="Add Funds"
          visible={popup}
          setPopup={setPopup}
          onConfirm={handleSubmit}
        />
      </View>
    </View>
  );
};

export default AddFunds;

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
    color: "silver",
    letterSpacing: 2,
    textAlign: "center",
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  txtInfo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  picker: {
    width: deviceWidth * 0.6 + 25,
    marginVertical: 10,
  },
  pickerSSI: {
    width: deviceWidth * 0.6 + 25,
  },
  pickerDomain: {
    width: deviceWidth * 0.3,
  },
  pickerCoin: {
    width: deviceWidth * 0.6 + 25,
    marginTop: 30,
  },
  wrapperZilpayInfo: {
    marginLeft: 10,
  },
  txtZilpayInfo: {
    fontSize: 14,
    color: "#fff",
  },
  txtCoin: {
    color: "#fff",
    fontSize: 16,
    zIndex: 1,
  },
  selectCoinWrapper: {
    marginVertical: 30,
  },
  coinInputWrapper: {
    flexDirection: "row",
    marginBottom: 50,
    alignItems: "center",
  },
  txtCoinType: {
    color: "#fff",
    textTransform: "uppercase",
    backgroundColor: "hsla(0,0%,100%,.075)",
    padding: 10,
    borderRadius: 5,
  },
  coinInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.5,
    color: "#fff",
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  buttonContinue: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  btnTransfer: {
    borderWidth: 1,
    borderColor: "#ffff32",
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
  },
  btnTransferTxt: {
    color: "#ffff32",
    letterSpacing: 1,
  },
  txtGas: {
    color: "silver",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginVertical: 10,
    alignSelf: "center",
    fontSize: 10,
  },
  wrapperDomain: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  inputDomain: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.3,
    color: "#fff",
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  inputAddress: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.5,
    color: "#fff",
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  button: {
    width: 60,
    height: 40,
    borderColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
    color: "silver",
    letterSpacing: 2,
    textAlign: "center",
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  txtInfo: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  picker: {
    width: deviceWidth * 0.6 + 25,
    marginVertical: 10,
  },
  pickerSSI: {
    width: deviceWidth * 0.6 + 25,
  },
  pickerDomain: {
    width: deviceWidth * 0.3,
  },
  pickerCoin: {
    width: deviceWidth * 0.6 + 25,
    marginTop: 30,
  },
  wrapperZilpayInfo: {
    marginLeft: 10,
  },
  txtZilpayInfo: {
    fontSize: 14,
    color: "#fff",
  },
  txtCoin: {
    color: "#fff",
    fontSize: 16,
    zIndex: 1,
  },
  selectCoinWrapper: {
    marginVertical: 30,
  },
  coinInputWrapper: {
    flexDirection: "row",
    marginBottom: 50,
    alignItems: "center",
  },
  txtCoinType: {
    color: "#fff",
    textTransform: "uppercase",
    backgroundColor: "hsla(0,0%,100%,.075)",
    padding: 10,
    borderRadius: 5,
  },
  coinInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.5,
    color: "#fff",
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  buttonContinue: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  btnTransfer: {
    borderWidth: 1,
    borderColor: "#ffff32",
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
  },
  btnTransferTxt: {
    color: "#ffff32",
    letterSpacing: 1,
  },
  txtGas: {
    color: "silver",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginVertical: 10,
    alignSelf: "center",
    fontSize: 10,
  },
  wrapperDomain: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  inputDomain: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.3,
    color: "#fff",
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  inputAddress: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.5,
    color: "#fff",
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
  button: {
    width: 60,
    height: 40,
    borderColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  searchIco: {
    width: 17,
    height: 17,
  },
});
