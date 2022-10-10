import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import Headline from "../../../components/Headline/Index";
import DIDLayout from "../../../components/Layout/DID/Index";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const Wallet: React.FC<Props> = ({ navigation }) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Wallet;

const Child: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const [flip1, setFlip1] = useState(false);
  const [flip2, setFlip2] = useState(false);
  const [flip3, setFlip3] = useState(false);
  const [flip4, setFlip4] = useState(false);

  const flipAnimation1 = useRef(new Animated.Value(0)).current;
  const flipAnimation2 = useRef(new Animated.Value(0)).current;
  const flipAnimation3 = useRef(new Animated.Value(0)).current;
  const flipAnimation4 = useRef(new Animated.Value(0)).current;

  let flipRotation1 = 0;
  let flipRotation2 = 0;
  let flipRotation3 = 0;
  let flipRotation4 = 0;

  flipAnimation1.addListener(
    ({ value }: { value: any }) => (flipRotation1 = value)
  );
  flipAnimation2.addListener(
    ({ value }: { value: any }) => (flipRotation2 = value)
  );
  flipAnimation3.addListener(
    ({ value }: { value: any }) => (flipRotation3 = value)
  );
  flipAnimation4.addListener(
    ({ value }: { value: any }) => (flipRotation4 = value)
  );

  const flip1ToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation1.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flip1ToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation1.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flip2ToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation2.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flip2ToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation2.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flip3ToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation3.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flip3ToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation3.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flip4ToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation4.interpolate({
          inputRange: [0, 180],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };
  const flip4ToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation4.interpolate({
          inputRange: [0, 180],
          outputRange: ["180deg", "360deg"],
        }),
      },
    ],
  };

  const flipToFront = (id: number) => {
    if (id === 1) {
      Animated.timing(flipAnimation1, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlip1(true);
    } else if (id === 2) {
      Animated.timing(flipAnimation2, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlip2(true);
    } else if (id === 3) {
      Animated.timing(flipAnimation3, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlip3(true);
    } else {
      Animated.timing(flipAnimation4, {
        toValue: 180,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setFlip4(true);
    }
  };

  const flipToBack = (id: number) => {
    if (id === 1) {
      Animated.timing(flipAnimation1, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlip1(false);
      }, 300);
    } else if (id === 2) {
      Animated.timing(flipAnimation2, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlip2(false);
      }, 300);
    } else if (id === 3) {
      Animated.timing(flipAnimation3, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlip3(false);
      }, 300);
    } else {
      Animated.timing(flipAnimation4, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setFlip4(false);
      }, 300);
    }
  };

  return (
    <View>
      <Headline navigation={navigation} data={[]} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderWrapper}>
          <Text style={styles.txtHeader}>{t("DIDxWALLET")}</Text>
          <Text style={styles.subTxtHeader}>
            {t("DECENTRALIZED IDENTIFIER WEB3 WALLET")}
          </Text>
        </View>
        <View>
          <View style={styles.cardWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Crud")}
              onLongPress={() =>
                !!flipRotation1 ? flipToBack(1) : flipToFront(1)
              }
            >
              <Animated.View
                style={{ ...styles.cardBack, ...flip1ToBackStyle }}
              >
                <Text style={styles.txtCardBack}>
                  {t("MANAGE YOUR DIGITAL IDENTITY")}
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip1 ? styles.cardHidden : styles.cardWhite),
                  ...flip1ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>
                  {flip1 ? "" : t("DID OPERATIONS")}
                </Text>
              </Animated.View>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10 }} />
            <TouchableOpacity
              onPress={() => navigation.navigate("Balances")}
              onLongPress={() =>
                !!flipRotation2 ? flipToBack(2) : flipToFront(2)
              }
            >
              <Animated.View
                style={{ ...styles.cardBack, ...flip2ToBackStyle }}
              >
                <Text style={styles.txtCardBack}>
                  {t("BALANCES & TRANSFERS")}
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip2 ? styles.cardHidden : styles.cardWhite),
                  ...flip2ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>{flip2 ? "" : t("BALANCES")}</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
          <View style={styles.cardWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate("NFT")}
              onLongPress={() =>
                !!flipRotation3 ? flipToBack(3) : flipToFront(3)
              }
            >
              <Animated.View
                style={{ ...styles.cardBack, ...flip3ToBackStyle }}
              >
                <Text style={styles.txtCardBack}>
                  {t("DID DOMAINS & USERNAME TRANSFERS")}
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip3 ? styles.cardHidden : styles.cardWhite),
                  ...flip3ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>
                  {flip3 ? "" : t("NFT USERNAME")}
                </Text>
              </Animated.View>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10 }} />
            <TouchableOpacity
              onPress={() => navigation.navigate("Updates")}
              onLongPress={() =>
                !!flipRotation4 ? flipToBack(4) : flipToFront(4)
              }
            >
              <Animated.View
                style={{ ...styles.cardBack, ...flip4ToBackStyle }}
              >
                <Text style={styles.txtCardBack}>
                  {t("UPDATE DID CONTROLLER, SSI USERNAME & DEADLINE")}
                </Text>
              </Animated.View>
              <Animated.View
                style={{
                  ...(flip4 ? styles.cardHidden : styles.cardWhite),
                  ...flip4ToFrontStyle,
                }}
              >
                <Text style={styles.txtCard}>{flip4 ? "" : t("UPDATES")}</Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  txtHeader: {
    fontSize: 20,
    color: "#dbe4eb",
    letterSpacing: 1,
    textAlign: "center",
  },
  txtHeaderWrapper: {
    marginVertical: 5,
    marginBottom: 30,
    marginTop: 50,
  },
  subTxtHeader: {
    fontSize: 14,
    color: "#dbe4eb",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 5,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  cardWhite: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
});

const stylesLight = StyleSheet.create({
  txtHeader: {
    fontSize: 20,
    color: "#000",
    letterSpacing: 1,
    textAlign: "center",
  },
  txtHeaderWrapper: {
    marginVertical: 5,
    marginBottom: 30,
    marginTop: 50,
  },
  subTxtHeader: {
    fontSize: 14,
    color: "#000",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 5,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  cardWhite: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
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
});