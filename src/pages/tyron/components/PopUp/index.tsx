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
  StyleSheet,
  ScrollView,
  Text,
  ViewStyle,
  View
} from 'react-native';
import { useTheme } from '@react-navigation/native';

import ProfileSVG from 'app/assets/icons/profile.svg';
import ReceiveIconSVG from 'app/assets/icons/receive.svg';
import AmountIconSVG from 'app/assets/icons/amount.svg';

import commonStyles from 'app/components/transfer/styles';
import { AdvacedGas } from 'app/components/advaced-gas';
import Modal from 'react-native-modal';
import { CustomButton } from 'app/components/custom-button';
import { ModalTitle } from 'app/components/modal-title';
import { ModalWrapper } from 'app/components/modal-wrapper';
import { Passwordinput } from 'app/components/password-input';
import { ErrorMessage } from 'app/components/error-message';
import { LabelValue } from 'app/components/label-value';

import { Account, GasState, Token } from 'types';
import i18n from 'app/lib/i18n';
import { fromZil, toConversion, trim, toLocaleString, nFormatter } from 'app/filters';
import { keystore } from 'app/keystore';
import { Transaction } from 'app/lib/controller/transaction';
import { DEFAULT_GAS } from 'app/config';
import { fonts } from 'app/styles';
import { Alert } from 'react-native';

type Prop = {
  style?: any;
  visible: boolean;
  title: string;
  onConfirm: (privateKey: string) => void;
  setPopup: (arg0: boolean) => void;
};

export const TyronConfirm: React.FC<Prop> = ({
  title,
  style,
  visible,
  onConfirm,
  setPopup
}) => {
  const { colors } = useTheme();
  const settingsState = keystore.settings.store.useValue();

  const [passowrd, setPassowrd] = React.useState<string>('');

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSend = async () => {
    try {
        const currentAccount = keystore.account.getCurrentAccount();
        const account = await keystore.getkeyPairs(currentAccount, passowrd);
        console.log(account)
        onConfirm(account.privateKey)
        setPopup(false)
    } catch {
        Alert.alert("Password didn't match")
    }
  }


  const accountState = keystore.account.store.useValue();
  const account = React.useMemo(
    () => accountState.identities[accountState.selectedAddress],
    [accountState]
  );

  return (
    <Modal
      isVisible={visible}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
        marginBottom: 1
      }}
      backdropColor={colors['modal']}
      onBackdropPress={() => setPopup(false)}
    >
      <ModalWrapper style={style}>
        <ModalTitle onClose={() => setPopup(false)}>
          <View style={styles.topWrapper}>
            <Text style={[styles.toptext, {
              color: colors.text
            }]}>
              {title}
            </Text>
          </View>
        </ModalTitle>
        <ScrollView style={{ marginBottom: 15 }}>
          <View style={commonStyles.item}>
            <ProfileSVG />
            <View style={[commonStyles.itemInfo, styles.item]}>
              <Text style={[commonStyles.label, {
                color: colors.text
              }]}>
                {i18n.t('transfer_account')}
              </Text>
              <View style={commonStyles.infoWrapper}>
                <Text style={[commonStyles.nameAmountText, {
                  color: colors.border
                }]}>
                  {account.name}
                </Text>
                <Text style={[commonStyles.addressAmount, {
                  color: colors.border
                }]}>
                  {trim(account[settingsState.addressFormat])}
                </Text>
              </View>
            </View>
          </View>
            <Passwordinput
                style={{
                marginVertical: 15,
                paddingHorizontal: 15
                }}
                placeholder={i18n.t('pass_setup_input1')}
                onChange={setPassowrd}
            />
          <CustomButton
            title={i18n.t('send')}
            style={styles.sendBtn}
            disabled={passowrd === ''}
            isLoading={isLoading}
            onPress={handleSend}
          />
        </ScrollView>
      </ModalWrapper>
    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    // paddingBottom: 10
  },
  sendBtn: {
    marginVertical: 15
  },
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  toptext: {
    paddingLeft: 5,
    fontSize: 20,
    fontFamily: fonts.Demi
  }
});
