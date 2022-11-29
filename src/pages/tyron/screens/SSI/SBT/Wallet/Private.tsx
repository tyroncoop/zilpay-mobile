import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Headline from "../../../../components/Headline/Index";
import DIDLayout from "../../../../components/Layout/DID/Index";
import CloseIco from "../../../../assets/img/ic_cross.png";
import IVMS from "./IVMS/Index";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { userDomain, userName } from "app/lib/controller/tyron/user";
import Mint from "./Mint/Index";
import Pause from "./Pause/Index";
import PublicEncryption from "./PublicEncryption/Index";
import TransferOwnership from "./TransferOwnership/Index";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const Private: React.FC<Props> = ({ navigation }) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Private;

const Child: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const name = userName.useValue();
  const domain = userDomain.useValue();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;

  const [active, setActive] = useState("");

  const toggleActive = (type: string) => {
    if (type === active) {
      setActive("");
    } else {
      setActive(type);
    }
  };

  return (
    <View>
      <Headline navigation={navigation} data={[]} />
      <View style={styles.content}>
        <Text style={styles.txtHeader}>
          SBT<Text style={{ color: "#ffff32" }}>x</Text>Wallet
        </Text>
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            onPress={() => toggleActive("pause")}
            style={
              active === "pause" ? styles.btnActionActive : styles.btnAction
            }
          >
            <Text style={styles.txtBold}>PAUSE</Text>
          </TouchableOpacity>
          {active === "pause" && (
            <View style={styles.contentAction}>
              <TouchableOpacity
                onPress={() => toggleActive("")}
                style={styles.closeIcoWrapper}
              >
                <Image style={styles.closeIco} source={CloseIco} />
              </TouchableOpacity>
              <Pause name={`${domain}@${name}`} />
            </View>
          )}
        </View>
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            onPress={() => toggleActive("publicEncryption")}
            style={
              active === "publicEncryption"
                ? styles.btnActionActive
                : styles.btnAction
            }
          >
            <Text style={styles.txtBold}>UPDATE PUBLIC ENCRYPTION</Text>
          </TouchableOpacity>
          {active === "publicEncryption" && (
            <View style={styles.contentAction}>
              <TouchableOpacity
                onPress={() => toggleActive("")}
                style={styles.closeIcoWrapper}
              >
                <Image style={styles.closeIco} source={CloseIco} />
              </TouchableOpacity>
              <PublicEncryption />
            </View>
          )}
        </View>
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            onPress={() => toggleActive("transferOwnership")}
            style={
              active === "transferOwnership"
                ? styles.btnActionActive
                : styles.btnAction
            }
          >
            <Text style={styles.txtBold}>TRANSFER OWNERSHIP</Text>
          </TouchableOpacity>
          {active === "transferOwnership" && (
            <View style={styles.contentAction}>
              <TouchableOpacity
                onPress={() => toggleActive("")}
                style={styles.closeIcoWrapper}
              >
                <Image style={styles.closeIco} source={CloseIco} />
              </TouchableOpacity>
              <TransferOwnership />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  content: {
    marginBottom: 100,
  },
  txtHeader: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    marginTop: 50,
    marginBottom: 50,
  },
  btnAction: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  btnActionActive: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffff32",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  txt: {
    color: "#fff",
  },
  txtBold: {
    color: "#fff",
    fontWeight: "bold",
  },
  txtYellow: {
    color: "#ffff32",
    textAlign: "center",
  },
  contentAction: {
    width: (deviceWidth * 80) / 100,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ffff32",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    marginVertical: 10,
    zIndex: 2,
  },
  closeIco: {
    width: 10,
    height: 10,
  },
  closeIcoWrapper: {
    alignSelf: "flex-end",
  },
  actionWrapper: {
    marginVertical: 10,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#ffff32",
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: 150,
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
  addZilWrapper: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
});

const stylesLight = StyleSheet.create({
  content: {
    marginBottom: 100,
  },
  txtHeader: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    marginTop: 50,
    marginBottom: 50,
  },
  btnAction: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  btnActionActive: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffff32",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  txt: {
    color: "#fff",
  },
  txtBold: {
    color: "#fff",
    fontWeight: "bold",
  },
  txtYellow: {
    color: "#ffff32",
    textAlign: "center",
  },
  contentAction: {
    width: (deviceWidth * 80) / 100,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ffff32",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 5,
    marginVertical: 10,
    zIndex: 2,
  },
  closeIco: {
    width: 10,
    height: 10,
  },
  closeIcoWrapper: {
    alignSelf: "flex-end",
  },
  actionWrapper: {
    marginVertical: 10,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#ffff32",
    borderRadius: 5,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: 150,
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
  addZilWrapper: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
});
