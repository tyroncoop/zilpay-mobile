import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import * as tyron from "../../../../../../../../node_modules/tyron";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import Headline from "../../../../../components/Headline/Index";
import DIDLayout from "../../../../../components/Layout/DID/Index";
import CloseIco from "../../../../../assets/img/ic_cross.png";
import ContinueArrow from "../../../../../assets/icons/continue_arrow.svg";
import Tick from "../../../../../assets/icons/tick.svg";
import { TextInput } from "react-native";
import { Alert } from "react-native";
import {
  domainAddr,
  domainInput,
  domainLegend,
  domainLegend2,
  donation,
  loadingGlobal,
  txName,
} from "app/lib/controller/tyron/utils";
import { userResolved } from "app/lib/controller/tyron/user";
import Donate from "app/pages/tyron/components/Donate/Index";
import { ZilPayBase } from "app/pages/tyron/util/zilpay-base";
import {
  showTxModal,
  txId,
  txModalMinimized,
  txStatus,
} from "app/lib/controller/tyron/tx";
import { Linking } from "react-native";
import { TyronConfirm } from "app/pages/tyron/components/PopUp";
import smartContract from "app/pages/tyron/util/smartContract";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const DIDDomains: React.FC<Props> = ({ navigation }) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default DIDDomains;

const Child: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { getSmartContract } = smartContract();
  const zcrypto = tyron.Util.default.Zcrypto();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;

  const [active, setActive] = txName.use();
  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [popup3, setPopup3] = useState(false);

  const net = "testnet";
  const resolvedInfo = userResolved.useValue();
  const name = resolvedInfo?.name;
  const didDomain = domainInput.useValue();
  const domainLegend_ = domainLegend.useValue();
  const domainLegend2_ = domainLegend2.useValue();
  const donation_ = donation.useValue();
  const input = domainAddr.useValue();

  const toggleActive = (type: string) => {
    domainLegend2.set("save");
    if (type === active) {
      setActive("");
    } else {
      setActive(type);
    }
  };

  const handleInputDomain = (value: string) => {
    donation.set(null);
    domainAddr.set("");
    domainLegend.set("save");
    domainInput.set(value);
  };

  const handleInputAddr = (value: string) => {
    donation.set(null);
    domainAddr.set("");
    domainLegend2.set("save");
    domainAddr.set(value);
  };

  const handleSaveDomain = async () => {
    if (didDomain !== "" && didDomain !== "did" && !didDomain.includes(".")) {
      domainLegend.set("saved");
    } else {
      Alert.alert(t("Invalid"));
    }
  };

  const handleSaveAddr = async () => {
    const addr = tyron.Address.default.verification(input);
    if (addr !== "") {
      domainAddr.set(addr);
      domainLegend2.set("saved");
    } else {
      Alert.alert(t("Wrong address."));
    }
  };

  const handleDeploy = async (privkey: string) => {
    if (resolvedInfo !== null && net !== null) {
      const zilpay = new ZilPayBase();
      txId.set("");
      txStatus.set("loading");
      txModalMinimized.set(false);
      showTxModal.set(true);
      let tx = await tyron.Init.default.transaction(net);
      await zilpay
        .deployDomainBeta(net, name, privkey)
        .then(async (deploy: any) => {
          txId.set(deploy[0].id);
          txStatus.set("submitted");
          try {
            tx = await tx.confirm(deploy[0].id);
            if (tx.isConfirmed()) {
              txStatus.set("confirmed");
              donation.set(null);
              Linking.openURL(
                `https://v2.viewblock.io/zilliqa/tx/${deploy[0].id}?network=${net}`
              );
              const txn = await tyron.Init.default.contract(deploy[0].id, net);
              let addr = "0x" + txn;
              addr = zcrypto.toChecksumAddress(addr);
              domainAddr.set(addr);
              domainLegend2.set("saved");
            } else if (tx.isRejected()) {
              txStatus.set("failed");
              setTimeout(() => {
                Alert.alert(t("Transaction failed."));
              }, 1000);
            }
          } catch (err) {
            showTxModal.set(false);
            Alert.alert(String(err));
          }
        })
        .catch((error) => {
          txStatus.set("rejected");
          txModalMinimized.set(false);
          showTxModal.set(true);
          Alert.alert(String(error));
        });
    } else {
      Alert.alert("Some data is missing.");
    }
  };

  const handleDeployVC = async (privkey: string) => {
    if (resolvedInfo !== null && net !== null) {
      const zilpay = new ZilPayBase();
      txId.set("");
      txStatus.set("loading");
      txModalMinimized.set(false);
      showTxModal.set(true);
      let tx = await tyron.Init.default.transaction(net);
      console.log("#", "okok");
      await zilpay
        .deployDomainBetaVC(net, name, didDomain, privkey)
        .then(async (deploy: any) => {
          txId.set(deploy[0].id);
          txStatus.set("submitted");
          try {
            tx = await tx.confirm(deploy[0].id);
            if (tx.isConfirmed()) {
              txStatus.set("confirmed");
              donation.set(null);
              Linking.openURL(
                `https://v2.viewblock.io/zilliqa/tx/${deploy[0].id}?network=${net}`
              );
              const txn = await tyron.Init.default.contract(deploy[0].id, net);
              let addr = "0x" + txn;
              addr = zcrypto.toChecksumAddress(addr);
              domainAddr.set(addr);
              domainLegend2.set("saved");
            } else if (tx.isRejected()) {
              txStatus.set("failed");
              setTimeout(() => {
                Alert.alert(t("Transaction failed."));
              }, 1000);
            }
          } catch (err) {
            showTxModal.set(false);
            Alert.alert(String(err));
          }
        })
        .catch(() => {
          txStatus.set("rejected");
          txModalMinimized.set(false);
          showTxModal.set(true);
          Alert.alert("Review deployment");
        });
    } else {
      Alert.alert("Some data is missing.");
    }
  };

  const handleSubmit = async (privkey: string) => {
    try {
      let did_key =
        "0x000000000000000000000000000000000000000000000000000000000000000000";
      let encrypted = "null";
      // await connect().then(async () => {
      //     const arConnect = $arconnect.getState()
      //     if (arConnect) {
      //         const result = await operationKeyPair({
      //             arConnect: arConnect,
      //             id: didDomain,
      //             addr: resolvedInfo?.addr,
      //         })
      //         did_key = result.element.key.key
      //         encrypted = result.element.key.encrypted
      //     }
      // })
      //@todo-x-check: continue after the user select arconnect or rejects: tested action below only run after connect(),
      // but when reject arconnect atm we reload the page so can't continue
      if (resolvedInfo !== null && donation_ !== null) {
        const zilpay = new ZilPayBase();
        const txID = "Dns";
        const addr = zcrypto.toChecksumAddress(input);
        let tyron_: tyron.TyronZil.TransitionValue;
        tyron_ = await tyron.Donation.default.tyron(donation_);

        const tx_params = await tyron.TyronZil.default.Dns(
          addr,
          didDomain,
          did_key,
          encrypted,
          tyron_
        );
        const _amount = String(donation_);
        txId.set("");
        txStatus.set("loading");
        txModalMinimized.set(false);
        showTxModal.set(true);
        let tx = await tyron.Init.default.transaction(net);
        await zilpay
          .call({
            contractAddress: resolvedInfo?.addr!,
            transition: txID,
            params: tx_params as unknown as Record<string, unknown>[],
            amount: _amount,
            privkey,
          })
          .then(async (res) => {
            txId.set(res.id!);
            txStatus.set("submitted");
            try {
              tx = await tx.confirm(res.id!);
              if (tx.isConfirmed()) {
                txStatus.set("confirmed");
                donation.set(null);
                Linking.openURL(
                  `https://v2.viewblock.io/zilliqa/tx/${res.id}?network=${net}`
                );
                // update prev is needed here?: yes, it would be better to use global navigation
                // we already use navigate() on resolveDid() and that's enough

                domainInput.set("");
                domainLegend.set("save");
                domainLegend2.set("save");
                txName.set("");
                resolveDid(name, didDomain);
              } else if (tx.isRejected()) {
                txStatus.set("failed");
                setTimeout(() => {
                  Alert.alert(t("Transaction failed."));
                }, 1000);
              }
            } catch (err) {
              showTxModal.set(false);
              Alert.alert(String(err));
            }
          })
          .catch((error) => {
            txStatus.set("rejected");
            txModalMinimized.set(false);
            showTxModal.set(true);
            Alert.alert(String(error));
          });
      }
    } catch (error) {
      Alert.alert(String(error));
    }
  };

  const resolveDid = async (_username: string, _domain: string) => {
    console.log("1");
    loadingGlobal.set(true);
    const domainId = "0x" + (await tyron.Util.default.HashString(_username));
    await tyron.SearchBarUtil.default
      .fetchAddr(net, domainId, _domain)
      .then(async (addr) => {
        console.log("2", addr);
        const res = await getSmartContract(addr, "version");
        loadingGlobal.set(false);
        userResolved.set({
          name: _username,
          domain: _domain,
          addr: addr,
          version: res?.result?.version,
        });
        console.log("3", res?.result);
        console.log("3", res?.result?.version?.slice(0, 8).toLowerCase());
        switch (res?.result?.version?.slice(0, 8).toLowerCase()) {
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
            navigation.navigate("Services");
            break;
        }
      })
      .catch((err) => {
        Alert.alert(String(err));
        loadingGlobal.set(false);
      });
  };

  const dataHeadline = [
    {
      route: "Wallet",
      name: t("Wallet"),
    },
    {
      route: "NFT",
      name: t("NFT OPERATIONS"),
    },
  ];

  const listDomains = ["ZIL Staking xWallet", "Soulbound xWallet"]; // to add further xWallets

  return (
    <View>
      <Headline navigation={navigation} data={dataHeadline} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.subTxtHeader}>{t("DID DOMAINS")}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.subdomainInputWrapper}>
            <TextInput
              placeholder={t("Type subdomain")}
              placeholderTextColor="#fff"
              style={styles.subdomainInput}
              onChangeText={(text: string) => handleInputDomain(text)}
            />
            <Text style={styles.txtUsername}>@{name}</Text>
            {domainLegend_ === "save" ? (
              <TouchableOpacity onPress={handleSaveDomain}>
                <ContinueArrow width={30} height={30} />
              </TouchableOpacity>
            ) : (
              <Tick width={30} height={30} />
            )}
          </View>
          {domainLegend_ === "saved" && (
            <View>
              {listDomains.map((val, i) => (
                <View key={i} style={styles.actionWrapper}>
                  <TouchableOpacity
                    onPress={() => toggleActive(val)}
                    style={
                      active === val ? styles.btnActionActive : styles.btnAction
                    }
                  >
                    <Text style={styles.txtBold}>{val}</Text>
                  </TouchableOpacity>
                  {active === val && (
                    <View style={styles.contentAction}>
                      <TouchableOpacity
                        onPress={() => toggleActive("")}
                        style={styles.closeIcoWrapper}
                      >
                        <Image style={styles.closeIco} source={CloseIco} />
                      </TouchableOpacity>
                      <View>
                        {domainLegend2_ === "save" ? (
                          <>
                            {val === "ZIL Staking xWallet" ? (
                              <TouchableOpacity
                                onPress={() => setPopup2(true)}
                                style={styles.btnZil}
                              >
                                <Text style={styles.txtBtnZil}>
                                  New ZILxWallet
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() => setPopup1(true)}
                                style={styles.btnSbt}
                              >
                                <Text style={styles.txtBtnSbt}>
                                  New SBTxWallet
                                </Text>
                              </TouchableOpacity>
                            )}
                          </>
                        ) : (
                          <View>
                            <Donate />
                            {donation_ !== null && (
                              <TouchableOpacity
                                onPress={() => setPopup3(true)}
                                style={styles.btnSaveDomain}
                              >
                                <Text style={styles.txtBtnSaveDomain}>
                                  Save{" "}
                                  <Text style={{ color: "#ffff32" }}>
                                    {didDomain}
                                  </Text>{" "}
                                  DID Domain
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        )}
                      </View>
                    </View>
                  )}
                </View>
              ))}
              <View style={styles.actionWrapper}>
                <TouchableOpacity
                  onPress={() => toggleActive("addr")}
                  style={
                    active === "addr"
                      ? styles.btnActionActive
                      : styles.btnAction
                  }
                >
                  <Text style={styles.txtBold}>Type Address</Text>
                </TouchableOpacity>
                {active === "addr" && (
                  <View style={styles.contentAction}>
                    <TouchableOpacity
                      onPress={() => toggleActive("")}
                      style={styles.closeIcoWrapper}
                    >
                      <Image style={styles.closeIco} source={CloseIco} />
                    </TouchableOpacity>
                    <View>
                      <View style={styles.addrInputWrapper}>
                        <TextInput
                          placeholder={t("Type address")}
                          placeholderTextColor="#fff"
                          style={styles.subdomainInput}
                          onChangeText={(text: string) => handleInputAddr(text)}
                        />
                        {domainLegend2_ === "save" ? (
                          <TouchableOpacity onPress={handleSaveAddr}>
                            <ContinueArrow width={30} height={30} />
                          </TouchableOpacity>
                        ) : (
                          <Tick width={30} height={30} />
                        )}
                      </View>
                      {domainLegend2_ === "saved" && (
                        <View>
                          <Donate />
                          {donation_ !== null && (
                            <TouchableOpacity style={styles.btnSaveDomain}>
                              <Text style={styles.txtBtnSaveDomain}>
                                Save{" "}
                                <Text style={{ color: "#ffff32" }}>
                                  {didDomain}
                                </Text>{" "}
                                DID Domain
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
      <TyronConfirm
        title="Deploy Domain"
        visible={popup1}
        setPopup={setPopup1}
        onConfirm={handleDeploy}
      />
      <TyronConfirm
        title="Deploy Domain"
        visible={popup2}
        setPopup={setPopup2}
        onConfirm={handleDeployVC}
      />
      <TyronConfirm
        title="Save Domain"
        visible={popup3}
        setPopup={setPopup3}
        onConfirm={handleSubmit}
      />
    </View>
  );
};

const stylesDark = StyleSheet.create({
  txtHeaderYellowWrapper: {
    marginVertical: 30,
  },
  subTxtHeader: {
    fontSize: 20,
    color: "#fff",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 5,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  content: {
    marginBottom: 120,
  },
  btnAction: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  btnActionActive: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffff32",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  txt: {
    color: "#fff",
  },
  txtBold: {
    color: "#fff",
    fontWeight: "bold",
  },
  txtYellow: {
    color: "#ffff32",
    textAlign: "center",
  },
  contentAction: {
    width: (deviceWidth * 80) / 100,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ffff32",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    marginVertical: 10,
    zIndex: 2,
  },
  closeIco: {
    width: 10,
    height: 10,
  },
  closeIcoWrapper: {
    alignSelf: "flex-end",
  },
  actionWrapper: {
    marginVertical: 10,
  },
  addrInputWrapper: {
    flexDirection: "row",
    marginBottom: 50,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  subdomainInputWrapper: {
    flexDirection: "row",
    marginBottom: 50,
    alignItems: "center",
  },
  txtUsername: {
    color: "#fff",
    backgroundColor: "hsla(0,0%,100%,.075)",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  subdomainInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.5,
    color: "#fff",
    paddingHorizontal: 10,
    height: 40,
  },
  btnZil: {
    backgroundColor: "#000",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0000ff",
    padding: 10,
    alignSelf: "center",
  },
  txtBtnZil: {
    color: "#0000ff",
    letterSpacing: 2,
  },
  btnSbt: {
    backgroundColor: "#000",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffff32",
    padding: 10,
    alignSelf: "center",
  },
  txtBtnSbt: {
    color: "#ffff32",
    letterSpacing: 2,
  },
  btnSaveDomain: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    alignSelf: "center",
    marginTop: 50,
  },
  txtBtnSaveDomain: {
    color: "#fff",
    letterSpacing: 2,
  },
});

const stylesLight = StyleSheet.create({
  txtHeaderYellowWrapper: {
    marginVertical: 30,
  },
  subTxtHeader: {
    fontSize: 20,
    color: "#000",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 5,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  content: {
    marginBottom: 120,
  },
  btnAction: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  btnActionActive: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffff32",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  txt: {
    color: "#fff",
  },
  txtBold: {
    color: "#fff",
    fontWeight: "bold",
  },
  txtYellow: {
    color: "#ffff32",
    textAlign: "center",
  },
  contentAction: {
    width: (deviceWidth * 80) / 100,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ffff32",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    marginVertical: 10,
    zIndex: 2,
  },
  closeIco: {
    width: 10,
    height: 10,
  },
  closeIcoWrapper: {
    alignSelf: "flex-end",
  },
  actionWrapper: {
    marginVertical: 10,
  },
  addrInputWrapper: {
    flexDirection: "row",
    marginBottom: 50,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  subdomainInputWrapper: {
    flexDirection: "row",
    marginBottom: 50,
    alignItems: "center",
  },
  txtUsername: {
    color: "#fff",
    backgroundColor: "hsla(0,0%,100%,.075)",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  subdomainInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.5,
    color: "#fff",
    paddingHorizontal: 10,
    height: 40,
  },
  btnZil: {
    backgroundColor: "#000",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0000ff",
    padding: 10,
    alignSelf: "center",
  },
  txtBtnZil: {
    color: "#0000ff",
    letterSpacing: 2,
  },
  btnSbt: {
    backgroundColor: "#000",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffff32",
    padding: 10,
    alignSelf: "center",
  },
  txtBtnSbt: {
    color: "#ffff32",
    letterSpacing: 2,
  },
  btnSaveDomain: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    alignSelf: "center",
    marginTop: 50,
  },
  txtBtnSaveDomain: {
    color: "#fff",
    letterSpacing: 2,
  },
});
