/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2020 ZilPay
 */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Linking,
  Button,
  Dimensions,
  SafeAreaView
} from 'react-native';

import CreateBackground from 'app/assets/get_started_1.svg';

import { theme } from 'app/styles';
import i18n from 'app/lib/i18n';

const GIHTUB_URL = 'https://github.com/zilpay/zilpay-mobile';
const PRIVACY_URL = 'https://zilpay.xyz/PrivacyPolicy/';
const TERMS_URL = 'https://zilpay.xyz/Terms/';
const { width } = Dimensions.get('window');
export const AboutPage = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {i18n.t('about_title')}
      </Text>
      <CreateBackground
        width={width}
        height={width}
      />
      <View>
        <Button
          title={i18n.t('about_link_0')}
          color={theme.colors.primary}
          onPress={() => Linking.openURL(GIHTUB_URL)}
        />
        <Button
          title={i18n.t('about_link_1')}
          color={theme.colors.primary}
          onPress={() => Linking.openURL(PRIVACY_URL)}
        />
        <Button
          title={i18n.t('about_link_2')}
          color={theme.colors.primary}
          onPress={() => Linking.openURL(TERMS_URL)}
        />
      </View>
    </ SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black
  },
  title: {
    textAlign: 'center',
    color: theme.colors.white,
    fontSize: 34,
    lineHeight: 41,
    fontWeight: 'bold',
    marginTop: '5%'
  }
});

export default AboutPage;
