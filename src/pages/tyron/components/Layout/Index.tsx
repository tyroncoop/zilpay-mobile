import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';

import Welcome from '../../screens/Welcome';
import Login from '../../screens/Login';
import DIDxWallet from '../../screens/SSI/Index';
import Doc from '../../screens/SSI/Doc/Index';
import Services from '../../screens/SSI/Doc/Services/Index';
import Wallet from '../../screens/SSI/Wallet/Index';
import SocialRecovery from '../../screens/SSI/SocialRecovery/Index';
import AddFunds from '../../screens/SSI/AddFunds/Index';
import Crud from '../../screens/SSI/Wallet/Crud/Index';
import NFT from '../../screens/SSI/Wallet/NFT/Index';
import Updates from '../../screens/SSI/Wallet/Updates/Index';
import Balances from '../../screens/SSI/Wallet/Balances/Index';
import Update from '../../screens/SSI/Wallet/Crud/Update';
import DIDSocialRecovery from '../../screens/SSI/Wallet/Crud/SocialRecovery';
import Stake from '../../screens/SSI/Stake/Index';
import StakeWallet from '../../screens/SSI/Stake/Wallet/Index';
import XPoints from '../../screens/XPoints/Index';
import Account from '../../screens/Account';
import Scan from '../../screens/Scan';
import {AppState} from 'react-native';
import {setLogin} from '../../redux/actions/isLogin';

const Stack = createNativeStackNavigator();

export default function Layout() {
  const isLogin = useSelector((state: any) => state.isLogin);
  const [wallet, setWallet] = useState();
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: string) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
        } else {
          dispatch(setLogin(false));
        }

        appState.current = nextAppState;
        console.log('AppState', appState.current);
      },
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    EncryptedStorage.getItem('zilliqa').then((res: any) => {
      setWallet(res);
    });
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin?.isLogin !== true && (
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
        )}
        {wallet === undefined ||
          (wallet === null && (
            <Stack.Screen
              options={{headerShown: false}}
              name="Account"
              component={Account}
            />
          ))}
        {isLogin?.isLogin === true && (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Welcome"
              component={Welcome}
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
              name="XPoints"
              component={XPoints}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Scan"
              component={Scan}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
