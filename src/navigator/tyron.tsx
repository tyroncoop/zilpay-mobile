/*
 * Project: ZilPay-wallet
 * Author: Rinat(lich666dead)
 * -----
 * Modified By: the developer formerly known as Rinat(lich666dead) at <lich666black@gmail.com>
 * -----
 * Copyright (c) 2020 ZilPay
 */
import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

import {
  BrowserHomePage,
  WebViewPage,
  BrowserCategoryPage,
  BrowserAppPage
} from 'app/pages/browser';

import Welcome from 'app/pages/tyron/screens/Welcome';
import DIDxWallet from 'app/pages/tyron/screens/SSI/Index';
import Doc from 'app/pages/tyron/screens/SSI/Doc/Index';
import Services from 'app/pages/tyron/screens/SSI/Doc/Services/Index';
import Wallet from 'app/pages/tyron/screens/SSI/Wallet/Index';
import SocialRecovery from 'app/pages/tyron/screens/SSI/SocialRecovery/Index';
import AddFunds from 'app/pages/tyron/screens/SSI/AddFunds/Index';
import Crud from 'app/pages/tyron/screens/SSI/Wallet/Crud/Index';
import NFT from 'app/pages/tyron/screens/SSI/Wallet/NFT/Index';
import Updates from 'app/pages/tyron/screens/SSI/Wallet/Updates/Index';
import Balances from 'app/pages/tyron/screens/SSI/Wallet/Balances/Index';
import Update from 'app/pages/tyron/screens/SSI/Wallet/Crud/Update';
import DIDSocialRecovery from 'app/pages/tyron/screens/SSI/Wallet/Crud/SocialRecovery';
import Stake from 'app/pages/tyron/screens/SSI/Stake/Index';
import StakeWallet from 'app/pages/tyron/screens/SSI/Stake/Wallet/Index';
import XPoints from 'app/pages/tyron/screens/XPoints/Index';
import SBT from 'app/pages/tyron/screens/SSI/SBT/Index';
import SBTPublic from 'app/pages/tyron/screens/SSI/SBT/Wallet/Public';
import SBTPrivate from 'app/pages/tyron/screens/SSI/SBT/Wallet/Private';

import { DApp } from 'types';
import DIDDomains from 'app/pages/tyron/screens/SSI/Wallet/NFT/DIDDomains/Index';


const Stack = createStackNavigator();
export const tyronNav: React.FC = () => {
  const { colors } = useTheme();
  const headerOptions: StackNavigationOptions = React.useMemo(() => ({
    headerTintColor: colors.text,
    headerStyle: {
      backgroundColor: colors.background,
      elevation: 0,
      shadowOpacity: 0
    },
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }), [colors]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          title: '',
          header: () => null
        }}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DIDxWallet"
        component={DIDxWallet}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Doc"
        component={Doc}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Services"
        component={Services}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Wallet"
        component={Wallet}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SocialRecovery"
        component={SocialRecovery}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddFunds"
        component={AddFunds}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Crud"
        component={Crud}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NFT"
        component={NFT}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Updates"
        component={Updates}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Balances"
        component={Balances}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Update"
        component={Update}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DIDSocialRecovery"
        component={DIDSocialRecovery}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DIDDomains"
        component={DIDDomains}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Stake"
        component={Stake}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="StakeWallet"
        component={StakeWallet}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SBT"
        component={SBT}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SBTPublic"
        component={SBTPublic}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SBTPrivate"
        component={SBTPrivate}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="XPoints"
        component={XPoints}
      />
    </Stack.Navigator>
  );
};
