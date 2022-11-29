import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import * as tyron from "../../../../../node_modules/tyron";
import { donation, extraZil, zilBal } from "app/lib/controller/tyron/utils";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";
import { Image } from "react-native";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Dimensions, TextInput } from "react-native";
import ContinueArrow from "../../assets/icons/continue_arrow.svg";
import Tick from "../../assets/icons/tick.svg";
import smartContract from "../../util/smartContract";
import { keystore } from "app/keystore";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {};

const Donate: React.FC<Props> = () => {
  const { getSmartContract } = smartContract();
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const donation_ = donation.useValue();
  const zilBal_ = zilBal.useValue();
  const extraZil_ = extraZil.useValue();
  const net = "testnet";
  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const [input, setInput] = useState(0);

  const handleInput = (value: any) => {
    donation.set(null);
    let input = value;
    const re = /,/gi;
    input = input.replace(re, ".");
    input = Number(input);
    setInput(input);
    if (isNaN(input)) {
      input = 0;
    }
    setInput(input);
  };

  const handleSubmit = async () => {
    if (Number(extraZil_) > 0 && Number(zilBal_) < input + Number(extraZil_)) {
      Alert.alert("Insufficient balance");
    } else {
      donation.set(input);
      const donation_ = donation.useValue();
      if (input !== 0) {
        try {
          await tyron.SearchBarUtil.default
            .fetchAddr(net, "donate", "")
            .then(async (donate_addr) => {
              return await getSmartContract(donate_addr, "xpoints");
            })
            .then(async (balances) => {
              return await tyron.SmartUtil.default.intoMap(
                balances.result.xpoints
              );
            })
            .then((balances_) => {
              // Get balance of the logged in address
              const balance = balances_.get(account?.base16.toLowerCase());
              if (balance !== undefined) {
                // toast.info(
                //     t(
                //         'Thank you! You are getting X xPoints. Current balance: X xPoints',
                //         {
                //             value: donation_!.toFixed(2),
                //             balance: (balance / 1e12).toFixed(
                //                 2
                //             ),
                //             s:
                //                 Number(donation_) === 1
                //                     ? ''
                //                     : 's',
                //             s2:
                //                 Number(balance / 1e12) === 1
                //                     ? ''
                //                     : 's',
                //         }
                //     ),
                //     {
                //         position: 'bottom-right',
                //         autoClose: 4000,
                //         hideProgressBar: false,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         draggable: true,
                //         progress: undefined,
                //         theme: toastTheme(isLight),
                //         toastId: 2,
                //     }
                // )
              }
            })
            .catch(() => {
              throw new Error("Donate DApp: Not able to fetch balance.");
            });
        } catch (error) {
          Alert.alert(String(error));
        }
      } else {
        Alert.alert(t("Donating 0 ZIL, you will get 0 xP"));
      }
    }
  };

  return (
    <View>
      <Text style={styles.txt}>
        {t("How many ZIL would you like to contribute to the")}{" "}
        <Text
          onPress={() =>
            Linking.openURL(
              "https://www.notion.so/ssiprotocol/TYRON-a-Network-for-Self-Sovereign-Identities-7bddd99a648c4849bbf270ce86c48dac#29c0e576a78b455fb23e4dcdb4107032"
            )
          }
          style={{ textDecorationLine: "underline", ...styles.txt }}
        >
          Donate DApp?
        </Text>
      </Text>
      <View style={styles.wrapper}>
        <View style={styles.wrapperInput}>
          <TextInput
            onChangeText={handleInput}
            keyboardType="numeric"
            style={styles.input}
          />
          <View style={styles.wrapperInfo}>
            <Text style={styles.txt}>ZIL</Text>
          </View>
          <View style={{ marginHorizontal: 5, ...styles.wrapperInfo }}>
            <Text style={styles.txt}>= {input} xP</Text>
          </View>
        </View>
        {donation_ === null ? (
          <TouchableOpacity onPress={handleSubmit}>
            <ContinueArrow width={30} height={30} />
          </TouchableOpacity>
        ) : (
          <Tick width={30} height={30} />
        )}
      </View>
    </View>
  );
};

export default Donate;

const stylesDark = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: 100,
    color: "#fff",
  },
  wrapperInfo: {
    backgroundColor: "#ffffff13",
    padding: 5,
    borderRadius: 5,
  },
  txt: {
    color: "#fff",
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: 100,
    color: "#000",
  },
  wrapperInfo: {
    backgroundColor: "#ffffff13",
    padding: 5,
    borderRadius: 5,
  },
  txt: {
    color: "#fff",
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
});
