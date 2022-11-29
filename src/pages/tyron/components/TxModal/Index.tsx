import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Dimensions, TextInput } from "react-native";
import MinimizeIco from "../../assets/icons/minimize.svg";
import CloseIco from "../../assets/icons/ic_cross.svg";
import RightDownIco from "../../assets/icons/right_down.svg";
import TickIco from "../../assets/icons/tick.svg";
import RejectIco from "../../assets/icons/close.svg";
import { ActivityIndicator } from "react-native";
import {
  showTxModal,
  txId,
  txModalMinimized,
  txStatus,
} from "app/lib/controller/tyron/tx";
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
  const minimized = txModalMinimized.useValue();

  if (minimized) {
    return (
      <View style={styles.modalMinimized}>
        <View style={styles.wrapperIco}>
          <TouchableOpacity onPress={() => txModalMinimized.set(false)}>
            <RightDownIco style={{ marginRight: -5 }} width={15} />
          </TouchableOpacity>
        </View>
        <Text style={styles.txt}>TRANSACTION STATUS</Text>
        {txStatus_ === "loading" ? (
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="small"
            color="#fff"
          />
        ) : txStatus_ === "rejected" ? (
          <RejectIco style={{ marginBottom: -20, marginTop: -10 }} width={10} />
        ) : (
          <TickIco style={{ marginBottom: -20, marginTop: -10 }} width={20} />
        )}
      </View>
    );
  }

  return (
    <View style={styles.modal}>
      <View style={styles.wrapperIco}>
        <TouchableOpacity onPress={() => txModalMinimized.set(true)}>
          <MinimizeIco style={{ marginRight: 15 }} width={10} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            showTxModal.set(false);
            txModalMinimized.set(false);
          }}
        >
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
  modalMinimized: {
    width: deviceWidth * 0.5,
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 5,
    alignSelf: "flex-start",
    marginTop: 10,
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
