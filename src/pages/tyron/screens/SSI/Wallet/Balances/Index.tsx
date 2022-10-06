import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from "react-native";
import Headline from "../../../../components/Headline/Index";
import DIDLayout from "../../../../components/Layout/DID/Index";
import ArrowDown from "../../../../assets/img/arrow_down_icon.png";
import { useTranslation } from "react-i18next";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const Balances: React.FC<Props> = ({ navigation }) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Balances;

const Child: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const [showDropdown, setShowDropdown] = useState(false);

  const dataHeadline = [
    {
      route: "Wallet",
      name: t("Wallet"),
    },
  ];

  return (
    <View>
      <Headline navigation={navigation} data={dataHeadline} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.txtHeader}>{t("BALANCES")}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => setShowDropdown(!showDropdown)}
            style={styles.dropdownSelectorWrapper}
          >
            <View style={styles.dropdownSelector}>
              <Text style={styles.txtAddCurrency}>
                {t("Add new currencies")}
              </Text>
              <Image style={{ width: 18, height: 18 }} source={ArrowDown} />
            </View>
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownSelectorWrapper}>
              <View style={styles.dropdownChoiceWrapper}>
                <View style={styles.dropdownChoiceRow}>
                  <TouchableOpacity style={styles.dropdownChoiceCheckBox} />
                  <Text style={styles.dropdownChoiceTxt}>gZIL</Text>
                </View>
                <View style={styles.dropdownChoiceRow}>
                  <TouchableOpacity style={styles.dropdownChoiceCheckBox} />
                  <Text style={styles.dropdownChoiceTxt}>USDT</Text>
                </View>
              </View>
            </View>
          )}
          <View>
            <View style={styles.headerTable}>
              <Text style={styles.tableTitle}>{t("CURRENCY")}</Text>
              <Text style={styles.tableTitle}>DIDxWallet</Text>
              <Text style={styles.tableTitle}>
                &nbsp;&nbsp;{t("ZILLIQA_WALLET")}
              </Text>
            </View>
            <View style={styles.rowTable}>
              <View style={styles.rowTableContent}>
                <Text style={styles.tableTitle}>TYRON</Text>
                <Text style={styles.tableTitle}>0</Text>
                <Text style={styles.tableTitle}>&nbsp;&nbsp;700</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.btnTable}>
                  <Text style={styles.btnTableTxt}>{t("ADD FUNDS")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnTable}>
                  <Text style={styles.btnTableTxt}>{t("WITHDRAW")}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowTable}>
              <View style={styles.rowTableContent}>
                <Text style={styles.tableTitle}>ZIL</Text>
                <Text style={styles.tableTitle}>10</Text>
                <Text style={styles.tableTitle}>&nbsp;&nbsp;50</Text>
              </View>
              <View>
                <TouchableOpacity style={styles.btnTable}>
                  <Text style={styles.btnTableTxt}>{t("ADD FUNDS")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnTable}>
                  <Text style={styles.btnTableTxt}>{t("WITHDRAW")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  txtHeaderYellowWrapper: {
    marginVertical: 30,
  },
  txtHeader: {
    fontSize: 20,
    color: "#fff",
    letterSpacing: 2,
    textAlign: "center",
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  dropdownSelectorWrapper: {
    width: deviceWidth,
    padding: 20,
    justifyContent: "flex-start",
  },
  dropdownSelector: {
    flexDirection: "row",
    width: 225,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  dropdownChoiceWrapper: {
    width: 225,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#ffff32",
    marginTop: -30,
    padding: 10,
  },
  dropdownChoiceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  dropdownChoiceCheckBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#fff",
  },
  dropdownChoiceTxt: {
    color: "silver",
    marginLeft: 15,
  },
  headerTable: {
    width: deviceWidth,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 255, 0.2)",
    flexDirection: "row",
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  rowTable: {
    width: deviceWidth,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  tableTitle: {
    color: "#fff",
    width: deviceWidth * 0.2,
    textAlign: "center",
  },
  rowTableContent: {
    marginTop: 5,
    flexDirection: "row",
  },
  btnTable: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginVertical: 3,
    marginLeft: 10,
    width: 100,
    borderRadius: 5,
  },
  btnTableTxt: {
    color: "#fff",
    fontSize: 11,
    textAlign: "center",
  },
  txtAddCurrency: {
    color: "#fff",
    marginRight: 20,
  },
});

const stylesLight = StyleSheet.create({
  txtHeaderYellowWrapper: {
    marginVertical: 30,
  },
  txtHeader: {
    fontSize: 20,
    color: "#000",
    letterSpacing: 2,
    textAlign: "center",
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  dropdownSelectorWrapper: {
    width: deviceWidth,
    padding: 20,
    justifyContent: "flex-start",
  },
  dropdownSelector: {
    flexDirection: "row",
    width: 225,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#fff",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  dropdownChoiceWrapper: {
    width: 225,
    backgroundColor: "#000",
    borderWidth: 1,
    borderColor: "#ffff32",
    marginTop: -30,
    padding: 10,
  },
  dropdownChoiceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  dropdownChoiceCheckBox: {
    width: 10,
    height: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#fff",
  },
  dropdownChoiceTxt: {
    color: "silver",
    marginLeft: 15,
  },
  headerTable: {
    width: deviceWidth,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 255, 0.2)",
    flexDirection: "row",
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  rowTable: {
    width: deviceWidth,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  tableTitle: {
    color: "#000",
    width: deviceWidth * 0.2,
    textAlign: "center",
  },
  rowTableContent: {
    marginTop: 5,
    flexDirection: "row",
  },
  btnTable: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#fff",
    marginVertical: 3,
    marginLeft: 10,
    width: 100,
    borderRadius: 5,
  },
  btnTableTxt: {
    color: "#000",
    fontSize: 11,
    textAlign: "center",
  },
  txtAddCurrency: {
    color: "#000",
    marginRight: 20,
  },
});
