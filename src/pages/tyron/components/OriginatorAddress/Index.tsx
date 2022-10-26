import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { originatorAddress } from "app/lib/controller/tyron/utils";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Dimensions, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import ContinueArrow from "../../assets/icons/continue_arrow.svg";
import Tick from "../../assets/icons/tick.svg";
import * as tyron from "../../../../../node_modules/tyron";
import { Alert } from "react-native";
import { userResolved } from "app/lib/controller/tyron/user";
import { keystore } from "app/keystore";
import { ActivityIndicator } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {};

const OriginatorAddress: React.FC<Props> = () => {
  const zcrypto = tyron.Util.default.Zcrypto();
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;

  const [loading, setLoading] = useState(false);
  const [openOriginator, setOpenOriginator] = useState(false);
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [saved, setSaved] = useState(false);
  const net = "testnet";
  const resolvedInfo = userResolved.useValue();

  const originatorAddress_: any = originatorAddress.useValue();
  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const itemsOriginator = [
    { label: t("Select originator"), value: "" },
    { label: "xWallet", value: "ssi" },
    { label: "ZilPay", value: "zilliqa" },
  ];

  const handleChange = () => {
    originatorAddress.set(null);
    if (value === "zilliqa") {
      originatorAddress.set({
        value: "zilliqa",
      });
    }
  };

  const onChangeSearch = (text: string) => {
    originatorAddress.set(null);
    setSaved(false);
    setInput(text);
  };

  const resolveUsername = async () => {
    let username_ = input.toLowerCase();
    let domain_ = "";
    if (input.includes("@")) {
      username_ = input
        .split("@")[1]
        .replace(".did", "")
        .replace(".ssi", "")
        .toLowerCase();
      domain_ = input.split("@")[0];
    } else if (input.includes(".")) {
      if (input.split(".")[1] === "did") {
        username_ = input.split(".")[0].toLowerCase();
        domain_ = "did";
      } else if (input.split(".")[1] === "ssi") {
        username_ = input.split(".")[0].toLowerCase();
      } else {
        throw Error();
      }
    }
    if (input.includes(".did") && input.includes("@")) {
      Alert.alert("INVALID: (@ only possible with .ssi)");
    }
    setLoading(true);
    await tyron.SearchBarUtil.default
      .fetchAddr(net, username_, domain_)
      .then(async (addr) => {
        addr = zcrypto.toChecksumAddress(addr!);
        let init = new tyron.ZilliqaInit.default(
          tyron.DidScheme.NetworkNamespace.Mainnet
        );
        switch (net) {
          case "testnet":
            init = new tyron.ZilliqaInit.default(
              tyron.DidScheme.NetworkNamespace.Testnet
            );
        }
        let did_addr: string;
        if (domain_ === "did") {
          did_addr = addr;
        } else {
          did_addr = await tyron.SearchBarUtil.default.fetchAddr(
            net,
            username_,
            "did"
          );
        }
        const state = await init.API.blockchain.getSmartContractState(did_addr);
        const did_controller = zcrypto.toChecksumAddress(
          state.result.controller
        );
        if (did_controller !== account?.base16) {
          throw Error(t("Failed DID Controller authentication."));
        } else if (addr === resolvedInfo?.addr) {
          Alert.alert("The recipient and sender must be different.");
        } else {
          originatorAddress.set({
            value: addr,
            username: username_,
            domain: domain_,
          });
          setSaved(true);
        }
      })
      .catch(() => {
        Alert.alert("Invalid username");
      });

    setLoading(false);
  };

  useEffect(() => {
    handleChange();
    setSaved(false);
  }, [value]);

  return (
    <View>
      <Text style={styles.textSource}>{t("Source of funds")}:</Text>
      <View style={styles.picker}>
        <DropDownPicker
          zIndex={4000}
          zIndexInverse={1000}
          listMode="SCROLLVIEW"
          open={openOriginator}
          value={value}
          items={itemsOriginator}
          multiple={false}
          setOpen={setOpenOriginator}
          setValue={setValue}
          placeholder="Select originator"
          placeholderStyle={{ color: "#fff" }}
          theme="DARK"
          style={{ backgroundColor: "#000", borderColor: "#fff" }}
        />
      </View>
      {value === "ssi" && (
        <View style={styles.wrapperDomain}>
          <TextInput
            placeholder={t("Type username")}
            placeholderTextColor="#fff"
            style={styles.inputAddress}
            onChangeText={(text: string) => onChangeSearch(text)}
          />
          {loading ? (
            <ActivityIndicator color={isDark ? "#fff" : "#000"} />
          ) : (
            <TouchableOpacity onPress={resolveUsername}>
              {saved ? (
                <Tick width={30} height={30} />
              ) : (
                <ContinueArrow width={30} height={30} />
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default OriginatorAddress;

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
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderColor: "#fff",
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnTransferTxt: {
    color: "#fff",
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
  textSource: {
    color: "#fff",
    marginBottom: -5,
    marginTop: 15,
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
    marginHorizontal: 10,
    height: 40,
  },
  buttonContinue: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  btnTransfer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 1,
    borderColor: "#fff",
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnTransferTxt: {
    color: "#fff",
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
    justifyContent: "center",
  },
  inputDomain: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.3,
    color: "#fff",
    paddingHorizontal: 10,
    marginHorizontal: 10,
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
    marginHorizontal: 10,
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
  textSource: {
    color: "#000",
    marginBottom: -5,
    marginTop: 15,
  },
});
