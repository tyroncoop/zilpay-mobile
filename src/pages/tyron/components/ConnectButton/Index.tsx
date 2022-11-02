import React from "react";
import Lottie from "lottie-react-native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import styles from "app/components/transfer/styles";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";

export type Props = {};

const ConnectButton: React.FC<Props> = () => {
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  return (
    <TouchableOpacity style={styles.btn}>
      <Text style={styles.txt}>CONNECT</Text>
    </TouchableOpacity>
  );
};

export default ConnectButton;

const stylesDark = StyleSheet.create({
  txt: {
    color: "#ffff32"
  },
  btn: {
    padding: 10,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#ffff32',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  }
});

const stylesLight = StyleSheet.create({
  txt: {
    color: "#ffff32"
  },
  btn: {
    padding: 10,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#ffff32',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  }
});