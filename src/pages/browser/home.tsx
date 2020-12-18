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
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackNavigationProp } from '@react-navigation/stack';
import { SvgXml } from 'react-native-svg';

import { AccountMenu } from 'app/components/account-menu';
import { SearchIconSVG } from 'app/components/svg';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  BrowserNavBar,
  BrowserApps,
  BrowserFavorites
} from 'app/components/browser';

import { theme } from 'app/styles';
import { keystore } from 'app/keystore';
import i18n from 'app/lib/i18n';
import { BrwoserStackParamList } from 'app/navigator/browser';

type Prop = {
  navigation: StackNavigationProp<BrwoserStackParamList>;
};

enum Tabs {
  apps = 'apps',
  favorites = 'favorites'
}

const { height, width } = Dimensions.get('window');
const initialLayout = { width };
export const BrowserHomePage: React.FC<Prop> = ({ navigation }) => {
  const accountState = keystore.account.store.useValue();

  const [search, setSearch] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: Tabs.apps, title: i18n.t('apps') },
    { key: Tabs.favorites, title: i18n.t('connections_title') }
  ]);

  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const hanldeSearch = React.useCallback(async() => {
    setIsLoading(true);
    const url = await keystore.searchEngine.onUrlSubmit(search);
    setIsLoading(false);
    navigation.navigate('Web', {
      url
    });
  }, [search, setIsLoading]);
  const hanldeSelectCategory = React.useCallback((category) => {
    navigation.navigate('Category', {
      category
    });
  }, [search]);

  const renderScene = SceneMap({
    [Tabs.apps]: () => (
      <BrowserApps onSelect={hanldeSelectCategory} />
    ),
    [Tabs.favorites]: () => (
      <BrowserFavorites />
    )
  });

  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <AccountMenu accountName={account.name} />
          <View style={styles.headerWraper}>
            <Text style={styles.headerTitle}>
              {i18n.t('browser_title')}
            </Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.inputWrapper}>
            {isLoading ? (
              <ActivityIndicator
                animating={isLoading}
                color={theme.colors.primary}
              />
            ) : (
              <SvgXml xml={SearchIconSVG} />
            )}
            <TextInput
              style={styles.textInput}
              textContentType={'URL'}
              placeholder={i18n.t('browser_placeholder_input')}
              placeholderTextColor="#8A8A8F"
              onChangeText={setSearch}
              onSubmitEditing={hanldeSearch}
            />
          </View>
          <TabView
            style={styles.tabView}
            renderTabBar={BrowserNavBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black
  },
  header: {
    alignItems: 'center',
    padding: 15,
    paddingBottom: 30
  },
  headerTitle: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: 'bold',
    color: theme.colors.white,
    textAlign: 'left'
  },
  headerWraper: {
    width: '100%'
  },
  main: {
    backgroundColor: theme.colors.background,
    height: height - 100,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    padding: 15
  },
  textInput: {
    fontSize: 17,
    lineHeight: 22,
    padding: 10,
    borderBottomColor: '#8A8A8F',
    borderBottomWidth: 1,
    color: theme.colors.white,
    width: width - 60
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tabView: {
    marginTop: 15
  }
});

export default BrowserHomePage;