/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2020 ZilPay
 */
import {
  settingsStore,
  settingsStoreSetAddressFormat,
  settingsStoreUpdate,
  settingsStoreReset
} from './store';
import { MobileStorage, buildObject } from 'app/lib/storage';
import {
  STORAGE_FIELDS,
  ADDRESS_FORMATS,
  API_COINGECKO,
  DEFAULT_CURRENCIES,
} from 'app/config';
import { TokenControll } from 'app/lib/controller';
import { currenciesStore } from 'app/lib/controller/currency/store';

export class SettingsControler {
  public readonly store = settingsStore;
  public readonly formats = ADDRESS_FORMATS;
  private _storage: MobileStorage;
  private _tokens: TokenControll;

  constructor(
    storage: MobileStorage,
    tokens: TokenControll
  ) {
    this._storage = storage;
    this._tokens = tokens;
  }

  public get rate() {
    const state = this.store.get();
    const [zil] = this._tokens.store.get();

    return state.rate[zil.symbol];
  }

  public async rateUpdate() {
    const currencies = DEFAULT_CURRENCIES.join();
    const url = `${API_COINGECKO}?ids=zilliqa&vs_currencies=${currencies}`;

    const response = await fetch(url);
    const data = await response.json();
    const rate = data.zilliqa;
    const currency = currenciesStore.get();
    const state = this.store.get();
    const [zil] = this._tokens.store.get();

    state.rate[zil.symbol] = rate[currency];

    settingsStoreUpdate(state);

    return this._storage.set(
      buildObject(STORAGE_FIELDS.SETTINGS, state)
    );
  }

  public setFormat(format: string) {
    settingsStoreSetAddressFormat(format);

    return this._storage.set(
      buildObject(STORAGE_FIELDS.SETTINGS, this.store.get())
    );
  }

  public reset() {
    settingsStoreReset();

    return this._storage.set(
      buildObject(STORAGE_FIELDS.SETTINGS, this.store.get())
    );
  }

  public async sync() {
    const settings = await this._storage.get(STORAGE_FIELDS.SETTINGS);

    try {
      if (!settings || typeof settings !== 'string') {
        throw new Error('bad response');
      }

      const parsed = JSON.parse(settings);

      settingsStoreUpdate(parsed);
    } catch {
      await this.reset();
    }
  }
}
