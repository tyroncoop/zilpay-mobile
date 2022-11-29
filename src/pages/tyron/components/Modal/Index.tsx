import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Dimensions,
  Image,
  Platform,
  TextInput,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import * as tyron from "../../../../../node_modules/tyron";
import zilpay from "../../assets/img/zilpay.png";
import arrowUp from "../../assets/img/dashboard_arrow_up_icon.png";
import arrowDown from "../../assets/img/dashboard_arrow_down_icon.png";
import addIco from "../../assets/img/add_icon.png";
import minusIco from "../../assets/img/minus_icon.png";
import logOff from "../../assets/img/log_off.png";
import rightArrow from "../../assets/img/right-arrow.png";
import { Clipboard } from "react-native";
import { ActivityIndicator } from "react-native";
import smartContract from "../../util/smartContract";
import { t } from "i18next";
import {
  loginInfo,
  userDoc,
  userResolved,
} from "app/lib/controller/tyron/user";
import { keystore } from "app/keystore";
import { ZilPayBase } from "../../util/zilpay-base";
import { showTxModal, txId, txStatus } from "app/lib/controller/tyron/tx";
import { TyronConfirm } from "../PopUp";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { loadingGlobal } from "app/lib/controller/tyron/utils";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {
  navigation: any;
  visible: boolean;
  hideModal: any;
  setLoginState: any;
};

const ModalConnect: React.FC<Props> = ({
  navigation,
  visible,
  hideModal,
  setLoginState,
}) => {
  const [menuActive, setMenuActive] = useState("");
  const [subMenuActive, setSubMenuActive] = useState("");
  const [isDisconnet, setIsDisconnect] = useState(false);
  const [zilliqa, setZilliqa] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [loadingResolve, setLoadingResolve] = useState(false);
  const [popup, setPopup] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [didDomain, setDidDomain] = useState(Array());
  const [nftUsername, setNftUsername] = useState(Array());
  const [loading, setLoading] = loadingGlobal.use();

  // const dispatch = useDispatch();
  const { getSmartContract } = smartContract();
  const zcrypto = tyron.Util.default.Zcrypto();
  const net = "testnet";
  // const loginInfo = useSelector((state: any) => state.user.loginInfo);
  const loginInfo_: any = loginInfo.useValue();
  const isLogin = loginInfo_?.address;

  const isDark = tyronThemeDark.useValue();
  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const disconnect = () => {
    // EncryptedStorage.removeItem('zilliqa').then(() => {
    //   dispatch(passcodeKey(''));
    //   dispatch(setLogin(false));
    //   navigation.navigate('Login');
    // });
    // hideModal();
  };

  const selectMenu = (id: string) => {
    if (id === menuActive) {
      setMenuActive("");
    } else {
      setMenuActive(id);
    }
  };

  const selectSubMenu = async (id: string) => {
    if (id === subMenuActive) {
      setSubMenuActive("");
    } else {
      if (id === "domain") {
        setLoadingList(true);
        setSubMenuActive(id);
        const addr = await tyron.SearchBarUtil.default.fetchAddr(
          net,
          loginInfo_?.username,
          "did"
        );
        getSmartContract(addr, "did_domain_dns").then(async (res) => {
          const key = Object.keys(res.result.did_domain_dns);
          setDidDomain(key);
        });
        setTimeout(() => {
          setLoadingList(false);
        }, 1000);
      } else if (id === "nftUsername") {
        setLoadingList(true);
        setSubMenuActive(id);
        const addr = await tyron.SearchBarUtil.default.fetchAddr(
          net,
          "init",
          "did"
        );
        const get_services = await getSmartContract(addr, "services");
        const services = await tyron.SmartUtil.default.intoMap(
          get_services.result.services
        );
        getSmartContract(services.get("init"), "did_dns").then(async (res) => {
          const val = Object.values(res.result.did_dns);
          const key = Object.keys(res.result.did_dns);
          let list: any = [];
          for (let i = 0; i < val.length; i += 1) {
            if (val[i] === loginInfo_?.address.toLowerCase()) {
              list.push(key[i]);
            }
          }
          setNftUsername(list);
        });
        setTimeout(() => {
          setLoadingList(false);
        }, 1000);
      } else {
        setSubMenuActive(id);
      }
    }
  };

  const copyText = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Key copied");
  };

  const resolveUsername = async () => {
    setLoadingResolve(true);
    const username_ = username.toLowerCase();
    await tyron.SearchBarUtil.default
      .fetchAddr(net, username_, "did")
      .then(async (addr) => {
        await tyron.SearchBarUtil.default
          .Resolve(net, addr)
          .then(async (result: any) => {
            const did_controller = zcrypto.toChecksumAddress(result.controller);
            if (did_controller !== account.base16) {
              setLoadingResolve(false);
              Alert.alert(
                `Only ${username_}'s DID Controller can log in to ${username_}.`
              );
            } else {
              const data = {
                address: zcrypto.toChecksumAddress(addr),
                username: username_,
                didUpdate: result?.did.slice(-42),
              };
              loginInfo.set(data);
              userDoc.set(result);
              setLoadingResolve(false);
              setUsername("");
              navigation.navigate("Services");
              hideModal();
            }
          });
      })
      .catch(() => {
        setLoadingResolve(false);
        Alert.alert("Wrong username");
      });
  };

  const resolveAddr = async () => {
    const addr = tyron.Address.default.verification(address.toLowerCase());
    if (addr !== "") {
      try {
        setLoadingResolve(true);
        const res_v = await getSmartContract(addr, "version");
        const version = res_v.result.version;
        const res_c = await getSmartContract(addr, "controller");
        const controller = zcrypto.toChecksumAddress(res_c.result.controller);
        if (version.slice(0, 7) !== "xwallet") {
          Alert.alert("Unsupported version.");
          setLoadingResolve(false);
        } else if (controller !== account.base16) {
          Alert.alert(
            `Only ${username}'s DID Controller can log in to ${username}.`
          );
          setLoadingResolve(false);
        } else {
          await tyron.SearchBarUtil.default
            .Resolve(net, address)
            .then(async (result: any) => {
              const data = {
                address: zcrypto.toChecksumAddress(addr),
                username: null,
                didUpdate: result?.did.slice(-42),
              };
              loginInfo.set(data);
              setLoadingResolve(false);
              setAddress("");
              setLoadingResolve(false);
            });
        }
      } catch (error) {
        setLoadingResolve(false);
        Alert.alert("Unsupported.");
      }
    } else {
      Alert.alert("Wrong address.");
    }
  };

  const newSsi = async (privkey: string) => {
    const currentAccount = keystore.account.getCurrentAccount();
    console.log(currentAccount?.base16);
    const zilpay = new ZilPayBase();
    showTxModal.set(true);
    txStatus.set("loading");
    await zilpay
      .deployDid(net, currentAccount?.base16, null, privkey)
      .then(async (deploy: any) => {
        txId.set(deploy[0].id);
        txStatus.set("submitted");
        txId.set(deploy[0].id);
        txStatus.set("confirmed");
        Linking.openURL(
          `https://v2.viewblock.io/zilliqa/tx/${deploy[0].id}?network=${net}`
        );
        const txn = await tyron.Init.default.contract(deploy[0].id, net);
        let new_ssi = "0x" + txn;
        new_ssi = zcrypto.toChecksumAddress(new_ssi);
        const data = {
          address: zcrypto.toChecksumAddress(new_ssi),
          username: null,
          didUpdate: "",
        };
        loginInfo.set(data);
      });
  };

  const resolveDid = async (_username: string, _domain: string) => {
    hideModal();
    await tyron.SearchBarUtil.default
      .fetchAddr(net, _username, "did")
      .then(async (addr) => {
        await tyron.SearchBarUtil.default
          .Resolve(net, addr)
          .then(async (result: any) => {
            const did_controller = zcrypto.toChecksumAddress(result.controller);
            const res = await getSmartContract(addr, "version");
            userDoc.set({
              did: result.did,
              controller: did_controller,
              version: result.version,
              doc: result.doc,
              dkms: result.dkms,
              guardians: result.guardians,
            });

            if (_domain === "did") {
              userResolved.set({
                name: _username,
                domain: _domain,
                addr: addr,
                status: result.status,
                version: res.result.version,
              });
              navigation.navigate("Services");
            } else {
              await tyron.SearchBarUtil.default
                .fetchAddr(net, _username, _domain)
                .then(async (domain_addr) => {
                  const res = await getSmartContract(domain_addr, "version");
                  userResolved.set({
                    name: _username,
                    domain: _domain,
                    addr: domain_addr,
                    status: result.status,
                    version: res.result.version,
                  });
                  switch (res.result.version.slice(0, 8).toLowerCase()) {
                    case "zilstake":
                      navigation.navigate("Stake");
                      break;
                    case ".stake--":
                      navigation.navigate("Stake");
                      break;
                    case "zilxwall":
                      navigation.navigate("Stake");
                      break;
                    case "vcxwalle":
                      navigation.navigate("SBT");
                      break;
                    case "sbtxwall":
                      navigation.navigate("SBT");
                      break;
                    default:
                      navigation.navigate("Servvices");
                      setTimeout(() => {
                        Alert.alert("Unregistered DID Domain.");
                      }, 1000);
                  }
                })
                .catch(() => {
                  Alert.alert("Uninitialized DID Domain.");
                  navigation.navigate("Servvices");
                });
            }
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          })
          .catch((err) => {
            if (
              String(err).includes("did_status") ||
              String(err).includes(".result") ||
              String(err).includes("null")
            ) {
              Alert.alert("Available in the future.");
            } else {
              Alert.alert(String(err));
            }
            setLoading(false);
          });
      })
      .catch(() => {
        Alert.alert("Upgrade required.");
        navigation.navigate("Services");
        setLoading(false);
      });
  };

  useEffect(() => {
    // EncryptedStorage.getItem('zilliqa').then((res: any) => {
    //   const res_ = JSON.parse(res);
    //   setZilliqa(res_.bech32Address);
    //   setPrivateKey(res_.privateKey);
    // });
  });

  return (
    <>
      <Modal transparent animationType="slide" visible={visible}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalWrapper}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.btnXWrapper}
                  onPress={hideModal}
                >
                  <Text style={styles.btnX}>x</Text>
                </TouchableOpacity>
                {!isDisconnet ? (
                  <ScrollView>
                    {isLogin && (
                      <View>
                        <View style={styles.headerWrapper}>
                          <Text style={styles.txtHeader}>
                            {t("YOU_HAVE_LOGGED_IN_SSI")}
                          </Text>
                        </View>
                        <View style={styles.subEoaWrapper}>
                          {loginInfo_?.username && (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate("Services");
                                hideModal();
                              }}
                            >
                              <Text style={styles.txtLoggedInUsername}>
                                {loginInfo_.username}.did
                              </Text>
                            </TouchableOpacity>
                          )}
                          <TouchableOpacity
                            onPress={() => {
                              Linking.openURL(
                                `https://devex.zilliqa.com/address/${loginInfo_?.address}?network=https%3A%2F%2Fdev-api.zilliqa.com`
                              );
                            }}
                          >
                            <Text style={styles.txtLoggedInAddress}>
                              did:tyron:zil...
                              {zcrypto
                                .toBech32Address(loginInfo_?.address)
                                .slice(-10)}
                            </Text>
                          </TouchableOpacity>
                          {loginInfo_?.username && (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate("DIDxWallet");
                                hideModal();
                              }}
                            >
                              <Text style={styles.txtLoggedInUsername}>
                                DIDxWALLET
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                        <View style={styles.subLogin}>
                          <View style={styles.subLoginInfo}>
                            <TouchableOpacity
                              onPress={() => selectSubMenu("nftUsername")}
                              style={styles.headerWrapper}
                            >
                              <Text style={styles.txtSubHeader2}>
                                {t("NFT USERNAMES")}
                              </Text>
                              <Image
                                source={
                                  subMenuActive === "nftUsername"
                                    ? arrowUp
                                    : arrowDown
                                }
                              />
                            </TouchableOpacity>
                            {subMenuActive === "nftUsername" && (
                              <View style={styles.wrapperContentSubLoginInfo}>
                                {loadingList ? (
                                  <ActivityIndicator
                                    style={{ alignSelf: "flex-start" }}
                                    color={isDark ? "#fff" : "#000"}
                                  />
                                ) : (
                                  <>
                                    {nftUsername.length > 0 ? (
                                      <>
                                        {nftUsername.map((val, i) => (
                                          <TouchableOpacity
                                            onPress={() =>
                                              resolveDid(val, "did")
                                            }
                                            style={{ alignSelf: "flex-start" }}
                                          >
                                            <Text
                                              key={i}
                                              style={{ color: "#fff" }}
                                            >
                                              {val}
                                            </Text>
                                          </TouchableOpacity>
                                        ))}
                                      </>
                                    ) : (
                                      <Text style={styles.txtNoDomain}>
                                        No NFT Domain Name is available.
                                      </Text>
                                    )}
                                  </>
                                )}
                              </View>
                            )}
                          </View>
                          <View style={styles.subLoginInfo}>
                            <TouchableOpacity
                              onPress={() => selectSubMenu("domain")}
                              style={styles.headerWrapper}
                            >
                              <Text style={styles.txtSubHeader2}>
                                {t("DID_DOMAIN")}
                              </Text>
                              <Image
                                source={
                                  subMenuActive === "domain"
                                    ? arrowUp
                                    : arrowDown
                                }
                              />
                            </TouchableOpacity>
                            {subMenuActive === "domain" && (
                              <View style={styles.wrapperContentSubLoginInfo}>
                                {loadingList ? (
                                  <ActivityIndicator
                                    style={{ alignSelf: "flex-start" }}
                                    color={isDark ? "#fff" : "#000"}
                                  />
                                ) : (
                                  <>
                                    {didDomain.length > 0 ? (
                                      <>
                                        {didDomain.map((val, i) => (
                                          <TouchableOpacity
                                            onPress={() =>
                                              resolveDid(
                                                loginInfo_?.username,
                                                val
                                              )
                                            }
                                            style={{ alignSelf: "flex-start" }}
                                          >
                                            <Text
                                              key={i}
                                              style={{ color: "#fff" }}
                                            >
                                              {val}@
                                            </Text>
                                          </TouchableOpacity>
                                        ))}
                                      </>
                                    ) : (
                                      <Text style={styles.txtNoDomain}>
                                        {t("DID_NO_DOMAINS")}
                                      </Text>
                                    )}
                                  </>
                                )}
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    )}
                    {!isLogin ? (
                      <>
                        <View>
                          <TouchableOpacity
                            onPress={() => selectMenu("eoa")}
                            style={styles.headerWrapper}
                          >
                            <Text style={styles.txtHeader}>
                              {t("EXTERNAL_WALLETS")}
                            </Text>
                            <Image
                              source={menuActive === "eoa" ? minusIco : addIco}
                            />
                          </TouchableOpacity>
                          {menuActive === "eoa" && (
                            <>
                              <View style={styles.subEoaWrapper}>
                                <View style={styles.walletHeaderWrapper}>
                                  <Image
                                    style={styles.zilpayIco}
                                    source={zilpay}
                                  />
                                  <Text style={styles.textWalletHeader}>
                                    {t("ZILLIQA_WALLET")}
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() => setIsDisconnect(true)}
                                  >
                                    <Text style={styles.txtDisconnect}>
                                      {t("DISCONNECT")}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(
                                      `https://devex.zilliqa.com/address/${account.bech32}?network=https%3A%2F%2Fdev-api.zilliqa.com`
                                    );
                                  }}
                                >
                                  <Text style={styles.txtAddress}>
                                    {account.bech32}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </>
                          )}
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() => selectMenu("login")}
                            style={styles.headerWrapper}
                          >
                            <Text style={styles.txtHeader}>{t("LOG_IN")}</Text>
                            <Image
                              source={
                                menuActive === "login" ? minusIco : addIco
                              }
                            />
                          </TouchableOpacity>
                          {menuActive === "login" && (
                            <>
                              <View style={styles.subEoaWrapper}>
                                <TouchableOpacity
                                  onPress={() => selectSubMenu("existing")}
                                  style={styles.headerWrapper}
                                >
                                  <Text style={styles.txtSubHeader}>
                                    {t("EXISTING_USER")}
                                  </Text>
                                  <Image
                                    source={
                                      subMenuActive === "existing"
                                        ? arrowUp
                                        : arrowDown
                                    }
                                  />
                                </TouchableOpacity>
                                {subMenuActive === "existing" && (
                                  <View>
                                    <View style={styles.formWrapper}>
                                      <Text style={styles.txtForm}>
                                        {t("NFT_USERNAME")}
                                      </Text>
                                      <View style={styles.loginWrapper}>
                                        {address === "" ? (
                                          <TextInput
                                            style={styles.formInput}
                                            value={username}
                                            onChangeText={(text: string) =>
                                              setUsername(text)
                                            }
                                          />
                                        ) : (
                                          <View style={styles.formInputDis} />
                                        )}
                                        {loadingResolve && username !== "" ? (
                                          <ActivityIndicator color="#fff" />
                                        ) : (
                                          <TouchableOpacity
                                            onPress={resolveUsername}
                                            style={styles.arrowBtn}
                                          >
                                            <Image
                                              style={styles.arrowRight}
                                              source={rightArrow}
                                            />
                                          </TouchableOpacity>
                                        )}
                                      </View>
                                    </View>
                                    <Text style={styles.txtOr}>{t("OR")}</Text>
                                    <View style={styles.formWrapper}>
                                      <Text style={styles.txtForm}>
                                        {t("ADDRESS")}
                                      </Text>
                                      <View style={styles.loginWrapper}>
                                        {username === "" ? (
                                          <TextInput
                                            style={styles.formInput}
                                            value={address}
                                            onChangeText={(text: string) =>
                                              setAddress(text)
                                            }
                                          />
                                        ) : (
                                          <View style={styles.formInputDis} />
                                        )}
                                        {loadingResolve && address !== "" ? (
                                          <ActivityIndicator color="#fff" />
                                        ) : (
                                          <TouchableOpacity
                                            onPress={resolveAddr}
                                            style={styles.arrowBtn}
                                          >
                                            <Image
                                              style={styles.arrowRight}
                                              source={rightArrow}
                                            />
                                          </TouchableOpacity>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                )}
                              </View>
                              <View style={styles.subEoaWrapper}>
                                <TouchableOpacity
                                  onPress={() => selectSubMenu("new")}
                                  style={styles.headerWrapper}
                                >
                                  <Text style={styles.txtSubHeader}>
                                    {t("NEW_USER_CREATE_SSI")}
                                  </Text>
                                  <Image
                                    source={
                                      subMenuActive === "new"
                                        ? arrowUp
                                        : arrowDown
                                    }
                                  />
                                </TouchableOpacity>
                                {subMenuActive === "new" && (
                                  <View>
                                    <View style={styles.code}>
                                      <Text style={styles.codeTxt}>
                                        {t("DEPLOY_NEW_SSI")}:
                                      </Text>
                                    </View>
                                    <View style={styles.btnNewSsiWrapper}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          setPopup(true);
                                          hideModal();
                                        }}
                                        style={styles.btnNewSsi}
                                      >
                                        <Text style={styles.btnNewSsiTxt}>
                                          {t("CREATE_SSI")}
                                        </Text>
                                      </TouchableOpacity>
                                      <Text style={styles.txtGas}>
                                        {t("GAS_AROUND")} 1 ZIL
                                      </Text>
                                    </View>
                                  </View>
                                )}
                              </View>
                            </>
                          )}
                        </View>
                      </>
                    ) : (
                      <>
                        <View>
                          <TouchableOpacity
                            onPress={() => selectMenu("login")}
                            style={styles.headerWrapper}
                          >
                            <Text
                              style={{
                                ...styles.txtHeader,
                                textTransform: "none",
                              }}
                            >
                              {t("NEW_SSI")}
                            </Text>
                            <Image
                              source={
                                menuActive === "login" ? minusIco : addIco
                              }
                            />
                          </TouchableOpacity>
                          {menuActive === "login" && (
                            <View>
                              <View style={styles.code}>
                                <Text style={styles.codeTxt}>
                                  {t("DEPLOY_NEW_SSI")}
                                </Text>
                              </View>
                              <View style={styles.btnNewSsiWrapper}>
                                <TouchableOpacity
                                  onPress={() => {
                                    setPopup(true);
                                    hideModal();
                                  }}
                                  style={styles.btnNewSsi}
                                >
                                  <Text style={styles.btnNewSsiTxt}>
                                    {t("CREATE_SSI")}
                                  </Text>
                                </TouchableOpacity>
                                <Text style={styles.txtGas}>
                                  {t("GAS_AROUND")} 1 ZIL
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                        <View>
                          <TouchableOpacity
                            onPress={() => selectMenu("eoa")}
                            style={styles.headerWrapper}
                          >
                            <Text style={styles.txtHeader}>
                              {t("EXTERNAL_WALLETS")}
                            </Text>
                            <Image
                              source={menuActive === "eoa" ? minusIco : addIco}
                            />
                          </TouchableOpacity>
                          {menuActive === "eoa" && (
                            <>
                              <View style={styles.subEoaWrapper}>
                                <View style={styles.walletHeaderWrapper}>
                                  <Image
                                    style={styles.zilpayIco}
                                    source={zilpay}
                                  />
                                  <Text style={styles.textWalletHeader}>
                                    {t("ZILLIQA_WALLET")}
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() => setIsDisconnect(true)}
                                  >
                                    <Text style={styles.txtDisconnect}>
                                      {t("DISCONNECT")}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                  onPress={() => {
                                    Linking.openURL(
                                      `https://devex.zilliqa.com/address/${zilliqa}?network=https%3A%2F%2Fdev-api.zilliqa.com`
                                    );
                                  }}
                                >
                                  <Text style={styles.txtAddress}>
                                    {zilliqa}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </>
                          )}
                        </View>
                      </>
                    )}
                    {isLogin && (
                      <TouchableOpacity
                        onPress={() => {
                          loginInfo.set(null);
                          setLoginState("");
                          hideModal();
                        }}
                        style={styles.btnLogOff}
                      >
                        <Image source={logOff} />
                        <Text style={styles.btnLogOffTxt}>{t("LOG_OFF")}</Text>
                      </TouchableOpacity>
                    )}
                  </ScrollView>
                ) : (
                  <View>
                    <Text style={styles.titleDisconnect}>
                      SAVE YOUR PRIVATE KEY BEFORE DISCONNECTED
                    </Text>
                    <View style={styles.wrapperKey}>
                      <Text style={styles.txtWhiteBold}>Wallet:&nbsp;</Text>
                      <Text style={styles.txtWhiteKey}>{privateKey}</Text>
                      <TouchableOpacity
                        onPress={() => copyText(privateKey)}
                        style={styles.btnCopy}
                      >
                        <Text style={{ color: "#fff" }}>copy</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.wrapperKey}>
                      <Text style={styles.txtWhiteBold}>DID:&nbsp;</Text>
                      <Text style={styles.txtWhiteKey}>-</Text>
                      <TouchableOpacity
                        onPress={() => copyText("")}
                        style={styles.btnCopy}
                      >
                        <Text style={{ color: "#fff" }}>copy</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={disconnect}
                      style={styles.btnDisconnect}
                    >
                      <Text style={{ color: "#fff" }}>DISCONNECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnCancel}
                      onPress={() => setIsDisconnect(false)}
                    >
                      <Text style={styles.txtCancel}>CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TyronConfirm
        title="New DID"
        visible={popup}
        setPopup={setPopup}
        onConfirm={newSsi}
      />
    </>
  );
};

export default ModalConnect;

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
    justifyContent: "center",
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
  txtHeader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    maxWidth: deviceWidth - deviceWidth * 0.3,
    textTransform: "uppercase",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  subEoaWrapper: {
    marginLeft: 15,
    marginVertical: 5,
  },
  subLogin: {
    marginVertical: 20,
  },
  subLoginInfo: {
    marginLeft: 15,
    marginVertical: -5,
  },
  walletHeaderWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textWalletHeader: {
    color: "#fff",
    marginHorizontal: 10,
    marginBottom: 5,
  },
  zilpayIco: {
    width: 20,
    height: 20,
  },
  txtDisconnect: {
    color: "#eb5757",
    fontSize: 12,
    marginBottom: 5,
  },
  txtAddress: {
    color: "silver",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  btnConnectArConnect: {
    width: 225,
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginVertical: 5,
  },
  btnConnectArConnectTxt: {
    color: "#fff",
    fontSize: 12,
    letterSpacing: 1.5,
  },
  txtSubHeader: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "none",
  },
  txtSubHeader2: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
  formWrapper: {
    marginLeft: 10,
    marginVertical: 5,
  },
  txtForm: {
    color: "#fff",
    fontSize: 12,
  },
  formInput: {
    width: 250,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 5,
    color: "#fff",
    paddingHorizontal: 5,
  },
  formInputDis: {
    width: 250,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 5,
    color: "#fff",
    paddingHorizontal: 5,
  },
  txtOr: {
    color: "#fff",
    marginVertical: 15,
    marginLeft: 10,
    fontSize: 12,
  },
  btnContinue: {
    width: 100,
    padding: 5,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#ffff32",
    borderRadius: 5,
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  btnContinueTxt: {
    color: "#ffff32",
    fontWeight: "bold",
  },
  code: {
    padding: 5,
    marginLeft: 10,
    marginVertical: 5,
    alignItems: "flex-start",
  },
  codeTxt: {
    color: "#fff",
    fontSize: 12,
  },
  btnNewSsiWrapper: {
    width: deviceWidth - deviceWidth * 0.6,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  btnNewSsi: {
    width: deviceWidth - deviceWidth * 0.6,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffff32",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginVertical: 5,
  },
  btnNewSsiTxt: {
    color: "#ffff32",
    letterSpacing: 1,
    textAlign: "center",
  },
  wrapperContentSubLoginInfo: {
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 10,
  },
  txtNoDomain: {
    color: "#fff",
    fontSize: 12,
  },
  txtLoggedInUsername: {
    fontSize: 14,
    color: "#fff",
  },
  txtLoggedInAddress: {
    fontSize: 14,
    color: "#ffff32",
    textDecorationLine: "underline",
    marginTop: 5,
    marginBottom: 10,
  },
  btnLogOff: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  btnLogOffTxt: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  txtGas: {
    color: "lightgrey",
    fontSize: 10,
    letterSpacing: 2,
    marginLeft: 10,
    marginBottom: 10,
  },
  titleDisconnect: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  txtWhiteBold: {
    color: "#fff",
    fontWeight: "bold",
  },
  txtWhiteKey: {
    color: "#fff",
    maxWidth: deviceWidth - (deviceWidth * 50) / 100,
  },
  wrapperKey: {
    flexDirection: "row",
    marginVertical: 10,
  },
  btnCopy: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    height: 30,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  btnDisconnect: {
    backgroundColor: "#eb5757",
    borderRadius: 5,
    height: 30,
    width: (deviceWidth * 40) / 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  btnCancel: {
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  txtCancel: {
    color: "#fff",
    textDecorationLine: "underline",
  },
  arrowRight: {
    width: 15,
    height: 15,
  },
  arrowBtn: {
    backgroundColor: "#5d5c5c",
    padding: 5,
    borderRadius: 50,
  },
  loginWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
