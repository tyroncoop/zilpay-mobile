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
  FlatList,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { HomeAccount, HomeTokens } from 'app/components/home';
import { ReceiveModal, SimpleConfirm } from 'app/components/modals';

import i18n from 'app/lib/i18n';
import { theme } from 'app/styles';
import { RootParamList } from 'app/navigator';
import { keystore } from 'app/keystore';
import { ZILLIQA_KEYS } from 'app/config';

type Prop = {
  navigation: StackNavigationProp<RootParamList>;
};

export const HomePage: React.FC<Prop> = ({ navigation }) => {
  const accountState = keystore.account.store.useValue();
  const settingsState = keystore.settings.store.useValue();
  const currencyState = keystore.currency.store.useValue();
  const networkState = keystore.network.store.useValue();
  const tokensState = keystore.token.store.useValue();

  const [isReceiveModal, setIsReceiveModal] = React.useState(false);
  const [isConfirmModal, setIsConfirmModal] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  const handleCreateAccount = React.useCallback(() => {
    navigation.navigate('Common', {
      screen: 'CreateAccount'
    });
  }, []);
  const handleSend = React.useCallback(() => {
    navigation.navigate('Common', {
      screen: 'Transfer',
      params: {
        recipient: ''
      }
    });
  }, []);
  const hanldeRefresh = React.useCallback(async() => {
    setRefreshing(true);
    await keystore.account.balanceUpdate();
    setRefreshing(false);
  }, [setRefreshing]);
  const handleRemoveAccount = React.useCallback(async() => {
    await keystore.account.removeAccount(account);
    setIsConfirmModal(false);
  }, [account, setIsConfirmModal]);
  const hanldeSelectToken = React.useCallback((tokenIndex) => {
    navigation.navigate('App', {
      screen: 'History',
      params: {
        tokenIndex
      }
    });
  }, [navigation]);

  React.useEffect(() => {
    keystore.account.balanceUpdate();
  }, []);

  React.useEffect(() => {
    const [mainnet] = ZILLIQA_KEYS;

    if (networkState.selected === mainnet) {
      keystore.settings.rateUpdate();
    } else {
      keystore.settings.reset();
    }
  }, []);

  return (
    <React.Fragment>
      <SafeAreaView>
        <FlatList
          data={[{ key: 'Home' }]}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                tintColor={theme.colors.primary}
                onRefresh={hanldeRefresh}
            />
          }
          renderItem={() => (
            <View>
              <HomeAccount
                token={tokensState.identities[0]}
                rate={settingsState.rate[currencyState]}
                currency={currencyState}
                netwrok={networkState.selected}
                account={account}
                onCreateAccount={handleCreateAccount}
                onReceive={() => setIsReceiveModal(true)}
                onSend={handleSend}
                onRemove={() => setIsConfirmModal(true)}
              />
              <HomeTokens onSelectToken={hanldeSelectToken}/>
            </View>
          )}
        />
      </SafeAreaView>
      <ReceiveModal
        account={account}
        visible={isReceiveModal}
        onTriggered={() => setIsReceiveModal(false)}
      />
      <SimpleConfirm
        title={i18n.t('remove_acc_title', {
          name: account.name || ''
        })}
        description={i18n.t('remove_seed_acc_des')}
        btns={[i18n.t('reject'), i18n.t('confirm')]}
        visible={isConfirmModal}
        onConfirmed={handleRemoveAccount}
        onTriggered={() => setIsConfirmModal(false)}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
});

export default HomePage;
