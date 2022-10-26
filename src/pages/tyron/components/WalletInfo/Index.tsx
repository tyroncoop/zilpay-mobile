import { keystore } from "app/keystore";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { originatorAddress } from "app/lib/controller/tyron/utils";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import * as tyron from "../../../../../node_modules/tyron";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Dimensions, TextInput } from "react-native";
import ArrowDownReg from "../../assets/icons/dashboard_arrow_down_icon.svg";
import ArrowDownBlack from "../../assets/icons/dashboard_arrow_down_icon_black.svg";
import ArrowUpReg from "../../assets/icons/dashboard_arrow_up_icon.svg";
import ArrowUpBlack from "../../assets/icons/dashboard_arrow_up_icon_black.svg";
import smartContract from "../../util/smartContract";
import { ZilPayBase } from "../../util/zilpay-base";
import { ActivityIndicator } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {
  coin: string;
};

const WalletInfo: React.FC<Props> = ({ coin }) => {
  const { t } = useTranslation();
  const { getSmartContract } = smartContract();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const ArrowDown = isDark ? <ArrowDownReg /> : <ArrowDownBlack />;
  const ArrowUp = isDark ? <ArrowUpReg /> : <ArrowUpBlack />;
  const net = "testnet";

  const [toggleInfoZilpay, setToggleInfoZilpay] = useState(false);
  const [loadingInfoBal, setLoadingInfoBal] = useState(false);
  const [infoBal, setInfoBal] = useState(0);

  const originatorAddress_: any = originatorAddress.useValue();
  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const fetchInfoBalance = async (id: string, addr?: string) => {
    let token_addr: string;
    try {
      setLoadingInfoBal(true);
      if (id !== "zil") {
        const init_addr = await tyron.SearchBarUtil.default.fetchAddr(
          net,
          "init",
          "did"
        );
        const get_services = await getSmartContract(init_addr, "services");
        const services = await tyron.SmartUtil.default.intoMap(
          get_services.result.services
        );
        token_addr = services.get(id);
        const balances = await getSmartContract(token_addr, "balances");
        const balances_ = await tyron.SmartUtil.default.intoMap(
          balances.result.balances
        );
        try {
          if (addr) {
            const balance_didxwallet = balances_.get(addr!.toLowerCase()!);
            if (balance_didxwallet !== undefined) {
              const _currency = tyron.Currency.default.tyron(id);
              const finalBalance = balance_didxwallet / _currency.decimals;
              setInfoBal(Number(finalBalance.toFixed(2)));
            }
          } else {
            const balance_zilpay = balances_.get(account?.base16.toLowerCase());
            if (balance_zilpay !== undefined) {
              const _currency = tyron.Currency.default.tyron(id);
              const finalBalance = balance_zilpay / _currency.decimals;
              setInfoBal(Number(finalBalance.toFixed(2)));
            }
          }
        } catch (error) {
          setInfoBal(0);
        }
      } else {
        if (addr) {
          const balance = await getSmartContract(addr!, "_balance");
          const balance_ = balance.result._balance;
          const zil_balance = Number(balance_) / 1e12;
          setInfoBal(Number(zil_balance.toFixed(2)));
        } else {
          const zilpay = new ZilPayBase().zilpay;
          const zilPay = await zilpay();
          const blockchain = zilPay.blockchain;
          const zilliqa_balance = await blockchain.getBalance(
            account?.base16.toLowerCase()
          );
          const zilliqa_balance_ =
            Number(zilliqa_balance.result!.balance) / 1e12;

          setInfoBal(Number(zilliqa_balance_.toFixed(2)));
        }
      }
      setLoadingInfoBal(false);
    } catch (error) {
      setInfoBal(0);
      setLoadingInfoBal(false);
    }
  };

  return (
    <View style={styles.wrapperZilpayInfo}>
      <TouchableOpacity
        onPress={() => {
          setToggleInfoZilpay(!toggleInfoZilpay);
          if (originatorAddress_?.value === "zilliqa") {
            fetchInfoBalance(coin.toLowerCase());
          } else {
            fetchInfoBalance(coin.toLowerCase(), originatorAddress_?.value);
          }
        }}
        style={styles.wrapperToggle}
      >
        <Text style={styles.txtZilpayInfo}>
          {originatorAddress_?.value === "zilliqa"
            ? t("ZilPay wallet")
            : "xWALLET"}{" "}
          info
        </Text>
        {toggleInfoZilpay ? ArrowUp : ArrowDown}
      </TouchableOpacity>
      {toggleInfoZilpay && (
        <>
          {originatorAddress_?.value !== "zilliqa" && (
            <Text style={styles.txtZilpayInfo}>
              {originatorAddress_?.domain !== "did" &&
              originatorAddress_?.domain
                ? originatorAddress_.domain + "@"
                : ""}
              {originatorAddress_?.username}
              {originatorAddress_?.domain === ""
                ? ".ssi"
                : "." + originatorAddress_?.domain}
            </Text>
          )}
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
          <Text style={styles.txtZilpayInfo}>
            Balance:{" "}
            {loadingInfoBal ? (
              <ActivityIndicator
                size="small"
                color={isDark ? "#fff" : "#000"}
              />
            ) : (
              `${infoBal} ${coin.toUpperCase()}`
            )}
          </Text>
        </>
      )}
    </View>
  );
};

export default WalletInfo;

const stylesDark = StyleSheet.create({
  wrapperZilpayInfo: {
    marginLeft: 10,
  },
  txtZilpayInfo: {
    fontSize: 14,
    color: "#fff",
  },
  wrapperToggle: {
    width: deviceWidth * 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
});

const stylesLight = StyleSheet.create({
  wrapperZilpayInfo: {
    marginLeft: 10,
  },
  txtZilpayInfo: {
    fontSize: 14,
    color: "#000",
  },
  wrapperToggle: {
    width: deviceWidth * 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
});
