import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import SearchBar from "../../components/SearchBar/Index";
import Footer from "../../components/Footer/Index";
import lightning from "../../assets/img/lightning.jpg";
import lightning_light from "../../assets/img/lightning_gris.jpg";
import menu from "../../assets/img/menu.png";
import connectIco from "../../assets/img/user_connect.png";
import connectedIco from "../../assets/img/user_connected.png";
import loggedinIco from "../../assets/img/user_loggedin.png";
import Menu from "../../components/Menu/Index";
import Modal from "../../components/Modal/Index";
import GetStarted from "../../components/GetStarted/Index";
import Headline from "../../components/Headline/Index";
import Dashboard from "../../components/Dashboard/Index";
import { useTranslation } from "react-i18next";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { userName } from "app/lib/controller/tyron/user";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const SSI: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [loginState, setLoginState] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [flipWallet, setFlipWallet] = useState(false);
  const [flipDid, setFlipDid] = useState(false);
  const [flipSoc, setFlipSoc] = useState(false);
  const [flipFund, setFlipFund] = useState(false);
  const name = userName.useValue();
  const isDark = tyronThemeDark.useValue();
  const lightning_ = isDark ? lightning : lightning_light;
  const styles = isDark ? stylesDark : stylesLight;

  const items = [
    { label: t("More transactions"), value: "" },
    { label: t("Accept pending controller"), value: "controller" },
    { label: t("Accept pending username"), value: "username" },
  ];

  const flipAnimation = useRef(new Animated.Value(0)).current;
  const flipAnimationDid = useRef(new Animated.Value(0)).current;
  const flipAnimationSoc = useRef(new Animated.Value(0)).current;
  const flipAnimationFund = useRef(new Animated.Value(0)).current;

  let flipRotation = 0;
  let flipRotationDid = 0;
  let flipRotationSoc = 0;
  let flipRotationFund = 0;

  flipAnimation.addListener(
    ({ value }: { value: any }) => (flipRotation = value)
  );
  flipAnimationDid.addListener(
    ({ value }: { value: any }) => (flipRotationDid = value)
  );
  flipAnimationSoc.addListener(
    ({ value }: { value: any }) => (flipRotationSoc = value)
  );
  flipAnimationFund.addListener(
    ({ value }: { value: any }) => (flipRotationFund = value)
  );

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipDidToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimationDid.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipDidToBackStyle = {
    transform: [
      {
        rotateY: flipAnimationDid.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipSocToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimationSoc.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipSocToBackStyle = {
    transform: [
      {
        rotateY: flipAnimationSoc.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipFundToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimationFund.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flipFundToBackStyle = {
    transform: [
      {
        rotateY: flipAnimationFund.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipToFront = (id: string) => {
    if (id === "did") {
      Animated.timing(flipAnimationDid, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlipDid(true);
    } else if (id === "soc") {
      Animated.timing(flipAnimationSoc, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlipSoc(true);
    } else if (id === "fund") {
      Animated.timing(flipAnimationFund, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlipFund(true);
    } else {
      Animated.timing(flipAnimation, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlipWallet(true);
    }
  };

  const flipToBack = (id: string) => {
    if (id === "did") {
      Animated.timing(flipAnimationDid, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlipDid(false);
      }, 300);
    } else if (id === "soc") {
      Animated.timing(flipAnimationSoc, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlipSoc(false);
      }, 300);
    } else if (id === "fund") {
      Animated.timing(flipAnimationFund, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlipFund(false);
      }, 300);
    } else {
      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlipWallet(false);
      }, 300);
    }
  };

  const dataBreadcrumbs = [
    {
      name: "homepage",
      route: "",
    },
  ];

  return (
    <ImageBackground source={lightning_} style={styles.container}>
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        showConnect={setShowConnect}
        showGetStarted={setShowGetStarted}
      />
      <GetStarted visible={showGetStarted} showGetStarted={setShowGetStarted} />
      <Modal
        navigation={() => {}}
        visible={showConnect}
        hideModal={() => setShowConnect(false)}
        setLoginState={setLoginState}
      />
      {!showMenu && !showConnect && !showGetStarted && (
        <ScrollView>
          <Dashboard
            loginState={loginState}
            setShowMenu={setShowMenu}
            setLoginState={setLoginState}
            setShowConnect={setShowConnect}
          />
          <View style={styles.wrapperContent}>
            <SearchBar navigation={navigation} />
            <Headline navigation={navigation} data={dataBreadcrumbs} />
            <View style={styles.textHeaderWrapper}>
              <Text style={styles.txtHeader}>
                {t("DECENTRALIZED IDENTITY")}
              </Text>
              <Text style={styles.txtHeaderYellow}>{name}</Text>
            </View>
            <View>
              <View style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Doc")}
                  onLongPress={() =>
                    !!flipRotationDid ? flipToBack("did") : flipToFront("did")
                  }
                >
                  <Animated.View
                    style={{ ...styles.cardBack, ...flipDidToBackStyle }}
                  >
                    <Text style={styles.txtCardBack}>
                      {t("DECENTRALIZED IDENTIFIER")}
                    </Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      ...(flipDid ? styles.cardHidden : styles.cardWhiteTop),
                      ...flipDidToFrontStyle,
                    }}
                  >
                    <Text style={styles.txtCard}>{flipDid ? "" : "DID"}</Text>
                  </Animated.View>
                </TouchableOpacity>
                <Text style={styles.xText}>x</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Wallet")}
                  onLongPress={() =>
                    !!flipRotation
                      ? flipToBack("wallet")
                      : flipToFront("wallet")
                  }
                >
                  <Animated.View
                    style={{ ...styles.cardBack, ...flipToBackStyle }}
                  >
                    <Text style={styles.txtCardBack}>WEB3</Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      ...(flipWallet ? styles.cardHidden : styles.cardWhiteTop),
                      ...flipToFrontStyle,
                    }}
                  >
                    <Text style={styles.txtCard}>
                      {flipWallet ? "" : t("WALLET")}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
              <View style={styles.cardWrapperBottom}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SocialRecovery")}
                  onLongPress={() =>
                    !!flipRotationSoc ? flipToBack("soc") : flipToFront("soc")
                  }
                >
                  <Animated.View
                    style={{ ...styles.cardBack, ...flipSocToBackStyle }}
                  >
                    <Text style={styles.txtCardBack}>
                      {t("UPDATE DID CONTROLLER")}
                    </Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      ...(flipSoc ? styles.cardHidden : styles.cardWhite),
                      ...flipSocToFrontStyle,
                    }}
                  >
                    <Text style={styles.txtCard}>
                      {flipSoc ? "" : t("SOCIAL RECOVERY")}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
                <Text style={styles.xText}>&nbsp;</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddFunds")}
                  onLongPress={() =>
                    !!flipRotationFund
                      ? flipToBack("fund")
                      : flipToFront("fund")
                  }
                >
                  <Animated.View
                    style={{ ...styles.cardBack, ...flipFundToBackStyle }}
                  >
                    <Text style={styles.txtCardBack}>{t("TOP UP WALLET")}</Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      ...(flipFund ? styles.cardHidden : styles.cardWhite),
                      ...flipFundToFrontStyle,
                    }}
                  >
                    <Text style={styles.txtCard}>
                      {flipFund ? "" : t("ADD FUNDS")}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
              <View style={styles.picker}>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  open={open}
                  value={value}
                  items={items}
                  multiple={false}
                  setOpen={setOpen}
                  setValue={setValue}
                  placeholder={t("More transactions")}
                  theme="DARK"
                  style={{
                    backgroundColor: "transparent",
                    borderColor: isDark ? "#fff" : "#000",
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <Footer navigation={navigation} />
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default SSI;

const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  wrapperContent: {
    marginVertical: 25,
  },
  txtHeader: {
    fontSize: 10,
    color: "#dbe4eb",
    letterSpacing: 1,
  },
  txtHeaderYellow: {
    fontSize: 25,
    color: "#ffff32",
    marginVertical: 5,
    letterSpacing: 1,
  },
  textHeaderWrapper: {
    marginVertical: 40,
    alignSelf: "center",
  },
  xText: {
    fontSize: 14,
    color: "#fff",
    marginHorizontal: 10,
  },
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  cardWrapperBottom: {
    flexDirection: "row",
    marginVertical: 17.5,
    alignSelf: "center",
    alignItems: "center",
  },
  cardWhiteTop: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardHidden: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardBack: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    borderRadius: 5,
    borderColor: "#ffff32",
    borderWidth: 2,
  },
  cardWhite: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  txtCard: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 20,
  },
  txtCardBack: {
    color: "#ffff32",
    textAlign: "center",
    fontSize: 10,
    lineHeight: 20,
  },
  picker: {
    color: "#fff",
    width: deviceWidth * 0.6 + 25,
    alignSelf: "center",
    marginVertical: 30,
  },
});

const stylesLight = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  wrapperContent: {
    marginVertical: 25,
  },
  txtHeader: {
    fontSize: 10,
    color: "#000",
    letterSpacing: 1,
  },
  txtHeaderYellow: {
    fontSize: 25,
    color: "#ffff32",
    marginVertical: 5,
    letterSpacing: 1,
  },
  textHeaderWrapper: {
    marginVertical: 40,
    alignSelf: "center",
  },
  xText: {
    fontSize: 14,
    color: "#000",
    marginHorizontal: 10,
  },
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  cardWrapperBottom: {
    flexDirection: "row",
    marginVertical: 17.5,
    alignSelf: "center",
    alignItems: "center",
  },
  cardWhiteTop: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardHidden: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardBack: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    borderRadius: 5,
    borderColor: "#ffff32",
    borderWidth: 2,
  },
  cardWhite: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  txtCard: {
    color: "#000",
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 20,
  },
  txtCardBack: {
    color: "#ffff32",
    textAlign: "center",
    fontSize: 10,
    lineHeight: 20,
  },
  picker: {
    color: "#fff",
    width: deviceWidth * 0.6 + 25,
    alignSelf: "center",
    marginVertical: 30,
  },
});
