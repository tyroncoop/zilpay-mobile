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
import PauseIco from "../../../../assets/img/pause.png";
import WithdrawRewardsIco from "../../../../assets/img/withdraw_stake_rewards.png";
import WithdrawStakeIco from "../../../../assets/img/withdraw_stake_amount.png";
import DelegateStakeIco from "../../../../assets/img/delegate_stake.png";
import CompleteWithdrawalIco from "../../../../assets/img/complete_stake_withdrawal.png";
import RedelegateStakeIco from "../../../../assets/img/redelegate_stake.png";
import SwapIco from "../../../../assets/img/swap.png";
import continueArrow from "../../../../assets/img/continue_arrow.png";
import defaultCheckmark from "../../../../assets/img/default_checkmark.png";
import selectedCheckmark from "../../../../assets/img/selected_checkmark_blue.png";
import Donate from "../../../../components/Donate/Index";
import IVMS from "./IVMS/Index";
import Selector from "../../../../components/Selector/Index";
import { TextInput } from "react-native";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { userDomain, userName } from "app/lib/controller/tyron/user";
import Mint from "./Mint/Index";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const Public: React.FC<Props> = ({ navigation }) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Public;

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
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            onPress={() => toggleActive("travelRule")}
            style={
              active === "travelRule"
                ? styles.btnActionActive
                : styles.btnAction
            }
          >
            <Text style={styles.txtBold}>UPLOAD TRAVEL RULE</Text>
          </TouchableOpacity>
          {active === "travelRule" && (
            <View style={styles.contentAction}>
              <TouchableOpacity
                onPress={() => toggleActive("")}
                style={styles.closeIcoWrapper}
              >
                <Image style={styles.closeIco} source={CloseIco} />
              </TouchableOpacity>
              <IVMS />
            </View>
          )}
        </View>
        <View style={styles.actionWrapper}>
          <TouchableOpacity
            onPress={() => toggleActive("mint")}
            style={
              active === "mint" ? styles.btnActionActive : styles.btnAction
            }
          >
            <Text style={styles.txtBold}>MINT SBT</Text>
          </TouchableOpacity>
          {active === "mint" && (
            <View style={styles.contentAction}>
              <TouchableOpacity
                onPress={() => toggleActive("")}
                style={styles.closeIcoWrapper}
              >
                <Image style={styles.closeIco} source={CloseIco} />
              </TouchableOpacity>
              <Mint />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  content: {
    marginTop: 100,
    marginBottom: 100,
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
    marginTop: 100,
    marginBottom: 100,
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
