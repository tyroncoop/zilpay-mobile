import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import * as tyron from "../../../../../../node_modules/tyron";
import smartContract from "../../../util/smartContract";
import { t } from "i18next";
import {
  loginInfo,
  userDoc,
  userDomain,
  userName,
  userResolved,
} from "app/lib/controller/tyron/user";
import { keystore } from "app/keystore";
import { ZilPayBase } from "../../../util/zilpay-base";
import {
  showTxModal,
  txId,
  txModalMinimized,
  txStatus,
} from "app/lib/controller/tyron/tx";
import { TyronConfirm } from "../../PopUp";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import DropDownPicker from "react-native-dropdown-picker";
import Donate from "../../Donate/Index";
import { ScrollView } from "react-native";
import { modalBuyNft, modalConnect } from "app/lib/controller/tyron/modal";
import { buyInfo, donation } from "app/lib/controller/tyron/utils";
import { TextInput } from "react-native";
import ContinueArrow from "../../../assets/icons/continue_arrow.svg";
import Tick from "../../../assets/icons/tick.svg";
import { ActivityIndicator } from "react-native";
import { Linking } from "react-native";
import AddFunds from "app/pages/tyron/components/SSI/AddFunds/Index";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {
  navigation: any;
  visible: boolean;
  hideModal: any;
};

const ModalBuyNft: React.FC<Props> = ({ navigation, visible, hideModal }) => {
  const { getSmartContract } = smartContract();
  const zcrypto = tyron.Util.default.Zcrypto();
  const net = "testnet";
  const loginInfo_: any = loginInfo.useValue();
  const isLogin = loginInfo_?.address;
  const username: any = userName.useValue();
  const domain = userDomain.useValue();
  const [openRecipient, setOpenRecipient] = useState(false);
  const [valueRecipient, setValueRecipient] = useState("");
  const [openPayment, setOpenPayment] = useState(false);
  const [valuePayment, setValuePayment] = useState("");
  const [buyInfo_, setBuyInfo_] = useState<any>(null);
  const [savedAddr, setSavedAddr] = useState(false);
  const [inputAddr, setInputAddr] = useState("");
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const donation_ = donation.useValue();
  const isDark = tyronThemeDark.useValue();
  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const handleInputAddr = (text: string) => {
    setSavedAddr(false);
    setInputAddr(text);
  };

  const validateInputAddr = () => {
    const addr = tyron.Address.default.verification(inputAddr);
    if (addr !== "") {
      setBuyInfo_({
        recipientOpt: buyInfo_?.recipientOpt,
        anotherAddr: addr,
      });
      setSavedAddr(true);
    } else {
      Alert.alert("Wrong address.");
    }
  };

  const handleOnChangeRecipient = (e: any) => {
    const value = e.value;
    setInputAddr("");
    donation.set(null);
    setBuyInfo_({
      recipientOpt: value,
      anotherAddr: undefined,
      currency: undefined,
      currentBalance: 0,
      isEnough: false,
    });
  };

  const handleOnChangePayment = async (e: any) => {
    const value = e.value;
    donation.set(null);
    setBuyInfo_({
      recipientOpt: buyInfo_?.recipientOpt,
      anotherAddr: buyInfo_?.anotherAddr,
      currency: undefined,
      currentBalance: undefined,
      isEnough: undefined,
    });
    if (value !== "") {
      setBuyInfo_({
        recipientOpt: buyInfo_?.recipientOpt,
        anotherAddr: buyInfo_?.anotherAddr,
        currency: value,
        currentBalance: 0,
        isEnough: false,
      });
      setLoadingPayment(true);
      try {
        const init_addr = await tyron.SearchBarUtil.default.fetchAddr(
          net,
          "init",
          "did"
        );
        if (value === "FREE") {
          const get_freelist = await getSmartContract(init_addr!, "free_list");
          const freelist: Array<string> = get_freelist.result.free_list;
          const is_free = freelist.filter(
            (val) => val === account.base16.toLowerCase()
          );
          if (is_free.length === 0) {
            throw new Error("You are not on the free list");
          }
          Alert.alert("Congratulations! You're a winner, baby!!");
        }
        const paymentOptions = async (id: string) => {
          setLoadingBalance(true);
          await getSmartContract(init_addr, "services")
            .then(async (get_services) => {
              return await tyron.SmartUtil.default.intoMap(
                get_services.result.services
              );
            })
            .then(async (services) => {
              // Get token address
              const token_addr = services.get(id);
              const balances = await getSmartContract(token_addr, "balances");
              return await tyron.SmartUtil.default.intoMap(
                balances.result.balances
              );
            })
            .then((balances) => {
              const balance = balances.get(loginInfo_.address.toLowerCase());
              if (balance !== undefined) {
                const _currency = tyron.Currency.default.tyron(id);
                setBuyInfo_({
                  recipientOpt: buyInfo_?.recipientOpt,
                  anotherAddr: buyInfo_?.anotherAddr,
                  currency: value,
                  currentBalance: balance / _currency.decimals,
                });
                let price: number;
                switch (id) {
                  case "xsgd":
                    price = 15;
                    break;
                  default:
                    price = 10;
                    break;
                }
                if (balance >= price * _currency.decimals) {
                  setBuyInfo_({
                    recipientOpt: buyInfo_?.recipientOpt,
                    anotherAddr: buyInfo_?.anotherAddr,
                    currency: value,
                    currentBalance: balance / _currency.decimals,
                    isEnough: true,
                  });
                  console.log(buyInfo_);
                } else {
                  Alert.alert("Your DIDxWallet does not have enough balance");
                }
              }
            })
            .catch(() => {
              Alert.alert(t("Buy NFT: Unsupported currency"));
            });
          setLoadingBalance(false);
        };
        const id = value.toLowerCase();
        if (id !== "free") {
          paymentOptions(id);
        } else {
          setBuyInfo_({
            recipientOpt: buyInfo_?.recipientOpt,
            anotherAddr: buyInfo_?.anotherAddr,
            currency: value,
            currentBalance: 0,
            isEnough: true,
          });
        }
      } catch (error) {
        setBuyInfo_({
          recipientOpt: buyInfo_?.recipientOpt,
          anotherAddr: buyInfo_?.anotherAddr,
          currency: undefined,
          currentBalance: undefined,
          isEnough: undefined,
        });
        Alert.alert(String(error));
      }
      setLoadingPayment(false);
    }
  };

  const webHookBuyNft = async (username: string) => {
    const request = {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: `TYRON ${net}\n\n${username}.ssi`,
    };
    // await fetch(`${process.env.NEXT_PUBLIC_WEBHOOK_BUYNFT_URL}`, request)
  };

  const handleSubmit = async (privkey: string) => {
    setLoading(true);
    try {
      const zilpay = new ZilPayBase();

      let addr: tyron.TyronZil.TransitionValue;
      if (buyInfo_?.recipientOpt === "ADDR") {
        addr = await tyron.TyronZil.default.OptionParam(
          tyron.TyronZil.Option.some,
          "ByStr20",
          buyInfo_?.anotherAddr
        );
      } else {
        addr = await tyron.TyronZil.default.OptionParam(
          tyron.TyronZil.Option.none,
          "ByStr20"
        );
      }

      const tyron_: tyron.TyronZil.TransitionValue =
        await tyron.Donation.default.tyron(donation_!);

      const domainId = "0x" + (await tyron.Util.default.HashString(username!));
      const tx_params = await tyron.TyronZil.default.BuyNftUsername(
        domainId,
        addr,
        buyInfo_?.currency?.toLowerCase()!,
        tyron_
      );

      let tx = await tyron.Init.default.transaction(net);

      // toast.info(
      //     t('You’re about to buy the NFT Username X!', {
      //         name: username,
      //     }),
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
      modalBuyNft.set(false);
      txId.set("");
      txStatus.set("loading");
      txModalMinimized.set(false);
      showTxModal.set(true);

      let _amount = "0";
      if (donation_ !== null) {
        _amount = String(donation_);
      }

      await zilpay
        .call({
          contractAddress: loginInfo_.address,
          transition: "BuyNftUsername",
          params: tx_params as unknown as Record<string, unknown>[],
          amount: _amount,
          privkey,
        })
        .then(async (res) => {
          txId.set(res.id!);
          txStatus.set("submitted");

          tx = await tx.confirm(res.id!);
          if (tx.isConfirmed()) {
            txStatus.set("confirmed");
            setTimeout(() => {
              Linking.openURL(
                `https://v2.viewblock.io/zilliqa/tx/${res.id}?network=${net}`
              );
            }, 1000);
            const data = {
              address: loginInfo_?.address,
              username: username,
              didUpdate: "",
            };
            loginInfo.set(data);
            setBuyInfo_(null);
            userResolved.set({
              name: username!,
              domain: "did",
            });
            // Router.push(`/${username}.did`)
            navigation.navigate("Services");
            webHookBuyNft(username);
          } else if (tx.isRejected()) {
            txStatus.set("failed");
            navigation.navigate("Welcome");
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (error) {
      txStatus.set("rejected");
      txModalMinimized.set(false);
      showTxModal.set(true);
      Alert.alert(String(error));
      navigation.navigate("Welcome");
    }
    donation.set(null);
  };

  const resetState = () => {
    setBuyInfo_(null);
    setValuePayment("");
    setValueRecipient("");
  };

  const itemsRecipient = [
    {
      value: "SSI",
      label: t("THIS_SSI"),
    },
    {
      value: "ADDR",
      label: t("ANOTHER_ADDRESS"),
    },
  ];

  const itemsPayment = [
    {
      value: "TYRON",
      label: "10 TYRON",
    },
    {
      value: "XSGD",
      label: "15 XSGD",
    },
    {
      value: "zUSDT",
      label: "10 zUSDT",
    },
    {
      value: "FREE",
      label: t("FREE"),
    },
  ];

  useEffect(() => {
    resetState();
  }, []);

  if (showTxModal.useValue()) {
    return <></>;
  }

  return (
    <>
      <Modal transparent animationType="slide" visible={visible}>
        <TouchableWithoutFeedback
          onPress={() => {
            resetState();
            hideModal();
          }}
        >
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.btnXWrapper}
                  onPress={() => {
                    resetState();
                    hideModal();
                  }}
                >
                  <Text style={styles.btnX}>x</Text>
                </TouchableOpacity>
                <ScrollView style={styles.scrollView} indicatorStyle="white">
                  <Text style={styles.title}>{t("BUY_THIS_NFT_USERNAME")}</Text>
                  <View style={styles.nameWrapper}>
                    <Text style={styles.name}>
                      {username}
                      {domain === "" ? ".ssi" : ".did"}
                    </Text>
                    <Text style={styles.title2}>{t("IS_AVAILABLE")}</Text>
                  </View>
                  {!loginInfo_?.address ? (
                    <TouchableOpacity
                      onPress={() => {
                        modalConnect.set(true);
                        modalBuyNft.set(false);
                      }}
                      style={styles.btnLogin}
                    >
                      <Text style={styles.txtYellow}>{t("LOG_IN")}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View>
                      <Text style={styles.txt}>
                        {t("YOU_HAVE_LOGGED_IN_SSI")}
                      </Text>
                      <View style={styles.wrapperLoginInfo}>
                        {loginInfo_?.username ? (
                          <Text style={styles.txt}>
                            {loginInfo_?.username}.did
                          </Text>
                        ) : (
                          <Text style={styles.txt}>
                            did:tyron:zil...{loginInfo_?.address.slice(-10)}
                          </Text>
                        )}
                      </View>
                      <View style={{ zIndex: 2 }}>
                        <Text style={styles.title3}>
                          {t("SELECT_RECIPIENT")}
                        </Text>
                        <View
                          style={openRecipient ? styles.picker2 : styles.picker}
                        >
                          <DropDownPicker
                            zIndex={5000}
                            zIndexInverse={5000}
                            listMode="SCROLLVIEW"
                            open={openRecipient}
                            value={valueRecipient}
                            items={itemsRecipient}
                            multiple={false}
                            onSelectItem={handleOnChangeRecipient}
                            setOpen={setOpenRecipient}
                            setValue={setValueRecipient}
                            theme="DARK"
                            style={{
                              backgroundColor: "#000",
                              borderColor: "#fff",
                            }}
                            placeholder=""
                          />
                        </View>
                      </View>
                      {buyInfo_?.recipientOpt == "ADDR" ? (
                        buyInfo_?.anotherAddr !== undefined ? (
                          <Text style={{ marginTop: "3%", color: "#fff" }}>
                            {t("Recipient (address):")}{" "}
                            {zcrypto.toBech32Address(buyInfo_?.anotherAddr!)}
                          </Text>
                        ) : (
                          <View style={styles.addrInputWrapper}>
                            <TextInput
                              placeholder={t("Type address")}
                              placeholderTextColor="#fff"
                              style={styles.addrInput}
                              onChangeText={(text: string) =>
                                handleInputAddr(text)
                              }
                            />
                            {!savedAddr ? (
                              <TouchableOpacity onPress={validateInputAddr}>
                                <ContinueArrow width={30} height={30} />
                              </TouchableOpacity>
                            ) : (
                              <Tick width={30} height={30} />
                            )}
                          </View>
                        )
                      ) : (
                        <></>
                      )}
                      {buyInfo_?.recipientOpt === "SSI" ||
                      (buyInfo_?.recipientOpt === "ADDR" &&
                        buyInfo_?.anotherAddr !== undefined) ? (
                        <View>
                          <Text style={styles.title3}>
                            {t("SELECT_PAYMENT")}
                          </Text>
                          <View
                            style={openPayment ? styles.picker2 : styles.picker}
                          >
                            <DropDownPicker
                              zIndex={4000}
                              zIndexInverse={1000}
                              listMode="SCROLLVIEW"
                              open={openPayment}
                              value={valuePayment}
                              items={itemsPayment}
                              multiple={false}
                              setOpen={setOpenPayment}
                              setValue={setValuePayment}
                              // onChangeValue={handleOnChangePayment}
                              onSelectItem={handleOnChangePayment}
                              theme="DARK"
                              style={{
                                backgroundColor: "#000",
                                borderColor: "#fff",
                              }}
                              placeholder=""
                            />
                          </View>
                        </View>
                      ) : (
                        <></>
                      )}
                      {buyInfo_?.currency !== undefined && !loadingPayment && (
                        <>
                          {buyInfo_?.currency !== "FREE" && (
                            <View>
                              {loadingBalance ? (
                                <ActivityIndicator
                                  color={isDark ? "#fff" : "#000"}
                                />
                              ) : (
                                <Text style={{ color: "#fff" }}>
                                  {t("CURRENT_BALANCE")}
                                  &nbsp;
                                  <Text style={{ color: "#ffff32" }}>
                                    {buyInfo_?.currentBalance}{" "}
                                    {buyInfo_?.currency}
                                  </Text>
                                </Text>
                              )}
                            </View>
                          )}
                          {buyInfo_?.currency !== undefined && !loadingBalance && (
                            <>
                              {buyInfo_?.isEnough ? (
                                <>
                                  {donation_ === null ? (
                                    <View style={styles.wrapperDonate}>
                                      <Donate />
                                    </View>
                                  ) : (
                                    <View>
                                      <TouchableOpacity
                                        onPress={() => setPopup(true)}
                                        style={styles.btnSubmit}
                                      >
                                        <Text style={styles.txtYellow}>
                                          {loading ? (
                                            <ActivityIndicator
                                              color={isDark ? "#fff" : "#000"}
                                            />
                                          ) : (
                                            t("BUY NFT USERNAME")
                                          )}
                                        </Text>
                                      </TouchableOpacity>
                                      <Text style={styles.txtGas}>
                                        {t("GAS_AROUND")}
                                        &nbsp; 14 ZIL
                                      </Text>
                                    </View>
                                  )}
                                </>
                              ) : (
                                <>
                                  <Text
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    {t("NOT_ENOUGH_BALANCE")}
                                  </Text>
                                  <View>
                                    <AddFunds
                                      navigation={navigation}
                                      type="buy"
                                      coin={buyInfo_?.currency}
                                    />
                                  </View>
                                  {/* <div
                                                        style={{
                                                            width: '90%',
                                                        }}
                                                    >
                                                        <AddFunds
                                                            type="buy"
                                                            coin={
                                                                buyInfo_?.currency
                                                            }
                                                        />
                                                    </div> */}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </View>
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TyronConfirm
        title="Buy NFT Username"
        visible={popup}
        setPopup={setPopup}
        onConfirm={handleSubmit}
      />
    </>
  );
};

export default ModalBuyNft;

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    padding: 15,
  },
  modalView: {
    width: deviceWidth - 30,
    padding: 15,
    backgroundColor: "#000",
    alignSelf: "flex-end",
    // justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    paddingTop: 5,
    marginTop: Platform.OS === "ios" ? 60 : 30,
    maxHeight: deviceHeight - 30,
  },
  btnXWrapper: {
    alignSelf: "flex-end",
    marginBottom: 5,
  },
  btnX: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    color: "#fff",
    fontSize: 17,
  },
  title2: {
    color: "#fff",
    fontSize: 17,
    letterSpacing: 2,
  },
  title3: {
    color: "#fff",
    fontSize: 17,
  },
  name: {
    color: "#ffff32",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  nameWrapper: {
    marginVertical: 20,
  },
  txt: {
    color: "#fff",
  },
  txtYellow: {
    color: "#ffff32",
    textTransform: "uppercase",
  },
  btnLogin: {
    width: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ffff32",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  wrapperLoginInfo: {
    marginVertical: 20,
  },
  picker: {
    marginTop: 10,
    marginBottom: 15,
  },
  picker2: {
    marginTop: 10,
    marginBottom: 15,
    height: 150,
  },
  wrapperDonate: {
    marginVertical: 20,
  },
  scrollView: {
    maxHeight: deviceHeight * 0.7,
    marginBottom: 10,
  },
  btnSubmit: {
    borderColor: "#ffff32",
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
  },
  txtGas: {
    color: "silver",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginVertical: 10,
    alignSelf: "center",
    fontSize: 10,
  },
  addrInputWrapper: {
    flexDirection: "row",
    marginBottom: 50,
    alignItems: "center",
  },
  addrInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: "80%",
    color: "#fff",
    paddingHorizontal: 10,
    marginRight: 10,
    height: 40,
  },
});
