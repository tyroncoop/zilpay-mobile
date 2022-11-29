import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import Headline from "../../components/Headline/Index";
import DIDLayout from "../../components/Layout/DID/Index";
import ArrowUp from "../../assets/img/arrow-up.png";
import continueArrow from "../../assets/img/continue_arrow.png";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const XPoints: React.FC<Props> = ({ navigation }) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default XPoints;

const Child: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const [selectedMotion, setSelectedMotion] = useState("");
  const [readMore, setReadMore] = useState("");

  const toggleMotion = (id: any) => {
    if (id == selectedMotion) {
      setSelectedMotion("");
    } else {
      setSelectedMotion(id);
    }
  };

  const toggleReadMore = (id: any) => {
    if (id == readMore) {
      setReadMore("");
    } else {
      setReadMore(id);
    }
  };

  const motionData = [
    {
      id: "1",
      motion: "Hola World",
      points: "25",
    },
    {
      id: "2",
      motion: "Test 123",
      points: "2",
    },
    {
      id: "3",
      motion:
        "Welcome to the xPoints DApp! This is the first motion. Highlight a motion by adding xPs (click on the up arrow icon on the left). You can create a motion by clicking on NEW MOTION.",
      points: "1",
    },
  ];

  const dataBreadcrumbs = [
    {
      name: "homepage",
      route: "",
    },
  ];

  return (
    <View>
      <Headline navigation={navigation} data={dataBreadcrumbs} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.txtHeaderYellow}>xPOINTS DAPP</Text>
        </View>
        <Text style={styles.txtRaise}>{t("RAISE YOUR VOICE")}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.btnNewMotion}>
          <Text style={styles.txtYellow}>NEW MOTION</Text>
        </TouchableOpacity>
        {motionData.map((val, i) => (
          <View key={i} style={styles.wrapperRow}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <TouchableOpacity onPress={() => toggleMotion(val.id)}>
                  <Image style={{ width: 30, height: 30 }} source={ArrowUp} />
                </TouchableOpacity>
                <Text style={styles.txtPoint}>{val.points}</Text>
              </View>
              <View style={styles.motionWrapper}>
                {val.motion.length > 100 ? (
                  <>
                    {readMore === val.id ? (
                      <Text style={styles.txt}>
                        {val.motion}
                        <Text
                          onPress={() => toggleReadMore(val.id)}
                          style={{ fontSize: 20, ...styles.txtYellow }}
                        >
                          -
                        </Text>
                      </Text>
                    ) : (
                      <Text style={styles.txt}>
                        {val.motion.slice(0, 95)}...
                        <Text
                          onPress={() => toggleReadMore(val.id)}
                          style={{ fontSize: 20, ...styles.txtYellow }}
                        >
                          +
                        </Text>
                      </Text>
                    )}
                  </>
                ) : (
                  <Text style={styles.txt}>{val.motion}</Text>
                )}
              </View>
            </View>
            {selectedMotion === val.id && (
              <>
                <View style={styles.wrapperVote}>
                  <View style={styles.wrapperInput}>
                    <TextInput style={styles.input} />
                    <View style={styles.wrapperInfo}>
                      <Text style={styles.txt}>xP</Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Image style={styles.arrowSize} source={continueArrow} />
                  </TouchableOpacity>
                </View>
                <Text style={{ marginLeft: 50, ...styles.txt }}>
                  Balance: <Text style={styles.txtYellow}>200.02</Text> xPoints
                </Text>
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  txtHeaderYellowWrapper: {
    marginVertical: 5,
    marginTop: 50,
  },
  txtHeaderYellow: {
    fontSize: 20,
    color: "#ffff32",
    letterSpacing: 2,
    textAlign: "center",
    maxWidth: 200,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  txtRaise: {
    color: "#c0c0c0",
    alignSelf: "center",
    letterSpacing: 1,
    marginVertical: 10,
  },
  btnNewMotion: {
    width: 120,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    backgroundColor: "#000",
  },
  txtYellow: {
    color: "#ffff32",
  },
  txtPoint: {
    color: "#fff",
    textAlign: "center",
  },
  txt: {
    color: "#fff",
  },
  wrapperRow: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    marginVertical: 10,
  },
  motionWrapper: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    marginLeft: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    width: (deviceWidth * 60) / 100,
  },
  wrapperVote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: (deviceWidth * 60) / 100,
    marginLeft: 50,
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: 150,
  },
  wrapperInfo: {
    backgroundColor: "#ffffff13",
    padding: 5,
    borderRadius: 5,
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
});

const stylesLight = StyleSheet.create({
  txtHeaderYellowWrapper: {
    marginVertical: 5,
    marginTop: 50,
  },
  txtHeaderYellow: {
    fontSize: 20,
    color: "#ffff32",
    letterSpacing: 2,
    textAlign: "center",
    maxWidth: 200,
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  txtRaise: {
    color: "#000",
    alignSelf: "center",
    letterSpacing: 1,
    marginVertical: 10,
  },
  btnNewMotion: {
    width: 120,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    backgroundColor: "#000",
  },
  txtYellow: {
    color: "#ffff32",
  },
  txtPoint: {
    color: "#000",
    textAlign: "center",
  },
  txt: {
    color: "#000",
  },
  wrapperRow: {
    width: (deviceWidth * 80) / 100,
    alignSelf: "center",
    marginVertical: 10,
  },
  motionWrapper: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    marginLeft: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    width: (deviceWidth * 60) / 100,
  },
  wrapperVote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    width: (deviceWidth * 60) / 100,
    marginLeft: 50,
  },
  wrapperInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    width: 150,
  },
  wrapperInfo: {
    backgroundColor: "#ffffff13",
    padding: 5,
    borderRadius: 5,
  },
  arrowSize: {
    width: 25,
    height: 25,
  },
});
