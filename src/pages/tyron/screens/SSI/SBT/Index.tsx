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
import SearchBar from "../../../components/SearchBar/Index";
import Footer from "../../../components/Footer/Index";
import lightning from "../../../assets/img/lightning.jpg";
import lightning_light from "../../../assets/img/lightning_gris.jpg";
import Menu from "../../../components/Menu/Index";
import Modal from "../../../components/Modal/Index";
import GetStarted from "../../../components/GetStarted/Index";
import Headline from "../../../components/Headline/Index";
import Dashboard from "../../../components/Dashboard/Index";
import { useTranslation } from "react-i18next";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { userDomain, userName } from "app/lib/controller/tyron/user";
import ClaimWallet from "../ClaimWallet/Index";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const Soulbound: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [loginState, setLoginState] = useState("");
  const [flipWallet, setFlipWallet] = useState(false);
  const [flipDid, setFlipDid] = useState(false);
  const name = userName.useValue();
  const domain = userDomain.useValue();
  const isDark = tyronThemeDark.useValue();
  const lightning_ = isDark ? lightning : lightning_light;
  const styles = isDark ? stylesDark : stylesLight;

  const flipAnimation = useRef(new Animated.Value(0)).current;
  const flipAnimationDid = useRef(new Animated.Value(0)).current;
  const flipAnimationSoc = useRef(new Animated.Value(0)).current;
  const flipAnimationFund = useRef(new Animated.Value(0)).current;

  let flipRotation = 0;
  let flipRotationDid = 0;

  flipAnimation.addListener(
    ({ value }: { value: any }) => (flipRotation = value)
  );
  flipAnimationDid.addListener(
    ({ value }: { value: any }) => (flipRotationDid = value)
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

  const flipToFront = (id: string) => {
    if (id === "did") {
      Animated.timing(flipAnimationDid, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlipDid(true);
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
            <SearchBar navigation={navigation} isHome={false} />
            <Headline navigation={navigation} data={dataBreadcrumbs} />
            <View style={styles.textHeaderWrapper}>
              <Text style={styles.txtHeader}>Soulbound xWallet</Text>
              <Text style={styles.cardTxtHeader}>{domain}@</Text>
              <Text style={styles.cardTxtHeader}>{name}.did</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SBTPublic")}
                  onLongPress={() =>
                    !!flipRotationDid ? flipToBack("did") : flipToFront("did")
                  }
                >
                  <Animated.View
                    style={{ ...styles.cardBack, ...flipDidToBackStyle }}
                  >
                    <Text style={styles.txtCardBack}>{t("TOP UP WALLET")}</Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      ...(flipDid ? styles.cardHidden : styles.cardBlue),
                      ...flipDidToFrontStyle,
                    }}
                  >
                    <Text style={styles.txtCard}>
                      {flipDid ? "" : t("SBT")}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
                <Text style={styles.xText}>X</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SBTPrivate")}
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
                      ...(flipWallet ? styles.cardHidden : styles.cardBlue),
                      ...flipToFrontStyle,
                    }}
                  >
                    <Text style={styles.txtCard}>
                      {flipWallet ? "" : t("WALLET")}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
              <ClaimWallet text="Claim SBTxWallet" />
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

export default Soulbound;

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
    fontSize: 14,
    color: "#dbe4eb",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 10,
  },
  cardTxtHeader: {
    fontSize: 25,
    color: "#ffff32",
    letterSpacing: 1,
    textAlign: "center",
  },
  textHeaderWrapper: {
    marginVertical: 40,
    alignSelf: "center",
  },
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 5,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  content: {
    marginBottom: 100,
  },
  cardBlue: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    borderColor: "#dbe4eb",
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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    borderRadius: 5,
    borderColor: "#ffff32",
    borderWidth: 2,
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
  xText: {
    fontSize: 10,
    color: "#fff",
    marginHorizontal: 10,
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
    fontSize: 14,
    color: "#000",
    letterSpacing: 1,
    marginBottom: 10,
  },
  cardTxtHeader: {
    fontSize: 25,
    color: "#ffff32",
    letterSpacing: 1,
    textAlign: "center",
  },
  textHeaderWrapper: {
    marginVertical: 40,
    alignSelf: "center",
  },
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 5,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  content: {
    marginBottom: 100,
  },
  cardBlue: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    borderColor: "#dbe4eb",
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
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    borderRadius: 5,
    borderColor: "#ffff32",
    borderWidth: 2,
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
  xText: {
    fontSize: 10,
    color: "#000",
    marginHorizontal: 10,
  },
});
