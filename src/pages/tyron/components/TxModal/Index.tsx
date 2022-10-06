import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Dimensions, TextInput } from "react-native";
import MinimizeIco from "../../assets/icons/minimize.svg";
import CloseIco from "../../assets/icons/ic_cross.svg";
import { ActivityIndicator } from "react-native";
import { showTxModal, txId, txStatus } from "app/lib/controller/tyron/tx";
import { Linking } from "react-native";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {};

const TxModal: React.FC<Props> = () => {
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const txStatus_ = txStatus.useValue();
  const txId_ = txId.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const net = "testnet";

  return (
    <View style={styles.modal}>
      <View style={styles.wrapperIco}>
        <TouchableOpacity>
          <MinimizeIco style={{ marginRight: 15 }} width={10} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showTxModal.set(false)}>
          <CloseIco width={10} />
        </TouchableOpacity>
      </View>
      <Text style={{ marginBottom: 10, ...styles.txt }}>
        {txStatus_ === "loading"
          ? "TRANSACTION PROCESSED ON THE ZILLIQA BLOCKCHAIN, PLEASE WAIT"
          : txStatus_ === "rejected"
          ? "TRANSACTION REJECTED"
          : txStatus_ === "confirmed"
          ? "TRANSACTION SUCCESSFULLY CONFIRMED!"
          : ""}
      </Text>
      {txStatus_ !== "loading" && txId_ !== "" && (
        <Text style={{ marginVertical: 10, ...styles.txt }}>
          ID:{" "}
          <Text
            onPress={() =>
              Linking.openURL(
                `https://v2.viewblock.io/zilliqa/tx/${txId_}?network=${net}`
              )
            }
            style={{ textDecorationLine: "underline" }}
          >
            0x{txId_.slice(0, 22)}...
          </Text>
        </Text>
      )}
      {txStatus_ === "loading" && (
        <ActivityIndicator size="small" color="#fff" />
      )}
    </View>
  );
};

export default TxModal;

const stylesDark = StyleSheet.create({
  modal: {
    width: deviceWidth * 0.8,
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 100,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
  },
  wrapperIco: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: -20,
    marginRight: -10,
  },
  txt: {
    color: "#fff",
    textAlign: "center",
  },
});

const stylesLight = StyleSheet.create({});
