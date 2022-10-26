import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
  Linking,
  Image,
} from "react-native";
import DIDLayout from "../../../../components/Layout/DID/Index";
import Headline from "../../../../components/Headline/Index";
import other from "../../../../assets/img/other.png";
import Ldiscord from "../../../../assets/icons/l_discord.svg";
import Ddiscord from "../../../../assets/icons/d_discord.svg";
import Lfacebook from "../../../../assets/icons/l_facebook.svg";
import Dfacebook from "../../../../assets/icons/d_facebook.svg";
import Lgithub from "../../../../assets/icons/l_github.svg";
import Dgithub from "../../../../assets/icons/d_github.svg";
import Linstagram from "../../../../assets/icons/l_instagram.svg";
import Dinstagram from "../../../../assets/icons/d_instagram.svg";
import Llinkedin from "../../../../assets/icons/l_linkedin.svg";
import Dlinkedin from "../../../../assets/icons/d_linkedin.svg";
import Lonlyfans from "../../../../assets/icons/l_onlyfans.svg";
import Donlyfans from "../../../../assets/icons/d_onlyfans.svg";
import Ltelegram from "../../../../assets/icons/l_telegram.svg";
import Dtelegram from "../../../../assets/icons/d_telegram.svg";
import Ltiktok from "../../../../assets/icons/l_tiktok.svg";
import Dtiktok from "../../../../assets/icons/d_tiktok.svg";
import Ltwitch from "../../../../assets/icons/l_twitch.svg";
import Dtwitch from "../../../../assets/icons/d_twitch.svg";
import Ltwitter from "../../../../assets/icons/l_twitter.svg";
import Dtwitter from "../../../../assets/icons/d_twitter.svg";
import Lwhatsapp from "../../../../assets/icons/l_whatsapp.svg";
import Dwhatsapp from "../../../../assets/icons/d_whatsapp.svg";
import Lyoutube from "../../../../assets/icons/l_youtube.svg";
import Dyoutube from "../../../../assets/icons/d_youtube.svg";
import { useTranslation } from "react-i18next";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import { userDoc, userName } from "app/lib/controller/tyron/user";
import { keystore } from "app/keystore";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
};

const Services: React.FC<Props> = ({ navigation }) => {
  return (
    <DIDLayout
      navigation={navigation}
      child={<Child navigation={navigation} />}
    />
  );
};

export default Services;

const Child: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const name = userName.useValue();
  const doc: any = userDoc.useValue();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const discordIco = isDark ? <Ldiscord width={30} /> : <Ddiscord width={30} />;
  const facebookIco = isDark ? (
    <Lfacebook width={30} />
  ) : (
    <Dfacebook width={30} />
  );
  const githubIco = isDark ? <Lgithub width={30} /> : <Dgithub width={30} />;
  const instagramIco = isDark ? (
    <Linstagram width={30} />
  ) : (
    <Dinstagram width={30} />
  );
  const linkedinIco = isDark ? (
    <Llinkedin width={30} />
  ) : (
    <Dlinkedin width={30} />
  );
  const onlyfansIco = isDark ? (
    <Lonlyfans width={30} />
  ) : (
    <Donlyfans width={30} />
  );
  const telegramIco = isDark ? (
    <Ltelegram width={30} />
  ) : (
    <Dtelegram width={30} />
  );
  const tiktokIco = isDark ? <Ltiktok width={30} /> : <Dtiktok width={30} />;
  const twitchIco = isDark ? <Ltwitch width={30} /> : <Dtwitch width={30} />;
  const twitterIco = isDark ? <Ltwitter width={30} /> : <Dtwitter width={30} />;
  const whatsappIco = isDark ? (
    <Lwhatsapp width={30} />
  ) : (
    <Dwhatsapp width={30} />
  );
  const youtubeIco = isDark ? <Lyoutube width={30} /> : <Dyoutube width={30} />;
  const net = "testnet";
  let available = false;

  const checkIsCommonLink = (id: string) => {
    if (socialDropdown.some((arr) => arr.toLowerCase() === id.toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };

  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const socialDropdown = [
    "Discord Invite",
    "Facebook",
    "GitHub",
    "Instagram",
    "LinkedIn",
    "OnlyFans",
    "Telegram",
    "TikTok",
    "Twitch",
    "Twitter",
    "WhatsApp",
    "YouTube",
  ];

  return (
    <View style={styles.wrapper}>
      <Headline navigation={navigation} data={[]} />
      <View style={styles.textHeaderWrapper}>
        <View style={styles.txtHeaderYellowWrapper}>
          <Text style={styles.txtHeaderWhite}>{t("SOCIAL TREE")}</Text>
        </View>
        <View style={styles.commonWrapper}>
          {doc?.doc.map((val: any, i: number) => {
            if (val[0] === "DID services") {
              available = true;
              return (
                <>
                  {val[1].map((res: any) => {
                    let socialIco = discordIco;
                    switch (res[1][0].split("#")[0].toLowerCase()) {
                      case "discord invite":
                        socialIco = discordIco;
                        break;
                      case "facebook":
                        socialIco = facebookIco;
                        break;
                      case "github":
                        socialIco = githubIco;
                        break;
                      case "instagram":
                        socialIco = instagramIco;
                        break;
                      case "linkedin":
                        socialIco = linkedinIco;
                        break;
                      case "onlyfans":
                        socialIco = onlyfansIco;
                        break;
                      case "telegram":
                        socialIco = telegramIco;
                        break;
                      case "tiktok":
                        socialIco = tiktokIco;
                        break;
                      case "twitch":
                        socialIco = twitchIco;
                        break;
                      case "twitter":
                        socialIco = twitterIco;
                        break;
                      case "whatsapp":
                        socialIco = whatsappIco;
                        break;
                      case "youtube":
                        socialIco = youtubeIco;
                        break;
                    }
                    if (checkIsCommonLink(res[1][0].split("#")[0])) {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              `https://${res[1][1]
                                .replace("wwww.", "")
                                .replace("https://", "")}`
                            )
                          }
                          style={styles.commonIco}
                        >
                          {socialIco}
                        </TouchableOpacity>
                      );
                    }
                  })}
                </>
              );
            }
          })}
          {!available && (
            <View style={styles.noDataWrapper}>
              <Text style={{ color: "#fff" }}>No data yet</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddFunds")}
          style={styles.donateBtn}
        >
          <View style={styles.plusIco}>
            <Text style={styles.plus}>+</Text>
          </View>
          <Text style={styles.txtBtn}>{t("DONATE")}</Text>
        </TouchableOpacity>
        <View style={styles.wrapperContent}>
          {doc?.doc.map((val: any, i: number) => {
            if (val[0] === "DID services") {
              available = true;
              let ico = other;
              return (
                <>
                  {val[1].map((res: any) => {
                    if (!checkIsCommonLink(res[1][0].split("#")[0])) {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(
                              `https://${res[1][1]
                                .replace("wwww.", "")
                                .replace("https://", "")}`
                            )
                          }
                          style={[
                            {
                              borderColor: `#${res[1][0].split("#")[1]}`,
                              backgroundColor: `#${res[1][0].split("#")[2]}`,
                            },
                            styles.serviceBtn,
                          ]}
                        >
                          <Text
                            style={{ color: `#${res[1][0].split("#")[1]}` }}
                          >
                            {res[1][0].split("#")[0]}
                          </Text>
                          <View style={styles.plusIco}>
                            <Image
                              style={styles.socialIco}
                              width={10}
                              source={ico}
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </>
              );
            }
          })}
          {!available && (
            <View style={styles.noDataWrapper}>
              <Text style={{ color: "#fff" }}>No data yet</Text>
            </View>
          )}
          {doc?.controller === account?.base16 && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Update")}
              style={styles.btnUpdate}
            >
              <Text style={styles.txt}>{t("UPDATE SOCIAL TREE")}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  wrapper: {
    marginBottom: 200,
  },
  txtHeaderYellowWrapper: {
    marginVertical: 5,
  },
  txtHeaderWhite: {
    fontSize: 20,
    color: "#fff",
    letterSpacing: 2,
    textAlign: "center",
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
    marginTop: 50,
  },
  donateBtn: {
    width: (deviceWidth * 50) / 100,
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    alignSelf: "center",
  },
  serviceBtn: {
    width: (deviceWidth * 50) / 100,
    padding: 10,
    paddingVertical: 30,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  txtBtn: {
    color: "#fff",
    marginLeft: 10,
  },
  plusIco: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    color: "#fff",
    fontSize: 20,
  },
  noDataWrapper: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.075)",
    alignItems: "center",
    marginTop: 50,
  },
  wrapperContent: {
    marginBottom: 100,
    alignSelf: "center",
  },
  socialIco: {
    width: 5,
    height: 10,
  },
  commonWrapper: {
    width: (deviceWidth * 80) / 100,
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  commonIco: {
    marginHorizontal: 20,
  },
  btnUpdate: {
    width: deviceWidth * 0.5,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
  txt: {
    color: "#fff",
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    marginBottom: 200,
  },
  txtHeaderYellowWrapper: {
    marginVertical: 5,
  },
  txtHeaderWhite: {
    fontSize: 20,
    color: "#000",
    letterSpacing: 2,
    textAlign: "center",
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
    marginTop: 50,
  },
  donateBtn: {
    width: (deviceWidth * 50) / 100,
    padding: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
    alignSelf: "center",
  },
  serviceBtn: {
    width: (deviceWidth * 50) / 100,
    padding: 10,
    paddingVertical: 30,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
  },
  txtBtn: {
    color: "#000",
    marginLeft: 10,
  },
  plusIco: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    color: "#fff",
    fontSize: 20,
  },
  noDataWrapper: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.075)",
    alignItems: "center",
    marginTop: 50,
  },
  wrapperContent: {
    marginBottom: 100,
    alignSelf: "center",
  },
  socialIco: {
    width: 5,
    height: 10,
  },
  commonWrapper: {
    width: (deviceWidth * 80) / 100,
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 30,
  },
  commonIco: {
    marginHorizontal: 20,
  },
  btnUpdate: {
    width: deviceWidth * 0.5,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 50,
  },
  txt: {
    color: "#000",
  },
});
