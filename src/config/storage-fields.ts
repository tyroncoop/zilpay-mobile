/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2020 ZilPay
 */
const app = 'ZilPay';
const prefix = `@/${app}/`;

export const STORAGE_FIELDS = {
  VAULT: `${prefix}vault`,
  CONTACTS: `${prefix}contacts`,
  TOKENS: `${prefix}tokens`,
  THEME: `${prefix}theme`,
  SELECTED_COIN: `${prefix}selectedcoin`,
  SELECTED_NET: `${prefix}selectednet`,
  CONFIG: `${prefix}config`,
  ACCOUNTS: `${prefix}accounts`,
  TRANSACTIONS: `${prefix}transactions`,
  CURRENCY: `${prefix}currency`,
  RATE: `${prefix}rate`,
  GAS: `${prefix}gas_config`,
  ADDRESS_FORMAT: `${prefix}address_format`,

  ACCESS_CONTROL: `${prefix}access_control`
};
