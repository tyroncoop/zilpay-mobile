import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import menu from '../../assets/img/menu.png';
import loggedinIco from '../../assets/img/user_loggedin.png';
import connectedIco from '../../assets/img/user_connected.png';
import Sun from '../../assets/icons/sun.svg';
import Moon from '../../assets/icons/moon.svg';
// import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {updateIsDark} from '../../redux/actions/user';

export type Props = {
  loginState: string;
  setShowMenu: any;
  setLoginState: any;
  setShowConnect: any;
};

const Dashboard: React.FC<Props> = ({setShowMenu, setShowConnect}) => {
  const {t} = useTranslation();
  // const dispatch = useDispatch();
  // const loginInfo = useSelector((state: any) => state.user.loginInfo);
  const loginInfo:any = null;
  const isDark = true;
  // const isDark = useSelector((state: any) => state.user.isDark);
  const isLogin = loginInfo?.address;
  const styles = isDark ? stylesDark : stylesLight;

  return (
    <View style={styles.icoMenuWrapper}>
      <TouchableOpacity
        onPress={() => setShowMenu(true)}
        style={styles.icoMenu}
      >
        <Image style={styles.icoMenu} source={menu} />
      </TouchableOpacity>
      <View style={styles.rightMenu}>
        {isDark ? (
          <TouchableOpacity
            // onPress={() => dispatch(updateIsDark(false))}
            style={styles.btnSun}
          >
            <Sun width={30} height={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            // onPress={() => dispatch(updateIsDark(true))}
            style={styles.btnMoon}
          >
            <Moon width={30} height={30} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => setShowConnect(true)}
          style={styles.connectWrapper}
        >
          {/* <View style={styles.icoMenu}>
            <Image style={styles.icoMenu} source={connectedIco} />
          </View> */}
          {isLogin ? (
            <Text style={styles.txtLoggedin}>{t('LOGGED_IN')}</Text>
          ) : (
            <Text style={styles.txtConnected}>{t('LOG_IN')}</Text>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => setShowConnect(true)}
          style={styles.connectWrapper}
        >
          <View style={styles.icoMenu}>
            <Image style={styles.icoMenu} source={loggedinIco} />
          </View>
          <Text style={styles.txtLoggedin}>LOGGED IN</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Dashboard;

const stylesDark = StyleSheet.create({
  icoMenuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icoMenu: {
    width: 25,
    height: 25,
  },
  connectWrapper: {
    flexDirection: 'row',
  },
  txtConnect: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  txtConnected: {
    fontSize: 16,
    color: '#dbe4eb',
    fontWeight: 'bold',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  txtLoggedin: {
    fontSize: 16,
    color: '#f9e600',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  rightMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSun: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMoon: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesLight = StyleSheet.create({
  icoMenuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icoMenu: {
    width: 25,
    height: 25,
  },
  connectWrapper: {
    flexDirection: 'row',
  },
  txtConnect: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  txtConnected: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  txtLoggedin: {
    fontSize: 16,
    color: '#f9e600',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  rightMenu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSun: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMoon: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
