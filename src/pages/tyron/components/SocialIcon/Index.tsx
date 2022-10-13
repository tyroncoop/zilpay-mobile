import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Dimensions, TextInput } from "react-native";
import Dgithub from "../../assets/icons/soc_github_dark.svg";
import Lgithub from "../../assets/icons/soc_github_light.svg";
import Dtwitter from "../../assets/icons/soc_twitter_dark.svg";
import Ltwitter from "../../assets/icons/soc_twitter_light.svg";
import Dinstagram from "../../assets/icons/soc_instagram_dark.svg";
import Linstagram from "../../assets/icons/soc_instagram_light.svg";
import Ddiscord from "../../assets/icons/soc_discord_dark.svg";
import Ldiscord from "../../assets/icons/soc_discord_light.svg";
import Dtelegram from "../../assets/icons/soc_telegram_dark.svg";
import Ltelegram from "../../assets/icons/soc_telegram_light.svg";
import Dtiktok from "../../assets/icons/soc_tiktok_dark.svg";
import Ltiktok from "../../assets/icons/soc_tiktok_light.svg";
import Dlinkedin from "../../assets/icons/soc_linkedin_dark.svg";
import Llinkedin from "../../assets/icons/soc_linkedin_light.svg";

const deviceWidth = Dimensions.get("screen").width;
const deviceHeight = Dimensions.get("screen").height;

export type Props = {};

const SocialIcon: React.FC<Props> = () => {
  const { t } = useTranslation();
  const isDark = tyronThemeDark.useValue();
  const styles = isDark ? stylesDark : stylesLight;
  const githubIco = isDark ? <Lgithub width={20} /> : <Dgithub width={20} />;
  const twitterIco = isDark ? <Ltwitter width={25} /> : <Dtwitter width={25} />;
  const instagramIco = isDark ? (
    <Linstagram width={25} />
  ) : (
    <Dinstagram width={25} />
  );
  const discordIco = isDark ? <Ldiscord width={30} /> : <Ddiscord width={30} />;
  const telegramIco = isDark ? (
    <Ltelegram width={25} />
  ) : (
    <Dtelegram width={25} />
  );
  const tiktokIco = isDark ? <Ltiktok width={20} /> : <Dtiktok width={20} />;
  const linkedinIco = isDark ? (
    <Llinkedin width={20} />
  ) : (
    <Dlinkedin width={20} />
  );

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://github.com/tyroncoop")}
      >
        {githubIco}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://twitter.com/ssiprotocol")}
      >
        {twitterIco}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.instagram.com/ssiprotocol/")
        }
      >
        {instagramIco}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://discord.com/invite/7HSvNDJEWm")}
      >
        {discordIco}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://t.me/ssiprotocol")}
      >
        {telegramIco}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL("https://www.tiktok.com/@ssiprotocol")}
      >
        {tiktokIco}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.linkedin.com/company/tyron-coop/")
        }
      >
        {linkedinIco}
      </TouchableOpacity>
    </View>
  );
};

export default SocialIcon;

const stylesDark = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const stylesLight = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
