import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import Headline from "../../../../components/Headline/Index";
import DIDLayout from "../../../../components/Layout/DID/Index";
import Donate from "../../../../components/Donate/Index";
import { TextInput } from "react-native";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { loginInfo, userDomain, userName, userResolved } from "app/lib/controller/tyron/user";
import OriginatorAddress from "app/pages/tyron/components/OriginatorAddress/Index";
import WalletInfo from "app/pages/tyron/components/WalletInfo/Index";
import { donation, originatorAddress } from "app/lib/controller/tyron/utils";
import { ActivityIndicator } from "react-native";
import ContinueArrow from "../../../../assets/icons/continue_arrow.svg";
import Tick from "../../../../assets/icons/tick_blue.svg";
import { Alert } from "react-native";
import wallet from "app/pages/tyron/util/wallet";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const StakeAddFunds: React.FC<Props> = ({ navigation }) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default StakeAddFunds;

const Child: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const { checkBalance } = wallet();
  const name = userName.useValue();
  const domain = userDomain.useValue();
  const resolvedInfo = userResolved.useValue();
  const donation_ = donation.useValue();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const originator = originatorAddress.useValue()

  const [savedInput, setSavedInput] = useState(false);
  const [loadingInfoBal, setLoadingInfoBal] = useState(false);
  const [inputCoin, setInputCoin] = useState<any>(0);
  const [popup, setPopup] = useState(false);

  const onChangeInputCoin = (val: string) => {
    setSavedInput(false);
    setInputCoin(val);
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

  const handleSave = async () => {
    const isEnough = await checkBalance(
      "zil",
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

  const showSubmitBtn = () => {
    if (originator?.value === 'zilliqa' && savedInput) {
        return true
    } else if (
        originator?.value !== 'zilliqa' &&
        donation_ !== null &&
        savedInput
    ) {
        return true
    } else {
        return false
    }
}

  return (
    <View>
      <Headline navigation={navigation} data={[]} />
      <View style={styles.textHeaderWrapper}>
        <Text style={styles.txtHeader}>ADD FUNDS</Text>
      </View>
      <View style={styles.wrapper}>
        <OriginatorAddress />
        {originator?.value &&
          <>
            <View style={styles.walletInfo}>
              <WalletInfo coin="ZIL" />
            </View>
            <View style={styles.coinInputWrapper}>
              <TextInput
                placeholder={t("Type amount")}
                placeholderTextColor="#fff"
                style={styles.coinInput}
                onChangeText={(text: string) => onChangeInputCoin(text)}
              />
              <Text style={styles.txtCoinType}>ZIL</Text>
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
            {savedInput && originator?.value !== 'zilliqa' && <Donate />}
            {showSubmitBtn() &&
              <View>
                <Text style={styles.txtInfo}>Send funds into {resolvedInfo?.domain}@{resolvedInfo?.name}</Text>
                <TouchableOpacity
                  onPress={() => setPopup(true)}
                  style={styles.btnTransfer}
                >
                  <Text style={styles.btnTransferTxt}>
                    {t("TRANSFER")}{" "}{inputCoin} ZIL
                  </Text>
                </TouchableOpacity>
                <Text style={styles.txtGas}>{t("GAS_AROUND")} 1-2 zil</Text>
              </View>
            }
          </>
        }
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
    color: "#0000ff",
    letterSpacing: 2,
    textAlign: "center",
    maxWidth: 200,
  },
  textHeaderWrapper: {
    marginVertical: 25,
    marginTop: 50,
    alignSelf: "center",
  },
  wrapper: {
    width: deviceWidth * 0.9,
    alignSelf: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    marginTop: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    marginBottom: 100,
  },
  walletInfo: {
    marginTop: -10,
    marginBottom: 20,
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
    marginRight: 10,
  },
  coinInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: deviceWidth * 0.5,
    color: "#fff",
    paddingHorizontal: 10,
    height: 40,
  },
  txtInfo: {
    color: "#fff",
    alignSelf: 'center',
  },
  btnTransfer: {
    borderWidth: 1,
    borderColor: "#0000ff",
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 50,
    backgroundColor: '#000',
  },
  btnTransferTxt: {
    color: "#0000ff",
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
});

const stylesLight = StyleSheet.create({
  txtTitleWrapper: {
    marginVertical: 5,
  },
  txtHeader: {
    fontSize: 20,
    color: "#0000ff",
    letterSpacing: 2,
    textAlign: "center",
    maxWidth: 200,
  },
  textHeaderWrapper: {
    marginVertical: 25,
    marginTop: 50,
    alignSelf: "center",
  },
});
