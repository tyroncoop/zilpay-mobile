import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking,
  TextInput,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DIDLayout from "../../../components/Layout/DID/Index";
import Headline from "../../../components/Headline/Index";
import { useTranslation } from "react-i18next";
import ContinueArrow from "../../../assets/icons/continue_arrow.svg";
import Tick from "../../../assets/icons/tick.svg";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { userName, userResolved } from "app/lib/controller/tyron/user";
import * as tyron from "../../../../../../node_modules/tyron";
import { ActivityIndicator } from "react-native";
import { TyronConfirm } from "app/pages/tyron/components/PopUp";
import { showTxModal, txId, txStatus } from "app/lib/controller/tyron/tx";
import { ZilPayBase } from "app/pages/tyron/util/zilpay-base";
import { keystore } from "app/keystore";
import { Alert } from "react-native";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const AddFunds: React.FC<Props> = ({ navigation }) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default AddFunds;

const Child: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const name = userName.useValue();
  const resolvedInfo = userResolved.useValue();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const [openOriginator, setOpenOriginator] = useState(false);
  const [valueOriginator, setValueOriginator] = useState("");
  const [openCoin, setOpenCoin] = useState(false);
  const [valueCoin, setValueCoin] = useState("");
  const [openSSI, setOpenSSI] = useState(false);
  const [valueSSI, setValueSSI] = useState("");
  const [popup, setPopup] = useState(false);
  const [savedInput, setSavedInput] = useState(false);
  const [inputCoin, setInputCoin] = useState<any>(0);
  const net = "testnet";

  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const sendTx = async (privkey: string) => {
    // setLoading(true)
    showTxModal.set(true);
    txStatus.set("loading");
    const contractAddress = resolvedInfo?.addr;
    try {
      const zilpay = new ZilPayBase();
      const tx: any = await zilpay.call({
        contractAddress: contractAddress,
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
      // setLoading(false)
    } catch (err) {
      console.log("@@@", err);
      txStatus.set("rejected");
    }
    // setLoading(false)
  };

  const saveInputCoin = () => {
    setSavedInput(false);
    let input = inputCoin;
    const re = /,/gi;
    input = input.replace(re, ".");
    const input_ = Number(input);
    if (!isNaN(input_)) {
      setSavedInput(true);
    } else {
      Alert.alert("The input is not a number.");
    }
  };

  const itemsOriginator = [
    { label: t("Select originator"), value: "" },
    { label: "xWallet", value: "ssi" },
    { label: "ZilPay", value: "zilpay" },
  ];

  const itemsSSI = [
    { label: t("NFT Username"), value: "nft" },
    { label: t("Address"), value: "address" },
  ];

  const itemsCoin = [
    { label: t("Select coin"), value: "" },
    { label: "TYRON", value: "tyron" },
    { label: "$SI", value: "$si" },
    { label: "ZIL", value: "zil" },
  ];

  return (
    <View style={styles.wrapper}>
      <Headline navigation={navigation} data={[]} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.txtHeaderYellow}>{t("ADD FUNDS")}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.txtInfo}>
          {t("You can add funds into X from your SSI or ZilPay.", { name })}
        </Text>
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
        {valueCoin !== "" && (
          <View style={styles.picker}>
            <DropDownPicker
              zIndex={4000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW"
              open={openOriginator}
              value={valueOriginator}
              items={itemsOriginator}
              multiple={false}
              setOpen={setOpenOriginator}
              setValue={setValueOriginator}
              placeholder="Select originator"
              placeholderStyle={{ color: "#fff" }}
              theme="DARK"
              style={{ backgroundColor: "#000", borderColor: "#fff" }}
            />
          </View>
        )}
        {valueOriginator === "zilpay" && (
          <View style={styles.wrapperZilpayInfo}>
            <Text style={styles.txtZilpayInfo}>
              {t("Wallet")}:{" "}
              <Text
                onPress={() =>
                  Linking.openURL(
                    `https://devex.zilliqa.com/address/${account?.bech32}?network=https%3A%2F%2Fdev-api.zilliqa.com`
                  )
                }
              >
                {account?.bech32}
              </Text>
            </Text>
            <Text style={styles.txtZilpayInfo}>Balance: -</Text>
          </View>
        )}
        {valueOriginator === "ssi" && (
          <View style={styles.pickerSSI}>
            <DropDownPicker
              zIndex={3000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW"
              open={openSSI}
              value={valueSSI}
              items={itemsSSI}
              multiple={false}
              setOpen={setOpenSSI}
              setValue={setValueSSI}
              placeholder={t("Log in")}
              placeholderStyle={{ color: "#fff" }}
              theme="DARK"
              style={{ backgroundColor: "#000", borderColor: "#fff" }}
            />
          </View>
        )}
        {valueSSI === "nft" ? (
          <View style={styles.wrapperDomain}>
            <TextInput
              placeholder={t("Type username")}
              placeholderTextColor="#fff"
              style={styles.inputAddress}
            />
            <TouchableOpacity>
              <ContinueArrow width={30} height={30} />
            </TouchableOpacity>
          </View>
        ) : valueSSI === "address" ? (
          <View style={styles.wrapperDomain}>
            <TextInput
              placeholder={t("Type address")}
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
        {valueOriginator === "zilpay" ||
        (valueOriginator === "ssi" && valueSSI !== "") ? (
          <View style={styles.selectCoinWrapper}>
            <Text style={styles.txtCoin}>
              {t("ADD_FUNDS_INTO_TITLE")}{" "}
              <Text style={{ color: "#ffff32" }}>{name}</Text>
            </Text>
          </View>
        ) : (
          <></>
        )}
        {valueCoin !== "" && valueOriginator !== "" && (
          <View style={styles.coinInputWrapper}>
            <Text style={styles.txtCoinType}>{valueCoin}</Text>
            <TextInput
              placeholder={t("Type amount")}
              placeholderTextColor="#fff"
              style={styles.coinInput}
              onChangeText={(text: string) => setInputCoin(text)}
            />
            {!savedInput ? (
              <TouchableOpacity onPress={saveInputCoin}>
                <ContinueArrow width={30} height={30} />
              </TouchableOpacity>
            ) : (
              <Tick width={30} height={30} />
            )}
          </View>
        )}
        {savedInput && (
          <View>
            <TouchableOpacity
              onPress={() => setPopup(true)}
              style={styles.btnTransfer}
            >
              <Text style={styles.btnTransferTxt}>
                {t("TRANSFER")}{" "}
                <Text style={{ color: "#ffff32", textTransform: "uppercase" }}>
                  {inputCoin} {valueCoin}
                </Text>{" "}
                {t("TO")} <Text style={{ color: "#ffff32" }}>{name}</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.txtGas}>{t("GAS_AROUND")} 4-7 zil</Text>
          </View>
        )}
        <TyronConfirm
          title="Add Funds"
          visible={popup}
          setPopup={setPopup}
          onConfirm={sendTx}
        />
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
});
