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

export type Props = {};

const DashboardStake: React.FC<Props> = () => {
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.rightContent}>
          <Text style={styles.txt}>xWallet</Text>
          <Text style={styles.txt}>ZilPay</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.txt}>Balance</Text>
        <View style={styles.rightContent}>
          <Text style={styles.txt}>0 ZIL</Text>
          <Text style={styles.txt}>0 ZIL</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.txt}>Buffered Deposit</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.txt}>Delegate Stake</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.txt}>Deposited Amount</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.txt}>Last Buf Deposit</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.txt}>Last Withdraw</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.txt}>SSN Delegate Amount</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.txt}>Withdrawal Pending</Text>
      </View>
    </View>
  );
};

export default DashboardStake;

const stylesDark = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
  },
  txt: {
    color: "#fff",
  },
  header: {
    backgroundColor: "#010139",
    borderWidth: 1,
    borderColor: "blue",
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 10,
  },
  body: {
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  rightContent: {
    flexDirection: "row",
    width: (deviceWidth * 30) / 100,
    justifyContent: "space-between",
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
  },
  txt: {
    color: "#fff",
  },
  header: {
    backgroundColor: "#010139",
    borderWidth: 1,
    borderColor: "blue",
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 10,
  },
  body: {
    backgroundColor: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "blue",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  rightContent: {
    flexDirection: "row",
    width: (deviceWidth * 30) / 100,
    justifyContent: "space-between",
  },
});
