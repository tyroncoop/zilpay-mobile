import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import Donate from "app/pages/tyron/components/Donate/Index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Dimensions, TextInput } from "react-native";
import continueArrow from "../../../../../assets/img/continue_arrow.png";
import defaultCheckmark from "../../../../../assets/img/default_checkmark.png";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {};

const PublicEncryption: React.FC<Props> = () => {
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;

  return (
    <View>
      <View style={styles.form}>
        <View style={styles.wrapper}>
          <View style={styles.wrapperInput}>
            <TextInput
              placeholderTextColor="#c0c0c0"
              placeholder="New Encryption"
              style={styles.input}
            />
          </View>
          <TouchableOpacity>
            <Image style={styles.arrowSize} source={continueArrow} />
          </TouchableOpacity>
        </View>
      </View>
      <Donate />
      <TouchableOpacity style={styles.btnSubmit}>
        <Text style={styles.txtYellow}>UPDATE PUBLIC ENCRYPTION</Text>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 10,
          textAlign: "center",
          marginTop: 5,
          ...styles.txt,
        }}
      >
        Cost is less than 2 ZIL
      </Text>
    </View>
  );
};

export default PublicEncryption;

const stylesDark = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: "90%",
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
  btnSubmit: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ffff32",
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  txtYellow: {
    color: "#ffff32",
    textAlign: "center",
  },
  form: {
    marginVertical: 5,
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: "90%",
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
  btnSubmit: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ffff32",
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  txtYellow: {
    color: "#ffff32",
    textAlign: "center",
  },
  form: {
    marginVertical: 5,
  },
  check: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
