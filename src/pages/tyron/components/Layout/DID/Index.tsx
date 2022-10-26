import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import SearchBar from "../../../components/SearchBar/Index";
import Footer from "../../../components/Footer/Index";
import lightning from "../../../assets/img/lightning.jpg";
import lightning_light from "../../../assets/img/lightning_gris.jpg";
import menu from "../../../assets/img/menu.png";
import connectIco from "../../../assets/img/user_connect.png";
import connectedIco from "../../../assets/img/user_connected.png";
import loggedinIco from "../../../assets/img/user_loggedin.png";
import leftArrow from "../../../assets/img/left-arrow.png";
import Menu from "../../../components/Menu/Index";
import Modal from "../../../components/Modal/Index";
import GetStarted from "../../../components/GetStarted/Index";
import Dashboard from "../../Dashboard/Index";
import { tyronThemeDark } from "app/lib/controller/tyron/theme";
import TxModal from "../../TxModal/Index";
import { showTxModal, txModalMinimized } from "app/lib/controller/tyron/tx";
import { loadingGlobal } from "app/lib/controller/tyron/utils";
import ModalBuyNft from "../../Modal/BuyNft/Index";
import { modalBuyNft } from "app/lib/controller/tyron/modal";

const deviceWidth = Dimensions.get("screen").width;

export type Props = {
  navigation: any;
  child: any;
};

const DIDLayout: React.FC<Props> = ({ navigation, child }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConnect, setShowConnect] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [loginState, setLoginState] = useState("");
  const [showBuy, setShowBuy] = modalBuyNft.use();
  const showModalTx = showTxModal.useValue();
  const txMinimized = txModalMinimized.useValue();
  const isDark = tyronThemeDark.useValue();
  const lightning_ = isDark ? lightning : lightning_light;
  const loading = loadingGlobal.useValue();

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
        navigation={() => {}}
        visible={showConnect}
        hideModal={() => setShowConnect(false)}
        setLoginState={setLoginState}
      />
      <ModalBuyNft
        navigation={navigation}
        visible={showBuy}
        hideModal={() => setShowBuy(false)}
      />
      {!showMenu && !showConnect && !showGetStarted && !showBuy && (
        <ScrollView>
          <Dashboard
            loginState={loginState}
            setShowMenu={setShowMenu}
            setLoginState={setLoginState}
            setShowConnect={setShowConnect}
          />
          {showModalTx && <TxModal />}
          {txMinimized || !showModalTx ? (
            <>
              <View style={styles.wrapperContent}>
                <SearchBar navigation={navigation} />
                {!loading && child}
              </View>
              {!loading && (
                <View>
                  <Footer navigation={navigation} />
                </View>
              )}
            </>
          ) : (
            <></>
          )}
        </ScrollView>
      )}
    </ImageBackground>
  );
};

export default DIDLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "space-between",
  },
  icoMenuWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icoMenu: {
    width: 25,
    height: 25,
  },
  connectWrapper: {
    flexDirection: "row",
  },
  txtConnect: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
    marginLeft: 10,
  },
  txtConnected: {
    fontSize: 16,
    color: "#27ae60",
    fontWeight: "bold",
    marginLeft: 10,
  },
  txtLoggedin: {
    fontSize: 16,
    color: "#f9e600",
    fontWeight: "bold",
    marginLeft: 10,
  },
  wrapperContent: {
    marginVertical: 25,
  },
  txtHeader: {
    fontSize: 20,
    color: "#dbe4eb",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 20,
  },
  txtHeaderYellowWrapper: {
    marginVertical: 5,
  },
  txtHeaderYellow: {
    fontSize: 20,
    color: "#ffff32",
    letterSpacing: 2,
    textAlign: "center",
  },
  textHeaderWrapper: {
    marginVertical: 20,
    alignSelf: "center",
  },
  xText: {
    fontSize: 14,
    color: "#ffff32",
    marginHorizontal: 10,
  },
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  cardYellow: {
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.25,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 5,
    borderColor: "#ffff32",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardHidden: {
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  cardBack: {
    width: deviceWidth * 0.25,
    height: deviceWidth * 0.25,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    borderRadius: 5,
  },
  txtCard: {
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    lineHeight: 20,
  },
  txtCardBack: {
    color: "#ffff32",
    textAlign: "center",
    fontSize: 10,
    lineHeight: 20,
  },
  idWrapper: {
    width: (deviceWidth * 80) / 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignSelf: "center",
    marginBottom: 30,
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
  },
  idWrapperAddr: {
    marginRight: 10,
    marginLeft: 5,
    marginTop: 7,
  },
  leftArrowIco: {
    width: 20,
    height: 20,
  },
  leftArrowIcoWrapper: {
    alignSelf: "flex-start",
    marginTop: 30,
  },
});
