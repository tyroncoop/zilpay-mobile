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
  ViewStyle
} from 'react-native';

import { LoadSVG } from 'app/components/load-svg';

import { theme } from 'app/styles';
import i18n from 'app/lib/i18n';
import { TOKEN_ICONS } from 'app/config';
import { toLocaleString, toConversion, fromZil } from 'app/filters';

export type Prop = {
  decimals: number;
  balance?: string;
  symbol: string;
  name: string;
  rate: number;
  totalSupply?: string;
  currency: string;
  style?: ViewStyle;
};

export const TokenInfo: React.FC<Prop> = ({
  rate,
  symbol,
  decimals,
  name,
  currency,
  style,
  balance = '0',
  totalSupply = '0'
}) => {
  /**
   * ZIL(Default token) amount in float.
   */
  const amount = React.useMemo(
    () => fromZil(balance, decimals),
    [balance, decimals]
  );
  const tokensSupply = React.useMemo(
    () => fromZil(totalSupply, decimals),
    [totalSupply, decimals]
  );
  /**
   * Converted to BTC/USD/ETH.
   */
  const conversion = React.useMemo(() => {
    return toConversion(balance, rate, decimals);
  }, [rate, decimals, balance]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.symbol}>
            {symbol}
          </Text>
          <Text style={styles.convertedAmount}>
            {name}
          </Text>
        </View>
        <LoadSVG
          height="30"
          width="30"
          url={`${TOKEN_ICONS}/${symbol}.svg`}
        />
      </View>
      <View>
        <Text style={styles.zilAmount}>
          {toLocaleString(amount)}
        </Text>
        <View style={{
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}>
          <Text style={styles.convertedAmount}>
            {toLocaleString(conversion)} {currency.toUpperCase()}
          </Text>
          <Text style={styles.convertedAmount}>
            {i18n.t('total_supply')}: {toLocaleString(tokensSupply)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    minHeight: 90,
    backgroundColor: theme.colors.gray,
    padding: 10,
    borderWidth: 0.9,
    borderColor: theme.colors.gray,
    height: 110
  },
  header: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  symbol: {
    color: theme.colors.muted,
    fontSize: 17
  },
  zilAmount: {
    color: theme.colors.white,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'bold'
  },
  convertedAmount: {
    color: theme.colors.muted,
    fontSize: 13
  }
});