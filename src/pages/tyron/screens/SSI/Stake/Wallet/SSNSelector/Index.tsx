import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Dimensions, TextInput } from "react-native";
import continueArrow from "../../../../../assets/img/continue_arrow.png";
import Selector from "../../../../../components/Selector/Index";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {
  onChange: any;
  title: string;
  value: any;
};

const SSNSelector: React.FC<Props> = ({ onChange, title, value }) => {
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;

  const optionMainnet = [
    {
      key: "",
      name: "Select SSN",
    },
    {
      key: "ssncex.io",
      name: "CEX.IO",
    },
    {
      key: "ssnmoonlet.io",
      name: "Moonlet.io",
    },
    {
      key: "ssnatomicwallet",
      name: "AtomicWallet",
    },
    {
      key: "ssnbinancestaking",
      name: "Binance Staking",
    },
    {
      key: "ssnzillet",
      name: "Zillet",
    },
    {
      key: "ssnignitedao",
      name: "Ignite DAO",
    },
    {
      key: "ssnvalkyrie2",
      name: "Valkyrie2",
    },
    {
      key: "ssnviewblock",
      name: "ViewBlock",
    },
    {
      key: "ssnkucoin",
      name: "KuCoin",
    },
    {
      key: "ssnzilliqa",
      name: "Zilliqa",
    },
    {
      key: "ssnhuobistaking",
      name: "Huobi Staking",
    },
    {
      key: "ssnshardpool.io",
      name: "Shardpool.io",
    },
    {
      key: "ssnezil.me",
      name: "Ezil.me",
    },
    {
      key: "ssnnodamatics.com",
      name: "Nodamatics.com",
    },
    {
      key: "ssneverstake.one",
      name: "Everstake.one",
    },
    {
      key: "ssnzilliqa2",
      name: "Zilliqa2",
    },
  ];

  const optionTestnet = [
    {
      key: "",
      name: "Select SSN",
    },
    {
      key: "ssnmoonlet.io",
      name: "Moonlet.io",
    },
    {
      key: "ssnzillet",
      name: "Zillet",
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.txt}>{title}</Text>
      <Selector data={optionTestnet} selectedData={value} setData={onChange} />
    </View>
  );
};

export default SSNSelector;

const stylesDark = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  txt: {
    color: "#fff",
    marginBottom: -5,
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  txt: {
    color: "#fff",
    marginBottom: -5,
  },
});
