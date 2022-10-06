import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { userDomain, userName } from "app/lib/controller/tyron/user";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import ArrowLeft from "../../assets/icons/arrow_left_chrome.svg";
import ArrowRight from "../../assets/icons/arrow_right_chrome.svg";
import ArrowRightDark from "../../assets/icons/arrow_right_dark.svg";

export type Props = {
  navigation: any;
  data: any;
};

const Headline: React.FC<Props> = ({ navigation, data }) => {
  const { t } = useTranslation();
  const name = userName.useValue();
  const domain: any = userDomain.useValue();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;

  return (
    <>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <Text style={styles.txtNav}>{t("HOMEPAGE")}</Text>
        </TouchableOpacity>
        {data[0]?.name !== "homepage" && (
          <>
            <Text style={styles.txtNav}>&nbsp;&gt;&nbsp;</Text>
            <TouchableOpacity
              onPress={() => {
                if (domain === "" || domain === "did") {
                  navigation.navigate("DIDxWallet");
                } else {
                  navigation.navigate("Stake");
                }
              }}
            >
              <Text style={styles.txtNav}>
                {name}
                {domain !== "" && "." + domain}
              </Text>
            </TouchableOpacity>
            {data.map((val: any, i: number) => {
              if (i <= 1) {
                return (
                  <>
                    <Text style={styles.txtNav}>&nbsp;&gt;&nbsp;</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(`${val.route}`)}
                    >
                      <Text style={styles.txtNav}>{val.name}</Text>
                    </TouchableOpacity>
                  </>
                );
              }
            })}
          </>
        )}
      </View>
      <View style={styles.wrapper}>
        {data[0]?.name !== "homepage" && (
          <>
            {data.map((val: any, i: number) => {
              if (i > 1) {
                return (
                  <>
                    <Text style={styles.txtNav}>&nbsp;&gt;&nbsp;</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate(`${val.route}`)}
                    >
                      <Text style={styles.txtNav}>{val.name}</Text>
                    </TouchableOpacity>
                  </>
                );
              }
            })}
          </>
        )}
      </View>
      <View style={styles.arrowWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft width={15} height={15} />
        </TouchableOpacity>
        <View>
          <ArrowRightDark width={15} height={15} />
        </View>
      </View>
    </>
  );
};

export default Headline;

const stylesDark = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
  txtNav: {
    color: "#fff",
    textTransform: "uppercase",
  },
  arrowWrapper: {
    flexDirection: "row",
    width: 50,
    justifyContent: "space-between",
    marginTop: 10,
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
  },
  txtNav: {
    color: "#000",
    textTransform: "uppercase",
  },
  arrowWrapper: {
    flexDirection: "row",
    width: 50,
    justifyContent: "space-between",
    marginTop: 10,
  },
});
