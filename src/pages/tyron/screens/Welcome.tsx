import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import SearchBar from '../components/SearchBar/Index';
import Footer from '../components/Footer/Index';
import lightning from '../assets/img/lightning.jpg';
import lightning_light from '../assets/img/lightning_gris.jpg';
import menu from '../assets/img/menu.png';
import connectIco from '../assets/img/user_connect.png';
import connectedIco from '../assets/img/user_connected.png';
import loggedinIco from '../assets/img/user_loggedin.png';
import Menu from '../components/Menu/Index';
import Modal from '../components/Modal/Index';
import GetStarted from '../components/GetStarted/Index';
import Dashboard from '../components/Dashboard/Index';
// import {useSelector} from 'react-redux';

export type Props = {
  navigation: any;
};

const Welcome: React.FC<Props> = ({navigation}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  // const isDark = useSelector((state: any) => state.user.isDark);
  const isDark = true
  const [loginState, setLoginState] = useState('');
  const lightning_ = isDark ? lightning : lightning_light;

  return (
    <ImageBackground source={lightning_} style={styles.container}>
      <Menu
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        showConnect={setShowConnect}
        showGetStarted={setShowGetStarted}
      />
      <GetStarted visible={showGetStarted} showGetStarted={setShowGetStarted} />
      <Modal
        navigation={navigation}
        visible={showConnect}
        hideModal={() => setShowConnect(false)}
        setLoginState={setLoginState}
      />
      {!showMenu && !showConnect && !showGetStarted && (
        <>
          <Dashboard
            loginState={loginState}
            setShowMenu={setShowMenu}
            setLoginState={setLoginState}
            setShowConnect={setShowConnect}
          />
          <View>
            <SearchBar navigation={navigation} />
          </View>
          <View>
            <Footer navigation={navigation} />
          </View>
        </>
      )}
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
});
