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
  FlatList,
  Alert,
  RefreshControl
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

import { HomeAccount, HomeTokens } from 'app/components/home';
import { ReceiveModal, SimpleConfirm } from 'app/components/modals';

import i18n from 'app/lib/i18n';
import { RootParamList } from 'app/navigator';
import { keystore } from 'app/keystore';
import { viewAddress } from 'app/utils/view-block';
import { Token } from 'types';

type Prop = {
  navigation: StackNavigationProp<RootParamList>;
};

export const HomePage: React.FC<Prop> = ({ navigation }) => {
  const { colors } = useTheme();
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
  const hanldeViewBlock = React.useCallback((token: Token) => {
    const { selected } = networkState;
    const url = viewAddress(token.address[selected], selected);

    navigation.navigate('Browser', {
      screen: 'Web',
      params: {
        url
      }
    });
  }, [networkState, navigation]);
  const hanldeViewBlockURL = React.useCallback((url: string) => {
    navigation.navigate('Browser', {
      screen: 'Web',
      params: {
        url
      }
    });
  }, [networkState, navigation]);
  const handleSend = React.useCallback(() => {
    navigation.navigate('Common', {
      screen: 'Transfer',
      params: {
        recipient: ''
      }
    });
  }, []);
  const handleSwap = React.useCallback(() => {
    navigation.navigate('Common', {
      screen: 'SwapPage',
      params: {}
    });
  }, []);
  const hanldeRefresh = React.useCallback(async() => {
    setRefreshing(true);
    try {
      await keystore.account.balanceUpdate();
      await keystore.settings.rateUpdate();
      setRefreshing(false);
    } catch (err) {
      setRefreshing(false);
      Alert.alert(
        i18n.t('update'),
        (err as Error).message,
        [
          { text: "OK" }
        ]
      );
    }
  }, [setRefreshing]);
  const handleRemoveAccount = React.useCallback(async() => {
    await keystore.account.removeAccount(account);
    await keystore.transaction.sync();
    setIsConfirmModal(false);
  }, [account, setIsConfirmModal]);

  React.useEffect(() => {
    keystore.theme.updateColors();
    keystore
      .account
      .balanceUpdate()
      .then(() => keystore.settings.rateUpdate())
      .catch((err) => {
        Alert.alert(
          i18n.t('update'),
          err.message,
          [
            { text: "OK" }
          ]
        );
      });
    // Alert.alert(
    //   'last update',
    //   'Dear user, i am sad to inform you ZIlPay leave from ZIlliqa ecosystem!',
    //   [
    //     { text: "Details", onPress: () => {
    //       navigation.navigate('Browser', {
    //         screen: 'Web',
    //         params: {
    //           url: 'https://medium.com/@lich666black/3f75a4df5f3f'
    //         }
    //       });
    //     } }
    //   ]
    // );
  }, []);

  return (
    <React.Fragment>
      <View>
        <FlatList
          data={[{ key: 'Home' }]}
          refreshControl={
            <RefreshControl
                refreshing={refreshing}
                tintColor={colors.primary}
                onRefresh={hanldeRefresh}
            />
          }
          renderItem={() => (
            <View>
              <HomeAccount
                tokens={tokensState}
                rate={settingsState.rate[currencyState]}
                currency={currencyState}
                netwrok={networkState.selected}
                account={account}
                onCreateAccount={handleCreateAccount}
                onReceive={() => setIsReceiveModal(true)}
                onSend={handleSend}
                onSwap={handleSwap}
                onRemove={() => setIsConfirmModal(true)}
              />
              <HomeTokens
                onSendToken={(selectedToken) => navigation.navigate('Common', {
                  screen: 'Transfer',
                  params: {
                    selectedToken
                  }
                })}
                onTradToken={(selectedToken) => navigation.navigate('Common', {
                  screen: 'SwapPage',
                  params: {
                    selectedToken
                  }
                })}
                onViewToken={hanldeViewBlock}
                onAddToken={() => navigation.navigate('Common', {
                  screen: 'Tokens'
                })}
              />
            </View>
          )}
        />
      </View>
      <ReceiveModal
        account={account}
        visible={isReceiveModal}
        onTriggered={() => setIsReceiveModal(false)}
        onViewblock={hanldeViewBlockURL}
      />
      <SimpleConfirm
        title={i18n.t('remove_acc_title', {
          name: account?.name || ''
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

export default HomePage;
