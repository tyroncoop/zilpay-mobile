import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Dimensions, TextInput } from "react-native";
import ContinueArrow from "../../assets/icons/continue_arrow.svg";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {};

const Donate: React.FC<Props> = () => {
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;

  return (
    <View>
      <Text style={styles.txt}>
        How much would you like to send to the{" "}
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
          <TextInput keyboardType="numeric" style={styles.input} />
          <View style={styles.wrapperInfo}>
            <Text style={styles.txt}>ZIL</Text>
          </View>
          <View style={{ marginHorizontal: 5, ...styles.wrapperInfo }}>
            <Text style={styles.txt}>= 0 xP</Text>
          </View>
        </View>
        <TouchableOpacity>
          <ContinueArrow width={30} height={30} />
        </TouchableOpacity>
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
    width: 50,
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
    width: 50,
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
